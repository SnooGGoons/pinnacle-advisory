document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatMessages = document.getElementById('chatMessages');
    const chatOptions = document.getElementById('chatOptions');
    
    // State management
    let state = 'businessType';
    let conversationHistory = [];
    let selectedPlan = null;
    
    // Typing animation configuration
    const typingConfig = {
        speed: 30, // typing speed in ms
        deleteSpeed: 20, // deleting speed in ms
        pauseBetweenMessages: 800, // pause between bot messages
        pauseBeforeOptions: 500 // pause before showing options
    };

    // Pricing plans data structure
    const plans = {
        startup: [
            { 
                name: 'Basic', 
                price: 'Ksh 1,000/month', 
                features: ['KRA NIL Returns', 'KRA PIN Retrieval', 'Certificate Reprinting', 'Email Support'],
                bestFor: 'Freelancers and sole proprietors with simple tax needs'
            },
            { 
                name: 'Standard', 
                price: 'Ksh 3,500/month', 
                features: ['All Basic Services', 'Employment Returns (P9 Form)', 'New KRA PIN Application', 'Tax Compliance Certificate', 'Priority Support'],
                bestFor: 'Small businesses with 1-5 employees'
            }
        ],
        sme: [
            { 
                name: 'Standard', 
                price: 'Ksh 3,500/month', 
                features: ['All Basic Services', 'Employment Returns (P9 Form)', 'New KRA PIN Application', 'Tax Compliance Certificate', 'Priority Support'],
                bestFor: 'Growing businesses with 5-20 employees'
            },
            { 
                name: 'Premium', 
                price: 'Ksh 7,000/month', 
                features: ['All Standard Services', 'Financial Planning', 'Business Advisory', 'Custom Reports', '24/7 Support'],
                bestFor: 'Established SMEs needing comprehensive support'
            }
        ],
        enterprise: [
            { 
                name: 'Premium', 
                price: 'Ksh 7,000/month', 
                features: ['All Standard Services', 'Financial Planning', 'Business Advisory', 'Custom Reports', '24/7 Support'],
                bestFor: 'Medium to large businesses with complex needs'
            },
            { 
                name: 'Custom', 
                price: 'Contact Us', 
                features: ['Tailored Solutions', 'Dedicated Account Manager', 'Advanced Reporting', '24/7 Support'],
                bestFor: 'Large enterprises requiring personalized service'
            }
        ]
    };

    // Feature icons mapping
    const featureIcons = {
        'KRA NIL Returns': 'fa-file-invoice',
        'KRA PIN Retrieval': 'fa-id-card',
        'Certificate Reprinting': 'fa-certificate',
        'Email Support': 'fa-envelope',
        'Employment Returns': 'fa-users',
        'New KRA PIN Application': 'fa-id-card-alt',
        'Tax Compliance Certificate': 'fa-award',
        'Priority Support': 'fa-headset',
        'Financial Planning': 'fa-chart-line',
        'Business Advisory': 'fa-lightbulb',
        'Custom Reports': 'fa-file-alt',
        '24/7 Support': 'fa-clock',
        'Tailored Solutions': 'fa-cogs',
        'Dedicated Account Manager': 'fa-user-tie',
        'Advanced Reporting': 'fa-chart-pie'
    };

    // Add a message with typing animation
    async function addMessage(content, type = 'bot', instant = false) {
        return new Promise((resolve) => {
            const message = document.createElement('div');
            message.classList.add('message', `${type}-message`);
            
            // Add typing indicator for bot messages
            if (type === 'bot' && !instant) {
                message.classList.add('typing');
                const typingIndicator = document.createElement('span');
                typingIndicator.classList.add('typing-indicator');
                typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
                message.appendChild(typingIndicator);
                chatMessages.appendChild(message);
                scrollToBottom();
                
                // Remove typing indicator and add actual content
                setTimeout(async () => {
                    message.classList.remove('typing');
                    message.innerHTML = '';
                    
                    if (!instant) {
                        await typeText(message, content);
                    } else {
                        message.textContent = content;
                    }
                    
                    scrollToBottom();
                    resolve();
                }, typingConfig.pauseBetweenMessages);
            } else {
                message.textContent = content;
                chatMessages.appendChild(message);
                scrollToBottom();
                resolve();
            }
        });
    }

    // Type text with animation
    async function typeText(element, text) {
        return new Promise((resolve) => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    scrollToBottom();
                } else {
                    clearInterval(typing);
                    resolve();
                }
            }, typingConfig.speed);
        });
    }

    // Clear chat options
    function clearOptions() {
        chatOptions.innerHTML = '';
        chatOptions.classList.remove('visible');
    }

    // Add interactive options
    async function addOptions(options) {
        clearOptions();
        
        await new Promise(resolve => setTimeout(resolve, typingConfig.pauseBeforeOptions));
        
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('chat-option', 'fade-in');
            btn.dataset.value = opt.value;
            btn.textContent = opt.label;
            btn.tabIndex = 0;
            btn.setAttribute('aria-label', opt.label);
            
            // Add icon if specified
            if (opt.icon) {
                const icon = document.createElement('i');
                icon.classList.add('fas', `fa-${opt.icon}`);
                btn.prepend(icon);
                btn.insertAdjacentText('beforeend', ' ');
            }
            
            chatOptions.appendChild(btn);
        });
        
        chatOptions.classList.add('visible');
        scrollToBottom();
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatOptions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Show plan details
    async function showPlanDetails(businessType, planName) {
        const plan = plans[businessType].find(p => p.name.toLowerCase() === planName);
        selectedPlan = plan;
        
        await addMessage(`Here's the ${plan.name} plan for ${businessType}:`);
        await addMessage(`💰 Price: ${plan.price}`, 'bot');
        await addMessage(`⭐ Best for: ${plan.bestFor}`, 'bot');
        await addMessage('✨ Features:', 'bot');
        
        // Create feature list with icons
        const featureList = document.createElement('ul');
        featureList.classList.add('feature-list');
        
        plan.features.forEach(feature => {
            const listItem = document.createElement('li');
            const icon = document.createElement('i');
            
            // Find matching icon or use default
            const iconClass = Object.entries(featureIcons).find(([key]) => 
                feature.includes(key))?.[1] || 'fa-check-circle';
            
            icon.classList.add('fas', iconClass);
            listItem.appendChild(icon);
            listItem.insertAdjacentText('beforeend', feature);
            featureList.appendChild(listItem);
        });
        
        chatMessages.appendChild(featureList);
        scrollToBottom();
        
        await addMessage('Would you like to proceed with this plan or explore other options?');
        
        addOptions([
            { value: 'proceed', label: 'Proceed with this plan', icon: 'check' },
            { value: 'compare', label: 'Compare with other plans', icon: 'exchange-alt' },
            { value: 'restart', label: 'Start over', icon: 'redo' }
        ]);
        
        state = 'decision';
    }

    // Handle user selection
    async function handleUserSelection(value) {
        // Track interaction
        trackEvent('pricing_bot_interaction', { state, value });
        
        // Add user message
        await addMessage(value, 'user', true);
        
        switch (state) {
            case 'businessType':
                await addMessage(`Great choice! For ${value} businesses, we offer these plan levels:`);
                
                const planOptions = plans[value].map(plan => ({
                    value: plan.name.toLowerCase(),
                    label: plan.name,
                    icon: plan.name === 'Custom' ? 'crown' : 'star'
                }));
                
                await addOptions(planOptions);
                state = 'planLevel';
                break;
                
            case 'planLevel':
                const businessType = conversationHistory
                    .find(m => m.state === 'businessType')?.value || 'startup';
                
                await showPlanDetails(businessType, value);
                break;
                
            case 'decision':
                if (value === 'proceed') {
                    await addMessage('Excellent choice! How would you like to proceed?');
                    
                    addOptions([
                        { value: 'contact', label: 'Contact sales', icon: 'phone' },
                        { value: 'signup', label: 'Sign up now', icon: 'user-plus' },
                        { value: 'schedule', label: 'Schedule a call', icon: 'calendar' }
                    ]);
                    
                    state = 'proceedMethod';
                } 
                else if (value === 'compare') {
                    const businessType = conversationHistory
                        .find(m => m.state === 'businessType')?.value || 'startup';
                    
                    await addMessage('Let me show you all available plans for comparison:');
                    
                    for (const plan of plans[businessType]) {
                        await showPlanDetails(businessType, plan.name.toLowerCase());
                    }
                    
                    await addMessage('Which plan would you like to choose?');
                    
                    const planOptions = plans[businessType].map(plan => ({
                        value: plan.name.toLowerCase(),
                        label: plan.name,
                        icon: plan.name === 'Custom' ? 'crown' : 'star'
                    }));
                    
                    await addOptions(planOptions);
                    state = 'planLevel';
                }
                else if (value === 'restart') {
                    await addMessage('Sure! Let\'s start over. What type of business are you running?');
                    
                    addOptions([
                        { value: 'startup', label: 'Startup', icon: 'seedling' },
                        { value: 'sme', label: 'SME', icon: 'store' },
                        { value: 'enterprise', label: 'Enterprise', icon: 'building' }
                    ]);
                    
                    state = 'businessType';
                }
                break;
                
            case 'proceedMethod':
                if (value === 'contact') {
                    document.getElementById('contactModal').classList.remove('hidden');
                    await addMessage('Opening contact form...', 'bot');
                    clearOptions();
                }
                else if (value === 'signup') {
                    // In a real implementation, this would redirect to signup
                    await addMessage('Redirecting to signup page...', 'bot');
                    await addMessage('(In a real implementation, this would take you to our signup form)', 'bot');
                    clearOptions();
                }
                else if (value === 'schedule') {
                    // In a real implementation, this would open a calendar
                    await addMessage('Opening scheduling tool...', 'bot');
                    await addMessage('(In a real implementation, this would show available times)', 'bot');
                    clearOptions();
                }
                break;
        }
        
        // Save to conversation history
        conversationHistory.push({ state, value, timestamp: new Date() });
    }

    // Event tracking
    function trackEvent(eventName, eventData) {
        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...eventData
            });
        }
        
        // You could also send to your backend
        console.log('Tracking:', eventName, eventData);
    }

    // Initialize chat
    async function initChat() {
        // Start conversation
        await addMessage('Hi there! 👋 I\'m here to help you find the perfect pricing plan for your business.');
        await addMessage('What type of business are you running?');
        
        addOptions([
            { value: 'startup', label: 'Startup', icon: 'seedling' },
            { value: 'sme', label: 'SME', icon: 'store' },
            { value: 'enterprise', label: 'Enterprise', icon: 'building' }
        ]);
    }

    // Event listeners
    chatOptions.addEventListener('click', async (e) => {
        if (e.target.classList.contains('chat-option')) {
            const value = e.target.dataset.value;
            e.target.classList.add('selected');
            await handleUserSelection(value);
        }
    });

    // Keyboard navigation
    chatOptions.addEventListener('keydown', async (e) => {
        if (e.target.classList.contains('chat-option') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.target.classList.add('selected');
            await handleUserSelection(e.target.dataset.value);
        }
    });

    // Start the chat
    initChat();
});