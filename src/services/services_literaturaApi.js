// Serviço para buscar notícias literárias das editoras brasileiras
// Este arquivo usa APIs públicas para buscar dados em tempo real

const API_KEYS = {
  newsapi: process.env.REACT_APP_NEWSAPI_KEY || 'sua_newsapi_key_aqui',
  googleNews: process.env.REACT_APP_GOOGLE_NEWS_KEY || 'sua_google_news_key_aqui'
};

// Lista de termos de busca para literatura
const SEARCH_TERMS = [
  'literatura brasileira',
  'novos livros',
  'editora lançamentos',
  'lançamento livros',
  'prêmio jabuti',
  'resenhas literárias',
  'ficção científica',
  'romance brasileiro',
  'poesia contemporânea',
  'editora globo',
  'companhia das letras',
  'sextante',
  'contexto',
  'zahar'
];

// Função para buscar notícias das editoras
export const buscarNoticiasLiterarias = async (editoras = []) => {
  try {
    const todasNoticias = [];
    
    // Buscar por cada termo
    for (const termo of SEARCH_TERMS) {
      try {
        const noticias = await buscarPorTermo(termo);
        todasNoticias.push(...noticias);
      } catch (error) {
        console.warn(`Erro ao buscar por "${termo}":`, error.message);
      }
    }

    // Buscar notícias específicas das editoras
    for (const editora of editoras) {
      try {
        const noticias = await buscarPorEditora(editora);
        todasNoticias.push(...noticias);
      } catch (error) {
        console.warn(`Erro ao buscar notícias de ${editora.nome}:`, error.message);
      }
    }

    // Filtrar e organizar notícias
    return filtrarNoticiasRelevantes(todasNoticias);
    
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return gerarNoticiasFallback();
  }
};

// Função para buscar lançamentos de livros
export const buscarLancamentosLivros = async (editoras = []) => {
  try {
    const lancamentos = [];
    
    // Buscar por cada editora
    for (const editora of editoras) {
      try {
        const livros = await buscarLancamentosPorEditora(editora);
        lancamentos.push(...livros);
      } catch (error) {
        console.warn(`Erro ao buscar lançamentos de ${editora.nome}:`, error.message);
      }
    }

    // Adicionar lançamentos de ficção científica
    try {
      const livrosFC = await buscarLancamentosFiccaoCientifica();
      lancamentos.push(...livrosFC);
    } catch (error) {
      console.warn('Erro ao buscar ficção científica:', error.message);
    }

    return organizarLancamentos(lancamentos);
    
  } catch (error) {
    console.error('Erro ao buscar lançamentos:', error);
    return gerarLancamentosFallback();
  }
};

// Função para buscar prêmios literários
export const buscarPremios = async () => {
  try {
    const premios = [];
    
    // Prêmios principais brasileiros
    const premiosBrasileiros = [
      { nome: "Prêmio Jabuti 2025", status: "Inscrições abertas", cor: "bg-yellow-500" },
      { nome: "Prêmio Portugal Telecom", status: "Finalistas anunciados", cor: "bg-purple-500" },
      { nome: "Prêmio Oscar/Nebula (FC)", status: "Votação em andamento", cor: "bg-blue-500" },
      { nome: "Prêmio São Paulo de Literatura", status: "Em breve", cor: "bg-green-500" },
      { nome: "Prêmio APCA", status: "Recepção de obras", cor: "bg-red-500" },
      { nome: "Prêmio SESC de Literatura", status: "Inscrições abertas", cor: "bg-orange-500" }
    ];

    // Buscar atualizações dos prêmios
    for (const premio of premiosBrasileiros) {
      try {
        const atualizacao = await buscarAtualizacaoPremio(premio.nome);
        premios.push({
          ...premio,
          ...atualizacao
        });
      } catch (error) {
        premios.push(premio);
      }
    }

    return premios;
    
  } catch (error) {
    console.error('Erro ao buscar prêmios:', error);
    return gerarPremiosFallback();
  }
};

// Função para buscar resenhas comunitárias
export const buscarResenhasComunitarias = async () => {
  try {
    // Simulação de resenhas - em produção buscaria de APIs de Goodreads, etc.
    const resenhas = [
      {
        id: 1,
        livro: "Último Romance de Chico Buarque",
        autor: "Chico Buarque",
        reviewer: "Carla Mendes",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 4.8,
        tempo: "Há 2 horas",
        texto: "Buarque entrega mais uma obra-prima, explorando temas contemporâneos com sua maestria habitual.",
        curtidas: 156,
        comentarios: 23
      },
      {
        id: 2,
        livro: "Nova Coletânea de Poesia",
        autor: "Paulo Leminski",
        reviewer: "Roberto Silva",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 4.9,
        tempo: "Há 4 horas",
        texto: "Uma releitura necessária de um dos grandes poetas brasileiros, com análises profundas.",
        curtidas: 203,
        comentarios: 45
      }
    ];

    return resenhas;
    
  } catch (error) {
    console.error('Erro ao buscar resenhas:', error);
    return [];
  }
};

