// Configurações de "O Maior Amor".

// ---------- O convite da tela final ----------
// Deixe um campo vazio ("") para ele não aparecer.
export const CONVITE = {
  evento: "CULTO ADOLES",
  data: "Sexta-feira, 30 de outubro",
  horario: "",
  local: "",
  detalhe: "Aberto a todos os adolescentes",
  // Botão extra com link (ex.: localização no mapa). Vazio = sem botão.
  link: "",
  textoLink: "Ver como chegar",
};

// Mensagem que o jogador manda para quem o convidou, no fim do jogo.
export const MENSAGEM_COMPARTILHAR = "Terminei o “O Maior Amor” ❤️ Bora conversar sobre isso?";

// ---------- Motor ----------
export const TILE = 16;

// Altura aproximada da tela "interna" em pixels de arte. A imagem é ampliada
// por um fator inteiro para os pixels ficarem nítidos em qualquer tela.
export const ALTURA_ALVO = 216;

export const VELOCIDADE_JOGADOR = 74; // pixels de arte por segundo

const params = new URLSearchParams(location.search);
export const DEBUG = params.has("debug");
// ?debug&sala=ceia começa direto numa fase, para testes.
export const SALA_INICIAL = params.get("sala");
