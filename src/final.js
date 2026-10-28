// Tela final de "O Maior Amor": a pergunta que ficou e o convite para sexta.
import { esperar } from "./jogo.js";
import { CONVITE, MENSAGEM_COMPARTILHAR } from "./config.js";

const $ = (id) => document.getElementById(id);

export async function finalizar(jogo) {
  jogo.modo = "final";
  jogo.ui.emJogo = false;
  jogo.ui.atualizar();
  jogo.audio.tocar("revelacao", 2.5);
  preencherConvite();
  $("final").hidden = false;
  const escrever = async (id, texto) => {
    const p = $(id);
    p.textContent = "";
    for (let i = 1; i <= texto.length; i++) {
      p.textContent = texto.slice(0, i);
      if (i % 3 === 0) jogo.audio.blip("narrador");
      await esperar(0.02);
    }
  };
  await esperar(1.2);
  await escrever("final-linha1", "Ninguém tem maior amor do que aquele que dá a sua vida pelos seus amigos.");
  await esperar(0.7);
  await escrever("final-linha2", "Jesus disse isso. E fez.");
  await esperar(0.9);
  $("final-titulo").classList.add("visivel");
  jogo.audio.sfx("simbolo");
  await esperar(1);
  await escrever("final-linha3", "Essa amizade também é para você.");
  await esperar(0.6);
  $("btn-final-seguir").classList.add("visivel");
  try {
    localStorage.removeItem(jogo.chaveProgresso);
  } catch {
    /* ok */
  }
}

export function mostrarConvite(jogo) {
  jogo.audio.sfx("pagina");
  $("final-parte1").hidden = true;
  $("final-convite").hidden = false;
}

function preencherConvite() {
  const quando = [CONVITE.data, CONVITE.horario].filter(Boolean).join(" · ");
  const campos = { "convite-evento": CONVITE.evento, "convite-quando": quando, "convite-local": CONVITE.local, "convite-detalhe": CONVITE.detalhe };
  for (const [id, texto] of Object.entries(campos)) {
    $(id).textContent = texto;
    $(id).hidden = !texto;
  }
  const link = $("btn-link");
  link.hidden = !CONVITE.link;
  if (CONVITE.link) {
    link.href = CONVITE.link;
    link.textContent = CONVITE.textoLink;
  }
}

// Manda uma mensagem para quem convidou (compartilhar do celular ou WhatsApp).
export async function compartilhar() {
  const url = location.origin + location.pathname;
  if (navigator.share) {
    try {
      await navigator.share({ text: MENSAGEM_COMPARTILHAR, url });
      return;
    } catch (e) {
      if (e?.name === "AbortError") return;
    }
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(`${MENSAGEM_COMPARTILHAR}\n${url}`)}`, "_blank", "noopener");
}
