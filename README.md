# josemendozaswe.github.io

Personal site for **José A. Mendoza** — Computer Scientist & Software Engineer, Salesforce Architect.

Static site (plain HTML/CSS/JS, **no build step**) designed for GitHub Pages. Built to keep working
for years with zero maintenance.

## Structure

```
.
├── index.html                  # homepage (single page)
├── 404.html                    # custom not-found page (GitHub Pages serves it automatically)
├── site.webmanifest            # PWA / icon manifest
├── robots.txt                  # search-engine directives + sitemap pointer
├── sitemap.xml                 # list of pages for search engines
├── .nojekyll                   # serve /assets as-is (no Jekyll processing)
├── blog/
│   ├── index.html              # writing index (list of posts)
│   └── hello-world/index.html  # starter post — copy this folder for new posts
└── assets/
    ├── css/site.css            # shared design system (light + dark)
    ├── js/site.js              # theme toggle, scroll reveal, active nav, contact form
    ├── favicon.svg             # site icon
    ├── apple-touch-icon.png    # 180×180 iOS icon
    ├── og-image.png            # 1200×630 social-share card
    ├── jose-mendoza-cv.pdf     # downloadable résumé
    └── profile.jpg             # portrait photo
```

## What makes this "best practice"

- **SEO:** Open Graph + Twitter cards, JSON-LD `Person`/`BlogPosting`, canonical URLs, sitemap, robots.txt.
- **Accessibility (WCAG 2.2):** semantic landmarks, skip link, visible focus states, `aria-current`,
  `prefers-reduced-motion` support.
- **Performance:** one CSS file, one small JS file, `defer`-loaded script, sized images (no layout shift).
- **Privacy:** cookie-free analytics — no consent banner required.
- **Resilience:** no framework, no build, no dependencies to break.

---

## Before you go live — 2 optional keys to fill in

Both are **free** and take ~2 minutes. The site works without them; these just switch on analytics
and the contact form.

### 1. Analytics — GoatCounter (cookie-free)

1. Create a free account at <https://www.goatcounter.com> (pick a code, e.g. `josemendoza`).
2. In `index.html`, find the last line and replace `YOURCODE`:
   ```html
   <script data-goatcounter="https://josemendoza.goatcounter.com/count" ...></script>
   ```

### 2. Contact form — Web3Forms (no backend, spam-protected)

1. Go to <https://web3forms.com>, enter your email, and copy the **Access Key**.
2. In `index.html`, replace **both** occurrences of `YOUR_WEB3FORMS_ACCESS_KEY`
   (the `data-access-key` attribute and the hidden `access_key` input).

> If you skip this, the form still submits (Web3Forms shows a setup page) — but wiring the key means
> messages land straight in your inbox with no spam.

---

## Add a new blog post

1. Copy `blog/hello-world/` to `blog/your-slug/`.
2. Edit the `<title>`, headings, `<meta>` and body text inside `blog/your-slug/index.html`.
3. Add a `<a class="post-row">` entry (newest first) to **both** `blog/index.html` and the
   "Writing" section of `index.html`.
4. Add the URL to `sitemap.xml`.

## Preview locally

```bash
cd josemendozaswe.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish to GitHub Pages

Your username is `josemendozaswe`, so the repo **must** be named `josemendozaswe.github.io`.

```bash
cd josemendozaswe.github.io
git init
git add .
git commit -m "Personal site: editorial design, CV-accurate content, SEO/a11y, blog"
git branch -M main
git remote add origin https://github.com/josemendozaswe/josemendozaswe.github.io.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch →
Branch: `main` / `root`**. Live at <https://josemendozaswe.github.io/> in a minute or two.

## Customizing

- **Content:** everything lives in `index.html`, section by section (marked with `<!-- ═══ ... ═══ -->`).
- **Colors/spacing:** CSS variables at the top of `assets/css/site.css`
  (`:root` for light, `html[data-theme="dark"]` for dark).
- **Accent color:** change `--accent` in both themes.
- **Regenerate the share image** after changing text: edit the SVG and re-run headless Chrome
  (see the source of `assets/og-image.png` — the SVG template was `/tmp/og-image.svg`).
