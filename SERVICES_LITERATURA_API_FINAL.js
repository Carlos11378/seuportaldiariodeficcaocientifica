const gerarLancamentosMelhorados = () => {
  const dataAtual = new Date();

  return [
    {
      id: 1,
      titulo: "O Jardim das Mentiras",
      autor: "Lucia Ferreira",
      capa: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
      genero: "Romance Psicológico",
      rating: 4.6,
      descricao: "Um thriller psicológico que explora as complexidades da memória e do esquecimento.",
      conteudoCompleto: "Em 'O Jardim das Mentiras', Lucia Ferreira constrói uma narrativa envolvente...",
      destaque: true,
      novidade: new Date(dataAtual.getTime() - (1 * 24 * 60 * 60 * 1000)).toISOString()
    },
    {
      id: 2,
      titulo: "Cartas de um Morto",
      autor: "Roberto Silva",
      capa: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=80",
      genero: "Ficção Científica",
      rating: 4.8,
      descricao: "Uma exploração tocante sobre morte, memória e tecnologia através de cartas póstumas.",
      conteudoCompleto: "Roberto Silva entrega uma obra-prima da ficção científica contemporânea...",
      destaque: false,
      novidade: new Date(dataAtual.getTime() - (3 * 24 * 60 * 60 * 1000)).toISOString()
    },
    {
      id: 3,
      titulo: "São Paulo: Cidade das Emoções",
      autor: "Ana Paula Santos",
      capa: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
      genero: "Crônica",
      rating: 4.5,
      descricao: "Crônicas urbanas que capturam a alma da maior cidade do Brasil.",
      conteudoCompleto: "Ana Paula Santos nos presenteia com crônicas que dão vida às ruas paulistanas...",
      destaque: false,
      novidade: new Date(dataAtual.getTime() - (5 * 24 * 60 * 60 * 1000)).toISOString()
    }
  ];
};

