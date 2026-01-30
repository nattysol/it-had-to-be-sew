import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Use standard Google Font
import "./globals.css";

// Load the font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "It Had To Be Sew",
  description: "Quilting Project Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ This is the line that fixes your wonky icons */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}