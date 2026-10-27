// Ponto de entrada de "Quem é Ele?". Usa o mesmo motor de "O Mistério dos
// Sinais" (pasta src/ na raiz), com salas, textos e final próprios.
import { Jogo, estadoInicial } from "./jogo.js";
import { carregarRetratos } from "./ui/retratos.js";
import { SALAS } from "./salas/index.js";
import { RELATOS } from "./dialogos.js";
import { finalizar, mostrarConvite, compartilhar } from "./final.js";
import { DEBUG, SALA_INICIAL } from "./config.js";

const $ = (id) => document.getElementById(id);

// Relatos do diário: os já investigados e o que está em andamento.
const SALA_DO_RELATO = { cana: "talha", poco: "gota", betesda: "maca" };
function preencherRelatos(jogo) {
  const ul = $("diario-relatos");
  ul.innerHTML = "";
  const achados = jogo.estado.simbolos;
  for (const r of RELATOS) {
    const li = document.createElement("li");
    if (achados.includes(r.simbolo)) {
      const b = document.createElement("b");
      b.textContent = r.ref;
      li.append(b, document.createTextNode(` — ${r.resumo}`));
    } else if (SALA_DO_RELATO[jogo.estado.sala] === r.simbolo) {
      const s = document.createElement("small");
      s.textContent = `${r.andamento} (investigação em andamento)`;
      li.append(s);
    } else continue;
    ul.append(li);
  }
}

const jogo = new Jogo({
  salas: SALAS,
  salaInicial: "cana",
  chave: "quem-e-ele",
  simbolos: ["talha", "gota", "maca"],
  rotuloSimbolo: "Evidência registrada",
  aoAbrirDiario: preencherRelatos,
  finalizar,
});
if (DEBUG) window.jogo = jogo;

// ---------- Bloqueios do navegador (celular) ----------
for (const ev of ["gesturestart", "gesturechange", "gestureend", "dblclick", "contextmenu", "selectstart"]) {
  document.addEventListener(ev, (e) => e.preventDefault(), { passive: false });
}
document.addEventListener(
  "touchmove",
  (e) => {
    if (!e.target.closest?.(".painel")) e.preventDefault();
  },
  { passive: false },
);
let ultimoToque = 0;
document.addEventListener(
  "touchend",
  (e) => {
    const agora = Date.now();
    if (agora - ultimoToque < 300 && !e.target.closest?.("button, a, summary, .painel")) e.preventDefault();
    ultimoToque = agora;
  },
  { passive: false },
);

// O som só pode começar depois do primeiro toque/tecla.
const liberarSom = () => jogo.audio.iniciar();
window.addEventListener("pointerup", liberarSom, { once: true, capture: true });
window.addEventListener("keydown", liberarSom, { once: true, capture: true });

// ---------- Tela cheia e tela deitada (celular) ----------
const el = document.documentElement;
const podeVirar = !!((el.requestFullscreen || el.webkitRequestFullscreen) && screen.orientation?.lock);
if (podeVirar) {
  $("btn-girar").hidden = false;
  $("girar-dica").textContent = "Ou toque no botão e a tela vira sozinha:";
}
$("btn-girar").addEventListener("click", () => {
  jogo.entrada.mudarDispositivo("toque");
  jogo.telaCheia(true);
});
window.addEventListener(
  "pointerup",
  (e) => {
    if (e.pointerType !== "touch" || jogo.modo === "final" || e.target.closest?.("#btn-girar")) return;
    if (document.fullscreenElement || document.webkitFullscreenElement) return;
    jogo.telaCheia(false);
  },
  true,
);

// ---------- Laço principal ----------
let anterior = performance.now();
function quadro(agora) {
  const dt = Math.min(0.05, Math.max(0, (agora - anterior) / 1000));
  anterior = agora;
  try {
    jogo.atualizar(dt);
    jogo.desenhar();
  } catch (erro) {
    console.error(erro);
  }
  requestAnimationFrame(quadro);
}

// ---------- Botões ----------
let comecando = false;
async function comecar(continuar) {
  if (comecando || jogo.modo !== "titulo") return;
  comecando = true;
  await jogo.comecar(continuar);
}
$("btn-comecar").addEventListener("click", () => comecar(false));
$("btn-continuar").addEventListener("click", () => comecar(true));
$("btn-final-seguir").addEventListener("click", () => mostrarConvite(jogo));
$("btn-compartilhar").addEventListener("click", () => compartilhar());
$("btn-reiniciar").addEventListener("click", () => jogo.reiniciar());

// Atalho de testes: ?debug&sala=poco começa direto numa sala.
async function comecarEm(id) {
  jogo.audio.iniciar();
  $("titulo").hidden = true;
  jogo.estado = estadoInicial(id);
  jogo.estado.simbolos = { cana: [], poco: ["talha"], betesda: ["talha", "gota"], patio: ["talha", "gota", "maca"] }[id] ?? [];
  jogo.estado.uvLiberada = id !== "cana";
  jogo.modo = "jogo";
  jogo.ui.emJogo = true;
  await jogo.carregarSala(id);
}

async function iniciar() {
  requestAnimationFrame(quadro);
  const fonte = document.fonts?.load?.('16px "Pixelify Sans"').catch(() => {}) ?? Promise.resolve();
  await Promise.all([carregarRetratos((p) => jogo.ui.progresso(p * 0.6)), fonte]);
  jogo.ui.progresso(0.75);
  await jogo.carregarSala("titulo", { semFade: true });
  jogo.ui.progresso(1);
  jogo.ui.esconderCarregando();
  if (jogo.progressoSalvo()) $("btn-continuar").hidden = false;
  if (DEBUG && SALA_INICIAL && SALAS[SALA_INICIAL] && SALA_INICIAL !== "titulo") await comecarEm(SALA_INICIAL);
}

iniciar();
