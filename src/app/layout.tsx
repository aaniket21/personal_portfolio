import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "@/../utils/ScrollToTopButton";
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
  title: "Aniket | Full Stack Developer",
  description:
    "Explore the portfolio of Aniket, a Full Stack Developer specializing in React.js, Next.js, Node.js, and AI-powered system development. Building scalable, user-centric web applications.",
  keywords: [
    "Aniket",
    "Full Stack Developer",
    "React Developer",
    "Next.js Portfolio",
    "Node.js Developer",
    "Software Engineer",
    "TypeScript Developer",
  ],
  authors: [{ name: "Aniket" }],
  openGraph: {
    title: "Aniket | Personal Portfolio",
    description:
      "Full Stack Developer — Building scalable web applications and AI-powered platforms.",
    url: "https://aaniket21.vercel.app",
    siteName: "Aniket Portfolio",
    images: [
      {
        url: "/assets/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aniket Portfolio Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/logo/logo.png",
    apple: "/assets/logo/logo.png",
  },
};

const themeInitScript = `
(() => {
  try {
    const storageKey = "theme";
    const savedTheme = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
  } catch {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased theme-ready`}
      >
        <Navbar />
        <main className="text-slate-900 dark:text-white transition-colors duration-300">
          <div className="container">{children}</div>
        </main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
