import Header from '@/components/header/header'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// hello!

export const metadata: Metadata = {
  title: "Timeless",
  description: "DDD Ecommerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <body className={inter.className}>
              <div className="min-h-screen flex flex-col">
                <Header/>
                  {children}
                  <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                    <p>Copyright 2023 - All right reserved by Timeless</p>
                  </footer>
              </div>
          </body>
    </html>
  );
}
