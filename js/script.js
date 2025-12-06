document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');

            // Toggle hamburger icon animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in classes to elements
    const animatedElements = document.querySelectorAll('.hero-content > *, .glass-card, .logo-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el);
    });

    // Modal Handling
    const modal = document.getElementById('demo-modal');
    const demoBtns = document.querySelectorAll('a[href="#demo"]');
    const closeModal = document.querySelector('.close-modal');
    const demoForm = document.getElementById('demo-form');

    if (modal) {
        // Open Modal
        demoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close Modal
        const closeDemoModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeModal) {
            closeModal.addEventListener('click', closeDemoModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeDemoModal();
            }
        });

        // Form Submission
        if (demoForm) {
            demoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = demoForm.querySelector('button[type="submit"]');
                const originalText = btn.innerText;

                btn.innerText = 'Sending...';
                btn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert('Thanks for your interest! We will contact you shortly.');
                    closeDemoModal();
                    demoForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 1500);
            });
        }
    }
});
