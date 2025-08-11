document.addEventListener('DOMContentLoaded', function () {
    // ===== Project Modal Data =====
    const projectDetails = {
        project1: {
            title: "Electricity Billing System",
            description: 'A robust desktop application developed in Java for managing electricity billing. It features a user-friendly interface for customer management, bill generation, and payment tracking, with data persistence handled by MySQL. This project showcases my proficiency in Java Swing for GUI development and database management.',
            technologies: ["Java", "Swing", "MySQL"]
        },
        project2: {
            title: "Personal Portfolio Website",
            description: 'This is a responsive personal portfolio website built with HTML, CSS, and JavaScript. Its designed to showcase my skills, experience, and projects to potential employers or collaborators. The clean, modern design ensures a great user experience on all devices.',
            technologies: ["HTML5", "CSS3", "JavaScript"]
        },
        project3: {
            title: "Tic-Tac-toe Game",
            description: 'The game features a 3x3 grid where players take turns marking spaces until one player gets three in a row or the game ends in a draw. This project demonstrates foundational front-end development skills, including DOM manipulation, event handling, and conditional logic.',
            technologies: ["HTML", "CSS", "JavaScript"]
        },
        project4: {
            title: "Rock Paper Scissors Game",
            description: 'This project showcases my foundational front-end skills in implementing game logic, handling user input, and dynamically updating the interface to create an engaging experience.',
            technologies: ["HTML", "CSS", "JavaScript"]
        },
        project5: {
            title: "E-commerce Website",
            description: 'A fully responsive e-commerce website with a modern design. This project will focuse on building a seamless online shopping experience, including product filtering, a shopping cart, and dynamic content display demonstrating my skills in creating complex front-end web applications.',
            technologies: ["HTML", "CSS", "JavaScript"]
        }        
    };

    // ===== Mobile Nav Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Active Nav Link on Scroll =====
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - header.clientHeight - 50) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    });

    // ===== Projects Filter =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== Project Modal Handling =====
    const projectDetailsBtns = document.querySelectorAll(".project-details-btn");
    const modal = document.querySelector(".project-modal");
    const modalBody = modal.querySelector(".modal-body");
    const closeModalBtn = modal.querySelector(".close-modal");

    projectDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project-id'); 
            const project = projectDetails[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <h4>Technologies Used:</h4>
                    <ul>
                        ${project.technologies.map(tech => `<li>${tech}</li>`).join("")}
                    </ul>
                `;
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // ===== Footer Year =====
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ===== Animate on Scroll =====
    const animatedElements = document.querySelectorAll('.skills-content, .project-card, .contact-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const animateOnScroll = () => {
        animatedElements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (position < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
