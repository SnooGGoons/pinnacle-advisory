document.addEventListener('DOMContentLoaded', () => {
    console.log('typing.js loaded');
    
    const typingWord = document.getElementById('typingWord');
    if (!typingWord) {
        console.error('Typing word element not found');
        return;
    }

    const words = ['Solutions', 'Systems', 'POS Systems', 'Invoicing Solutions', 'Tax Tools', 'Financial Strategies'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let deleteSpeed = 100;
    let pauseBetweenWords = 2000;

    function type() {
        const currentWord = words[wordIndex];
        
        // Determine current text to display
        let displayText;
        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Update DOM
        typingWord.textContent = displayText;
        typingWord.setAttribute('aria-label', `Currently showing: ${displayText}`);

        // Determine next step
        if (!isDeleting && charIndex === currentWord.length) {
            // Word is complete, start deleting after pause
            isDeleting = true;
            setTimeout(type, pauseBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            // Word is deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            // Continue typing or deleting
            const speed = isDeleting ? deleteSpeed : typingSpeed;
            setTimeout(type, speed);
        }
    }

    // Start typing after preloader completes
    const startTyping = () => {
        console.log('Starting typing animation');
        type();
    };

    // Listen for preloader completion or start immediately if already loaded
    if (document.getElementById('preloader').style.display === 'none') {
        startTyping();
    } else {
        document.addEventListener('preloaderComplete', startTyping);
    }
});