/**
 * Modal Module
 * Handles modal open/close behavior and keyboard accessibility.
 */
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const serviceLinks = document.querySelectorAll('.service-link');

    // Open modals from service links
    serviceLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const modalId = link.dataset.modal;
            if (modalId) {
                document.getElementById(modalId).classList.remove('hidden');
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'service_modal_open',
                        service: modalId
                    });
                }
            }
        });
    });

    function openModal(modalId, content = null) {
        const modal = document.getElementById(modalId);
        if (content) modal.querySelector('.modal-content').innerHTML = content;
        modal.classList.remove('hidden');
    }

    // Close modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.add('hidden'));
        });
    });

    // Close modals with Escape key
    modals.forEach(modal => {
        modal.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
            }
        });
    });
});


