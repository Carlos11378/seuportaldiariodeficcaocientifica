import React, { useState, useEffect } from 'react';
import { BookOpen, Rocket, Star, Sparkles, Zap, Globe, ChevronRight, TrendingUp, Award, Users, Clock, Eye, ArrowLeft, Heart, Bookmark, Share2, MessageCircle, ThumbsUp, AlertTriangle } from 'lucide-react';

// Import dos serviços (você precisa criar estes arquivos)
import { buscarNoticiasLiterarias, buscarLancamentosLivros, buscarPremios } from './services/services_literaturaApi';
import { editorasMonitoradas } from './data/data_editoras';
import { formatarDataRelativa } from './utils/utils_dateUtils';

// Componente robusto para lidar com imagens quebradas
const ImageWithFallback = ({ src, alt, className, fallbackStyle = 'default' }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  // URLs de fallback quando a imagem principal falha
  const fallbackUrls = {
    book: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    noticia: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  };

  useEffect(() => {
    setImageSrc(src);
    setImageError(false);
    setFallbackMode(false);
  }, [src]);

  const handleError = () => {
    if (!fallbackMode && !imageError) {
      // Tenta usar URL de fallback primeiro
      const fallbackUrl = fallbackUrls[fallbackStyle] || fallbackUrls.book;
      setImageSrc(fallbackUrl);
      setFallbackMode(true);
    } else if (fallbackMode) {
      // Se o fallback também falhar, mostra placeholder
      setImageError(true);
    }
  };

  if (imageError) {
    return (
      <div className={`${className} bg-gradient-to-br from-purple-900/50 to-gray-800/50 flex items-center justify-center border border-purple-500/30`}>
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Imagem não disponível</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

// Componente principal simplificado
const Home = () => {
  const [noticias, setNoticias] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [premios, setPremios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());

  // Estado para controle de filtros
  const [filtroEditora, setFiltroEditora] = useState('todas');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  // Carregar dados iniciais
  useEffect(() => {
    carregarDados();
    // Configurar atualização automática a cada 6 horas
    const intervalo = setInterval(carregarDados, 6 * 60 * 60 * 1000);
    return () => clearInterval(intervalo);
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      // Buscar dados das APIs
      const [noticiasData, lancamentosData, premiosData] = await Promise.all([
        buscarNoticiasLiterarias(editorasMonitoradas.slice(0, 10)), // Primeiras 10 editoras para não sobrecarregar
        buscarLancamentosLivros(editorasMonitoradas.slice(0, 10)),
        buscarPremios()
      ]);

      setNoticias(noticiasData);
      setLancamentos(lancamentosData);
      setPremios(premiosData);
      setUltimaAtualizacao(new Date());
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Carregar dados offline como fallback
      carregarDadosOffline();
    } finally {
      setLoading(false);
    }
  };

  const carregarDadosOffline = () => {
    // Dados offline como fallback
    const dadosOffline = {
      noticias: [
        {
          id: 1,
          titulo: "Editora Companhia das Letras anuncia novo lançamento",
          resumo: "Nova coleção de literatura contemporânea brasileira será lançada em dezembro.",
          imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
          editora: "Companhia das Letras",
          data: "2025-12-06",
          categoria: "notícia",
          link: "#"
        }
      ],
      lancamentos: [
        {
          id: 1,
          titulo: "O Ecossistema Quântico",
          autor: "Ana Silva",
          editora: "Editora Aleph",
          genero: "Ficção Científica",
          imagem: "https://images.unsplash.com/photo-1604881981720-9979ff6a26bf?w=400&h=600&fit=crop",
          sinopse: "Uma jornada através da física quântica aplicada à literatura.",
          dataLancamento: "2025-12-01",
          preco: "R$ 45,90",
          categoria: "lançamento"
        }
      ],
      premios: [
        {
          id: 1,
          titulo: "Prêmio Jabuti 2025",
          categoria: "Romance",
          vencedor: "O Vento Levou",
          editora: "Editora Globo",
          data: "2025-11-30",
          imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
          categoria: "prêmio"
        }
      ]
    };

    setNoticias(dadosOffline.noticias);
    setLancamentos(dadosOffline.lancamentos);
    setPremios(dadosOffline.premios);
  };

  // Dados simulados para demonstração
  const livrosDestaque = [
    {
      id: 1,
      titulo: "O Ecossistema Quântico",
      autor: "Ana Silva",
      categoria: "Ficção Científica",
      imagem: "https://images.unsplash.com/photo-1604881981720-9979ff6a26bf?w=400&h=600&fit=crop",
      descricao: "Uma exploração fascinante dos conceitos quânticos aplicados à narrativa contemporânea.",
      avaliacao: 4.8,
      totalAvaliacoes: 127
    },
    {
      id: 2,
      titulo: "Memórias Sintéticas",
      autor: "Carlos Eduardo",
      categoria: "Romance",
      imagem: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
      descricao: "Um romance sobre memória e identidade na era digital.",
      avaliacao: 4.6,
      totalAvaliacoes: 89
    },
    {
      id: 3,
      titulo: "O Último Farol",
      autor: "Marina Santos",
      categoria: "Drama",
      imagem: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      descricao: "Uma reflexão profunda sobre esperança e perseverança.",
      avaliacao: 4.9,
      totalAvaliacoes: 156
    }
  ];

  const noticiasDestaque = [
    {
      id: 1,
      titulo: "Editora Globo anuncia nova coleção de clássicos brasileiros",
      resumo: "A coleção 'Clássicos Revisitados' trará obras-primas da literatura nacional com novas traduções e prefácios de autores contemporâneos.",
      imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
      data: "2025-12-05",
      autor: "Por João Silva",
      categoria: "notícia"
    },
    {
      id: 2,
      titulo: "Prêmio São Paulo de Literatura 2025: Conheça os finalistas",
      resumo: "O júri técnico selecionou 15 obras entre 847 livros concorrentes para a grande final do prêmio.",
      imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
      data: "2025-12-04",
      autor: "Por Maria Santos",
      categoria: "prêmio"
    },
    {
      id: 3,
      titulo: "Feira do Livro de São Paulo confirma programação literária",
      resumo: "Mais de 200 autores confirmados para debates, oficinas e sessões de autógrafo durante o evento.",
      imagem: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop",
      data: "2025-12-03",
      autor: "Por Pedro Costa",
      categoria: "evento"
    }
  ];

  const usuariosDestaque = [
    {
      id: 1,
      nome: "Lúcia Ferreira",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      titulo: "Crítica Literária",
      resumo: "Especialista em literatura contemporânea brasileira com mais de 15 anos de experiência.",
      livrosAvaliados: 247,
      seguidores: 1842,
      badge: "verified"
    },
    {
      id: 2,
      nome: "Roberto Mendes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      titulo: "Leitor Apaixonado",
      resumo: "Apaixonado por ficção científica e literatura fantástica nacional.",
      livrosAvaliados: 156,
      seguidores: 723,
      badge: "premium"
    },
    {
      id: 3,
      nome: "Ana Clara",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      titulo: "Poeta Contemporânea",
      resumo: "Poeta e critique literária, focada em autores emergentes e diversidade na literatura.",
      livrosAvaliados: 89,
      seguidores: 456,
      badge: "new"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-200 text-lg">Carregando novidades literárias...</p>
          <p className="text-purple-300 text-sm mt-2">Monitorando 25+ editoras brasileiras</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FC Brasil</h1>
                <p className="text-purple-300 text-sm">Portal de Literatura e Notícias</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-purple-300 text-sm">Última atualização</p>
                <p className="text-white font-medium">{formatarDataRelativa(ultimaAtualizacao)}</p>
              </div>
              <button 
                onClick={carregarDados}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Atualizar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navegação */}
      <nav className="bg-black/10 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <a href="#inicio" className="text-purple-300 hover:text-white transition-colors border-b-2 border-purple-500 pb-2">Início</a>
            <a href="#lancamentos" className="text-purple-300 hover:text-white transition-colors">Lançamentos</a>
            <a href="#noticias" className="text-purple-300 hover:text-white transition-colors">Notícias</a>
            <a href="#premios" className="text-purple-300 hover:text-white transition-colors">Prêmios</a>
            <a href="#comunidade" className="text-purple-300 hover:text-white transition-colors">Comunidade</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seção Principal - Destaque do Dia */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Sparkles className="h-8 w-8 mr-3 text-yellow-400" />
                Destaque do Dia
              </h2>
              <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                🔥 Hoje
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Livro em Destaque */}
              <div className="bg-black/20 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={livrosDestaque[0].imagem}
                    alt={livrosDestaque[0].titulo}
                    className="w-24 h-32 object-cover rounded-lg"
                    fallbackStyle="book"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{livrosDestaque[0].titulo}</h3>
                    <p className="text-purple-300 mb-2">por {livrosDestaque[0].autor}</p>
                    <p className="text-purple-200 text-sm mb-3">{livrosDestaque[0].descricao}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-white font-medium">{livrosDestaque[0].avaliacao}</span>
                        <span className="text-purple-300 text-sm ml-1">({livrosDestaque[0].totalAvaliacoes})</span>
                      </div>
                      <span className="bg-purple-600/50 text-purple-200 px-2 py-1 rounded text-xs">
                        {livrosDestaque[0].categoria}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notícia em Destaque */}
              <div className="bg-black/20 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={noticiasDestaque[0].imagem}
                    alt={noticiasDestaque[0].titulo}
                    className="w-24 h-20 object-cover rounded-lg"
                    fallbackStyle="noticia"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{noticiasDestaque[0].titulo}</h3>
                    <p className="text-purple-200 text-sm mb-2">{noticiasDestaque[0].resumo}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 text-xs">{noticiasDestaque[0].autor}</span>
                      <span className="text-purple-300 text-xs">{formatarDataRelativa(new Date(noticiasDestaque[0].data))}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Lançamentos */}
        <section id="lancamentos" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Rocket className="h-6 w-6 mr-3 text-blue-400" />
              Lançamentos Recentes
            </h2>
            <div className="text-purple-300 text-sm">
              {editorasMonitoradas.length} editoras monitoradas
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {lancamentos.length > 0 ? lancamentos.map((livro) => (
              <div key={livro.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <ImageWithFallback
                  src={livro.imagem}
                  alt={livro.titulo}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  fallbackStyle="book"
                />
                <h3 className="text-lg font-bold text-white mb-2">{livro.titulo}</h3>
                <p className="text-purple-300 mb-1">por {livro.autor}</p>
                <p className="text-purple-400 text-sm mb-3">{livro.editora} • {livro.genero}</p>
                <p className="text-purple-200 text-sm mb-4">{livro.sinopse}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-bold">{livro.preco}</span>
                  <span className="text-purple-300 text-xs">{formatarDataRelativa(new Date(livro.dataLancamento))}</span>
                </div>
              </div>
            )) : livrosDestaque.map((livro) => (
              <div key={livro.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <ImageWithFallback
                  src={livro.imagem}
                  alt={livro.titulo}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  fallbackStyle="book"
                />
                <h3 className="text-lg font-bold text-white mb-2">{livro.titulo}</h3>
                <p className="text-purple-300 mb-1">por {livro.autor}</p>
                <p className="text-purple-400 text-sm mb-3">{livro.categoria}</p>
                <p className="text-purple-200 text-sm mb-4">{livro.descricao}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white font-medium">{livro.avaliacao}</span>
                  </div>
                  <span className="text-purple-300 text-xs">{livro.totalAvaliacoes} avaliações</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção de Notícias */}
        <section id="noticias" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Globe className="h-6 w-6 mr-3 text-green-400" />
              Notícias Literárias
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={filtroEditora}
                onChange={(e) => setFiltroEditora(e.target.value)}
                className="bg-black/20 text-white border border-purple-500/30 rounded-lg px-3 py-1 text-sm"
              >
                <option value="todas">Todas as Editoras</option>
                {editorasMonitoradas.slice(0, 10).map((editora) => (
                  <option key={editora.nome} value={editora.nome}>{editora.nome}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.length > 0 ? noticias.map((noticia) => (
              <article key={noticia.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <ImageWithFallback
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                  fallbackStyle="noticia"
                />
                <h3 className="text-lg font-bold text-white mb-2">{noticia.titulo}</h3>
                <p className="text-purple-200 text-sm mb-3">{noticia.resumo}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">{noticia.editora}</span>
                  <span className="text-purple-300">{formatarDataRelativa(new Date(noticia.data))}</span>
                </div>
              </article>
            )) : noticiasDestaque.map((noticia) => (
              <article key={noticia.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <ImageWithFallback
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                  fallbackStyle="noticia"
                />
                <h3 className="text-lg font-bold text-white mb-2">{noticia.titulo}</h3>
                <p className="text-purple-200 text-sm mb-3">{noticia.resumo}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">{noticia.categoria}</span>
                  <span className="text-purple-300">{noticia.autor}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Seção de Prêmios */}
        <section id="premios" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Award className="h-6 w-6 mr-3 text-yellow-400" />
              Prêmios Literários
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {premios.length > 0 ? premios.map((premio) => (
              <div key={premio.id} className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={premio.imagem}
                    alt={premio.titulo}
                    className="w-20 h-28 object-cover rounded-lg"
                    fallbackStyle="book"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{premio.titulo}</h3>
                    <p className="text-yellow-300 mb-1">Categoria: {premio.categoria}</p>
                    <p className="text-yellow-200 mb-2">Vencedor: {premio.vencedor}</p>
                    <p className="text-yellow-300 text-sm">{premio.editora}</p>
                    <p className="text-yellow-400 text-xs mt-2">{formatarDataRelativa(new Date(premio.data))}</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Prêmio Jabuti 2025</h3>
                <p className="text-yellow-300 mb-2">Finalistas anunciados para as principais categorias</p>
                <p className="text-yellow-200 text-sm">Prêmio mais tradicional da literatura brasileira</p>
              </div>
            )}
          </div>
        </section>

        {/* Seção da Comunidade */}
        <section id="comunidade" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Users className="h-6 w-6 mr-3 text-pink-400" />
              Comunidade Literária
            </h2>
            <div className="text-purple-300 text-sm">
              {usuariosDestaque.length} membros em destaque
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {usuariosDestaque.map((usuario) => (
              <div key={usuario.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center space-x-4 mb-4">
                  <ImageWithFallback
                    src={usuario.avatar}
                    alt={usuario.nome}
                    className="w-16 h-16 rounded-full object-cover"
                    fallbackStyle="avatar"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-white">{usuario.nome}</h3>
                      {usuario.badge === 'verified' && <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">✓</div>}
                      {usuario.badge === 'premium' && <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">★</div>}
                      {usuario.badge === 'new' && <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</div>}
                    </div>
                    <p className="text-purple-300 text-sm">{usuario.titulo}</p>
                  </div>
                </div>
                <p className="text-purple-200 text-sm mb-4">{usuario.resumo}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="text-white font-bold">{usuario.livrosAvaliados}</div>
                    <div className="text-purple-300 text-xs">Livros Avaliados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">{usuario.seguidores}</div>
                    <div className="text-purple-300 text-xs">Seguidores</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Status do Sistema */}
        <section className="bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-purple-400" />
            Status do Sistema
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">25+</div>
              <div className="text-purple-300 text-sm">Editoras Monitoradas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">6h</div>
              <div className="text-purple-300 text-sm">Intervalo de Atualização</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{lancamentos.length || livrosDestaque.length}</div>
              <div className="text-purple-300 text-sm">Lançamentos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{noticias.length || noticiasDestaque.length}</div>
              <div className="text-purple-300 text-sm">Notícias</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-purple-300 text-sm">
              Última atualização: {formatarDataRelativa(ultimaAtualizacao)}
            </p>
            <p className="text-purple-400 text-xs mt-1">
              Sistema em modo automático • Monitoramento 24/7
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-purple-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-purple-400" />
                <span className="text-lg font-bold text-white">FC Brasil</span>
              </div>
              <p className="text-purple-300 text-sm">
                Portal completo de literatura brasileira e notícias do mundo dos livros.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-3">Seções</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#lancamentos" className="text-purple-300 hover:text-white transition-colors">Lançamentos</a></li>
                <li><a href="#noticias" className="text-purple-300 hover:text-white transition-colors">Notícias</a></li>
                <li><a href="#premios" className="text-purple-300 hover:text-white transition-colors">Prêmios</a></li>
                <li><a href="#comunidade" className="text-purple-300 hover:text-white transition-colors">Comunidade</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-3">Editoras</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-purple-300">Companhia das Letras</span></li>
                <li><span className="text-purple-300">Editora Globo</span></li>
                <li><span className="text-purple-300">Editora Sextante</span></li>
                <li><span className="text-purple-300">Editora Aleph</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-3">Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-green-400">Sistema Ativo</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-blue-400">25+ Editoras</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-yellow-400">Auto-update</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
            <p className="text-purple-300 text-sm">
              © 2025 FC Brasil. Portal de Literatura e Notícias.
            </p>
            <p className="text-purple-400 text-xs mt-1">
              Desenvolvido por MiniMax Agent • Monitoramento automático 24/7
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
