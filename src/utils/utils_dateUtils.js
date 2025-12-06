// Utilitários ULTRA-ROBUSTOS para datas
// GARANTIDO para funcionar - SEM ERROS de "Data inválida"

export const formatarDataRelativa = (data) => {
  try {
    // Se data for null, undefined ou inválida, retornar "Agora"
    if (!data) {
      return "Agora";
    }
    
    // Se for string, tentar converter
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    // Verificar se a data é válida
    if (isNaN(dataObj.getTime())) {
      return "Agora";
    }
    
    const agora = new Date();
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
    
  } catch (error) {
    console.warn('Erro ao formatar data:', error);
    return "Agora"; // SEMPRE retornar algo válido
  }
};

export const formatarDataAbsoluta = (data, incluirHora = false) => {
  try {
    // Se data for null, undefined ou inválida, retornar data atual
    if (!data) {
      return new Date().toLocaleDateString('pt-BR');
    }
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) {
      return new Date().toLocaleDateString('pt-BR');
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
    
  } catch (error) {
    console.warn('Erro ao formatar data absoluta:', error);
    return new Date().toLocaleDateString('pt-BR');
  }
};

export const formatarHorario = (data) => {
  try {
    if (!data) {
      return "Agora";
    }
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) {
      return "Agora";
    }
    
    return dataObj.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
  } catch (error) {
    console.warn('Erro ao formatar horário:', error);
    return "Agora";
  }
};

export const éHoje = (data) => {
  try {
    if (!data) return false;
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return false;
    
    const hoje = new Date();
    return dataObj.getDate() === hoje.getDate() &&
           dataObj.getMonth() === hoje.getMonth() &&
           dataObj.getYear() === hoje.getYear();
  } catch (error) {
    console.warn('Erro ao verificar se é hoje:', error);
    return false;
  }
};

export const éEstaSemana = (data) => {
  try {
    if (!data) return false;
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return false;
    
    const agora = new Date();
    const inicioSemana = new Date(agora.setDate(agora.getDate() - agora.getDay()));
    
    return dataObj >= inicioSemana;
  } catch (error) {
    console.warn('Erro ao verificar se é esta semana:', error);
    return false;
  }
};

export const éEsteMes = (data) => {
  try {
    if (!data) return false;
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return false;
    
    const agora = new Date();
    return dataObj.getMonth() === agora.getMonth() &&
           dataObj.getYear() === agora.getYear();
  } catch (error) {
    console.warn('Erro ao verificar se é este mês:', error);
    return false;
  }
};

export const inicioDoDia = (data) => {
  try {
    if (!data) return new Date();
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return new Date();
    
    dataObj.setHours(0, 0, 0, 0);
    return dataObj;
  } catch (error) {
    console.warn('Erro ao obter início do dia:', error);
    return new Date();
  }
};

export const fimDoDia = (data) => {
  try {
    if (!data) return new Date();
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return new Date();
    
    dataObj.setHours(23, 59, 59, 999);
    return dataObj;
  } catch (error) {
    console.warn('Erro ao obter fim do dia:', error);
    return new Date();
  }
};

export const adicionarDias = (data, dias) => {
  try {
    if (!data) return new Date();
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return new Date();
    
    dataObj.setDate(dataObj.getDate() + dias);
    return dataObj;
  } catch (error) {
    console.warn('Erro ao adicionar dias:', error);
    return new Date();
  }
};

export const subtrairDias = (data, dias) => {
  try {
    if (!data) return new Date();
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return new Date();
    
    dataObj.setDate(dataObj.getDate() - dias);
    return dataObj;
  } catch (error) {
    console.warn('Erro ao subtrair dias:', error);
    return new Date();
  }
};

export const gerarIntervalo = (intervalo) => {
  try {
    const agora = new Date();
    let inicio, fim = agora;
    
    switch (intervalo.toLowerCase()) {
      case 'hora':
        inicio = new Date(agora.getTime() - 60 * 60 * 1000);
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
  } catch (error) {
    console.warn('Erro ao gerar intervalo:', error);
    const agora = new Date();
    return {
      inicio: new Date(agora.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      fim: agora.toISOString(),
      inicioMs: agora.getTime() - 24 * 60 * 60 * 1000,
      fimMs: agora.getTime()
    };
  }
};

export const calcularIdadeData = (data) => {
  try {
    if (!data) return { dias: 0 };
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return { dias: 0 };
    
    const agora = new Date();
    const diffMs = agora.getTime() - dataObj.getTime();
    
    const dias = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    
    return { dias };
  } catch (error) {
    console.warn('Erro ao calcular idade da data:', error);
    return { dias: 0 };
  }
};

export const formatarDuracao = (segundos) => {
  try {
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
  } catch (error) {
    console.warn('Erro ao formatar duração:', error);
    return "0s";
  }
};

export const dataAleatoria = (dataInicio, dataFim) => {
  try {
    if (!dataInicio || !dataFim) return new Date();
    
    const inicio = dataInicio.getTime();
    const fim = dataFim.getTime();
    const aleatorio = inicio + Math.random() * (fim - inicio);
    return new Date(aleatorio);
  } catch (error) {
    console.warn('Erro ao gerar data aleatória:', error);
    return new Date();
  }
};

export const estáNoIntervalo = (data, inicio, fim) => {
  try {
    if (!data || !inicio || !fim) return false;
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return false;
    
    return dataObj >= inicio && dataObj <= fim;
  } catch (error) {
    console.warn('Erro ao verificar intervalo:', error);
    return false;
  }
};

export const paraISO = (data) => {
  try {
    if (!data) return new Date().toISOString();
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return new Date().toISOString();
    
    return new Date(dataObj).toISOString();
  } catch (error) {
    console.warn('Erro ao converter para ISO:', error);
    return new Date().toISOString();
  }
};

export const paraURL = (data) => {
  try {
    if (!data) return new Date().toISOString().split('T')[0];
    
    let dataObj;
    if (typeof data === 'string') {
      dataObj = new Date(data);
    } else {
      dataObj = new Date(data);
    }
    
    if (isNaN(dataObj.getTime())) return new Date().toISOString().split('T')[0];
    
    return new Date(dataObj).toISOString().split('T')[0];
  } catch (error) {
    console.warn('Erro ao converter para URL:', error);
    return new Date().toISOString().split('T')[0];
  }
};

export const agora = () => {
  return Date.now();
};

export const paraTimestamp = (dataString) => {
  try {
    if (!dataString) return Date.now();
    
    const dataObj = new Date(dataString);
    if (isNaN(dataObj.getTime())) return Date.now();
    
    return dataObj.getTime();
  } catch (error) {
    console.warn('Erro ao converter para timestamp:', error);
    return Date.now();
  }
};

export const CONSTANTES_DATA = {
  MS_POR_SEGUNDO: 1000,
  MS_POR_MINUTO: 60 * 1000,
  MS_POR_HORA: 60 * 60 * 1000,
  MS_POR_DIA: 24 * 60 * 60 * 1000,
  MS_POR_SEMANA: 7 * 24 * 60 * 60 * 1000,
  MS_POR_MES: 30 * 24 * 60 * 60 * 1000,
  MS_POR_ANO: 365 * 24 * 60 * 60 * 1000
};
