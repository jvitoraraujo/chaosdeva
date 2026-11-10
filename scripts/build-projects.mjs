// Gera data/projects.json com os repositórios mais relevantes (mesmo ranqueamento do site).
// Uso: node scripts/build-projects.mjs   (REPOS_FILE=arquivo.json usa dados locais, para testes)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const { rankRepos } = require('../js/rank.js');

const ctx = { window: {} };                       // lê a configuração GH direto do content.js (fonte única)
vm.runInNewContext(readFileSync(new URL('../js/content.js', import.meta.url), 'utf8'), ctx);
const GH = ctx.window.GH;

async function fetchAll() {
  if (process.env.REPOS_FILE) return JSON.parse(readFileSync(process.env.REPOS_FILE, 'utf8'));
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'chaosdeva-build' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const all = [];
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(`https://api.github.com/users/${GH.user}/repos?per_page=100&sort=pushed&page=${page}`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

const repos = rankRepos(await fetchAll(), GH);
const out = new URL('../data/projects.json', import.meta.url);

// Só grava se algo mudou: evita um commit (e um novo deploy do Pages) por dia apenas por causa do horário.
let previous = null;
try { previous = JSON.parse(readFileSync(out, 'utf8')); } catch { /* primeira execução */ }
if (previous && previous.generated && JSON.stringify(previous.repos) === JSON.stringify(repos)) {
  console.log('projects.json: sem mudanças, nada a publicar.');
} else {
  mkdirSync(new URL('../data/', import.meta.url), { recursive: true });
  writeFileSync(out, JSON.stringify({ generated: new Date().toISOString(), user: GH.user, repos }, null, 2) + '\n');
  console.log(`projects.json: ${repos.length} projeto(s) -> ${repos.map((r) => r.name).join(', ') || '(nenhum)'}`);
}
