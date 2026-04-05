# 🐾 Lil' Meow Café — Website

A fully custom cat café website with reservations, menu, reviews, gift cards, email confirmations and more.

---

## 📁 Project Structure

```
lilmeow-cafe/
├── index.html              ← Main website
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles & animations
│   ├── js/
│   │   └── main.js         ← All interactivity & logic
│   └── images/             ← Add your photos here
├── .vscode/
│   ├── settings.json       ← Editor settings
│   └── extensions.json     ← Recommended extensions
├── .prettierrc             ← Code formatting rules
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started in VS Code

### 1. Install VS Code
Download from [code.visualstudio.com](https://code.visualstudio.com)

### 2. Open the project
```bash
File → Open Folder → select the lilmeow-cafe folder
```

### 3. Install recommended extensions
VS Code will prompt you — click **"Install All"**
Or manually install:
- **Live Server** — preview the site with hot reload
- **Prettier** — auto-formats your code on save
- **Auto Rename Tag** — rename HTML tags automatically
- **Color Highlight** — see CSS colours inline

### 4. Launch the site
- Right-click `index.html` → **"Open with Live Server"**
- Your browser opens at `http://127.0.0.1:5500`
- Any change you save **instantly updates** in the browser

---

## 🔧 Things to Customise

### Your real details
Search (`Ctrl+F` / `Cmd+F`) and replace these placeholders:

| Placeholder | Replace with |
|---|---|
| `123 Whisker Lane` | Your real address |
| `Your City, State 00000` | Your city & postcode |
| `(555) 000-MEOW` | Your phone number |
| `hello@lilmeowcafe.com` | Your real email |
| `🌸 Now Open in [Your City]` | Your city name |
| `lilmeowcafe` | Your actual social handles |
| `https://lilmeowcafe.com` | Your real domain |

### Google Maps
In `index.html`, find the `<iframe` for Google Maps and replace the `src` URL with your own embed link:
1. Go to [maps.google.com](https://maps.google.com)
2. Search your address → Share → Embed a map → Copy the iframe src URL
3. Paste it into the iframe src in `index.html`

### EmailJS (real email confirmations)
In `main.js`, find and replace:
```js
publicKey: 'YOUR_PUBLIC_KEY'
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', ...)
emailjs.send('YOUR_SERVICE_ID', 'YOUR_NEWSLETTER_TEMPLATE_ID', ...)
```
1. Sign up free at [emailjs.com](https://emailjs.com)
2. Create a Gmail service → get your Service ID
3. Create a booking confirmation template with these variables:
   - `{{to_name}}` `{{to_email}}` `{{booking_ref}}`
   - `{{date}}` `{{time}}` `{{guests}}` `{{package}}` `{{total}}` `{{addon}}`
4. Paste your keys into `main.js`

### Google Analytics
Add your GA4 tracking code just before `</head>` in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Review link
In `index.html`, find:
```
https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review
```
Replace with your Google Business review link.

### Photos
Drop your images into `assets/images/` and reference them in `index.html`:
```html
<img src="assets/images/mochi.jpg" alt="Mochi the cat">
```

---

## 🎨 Colour Palette

All colours are CSS variables in `style.css`:

```css
--pink: #FF8FAB;
--pink-deep: #FF6B9D;
--yellow: #FFD166;
--mint: #B5EAD7;
--lavender: #C9B8FF;
--cream: #FFFBF5;
--brown: #3D1F0D;
```

Change any of these and the whole site updates instantly.

---

## 🌐 Deploying (Going Live)

### Free options
- **Netlify** — drag & drop the folder at [netlify.com/drop](https://app.netlify.com/drop) → live in seconds
- **Vercel** — connect your GitHub repo at [vercel.com](https://vercel.com)
- **GitHub Pages** — free hosting straight from your GitHub repo

### Steps for Netlify (easiest)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire `lilmeow-cafe` folder into the page
3. Your site is live with a free URL instantly
4. Add your custom domain in Netlify settings

---

## 📋 Features Included

- ✅ Full responsive website
- ✅ Custom animated cat cursor + paw trail
- ✅ Animated loading screen
- ✅ Sticky navbar with mobile hamburger menu
- ✅ Hero with floating emoji animations
- ✅ "Who's in the lounge today" widget
- ✅ 10 cat profiles with purr meters & lightbox
- ✅ Photo gallery with lightbox
- ✅ Reviews section with Google review link
- ✅ Tabbed menu (Hot / Iced / Treats)
- ✅ 3-step reservation form with add-ons
- ✅ EmailJS booking confirmation emails
- ✅ Google Maps embed
- ✅ Gift cards section
- ✅ Newsletter / Meow Club signup
- ✅ FAQ accordion
- ✅ Cookie consent banner
- ✅ SEO meta tags + Open Graph
- ✅ Favicon
- ✅ Back to top button
- ✅ Scroll reveal animations

---

Made with 💕 and lots of purring 🐾
