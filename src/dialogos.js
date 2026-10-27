// Todos os textos de "Quem é Ele?".
//
// Feito para quem nunca abriu uma Bíblia: o contexto é explicado em linguagem
// simples e ninguém precisa saber nada antes para resolver o caso.
// As falas com referência ("ref") são paráfrases fiéis do Evangelho de João.
// A equipe de investigação, as pistas e o caso são ficção do jogo.
//
// "narrador" mostra o texto como leitura (sem retrato). Use "nome" para trocar
// o rótulo da fala — por exemplo, Jesus aparece como "Convidado" até o jogador
// descobrir o nome dele.

const CASO = "O caso";
const CONVIDADO = "Convidado";

export const DIALOGOS = {
  // ================= FASE 1 — ALGO NÃO SE ENCAIXA (Caná) =================
  cana: {
    intro: [
      { quem: "narrador", nome: CASO, texto: "Caná, uma vila da Galileia, quase dois mil anos atrás. Uma festa de casamento que, como era costume, durava vários dias." },
      { quem: "narrador", nome: CASO, texto: "Naquela época, deixar faltar vinho num casamento era uma vergonha enorme para os noivos. E nesta festa... o vinho acabou." },
    ],
    debora: [
      { quem: "debora", texto: "Oi! Eu sou a Débora. Que bom que você topou investigar com a gente!" },
      { quem: "debora", texto: "Olha que estranho: o vinho da festa tinha acabado. Agora todo mundo está bebendo um vinho novo, melhor que o primeiro." },
      { quem: "debora", texto: "E ninguém sabe de onde ele veio. Conversa com o pessoal e procura pistas. Se algum canto estiver escuro, usa a lanterna." },
    ],
    deboraDica: [{ quem: "debora", texto: "Quem trabalha numa festa sempre sabe de tudo. Já foi dar uma olhada na cozinha?" }],
    deboraEspera: [{ quem: "debora", texto: "Um convidado mandou encher as talhas de água? Quem é ele? Alguém aqui deve saber o nome dele." }],
    deboraChama: [{ quem: "debora", texto: "Ei! Achei mais relatos sobre esse Jesus. Vem, estou no portão norte!" }],
    deboraFim: [{ quem: "debora", texto: "Esse foi só o primeiro relato. Vamos ver o próximo?" }],

    // Testemunhas
    mestre: [
      { quem: "mestre", texto: "Você provou esse vinho? É o melhor da festa inteira!" },
      { quem: "mestre", ref: "João 2:10", texto: "Todo mundo serve primeiro o melhor vinho e, depois, o mais fraco. Mas este noivo guardou o melhor para o fim!" },
      { quem: "mestre", texto: "Só tem um detalhe... eu cuido desta festa e não faço ideia de onde esse vinho saiu." },
    ],
    mestreDepois: [{ quem: "mestre", texto: "Já disse: não sei de onde veio. Mas que vinho!" }],
    mestreFim: [{ quem: "mestre", texto: "Os serventes me contaram tudo. Água! Era água! Afinal... quem é esse homem?" }],
    noivo: [
      { quem: "noivo", texto: "Eu? Guardar vinho? O nosso tinha acabado! A gente já estava morrendo de vergonha." },
      { quem: "noivo", texto: "Não sei de onde veio esse vinho novo. Só sei que ele salvou a minha festa." },
    ],
    noivoDepois: [{ quem: "noivo", texto: "Se você descobrir quem foi, me conta. Eu quero agradecer!" }],
    noivoFim: [{ quem: "noivo", texto: "Foi aquele convidado? Preciso agradecer a ele!" }],
    noiva: [{ quem: "noiva", texto: "Todo mundo está elogiando o vinho... Que alívio! Mas de onde ele veio?" }],
    noivaFim: [{ quem: "noiva", texto: "Seis talhas cheias! Tem vinho para a semana inteira." }],
    convidada2: [
      { quem: "convidada2", texto: "Eu vi uma coisa esquisita: os empregados carregando água para a cozinha. Muita água. Indo e voltando." },
      { quem: "convidada2", texto: "Para que tanta água no meio de uma festa?" },
    ],
    convidada2Depois: [{ quem: "convidada2", texto: "Primeiro água, depois vinho. Isso não faz sentido nenhum." }],
    convidado1: [{ quem: "convidado1", texto: "Sete dias de festa! E ainda estamos no começo." }],
    convidada1: [{ quem: "convidada1", texto: "Eu juro que a minha taça estava vazia agora há pouco." }],
    convidado2: [{ quem: "convidado2", texto: "Na Galileia, casamento é festa para a cidade inteira!" }],
    convidado2Fim: [{ quem: "convidado2", texto: "Jesus? O filho de José, lá de Nazaré? Eu conheço a família." }],
    convidado3: [{ quem: "convidado3", texto: "Vinho novo, e melhor que o primeiro? Alguém aqui está escondendo alguma coisa." }],
    convidado3Fim: [
      { quem: "convidado3", ref: "João 1:46", texto: "Jesus de Nazaré? E de Nazaré pode sair alguma coisa boa?" },
      { quem: "jogador", texto: "Sei lá. Vem e vê." },
    ],
    convidada3: [{ quem: "convidada3", texto: "Repara nos empregados: estão cochichando desde que o vinho voltou." }],
    convidada3Fim: [{ quem: "convidada3", texto: "Dizem que foi aquele convidado de manto vermelho. Quem será ele?" }],
    maria: [{ quem: "maria", texto: "Que alegria ver os noivos tão felizes." }],
    mariaNome: [
      { quem: "maria", texto: "Você quer saber quem ele é? É o meu filho." },
      { quem: "maria", texto: "O nome dele é Jesus. Nós somos de Nazaré." },
    ],
    mariaFim: [{ quem: "maria", texto: "Guarde no coração o que você viu hoje." }],
    jesusAntes: [{ quem: "jesus", nome: CONVIDADO, texto: "O que você está procurando?" }],
    jesusFim: [{ quem: "jesus", texto: "Venha e veja." }],

    // Equipe
    kenedy: [
      { quem: "kenedy", texto: "E aí! Eu sou o Kenedy. Estou ajudando a Débora nessa investigação." },
      { quem: "kenedy", texto: "Olha só: essa lanterna tem luz negra. Ela mostra coisas que ninguém vê. Tipo rastro de água no chão." },
    ],
    kenedyDepois: [{ quem: "kenedy", texto: "Água deixa rastro. Testa a luz negra aqui perto da cisterna e vê aonde ele leva." }],
    kenedyFim: [{ quem: "kenedy", texto: "Água em vinho... Eu estou até agora tentando entender." }],

    // Lugares e objetos
    talhas: [
      { quem: "jogador", texto: "Seis talhas enormes de pedra, cheias até a borda. Vinho!" },
      { quem: "narrador", ref: "João 2:6", texto: "Essas talhas de pedra guardavam água para os rituais de purificação dos judeus: lavar as mãos e as louças. Em cada uma cabiam de oitenta a cento e vinte litros." },
      { quem: "jogador", texto: "Talhas feitas para água... cheias de vinho. Isso não se encaixa." },
    ],
    talhasDepois: [{ quem: "jogador", texto: "Vinho até a borda, em talhas feitas para guardar água." }],
    cisterna: [{ quem: "jogador", texto: "A cisterna está quase vazia. Alguém tirou muita água daqui, e foi agora há pouco." }],
    cisternaDepois: [{ quem: "jogador", texto: "Quase vazia. Seis talhas de cem litros... é muita água." }],
    rastro: [{ quem: "jogador", texto: "Pegadas molhadas! Da cisterna até as talhas, e de volta. Foram muitas viagens." }],
    barris: [{ quem: "jogador", texto: "Barris vazios. Todos eles. O vinho da festa acabou mesmo." }],
    portaoAntes: [{ quem: "jogador", texto: "O portão leva para fora da festa. Primeiro quero descobrir de onde veio esse vinho." }],

    // O servente
    servoNega: [
      { quem: "servo", texto: "Vinho? Que vinho? Eu só trabalho aqui. Não vi nada." },
      { quem: "jogador", texto: "Ele está nervoso. Preciso juntar mais pistas antes de perguntar de novo." },
    ],
    servoTalhas: [{ quem: "servo", texto: "Você já olhou dentro das talhas de pedra? Olha lá primeiro." }],
    servoConta: [
      { quem: "servo", texto: "Você viu as talhas, né? Tá bom, tá bom. Eu conto." },
      { quem: "servo", texto: "Mas você não vai acreditar." },
    ],
    servoDepois: [
      { quem: "servo", texto: "Fui eu mesmo que enchi aquelas talhas. Com água! E o que chegou no mestre-sala era vinho." },
      { quem: "servo", texto: "Quem mandou foi aquele convidado de manto vermelho. Eu não sei o nome dele." },
      { quem: "servo", texto: "Pergunta para a mulher que estava com ele. Acho que é a mãe dele." },
    ],
    servoFim: [{ quem: "servo", texto: "Eu sei de onde veio aquele vinho. Eu vi com estes olhos." }],
    servo2Antes: [{ quem: "servo2", texto: "Psiu... eu não posso falar nada. Fala com o meu chefe ali." }],
    servo2Fim: [{ quem: "servo2", texto: "Fui eu que tirei da talha e levei a taça para o mestre-sala. Saiu água... e chegou vinho!" }],

    // A lembrança do servente (João 2:3–9)
    lembrancaIntro: [{ quem: "narrador", nome: "Lembrança do servente", texto: "Mais cedo, o vinho tinha acabado. A mãe daquele convidado percebeu antes de todo mundo." }],
    lembrancaPedido: [
      { quem: "maria", ref: "João 2:3", texto: "Eles não têm mais vinho." },
      { quem: "jesus", nome: CONVIDADO, ref: "João 2:4", texto: "Mulher, por que me envolver nisso? A minha hora ainda não chegou." },
    ],
    lembrancaOrdem: [
      { quem: "maria", ref: "João 2:5", texto: "Façam tudo o que ele mandar." },
      { quem: "jesus", nome: CONVIDADO, ref: "João 2:7", texto: "Encham de água essas talhas." },
    ],
    lembrancaCheias: [{ quem: "narrador", ref: "João 2:7", texto: "E eles encheram as talhas até a borda." }],
    lembrancaTirem: [{ quem: "jesus", nome: CONVIDADO, ref: "João 2:8", texto: "Agora tirem um pouco e levem ao mestre-sala." }],
    lembrancaMestre: [
      { quem: "narrador", ref: "João 2:9", texto: "O mestre-sala provou a água que tinha virado vinho. Ele não sabia de onde aquilo tinha vindo. Mas os serventes que tiraram a água sabiam." },
    ],

    // O nome
    sinal: [
      { quem: "narrador", ref: "João 2:11", texto: "Este foi o primeiro dos sinais de Jesus, em Caná da Galileia. Assim ele revelou a sua glória, e os seus discípulos creram nele." },
      { quem: "jogador", texto: "Sinal? Placa de trânsito é um sinal: ela aponta para outra coisa." },
      { quem: "jogador", texto: "Se transformar água em vinho foi um sinal... ele aponta para quê? Ou para quem?" },
    ],
  },

  // ================= FASE 2 — OS RELATOS (Poço de Jacó, João 4) =================
  poco: {
    intro: [
      { quem: "narrador", nome: CASO, texto: "Dias depois, Jesus atravessou a região de Samaria. Judeus e samaritanos eram rivais antigos: evitavam até conversar." },
      { quem: "narrador", ref: "João 4:6", texto: "Cansado da viagem, Jesus sentou-se junto ao poço de Jacó. Era por volta do meio-dia, a hora mais quente." },
    ],
    bea: [
      { quem: "bea", texto: "Oi! Eu sou a Bea. Olha quem está sentado ali no poço: o Jesus de Caná!" },
      { quem: "bea", texto: "Chega mais perto para ouvir. Mas sem atrapalhar, tá?" },
    ],
    conversa: [
      { quem: "narrador", ref: "João 4:7", texto: "Uma mulher samaritana veio tirar água do poço." },
      { quem: "jesus", ref: "João 4:7", texto: "Dê-me um pouco de água." },
      { quem: "samaritana", ref: "João 4:9", texto: "Como o senhor, sendo judeu, pede água a mim, uma mulher samaritana?" },
      { quem: "jesus", ref: "João 4:10", texto: "Se você soubesse quem está lhe pedindo água, você é que pediria a ele, e ele lhe daria água viva." },
      { quem: "samaritana", ref: "João 4:11", texto: "O senhor nem tem balde, e o poço é fundo. De onde vai tirar essa água viva?" },
      { quem: "jesus", ref: "João 4:13–14", texto: "Quem beber desta água terá sede outra vez. Mas quem beber da água que eu lhe der nunca mais terá sede." },
      { quem: "samaritana", ref: "João 4:15", texto: "Senhor, dê-me dessa água!" },
      { quem: "narrador", ref: "João 4:16–19", texto: "Então Jesus falou da vida dela como quem a conhecia por inteiro. E continuou ali, conversando com ela." },
      { quem: "samaritana", ref: "João 4:25", texto: "Eu sei que o Messias vai chegar. Quando ele vier, vai nos explicar tudo." },
      { quem: "jesus", ref: "João 4:26", texto: "Sou eu, que estou falando com você." },
    ],
    saida: [
      { quem: "narrador", ref: "João 4:28–29", texto: "A mulher deixou o cântaro, voltou correndo à cidade e dizia a todos: “Venham ver um homem que me disse tudo o que eu fiz! Será que ele não é o Cristo?”" },
    ],
    beaDepois: [
      { quem: "bea", texto: "Você ouviu? Ela perguntou se ele é o Cristo. E ele tinha acabado de dizer: “Sou eu”." },
      { quem: "bea", texto: "Cristo, ou Messias, era o salvador que o povo esperava havia séculos. E ele disse isso com todas as letras." },
      { quem: "bea", texto: "Ah, e ela saiu tão rápido que esqueceu o cântaro." },
    ],
    beaCantaro: [{ quem: "bea", texto: "Dá uma olhada no cântaro que ela deixou. Ela veio buscar água, lembra?" }],
    beaFim: [{ quem: "bea", texto: "O MJ achou uma passagem lá na gruta, em cima. Leva a lanterna, que lá é escuro!" }],
    cantaro: [
      { quem: "jogador", texto: "Ela veio buscar água e voltou sem ela." },
      { quem: "jogador", texto: "Veio sozinha, no sol do meio-dia... e agora saiu correndo para chamar a cidade inteira." },
    ],
    cantaroDepois: [{ quem: "jogador", texto: "O cântaro da mulher, esquecido no chão." }],
    cidade: [
      { quem: "narrador", ref: "João 4:30", texto: "Pouco depois, o povo saiu da cidade e foi ao encontro de Jesus." },
      { quem: "convidado3", nome: "Samaritano", texto: "Foi esse aí? O homem que contou tudo da sua vida?" },
      { quem: "samaritana", texto: "Foi ele! Venham ver vocês mesmos." },
      { quem: "narrador", ref: "João 4:40–41", texto: "Eles pediram que Jesus ficasse com eles, e ele ficou ali dois dias. Muitos outros creram por causa do que ele dizia." },
      { quem: "convidada3", nome: "Samaritana", ref: "João 4:42", texto: "Agora não é só por causa do que você contou. Nós mesmos ouvimos." },
      { quem: "jogador", texto: "Primeiro alguém conta. Depois a pessoa vai lá e vê com os próprios olhos." },
    ],
    samaritanoDepois: [{ quem: "convidado3", nome: "Samaritano", texto: "Ela disse “venham ver”. Então a gente veio ver." }],
    samaritanaDepois: [{ quem: "convidada3", nome: "Samaritana", texto: "Um judeu conversando com samaritanos... Nunca pensei que fosse ver isso." }],
    mulherDepois: [{ quem: "samaritana", texto: "Ele sabia tudo da minha vida. Tudo. E não foi embora." }],
    jesusDepois: [{ quem: "jesus", ref: "João 4:14", texto: "Quem beber da água que eu der nunca mais terá sede." }],
    pocoExame: [{ quem: "jogador", texto: "O poço é muito fundo. Lá embaixo, a água brilha." }],
    mjAntes: [{ quem: "mj", texto: "Ei! Eu sou o MJ. Achei uma porta aqui na gruta... mas antes vê o que está acontecendo lá no poço!" }],
    mj: [
      { quem: "mj", texto: "E aí! Eu sou o MJ. Essa porta de pedra dá para Jerusalém." },
      { quem: "mj", texto: "Mas olha: tem uma pergunta gravada nela. Parece que só passa quem prestou atenção na conversa do poço." },
    ],
    mjDepois: [{ quem: "mj", texto: "A pergunta está na porta. Se esquecer, dá para consultar o relato." }],
    portaFechada: [{ quem: "jogador", texto: "Uma porta de pedra com alguma coisa gravada. Primeiro quero ver o que está acontecendo lá no poço." }],
    portaAberta: [{ quem: "mj", texto: "Abriu! Do outro lado... parece Jerusalém, já de noite." }],
  },

  // ================= FASE 2 — OS RELATOS (Tanque de Betesda, João 5) =================
  betesda: {
    intro: [
      { quem: "narrador", ref: "João 5:2–3", texto: "Em Jerusalém, perto da Porta das Ovelhas, havia um tanque chamado Betesda, cercado por cinco pavilhões. Ali ficavam deitados muitos doentes: cegos, mancos e paralíticos." },
    ],
    thama: [
      { quem: "thama", texto: "Oi, eu sou a Thama. Que silêncio, né? Só se ouve a água." },
      { quem: "thama", texto: "Tá vendo aquele homem deitado perto do tanque? Dizem que ele está doente há trinta e oito anos." },
    ],
    thamaAntes: [{ quem: "thama", texto: "Trinta e oito anos... Vai falar com ele." }],
    enfermoAntes: [{ quem: "enfermo", texto: "Você também espera a água se agitar? Eu espero há tanto tempo... e não tenho ninguém para me ajudar a descer." }],
    cura: [
      { quem: "narrador", ref: "João 5:5", texto: "Ali estava um homem que era doente havia trinta e oito anos." },
      { quem: "jesus", ref: "João 5:6", texto: "Você quer ser curado?" },
      { quem: "enfermo", ref: "João 5:7", texto: "Senhor, não tenho ninguém que me coloque no tanque quando a água se agita. Enquanto tento chegar, outro desce antes de mim." },
      { quem: "jesus", ref: "João 5:8", texto: "Levante-se, pegue a sua maca e ande." },
    ],
    curado: [
      { quem: "narrador", ref: "João 5:9", texto: "Na mesma hora o homem ficou curado. Pegou a sua maca e começou a andar." },
      { quem: "enfermoCurado", texto: "Eu estou de pé! Trinta e oito anos... e agora estou andando!" },
    ],
    pergunta: [
      { quem: "doente2", nome: "Um homem", ref: "João 5:12", texto: "Ei! Quem é esse homem que mandou você pegar a maca e andar?" },
      { quem: "enfermoCurado", texto: "Eu... não sei! Ele estava aqui agora mesmo. Nem perguntei o nome dele." },
      { quem: "narrador", ref: "João 5:13", texto: "O homem que tinha sido curado não sabia quem era, pois Jesus havia se retirado no meio da multidão." },
    ],
    thamaDepois: [
      { quem: "thama", texto: "Ele foi curado... e nem sabia por quem." },
      { quem: "jogador", texto: "A mesma pergunta de novo: quem é ele?" },
      { quem: "thama", texto: "Olha o lugar onde ele ficou deitado. Trinta e oito anos no mesmo canto deve ter deixado marca. Passa a luz negra ali!" },
    ],
    thamaMaca: [{ quem: "thama", texto: "Passa a luz negra no chão, onde ele ficou deitado." }],
    achouMaca: [
      { quem: "jogador", texto: "A marca da maca, gravada na pedra. Trinta e oito anos no mesmo lugar." },
      { quem: "jogador", texto: "E agora o lugar está vazio." },
    ],
    thamaFim: [{ quem: "thama", texto: "A equipe está esperando a gente no pátio. Vamos fechar esse caso?" }],
    samuel: [
      { quem: "samuel", texto: "E aí, eu sou o Samuel! Cheguei antes para ver o lugar." },
      { quem: "samuel", texto: "Um monte de gente esperando... e ninguém ajuda ninguém." },
    ],
    samuelDepois: [{ quem: "samuel", texto: "Viu só? Curado, e nem sabe por quem." }],
    samuelFim: [{ quem: "samuel", texto: "Bora para o pátio? É só sair pela Porta das Ovelhas, lá embaixo." }],
    doente: [{ quem: "doente1", texto: "Estamos todos esperando... há muito tempo." }],
    doente2Antes: [{ quem: "doente2", texto: "Dizem que de tempos em tempos a água se agita... e todo mundo tenta descer ao mesmo tempo." }],
    doente2: [{ quem: "doente2", texto: "Você viu? Aquele homem se levantou! Quem é que o curou?" }],
    portaAntes: [{ quem: "jogador", texto: "A Porta das Ovelhas. Ainda não terminei por aqui." }],
  },

  // ================= FASE 3 — A PERGUNTA QUE FICOU (o pátio) =================
  patio: {
    intro: [
      { quem: "debora", texto: "Você chegou! A equipe toda está aqui." },
      { quem: "debora", texto: "Três relatos, três evidências. Vem fechar o caso com a gente, ali no centro do pátio." },
    ],
    debora: [{ quem: "debora", texto: "Eu também já tive muitas perguntas sobre Jesus. Algumas eu ainda tenho. Tudo bem ter perguntas." }],
    kenedy: [{ quem: "kenedy", texto: "O mais doido para mim: o mestre-sala não sabia de onde veio o vinho. Quem viu de perto foram os serventes." }],
    bea: [{ quem: "bea", texto: "Eu fico pensando na mulher do poço. Ele sabia tudo da vida dela... e continuou ali, conversando com ela." }],
    mj: [{ quem: "mj", texto: "Repara: ninguém foi obrigado a acreditar. A mulher só disse “venham ver”. E o pessoal foi ver." }],
    thama: [{ quem: "thama", texto: "Trinta e oito anos sem ninguém para ajudar. E ele parou justamente para aquele homem." }],
    samuel: [{ quem: "samuel", texto: "No fim, a pergunta é sempre a mesma: quem é ele? Isso não dá para responder só jogando." }],
    fechar: [
      { quem: "jogador", texto: "Caná: água que virou vinho. O mestre-sala não sabia de onde vinha, mas os serventes sabiam." },
      { quem: "jogador", texto: "Samaria: ele sabia tudo da vida de uma mulher, e mesmo assim ficou para conversar. E disse que era o Messias." },
      { quem: "jogador", texto: "Jerusalém: um homem esperou trinta e oito anos e se levantou, sem saber quem o tinha curado." },
      { quem: "jogador", texto: "Eu descobri o nome dele. Descobri o que ele fez. Mas ainda falta uma resposta." },
    ],
    autor: [
      { quem: "narrador", nome: CASO, texto: "Quem escreveu esses relatos contou, no fim do livro, por que escreveu:" },
      { quem: "narrador", ref: "João 20:30–31", texto: "Jesus fez muitos outros sinais que não estão escritos neste livro. Estes foram escritos para que vocês creiam que Jesus é o Cristo, o Filho de Deus, e, crendo, tenham vida em seu nome." },
    ],
    final: [
      { quem: "debora", texto: "Essa resposta ninguém pode dar por você." },
      { quem: "debora", texto: "Mas dá para continuar investigando. E com a gente." },
    ],
    pedestalAntes: [{ quem: "jogador", texto: "As três evidências do caso. Hora de juntar tudo." }],
  },
};

