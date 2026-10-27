# Quem é Ele?

Jogo de investigação em pixel art para o amigo que **nunca foi à igreja**. Feito a partir de [O Mistério dos Sinais](https://github.com/Sah123campos/misterio-dos-sinais).
Ele entra pelo mistério, continua porque quer descobrir a resposta e termina com o convite para o **Culto Adoles de sexta-feira**.
Ninguém precisa conhecer a Bíblia nem acreditar em nada para jogar: só ter curiosidade. Dura cerca de 8 minutos.
Roda direto no navegador (computador e celular), sem instalar nada.

Endereço (com o GitHub Pages ligado): `https://sah123campos.github.io/quem-e-ele/`

## O caso

| Fase | Lugar | O que acontece |
|---|---|---|
| **1. Algo não se encaixa** | Caná (João 2) | O vinho da festa tinha acabado e voltou melhor. Ninguém sabe de onde veio. O jogador ouve testemunhas, junta pistas (as talhas de água cheias de vinho, pegadas molhadas com a luz negra, barris vazios) e convence o servente a contar o que viu. A lembrança dele mostra a água virando vinho. A mãe do convidado revela o nome: **Jesus, de Nazaré**. |
| **2. Os relatos** | Poço de Jacó (João 4) | Jesus conversa com a mulher samaritana e diz: “Sou eu” (o Messias). Ela corre para a cidade: “Venham ver”. O povo vem e diz: “Nós mesmos ouvimos”. Para seguir, a porta de pedra pergunta o que ele ofereceu a ela; dá para **consultar o trecho do Evangelho** ali mesmo. |
| | Betesda (João 5) | Jesus cura o homem que esperava havia 38 anos. Quando perguntam quem o curou, ele **não sabe**. O Samuel vai atrás dele e, enquanto isso, a luz negra revela a marca da maca no chão. O Samuel volta correndo do templo: lá o homem encontrou Jesus de novo e descobriu quem o curou (João 5:14–15). |
| **3. A pergunta que ficou** | O pátio | A equipe toda espera. O jogador junta as três evidências, a pergunta **QUEM É ELE?** aparece na muralha e o Samuel mostra por que o autor dos relatos escreveu (João 20:30–31). Sem cobrar resposta: “Essa resposta ninguém pode dar por você.” |

Depois vem a tela final com a pergunta “Quem é Jesus, afinal?” e o convite.

### Por que Jesus aparece aos poucos

A tela inicial já diz que o jogo é **baseado nos relatos do Evangelho de João** (ninguém é enganado), mas dentro da história o nome é uma descoberta: em Caná, Jesus aparece como “Convidado” até a mãe dele dizer quem é (uns 2 minutos de jogo). A pergunta do título nasce daí e se repete nos três relatos — o mestre-sala não sabia de onde veio o vinho, a samaritana pergunta “será que ele é o Cristo?”, o homem curado não sabia quem o curou.

Para revelar o nome desde o começo, basta apagar `nome: CONVIDADO` das falas de Jesus em `src/dialogos.js`.

## Trocar o convite

Tudo fica em `src/config.js`:

```js
export const CONVITE = {
  evento: "CULTO ADOLES",
  data: "Sexta-feira, 30 de outubro",
  horario: "19h30",     // vazio ("") = não aparece
  local: "",            // ex.: "Rua ..., nº ..." (vazio = não aparece)
  detalhe: "Aberto a todos os adolescentes",
  link: "",             // ex.: link do Google Maps → aparece um botão
  textoLink: "Ver como chegar",
};
```

O botão **Contar para quem me convidou** abre o compartilhamento do celular (ou o WhatsApp) com uma mensagem curta e o link do jogo, para puxar a conversa com quem convidou.

## Como usar com os adolescentes da igreja

1. O adolescente manda o link com uma mensagem pessoal, por exemplo: *“A galera do Adoles fez esse jogo de investigação. Quero ver se você resolve o caso! Depois me conta o que achou.”*
2. O amigo joga sem cadastro e sem precisar dizer no que acredita.
3. Quando ele avisar que terminou, conversem sobre o caso: qual pista foi mais difícil, qual relato chamou mais atenção.
4. O convite para sexta vem de quem convidou, pessoalmente. O jogo só prepara o terreno.
5. Na chegada, alguém recebe o convidado e apresenta a galera — os rostos da equipe do jogo (Débora, Kenedy, Bea, MJ, Thama e Samuel) são de gente real do grupo.

## Como jogar

| Ação | Computador | Celular |
|---|---|---|
| Andar | WASD ou setas | joystick (toque no lado esquerdo) |
| Interagir / avançar diálogo | E, Espaço ou Enter | botão grande à direita / tocar na caixa |
| Lanterna | F | botão da lanterna |
| Luz negra (depois de recebida) | Q | botão roxo |
| Diário | J | botão do diário |
| Pausa | Esc ou P | botão de pausa |

No celular, o jogo funciona deitado. No Android o primeiro toque já coloca em tela cheia; no iPhone aparece o aviso para girar.

## Publicar

Em *Settings → Pages* do repositório, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`. Em um ou dois minutos o jogo fica no endereço acima.

## Rodar no computador

O jogo usa módulos JavaScript, então precisa de um servidor simples (abrir o `index.html` direto não funciona):

```bash
python3 -m http.server 8770
```

Abra `http://127.0.0.1:8770/`. Para testar uma fase: `?debug&sala=poco` (ou `betesda`, `patio`).

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Todos os textos e diálogos | `src/dialogos.js` |
| Fotos dos retratos da equipe | `assets/retratos/` (troque o arquivo mantendo o nome; recorte quadrado no rosto) |
| Aparência dos personagens | `src/dados/elenco.js` |
| Convite e mensagem de compartilhar | `src/config.js` |
| Roteiro de cada fase | `src/salas/cana.js`, `poco.js`, `betesda.js`, `patio.js` |
| Tela final | `src/final.js` e `index.html` |
| Visual | `css/estilo.css` (base) e `css/quem-e-ele.css` (telas próprias) |
| Imagem da prévia no WhatsApp | `capa.jpg` |
| Motor, arte, músicas e efeitos (gerados em código) | `src/motor/`, `src/arte/`, `src/audio/` |

O motor, a arte e os sons vieram de O Mistério dos Sinais e foram copiados para cá: este repositório não depende do outro.

Os acontecimentos seguem o Evangelho de João, com a referência de cada passagem. A equipe de investigação, as pistas e o caso são ficção do jogo.
