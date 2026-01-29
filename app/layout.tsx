import type { Metadata } from "next";
// We import fonts here to make them available everywhere
import { Inter, Playfair_Display } from "next/font/google"; 
import "./globals.css"; // This loads Tailwind

// 1. Configure Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "It Had To Be Sew",
  description: "Custom Longarm Quilting Services",
};

// 2. The Root Layout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. The Body tag is REQUIRED here */}
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}