/* Conteúdo real extraído da API do site atual (mileycyrus.com.br).
   Títulos, datas e autores são reais. Chamadas e corpo da matéria de exemplo
   foram escritos para o protótipo, no mesmo registro editorial, em extensão
   realista, para que a legibilidade seja testada com texto de verdade. */

window.MCBR = {
  eraAtiva: 'bass-persuades',

  eras: {
    'bass-persuades':      { nome: 'Bass Persuades', ano: '2026' },
    'something-beautiful': { nome: 'Something Beautiful', ano: '2025' },
    'endless-summer':      { nome: 'Endless Summer Vacation', ano: '2023' },
    'bangerz':             { nome: 'Bangerz', ano: '2013' }
  },

  banners: [
    {
      cat: 'Notícia',
      titulo: 'Miley lança <em>Bass Persuades</em>, seu décimo álbum de estúdio',
      chamada: 'Dez faixas, 37 minutos, e uma assinatura sem sobrenome pela primeira vez.',
      autor: 'Débora Brotto', dataCurta: '18 set', leitura: '6 min'
    },
    {
      cat: 'Coluna',
      titulo: 'O que <em>Bass Persuades</em> diz sobre quem Miley é agora',
      chamada: 'Nota 84. O disco em que ela para de provar alguma coisa.',
      autor: 'Izadora Vasconcelos', dataCurta: '19 set', leitura: '7 min'
    },
    {
      cat: 'Notícia',
      titulo: 'Vermelho, poder e liberdade: o que já é oficial sobre a era',
      chamada: 'A cantora assumiu o controle direto da direção de imagem.',
      autor: 'Welison Fontelene', dataCurta: '30 ago', leitura: '6 min'
    }
  ],

  materias: [
    { cat: 'Coluna',  titulo: 'O que <em>Bass Persuades</em> diz sobre quem Miley é agora', chamada: 'Nota 84. Um disco que não tenta provar nada, e funciona justamente por isso.', autor: 'Izadora Vasconcelos', data: '19 de setembro de 2026', dataCurta: '19 set', leitura: '7 min' },
    { cat: 'Notícia', titulo: 'Miley inicia a nova era com o clipe de “Bass Persuades”', chamada: 'Dirigido por Mert Alas, o clipe é uma celebração da pista de dança com um recado: largue o celular.', autor: 'Débora Brotto', data: '3 de setembro de 2026', dataCurta: '3 set', leitura: '4 min' },
    { cat: 'Notícia', titulo: 'Miley anuncia o décimo álbum e revela a tracklist completa', chamada: 'Participações de Model/Actriz e Andrew Wyatt, com produção dividida com Kid Harpoon.', autor: 'Laura Borba', data: '1º de setembro de 2026', dataCurta: '1 set', leitura: '5 min' },
    { cat: 'Notícia', titulo: 'Vermelho, poder e liberdade: o que já é oficial sobre o novo álbum', chamada: 'A cantora assumiu o controle direto da direção de imagem e escolheu o vermelho.', autor: 'Welison Fontelene', data: '30 de agosto de 2026', dataCurta: '30 ago', leitura: '6 min' },
    { cat: 'Coluna',  titulo: 'A saída da Columbia devolve o controle da narrativa à cantora', chamada: 'O que muda quando uma artista de vinte anos de carreira decide assinar com o próprio selo.', autor: 'Izadora Vasconcelos', data: '30 de agosto de 2026', dataCurta: '30 ago', leitura: '8 min' },
    { cat: 'Notícia', titulo: 'A partida de Dolly Parton e o adeus emocionante de Miley', chamada: 'Madrinha, parceira de palco e presença constante em toda a trajetória da cantora.', autor: 'Débora Brotto', data: '30 de agosto de 2026', dataCurta: '30 ago', leitura: '5 min' },
    { cat: 'Notícia', titulo: 'Miley é a primeira artista dos anos 90 a ganhar estrela na Calçada da Fama', chamada: 'A homenagem reuniu família, equipe e fãs em Hollywood.', autor: 'Laura Borba', data: '24 de maio de 2026', dataCurta: '24 mai', leitura: '3 min' },
    { cat: 'Coluna',  titulo: 'Como foi viver o especial de 20 anos de Hannah Montana no Brasil', chamada: 'Uma geração inteira reencontrou a personagem que a criou, e chorou junto.', autor: 'Izadora Vasconcelos', data: '19 de maio de 2026', dataCurta: '19 mai', leitura: '9 min' }
  ],

  /* Corpo da matéria de exemplo. Extensão realista para testar leitura de verdade. */
  corpo: [
    { t: 'p', c: 'Miley Cyrus lançou nesta sexta-feira <strong>Bass Persuades</strong>, seu décimo álbum de estúdio e o primeiro sob a Atlantic Records, encerrando um ciclo de mais de uma década na Columbia. São dez faixas e 37 minutos, acompanhadas do clipe de “Let’s Get Married”, o segundo da era.' },
    { t: 'p', c: 'A mudança mais visível não está na música, e sim na assinatura. Pela primeira vez, o nome que aparece na capa é apenas <strong>MILEY</strong>, em caixa alta, sem sobrenome. A decisão foi comunicada no fim de agosto, quando o site oficial da cantora foi atualizado silenciosamente e o sobrenome desapareceu de todos os materiais.' },
    { t: 'h2', c: 'Uma virada estética completa' },
    { t: 'p', c: 'Quem acompanhou <em>Something Beautiful</em>, em 2025, vai estranhar. Aquele era um álbum visual, com filme exibido em Tribeca, alta-costura de arquivo e uma paleta saturada de fantasia teatral. <em>Bass Persuades</em> faz o caminho oposto: a capa é um retrato em preto e branco, enquadramento fechado dos ombros para cima, uma rosa na boca, tipografia minimalista.' },
    { t: 'q', c: 'É o primeiro disco em que ela não parece estar provando nada para ninguém.', a: 'Débora Brotto' },
    { t: 'p', c: 'A fotografia é de Mert Alas, que também dirigiu o clipe do single-título e, segundo a gravadora, criou com exclusividade o mundo visual em torno do álbum. O styling ficou a cargo de Alastair McKimm, creditado como diretor criativo do projeto. É um cargo que raramente aparece em lançamentos pop, e indica o grau de controle que a cantora quis exercer sobre a imagem desta era.' },
    { t: 'p', c: 'Curiosamente, a capa é monocromática, mas a comunicação da era aponta para outra direção. Desde o anúncio, o vermelho foi tratado como cor dominante: aparece nos materiais promocionais, nos chapéus de couro que ela passou a usar em aparições públicas e no título de uma das faixas, “REDLIGHTS”. A leitura mais coerente é a de uma base preto e branco com o vermelho funcionando como sinal, não como fundo.' },
    { t: 'h2', c: 'O que o disco é, afinal' },
    { t: 'p', c: 'Musicalmente, <em>Bass Persuades</em> circula entre o dance-pop e uma guitarra suja que ela não visitava desde <em>Plastic Hearts</em>. Model/Actriz aparece em “Different Religion” e Andrew Wyatt, do Miike Snow, em “Neon Signs”. A produção é dividida entre a própria cantora, Kid Harpoon, Aldae, Griff Clawson, Michael Pollack, Maxx Morando e a dupla The Monsters &amp; Strangerz.' },
    { t: 'p', c: 'O tema declarado é o relacionamento com o noivo, Maxx Morando, mas a própria cantora resumiu o disco de forma mais larga: uma história de amor com coração cheio, dor de cotovelo e cada parte da vida no meio disso. É menos conceito e mais diário, o que ajuda a explicar a decisão de abandonar o verniz de estúdio na fotografia.' },
    { t: 'p', c: 'As edições físicas trazem “Smile” como faixa bônus. Os primeiros shows da era acontecem no Hollywood Bowl, em 16 e 18 de outubro, com Model/Actriz na abertura. Não há, até agora, qualquer indicação de turnê internacional nem data confirmada na América do Sul.' }
  ],

  acervo: [
    { ano: '2013', titulo: 'O VMA que dividiu opiniões e redefiniu a carreira dela', chamada: 'Treze anos depois, a apresentação continua sendo o divisor de águas mais citado da trajetória.' },
    { ano: '2009', titulo: 'O primeiro post do MCBR completa 17 anos', chamada: 'Começou como um blog. Virou a maior fonte brasileira sobre a cantora.' }
  ],

  equipe: [
    { nome: 'Débora Brotto',       cidade: 'São Paulo, SP',      twitter: '@deborabrotto', funcao: 'Administradora' },
    { nome: 'Welison Fontelene',   cidade: 'Parnaíba, PI',       twitter: '@welisonf',     funcao: 'Administrador' },
    { nome: 'Izadora Vasconcelos', cidade: 'Fortaleza, CE',      twitter: '@izadorav',     funcao: 'Redatora' },
    { nome: 'Laura Borba',         cidade: 'Belo Horizonte, MG', twitter: '@lauraborba',   funcao: 'Redatora' },
    { nome: 'Allan Andrade',       cidade: 'Recife, PE',         twitter: '@allanandrade', funcao: 'Design' },
    { nome: 'Paulo Robério',       cidade: 'Fortaleza, CE',      twitter: '@pauloroberio', funcao: 'Vídeo' }
  ],

  mutirao: {
    ativo: true,
    texto: 'Miley concorre a Vídeo do Ano no VMA 2026',
    cta: 'Votar',
    prazo: '2026-10-12T23:59:59'
  }
};
