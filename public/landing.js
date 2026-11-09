document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('mainNav');
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navProgress = document.querySelector('.nav-progress');

    // 1. Navbar scroll effect & Progress Bar
    let lastScrollY = -1;
    const updateNav = () => {
        const scrollY = window.scrollY;

        // Scrolled class
        if (scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Progress bar
        if (navProgress) {
            const winHeight = document.documentElement.scrollHeight - window.innerHeight;
            const p = winHeight > 0 ? scrollY / winHeight : 0;
            nav.style.setProperty('--p', Math.min(1, Math.max(0, p)));
        }
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY !== lastScrollY) {
            lastScrollY = window.scrollY;
            requestAnimationFrame(updateNav);
        }
    }, { passive: true });

    // Initial call
    updateNav();
    window.addEventListener('resize', updateNav);

    // 2. Mobile Menu Toggle
    const toggleMenu = (state) => {
        nav.classList.toggle('menu-open', state);
        navMenu.classList.toggle('open', state);
        navToggle.classList.toggle('open', state);
        navToggle.setAttribute('aria-expanded', state);
        document.body.classList.toggle('menu-open', state);

        const label = state ? "Fechar menu" : "Abrir menu";
        navToggle.setAttribute('aria-label', label);
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        toggleMenu(!isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close mobile menu on Esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            toggleMenu(false);
            navToggle.focus();
        }
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && navMenu.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navMenu.classList.contains('open')) {
            toggleMenu(false);
        }
    });

    // 3. Intersection Observer for Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Chart Animation
    const chartLine = document.querySelector('.chart-line');
    if (chartLine) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chartLine.classList.add('active');
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        const chartContainer = document.querySelector('.preview-chart');
        if (chartContainer) chartObserver.observe(chartContainer);
    }

    // 5. ScrollSpy
    const activeSections = new Set();
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.isIntersecting) {
                activeSections.add(id);
            } else {
                activeSections.delete(id);
            }
        });

        // Update active link after the batch
        let currentActive = null;
        activeSections.forEach(id => {
            if (document.querySelector(`.nav-link[href="#${id}"]`)) {
                currentActive = id;
            }
        });

        navLinks.forEach(link => {
            const id = link.getAttribute('href').substring(1);
            const isActive = id === currentActive;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }, {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Logo click closes menu
    document.querySelector('.nav-logo').addEventListener('click', () => {
        toggleMenu(false);
    });

    // Fallback for no IntersectionObserver
    if (!window.IntersectionObserver) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        if (chartLine) chartLine.classList.add('active');
    }
});
