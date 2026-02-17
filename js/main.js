// ==================== NAVIGATION ====================
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== PROJECT MODAL ====================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// Project data - Replace with your actual project data
const projectData = {
    1: {
        title: "Project Title One",
        description: "This is a detailed description of your first project. Add comprehensive information about the research, methodology, findings, and impact.",
        image: "assets/images/project-placeholder-1.jpg",
        video: "assets/videos/project-video-1.mp4",
        tags: ["Research", "Tech", "Innovation"],
        details: [
            "Key finding or achievement 1",
            "Key finding or achievement 2",
            "Key finding or achievement 3"
        ]
    },
    2: {
        title: "Project Title Two",
        description: "This is a detailed description of your second project. Add comprehensive information about the research, methodology, findings, and impact.",
        image: "assets/images/project-placeholder-2.jpg",
        video: "assets/videos/project-video-2.mp4",
        tags: ["Innovation", "Design", "Analysis"],
        details: [
            "Key finding or achievement 1",
            "Key finding or achievement 2",
            "Key finding or achievement 3"
        ]
    },
    3: {
        title: "Project Title Three",
        description: "This is a detailed description of your third project. Add comprehensive information about the research, methodology, findings, and impact.",
        image: "assets/images/project-placeholder-3.jpg",
        video: "assets/videos/project-video-3.mp4",
        tags: ["Data", "Analysis", "Research"],
        details: [
            "Key finding or achievement 1",
            "Key finding or achievement 2",
            "Key finding or achievement 3"
        ]
    }
};

function openProject(projectId) {
    const project = projectData[projectId];

    if (!project) return;

    let detailsList = project.details.map(detail => `<li>${detail}</li>`).join('');
    let tagsList = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    modalBody.innerHTML = `
        <h2 style="font-size: 2.5rem; color: var(--color-primary); margin-bottom: 1rem;">${project.title}</h2>

        <div class="project-tags" style="margin-bottom: 2rem;">
            ${tagsList}
        </div>

        <div style="margin-bottom: 2rem;">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; max-height: 400px; object-fit: cover; border: 2px solid var(--color-primary);">
        </div>

        <div style="margin-bottom: 2rem;">
            <video controls style="width: 100%; border: 2px solid var(--color-secondary);">
                <source src="${project.video}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-top: 0.5rem; font-style: italic;">
                Replace with your actual video file
            </p>
        </div>

        <p style="color: var(--color-text-muted); line-height: 1.8; margin-bottom: 2rem; font-size: 1.1rem;">
            ${project.description}
        </p>

        <h3 style="color: var(--color-secondary); margin-bottom: 1rem;">Key Highlights</h3>
        <ul style="color: var(--color-text-muted); line-height: 2; margin-left: 2rem; margin-bottom: 2rem;">
            ${detailsList}
        </ul>

        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid var(--color-border);">
            <h3 style="color: var(--color-secondary); margin-bottom: 1rem;">Additional Resources</h3>
            <p style="color: var(--color-text-muted);">
                Add links to papers, GitHub repos, datasets, or other relevant resources here.
            </p>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal when clicking X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ==================== ANIMATIONS ====================
// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project and blog cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .blog-card');

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ==================== UTILITY FUNCTIONS ====================
// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('🎸 Punk Research Website Loaded Successfully!');
