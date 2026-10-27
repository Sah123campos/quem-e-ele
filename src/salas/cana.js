// FASE 1 — Algo não se encaixa: o casamento em Caná (João 2:1–11).
// O jogador chega depois que o vinho "voltou". Ninguém sabe de onde ele veio:
// é preciso ouvir as testemunhas, achar pistas, fazer o servente contar o que
// viu (a lembrança dele mostra o sinal) e descobrir o nome do convidado.
import { DIALOGOS, PISTAS } from "../dialogos.js";
import * as A from "../arte/objetos.js";
import { SIMBOLOS, desenharSimbolo } from "../arte/simbolos.js";
import { px, paleta, Mapa, objeto, npc, tocha, lamparina, marca, animar, suave, ambiente, brilhos, conversa, exame } from "./comum.js";

const D = DIALOGOS.cana;
const NUM_TALHAS = 6;
const PISTAS_NECESSARIAS = 3;
const PISTAS_CANA = ["mestre", "noivo", "agua", "talhas", "cisterna", "rastro", "barris"];

let J = null; // jogo (usado nos rótulos que mudam com o andamento)
let R = {}; // referências da sala montada

// Pegadas molhadas, visíveis só com a luz negra.
SIMBOLOS.pegadas = {
  nome: "Pegadas",
  mascara: [
    "..##.....",
    ".####....",
    ".####....",
    ".####....",
    "..##..##.",
    "..##.####",
    ".....####",
    ".....####",
    "......##.",
    "......##.",
  ],
};

const MESAS = [
  [0, 14, 13],
  [2, 21, 13],
  [3, 14, 16.6],
  [1, 21, 16.6],
];

const ESCURIDAO = 0.36;

// ---------- Mapa ----------
function mapa() {
  const m = new Mapa(36, 24, "g");
  m.ret("M", 0, 0, 36, 1);
  m.ret("P", 1, 1, 9, 2); // parede do fundo da adega
  m.ret("M", 10, 1, 1, 9); // parede leste da adega
  m.ret("R", 11, 1, 24, 2); // parede rebocada da casa
  m.ret(",", 1, 3, 9, 6); // chão de terra da adega
  m.ret(".", 11, 3, 14, 15); // pátio da festa
  m.ret("l", 25, 3, 10, 10); // cozinha
  m.ret("M", 1, 9, 9, 1); // parede sul da adega
  m.ret("P", 1, 10, 10, 1);
  m.ret(",", 5, 9, 2, 2); // porta da adega
  m.ret(".", 5, 11, 2, 2).ret(".", 7, 12, 4, 1); // caminho até a adega
  m.ret(".", 16, 18, 4, 5); // caminho da entrada
  m.ret("M", 0, 0, 1, 24).ret("M", 35, 0, 1, 24);
  return m.linhas();
}

