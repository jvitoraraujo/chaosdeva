(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const app = $('#app'), veil = $('#veil'), themeMeta = $('meta[name="theme-color"]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const A = window.AUTHOR, GH = window.GH, PAGES = ['home', 'projetos', 'sobre', 'marcas'];
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ext = 'target="_blank" rel="noopener"';

  let lang = 'pt';
  try { lang = localStorage.getItem('cd-lang') || 'pt'; } catch (e) {}
  if (!window.I18N[lang]) lang = 'pt';

  const route = () => {
    const [, theme, page] = location.hash.split('/');
    if (theme !== 'chaos' && theme !== 'deva') return { theme: null };
    return { theme, page: PAGES.includes(page) ? page : 'home' };
  };
  const go = (theme, page) => { location.hash = theme ? `#/${theme}/${page || 'home'}` : '#/'; };

  /* ---------- Blocos ---------- */
  const divider = (theme) => `<div class="div" aria-hidden="true">${theme === 'deva' ? '✦ . * . ⟡ . * . ✦' : '✦'}</div>`;
  const emblem = (theme) => theme === 'chaos'
    ? '<img src="assets/chaos-logo.svg" alt="CHAOS" width="260" height="371" decoding="async" fetchpriority="high">'
    : '<img src="assets/deva-lockup-vertical.webp" alt="DEVA" width="420" height="362" decoding="async" fetchpriority="high">';

  function home(theme, t) {
    const c = t[theme];
    const term = [1, 2, 3, 4, 5, 6].map((i) => `<div>${esc(c['termL' + i])}</div>`).join('');
    return `<section class="hero"><div>
      <p class="role">${esc(c.role)}</p><h1>${esc(A.name)}</h1><p class="lead">${esc(c.lead)}</p>
      <p class="tagline">${esc(c.tagline)}</p>
      <div class="home-terminal mono">${term}</div>
      <div class="home-tags"><span class="mono">${esc(c.tagsLabel)}</span>
        <div class="tags">${c.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div></div>
    </div><div class="emblem">${emblem(theme)}</div></section>`;
  }

  /* Projetos: o arquivo estático (gerado pela Action) aparece na hora; em segundo plano o site confere o GitHub
     e, se algo mudou (descrição, estrelas, projeto novo), atualiza os cards sem recarregar. */
  let repos = null, repoErr = false, liveTried = 0;
  const LIVE_TTL = 18e5;                                   /* 30 min: no máximo 1 consulta à API por navegador */
  async function fetchJSON(url, ms, cache) {
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), ms);
    try {
      const res = await fetch(url, { signal: ctl.signal, cache: cache || 'default', headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      return await res.json();
    } finally { clearTimeout(to); }
  }
  const readLive = () => { try { const c = JSON.parse(localStorage.getItem('cd-repos') || 'null'); return c && Date.now() - c.t < LIVE_TTL ? c.d : null; } catch (e) { return null; } };
  const saveLive = (d) => { try { localStorage.setItem('cd-repos', JSON.stringify({ t: Date.now(), d })); } catch (e) {} };
  const fetchLive = async () => window.rankRepos(await fetchJSON(`https://api.github.com/users/${GH.user}/repos?per_page=100&sort=pushed`, 8000), GH);

  async function loadRepos() {
    if (repos) return;
    const live = readLive();
    if (live) { repos = live; return; }                    /* consulta ao vivo recente: é a mais atual */
    try {                                                  /* revalida com o servidor (nunca usa cópia velha do navegador) */
      const d = await fetchJSON(GH.source, 6000, 'no-cache');
      if (d && d.generated && Array.isArray(d.repos)) { repos = d.repos; return; }
    } catch (e) {}
    repos = await fetchLive(); saveLive(repos);            /* sem arquivo estático: usa a API direto */
  }
  async function refreshLive(t) {
    if (readLive() || Date.now() - liveTried < 3e5) return; /* já está fresco, ou tentou há menos de 5 min (limite de taxa) */
    liveTried = Date.now();
    try {
      const fresh = await fetchLive();
      saveLive(fresh);
      if (fresh.length && JSON.stringify(fresh) !== JSON.stringify(repos)) {
        repos = fresh; const box = $('#repos'); if (box) box.innerHTML = reposHTML(t);
      }
    } catch (e) { /* sem rede ou limite da API: mantém o que já está na tela */ }
  }
  const repoCard = (r, t) => {
    const tags = [r.language, ...(r.topics || [])].filter(Boolean).map((x) => `<span class="tag">${esc(x)}</span>`).join('');
    const star = r.stargazers_count ? `<span class="tag">★ ${r.stargazers_count}</span>` : '';
    const date = new Date(r.pushed_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    const cover = GH.covers && GH.covers[r.name] ? `<img class="cover" src="${esc(GH.covers[r.name])}" alt="" loading="lazy" decoding="async">` : '';
    const demo = r.homepage && /^https?:/.test(r.homepage) ? `<a class="more" href="${esc(r.homepage)}" ${ext}>Demo →</a>` : '';
    return `<article class="card">${cover}<h2 class="t">${esc(r.name)}</h2><p class="muted">${esc(r.description || t.noDesc)}</p>
      <div class="tags">${tags}${star}</div><p class="mono meta">${esc(t.updated)} ${esc(date)}</p>
      <a class="more" href="${esc(r.html_url)}" ${ext}>${esc(t.repo)} →</a>${demo}</article>`;
  };
  const reposHTML = (t) => repoErr ? `<p class="muted">${esc(t.failed)}</p>`
    : !repos ? `<p class="muted">${esc(t.loading)}</p>`
    : !repos.length ? `<p class="muted">${esc(t.empty)}</p>` : repos.map((r) => repoCard(r, t)).join('');
  async function fillRepos(t) {
    try { await loadRepos(); repoErr = false; } catch (e) { repoErr = true; }
    const box = $('#repos'); if (box) box.innerHTML = reposHTML(t);
    if (!repoErr) refreshLive(t);
  }
  function projetos(theme, t) {
    const c = t[theme];
    return `<h1>${esc(c.projH)}</h1><p class="lead muted">${esc(c.projP)}</p>${divider(theme)}
      <div class="grid" id="repos" aria-live="polite">${reposHTML(t)}</div>
      <p class="after"><a class="btn ghost" href="${A.github}?tab=repositories" ${ext}>${esc(t.allRepos)} →</a></p>`;
  }

  function profile(t) {
    const P = window.PROFILE, L = t.profile, out = [];
    const sec = (k, body) => out.push(`<h2 class="as-h3 sec">${esc(L[k])}</h2>${body}`);
    const list = (arr) => `<ul class="plain">${arr.map((x) => `<li>${esc(x[lang] || x)}</li>`).join('')}</ul>`;
    if (P.highlights.length) sec('highlights', list(P.highlights));
    if (P.stack.length) sec('stack', `<div class="tags">${P.stack.map((x) => `<span class="tag">${esc(x)}</span>`).join('')}</div>`);
    if (P.experience.length) sec('experience', P.experience.map((e) => `<div class="tl"><b>${esc(e.role)}</b> · ${esc(e.org)}<span class="mono">${esc(e.period)}</span><p class="muted">${esc(e[lang] || '')}</p></div>`).join(''));
    if (P.education.length) sec('education', P.education.map((e) => `<div class="tl"><b>${esc(e.title)}</b> · ${esc(e.org)}<span class="mono">${esc(e.period)}</span></div>`).join(''));
    if (P.interests.length) sec('interests', list(P.interests));
    if (P.languages.length) sec('languages', list(P.languages));
    return out.join('');
  }
  function sobre(theme, t) {
    const c = t[theme];
    return `<h1>${esc(c.aboutH)}</h1>${divider(theme)}<div class="about"><div><p>${esc(c.aboutP1)}</p><p class="muted">${esc(c.aboutP2)}</p>
      <p class="mono">${esc(c.role)}</p>${profile(t)}</div><div><h2 class="as-h3">${esc(c.contactH)}</h2><ul class="links">
      <li><a href="${A.github}" ${ext}>GitHub<span>${esc(GH.user)}</span></a></li>
      <li><a href="${A.linkedin}" ${ext}>LinkedIn<span>${esc(A.name)}</span></a></li>
      <li><a href="mailto:${A.email}">E-mail<span>${esc(A.email)}</span></a></li></ul></div></div>`;
  }

  const sw = (list) => `<div class="sw">${list.map(([n, h]) => `<div><b style="--c:${h}"></b><small>${n}<br>${h}</small></div>`).join('')}</div>`;
  function marcas(theme, t) {
    const m = t.marcas;
    const panel = (k, logo, pal) => `<article class="panel" data-theme="${k}"><div class="logo"><img src="${logo}" alt="${m[k].h}" loading="lazy" decoding="async"></div>
      <h3 class="pt">${m[k].h}</h3><p>${esc(m[k].p1)}</p><p class="muted">${esc(m[k].p2)}</p><h4 class="as-h3">${esc(m[k].pal)}</h4>${sw(pal)}</article>`;
    const how = m.how.map((x) => `<article class="card"><h3 class="t">${esc(x.t)}</h3><p class="muted">${esc(x.p)}</p></article>`).join('');
    return `<h1>${esc(m.h)}</h1><p class="lead muted">${esc(m.intro)}</p>
      <section class="blk"><h2>${esc(m.umbrellaH)}</h2><p>${esc(m.umbrellaP)}</p></section>
      <section class="blk"><h2 class="as-h3">${esc(m.howH)}</h2><div class="grid">${how}</div></section>${divider(theme)}
      <h2>${esc(m.brandsH)}</h2><div class="pair">
      ${panel('chaos', 'assets/chaos-simbolo.svg', [['Void', '#000000'], ['Dust', '#111418'], ['Moonlight', '#E0E6ED'], ['Amethyst', '#8B5CF6'], ['Nebula', '#0369A1']])}
      ${panel('deva', 'assets/deva-sigilo.svg', [['Canvas', '#050811'], ['Surface', '#0B111E'], ['Parchment', '#E2E8F0'], ['Gold', '#DFB15B'], ['Celestial', '#8DA9C4']])}
    </div>`;
  }
  const views = { home, projetos, sobre, marcas };

  /* ---------- Portal ---------- */
  function gateHTML(t) {
    return `<div class="gate"><button class="pill lang" id="lang" aria-label="${esc(t.langAria)}">${t.langBtn}</button>
      <h1>CHAOS / DEVA</h1><p>${esc(t.gate.sub)}</p>
      <div class="choices">
        <button class="choice chaos" data-go="chaos"><img src="assets/chaos-simbolo.svg" alt="" fetchpriority="high"><img class="wm" src="assets/chaos-wordmark.svg" alt="CHAOS" height="36"><small>${esc(t.gate.pick)} →</small></button>
        <button class="choice deva" data-go="deva"><img src="assets/deva-simbolo.svg" alt="" fetchpriority="high"><b>DEVA</b><small>${esc(t.gate.pick)} →</small></button>
      </div></div>`;
  }

  /* ---------- Render ---------- */
  function shell(theme, page, t) {
    const logo = theme === 'chaos' ? 'assets/chaos-simbolo.svg' : 'assets/deva-sigilo.svg';
    const nav = PAGES.map((p) => `<a href="#/${theme}/${p}" ${p === page ? 'aria-current="page"' : ''}>${esc(t.nav[p])}</a>`).join('');
    const other = theme === 'chaos' ? 'DEVA' : 'CHAOS';
    const foot = theme === 'deva' ? `${t.deva.footer} &nbsp;·&nbsp; ${t.deva.stamp}` : t.chaos.footer;
    return `<a class="skip" href="#/${theme}/${page}" data-skip>${esc(t.skip)}</a>
      <header class="top"><a class="brand" href="#/${theme}/home"><img src="${logo}" alt=""><span>${theme.toUpperCase()}</span></a>
      <nav aria-label="${esc(t.navLabel)}">${nav}</nav><div class="ctl">
      <button class="pill switch" id="switch" type="button">${theme.toUpperCase()} <i aria-hidden="true">⇄</i> ${other}</button>
      <button class="pill" id="lang" type="button" aria-label="${esc(t.langAria)}">${t.langBtn}</button></div></header>
      <main id="main" class="in">${views[page](theme, t)}</main>
      <footer>${foot}<br>${esc(t.rights)}<br><a href="${A.github}" ${ext}>GitHub</a> · <a href="${A.linkedin}" ${ext}>LinkedIn</a> · <a href="mailto:${A.email}">E-mail</a></footer>
      <button class="totop" type="button" data-top aria-label="${esc(t.top)}" title="${esc(t.top)}"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`;
  }

  let current = null, first = true;
  function render(opts) {
    opts = opts || {};
    const r = route(), t = window.I18N[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    if (opts.quiet) app.dataset.quiet = '1'; else delete app.dataset.quiet;   /* troca de idioma: sem reanimar logos */
    if (!r.theme) {
      document.body.removeAttribute('data-theme'); document.body.classList.add('mix');
      app.innerHTML = gateHTML(t); document.title = 'CHAOS / DEVA';
      themeMeta.content = '#050811';
    } else {
      document.body.setAttribute('data-theme', r.theme); document.body.classList.toggle('mix', r.page === 'marcas');
      const keepShell = current && current.theme === r.theme && current.lang === lang && $('#main');
      if (keepShell) {
        $('#main').innerHTML = views[r.page](r.theme, t);
        document.querySelectorAll('nav a').forEach((a) => {
          if (a.getAttribute('href') === `#/${r.theme}/${r.page}`) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
        });
        const m = $('#main'); m.classList.remove('in', 'out'); void m.offsetWidth; m.classList.add('in');
        const sk = $('.skip'); if (sk) sk.setAttribute('href', `#/${r.theme}/${r.page}`);
      } else { app.innerHTML = shell(r.theme, r.page, t); }
      document.title = `${r.theme.toUpperCase()} · ${t.title[r.page]} | CHAOS / DEVA`;
      themeMeta.content = r.theme === 'chaos' ? '#000000' : '#050811';
      if (r.page === 'projetos') fillRepos(t);
    }
    current = { theme: r.theme, lang };
    if (!opts.keepScroll) scrollTo({ top: 0, behavior: 'instant' });
    if (opts.quiet) { const b = $('#lang'); if (b) b.focus({ preventScroll: true }); }   /* teclado não perde o foco */
    else if (!first) { const mm = $('#main'); if (mm) { mm.setAttribute('tabindex', '-1'); mm.focus({ preventScroll: true }); } }
    first = false;
    updateTop();
  }

  async function transition(fn, full) {
    if (reduce) { fn(); return; }                          /* sem véu nem esperas para quem prefere menos movimento */
    try {
      if (full) { veil.classList.add('on'); await wait(400); }
      else { const m = $('#main'); if (m) { m.classList.remove('in'); m.classList.add('out'); await wait(260); } }
      fn();
      if (full) await wait(80);
    } finally { veil.classList.remove('on'); }
  }

  /* Fila: cliques rápidos nunca deixam a URL diferente do conteúdo */
  let busy = false, last = location.hash;
  async function sync() {
    if (busy) return; busy = true;
    try {
      while (location.hash !== last) {
        const prev = last; last = location.hash;
        await transition(render, (prev.split('/')[1] || '') !== (last.split('/')[1] || ''));
      }
    } finally { busy = false; }
  }
  window.addEventListener('hashchange', sync);

  /* Botão flutuante "voltar ao topo": aparece depois de rolar um pouco */
  const updateTop = () => { const b = $('.totop'); if (b) b.classList.toggle('show', scrollY > Math.min(400, innerHeight * 0.5)); };
  addEventListener('scroll', updateTop, { passive: true });

  async function toggleLang() {
    busy = true; lang = lang === 'pt' ? 'en' : 'pt';
    try { localStorage.setItem('cd-lang', lang); } catch (x) {}
    const y = scrollY;
    try { await transition(() => { current = null; render({ quiet: true, keepScroll: true }); scrollTo({ top: y, behavior: 'instant' }); }, false); }
    finally { busy = false; }
    sync();
  }

  document.addEventListener('click', (e) => {
    const g = e.target.closest('[data-go]'), s = e.target.closest('#switch'), l = e.target.closest('#lang');
    if (g) go(g.dataset.go, 'home');
    if (s) { const r = route(); go(r.theme === 'chaos' ? 'deva' : 'chaos', r.page); }
    if (l && !busy) toggleLang();
    if (e.target.closest('[data-top]')) {
      scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
      const mm = $('#main'); if (mm) { mm.setAttribute('tabindex', '-1'); mm.focus({ preventScroll: true }); }   /* o botão some; o foco vai ao conteúdo */
    }
    if (e.target.closest('[data-skip]')) { e.preventDefault(); const mm = $('#main'); if (mm) { mm.setAttribute('tabindex', '-1'); mm.focus(); } }
  });

  /* ---------- Céu estrelado (decorativo) ---------- */
  (function sky() {
    const c = $('#sky'), x = c.getContext('2d');
    const touch = matchMedia('(hover: none)').matches;      /* celular/tablet: sem mouse */
    let w = 0, h = 0, dpr = 1, stars = [], mx = 0, my = 0, tx = 0, ty = 0, sy = 0, ax = 0, ay = 0, raf = 0, lastT = 0, rt = 0;
    const wrap = (v, m) => ((v % m) + m) % m;
    const ease = touch ? 0.09 : 0.05;

    if (!reduce) {
      const k = touch ? 0.12 : 0.04;                        /* telas pequenas precisam de mais amplitude */
      addEventListener('pointermove', (e) => { tx = (e.clientX - innerWidth / 2) * k; ty = (e.clientY - innerHeight / 2) * k; }, { passive: true });
      addEventListener('scroll', () => { sy = scrollY * 0.18; }, { passive: true });
      if (touch && 'DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
        addEventListener('deviceorientation', (e) => {         /* Android: inclinar o aparelho move o céu (iOS exige permissão) */
          if (e.gamma == null) return;
          tx = Math.max(-40, Math.min(40, e.gamma)) * 1.2; ty = Math.max(-40, Math.min(40, (e.beta || 45) - 45)) * 1.2;
        }, { passive: true });
      }
    }

    const paint = (tm) => {
      x.clearRect(0, 0, w, h);
      const ox = mx + ax, oy = my + ay + sy;
      stars.forEach((s) => {
        x.globalAlpha = reduce ? .5 : .25 + .45 * Math.abs(Math.sin(tm / 2400 + s.p));
        x.fillStyle = s.c; x.beginPath();
        x.arc(wrap(s.x - ox * s.r * 1.5, w), wrap(s.y - oy * s.r * 1.5, h), s.r, 0, 6.28); x.fill();
      });
    };
    const frame = (tm) => {
      raf = 0;
      if (document.hidden) return;                           /* aba oculta: nada de desenho */
      if (!touch || tm - lastT >= 33) {                      /* celular: 30 quadros/s */
        lastT = tm; mx += (tx - mx) * ease; my += (ty - my) * ease;
        if (touch) { ax = Math.sin(tm / 7000) * 16; ay = Math.cos(tm / 9000) * 12; }
        paint(tm);
      }
      raf = requestAnimationFrame(frame);
    };
    const size = () => {
      const nw = innerWidth, nh = innerHeight;
      if (w && nw === w && Math.abs(nh - h) <= 150) return;  /* barra do navegador mobile: ignora variações pequenas */
      const regen = !stars.length || nw !== w;
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = nw; h = nh; c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (regen) {
        const hue = ['#E0E6ED', '#8DA9C4', '#DFB15B', '#A78BFA'];
        const n = Math.min(160, Math.max(touch ? 95 : 0, Math.floor(w * h / 9000)));
        stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.2 + .3) * (touch ? 1.25 : 1), p: Math.random() * 6.28, c: hue[Math.floor(Math.random() * 4)] }));
      }
      if (reduce) paint(0);
    };
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(size, 150); });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && !raf && !reduce) raf = requestAnimationFrame(frame); });
    size(); if (!reduce) raf = requestAnimationFrame(frame);
  })();

  render();
})();
