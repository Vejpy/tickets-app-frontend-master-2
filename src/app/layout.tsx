import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Helpdesk Portal",
  description: "Bubbly Modern Helpdesk and Inventory Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={plusJakartaSans.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-lg text-body-lg antialiased min-h-screen pb-[120px] selection:bg-pink-100">

        <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-surface-variant/10 shadow-sm">
          <div className="flex justify-between items-center w-full px-5 py-4 max-w-7xl mx-auto flex-row">
            <Link href="/" className="flex items-center gap-sm hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>headset_mic</span>
              </div>
              <h1 className="text-xl font-bold text-on-surface tracking-tight">Helpdesk</h1>
            </Link>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors active:scale-95 text-on-surface-variant">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors active:scale-95 text-on-surface-variant">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
              <Link href="/profile" className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center border border-surface-variant shadow-sm ml-1 active:scale-95 transition-transform hover:opacity-80">
                <span className="material-symbols-outlined">person</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="w-full max-w-7xl mx-auto px-5 pt-[100px] flex flex-col gap-xl">
          <Suspense fallback={<div className="flex items-center justify-center p-xl"><p className="font-body-lg text-on-surface-variant">Loading page...</p></div>}>
            {children}
          </Suspense>
        </main>

        <Navbar />
      </body>
    </html>
  );
}
