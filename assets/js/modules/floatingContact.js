/**
 * Floating Contact Module
 * Manages the timed popup behavior of the floating contact button with minimize/maximize functionality.
 */
document.addEventListener('DOMContentLoaded', () => {
    const floatingContact = document.querySelector('.floating-contact');
    const contactOptions = document.querySelector('.contact-options');

    // Show floating button after 5 seconds
    setTimeout(() => {
        floatingContact.classList.add('visible');
    }, 5000);

    // Toggle contact options and track interaction
    floatingContact.addEventListener('click', () => {
        const isMinimized = floatingContact.classList.contains('minimized');
        if (isMinimized) {
            floatingContact.classList.remove('minimized');
            contactOptions.classList.add('visible');
        } else {
            contactOptions.classList.toggle('visible');
            if (!contactOptions.classList.contains('visible')) {
                floatingContact.classList.add('minimized');
            }
        }

        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'floating_contact_click',
                action: contactOptions.classList.contains('visible') ? 'open' : 'close'
            });
        }
    });

    // Handle contact option clicks
    document.querySelectorAll('.contact-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            if (modalId) {
                document.getElementById(modalId).classList.remove('hidden');
                contactOptions.classList.remove('visible');
                floatingContact.classList.add('minimized');
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'contact_option_click',
                        option: modalId
                    });
                }
            } else if (btn.classList.contains('chat-option')) {
                if (typeof Tawk_API !== 'undefined') {
                    Tawk_API.toggle();
                    contactOptions.classList.remove('visible');
                    floatingContact.classList.add('minimized');
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: 'live_chat_open'
                        });
                    }
                }
            }
        });
    });
});