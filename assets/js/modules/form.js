/**
 * Form Module
 * Handles Formspree form submissions with success/error feedback.
 */
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.contact-form, .newsletter-form');

    forms.forEach(form => {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    alert(form.classList.contains('newsletter-form') ? 'Subscribed successfully!' : 'Message sent successfully!');
                    form.reset();
                    document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: 'form_submission',
                            form_id: form.id
                        });
                    }
                } else {
                    alert('Something went wrong. Try again.');
                }
            } catch (error) {
                alert('Something went wrong. Try again.');
                console.error('Form submission error:', error);
            }
        });
    });
});