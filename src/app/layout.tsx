import type { Metadata } from "next";
import {Inter as FontSans} from "next/font/google"
import "./globals.css";
import {cn} from "@/lib/utils"
import { Header } from "./header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Auction Buddy",
  "description": "An auction next.js app"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h screen bg-background font-sans antialiased", fontSans.variable)}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
