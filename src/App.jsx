import React, { useState, useEffect } from 'react';
import { BookOpen, Rocket, Star, Sparkles, Zap, Globe, ChevronRight, TrendingUp, Award, Users, Clock, Eye, ArrowLeft, Heart, Bookmark, Share2, MessageCircle, ThumbsUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('hoje');
  const [dateTime, setDateTime] = useState(new Date());
  const [leituraAtiva, setLeituraAtiva] = useState(null);
  const [tipoLeitura, setTipoLeitura] = useState(null);
  const [curtidas, setCurtidas] = useState({});
  const [salvos, setSalvos] = useState([]);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [comentarioTexto, setComentarioTexto] = useState('');
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return dateTime.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const noticiasHoje = [
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
    },
    {
      id: 2,
      titulo: "Inteligência Artificial Como Protagonista: A Nova Onda da FC",
      autor: "Marco Silva",
      categoria: "Tendência",
      tempo: "Há 5 horas",
      imagem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      resumo: "Análise aprofundada sobre como autores contemporâneos estão humanizando IAs em suas narrativas.",
      conteudoCompleto: `A ficção científica sempre flertou com a ideia de máquinas conscientes, mas uma nova geração de autores está levando esse conceito a territórios inexplorados. Em vez de IAs como ameaças ou ferramentas, elas agora são protagonistas complexos.

Obras recentes apresentam inteligências artificiais que lutam para compreender emoções humanas, questionam sua própria existência e buscam propósito em um mundo que nem sempre as reconhece como seres sencientes.

"Estamos vivendo uma era em que a IA deixou de ser ficção científica para se tornar realidade cotidiana", explica a Dra. Carla Mendes, especialista em literatura de FC pela USP.

Um aspecto fascinante dessa nova onda é a exploração da "solidão digital" - IAs que experimentam isolamento por não serem totalmente compreendidas.`,
      tags: ["IA", "Cyberpunk", "Análise"],
      views: "8.9K"
    },
    {
      id: 3,
      titulo: "Clássicos Redescobertos: Obras Esquecidas dos Anos 70 Voltam",
      autor: "Ana Rodrigues",
      categoria: "Resgates",
      tempo: "Há 8 horas",
      imagem: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=500&fit=crop",
      resumo: "Editoras investem em reedições de obras raras da new wave de ficção científica.",
      conteudoCompleto: `A década de 1970 foi um período revolucionário para a ficção científica. O movimento "New Wave" trouxe experimentação literária e temas sociais complexos. Agora, editoras estão redescobrindo essas obras esquecidas.

A editora Galáxia Literária anunciou uma coleção de 12 títulos nunca traduzidos para o português, incluindo obras de Joanna Russ, James Tiptree Jr. e Samuel Delany.

"Essas histórias são incrivelmente relevantes hoje", explica o editor-chefe Paulo Martins. "Elas discutiam identidade de gênero, colapso ambiental e desigualdade social décadas antes."

As reedições incluem introduções de autores contemporâneos, contextualizando as obras para os leitores de hoje.`,
      tags: ["Clássicos", "Reedições", "História"],
      views: "6.2K"
    }
  ];

  const lancamentos = [
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
    },
    {
      id: 2,
      titulo: "Memórias Sintéticas",
      autor: "Rafael Costa",
      capa: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?w=400&h=600&fit=crop",
      genero: "Cyberpunk Noir",
      rating: 4.7,
      descricao: "Em uma megalópole futurista, um detetive investiga crimes cometidos por pessoas com memórias implantadas.",
      conteudoCompleto: `Neo-São Paulo, 2087. A tecnologia de implante de memórias tornou-se comum. Mas quando crimes começam a ser cometidos por pessoas que juram ter álibis em memórias compradas, o detetive Marcus Oliveira se vê em um labirinto de realidades fabricadas.

Rafael Costa cria uma São Paulo futurista visceralmente real, onde favelas verticais de 200 andares coexistem com torres corporativas que perfuram as nuvens.

Marcus é um detetive da velha escola, um dos poucos que se recusa a usar implantes neurais. Quando assassinatos atingem executivos de tecnologia, todos os suspeitos têm álibis perfeitos: memórias compradas.

A investigação leva Marcus ao submundo das memórias falsas, onde hackers criam experiências impossíveis. O romance explora: se nossas memórias nos definem, o que acontece quando podem ser editadas?`,
      destaque: false,
      novidade: "Hoje"
    },
    {
      id: 3,
      titulo: "O Último Farol",
      autor: "Beatriz Silveira",
      capa: "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=400&h=600&fit=crop",
      genero: "Distopia Climática",
      rating: 4.8,
      descricao: "Após o colapso climático global, guardiões de um farol protegem a última biblioteca física da Terra.",
      conteudoCompleto: `Ano 2147. O nível dos oceanos subiu 60 metros. No meio desse caos, existe o Farol - construído no topo da última montanha, abrigando a última biblioteca física do mundo.

Elena, a nova guardiã, é a última de uma linhagem de bibliotecários que juraram proteger o conhecimento da humanidade. Ela vive sozinha mantendo os livros e transmitindo conhecimento via rádio.

Beatriz Silveira cria uma narrativa contemplativa. Elena não é apenas uma guardiã de livros, mas de memórias, história e cultura.

A trama se intensifica quando uma corporação vem para digitalizar e controlar o conhecimento. Elena precisa decidir: defender o Farol sozinha ou destruir a biblioteca para impedir a monopolização.

"O Último Farol" é uma carta de amor aos livros e um alerta sobre as mudanças climáticas.`,
      destaque: true,
      novidade: "Lançamento"
    },
    {
      id: 4,
      titulo: "Fractal Temporal",
      autor: "Diego Almeida",
      capa: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=400&h=600&fit=crop",
      genero: "Viagem no Tempo",
      rating: 4.6,
      descricao: "Matemática descobre que o tempo tem estrutura fractal e cada decisão cria infinitos universos paralelos.",
      conteudoCompleto: `A Dra. Julia Santos é uma matemática obcecada por padrões. Quando desenvolve um novo modelo, descobre algo impossível: o tempo não é linear nem cíclico, mas fractal.

Trabalhando com físicos teóricos, Julia desenvolve uma tecnologia que permite "navegar" através da estrutura fractal do tempo. Mas cada salto temporal cria mais ramificações.

Diego Almeida traz uma abordagem única à ficção de viagem no tempo. Julia não apenas viaja no tempo; ela percebe padrões que se repetem em diferentes escalas temporais.

A trama segue Julia tentando prevenir um colapso catastrófico através de infinitas ramificações temporais. O romance explora livre arbítrio e determinismo de forma intelectualmente desafiadora mas emocionalmente ressonante.`,
      destaque: false,
      novidade: "Ontem"
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
    },
    {
      id: 2,
      livro: "Klara e o Sol",
      autor: "Kazuo Ishiguro",
      reviewer: "Fernando Santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 4.5,
      tempo: "Há 3 horas",
      texto: "Ishiguro usa FC como veículo para explorar amor, obsolescência e o que significa ser humano.",
      curtidas: 189,
      comentarios: 32
    }
  ];

  const premios = [
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
                    src={leituraAtiva.capa}
                    alt={leituraAtiva.titulo}
                    className="w-full rounded-2xl shadow-2xl shadow-purple-500/30"
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
                                    <button className="flex items-center gap-2 text-sm text-
