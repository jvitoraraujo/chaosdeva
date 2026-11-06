/* Conteúdo editável. Textos em PT-BR e EN-US; projetos na lista PROJECTS. */
window.AUTHOR = {
  name: 'Vitor Araújo',
  github: 'https://github.com/jvitoraraujo',
  linkedin: 'https://www.linkedin.com/in/vitor-ara%C3%BAjo-55a98942b',
  email: 'vitoraraujo02@gmail.com'
};

/* Projetos: importados ao vivo de github.com/<user> (API pública) e ranqueados por relevância.
   pin: nomes de repositórios sempre exibidos primeiro; exclude: nomes a ocultar. */
window.GH = { user: 'jvitoraraujo', limit: 6, pin: [], exclude: ['chaosdeva', 'jvitoraraujo'] };

/* Bio do "Sobre": preencha o que quiser; campos vazios não aparecem no site.
   Sugestões: highlights (3 a 4 frases curtas), stack, experience, education, interests, languages.
   Exemplos de formato (descomente e edite):
   highlights:[{pt:'Arquitetura de software',en:'Software architecture'}],
   stack:['Python','TypeScript'],
   experience:[{role:'Cargo',org:'Empresa',period:'2022 — hoje',pt:'O que você fez.',en:'What you did.'}],
   education:[{title:'Curso',org:'Instituição',period:'2016 — 2021'}],
   interests:[{pt:'Jogos autorais',en:'Authorial games'}],
   languages:[{pt:'Português (nativo)',en:'Portuguese (native)'}] */
window.PROFILE = { highlights: [], stack: [], experience: [], education: [], interests: [], languages: [] };

