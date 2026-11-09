const ROLE = 'Software Architecture & Digital Crafts';

/* Conteúdo editável. Textos em PT-BR e EN-US; projetos na lista PROJECTS. */
window.AUTHOR = {
  name: 'Vitor Araújo',
  github: 'https://github.com/jvitoraraujo',
  linkedin: 'https://www.linkedin.com/in/vitor-ara%C3%BAjo-55a98942b',
  email: ['vitoraraujo02', 'gmail.com'].join('@')
};

/* Projetos: importados de github.com/<user> e ranqueados por relevância (o mesmo script serve à Action e ao site).
   pin: nomes de repositórios sempre exibidos primeiro; exclude: nomes a ocultar. */
window.GH = { user: 'jvitoraraujo', limit: 6, pin: [], exclude: ['chaosdeva', 'jvitoraraujo'],
  source: 'data/projects.json', /* gerado todo dia pela Action (.github/workflows/projects.yml); sem ele, usa a API ao vivo */
  covers: {} /* capa opcional por repositório. Ex.: { 'meu-repo': 'assets/covers/meu-repo.webp' } */ };

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

/* Bloco "terminal" + foco da Home (idêntico em PT/EN; só o protocolo muda por marca). */
const TERM = {
  termL1: '> STATUS: SYS_ONLINE',
  termL2: '> HOST: Vitor Araújo',
  termL3: '> LOC: Quixadá, CE, BR',
  termL4: '> PROTOCOL: Abyssal_Mapping_v1',
  termL5: '> CURRENT_SPRINT: Design Science Research',
  termL6: '> TASK: Algorithmic Audits & AI Coding',
  tagsLabel: 'FOCUS //',
  tags: ['Python', 'AI Coding', 'UX', 'Web Development', 'Design Systems', 'Systems Architecture']
};
const TERM_DEVA = Object.assign({}, TERM, { termL4: '> PROTOCOL: Stellar_Cartography_v1' });

