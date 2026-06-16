// Loader
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });

        // Reveal on scroll animation
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // Skill bars animation
        const skillBars = document.querySelectorAll('.skill-progress');

        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (barTop < windowHeight - 50) {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                }
            });
        };

        window.addEventListener('scroll', animateSkillBars);
        window.addEventListener('load', animateSkillBars);

        // Project filter
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Testimonial slider
        const track = document.querySelector('.testimonial-track');
        const slides = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.dot');
        let currentIndex = 0;

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Auto slide
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 5000);

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // Typing effect for hero subtitle (optional enhancement)
        const heroSubtitle = document.querySelector('.hero-title span');
        const titles = ['Creative Developer', 'UI/UX Designer', 'Problem Solver'];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeEffect = () => {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        };

        // Start typing effect after page load
        setTimeout(typeEffect, 2000);

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

        // Parallax effect for hero background circles
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const circles = document.querySelectorAll('.hero-bg .circle');
            circles.forEach((circle, index) => {
                const speed = (index + 1) * 0.1;
                circle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    