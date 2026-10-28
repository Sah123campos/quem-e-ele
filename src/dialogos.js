// Todos os textos de "O Maior Amor".
// Feito para quem nunca abriu uma Bíblia. As falas com "ref" são paráfrases
// fiéis do Evangelho de João. A equipe e a conversa no pátio são ficção do jogo.

export const DIALOGOS = {
  // ================= FASE 1 — A PERGUNTA (o pátio) =================
  patio: {
    intro: [
      { quem: "debora", texto: "Oi! Eu sou a Débora. Que bom que você veio!" },
      { quem: "debora", texto: "Hoje a gente tem uma pergunta só: qual é a maior prova de amor que existe?" },
      { quem: "debora", texto: "Pergunta para a galera. Cada um tem uma resposta diferente." },
    ],
    debora: [{ quem: "debora", texto: "Vai lá, pergunta para o pessoal! Depois volta aqui e me conta." }],
    kenedy: [
      { quem: "kenedy", texto: "E aí! Eu sou o Kenedy. Maior prova de amor? Fácil." },
      { quem: "kenedy", texto: "Mãe que acorda de madrugada quando você está doente. Sem reclamar. Todo dia, se precisar." },
    ],
    bea: [
      { quem: "bea", texto: "Oi, eu sou a Bea! Para mim é amigo que fica do seu lado quando todo mundo vai embora." },
      { quem: "bea", texto: "Na hora boa, todo mundo aparece. Na hora ruim, você descobre quem te ama." },
    ],
    mj: [
      { quem: "mj", texto: "Eu sou o MJ. Maior prova de amor é dar o último pedaço de pizza." },
      { quem: "mj", texto: "Tô brincando... mais ou menos. É abrir mão de uma coisa sua para o outro ficar bem." },
    ],
    thama: [
      { quem: "thama", texto: "Oi, eu sou a Thama. Acho que é perdoar quem te machucou." },
      { quem: "thama", texto: "Amar quem é fácil de amar todo mundo consegue. O difícil é o resto." },
    ],
    samuel: [
      { quem: "samuel", texto: "E aí, eu sou o Samuel! Para mim é quando alguém paga um preço que era seu." },
      { quem: "samuel", texto: "Tipo assumir a culpa no seu lugar. Quem faria isso?" },
    ],
    jaFalou: [{ quem: "jogador", texto: "Já ouvi a resposta. Vou perguntar para mais alguém." }],
    deboraFinal: [
      { quem: "jogador", texto: "Mãe, amigo fiel, abrir mão, perdoar, pagar no lugar do outro... Cada um falou uma coisa." },
      { quem: "debora", texto: "Todas são boas respostas. E sabe o que é curioso?" },
      { quem: "debora", texto: "Uns dois mil anos atrás, um homem respondeu essa mesma pergunta numa frase só. E depois fez exatamente o que disse." },
      { quem: "debora", texto: "Vem ver. Imagina uma noite como esta, em Jerusalém..." },
    ],
  },

  // ================= FINAL — a equipe reunida =================
  reuniao: {
    intro: [
      { quem: "debora", texto: "Ei, você voltou! A galera se espalhou pelo pátio e escondeu mensagens no chão." },
      { quem: "debora", texto: "Cada um escreveu o que acha que é um amigo de verdade. Mas só dá para ver com luz negra. Toma, usa essa!" },
      { quem: "debora", texto: "Acha as cinco mensagens e depois a gente se reúne aqui." },
    ],
    debora: [{ quem: "debora", texto: "As mensagens estão no chão, perto de cada um. Liga a luz negra e procura!" }],
    escondida: [{ quem: "jogador", texto: "Deve ter alguma coisa escrita no chão aqui perto. Vou usar a luz negra." }],
    kenedy: [
      { quem: "kenedy", texto: "Achou a minha! “APARECE.”" },
      { quem: "kenedy", texto: "Amigo de verdade não some quando a coisa aperta. Ele aparece." },
    ],
    bea: [
      { quem: "bea", texto: "Essa é minha! “FICA.”" },
      { quem: "bea", texto: "Amigo de verdade fica do seu lado mesmo quando você erra." },
    ],
    thama: [
      { quem: "thama", texto: "Você achou! “ACEITA.”" },
      { quem: "thama", texto: "Amigo de verdade te aceita do jeito que você é. Sem fingir." },
    ],
    mj: [
      { quem: "mj", texto: "“DIVIDE.” Amigo de verdade te dá o último pedaço de pizza." },
      { quem: "mj", texto: "Tô brincando... mais ou menos. É abrir mão de uma coisa sua para o outro ficar bem." },
    ],
    samuel: [
      { quem: "samuel", texto: "Achou a minha! “PAGA.”" },
      { quem: "samuel", texto: "Às vezes, amigo de verdade paga um preço que era seu. Tipo assumir a culpa no seu lugar." },
      { quem: "samuel", texto: "Pouca gente faria isso. Mas tem alguém que fez." },
    ],
    depois: [{ quem: "jogador", texto: "Essa eu já achei." }],
    chamar: [{ quem: "debora", texto: "Achou todas! Galera, vem todo mundo pra cá!" }],
    final: [
      { quem: "jogador", texto: "Aparece, fica, aceita, divide, paga o preço..." },
      { quem: "debora", texto: "A gente conhece um amigo que faz tudo isso. Um amigo que deu tudo pela gente." },
      { quem: "debora", texto: "Quer descobrir quem é? Vem com a gente!" },
    ],
  },

  // ================= FASE 2 — UMA NOITE EM JERUSALÉM (João 13–15) =================
  ceia: {
    intro: [
      { quem: "narrador", nome: "Jerusalém", texto: "Dois mil anos atrás, Jesus jantava com os amigos. Era a última noite antes de ele ser preso." },
    ],
    pedro: [
      { quem: "pedro", texto: "Eu sou Pedro. Conheço o Mestre há três anos. Larguei tudo para seguir ele." },
      { quem: "pedro", ref: "João 13:37", texto: "Ele disse que vai para um lugar aonde a gente não pode ir. Mas eu daria a minha vida por ele!" },
    ],
    pedroDepois: [{ quem: "pedro", texto: "Por que ele está falando como quem se despede?" }],
    joao: [
      { quem: "joao", texto: "Eu sou João. Hoje aconteceu uma coisa que eu não esqueço." },
      { quem: "joao", ref: "João 13:4–5", texto: "Antes do jantar, ele pegou uma bacia e lavou os pés de cada um de nós. Trabalho de empregado. Ele, o Mestre!" },
    ],
    joaoDepois: [{ quem: "joao", texto: "Ele disse que era um exemplo: amar servindo." }],
    tome: [
      { quem: "tome", texto: "Tomé, prazer. Eu sou o que faz as perguntas que ninguém quer fazer." },
      { quem: "tome", ref: "João 14:5–6", texto: "Eu perguntei: “Que caminho?” E ele respondeu: “Eu sou o caminho, a verdade e a vida.”" },
    ],
    tomeDepois: [{ quem: "tome", texto: "Ainda estou pensando nessa resposta." }],
    filipe: [
      { quem: "filipe", texto: "Eu sou Filipe. Fala com ele. Ele sempre tem tempo para quem chega." },
    ],
    filipeDepois: [{ quem: "filipe", texto: "Vai lá, ele está te esperando." }],
    jesusAntes: [{ quem: "jesus", texto: "Chegue mais perto. Tem um lugar para você nesta mesa." }],
    fala: [
      { quem: "jesus", ref: "João 15:9", texto: "Assim como o Pai me amou, eu também amei vocês. Fiquem no meu amor." },
      { quem: "jesus", ref: "João 15:12", texto: "O meu mandamento é este: amem uns aos outros como eu amei vocês." },
    ],
    pergunta: [{ quem: "jesus", texto: "Antes, me diz uma coisa: o que faz um amigo de verdade?" }],
    escuro: [{ quem: "jesus", texto: "Está escuro demais para conversar. Acende a lanterna: tem um recado ali na caixa, perto de você." }],
    recado: [
      { quem: "narrador", nome: "Recado", texto: "Para iluminar o jantar, acenda as tochas nesta ordem:" },
      { quem: "narrador", nome: "Recado", texto: "1º — perto de onde se guarda a água.\n2º — perto de algo que está crescendo.\n3º — perto da farinha do pão." },
    ],
    errou: [{ quem: "jogador", texto: "Opa... as tochas se apagaram. Acho que errei a ordem. Melhor ler o recado de novo." }],
    acesa: [{ quem: "jogador", texto: "Essa acendeu. Próxima!" }],
    iluminou: [{ quem: "jesus", texto: "Agora sim! Dá para ver todo mundo. Vem, tem um lugar para você nesta mesa." }],
    versiculo: [{ quem: "jesus", ref: "João 15:13", texto: "Ninguém tem maior amor do que aquele que dá a sua vida pelos seus amigos." }],
    amigos: [
      { quem: "jesus", ref: "João 15:15", texto: "Eu chamo vocês de amigos." },
    ],
    depois: [
      { quem: "narrador", nome: "O que aconteceu", texto: "No dia seguinte, ele morreu numa cruz. Deu a vida pelos amigos, como tinha dito." },
      { quem: "narrador", nome: "O que aconteceu", texto: "Três dias depois, o túmulo estava vazio. Ele está vivo." },
    ],
  },
};