window.I18N = {
  pt: {
    langBtn: 'EN-US', switchTo: { chaos: 'DEVA', deva: 'CHAOS' },
    nav: { home: 'Home', projetos: 'Projetos', sobre: 'Sobre', marcas: 'Marcas' },
    gate: { sub: 'Duas identidades, um mesmo portfólio. Escolha o céu que deseja atravessar.', pick: 'Entrar', common: 'Conhecer as marcas' },
    title: { home: 'Home', projetos: 'Projetos', sobre: 'Sobre', marcas: 'Marcas' },
    chaos: {
      role: 'Software Architecture & Digital Crafts',
      tagline: 'A massa informe onde os elementos repousam em eterno conflito.',
      lead: 'Código e arquitetura como imposição de lógica sobre o abismo. Sistemas construídos com precisão, a partir do que não tinha forma.',
      cta1: 'Ver projetos', cta2: 'Sobre mim',
      projH: 'Projetos', projP: 'Fragmentos de trabalho, organizados a partir do caos. Os repositórios completos estão no GitHub.',
      aboutH: 'Sobre', aboutP1: 'Sou Vitor Araújo. Trabalho com arquitetura de software e construção digital, buscando ordem e clareza onde há ruído.',
      aboutP2: 'A marca CHAOS nasce dessa ideia: o abismo informe é o ponto de partida, e a lógica é o ritual que lhe dá forma.',
      contactH: 'Inscrições', footer: 'C H A O S'
    },
    deva: {
      role: 'Software Architecture & Digital Crafts',
      tagline: 'Misticismo, dados e tecnologia.',
      lead: 'Uma cartografia do conhecimento. Cada projeto é uma constelação dentro do mesmo céu: rigor de engenharia, execução precisa.',
      cta1: 'Ver projetos', cta2: 'Sobre mim',
      projH: 'Projetos', projP: 'Cada projeto, uma constelação. Os registros completos estão no GitHub.',
      aboutH: 'Sobre', aboutP1: 'Sou Vitor Araújo. Mapeio problemas complexos e os converto em sistemas legíveis, sustentáveis e bem documentados.',
      aboutP2: 'A marca DEVA organiza esse trabalho como um arquivo estelar: dados, código e narrativa conectados em constelações.',
      contactH: 'Registro de contato', footer: 'DEVA ARCHIVE // PORTFÓLIO', stamp: 'Registro 2026.11'
    },
    marcas: {
      h: 'Marcas', intro: 'Um autor, duas identidades. Entenda o conceito que as reúne e como cada marca funciona.',
      umbrellaH: 'Marca guarda-chuva', umbrellaP: 'ChaosDeva é o guarda-chuva sob o qual vivem as duas identidades de Vitor Araújo: CHAOS e DEVA. Há um único autor, com os mesmos dados de contato e o mesmo conteúdo, e duas formas distintas de apresentar o trabalho.',
      howH: 'Como funcionam', how: [
        { t: 'Independentes', p: 'CHAOS e DEVA são marcas paralelas. Nenhuma é submarca da outra, e logos, cores e ornamentos nunca se misturam.' },
        { t: 'Escolha por projeto', p: 'Em cada projeto, o autor decide qual marca vale. O conteúdo é o mesmo; mudam a linguagem visual e o tom.' },
        { t: 'Intensidade', p: 'O quanto da estética aparece depende do projeto: baixa (10–20%) em ferramentas e APIs, média (40–50%) em sites e interfaces, alta (70–90%) em jogos e obras autorais.' }],
      brandsH: 'As marcas',
      chaos: { h: 'CHAOS', p1: 'Inspirada em Caos, divindade primordial da tradição greco-romana: a massa informe e confusa onde terra, ar, água e fogo existiam em eterno conflito.',
        p2: 'Estética gótica e etérea: abismo negro, violeta ametista e luz de lua. O mistério mora nos títulos; a precisão mora no conteúdo.', pal: 'Paleta' },
      deva: { h: 'DEVA', p1: 'Uma cartografia do conhecimento que une misticismo, dados e tecnologia. Cada projeto é uma constelação do mesmo céu.',
        p2: 'Estética de cosmos e pergaminho: azul profundo, ouro estelar e azul celestial. A estética é mística; a execução é de engenharia.', pal: 'Paleta' },
      note: 'As marcas são paralelas: nenhuma é submarca da outra, e cada versão do site usa apenas a sua própria linguagem.'
    },
    loading: 'Importando projetos do GitHub…', failed: 'Não foi possível carregar os projetos agora.', allRepos: 'Todos os repositórios', noDesc: 'Sem descrição.', updated: 'Atualizado em',
    profile: { highlights: 'Em destaque', stack: 'Stack', experience: 'Trajetória', education: 'Formação', interests: 'Interesses', languages: 'Idiomas' },
    repo: 'Ver no GitHub'
  },
  en: {
    langBtn: 'PT-BR', switchTo: { chaos: 'DEVA', deva: 'CHAOS' },
    nav: { home: 'Home', projetos: 'Projects', sobre: 'About', marcas: 'Brands' },
    gate: { sub: 'Two identities, one portfolio. Choose the sky you wish to cross.', pick: 'Enter', common: 'Discover the brands' },
    title: { home: 'Home', projetos: 'Projects', sobre: 'About', marcas: 'Brands' },
    chaos: {
      role: 'Software Architecture & Digital Crafts',
      tagline: 'A massa informe onde os elementos repousam em eterno conflito.',
      lead: 'Code and architecture as logic imposed upon the abyss. Systems built with precision, from what once had no form.',
      cta1: 'View projects', cta2: 'About me',
      projH: 'Projects', projP: 'Fragments of work, ordered out of chaos. Full repositories live on GitHub.',
      aboutH: 'About', aboutP1: 'I am Vitor Araújo. I work in software architecture and digital craft, seeking order and clarity where there is noise.',
      aboutP2: 'The CHAOS brand comes from that idea: the formless abyss is the starting point, and logic is the ritual that gives it shape.',
      contactH: 'Inscriptions', footer: 'C H A O S'
    },
    deva: {
      role: 'Software Architecture & Digital Crafts',
      tagline: 'Mysticism, data and technology.',
      lead: 'A cartography of knowledge. Each project is a constellation within the same sky: engineering rigor, precise execution.',
      cta1: 'View projects', cta2: 'About me',
      projH: 'Projects', projP: 'Each project, a constellation. Full records live on GitHub.',
      aboutH: 'About', aboutP1: 'I am Vitor Araújo. I map complex problems and turn them into readable, sustainable, well-documented systems.',
      aboutP2: 'The DEVA brand organizes this work as a stellar archive: data, code and narrative connected into constellations.',
      contactH: 'Contact record', footer: 'DEVA ARCHIVE // PORTFOLIO', stamp: 'Record 2026.11'
    },
    marcas: {
      h: 'Brands', intro: 'One author, two identities. Understand the concept that unites them and how each brand works.',
      umbrellaH: 'Umbrella brand', umbrellaP: 'ChaosDeva is the umbrella under which Vitor Araújo\'s two identities live: CHAOS and DEVA. There is a single author, with the same contact details and the same content, and two distinct ways of presenting the work.',
      howH: 'How they work', how: [
        { t: 'Independent', p: 'CHAOS and DEVA are parallel brands. Neither is a sub-brand of the other, and logos, colors and ornaments never mix.' },
        { t: 'Chosen per project', p: 'For each project, the author decides which brand applies. The content is the same; the visual language and tone change.' },
        { t: 'Intensity', p: 'How much of the aesthetic shows depends on the project: low (10–20%) for tools and APIs, medium (40–50%) for sites and interfaces, high (70–90%) for games and authorial works.' }],
      brandsH: 'The brands',
      chaos: { h: 'CHAOS', p1: 'Inspired by Chaos, the primordial deity of the Greco-Roman tradition: the formless, confused mass where earth, air, water and fire lay in eternal conflict.',
        p2: 'A gothic, ethereal aesthetic: black abyss, amethyst violet and moonlight. Mystery lives in the titles; precision lives in the content.', pal: 'Palette' },
      deva: { h: 'DEVA', p1: 'A cartography of knowledge uniting mysticism, data and technology. Each project is a constellation of the same sky.',
        p2: 'A cosmos-and-parchment aesthetic: deep navy, stellar gold and celestial blue. The aesthetic is mystical; the execution is engineering.', pal: 'Palette' },
      note: 'The brands are parallel: neither is a sub-brand of the other, and each version of the site uses only its own language.'
    },
    loading: 'Importing projects from GitHub…', failed: 'Could not load projects right now.', allRepos: 'All repositories', noDesc: 'No description.', updated: 'Updated',
    profile: { highlights: 'Highlights', stack: 'Stack', experience: 'Background', education: 'Education', interests: 'Interests', languages: 'Languages' },
    repo: 'View on GitHub'
  }
};
