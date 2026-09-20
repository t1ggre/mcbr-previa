/* ============================================================
   DIREÇÃO 3 · PALCO — comportamento
   Só desta direção. O que é comum às três continua em comum.js.

   Regra que atravessa o arquivo inteiro: NENHUM efeito pode impedir
   a rolagem, e nenhum estado inicial escondido pode sobreviver a um
   quadro que não chegou. Toda animação que mexe em opacidade é
   montada só com a aba visível; o estado legível é o padrão do CSS.
   ============================================================ */
(function () {
  var D = window.MCBR;
  var SEM_MOTION = window.MCBR_SEM_MOTION;

  function podeAnimar() {
    return !SEM_MOTION && window.gsap && document.visibilityState === 'visible';
  }

  /* Adia o arranque até a aba estar visível. Quem abre link com
     Ctrl+clique cai exatamente aqui: a aba nasce escondida, o ticker
     do GSAP nunca roda e um from({opacity:0}) esconderia a página
     para sempre. */
  function quandoVisivel(fn) {
    if (document.visibilityState === 'visible') return fn();
    var uma = function () {
      if (document.visibilityState !== 'visible') return;
      document.removeEventListener('visibilitychange', uma);
      fn();
    };
    document.addEventListener('visibilitychange', uma);
  }

  function eraRGB() {
    return getComputedStyle(document.documentElement)
             .getPropertyValue('--era-rgb').trim() || '255,43,43';
  }

  /* ============================================================
     1. CORTINA DE LUZ
     Colunas verticais nas cores da Era, larguras moduladas por
     ruído, com um rastro que segue o ponteiro por mola. Canvas 2D
     em meia resolução: o efeito é vertical, não perde nada com isso
     e custa um terço do que custaria em resolução cheia.
     ============================================================ */
  function cortinaDeLuz(cv) {
    if (!cv) return;
    var ctx = cv.getContext('2d', { alpha: true });
    var L = 0, A = 0, cols = 0, t = 0;
    var grad = [];
    var alvoX = .5, px = .5, vx = 0, forca = 0;

    /* Ruído de valor 1D com interpolação suave. Suficiente: o que
       precisamos é variação contínua, não realismo. */
    var sem = new Float32Array(512);
    for (var i = 0; i < 512; i++) sem[i] = Math.random();
    function suave(x) { return x * x * (3 - 2 * x); }
    function ruido(x) {
      var i0 = Math.floor(x), f = x - i0;
      var a = sem[((i0 % 512) + 512) % 512], b = sem[(((i0 + 1) % 512) + 512) % 512];
      return a + (b - a) * suave(f);
    }
    function fbm(x) { return ruido(x) * .55 + ruido(x * 2.3 + 11) * .28 + ruido(x * 4.7 + 31) * .17; }

    function paleta() {
      /* Três intensidades da MESMA cor da Era. A versão anterior tinha
         um destaque âmbar e um branco: sobre fundo escuro eles liam
         como listras amareladas, cor que não pertence a era nenhuma. */
      var e = eraRGB();
      grad = [
        faixa('rgba(' + e + ',', .55),
        faixa('rgba(' + e + ',', .34),
        faixa('rgba(' + e + ',', .2)
      ];
      function faixa(pref, topo) {
        var g = ctx.createLinearGradient(0, 0, 0, A);
        g.addColorStop(0,   pref + '0)');
        g.addColorStop(.18, pref + topo + ')');
        g.addColorStop(.55, pref + (topo * .55) + ')');
        g.addColorStop(1,   pref + '0)');
        return g;
      }
    }

    function mede() {
      L = Math.max(320, Math.floor(innerWidth / 2));
      A = Math.max(320, Math.floor(innerHeight / 2));
      cv.width = L; cv.height = A;
      cols = Math.min(170, Math.max(56, Math.round(L / 6)));
      paleta();
    }

    function quadro() {
      ctx.clearRect(0, 0, L, A);
      ctx.globalCompositeOperation = 'lighter';

      /* Mola subamortecida: o rastro chega atrasado e passa um pouco
         do ponto, como cortina de pano faria. */
      var k = .07, amort = .82;
      vx = (vx + (alvoX - px) * k) * amort;
      px += vx;
      forca *= .94;

      var largBase = L / cols;
      for (var i = 0; i < cols; i++) {
        var n = fbm(i * .09 + t * .05);
        var m = fbm(i * .21 + 77 - t * .03);
        var w = largBase * (.3 + n * 2.6);
        var x = i * largBase - w / 2;

        /* Perto do ponteiro a coluna abre e acende. */
        var d = Math.abs(i / cols - px);
        var perto = Math.max(0, 1 - d / .22);
        var inten = (.1 + n * .5) * (.55 + m * .5) + perto * (.45 + forca);

        ctx.globalAlpha = Math.min(.6, inten * .38);
        ctx.fillStyle = grad[m > .74 ? 1 : (n > .82 ? 2 : 0)];
        ctx.fillRect(x, 0, Math.max(.6, w), A);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      t += .016;
    }

    function laco() { quadro(); requestAnimationFrame(laco); }

    mede();
    addEventListener('resize', mede);
    new MutationObserver(paleta).observe(document.documentElement, {
      attributes: true, attributeFilter: ['data-era']
    });

    addEventListener('pointermove', function (e) {
      var novo = e.clientX / innerWidth;
      forca = Math.min(.5, forca + Math.abs(novo - alvoX) * 6);
      alvoX = novo;
    }, { passive: true });

    if (SEM_MOTION) { quadro(); return; }
    laco();
  }

  /* ============================================================
     3. CABEÇALHO
     Fixo o tempo todo. A faixa de mutirão recolhe depois dos
     primeiros 60px para não roubar altura de leitura.
     ============================================================ */
  function cabecalho() {
    /* A faixa de mutirão é montada pela página, depois deste boot, e muda
       de altura quando o texto quebra linha no celular. O observador dá a
       medida nos dois casos. */
    var slot = document.querySelector('.faixa-slot');
    var mede = function () {
      if (!slot) return;
      document.documentElement.style.setProperty('--h-faixa', slot.offsetHeight + 'px');
    };
    if (slot && window.ResizeObserver) new ResizeObserver(mede).observe(slot);
    mede();

    if (!window.ScrollTrigger) return;
    ScrollTrigger.create({
      start: 'top -60', end: 99999,
      onToggle: function (self) {
        /* Mede de novo na hora de recolher. O observador acima cobre a
           mudança de quebra de linha, mas a primeira medição pode ter
           acontecido antes de a faixa existir — ela é montada pela
           página, depois deste boot. */
        mede();
        document.documentElement.classList.toggle('rolou', self.isActive);
      }
    });
  }

  /* ============================================================
     4. O PALCO — três destaques, sem pin
     Antes isto prendia a página: o pin com scrub obrigava a
     atravessar os três antes de descer. Agora é troca por tempo,
     com barra de progresso, setas e teclado. A rolagem é livre do
     primeiro pixel.
     ============================================================ */
  var TROCA = 7000;

  function montaPalco() {
    var sec = document.querySelector('[data-palco]');
    if (!sec) return;
    var fotos = sec.querySelector('[data-fotos]');
    var txt = sec.querySelector('[data-txt]');
    var pontos = sec.querySelector('[data-pontos]');
    var vivo = sec.querySelector('[data-vivo]');
    var i = -1, timer = null;

    fotos.innerHTML = D.banners.map(function (b) {
      return '<div class="pf"><img src="' + b.img + '" alt="' + b.alt +
             '" style="object-position:' + (b.foco || '50% 35%') + '"' +
             (b === D.banners[0] ? ' fetchpriority="high"' : ' loading="lazy"') + '></div>';
    }).join('');
    var camadas = fotos.querySelectorAll('.pf');

    D.banners.forEach(function (b, k) {
      var bt = document.createElement('button');
      bt.type = 'button';
      bt.innerHTML = '<i></i>';
      bt.setAttribute('aria-label', 'Ver o destaque ' + (k + 1) + ' de ' + D.banners.length);
      bt.addEventListener('click', function () { mostra(k, true); });
      pontos.appendChild(bt);
    });
    var botoes = pontos.querySelectorAll('button');
    pontos.style.setProperty('--dur', TROCA + 'ms');

    function mostra(k, manual) {
      if (k === i) return;
      i = (k + D.banners.length) % D.banners.length;
      var b = D.banners[i];

      camadas.forEach(function (c, j) { c.classList.toggle('on', j === i); });

      txt.innerHTML =
        '<span class="et" data-cat="' + b.cat + '">' + b.cat + '</span>' +
        '<h1 class="disp">' + b.titulo + '</h1>' +
        '<p class="chamada">' + b.chamada + '</p>' +
        '<div class="acoes"><a class="btn" href="materia.html">Ler agora</a>' +
        metaDe(b) + '</div>';

      botoes.forEach(function (bt, j) {
        bt.setAttribute('aria-current', String(j === i));
        /* A barra só reinicia se o elemento for novo: reiniciar
           animação CSS na mão exige reflow, e trocar o nó é mais
           barato que forçar layout. */
        if (j === i) bt.replaceChildren(document.createElement('i'));
      });

      if (vivo) vivo.textContent = 'Destaque ' + (i + 1) + ' de ' + D.banners.length +
                                   ': ' + txt.querySelector('h1').textContent;

      /* A primeira pintura não anima: o momento de chegada pertence
         à página, não ao rotativo. */
      if (manual !== undefined && podeAnimar()) {
        gsap.fromTo(txt.children, { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: .5, stagger: .045, ease: 'power3.out', overwrite: true });
      }
      reinicia();
    }

    function anda() { mostra(i + 1, false); }
    function para() { clearInterval(timer); sec.classList.add('parado'); }
    function reinicia() {
      clearInterval(timer);
      sec.classList.remove('parado');
      if (!SEM_MOTION) timer = setInterval(anda, TROCA);
    }

    sec.querySelector('[data-ant]').addEventListener('click', function () { mostra(i - 1, true); });
    sec.querySelector('[data-prox]').addEventListener('click', function () { mostra(i + 1, true); });

    sec.addEventListener('mouseenter', para);
    sec.addEventListener('mouseleave', reinicia);
    sec.addEventListener('focusin', para);
    sec.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { mostra(i - 1, true); }
      if (e.key === 'ArrowRight') { mostra(i + 1, true); }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) para(); else reinicia();
    });

    mostra(0);
  }

  /* ============================================================
     5. LEQUE — cartões com foto obrigatória
     ============================================================ */
  window.montaLeque = function (alvo, lista, grandePrimeiro) {
    /* Sem placa interna: o texto assenta direto sobre a foto e quem
       segura a leitura é a bruma do próprio cartão. Caixa dentro de
       caixa sobre imagem é moldura, não hierarquia. */
    alvo.innerHTML = lista.map(function (m, k) {
      var grande = grandePrimeiro && k === 0;
      return '<a class="peca' + (grande ? ' grande' : '') + '" href="materia.html">' +
        '<img class="peca-foto" src="' + m.img + '" alt="' + (m.alt || '') +
          '" loading="lazy" decoding="async" style="object-position:' + (m.foco || '50% 35%') + '">' +
        '<span class="et" data-cat="' + m.cat + '">' + m.cat + '</span>' +
        '<h3>' + m.titulo + '</h3>' +
        (grande ? '<p>' + m.chamada + '</p>' : '') +
        metaDe(m) +
      '</a>';
    }).join('');
  };

  /* ============================================================
     6. ROLO DE DISCOS — navegação por clique, e busca por era
     A versão anterior amarrava o trilho ao progresso da rolagem.
     Passava bonito e era inútil: não dava para parar num disco, que é
     exatamente o que se precisa fazer aqui, já que cada capa é um
     filtro de busca.

     Agora: clique na capa (ou nas setas das pontas) traz o disco para
     o centro e lista as Matérias daquele álbum. As setas desligam nos
     extremos — começa na primeira capa, termina na última.
     ============================================================ */
  function montaRolo() {
    var pista = document.querySelector('[data-pista]');
    var trilho = document.querySelector('[data-discos]');
    if (!trilho || !pista) return;

    var btnAnt = document.querySelector('[data-rolo-ant]');
    var btnProx = document.querySelector('[data-rolo-prox]');
    var caixa = document.querySelector('[data-rolo-result]');
    var dica = document.querySelector('[data-rolo-dica]');

    trilho.innerHTML = D.discos.map(function (d, k) {
      var arte = d.capa
        ? '<span class="cd-arte"><img src="' + d.capa + '" alt="Capa de ' + d.nome +
          '" loading="lazy" decoding="async"></span>'
        : '<span class="cd-arte vazia"><b>' + d.nome + '</b><small>capa pendente</small></span>';
      return '<button class="disco" type="button" data-i="' + k + '" aria-pressed="false">' +
        '<span class="cd">' +
          '<span class="cd-disco" aria-hidden="true"></span>' +
          '<span class="cd-caixa">' +
            '<span class="cd-lombada" aria-hidden="true"><i>Miley · ' + d.nome + '</i></span>' +
            arte +
            '<span class="cd-luz" aria-hidden="true"></span>' +
          '</span>' +
        '</span>' +
        '<span class="disco-pe"><span class="disco-nome">' + d.nome + '</span>' +
        '<span class="disco-ano">' + d.ano + '</span></span>' +
      '</button>';
    }).join('');

    var itens = [].slice.call(trilho.querySelectorAll('.disco'));
    var atual = 0;

    function porTransform() { return matchMedia('(min-width: 901px)').matches; }

    function posiciona(k) {
      var el = itens[k];
      if (!el) return;
      var centro = el.offsetLeft + el.offsetWidth / 2 - pista.clientWidth / 2;
      if (porTransform()) {
        var teto = Math.max(0, trilho.scrollWidth - pista.clientWidth);
        trilho.style.transform = 'translateX(' + (-Math.max(0, Math.min(teto, centro))) + 'px)';
      } else {
        /* No toque a pista é um container de rolagem de verdade. */
        pista.scrollTo({ left: Math.max(0, centro), behavior: SEM_MOTION ? 'auto' : 'smooth' });
      }
    }

    function seleciona(k, buscar) {
      atual = Math.max(0, Math.min(itens.length - 1, k));
      itens.forEach(function (el, j) {
        el.classList.toggle('on', j === atual);
        el.setAttribute('aria-pressed', String(j === atual));
      });
      btnAnt.disabled = atual <= 0;
      btnProx.disabled = atual >= itens.length - 1;
      posiciona(atual);
      if (buscar) mostraAlbum(D.discos[atual]);
    }

    /* ---- Busca por era ---- */
    function mostraAlbum(disco) {
      var achados = D.materias.filter(function (m) { return m.album === disco.id; });
      var corpo;

      if (achados.length) {
        corpo = '<div class="achados">' + achados.map(function (m) {
          return '<a class="achado" href="materia.html">' +
            '<img src="' + m.img + '" alt="" loading="lazy">' +
            '<span class="achado-txt"><b>' + m.titulo + '</b>' +
            '<small>' + m.cat + ' · ' + m.autor + ' · ' + m.data + '</small></span>' +
            '<span class="dur">' + m.leitura + '</span>' +
          '</a>';
        }).join('') + '</div>';
      } else {
        corpo = '<p class="rolo-vazio">Nenhuma Matéria do acervo está marcada com ' +
          '<strong>' + disco.nome + '</strong> ainda. A etiqueta de álbum é um campo novo do ' +
          'Painel: as 2.424 Matérias migradas precisam ser etiquetadas, e isso entra no ' +
          'relatório de exceções da migração.</p>';
      }

      caixa.innerHTML =
        '<div class="rolo-result-cab">' +
          '<h3>' + disco.nome + '</h3>' +
          '<span>' + disco.ano + ' · ' +
            (achados.length ? achados.length + (achados.length > 1 ? ' matérias' : ' matéria')
                            : 'nada marcado ainda') + '</span>' +
          '<button type="button" data-rolo-limpa>Fechar</button>' +
        '</div>' + corpo;
      caixa.hidden = false;
      if (dica) dica.hidden = true;

      caixa.querySelector('[data-rolo-limpa]').addEventListener('click', function () {
        caixa.hidden = true;
        caixa.innerHTML = '';
        if (dica) dica.hidden = false;
      });

      /* Só rola se o resultado nasceu fora do campo de visão. Rolar a
         página quando ela já mostra o que mudou é desorientador. */
      var r = caixa.getBoundingClientRect();
      if (r.bottom > innerHeight) caixa.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    trilho.addEventListener('click', function (ev) {
      var b = ev.target.closest && ev.target.closest('.disco');
      if (!b) return;
      seleciona(+b.dataset.i, true);
    });
    btnAnt.addEventListener('click', function () { seleciona(atual - 1, true); });
    btnProx.addEventListener('click', function () { seleciona(atual + 1, true); });

    trilho.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); seleciona(atual - 1, true); itens[atual].focus(); }
      if (ev.key === 'ArrowRight') { ev.preventDefault(); seleciona(atual + 1, true); itens[atual].focus(); }
    });

    addEventListener('resize', function () { posiciona(atual); });

    /* Começa na primeira capa, sem abrir resultado: a seção se
       apresenta antes de responder. */
    seleciona(0, false);
  }

  /* ============================================================
     7. QUADRO FLUTUANTE DE CIRCULAÇÃO
     Fixo: entra quando a leitura começa e fica até o fim da página. O
     botão recolhe, não dispensa — antes ele sumia para a sessão
     inteira, e atalho de navegação que some para sempre é atalho que
     não existe.
     ============================================================ */
  function montaDock() {
    var dock = document.querySelector('[data-dock]');
    if (!dock) return;

    dock.querySelector('[data-dock-lista]').innerHTML = D.materias.slice(3, 6).map(function (m) {
      return '<li><a href="materia.html">' +
        '<img src="' + m.img + '" alt="" loading="lazy">' +
        '<b>' + m.titulo + '</b></a></li>';
    }).join('');
    dock.hidden = false;

    var tog = dock.querySelector('[data-dock-toggle]');
    tog.addEventListener('click', function () {
      var enc = dock.classList.toggle('encolhido');
      tog.setAttribute('aria-expanded', String(!enc));
      tog.setAttribute('aria-label', enc ? 'Mostrar sugestões' : 'Recolher sugestões');
    });

    if (!window.ScrollTrigger) { dock.classList.add('aberto'); return; }
    ScrollTrigger.create({
      trigger: '[data-corpo]',
      start: 'top 55%',
      /* 99999, não 'max': com 'max' o gatilho desliga exatamente no
         último pixel de rolagem e o quadro sumia ao chegar no rodapé —
         justamente onde ele ainda faz falta. */
      end: 99999,
      onToggle: function (self) { dock.classList.toggle('aberto', self.isActive); }
    });
  }

  /* ============================================================
     8. REDES E PLATAFORMAS
     Um botão por rede, com o logo da própria rede. Duas listas
     distintas e que não devem ser confundidas:
       redes  -> perfis DO MCBR
       ouvir  -> plataformas da CANTORA para o álbum da Era Ativa
     ============================================================ */
  function botaoRede(item) {
    var ico = (window.MARCAS && window.MARCAS[item.rede]) || '';
    if (item.pendente) {
      return '<span class="canal pendente" aria-disabled="true">' + ico +
             item.nome + ' <em>endereço pendente</em></span>';
    }
    return '<a class="canal" href="' + item.url + '" target="_blank" rel="noopener">' +
           ico + item.nome + '</a>';
  }

  function montaRedes() {
    var r = document.querySelector('[data-redes]');
    if (r && D.redes) r.innerHTML = D.redes.map(botaoRede).join('');
    var o = document.querySelector('[data-ouvir]');
    if (o && D.ouvir) o.innerHTML = D.ouvir.map(botaoRede).join('');
  }

  /* ============================================================
     9. FEED DA MILEY
     Instagram e X lado a lado. O relógio conta desde o carregamento,
     que é o comportamento real de um feed: o leitor precisa saber a
     idade do que está vendo.

     ATENÇÃO, quem for ligar a fonte de verdade: é AQUI, em
     buscaFeed(). Ler perfil de terceiro automaticamente não é mais
     gratuito em nenhuma das duas plataformas — a API do Instagram que
     permitia isso morreu em dezembro de 2024 e o X cobra por leitura.
     As opções e os custos estão no LEIA-ME. O layout não muda: troca
     a função, não a seção.
     ============================================================ */
  function buscaFeed() {
    /* Hoje devolve o conteúdo de exemplo do conteudo.js. Quando a
       fonte for decidida, esta função vira um fetch e o resto segue
       igual — desde que devolva { instagram: {...}, x: {...} }. */
    return Promise.resolve(D.feed);
  }

  function montaFeed() {
    var alvo = document.querySelector('[data-feed]');
    if (!alvo) return;

    buscaFeed().then(function (feed) {
      if (!feed) return;
      /* Cada rede no formato que ela tem de verdade: o Instagram é uma
         grade de fotos quadradas, o X é uma lista de texto. Empilhar
         foto grande nos dois deixava as colunas com alturas
         completamente diferentes e um buraco do lado do X. */
      alvo.innerHTML = [
        { rede: 'instagram', nome: 'Instagram', corpo: grade },
        { rede: 'x', nome: 'X', corpo: lista }
      ].map(function (col) {
        var f = feed[col.rede];
        if (!f) return '';
        return '<div class="feed-col">' +
          '<div class="feed-cab">' + (window.MARCAS[col.rede] || '') +
            '<b>Miley Cyrus</b><span class="arroba">' + f.arroba + '</span>' +
            '<span class="feed-vivo"><i aria-hidden="true"></i>' +
            '<span data-feed-rel>agora</span></span>' +
          '</div>' +
          col.corpo(f) +
          '<a class="feed-pe" href="' + f.url + '" target="_blank" rel="noopener">' +
            'Ver o perfil no ' + col.nome + '</a>' +
        '</div>';
      }).join('');

      relogioDoFeed(alvo);
    });
  }

  /* Instagram: grade de quadrados. A legenda entra por cima no hover,
     e fica sempre visível no toque, onde hover não existe. */
  function grade(f) {
    return '<div class="feed-grade-ig">' + f.posts.map(function (po) {
      return '<a class="feed-tile" href="' + f.url + '" target="_blank" rel="noopener" ' +
        'aria-label="' + po.c.replace(/"/g, '&quot;') + ' — ' + po.quando + '">' +
        '<img src="' + po.img + '" alt="" loading="lazy" decoding="async">' +
        '<span class="feed-tile-txt">' + po.c + '</span></a>';
    }).join('') + '</div>';
  }

  /* X: lista de texto, que é o que o X é. */
  function lista(f) {
    return f.posts.map(function (po) {
      return '<a class="feed-post" href="' + f.url + '" target="_blank" rel="noopener">' +
        '<p>' + po.c + '</p><time>' + po.quando + '</time></a>';
    }).join('');
  }

  function relogioDoFeed(alvo) {
    var desde = Date.now();
    var marcas = alvo.querySelectorAll('[data-feed-rel]');
    function tique() {
      var min = Math.floor((Date.now() - desde) / 60000);
      var t = min < 1 ? 'agora' : (min === 1 ? 'há 1 min' : 'há ' + min + ' min');
      marcas.forEach(function (m) { m.textContent = t; });
    }
    tique();
    setInterval(tique, 30000);
  }

  /* ============================================================
     10. EFEITOS DE ROLAGEM
     Variados de propósito. Entrada idêntica em toda seção é o tique
     mais reconhecível de página gerada — então cada elemento ganha
     o gesto que faz sentido para ele: foto tem paralaxe, cartão tem
     chegada escalonada, intertítulo tem fio que se desenha.
     ============================================================ */
  function efeitosDeRolagem() {
    if (!window.gsap || !window.ScrollTrigger || SEM_MOTION) return;
    gsap.registerPlugin(ScrollTrigger);

    /* Paralaxe do pôster: a foto sobe mais devagar que a página.
       Só transform, e sobre um elemento com folga de 8% no topo. */
    var poster = document.querySelector('.poster-foto');
    if (poster) {
      gsap.to(poster, {
        yPercent: 9, ease: 'none',
        scrollTrigger: { trigger: '.poster', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    /* Respiro nas fotos do corpo: escala mínima enquanto cruzam a
       tela. O leitor não percebe o movimento, percebe que a página
       está viva. */
    gsap.utils.toArray('.leitura .fig img, .leitura .mt img').forEach(function (im) {
      gsap.fromTo(im, { scale: 1.06 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: im, start: 'top bottom', end: 'bottom top', scrub: .6 }
      });
    });

    /* Daqui para baixo mexe em opacidade: só com a aba visível. */
    quandoVisivel(function () {
      gsap.utils.toArray('.leque').forEach(function (g) {
        gsap.from(g.children, {
          opacity: 0, y: 26, duration: .7, stagger: .07, ease: 'power3.out',
          scrollTrigger: { trigger: g, start: 'top 82%', once: true }
        });
      });

      gsap.utils.toArray('.silencio .leitura h2').forEach(function (h) {
        gsap.fromTo(h, { '--fio': '0%' }, {
          '--fio': '100%', duration: .7, ease: 'power2.out',
          scrollTrigger: { trigger: h, start: 'top 85%', once: true }
        });
      });

      gsap.utils.toArray('.leitura .embed, .leitura .lista-posts, .leitura blockquote').forEach(function (el) {
        gsap.from(el, {
          opacity: 0, y: 22, duration: .6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      var inst = document.querySelector('.inst-grade');
      if (inst) {
        gsap.from(inst.children, {
          opacity: 0, y: 30, duration: .8, stagger: .12, ease: 'power3.out',
          scrollTrigger: { trigger: inst, start: 'top 84%', once: true }
        });
      }
    });
  }

  /* ============================================================
     11. CARREGAMENTO E TRANSIÇÃO DE PÁGINA
     A cortina sobe na saída e desce na chegada.

     O overlay se remove por animação CSS com prazo próprio. Se o
     JavaScript quebrar no meio, nada fica cobrindo o site: é o
     defeito mais caro possível numa página de leitura, e não pode
     depender de o script ter rodado até o fim.
     ============================================================ */
  function transicoes() {
    var load = document.querySelector('.carregando');
    if (load && document.visibilityState !== 'visible') {
      /* Aba de fundo: ninguém está vendo o carregamento, e a animação
         que retira o overlay congela em aba oculta — o leitor voltaria
         para uma tela meio coberta. Tira na hora. */
      load.remove();
    } else if (load) {
      var fecha = function () {
        if (!load) return;
        load.classList.add('pronto');
        var ir = load; load = null;
        setTimeout(function () { ir.remove(); }, 500);
      };
      if (document.readyState === 'complete') setTimeout(fecha, 420);
      else addEventListener('load', function () { setTimeout(fecha, 320); });
      setTimeout(fecha, 2600);   /* prazo final, aconteça o que acontecer */
    }

    var cortina = document.querySelector('.transicao');
    if (!cortina || SEM_MOTION) return;

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank' ||
          a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey ||
          a.host !== location.host) return;

      e.preventDefault();
      /* A página que chega lê esta marca ainda no <head> e já nasce
         com a cortina cobrindo, sem piscar o conteúdo antes. */
      try { sessionStorage.setItem('mcbr-tr', '1'); } catch (err) {}
      cortina.classList.add('entra');
      var ir = function () { location.href = href; };
      cortina.addEventListener('animationend', ir, { once: true });
      setTimeout(ir, 700);       /* prazo final */
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    /* Cortina de chegada em aba oculta: a animação que a retira fica
       congelada e o leitor encontraria a página coberta ao voltar.
       Some sem cerimônia — ninguém viu a entrada mesmo. */
    if (document.visibilityState !== 'visible') {
      document.documentElement.classList.remove('chegando');
    }

    cortinaDeLuz(document.querySelector('.cortina'));
    cabecalho();
    transicoes();

    montaPalco();
    montaRolo();
    montaRedes();
    montaFeed();
    montaDock();

    /* Uma tarefa depois, de propósito: o leque e o corpo da matéria são
       montados pelo script da própria página, que também escuta
       DOMContentLoaded e roda DEPOIS deste. Chamado aqui direto, o GSAP
       recebia uma coleção vazia e nenhum cartão ganhava chegada. */
    setTimeout(efeitosDeRolagem, 0);
  });
})();
