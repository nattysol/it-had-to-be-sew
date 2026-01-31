import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// 1. Load Google Fonts (Vercel Best Practice: Self-hosted automatically)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "It Had To Be Sew | Longarm Quilting Services",
  description: "Professional longarm quilting, binding, and finishing services in Las Vegas.",
  icons: {
    icon: '/logo.png', // Uses your logo file
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Material Symbols for Icons */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#f8f7fa] text-[#131118]`}>
        {children}
      </body>
    </html>
  );
}