// CV Download Function
function downloadCV() {
    const link = document.createElement('a');
    link.href = './cv_habtamu_alemu.pdf';
    link.download = 'cv_habtamu_alemu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const currentYearSpan = document.getElementById('current-year');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Hide loading screen after 1 second
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Initialize animations and interactions
        initializeAnimations();
        initializeNavigation();
        initializeSkillBars();
    }, 1000);
});

// Navigation functionality
function initializeNavigation() {
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Hero buttons
    const heroButtons = document.querySelectorAll('[data-section]');
    heroButtons.forEach(button => {
        button.addEventListener('click', handleNavClick);
    });
}

function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

function handleNavClick(event) {
    const sectionId = event.target.getAttribute('data-section');
    if (sectionId) {
        event.preventDefault();
        scrollToSection(sectionId);
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger skill bar animations if this is the skills section
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    
    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, index * 100);
    });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.getAttribute('href') && event.target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Form handling (if needed in the future)
function handleFormSubmit(event) {
    event.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleHeaderScroll, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Close mobile menu on Escape key
    if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Add loading states for external links
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.href.startsWith('mailto:')) {
        // Add visual feedback for email links
        event.target.style.opacity = '0.7';
        setTimeout(() => {
            event.target.style.opacity = '1';
        }, 200);
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// lazyLoadImages();

// Console message for developers
console.log('🚀 Portfolio website loaded successfully!');
console.log('💼 Habtamu Alemu Abdi - IT Professional');
console.log('📧 Contact: qalu112233@gmail.com');
console.log('📄 CV Download functionality is ready!');