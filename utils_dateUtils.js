// Utilitários para manipulação e formatação de datas
// Sistema de datas para o agregador de literatura

/**
 * Formata uma data relativa (ex: "Há 2 horas", "Há 3 dias")
 * @param {Date|string|number} data - Data para formatar
 * @returns {string} - Data formatada relativemente
 */
export const formatarDataRelativa = (data) => {
  const agora = new Date();
  const dataObj = new Date(data);
  
  // Verificar se a data é válida
  if (isNaN(dataObj.getTime())) {
    return "Data inválida";
  }
  
  const diffMs = agora.getTime() - dataObj.getTime();
  const diffSegundos = Math.floor(diffMs / 1000);
  const diffMinutos = Math.floor(diffSegundos / 60);
  const diffHoras = Math.floor(diffMinutos / 60);
  const diffDias = Math.floor(diffHoras / 24);
  
  if (diffSegundos < 60) {
    return "Agora";
  } else if (diffMinutos < 60) {
    return `Há ${diffMinutos} minuto${diffMinutos !== 1 ? 's' : ''}`;
  } else if (diffHoras < 24) {
    return `Há ${diffHoras} hora${diffHoras !== 1 ? 's' : ''}`;
  } else if (diffDias < 7) {
    return `Há ${diffDias} dia${diffDias !== 1 ? 's' : ''}`;
  } else {
    // Para datas mais antigas, mostrar data absoluta
    return formatarDataAbsoluta(dataObj);
  }
};

/**
 * Formata uma data de forma absoluta (ex: "06 de dezembro de 2024")
 * @param {Date|string|number} data - Data para formatar
 * @param {boolean} incluirHora - Se deve incluir a hora
 * @returns {string} - Data formatada absolutamente
 */
export const formatarDataAbsoluta = (data, incluirHora = false) => {
  const dataObj = new Date(data);
  
  if (isNaN(dataObj.getTime())) {
    return "Data inválida";
  }
  
  const opcoes = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  
  if (incluirHora) {
    opcoes.hour = '2-digit';
    opcoes.minute = '2-digit';
  }
  
  return dataObj.toLocaleDateString('pt-BR', opcoes);
};

/**
 * Formata apenas o horário (ex: "14:30")
 * @param {Date|string|number} data - Data para extrair horário
 * @returns {string} - Horário formatado
 */
