document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    });

    // Dynamic Email Injection
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

    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Floating Contact Button
    const floatingContact = document.querySelector('.floating-contact');
    const contactOptions = document.querySelector('.contact-options');
    floatingContact.addEventListener('click', () => {
        contactOptions.classList.toggle('hidden');
        // GA4 Event Tracking
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'floating_contact_click',
                action: contactOptions.classList.contains('hidden') ? 'close' : 'open'
            });
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.pageYOffset > 300);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal Logic
    const modals = document.querySelectorAll('.modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const contactOptionsButtons = document.querySelectorAll('.contact-option');

    contactOptionsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            if (modalId) {
                document.getElementById(modalId).classList.remove('hidden');
                contactOptions.classList.add('hidden');
                // GA4 Event Tracking
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'contact_option_click',
                        option: modalId
                    });
                }
            } else if (btn.classList.contains('chat-option')) {
                if (typeof Tawk_API !== 'undefined') {
                    Tawk_API.toggle();
                    contactOptions.classList.add('hidden');
                    // GA4 Event Tracking
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: 'live_chat_open'
                        });
                    }
                }
            }
        });
    });

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.add('hidden'));
        });
    });

    // Service Modal Content
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceDetails = document.getElementById('serviceDetails');
    const serviceModal = document.getElementById('serviceModal');
    serviceLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const service = link.dataset.service;
            let content = '';
            if (service === 'tax') {
                content = `
                    <h3>Tax & Compliance</h3>
                    <p>Our tax services include personal and business tax planning, filing, and compliance with KRA regulations. We ensure you stay compliant while maximizing savings.</p>
                    <ul>
                        <li>Tax Planning</li>
                        <li>KRA Filing</li>
                        <li>Compliance Audits</li>
                    </ul>
                    <a href="#contact" class="btn btn-primary">Get Started</a>
                `;
            } else if (service === 'finance') {
                content = `
                    <h3>Financial Management</h3>
                    <p>We provide bookkeeping, data entry, and strategic financial planning to optimize your business performance and ensure financial health.</p>
                    <ul>
                        <li>Bookkeeping</li>
                        <li>Financial Reporting</li>
                        <li>Budget Planning</li>
                    </ul>
                    <a href="#contact" class="btn btn-primary">Get Started</a>
                `;
            } else if (service === 'advisory') {
                content = `
                    <h3>Business Advisory</h3>
                    <p>Our advisory services include business registration, risk management, and growth strategies to help your business thrive.</p>
                    <ul>
                        <li>Business Registration</li>
                        <li>Risk Assessment</li>
                        <li>Growth Planning</li>
                    </ul>
                    <a href="#contact" class="btn btn-primary">Get Started</a>
                `;
            }
            serviceDetails.innerHTML = content;
            serviceModal.classList.remove('hidden');
            // GA4 Event Tracking
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'service_modal_open',
                    service: service
                });
            }
        });
    });

    // Formspree Submission
    const forms = document.querySelectorAll('.contact-form');
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
                    alert('Message sent successfully!');
                    form.reset();
                    modals.forEach(modal => modal.classList.add('hidden'));
                    // GA4 Event Tracking
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

    // Swipe Support for Services
    const servicesContainer = document.querySelector('.services-container');
    let touchStartX = 0;
    let touchEndX = 0;

    if (servicesContainer) {
        servicesContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        servicesContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                servicesContainer.scrollBy({ left: 300, behavior: 'smooth' });
            } else if (touchEndX - touchStartX > 50) {
                servicesContainer.scrollBy({ left: -300, behavior: 'smooth' });
            }
        });
    }
});