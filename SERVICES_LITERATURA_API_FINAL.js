
// src/services/services_literaturaApi.js
// Serviço para buscar notícias, lançamentos e prêmios literários
// Usa Vite env vars: VITE_NEWSAPI_KEY, VITE_GOOGLE_NEWS_KEY
// Exporta funções esperadas pelo Home.jsx

const API_KEYS = {
  newsapi: import.meta.env.VITE_NEWSAPI_KEY || 'demo_key',
  googleNews: import.meta.env.VITE_GOOGLE_NEWS_KEY || 'demo_key'
};

// --- FUNÇÕES PRINCIPAIS (exportadas) ---
export const buscarNoticiasLiterarias = async (editoras = []) => {
  try {
    const todas = [];

    // tentar dados reais
    const reais = await buscarNoticiasReais();
    if (reais && reais.length) {
      todas.push(...reais);
    } else {
      todas.push(...gerarNoticiasMelhoradas());
    }

    // notícias por editora (simuladas se necessário)
    for (const editora of editoras) {
      try {
        const porEditora = buscarPorEditora(editora);
        if (porEditora && porEditora.length) todas.push(...porEditora);
      } catch (err) {
        console.warn('Erro buscarPorEditora:', err?.message || err);
      }
    }

    return filtrarNoticiasRelevantes(todas);
  } catch (error) {
    console.error('buscarNoticiasLiterarias erro:', error);
    return gerarNoticiasMelhoradas();
  }
};

export const buscarLancamentosLivros = async (editoras = []) => {
  try {
    const todos = [];

    const reais = await buscarLancamentosReais();
    if (reais && reais.length) {
      // normaliza campos para o formato esperado no Home.jsx
      todos.push(...reais.map(normalizarLancamento));
    } else {
      todos.push(...gerarLancamentosMelhorados());
    }

    for (const editora of editoras) {
      try {
        const porEditora = buscarLancamentosPorEditora(editora);
        if (porEditora && porEditora.length) todos.push(...porEditora.map(normalizarLancamento));
      } catch (err) {
        console.warn('Erro buscarLancamentosPorEditora:', err?.message || err);
      }
    }

    return organizarLancamentos(todos);
  } catch (error) {
    console.error('buscarLancamentosLivros erro:', error);
    return gerarLancamentosMelhorados();
  }
};

export const buscarPremios = async () => {
  try {
    // Tentar retornar dados reais (se você quiser integrar futuramente)
    // Por ora retornar lista robusta
    const premios = [
      { id: 'jabuti-2025', titulo: "Prêmio Jabuti 2025", categoria: "Geral", vencedor: "—", editora: "CBL", data: new Date().toISOString(), imagem: null },
      { id: 'saopaulo-2025', titulo: "Prêmio São Paulo de Literatura", categoria: "Regional", vencedor: "—", editora: "Fundação SP", data: new Date().toISOString(), imagem: null },
      { id: 'apca-2024', titulo: "Prêmio APCA", categoria: "Crítica", vencedor: "—", editora: "APCA", data: new Date().toISOString(), imagem: null }
    ];

    // normalizar para garantir campos usados no Home.jsx
    return premios.map(p => ({
      id: p.id,
      titulo: p.titulo,
      categoria: p.categoria,
      vencedor: p.vencedor,
      editora: p.editora,
      data: p.data,
      imagem: p.imagem || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'
    }));
  } catch (error) {
    console.error('buscarPremios erro:', error);
    return [];
  }
};

// --- IMPLEMENTAÇÕES AUXILIARES E HELPERS ---

