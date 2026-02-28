# SWINDLER'S BLUEPRINT — 詐欺師がよく載せる写真

> **何を:** サイバーパンク×映画的演出のスクロール駆動型開発者ポートフォリオ
> **誰に:** エンジニアを探しているリクルーター・クライアント
> **技術:** Next.js 16 · React 19 · TypeScript 5.9 · Tailwind CSS v4 · GSAP 3 · Framer Motion 12

🔗 **ライブデモ:** [https://swindlers-blueprint.vercel.app](https://swindlers-blueprint.vercel.app)
💻 **ソースコード:** [https://github.com/mer-prog/swindlers-blueprint](https://github.com/mer-prog/swindlers-blueprint)

---

## このプロジェクトで証明できるスキル

| スキル | 実装内容 |
|--------|----------|
| **高度なスクロールアニメーション** | GSAP ScrollTrigger による文字散乱（Hero）、ピン留めセクション内の1文字ずつ表示（Manifesto）、スクロール連動パララックス＋ブラー |
| **Canvas API × パフォーマンス最適化** | IntersectionObserver でビューポート外の Canvas 描画を停止する Matrix Rain 実装。requestAnimationFrame ループ管理 |
| **React 19 + Next.js 16 設計力** | App Router、`useGSAP` によるスコープ付きアニメーションクリーンアップ、`useSyncExternalStore` によるメディアクエリフック |
| **デザインシステム構築** | CSS 変数によるカラーパレット、3 フォント管理（Orbitron / JetBrains Mono / Noto Sans JP）、CRT スキャンライン・ノイズテクスチャ・グリッチエフェクト |
| **セキュリティ実装** | 7 つの HTTP セキュリティヘッダー（HSTS、X-Frame-Options 等）、`rel="noopener noreferrer"` の徹底、環境変数によるメール管理 |
| **アクセシビリティ配慮** | `prefers-reduced-motion` 完全対応（全アニメーション無効化）、タッチデバイスでのカスタムカーソル自動非表示、`aria-hidden` 属性の適切な使用 |

---

## 技術スタック

| カテゴリ | 技術 | 用途 |
|----------|------|------|
| フレームワーク | Next.js 16.1.6 | App Router、SSR/SSG、画像最適化（`next/image`）、セキュリティヘッダー |
| UI ライブラリ | React 19.2.3 | クライアントコンポーネント、状態管理（useState/useRef/useEffect） |
| 言語 | TypeScript 5.9.3 | strict モード、型安全なコンポーネント Props・データ定義 |
| スタイリング | Tailwind CSS v4 | PostCSS プラグイン経由、ユーティリティクラス + カスタム CSS 変数 |
| アニメーション | GSAP 3.14.2 + @gsap/react 2.1.2 | ScrollTrigger（スクロール連動）、文字散乱、スキルバーカウンター、`useGSAP` |
| アニメーション | Framer Motion 12.34.3 | モーダル開閉（spring）、ピルホバー（scale）、AnimatePresence によるマウント/アンマウント |
| スムーススクロール | Lenis 1.3.17 | GSAP ticker 同期による 60fps 一貫スクロール |
| CSS アニメーション | CSS Keyframes | グリッチ、スキャンライン、ブートシーケンス、カードスキャン、フロート、点滅カーソル |
| リンター | ESLint 9 + eslint-config-next | Core Web Vitals + TypeScript ルール |
| デプロイ | Vercel | ゼロコンフィグデプロイ、自動 HTTPS |

---

## アーキテクチャ概要

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
│  [常駐] CustomCursor (GSAP追従) ── ScanlineOverlay (CRT+Noise) │
└──────────────────────────────────────────────────────────────────┘

┌─────────── データ層 (src/data/) ──────────┐
│  projects.ts ── 6プロジェクトのメタデータ   │
│  skills.ts   ── 3カテゴリ10スキルのレベル   │
└────────────────────────────────────────────┘

┌─────────── フック (src/hooks/) ───────────┐
│  useMediaQuery.ts ── useSyncExternalStore  │
│  タッチデバイス判定に使用                   │
└────────────────────────────────────────────┘
```

---

## 主要機能

### 1. ブートシーケンス（BootSequence.tsx）
- ターミナル風タイプライター演出で5行のテキストを順次表示
- 1行ずつ `setInterval` で文字を描画、全体 3 秒で完了
- SKIP ボタンで即座にスキップ可能
- 完了時にホワイトフラッシュ（CSS `flash-white` keyframe）
- ブート中は `document.body.style.overflow = "hidden"` でスクロールを抑制

### 2. ヒーローセクション（Hero.tsx）
- `next/image` で背景画像を `priority` ロード、`fill` + `object-cover` で全幅表示
- GSAP ScrollTrigger でスクロール連動のパララックス（`scale 1.15→1.0`）+ ブラー（`0px→8px`）
- タイトル「詐欺師がよく載せる写真」の各文字を `span[data-char]` で個別に制御
- スクロール時に文字が散乱（ランダム x/y/rotation、`gsap.utils.random`）
- DOM ベースのグリッチレイヤー（赤/青の `clip-path` アニメーション）
- `clamp()` によるフルレスポンシブ文字サイズ
- ナンバープレートへの `backdrop-filter: blur(25px)` 処理

### 3. マニフェスト（Manifesto.tsx）
- ScrollTrigger `pin: true` で画面を固定、`+=300%` のスクロール距離を確保
- 日本語・英語テキストの全文字を DOM で `span` 生成し、1文字ずつ `opacity: 0→1` + `translateY: 20px→0` でアニメーション
- `scrub: 1` でスクロール位置に完全同期
- 完了時にグリッチフラッシュオーバーレイ
- 背景に MatrixRain コンポーネント（opacity: 0.1）

### 4. プロジェクト一覧（Dossier.tsx + ProjectCard.tsx）
- `src/data/projects.ts` から6プロジェクトのデータを表示
- 2カラムグリッド（`md:grid-cols-2`）、スタガード fade-in（`y: 80, stagger: 0.15`）
- 各カードにスキャンラインホバーエフェクト（`card-scan` keyframe で緑ラインが上下に走査）
- ステータスインジケーター（DEPLOYED = 緑、IN DEVELOPMENT = 赤）
- 技術スタックをタグ表示、外部リンクに `rel="noopener noreferrer"`

### 5. 技術スキル表示（TechArsenal.tsx + SkillBar.tsx）
- ターミナルウィンドウ UI（macOS 風の赤/黄/緑ドット、`capabilities.sh` タイトル）
- 3カテゴリ（FRONTEND / BACKEND / TOOLS）各カテゴリに日英説明文
- スキルバー: Unicode ブロック文字（`█` / `░`）30分割で視覚表示
- GSAP で `width: 0→level%` のアニメーション + `textContent` の数値カウントアップ（`snap: 1` で整数表示）
- スクロール連動トリガー、インデックス順の遅延実行

### 6. 選択セクション（TheChoice.tsx）
- Matrix 風「赤い薬/青い薬」の選択 UI
- Framer Motion `whileHover: { scale: 1.1 }` でインタラクティブホバー
- CSS `animate-float`（上下浮遊アニメーション）
- 質問テキストを1文字ずつ `span` 化して GSAP で順次表示
- 赤ピル → TheEnd（終了演出）、青ピル → ContactModal（コンタクト）

### 7. コンタクトモーダル（ContactModal.tsx）
- Framer Motion `AnimatePresence` によるマウント/アンマウントアニメーション
- `spring` トランジション（damping: 25, stiffness: 300）でバウンス開閉
- 「SECURE CHANNEL ESTABLISHED」タイプライターヘッダー
- ブルーフラッシュ演出（`opacity: [0, 0.3, 0]`）
- メールアドレスは `process.env.NEXT_PUBLIC_CONTACT_EMAIL` から取得
- バックドロップクリックで閉じる

### 8. 終了演出（TheEnd.tsx）
- 5 フェーズの時間制御シーケンス（flash → TERMINATED → collapse → THE END → retry）
- 「CONNECTION TERMINATED」の各文字が Framer Motion で個別にアニメーション（落下 + 回転）
- 決定論的疑似ランダム回転角（`(i * 7 + 13) % 90 - 45`）
- 背景に MatrixRain（opacity: 0.5, density: 1.5）
- 「もう一度？」ボタンでページトップにスムーススクロール

### 9. Matrix Rain（MatrixRain.tsx）
- Canvas API で描画するカタカナ + 英数字のマトリックスレイン
- `IntersectionObserver` でビューポート外の描画を停止（パフォーマンス最適化）
- `requestAnimationFrame` ループで 60fps 描画
- `density` prop で列数、`opacity` prop で明るさを制御
- リサイズ対応（`window.addEventListener("resize")`）

### 10. カスタムカーソル（CustomCursor.tsx）
- GSAP で追従するデュアルリングカーソル（ドット + リング）
- リンク/ボタンホバー時にリングが拡大（30px → 50px）
- `useMediaQuery("(pointer: coarse)")` でタッチデバイス自動非表示
- z-index 99999/99998 で最前面に配置

### 11. 常駐オーバーレイ（ScanlineOverlay.tsx + globals.css）
- CRT スキャンライン（2px 間隔の `repeating-linear-gradient`）
- SVG ノイズテクスチャ（`feTurbulence` フィルター、opacity: 0.03）
- 両方とも `pointer-events: none` で操作を阻害しない

---

## ページ構成 / 画面仕様

本サイトはシングルページアプリケーション（SPA）構成。Next.js App Router を使用しているが、ルートは `/` のみ。

| セクション | コンポーネント | スクロール動作 | 内容 |
|------------|---------------|---------------|------|
| BOOT | `BootSequence` | スクロール無効（`overflow: hidden`） | ターミナル風起動演出。3秒後 or SKIP で本編へ |
| HERO | `Hero` | 通常スクロール + ScrollTrigger | タイトル表示、パララックス背景、文字散乱 |
| MANIFESTO | `Manifesto` | ピン留め（`+=300%`） | 「私のことは覚えなくていい。何ができるかだけ知ってくれ。」1文字ずつ表示 |
| DOSSIER | `Dossier` | 通常スクロール + stagger | 6プロジェクトのカードグリッド |
| ARSENAL | `TechArsenal` | 通常スクロール + trigger | ターミナル風スキル表示 |
| THE CHOICE | `TheChoice` | 通常スクロール + trigger | 赤/青ピルの選択 UI |
| — | `ContactModal` | フルスクリーンモーダル | 青ピル選択時に表示 |
| — | `TheEnd` | フルスクリーンモーダル | 赤ピル選択時に表示 |

**常駐レイヤー:**
- `ScanlineOverlay` — CRT スキャンライン + ノイズ（z-index: 9999/9998）
- `CustomCursor` — デュアルリングカーソル（z-index: 99999）

**ルーティング:**
- ファイルベースルーティング（Next.js App Router）
- `src/app/layout.tsx` — ルートレイアウト（メタデータ、フォント、ScanlineOverlay）
- `src/app/page.tsx` — 唯一のページ（"use client"）

---

## デザインシステム

### カラーパレット

| 変数名 | 値 | 用途 |
|--------|-----|------|
| `--bg-primary` | `#0a0a0a` | メイン背景 |
| `--bg-secondary` | `#111111` | カード背景 |
| `--green` | `#00ff41` | Matrix グリーン（アクセント、リンク、カーソル、スキルバー） |
| `--red` | `#ff0040` | 赤ピル、CLASSIFIED バッジ |
| `--blue` | `#00a8ff` | 青ピル、グリッチレイヤー |
| `--text` | `#e0e0e0` | 本文テキスト |
| `--muted` | `#666666` | サブテキスト、ラベル |
| `--classified-red` | `#ff3333` | CLASSIFIED 見出し、ボーダー |

### タイポグラフィ

| フォント | CSS 変数 | 用途 |
|----------|---------|------|
| Orbitron (400/700/900) | `--font-orbitron` | 見出し、セクションタイトル、THE END |
| JetBrains Mono (400/700) | `--font-jetbrains` | 本文、ターミナル UI、コード表示 |
| Noto Sans JP (400/700/900) | `--font-noto` | 日本語テキスト |

### アニメーション（CSS Keyframes）

| keyframe 名 | 用途 |
|-------------|------|
| `glitch` / `glitch-alt` | テキストグリッチ（clip-path + translate） |
| `heavy-glitch` | 激しいグリッチ（skew 含む、TheEnd で使用） |
| `boot-scanline` | ブート画面の走査線 |
| `float` | ピルの上下浮遊 |
| `scroll-bounce` | スクロールインジケーター |
| `blink-cursor` | タイプライターカーソル点滅 |
| `card-scan` | カードホバー時の走査ライン |
| `flash-white` / `flash-blue` / `flash-red` | 画面フラッシュ演出 |

### レスポンシブ

- `clamp()` によるフルード・タイポグラフィ（例: `clamp(2rem, 8vw, 10rem)`）
- Tailwind ブレークポイント: `md:` (768px) でグリッド 1→2 カラム切替
- タッチデバイス判定: `(pointer: coarse)` でカスタムカーソル非表示、`cursor: auto` 復元
- `prefers-reduced-motion: reduce` で全アニメーション無効化

---

## プロジェクト構成

```
swindlers-blueprint/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg              # ヒーロー背景画像
│   │   ├── og-image.png             # OGP画像
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
│   │   ├── globals.css              # グローバルCSS（327行）
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
├── eslint.config.mjs                # ESLint設定
├── next.config.ts                   # Next.js設定（セキュリティヘッダー）
├── package.json
├── postcss.config.mjs               # PostCSS（Tailwind CSS v4）
└── tsconfig.json                    # TypeScript設定（strict）
```

**総ソースコード: 約 2,500 行（CSS 含む）**

---

## セットアップ

```bash
# クローン
git clone https://github.com/mer-prog/swindlers-blueprint.git
cd swindlers-blueprint

# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local を編集して NEXT_PUBLIC_CONTACT_EMAIL を設定

# 開発サーバー起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアクセス。

### 環境変数

| 変数 | 説明 | 必須 |
|------|------|------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | コンタクトモーダルに表示するメールアドレス | Yes |

### スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバー起動 |
| `npm run lint` | ESLint 実行 |

---

## 設計判断の根拠

| 判断 | 根拠 |
|------|------|
| **Next.js 16 (App Router)** | 画像最適化（`next/image`）、メタデータ API（OGP/Twitter）、セキュリティヘッダー設定を活用。SPA だが SSR のメタデータ機能を利用 |
| **全コンポーネント "use client"** | アニメーション主体の SPA であり、GSAP・Framer Motion・Canvas API がすべてブラウザ API に依存。サーバーコンポーネントの利点よりクライアント側の自由度を優先 |
| **GSAP + Framer Motion の併用** | GSAP はスクロール連動アニメーション（ScrollTrigger）に強く、Framer Motion はマウント/アンマウント（AnimatePresence）や宣言的ホバーに強い。それぞれの強みを使い分け |
| **Lenis スムーススクロール** | GSAP ticker と同期させることで ScrollTrigger アニメーションの 60fps 一貫性を確保。ネイティブスクロールでは GSAP との同期にジャンクが発生するため |
| **Tailwind CSS v4 + カスタム CSS 変数** | ユーティリティクラスで高速開発しつつ、サイバーパンクテーマの色・フォントは CSS 変数で一元管理。グリッチ等の複雑なアニメーションは CSS Keyframes で実装 |
| **データ層の分離（src/data/）** | プロジェクト情報やスキルデータを UI コンポーネントから分離。コンテンツ更新時にコンポーネントに触れずに済む |
| **Canvas ベースの Matrix Rain** | DOM ベースでは数百要素のリアルタイム更新でパフォーマンス劣化。Canvas API で直接描画し、IntersectionObserver で不要時に停止 |
| **useSyncExternalStore** | メディアクエリの変更を React の concurrent 機能と安全に同期。`useState` + `useEffect` パターンでは tearing が発生する可能性がある |
| **Vercel デプロイ** | Next.js の開発元が提供するプラットフォーム。ゼロコンフィグ、自動 HTTPS、Edge Functions 対応 |

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