const def = {
  larg: 36,
  alt: 24,
  mapa: mapa(),
  legenda: { M: "muro", P: "parede", R: "reboco", ",": "terra", ".": "pedra", l: "ladrilho", g: "grama" },
  paleta: paleta({
    ladrilho: "#b46a42",
    ladrilho2: "#a25c3a",
    ladrilhoRejunte: "#5e3a28",
    pedra: "#bba27c",
    pedra2: "#a68c66",
    rejunte: "#6e5a44",
    celula: 11,
    terra: "#6e5038",
    terra2: "#5e422e",
    pedrinha: "#9a8466",
    grama: "#5f7f3a",
    grama2: "#4c6a2e",
    flores: ["#f0e070", "#f08aa0", "#f4f0e0"],
    madeira: "#7a5032",
    madeira2: "#6a4428",
    agua: "#2e5a7a",
    aguaFunda: "#1c3a56",
    argamassa: "#4a3c30",
    bloco: "#7e6c56",
    bloco2: "#6c5c4a",
    reboco: "#dcc6a0",
    reboco2: "#ccb288",
    tijolo: "#a8603e",
    topo: "#9a8466",
    topo2: "#8a7458",
    rocha: "#7a6e60",
    rocha2: "#6a5e52",
    rochaTopo: "#8a7e6e",
  }),
  decalques: [
    { tipo: "palha", x: 1, y: 3, w: 9, h: 6, n: 46 },
    { tipo: "tapete", x: 11.8, y: 4.9, w: 4.4, h: 2.8, cor: "#7a2234", cor2: "#d8a848", cor3: "#2e3a6a" },
    { tipo: "petalas", x: 11.5, y: 8, w: 13, h: 10, n: 80 },
    ...MESAS.map(([, x, y]) => ({ tipo: "sombra", x: x - 1.9, y: y - 0.7, w: 3.8, h: 1.4, forca: 0.42 })),
    { tipo: "folhas", x: 1, y: 13, w: 9, h: 9, n: 26 },
    { tipo: "folhas", x: 25, y: 13, w: 10, h: 9, n: 26 },
    { tipo: "poca", x: 30.1, y: 11.7, w: 1.3, h: 0.5 },
    { tipo: "rachadura", x: 13.2, y: 2.2, n: 12 },
  ],
  sombras: [{ x: 1, y: 1, w: 9.6, h: 10, forca: 0.95, borda: 22, fechada: true }],
  bloqueios: [{ x: 0, y: 23.2, w: 36, h: 0.8 }],
  inicio: { x: 18.2, y: 21.6, dir: "cima" },
  escuridao: ESCURIDAO,
  musica: "cana",
  tensao: 0,
};

