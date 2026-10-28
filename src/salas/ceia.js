// FASE 2 — Uma noite em Jerusalém: o último jantar de Jesus com os amigos
// (João 13–15). O jogador conversa com os discípulos e ouve Jesus dizer a
// frase de João 15:13. Depois, o que aconteceu naquela noite e três dias depois.
import { DIALOGOS } from "../dialogos.js";
import * as A from "../arte/objetos.js";
import { desenharSimbolo, textoPixel } from "../arte/simbolos.js";
import { px, paleta, Mapa, objeto, npc, tocha, lamparina, ambiente, animar, suave, brilhos, conversa } from "./comum.js";

const D = DIALOGOS.ceia;
const DISCIPULOS = ["pedro", "joao", "tome", "filipe"];

let R = {};

function mapa() {
  const m = new Mapa(24, 15, "l");
  m.ret("M", 0, 0, 24, 1);
  m.ret("R", 1, 1, 22, 2);
  m.ret("M", 0, 0, 1, 15).ret("M", 23, 0, 1, 15).ret("M", 0, 14, 24, 1);
  return m.linhas();
}

const MESAS = [[0, 8.9, 6.8], [1, 12, 6.8], [0, 15.1, 6.8]];

const def = {
  larg: 24,
  alt: 15,
  mapa: mapa(),
  legenda: { M: "muro", R: "reboco", l: "ladrilho" },
  paleta: paleta({
    ladrilho: "#8a5a3c",
    ladrilho2: "#7a4e34",
    ladrilhoRejunte: "#4a2e20",
    argamassa: "#3a2c24",
    bloco: "#6e5a48",
    bloco2: "#5e4c3c",
    topo: "#7e6a56",
    topo2: "#6e5a48",
    reboco: "#c8b08a",
    reboco2: "#b89c76",
    tijolo: "#a8603e",
    pedra: "#bba27c",
    pedra2: "#a68c66",
    rejunte: "#6e5a44",
    celula: 11,
    madeira: "#7a5032",
    madeira2: "#6a4428",
  }),
  decalques: [
    { tipo: "tapete", x: 6.6, y: 5.2, w: 10.8, h: 4.6, cor: "#6a1e2e", cor2: "#d8a848", cor3: "#2e3a6a" },
    ...MESAS.map(([, x, y]) => ({ tipo: "sombra", x: x - 1.9, y: y - 0.7, w: 3.8, h: 1.4, forca: 0.42 })),
    { tipo: "rachadura", x: 4, y: 2.2, n: 10 },
  ],
  bloqueios: [{ x: 0, y: 14, w: 24, h: 1 }],
  inicio: { x: 12, y: 10.6, dir: "cima" },
  escuridao: 0.62,
  musica: "betesda",
};

function montar(jogo, m) {
  R = { brilho: 0 };
  for (const [v, x, y] of MESAS) {
    objeto(m, A.mesa(v), px(x), px(y), { solido: { w: 46, h: 10 } });
    lamparina(m, px(x) + (v % 2 ? -8 : 9), px(y) + 1, 11);
  }
  for (const [x, y, c] of [[7.6, 9], [10.4, 9], [13.6, 9], [16.4, 9], [6, 6.9, "#2e5a7a"], [18, 6.9, "#2e5a7a"]]) {
    objeto(m, A.almofada(c), px(x), px(y), { profundidade: -1 });
  }
  for (const x of [3, 21]) tocha(m, px(x), px(3.4), { raio: 80 });
  for (const [arte, x, y] of [[A.anfora(), 2, 4.2], [A.anfora("#9a5a3a"), 2.8, 4.4], [A.cantaro(), 21.4, 12.4], [A.vasoPlanta(1), 2, 12.6]]) {
    objeto(m, arte, px(x), px(y), { solido: { w: 10, h: 5 } });
  }

  R.jesus = npc(m, "jesus", px(12), px(5.2), {
    dir: "baixo",
    interacao: conversa("Ouvir Jesus", ouvirJesus, { raio: 90, ativo: (j) => !j.flag("ceia.ouviu") }),
  });
  const lugares = { pedro: [9.4, 8.9, "cima"], joao: [14.4, 5.3, "baixo"], tome: [6, 6.6, "dir"], filipe: [18, 6.6, "esq"] };
  R.disc = {};
  for (const id of DISCIPULOS) {
    const [x, y, dir] = lugares[id];
    R.disc[id] = npc(m, id, px(x), px(y), {
      dir,
      interacao: conversa("Conversar", (j) => j.falar(j.flag("ceia.d." + id) ? D[id + "Depois"] : (j.flag("ceia.d." + id, true), D[id])), { raio: 26 }),
    });
  }
  R.coracao = desenharSimbolo("coracao", "#ffe0e0", "#d0304a");
  R.texto = textoPixel("MAIOR AMOR", { cor: "#fff1c8", halo: "#d0304a" });
}

