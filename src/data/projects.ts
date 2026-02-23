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
    title: "QR Ordering System",
    status: "DEPLOYED",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    description:
      "居酒屋向けQRオーダーシステム。スマホで注文から決済まで完結。",
    image: null,
    demoUrl: "#",
  },
  {
    id: "002",
    title: "LUXE Store",
    status: "DEPLOYED",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    description:
      "ハイブランド特化型ECサイト。洗練されたUI/UXで購買体験を最適化。",
    image: null,
    demoUrl: "#",
  },
  {
    id: "003",
    title: "Nexus AI",
    status: "DEPLOYED",
    stack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    description:
      "AI統合ダッシュボード。複数のAIモデルを一元管理・比較。",
    image: null,
    demoUrl: "#",
  },
  {
    id: "004",
    title: "BookFlow",
    status: "DEPLOYED",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    description:
      "予約管理プラットフォーム。カレンダー連携でシームレスな予約体験。",
    image: null,
    demoUrl: "#",
  },
  {
    id: "005",
    title: "PulseHabit",
    status: "IN DEVELOPMENT",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    description:
      "習慣トラッキングアプリ。データ可視化で継続をサポート。",
    image: null,
    demoUrl: "#",
  },
  {
    id: "006",
    title: "DocuMind",
    status: "IN DEVELOPMENT",
    stack: ["Next.js", "TypeScript", "AI/ML"],
    description:
      "AIドキュメント解析ツール。PDFやテキストから知見を自動抽出。",
    image: null,
    demoUrl: "#",
  },
];
