// Lista das editoras brasileiras para monitorar
// Você pode adicionar ou remover editoras conforme necessário

export const editorasMonitoradas = [
  // Editoras grandes e tradicionais
  {
    nome: "Editora Globo",
    tipo: "Grande Editora",
    url: "https://www.globoplay.com",
    especiais: ["Romance", "Literatura Contemporânea", "Biografias"]
  },
  {
    nome: "Companhia das Letras",
    tipo: "Grande Editora",
    url: "https://www.companhiadasletras.com.br",
    especiais: ["Literatura Brasileira", "Tradução", "Ensaio"]
  },
  {
    nome: "Editora Sextante",
    tipo: "Grande Editora",
    url: "https://www.sextante.com.br",
    especiais: ["Autoajuda", "Negócios", "Desenvolvimento Pessoal"]
  },
  {
    nome: "Editora Contexto",
    tipo: "Grande Editora",
    url: "https://www.editoracontexto.com.br",
    especiais: ["História", "Política", "Ciências Humanas"]
  },
  {
    nome: "Editora Tabla",
    tipo: "Média Editora",
    url: "https://www.editoratabla.com.br",
    especiais: ["Literatura Contemporânea", "Poesia", "Contos"]
  },
  {
    nome: "Editora Vozes",
    tipo: "Média Editora",
    url: "https://www.vozes.com.br",
    especiais: ["Religião", "Filosofia", "Ciências Sociais"]
  },
  {
    nome: "Editora Perspectivas",
    tipo: "Média Editora",
    url: "https://www.editoraperspectivas.com.br",
    especiais: ["Ciências", "Tecnologia", "Acadêmico"]
  },
  {
    nome: "Editora Zahar",
    tipo: "Média Editora",
    url: "https://www.zahar.com.br",
    especiais: ["Ciências Humanas", "Psicologia", "Filosofia"]
  },
  {
    nome: "Editora Civilização Brasileira",
    tipo: "Média Editora",
    url: "https://www.civilizacao.com.br",
    especiais: ["Política", "História", "Ciências Sociais"]
  },
  {
    nome: "Editora Autêntica",
    tipo: "Média Editora",
    url: "https://www.autentica.com.br",
    especiais: ["Literatura", "Ensino", "Juvenil"]
  },
  {
    nome: "Editora Polar",
    tipo: "Pequena Editora",
    url: "https://www.editorapolar.com.br",
    especiais: ["Literatura de Vanguarda", "Experimental"]
  },
  {
    nome: "Editora Dervixe",
    tipo: "Pequena Editora",
    url: "https://www.dervixe.com.br",
    especiais: ["Literatura Contemporânea", "Crônica"]
  },

  // Editoras especializadas em ficção científica
  {
    nome: "Editora Aleph",
    tipo: "Especializada",
    url: "https://www.editoraaleph.com.br",
    especiais: ["Ficção Científica", "Fantasy", "Terror"]
  },
  {
    nome: "Editora Mad",
    tipo: "Especializada",
    url: "https://www.editoramad.com.br",
    especiais: ["Quadrinhos", "Ficção Científica", "Horror"]
  },
  {
    nome: "Editora Draco",
    tipo: "Especializada",
    url: "https://www.editoradraco.com",
    especiais: ["Ficção Científica", "Fantasy", "SteamPunk"]
  },

  // Editoras acadêmicas e universitárias
  {
    nome: "Editora UNESP",
    tipo: "Universitária",
    url: "https://www.editoraunesp.com.br",
    especiais: ["Acadêmico", "Ciências", "Humanas"]
  },
  {
    nome: "Editora UFRJ",
    tipo: "Universitária",
    url: "https://www.editoraufrj.com.br",
    especiais: ["Acadêmico", "Pesquisa", "Universitário"]
  },
  {
    nome: "Editora USP",
    tipo: "Universitária",
    url: "https://www.editora.usp.br",
    especiais: ["Acadêmico", "Pesquisa", "Científico"]
  },

  // Editoras regionais importantes
  {
    nome: "Editora Record",
    tipo: "Grande Editora",
    url: "https://www.record.com.br",
    especiais: ["Romance", "Literatura Nacional", "Internacional"]
  },
  {
    nome: "Editora Rocco",
    tipo: "Grande Editora",
    url: "https://www.rocco.com.br",
    especiais: ["Literatura Juvenil", "Romance", "Fantasia"]
  },
  {
    nome: "Editora Objetiva",
    tipo: "Média Editora",
    url: "https://www.objetiva.com.br",
    especiais: ["Não-ficção", "Biografia", "História"]
  },
  {
    nome: "Editora Saraiva",
    tipo: "Grande Editora",
    url: "https://www.saraiva.com.br",
    especiais: ["Didático", "Acadêmico", "Geral"]
  },
  {
    nome: "Editora Moderna",
    tipo: "Grande Editora",
    url: "https://www.moderna.com.br",
    especiais: ["Didático", "Ensino Médio", "Fundamental"]
  },

  // Editoras de poesia e literatura independente
  {
    nome: "Editora Cosac Naify",
    tipo: "Independente",
    url: "https://www.cosacnaify.com.br",
    especiais: ["Literatura Independente", "Poesia", "Arte"]
  },
  {
    nome: "Editora 34",
    tipo: "Independente",
    url: "https://www.editora34.com.br",
    especiais: ["Literatura Contemporânea", "Poesia", "Crônica"]
  },
  {
    nome: "Editora Lumme",
    tipo: "Independente",
    url: "https://www.lumme.com.br",
    especiais: ["Literatura Independente", "Contos", "Crônica"]
  },

  // Editoras digitais e e-books
  {
    nome: "Amazon KDP",
    tipo: "Digital",
    url: "https://kdp.amazon.com",
    especiais: ["E-books", "Auto-publicação", "Digital"]
  },
  {
    nome: "Kobo",
    tipo: "Digital",
    url: "https://www.kobo.com",
    especiais: ["E-books", "Literatura Digital"]
  }
];

