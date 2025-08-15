Portfolio Website (Static)

Overview
- Modern, fast, 3-page static site: `index.html`, `projects.html`, `contact.html`.
- Plain HTML/CSS/JS. No frameworks, no build step.
- Dark/light theme with localStorage + `prefers-color-scheme`.
- Subtle, accessible animations (disabled with `prefers-reduced-motion`).

Edit Guide
- Branding: Update name in page titles, headers, footer year is automatic.
- Colors/spacing: Edit CSS tokens in `assets/css/styles.css` under `:root` and `html:not(.theme-dark)`.
- Navigation: Header is duplicated across pages; update once then copy if needed.
- Projects: Modify cards in `projects.html` and the featured ones in `index.html`.
- Contact: The form is mock-submission only. Replace with your provider or use `mailto:` link.

Theme Toggle
- Implemented in `assets/js/main.js`. Adds/removes `theme-dark` on `<html>` and persists preference.

Performance Notes
- System font stack, no external fonts.
- No image assets required; SVG icons inline.
- Minimal JS; animations via IntersectionObserver.

Local Preview
- Open `index.html` in your browser (no server required). If using a dev server, any static server works.

