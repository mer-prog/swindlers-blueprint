# SWINDLER'S BLUEPRINT — Scroll-Driven Cyberpunk Portfolio with Cinematic Flair

> **What:** An interactive portfolio site where CRT scanlines, glitch effects, and Canvas-rendered Matrix Rain converge in a Matrix-inspired universe
> **For:** Recruiters and clients seeking a skilled engineer
> **Tech:** Next.js 16 · React 19 · TypeScript 5.9 · Tailwind CSS v4 · GSAP 3 · Framer Motion 12

**Live Demo:** [https://swindlers-blueprint.vercel.app](https://swindlers-blueprint.vercel.app)
**Source Code:** [https://github.com/mer-prog/swindlers-blueprint](https://github.com/mer-prog/swindlers-blueprint)

---

## Skills Demonstrated

| Skill | Implementation |
|-------|---------------|
| **Advanced Scroll Animations** | GSAP ScrollTrigger drives hero title character scattering (random x/y/rotation), Manifesto section pinning (`pin: true` + `scrub: 1`) with per-character reveal, background parallax (`scale 1.15→1.0`) synced with scroll-linked blur (`0px→8px`) |
| **Canvas API & Performance Optimization** | Matrix Rain rendered via Canvas API using katakana + alphanumeric characters. `IntersectionObserver` halts off-screen drawing, `requestAnimationFrame` loop maintains 60fps |
| **React 19 + Next.js 16 Architecture** | App Router setup, scoped animation cleanup via `useGSAP`, `useSyncExternalStore`-based media query hook (prevents tearing), Lenis/GSAP ticker synchronization |
| **Design System Engineering** | CSS custom properties for an 8-color palette, 3-font management (Orbitron / JetBrains Mono / Noto Sans JP), 8 CSS Keyframe animations (glitch, scanlines, float, etc.) |
| **Security Implementation** | 6 HTTP security headers in `next.config.ts` (HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy) + `poweredByHeader: false`, consistent `rel="noopener noreferrer"` on external links, environment variable-based email management |
| **Accessibility** | Full `prefers-reduced-motion: reduce` support (disables all CSS animations), `(pointer: coarse)` auto-hides custom cursor and restores native cursor on touch devices, `aria-hidden` on decorative glitch layers |
| **Cinematic UX Choreography** | 5-line typewriter boot sequence (with SKIP), Matrix-inspired red/blue pill branching, 5-phase timed end sequence (character fall + rotation animations), Framer Motion `spring` transitions for modal interactions |

---

## Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | Next.js 16.1.6 | App Router, Metadata API (OGP/Twitter Cards), `next/image` optimization, security header configuration |
| UI Library | React 19.2.3 | Client components, state management (`useState` / `useRef` / `useEffect` / `useCallback`) |
| Language | TypeScript 5.9.3 | `strict: true` mode, type-safe component props and data interface definitions |
| Styling | Tailwind CSS v4 | Via `@tailwindcss/postcss` plugin, utility classes combined with CSS custom properties |
| Animation | GSAP 3.14.2 + @gsap/react 2.1.2 | ScrollTrigger (pinning, scrub, parallax), character scatter, skill bar counters, `useGSAP` hook |
| Animation | Framer Motion 12.34.3 | `AnimatePresence` for mount/unmount, `spring` transitions, `whileHover`, per-character `motion.span` animation |
| Smooth Scroll | Lenis 1.3.17 | GSAP `ticker`-synced 60fps consistent scrolling, `lagSmoothing(0)` to eliminate jitter |
| CSS Animations | CSS Keyframes (8 types) | `glitch` / `glitch-alt` / `heavy-glitch` / `boot-scanline` / `float` / `scroll-bounce` / `blink-cursor` / `card-scan` |
| Linter | ESLint 9 + eslint-config-next 16.1.6 | Core Web Vitals rules + TypeScript rules |
| Deployment | Vercel | Zero-config deployment, automatic HTTPS, Edge support |

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    layout.tsx (Server Component)                  │
│   Metadata (OGP/Twitter) ── Google Fonts (3 families) ──         │
│   ScanlineOverlay                                                │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│                  page.tsx (Client — "use client")                 │
│   Lenis init ── GSAP ticker sync ── Boot state management        │
│                                                                   │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐   │
│  │ BootSequence │→ │   Hero   │→ │Manifesto │→ │  Dossier   │   │
│  │  typewriter  │  │ scatter  │  │  pinned  │  │ card grid  │   │
│  │  skip/auto   │  │ parallax │  │ char-by  │  │  stagger   │   │
│  └──────────────┘  └──────────┘  └──────────┘  └─────┬──────┘   │
│                                                       │          │
│  ┌──────────────┐  ┌──────────┐                ┌──────▼──────┐   │
│  │  TheChoice   │← │TechArsen.│                │ ProjectCard │   │
│  │  red / blue  │  │ terminal │                │  scan hover │   │
│  └──┬───────┬───┘  └──────────┘                └─────────────┘   │
│     │       │                                                     │
│  ┌──▼───┐ ┌─▼──────────┐                                        │
│  │TheEnd│ │ContactModal │                                        │
│  │matrix│ │  typewriter │                                        │
│  │ rain │ │   spring    │                                        │
│  └──────┘ └─────────────┘                                        │
│                                                                   │
│  [Persistent] CustomCursor (GSAP) ── ScanlineOverlay (CRT+Noise)│
└───────────────────────────────────────────────────────────────────┘

┌──────────── Data Layer (src/data/) ───────────┐
│  projects.ts ── Metadata for 6 projects        │
│  skills.ts   ── 3 categories, 10 skill levels  │
└────────────────────────────────────────────────┘

┌──────────── Hooks (src/hooks/) ────────────────┐
│  useMediaQuery.ts ── useSyncExternalStore-based │
│  Used for touch device detection (pointer:      │
│  coarse)                                        │
└─────────────────────────────────────────────────┘
```

---

## Key Features

### 1. Boot Sequence (BootSequence.tsx — 129 lines)

A terminal-style startup sequence. Five system messages are rendered character-by-character via `setInterval` (30ms ticks), completing in 3 seconds total. Per-line typing speed is dynamically calculated as `Math.ceil(fullLine.length / (LINE_DELAY / 30))`.

- **Fixed overlay:** `z-index: 10002`, background `#0a0a0a`
- **Scanlines:** `repeating-linear-gradient` for green CRT lines, `boot-scanline` keyframe for vertical sweep
- **Typewriter cursor:** `blink-cursor` keyframe flashes a `█` block character
- **SKIP button:** Immediately sets `isComplete` to `true`, calls `onComplete` after 300ms
- **White flash:** On completion, triggers `flash-white` keyframe (0.5s) for a full-screen white burst
- **Scroll lock:** During boot, `document.body.style.overflow = "hidden"` prevents scrolling

### 2. Hero Section (Hero.tsx — 270 lines)

Full-viewport background via `next/image` with `priority` + `fill` + `object-cover`. Composed of 7 visual layers.

- **Parallax + blur:** `gsap.fromTo` animates `scale: 1.15→1.0` and `filter: blur(0px)→blur(8px)` with `scrub: 1` for perfect scroll synchronization
- **Title character scatter:** All 11 characters of the Japanese title are wrapped in `span[data-char]` for individual control. Kanji use `fontSize: 1em`, hiragana use `fontSize: 0.7em`. On scroll, `gsap.utils.random(-200, 200)` randomizes x/y/rotation per character
- **DOM glitch layers:** Red (`glitch` keyframe) and blue (`glitch-alt` keyframe) layers positioned with `aria-hidden`. `clip-path: inset()` + `translate` create a 3-second glitch cycle
- **Gradient fade:** Bottom section uses `linear-gradient(to bottom, transparent → #0a0a0a)` for a seamless transition
- **License plate blur:** `backdrop-filter: blur(25px)` masks a specific region in the hero image
- **Responsive:** `clamp(2rem, 8vw, 10rem)` for fluid typography
- **Annotation text:** A subtle joke disclaimer fades in with `delay: 2` at `opacity: 0.5`

### 3. Manifesto (Manifesto.tsx — 163 lines)

A ScrollTrigger-pinned section that locks the viewport with `pin: true` and uses `+=300%` scroll distance to reveal all characters.

- **Text content:** Two bilingual lines — Japanese text with English translation below each
- **Character construction:** Inside `useGSAP`, DOM manipulation generates each character as a `span` element with initial `opacity: 0` + `translateY: 20px`
- **Animation:** `gsap.to(allChars, { opacity: 1, y: 0, textShadow: "0 0 10px rgba(0,255,65,0.3)", stagger: 0.03, scrub: 1 })`
- **English line styling:** `fontFamily: var(--font-jetbrains)`, `color: var(--muted)`, `fontSize: clamp(0.8rem, 1.5vw, 1.2rem)`
- **Glitch flash:** At `+=280%` scroll, adds `heavy-glitch` class for 300ms then removes it
- **Background:** MatrixRain component at `opacity: 0.1`

### 4. Project Showcase (Dossier.tsx — 88 lines + ProjectCard.tsx — 192 lines)

Loads 6 project entries from `src/data/projects.ts` and displays them as classified dossier files.

- **Header:** Orbitron font, `classified-red` border (3px), `rotate(-2deg)` for angled styling
- **Grid:** `grid-cols-1 md:grid-cols-2` with `gap-8`
- **Card animation:** `gsap.from` with `y: 80, opacity: 0, stagger: 0.15, duration: 0.8`
- **Scan hover effect:** `card-scan` keyframe sweeps a 60px-wide green line vertically (`animation: card-scan 2s linear infinite`)
- **Status indicator:** `DEPLOYED` = green dot + green text, `IN DEVELOPMENT` = red dot + red text
- **Tech tags:** Semi-transparent green border (`rgba(0,255,65,0.3)`) with subtle background (`rgba(0,255,65,0.05)`)
- **Images:** `next/image` with `fill` + `aspect-ratio: 16/9`, `sizes="(max-width: 768px) 100vw, 50vw"`
- **External links:** Always include `rel="noopener noreferrer"`, green text glow on hover via `textShadow`

### 5. Tech Skills Display (TechArsenal.tsx — 159 lines + SkillBar.tsx — 105 lines)

A macOS-style terminal window UI that visualizes skill levels.

- **Window bar:** Red/yellow/green traffic light dots (`w-3 h-3 rounded-full`), title bar reads "capabilities.sh"
- **3 categories:** FRONTEND (4 skills) / BACKEND (3 skills) / TOOLS (3 skills), each with bilingual descriptions
- **Skill bars:** Unicode block characters — `totalBlocks = 30`, filled with `█` and empty with `░`
- **Animation:** GSAP animates `width: 0→level%` expansion + `textContent: 0→level` counter with `snap: { textContent: 1 }` for integer display
- **Trigger:** `start: "top 85%"` for scroll-based activation, `delay: index * 0.1` for stagger
- **Terminal decorations:** `┌─ FRONTEND ─────────────────────┐` style box-drawing dividers

### 6. The Choice (TheChoice.tsx — 200 lines)

A Matrix-inspired red pill / blue pill branching UI.

- **Question text:** Splits into individual `span` elements inside `useGSAP`, reveals with `stagger: 0.05`
- **Pill images:** `next/image` at `width/height: 250`, `unoptimized`, `drop-shadow` filter for red/blue glow
- **Hover:** Framer Motion `whileHover: { scale: 1.1 }` for enlargement
- **Float:** CSS `animate-float` keyframe for 3-second vertical bobbing. Blue pill offset by `animationDelay: "1.5s"`
- **Fade-in:** `gsap.from(".pill-container", { opacity: 0, y: 40, stagger: 0.2 })` at `start: "top 40%"`
- **Red pill → TheEnd:** Sets `showEnd` state to `true`, triggering the end sequence modal
- **Blue pill → ContactModal:** Sets `showContact` state to `true`, triggering the contact modal

### 7. Contact Modal (ContactModal.tsx — 173 lines)

A fullscreen modal controlled by Framer Motion `AnimatePresence`.

- **Open/close animation:** `spring` transition (`damping: 25, stiffness: 300`) scales from `0.8→1.0`
- **Blue flash:** On open, `opacity: [0, 0.3, 0]` (0.5s) pulses the entire screen blue
- **Typewriter header:** "SECURE CHANNEL ESTABLISHED" rendered character-by-character via `setInterval(40ms)`
- **Email address:** Loaded from `process.env.NEXT_PUBLIC_CONTACT_EMAIL`. Wrapped in a `mailto:` link with green glow on hover
- **Footer message:** Bilingual — Japanese message above, English below
- **Dismiss options:** Backdrop click, [X] button, or "CLOSE CHANNEL [X]" button
- **Backdrop:** `rgba(0,0,0,0.85)` semi-transparent overlay

### 8. End Sequence (TheEnd.tsx — 213 lines)

A 5-phase, time-controlled sequence delivering a cinematic ending.

- **Phase 0 (0–0.8s):** Red flash (`opacity: [0, 0.4, 0]`) + `heavy-glitch` overlay with red scanlines
- **Phase 1 (0.8s+):** "CONNECTION TERMINATED" text appears
- **Phase 2 (3s+):** Each character animates individually via Framer Motion `motion.span`. `y: [0, -20, 100]` (rise then fall), `rotate: [0, 0, CHAR_ROTATIONS[i]]` (deterministic angles via `(i * 7 + 13) % 90 - 45`)
- **Phase 3 (4s+):** "THE END." (Orbitron, white) + subtitle fades in over 1 second
- **Phase 4 (6s+):** "Try Again?" button slides in (`y: 20→0`). Clicking calls `window.scrollTo({ top: 0, behavior: "smooth" })` to return to top
- **Background:** MatrixRain at `opacity: 0.5, density: 1.5`

### 9. Matrix Rain (MatrixRain.tsx — 96 lines)

Real-time Canvas API rendering of the iconic matrix rain effect.

- **Character set:** Full-width katakana + digits (0–9) + uppercase ASCII (A–Z), totaling 82 characters
- **Column width:** Fixed at 20px. Column count = `Math.floor((canvasWidth / 20) * density)`
- **Rendering logic:** Each frame overlays `rgba(10, 10, 10, 0.05)` for a fading trail effect. `fillText` draws green random characters
- **Drop speed:** `0.5 + Math.random() * 0.5` for subtle randomization
- **Reset condition:** `drops[i] * 20 > canvas.height && Math.random() > 0.975` wraps the column back to top
- **Performance:** `IntersectionObserver` (`threshold: 0`) pauses the `requestAnimationFrame` loop when off-screen
- **Resize handling:** `window.addEventListener("resize")` recalculates canvas dimensions and column count
- **Props:** `opacity` (character brightness), `density` (column count multiplier), `className`

### 10. Custom Cursor (CustomCursor.tsx — 89 lines)

A GSAP-driven dual-ring cursor that replaces the native pointer.

- **Dot:** 8px green circle (`w-2 h-2 rounded-full`), follows mouse at `duration: 0.1`
- **Ring:** 30px green border (`border: 1px solid var(--green)`), follows at `duration: 0.3` for smooth trailing
- **Hover expansion:** On `a, button, [role='button']` mouseenter, ring grows to `50px` with `opacity: 0.5`
- **Touch devices:** When `useMediaQuery("(pointer: coarse)")` returns `true`, the component returns `null` (no render)
- **z-index:** Dot at 99999, ring at 99998

### 11. Persistent Overlays (ScanlineOverlay.tsx — 10 lines)

CRT monitor-style visual effects applied across the entire viewport at all times.

- **Scanlines:** `repeating-linear-gradient(0deg)` creates 2px-spaced horizontal lines at `rgba(0, 0, 0, 0.03)`
- **Noise texture:** SVG `feTurbulence` filter (`fractalNoise`, `baseFrequency: 0.9`, `numOctaves: 4`) overlaid at `opacity: 0.03`
- **Non-blocking:** Both layers use `pointer-events: none` to avoid interfering with user interaction
- **z-index:** Scanlines at 9999, noise at 9998
- **Accessibility:** Both elements have `aria-hidden="true"`

### 12. Glitch Text (GlitchText.tsx — 21 lines)

A reusable component for CSS-powered glitch effects using `::before` / `::after` pseudo-elements. Sets `data-text` attribute from the `text` prop and applies the `glitch-text` class for red/blue `clip-path` animations. The `as` prop allows rendering as any HTML tag.

---

## Page Structure / Screen Specifications

Single-page application (SPA) architecture. Uses Next.js App Router but serves only the `/` route.

| Section | Component | Scroll Behavior | Content |
|---------|-----------|----------------|---------|
| BOOT | `BootSequence` | Scroll disabled (`overflow: hidden`) | Terminal-style startup. Auto-completes in 3s, or instant skip via SKIP button |
| HERO | `Hero` | Normal scroll + ScrollTrigger | Title display, parallax background, character scatter, DOM glitch layers |
| MANIFESTO | `Manifesto` | Pinned (`+=300%`) + `scrub: 1` | Per-character scroll-synced reveal of the manifesto text |
| DOSSIER | `Dossier` + `ProjectCard` | Normal scroll + stagger | 6-project card grid with scan-line hover effects |
| ARSENAL | `TechArsenal` + `SkillBar` | Normal scroll + trigger | Terminal-style skill bars. 3 categories, 10 skills rendered with Unicode blocks |
| THE CHOICE | `TheChoice` | Normal scroll + trigger | Red/blue pill branching UI |
| — | `ContactModal` | Fullscreen modal (`z-index: 10003`) | Triggered by blue pill. Typewriter header + spring animation |
| — | `TheEnd` | Fullscreen modal (`z-index: 10003`) | Triggered by red pill. 5-phase timed end sequence |

**Persistent Layers:**
- `ScanlineOverlay` — CRT scanlines (z-index: 9999) + SVG noise (z-index: 9998)
- `CustomCursor` — GSAP-driven dual-ring cursor (z-index: 99999 / 99998)

**Routing:**
- `src/app/layout.tsx` — Server component. Metadata (OGP/Twitter Cards), Google Fonts loading, `ScanlineOverlay` placement, `scrollRestoration: 'manual'`
- `src/app/page.tsx` — The only client page (`"use client"`). Lenis initialization, GSAP ScrollTrigger registration, boot state management

---

## Design System

### Color Palette

| CSS Variable | Value | Usage |
|-------------|-------|-------|
| `--bg-primary` | `#0a0a0a` | Main background, Canvas trail color |
| `--bg-secondary` | `#111111` | Card backgrounds |
| `--green` | `#00ff41` | Matrix green — accent, links, cursor, skill bars, scanlines, typewriter cursor |
| `--red` | `#ff0040` | Red pill, status (IN DEVELOPMENT), glitch `::before` layer |
| `--blue` | `#00a8ff` | Blue pill, glitch `::after` layer, blue flash effect |
| `--text` | `#e0e0e0` | Body text |
| `--muted` | `#666666` | Sub-text, labels, SKIP button, English sub-text |
| `--classified-red` | `#ff3333` | CLASSIFIED headings and borders |

### Typography

| Font | CSS Variable | Weights | Usage |
|------|-------------|---------|-------|
| Orbitron | `--font-orbitron` | 400 / 700 / 900 | Section titles, pill labels (THE END / CONTACT), end sequence title |
| JetBrains Mono | `--font-jetbrains` | 400 / 700 | Base font (`body`), terminal UI, English sub-text, code display |
| Noto Sans JP | `--font-noto` | 400 / 700 / 900 | All Japanese text (manifesto, question text, descriptions, footer messages) |

### Animations (CSS Keyframes — 8 types)

| Keyframe | Duration | Purpose |
|----------|----------|---------|
| `glitch` / `glitch-alt` | 3s | Text glitch. `clip-path: inset()` + `translate` offsets red/blue layers |
| `heavy-glitch` | 0.5s | Intense glitch with `skewX`. Used on Manifesto completion and TheEnd phase 0 |
| `boot-scanline` | 2s | Green scan line sweeping vertically (`top: -10%→110%`) |
| `float` | 3s | Pill image vertical bobbing (`translateY: 0→-10px→0`) |
| `scroll-bounce` | 2s | Hero scroll indicator (`translateY` + `opacity`) |
| `blink-cursor` | 1s | Typewriter cursor (`█`) blink |
| `card-scan` | On hover | Green scan line on card hover (`top: -100%→200%`) |
| `flash-*` (3 types) | 0.5s | Screen flashes — white (boot), blue (modal open), red (end sequence) |

### Responsive Design

- **Fluid typography:** Extensive use of `clamp()` (e.g., hero title `clamp(2rem, 8vw, 10rem)`, manifesto `clamp(1.5rem, 4vw, 3.5rem)`)
- **Grid breakpoint:** Tailwind `md:` (768px) switches project cards from 1 to 2 columns
- **Pill layout:** `flex-col md:flex-row` toggles vertical to horizontal alignment, `gap-16 md:gap-32`
- **Touch devices:** `(pointer: coarse)` media query hides custom cursor and restores `cursor: auto`
- **Motion reduction:** `prefers-reduced-motion: reduce` disables all animations (`animation-duration: 0.01ms !important`)
- **Scrollbar:** `::-webkit-scrollbar` with 6px width, Matrix green thumb

### Text Selection & Scrollbar

- **Selection color:** `::selection { background: rgba(0, 255, 65, 0.3); color: #fff; }`
- **Scrollbar:** 6px width, `--bg-primary` track, `--green` thumb, `rgba(0, 255, 65, 0.7)` on hover

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
│   │   └── GlitchText.tsx           # Glitch text (21 lines)
│   ├── data/
│   │   ├── projects.ts              # Project data (72 lines)
│   │   └── skills.ts                # Skill data (27 lines)
│   └── hooks/
│       └── useMediaQuery.ts         # Media query hook (22 lines)
├── .env.example                     # Environment variable template
├── .gitignore
├── eslint.config.mjs                # ESLint configuration
├── next.config.ts                   # Next.js config (security headers)
├── package.json
├── postcss.config.mjs               # PostCSS (Tailwind CSS v4)
└── tsconfig.json                    # TypeScript config (strict: true)
```

**Total source code: 2,488 lines (including CSS)**

---

## Setup

```bash
# Clone the repository
git clone https://github.com/mer-prog/swindlers-blueprint.git
cd swindlers-blueprint

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_CONTACT_EMAIL to your email address

# Start the development server
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
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js 16 (App Router)** | Provides `next/image` optimization, Metadata API (OGP/Twitter Cards), and centralized security header management via `next.config.ts`. Despite being an SPA, the server component's metadata rendering capability is valuable |
| **All "use client" components** | Animation-driven SPA where GSAP, Framer Motion, Canvas API, and Lenis all depend on browser APIs. Client-side flexibility outweighs the benefits of server components for this use case |
| **GSAP + Framer Motion combined** | GSAP excels at scroll-linked animations (ScrollTrigger pinning, scrub, parallax), while Framer Motion shines at `AnimatePresence` (mount/unmount) and declarative `whileHover`. Each library is used for its strengths |
| **Lenis smooth scroll** | Synced with GSAP `ticker` (`gsap.ticker.add`) to ensure consistent 60fps for ScrollTrigger animations. Native scroll introduces jank when paired with GSAP scroll-linked effects |
| **Tailwind CSS v4 + CSS custom properties** | Utility classes enable rapid development while CSS variables centralize the cyberpunk theme's colors and fonts. Complex animations (glitch, etc.) are implemented as CSS keyframes |
| **Separated data layer (src/data/)** | Project metadata (6 entries) and skill data (10 entries) are decoupled from UI components. Content updates require no changes to component code |
| **Canvas-based Matrix Rain** | A DOM-based approach would degrade performance with hundreds of real-time element updates. Canvas API enables direct rendering, paired with `IntersectionObserver` to pause off-screen animation |
| **`useSyncExternalStore` for media queries** | Safely synchronizes `window.matchMedia` changes with React's concurrent features. The `useState` + `useEffect` pattern risks tearing in concurrent mode |
| **Vercel deployment** | The platform built by the creators of Next.js. Zero-config, automatic HTTPS, free on the Hobby plan |

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
