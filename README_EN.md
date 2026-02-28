# SWINDLER'S BLUEPRINT — Photos Scammers Love to Post

> **What:** A cinematic, scroll-driven developer portfolio with cyberpunk aesthetics
> **For:** Recruiters and clients looking for an engineer
> **Tech:** Next.js 16 · React 19 · TypeScript 5.9 · Tailwind CSS v4 · GSAP 3 · Framer Motion 12

🔗 **Live Demo:** [https://swindlers-blueprint.vercel.app](https://swindlers-blueprint.vercel.app)
💻 **Source Code:** [https://github.com/mer-prog/swindlers-blueprint](https://github.com/mer-prog/swindlers-blueprint)

---

## Skills Demonstrated

| Skill | Implementation |
|-------|---------------|
| **Advanced Scroll Animations** | GSAP ScrollTrigger-driven character scattering (Hero), pinned section with per-character reveal (Manifesto), scroll-linked parallax + blur |
| **Canvas API & Performance Optimization** | Matrix Rain rendered via Canvas API with IntersectionObserver to halt off-screen drawing. Managed requestAnimationFrame loop |
| **React 19 + Next.js 16 Architecture** | App Router, scoped animation cleanup via `useGSAP`, `useSyncExternalStore`-based media query hook |
| **Design System Engineering** | CSS custom properties for color palette, 3-font management (Orbitron / JetBrains Mono / Noto Sans JP), CRT scanlines, noise texture, glitch effects |
| **Security Implementation** | 7 HTTP security headers (HSTS, X-Frame-Options, etc.), consistent `rel="noopener noreferrer"`, environment variable-based email management |
| **Accessibility** | Full `prefers-reduced-motion` support (disables all animations), auto-hidden custom cursor on touch devices, proper `aria-hidden` attributes |

---

## Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | Next.js 16.1.6 | App Router, SSR/SSG, image optimization (`next/image`), security headers |
| UI Library | React 19.2.3 | Client components, state management (useState/useRef/useEffect) |
| Language | TypeScript 5.9.3 | Strict mode, type-safe component props & data definitions |
| Styling | Tailwind CSS v4 | PostCSS plugin integration, utility classes + custom CSS variables |
| Animation | GSAP 3.14.2 + @gsap/react 2.1.2 | ScrollTrigger (scroll-linked), character scatter, skill bar counters, `useGSAP` |
| Animation | Framer Motion 12.34.3 | Modal open/close (spring), pill hover (scale), AnimatePresence mount/unmount |
| Smooth Scroll | Lenis 1.3.17 | GSAP ticker-synced 60fps consistent scrolling |
| CSS Animations | CSS Keyframes | Glitch, scanlines, boot sequence, card scan, float, blinking cursor |
| Linter | ESLint 9 + eslint-config-next | Core Web Vitals + TypeScript rules |
| Deployment | Vercel | Zero-config deployment, automatic HTTPS |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        layout.tsx (Server)                      │
│   Metadata (OG/Twitter) ── Google Fonts ── ScanlineOverlay      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                     page.tsx (Client "use client")               │
│   Lenis init ── GSAP ticker sync ── Boot state management       │
│                                                                  │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ BootSequence │→ │   Hero   │→ │Manifesto │→ │  Dossier   │  │
│  │  typewriter  │  │  scatter │  │  pinned  │  │   cards    │  │
│  │  skip/auto   │  │ parallax │  │ char-by  │  │  stagger   │  │
│  └──────────────┘  └──────────┘  └──────────┘  └─────┬──────┘  │
│                                                       │         │
│  ┌──────────────┐  ┌──────────┐                ┌──────▼──────┐  │
│  │  TheChoice   │← │TechArsen.│                │ ProjectCard │  │
│  │  red / blue  │  │ terminal │                │  scan hover │  │
│  └──┬───────┬───┘  └──────────┘                └─────────────┘  │
│     │       │                                                    │
│  ┌──▼───┐ ┌─▼──────────┐                                       │
│  │TheEnd│ │ContactModal │                                       │
│  │matrix│ │  typewriter │                                       │
│  │ rain │ │   spring    │                                       │
│  └──────┘ └─────────────┘                                       │
│                                                                  │
│  [Persistent] CustomCursor (GSAP) ── ScanlineOverlay (CRT+Noise)│
└──────────────────────────────────────────────────────────────────┘

┌─────────── Data Layer (src/data/) ────────┐
│  projects.ts ── Metadata for 6 projects    │
│  skills.ts   ── 3 categories, 10 skills    │
└────────────────────────────────────────────┘

┌─────────── Hooks (src/hooks/) ────────────┐
│  useMediaQuery.ts ── useSyncExternalStore  │
│  Used for touch device detection           │
└────────────────────────────────────────────┘
```

---

## Key Features

### 1. Boot Sequence (BootSequence.tsx)
- Terminal-style typewriter that renders 5 lines sequentially
- Characters drawn per tick via `setInterval`, completing in 3 seconds total
- SKIP button for immediate bypass
- White flash on completion (CSS `flash-white` keyframe)
- Scroll locked during boot with `document.body.style.overflow = "hidden"`

### 2. Hero Section (Hero.tsx)
- Background image loaded with `next/image` using `priority`, `fill` + `object-cover` for full-width display
- GSAP ScrollTrigger-driven parallax (`scale 1.15→1.0`) + blur (`0px→8px`) on scroll
- Each character of the title wrapped in `span[data-char]` for individual control
- Characters scatter on scroll with random x/y/rotation via `gsap.utils.random`
- DOM-based glitch layers (red/blue `clip-path` animations)
- Fully responsive text sizing with `clamp()`
- License plate blur treatment with `backdrop-filter: blur(25px)`

### 3. Manifesto (Manifesto.tsx)
- ScrollTrigger `pin: true` locks the viewport with `+=300%` scroll distance
- All characters from Japanese/English text generated as `span` elements, animated one by one (`opacity: 0→1` + `translateY: 20px→0`)
- `scrub: 1` for perfect synchronization with scroll position
- Glitch flash overlay on completion
- MatrixRain component in background (opacity: 0.1)

### 4. Project Showcase (Dossier.tsx + ProjectCard.tsx)
- Displays 6 projects from `src/data/projects.ts`
- 2-column grid (`md:grid-cols-2`) with staggered fade-in (`y: 80, stagger: 0.15`)
- Scan-line hover effect on each card (`card-scan` keyframe — green line sweeps vertically)
- Status indicator (DEPLOYED = green, IN DEVELOPMENT = red)
- Tech stack as tags, external links with `rel="noopener noreferrer"`

### 5. Tech Skills Display (TechArsenal.tsx + SkillBar.tsx)
- Terminal window UI (macOS-style red/yellow/green dots, `capabilities.sh` title bar)
- 3 categories (FRONTEND / BACKEND / TOOLS) with bilingual descriptions
- Skill bars: Unicode block characters (`█` / `░`) split into 30 segments
- GSAP animates `width: 0→level%` + `textContent` counter with `snap: 1` for integer display
- Scroll-triggered with index-based stagger delay

### 6. The Choice (TheChoice.tsx)
- Matrix-inspired "red pill / blue pill" selection UI
- Framer Motion `whileHover: { scale: 1.1 }` for interactive hover
- CSS `animate-float` (vertical floating animation)
- Question text split into individual `span` elements with GSAP sequential reveal
- Red pill → TheEnd (termination sequence), Blue pill → ContactModal (contact form)

### 7. Contact Modal (ContactModal.tsx)
- Framer Motion `AnimatePresence` for mount/unmount animations
- `spring` transition (damping: 25, stiffness: 300) for bouncy open/close
- "SECURE CHANNEL ESTABLISHED" typewriter header
- Blue flash effect (`opacity: [0, 0.3, 0]`)
- Email address loaded from `process.env.NEXT_PUBLIC_CONTACT_EMAIL`
- Backdrop click to dismiss

### 8. End Sequence (TheEnd.tsx)
- 5-phase timed sequence (flash → TERMINATED → collapse → THE END → retry)
- Each character of "CONNECTION TERMINATED" individually animated with Framer Motion (falling + rotation)
- Deterministic pseudo-random rotation angles (`(i * 7 + 13) % 90 - 45`)
- MatrixRain background (opacity: 0.5, density: 1.5)
- "Try Again?" button scrolls smoothly back to top

### 9. Matrix Rain (MatrixRain.tsx)
- Canvas API rendering of katakana + alphanumeric matrix rain
- `IntersectionObserver` halts drawing when off-screen (performance optimization)
- `requestAnimationFrame` loop for 60fps rendering
- Configurable via `density` (column count) and `opacity` (brightness) props
- Responsive to window resize events

### 10. Custom Cursor (CustomCursor.tsx)
- GSAP-driven dual-ring cursor (dot + ring)
- Ring expands on link/button hover (30px → 50px)
- Auto-hidden on touch devices via `useMediaQuery("(pointer: coarse)")`
- Positioned at z-index 99999/99998 for topmost layer

### 11. Persistent Overlays (ScanlineOverlay.tsx + globals.css)
- CRT scanlines (2px-spaced `repeating-linear-gradient`)
- SVG noise texture (`feTurbulence` filter, opacity: 0.03)
- Both use `pointer-events: none` to avoid blocking interaction

---

## Page Structure / Screen Specs

This site is a single-page application (SPA). While it uses Next.js App Router, the only route is `/`.

| Section | Component | Scroll Behavior | Content |
|---------|-----------|----------------|---------|
| BOOT | `BootSequence` | Scroll disabled (`overflow: hidden`) | Terminal-style boot animation. Completes in 3s or via SKIP |
| HERO | `Hero` | Normal scroll + ScrollTrigger | Title display, parallax background, character scatter |
| MANIFESTO | `Manifesto` | Pinned (`+=300%`) | "You don't need to remember me. Just know what I can do." — per-character reveal |
| DOSSIER | `Dossier` | Normal scroll + stagger | 6-project card grid |
| ARSENAL | `TechArsenal` | Normal scroll + trigger | Terminal-style skill showcase |
| THE CHOICE | `TheChoice` | Normal scroll + trigger | Red/blue pill selection UI |
| — | `ContactModal` | Fullscreen modal | Shown when blue pill is selected |
| — | `TheEnd` | Fullscreen modal | Shown when red pill is selected |

**Persistent Layers:**
- `ScanlineOverlay` — CRT scanlines + noise (z-index: 9999/9998)
- `CustomCursor` — Dual-ring cursor (z-index: 99999)

**Routing:**
- File-based routing (Next.js App Router)
- `src/app/layout.tsx` — Root layout (metadata, fonts, ScanlineOverlay)
- `src/app/page.tsx` — The only page ("use client")

---

## Design System

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg-primary` | `#0a0a0a` | Main background |
| `--bg-secondary` | `#111111` | Card background |
| `--green` | `#00ff41` | Matrix green (accent, links, cursor, skill bars) |
| `--red` | `#ff0040` | Red pill, CLASSIFIED badge |
| `--blue` | `#00a8ff` | Blue pill, glitch layer |
| `--text` | `#e0e0e0` | Body text |
| `--muted` | `#666666` | Sub-text, labels |
| `--classified-red` | `#ff3333` | CLASSIFIED heading, borders |

### Typography

| Font | CSS Variable | Usage |
|------|-------------|-------|
| Orbitron (400/700/900) | `--font-orbitron` | Headings, section titles, THE END |
| JetBrains Mono (400/700) | `--font-jetbrains` | Body, terminal UI, code display |
| Noto Sans JP (400/700/900) | `--font-noto` | Japanese text |

### Animations (CSS Keyframes)

| Keyframe | Purpose |
|----------|---------|
| `glitch` / `glitch-alt` | Text glitch (clip-path + translate) |
| `heavy-glitch` | Intense glitch (with skew, used in TheEnd) |
| `boot-scanline` | Boot screen scan line |
| `float` | Pill vertical float |
| `scroll-bounce` | Scroll indicator |
| `blink-cursor` | Typewriter cursor blink |
| `card-scan` | Card hover scan line |
| `flash-white` / `flash-blue` / `flash-red` | Screen flash effects |

### Responsive Design

- Fluid typography via `clamp()` (e.g., `clamp(2rem, 8vw, 10rem)`)
- Tailwind breakpoint: `md:` (768px) toggles grid from 1 → 2 columns
- Touch device detection: `(pointer: coarse)` hides custom cursor, restores `cursor: auto`
- `prefers-reduced-motion: reduce` disables all animations

---

## Project Structure

```
swindlers-blueprint/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg              # Hero background image
│   │   ├── og-image.png             # Open Graph image
│   │   ├── favicon.png              # Favicon
│   │   ├── pill-red.png             # Red pill image
│   │   ├── pill-blue.png            # Blue pill image
│   │   ├── documind.png             # Project screenshot
│   │   ├── luxe-store.png           # Project screenshot
│   │   ├── bookflow.png             # Project screenshot
│   │   ├── nexus-ai.png             # Project screenshot
│   │   ├── pulse-habit.png          # Project screenshot
│   │   └── qr-ordering.png          # Project screenshot
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout (65 lines)
│   │   ├── page.tsx                 # Main page (67 lines)
│   │   ├── globals.css              # Global CSS (327 lines)
│   │   └── favicon.ico
│   ├── components/
│   │   ├── BootSequence.tsx         # Boot animation (129 lines)
│   │   ├── Hero.tsx                 # Hero section (270 lines)
│   │   ├── Manifesto.tsx            # Pinned manifesto (163 lines)
│   │   ├── Dossier.tsx              # Project listing (88 lines)
│   │   ├── ProjectCard.tsx          # Project card (192 lines)
│   │   ├── TechArsenal.tsx          # Skill display (159 lines)
│   │   ├── SkillBar.tsx             # Skill bar (105 lines)
│   │   ├── TheChoice.tsx            # Red/blue pill choice (200 lines)
│   │   ├── ContactModal.tsx         # Contact modal (173 lines)
│   │   ├── TheEnd.tsx               # End sequence (213 lines)
│   │   ├── MatrixRain.tsx           # Matrix Rain Canvas (96 lines)
│   │   ├── CustomCursor.tsx         # Custom cursor (89 lines)
│   │   ├── ScanlineOverlay.tsx      # CRT overlay (10 lines)
│   │   └── GlitchText.tsx          # Glitch text (21 lines)
│   ├── data/
│   │   ├── projects.ts              # Project data (72 lines)
│   │   └── skills.ts                # Skill data (27 lines)
│   └── hooks/
│       └── useMediaQuery.ts         # Media query hook (22 lines)
├── .env.example                     # Environment variable template
├── .gitignore
├── eslint.config.mjs                # ESLint config
├── next.config.ts                   # Next.js config (security headers)
├── package.json
├── postcss.config.mjs               # PostCSS (Tailwind CSS v4)
└── tsconfig.json                    # TypeScript config (strict)
```

**Total source code: ~2,500 lines (including CSS)**

---

## Setup

```bash
# Clone
git clone https://github.com/mer-prog/swindlers-blueprint.git
cd swindlers-blueprint

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_CONTACT_EMAIL

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email address displayed in the contact modal | Yes |

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js 16 (App Router)** | Leverages image optimization (`next/image`), Metadata API (OGP/Twitter), and security header configuration. SPA architecture but benefits from server-side metadata rendering |
| **All "use client" components** | Animation-centric SPA where GSAP, Framer Motion, and Canvas API all depend on browser APIs. Client-side flexibility outweighs server component benefits |
| **GSAP + Framer Motion combined** | GSAP excels at scroll-linked animations (ScrollTrigger), while Framer Motion shines at mount/unmount (AnimatePresence) and declarative hover states. Each used for its strengths |
| **Lenis smooth scroll** | Synced with GSAP ticker for consistent 60fps ScrollTrigger animations. Native scroll introduces jank when paired with GSAP |
| **Tailwind CSS v4 + CSS custom properties** | Utility classes for rapid development, while cyberpunk theme colors and fonts are centralized via CSS variables. Complex animations (glitch, etc.) implemented as CSS keyframes |
| **Separated data layer (src/data/)** | Project info and skill data decoupled from UI components. Content updates don't require touching component files |
| **Canvas-based Matrix Rain** | DOM-based approach would cause performance degradation with hundreds of real-time element updates. Canvas API provides direct rendering with IntersectionObserver for off-screen pausing |
| **useSyncExternalStore** | Safely synchronizes media query changes with React's concurrent features. The `useState` + `useEffect` pattern risks tearing |
| **Vercel deployment** | Platform built by the creators of Next.js. Zero-config, automatic HTTPS, Edge Functions support |

---

## Running Costs

| Service | Plan | Monthly |
|---------|------|---------|
| Vercel | Hobby (Free) | $0 |
| Google Fonts | Free | $0 |
| GitHub | Free | $0 |
| **Total** | | **$0** |

---

## Author

[@mer-prog](https://github.com/mer-prog)
