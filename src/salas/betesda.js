// FASE 2 — Os relatos: o tanque de Betesda, em Jerusalém (João 5:1–15).
// À noite, com a lanterna: o homem doente havia 38 anos é curado e, quando
// perguntam quem o curou, ele não sabe responder. A luz negra revela a marca
// da maca no chão, e a equipe espera no pátio para fechar o caso.
import { DIALOGOS, PISTAS } from "../dialogos.js";
import * as A from "../arte/objetos.js";
import { desenharSimbolo } from "../arte/simbolos.js";
import { px, paleta, Mapa, objeto, npc, deitado, braseiro, marca, animar, suave, ambiente, brilhos, conversa, falarComGestos, desenharNevoa } from "./comum.js";

const D = DIALOGOS.betesda;

let R = {};

const TANQUES = [
  { x: 10, y: 9, w: 8, h: 7 },
  { x: 20, y: 9, w: 8, h: 7 },
];

const BRASEIROS = [
  [4.6, 6.4],
  [33.4, 6.4],
  [4.6, 20.2],
  [33.4, 20.2],
  [15.4, 22.2],
  [22.6, 22.2],
];

// Profundidade da água: mais escura longe das bordas.
function profundidade(x, y) {
  const tx = x / 16;
  const ty = y / 16;
  const t = tx < 19 ? TANQUES[0] : TANQUES[1];
  const d = Math.min(tx - t.x, t.x + t.w - tx, ty - t.y, t.y + t.h - ty);
  return Math.max(0, Math.min(1, d / 2.6));
}

// ---------- Mapa ----------
function mapa() {
  const m = new Mapa(38, 26, ".");
  m.ret("P", 0, 1, 38, 3); // muralha do fundo
  m.ret("l", 9, 8, 20, 9); // pedras molhadas em volta dos tanques
  m.ret("w", 10, 9, 8, 7).ret("w", 20, 9, 8, 7); // os dois tanques
  m.ret("M", 0, 0, 38, 1).ret("M", 0, 0, 1, 26).ret("M", 37, 0, 1, 26).ret("M", 0, 25, 38, 1);
  m.ret(" ", 18, 25, 2, 1); // Porta das Ovelhas
  return m.linhas();
}

const def = {
  larg: 38,
  alt: 26,
  mapa: mapa(),
  legenda: { M: "muro", P: "parede", ".": "pedra", l: "ladrilho", w: "agua", " ": "vazio" },
  paleta: paleta({
    ladrilho: "#7e7c78",
    ladrilho2: "#6c6a68",
    ladrilhoRejunte: "#36343e",
    pedra: "#8e8a84",
    pedra2: "#7a766f",
    rejunte: "#47434c",
    celula: 13,
    musgo: "#56664a",
    agua: "#22506c",
    aguaFunda: "#0c2032",
    profundidade,
    argamassa: "#3a3640",
    bloco: "#7a746c",
    bloco2: "#6a645e",
    topo: "#8a847c",
    topo2: "#7a746e",
    terra: "#6a5a48",
    terra2: "#5a4a3a",
    grama: "#4a6a3a",
    grama2: "#3e5a32",
    reboco: "#a89c88",
    reboco2: "#988c78",
    tijolo: "#7a4a36",
    rocha: "#6a6058",
    rocha2: "#5a524a",
    rochaTopo: "#7a7068",
  }),
  aguas: TANQUES.map((t) => ({ ...t, cores: { claro: "rgba(160,206,240,0.5)", medio: "rgba(96,146,196,0.32)" } })),
  decalques: [
    { tipo: "poca", x: 8.2, y: 16.6, w: 1.4, h: 0.5 },
    { tipo: "poca", x: 28.6, y: 8.2, w: 1.2, h: 0.5 },
    { tipo: "poca", x: 17.2, y: 17.4, w: 1, h: 0.4 },
    { tipo: "poca", x: 22.8, y: 7.4, w: 1.3, h: 0.5 },
    { tipo: "rachadura", x: 5, y: 9, n: 14 },
    { tipo: "rachadura", x: 30, y: 21, n: 12 },
    { tipo: "rachadura", x: 12, y: 2.6, n: 10 },
    { tipo: "degraus", x: 17, y: 23.4, w: 4, h: 1.6 },
    { tipo: "palha", x: 26.6, y: 16.9, w: 2, h: 1, n: 10 },
  ],
  inicio: { x: 19, y: 23.4, dir: "cima" },
  escuridao: 0.9,
  lanterna: "normal",
  musica: "betesda",
  tensao: 0.15,
  somPassos: { ladrilho: "molhado" },
};

