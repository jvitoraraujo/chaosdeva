# CHAOS / DEVA

Portfólio estático (GitHub Pages) de Vitor Araújo, em duas identidades visuais independentes: **CHAOS** e **DEVA**.
Mesmo conteúdo, duas estéticas, dois idiomas (PT-BR / EN-US) e um portal de seleção.

**Site:** https://jvitoraraujo.github.io/chaosdeva/

## Estrutura

```
├── index.html              # Página única (SPA com rotas por hash: #/chaos/home, #/deva/projetos…)
├── css/style.css           # Tokens CHAOS e DEVA escopados por [data-theme]
├── js/
│   ├── content.js          # TODO o conteúdo editável (textos PT/EN, bio, configuração dos projetos)
│   ├── rank.js             # Ranqueamento dos repositórios (usado pelo site e pela Action)
│   └── app.js              # Rotas, temas, idioma, transições e céu estrelado
├── assets/                 # Logos oficiais (SVG otimizados), og-image.jpg e icons/ (favicon CD)
├── data/projects.json      # Gerado pela Action; o site o lê primeiro
├── scripts/build-projects.mjs
├── tests/smoke.py          # Teste de fumaça (36 verificações)
├── .github/workflows/      # projects.yml (atualiza projetos) e smoke.yml (testes)
├── manifest.webmanifest · robots.txt · sitemap.xml · 404.html · LICENSE
```

## Publicar

1. Envie todo o conteúdo para o repositório `chaosdeva` (inclusive `.nojekyll` e `.github/`).
2. *Settings → Pages → Deploy from a branch → main → / (root)*.
3. Em *Settings → Actions → General → Workflow permissions*, marque **Read and write permissions** (a Action grava `data/projects.json`).
4. Em *Actions → Atualizar projetos → Run workflow*, rode uma vez para gerar os projetos. Depois ela roda todo dia sozinha.

## Como editar

| O quê | Onde |
|---|---|
| Textos, bios, rodapé, idiomas | `js/content.js` (PT-BR e EN-US lado a lado) |
| Projetos exibidos | Automático: os 6 repositórios próprios mais relevantes (sem forks e arquivados). Ajuste `GH.limit`, `GH.pin` (fixar) e `GH.exclude` (ocultar) em `js/content.js` |
| Capa de um projeto | `GH.covers = { 'nome-do-repo': 'assets/covers/nome.webp' }` |
| Bio extra (stack, trajetória, formação…) | Objeto `PROFILE` em `js/content.js`; campos vazios não aparecem |
| Aparência | `css/style.css` |

**Projetos:** o site lê `data/projects.json` (rápido, sem limite de requisições). Se o arquivo ainda não foi gerado, usa a API pública do GitHub como reserva, com cache de 30 minutos.

## Testes

```bash
pip install playwright && playwright install chromium
python tests/smoke.py
```

Abre as 9 rotas em desktop e celular, nos dois idiomas, e falha se houver erro de JavaScript, título vazio, imagem quebrada ou rolagem horizontal. Também roda no GitHub a cada push.

## Fontes (Google Fonts)

As fontes (Cinzel, Cinzel Decorative, Inter, JetBrains Mono) são carregadas do Google sem bloquear a página, só nos pesos usados. Para hospedá-las no próprio repositório (mais rápido e sem enviar o IP do visitante ao Google), baixe os `.woff2` desses pesos, coloque em `assets/fonts/`, declare-os com `@font-face` no início de `css/style.css` e remova os links do Google em `index.html`.

## Licença

© CHAOS / DEVA - 2026. Todos os direitos reservados.

O código, os textos e as identidades visuais (logos, símbolos, wordmarks e ícones) deste repositório não podem ser copiados, modificados ou redistribuídos sem autorização expressa do autor. Veja [`LICENSE`](LICENSE).
