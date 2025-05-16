document.addEventListener('DOMContentLoaded', () => {
    const typingWord = document.getElementById('typingWord');
    const baseText = "Empowering your success with innovative ";
    const words = ['Solutions', 'Systems', 'POS Systems', 'Invoicing Solutions', 'Tax Tools', 'Financial Strategies'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTypingStarted = false;

    function type() {
        const currentWord = words[wordIndex];
        if (!isTypingStarted) {
            typingWord.textContent = '';
            isTypingStarted = true;
        }

        if (isDeleting) {
            typingWord.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 100);
            }
        } else {
            typingWord.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 150);
            }
        }
    }

    // Start typing after preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            type();
        }, 500);
    });
});