// ---------- Montagem ----------
function montar(jogo, m) {
  J = jogo;
  R = { talhas: [] };

  // Adega (escura, com os barris vazios)
  const adega = [
    [A.barril(), 2, 4.4],
    [A.anfora("#9a5a3a"), 4.5, 4.1],
    [A.anfora(), 5.3, 4.2],
    [A.caixote(), 7.6, 4.4],
    [A.caixote(), 8.7, 4.5],
    [A.saco(), 8.6, 6.2],
    [A.barril(), 8.5, 8.5],
    [A.saco(), 1.9, 8.3],
    [A.caixote(), 1.9, 6.7],
  ];
  for (const [arte, x, y] of adega) objeto(m, arte, px(x), px(y), { solido: { w: arte.img.width - 4, h: 5 } });
  R.barris = objeto(m, A.barril(), px(3.1), px(4.7), {
    solido: { w: 12, h: 5 },
    interacao: exame("Examinar os barris", (j) => {
      novaPista(j, "barris");
      return j.falar(D.barris);
    }),
  });

  // Portão norte (por onde se sai depois de descobrir o nome)
  R.portao = objeto(m, A.portao(false), px(18), px(3), {
    interacao: {
      get rotulo() {
        return J.flag("cana.nome") ? "Seguir a Débora" : "Examinar o portão";
      },
      icone: "usar",
      raio: 26,
      acao: portaoAcao,
    },
  });
  R.portao.pontoInteracao = () => ({ x: px(18), y: px(3) + 6 });
  R.portao.alturaMarcador = 36;
  objeto(m, A.vasoPlanta(1), px(16), px(3.8), { solido: { w: 10, h: 4 } });
  objeto(m, A.vasoPlanta(0), px(20), px(3.8), { solido: { w: 10, h: 4 } });
  objeto(m, A.anfora(), px(12.7), px(3.8), { solido: { w: 9, h: 4 } });
  objeto(m, A.anfora("#a8603e"), px(23.2), px(3.8), { solido: { w: 9, h: 4 } });

  // Mesa dos noivos
  const yNoivos = px(7);
  objeto(m, A.mesa(1), px(14), yNoivos, { solido: { w: 48, h: 12 } });
  lamparina(m, px(14.4), yNoivos + 1, 11);
  R.noivo = npc(m, "noivo", px(13.2), px(6), {
    dir: "baixo",
    gesticula: true,
    interacao: conversa("Conversar", noivoAcao),
  });
  R.noiva = npc(m, "noiva", px(14.9), px(6), {
    dir: "baixo",
    interacao: conversa("Conversar", (j) => j.falar(j.flag("cana.flash") ? D.noivaFim : D.noiva)),
  });

  // O convidado de manto vermelho, a mãe dele e o mestre-sala
  R.jesus = npc(m, "jesus", px(17.6), px(8.6), {
    dir: "baixo",
    interacao: conversa("Conversar", (j) => j.falar(j.flag("cana.nome") ? D.jesusFim : D.jesusAntes)),
  });
  R.maria = npc(m, "maria", px(19.2), px(9), { dir: "esq", interacao: conversa("Conversar", mariaAcao) });
  R.mestre = npc(m, "mestre", px(22.4), px(6.6), { dir: "esq", gesticula: true, interacao: conversa("Conversar", mestreAcao) });

  // Mesas dos convidados
  for (const [v, x, y] of MESAS) {
    objeto(m, A.mesa(v), px(x), px(y), { solido: { w: 48, h: 12 } });
    lamparina(m, px(x) + (v % 2 ? -8 : 9), px(y) + 1, 11);
  }
  const fim = () => J.flag("cana.nome");
  const convidados = [
    ["convidado1", 13, 12, () => D.convidado1],
    ["convidada1", 15.2, 11.9, () => D.convidada1],
    ["convidado2", 21.9, 12, () => (fim() ? D.convidado2Fim : D.convidado2)],
    ["convidado3", 13.4, 15.7, () => (fim() ? D.convidado3Fim : D.convidado3)],
    ["convidada3", 22, 15.7, () => (J.flag("cana.flash") ? D.convidada3Fim : D.convidada3)],
  ];
  for (const [id, x, y, falas] of convidados) {
    npc(m, id, px(x), px(y), { dir: "baixo", gesticula: id.startsWith("convidado"), interacao: conversa("Conversar", (j) => j.falar(falas())) });
  }
  // A convidada que viu os empregados carregando água.
  npc(m, "convidada2", px(20.1), px(15.7), {
    dir: "baixo",
    interacao: conversa("Conversar", async (j) => {
      if (j.estado.pistas.some((p) => p.id === "agua")) return j.falar(D.convidada2Depois);
      await j.falar(D.convidada2);
      novaPista(j, "agua");
    }),
  });

  // Tochas e guirlandas
  for (const [x, y] of [[11.7, 3.9], [24.3, 3.9], [11.7, 10.8], [24.3, 10.8], [11.7, 17.4], [24.3, 17.4], [34.3, 9]]) tocha(m, px(x), px(y));
  m.extrasFrente.push((ctx, cx, cy, t) => {
    A.desenharGuirlanda(ctx, px(11.7) - cx, px(3.9) - 31 - cy, px(24.3) - cx, px(3.9) - 31 - cy, 12, t);
  });

  // Cozinha: as seis talhas de pedra, já cheias de vinho (João 2:6)
  for (let i = 0; i < NUM_TALHAS; i++) {
    const t = objeto(m, A.talha(), 420 + i * 22, 75, {
      solido: { w: 14, h: 6 },
      aoDesenhar: (ctx, sx, sy, jogo, e) => A.conteudoTalha(ctx, sx, sy, e.nivel, e.vinho, jogo.t + i),
      interacao: exame("Examinar a talha", talhaAcao, { raio: 15 }),
    });
    t.nivel = 1;
    t.vinho = 1;
    R.talhas.push(t);
  }
  R.cisterna = objeto(m, A.cisterna(), px(31.5), px(11.3), {
    solido: { w: 28, h: 8 },
    interacao: exame("Examinar a cisterna", async (j) => {
      if (j.estado.pistas.some((p) => p.id === "cisterna")) return j.falar(D.cisternaDepois);
      await j.falar(D.cisterna);
      novaPista(j, "cisterna");
    }, { raio: 22 }),
  });
  R.servo = npc(m, "servo", px(26.8), px(10.2), { dir: "esq", gesticula: true, interacao: conversa("Conversar", servoAcao) });
  R.servo2 = npc(m, "servo2", px(29.4), px(11.5), {
    dir: "dir",
    interacao: conversa("Conversar", (j) => j.falar(j.flag("cana.flash") ? D.servo2Fim : D.servo2Antes)),
  });
  R.kenedy = npc(m, "kenedy", px(33.4), px(8.6), { dir: "esq", interacao: conversa("Conversar", kenedyAcao) });
  objeto(m, A.barril(), px(34.2), px(12.3), { solido: { w: 12, h: 5 } });
  objeto(m, A.saco(), px(33.2), px(12.5), { solido: { w: 10, h: 4 } });
  objeto(m, A.caixote(), px(25.8), px(12.5), { solido: { w: 12, h: 5 } });
  objeto(m, A.anfora("#9a5a3a"), px(25.5), px(7.2), { solido: { w: 9, h: 4 } });

  // Jardim e entrada
  R.debora = npc(m, "debora", px(16.4), px(20.2), { dir: "dir", interacao: conversa("Conversar", deboraAcao) });
  objeto(m, A.palmeira(0), px(13), px(21.4), { solido: { w: 6, h: 4 } });
  objeto(m, A.palmeira(1), px(23), px(21.4), { solido: { w: 6, h: 4 } });
  objeto(m, A.vasoPlanta(1), px(15.3), px(18.6), { solido: { w: 10, h: 4 } });
  objeto(m, A.vasoPlanta(0), px(20.7), px(18.6), { solido: { w: 10, h: 4 } });
  for (const [x, y, v] of [[2.5, 14.5, 0], [6.5, 16.5, 2], [3, 20, 1], [8.5, 21.5, 0], [27, 15, 1], [31, 17, 2], [33.5, 21, 0], [28, 21.5, 2], [9.6, 17.6, 1]]) {
    objeto(m, A.arbusto(v), px(x), px(y), { solido: { w: 14, h: 5 } });
  }
  for (let x = 1.4; x < 35; x += 2.3) {
    if (x > 15 && x < 20.5) continue;
    objeto(m, A.arbusto(Math.round(x * 3) % 3), px(x), px(23.9), { solido: { w: 14, h: 5 } });
  }
  for (const x of [15.6, 20.4]) objeto(m, A.vasoPlanta(1), px(x), px(23.8), { solido: { w: 10, h: 4 } });

  // ---------- Luz negra: o rastro de água da cisterna até as talhas ----------
  const pegadas = desenharSimbolo("pegadas", "#bfe6ff", "#5a8aff", 1);
  for (const [x, y] of [[30.9, 10.1], [30.4, 8.9], [29.8, 7.7], [29.1, 6.6], [27.6, 6.5], [32.1, 6.6]]) {
    marca(m, pegadas, px(x), px(y), {
      aoRevelar: async (j) => {
        if (j.estado.pistas.some((p) => p.id === "rastro")) return;
        await j.falar(D.rastro);
        novaPista(j, "rastro");
      },
    });
  }
}

