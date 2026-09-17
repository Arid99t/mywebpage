/* Portfolio interactions: theme, navigation and discipline filters. */
(function () {
    'use strict';
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themePreference = window.matchMedia('(prefers-color-scheme: dark)');
    let explicitTheme = false;
    try { explicitTheme = /^(light|dark)$/.test(localStorage.getItem('ad-theme')); } catch (_) {}

    function applyTheme(theme) {
        root.dataset.theme = theme;
        if (themeToggle) {
            const label = 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode';
            themeToggle.setAttribute('aria-label', label);
            themeToggle.title = label;
        }
    }
    applyTheme(root.dataset.theme);
    if (themeToggle) themeToggle.addEventListener('click', function () {
        const next = root.dataset.theme === 'light' ? 'dark' : 'light';
        explicitTheme = true;
        applyTheme(next);
        try { localStorage.setItem('ad-theme', next); } catch (_) {}
    });
    themePreference.addEventListener('change', function (event) {
        if (!explicitTheme) applyTheme(event.matches ? 'dark' : 'light');
    });

    const burger = document.getElementById('navBurger');
    const links = document.getElementById('navLinks');
    function closeMenu(returnFocus) {
        if (!burger || !links) return;
        const wasOpen = links.classList.contains('is-open');
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
        if (returnFocus && wasOpen) burger.focus();
    }
    if (burger && links) {
        burger.addEventListener('click', function () {
            const open = links.classList.toggle('is-open');
            burger.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', String(open));
            burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });
        links.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { closeMenu(false); });
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu(true);
        });
        document.addEventListener('click', function (event) {
            if (!event.target.closest('#nav')) closeMenu(false);
        });
        window.matchMedia('(min-width: 801px)').addEventListener('change', function (event) {
            if (event.matches) closeMenu(false);
        });
    }

    const nav = document.getElementById('nav');
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav__link'));
    let scrollPending = false;
    function updateNavigation() {
        if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);
        let active = 'hero';
        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= 150) active = section.id;
        });
        navLinks.forEach(function (link) {
            const selected = link.hash === '#' + active;
            link.classList.toggle('is-active', selected);
            if (selected) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
        scrollPending = false;
    }
    window.addEventListener('scroll', function () {
        if (!scrollPending) {
            scrollPending = true;
            requestAnimationFrame(updateNavigation);
        }
    }, { passive: true });
    updateNavigation();

    const filterBar = document.getElementById('filters');
    const projects = Array.from(document.querySelectorAll('#work article[data-cat]'));
    const filterSummary = document.getElementById('filterSummary');
    function filterProjects(category) {
        if (!filterBar) return;
        let count = 0;
        let name = 'All projects';
        filterBar.querySelectorAll('.filter').forEach(function (button) {
            const selected = button.dataset.filter === category;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
            if (selected) name = button.textContent;
        });
        projects.forEach(function (project) {
            const visible = category === 'all' || project.dataset.cat.split(/\s+/).includes(category);
            project.hidden = !visible;
            if (visible) count++;
        });
        if (filterSummary) filterSummary.textContent = name + ' · ' + count + (count === 1 ? ' project' : ' projects');
    }
    if (filterBar) {
        filterBar.addEventListener('click', function (event) {
            const button = event.target.closest('.filter');
            if (button) filterProjects(button.dataset.filter);
        });
        document.querySelectorAll('[data-focus]').forEach(function (link) {
            link.addEventListener('click', function () { filterProjects(link.dataset.focus); });
        });
        filterProjects('all');
    }

    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });
        document.querySelectorAll('.reveal').forEach(function (element) { observer.observe(element); });
    }
})();
