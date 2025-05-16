# Pinnacle Advisory Website

## Overview

Pinnacle Advisory Group is a financial and tax advisory firm based in Nairobi, Kenya, offering services such as tax compliance, financial management, and business advisory. This repository hosts the static website for Pinnacle Advisory, built with HTML, CSS, and vanilla JavaScript, and deployed on GitHub Pages at [https://snooggoons.github.io/pinnacle-advisory/](https://snooggoons.github.io/pinnacle-advisory/).

The website features a modern, responsive design with interactive elements like a pricing bot, floating contact button, and modular header/footer components. It aims to provide an intuitive user experience while maintaining accessibility and performance.

## Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop devices using CSS media queries and flexible layouts.
- **Pricing Bot**: An interactive chatbot (`pricing.html`, `pricing.js`) that guides users to tailored pricing plans based on business type, services, and budget.
- **Modular Components**: Reusable `header.html` and `footer.html` loaded dynamically via `include.js` to ensure consistency across pages.
- **Floating Contact Button**: A persistent button with contact form and live chat options, powered by `floatingContact.js`.
- **Preloader**: A loading animation with a progress bar (`preloader.js`) for smooth page transitions.
- **Dark Mode**: Toggleable dark/light themes (`darkMode.js`) for enhanced user experience.
- **Form Integration**: Contact and newsletter forms integrated with Formspree for seamless submissions.
- **Animations**: Subtle AOS (Animate on Scroll) effects for visual appeal.
- **Accessibility**: ARIA attributes and keyboard navigation support, especially in the pricing bot and forms.
- **SEO**: Meta tags for Open Graph and Twitter Card to optimize social media sharing.

## File Structure

```
pinnacle-advisory/
├── assets/
│   ├── css/
│   │   ├── main.css        # Primary styles
│   │   └── reset.css       # CSS reset
│   ├── img/
│   │   └── logo.png        # Pinnacle Advisory logo
│   └── js/
│       ├── modules/
│       │   ├── darkMode.js       # Dark mode toggle
│       │   ├── emailInjection.js # Dynamic email injection
│       │   ├── floatingContact.js# Floating contact button
│       │   ├── form.js           # Form validation
│       │   ├── include.js        # Dynamic header/footer loading
│       │   ├── mobileMenu.js     # Mobile menu toggle
│       │   ├── modal.js          # Contact modal
│       │   ├── preloader.js      # Preloader animation
│       │   └── smoothScroll.js   # Smooth scrolling
│       ├── main.js               # Main script initialization
│       └── pricing.js            # Pricing bot logic
├── header.html                   # Reusable header partial
├── footer.html                   # Reusable footer partial
├── index.html                    # Homepage
├── pricing.html                  # Pricing page with interactive bot
└── README.markdown               # Project documentation
```

## Setup Instructions

### Prerequisites
- **Git**: To clone the repository.
- **Web Browser**: Chrome, Firefox, or Safari for testing.
- **Text Editor**: VS Code or similar for editing files.
- **Formspree Account**: For contact and newsletter form submissions.

### Local Development
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SnooGGoons/pinnacle-advisory.git
   cd pinnacle-advisory
   ```

2. **Serve Locally**:
   Use a local server to avoid CORS issues with `include.js`:
   ```bash
   python -m http.server 8000
   ```
   Access the site at `http://localhost:8000`.

3. **Configure Formspree**:
   - Create a Formspree account and generate form IDs.
   - Update `your-form-id` in `footer.html` (newsletter form) and `pricing.html` (contact form) with your Formspree IDs:
     ```html
     <form action="https://formspree.io/f/your-form-id" method="POST">
     ```

4. **Test Features**:
   - Verify the pricing bot (`pricing.html`) works by selecting options and checking plan recommendations.
   - Test the mobile menu, dark mode toggle, and contact form.
   - Check the console (`F12` > Console) for errors.

### Deployment
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```

2. **GitHub Pages**:
   - Ensure GitHub Pages is enabled in the repository settings, serving from the `main` branch, root directory.
   - The site will be live at `https://snooggoons.github.io/pinnacle-advisory/`.

3. **Verify Deployment**:
   - Visit `https://snooggoons.github.io/pinnacle-advisory/pricing.html` to test the pricing bot.
   - Check header/footer loading and script functionality.

## Usage

### Pricing Bot
- Navigate to `/pricing.html`.
- Interact with the chatbot by selecting options (business type, services, budget).
- Use the "Back" button to revise answers or "Reset Chat" to start over.
- The bot recommends a plan (Basic, Standard, or Premium) with a "Contact Us" CTA.

### Contact Form
- Click the floating contact button (bottom-right) and select "Contact Form".
- Fill out the modal form (name, email, phone, service, message) and submit via Formspree.

### Newsletter Signup
- In the footer, enter an email address and submit to subscribe via Formspree.

### Dark Mode
- Click the moon icon in the header to toggle between light and dark themes.

## Development Notes

- **Dynamic Partials**: `include.js` loads `header.html` and `footer.html` into `<div id="header">` and `<div id="footer">`. Ensure these IDs exist in all HTML pages.
- **Script Dependencies**: Scripts like `mobileMenu.js`, `darkMode.js`, `emailInjection.js`, and `form.js` must expose global functions (`initMobileMenu`, `initDarkMode`, `injectEmail`, `initForms`) for `include.js` to re-initialize them.
- **Error Handling**: The pricing bot (`pricing.js`) includes robust error handling to prevent issues like the "Oops, something went wrong" message. Check the console for detailed logs.
- **Analytics**: Add Google Analytics by including the tracking script in `<head>` of `index.html` and `pricing.html`:
  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=your-GA-id"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'your-GA-id');
  </script>
  ```

## Troubleshooting

- **Pricing Bot Error**:
  - If "Oops, something went wrong" appears, check the console for errors (e.g., missing DOM elements, failed script loading).
  - Verify `pricing.js` and `preloader.js` are loaded correctly.
  - Test locally to rule out GitHub Pages issues.

- **Header/Footer Not Loading**:
  - Ensure `header.html` and `footer.html` are in the root directory.
  - Check console for fetch errors in `include.js`.
  - Confirm `<div id="header">` and `<div id="footer">` exist in HTML.

- **Script Issues**:
  - Verify global functions (`initMobileMenu`, etc.) are defined in respective scripts.
  - Check Network tab (`F12` > Network) for 404 errors on scripts.

- **Form Submission Fails**:
  - Confirm Formspree IDs are correct.
  - Test form submissions locally to ensure connectivity.

## Future Improvements

- **Static Site Generator**: Use Jekyll or Hugo to include partials at build time, reducing client-side fetching.
- **Image Optimization**: Convert `logo.png` to WebP format for faster loading.
- **Testing**: Add automated tests (e.g., Jest for JavaScript, Cypress for end-to-end) to ensure functionality.
- **Accessibility Audit**: Run Lighthouse or WAVE to improve ARIA compliance and keyboard navigation.
- **CDN**: Use a CDN for external resources (e.g., AOS, Font Awesome) to improve performance.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

© 2025 Pinnacle Advisory Group. All rights reserved.

## Contact

For inquiries, contact Pinnacle Advisory Group:
- **Email**: Via the contact form on the website.
- **Phone**: +254 750 038110
- **Location**: Nairobi, Kenya
- **Social Media**: Links in the footer (Facebook, Twitter, LinkedIn, Instagram).

For repository issues, open a GitHub issue or contact the maintainer.