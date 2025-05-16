document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');
    let state = 'businessType';

    const plans = {
        startup: [
            { name: 'Basic', price: 'Ksh 1,000/month', features: ['KRA NIL Returns', 'KRA PIN Retrieval', 'Certificate Reprinting', 'Email Support'] },
            { name: 'Standard', price: 'Ksh 3,500/month', features: ['All Basic Services', 'Employment Returns (P9 Form)', 'New KRA PIN Application', 'Tax Compliance Certificate', 'Priority Support'] }
        ],
        sme: [
            { name: 'Standard', price: 'Ksh 3,500/month', features: ['All Basic Services', 'Employment Returns (P9 Form)', 'New KRA PIN Application', 'Tax Compliance Certificate', 'Priority Support'] },
            { name: 'Premium', price: 'Ksh 7,000/month', features: ['All Standard Services', 'Financial Planning', 'Business Advisory', 'Custom Reports', '24/7 Support'] }
        ],
        enterprise: [
            { name: 'Premium', price: 'Ksh 7,000/month', features: ['All Standard Services', 'Financial Planning', 'Business Advisory', 'Custom Reports', '24/7 Support'] },
            { name: 'Custom', price: 'Contact Us', features: ['Tailored Solutions', 'Dedicated Account Manager', 'Advanced Reporting', '24/7 Support'] }
        ]
    };

    function addMessage(content, type = 'bot') {
        const message = document.createElement('div');
        message.classList.add('message', `${type}-message`);
        message.textContent = content;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function clearOptions() {
        chatOptions.innerHTML = '';
    }

    function addOptions(options) {
        clearOptions();
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('chat-option');
            btn.dataset.value = opt.value;
            btn.textContent = opt.label;
            btn.tabIndex = 0; // Make button focusable
            chatOptions.appendChild(btn);
        });
    }

    chatOptions.addEventListener('click', e => {
        if (e.target.classList.contains('chat-option')) {
            const value = e.target.dataset.value;
            addMessage(value, 'user');
            // GA4 Event Tracking
            if (window.dataLayer) {
                window.dataLayer.push({
                    event: 'pricing_bot_interaction',
                    state: state,
                    value: value
                });
            }

            if (state === 'businessType') {
                addMessage(`Great! For a ${value} business, which plan level are you interested in?`);
                const planOptions = plans[value].map(plan => ({ value: plan.name.toLowerCase(), label: plan.name }));
                addOptions(planOptions);
                state = 'planLevel';
            } else if (state === 'planLevel') {
                const businessType = chatMessages.querySelector('.user-message').textContent.toLowerCase();
                const plan = plans[businessType].find(p => p.name.toLowerCase() === value);
                addMessage(`Here's the ${plan.name} plan for ${businessType}: ${plan.price}`);
                addMessage('Features:');
                plan.features.forEach(feature => addMessage(`- ${feature}`));
                addMessage('Would you like to proceed or explore another plan?');
                addOptions([
                    { value: 'proceed', label: 'Proceed' },
                    { value: 'explore', label: 'Explore Another Plan' }
                ]);
                state = 'decision';
            } else if (state === 'decision') {
                if (value === 'proceed') {
                    addMessage('Awesome! Please contact us to get started.');
                    addOptions([{ value: 'contact', label: 'Contact Us' }]);
                    state = 'end';
                } else {
                    addMessage('What type of business are you running?');
                    addOptions([
                        { value: 'startup', label: 'Startup' },
                        { value: 'sme', label: 'SME' },
                        { value: 'enterprise', label: 'Enterprise' }
                    ]);
                    state = 'businessType';
                }
            } else if (state === 'end' && value === 'contact') {
                document.getElementById('contactModal').classList.remove('hidden');
                clearOptions();
            }
        }
    });

    // Keyboard Navigation for Accessibility
    chatOptions.addEventListener('keydown', e => {
        if (e.target.classList.contains('chat-option') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.target.click();
        }
    });
});