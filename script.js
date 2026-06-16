// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 500);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== TYPING EFFECT =====
const texts = [
    'Full-Stack Developer',
    'AI Enthusiast',
    'Open Source Contributor',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// ===== SKILLS ANIMATION ON SCROLL =====
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.width || '0%';
            // Trigger animation by setting width
            const targetWidth = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = targetWidth;
            }, 100);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => {
    // Store the original width
    const originalWidth = bar.style.width;
    bar.style.width = '0%';
    observer.observe(bar);
    // Restore width after a delay if already visible
    setTimeout(() => {
        if (isElementInViewport(bar)) {
            bar.style.width = originalWidth;
        }
    }, 300);
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon. 🚀');
    this.reset();
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
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

// ===== PARALLAX EFFECT ON HOME =====
window.addEventListener('scroll', () => {
    const home = document.querySelector('.home');
    const scrolled = window.scrollY;
    if (home) {
        home.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

console.log('🚀 Khurram\'s Portfolio Loaded Successfully!');
