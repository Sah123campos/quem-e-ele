// FASE 2 — Uma noite em Jerusalém: o último jantar de Jesus com os amigos
// (João 13–15). O jogador conversa com os discípulos e ouve Jesus dizer a
// frase de João 15:13. Depois, o que aconteceu naquela noite e três dias depois.
import { DIALOGOS } from "../dialogos.js";
import * as A from "../arte/objetos.js";
import { desenharSimbolo, textoPixel } from "../arte/simbolos.js";
import { px, paleta, Mapa, objeto, npc, lamparina, ambiente, animar, suave, brilhos, conversa } from "./comum.js";

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
  escuridao: 0.8,
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
  // Objetos que dão sentido ao recado (e um barril para confundir).
  for (const [arte, x, y] of [
    [A.anfora(), 4.4, 4.3], [A.anfora("#9a5a3a"), 5.3, 4.5], [A.cantaro(), 4.8, 5.4], // água
    [A.saco(), 19.4, 4.4], [A.saco(), 20.2, 4.6], [A.caixote(), 18.6, 4.3], // farinha
    [A.vasoPlanta(1), 3.6, 12.6], [A.vasoPlanta(0), 4.6, 12.8], // planta
    [A.barril(), 19.6, 12.6], [A.barril(), 20.6, 12.7], // vinho (distração)
  ]) objeto(m, arte, px(x), px(y), { solido: { w: 10, h: 5 } });

  R.recado = objeto(m, A.caixote(), px(14.6), px(11.6), {
    solido: { w: 12, h: 5 },
    interacao: { rotulo: "Ler o recado", icone: "examinar", raio: 24, acao: lerRecado },
  });
  R.ordem = [];
  R.tochas = [["agua", 3, 4.4], ["farinha", 21, 4.4], ["planta", 2.4, 12.6], ["vinho", 21.6, 12.6]].map(([id, x, y]) => {
    const t = objeto(m, A.tochaApagada(), px(x), px(y), {
      solido: { w: 6, h: 4 },
      sombra: { rx: 4, ry: 1 },
      interacao: { rotulo: "Acender a tocha", icone: "usar", raio: 22, ativo: (j) => j.flag("ceia.recado") && !t.acesa && !j.flag("ceia.luz"), acao: (j) => acender(j, t) },
    });
    t.id = "tocha-" + id;
    t.lugar = id;
    t.luz = { x: px(x), y: px(y) - 24, raio: 1, cor: [255, 150, 60], brilho: 0, tremor: 1 };
    m.luzes.push(t.luz);
    return t;
  });

  R.jesus = npc(m, "jesus", px(12), px(5.2), {
    dir: "baixo",
    interacao: conversa("Ouvir Jesus", (j) => (j.flag("ceia.luz") ? ouvirJesus(j) : j.falar(D.escuro)), { raio: 90, ativo: (j) => !j.flag("ceia.ouviu") }),
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
  jogo.objetivo("Está escuro! Use a lanterna e leia o recado na caixa.");
}

const ORDEM_CERTA = ["agua", "planta", "farinha"];

async function lerRecado(jogo) {
  await jogo.falar(D.recado);
  if (jogo.flag("ceia.luz")) return;
  jogo.flag("ceia.recado", true);
  jogo.objetivo(`Acenda as tochas na ordem do recado. (${R.ordem.length}/3)`);
}

function luzTocha(t, acesa) {
  t.acesa = acesa;
  t.quadros = acesa ? A.tocha().quadros : null;
  t.fps = 9;
  t.luz.raio = acesa ? 90 : 1;
  t.luz.brilho = acesa ? 0.32 : 0;
}

async function acender(jogo, t) {
  luzTocha(t, true);
  jogo.audio.sfx("acerto");
  R.ordem.push(t.lugar);
  const certo = R.ordem.every((l, i) => l === ORDEM_CERTA[i]);
  if (!certo) {
    await jogo.esperar(0.5);
    for (const x of R.tochas) luzTocha(x, false);
    R.ordem = [];
    jogo.audio.sfx("erro");
    jogo.objetivo("Acenda as tochas na ordem do recado. (0/3)");
    return jogo.falar(D.errou);
  }
  if (R.ordem.length < 3) {
    jogo.objetivo(`Acenda as tochas na ordem do recado. (${R.ordem.length}/3)`);
    return;
  }
  jogo.flag("ceia.luz", true);
  jogo.escuridaoAlvo = 0.3;
  jogo.piscar([255, 200, 120], 0.8, 0.25);
  jogo.objetivo("Converse com Jesus.");
  R.jesus.olharPara(jogo.jogador.x, jogo.jogador.y);
  await jogo.falar(D.iluminou);
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
