/* MCBR · comportamento compartilhado pelas três direções.
   Regra de motion: um momento autoral por direção, mais estados de
   apoio que expliquem feedback ou relação. Nada de uma entrada
   idêntica em cada seção. Nada de listener de scroll na mão. */
(function () {
  var D = window.MCBR;
  var SEM_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.MCBR_SEM_MOTION = SEM_MOTION;

  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Era Ativa ---------- */
  var CORES = {
    'bass-persuades': '#FF2B2B',
    'something-beautiful': '#17D89B',
    'endless-summer': '#FF8A1F',
    'bangerz': '#FF3FC0'
  };

  function aplicaEra(id) {
    document.documentElement.setAttribute('data-era', id);
    try { localStorage.setItem('mcbr-era', id); } catch (e) {}
    document.querySelectorAll('.eras-ctrl button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.era === id));
    });
    document.querySelectorAll('[data-era-nome]').forEach(function (el) {
      el.textContent = D.eras[id].nome;
    });
    var tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute('content', '#09090B');
  }

  function montaSeletorEra() {
    var salva = D.eraAtiva;
    try { salva = localStorage.getItem('mcbr-era') || D.eraAtiva; } catch (e) {}
    if (!D.eras[salva]) salva = D.eraAtiva;

    var box = document.createElement('div');
    box.className = 'eras-ctrl';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Trocar a era visual do site');
    box.innerHTML = '<small aria-hidden="true">Era</small>';
    Object.keys(D.eras).forEach(function (id) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.era = id;
      b.style.setProperty('--c', CORES[id]);
      b.setAttribute('aria-label', 'Aplicar a era ' + D.eras[id].nome + ', de ' + D.eras[id].ano);
      b.addEventListener('click', function () { aplicaEra(id); });
      box.appendChild(b);
    });
    document.body.appendChild(box);
    aplicaEra(salva);
  }

  /* ---------- Pular para o conteúdo ---------- */
  function montaPular() {
    var alvo = document.querySelector('main, [data-artigo], article');
    if (!alvo) return;
    if (!alvo.id) alvo.id = 'conteudo';
    var a = document.createElement('a');
    a.className = 'pular';
    a.href = '#' + alvo.id;
    a.textContent = 'Pular para o conteúdo';
    document.body.prepend(a);
  }

  /* ---------- Progresso de leitura (ScrollTrigger, sem listener na mão) ---------- */
  function montaProgresso() {
    var bar = document.querySelector('.progresso');
    var art = document.querySelector('[data-artigo]');
    if (!bar || !art || !window.ScrollTrigger) return;
    ScrollTrigger.create({
      trigger: art,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function (self) { bar.style.width = (self.progress * 100) + '%'; }
    });
  }

  /* ---------- Contagem regressiva do mutirão ---------- */
  var contando = false;
  function montaContagem() {
    var el = document.querySelector('.mutirao .rel');
    if (!el || !D.mutirao || contando) return;
    contando = true;
    function upd() {
      var ms = new Date(D.mutirao.prazo) - new Date();
      if (ms <= 0) {
        var faixa = document.querySelector('.mutirao');
        if (faixa) faixa.remove();
        return;
      }
      var d = Math.floor(ms / 864e5);
      var h = Math.floor(ms % 864e5 / 36e5);
      el.textContent = d + ' dias e ' + h + ' horas';
    }
    upd();
    setInterval(upd, 60000);
  }

  window.montaFaixaMutirao = function (destino) {
    if (!D.mutirao || !D.mutirao.ativo) return;
    var f = document.createElement('div');
    f.className = 'mutirao';
    f.innerHTML = '<span>' + D.mutirao.texto + '</span>' +
                  '<span class="rel"></span>' +
                  '<a href="#">' + D.mutirao.cta + '</a>';
    destino.prepend(f);
    /* A contagem parte daqui, não do boot: a faixa é montada pela
       página e pode nascer depois do DOMContentLoaded — foi assim que
       o Palco ficou com a contagem vazia. */
    montaContagem();
  };

  /* ---------- Metadados: um separador por linha, no máximo ---------- */
  window.metaDe = function (m, opts) {
    opts = opts || {};
    var s = '<div class="meta"><b>' + m.autor + '</b>' +
            '<span class="sep" aria-hidden="true">·</span>' +
            '<time>' + (opts.longa ? m.data : m.dataCurta) + '</time>';
    if (m.leitura && opts.dur !== false) {
      s += '<span class="dur">' + m.leitura.replace(' ', ' ') + '</span>';
    }
    return s + '</div>';
  };

  /* ---------- Ícones da barra inferior (traço único, peso único) ---------- */
  var ICO = function (d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  };
  window.ICONES = {
    inicio:  ICO('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>'),
    colunas: ICO('<path d="M4 5h16M4 10h10M4 15h16M4 20h10"/>'),
    disco:   ICO('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4"/>'),
    mcbr:    ICO('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.2 2.7-5.4 6-5.4s6 2.2 6 5.4"/><path d="M16.5 6.2a3.2 3.2 0 0 1 0 6"/><path d="M18 14.9c2 .7 3.4 2.5 3.4 5.1"/>'),
    busca:   ICO('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>')
  };

  window.montaTabbar = function (ativa) {
    var itens = [
      { k: 'inicio', r: 'Início', h: 'index.html' },
      { k: 'colunas', r: 'Colunas', h: '#' },
      { k: 'disco', r: 'Discografia', h: '#' },
      { k: 'mcbr', r: 'MCBR', h: '#mcbr' },
      { k: 'busca', r: 'Buscar', h: '#' }
    ];
    var n = document.createElement('nav');
    n.className = 'tabbar';
    n.setAttribute('aria-label', 'Navegação principal');
    n.innerHTML = itens.map(function (it) {
      return '<a href="' + it.h + '"' + (it.k === ativa ? ' class="on" aria-current="page"' : '') + '>' +
             ICONES[it.k] + '<span>' + it.r + '</span></a>';
    }).join('');
    document.body.appendChild(n);
  };

  /* ---------- Rotativo de destaques ----------
     Troca de manchete é mudança de estado, então a transição explica
     o que mudou. Pausa no hover e no foco do teclado. */
  window.montaRotativo = function (raiz, render, intervalo) {
    var itens = D.banners, i = 0, timer, primeira = true;
    var pontos = raiz.parentElement.querySelector('[data-pontos]');
    var vivo = raiz.parentElement.querySelector('[data-vivo]');

    function pinta(n) {
      i = (n + itens.length) % itens.length;
      raiz.innerHTML = render(itens[i]);
      if (vivo) vivo.textContent = 'Destaque ' + (i + 1) + ' de ' + itens.length + ': ' + raiz.querySelector('h1,h2').textContent;
      /* A primeira pintura não anima aqui: o momento de chegada pertence
         à página, não ao rotativo. A partir da segunda, a transição
         explica que a manchete mudou. */
      if (!primeira && !SEM_MOTION && window.gsap) {
        gsap.fromTo(raiz.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: .55, stagger: .05, ease: 'power3.out', overwrite: true });
      }
      primeira = false;
      if (pontos) {
        pontos.querySelectorAll('button').forEach(function (b, k) {
          b.setAttribute('aria-current', String(k === i));
        });
      }
    }
    function anda() { pinta(i + 1); }
    function para() { clearInterval(timer); }
    function reinicia() { para(); if (!SEM_MOTION) timer = setInterval(anda, intervalo || 7000); }

    if (pontos) {
      itens.forEach(function (_, k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ver destaque ' + (k + 1));
        b.addEventListener('click', function () { pinta(k); reinicia(); });
        pontos.appendChild(b);
      });
    }
    pinta(0);
    reinicia();
    raiz.parentElement.addEventListener('mouseenter', para);
    raiz.parentElement.addEventListener('mouseleave', reinicia);
    raiz.parentElement.addEventListener('focusin', para);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) para(); else reinicia();
    });
  };

  /* ============================================================
     CORPO DA MATÉRIA
     Um renderizador por bloco do Painel. O nome entre parênteses é
     como o bloco se chama no WordPress, para que a conversa com a
     equipe e o código usem a mesma palavra.
     ============================================================ */

  function figLegenda(b) {
    if (!b.leg && !b.cred) return '';
    return '<figcaption>' + (b.leg || '') +
           (b.cred ? '<span class="cred">' + b.cred + '</span>' : '') +
           '</figcaption>';
  }

  /* Foto: sempre com proporção declarada no HTML. Sem width/height o
     navegador reflui a página quando a imagem chega e o leitor perde
     a linha que estava lendo. */
  function foto(src, alt, cls) {
    return '<img src="' + src + '" alt="' + (alt || '') + '"' +
           (cls ? ' class="' + cls + '"' : '') +
           ' loading="lazy" decoding="async">';
  }

  var MARCA = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.7 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.6L4.3 21H1l7.7-8.8L1.5 3h6.8l4.7 6.1zm-1.2 16h1.8L7.6 4.8H5.6z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.3 2h-3v13.2a2.9 2.9 0 1 1-2.4-2.85V9.3A6 6 0 1 0 16.3 15V8.9a7 7 0 0 0 4.2 1.4V7.2a4.2 4.2 0 0 1-4.2-4.2z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8l5.2 3.2z"/></svg>',
    spotify: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.4 14.5a.75.75 0 0 1-1 .25c-2.8-1.7-6.3-2.1-10.4-1.15a.75.75 0 1 1-.34-1.46c4.5-1.03 8.4-.58 11.5 1.32.35.22.46.68.24 1.04zm1.2-2.9a.94.94 0 0 1-1.3.3c-3.2-2-8.1-2.55-11.9-1.4a.94.94 0 0 1-.54-1.8c4.35-1.3 9.75-.68 13.43 1.6.44.27.58.85.3 1.3zm.1-3a1.12 1.12 0 0 1-1.54.37C12.4 8.66 6.6 8.45 3.9 9.28a1.12 1.12 0 1 1-.65-2.15c3.1-.94 9.5-.7 13.3 1.57.53.32.7 1 .38 1.53z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>',
    ytmusic: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.3a8.3 8.3 0 1 1 0-16.6 8.3 8.3 0 0 1 0 16.6zM9.7 8.1l6.3 3.9-6.3 3.9z"/></svg>',
    deezer: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<rect x="15.8" y="4"    width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="15.8" y="8.2"  width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="8.6"  y="8.2"  width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="15.8" y="12.4" width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="8.6"  y="12.4" width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="1.5"  y="12.4" width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="15.8" y="16.6" width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="8.6"  y="16.6" width="6.7" height="2.5" rx=".7"/>' +
      '<rect x="1.5"  y="16.6" width="6.7" height="2.5" rx=".7"/></svg>'
  };
  /* As mesmas marcas servem aos embeds da matéria e aos botões de rede
     da Home. Uma fonte só: logo desenhado duas vezes diverge. */
  window.MARCAS = MARCA;

  var REDE_NOME = { instagram: 'Instagram', x: 'X', tiktok: 'TikTok', youtube: 'YouTube', spotify: 'Spotify' };

  /* Fachada de embed social. O conteúdo de terceiro permanece hospedado
     na origem (ADR 0002): a fachada mostra o recorte e leva ao original.
     No site final o script oficial de cada rede substitui esta caixa. */
  function embedSocial(b) {
    return '<figure class="embed social" data-rede="' + b.rede + '">' +
      '<a class="embed-box" href="' + b.href + '" target="_blank" rel="noopener">' +
        '<div class="embed-topo">' +
          '<span class="embed-av" aria-hidden="true">M</span>' +
          '<div class="embed-quem"><b>' + b.autor + '</b><span>' + b.handle + '</span></div>' +
          '<span class="embed-marca" aria-hidden="true">' + MARCA[b.rede] + '</span>' +
        '</div>' +
        '<p class="embed-txt">' + b.c + '</p>' +
        (b.img ? '<div class="embed-foto">' + foto(b.img, '') + '</div>' : '') +
        '<div class="embed-pe"><time>' + b.data + '</time>' +
          '<span class="embed-ir">Ver no ' + REDE_NOME[b.rede] + '</span></div>' +
      '</a>' +
    '</figure>';
  }

  /* YouTube por clique. O iframe do YouTube pesa mais que a matéria
     inteira; entra só quando o leitor pede. */
  function embedYoutube(b) {
    return '<figure class="embed video" data-yt="' + b.id + '">' +
      '<button class="video-capa" type="button" aria-label="Reproduzir: ' + b.titulo + '">' +
        '<img src="https://i.ytimg.com/vi/' + b.id + '/maxresdefault.jpg" alt="" loading="lazy" decoding="async">' +
        '<span class="video-play" aria-hidden="true">' + MARCA.youtube + '</span>' +
      '</button>' +
      (b.leg ? '<figcaption>' + b.leg + '</figcaption>' : '') +
    '</figure>';
  }

  function embedSpotify(b) {
    return '<figure class="embed audio">' +
      '<iframe src="' + b.src + '" width="100%" height="352" frameborder="0" loading="lazy" ' +
      'title="' + b.titulo + '" allow="clipboard-write; encrypted-media; picture-in-picture"></iframe>' +
      (b.leg ? '<figcaption>' + b.leg + '</figcaption>' : '') +
    '</figure>';
  }

  /* Lista de posts: seleção manual ou por categoria, no meio do texto.
     É o bloco que mais segura o leitor dentro do site. */
  function listaPosts(b) {
    var itens = D.materias.slice(b.de || 0, b.ate || 4);
    return '<aside class="lista-posts">' +
      '<h3>' + (b.titulo || 'Leia também') + '</h3>' +
      '<ol>' + itens.map(function (m) {
        return '<li><a href="materia.html">' +
          '<span class="lp-foto">' + foto(m.img, '') + '</span>' +
          '<span class="lp-txt"><b>' + m.titulo + '</b>' +
          '<small>' + m.cat + ' · ' + m.dataCurta + '</small></span>' +
        '</a></li>';
      }).join('') + '</ol>' +
    '</aside>';
  }

  var BLOCO = {
    p:   function (b) { return '<p>' + b.c + '</p>'; },
    h2:  function (b) { return '<h2>' + b.c + '</h2>'; },
    q:   function (b) { return '<blockquote><p>“' + b.c + '”</p><cite>' + b.a + '</cite></blockquote>'; },
    sep: function () { return '<hr class="sep">'; },

    fig: function (b) {
      return '<figure class="fig">' + foto(b.src, b.alt) + figLegenda(b) + '</figure>';
    },
    'fig-larga': function (b) {
      return '<figure class="fig larga">' + foto(b.src, b.alt) + figLegenda(b) + '</figure>';
    },
    dupla: function (b) {
      return '<figure class="fig larga dupla"><div class="par">' +
        foto(b.a.src, b.a.alt) + foto(b.b.src, b.b.alt) +
        '</div>' + figLegenda(b) + '</figure>';
    },
    mt: function (b) {
      return '<div class="mt" data-lado="' + (b.lado || 'esq') + '">' +
        '<figure>' + foto(b.src, b.alt) + '</figure>' +
        '<div class="mt-txt">' + (b.titulo ? '<h3>' + b.titulo + '</h3>' : '') +
        '<p>' + b.c + '</p></div>' +
      '</div>';
    },
    lista: listaPosts,

    embed: function (b) {
      if (b.rede === 'youtube') return embedYoutube(b);
      if (b.rede === 'spotify') return embedSpotify(b);
      return embedSocial(b);
    }
  };

  window.montaCorpo = function (alvo) {
    alvo.innerHTML = D.corpo.map(function (b) {
      return (BLOCO[b.t] || BLOCO.p)(b);
    }).join('');

    /* Troca a capa pelo player só no clique. Delegado: os blocos são
       montados por JS e podem ser remontados. */
    alvo.addEventListener('click', function (ev) {
      var capa = ev.target.closest && ev.target.closest('.video-capa');
      if (!capa) return;
      var fig = capa.closest('.video');
      var id = fig.getAttribute('data-yt');
      var quadro = document.createElement('iframe');
      quadro.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      quadro.title = capa.getAttribute('aria-label').replace('Reproduzir: ', '');
      quadro.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
      quadro.setAttribute('allowfullscreen', '');
      quadro.frameBorder = '0';
      capa.replaceWith(quadro);
    });
  };

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    montaPular();
    montaSeletorEra();
    montaProgresso();
    montaContagem();
  });
})();
