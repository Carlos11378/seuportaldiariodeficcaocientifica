// src/utils/utils_dateUtils.js
// Utilitários robustos para formatação de datas e helpers usados no Home.jsx

export const formatarDataRelativa = (data) => {
  try {
    if (!data) return "Agora";

    const dataObj = (typeof data === 'string' || typeof data === 'number') ? new Date(data) : data;
    if (!(dataObj instanceof Date) || isNaN(dataObj.getTime())) return "Agora";

    const agora = new Date();
    const diffMs = agora.getTime() - dataObj.getTime();
    const diffSegundos = Math.floor(diffMs / 1000);
    const diffMinutos = Math.floor(diffSegundos / 60);
    const diffHoras = Math.floor(diffMinutos / 60);
    const diffDias = Math.floor(diffHoras / 24);

    if (diffSegundos < 60) return "Agora";
    if (diffMinutos < 60) return `Há ${diffMinutos} minuto${diffMinutos !== 1 ? 's' : ''}`;
    if (diffHoras < 24) return `Há ${diffHoras} hora${diffHoras !== 1 ? 's' : ''}`;
    if (diffDias < 7) return `Há ${diffDias} dia${diffDias !== 1 ? 's' : ''}`;

    return formatarDataAbsoluta(dataObj);
  } catch (error) {
    console.warn('formatarDataRelativa erro:', error);
    return "Agora";
  }
};

export const formatarDataAbsoluta = (data, incluirHora = false) => {
  try {
    if (!data) return new Date().toLocaleDateString('pt-BR');
    const dataObj = (typeof data === 'string' || typeof data === 'number') ? new Date(data) : data;
    if (!(dataObj instanceof Date) || isNaN(dataObj.getTime())) return new Date().toLocaleDateString('pt-BR');

    const opcoes = { day: 'numeric', month: 'long', year: 'numeric' };
    if (incluirHora) { opcoes.hour = '2-digit'; opcoes.minute = '2-digit'; }
    return dataObj.toLocaleDateString('pt-BR', opcoes);
  } catch (error) {
    console.warn('formatarDataAbsoluta erro:', error);
    return new Date().toLocaleDateString('pt-BR');
  }
};

export const formatarHorario = (data) => {
  try {
    if (!data) return "Agora";
    const dataObj = (typeof data === 'string' || typeof data === 'number') ? new Date(data) : data;
    if (!(dataObj instanceof Date) || isNaN(dataObj.getTime())) return "Agora";
    return dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } catch (error) {
    console.warn('formatarHorario erro:', error);
    return "Agora";
  }
};

// demais helpers úteis (mantive simples e seguros)
export const éHoje = (data) => {
  try {
    if (!data) return false;
    const d = (typeof data === 'string' || typeof data === 'number') ? new Date(data) : data;
    if (!(d instanceof Date) || isNaN(d.getTime())) return false;
    const hoje = new Date();
    return d.getDate() === hoje.getDate() && d.getMonth() === hoje.getMonth() && d.getFullYear() === hoje.getFullYear();
  } catch { return false; }
};

export const paraISO = (data) => {
  try {
    if (!data) return new Date().toISOString();
    const d = (typeof data === 'string' || typeof data === 'number') ? new Date(data) : data;
    if (!(d instanceof Date) || isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  } catch { return new Date().toISOString(); }
};

