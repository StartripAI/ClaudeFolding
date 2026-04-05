import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claudefold.com"),
  title: "Claude Code Folding — 源码级架构解剖",
  description:
    "Claude Code 源码架构逐层拆解：11步执行链、50+工具权限、95条命令、8个未发布能力。",
  openGraph: {
    title: "Claude Code Folding — 源码级架构解剖",
    description:
      "Claude Code 源码架构逐层拆解：执行链、工具权限、命令系统、未发布能力。",
    type: "website",
    url: "https://claudefold.com",
    siteName: "Claude Code Folding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Folding — 源码级架构解剖",
    description:
      "51万行 Claude Code 源码，逐层拆解架构与机制。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${spaceGrotesk.variable} ${notoSansSc.variable} ${jetbrainsMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
