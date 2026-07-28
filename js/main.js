/* =====================================================================
   Arindam Dutta — Portfolio interactions
   ===================================================================== */
(function () {
    'use strict';

    const root = document.documentElement;

    /* ---------- Theme toggle (persisted) ---------- */
    const THEME_KEY = 'ad-theme';
    const toggle = document.getElementById('themeToggle');

    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
        root.setAttribute('data-theme', stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        root.setAttribute('data-theme', 'light');
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);
        });
    }

    /* ---------- Mobile nav ---------- */
    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');

    function closeMenu() {
        if (!links) return;
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
    }

    if (burger && links) {
        burger.addEventListener('click', function () {
            const open = links.classList.toggle('is-open');
            burger.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', String(open));
        });
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeMenu);
        });
    }

    /* ---------- Nav background on scroll ---------- */
    const nav = document.getElementById('nav');
    const onScroll = function () {
        if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Project filtering ---------- */
    const filterBar = document.getElementById('filters');
    const cards = Array.prototype.slice.call(document.querySelectorAll('#workGrid .card--project'));

    if (filterBar) {
        filterBar.addEventListener('click', function (e) {
            const btn = e.target.closest('.filter');
            if (!btn) return;

            filterBar.querySelectorAll('.filter').forEach(function (b) {
                b.classList.toggle('is-active', b === btn);
            });

            const cat = btn.getAttribute('data-filter');
            cards.forEach(function (card) {
                const cats = (card.getAttribute('data-cat') || '').split(/\s+/);
                const show = cat === 'all' || cats.indexOf(cat) !== -1;
                card.classList.toggle('is-hidden', !show);
            });
        });
    }

    /* ---------- Scroll reveal ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* ---------- Active nav link on scroll ---------- */
    const sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
                });
            });
        }, { threshold: 0.5 });
        sections.forEach(function (s) { spy.observe(s); });
    }
})();
