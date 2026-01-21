// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling removed (requested): allow default anchor jump behavior

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Scroll-triggered Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .tech-item, .stat-item, .info-item, .team-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact Form Validation and Handling with localStorage
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // ======== Store in localStorage ========
        const formData = { name, email, subject, message, date: new Date().toLocaleString() };
        let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        // ======== End localStorage ========

        // Simulate form submission (existing behavior)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}


// Parallax effect removed (requested)

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Toggle theme function
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update icon based on theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

// Add event listener to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Technology Modal Functionality
const techModal = document.getElementById('techModal');
const modalClose = document.getElementById('modalClose');
const techItems = document.querySelectorAll('.tech-item');

// Technology data structure
const technologyData = {
    ai: {
        title: 'Artificial Intelligence',
        description: 'Our AI-powered solutions leverage machine learning and deep learning algorithms to revolutionize healthcare diagnostics and treatment planning. We develop intelligent systems that analyze medical data with unprecedented accuracy and speed.',
        features: [
            'Machine learning algorithms for disease detection',
            'Predictive analytics for patient risk assessment',
            'Natural language processing for medical records analysis',
            'Computer vision for medical image interpretation',
            'Real-time clinical decision support systems'
        ],
        useCases: [
            'Early cancer detection through image analysis',
            'Patient readmission risk prediction',
            'Personalized treatment plan generation',
            'Drug discovery acceleration',
            'Clinical trial patient matching'
        ],
        benefits: [
            'Improved diagnostic accuracy and consistency',
            'Reduced healthcare costs through early intervention',
            'Faster time-to-diagnosis for better patient outcomes',
            'Enhanced physician decision-making capabilities',
            'Increased operational efficiency in healthcare facilities'
        ]
    },
    cloud: {
        title: 'Cloud Computing',
        description: 'Our cloud infrastructure provides healthcare organizations with secure, scalable, and reliable solutions for managing vast amounts of medical data. Built with HIPAA compliance and enterprise-grade security.',
        features: [
            'HIPAA-compliant cloud infrastructure',
            'Auto-scaling to handle peak demand',
            'Multi-region redundancy for disaster recovery',
            'Advanced encryption for data protection',
            'Real-time backup and data synchronization'
        ],
        useCases: [
            'Electronic Health Records (EHR) hosting',
            'Telemedicine platform infrastructure',
            'Medical imaging storage and retrieval',
            'Patient data analytics and reporting',
            'Healthcare application deployment'
        ],
        benefits: [
            'Reduced on-premise infrastructure costs',
            'Improved system uptime and reliability',
            'Scalable capacity for growing data needs',
            'Faster deployment of new healthcare applications',
            'Enhanced data accessibility for authorized users'
        ]
    },
    iot: {
        title: 'IoT Integration',
        description: 'Our Internet of Things solutions connect medical devices and wearables to create a comprehensive patient monitoring ecosystem. Real-time data collection enables proactive healthcare intervention.',
        features: [
            'Wireless connectivity for medical devices',
            'Real-time patient vital signs monitoring',
            'Integration with wearable health trackers',
            'Smart alert system for critical conditions',
            'Device data aggregation and analysis'
        ],
        useCases: [
            'Remote patient monitoring in chronic disease management',
            'Post-surgical patient recovery tracking',
            'Elderly care and fall detection systems',
            'Fitness and wellness program monitoring',
            'Clinical trial data collection'
        ],
        benefits: [
            'Continuous patient health monitoring 24/7',
            'Early detection of health deterioration',
            'Reduced hospital readmissions',
            'Improved patient engagement and compliance',
            'Cost savings through preventive care'
        ]
    },
    blockchain: {
        title: 'Blockchain Security',
        description: 'Our blockchain-based solutions create immutable, transparent, and secure health records. Every transaction is cryptographically verified, ensuring data integrity and patient privacy.',
        features: [
            'Immutable health record creation',
            'Distributed ledger for transparency',
            'Cryptographic data integrity verification',
            'Smart contracts for healthcare processes',
            'Decentralized patient data ownership'
        ],
        useCases: [
            'Secure medical record sharing between providers',
            'Pharmaceutical supply chain verification',
            'Patient consent and authorization management',
            'Medical credential verification',
            'Healthcare insurance claims processing'
        ],
        benefits: [
            'Unbreakable data security and privacy',
            'Patient full control of their health data',
            'Reduced medical fraud and errors',
            'Streamlined healthcare provider collaboration',
            'Transparent and auditable healthcare transactions'
        ]
    }
};

// Open modal when tech item is clicked
techItems.forEach(item => {
    item.addEventListener('click', () => {
        const techId = item.getAttribute('data-tech-id');
        const data = technologyData[techId];
        
        if (data) {
            populateModal(data);
            techModal.classList.add('active');
        }
    });
});

// Populate modal with technology data
function populateModal(data) {
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    
    // Populate features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Populate use cases
    const useCasesList = document.getElementById('modalUseCases');
    useCasesList.innerHTML = '';
    data.useCases.forEach(useCase => {
        const li = document.createElement('li');
        li.textContent = useCase;
        useCasesList.appendChild(li);
    });
    
    // Populate benefits
    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = '';
    data.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
}

// Close modal when close button is clicked
modalClose.addEventListener('click', () => {
    techModal.classList.remove('active');
});

// Close modal when clicking outside the modal
techModal.addEventListener('click', (e) => {
    if (e.target === techModal) {
        techModal.classList.remove('active');
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && techModal.classList.contains('active')) {
        techModal.classList.remove('active');
    }
});

// Services Modal
const serviceModal = document.getElementById('serviceModal');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceCards = document.querySelectorAll('.service-card');

const serviceData = {
    ehr: {
        title: 'Electronic Health Records',
        description: 'Comprehensive EHR systems that streamline patient data management and improve clinical workflows.',
        features: ['Centralized patient information', 'Customizable templates', 'Real-time sync', 'Mobile access']
    },
    telemedicine: {
        title: 'Telemedicine Platforms',
        description: 'Secure virtual care solutions enabling remote consultations and patient monitoring.',
        features: ['Video conferencing', 'E-prescriptions', 'Patient messaging', 'EHR integration']
    },
    analytics: {
        title: 'Healthcare Analytics',
        description: 'Advanced data analytics tools providing insights for better decision-making.',
        features: ['Real-time dashboards', 'Predictive analytics', 'Performance metrics', 'Custom reports']
    },
    'patient-mgmt': {
        title: 'Patient Management Systems',
        description: 'Integrated platforms for appointment scheduling, billing, and care coordination.',
        features: ['Appointment scheduling', 'Insurance verification', 'Billing automation', 'Patient portal']
    },
    'device-integration': {
        title: 'Medical Device Integration',
        description: 'Seamless connectivity solutions for medical devices enabling real-time monitoring.',
        features: ['Device connectivity', 'Real-time data', 'Alert system', 'Historical data']
    },
    security: {
        title: 'Healthcare Security Solutions',
        description: 'Robust cybersecurity ensuring HIPAA compliance and data protection.',
        features: ['Data encryption', '24/7 monitoring', 'Compliance audits', 'Access controls']
    }
};

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-service-id');
        const data = serviceData[id];
        document.getElementById('serviceModalTitle').textContent = data.title;
        document.getElementById('serviceModalDescription').textContent = data.description;
        
        const list = document.getElementById('serviceModalFeatures');
        list.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            list.appendChild(li);
        });
        
        serviceModal.classList.add('active');
    });
});

serviceModalClose.addEventListener('click', () => serviceModal.classList.remove('active'));
serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) serviceModal.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) serviceModal.classList.remove('active');
});