// Tenta buscar usando NewsAPI (se a chave estiver presente)
const buscarNoticiasReais = async () => {
  try {
    if (!API_KEYS.newsapi || API_KEYS.newsapi === 'demo_key') return [];

    const q = encodeURIComponent('literatura livros lançamento editora');
    const url = `https://newsapi.org/v2/everything?q=${q}&language=pt&pageSize=20&sortBy=publishedAt&apiKey=${API_KEYS.newsapi}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`NewsAPI status ${res.status}`);
    const json = await res.json();
    if (!json.articles || !json.articles.length) return [];

    return json.articles.map((a, idx) => ({
      id: `newsapi-${idx}-${new Date(a.publishedAt).getTime() || idx}`,
      titulo: a.title || 'Sem título',
      resumo: a.description || a.content || '',
      imagem: a.urlToImage || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop',
      editora: a.source?.name || 'Fonte desconhecida',
      data: a.publishedAt || new Date().toISOString(),
      categoria: 'notícia',
      link: a.url || '#'
    }));
  } catch (error) {
    console.warn('buscarNoticiasReais falhou:', error?.message || error);
    return [];
  }
};

// Enquanto não há API real de lançamentos, retorna vazio (para cair no fallback)
const buscarLancamentosReais = async () => {
  try {
    // A implementação real pode consultar uma API de editoras/feeds RSS etc.
    return [];
  } catch (error) {
    console.warn('buscarLancamentosReais erro:', error?.message || error);
    return [];
  }
};

// Buscar por termo (melhorado / fallback)
const buscarPorTermo = (termo) => {
  const now = new Date();
  const horas = Math.floor(Math.random() * 48) + 1;
  return [{
    id: `term-${termo}-${now.getTime()}`,
    titulo: `${termo.charAt(0).toUpperCase() + termo.slice(1)}: últimas notícias`,
    resumo: `Atualizações sobre ${termo} no mundo literário.`,
    imagem: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop',
    editora: 'FC Brasil',
    data: new Date(now.getTime() - horas * 3600 * 1000).toISOString(),
    categoria: 'notícia',
    link: '#'
  }];
};

// Buscar notícias simuladas por editora
const buscarPorEditora = (editora) => {
  const now = new Date();
  const horas = Math.floor(Math.random() * 24) + 1;
  return [{
    id: `editora-${editora.id || editora.nome}-${now.getTime()}`,
    titulo: `${editora.nome}: novidades`,
    resumo: `Últimas informações sobre ${editora.nome} e suas publicações.`,
    imagem: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop',
    editora: editora.nome,
    data: new Date(now.getTime() - horas * 3600 * 1000).toISOString(),
    categoria: 'notícia',
    link: editora.url || '#'
  }];
};

// Buscar lançamentos simulados por editora
const buscarLancamentosPorEditora = (editora) => {
  const now = new Date();
  const dias = Math.floor(Math.random() * 30) + 1;
  const livrosExemplos = [
    "O Último Romance", "Noites de Inverno", "Cartas de Amor Perdidas",
    "A Sombra do Tempo", "Memórias de uma Época", "Ruas de São Paulo",
    "O Escritor Solitário", "Entre Dois Mundos", "A Jornada Final"
  ];
  const autoresEx = [
    "Mariana Silva", "Carlos Rodrigues", "Ana Paula Santos",
    "Roberto Mendes", "Luciana Ferreira", "Pedro Almeida"
  ];

  const titulo = livrosExemplos[Math.floor(Math.random() * livrosExemplos.length)];
  const autor = autoresEx[Math.floor(Math.random() * autoresEx.length)];

  return [{
    id: `lanc-${editora.id || editora.nome}-${Date.now()}`,
    titulo,
    autor,
    editora: editora.nome,
    genero: "Romance",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    sinopse: `Novo lançamento da ${editora.nome}. Uma obra que promete cativar.`,
    dataLancamento: new Date(now.getTime() - dias * 24 * 3600 * 1000).toISOString(),
    preco: `R$ ${(Math.random() * 60 + 20).toFixed(2)}`,
    destaque: Math.random() > 0.7
  }];
};

// Normalizadores e geradores fallback
const normalizarLancamento = (l) => ({
  id: l.id ?? `l-${Date.now()}`,
  titulo: l.titulo ?? l.name ?? 'Sem título',
  autor: l.autor ?? l.writer ?? 'Autor desconhecido',
  editora: l.editora ?? l.publisher ?? 'Editora desconhecida',
  genero: l.genero ?? 'Geral',
  imagem: l.imagem ?? l.capa ?? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
  sinopse: l.sinopse ?? l.descricao ?? '',
  dataLancamento: l.dataLancamento ?? l.novidade ?? new Date().toISOString(),
  preco: l.preco ?? 'R$ 0,00',
  destaque: !!l.destaque
});

const gerarNoticiasMelhoradas = () => {
  const now = new Date();
  return [
    {
      id: `g-1-${now.getTime()}`,
      titulo: "Novo romance de Chico Buarque conquista crítica",
      resumo: "O mais recente romance do compositor e escritor está sendo elogiado pela profundidade narrativa.",
      imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
      editora: "Companhia das Letras",
      data: new Date(now.getTime() - 2 * 3600 * 1000).toISOString(),
      categoria: "notícia",
      link: "#"
    },
    {
      id: `g-2-${now.getTime()}`,
      titulo: "Prêmio Jabuti 2025 abre inscrições",
      resumo: "Inscrições para o Prêmio Jabuti 2025 estão abertas até março de 2025.",
      imagem: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop",
      editora: "Câmara Brasileira do Livro",
      data: new Date(now.getTime() - 6 * 3600 * 1000).toISOString(),
      categoria: "prêmio",
      link: "#"
    }
  ];
};

const gerarLancamentosMelhorados = () => {
  const now = new Date();
  return [
    {
      id: `gl-1-${now.getTime()}`,
      titulo: "O Jardim das Mentiras",
      autor: "Lucia Ferreira",
      editora: "Editora Aleph",
      genero: "Romance Psicológico",
      imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      sinopse: "Um thriller psicológico que explora as complexidades da memória e do esquecimento.",
      dataLancamento: new Date(now.getTime() - 1 * 24 * 3600 * 1000).toISOString(),
      preco: "R$ 49.90",
      destaque: true
    },
    {
      id: `gl-2-${now.getTime()}`,
      titulo: "Cartas de um Morto",
      autor: "Roberto Silva",
      editora: "Companhia das Letras",
      genero: "Ficção Científica",
      imagem: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop",
      sinopse: "Uma exploração tocante sobre morte, memória e tecnologia.",
      dataLancamento: new Date(now.getTime() - 3 * 24 * 3600 * 1000).toISOString(),
      preco: "R$ 59.90",
      destaque: false
    }
  ];
};

// Filtrar duplicatas e ordenar
const filtrarNoticiasRelevantes = (noticias) => {
  const únicas = noticias.filter((n, i, arr) => i === arr.findIndex(x => x.titulo === n.titulo));
  return únicas
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 12)
    .map(n => ({
      // garantir campos que o Home espera
      id: n.id,
      titulo: n.titulo,
      resumo: n.resumo ?? n.conteudo ?? '',
      imagem: n.imagem ?? 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop',
      editora: n.editora ?? n.autor ?? 'Fonte desconhecida',
      data: n.data ?? new Date().toISOString(),
      categoria: n.categoria ?? 'notícia',
      link: n.link ?? '#'
    }));
};

const organizarLancamentos = (lancamentos) => {
  return lancamentos
    .map(normalizarLancamento)
    .sort((a, b) => new Date(b.dataLancamento).getTime() - new Date(a.dataLancamento).getTime())
    .slice(0, 12);
};

// Export util (opcional)
export const configurarAtualizacaoAutomatica = (callback, intervaloHoras = 6) => {
  return setInterval(callback, intervaloHoras * 3600 * 1000);
};
