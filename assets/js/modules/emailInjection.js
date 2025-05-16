/**
 * Email Injection Module
 * Dynamically injects email addresses into contact and footer links.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const emailUser = 'pinaccleadvisorygroup';
        const emailDomain = 'gmail.com';
        const email = `${emailUser}@${emailDomain}`;

        ['contact-email', 'footer-email'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.href = `mailto:${email}`;
                el.textContent = email;
            }
        });
    } catch (e) {
        console.error('Email injection failed:', e);
    }
});