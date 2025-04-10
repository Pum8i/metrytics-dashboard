import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO - Add more metadata
export const metadata: Metadata = {
  title: "Metrytics",
  description: "A simple analytics dashboard built to track website visitors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icon.png"
        />
        <link rel="manifest" href="site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} sm:min-h-screen md:max-h-screen antialiased bg-gradient-to-b from-secondary to-background dark overflow-auto`}
      >
        {children}
        <Toaster expand position="top-center" />
      </body>
    </html>
  );
}
