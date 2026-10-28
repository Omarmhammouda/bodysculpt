# Bodysculpt — Private coaching with Naima El Jaouhari

A single-page site for Naima El Jaouhari's private coaching practice, built from the **A3 — Private Practice / Noir** design. It's a static site (plain HTML, CSS and JavaScript, no build step), so it can be hosted anywhere.

## What's in it

- **Hero:** positioning line, primary and secondary call-to-action buttons, and the hero portrait.
- **Principles:** Discretion, Precision and Continuity.
- **The practice:** the five disciplines alongside the self-defense stance photo.
- **Meet Naima:** her bio and credentials.
- **Client quote.**
- **Private consultation form:** "For myself / On behalf of a client" toggle, contact details, preferred setting, focus areas, notes, and a confidentiality-agreement checkbox.
- **Sticky booking bar on phones:** visible at all times, but it slides away once the form itself is on screen so there aren't two buttons at once.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Before launch

1. **Hook up the form.** Create a form endpoint (for example, a free Formspree form) and paste its URL into `data-endpoint` on the `<form id="consult-form">` tag in `index.html`. Until then, the form validates and shows the thank-you message but doesn't send anything.
2. **Host the photos yourself.** The two photos currently load from a Higgsfield CDN link. Download them, put them in an `assets/` folder, and update the two `<img src>` paths (and the `og:image` tag).
3. **Confirm the details:**
   - the final brand name (Bodysculpt / Naima / Fighter By Nature),
   - the Instagram handle,
   - whether she offers NDAs and a one-business-day response,
   - the client quote.

## Deploy

Any static host works. The simplest options are GitHub Pages (Settings → Pages → deploy from `main`), Netlify, or Vercel (just import the repo).

Fonts: Cormorant Garamond and Jost, loaded from Google Fonts.