export const formatarHorario = (data) => {
  const dataObj = new Date(data);
  
  if (isNaN(dataObj.getTime())) {
    return "--:--";
  }
  
  return dataObj.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

/**
 * Verifica se uma data é de hoje
 * @param {Date|string|number} data - Data para verificar
 * @returns {boolean} - True se é hoje
 */
export const éHoje = (data) => {
  const dataObj = new Date(data);
  const hoje = new Date();
  
  return dataObj.getDate() === hoje.getDate() &&
         dataObj.getMonth() === hoje.getMonth() &&
         dataObj.getYear() === hoje.getYear();
};

/**
 * Verifica se uma data é desta semana
 * @param {Date|string|number} data - Data para verificar
 * @returns {boolean} - True se é desta semana
 */
export const éEstaSemana = (data) => {
  const dataObj = new Date(data);
  const agora = new Date();
  const inicioSemana = new Date(agora.setDate(agora.getDate() - agora.getDay()));
  
  return dataObj >= inicioSemana;
};

/**
 * Verifica se uma data é deste mês
 * @param {Date|string|number} data - Data para verificar
 * @returns {boolean} - True se é deste mês
 */
export const éEsteMes = (data) => {
  const dataObj = new Date(data);
  const agora = new Date();
  
  return dataObj.getMonth() === agora.getMonth() &&
         dataObj.getYear() === agora.getYear();
};

/**
 * Obtém a data de início do dia (00:00:00)
 * @param {Date|string|number} data - Data base
 * @returns {Date} - Data do início do dia
 */
export const inicioDoDia = (data) => {
  const dataObj = new Date(data);
  dataObj.setHours(0, 0, 0, 0);
  return dataObj;
};

/**
 * Obtém a data de fim do dia (23:59:59)
 * @param {Date|string|number} data - Data base
 * @returns {Date} - Data do fim do dia
 */
export const fimDoDia = (data) => {
  const dataObj = new Date(data);
  dataObj.setHours(23, 59, 59, 999);
  return dataObj;
};

/**
 * Adiciona dias a uma data
 * @param {Date|string|number} data - Data base
 * @param {number} dias - Número de dias para adicionar
 * @returns {Date} - Nova data
 */
export const adicionarDias = (data, dias) => {
  const dataObj = new Date(data);
  dataObj.setDate(dataObj.getDate() + dias);
  return dataObj;
};

/**
 * Subtrai dias de uma data
 * @param {Date|string|number} data - Data base
 * @param {number} dias - Número de dias para subtrair
 * @returns {Date} - Nova data
 */
export const subtrairDias = (data, dias) => {
  const dataObj = new Date(data);
  dataObj.setDate(dataObj.getDate() - dias);
  return dataObj;
};

/**
 * Gera timestamps para intervalos de tempo
 * @param {string} intervalo - Tipo de intervalo ('hora', 'dia', 'semana', 'mes')
 * @returns {object} - Objeto com timestamps de início e fim
 */
export const gerarIntervalo = (intervalo) => {
  const agora = new Date();
  let inicio, fim = agora;
  
  switch (intervalo.toLowerCase()) {
    case 'hora':
      inicio = new Date(agora.getTime() - 60 * 60 * 1000); // 1 hora atrás
      break;
    case 'dia':
      inicio = subtrairDias(agora, 1);
      break;
    case 'semana':
      inicio = subtrairDias(agora, 7);
      break;
    case 'mes':
      inicio = subtrairDias(agora, 30);
      break;
    default:
      inicio = subtrairDias(agora, 1);
  }
  
  return {
    inicio: inicio.toISOString(),
    fim: fim.toISOString(),
    inicioMs: inicio.getTime(),
    fimMs: fim.getTime()
  };
};

/**
 * Calcula a idade de uma data em diferentes unidades
 * @param {Date|string|number} data - Data para calcular idade
 * @returns {object} - Objeto com idade em diferentes unidades
 */
export const calcularIdadeData = (data) => {
  const dataObj = new Date(data);
  const agora = new Date();
  const diffMs = agora.getTime() - dataObj.getTime();
  
  const segundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(dias / 365);
  
  return {
    milissegundos: diffMs,
    segundos,
    minutos,
    horas,
    dias,
    semanas,
    meses,
    anos
  };
};

/**
 * Formata duração em formato legível
 * @param {number} segundos - Duração em segundos
 * @returns {string} - Duração formatada
 */
export const formatarDuracao = (segundos) => {
  if (segundos < 60) {
    return `${segundos}s`;
  } else if (segundos < 3600) {
    const minutos = Math.floor(segundos / 60);
    const segRestantes = segundos % 60;
    return `${minutos}m ${segRestantes}s`;
  } else {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    return `${horas}h ${minutos}m`;
  }
};

/**
 * Gera uma data aleatória dentro de um intervalo
 * @param {Date} dataInicio - Data de início do intervalo
 * @param {Date} dataFim - Data de fim do intervalo
 * @returns {Date} - Data aleatória
 */
export const dataAleatoria = (dataInicio, dataFim) => {
  const inicio = dataInicio.getTime();
  const fim = dataFim.getTime();
  const aleatorio = inicio + Math.random() * (fim - inicio);
  return new Date(aleatorio);
};

/**
 * Verifica se uma data está dentro de um intervalo
 * @param {Date} data - Data para verificar
 * @param {Date} inicio - Data de início do intervalo
 * @param {Date} fim - Data de fim do intervalo
 * @returns {boolean} - True se está dentro do intervalo
 */
export const estáNoIntervalo = (data, inicio, fim) => {
  const dataObj = new Date(data);
  return dataObj >= inicio && dataObj <= fim;
};

/**
 * Formata data para API (ISO string)
 * @param {Date} data - Data para formatar
 * @returns {string} - Data em formato ISO
 */
export const paraISO = (data) => {
  return new Date(data).toISOString();
};

/**
 * Formata data para URL (YYYY-MM-DD)
 * @param {Date} data - Data para formatar
 * @returns {string} - Data em formato URL
 */
export const paraURL = (data) => {
  return new Date(data).toISOString().split('T')[0];
};

/**
 * Obtém o timestamp atual
 * @returns {number} - Timestamp atual em milissegundos
 */
export const agora = () => {
  return Date.now();
};

/**
 * Converte string de data para timestamp
 * @param {string} dataString - String de data
 * @returns {number} - Timestamp
 */
export const paraTimestamp = (dataString) => {
  return new Date(dataString).getTime();
};

// Constantes de data
export const CONSTANTES_DATA = {
  MS_POR_SEGUNDO: 1000,
  MS_POR_MINUTO: 60 * 1000,
  MS_POR_HORA: 60 * 60 * 1000,
  MS_POR_DIA: 24 * 60 * 60 * 1000,
  MS_POR_SEMANA: 7 * 24 * 60 * 60 * 1000,
  MS_POR_MES: 30 * 24 * 60 * 60 * 1000,
  MS_POR_ANO: 365 * 24 * 60 * 60 * 1000
};
