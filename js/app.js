(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const app = $('#app'), veil = $('#veil');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const A = window.AUTHOR, PAGES = ['home', 'projetos', 'sobre', 'marcas'];
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

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
  const divider = (theme) => theme === 'deva' ? '<div class="div" aria-hidden="true">✦ . * . ⟡ . * . ✦</div>' : '<div class="div" aria-hidden="true">✦</div>';
  const emblem = (theme) => theme === 'chaos'
    ? '<img src="assets/chaos-logo.svg" alt="CHAOS" width="260" height="371" decoding="async">' : '<img src="assets/deva-lockup-vertical.png" alt="DEVA" width="420" height="362" decoding="async">';

  function home(theme, t) {
    const c = t[theme], n = t.nav;
    return `<section class="hero"><div>
      <p class="role">${esc(c.role)}</p><h1>${esc(A.name)}</h1><p class="lead">${esc(c.lead)}</p>
      ${theme === 'chaos' ? `<p class="tagline">${esc(c.tagline)}</p>` : `<p class="mono" style="margin-top:20px">${esc(c.tagline)}</p>`}
      <div class="home-terminal mono">
        <div>${esc(c.termL1)}</div>
        <div>${esc(c.termL2)}</div>
        <div>${esc(c.termL3)}</div>
        <div>${esc(c.termL4)}</div>
        <div>${esc(c.termL5)}</div>
        <div>${esc(c.termL6)}</div>
      </div>
      <div class="home-tags">
        <span class="mono">${esc(c.tagsLabel)}</span>
        <div class="tags">
          ${c.tags.map(tag => `<span class="tag">${esc(tag)}</span>`).join('')}
        </div>
      </div>
    </div><div class="emblem">${emblem(theme)}</div></section>${divider(theme)}`;
  }

  /* Projetos importados do GitHub */
  const GH = window.GH; let repos = null;
  const rank = (all) => {
    const ex = GH.exclude.map((x) => x.toLowerCase()), now = Date.now();
    const score = (r) => {
      const months = (now - new Date(r.pushed_at)) / 2.63e9;
      return (GH.pin.includes(r.name) ? 100 : 0) + r.stargazers_count * 4 + r.forks_count * 3 + (r.homepage ? 2 : 0) + (r.description ? 2 : 0) + (months <= 6 ? 3 : months <= 12 ? 1 : 0);
    };
    return all.filter((r) => !r.fork && !r.archived && !r.disabled && !ex.includes(r.name.toLowerCase()))
      .sort((x, y) => score(y) - score(x) || new Date(y.pushed_at) - new Date(x.pushed_at)).slice(0, GH.limit);
  };
  async function loadRepos() {
    if (repos) return;
    try { const c = JSON.parse(sessionStorage.getItem('cd-repos') || 'null'); if (c && Date.now() - c.t < 18e5) { repos = c.d; return; } } catch (e) {}
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 8000);
    const res = await fetch(`https://api.github.com/users/${GH.user}/repos?per_page=100&sort=pushed`, { headers: { Accept: 'application/vnd.github+json' }, signal: ctl.signal }).finally(() => clearTimeout(to));
    if (!res.ok) throw new Error(res.status);
    repos = rank(await res.json());
    try { sessionStorage.setItem('cd-repos', JSON.stringify({ t: Date.now(), d: repos })); } catch (e) {}
  }
  const repoCards = (t) => repos.length ? repos.map((r) => {
    const tags = [r.language, ...(r.topics || []).slice(0, 2)].filter(Boolean).map((x) => `<span class="tag">${esc(x)}</span>`).join('');
    const star = r.stargazers_count ? `<span class="tag">★ ${r.stargazers_count}</span>` : '';
    const date = new Date(r.pushed_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
    return `<article class="card"><h3 class="t">${esc(r.name)}</h3><p class="muted">${esc(r.description || t.noDesc)}</p>
      <div class="tags">${tags}${star}</div><p class="mono" style="margin:12px 0 0">${esc(t.updated)} ${esc(date)}</p>
      <a class="more" href="${esc(r.html_url)}" target="_blank" rel="noopener">${esc(t.repo)} →</a>${r.homepage && /^https?:/.test(r.homepage) ? ` <a class="more" style="margin-left:14px" href="${esc(r.homepage)}" target="_blank" rel="noopener">Demo →</a>` : ''}</article>`;
  }).join('') : `<p class="muted">${esc(t.failed)}</p>`;
  async function fillRepos(t) {
    const box = () => $('#repos');
    try { await loadRepos(); if (box()) box().innerHTML = repoCards(t); }
    catch (e) { if (box()) box().innerHTML = `<p class="muted">${esc(t.failed)}</p>`; }
  }
  function projetos(theme, t) {
    const c = t[theme];
    return `<h1>${esc(c.projH)}</h1><p class="lead muted">${esc(c.projP)}</p>${divider(theme)}
      <div class="grid" id="repos" aria-live="polite">${repos ? repoCards(t) : `<p class="muted">${esc(t.loading)}</p>`}</div>
      <p style="margin-top:28px"><a class="btn ghost" href="${A.github}?tab=repositories" target="_blank" rel="noopener">${esc(t.allRepos)} →</a></p>`;
  }

  function profile(t) {
    const P = window.PROFILE, L = t.profile, out = [];
    const sec = (k, body) => out.push(`<h3 style="margin-top:28px">${esc(L[k])}</h3>${body}`);
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
      <p class="mono">${esc(c.role)}</p>${profile(t)}</div><div><h3>${esc(c.contactH)}</h3><ul class="links">
      <li><a href="${A.github}" target="_blank" rel="noopener">GitHub<span>jvitoraraujo</span></a></li>
      <li><a href="${A.linkedin}" target="_blank" rel="noopener">LinkedIn<span>Vitor Araújo</span></a></li>
      <li><a href="mailto:${A.email}">E-mail<span>${A.email}</span></a></li></ul></div></div>`;
  }

  const sw = (list) => `<div class="sw">${list.map(([n, h]) => `<div><b style="background:${h}"></b><small>${n}<br>${h}</small></div>`).join('')}</div>`;
  function marcas(theme, t) {
    const m = t.marcas;
    const panel = (k, logo, pal) => `<article class="panel" data-theme="${k}"><div class="logo"><img src="${logo}" alt="${m[k].h}"></div>
      <h2>${m[k].h}</h2><p>${esc(m[k].p1)}</p><p class="muted">${esc(m[k].p2)}</p><h3>${esc(m[k].pal)}</h3>${sw(pal)}</article>`;
    const how = m.how.map((x) => `<article class="card"><h3 class="t">${esc(x.t)}</h3><p class="muted">${esc(x.p)}</p></article>`).join('');
    return `<h1>${esc(m.h)}</h1><p class="lead muted">${esc(m.intro)}</p>
      <section style="margin-top:32px"><h2>${esc(m.umbrellaH)}</h2><p>${esc(m.umbrellaP)}</p></section>
      <section style="margin-top:32px"><h3>${esc(m.howH)}</h3><div class="grid">${how}</div></section>${divider(theme)}
      <h2>${esc(m.brandsH)}</h2><div class="pair">
      ${panel('chaos', 'assets/chaos-simbolo.svg', [['Void', '#000000'], ['Dust', '#111418'], ['Moonlight', '#E0E6ED'], ['Amethyst', '#8B5CF6'], ['Nebula', '#0369A1']])}
      ${panel('deva', 'assets/deva-sigilo.svg', [['Canvas', '#050811'], ['Surface', '#0B111E'], ['Parchment', '#E2E8F0'], ['Gold', '#DFB15B'], ['Celestial', '#8DA9C4']])}
    </div>`;
  }
  const views = { home, projetos, sobre, marcas };

  /* ---------- Portal ---------- */
  function gateHTML(t) {
    return `<div class="gate"><button class="pill lang" id="lang" aria-label="Idioma / Language">${t.langBtn}</button>
      <h1>CHAOS / DEVA</h1><p>${esc(t.gate.sub)}</p>
      <div class="choices">
        <button class="choice chaos" data-go="chaos"><img src="assets/chaos-simbolo.svg" alt=""><img class="wm" src="assets/chaos-wordmark.svg" alt="CHAOS" height="36"><small>${esc(t.gate.pick)} →</small></button>
        <button class="choice deva" data-go="deva"><img src="assets/deva-simbolo.svg" alt=""><b>DEVA</b><small>${esc(t.gate.pick)} →</small></button>
      </div></div>`;
  }

  /* ---------- Render ---------- */
  function shell(theme, page, t) {
    const logo = theme === 'chaos' ? 'assets/chaos-simbolo.svg' : 'assets/deva-sigilo.svg';
    const nav = PAGES.map((p) => `<a href="#/${theme}/${p}" ${p === page ? 'aria-current="page"' : ''}>${esc(t.nav[p])}</a>`).join('');
    const other = theme === 'chaos' ? 'deva' : 'chaos';
    const foot = theme === 'deva' ? `${t.deva.footer} &nbsp;·&nbsp; ${t.deva.stamp}` : `${t.chaos.footer}`;
    return `<header class="top"><a class="brand" href="#/${theme}/home"><img src="${logo}" alt=""><span>${theme.toUpperCase()}</span></a>
      <nav aria-label="${esc(t.navLabel)}">${nav}</nav><div class="ctl">
      <button class="pill switch" id="switch" aria-label="${theme.toUpperCase()} → ${other.toUpperCase()}">${theme.toUpperCase()} <i>⇄</i> ${other.toUpperCase()}</button>
      <button class="pill" id="lang" aria-label="Idioma / Language">${t.langBtn}</button></div></header>
      <main id="main" class="in">${views[page](theme, t)}</main>
      <footer>${foot}<br>${esc(t.rights)}<br><a href="${A.github}" target="_blank" rel="noopener">GitHub</a> · <a href="${A.linkedin}" target="_blank" rel="noopener">LinkedIn</a> · <a href="mailto:${A.email}">E-mail</a></footer>`;
  }

  let current = null;
  function render() {
    const r = route(), t = window.I18N[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    if (!r.theme) {
      document.body.removeAttribute('data-theme'); document.body.classList.add('mix');
      app.innerHTML = gateHTML(t); document.title = 'CHAOS / DEVA';
    } else {
      document.body.setAttribute('data-theme', r.theme); document.body.classList.toggle('mix', r.page === 'marcas');
      const keepShell = current && current.theme === r.theme && current.lang === lang && $('#main');
      if (keepShell) {
        $('#main').innerHTML = views[r.page](r.theme, t);
        document.querySelectorAll('nav a').forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === `#/${r.theme}/${r.page}`));
        document.querySelectorAll('nav a[aria-current]').forEach((a) => a.setAttribute('aria-current', 'page'));
        const m = $('#main'); m.classList.remove('in', 'out'); void m.offsetWidth; m.classList.add('in');
      } else { app.innerHTML = shell(r.theme, r.page, t); }
      document.title = `${r.theme.toUpperCase()} · ${t.title[r.page]} | CHAOS / DEVA`;
    }
    current = { theme: r.theme, lang };
    if (r.theme && r.page === 'projetos') fillRepos(t);
    scrollTo({ top: 0, behavior: 'instant' });
    const mm = $('#main'); if (mm && window.__nav) { mm.setAttribute('tabindex', '-1'); mm.focus({ preventScroll: true }); }
    window.__nav = true;
  }

  async function transition(fn, full) {
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

  document.addEventListener('click', async (e) => {
    const g = e.target.closest('[data-go]'), s = e.target.closest('#switch'), l = e.target.closest('#lang');
    if (g) go(g.dataset.go, 'home');
    if (s) { const r = route(); go(r.theme === 'chaos' ? 'deva' : 'chaos', r.page); }
    if (l && !busy) {
      busy = true; lang = lang === 'pt' ? 'en' : 'pt';
      try { localStorage.setItem('cd-lang', lang); } catch (x) {}
      try { await transition(() => { current = null; render(); }, false); } finally { busy = false; }
      sync();
    }
  });

  /* ---------- Céu estrelado (decorativo, com parallax sutil ao mover o mouse) ---------- */
  (function sky() {
    const c = $('#sky'), x = c.getContext('2d');
    let w = 0, h = 0, stars = [], mx = 0, my = 0, tx = 0, ty = 0;
    const wrap = (v, m) => ((v % m) + m) % m;

    if (!reduce) {
      addEventListener('mousemove', (e) => {
        tx = (e.clientX - innerWidth / 2) * 0.04;
        ty = (e.clientY - innerHeight / 2) * 0.04;
      });
    }

    const paint = (tm) => {
      x.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        x.globalAlpha = reduce ? .5 : .25 + .45 * Math.abs(Math.sin(tm / 2400 + s.p));
        x.fillStyle = s.c;
        x.beginPath();
        /* wrap: estrelas deslocadas pelo parallax reentram pela borda oposta, sem faixas vazias */
        x.arc(wrap(s.x - mx * s.r * 1.5, w), wrap(s.y - my * s.r * 1.5, h), s.r, 0, 6.28);
        x.fill();
      });
    };
    const draw = (tm) => {
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      paint(tm);
      if (!reduce) requestAnimationFrame(draw);
    };
    const size = () => {
      const nw = innerWidth, nh = innerHeight;
      /* Só recria as estrelas se a largura mudar ou a altura variar muito (evita "piscar" quando a barra do navegador mobile some/aparece) */
      const regen = !stars.length || nw !== w || Math.abs(nh - h) > 150;
      w = c.width = nw; h = c.height = nh;
      if (regen) {
        const hue = ['#E0E6ED', '#8DA9C4', '#DFB15B', '#A78BFA'];
        stars = Array.from({ length: Math.min(160, Math.floor(w * h / 9000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + .3, p: Math.random() * 6.28, c: hue[Math.floor(Math.random() * 4)] }));
      }
      if (reduce) paint(0); /* sem animação, o redimensionamento limpa o canvas: repinta uma vez */
    };
    addEventListener('resize', size); size(); if (!reduce) requestAnimationFrame(draw);
  })();

  render();
})();
