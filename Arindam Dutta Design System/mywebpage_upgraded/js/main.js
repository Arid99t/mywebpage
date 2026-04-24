// ==================== NAVIGATION ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop;
        if (pageYOffset >= top - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// ==================== SCROLL-REACTIVE BACKDROP ====================
// Inserts SVG hardware/research motifs behind Research & Projects sections
// and drifts them vertically on scroll at per-motif k-rates.

const MOTIF_SETS = {
    research: [
        { // sine wave
            vb: '0 0 180 120', size: 180,
            d: 'M10 60 Q 30 40 50 60 T 90 60 T 130 60 T 170 60',
            x: '6%', y: '14%', k: 0.15, rot: 0
        },
        { // flask
            vb: '0 0 70 80', size: 90,
            d: 'M35 5v18l-18 36a9 9 0 0 0 8 14h20a9 9 0 0 0 8-14l-18-36V5 M30 5h18 M22 46h26',
            x: '88%', y: '60%', k: 0.22, rot: 8
        },
        { // metronome
            vb: '0 0 60 100', size: 110,
            d: 'M15 85 L30 15 L45 85 Z M30 40 l10 0',
            x: '12%', y: '68%', k: -0.12, rot: 0
        },
        { // cpu
            vb: '0 0 24 24', size: 90,
            d: 'M4 4h16v16H4z M9 9h6v6H9z M15 2v2 M15 20v2 M2 15h2 M2 9h2 M20 15h2 M20 9h2 M9 2v2 M9 20v2',
            x: '72%', y: '8%', k: 0.18, rot: -6
        },
        { // book
            vb: '0 0 24 24', size: 80,
            d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
            x: '48%', y: '4%', k: 0.08, rot: 10
        },
    ],
    projects: [
        { // headset
            vb: '0 0 24 24', size: 120,
            d: 'M3 11a9 9 0 0 1 18 0 v3a1 1 0 0 1-1 1h-2v-5 M3 11v3a1 1 0 0 0 1 1h2v-5 M18 15v2a2 2 0 0 1-2 2h-3',
            x: '4%', y: '20%', k: 0.20, rot: -4
        },
        { // VR goggles
            vb: '0 0 52 52', size: 130,
            d: 'M4 20 h36 a8 8 0 0 1 8 8 v8 a8 8 0 0 1 -8 8 h-32 a8 8 0 0 1 -8 -8 v-8 a8 8 0 0 1 4 -8z M14 32 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M34 32 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0',
            x: '82%', y: '60%', k: 0.24, rot: 6
        },
        { // activity / signal
            vb: '0 0 24 24', size: 140,
            d: 'M2 12h4 l2 -6 l4 12 l3 -8 l2 2 h5',
            x: '10%', y: '72%', k: -0.10, rot: 0
        },
        { // code brackets
            vb: '0 0 24 24', size: 100,
            d: 'M16 18 l6 -6 l-6 -6 M8 6 l-6 6 l6 6',
            x: '52%', y: '10%', k: 0.06, rot: 4
        },
        { // cpu
            vb: '0 0 24 24', size: 90,
            d: 'M4 4h16v16H4z M9 9h6v6H9z M15 2v2 M15 20v2 M2 15h2 M2 9h2 M20 15h2 M20 9h2 M9 2v2 M9 20v2',
            x: '74%', y: '12%', k: 0.16, rot: -8
        },
    ]
};

function buildMotif(motif) {
    const el = document.createElement('div');
    el.className = 'motif';
    el.style.left = motif.x;
    el.style.top = motif.y;
    el.style.width = motif.size + 'px';
    el.style.height = motif.size + 'px';
    el.dataset.k = motif.k;
    el.dataset.rot = motif.rot || 0;
    el.innerHTML = `<svg viewBox="${motif.vb}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="${motif.d}"/></svg>`;
    return el;
}

function attachBackdrop(sectionSelector, motifSet) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;
    const bg = document.createElement('div');
    bg.className = 'scroll-bg';
    motifSet.forEach(m => bg.appendChild(buildMotif(m)));
    section.insertBefore(bg, section.firstChild);
    section.style.position = section.style.position || 'relative';
    return bg;
}

const backdrops = [];
document.addEventListener('DOMContentLoaded', () => {
    const a = attachBackdrop('#research', MOTIF_SETS.research);
    const b = attachBackdrop('#projects', MOTIF_SETS.projects);
    if (a) backdrops.push(a);
    if (b) backdrops.push(b);
});

function updateBackdrops() {
    const vh = window.innerHeight;
    backdrops.forEach(bg => {
        const section = bg.parentElement;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        // progress: -1 above viewport, +1 below
        const progress = (vh / 2 - rect.top) / vh;
        bg.querySelectorAll('.motif').forEach(m => {
            const k = parseFloat(m.dataset.k);
            const rot = parseFloat(m.dataset.rot);
            const shift = progress * 160 * k;
            m.style.transform = `translate3d(0, ${shift}px, 0) rotate(${rot}deg)`;
        });
    });
}
window.addEventListener('scroll', updateBackdrops, { passive: true });
window.addEventListener('resize', updateBackdrops);
setTimeout(updateBackdrops, 50);

// ==================== SCROLL FADE-IN ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card, .research-card, .skill-category, .edu-card, .highlight-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ==================== MODAL (preserved from original) ====================
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

console.log('✓ Portfolio loaded — glass buttons + scroll backdrop active');