// ---------- Pistas e objetivo ----------
function numPistas(j) {
  return j.estado.pistas.filter((p) => PISTAS_CANA.includes(p.id)).length;
}

function temPista(j, id) {
  return j.estado.pistas.some((p) => p.id === id);
}

function novaPista(j, id) {
  const nova = j.pista(id, PISTAS[id], "Caná");
  if (nova) j.objetivo(objetivoAtual(j));
  return nova;
}

function objetivoAtual(j) {
  if (j.flag("cana.nome")) return "Encontre a Débora no portão norte.";
  if (j.flag("cana.flash")) return "Descubra o nome do convidado de manto vermelho.";
  const n = Math.min(numPistas(j), PISTAS_NECESSARIAS);
  if (n < PISTAS_NECESSARIAS) return `Descubra de onde veio o vinho novo. Pistas: ${n}/${PISTAS_NECESSARIAS}`;
  if (!temPista(j, "talhas")) return "Examine as talhas de pedra da cozinha.";
  return "Os empregados sabem de alguma coisa. Fale com o servente da cozinha.";
}

// ---------- Roteiro ----------
async function aoEntrar(jogo) {
  await jogo.ui.cartao("Fase 1", "Algo não se encaixa", "Caná da Galileia", 2800);
  await jogo.falar(D.intro);
  R.debora.olharPara(jogo.jogador.x, jogo.jogador.y);
  await jogo.falar(D.debora);
  jogo.objetivo(objetivoAtual(jogo));
}

