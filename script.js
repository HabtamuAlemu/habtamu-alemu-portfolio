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
const certificateModal = document.getElementById('certificate-modal');

// Certificate data with actual file names
const certificateData = {
    'ai-fundamentals': {
        title: 'Artificial Intelligence Fundamentals',
        provider: 'Cisco Networking Academy',
        image: './AI.png',
        downloadUrl: './AI.png'
    },
    'android-fundamentals': {
        title: 'Android Developer Fundamentals',
        provider: 'Cisco Networking Academy',
        image: './Android_fundamental.png',
        downloadUrl: './Android_fundamental.png'
    },
    'computer-hardware': {
        title: 'Computer Hardware Basics',
        provider: 'Cisco Networking Academy',
        image: './computer_hardware.png',
        downloadUrl: './computer_hardware.png'
    },
    'digital-awareness': {
        title: 'Digital Awareness',
        provider: 'Cisco Networking Academy',
        image: './digital_awarenes.png',
        downloadUrl: './digital_awarenes.png'
    },
    'cyber-threat': {
        title: 'Cyber Threat Management',
        provider: 'Cisco Networking Academy',
        image: './cyber_threat_management.png',
        downloadUrl: './cyber_threat_managment.png'
    },
    'endpoint-security': {
        title: 'Endpoint Security',
        provider: 'Cisco Networking Academy',
        image: './Endpoint_security.png',
        downloadUrl: './Endpoint_security.png'
    },
    'graphics-design': {
        title: 'Graphics Design',
        provider: 'Cisco Networking Academy',
        image: './Graphics_Design.jpg',
        downloadUrl: './Graphics_Design.jpg'
    },
    'huawei-seeds': {
        title: 'Huawei Seeds for the Future Program 2023-2024',
        provider: 'Huawei Seeds for the Future',
        image: './Huwaie Seed for the future.jpg',
        downloadUrl: './Huwaie Seed for the future.jpg'
    },
    'network-defense': {
        title: 'Network Defense',
        provider: 'Cisco Networking Academy',
        image: './Network_defence.png',
        downloadUrl: './Network_defence.png'
    },
    'programming-fundamentals': {
        title: 'Programming Fundamentals',
        provider: 'Udacity',
        image: './Programming_fundamental.png',
        downloadUrl: './Programming_fundamental.png'
    },
    'data-analysis': {
        title: 'Data Analysis Fundamentals',
        provider: 'Cisco Networking Academy',
        image: './Data_analysis.png',
        downloadUrl: './Data_analysis.png'
    }
};

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

// Certificate Modal Functions
function openCertificate(certId) {
    const cert = certificateData[certId];
    if (!cert) return;
    
    // Update modal content
    document.getElementById('modal-title').textContent = cert.title;
    document.getElementById('modal-provider').textContent = cert.provider;
    
    // Show certificate image
    const certificateImage = document.getElementById('certificate-image');
    const certificatePlaceholder = document.getElementById('certificate-placeholder');
    
    if (cert.image) {
        certificateImage.src = cert.image;
        certificateImage.style.display = 'block';
        certificatePlaceholder.style.display = 'none';
        
        // Handle image load error
        certificateImage.onerror = function() {
            certificateImage.style.display = 'none';
            certificatePlaceholder.style.display = 'block';
        };
    } else {
        certificateImage.style.display = 'none';
        certificatePlaceholder.style.display = 'block';
    }
    
    // Store current certificate for download
    certificateModal.dataset.currentCert = certId;
    
    // Show modal with animation
    certificateModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close
    certificateModal.addEventListener('click', handleModalClick);
}

function closeCertificate() {
    certificateModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Remove click outside handler
    certificateModal.removeEventListener('click', handleModalClick);
}

function handleModalClick(event) {
    if (event.target === certificateModal || event.target.classList.contains('modal-overlay')) {
        closeCertificate();
    }
}

function downloadCertificate() {
    const certId = certificateModal.dataset.currentCert;
    const cert = certificateData[certId];
    
    if (cert && cert.downloadUrl) {
        const link = document.createElement('a');
        link.href = cert.downloadUrl;
        link.download = `${cert.title.replace(/\s+/g, '_')}_Certificate`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // Show a message that certificate download is not available
        alert('Certificate download is not available at the moment. Please contact for a copy.');
    }
}

// Keyboard support for modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && certificateModal.classList.contains('active')) {
        closeCertificate();
    }
});

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
    
    // Close modal on small screens if needed
    if (window.innerWidth < 640 && certificateModal.classList.contains('active')) {
        // Adjust modal for mobile if needed
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

// Console message for developers
console.log('🚀 Portfolio website loaded successfully!');
console.log('💼 Habtamu Alemu Abdi - IT Professional');
console.log('📧 Contact: qalu112233@gmail.com');
console.log('📄 CV Download functionality is ready!');
console.log('🏆 Certificate viewer functionality activated!');