// ---------- Montagem ----------
function montar(jogo, m) {
  R = { braseiros: [] };

  for (const [x, y] of BRASEIROS) R.braseiros.push(braseiro(m, px(x), px(y), { raio: 98 }));
  m.luzes.push({ x: px(19), y: px(12.4), raio: 150, cor: [70, 130, 210], brilho: 0.14, intensidade: 0.22 });

  // Colunas dos cinco pavilhões (duas quebradas)
  for (const [x, y] of [[13.5, 6.8], [7.6, 12.6], [19, 12.6], [30.4, 12.6], [24.5, 18.4], [24.5, 6.8]]) {
    objeto(m, A.coluna(false), px(x), px(y), { solido: { w: 16, h: 7 } });
  }
  objeto(m, A.coluna(true), px(7.4), px(23.4), { solido: { w: 16, h: 7 } });
  objeto(m, A.coluna(true), px(32), px(22.6), { solido: { w: 16, h: 7 } });

  // O homem doente há 38 anos, e Jesus (que chega depois)
  R.enfermo = deitado(m, "enfermo", px(11.2), px(17.2), { interacao: conversa("Conversar", enfermoAcao) });
  R.enfermo.alturaMarcador = 16;
  R.curado = npc(m, "enfermoCurado", px(11.2), px(17.1), { visivel: false, olharJogador: false, solido: null });
  R.jesus = npc(m, "jesus", px(19), px(25.6), { visivel: false, olharJogador: false, solido: null });

  // Outros doentes à espera
  deitado(m, "doente1", px(27.6), px(17.4), { interacao: conversa("Conversar", (j) => j.falar(D.doente)) });
  deitado(m, "doente2", px(7.2), px(9.4), { interacao: conversa("Conversar", (j) => j.falar(D.doente)) });
  R.perguntador = npc(m, "doente2", px(15.2), px(19.4), {
    dir: "cima",
    interacao: conversa("Conversar", (j) => j.falar(j.flag("bet.curado") ? D.doente2 : D.doente2Antes)),
  });
  objeto(m, A.macaVazia(), px(26), px(7.4), { solido: { w: 24, h: 5 } });
  objeto(m, A.macaVazia(), px(9.6), px(21.8), { solido: { w: 24, h: 5 } });
  objeto(m, A.anfora("#8a5a3a"), px(2.2), px(4.8), { solido: { w: 9, h: 4 } });
  objeto(m, A.cantaro(), px(35.4), px(4.9), { solido: { w: 9, h: 4 } });
  objeto(m, A.barril(), px(35.6), px(23.6), { solido: { w: 12, h: 5 } });

  // Amigos
  R.thama = npc(m, "thama", px(16.2), px(22.8), { dir: "cima", interacao: conversa("Conversar", thamaAcao) });
  R.samuel = npc(m, "samuel", px(21.6), px(23), { dir: "cima", gesticula: true, interacao: conversa("Conversar", samuelAcao) });

  // A marca da maca no chão, onde o homem ficou deitado (luz negra).
  marca(m, desenharSimbolo("maca"), px(11.2), px(17.2) - 3, {
    ativa: (j) => j.flag("bet.curado"),
    aoRevelar: async (j) => {
      await j.falar(D.achouMaca);
      j.simbolo("maca", "Maca · levanta e anda");
      await j.esperar(0.8);
      await cenaSamuelVolta(j);
      j.objetivo(objetivoAtual(j));
    },
  });

  // Saída pela Porta das Ovelhas, depois de achar a marca.
  m.zonas.push({
    x: px(17.4),
    y: px(24.1),
    w: px(3.2),
    h: px(1.2),
    ativa: (j) => j.estado.simbolos.includes("maca") && j.emCena === 0,
    aoEntrar: (j) => j.cena(() => sair(j)),
  });
}

