// FASE 1 — A pergunta: o pátio à noite, com a equipe toda.
// Débora lança a pergunta "qual é a maior prova de amor?". O jogador ouve
// pelo menos quatro amigos e volta para ela, que leva a história a Jerusalém.
import { DIALOGOS } from "../dialogos.js";
import { titulo as original } from "./titulo.js";
import * as A from "../arte/objetos.js";
import { px, objeto, npc, braseiro, ambiente, desenharNevoa, conversa } from "./comum.js";

const D = DIALOGOS.patio;
const AMIGOS = ["kenedy", "bea", "mj", "thama", "samuel"];
const NECESSARIAS = 4;

let R = {};

const def = { ...original.def, inicio: { x: 17, y: 13.2, dir: "cima" }, escuridao: 0.68, musica: "titulo" };

const ouvidas = (j) => AMIGOS.filter((id) => j.flag("ouviu." + id)).length;

function atualizarObjetivo(j) {
  const n = ouvidas(j);
  if (n >= NECESSARIAS) j.objetivo("Volte e converse com a Débora.");
  else j.objetivo(`Pergunte para a galera: qual é a maior prova de amor? (${n}/${NECESSARIAS})`);
}

function montar(jogo, m) {
  R = {};
  for (const [x, y] of [[4, 4.6], [30, 4.6], [8, 12.6], [26, 12.6]]) braseiro(m, px(x), px(y));
  for (const [x, y, q] of [[6.5, 5.2, false], [27.5, 5.2, false], [13, 12.8, true], [21, 12.8, false]]) {
    objeto(m, A.coluna(q), px(x), px(y), { solido: { w: 16, h: 7 } });
  }
  m.luzes.push({ x: px(17), y: px(8), raio: 160, cor: [70, 130, 210], brilho: 0.14, intensidade: 0.35 });

  R.debora = npc(m, "debora", px(17), px(11.4), {
    dir: "baixo",
    interacao: conversa("Conversar", falarDebora),
  });
  const lugares = {
    kenedy: [5, 8.6, "dir"],
    bea: [9.5, 11.6, "dir"],
    mj: [29, 8.6, "esq"],
    thama: [24.5, 11.6, "esq"],
    samuel: [17, 4.4, "baixo"],
  };
  for (const id of AMIGOS) {
    const [x, y, dir] = lugares[id];
    npc(m, id, px(x), px(y), {
      dir,
      interacao: conversa("Perguntar", async (j) => {
        if (j.flag("ouviu." + id)) return j.falar(D[id].slice(-1));
        await j.falar(D[id]);
        j.flag("ouviu." + id, true);
        atualizarObjetivo(j);
      }),
    });
  }
}

async function falarDebora(j) {
  if (ouvidas(j) < NECESSARIAS) return j.falar(D.debora);
  j.objetivo("");
  await j.falar(D.deboraFinal);
  await j.carregarSala("ceia");
}

async function aoEntrar(jogo) {
  await jogo.ui.cartao("Parte 1", "A pergunta", "uma noite com a galera", 2600);
  R.debora.olharPara(jogo.jogador.x, jogo.jogador.y);
  await jogo.falar(D.intro);
  atualizarObjetivo(jogo);
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
