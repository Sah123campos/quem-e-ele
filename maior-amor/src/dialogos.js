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

  // ================= FASE 2 — UMA NOITE EM JERUSALÉM (João 13–15) =================
  ceia: {
    intro: [
      { quem: "narrador", nome: "Jerusalém", texto: "Jerusalém, quase dois mil anos atrás. Jesus está jantando com os amigos mais próximos dele." },
      { quem: "narrador", nome: "Jerusalém", texto: "É a última noite antes de ele ser preso. E ele sabe disso." },
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
    versiculo: [{ quem: "jesus", ref: "João 15:13", texto: "Ninguém tem maior amor do que aquele que dá a sua vida pelos seus amigos." }],
    amigos: [
      { quem: "jesus", ref: "João 15:15", texto: "Eu não chamo mais vocês de servos. Eu chamo vocês de amigos." },
      { quem: "pedro", texto: "Dar a vida? Mestre... do que o senhor está falando?" },
    ],
    depois: [
      { quem: "narrador", nome: "O que aconteceu", ref: "João 18–19", texto: "Naquela mesma noite, Jesus foi preso. No dia seguinte, morreu numa cruz." },
      { quem: "narrador", nome: "O que aconteceu", texto: "Ele podia ter fugido. Não fugiu. Fez exatamente o que tinha dito: deu a vida pelos amigos." },
      { quem: "narrador", nome: "O que aconteceu", ref: "João 20", texto: "Três dias depois, os amigos dele encontraram o túmulo vazio. Jesus estava vivo." },
    ],
  },
};
