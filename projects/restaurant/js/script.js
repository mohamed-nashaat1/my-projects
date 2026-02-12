document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // 4. Booking Form Validation
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            
            if(name.length < 3) {
                alert('Please enter a valid name');
                return;
            }

            if(!email.includes('@')) {
                alert('Please enter a valid email');
                return;
            }

            // Fixed the syntax error here (removed backslash before backtick)
            alert(`Thank you, ${name}! Your table for ${date} has been booked.`);
            bookingForm.reset();
        });
    }

    // 5. Gallery Lightbox Functionality (تم نقله للداخل لضمان العمل)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-img');
    const closeBtn = document.querySelector('.close-lightbox');

    if (lightbox) { 
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = "block";
                lightboxImg.src = img.src; 
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        });
    }

}); // End of DOMContentLoaded
