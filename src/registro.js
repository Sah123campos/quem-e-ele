// Registra quem jogou: envia só o NOME e a SITUAÇÃO para o Formulário Google do organizador
// (o mesmo formulário do "Estrelas da Chácara"; a situação diz de qual jogo é).
// Cada envio vira uma linha com data e hora na planilha. Nenhum outro dado sai do aparelho.
const FORM = "https://docs.google.com/forms/d/e/1FAIpQLSeCihUJv2HxXsUFlpRNNkiwDaSXlPKDjP3hjLRiTB-cJkZ0Fg/formResponse";
const CAMPO_NOME = "entry.1125356489";
const CAMPO_SITUACAO = "entry.1024219460";
const CHAVE = "quem-e-ele.registro.v1";
export const CHAVE_NOME = "quem-e-ele.nome";

// situacao: "entrou" (a cada vez que começa; 5 min entre envios) ou "finalizou" (uma vez por nome)
export function registrar(nome, situacao) {
  nome = (nome || "").trim();
  if (!nome || location.protocol === "file:" || /^(localhost|127\.)/.test(location.hostname)) return;
  let reg = {};
  try { reg = JSON.parse(localStorage.getItem(CHAVE) || "{}"); } catch { /* segue */ }
  const k = `${situacao}:${nome}`;
  if (situacao === "finalizou" && reg[k]) return;
  if (situacao === "entrou" && Date.now() - (reg[k] || 0) < 5 * 60 * 1000) return;
  const texto = situacao === "finalizou" ? "Quem é Ele: Finalizou" : "Quem é Ele: Entrou";
  const dados = new URLSearchParams({ [CAMPO_NOME]: nome.slice(0, 60), [CAMPO_SITUACAO]: texto });
  fetch(FORM, { method: "POST", mode: "no-cors", body: dados, credentials: "omit", referrerPolicy: "no-referrer" })
    .then(() => { reg[k] = Date.now(); try { localStorage.setItem(CHAVE, JSON.stringify(reg)); } catch { /* ok */ } })
    .catch(() => { /* sem internet: tenta na próxima vez */ });
}

export function nomeSalvo() {
  try { return localStorage.getItem(CHAVE_NOME) || ""; } catch { return ""; }
}
