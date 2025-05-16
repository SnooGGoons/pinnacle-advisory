/**
 * Swipe Module
 * Adds swipe support for services and testimonials containers.
 */
document.addEventListener('DOMContentLoaded', () => {
    const swipeContainers = document.querySelectorAll('.services-container, .testimonials-container');

    swipeContainers.forEach(container => {
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
            } else if (touchEndX - touchStartX > 50) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
            }
        });
    });
});