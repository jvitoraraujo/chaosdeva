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
    ? '<img src="assets/chaos-logo.svg" alt="CHAOS" width="260">' : '<img src="assets/deva-simbolo.svg" alt="DEVA" width="400">';

  function home(theme, t) {
    const c = t[theme], n = t.nav;
    return `<section class="hero"><div>
      <p class="role">${esc(c.role)}</p><h1>${esc(A.name)}</h1><p class="lead">${esc(c.lead)}</p>
      ${theme === 'chaos' ? `<p class="tagline">${esc(c.tagline)}</p>` : `<p class="mono" style="margin-top:20px">${esc(c.tagline)}</p>`}
      <div class="actions"><a class="btn primary" href="#/${theme}/projetos">${esc(c.cta1)}</a><a class="btn ghost" href="#/${theme}/sobre">${esc(c.cta2)}</a></div>
    </div><div class="emblem">${emblem(theme)}</div></section>${divider(theme)}
    <section><h2>${esc(n.marcas)}</h2><p class="muted">${esc(t.marcas.intro)}</p><a class="btn ghost" href="#/${theme}/marcas">${esc(n.marcas)}</a></section>`;
  }

  function projetos(theme, t) {
    const c = t[theme];
    const cards = window.PROJECTS.map((p) => `<article class="card"><h3 class="t">${esc(p.name)}</h3><p class="muted">${esc(p[lang])}</p>
      <div class="tags"><span class="tag">${esc(p.stack)}</span><span class="tag state">${esc(t.status[p.status] || p.status)}</span>${p.draft ? `<span class="tag draft">${esc(t.draft)}</span>` : ''}</div>
      <a class="more" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(t.repo)} →</a></article>`).join('');
    return `<h1>${esc(c.projH)}</h1><p class="lead muted">${esc(c.projP)}</p>${divider(theme)}<div class="grid">${cards}</div>`;
  }

  function sobre(theme, t) {
    const c = t[theme];
    return `<h1>${esc(c.aboutH)}</h1>${divider(theme)}<div class="about"><div><p>${esc(c.aboutP1)}</p><p class="muted">${esc(c.aboutP2)}</p>
      <p class="mono">${esc(c.role)}</p></div><div><h3>${esc(c.contactH)}</h3><ul class="links">
      <li><a href="${A.github}" target="_blank" rel="noopener">GitHub<span>jvitoraraujo</span></a></li>
      <li><a href="${A.linkedin}" target="_blank" rel="noopener">LinkedIn<span>Vitor Araújo</span></a></li>
      <li><a href="mailto:${A.email}">E-mail<span>${A.email}</span></a></li></ul></div></div>`;
  }

  const sw = (list) => `<div class="sw">${list.map(([n, h]) => `<div><b style="background:${h}"></b><small>${n}<br>${h}</small></div>`).join('')}</div>`;
  function marcas(theme, t) {
    const m = t.marcas;
    const panel = (k, logo, pal) => `<article class="panel" data-theme="${k}"><div class="logo"><img src="${logo}" alt="${m[k].h}"></div>
      <h2>${m[k].h}</h2><p>${esc(m[k].p1)}</p><p class="muted">${esc(m[k].p2)}</p><h3>${esc(m[k].pal)}</h3>${sw(pal)}</article>`;
    return `<h1>${esc(m.h)}</h1><p class="lead muted">${esc(m.intro)}</p><div class="pair">
      ${panel('chaos', 'assets/chaos-simbolo.svg', [['Void', '#000000'], ['Dust', '#111418'], ['Moonlight', '#E0E6ED'], ['Amethyst', '#8B5CF6'], ['Nebula', '#0369A1']])}
      ${panel('deva', 'assets/deva-sigilo.svg', [['Canvas', '#050811'], ['Surface', '#0B111E'], ['Parchment', '#E2E8F0'], ['Gold', '#DFB15B'], ['Celestial', '#8DA9C4']])}
    </div><p class="note">${esc(m.note)}</p>`;
  }
  const views = { home, projetos, sobre, marcas };

  /* ---------- Portal ---------- */
  function gateHTML(t) {
    return `<div class="gate"><button class="pill lang" id="lang" aria-label="Idioma / Language">${t.langBtn}</button>
      <h1>ChaosDeva</h1><p>${esc(t.gate.sub)}</p>
      <div class="choices">
        <button class="choice chaos" data-go="chaos"><img src="assets/chaos-simbolo.svg" alt=""><b>CHAOS</b><small>${esc(t.gate.pick)} →</small></button>
        <button class="choice deva" data-go="deva"><img src="assets/deva-sigilo.svg" alt=""><b>DEVA</b><small>${esc(t.gate.pick)} →</small></button>
      </div></div>`;
  }

  /* ---------- Render ---------- */
  function shell(theme, page, t) {
    const logo = theme === 'chaos' ? 'assets/chaos-simbolo.svg' : 'assets/deva-sigilo.svg';
    const nav = PAGES.map((p) => `<a href="#/${theme}/${p}" ${p === page ? 'aria-current="page"' : ''}>${esc(t.nav[p])}</a>`).join('');
    const other = theme === 'chaos' ? 'deva' : 'chaos';
    const foot = theme === 'deva' ? `${t.deva.footer} &nbsp;·&nbsp; ${t.deva.stamp}` : `${t.chaos.footer}`;
    return `<header class="top"><a class="brand" href="#/${theme}/home"><img src="${logo}" alt=""><span>${theme.toUpperCase()}</span></a>
      <nav aria-label="Principal">${nav}</nav><div class="ctl">
      <button class="pill switch" id="switch" aria-label="${theme.toUpperCase()} → ${other.toUpperCase()}">${theme.toUpperCase()} <i>⇄</i> ${other.toUpperCase()}</button>
      <button class="pill" id="lang" aria-label="Idioma / Language">${t.langBtn}</button></div></header>
      <main id="main" class="in">${views[page](theme, t)}</main>
      <footer>${foot}<br><a href="${A.github}" target="_blank" rel="noopener">GitHub</a> · <a href="${A.linkedin}" target="_blank" rel="noopener">LinkedIn</a> · <a href="mailto:${A.email}">E-mail</a></footer>`;
  }

  let current = null;
  function render() {
    const r = route(), t = window.I18N[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    const fav = $('#fav');
    if (!r.theme) {
      document.body.removeAttribute('data-theme'); document.body.classList.add('mix');
      app.innerHTML = gateHTML(t); document.title = 'ChaosDeva'; fav.href = 'assets/deva-sigilo.svg';
    } else {
      document.body.setAttribute('data-theme', r.theme); document.body.classList.toggle('mix', r.page === 'marcas');
      const keepShell = current && current.theme === r.theme && current.lang === lang && $('#main');
      if (keepShell) {
        $('#main').innerHTML = views[r.page](r.theme, t);
        document.querySelectorAll('nav a').forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === `#/${r.theme}/${r.page}`));
        document.querySelectorAll('nav a[aria-current]').forEach((a) => a.setAttribute('aria-current', 'page'));
        const m = $('#main'); m.classList.remove('in'); void m.offsetWidth; m.classList.add('in');
      } else { app.innerHTML = shell(r.theme, r.page, t); }
      document.title = `${t.title[r.page]} · ${r.theme.toUpperCase()} · ChaosDeva`;
      fav.href = r.theme === 'chaos' ? 'assets/chaos-simbolo.svg' : 'assets/deva-sigilo.svg';
    }
    current = { theme: r.theme, lang };
    scrollTo(0, 0);
  }

  async function transition(fn, full) {
    if (full) { veil.classList.add('on'); await wait(400); }
    else { const m = $('#main'); if (m) { m.classList.remove('in'); m.classList.add('out'); await wait(260); } }
    fn(); if (full) { await wait(80); veil.classList.remove('on'); }
  }

  let busy = false, last = location.hash;
  window.addEventListener('hashchange', async () => {
    if (busy) return; busy = true;
    const a = last.split('/')[1] || '', b = location.hash.split('/')[1] || '';
    await transition(render, a !== b); last = location.hash; busy = false;
  });

  document.addEventListener('click', async (e) => {
    const g = e.target.closest('[data-go]'), s = e.target.closest('#switch'), l = e.target.closest('#lang');
    if (g) go(g.dataset.go, 'home');
    if (s) { const r = route(); go(r.theme === 'chaos' ? 'deva' : 'chaos', r.page); }
    if (l && !busy) {
      busy = true; lang = lang === 'pt' ? 'en' : 'pt';
      try { localStorage.setItem('cd-lang', lang); } catch (x) {}
      await transition(() => { current = null; render(); }, false); busy = false;
    }
  });

  /* ---------- Céu estrelado (decorativo) ---------- */
  (function sky() {
    const c = $('#sky'), x = c.getContext('2d'); let w, h, stars = [];
    const size = () => {
      w = c.width = innerWidth; h = c.height = innerHeight;
      const hue = ['#E0E6ED', '#8DA9C4', '#DFB15B', '#A78BFA'];
      stars = Array.from({ length: Math.min(160, Math.floor(w * h / 9000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + .3, p: Math.random() * 6.28, c: hue[Math.floor(Math.random() * 4)] }));
    };
    const draw = (tm) => {
      x.clearRect(0, 0, w, h);
      stars.forEach((s) => { x.globalAlpha = reduce ? .5 : .25 + .45 * Math.abs(Math.sin(tm / 2400 + s.p)); x.fillStyle = s.c; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.28); x.fill(); });
      if (!reduce) requestAnimationFrame(draw);
    };
    addEventListener('resize', size); size(); requestAnimationFrame(draw);
  })();

  render();
})();
