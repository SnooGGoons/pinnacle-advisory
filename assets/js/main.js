/**
 * Main Module
 * Initializes AOS and coordinates other modules.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    try {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                easing: 'ease-in-out',
                offset: 120
            });
        } else {
            console.warn('AOS not loaded');
        }
    } catch (e) {
        console.error('AOS initialization failed:', e);
    }

    if (typeof AOS === 'undefined') {
        console.warn('AOS not loaded. Animations disabled.');
        document.querySelectorAll('[data-aos]').forEach(el => el.style.opacity = '1');
    }
    // Update year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.pageYOffset > 300);
    });

    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    });    

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


