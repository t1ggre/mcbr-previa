/* Conteúdo real extraído da API do site atual (mileycyrus.com.br).
   Títulos, datas, autores e IMAGENS DESTACADAS são reais — as fotos foram
   baixadas de /wp-content/uploads e convertidas para WebP em assets/img/.
   Chamadas e corpo da matéria de exemplo foram escritos para o protótipo,
   no mesmo registro editorial, em extensão realista, para que a legibilidade
   seja testada com texto de verdade.

   REGRA DE IMAGEM: toda Matéria tem Imagem Destacada obrigatória. No
   WordPress é o campo "Imagem destacada" do painel lateral. Não existe
   Matéria sem foto: o layout não tem estado de fallback, de propósito. */

(function () {
  /* Caminho de assets resolvido a partir do próprio script, para que as
     páginas na raiz e as das direções (um nível abaixo) usem a mesma base. */
  var A = (document.currentScript && document.currentScript.src || '')
            .replace(/conteudo\.js.*$/, '');
  var IMG = A + 'img/';
  var CAPA = A + 'disco/';

  window.MCBR = {
    assets: A,

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
        autor: 'Débora Brotto', dataCurta: '18 set', leitura: '6 min',
        img: IMG + 'lancamento-bass-persuades.webp',
        alt: 'Miley Cyrus em retrato de divulgação do álbum Bass Persuades',
        foco: '50% 30%'
      },
      {
        cat: 'Coluna',
        titulo: 'O que <em>Bass Persuades</em> diz sobre quem Miley é agora',
        chamada: 'Nota 84. O disco em que ela para de provar alguma coisa.',
        autor: 'Izadora Vasconcelos', dataCurta: '19 set', leitura: '7 min',
        album: 'bass-persuades', img: IMG + 'analise-bass-persuades.webp',
        alt: 'Miley Cyrus em preto e branco, enquadramento fechado',
        foco: '50% 26%'
      },
      {
        cat: 'Notícia',
        titulo: 'Vermelho, poder e liberdade: o que já é oficial sobre a era',
        chamada: 'A cantora assumiu o controle direto da direção de imagem.',
        autor: 'Welison Fontelene', dataCurta: '30 ago', leitura: '6 min',
        album: 'bass-persuades', img: IMG + 'vermelho-poder-liberdade.webp',
        alt: 'Arte promocional da era, com dominância de vermelho',
        foco: '50% 40%'
      }
    ],

    materias: [
      { cat: 'Coluna',  titulo: 'O que <em>Bass Persuades</em> diz sobre quem Miley é agora', chamada: 'Nota 84. Um disco que não tenta provar nada, e funciona justamente por isso.', autor: 'Izadora Vasconcelos', data: '19 de setembro de 2026', dataCurta: '19 set', leitura: '7 min',
        album: 'bass-persuades', img: IMG + 'analise-bass-persuades.webp', alt: 'Miley Cyrus em preto e branco, enquadramento fechado', foco: '50% 24%' },
      { cat: 'Notícia', titulo: 'Miley inicia a nova era com o clipe de “Bass Persuades”', chamada: 'Dirigido por Mert Alas, o clipe é uma celebração da pista de dança com um recado: largue o celular.', autor: 'Débora Brotto', data: '3 de setembro de 2026', dataCurta: '3 set', leitura: '4 min',
        album: 'bass-persuades', img: IMG + 'clipe-bass-persuades.webp', alt: 'Cena do clipe de Bass Persuades', foco: '50% 32%' },
      { cat: 'Notícia', titulo: 'Miley anuncia o décimo álbum e revela a tracklist completa', chamada: 'Participações de Model/Actriz e Andrew Wyatt, com produção dividida com Kid Harpoon.', autor: 'Laura Borba', data: '1º de setembro de 2026', dataCurta: '1 set', leitura: '5 min',
        album: 'bass-persuades', img: IMG + 'anuncio-tracklist.webp', alt: 'Arte de anúncio do décimo álbum de estúdio', foco: '50% 38%' },
      { cat: 'Notícia', titulo: 'Vermelho, poder e liberdade: o que já é oficial sobre o novo álbum', chamada: 'A cantora assumiu o controle direto da direção de imagem e escolheu o vermelho.', autor: 'Welison Fontelene', data: '30 de agosto de 2026', dataCurta: '30 ago', leitura: '6 min',
        album: 'bass-persuades', img: IMG + 'vermelho-poder-liberdade.webp', alt: 'Arte promocional da era, com dominância de vermelho', foco: '50% 40%' },
      { cat: 'Coluna',  titulo: 'A saída da Columbia devolve o controle da narrativa à cantora', chamada: 'O que muda quando uma artista de vinte anos de carreira decide assinar com o próprio selo.', autor: 'Izadora Vasconcelos', data: '30 de agosto de 2026', dataCurta: '30 ago', leitura: '8 min',
        album: 'bass-persuades', img: IMG + 'saida-columbia.webp', alt: 'Montagem sobre a troca de gravadora', foco: '50% 38%' },
      { cat: 'Notícia', titulo: 'A partida de Dolly Parton e o adeus emocionante de Miley', chamada: 'Madrinha, parceira de palco e presença constante em toda a trajetória da cantora.', autor: 'Débora Brotto', data: '30 de agosto de 2026', dataCurta: '30 ago', leitura: '5 min',
        album: null, img: IMG + 'dolly-parton.webp', alt: 'Dolly Parton e Miley Cyrus juntas no palco', foco: '50% 28%' },
      { cat: 'Notícia', titulo: 'Miley é a primeira artista dos anos 90 a ganhar estrela na Calçada da Fama', chamada: 'A homenagem reuniu família, equipe e fãs em Hollywood.', autor: 'Laura Borba', data: '24 de maio de 2026', dataCurta: '24 mai', leitura: '3 min',
        album: null, img: IMG + 'calcada-da-fama.webp', alt: 'Miley Cyrus na cerimônia da Calçada da Fama', foco: '50% 32%' },
      { cat: 'Coluna',  titulo: 'Como foi viver o especial de 20 anos de Hannah Montana no Brasil', chamada: 'Uma geração inteira reencontrou a personagem que a criou, e chorou junto.', autor: 'Izadora Vasconcelos', data: '19 de maio de 2026', dataCurta: '19 mai', leitura: '9 min',
        album: null, img: IMG + 'hannah-montana-brasil.webp', alt: 'Arte do especial de 20 anos de Hannah Montana', foco: '50% 34%' },

      /* ---- Acervo por era. Títulos, datas e fotos reais do site atual.
         Existem para que a busca por álbum do rolo de discos tenha o que
         devolver: filtro sem resultado não se avalia. ---- */
      { cat: 'Notícia', album: 'endless-summer', titulo: 'SAIU! Conheça o oitavo álbum de estúdio de Miley Cyrus', chamada: 'Treze faixas, duas versões de “Flowers” e um disco dividido entre a manhã e a noite.', autor: 'Débora Brotto', data: '10 de março de 2023', dataCurta: '10 mar', leitura: '6 min',
        img: IMG + 'esv-lancamento.webp', alt: 'Arte de divulgação de Endless Summer Vacation', foco: '50% 34%' },
      { cat: 'Coluna', album: 'endless-summer', titulo: 'As primeiras impressões sobre <em>Endless Summer Vacation</em>', chamada: 'O disco que transformou o fim de um casamento em autossuficiência de pista.', autor: 'Izadora Vasconcelos', data: '9 de março de 2023', dataCurta: '9 mar', leitura: '8 min',
        img: IMG + 'esv-impressoes.webp', alt: 'Miley Cyrus na era Endless Summer Vacation', foco: '50% 34%' },
      { cat: 'Notícia', album: 'endless-summer', titulo: 'Confira com exclusividade as letras de <em>Endless Summer Vacation</em>', chamada: 'Tradução completa das treze faixas, publicada no mesmo dia do lançamento.', autor: 'Laura Borba', data: '10 de março de 2023', dataCurta: '10 mar', leitura: '4 min',
        img: IMG + 'esv-letras.webp', alt: 'Arte com as letras do álbum', foco: '50% 34%' },
      { cat: 'Notícia', album: 'endless-summer', titulo: 'Miley Cyrus é capa da nova edição da British Vogue', chamada: 'A entrevista mais longa da era, com fotos de estúdio e um balanço de vinte anos.', autor: 'Welison Fontelene', data: '18 de maio de 2023', dataCurta: '18 mai', leitura: '5 min',
        img: IMG + 'esv-vogue.webp', alt: 'Miley Cyrus na capa da British Vogue', foco: '50% 34%' },
      { cat: 'Notícia', album: 'plastic-hearts', titulo: 'PRISONER: Miley lança remix do single com Jax Jones', chamada: 'A parceria com Dua Lipa ganha versão de pista, quatro meses depois do álbum.', autor: 'Débora Brotto', data: '5 de fevereiro de 2021', dataCurta: '5 fev', leitura: '3 min',
        img: IMG + 'ph-prisoner.webp', alt: 'Arte do remix de Prisoner', foco: '50% 34%' },
      { cat: 'Notícia', album: 'plastic-hearts', titulo: 'SORTEIO: concorra a cinco cópias físicas de <em>Plastic Hearts</em>', chamada: 'O MCBR sorteia cinco CDs do disco de rock que virou o ponto de virada da carreira.', autor: 'Laura Borba', data: '3 de fevereiro de 2021', dataCurta: '3 fev', leitura: '2 min',
        img: IMG + 'ph-sorteio.webp', alt: 'Arte do sorteio de cópias físicas de Plastic Hearts', foco: '50% 34%' },
      { cat: 'Notícia', album: 'plastic-hearts', titulo: 'Miley Cyrus se apresenta no TikTok Tailgate do Super Bowl', chamada: 'Primeiro show para público desde o início da pandemia, com Joan Jett e Billy Idol.', autor: 'Welison Fontelene', data: '9 de fevereiro de 2021', dataCurta: '9 fev', leitura: '4 min',
        img: IMG + 'ph-superbowl.webp', alt: 'Miley Cyrus no palco do Super Bowl TikTok Tailgate', foco: '50% 34%' },
      { cat: 'Coluna', album: 'plastic-hearts', titulo: 'A nova diva dos antigos roqueiros, segundo o El País', chamada: 'O que significa uma artista pop de trinta anos ser adotada pelo rock clássico.', autor: 'Izadora Vasconcelos', data: '27 de fevereiro de 2021', dataCurta: '27 fev', leitura: '7 min',
        img: IMG + 'ph-elpais.webp', alt: 'Miley Cyrus em performance de rock', foco: '50% 34%' },
      { cat: 'Notícia', album: 'something-beautiful', titulo: 'Miley Cyrus estreia <em>Something Beautiful</em> no Tribeca', chamada: 'O álbum visual foi exibido para plateia cheia, com a cantora presente na sessão.', autor: 'Débora Brotto', data: '15 de junho de 2025', dataCurta: '15 jun', leitura: '5 min',
        img: IMG + 'sb-tribeca.webp', alt: 'Miley Cyrus na estreia do filme no Tribeca', foco: '50% 34%' },
      { cat: 'Coluna', album: 'something-beautiful', titulo: 'Paris Was Something Beautiful', chamada: 'A apresentação francesa que provou que o álbum funcionava fora da tela.', autor: 'Izadora Vasconcelos', data: '21 de junho de 2025', dataCurta: '21 jun', leitura: '6 min',
        img: IMG + 'sb-paris.webp', alt: 'Miley Cyrus em apresentação em Paris', foco: '50% 34%' },
      { cat: 'Notícia', album: 'something-beautiful', titulo: 'Miley promove o lançamento por uma semana inteira em Nova York', chamada: 'Sete dias de aparições, entrevistas e uma vitrine tomada pela arte do disco.', autor: 'Laura Borba', data: '5 de junho de 2025', dataCurta: '5 jun', leitura: '4 min',
        img: IMG + 'sb-ny.webp', alt: 'Miley Cyrus em ação promocional em Nova York', foco: '50% 34%' },
      { cat: 'Notícia', album: 'something-beautiful', titulo: 'Miley Cyrus é eternizada na Calçada da Fama de Hollywood', chamada: 'A estrela veio no meio da era, com discurso que citou a família e o fandom.', autor: 'Welison Fontelene', data: '2 de julho de 2025', dataCurta: '2 jul', leitura: '4 min',
        img: IMG + 'sb-calcada.webp', alt: 'Miley Cyrus na cerimônia da Calçada da Fama', foco: '50% 34%' },
      { cat: 'Notícia', album: 'bangerz', titulo: 'Assista à estreia do MTV Unplugged de Miley Cyrus', chamada: 'O especial acústico que reapresentou as faixas do álbum em outro registro.', autor: 'Débora Brotto', data: '29 de janeiro de 2014', dataCurta: '29 jan', leitura: '3 min',
        img: IMG + 'bgz-unplugged.webp', alt: 'Miley Cyrus no MTV Unplugged', foco: '50% 34%' },
      { cat: 'Notícia', album: 'bangerz', titulo: 'FOTOS: Miley Cyrus no MTV Unplugged em Hollywood', chamada: 'Galeria completa da gravação, com participação de Madonna em “Don’t Tell Me”.', autor: 'Laura Borba', data: '30 de janeiro de 2014', dataCurta: '30 jan', leitura: '2 min',
        img: IMG + 'bgz-unplugged-fotos.webp', alt: 'Bastidores da gravação do MTV Unplugged', foco: '50% 34%' },
      { cat: 'Notícia', album: 'bangerz', titulo: 'Miley Cyrus é capa da edição de março da W Magazine', chamada: 'Ensaio assinado por Mert e Marcus, no auge da era mais comentada da carreira.', autor: 'Welison Fontelene', data: '29 de janeiro de 2014', dataCurta: '29 jan', leitura: '3 min',
        img: IMG + 'bgz-wmagazine.webp', alt: 'Miley Cyrus na capa da W Magazine', foco: '50% 34%' },
      { cat: 'Coluna', album: 'bangerz', titulo: 'Sky Ferreira defende Miley em nova entrevista', chamada: 'A conversa sobre o preço que uma artista paga por assumir o próprio corpo.', autor: 'Izadora Vasconcelos', data: '29 de janeiro de 2014', dataCurta: '29 jan', leitura: '5 min',
        img: IMG + 'bgz-skyferreira.webp', alt: 'Sky Ferreira em entrevista', foco: '50% 34%' }
    ],

    /* ============================================================
       CORPO DA MATÉRIA DE EXEMPLO
       Serve de prévia para TODOS os blocos que o Painel vai oferecer.
       O comentário acima de cada um diz como o bloco se chama no
       WordPress, para que a conversa com a equipe use o mesmo nome.
       ============================================================ */
    corpo: [
      { t: 'p', c: 'Miley Cyrus lançou nesta sexta-feira <strong>Bass Persuades</strong>, seu décimo álbum de estúdio e o primeiro sob a Atlantic Records, encerrando um ciclo de mais de uma década na Columbia. São dez faixas e 37 minutos, acompanhadas do clipe de “Let’s Get Married”, o segundo da era.' },
      { t: 'p', c: 'A mudança mais visível não está na música, e sim na assinatura. Pela primeira vez, o nome que aparece na capa é apenas <strong>MILEY</strong>, em caixa alta, sem sobrenome. A decisão foi comunicada no fim de agosto, quando o site oficial da cantora foi atualizado silenciosamente e o sobrenome desapareceu de todos os materiais.' },

      /* WordPress: bloco "Imagem". Largura da coluna de leitura. */
      { t: 'fig', src: IMG + 'clipe-bass-persuades.webp',
        alt: 'Cena do clipe de Bass Persuades, com a cantora em plano fechado',
        leg: 'Cena do clipe de “Bass Persuades”, dirigido por Mert Alas.',
        cred: 'Divulgação / Atlantic Records' },

      { t: 'h2', c: 'Uma virada estética completa' },
      { t: 'p', c: 'Quem acompanhou <em>Something Beautiful</em>, em 2025, vai estranhar. Aquele era um álbum visual, com filme exibido em Tribeca, alta-costura de arquivo e uma paleta saturada de fantasia teatral. <em>Bass Persuades</em> faz o caminho oposto: a capa é um retrato em preto e branco, enquadramento fechado dos ombros para cima, uma rosa na boca, tipografia minimalista.' },

      /* WordPress: bloco "Mídia e texto". Imagem e texto lado a lado. */
      { t: 'mt', src: IMG + 'grammy-2026.webp',
        alt: 'Miley Cyrus no tapete do Grammy 2026',
        titulo: 'O ano que preparou a virada',
        c: 'A temporada de premiações de 2026 já sinalizava o movimento. No Grammy, ela apareceu sem estilista de gravadora e com a mesma equipe criativa que assinaria o álbum meses depois. O que parecia escolha de tapete vermelho era, na prática, o primeiro teste público da direção de imagem que ela passaria a controlar sozinha.',
        lado: 'esq' },

      /* WordPress: bloco "Citação". */
      { t: 'q', c: 'É o primeiro disco em que ela não parece estar provando nada para ninguém.', a: 'Débora Brotto' },

      { t: 'p', c: 'A fotografia é de Mert Alas, que também dirigiu o clipe do single-título e, segundo a gravadora, criou com exclusividade o mundo visual em torno do álbum. O styling ficou a cargo de Alastair McKimm, creditado como diretor criativo do projeto. É um cargo que raramente aparece em lançamentos pop, e indica o grau de controle que a cantora quis exercer sobre a imagem desta era.' },

      /* WordPress: bloco "Separador". Respiro entre assuntos, sem virar título. */
      { t: 'sep' },

      { t: 'h2', c: 'O que o disco é, afinal' },

      /* WordPress: bloco "Imagem" em largura ampla. Uma por matéria, no máximo. */
      { t: 'fig-larga', src: IMG + 'vermelho-poder-liberdade.webp',
        alt: 'Arte promocional da era, com dominância de vermelho',
        leg: 'O vermelho funciona como sinal, não como fundo: a capa é monocromática.',
        cred: 'Divulgação' },

      { t: 'p', c: 'Musicalmente, <em>Bass Persuades</em> circula entre o dance-pop e uma guitarra suja que ela não visitava desde <em>Plastic Hearts</em>. Model/Actriz aparece em “Different Religion” e Andrew Wyatt, do Miike Snow, em “Neon Signs”. A produção é dividida entre a própria cantora, Kid Harpoon, Aldae, Griff Clawson, Michael Pollack, Maxx Morando e a dupla The Monsters &amp; Strangerz.' },

      /* WordPress: bloco "Incorporar" → YouTube. Carrega por clique: o iframe
         do YouTube pesa mais que a matéria inteira e só entra quando pedido. */
      { t: 'embed', rede: 'youtube', id: 'G7KNmW9a75Y',
        titulo: 'Miley Cyrus — clipe oficial',
        leg: 'O clipe do single-título, no canal oficial da cantora.' },

      { t: 'p', c: 'O tema declarado é o relacionamento com o noivo, Maxx Morando, mas a própria cantora resumiu o disco de forma mais larga: uma história de amor com coração cheio, dor de cotovelo e cada parte da vida no meio disso. É menos conceito e mais diário, o que ajuda a explicar a decisão de abandonar o verniz de estúdio na fotografia.' },

      /* WordPress: bloco "Galeria" de duas colunas. O par compara; a foto
         solta narra. Não use galeria para duas fotos sem relação entre si. */
      { t: 'dupla',
        a: { src: IMG + 'iheartradio.webp', alt: 'Miley Cyrus no iHeartRadio Music Awards 2026' },
        b: { src: IMG + 'globo-de-ouro.webp', alt: 'Miley Cyrus no Globo de Ouro 2026' },
        leg: 'iHeartRadio e Globo de Ouro, 2026: a mesma silhueta, dois meses de distância.' },

      { t: 'p', c: 'A leitura mais coerente da comunicação da era é a de uma base preto e branco com o vermelho funcionando como sinal. Aparece nos materiais promocionais, nos chapéus de couro que ela passou a usar em aparições públicas e no título de uma das faixas, “REDLIGHTS”.' },

      /* WordPress: bloco "Incorporar" das redes. O conteúdo de terceiro
         permanece hospedado na origem — é a política do ADR 0002. */
      { t: 'embed', rede: 'instagram', autor: 'Miley Cyrus', handle: '@mileycyrus',
        c: 'ten songs. thirty-seven minutes. no last name. 🌹',
        data: '18 de setembro de 2026', href: 'https://www.instagram.com/mileycyrus/',
        img: IMG + 'lancamento-bass-persuades.webp' },

      { t: 'embed', rede: 'x', autor: 'Miley Cyrus', handle: '@MileyCyrus',
        c: 'BASS PERSUADES é seu agora. obrigada por dezessete anos de paciência comigo.',
        data: '18 de setembro de 2026', href: 'https://x.com/MileyCyrus' },

      { t: 'p', c: 'As edições físicas trazem “Smile” como faixa bônus. Os primeiros shows da era acontecem no Hollywood Bowl, em 16 e 18 de outubro, com Model/Actriz na abertura.' },

      /* WordPress: bloco "Incorporar" → Spotify. Iframe oficial, lazy. */
      { t: 'embed', rede: 'spotify', src: 'https://open.spotify.com/embed/artist/5YGY8feqx7naU7z4HrwZM6',
        titulo: 'Miley Cyrus no Spotify', leg: 'O disco completo, direto da plataforma.' },

      { t: 'h2', c: 'E a América do Sul?' },
      { t: 'p', c: 'Não há, até agora, qualquer indicação de turnê internacional nem data confirmada na América do Sul. A última passagem da cantora pelo Brasil foi em 2014, na turnê <em>Bangerz</em>, e o assunto não voltou a aparecer em nenhuma entrevista desta era.' },

      { t: 'embed', rede: 'tiktok', autor: 'Miley Cyrus', handle: '@mileycyrus',
        c: 'a coreografia de “Let’s Get Married” em quinze segundos',
        data: '19 de setembro de 2026', href: 'https://www.tiktok.com/@mileycyrus' },

      /* WordPress: bloco "Lista de posts". Seleção manual ou por categoria. */
      { t: 'lista', titulo: 'Para entender a era', de: 1, ate: 5 },

      { t: 'p', c: 'A cobertura da era continua no MCBR: análise faixa a faixa, tradução das letras e o que for saindo sobre datas de show entram aqui nos próximos dias.' }
    ],

    /* ============================================================
       DISCOGRAFIA — alimenta o rolo de discos da Home.
       Capas reais. Bangerz e Younger Now não têm arte disponível na
       fonte usada; ficam sem capa de propósito, para mostrar como o
       layout se comporta quando a imagem falta.
       ============================================================ */
    /* Do mais recente para o mais antigo: o rolo começa na era atual,
       que é o que o leitor procura, e recua no tempo conforme avança. */
    discos: [
      { id: 'bass-persuades',      ano: '2026', nome: 'Bass Persuades',          capa: CAPA + 'bass-persuades.webp' },
      { id: 'something-beautiful', ano: '2025', nome: 'Something Beautiful',     capa: CAPA + 'something-beautiful.webp' },
      { id: 'endless-summer',      ano: '2023', nome: 'Endless Summer Vacation', capa: CAPA + 'endless-summer-vacation.webp' },
      { id: 'plastic-hearts',      ano: '2020', nome: 'Plastic Hearts',          capa: CAPA + 'plastic-hearts.webp' },
      { id: 'she-is-coming',       ano: '2019', nome: 'She Is Coming',           capa: CAPA + 'she-is-coming.webp' },
      { id: 'younger-now',         ano: '2017', nome: 'Younger Now',             capa: null },
      { id: 'bangerz',             ano: '2013', nome: 'Bangerz',                 capa: null },
      { id: 'cant-be-tamed',       ano: '2010', nome: 'Can’t Be Tamed',          capa: CAPA + 'cant-be-tamed.webp' },
      { id: 'time-of-our-lives',   ano: '2009', nome: 'The Time of Our Lives',   capa: CAPA + 'time-of-our-lives.webp' },
      { id: 'breakout',            ano: '2008', nome: 'Breakout',                capa: CAPA + 'breakout.webp' },
      { id: 'meet-miley-cyrus',    ano: '2007', nome: 'Meet Miley Cyrus',        capa: CAPA + 'meet-miley-cyrus.webp' }
    ],

    /* ============================================================
       O MCBR NAS REDES
       Endereços reais, conferidos no site atual. Estes são os perfis
       DO SITE, não os da cantora — a distinção importa: o glossário
       reserva "Canais Oficiais" para as plataformas da cantora, e
       elas agora vivem no Feed e no bloco "Onde ouvir".
       YouTube e TikTok do MCBR ainda não têm endereço conhecido;
       entram como pendência visível em vez de link morto.
       ============================================================ */
    redes: [
      { rede: 'instagram', nome: 'Instagram', arroba: '@sitemileycyrusbr',
        url: 'https://www.instagram.com/sitemileycyrusbr/' },
      { rede: 'x', nome: 'X', arroba: '@MileyCyrusBR',
        url: 'https://x.com/MileyCyrusBR' },
      { rede: 'facebook', nome: 'Facebook', arroba: '/sitemcyruscom',
        url: 'https://www.facebook.com/sitemcyruscom' },
      { rede: 'youtube', nome: 'YouTube', pendente: true },
      { rede: 'tiktok', nome: 'TikTok', pendente: true }
    ],

    /* Plataformas da cantora. Spotify e Deezer são os perfis de artista
       verificados; o YouTube Music vai para a busca porque o canal de
       artista tem id próprio que ninguém confirmou ainda. */
    ouvir: [
      { rede: 'spotify', nome: 'Spotify',
        url: 'https://open.spotify.com/artist/5YGY8feqx7naU7z4HrwZM6' },
      { rede: 'ytmusic', nome: 'YouTube Music',
        url: 'https://music.youtube.com/search?q=Miley+Cyrus' },
      { rede: 'deezer', nome: 'Deezer',
        url: 'https://www.deezer.com/artist/12436' }
    ],

    /* ============================================================
       FEED DA MILEY
       Conteúdo de exemplo. A atualização automática NÃO está resolvida:
       a API que lia perfil de terceiro no Instagram morreu em dezembro
       de 2024 e o X cobra por leitura. As opções e os custos estão no
       LEIA-ME. O renderizador é um só, em palco.js: trocar a fonte é
       trocar uma função, não o layout.
       ============================================================ */
    feed: {
      instagram: {
        arroba: '@mileycyrus',
        url: 'https://www.instagram.com/mileycyrus/',
        /* Grade de quatro, como a do perfil. Toda publicação tem foto:
           no Instagram, publicação sem imagem não existe. */
        posts: [
          { c: 'ten songs. thirty-seven minutes. no last name. 🌹', quando: 'há 2 h',
            img: IMG + 'lancamento-bass-persuades.webp' },
          { c: 'rehearsals for the Bowl. october is going to be loud.', quando: 'há 1 d',
            img: IMG + 'iheartradio.webp' },
          { c: 'REDLIGHTS. out now.', quando: 'há 2 d',
            img: IMG + 'vermelho-poder-liberdade.webp' },
          { c: 'thank you for seventeen years of patience with me.', quando: 'há 3 d',
            img: IMG + 'calcada-da-fama.webp' }
        ]
      },
      x: {
        arroba: '@MileyCyrus',
        url: 'https://x.com/MileyCyrus',
        posts: [
          { c: 'BASS PERSUADES é seu agora.', quando: 'há 3 h' },
          { c: 'REDLIGHTS foi a primeira que escrevi e a última que terminei.', quando: 'há 1 d' },
          { c: 'Hollywood Bowl, 16 e 18 de outubro. Model/Actriz abrindo.', quando: 'há 3 d' },
          { c: 'obrigada por dezessete anos de paciência comigo.', quando: 'há 4 d' }
        ]
      }
    },

    acervo: [
      { ano: '2013', titulo: 'O VMA que dividiu opiniões e redefiniu a carreira dela', chamada: 'Treze anos depois, a apresentação continua sendo o divisor de águas mais citado da trajetória.', img: IMG + 'nostalgia-hannah.webp' },
      { ano: '2009', titulo: 'O primeiro post do MCBR completa 17 anos', chamada: 'Começou como um blog. Virou a maior fonte brasileira sobre a cantora.', img: IMG + 'entrevista-variety.webp' }
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
})();
