# Shristi Niroula's Portfolio

A single-page portfolio for a registered nurse: intro, about, an experience and education timeline, licenses and certifications, and a contact form. It opens in the light (white and pink) theme, and a toggle lets visitors switch to dark (black and white); their choice is remembered.

## Built With

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Radix UI Dialog, Sonner and Lucide icons

## Getting Started

Requires Node 18 or newer.

```
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Editing Content

All personal content lives in `src/constants/index.js`: name, intro, LinkedIn, about text, experience and education, and licenses and certifications.

- **CV:** the "Download CV" button serves `public/ShristiNiroulaCV.pdf`, currently a blank placeholder. Replace that file with the real CV (keep the name), or set `personal.cv` to `null` to hide the button.
- **Avatar:** replace `src/assets/personal/avatar.webp` with a square head-and-shoulders photo (384×384 works well).
- **Colors:** the pink accent and both themes are CSS variables at the top of `src/index.css` (`--brand` sets the pink).

## Contact Form

Messages are delivered to `personal.email` (shristin66@gmail.com) through [FormSubmit](https://formsubmit.co/), with the visitor's address set as Reply-To. No account or API key is needed.

Setting `personal.email` to `null` hides the contact form, its "Contact" nav link and the email icon, and "Get in touch" opens LinkedIn instead.

**One-time activation:** the first message sent through the form triggers an email from FormSubmit to that inbox with an "Activate Form" button. Click it once; until then, submissions are not delivered. If sending ever fails, visitors are offered an "Email me" link instead.

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages via `.github/workflows/deploy.yml`, at https://shristin66.github.io/shristisite/.

One-time setup:

1. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. GitHub Pages on a free account only works for **public** repositories. A private repo needs a paid plan (GitHub Pro or above).

Asset and CV paths are relative (`base: './'` in `vite.config.js`), so the same build also works at the root of a custom domain.