// ---------- Roteiro ----------
function objetivoAtual(j) {
  if (!j.flag("bet.curado")) return "Fale com o homem deitado perto do tanque.";
  if (!j.estado.simbolos.includes("maca")) return "Passe a luz negra no chão onde o homem ficou deitado.";
  return "Saia pela Porta das Ovelhas, lá embaixo. A equipe está esperando.";
}

async function aoEntrar(jogo) {
  await jogo.ui.cartao("Fase 2", "Os relatos", "Jerusalém · o tanque de Betesda", 2800);
  await jogo.falar(D.intro);
  R.thama.olharPara(jogo.jogador.x, jogo.jogador.y);
  await jogo.falar(D.thama);
  R.samuel.olharPara(jogo.jogador.x, jogo.jogador.y);
  R.samuel.gesticular(1.2);
  await jogo.falar(D.samuel);
  jogo.objetivo(objetivoAtual(jogo));
}

async function enfermoAcao(jogo) {
  if (jogo.flag("bet.curado")) return;
  await jogo.falar(D.enfermoAntes);
  await cenaCura(jogo);
}

// Jesus cura o homem doente havia 38 anos (João 5:5–13).
async function cenaCura(jogo) {
  const { jesus, enfermo, curado, perguntador } = R;
  const j = jogo.jogador;
  jogo.focar(px(12.6), px(18.4));
  await j.andarAte(px(9.4), px(19.8));
  j.olharPara(enfermo.x, enfermo.y);
  j.angulo = -0.9;
  jesus.visivel = true;
  jesus.parado = true;
  await jesus.seguirCaminho([[px(19), px(23.2)], [px(15.6), px(20.4)], [px(13.4), px(17.9)]], 36);
  jesus.olharPara(enfermo.x, enfermo.y);
  await jogo.esperar(0.6);
  await falarComGestos(jogo, D.cura, { jesus });

  // A cura
  jesus.gesticular(2.6);
  jogo.audio.sfx("cura");
  const luz = { x: enfermo.x, y: enfermo.y - 6, raio: 10, cor: [255, 236, 190], brilho: 0.55, intensidade: 0.95 };
  jogo.mundo.luzes.push(luz);
  await animar(1.8, (k) => {
    luz.raio = 10 + suave(k) * 90;
    if (Math.random() < 0.6) brilhos(jogo, enfermo.x, enfermo.y - 4, 1, "#fff0c0", 26);
  });
  jogo.piscar([255, 240, 200], 0.8, 0.32);
  jogo.vibrar([30, 50, 30]);
  enfermo.visivel = false;
  curado.visivel = true;
  curado.parado = true;
  curado.dir = "dir";
  brilhos(jogo, curado.x, curado.y - 12, 24, "#fff0c0", 18);
  await animar(1.2, (k) => {
    luz.raio = 100 - suave(k) * 90;
    luz.brilho = 0.55 * (1 - k);
  });
  jogo.mundo.luzes.splice(jogo.mundo.luzes.indexOf(luz), 1);
  curado.gesticular(1.6);
  await falarComGestos(jogo, D.curado, { enfermoCurado: curado });

  // Jesus se retira no meio da multidão, sem que o homem perceba.
  curado.olharPara(px(8), px(17));
  await jesus.seguirCaminho([[px(17.6), px(20.8)], [px(19.6), px(23.4)], [px(19.6), px(25.8)]], 34);
  jesus.visivel = false;

  // Perguntam quem o curou, e ele não sabe (João 5:12–13).
  perguntador.parado = true;
  await perguntador.andarAte(px(13.2), px(19.2), 40);
  perguntador.olharPara(curado.x, curado.y);
  curado.olharPara(perguntador.x, perguntador.y);
  await jogo.esperar(0.3);
  perguntador.gesticular(1.4);
  await jogo.falar(D.pergunta.slice(0, 1));
  curado.olharPara(px(19), px(24));
  await jogo.esperar(0.5);
  curado.olharPara(px(4), px(17));
  await jogo.esperar(0.5);
  curado.olharPara(perguntador.x, perguntador.y);
  curado.gesticular(1.4);
  await jogo.falar(D.pergunta.slice(1, 2));
  await jogo.falar(D.pergunta.slice(2));
  jogo.pista("naoSabia", PISTAS.naoSabia, "Jerusalém");

  // Ele sai carregando a maca.
  await curado.seguirCaminho([[px(13), px(20.6)], [px(17.8), px(21)], [px(19.4), px(23.6)], [px(19.4), px(25.8)]], 46);
  curado.visivel = false;
  perguntador.parado = false;
  perguntador.dirPadrao = "baixo";

  // O Samuel vai atrás dele.
  const { samuel } = R;
  jogo.focar(px(14.6), px(20.4));
  samuel.parado = true;
  await samuel.seguirCaminho([[px(17.6), px(21.2)], [px(15.2), px(20.6)]], 70);
  samuel.olharPara(j.x, j.y);
  samuel.gesticular(1.4);
  await jogo.falar(D.samuelVai);
  await samuel.seguirCaminho([[px(17.6), px(21.2)], [px(19.6), px(23.6)], [px(19.6), px(25.8)]], 76);
  samuel.visivel = false;
  jogo.flag("bet.samuelSaiu", true);
  jogo.focar(null);
  jogo.flag("bet.curado", true);
  R.thama.olharPara(j.x, j.y);
  await jogo.falar(D.thamaDepois);
  // Quem pulou o Kenedy em Caná ainda não tem a luz negra: entrega aqui.
  if (!jogo.estado.uvLiberada) {
    jogo.liberarUV();
    jogo.audio.sfx("uv");
  }
  const como = jogo.entrada.dispositivo === "toque" ? "o botão roxo" : "a tecla <b>Q</b>";
  jogo.ui.aviso(`<b>Luz negra:</b> use ${como} para ligar.`);
  jogo.objetivo(objetivoAtual(jogo));
}

