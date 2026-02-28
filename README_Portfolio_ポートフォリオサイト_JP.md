# SWINDLER'S BLUEPRINT — サイバーパンク映画演出のスクロール駆動型ポートフォリオ

> **何を:** Matrix の世界観で構築した、CRT スキャンライン・グリッチ・Canvas Rain が融合するインタラクティブポートフォリオサイト
> **誰に:** エンジニアを探しているリクルーター・クライアント
> **技術:** Next.js 16 · React 19 · TypeScript 5.9 · Tailwind CSS v4 · GSAP 3 · Framer Motion 12

**ライブデモ:** [https://swindlers-blueprint.vercel.app](https://swindlers-blueprint.vercel.app)
**ソースコード:** [https://github.com/mer-prog/swindlers-blueprint](https://github.com/mer-prog/swindlers-blueprint)

---

## このプロジェクトで証明できるスキル

| スキル | 実装内容 |
|--------|----------|
| **高度なスクロールアニメーション** | GSAP ScrollTrigger でヒーロータイトルの文字散乱（ランダム x/y/rotation）、Manifesto セクションの `pin: true` + `scrub: 1` による1文字ずつ出現、背景パララックス（`scale 1.15→1.0`）+ スクロール連動ブラー（`0px→8px`） |
| **Canvas API とパフォーマンス最適化** | Canvas API でカタカナ＋英数字の Matrix Rain を直接描画。`IntersectionObserver` でビューポート外の描画を停止し、`requestAnimationFrame` ループで 60fps を維持 |
| **React 19 + Next.js 16 の設計力** | App Router 構成、`useGSAP` によるスコープ付きアニメーションクリーンアップ、`useSyncExternalStore` によるメディアクエリフック（tearing 防止）、Lenis と GSAP ticker の同期 |
| **デザインシステムの構築** | CSS カスタムプロパティによる8色のカラーパレット、3フォント管理（Orbitron / JetBrains Mono / Noto Sans JP）、8種の CSS Keyframes アニメーション（グリッチ・スキャンライン・フロート等） |
| **セキュリティ実装** | `next.config.ts` で 6 つの HTTP セキュリティヘッダー（HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy）＋ `poweredByHeader: false`、外部リンクに `rel="noopener noreferrer"` 徹底、環境変数によるメール管理 |
| **アクセシビリティ配慮** | `prefers-reduced-motion: reduce` で全 CSS アニメーションを無効化、`(pointer: coarse)` でタッチデバイスのカスタムカーソル自動非表示・ネイティブカーソル復元、グリッチレイヤーに `aria-hidden` 属性 |
| **映画的な UX 演出** | 5行タイプライターのブートシーケンス（SKIP 対応）、Matrix 風「赤い薬/青い薬」分岐、5フェーズ時間制御の終了演出（文字落下・回転アニメーション）、Framer Motion `spring` トランジションのモーダル |

---

## 技術スタック

| カテゴリ | 技術 | 用途 |
|----------|------|------|
| フレームワーク | Next.js 16.1.6 | App Router、メタデータ API（OGP/Twitter Card）、`next/image` 画像最適化、セキュリティヘッダー設定 |
| UI ライブラリ | React 19.2.3 | クライアントコンポーネント、状態管理（`useState` / `useRef` / `useEffect` / `useCallback`） |
| 言語 | TypeScript 5.9.3 | `strict: true` モード、型安全なコンポーネント Props 定義・データインターフェース |
| スタイリング | Tailwind CSS v4 | `@tailwindcss/postcss` プラグイン経由、ユーティリティクラス + CSS カスタムプロパティの併用 |
| アニメーション | GSAP 3.14.2 + @gsap/react 2.1.2 | ScrollTrigger（ピン留め・スクラブ・パララックス）、文字散乱、スキルバーカウンター、`useGSAP` フック |
| アニメーション | Framer Motion 12.34.3 | `AnimatePresence` によるマウント/アンマウント、`spring` トランジション、`whileHover` ホバー、`motion.span` 個別文字アニメーション |
| スムーススクロール | Lenis 1.3.17 | GSAP `ticker` と同期した 60fps 一貫スクロール、`lagSmoothing(0)` でジッター排除 |
| CSS アニメーション | CSS Keyframes（8種） | `glitch` / `glitch-alt` / `heavy-glitch` / `boot-scanline` / `float` / `scroll-bounce` / `blink-cursor` / `card-scan` |
| リンター | ESLint 9 + eslint-config-next 16.1.6 | Core Web Vitals ルール + TypeScript ルール |
| デプロイ | Vercel | ゼロコンフィグデプロイ、自動 HTTPS、Edge 対応 |

---

## アーキテクチャ概要

```
┌──────────────────────────────────────────────────────────────────┐
│                     layout.tsx（サーバーコンポーネント）            │
│   Metadata (OGP/Twitter) ── Google Fonts 3書体 ── ScanlineOverlay │
└──────────────────────────────┬───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│                  page.tsx（クライアント "use client"）              │
│   Lenis 初期化 ── GSAP ticker 同期 ── Boot 状態管理                │
│                                                                   │
│  ┌──────────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐   │
│  │ BootSequence │→ │   Hero   │→ │Manifesto │→ │  Dossier   │   │
│  │ タイプライター │  │ 文字散乱  │  │ ピン留め  │  │ カードグリッド│   │
│  │ SKIP/自動完了 │  │パララックス│  │ 1文字表示 │  │  スタガー   │   │
│  └──────────────┘  └──────────┘  └──────────┘  └─────┬──────┘   │
│                                                       │          │
│  ┌──────────────┐  ┌──────────┐                ┌──────▼──────┐   │
│  │  TheChoice   │← │TechArsen.│                │ ProjectCard │   │
│  │  赤/青ピル    │  │ ターミナル │                │ スキャンホバー│   │
│  └──┬───────┬───┘  └──────────┘                └─────────────┘   │
│     │       │                                                     │
│  ┌──▼───┐ ┌─▼──────────┐                                        │
│  │TheEnd│ │ContactModal │                                        │
│  │Matrix│ │ タイプライター│                                        │
│  │ Rain │ │   spring    │                                        │
│  └──────┘ └─────────────┘                                        │
│                                                                   │
│  [常駐] CustomCursor (GSAP 追従) ── ScanlineOverlay (CRT+ノイズ)  │
└───────────────────────────────────────────────────────────────────┘

┌──────────── データ層 (src/data/) ─────────────┐
│  projects.ts ── 6プロジェクトのメタデータ        │
│  skills.ts   ── 3カテゴリ・10スキルのレベル定義  │
└───────────────────────────────────────────────┘

┌──────────── フック (src/hooks/) ───────────────┐
│  useMediaQuery.ts ── useSyncExternalStore ベース │
│  タッチデバイス判定（pointer: coarse）に使用      │
└───────────────────────────────────────────────┘
```

---

## 主要機能

### 1. ブートシーケンス（BootSequence.tsx — 129行）

ターミナル風の起動演出。5行のシステムメッセージを `setInterval`（30ms 間隔）で1文字ずつ描画し、全体を3秒で完了する。各行の描画速度は `Math.ceil(fullLine.length / (LINE_DELAY / 30))` で動的に算出。

- 画面固定: `z-index: 10002`、背景 `#0a0a0a`
- 走査線: `repeating-linear-gradient` で緑のスキャンライン、`boot-scanline` keyframe で縦走査
- タイプライターカーソル: `blink-cursor` keyframe で `█` 記号を点滅
- SKIP ボタン: 即座に `isComplete` を `true` にし、300ms 後に `onComplete` を呼び出し
- ホワイトフラッシュ: 完了時に `flash-white` keyframe（0.5秒）で画面全体を白く発光
- スクロール抑制: ブート中は `document.body.style.overflow = "hidden"` で固定

### 2. ヒーローセクション（Hero.tsx — 270行）

`next/image` で背景画像を `priority` + `fill` + `object-cover` で全幅表示。7層の視覚レイヤーで構成。

- **パララックス + ブラー:** `gsap.fromTo` で `scale: 1.15→1.0`、`filter: blur(0px)→blur(8px)`、`scrub: 1` でスクロール完全連動
- **タイトル文字散乱:** 「詐欺師がよく載せる写真」の11文字を `span[data-char]` で個別制御。漢字は `fontSize: 1em`、ひらがなは `fontSize: 0.7em`。スクロール時に `gsap.utils.random(-200, 200)` で x/y/rotation をランダム化
- **DOM グリッチレイヤー:** 赤（`glitch` keyframe）と青（`glitch-alt` keyframe）の2層を `aria-hidden` で配置。`clip-path: inset()` + `translate` で3秒周期のグリッチ
- **グラデーション:** 下部に `linear-gradient(to bottom, transparent → #0a0a0a)` で自然なフェード
- **ナンバープレートぼかし:** `backdrop-filter: blur(25px)` で画像内の特定領域をマスク
- **レスポンシブ:** `clamp(2rem, 8vw, 10rem)` でフルード・タイポグラフィ
- **注釈テキスト:** 「※ジョークだよ。」を `delay: 2` で遅延フェードイン、`opacity: 0.5` で控えめに表示

### 3. マニフェスト（Manifesto.tsx — 163行）

ScrollTrigger の `pin: true` で画面を固定し、`+=300%` のスクロール距離で全文字を出現させるピン留めセクション。

- **テキスト内容:** 「私のことは覚えなくていい。」「何ができるかだけ知ってくれ。」（日本語・英語の2行組）
- **文字構築:** `useGSAP` 内で DOM 操作により各文字を `span` 要素として生成。`opacity: 0` + `translateY: 20px` を初期状態に設定
- **アニメーション:** `gsap.to(allChars, { opacity: 1, y: 0, textShadow: "0 0 10px rgba(0,255,65,0.3)", stagger: 0.03, scrub: 1 })`
- **英語行のスタイル:** `fontFamily: var(--font-jetbrains)`、`color: var(--muted)`、`fontSize: clamp(0.8rem, 1.5vw, 1.2rem)`
- **グリッチフラッシュ:** スクロール `+=280%` 到達時に `heavy-glitch` クラスを付与、300ms 後に除去
- **背景:** MatrixRain コンポーネント（`opacity: 0.1`）

### 4. プロジェクト一覧（Dossier.tsx — 88行 + ProjectCard.tsx — 192行）

`src/data/projects.ts` から6件のプロジェクトデータを読み込み、「CLASSIFIED DOSSIER」として機密文書風に表示。

- **見出し:** Orbitron フォント、`classified-red` ボーダー（3px）、`rotate(-2deg)` で斜め配置
- **グリッド:** `grid-cols-1 md:grid-cols-2`、`gap-8`
- **カードアニメーション:** `gsap.from` で `y: 80, opacity: 0, stagger: 0.15, duration: 0.8`
- **スキャンホバー:** `card-scan` keyframe で60px幅の緑ラインが縦方向に走査（`animation: card-scan 2s linear infinite`）
- **ステータス表示:** `DEPLOYED` = 緑ドット + 緑テキスト、`IN DEVELOPMENT` = 赤ドット + 赤テキスト
- **技術タグ:** `border + rgba(0,255,65,0.3)` の半透明ボーダー、`rgba(0,255,65,0.05)` の背景
- **画像:** `next/image` で `fill` + `aspect-ratio: 16/9`、`sizes="(max-width: 768px) 100vw, 50vw"`
- **外部リンク:** `rel="noopener noreferrer"` 付き、ホバー時に `textShadow` で緑発光

### 5. 技術スキル表示（TechArsenal.tsx — 159行 + SkillBar.tsx — 105行）

macOS 風ターミナルウィンドウ UI でスキルレベルを視覚的に表示。

- **ウィンドウバー:** 赤/黄/緑の3ドット（`w-3 h-3 rounded-full`）、タイトル「capabilities.sh」
- **3カテゴリ:** FRONTEND（4スキル）/ BACKEND（3スキル）/ TOOLS（3スキル）、各カテゴリに日英の説明文
- **スキルバー:** Unicode ブロック文字で表現。`totalBlocks = 30` を基準に `█`（塗り）と `░`（空き）を計算
- **アニメーション:** GSAP で `width: 0→level%` の伸長 + `textContent: 0→level` の数値カウントアップ（`snap: { textContent: 1 }` で整数表示）
- **トリガー:** `start: "top 85%"` でスクロール位置に連動、`delay: index * 0.1` でスタガー
- **罫線装飾:** `┌─ FRONTEND ─────────────────────┐` のターミナル風区切り線

### 6. 選択セクション（TheChoice.tsx — 200行）

Matrix の「赤い薬/青い薬」をモチーフにした分岐 UI。

- **質問テキスト:** 「あなたはどちらを選ぶ？」を `useGSAP` 内で `span` 分割し、`stagger: 0.05` で1文字ずつ出現
- **ピル画像:** `next/image` で `width/height: 250`、`unoptimized` 指定、`drop-shadow` フィルターで赤/青の光彩
- **ホバー:** Framer Motion `whileHover: { scale: 1.1 }` で拡大
- **浮遊:** CSS `animate-float` keyframe で上下3秒周期。青ピルに `animationDelay: "1.5s"` で位相差
- **フェードイン:** `gsap.from(".pill-container", { opacity: 0, y: 40, stagger: 0.2 })`、`start: "top 40%"`
- **赤ピル → TheEnd:** `setShowEnd(true)` で終了演出モーダルを表示
- **青ピル → ContactModal:** `setShowContact(true)` でコンタクトモーダルを表示

### 7. コンタクトモーダル（ContactModal.tsx — 173行）

Framer Motion `AnimatePresence` で制御されるフルスクリーンモーダル。

- **開閉アニメーション:** `spring` トランジション（`damping: 25, stiffness: 300`）で `scale: 0.8→1.0`
- **ブルーフラッシュ:** 開放時に `opacity: [0, 0.3, 0]`（0.5秒）で画面全体を青く発光
- **タイプライターヘッダー:** 「SECURE CHANNEL ESTABLISHED」を `setInterval(40ms)` で1文字ずつ描画
- **メールアドレス:** `process.env.NEXT_PUBLIC_CONTACT_EMAIL` から取得。`mailto:` リンクでホバー時に緑発光
- **フッターメッセージ:** 「お仕事のご相談、お待ちしています。」（日本語）+ "Ready to build something extraordinary."（英語）
- **閉じる操作:** バックドロップクリック、[X] ボタン、「CLOSE CHANNEL [X]」ボタンの3つ
- **バックドロップ:** `rgba(0,0,0,0.85)` の半透明オーバーレイ

### 8. 終了演出（TheEnd.tsx — 213行）

5フェーズの時間制御シーケンスで映画のエンドロール的な演出を実現。

- **フェーズ0（0〜0.8秒）:** `var(--red)` のフラッシュ（`opacity: [0, 0.4, 0]`）+ `heavy-glitch` オーバーレイ（赤のスキャンライン）
- **フェーズ1（0.8秒〜）:** 「CONNECTION TERMINATED」を表示
- **フェーズ2（3秒〜）:** 各文字が Framer Motion `motion.span` で個別にアニメーション。`y: [0, -20, 100]`（上昇→落下）、`rotate: [0, 0, CHAR_ROTATIONS[i]]`（決定論的回転 `(i * 7 + 13) % 90 - 45`）
- **フェーズ3（4秒〜）:** 「THE END.」（Orbitron, 白）+ 「終幕」（Noto Sans JP）が `opacity: 0→1`（1秒）でフェードイン
- **フェーズ4（6秒〜）:** 「もう一度？ // Try Again?」ボタンが `y: 20→0` でスライドイン。クリックで `window.scrollTo({ top: 0, behavior: "smooth" })` を実行しページ先頭に戻る
- **背景:** MatrixRain（`opacity: 0.5, density: 1.5`）

### 9. Matrix Rain（MatrixRain.tsx — 96行）

Canvas API によるリアルタイム描画のマトリックスレインエフェクト。

- **文字セット:** カタカナ全角（ア〜ン）+ 数字（0〜9）+ 英大文字（A〜Z）、合計82文字
- **列幅:** 20px 固定、列数 = `Math.floor((canvasWidth / 20) * density)`
- **描画ロジック:** 各フレームで `rgba(10, 10, 10, 0.05)` の半透明矩形を重ねて残像効果を生成。`fillText` で緑のランダム文字を描画
- **落下速度:** `0.5 + Math.random() * 0.5` で微小なランダム化
- **リセット:** `drops[i] * 20 > canvas.height && Math.random() > 0.975` の条件で列先頭に巻き戻し
- **パフォーマンス:** `IntersectionObserver`（`threshold: 0`）でビューポート外の `requestAnimationFrame` ループを停止
- **リサイズ対応:** `window.addEventListener("resize")` で Canvas サイズと列数を再計算
- **Props:** `opacity`（文字の明るさ）、`density`（列数の倍率）、`className`

### 10. カスタムカーソル（CustomCursor.tsx — 89行）

GSAP で追従するデュアルリング構造のカスタムカーソル。

- **ドット:** 8px 緑丸（`w-2 h-2 rounded-full`）、`duration: 0.1` で即座に追従
- **リング:** 30px 緑枠（`border: 1px solid var(--green)`）、`duration: 0.3` で滑らかに追従
- **ホバー拡大:** `a, button, [role='button']` 要素にマウスが入ると `width/height: 30→50px`、`opacity: 0.5`
- **タッチデバイス:** `useMediaQuery("(pointer: coarse)")` が `true` の場合は `return null` でレンダリングしない
- **z-index:** ドット 99999、リング 99998

### 11. 常駐オーバーレイ（ScanlineOverlay.tsx — 10行）

CRT モニター風の視覚効果を画面全体に常時適用。

- **スキャンライン:** `repeating-linear-gradient(0deg)` で 2px 間隔の水平線、`rgba(0, 0, 0, 0.03)` の微小な暗線
- **ノイズテクスチャ:** SVG `feTurbulence` フィルター（`fractalNoise`, `baseFrequency: 0.9`, `numOctaves: 4`）を `opacity: 0.03` で重畳
- **操作性:** 両レイヤーとも `pointer-events: none` で操作を一切阻害しない
- **z-index:** スキャンライン 9999、ノイズ 9998
- **アクセシビリティ:** 両要素に `aria-hidden="true"` を設定

### 12. グリッチテキスト（GlitchText.tsx — 21行）

CSS `::before` / `::after` 疑似要素によるグリッチ効果の汎用コンポーネント。`data-text` 属性に `text` prop の値を設定し、`glitch-text` クラスで赤/青の `clip-path` アニメーションを適用。`as` prop で任意の HTML タグとしてレンダリング可能。

---

## ページ構成 / 画面仕様

シングルページアプリケーション（SPA）構成。Next.js App Router を使用しているが、ルートは `/` のみ。

| セクション | コンポーネント | スクロール動作 | 内容 |
|------------|---------------|---------------|------|
| BOOT | `BootSequence` | スクロール無効（`overflow: hidden`） | ターミナル風起動演出。3秒で自動完了、SKIP ボタンで即座にスキップ可能 |
| HERO | `Hero` | 通常スクロール + ScrollTrigger | タイトル「詐欺師がよく載せる写真」表示、パララックス背景、文字散乱、DOM グリッチ |
| MANIFESTO | `Manifesto` | ピン留め（`+=300%`）+ `scrub: 1` | 「私のことは覚えなくていい。何ができるかだけ知ってくれ。」を1文字ずつスクロール連動で表示 |
| DOSSIER | `Dossier` + `ProjectCard` | 通常スクロール + スタガー | 6プロジェクトのカードグリッド。スキャンラインホバーエフェクト |
| ARSENAL | `TechArsenal` + `SkillBar` | 通常スクロール + トリガー | ターミナル風スキルバー。3カテゴリ10スキルの Unicode ブロック表示 |
| THE CHOICE | `TheChoice` | 通常スクロール + トリガー | 「あなたはどちらを選ぶ？」— 赤/青ピルの分岐 UI |
| — | `ContactModal` | フルスクリーンモーダル（`z-index: 10003`） | 青ピル選択時。タイプライター＋ spring アニメーション |
| — | `TheEnd` | フルスクリーンモーダル（`z-index: 10003`） | 赤ピル選択時。5フェーズ時間制御の終了演出 |

**常駐レイヤー:**
- `ScanlineOverlay` — CRT スキャンライン（z-index: 9999）+ SVG ノイズ（z-index: 9998）
- `CustomCursor` — GSAP 追従デュアルリングカーソル（z-index: 99999 / 99998）

**ルーティング:**
- `src/app/layout.tsx` — サーバーコンポーネント。メタデータ（OGP/Twitter Card）、Google Fonts 読み込み、`ScanlineOverlay` 配置、`scrollRestoration: 'manual'`
- `src/app/page.tsx` — 唯一のクライアントページ（`"use client"`）。Lenis 初期化、GSAP ScrollTrigger 登録、ブート状態管理

---

## デザインシステム

### カラーパレット

| CSS 変数 | 値 | 用途 |
|----------|-----|------|
| `--bg-primary` | `#0a0a0a` | メイン背景、Canvas 残像色 |
| `--bg-secondary` | `#111111` | カード背景 |
| `--green` | `#00ff41` | Matrix グリーン — アクセント、リンク、カーソル、スキルバー、スキャンライン、タイプライターカーソル |
| `--red` | `#ff0040` | 赤ピル、ステータス（IN DEVELOPMENT）、グリッチ `::before` |
| `--blue` | `#00a8ff` | 青ピル、グリッチ `::after`、ブルーフラッシュ |
| `--text` | `#e0e0e0` | 本文テキスト |
| `--muted` | `#666666` | サブテキスト、ラベル、SKIP ボタン、英語サブテキスト |
| `--classified-red` | `#ff3333` | CLASSIFIED 見出し・ボーダー |

### タイポグラフィ

| フォント | CSS 変数 | ウェイト | 用途 |
|----------|---------|---------|------|
| Orbitron | `--font-orbitron` | 400 / 700 / 900 | セクションタイトル、ピルラベル（THE END / CONTACT）、THE END 表示 |
| JetBrains Mono | `--font-jetbrains` | 400 / 700 | ベースフォント（`body`）、ターミナル UI、英語サブテキスト、コード表示 |
| Noto Sans JP | `--font-noto` | 400 / 700 / 900 | 日本語テキスト全般（マニフェスト、質問文、説明文、「終幕」、フッターメッセージ） |

### アニメーション（CSS Keyframes — 8種）

| keyframe 名 | 周期 | 用途 |
|-------------|------|------|
| `glitch` / `glitch-alt` | 3秒 | テキストグリッチ。`clip-path: inset()` + `translate` で赤/青レイヤーをずらす |
| `heavy-glitch` | 0.5秒 | 激しいグリッチ。`skewX` を追加。Manifesto 完了時・TheEnd フェーズ0で使用 |
| `boot-scanline` | 2秒 | ブート画面の緑走査線（`top: -10%→110%`） |
| `float` | 3秒 | ピル画像の上下浮遊（`translateY: 0→-10px→0`） |
| `scroll-bounce` | 2秒 | ヒーロー下部のスクロールインジケーター（`translateY` + `opacity`） |
| `blink-cursor` | 1秒 | タイプライターカーソル（`█`）の点滅 |
| `card-scan` | ホバー時 | カードホバー時の緑走査ライン（`top: -100%→200%`） |
| `flash-*`（3種） | 0.5秒 | 画面フラッシュ。白（ブート完了）/ 青（モーダル開放）/ 赤（終了演出） |

### レスポンシブ

- **フルード・タイポグラフィ:** `clamp()` 関数を多用（例: ヒーロータイトル `clamp(2rem, 8vw, 10rem)`、マニフェスト `clamp(1.5rem, 4vw, 3.5rem)`）
- **グリッド切替:** Tailwind `md:` ブレークポイント（768px）でプロジェクトカード 1列 → 2列
- **ピル配置:** `flex-col md:flex-row` で縦並び → 横並び、`gap-16 md:gap-32`
- **タッチデバイス:** `(pointer: coarse)` メディアクエリでカスタムカーソル非表示、`cursor: auto` 復元
- **モーション抑制:** `prefers-reduced-motion: reduce` で全アニメーション無効化（`animation-duration: 0.01ms !important`）
- **スクロールバー:** `::-webkit-scrollbar` で幅 6px、Matrix グリーンのサム

### テキスト選択・スクロールバー

- **選択色:** `::selection { background: rgba(0, 255, 65, 0.3); color: #fff; }`
- **スクロールバー:** 幅 6px、トラック `--bg-primary`、サム `--green`、ホバー時 `rgba(0, 255, 65, 0.7)`

---

## プロジェクト構成

```
swindlers-blueprint/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg              # ヒーロー背景画像
│   │   ├── og-image.png             # OGP 画像
│   │   ├── favicon.png              # ファビコン
│   │   ├── pill-red.png             # 赤ピル画像
│   │   ├── pill-blue.png            # 青ピル画像
│   │   ├── documind.png             # プロジェクト画像
│   │   ├── luxe-store.png           # プロジェクト画像
│   │   ├── bookflow.png             # プロジェクト画像
│   │   ├── nexus-ai.png             # プロジェクト画像
│   │   ├── pulse-habit.png          # プロジェクト画像
│   │   └── qr-ordering.png          # プロジェクト画像
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx               # ルートレイアウト（65行）
│   │   ├── page.tsx                 # メインページ（67行）
│   │   ├── globals.css              # グローバル CSS（327行）
│   │   └── favicon.ico
│   ├── components/
│   │   ├── BootSequence.tsx         # ブート演出（129行）
│   │   ├── Hero.tsx                 # ヒーローセクション（270行）
│   │   ├── Manifesto.tsx            # ピン留めマニフェスト（163行）
│   │   ├── Dossier.tsx              # プロジェクト一覧（88行）
│   │   ├── ProjectCard.tsx          # プロジェクトカード（192行）
│   │   ├── TechArsenal.tsx          # スキル表示（159行）
│   │   ├── SkillBar.tsx             # スキルバー（105行）
│   │   ├── TheChoice.tsx            # 赤/青ピル選択（200行）
│   │   ├── ContactModal.tsx         # コンタクトモーダル（173行）
│   │   ├── TheEnd.tsx               # 終了演出（213行）
│   │   ├── MatrixRain.tsx           # Matrix Rain Canvas（96行）
│   │   ├── CustomCursor.tsx         # カスタムカーソル（89行）
│   │   ├── ScanlineOverlay.tsx      # CRT オーバーレイ（10行）
│   │   └── GlitchText.tsx           # グリッチテキスト（21行）
│   ├── data/
│   │   ├── projects.ts              # プロジェクトデータ（72行）
│   │   └── skills.ts                # スキルデータ（27行）
│   └── hooks/
│       └── useMediaQuery.ts         # メディアクエリフック（22行）
├── .env.example                     # 環境変数テンプレート
├── .gitignore
├── eslint.config.mjs                # ESLint 設定
├── next.config.ts                   # Next.js 設定（セキュリティヘッダー）
├── package.json
├── postcss.config.mjs               # PostCSS（Tailwind CSS v4）
└── tsconfig.json                    # TypeScript 設定（strict: true）
```

**総ソースコード: 2,488行（CSS 含む）**

---

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/mer-prog/swindlers-blueprint.git
cd swindlers-blueprint

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.example .env.local
# .env.local を編集して NEXT_PUBLIC_CONTACT_EMAIL にメールアドレスを設定

# 開発サーバーを起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアクセス。

### 環境変数

| 変数 | 説明 | 必須 |
|------|------|------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | コンタクトモーダルに表示するメールアドレス | はい |

### スクリプト一覧

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクションビルドを実行 |
| `npm run start` | プロダクションサーバーを起動 |
| `npm run lint` | ESLint を実行 |

---

## 設計判断の根拠

| 判断 | 根拠 |
|------|------|
| **Next.js 16（App Router）** | `next/image` による画像最適化、メタデータ API（OGP/Twitter Card）、`next.config.ts` でのセキュリティヘッダー一元管理。SPA 構成だが、サーバーコンポーネントのメタデータレンダリング機能を活用 |
| **全コンポーネント "use client"** | GSAP・Framer Motion・Canvas API・Lenis が全てブラウザ API に依存するアニメーション主体の SPA。サーバーコンポーネントの恩恵よりクライアント側の自由度を優先 |
| **GSAP + Framer Motion の併用** | GSAP は ScrollTrigger によるスクロール連動アニメーション（ピン留め・スクラブ・パララックス）に優れ、Framer Motion は `AnimatePresence`（マウント/アンマウント）や `whileHover`（宣言的ホバー）に優れる。各ライブラリの強みを使い分け |
| **Lenis スムーススクロール** | GSAP `ticker` と同期（`gsap.ticker.add`）することで ScrollTrigger アニメーションの 60fps 一貫性を確保。ネイティブスクロールでは GSAP との同期でジャンクが発生するため導入 |
| **Tailwind CSS v4 + CSS カスタムプロパティ** | ユーティリティクラスによる高速開発と、CSS 変数によるサイバーパンクテーマの色・フォントの一元管理を両立。グリッチ等の複雑なアニメーションは CSS Keyframes で実装 |
| **データ層の分離（src/data/）** | プロジェクト情報（6件）やスキルデータ（10件）を UI コンポーネントから分離。コンテンツ更新時にコンポーネントコードに触れる必要がない |
| **Canvas ベースの Matrix Rain** | DOM ベースでは数百要素のリアルタイム更新でパフォーマンスが劣化する。Canvas API で直接描画し、`IntersectionObserver` で画面外のアニメーションを停止 |
| **`useSyncExternalStore` によるメディアクエリ** | `window.matchMedia` の変更を React の concurrent 機能と安全に同期。`useState` + `useEffect` パターンでは tearing が発生するリスクがある |
| **Vercel デプロイ** | Next.js の開発元が提供するプラットフォーム。ゼロコンフィグ、自動 HTTPS、Hobby プランで無料運用 |

---

## 運用コスト

| サービス | プラン | 月額 |
|----------|--------|------|
| Vercel | Hobby（無料） | $0 |
| Google Fonts | 無料 | $0 |
| GitHub | Free | $0 |
| **合計** | | **$0** |

---

## 作者

[@mer-prog](https://github.com/mer-prog)