async function deboraAcao(jogo) {
  if (jogo.flag("cana.nome")) {
    await jogo.falar(D.deboraFim);
    return sair(jogo);
  }
  if (jogo.flag("cana.flash")) return jogo.falar(D.deboraEspera);
  return jogo.falar(D.deboraDica);
}

async function mestreAcao(jogo) {
  if (jogo.flag("cana.flash")) return jogo.falar(D.mestreFim);
  if (temPista(jogo, "mestre")) return jogo.falar(D.mestreDepois);
  await jogo.falar(D.mestre);
  novaPista(jogo, "mestre");
}

async function noivoAcao(jogo) {
  if (jogo.flag("cana.flash")) return jogo.falar(D.noivoFim);
  if (temPista(jogo, "noivo")) return jogo.falar(D.noivoDepois);
  await jogo.falar(D.noivo);
  novaPista(jogo, "noivo");
}

async function talhaAcao(jogo) {
  if (temPista(jogo, "talhas")) return jogo.falar(D.talhasDepois);
  await jogo.falar(D.talhas);
  novaPista(jogo, "talhas");
}

async function kenedyAcao(jogo) {
  if (jogo.flag("cana.flash")) return jogo.falar(D.kenedyFim);
  if (jogo.estado.uvLiberada) return jogo.falar(D.kenedyDepois);
  await jogo.falar(D.kenedy);
  jogo.liberarUV();
  jogo.audio.sfx("uv");
  jogo.piscar([150, 80, 255], 0.6, 0.35);
  jogo.vibrar([20, 40, 20]);
  const como = jogo.entrada.dispositivo === "toque" ? "o botão roxo" : "a tecla <b>Q</b>";
  jogo.ui.aviso(`<b>Luz negra</b> liberada! Use ${como} para ligar.`);
  await jogo.falar(D.kenedyDepois);
}

async function servoAcao(jogo) {
  if (jogo.flag("cana.flash")) return jogo.falar(jogo.flag("cana.nome") ? D.servoFim : D.servoDepois);
  if (numPistas(jogo) < PISTAS_NECESSARIAS) {
    jogo.flag("cana.servoNegou", true);
    await jogo.falar(D.servoNega);
    jogo.objetivo(objetivoAtual(jogo));
    return;
  }
  if (!temPista(jogo, "talhas")) return jogo.falar(D.servoTalhas);
  await jogo.falar(D.servoConta);
  await cenaLembranca(jogo);
}