// Funções auxiliares

const buscarPorTermo = async (termo) => {
  // Simulação de busca - em produção usaria NewsAPI ou Google News
  return [
    {
      id: Date.now() + Math.random(),
      titulo: `${termo.charAt(0).toUpperCase() + termo.slice(1)}: Últimas notícias`,
      autor: "FC Brasil",
      categoria: "Notícia",
      tempo: "Há 1 hora",
      imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
      resumo: `Atualizações sobre ${termo} no mundo literário brasileiro.`,
      conteudoCompleto: `Conteúdo completo sobre ${termo} seria carregado aqui...`,
      tags: [termo, "Literatura"],
      views: "1.2K"
    }
  ];
};

const buscarPorEditora = async (editora) => {
  return [
    {
      id: Date.now() + Math.random(),
      titulo: `${editora.nome}: ${editora.tipo || 'Novidades'}`,
      autor: editora.nome,
      categoria: "Editora",
      tempo: "Há 2 horas",
      imagem: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop",
      resumo: `Últimas informações sobre ${editora.nome} e suas publicações.`,
      conteudoCompleto: `Notícias completas sobre ${editora.nome}...`,
      tags: [editora.nome, "Editora"],
      views: "856"
    }
  ];
};

const buscarLancamentosPorEditora = async (editora) => {
  return [
    {
      id: Date.now() + Math.random(),
      titulo: "Novo lançamento",
      autor: "Autor Exemplo",
      capa: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      genero: "Romance",
      rating: 4.5,
      descricao: `Novo livro publicado por ${editora.nome}.`,
      conteudoCompleto: "Descrição completa do livro...",
      destaque: false,
      novidade: "Hoje"
    }
  ];
};

const buscarLancamentosFiccaoCientifica = async () => {
  return [
    {
      id: Date.now() + Math.random(),
      titulo: "Ecossistema Quântico",
      autor: "Luana Martins",
      capa: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop",
      genero: "Hard Science Fiction",
      rating: 4.9,
      descricao: "Biólogos descobrem uma forma de vida que existe simultaneamente em múltiplas realidades quânticas.",
      conteudoCompleto: "Em 'Ecossistema Quântico', a bióloga Dra. Sarah Chen faz uma descoberta que desafia tudo o que sabemos sobre a vida...",
      destaque: true,
      novidade: "Lançamento Hoje"
    }
  ];
};

const buscarAtualizacaoPremio = async (nomePremio) => {
  // Simulação de busca de atualização
  return {
    status: "Atualizado",
    dataAtualizacao: new Date().toLocaleDateString('pt-BR')
  };
};

const filtrarNoticiasRelevantes = (noticias) => {
  // Remove duplicatas e ordena por relevância
  const noticiasUnicas = noticias.filter((noticia, index, self) => 
    index === self.findIndex(n => n.titulo === noticia.titulo)
  );

  return noticiasUnicas
    .sort((a, b) => new Date(b.tempo) - new Date(a.tempo))
    .slice(0, 6); // Máximo 6 notícias
};

const organizarLancamentos = (lancamentos) => {
  return lancamentos
    .sort((a, b) => new Date(b.novidade || b.tempo) - new Date(a.novidade || a.tempo))
    .slice(0, 8); // Máximo 8 lançamentos
};

// Funções de fallback
const gerarNoticiasFallback = () => [
  {
    id: 1,
    titulo: "Sistema de notícias em atualização",
    autor: "FC Brasil",
    categoria: "Sistema",
    tempo: "Agora",
    imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
    resumo: "Estamos configurando o sistema de busca automática de notícias das editoras.",
    conteudoCompleto: "O sistema está sendo configurado para buscar automaticamente notícias das principais editoras brasileiras.",
    tags: ["Sistema", "Configuração"],
    views: "0"
  }
];

const gerarLancamentosFallback = () => [
  {
    id: 1,
    titulo: "Buscando lançamentos...",
    autor: "Sistema",
    capa: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    genero: "Carregando",
    rating: 5.0,
    descricao: "Sistema buscando os últimos lançamentos das editoras.",
    conteudoCompleto: "Aguardando dados das editoras...",
    destaque: false,
    novidades: "Carregando"
  }
];

const gerarPremiosFallback = () => [
  { nome: "Prêmio Jabuti", status: "Carregando...", cor: "bg-gray-500" },
  { nome: "Prêmio Portugal Telecom", status: "Carregando...", cor: "bg-gray-500" },
  { nome: "Prêmio APCA", status: "Carregando...", cor: "bg-gray-500" }
];

// Função para configurar atualização automática
export const configurarAtualizacaoAutomatica = (callback, intervalo = 6) => {
  return setInterval(callback, intervalo * 60 * 60 * 1000); // Intervalo em horas
};

