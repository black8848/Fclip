import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fclip - 简易在线剪切板",
  description: "一个简单的在线剪切板应用，可以分享文本并生成短代码",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Fclip
            </Link>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-gray-700 hover:text-blue-600">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/clips" className="text-gray-700 hover:text-blue-600">
                    浏览剪切板
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 mt-auto py-4">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
            Fclip - 简易在线剪切板 &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </body>
    </html>
  );
}
