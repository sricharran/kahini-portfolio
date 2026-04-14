# Kahini — Psychologist Website v2

A luxury editorial website for Kahini, Psychologist.

## Project Structure

```
kahini-v2/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── script.js
    └── images/
        ├── kahini-photo.jpg
        ├── therapy-chairs.jpg
        └── heart-puzzle.jpg
```

## GitHub Pages Deployment

1. Create a repo (e.g. `kahini`) on GitHub
2. Upload all files preserving folder structure
3. **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Live at: `https://yourusername.github.io/kahini/`

## Connect the Contact Form (Formspree)

1. Sign up at [formspree.io](https://formspree.io) → create a form
2. In `assets/js/script.js`, inside the submit handler, replace the `setTimeout` block with:

```js
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
}).then(r => {
  sendBtn.disabled = false;
  btnText.textContent = 'Send Message';
  if (r.ok) { form.reset(); showMsg("Thank you! I'll be in touch soon.", 'success'); }
  else showMsg('Something went wrong. Please try again.', 'error');
});
```

## Fonts
- **Cormorant Upright / Garamond** — display headings (Google Fonts)
- **Jost** — UI & labels (Google Fonts)
