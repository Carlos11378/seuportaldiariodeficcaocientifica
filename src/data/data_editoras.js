// src/data/data_editoras.js
// Lista de editoras monitoradas - exporta editorasMonitoradas e helpers

export const editorasMonitoradas = [
  { id: 1, nome: "Companhia das Letras", tipo: "Editora Independente", url: "https://www.companhiadasletras.com.br", ativa: true, categoria: "Literatura Geral", destaque: true },
  { id: 2, nome: "Editora Globo", tipo: "Grande Editora", url: "https://www.editoraglobo.com.br", ativa: true, categoria: "Literatura Geral", destaque: true },
  { id: 3, nome: "Editora Record", tipo: "Grande Editora", url: "https://www.record.com.br", ativa: true, categoria: "Literatura Geral", destaque: true },
  { id: 4, nome: "Editora Rocco", tipo: "Grande Editora", url: "https://www.rocco.com.br", ativa: true, categoria: "Literatura Geral", destaque: true },
  { id: 5, nome: "Editora Alfaguara", tipo: "Editora Internacional", url: "https://www.alfaguara.com.br", ativa: true, categoria: "Literatura Internacional", destaque: true },
  { id: 6, nome: "Editora Cosac Naify", tipo: "Editora Independente", url: "https://www.cosacnaify.com.br", ativa: true, categoria: "Literatura Independente", destaque: false },
  { id: 7, nome: "Editora 34", tipo: "Editora Independente", url: "https://www.editora34.com.br", ativa: true, categoria: "Literatura Independente", destaque: false },
  { id: 8, nome: "Editora Martins", tipo: "Editora Tradicional", url: "https://www.editoramartins.com.br", ativa: true, categoria: "Literatura Clássica", destaque: false },
  { id: 9, nome: "Editora Zahar", tipo: "Editora Acadêmica", url: "https://www.zahar.com.br", ativa: true, categoria: "Ensino e Referência", destaque: false },
  { id: 10, nome: "Editora Context", tipo: "Editora Acadêmica", url: "https://www.context.com.br", ativa: true, categoria: "Ensino e Referência", destaque: false },
  { id: 11, nome: "Editora Sextante", tipo: "Editora de Autoajuda", url: "https://www.sextante.com.br", ativa: true, categoria: "Autoajuda e Desenvolvimento", destaque: false },
  { id: 12, nome: "Editora Paz e Terra", tipo: "Editora Social", url: "https://www.pazeterra.com.br", ativa: true, categoria: "Literatura Social", destaque: false },
  { id: 13, nome: "Editora Nova Fronteira", tipo: "Editora Tradicional", url: "https://www.novafronteira.com.br", ativa: true, categoria: "Literatura Geral", destaque: false },
  { id: 14, nome: "Editora Objetiva", tipo: "Grande Editora", url: "https://www.objetiva.com.br", ativa: true, categoria: "Literatura Geral", destaque: false },
  { id: 15, nome: "Editora Intrínseca", tipo: "Editora Digital", url: "https://www.intrinseca.com.br", ativa: true, categoria: "Literatura Digital", destaque: false },
  { id: 16, nome: "Editora L&PM", tipo: "Editora Popular", url: "https://www.lpm.com.br", ativa: true, categoria: "Literatura Popular", destaque: false },
  { id: 17, nome: "Editora Jorge Zahar", tipo: "Editora Acadêmica", url: "https://www.zahar.com.br", ativa: true, categoria: "Ensino e Referência", destaque: false },
  { id: 18, nome: "Editora Sesc", tipo: "Editora Cultural", url: "https://www.sesc.com.br", ativa: true, categoria: "Literatura Cultural", destaque: false },
  { id: 19, nome: "Editora Unesp", tipo: "Editora Universitária", url: "https://www.editoraunesp.com.br", ativa: true, categoria: "Literatura Acadêmica", destaque: false },
  { id: 20, nome: "Editora FTD", tipo: "Editora Educacional", url: "https://www.ftd.com.br", ativa: true, categoria: "Literatura Educacional", destaque: false },
  { id: 21, nome: "Editora Moderna", tipo: "Editora Educacional", url: "https://www.moderna.com.br", ativa: true, categoria: "Literatura Educacional", destaque: false },
  { id: 22, nome: "Editora Ática", tipo: "Editora Educacional", url: "https://www.atica.com.br", ativa: true, categoria: "Literatura Educacional", destaque: false },
  { id: 23, nome: "Editora Saraiva", tipo: "Editora Educacional", url: "https://www.saraiva.com.br", ativa: true, categoria: "Literatura Educacional", destaque: false },
  { id: 24, nome: "Editora Pearson", tipo: "Editora Educacional", url: "https://www.pearson.com.br", ativa: true, categoria: "Literatura Educacional", destaque: false },
  { id: 25, nome: "Editora Abril", tipo: "Editora de Revistas", url: "https://www.abril.com.br", ativa: true, categoria: "Literatura Magazine", destaque: false }
];

export const getEditorasAtivas = () => editorasMonitoradas.filter(e => e.ativa);
export const getEditorasDestaque = () => editorasMonitoradas.filter(e => e.destaque);
export const getEditorasPorCategoria = (categoria) => editorasMonitoradas.filter(e => e.categoria === categoria && e.ativa);
export const getEditoraPorId = (id) => editorasMonitoradas.find(e => e.id === id);
export const getEditoraPorNome = (nome) => editorasMonitoradas.find(e => e.nome.toLowerCase().includes(nome.toLowerCase()));
export const getTotalEditorasAtivas = () => getEditorasAtivas().length;
export const getCategorias = () => [...new Set(editorasMonitoradas.map(e => e.categoria))].sort();
export const getEstatisticas = () => {
  const ativas = getEditorasAtivas();
  const destaques = getEditorasDestaque();
  const categorias = getCategorias();
  return { total: editorasMonitoradas.length, ativas: ativas.length, destaques: destaques.length, categorias: categorias.length, categoriasLista: categorias };
};