async function aoEntrar(jogo) {
  await jogo.ui.cartao("", "Uma noite em Jerusalém", "João 15", 2000);
  await jogo.falar(D.intro);
  jogo.objetivo("Chegue perto de Jesus e aperte para ouvir.");
}

async function ouvirJesus(jogo) {
  if (jogo.flag("ceia.ouviu")) return;
  jogo.flag("ceia.ouviu", true);
  jogo.objetivo("");
  const j = jogo.jogador;
  await j.andarAte(px(12), px(8.9));
  j.olharPara(R.jesus.x, R.jesus.y);
  for (const p of Object.values(R.disc)) {
    p.parado = true;
    p.olharPara(R.jesus.x, R.jesus.y);
  }
  R.jesus.olharPara(j.x, j.y);
  jogo.focar(px(12), px(5.6));

  // Desafio fácil, sem precisar saber nada da Bíblia.
  await jogo.falar(D.pergunta);
  let ok = false;
  while (!ok) {
    ok = await jogo.ui.enigmas.escolha({
      titulo: "Amigo de verdade",
      texto: "Seu amigo está passando por um momento difícil. O que um amigo de verdade faz?",
      opcoes: ["Visualiza e não responde", "Fica do lado dele", "Posta um meme sobre ele"],
      resposta: "Fica do lado dele",
      dicaErro: "Hmm... você ia querer isso de um amigo? Tenta de novo!",
    });
  }

  // A frase do versículo: o coração acende na parede.
  jogo.audio.sfx("simbolo");
  jogo.piscar([255, 150, 160], 1, 0.25);
  brilhos(jogo, px(12), px(3), 26, "#ffc8d0", 26);
  animar(2, (k) => (R.brilho = suave(k)));
  jogo.focar(px(12), px(3.8));
  await jogo.falar(D.versiculo);
  await jogo.falar(D.amigos);
  await jogo.esperar(0.5);

  // O que aconteceu depois.
  jogo.escuridaoAlvo = 0.9;
  await jogo.falar(D.depois);
  jogo.escuridaoAlvo = 0.4;
  jogo.audio.sfx("final");
  jogo.piscar([255, 240, 200], 1.4, 0.4);
  await jogo.esperar(1.2);
  await jogo.ui.fade(true, 1400);
  jogo.finalizar();
  await jogo.ui.fade(false, 900);
}

function atualizar(jogo, dt) {
  ambiente(jogo, dt, {});
}

function desenharPorCima(ctx, cx, cy, jogo) {
  if (R.brilho <= 0) return;
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = R.brilho * (0.85 + 0.15 * Math.sin(jogo.t * 2));
  const c = R.coracao;
  const flutua = Math.round(Math.sin(jogo.t * 1.3) * 1.5);
  ctx.drawImage(c, Math.round(px(12) - cx - c.width / 2), Math.round(px(1.3) - cy - c.height / 2 + flutua));
  const t = R.texto;
  ctx.drawImage(t, Math.round(px(12) - cx - t.width / 2), Math.round(px(2.4) - cy - t.height / 2));
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

export const ceia = { def, montar, aoEntrar, atualizar, desenharPorCima };
