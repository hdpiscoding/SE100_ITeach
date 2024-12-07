import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React, {Suspense} from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "./loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ITeach",
  description: "Generated by create next app",
  icons: {
    icon: '/ITeach_logo.svg',
  },
};

const AsyncChildren = async ({ children }: { children: React.ReactNode }) => {
  // Giả lập độ trễ (lazy load)
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
      <header>
        <Navbar/>
      </header>

      <Suspense fallback={<Loading/>}>
        <main>
            {children}
        </main>
      </Suspense>


      <footer>
        <Footer/>
      </footer>
    </body>
    </html>
  );
}
