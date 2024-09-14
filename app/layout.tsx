import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME as string,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS as string,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL as string,
    title: process.env.NEXT_PUBLIC_APP_NAME as string,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    images: ['/logo.svg'],
    siteName: process.env.NEXT_PUBLIC_APP_NAME as string,
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_APP_NAME as string,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    images: ['/logo.svg'],
    creator: "@aadars_guru",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black dark:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
