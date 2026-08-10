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

export const metadata: Metadata = {
  title: {
    default: "Patrice Maxwell | Software Engineer",
    template: "Patrice Maxwell | %s",
  },
  description:
    "Software Engineer building secure cloud-native systems, payment systems, and AI-enabled engineering workflows.",
  icons: {
    icon: "/PM.png",
    shortcut: "/PM.png",
    apple: "/PM.png",
  },
   openGraph: {
    title: "Patrice Maxwell | Software Engineer",
    description:
      "Cloud Architecture • Payment Systems • AI-First Engineering",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
