// Toggle functionality
const toggle = document.getElementById('publicationToggle');
const allLabel = document.getElementById('allLabel');
const selectedLabel = document.getElementById('selectedLabel');
let currentMode = 'all';

toggle.addEventListener('click', function() {
    if (currentMode === 'all') {
        currentMode = 'selected';
        toggle.classList.add('selected');
        allLabel.classList.remove('active');
        selectedLabel.classList.add('active');
        filterPublications('selected');
    } else {
        currentMode = 'all';
        toggle.classList.remove('selected');
        allLabel.classList.add('active');
        selectedLabel.classList.remove('active');
        filterPublications('all');
    }
});

function filterPublications(mode) {
    const allPublications = document.querySelectorAll('.publication');
    const yearSections = document.querySelectorAll('.year-section');
    
    if (mode === 'all') {
        allPublications.forEach(pub => {
            pub.classList.remove('hidden');
        });
    } else {
        yearSections.forEach(section => {
            const sectionPubs = section.querySelectorAll('.publication');
            const selectedPubs = section.querySelectorAll('.publication[data-selected="true"]');
            
            // Hide all publications first
            sectionPubs.forEach(pub => {
                if (pub.getAttribute('data-selected') !== 'true') {
                    pub.classList.add('hidden');
                } else {
                    pub.classList.remove('hidden');
                }
            });
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('.year-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = document.getElementById('top-navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Highlight current section in navigation based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('.year-section');
    const navLinks = document.querySelectorAll('.year-nav a');
    const navHeight = document.getElementById('top-navbar').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100; // Offset for better detection
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNav);

// Set initial active state
updateActiveNav();

// Add some entrance animation to publications when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('hidden')) {
            entry.target.style.animation = 'fadeIn 0.6s forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.publication').forEach(pub => {
    observer.observe(pub);
});