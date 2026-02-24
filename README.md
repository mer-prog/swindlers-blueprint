<p align="center">
  <img src="public/images/og-image.png" alt="SWINDLER'S BLUEPRINT" width="720" />
</p>

<h1 align="center">詐欺師がよく載せる写真<br/>Photos Scammers Love to Post</h1>

<p align="center">
  <em>私のことは覚えなくていい。何ができるかだけ知ってくれ。</em><br/>
  <em>You don't need to remember me. Just know what I can do.</em>
</p>

<p align="center">
  <a href="https://swindlers-blueprint.vercel.app">Live Site</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#showcase">Projects</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#tech-stack">Tech Stack</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#getting-started">Getting Started</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GSAP-3.14-88CE02?logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer&logoColor=white" alt="Framer Motion" />
</p>

---

## Overview

A cinematic, scroll-driven developer portfolio built as a single-page narrative experience. Inspired by cyberpunk aesthetics, classified dossiers, and *The Matrix* — every scroll event is a scene in the story.

**Not your average portfolio.** This is an immersive experience designed to make recruiters, engineers, and designers stop scrolling and start paying attention.

### The Experience

| Scene | Component | What Happens |
|-------|-----------|-------------|
| **BOOT** | `BootSequence` | Terminal-style boot sequence. Typewriter text. Access granted. |
| **HERO** | `Hero` | Title explodes into scattered characters on scroll (GSAP ScrollTrigger) |
| **MANIFESTO** | `Manifesto` | Pinned section — characters pop in one by one as you scroll through |
| **DOSSIER** | `Dossier` | Project cards fade in with stagger. Each card has a scan-line hover effect |
| **ARSENAL** | `TechArsenal` | Terminal window UI. Skill bars animate with real-time counters |
| **THE CHOICE** | `TheChoice` | Red pill or blue pill? Your move. |

Persistent overlays — CRT scanlines, noise texture, and a custom dual-ring cursor — maintain the atmosphere throughout.

---

<h2 id="showcase">Showcase — 6 Deployed Projects</h2>

| # | Project | Stack | Description |
|---|---------|-------|-------------|
| 001 | **[DocuMind](https://documind-pi.vercel.app)** | Next.js 15, FastAPI, PostgreSQL, pgvector | AI document search with hybrid RAG (vector + keyword) |
| 002 | **[LUXE Store](https://luxe-store-ruby.vercel.app)** | Next.js 15, Prisma, Stripe, Resend | Luxury EC with optimistic lock inventory & webhook idempotency |
| 003 | **[BookFlow](https://bookflow-five.vercel.app)** | Next.js 16, Prisma, Recharts | AI-powered booking SaaS with cancellation risk prediction |
| 004 | **[Nexus AI](https://nexus-ai-tau-one.vercel.app)** | Next.js 15, Prisma, NextAuth.js, shadcn/ui | B2B SaaS dashboard with CRM, billing & AI assistant |
| 005 | **[PulseHabit](https://mer-prog.github.io/pulse-habit/docs/showcase.html)** | React Native, Expo SDK 54, SQLite, Supabase | Offline-first habit tracker with async sync & RLS |
| 006 | **[QR Ordering](https://aibuzz-retro-cafe.web.app)** | Vanilla JS, Firebase Firestore, Tailwind CSS | QR-based mobile ordering with real-time kitchen sync |

---

<h2 id="tech-stack">Tech Stack</h2>

### Core

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) (Strict mode) |
| **UI** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS variables |

### Animation

| Library | Role |
|---------|------|
| **[GSAP 3](https://gsap.com/) + ScrollTrigger** | Scroll-linked animations — character scatter, pinned sections, skill bar counters |
| **[Framer Motion 12](https://motion.dev/)** | Modal transitions, pill hover interactions, mount/unmount animations |
| **[Lenis](https://lenis.darkroom.engineering/)** | Smooth scroll with GSAP ticker sync for 60fps consistency |
| **CSS Keyframes** | Glitch effects, scanlines, boot animation, card scan hover |

### Design System

| Element | Value |
|---------|-------|
| **Palette** | `#0a0a0a` black, `#00ff41` matrix green, `#ff0040` red, `#00a8ff` cyan |
| **Fonts** | Orbitron (headings), JetBrains Mono (body/terminal), Noto Sans JP (Japanese) |
| **Effects** | CRT scanlines, SVG noise texture, glitch clip-path, custom cursor |

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx            # Root layout — metadata, fonts, scanline overlay
│   ├── page.tsx              # Single page — Lenis init, GSAP ticker, section orchestration
│   └── globals.css           # Theme variables, keyframes, overlays, reduced-motion support
├── components/
│   ├── BootSequence.tsx      # Entry — typewriter boot, 3s auto-skip
│   ├── Hero.tsx              # GSAP ScrollTrigger character scatter
│   ├── Manifesto.tsx         # Pinned scroll — char-by-char reveal
│   ├── Dossier.tsx           # Project grid with staggered fade-in
│   ├── ProjectCard.tsx       # Card with scan-line hover + external link hardening
│   ├── TechArsenal.tsx       # Terminal-style skill showcase
│   ├── SkillBar.tsx          # Animated bar + counter (GSAP textContent snap)
│   ├── TheChoice.tsx         # Red/blue pill — Framer Motion hover + modal triggers
│   ├── ContactModal.tsx      # "Secure channel" modal — typewriter + spring animation
│   ├── TheEnd.tsx            # Red pill finale — connection termination sequence
│   ├── MatrixRain.tsx        # Canvas-based matrix rain (IntersectionObserver gated)
│   ├── CustomCursor.tsx      # Dual-ring cursor — disabled on touch devices
│   ├── ScanlineOverlay.tsx   # Persistent CRT overlay
│   └── GlitchText.tsx        # Reusable CSS glitch component
├── data/
│   ├── projects.ts           # Project metadata (typed, separated from UI)
│   └── skills.ts             # Skill categories & levels
└── hooks/
    └── useMediaQuery.ts      # useSyncExternalStore-based media query hook
```

**Key decisions:**
- **All client components** — Animation-heavy SPA; no SSR for dynamic content
- **Data layer separated** — `src/data/` keeps content editable without touching components
- **GSAP scoped cleanup** — `useGSAP` hook prevents memory leaks on unmount
- **Accessibility** — `prefers-reduced-motion` respected, custom cursor auto-disabled on touch

---

## Security

Production-hardened with 7 HTTP security headers configured in `next.config.ts`:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Powered-By` | Disabled |

External links use `target="_blank" rel="noopener noreferrer"`. Contact email is loaded from environment variables, not hardcoded.

---

<h2 id="getting-started">Getting Started</h2>

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Setup

```bash
# Clone
git clone https://github.com/mer-prog/swindlers-blueprint.git
cd swindlers-blueprint

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your email address

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email displayed in the modal | Yes |

---

## Deployment

Deployed on **[Vercel](https://vercel.com)** with zero configuration.

```bash
# Deploy via Vercel CLI
npx vercel --prod
```

Or connect the GitHub repository to Vercel for automatic deployments on push.

---

## License

This project is private and not licensed for redistribution.

---

<p align="center">
  <sub>Built with obsessive attention to detail.</sub>
</p>
