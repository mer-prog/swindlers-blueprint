export interface Project {
  id: string;
  title: string;
  status: "DEPLOYED" | "IN DEVELOPMENT";
  stack: string[];
  description: string;
  image: string | null;
  demoUrl: string;
}

export const projects: Project[] = [
  {
    id: "001",
    title: "DocuMind — AI Document Intelligence Platform",
    status: "DEPLOYED",
    stack: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "SSE"],
    description:
      "ドキュメントに質問すると引用付きで即回答するAI検索プラットフォーム。ベクトル検索×キーワード検索のハイブリッドRAG。",
    image: "/images/documind.png",
    demoUrl: "https://documind-pi.vercel.app",
  },
  {
    id: "002",
    title: "LUXE Store — Stripe EC Platform",
    status: "DEPLOYED",
    stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Resend"],
    description:
      "Stripe Checkout統合のラグジュアリーEC。楽観的ロック在庫管理、Webhook冪等性、自動確認メール。",
    image: "/images/luxe-store.png",
    demoUrl: "https://luxe-store-ruby.vercel.app",
  },
  {
    id: "003",
    title: "BookFlow — AI Booking Platform",
    status: "DEPLOYED",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
    description:
      "AIがキャンセルリスクを予測するサロン向け予約管理SaaS。4要素スコアリングでHIGH/MEDIUM/LOWを自動判定。",
    image: "/images/bookflow.png",
    demoUrl: "https://bookflow-five.vercel.app",
  },
  {
    id: "004",
    title: "Nexus AI — SaaS Dashboard",
    status: "DEPLOYED",
    stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "NextAuth.js", "shadcn/ui"],
    description:
      "顧客管理・請求・アナリティクス・AIアシスタントを備えたB2B SaaS管理ダッシュボード。",
    image: "/images/nexus-ai.png",
    demoUrl: "https://nexus-ai-tau-one.vercel.app",
  },
  {
    id: "005",
    title: "PulseHabit — Offline-First Habit Tracker",
    status: "DEPLOYED",
    stack: ["React Native", "Expo SDK 54", "TypeScript", "SQLite", "Supabase"],
    description:
      "オフラインでも完全動作する習慣トラッカー。SQLite→Supabase非同期同期、RLSでデータ分離。",
    image: "/images/pulse-habit.png",
    demoUrl: "https://mer-prog.github.io/pulse-habit/docs/showcase.html",
  },
  {
    id: "006",
    title: "QR Ordering System — レトロ喫茶モバイルオーダー",
    status: "IN DEVELOPMENT",
    stack: ["Vanilla JS", "Firebase Firestore", "Tailwind CSS"],
    description:
      "QRコードでセルフオーダー。Firestoreリアルタイム同期でキッチン即時反映。昭和レトロUIデザイン。",
    image: "/images/qr-ordering.png",
    demoUrl: "#",
  },
];
