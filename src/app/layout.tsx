import type { Metadata } from "next";
import "./globals.css";
import ScanlineOverlay from "@/components/ScanlineOverlay";

export const metadata: Metadata = {
  metadataBase: new URL("https://swindlers-blueprint.vercel.app"),
  title: "詐欺師がよく載せる写真 — Photos Scammers Love to Post",
  description: "私のことは覚えなくていい。何ができるかだけ知ってくれ。",
  openGraph: {
    title: "詐欺師がよく載せる写真 — Photos Scammers Love to Post",
    description: "私のことは覚えなくていい。何ができるかだけ知ってくれ。",
    images: ["/images/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "詐欺師がよく載せる写真 — Photos Scammers Love to Post",
    description: "私のことは覚えなくていい。何ができるかだけ知ってくれ。",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              history.scrollRestoration = 'manual';
              window.scrollTo(0, 0);
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Noto+Sans+JP:wght@400;700;900&family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          background: "var(--bg-primary)",
          color: "var(--text)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {children}
        <ScanlineOverlay />
      </body>
    </html>
  );
}
