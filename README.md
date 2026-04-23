# ⏳ Bac II 2026 — Countdown

> A beautifully crafted, fully accessible countdown to Cambodia's **Bac II** (grade-12 high school graduation exam) on **August 10, 2026 at 7:00 AM**.

Written in Khmer. Built with care for students, teachers, and everyone who uses a screen reader.

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-fac400" />
  <img alt="A11y" src="https://img.shields.io/badge/a11y-TalkBack%20%7C%20WCAG%20AA-22c55e" />
</p>

---

## ✨ What's inside

- **Live countdown** — total months, total days, total hours, plus the ticking minutes and seconds.
- **Khmer-first UI** — native `lang="km"`, Noto Sans Khmer + Koulen display typography.
- **Screen-reader friendly** — `aria-live` summaries announce once per minute so TalkBack doesn't shout every second.
- **Reduced-motion aware** — animations politely step aside when the OS asks them to.
- **Responsive** — a single column on tiny phones, five tiles across on desktops.
- **Gold on black** — `#fac400` accent on a calm dark canvas, soft floating orbs, subtle rotating border.

## 🧪 Tech

| | |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Plain CSS (custom properties, `@property`, `contain`) |
| Fonts | Koulen, Noto Sans Khmer, Noto Serif Khmer |

No extra runtime dependencies. No tracking. No analytics.

## 🚀 Quick start

```bash
git clone https://github.com/<your-username>/bac2-countdown.git
cd bac2-countdown
npm install
npm run dev
```

Then open `http://localhost:5173`.

### Scripts

```bash
npm run dev       # start the dev server with HMR
npm run build     # bundle for production into dist/
npm run preview   # preview the production bundle
npm run lint      # run ESLint
```

## 🎯 Change the target date

Open [src/App.jsx](src/App.jsx) and edit one line:

```js
const TARGET_DATE = new Date('2026-08-10T07:00:00+07:00')
```

The timezone offset (`+07:00`) pins the target to Cambodia time regardless of where the visitor lives. Pick any date you like — the layout will adapt.

## ♿ Accessibility notes

- Skip link to main content for keyboard users
- `aria-label` on every time unit, in Khmer
- `aria-live="polite"` region that refreshes **once per minute** — never per second
- `aria-hidden` on the ticking digits so screen readers don't stutter
- Focus rings in gold, visible against any background
- Respects `prefers-reduced-motion`

## 📂 Project layout

```
├─ index.html            # lang="km", meta, Google Fonts preconnect
├─ src/
│  ├─ App.jsx            # countdown logic + JSX tree
│  ├─ App.css            # all component styling
│  ├─ index.css          # tokens, reset, skip-link, focus ring
│  └─ main.jsx           # React entry point
└─ public/               # favicon + static assets
```

## 📝 License

MIT — see [LICENSE](LICENSE). Fork it, reskin it, ship your own countdown. Keep the license notice if you redistribute the source.

## 👤 Credits

Crafted with 💛 by **[Chhit-Sungchhay](https://www.sungchhay.goldeniq.xyz/)** · © 2026 **[@Golden-IQ](https://www.goldeniq.xyz/)**

> _"សូមជូនពរឱ្យប្រឡងជាប់ជាមួយនឹងនិទ្ទេសល្អប្រសើរបំផុត"_
> _(Wishing every student the very best result.)_
