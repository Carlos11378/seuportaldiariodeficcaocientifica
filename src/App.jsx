import React, { useState, useEffect } from 'react';
import { BookOpen, Rocket, Star, Sparkles, Zap, Globe, ChevronRight, TrendingUp, Award, Users, Clock, Eye, ArrowLeft, Heart, Bookmark, Share2, MessageCircle, ThumbsUp, AlertTriangle } from 'lucide-react';

// Import dos serviços (você precisa criar estes arquivos)
import { buscarNoticiasLiterarias, buscarLancamentosLivros, buscarPremios } from './services/literaturaApi';
import { editorasMonitoradas } from './data/editoras';

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

export default function Home() {
  const [activeTab, setActiveTab] = useState('hoje');
  const [dateTime, setDateTime] = useState(new Date());
  const [leituraAtiva, setLeituraAtiva] = useState(null);
  const [tipoLeitura, setTipoLeitura] = useState(null);
  const [curtidas, setCurtidas] = useState({});
  const [salvos, setSalvos] = useState([]);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [comentarioTexto, setComentarioTexto] = useState('');
  const [comentarios, setComentarios] = useState([]);

  // Estados para dados dinâmicos
  const [noticiasHoje, setNoticiasHoje] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [premios, setPremios] = useState([]);
  const [resenhasDiarias, setResenhasDiarias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Carregar dados dinâmicos das editoras
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        
        // Carregar dados de todas as fontes
        const [noticiasData, lancamentosData, premiosData, resenhasData] = await Promise.all([
          buscarNoticiasLiterarias(editorasMonitoradas),
          buscarLancamentosLivros(editorasMonitoradas),
          buscarPremios(),
          buscarResenhasComunitarias()
        ]);

        setNoticiasHoje(noticiasData);
        setLancamentos(lancamentosData);
        setPremios(premiosData);
        setResenhasDiarias(resenhasData);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback para dados estáticos em caso de erro
        setCarregamentoFallback();
      } finally {
        setLoading(false);
      }
    };

    carregarDados();

    // Configurar atualização automática a cada 6 horas
    const interval = setInterval(carregarDados, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const setCarregamentoFallback = () => {
    // Dados de fallback em caso de erro da API
    setNoticiasHoje([
      {
        id: 1,
        titulo: "Buscando últimas notícias das editoras...",
        autor: "FC Brasil",
        categoria: "Carregando",
        tempo: "Agora",
        imagem: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop",
        resumo: "Sistema buscando as últimas novidades do mundo literário brasileiro.",
        tags: ["Carregando"],
        views: "0"
      }
    ]);
  };

  const formatDate = () => {
    return dateTime.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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

  // Estado de carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-black mb-2">Carregando últimas notícias...</h2>
          <p className="text-gray-400">Buscando novidades das editoras em tempo real</p>
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
                  {leituraAtiva.tags.map((tag, i) => (
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

              <ImageWithFallback
                src={leituraAtiva.imagem}
                alt={leituraAtiva.titulo}
                className="w-full h-96 object-cover rounded-2xl mb-8"
                fallbackStyle="noticia"
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
                              <ImageWithFallback
                                src={comentario.avatar}
                                alt={comentario.autor}
                                className="w-12 h-12 rounded-full border-2 border-cyan-500"
                                fallbackStyle="avatar"
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
                  <ImageWithFallback
                    src={leituraAtiva.capa}
                    alt={leituraAtiva.titulo}
                    className="w-full rounded-2xl shadow-2xl shadow-purple-500/30"
                    fallbackStyle="book"
                  />
                  <div className="mt-6 p-6 bg-gradient-to-br from-purple-900/50 to-black border border-purple-500/30 rounded-2xl">
                    <RatingStars rating={leituraAtiva.rating} />
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
                      {leituraAtiva.descricao}
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
                                  <ImageWithFallback
                                    src={comentario.avatar}
                                    alt={comentario.autor}
                                    className="w-12 h-12 rounded-full border-2 border-cyan-500"
                                    fallbackStyle="avatar"
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
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-black text-white">FC Brasil</h1>
                <p className="text-sm text-gray-400">Literatura em Tempo Real</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">São Paulo, Brasil</p>
                <p className="text-xs text-purple-400 font-bold">{formatDate()}</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 bg-white/5 rounded-xl p-1">
            {[
              { id: 'hoje', label: 'Hoje', icon: Sparkles },
              { id: 'lancamentos', label: 'Lançamentos', icon: Rocket },
              { id: 'resenhas', label: 'Resenhas', icon: Star },
              { id: 'premios', label: 'Prêmios', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-12 max-w-7xl mx-auto px-4">
        {activeTab === 'hoje' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full text-white font-bold mb-6">
                <Zap className="w-5 h-5" />
                Destaque do Dia
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Literatura Atual
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                As últimas novidades das editoras e mundo literário brasileiro
              </p>
            </div>

            {/* News Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {noticiasHoje.map((noticia) => (
                <div 
                  key={noticia.id}
                  className="group cursor-pointer"
                  onClick={() => abrirLeitura(noticia, 'noticia')}
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
                    <div className="relative">
                      <ImageWithFallback
                        src={noticia.imagem}
                        alt={noticia.titulo}
                        className="w-full h-64 object-cover"
                        fallbackStyle="noticia"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
                          {noticia.categoria}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 bg-black/70 rounded-lg">
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span className="text-cyan-400 text-sm font-bold">{noticia.views}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {noticia.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-600/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl font-black mb-4 text-white group-hover:text-cyan-400 transition-colors leading-tight">
                        {noticia.titulo}
                      </h3>

                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {noticia.resumo}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {noticia.autor}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {noticia.tempo}
                          </span>
                        </div>
                        <button className="flex items-center gap-2 text-cyan-400 hover:text-purple-400 font-bold transition-colors">
                          Ler mais
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'lancamentos' && (
          <div className="space-y-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white font-bold mb-6">
                <Rocket className="w-5 h-5" />
                Novidades
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Lançamentos
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Os livros mais recentes das principais editoras brasileiras
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {lancamentos.map((livro) => (
                <div 
                  key={livro.id}
                  className="group cursor-pointer"
                  onClick={() => abrirLeitura(livro, 'livro')}
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
                    <div className="relative">
                      <ImageWithFallback
                        src={livro.capa}
                        alt={livro.titulo}
                        className="w-full h-80 object-cover"
                        fallbackStyle="book"
                      />
                      {livro.destaque && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                            Destaque
                          </span>
                        </div>
                      )}
                      {livro.novidade && (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                            {livro.novidade}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <RatingStars rating={livro.rating} />
                      
                      <h3 className="text-xl font-black mb-2 text-white group-hover:text-cyan-400 transition-colors mt-3">
                        {livro.titulo}
                      </h3>
                      
                      <p className="text-purple-400 font-bold mb-3">por {livro.autor}</p>
                      
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm font-bold rounded-full border border-blue-600/30">
                          {livro.genero}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {livro.descricao}
                      </p>

                      <button className="flex items-center gap-2 text-cyan-400 hover:text-purple-400 font-bold transition-colors text-sm">
                        Ver detalhes
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resenhas' && (
          <div className="space-y-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full text-white font-bold mb-6">
                <Star className="w-5 h-5" />
                Comunidade
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Resenhas Diárias
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                O que a comunidade está lendo e pensando sobre literatura
              </p>
            </div>

            <div className="space-y-6">
              {resenhasDiarias.map((resenha) => (
                <div 
                  key={resenha.id}
                  className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <ImageWithFallback
                      src={resenha.avatar}
                      alt={resenha.reviewer}
                      className="w-16 h-16 rounded-full border-3 border-cyan-500"
                      fallbackStyle="avatar"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="font-black text-white">{resenha.reviewer}</h3>
                          <p className="text-purple-400 font-bold">Resenhando: {resenha.livro}</p>
                          <p className="text-gray-500 text-sm">por {resenha.autor}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <RatingStars rating={resenha.rating} />
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {resenha.texto}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{resenha.tempo}</span>
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{resenha.curtidas}</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{resenha.comentarios}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'premios' && (
          <div className="space-y-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold mb-6">
                <Award className="w-5 h-5" />
                Reconhecimento
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Prêmios Literários
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Acompanhe os principais prêmios e reconhecimentos da literatura brasileira
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {premios.map((premio, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                >
                  <div className={`w-16 h-16 ${premio.cor} rounded-full flex items-center justify-center mb-6`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4">
                    {premio.nome}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {premio.status}
                  </p>
                  
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:shadow-lg transition-all">
                    Acompanhar
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Awards Section */}
            <div className="mt-16 text-center">
              <h3 className="text-3xl font-black text-white mb-8">Mais Prêmios</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  'Argo (Brasil)',
                  'Jabuti (Literatura)',
                  'Portugal Telecom',
                  'Portugal',
                  'Oscar/Nebula (FC)',
                  'Arthur C. Clarke',
                  'Asimov',
                  'World Fantasy',
                  'Bram Stoker',
                  'Andre Norton',
                  'Philip K. Dick',
                  'Premiado'
                ].map((premio, index) => (
                  <div 
                    key={index}
                    className="bg-white/5 border border-gray-700 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <p className="text-white font-bold">{premio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-black text-white">FC Brasil</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Agregador de literatura em tempo real. As últimas novidades das editoras brasileiras e mundo literário.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Conteúdo</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Notícias</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Resenhas</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Entrevistas</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Artigos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Comunidade</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Fórum</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Clubes de Leitura</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Eventos</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Newsletter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Conecte-se</h4>
              <div className="flex gap-4 mb-4">
                <button className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                © 2024 FC Brasil. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
