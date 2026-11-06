/* Conteúdo editável. Textos em PT-BR e EN-US; projetos na lista PROJECTS. */
window.AUTHOR = {
  name: 'Vitor Araújo',
  github: 'https://github.com/jvitoraraujo',
  linkedin: 'https://www.linkedin.com/in/vitor-ara%C3%BAjo-55a98942b',
  email: 'vitoraraujo02@gmail.com'
};

/* SUBSTITUA pelos seus projetos reais. draft:true marca como exemplo. */
window.PROJECTS = [
  { name: 'Projeto Alfa', stack: 'Python • FastAPI', status: 'ATIVO', url: 'https://github.com/jvitoraraujo', draft: true,
    pt: 'Espaço reservado para um projeto de backend. Edite em js/content.js.',
    en: 'Placeholder for a backend project. Edit it in js/content.js.' },
  { name: 'Projeto Beta', stack: 'JavaScript • Web', status: 'ATIVO', url: 'https://github.com/jvitoraraujo', draft: true,
    pt: 'Espaço reservado para uma interface ou extensão.',
    en: 'Placeholder for an interface or an extension.' },
  { name: 'Projeto Gama', stack: 'Dados • Análise', status: 'ARQUIVADO', url: 'https://github.com/jvitoraraujo', draft: true,
    pt: 'Espaço reservado para um estudo de dados ou projeto autoral.',
    en: 'Placeholder for a data study or an authorial project.' }
];

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
      h: 'Marcas', intro: 'Duas identidades independentes, cada uma com sua própria linguagem. Este portfólio apresenta o mesmo conteúdo sob ambas.',
      chaos: { h: 'CHAOS', p1: 'Inspirada em Caos, divindade primordial da tradição greco-romana: a massa informe e confusa onde terra, ar, água e fogo existiam em eterno conflito.',
        p2: 'Estética gótica e etérea: abismo negro, violeta ametista e luz de lua. O mistério mora nos títulos; a precisão mora no conteúdo.', pal: 'Paleta' },
      deva: { h: 'DEVA', p1: 'Uma marca guarda-chuva e cartografia do conhecimento, que une misticismo, dados e tecnologia. Cada projeto é uma constelação do mesmo céu.',
        p2: 'Estética de cosmos e pergaminho: azul profundo, ouro estelar e azul celestial. A estética é mística; a execução é de engenharia.', pal: 'Paleta' },
      note: 'As marcas são paralelas: nenhuma é submarca da outra, e cada versão do site usa apenas a sua própria linguagem.'
    },
    status: { ATIVO: 'ATIVO', ARQUIVADO: 'ARQUIVADO' }, draft: 'Exemplo', repo: 'Ver no GitHub', contactBack: 'GitHub, LinkedIn e e-mail'
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
      h: 'Brands', intro: 'Two independent identities, each with its own language. This portfolio presents the same content under both.',
      chaos: { h: 'CHAOS', p1: 'Inspired by Chaos, the primordial deity of the Greco-Roman tradition: the formless, confused mass where earth, air, water and fire lay in eternal conflict.',
        p2: 'A gothic, ethereal aesthetic: black abyss, amethyst violet and moonlight. Mystery lives in the titles; precision lives in the content.', pal: 'Palette' },
      deva: { h: 'DEVA', p1: 'An umbrella brand and cartography of knowledge, uniting mysticism, data and technology. Each project is a constellation of the same sky.',
        p2: 'A cosmos-and-parchment aesthetic: deep navy, stellar gold and celestial blue. The aesthetic is mystical; the execution is engineering.', pal: 'Palette' },
      note: 'The brands are parallel: neither is a sub-brand of the other, and each version of the site uses only its own language.'
    },
    status: { ATIVO: 'ACTIVE', ARQUIVADO: 'ARCHIVED' }, draft: 'Sample', repo: 'View on GitHub', contactBack: 'GitHub, LinkedIn and e-mail'
  }
};