// A lembrança do servente: como o vinho apareceu (João 2:3–9).
// A cena acontece no próprio pátio, com as cores de uma lembrança.
async function cenaLembranca(jogo) {
  const { jesus, maria, servo, mestre } = R;
  const j = jogo.jogador;
  const atores = [jesus, maria, servo, mestre];
  const origem = atores.map((p) => ({ p, x: p.x, y: p.y, dir: p.dirPadrao }));

  await jogo.ui.fade(true, 700);
  R.lembranca = true;
  j.visivel = false;
  for (const p of atores) p.parado = true;
  for (const t of R.talhas) {
    t.nivel = 0;
    t.vinho = 0;
  }
  jogo.objetivo("Lembrança do servente");
  jogo.focar(px(19.4), px(8.6));
  jogo.atualizarCamera(0, true);
  await jogo.ui.fade(false, 700);
  await jogo.falar(D.lembrancaIntro);

  // Maria percebe a falta de vinho e fala com Jesus.
  await maria.andarAte(px(18.8), px(8.7), 30);
  maria.olharPara(jesus.x, jesus.y);
  jesus.olharPara(maria.x, maria.y);
  await jogo.esperar(0.3);
  maria.gesticular(1.2);
  await jogo.falar(D.lembrancaPedido.slice(0, 1));
  jesus.gesticular(1.2);
  await jogo.falar(D.lembrancaPedido.slice(1));

  // Maria chama o servente.
  maria.olharPara(px(24), px(10));
  maria.gesticular(1.4);
  await servo.seguirCaminho([[px(24.8), px(10)], [px(21.2), px(9.7)]], 52);
  servo.olharPara(maria.x, maria.y);
  await jogo.falar(D.lembrancaOrdem.slice(0, 1));
  jesus.olharPara(servo.x, servo.y);
  jesus.gesticular(1.6);
  await jogo.falar(D.lembrancaOrdem.slice(1));

  // Os serventes enchem as talhas.
  jogo.focar(px(29), px(7));
  await servo.seguirCaminho([[px(24.8), px(10)], [px(30), px(9.4)]], 60);
  servo.olharPara(px(29), px(5));
  jogo.audio.sfx("encher", { dur: 2.4 });
  await animar(2.4, (k) => {
    R.talhas.forEach((t, i) => {
      t.nivel = suave(Math.max(0, Math.min(1, k * 1.6 - i * 0.12)));
    });
    if (Math.random() < 0.3) {
      const t = R.talhas[Math.floor(Math.random() * NUM_TALHAS)];
      respingo(jogo, t.x, t.y - 21, 1);
    }
  });
  await jogo.falar(D.lembrancaCheias);

  // Jesus vai até as talhas.
  await jesus.seguirCaminho([[px(19.6), px(9.9)], [px(24.6), px(9.6)], [px(27.6), px(7.3)]], 44);
  jesus.olharPara(px(27.6), px(4));
  servo.olharPara(jesus.x, jesus.y);
  await jogo.esperar(0.4);
  jesus.gesticular(3.2);
  await jogo.falar(D.lembrancaTirem);

  // O sinal: a água se torna vinho.
  jogo.audio.sfx("transformacao");
  const brilho = { x: 475, y: 62, raio: 12, cor: [255, 196, 150], brilho: 0.5, intensidade: 0.95 };
  jogo.mundo.luzes.push(brilho);
  await animar(2.8, (k) => {
    brilho.raio = 12 + suave(k) * 130;
    R.talhas.forEach((t, i) => {
      t.vinho = suave(Math.max(0, Math.min(1, k * 1.5 - i * 0.09)));
    });
    if (Math.random() < 0.6) {
      const t = R.talhas[Math.floor(Math.random() * NUM_TALHAS)];
      brilhos(jogo, t.x, t.y - 20, 1, Math.random() < 0.5 ? "#ffe0b0" : "#ffc0d0", 10);
    }
  });
  jogo.piscar([255, 210, 170], 1, 0.35);
  for (const t of R.talhas) brilhos(jogo, t.x, t.y - 20, 8, "#ffe9c0", 12);
  jogo.vibrar([30, 60, 30]);
  await animar(1.4, (k) => {
    brilho.raio = 142 - suave(k) * 130;
    brilho.brilho = 0.5 * (1 - k);
  });
  jogo.mundo.luzes.splice(jogo.mundo.luzes.indexOf(brilho), 1);

  // O servente leva ao mestre-sala.
  await servo.seguirCaminho([[px(28.4), px(8.4)], [px(28.4), px(6.4)]], 52);
  servo.olharPara(px(28.4), px(4));
  await jogo.esperar(0.5);
  jogo.audio.sfx("agua");
  const leva = servo.seguirCaminho([[px(26), px(8.6)], [px(23.6), px(7.2)]], 52);
  jogo.focar(px(22.4), px(6.8));
  await leva;
  servo.olharPara(mestre.x, mestre.y);
  mestre.olharPara(servo.x, servo.y);
  await jogo.esperar(0.4);
  mestre.gesticular(2);
  await jogo.falar(D.lembrancaMestre);

  // Volta ao presente.
  await jogo.ui.fade(true, 700);
  for (const o of origem) {
    o.p.x = o.x;
    o.p.y = o.y;
    o.p.dir = o.dir;
    o.p.dirPadrao = o.dir;
    o.p.parado = false;
  }
  R.lembranca = false;
  j.visivel = true;
  jogo.focar(null);
  jogo.atualizarCamera(0, true);
  jogo.flag("cana.flash", true);
  await jogo.ui.fade(false, 700);
  servo.olharPara(j.x, j.y);
  await jogo.falar(D.servoDepois);
  jogo.pista("servente", PISTAS.servente, "Caná");
  jogo.objetivo(objetivoAtual(jogo));
}

