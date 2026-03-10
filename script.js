document.addEventListener('DOMContentLoaded', () => {
    // === Sticky Navigation & Active Link ===
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active Link Highlighting
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // === Mobile Menu Toggle ===
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        });
    });

    // === Scroll Reveal Animation ===
    // Using Intersection Observer for performant scroll animations
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Trigger animations for elements visible on load
    setTimeout(() => {
        const firstViewElements = document.querySelectorAll('#home .reveal-up');
        firstViewElements.forEach(el => el.classList.add('active'));
    }, 100);

    // === Theme Toggler (Dark/Light Mode) ===
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = themeBtn.querySelector('i');
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('ph-moon', 'ph-sun');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }
    });

    // === 3D Profile Card Tilt Effect ===
    const profileCard = document.getElementById('profile3D');
    const glowLayer = document.querySelector('.glow-layer');
    
    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            // Calculate mouse position relative to card center (-1 to 1)
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            
            // Adjust maximum rotation angles (in degrees)
            const maxRotateX = 15;
            const maxRotateY = 15;
            
            const rotateX = -y * maxRotateX;
            const rotateY = x * maxRotateY;
            
            profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Move glow layer based on mouse position
            if (glowLayer) {
                glowLayer.style.opacity = '1';
                // Convert mouse position to percentage for background gradient
                const glowX = ((e.clientX - rect.left) / rect.width) * 100;
                const glowY = ((e.clientY - rect.top) / rect.height) * 100;
                glowLayer.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(56, 189, 248, 0.4) 0%, transparent 60%)`;
            }
        });

        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
            profileCard.style.transition = 'transform 0.5s ease';
            
            if (glowLayer) {
                glowLayer.style.opacity = '0';
            }
            
            // Reset transition after animation completes
            setTimeout(() => {
                profileCard.style.transition = 'transform 0.1s';
            }, 500);
        });
        
        profileCard.addEventListener('mouseenter', () => {
            profileCard.style.transition = 'none'; // Instant follow when mouse enters
        });
    }

    // === 3D All Cards Tilt Effect ===
    const interactiveCards = document.querySelectorAll('.project-card, .skill-category, .about-text, .detail-card, .timeline-content, .cert-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to card center (-1 to 1)
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            
            // Limit rotation for project cards (less intense than profile card)
            const maxRotateX = 10;
            const maxRotateY = 10;
            
            const rotateX = -y * maxRotateX;
            const rotateY = x * maxRotateY;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.5s ease, border-color 0.3s ease';
            
            // Reset transition delay
            setTimeout(() => {
                card.style.transition = 'transform 0.1s ease, border-color 0.3s ease';
            }, 500);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // Instant follow on initial enter for responsiveness
        });
    });
    // === Background Particles/Stars Animation ===
    const canvas = document.getElementById('starsCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 0.5; // Slightly larger for better visibility
                this.speedX = Math.random() * 0.5 - 0.25; // Gentle slow movement
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.3; // Base opacity
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges invisibly
                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;
            }
            
            draw() {
                // Adapt particle colors based on active theme
                const isLightMode = document.body.classList.contains('light-mode');
                const particleColor = isLightMode 
                    ? `rgba(15, 23, 42, ${this.opacity - 0.1})` // Darker particles for light mode
                    : `rgba(255, 255, 255, ${this.opacity})`;   // White particles for dark mode
                
                ctx.fillStyle = particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            // Calculate amount of particles relative to screen area
            const numParticles = Math.floor((width * height) / 9000); 
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            const isLightMode = document.body.classList.contains('light-mode');
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Draw connecting lines (constellations effect) if close together
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        const opacity = 0.15 - distance / 120 * 0.15;
                        
                        // Use dark slaty blue for light mode, bright cyan/sky blue for dark mode
                        ctx.strokeStyle = isLightMode 
                            ? `rgba(15, 23, 42, ${opacity * 1.5})` 
                            : `rgba(56, 189, 248, ${opacity})`; 
                            
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', resize);
        resize();
        animate();
    }
});
