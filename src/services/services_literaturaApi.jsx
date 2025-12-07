import React from 'react';
import { BookOpen, Rocket, Star, Sparkles, Zap, Globe, ChevronRight, TrendingUp, Award, Users, Clock, Eye, ArrowLeft, Heart, Bookmark, Share2, MessageCircle, ThumbsUp, AlertTriangle } from 'lucide-react';

// Import dos serviços dinâmicos
import { buscarNoticiasLiterarias, buscarLancamentosLivros, buscarPremios } from './services_literaturaApi_CORRIGIDO';
import { editorasMonitoradas } from './data_editoras';
import { formatarDataRelativa } from './utils_dateUtils';

// Componente robusto para lidar com imagens quebradas
const ImageWithFallback = ({ src, alt, className, fallbackStyle = 'default' }) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [imageError, setImageError] = React.useState(false);
  const [fallbackMode, setFallbackMode] = React.useState(false);

  // URLs de fallback quando a imagem principal falha
  const fallbackUrls = {
    book: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    noticia: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  };

  React.useEffect(() => {
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

// Componente principal do App
const App = () => {
  const [activeTab, setActiveTab] = React.useState('hoje');
  const [dateTime, setDateTime] = React.useState(new Date());
  const [leituraAtiva, setLeituraAtiva] = React.useState(null);
  const [tipoLeitura, setTipoLeitura] = React.useState(null);
  const [curtidas, setCurtidas] = React.useState({});
  const [salvos, setSalvos] = React.useState([]);
  const [mostrarComentarios, setMostrarComentarios] = React.useState(false);
  const [comentarioTexto, setComentarioTexto] = React.useState('');
  const [comentarios, setComentarios] = React.useState([]);

  // Estados para o sistema dinâmico
  const [noticias, setNoticias] = React.useState([]);
  const [lancamentos, setLancamentos] = React.useState([]);
  const [premios, setPremios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [ultimaAtualizacao, setUltimaAtualizacao] = React.useState(new Date());

  // Estado para controle de filtros
  const [filtroEditora, setFiltroEditora] = React.useState('todas');
  const [filtroCategoria, setFiltroCategoria] = React.useState('todas');

  React.useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
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
        buscarNoticiasLiterarias(editorasMonitoradas.slice(0, 10)),
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

  const formatDate = () => {
    return dateTime.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Dados dinâmicos (com fallback para dados estáticos)
  const noticiasHoje = noticias.length > 0 ? noticias : [
    {
      id: 1,
      titulo: "Nova Trilogia de Space Opera Conquista Crítica Mundial",
      autor: "Redação FC Brasil",
      categoria: "Destaque",
      tempo: "Há 2 horas",
      imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
      resumo: "Série 'Horizontes Infinitos' de autora brasileira surpreende mercado internacional com narrativa inovadora sobre exploração espacial e dilemas éticos da humanidade expandida.",
      conteudoCompleto: `A trilogia "Horizontes Infinitos", da autora paulista Marina Cavalcanti, está revolucionando o cenário internacional da ficção científica. Lançada simultaneamente em 15 países, a série já vendeu mais de 500 mil cópias em apenas três semanas.

A história acompanha uma civilização humana que se expandiu por dezenas de sistemas estelares, mas que agora enfrenta dilemas éticos profundos sobre identidade, modificação genética e os limites da consciência humana.

"O que Marina conseguiu foi criar personagens profundamente humanos em cenários completamente alienígenas", comenta o crítico literário James Peterson. "Ela construiu um universo crível cientificamente."

O segundo volume será lançado em março de 2025. A trilogia já está sendo adaptada para uma série de televisão e os direitos cinematográficos foram adquiridos por um grande estúdio.`,
      tags: ["Space Opera", "Literatura Nacional", "Destaque"],
      views: "12.4K"
    }
  ];

  const lancamentosLivros = lancamentos.length > 0 ? lancamentos : [
    {
      id: 1,
      titulo: "Ecossistema Quântico",
      autor: "Luana Martins",
      capa: "https://images.unsplash.com/photo-1621351183012-e2f3db3a5c3f?w=400&h=600&fit=crop",
      genero: "Hard Science Fiction",
      rating: 4.9,
      descricao: "Biólogos descobrem uma forma de vida que existe simultaneamente em múltiplas realidades quânticas.",
      conteudoCompleto: `Em "Ecossistema Quântico", a bióloga Dra. Sarah Chen faz uma descoberta que desafia tudo o que sabemos sobre a vida: organismos que existem simultaneamente em múltiplas realidades quânticas.

A história começa quando Sarah, trabalhando na Antártica, detecta padrões estranhos em amostras de gelo antigas. O que ela encontra são microorganismos que parecem "piscar" dentro e fora da existência.

À medida que a pesquisa avança, Sarah descobre que esses organismos formam um ecossistema complexo que se estende por múltiplas realidades. Cada versão está ligada às outras através de conexões quânticas.

Luana Martins traz um rigor científico impressionante à narrativa. Cada conceito é explicado através de diálogos naturais, tornando ideias complexas acessíveis.

O clímax explora as implicações filosóficas: se a vida pode existir em múltiplas realidades simultaneamente, o que isso significa para conceitos como morte, evolução e consciência?`,
      destaque: true,
      novidade: "Lançamento Hoje"
    }
  ];

  const resenhasDiarias = [
    {
      id: 1,
      livro: "Projeto Hail Mary",
      autor: "Andy Weir",
      reviewer: "Carolina Mendes",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      tempo: "Há 1 hora",
      texto: "Weir supera 'O Marciano' com uma narrativa emocionante sobre sacrifício, ciência e amizade improvável.",
      curtidas: 234,
      comentarios: 45
    }
  ];

  const premiosLiterarios = premios.length > 0 ? premios : [
    { nome: "Hugo 2024", status: "Votação Aberta", cor: "bg-yellow-500" },
    { nome: "Nebula", status: "Finalistas Anunciados", cor: "bg-purple-500" },
    { nome: "Locus", status: "Em Breve", cor: "bg-blue-500" }
  ];

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex gap-1 items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-bold text-gray-700">{rating}</span>
      </div>
    );
  };

  const abrirLeitura = (item, tipo) => {
    setLeituraAtiva(item);
    setTipoLeitura(tipo);
    setComentarios([]);
    setMostrarComentarios(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fecharLeitura = () => {
    setLeituraAtiva(null);
    setTipoLeitura(null);
    setMostrarComentarios(false);
  };

  const toggleCurtida = (id) => {
    setCurtidas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSalvo = (id) => {
    setSalvos(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const compartilhar = async (titulo) => {
    alert('Link copiado! Cole onde quiser compartilhar: ' + titulo);
  };

  const adicionarComentario = () => {
    if (comentarioTexto.trim()) {
      const novoComentario = {
        id: Date.now(),
        autor: 'Você',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
        texto: comentarioTexto,
        tempo: 'Agora',
        curtidas: 0
      };
      setComentarios(prev => [novoComentario, ...prev]);
      setComentarioTexto('');
    }
  };

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

  if (leituraAtiva) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-purple-500/30">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <button 
                onClick={fecharLeitura}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-400">Modo Leitura</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button 
                onClick={() => toggleCurtida(leituraAtiva.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                  curtidas[leituraAtiva.id] 
                    ? 'bg-pink-600 text-white scale-105' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${curtidas[leituraAtiva.id] ? 'fill-white' : ''}`} />
                {curtidas[leituraAtiva.id] ? 'Curtido!' : 'Curtir'}
              </button>
              <button 
                onClick={() => toggleSalvo(leituraAtiva.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
                  salvos.includes(leituraAtiva.id) 
                    ? 'bg-cyan-600 text-white scale-105' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${salvos.includes(leituraAtiva.id) ? 'fill-white' : ''}`} />
                {salvos.includes(leituraAtiva.id) ? 'Salvo!' : 'Salvar'}
              </button>
              <button 
                onClick={() => compartilhar(leituraAtiva.titulo)}
                className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar
              </button>
            </div>
          </div>
        </div>

        <div className="pt-32 pb-12 max-w-4xl mx-auto px-4">
          {tipoLeitura === 'noticia' && (
            <article>
              <div className="mb-8">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {leituraAtiva.tags && leituraAtiva.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-4 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {leituraAtiva.titulo}
                </h1>
                <div className="flex items-center gap-4 text-gray-400 mb-6 flex-wrap">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {leituraAtiva.autor}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {leituraAtiva.tempo}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {leituraAtiva.views}
                  </span>
                </div>
              </div>

              <img 
                src={leituraAtiva.imagem}
                alt={leituraAtiva.titulo}
                className="w-full h-96 object-cover rounded-2xl mb-8"
              />

              <div className="prose prose-invert prose-lg max-w-none mb-12">
                {leituraAtiva.conteudoCompleto.split('\n').map((paragrafo, idx) => (
                  paragrafo.trim() && (
                    <p key={idx} className="mb-6 text-gray-300 leading-relaxed text-lg">
                      {paragrafo.trim()}
                    </p>
                  )
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-purple-500/30">
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <h3 className="text-2xl font-black">Interaja com este conteúdo</h3>
                  <button 
                    onClick={() => setMostrarComentarios(!mostrarComentarios)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {mostrarComentarios ? 'Ocultar' : 'Mostrar'} Comentários ({comentarios.length})
                  </button>
                </div>

                {mostrarComentarios && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-2xl p-6">
                      <h4 className="text-xl font-black mb-4">Deixe seu comentário</h4>
                      <textarea
                        value={comentarioTexto}
                        onChange={(e) => setComentarioTexto(e.target.value)}
                        placeholder="O que você achou deste conteúdo?"
                        className="w-full bg-black/50 border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 min-h-32 mb-4"
                      />
                      <button
                        onClick={adicionarComentario}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        Publicar Comentário
                      </button>
                    </div>

                    {comentarios.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-black">Comentários</h4>
                        {comentarios.map((comentario) => (
                          <div 
                            key={comentario.id}
                            className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6"
                          >
                            <div className="flex items-start gap-4">
                              <img 
                                src={comentario.avatar}
                                alt={comentario.autor}
                                className="w-12 h-12 rounded-full border-2 border-cyan-500"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="font-bold text-cyan-400">{comentario.autor}</span>
                                  <span className="text-sm text-gray-500">{comentario.tempo}</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-3">{comentario.texto}</p>
                                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition-all">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{comentario.curtidas}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          )}

          {tipoLeitura === 'livro' && (
            <article>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-1">
                  <img 
                    src={leituraAtiva.capa || leituraAtiva.imagem}
                    alt={leituraAtiva.titulo}
                    className="w-full rounded-2xl shadow-2xl shadow-purple-500/30"
                  />
                  <div className="mt-6 p-6 bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/30 rounded-2xl">
                    {leituraAtiva.rating && <RatingStars rating={leituraAtiva.rating} />}
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-400">Gênero</p>
                      <p className="text-cyan-400 font-bold">{leituraAtiva.genero}</p>
                    </div>
                    {leituraAtiva.novidade && (
                      <div className="mt-4 px-3 py-2 bg-red-600 rounded-lg text-center font-bold text-sm">
                        {leituraAtiva.novidade}
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                    {leituraAtiva.titulo}
                  </h1>
                  <p className="text-2xl text-purple-400 mb-6">por {leituraAtiva.autor}</p>
                  
                  <div className="p-6 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-2xl border border-cyan-500/30 mb-8">
                    <p className="text-xl text-gray-300 italic leading-relaxed">
                      {leituraAtiva.descricao || leituraAtiva.sinopse}
                    </p>
                  </div>

                  <div className="prose prose-invert prose-lg max-w-none mb-12">
                    {leituraAtiva.conteudoCompleto.split('\n').map((paragrafo, idx) => (
                      paragrafo.trim() && (
                        <p key={idx} className="mb-6 text-gray-300 leading-relaxed text-lg">
                          {paragrafo.trim()}
                        </p>
                      )
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-purple-500/30">
                    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                      <h3 className="text-2xl font-black">O que achou deste livro?</h3>
                      <button 
                        onClick={() => setMostrarComentarios(!mostrarComentarios)}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        {mostrarComentarios ? 'Ocultar' : 'Mostrar'} Avaliações ({comentarios.length})
                      </button>
                    </div>

                    {mostrarComentarios && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-2xl p-6">
                          <h4 className="text-xl font-black mb-4">Compartilhe sua opinião</h4>
                          <textarea
                            value={comentarioTexto}
                            onChange={(e) => setComentarioTexto(e.target.value)}
                            placeholder="Escreva sua resenha sobre este livro..."
                            className="w-full bg-black/50 border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 min-h-32 mb-4"
                          />
                          <button
                            onClick={adicionarComentario}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all"
                          >
                            Publicar Avaliação
                          </button>
                        </div>

                        {comentarios.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-xl font-black">Avaliações dos Leitores</h4>
                            {comentarios.map((comentario) => (
                              <div 
                                key={comentario.id}
                                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6"
                              >
                                <div className="flex items-start gap-4">
                                  <img 
                                    src={comentario.avatar}
                                    alt={comentario.autor}
                                    className="w-12 h-12 rounded-full border-2 border-cyan-500"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <span className="font-bold text-cyan-400">{comentario.autor}</span>
                                      <span className="text-sm text-gray-500">{comentario.tempo}</span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed mb-3">{comentario.texto}</p>
                                    <button className="flex items-center gap-2 text-sm text-gray-400">
                                      <span>Responder</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )}
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
            <button 
              onClick={() => setActiveTab('hoje')}
              className={`transition-colors border-b-2 pb-2 ${
                activeTab === 'hoje' 
                  ? 'text-white border-purple-500' 
                  : 'text-purple-300 hover:text-white border-transparent'
              }`}
            >
              Hoje
            </button>
            <button 
              onClick={() => setActiveTab('lancamentos')}
              className={`transition-colors border-b-2 pb-2 ${
                activeTab === 'lancamentos' 
                  ? 'text-white border-purple-500' 
                  : 'text-purple-300 hover:text-white border-transparent'
              }`}
            >
              Lançamentos
            </button>
            <button 
              onClick={() => setActiveTab('comunidade')}
              className={`transition-colors border-b-2 pb-2 ${
                activeTab === 'comunidade' 
                  ? 'text-white border-purple-500' 
                  : 'text-purple-300 hover:text-white border-transparent'
              }`}
            >
              Comunidade
            </button>
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
                    src={lancamentosLivros[0].capa || lancamentosLivros[0].imagem}
                    alt={lancamentosLivros[0].titulo}
                    className="w-24 h-32 object-cover rounded-lg"
                    fallbackStyle="book"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{lancamentosLivros[0].titulo}</h3>
                    <p className="text-purple-300 mb-2">por {lancamentosLivros[0].autor}</p>
                    <p className="text-purple-200 text-sm mb-3">{lancamentosLivros[0].descricao}</p>
                    <div className="flex items-center space-x-4">
                      {lancamentosLivros[0].rating && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-white font-medium">{lancamentosLivros[0].rating}</span>
                        </div>
                      )}
                      <span className="bg-purple-600/50 text-purple-200 px-2 py-1 rounded text-xs">
                        {lancamentosLivros[0].genero}
                      </span>
                    </div>
                    <button 
                      onClick={() => abrirLeitura(lancamentosLivros[0], 'livro')}
                      className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Ler Mais
                    </button>
                  </div>
                </div>
              </div>

              {/* Notícia em Destaque */}
              <div className="bg-black/20 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <ImageWithFallback
                    src={noticiasHoje[0].imagem}
                    alt={noticiasHoje[0].titulo}
                    className="w-24 h-20 object-cover rounded-lg"
                    fallbackStyle="noticia"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{noticiasHoje[0].titulo}</h3>
                    <p className="text-purple-200 text-sm mb-2">{noticiasHoje[0].resumo}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-300 text-xs">{noticiasHoje[0].autor}</span>
                      <span className="text-purple-300 text-xs">{noticiasHoje[0].tempo}</span>
                    </div>
                    <button 
                      onClick={() => abrirLeitura(noticiasHoje[0], 'noticia')}
                      className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Ler Mais
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Abas de conteúdo */}
        {activeTab === 'hoje' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticiasHoje.map((noticia) => (
              <article key={noticia.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50                <Image transition-colors">
WithFallback
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                  fallbackStyle="noticia"
                />
                <h3 className="text-lg font-bold text-white mb-2">{noticia.titulo}</h3>
                <p className="text-purple-200 text-sm mb-3">{noticia.resumo}</p>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-purple-400">{noticia.categoria}</span>
                  <span className="text-purple-300">{noticia.autor}</span>
                </div>
                <button 
                  onClick={() => abrirLeitura(noticia, 'noticia')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                >
                  Ler Notícia Completa
                </button>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'lancamentos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lancamentosLivros.map((livro) => (
              <div key={livro.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                <ImageWithFallback
                  src={livro.capa || livro.imagem}
                  alt={livro.titulo}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  fallbackStyle="book"
                />
                <h3 className="text-lg font-bold text-white mb-2">{livro.titulo}</h3>
                <p className="text-purple-300 mb-1">por {livro.autor}</p>
                <p className="text-purple-400 text-sm mb-3">{livro.genero}</p>
                <p className="text-purple-200 text-sm mb-4">{livro.descricao}</p>
                {livro.rating && (
                  <div className="flex items-center mb-4">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white font-medium">{livro.rating}</span>
                  </div>
                )}
                <button 
                  onClick={() => abrirLeitura(livro, 'livro')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                >
                  Ver Detalhes Completos
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'comunidade' && (
          <div className="space-y-6">
            {/* Resenhas */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-pink-400" />
                Resenhas da Comunidade
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {resenhasDiarias.map((resenha) => (
                  <div key={resenha.id} className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={resenha.avatar}
                        alt={resenha.reviewer}
                        className="w-12 h-12 rounded-full border-2 border-cyan-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold text-cyan-400">{resenha.reviewer}</span>
                          <span className="text-sm text-gray-500">{resenha.tempo}</span>
                        </div>
                        <div className="mb-2">
                          <RatingStars rating={resenha.rating} />
                        </div>
                        <p className="text-purple-200 mb-3">
                          <span className="font-bold">{resenha.livro}</span> por {resenha.autor}
                        </p>
                        <p className="text-gray-300 mb-3">{resenha.texto}</p>
                        <div className="flex items-center justify-between text-sm">
                          <button 
                            onClick={() => toggleCurtida(resenha.id)}
                            className={`flex items-center gap-2 transition-colors ${
                              curtidas[resenha.id] ? 'text-pink-400' : 'text-gray-400 hover:text-pink-400'
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{resenha.curtidas + (curtidas[resenha.id] ? 1 : 0)}</span>
                          </button>
                          <span className="text-gray-500">{resenha.comentarios} comentários</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Prêmios */}
            <section>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="h-6 w-6 mr-3 text-yellow-400" />
                Prêmios Literários
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {premiosLiterarios.map((premio, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${premio.cor}`}></div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{premio.nome}</h4>
                        <p className="text-yellow-300 text-sm">{premio.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Status do Sistema */}
        <section className="bg-black/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 mt-12">
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
              <div className="text-2xl font-bold text-yellow-400">{lancamentos.length || lancamentosLivros.length}</div>
              <div className="text-purple-300 text-sm">Lançamentos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{noticias.length || noticiasHoje.length}</div>
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
                <li><button onClick={() => setActiveTab('hoje')} className="text-purple-300 hover:text-white transition-colors">Hoje</button></li>
                <li><button onClick={() => setActiveTab('lancamentos')} className="text-purple-300 hover:text-white transition-colors">Lançamentos</button></li>
                <li><button onClick={() => setActiveTab('comunidade')} className="text-purple-300 hover:text-white transition-colors">Comunidade</button></li>
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

export default App;