async function mariaAcao(jogo) {
  if (jogo.flag("cana.nome")) return jogo.falar(D.mariaFim);
  if (!jogo.flag("cana.flash")) return jogo.falar(D.maria);
  await cenaNome(jogo);
}

// O nome do convidado: Jesus, de Nazaré.
async function cenaNome(jogo) {
  const { jesus, maria } = R;
  maria.olharPara(jesus.x, jesus.y);
  maria.gesticular(1.2);
  await jogo.falar(D.mariaNome);
  jogo.flag("cana.nome", true);
  jogo.pista("nome", PISTAS.nome, "Caná");
  jogo.focar(jesus.x, jesus.y);
  jesus.olharPara(jogo.jogador.x, jogo.jogador.y);
  brilhos(jogo, jesus.x, jesus.y - 14, 18, "#ffe9a8", 16);
  await jogo.esperar(0.8);
  await jogo.falar(D.sinal);
  jogo.focar(null);
  jogo.simbolo("talha", "Talha · água em vinho");
  await jogo.esperar(0.6);

  // Débora espera no portão norte, já aberto.
  R.debora.x = px(19.1);
  R.debora.y = px(4.9);
  R.debora.dir = R.debora.dirPadrao = "baixo";
  R.portao.img = A.portao(true).img;
  jogo.audio.sfx("porta");
  await jogo.falar(D.deboraChama);
  jogo.objetivo(objetivoAtual(jogo));
}

async function portaoAcao(jogo) {
  if (!jogo.flag("cana.nome")) return jogo.falar(D.portaoAntes);
  return sair(jogo);
}

async function sair(jogo) {
  const j = jogo.jogador;
  await j.andarAte(px(18), px(3) + 8);
  await j.andarAte(px(18), px(3) - 2);
  await jogo.carregarSala("poco");
}

function respingo(jogo, x, y, n = 10) {
  for (let i = 0; i < n; i++) {
    jogo.particulas.emitir({
      x: x + (Math.random() - 0.5) * 8,
      y,
      vx: (Math.random() - 0.5) * 30,
      vy: -20 - Math.random() * 25,
      ay: 120,
      vida: 0.45 + Math.random() * 0.3,
      cor: "#a8d8f0",
      cor2: "#4f9ccc",
    });
  }
}

function atualizar(jogo, dt) {
  ambiente(jogo, dt, {
    vagalumes: [
      { x: px(1), y: px(13), w: px(9), h: px(9), taxa: 0.8 },
      { x: px(25), y: px(13), w: px(10), h: px(9), taxa: 0.8 },
    ],
    petalas: [{ x: px(11), y: px(2), w: px(14), h: px(12), taxa: 0.35 }],
    poeiraFeixe: (j) => j.jogador.x < px(10.5) && j.jogador.y < px(10.5),
  });
}

// Durante a lembrança do servente, a cena ganha cores de memória.
function desenharPorCima(ctx, cx, cy, jogo) {
  if (!R.lembranca) return;
  const { w, h } = jogo.tela;
  ctx.globalCompositeOperation = "saturation";
  ctx.fillStyle = "rgba(128,128,128,0.75)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgb(255,214,160)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
  // Moldura escura de lembrança.
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.65);
  g.addColorStop(0, "rgba(40,20,5,0)");
  g.addColorStop(1, "rgba(40,20,5,0.55)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export const cana = { def, montar, aoEntrar, atualizar, desenharPorCima };
