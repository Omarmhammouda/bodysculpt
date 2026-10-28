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
- **Confirmation screen:** after sending, visitors see "Thank you — we'll contact you within 24 hours."

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Before launch

1. **Activate the form email.** Inquiries are emailed to naimaeljaouhari1@gmail.com through FormSubmit (formsubmit.co). The very first submission sends Naima an activation email from FormSubmit; she has to click **Activate Form** once, and every inquiry after that arrives in her inbox. After activating, FormSubmit gives a random alias for the address — swap it into `data-endpoint` in `index.html` so her email isn't visible in the page source.
2. **Host the photos yourself.** The two photos currently load from a Higgsfield CDN link. Download them, put them in an `assets/` folder, and update the two `<img src>` paths (and the `og:image` tag).
3. **Confirm the details:**
   - the final brand name (Bodysculpt / Naima / Fighter By Nature),
   - the Instagram handle,
   - whether she offers NDAs and a 24-hour response,
   - the client quote.

## Deploy

Any static host works. The simplest options are GitHub Pages (Settings → Pages → deploy from `main`), Netlify, or Vercel (just import the repo).

Fonts: Cormorant Garamond and Jost, loaded from Google Fonts.
