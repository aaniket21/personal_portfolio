"use client";
import img from "@/../public/assets/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";

const navItems = [
  { label: "About", to: "about" },
  { label: "Experience", to: "experience" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Certificates", to: "certificates" },
  { label: "Contact", to: "contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const applyTheme = (nextTheme: "light" | "dark") => {
    const isDark = nextTheme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    if (storedTheme === "light" || storedTheme === "dark") {
      root.classList.toggle("dark", storedTheme === "dark");
      setTheme(storedTheme);
      setMounted(true);
      return;
    }

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const nextTheme = systemPrefersDark ? "dark" : "light";
    root.classList.toggle("dark", systemPrefersDark);
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  const renderLink = (
    item: { label: string; to: string },
    isMobile = false,
  ) => {
    const isHomePage = pathname === "/";

    // Shared classes for both desktop and mobile
    const baseClasses = isMobile
      ? "block cursor-pointer py-3 text-lg font-semibold transition-all duration-300 border-b border-slate-300/40 dark:border-white/5"
      : "cursor-pointer transition-all duration-300 relative group px-2 py-1 text-sm lg:text-base font-medium";

    if (isHomePage) {
      return (
        <ScrollLink
          key={item.to}
          to={item.to}
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          activeClass="text-red-500 !font-bold"
          className={`${baseClasses} text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white`}
          onClick={isMobile ? () => setIsMenuOpen(false) : undefined}
        >
          {item.label}
          {!isMobile && (
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-900 transition-all duration-300 group-hover:w-full [.text-red-500_&]:w-full" />
          )}
        </ScrollLink>
      );
    }

    return (
      <Link
        key={item.to}
        href={`/#${item.to}`}
        className={`${baseClasses} text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white`}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {item.label}
        {!isMobile && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-900 transition-all duration-300 group-hover:w-full" />
        )}
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-[9999] transition-all duration-500 ${
        isScrolled
          ? "bg-white/85 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between mx-auto px-4 lg:px-8">
        <Link
          href="/"
          className="transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={img}
            alt="Aniket"
            width={isScrolled ? 50 : 60}
            height={isScrolled ? 50 : 60}
            className="transition-all duration-500 rounded-full border border-slate-200/70 dark:border-white/10 overflow-hidden object-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => renderLink(item))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-300/70 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-100 hover:text-red-500 hover:border-red-500/60 transition-all duration-300 shadow-sm dark:shadow-none"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {mounted ? (theme === "dark" ? "🌞" : "🌙") : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-300/70 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-100 hover:text-red-500 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {mounted ? (theme === "dark" ? "🌞" : "🌙") : "🌙"}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-900 dark:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl border-b border-slate-200/70 dark:border-white/10 md:hidden animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-2">
            {navItems.map((item) => renderLink(item, true))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
