/* Portfolio interactions: theme, navigation and discipline filters. */
(function () {
    'use strict';
    const root = document.documentElement;
    root.classList.add('js');
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

    const nav = document.getElementById('nav');
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav__link'));
    let scrollPending = false;
    function updateNavigation() {
        if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);
        let active = 'about';
        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= 110) active = section.id;
        });
        if (sections.length && window.scrollY > 0 &&
            window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
            active = sections[sections.length - 1].id;
        }
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

})();
