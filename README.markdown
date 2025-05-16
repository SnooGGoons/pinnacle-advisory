# Pinnacle Advisory Website

A modern, responsive website for Pinnacle Advisory Group, providing financial and tax advisory services in Kenya.

## Features
- Responsive design with mobile support
- Formspree integration for contact forms
- Interactive pricing bot
- Floating contact button with chat options
- Lazy loading for images
- Smooth animations and transitions
- Accessibility features (ARIA attributes)
- SEO optimization

## Project Structure
```
project-root/
├── public/
│   ├── index.html
│   ├── pricing.html
│   ├── assets/
│   │   ├── images/
│   │   ├── css/
│   │   ├── js/
│   │   └── fonts/
├── src/
│   ├── scss/
│   ├── js/
├── netlify.toml
├── package.json
├── README.md
└── .gitignore
```

## Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build CSS:
   ```bash
   npm run build:css
   ```
4. Watch CSS changes:
   ```bash
   npm run watch:css
   ```

## Deployment
Deploy to Netlify using the `netlify.toml` configuration.

## Notes
- Replace `your-form-id` in `index.html` and `pricing.html` with your Formspree form ID.
- Replace `your-fontawesome-kit.js` with your FontAwesome kit URL.
- Ensure images are placed in `public/assets/images/`.