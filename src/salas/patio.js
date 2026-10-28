// FINAL — A equipe reunida no pátio, conversando sobre o amigo de verdade.
// Cena curta e automática; depois vem a tela final com o convite.
import { DIALOGOS } from "../dialogos.js";
import { titulo as original } from "./titulo.js";
import * as A from "../arte/objetos.js";
import { px, objeto, npc, braseiro, ambiente, desenharNevoa, falarComGestos } from "./comum.js";

const D = DIALOGOS.reuniao;
let R = {};

const def = { ...original.def, inicio: { x: 17, y: 5.6, dir: "cima" }, escuridao: 0.6, musica: "titulo" };

function montar(jogo, m) {
  R = {};
  for (const [x, y] of [[4, 4.6], [30, 4.6], [8, 12.6], [26, 12.6]]) braseiro(m, px(x), px(y));
  for (const [x, y, q] of [[6.5, 5.2, false], [27.5, 5.2, false], [13, 12.8, true], [21, 12.8, false]]) {
    objeto(m, A.coluna(q), px(x), px(y), { solido: { w: 16, h: 7 } });
  }
  m.luzes.push({ x: px(17), y: px(4.5), raio: 120, cor: [255, 160, 90], brilho: 0.2, intensidade: 0.4 });
  // Roda de amigos em volta do jogador.
  const roda = [
    ["debora", 17, 3.5, "baixo"],
    ["kenedy", 15, 4.1, "dir"],
    ["bea", 19, 4.1, "esq"],
    ["thama", 15.2, 5.4, "dir"],
    ["mj", 18.8, 5.4, "esq"],
  ];
  for (const [id, x, y, dir] of roda) R[id] = npc(m, id, px(x), px(y), { dir, gesticula: true });
}

async function aoEntrar(jogo) {
  const j = jogo.jogador;
  await j.andarAte(px(17), px(4.7));
  for (const p of Object.values(R)) p.olharPara(j.x, j.y);
  jogo.focar(px(17), px(5));
  await falarComGestos(jogo, D, R);
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