// Pistas do diário (texto curto, com o lugar).
export const PISTAS = {
  mestre: "O mestre-sala diz que o vinho novo é o melhor da festa, mas não sabe de onde ele veio.",
  noivo: "O noivo jura que o vinho dele tinha acabado. Não foi ele.",
  agua: "Uma convidada viu os empregados carregando muita água para a cozinha.",
  talhas: "Seis talhas de pedra, feitas para guardar água, estão cheias de vinho até a borda.",
  cisterna: "A cisterna da cozinha está quase vazia: alguém tirou muita água há pouco.",
  rastro: "Com a luz negra: pegadas molhadas indo e voltando da cisterna até as talhas.",
  barris: "Na adega, os barris de vinho estão todos vazios.",
  servente: "O servente contou: um convidado mandou encher as talhas de água. Levaram ao mestre-sala, e era vinho.",
  nome: "O convidado se chama Jesus. Ele é de Nazaré.",
  messias: "No poço, Jesus disse que é o Messias, o Cristo: o salvador que o povo esperava havia séculos.",
  venham: "A mulher chamou a cidade: “Venham ver”. E muitos foram ver com os próprios olhos.",
  naoSabia: "Em Betesda, o homem curado não sabia quem o tinha curado.",
};

// Os relatos que aparecem no diário, conforme o jogador avança.
export const RELATOS = [
  { simbolo: "talha", ref: "João 2:1–11", lugar: "Caná", resumo: "Num casamento, Jesus transforma água em vinho. “Este foi o primeiro dos sinais de Jesus.”", andamento: "Caná — de onde veio o vinho novo?" },
  { simbolo: "gota", ref: "João 4:1–42", lugar: "Samaria", resumo: "Junto ao poço, Jesus conversa com uma mulher samaritana e diz que é o Messias.", andamento: "Samaria — a conversa no poço." },
  { simbolo: "maca", ref: "João 5:1–15", lugar: "Jerusalém", resumo: "No tanque de Betesda, Jesus cura um homem doente havia 38 anos, que nem sabia quem ele era.", andamento: "Jerusalém — o homem que esperava havia 38 anos." },
];

// Trecho consultado no enigma da porta de pedra.
export const RELATO_POCO = {
  ref: "João 4:10–14",
  texto:
    "Jesus respondeu: “Se você soubesse quem está lhe pedindo água, você é que pediria a ele, e ele lhe daria água viva.” A mulher disse: “O senhor nem tem balde, e o poço é fundo.” Jesus respondeu: “Quem beber desta água terá sede outra vez. Mas quem beber da água que eu lhe der nunca mais terá sede: ela vai se tornar uma fonte que jorra para a vida eterna.”",
};
