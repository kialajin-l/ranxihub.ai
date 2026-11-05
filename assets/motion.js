/* ============================================================
   RanxiHub.AI - shared reveal motion (no dependencies, loaded with defer).
   Strategy: each <section> (or top-level .wrap blocks when no section exists)
   staggers its children in as it enters the viewport. Reduced-motion users get a static page.
   ============================================================ */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var root = document.documentElement;
  root.classList.add('motion-ready');

  /* ---- Reading progress bar ---- */
  var bar = document.createElement('div');
  bar.className = 'motion-progress';
  document.body.appendChild(bar);
  function updBar() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max * 100) : 0) + '%';
  }
  window.addEventListener('scroll', updBar, { passive: true });
  updBar();

  /* ---- Collect animation units: sections first, fall back to top-level .wrap blocks ---- */
  function inScope(el) {
    return !el.closest('header, footer, nav, script, style');
  }
  var units = [];
  var seen = new WeakSet();
  document.querySelectorAll('section, .project-hero, .hero, .head').forEach(function (s) {
    if (inScope(s) && !seen.has(s)) { seen.add(s); units.push(s); }
  });
  if (!units.length) {
    var wrap = document.querySelector('body > .wrap') || document.querySelector('main > .wrap');
    if (wrap) {
      Array.prototype.forEach.call(wrap.children, function (el) {
        if (inScope(el) && el.offsetHeight > 0) { seen.add(el); units.push(el); }
      });
    }
  }
  if (!units.length) return;

  /* ---- Stagger the child elements of each unit ---- */
  function prep(unit) {
    var i = 0;
    Array.prototype.forEach.call(unit.children, function (k) {
      if (/^(SCRIPT|STYLE|LINK|META|NOSCRIPT)$/.test(k.tagName)) return;
      if (!k.classList.contains('mrv')) {
        k.classList.add('mrv');
        k.style.setProperty('--d', Math.min(i * 0.08, 0.5).toFixed(2) + 's');
      }
      i++;
    });
  }
  units.forEach(prep);

  function reveal(unit) {
    /* Include nested .mrv descendants too; direct-child pages behave exactly as before. */
    Array.prototype.forEach.call(unit.querySelectorAll('.mrv'), function (k) {
      k.classList.add('in');
    });
  }

  if (!('IntersectionObserver' in window)) {
    units.forEach(reveal);
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      reveal(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  units.forEach(function (u) { io.observe(u); });

  /* ---- Fallback: force-show first-screen elements still hidden after 2.5s ---- */
  setTimeout(function () {
    document.querySelectorAll('.mrv:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
    });
  }, 2500);
})();
