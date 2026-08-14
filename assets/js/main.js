/* Tetralane — landing page interactions */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky nav shadow ---- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('is-stuck', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- scroll reveal ---- */
  var revealables = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var siblings = Array.prototype.slice.call(entry.target.parentNode.children);
        var i = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = Math.min(i, 6) * 70 + 'ms';
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- animated stat counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  var runCounter = function (el) {
    var target = parseFloat(el.dataset.count) || 0;
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    if (reduced || target === 0) {
      el.textContent = prefix + (target || '') + suffix;
      return;
    }
    var start = performance.now();
    var dur = 1300;
    var tick = function (now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---- sticky mobile CTA: on once the hero buttons scroll away,
         off again over the real CTA so the two never stack ---- */
  var sticky = document.getElementById('stickycta');
  var heroActions = document.querySelector('.hero__actions');
  var demo = document.getElementById('demo');
  if (sticky && heroActions && demo && 'IntersectionObserver' in window) {
    var pastHero = false;
    var atDemo = false;
    var paint = function () {
      var on = pastHero && !atDemo;
      sticky.classList.toggle('is-on', on);
      sticky.setAttribute('aria-hidden', String(!on));
      var link = sticky.querySelector('a');
      if (link) link.tabIndex = on ? 0 : -1;
    };
    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
      paint();
    }, { threshold: 0 }).observe(heroActions);
    new IntersectionObserver(function (entries) {
      atDemo = entries[0].isIntersecting;
      paint();
    }, { threshold: 0.12 }).observe(demo);
  }

  /* ---- demo form ---- */
  var form = document.getElementById('cta-form');
  var note = document.getElementById('cta-note');
  var success = document.getElementById('cta-success');
  var noteDefault = note.textContent;
  var input = form.querySelector('input');
  var valid = function (v) { return /^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(v); };

  input.addEventListener('input', function () {
    if (!form.classList.contains('is-invalid')) return;
    if (valid(input.value.trim())) {
      form.classList.remove('is-invalid');
      note.classList.remove('is-error');
      note.textContent = noteDefault;
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (!valid(value)) {
      form.classList.add('is-invalid');
      note.classList.add('is-error');
      note.textContent = 'Please enter a valid work email address.';
      input.focus();
      return;
    }
    document.getElementById('cta-email').textContent = value;
    form.hidden = true;
    success.hidden = false;
    success.setAttribute('tabindex', '-1');
    success.focus({ preventScroll: true });
  });

  /* ---- footer year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
