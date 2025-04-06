import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { AppProviders } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ElderEase",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-gradient-to-br from-purple-300 via-pink-100 to-blue-200 "
    >
      <body className={cn("min-h-screen relative ", fontSans.variable)}>
        {/* Blurred Decorative Blobs */}

        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
