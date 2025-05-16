document.addEventListener('DOMContentLoaded', () => {
    const tickerContent = document.getElementById('tickerContent');
    const messages = [
        'Filing Season is almost over, book now!',
        'VAT return is currently 16%.',
        'Rental income must be remitted by the 5th of every month.',
        'VAT filings due by the 20th—contact us today!',
        'Ensure KRA compliance with our expert services.',
        'New KRA PIN applications processed in 24 hours!',
        'Tax Compliance Certificates issued promptly.'
    ];
    let messageIndex = 0;

    function updateTicker() {
        tickerContent.style.opacity = 0;
        setTimeout(() => {
            tickerContent.textContent = messages[messageIndex];
            tickerContent.style.opacity = 1;
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(updateTicker, 5000);
        }, 500);
    }

    // Start ticker after preloader
    window.addEventListener('load', () => {
        setTimeout(updateTicker, 500);
    });

    // Keyboard Accessibility
    tickerContent.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            updateTicker();
        }
    });
});