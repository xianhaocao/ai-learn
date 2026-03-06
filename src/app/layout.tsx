import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Learn - 学习人工智能的知识平台",
    template: "%s | AI Learn",
  },
  description: "探索 AI 世界，从基础到大模型应用，动手实践，紧跟前沿。提供 ChatGPT 使用教程、Prompt Engineering 技巧、AI 入门指南等优质内容。",
  keywords: ["AI", "人工智能", "ChatGPT", "Prompt", "大模型", "机器学习", "深度学习", "学习平台"],
  authors: [{ name: "AI Learn Team" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "AI Learn - 学习人工智能的知识平台",
    description: "探索 AI 世界，从基础到大模型应用，动手实践，紧跟前沿",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Learn - 学习人工智能的知识平台",
    description: "探索 AI 世界，从基础到大模型应用，动手实践，紧跟前沿",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="zh-CN">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}