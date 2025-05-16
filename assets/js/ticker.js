document.addEventListener('DOMContentLoaded', () => {
    console.log('ticker.js loaded');
    const tickerContent = document.getElementById('tickerContent');

    if (!tickerContent) {
        console.warn('Ticker content element not found. Disabling ticker.');
        return;
    }

    const messages = [
        'Filing Season is almost over, book now!',
        'VAT return is currently 16%.',
        'Rental income must be remitted by the 5th of every month.',
        'VAT filings due by the 20th—contact us today!',
        'Ensure KRA compliance with our expert services.'
    ];
    let messageIndex = 0;

    function updateTicker() {
        tickerContent.style.opacity = 0;
        setTimeout(() => {
            console.log(`Displaying ticker message: ${messages[messageIndex]}`);
            tickerContent.textContent = messages[messageIndex];
            tickerContent.style.opacity = 1;
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(updateTicker, 5000);
        }, 500);
    }

    // Start ticker after preloader
    window.addEventListener('load', () => {
        console.log('Starting ticker');
        setTimeout(updateTicker, 500);
    });
});

