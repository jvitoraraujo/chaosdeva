"""Teste de fumaça: abre todas as rotas (2 marcas x 4 páginas + portal) em desktop e celular,
nos dois idiomas, e falha se houver erro de JavaScript, conteúdo vazio, imagem quebrada ou rolagem horizontal.
Uso: python tests/smoke.py   (requer: pip install playwright && playwright install chromium)"""
import functools, http.server, json, pathlib, socketserver, sys, threading
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
ROUTES = ['#/'] + [f'#/{t}/{p}' for t in ('chaos', 'deva') for p in ('home', 'projetos', 'sobre', 'marcas')]
VIEWS = [('desktop', {'width': 1280, 'height': 800}), ('celular', {'width': 390, 'height': 800})]
MOCK = [{'name': 'exemplo', 'description': 'Projeto de teste', 'language': 'Python', 'topics': [], 'stargazers_count': 1, 'forks_count': 0,
         'fork': False, 'archived': False, 'html_url': 'https://github.com/x/y', 'homepage': '', 'pushed_at': '2026-10-01T00:00:00Z'}]

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

def main():
    srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{srv.server_address[1]}/index.html'
    fails = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for vname, vp in VIEWS:
            for lang in ('pt', 'en'):
                ctx = browser.new_context(viewport=vp)
                ctx.add_init_script(f"try{{localStorage.setItem('cd-lang','{lang}')}}catch(e){{}}")
                ctx.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, content_type='text/css', body=''))
                ctx.route('https://fonts.gstatic.com/**', lambda r: r.abort())
                ctx.route('https://api.github.com/**', lambda r: r.fulfill(status=200, content_type='application/json', body=json.dumps(MOCK)))
                page = ctx.new_page(); errs = []
                page.on('pageerror', lambda e: errs.append(str(e)))
                for route in ROUTES:
                    tag = f'{vname}/{lang}/{route}'; errs.clear()
                    page.goto(base + route); page.wait_for_timeout(900)
                    h1 = page.evaluate("(document.querySelector('h1')||{}).textContent||''").strip()
                    broken = page.evaluate("[...document.images].filter(i=>i.complete&&!i.naturalWidth&&i.loading!=='lazy').map(i=>i.src)")
                    overflow = page.evaluate("document.documentElement.scrollWidth>innerWidth+1")
                    if errs: fails.append(f'{tag}: erro de JS: {errs[0]}')
                    if not h1: fails.append(f'{tag}: sem título (h1 vazio)')
                    if broken: fails.append(f'{tag}: imagem quebrada: {broken[0]}')
                    if overflow: fails.append(f'{tag}: rolagem horizontal')
                    if route.endswith('projetos') and 'exemplo' not in page.inner_text('#repos').lower() and 'example' not in page.inner_text('#repos').lower():
                        fails.append(f'{tag}: projetos não carregaram')
                ctx.close()
        browser.close()
    srv.shutdown()
    total = len(ROUTES) * len(VIEWS) * 2
    if fails:
        print(f'FALHOU ({len(fails)} problema(s) em {total} verificações):'); [print(' -', f) for f in fails]; sys.exit(1)
    print(f'OK: {total} verificações sem problemas.')

if __name__ == '__main__': main()