window.I18N = {
  pt: {
    langBtn: 'EN-US', langAria: 'Mudar idioma para inglês (EN-US)', skip: 'Pular para o conteúdo', top: 'Voltar ao topo', empty: 'Nenhum projeto público encontrado ainda.', navLabel: 'Principal', rights: '© CHAOS / DEVA - 2026. Todos os direitos reservados.',
    nav: { home: 'Home', projetos: 'Projetos', sobre: 'Sobre', marcas: 'Marcas' },
    gate: { sub: 'Duas identidades, um mesmo portfólio. Escolha o céu que deseja atravessar.', pick: 'Entrar' },
    title: { home: 'Home', projetos: 'Projetos', sobre: 'Sobre', marcas: 'Marcas' },
    chaos: {
      role: ROLE,
      tagline: 'A massa informe onde os elementos repousam em eterno conflito.',
      lead: 'Código e arquitetura como imposição de lógica sobre o abismo. Sistemas construídos com precisão, a partir do que não tinha forma.',
      ...TERM,
      projH: 'Projetos', projP: 'Fragmentos de trabalho, organizados a partir do caos. Os repositórios completos estão no GitHub.',
      aboutH: 'Sobre', aboutP1: 'Sou Vitor Araújo, desenvolvedor e estudante de Sistemas de Informação na UFC Campus Quixadá. Minha jornada transita entre a lógica rígida da engenharia de software e a abstração criativa do design e da pesquisa. Movido por uma curiosidade metódica e caótica, exploro desde auditorias algorítmicas complexas até a concepção de jogos e o desenvolvimento de identidades visuais imersivas. Cada linha de código que escrevo busca não apenas a funcionalidade bruta, mas a elegância oculta na complexidade.',
      aboutP2: 'A marca CHAOS nasce dessa ideia: o abismo informe é o ponto de partida, e a lógica é o ritual que lhe dá forma.',
      contactH: 'Inscrições', footer: 'C H A O S'
    },
    deva: {
      role: ROLE,
      tagline: 'O céu resplandecente onde cada estrela encontra o seu lugar.',
      lead: 'Uma cartografia do conhecimento. Cada projeto é uma constelação dentro do mesmo céu: rigor de engenharia, execução precisa.',
      ...TERM_DEVA,
      projH: 'Projetos', projP: 'Cada projeto, uma constelação. Os registros completos estão no GitHub.',
      aboutH: 'Sobre', aboutP1: 'Sou Vitor Araújo, desenvolvedor e estudante de Sistemas de Informação na UFC Campus Quixadá. Minha prática técnica se concentra em forjar sistemas resilientes, mas minha visão sistêmica se estende muito além do terminal. Busco o ponto de equilíbrio perfeito entre a técnica pura e a estética transcendente. Seja desenvolvendo ecossistemas web ou arquitetando novas mecânicas, meu objetivo é construir experiências estruturadas e memoráveis.',
      aboutP2: 'A marca DEVA organiza esse trabalho como um arquivo estelar: dados, código e narrativa conectados em constelações.',
      contactH: 'Registro de contato', footer: 'DEVA ARCHIVE // PORTFÓLIO', stamp: 'Registro 2026.11'
    },
    marcas: {
      h: 'Marcas', intro: 'Um autor, duas identidades. Entenda o conceito que as reúne e como cada marca funciona.',
      umbrellaH: 'Marca guarda-chuva', umbrellaP: 'CHAOS & DEVA são os guarda-chuvas sob os quais vivem as duas identidades criativas de Vitor Araújo. Há um único autor, e duas formas distintas de apresentar o trabalho.',
      howH: 'Como funcionam', how: [
        { t: 'Independentes', p: 'CHAOS e DEVA são marcas paralelas. Nenhuma é submarca da outra, e logos e identidades visuais não se misturam.' },
        { t: 'Complementares', p: 'Embora visualmente opostas (o abismo místico e a superfície estrutural), ambas refletem a mesma dedicação técnica em arquitetura de software e pesquisa acadêmica.' }],
      brandsH: 'As marcas',
      chaos: { h: 'CHAOS', p1: 'Inspirada em Caos, divindade primordial da tradição greco-romana: o estado de matéria informe, densa e em eterno conflito que antecede a ordem. Cada projeto é tratado como um fragmento extraído da massa amorfa.',
        p2: 'Estética gótica e etérea: abismo negro, violeta ametista e luz de lua. O mistério mora nos títulos; a precisão mora no conteúdo.', pal: 'Paleta' },
      deva: { h: 'DEVA', p1: 'Inspirado no sânscrito (devá), que significa “brilhante”, “exaltado”, “ser celestial” ou “divindade”, nasce uma cartografia do conhecimento que une misticismo, dados e tecnologia. Cada projeto é uma constelação do mesmo céu.',
        p2: 'Estética de cosmos e pergaminho: azul profundo, ouro estelar e azul celestial. A estética é mística; a execução é de engenharia.', pal: 'Paleta' }
    },
    loading: 'Importando projetos do GitHub…', failed: 'Não foi possível carregar os projetos agora.', allRepos: 'Todos os repositórios', noDesc: 'Sem descrição.', updated: 'Atualizado em',
    profile: { highlights: 'Em destaque', stack: 'Stack', experience: 'Trajetória', education: 'Formação', interests: 'Interesses', languages: 'Idiomas' },
    repo: 'Ver no GitHub'
  },
  en: {
    langBtn: 'PT-BR', langAria: 'Switch language to Portuguese (PT-BR)', skip: 'Skip to content', top: 'Back to top', empty: 'No public projects found yet.', navLabel: 'Main', rights: '© CHAOS / DEVA - 2026. All rights reserved.',
    nav: { home: 'Home', projetos: 'Projects', sobre: 'About', marcas: 'Brands' },
    gate: { sub: 'Two identities, one portfolio. Choose the sky you wish to cross.', pick: 'Enter' },
    title: { home: 'Home', projetos: 'Projects', sobre: 'About', marcas: 'Brands' },
    chaos: {
      role: ROLE,
      tagline: 'The formless mass where the elements rest in eternal conflict.',
      lead: 'Code and architecture as logic imposed upon the abyss. Systems built with precision, from what once had no form.',
      ...TERM,
      projH: 'Projects', projP: 'Fragments of work, ordered out of chaos. Full repositories live on GitHub.',
      aboutH: 'About', aboutP1: 'I am Vitor Araújo, a developer and Information Systems student at UFC Quixadá Campus. My journey moves between the rigid logic of software engineering and the creative abstraction of design and research. Driven by a methodical, chaotic curiosity, I explore everything from complex algorithmic audits to game design and the creation of immersive visual identities. Every line of code I write seeks not just raw functionality, but the elegance hidden in complexity.',
      aboutP2: 'The CHAOS brand comes from that idea: the formless abyss is the starting point, and logic is the ritual that gives it shape.',
      contactH: 'Inscriptions', footer: 'C H A O S'
    },
    deva: {
      role: ROLE,
      tagline: 'The resplendent sky where every star finds its place.',
      lead: 'A cartography of knowledge. Each project is a constellation within the same sky: engineering rigor, precise execution.',
      ...TERM_DEVA,
      projH: 'Projects', projP: 'Each project, a constellation. Full records live on GitHub.',
      aboutH: 'About', aboutP1: 'I am Vitor Araújo, a developer and Information Systems student at UFC Quixadá Campus. My technical practice focuses on forging resilient systems, but my systemic vision extends far beyond the terminal. I seek the perfect balance between pure technique and transcendent aesthetics. Whether building web ecosystems or architecting new mechanics, my goal is to build structured, memorable experiences.',
      aboutP2: 'The DEVA brand organizes this work as a stellar archive: data, code and narrative connected into constellations.',
      contactH: 'Contact record', footer: 'DEVA ARCHIVE // PORTFOLIO', stamp: 'Record 2026.11'
    },
    marcas: {
      h: 'Brands', intro: 'One author, two identities. Understand the concept that unites them and how each brand works.',
      umbrellaH: 'Umbrella brand', umbrellaP: 'CHAOS & DEVA are the umbrellas under which Vitor Araújo\'s two creative identities live. There is a single author, and two distinct ways of presenting the work.',
      howH: 'How they work', how: [
        { t: 'Independent', p: 'CHAOS and DEVA are parallel brands. Neither is a sub-brand of the other, and logos and visual identities never mix.' },
        { t: 'Complementary', p: 'Although visually opposite (the mystical abyss and the structural surface), both reflect the same technical dedication to software architecture and academic research.' }],
      brandsH: 'The brands',
      chaos: { h: 'CHAOS', p1: 'Inspired by Chaos, the primordial deity of the Greco-Roman tradition: the state of formless, dense matter in eternal conflict that precedes order. Each project is treated as a fragment extracted from the amorphous mass.',
        p2: 'A gothic, ethereal aesthetic: black abyss, amethyst violet and moonlight. Mystery lives in the titles; precision lives in the content.', pal: 'Palette' },
      deva: { h: 'DEVA', p1: 'Inspired by Sanskrit (devá), meaning “bright”, “exalted”, “celestial being” or “divinity”, a cartography of knowledge is born that unites mysticism, data and technology. Each project is a constellation of the same sky.',
        p2: 'A cosmos-and-parchment aesthetic: deep navy, stellar gold and celestial blue. The aesthetic is mystical; the execution is engineering.', pal: 'Palette' }
    },
    loading: 'Importing projects from GitHub…', failed: 'Could not load projects right now.', allRepos: 'All repositories', noDesc: 'No description.', updated: 'Updated',
    profile: { highlights: 'Highlights', stack: 'Stack', experience: 'Background', education: 'Education', interests: 'Interests', languages: 'Languages' },
    repo: 'View on GitHub'
  }
};