// O Samuel volta do templo com o fim da história (João 5:14–15).
async function cenaSamuelVolta(jogo) {
  const { samuel, thama } = R;
  const j = jogo.jogador;
  samuel.x = px(19.6);
  samuel.y = px(25.8);
  samuel.visivel = true;
  samuel.parado = true;
  jogo.focar(px(15), px(21));
  await samuel.seguirCaminho([[px(19.6), px(23.4)], [px(15.8), px(21.4)], [px(13.8), px(20.4)]], 80);
  samuel.olharPara(j.x, j.y);
  j.olharPara(samuel.x, samuel.y);
  thama.olharPara(samuel.x, samuel.y);
  samuel.gesticular(2);
  await jogo.falar(D.samuelVolta.slice(0, 1));
  await jogo.falar(D.samuelVolta.slice(1, 2));
  jogo.pista("descobriu", PISTAS.descobriu, "Jerusalém");
  samuel.gesticular(1.6);
  await jogo.falar(D.samuelVolta.slice(2));
  samuel.parado = false;
  samuel.dirPadrao = "baixo";
  jogo.focar(null);
}

async function thamaAcao(jogo) {
  if (!jogo.flag("bet.curado")) return jogo.falar(D.thamaAntes);
  if (!jogo.estado.simbolos.includes("maca")) return jogo.falar(D.thamaMaca);
  return jogo.falar(D.thamaFim);
}

async function samuelAcao(jogo) {
  if (jogo.estado.simbolos.includes("maca")) return jogo.falar(D.samuelFim);
  return jogo.falar(D.samuelAntes);
}

async function sair(jogo) {
  const j = jogo.jogador;
  jogo.objetivo("");
  await j.andarAte(px(19), px(24.6));
  await jogo.carregarSala("patio");
}

function atualizar(jogo, dt) {
  ambiente(jogo, dt, {
    vagalumes: [
      { x: px(1), y: px(5), w: px(8), h: px(19), taxa: 0.5 },
      { x: px(29), y: px(5), w: px(8), h: px(19), taxa: 0.5 },
    ],
    brilhosAgua: TANQUES.map((t) => ({ x: px(t.x), y: px(t.y), w: px(t.w), h: px(t.h), taxa: 1.6 })),
    poeiraFeixe: true,
  });
}

function desenharPorCima(ctx, cx, cy, jogo) {
  desenharNevoa(ctx, cx, cy, { x: px(8), y: px(7.4), w: px(22), h: px(10.6) }, jogo.t, 0.1, 5);
}

export const betesda = { def, montar, aoEntrar, atualizar, desenharPorCima };
