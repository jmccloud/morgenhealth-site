# Morgen Health — marketing site

Static site, no build step. Deployable to GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static host.

## Structure

```
.
├── index.html             Home (teaser: hero, dual proof, audience routing, CTA)
├── individuals.html       For individuals (the deeper individual-facing pitch)
├── partners.html          For partners (payers, ACOs, operators)
├── about.html             About (founder, advisors, dual-origin story)
├── contact.html           Contact (form + email)
├── 404.html               Themed 404
├── for-partners.html      Redirect stub → partners.html (kept so old links don't break)
├── styles/
│   ├── site.css           Site styles (sections, components, layout)
│   ├── colors_and_type.css Canonical design tokens (the design system)
│   └── fonts/
│       ├── Poppins-Bold.otf   (display)
│       └── Inter-Regular.otf  (body)
├── assets/
│   └── logos/             Logo PNGs (4 variants)
└── js/
    └── nav.js             Sticky nav scroll-state + mobile menu
```

## Local preview

Any static server. The simplest:

```bash
# from this folder
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with Node:

```bash
npx serve .
```

Don't open the `.html` files directly via `file://` — the relative `<link>` paths to fonts and CSS work, but some browsers will refuse to load fonts cross-origin. Always serve via a local HTTP server during dev.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `morgenhealth-site`).
2. From this folder, push everything:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/morgenhealth-site.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment**. Set **Source** to "Deploy from a branch", **Branch** to `main`, **Folder** to `/ (root)`. Click **Save**.
4. Wait ~30 seconds. The site will be live at `https://YOUR_USERNAME.github.io/morgenhealth-site/`.

To use a custom domain (e.g. `morgenhealth.com`):

1. In **Settings → Pages → Custom domain**, enter `morgenhealth.com` (or `www.morgenhealth.com`).
2. At your DNS provider, add an `ALIAS` / `ANAME` (or `A`) record pointing to GitHub Pages's IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
3. (Optional) Add a `CNAME` file at the repo root containing your domain on a single line. GitHub usually creates this for you.
4. Enable **Enforce HTTPS** once GitHub finishes the cert provisioning.

## Editing copy

All copy is in the four HTML files at the root. There's no CMS, no shortcodes, no template engine — just edit the HTML directly.

The repeated nav and footer blocks are duplicated across the four files. If you change the nav (e.g., add a link), update all four files (and `404.html`). It's simple, low-friction, and avoids any build complexity.

## Editing design tokens

`styles/colors_and_type.css` is the canonical token file. Don't edit hex values inside `site.css` — change the variable in `colors_and_type.css` and every component picks it up.

## Wiring the contact form (Formspree)

The Contact page (`/contact.html`) has a real form. It posts to **Formspree** — a free 3rd-party service that emails the submission to you. No backend code on your end. To activate it:

1. Sign up free at [formspree.io](https://formspree.io) (50 submissions/month on the free tier).
2. Click **+ New form**, give it a name (e.g. *Morgen Health website*), and set the destination email to `info@morgenhealth.com`.
3. Formspree gives you an endpoint URL like `https://formspree.io/f/abcdwxyz`.
4. Open `contact.html`, find the line that reads:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
   Replace `YOUR_FORM_ID` with your real form ID (the `abcdwxyz` part).
5. Commit + push. The first submission you make will arrive in your Formspree inbox; click the verification link in the email to start receiving submissions at `info@morgenhealth.com`.

Submissions are spam-filtered automatically. The form has a hidden honeypot (`name="_gotcha"`) which blocks most bots.

If you outgrow Formspree's free tier or want fewer dependencies, alternatives that drop in with the same `action="…"` swap: **Web3Forms** (no signup), **Basin**, **Getform**, or **Netlify Forms** (only if you host on Netlify instead of GitHub Pages).

## What's intentionally not here

- **No backend on this codebase.** The contact form posts to Formspree (3rd party); everything else is `mailto:info@morgenhealth.com`.
- **No phone number, no personal email.** Public-facing contact is `info@morgenhealth.com` only.
- **No analytics.** Add Plausible / Fathom / GA later if you want — drop a `<script>` into the `<head>` of each HTML file.
- **No CMS.** This is a brochure site by design.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge — last 2 versions). Uses CSS custom properties, `backdrop-filter`, `clamp()`, CSS grid. Tested down to ~360px viewport width.
