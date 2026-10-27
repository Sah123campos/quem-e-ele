// FASE 3 — A pergunta que ficou: o pátio onde a equipe fecha o caso.
// Os seis amigos esperam em volta do tanque. No centro, as três evidências.
// Ao fechar o caso, a pergunta aparece na muralha: QUEM É ELE?
import { DIALOGOS } from "../dialogos.js";
import { titulo as original } from "./titulo.js";
import * as A from "../arte/objetos.js";
import { desenharSimbolo, textoPixel } from "../arte/simbolos.js";
import { px, objeto, npc, braseiro, ambiente, desenharNevoa, ampliar, animar, suave, brilhos, conversa } from "./comum.js";

const D = DIALOGOS.patio;
const ORDEM = ["talha", "gota", "maca"];

let R = {};

const def = { ...original.def, inicio: { x: 17, y: 13.4, dir: "cima" }, escuridao: 0.72, musica: "titulo" };

function montar(jogo, m) {
  R = { brilhoPergunta: 0 };

  for (const [x, y] of [[4, 4.6], [30, 4.6], [8, 12.6], [26, 12.6]]) braseiro(m, px(x), px(y));
  for (const [x, y, q] of [[6.5, 5.2, false], [27.5, 5.2, false], [13, 12.8, true], [21, 12.8, false]]) {
    objeto(m, A.coluna(q), px(x), px(y), { solido: { w: 16, h: 7 } });
  }
  m.luzes.push({ x: px(17), y: px(8), raio: 160, cor: [70, 130, 210], brilho: 0.14, intensidade: 0.35 });

  // As três evidências sobre o pedestal.
  R.pedestal = objeto(m, A.pedestal(), px(17), px(11.7), {
    solido: { w: 12, h: 5 },
    interacao: {
      rotulo: "Fechar o caso",
      icone: "usar",
      raio: 24,
      ativo: (j) => !j.flag("patio.fechado"),
      acao: fecharCaso,
    },
  });
  R.pedestal.alturaMarcador = 44;
  R.luzPedestal = { x: px(17), y: px(11.7) - 26, raio: 60, cor: [170, 110, 255], brilho: 0.3, intensidade: 0.5 };
  m.luzes.push(R.luzPedestal);
  R.simbolos = ORDEM.map((id, i) => ({
    id,
    img: desenharSimbolo(id),
    x: px(17) + (i - 1) * 18,
    y: px(11.7) - 30,
    fase: i * 2.1,
    aceso: 0,
  }));
  R.pergunta = ampliar(textoPixel("QUEM É ELE?", { cor: "#fff1c8", halo: "#b07aff" }), 2);

  // A equipe toda
  const equipe = [
    ["debora", 15.1, 12.1, "dir"],
    ["kenedy", 18.9, 12.1, "esq"],
    ["thama", 10.6, 11.6, "dir"],
    ["samuel", 23.4, 11.6, "esq"],
    ["bea", 8.2, 8.6, "dir"],
    ["mj", 25.8, 8.6, "esq"],
  ];
  R.equipe = {};
  for (const [id, x, y, dir] of equipe) {
    R.equipe[id] = npc(m, id, px(x), px(y), { dir, interacao: conversa("Conversar", (j) => j.falar(D[id])) });
  }
}

async function aoEntrar(jogo) {
  await jogo.ui.cartao("Fase 3", "A pergunta que ficou", "o fim da investigação", 2800);
  R.equipe.debora.olharPara(jogo.jogador.x, jogo.jogador.y);
  await jogo.falar(D.intro);
  jogo.objetivo("Converse com a equipe e feche o caso no centro do pátio.");
}

async function fecharCaso(jogo) {
  if (jogo.flag("patio.fechado")) return;
  jogo.flag("patio.fechado", true);
  jogo.objetivo("");
  const j = jogo.jogador;
  await j.andarAte(px(17), px(13.1));
  j.olharPara(px(17), px(10));
  j.angulo = -Math.PI / 2;
  for (const p of Object.values(R.equipe)) {
    p.parado = true;
    p.olharPara(px(17), px(11));
  }
  jogo.focar(px(17), px(9.6));
  await jogo.falar(D.pedestalAntes);

  // Cada evidência acende enquanto o jogador resume o relato.
  for (let i = 0; i < 3; i++) {
    const s = R.simbolos[i];
    jogo.audio.sfx("coluna", { ordem: i });
    brilhos(jogo, s.x, s.y, 12, "#d8b8ff", 10);
    animar(0.6, (k) => (s.aceso = k));
    await jogo.falar(D.fechar.slice(i, i + 1));
  }
  await jogo.falar(D.fechar.slice(3));

  // As evidências sobem e a pergunta aparece na muralha.
  jogo.audio.sfx("mecanismo");
  jogo.tremer(1.2, 1.6);
  jogo.vibrar([40, 60, 40]);
  // Câmera alta o bastante para a pergunta aparecer acima da caixa de diálogo.
  jogo.focar(px(17), px(4.2));
  const inicio = R.simbolos.map((s) => ({ x: s.x, y: s.y }));
  await animar(2, (k) => {
    const e = suave(k);
    R.simbolos.forEach((s, i) => {
      s.x = inicio[i].x + ((i - 1) * 46 - (i - 1) * 18) * e;
      s.y = inicio[i].y + (px(4.4) - inicio[i].y) * e;
    });
    R.luzPedestal.y = px(11.7) - 26 + (px(3.6) - px(11.7) + 26) * e;
    R.luzPedestal.raio = 60 + 120 * e;
  });
  jogo.audio.sfx("final");
  jogo.piscar([170, 110, 255], 1.2, 0.3);
  jogo.tensaoExtra = 0.3;
  await animar(2.2, (k) => (R.brilhoPergunta = suave(k)));
  await jogo.esperar(1);
  await jogo.falar(D.autor);
  R.equipe.debora.olharPara(j.x, j.y);
  await jogo.falar(D.final);
  await jogo.esperar(0.6);
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
  ctx.globalCompositeOperation = "lighter";
  // As três evidências flutuando: apagadas até o jogador fechar o caso.
  for (const s of R.simbolos) {
    const pulso = 0.35 + 0.25 * Math.max(0, Math.sin(jogo.t * 1.6 + s.fase));
    ctx.globalAlpha = Math.min(1, pulso + s.aceso * 0.65);
    const flutua = Math.round(Math.sin(jogo.t * 1.2 + s.fase) * 1.5);
    ctx.drawImage(s.img, Math.round(s.x - cx - s.img.width / 2), Math.round(s.y - cy - s.img.height / 2 + flutua));
  }
  // A pergunta na muralha.
  if (R.brilhoPergunta > 0) {
    const img = R.pergunta;
    ctx.globalAlpha = R.brilhoPergunta * (0.85 + 0.15 * Math.sin(jogo.t * 2));
    ctx.drawImage(img, Math.round(px(17) - cx - img.width / 2), Math.round(px(2.1) - cy - img.height / 2));
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

export const patio = { def, montar, aoEntrar, atualizar, desenharPorCima };
