// Navbar Toggle for Mobile
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarNav = document.querySelector('.navbar-nav');

navbarToggle.addEventListener('click', () => {
    navbarNav.classList.toggle('active'); // Toggle visibility
    // Animate hamburger bars
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('active'));
});

// Scroll-Based Reveal Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slight offset for smoother reveal
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal'); // Add class to trigger CSS animation
        }
    });
}, observerOptions);

// Observe sections for reveal
const sections = document.querySelectorAll('section');
sections.forEach(section => observer.observe(section));