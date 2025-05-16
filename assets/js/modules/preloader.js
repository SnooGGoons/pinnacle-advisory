/**
 * Preloader Module
 * Handles the preloader animation with a progress bar and dispatches completion event.
 */
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const progress = document.querySelector('.progress');

    // Simulate loading progress
    let width = 0;
    const progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
            hidePreloader();
        } else {
            width += 2;
            progress.style.width = `${width}%`;
        }
    }, 50);

    // Hide preloader and dispatch completion event
    const hidePreloader = () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.dispatchEvent(new Event('preloaderComplete'));
        }, 500);
    };

    // Fallback timeout
    const preloaderTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        hidePreloader();
    }, 3000);

    // Clear timeout on window load
    window.addEventListener('load', () => {
        clearTimeout(preloaderTimeout);
        clearInterval(progressInterval);
        hidePreloader();
    });
});