// Categorias de busca
export const categoriasLiterarias = {
  "Literatura Brasileira": [
    "romance brasileiro",
    "literatura contemporânea",
    "contos nacionais",
    "poesia brasileira"
  ],
  "Ficção Científica": [
    "ciência ficção",
    "space opera",
    "cyberpunk",
    "fantasia científica",
    "hard science fiction"
  ],
  "Prêmios Literários": [
    "prêmio jabuti",
    "prêmio portugal telecom",
    "prêmio apca",
    "prêmio sesc",
    "prêmio são paulo"
  ],
  "Editoras": [
    "companhia das letras",
    "editora globo",
    "record",
    "rocco",
    "sextante"
  ],
  "Resenhas": [
    "resenhas literárias",
    "críticas livros",
    "análises obra",
    "opinião leitor"
  ]
};

// Termos de busca específicos para notícias
export const termosBuscaNoticias = [
  "novos lançamentos editoras",
  "lançamento livros 2025",
  "premio jabuti inscrições",
  "literatura brasileira notícias",
  "editora globo novos livros",
  "companhia das letras lançamentos",
  "sextante publicações",
  "contexto lançamentos",
  "tabla editor novos títulos",
  "zahar publicações",
  "ficção científica brasileira",
  "romance contemporâneo",
  "poesia atual",
  "contos brasileiros",
  "literatura juvenil",
  "biografias lançamentos",
  "não-ficção brasileira",
  "ensaios atuais"
];

// Função para obter editoras por tipo
export const getEditorasPorTipo = (tipo) => {
  return editorasMonitoradas.filter(editora => editora.tipo === tipo);
};

// Função para obter editora por nome
export const getEditoraPorNome = (nome) => {
  return editorasMonitoradas.find(editora => 
    editora.nome.toLowerCase().includes(nome.toLowerCase())
  );
};

// Função para adicionar nova editora
export const adicionarEditora = (novaEditora) => {
  if (!novaEditora.nome || !novaEditora.tipo) {
    throw new Error("Editora deve ter nome e tipo");
  }
  
  const editoraExistente = getEditoraPorNome(novaEditora.nome);
  if (editoraExistente) {
    throw new Error(`Editora ${novaEditora.nome} já existe na lista`);
  }
  
  editorasMonitoradas.push({
    ...novaEditora,
    url: novaEditora.url || `https://www.${novaEditora.nome.toLowerCase().replace(/\s+/g, '')}.com.br`
  });
  
  return true;
};

// Função para remover editora
export const removerEditora = (nomeEditora) => {
  const indice = editorasMonitoradas.findIndex(editora => 
    editora.nome.toLowerCase() === nomeEditora.toLowerCase()
  );
  
  if (indice === -1) {
    throw new Error(`Editora ${nomeEditora} não encontrada`);
  }
  
  editorasMonitoradas.splice(indice, 1);
  return true;
};

// Configurações de monitoramento
export const configMonitoramento = {
  frequenciaBusca: 6, // horas
  maxNoticiasPorEditora: 3,
  maxLancamentosTotal: 20,
  diasRetencao: 7, // dias para manter notícias antigas
  fontesConfiaveis: [
    "folha.com.br",
    "uol.com.br",
    "globo.com",
    "estadao.com.br",
    "publisher.com.br",
    "omelete.com.br"
  ]
};
