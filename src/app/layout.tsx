import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 作成したHeaderをインポート
import Footer from '@/components/Footer'; // 作成したFooterをインポート
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

// サイトのメタ情報を設定
export const metadata: Metadata = {
  title: "Kumpei.com - くんぺい公式サイト",
  description: "くんぺいの公式サイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header /> {/* ここにHeaderを配置 */}
        <main>{children}</main> {/* childrenをmainタグで囲むとより良い */}
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics/>}
      </body>
    </html>
  );
}