/**
 * Mobile Menu Module
 * Handles mobile menu toggle and accessibility features.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');

        if (mobileMenuBtn && nav) {
            const toggleMenu = () => {
                const isOpen = nav.classList.toggle('active');
                mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            };

            mobileMenuBtn.addEventListener('click', toggleMenu);

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (nav.classList.contains('active') && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    toggleMenu();
                }
            });
        }
    } catch (e) {
        console.error('Mobile menu setup failed:', e);
    }
});