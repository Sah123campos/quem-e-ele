// FINAL — O pátio à noite. A galera está espalhada e cada um escondeu no chão
// uma palavra sobre o que é um amigo de verdade, visível só com luz negra.
// Achadas as cinco, todos se reúnem e vem a tela final com o convite.
import { DIALOGOS } from "../dialogos.js";
import { titulo as original } from "./titulo.js";
import * as A from "../arte/objetos.js";
import { textoPixel } from "../arte/simbolos.js";
import { px, objeto, npc, braseiro, marca, ambiente, desenharNevoa, falarComGestos, brilhos, conversa } from "./comum.js";

const D = DIALOGOS.reuniao;
const AMIGOS = {
  // id: [x, y, direção, palavra escondida]
  kenedy: [4.6, 8.4, "dir", "APARECE"],
  bea: [10.5, 12.2, "dir", "FICA"],
  thama: [24, 12.2, "esq", "ACEITA"],
  mj: [29.4, 8.4, "esq", "DIVIDE"],
  samuel: [11, 3.8, "baixo", "PAGA"],
};
// Roda final, em volta da Débora.
const RODA = { kenedy: [15, 4.1], bea: [19, 4.1], thama: [15.2, 5.4], mj: [18.8, 5.4], samuel: [20.6, 4.8] };

let R = {};

const def = { ...original.def, inicio: { x: 17, y: 12.6, dir: "cima" }, escuridao: 0.72, musica: "titulo" };

const achadas = (j) => Object.keys(AMIGOS).filter((id) => j.flag("msg." + id)).length;
const objetivo = (j) => j.objetivo(`Use a luz negra e ache as mensagens no chão. (${achadas(j)}/5)`);

function montar(jogo, m) {
  R = { amigos: {} };
  for (const [x, y] of [[4, 4.6], [30, 4.6], [8, 12.6], [26, 12.6]]) braseiro(m, px(x), px(y), { raio: 80 });
  for (const [x, y, q] of [[6.5, 5.2, false], [27.5, 5.2, false], [13, 12.8, true], [21, 12.8, false]]) {
    objeto(m, A.coluna(q), px(x), px(y), { solido: { w: 16, h: 7 } });
  }
  R.debora = npc(m, "debora", px(17), px(3.5), {
    dir: "baixo",
    interacao: conversa("Conversar", (j) => j.falar(D.debora), { ativo: (j) => achadas(j) < 5 }),
  });
  for (const [id, [x, y, dir, palavra]] of Object.entries(AMIGOS)) {
    R.amigos[id] = npc(m, id, px(x), px(y), {
      dir,
      interacao: conversa("Conversar", (j) => j.falar(j.flag("msg." + id) ? D[id].slice(-1) : D.escondida), { ativo: (j) => achadas(j) < 5 }),
    });
    // A palavra escondida fica no chão, logo abaixo de cada amigo.
    const img = textoPixel(palavra, { cor: "#f0e0ff", halo: "#8a4aff" });
    marca(m, img, px(x), px(y) + 22, { aoRevelar: (j, ins) => achou(j, id, ins) });
  }
}

async function aoEntrar(jogo) {
  jogo.focar(px(17), px(5));
  await jogo.falar(D.intro);
  jogo.focar(null);
  jogo.liberarUV();
  jogo.ui.aviso("Você ganhou uma <b>luz negra</b>! Toque no botão roxo (ou aperte Q).");
  objetivo(jogo);
}

async function achou(jogo, id, ins) {
  if (jogo.flag("msg." + id)) return;
  jogo.flag("msg." + id, true);
  jogo.audio.sfx("revelar");
  brilhos(jogo, ins.x, ins.y, 16, "#d8b8ff", 14);
  const amigo = R.amigos[id];
  amigo.olharPara(jogo.jogador.x, jogo.jogador.y);
  await falarComGestos(jogo, D[id], { [id]: amigo });
  objetivo(jogo);
  if (achadas(jogo) === 5) await reunir(jogo);
}

async function reunir(jogo) {
  jogo.objetivo("");
  jogo.lanterna = "desligada";
  jogo.ui.atualizar();
  await jogo.falar(D.chamar);
  const j = jogo.jogador;
  jogo.focar(px(17), px(5));
  await Promise.all([
    ...Object.entries(RODA).map(([id, [x, y]]) => R.amigos[id].andarAte(px(x), px(y), 70)),
    j.andarAte(px(17), px(4.7)),
  ]);
  for (const p of [R.debora, ...Object.values(R.amigos)]) {
    p.parado = true;
    p.olharPara(j.x, j.y);
  }
  j.olharPara(R.debora.x, R.debora.y);
  await falarComGestos(jogo, D.final, { debora: R.debora });
  await jogo.esperar(0.5);
  await jogo.ui.fade(true, 1400);
  jogo.finalizar();
  await jogo.ui.fade(false, 900);
}

function atualizar(jogo, dt) {
  ambiente(jogo, dt, {
    vagalumes: [{ x: px(1), y: px(3), w: px(32), h: px(11), taxa: 1.6 }],
    brilhosAgua: [{ x: px(10), y: px(6), w: px(14), h: px(4), taxa: 2 }],
  });
}

function desenharPorCima(ctx, cx, cy, jogo) {
  desenharNevoa(ctx, cx, cy, { x: px(6), y: px(4.4), w: px(22), h: px(7.6) }, jogo.t, 0.1, 4);
}

export const patio = { def, montar, aoEntrar, atualizar, desenharPorCima };
