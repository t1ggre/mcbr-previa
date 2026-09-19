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
  function montaContagem() {
    var el = document.querySelector('.mutirao .rel');
    if (!el || !D.mutirao) return;
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

  /* ---------- Corpo da matéria ---------- */
  window.montaCorpo = function (alvo) {
    alvo.innerHTML = D.corpo.map(function (b) {
      if (b.t === 'h2') return '<h2>' + b.c + '</h2>';
      if (b.t === 'q') return '<blockquote><p>“' + b.c + '”</p><cite>' + b.a + '</cite></blockquote>';
      return '<p>' + b.c + '</p>';
    }).join('');
  };

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    montaPular();
    montaSeletorEra();
    montaProgresso();
    montaContagem();
  });
})();
