"use client";
import { useId, useState } from "react";
import {
  FileTextIcon,
  GlobeIcon,
  HomeIcon,
  LayersIcon,
  Link,
  UsersIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import Logo from "@/components/navbar/logo";
import ThemeToggle from "@/components/navbar/theme-toggle";
import UserMenu from "@/components/navbar/user-menu";
import { LanguageSwitcher } from "@/components/navbar/languaje-switcher";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { authClient } from "@/lib/auth-client";

// Navigation links
const navigationLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/#pricing", label: "Pricing", icon: GlobeIcon },
  { href: "/docs", label: "Docs", icon: FileTextIcon },
];

// Language options
const languages = [
  { value: "en", label: "En" },
  { value: "es", label: "Es" },
];

export default function Navbar() {
  const id = useId();
  const { data: session, isPending: loading } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left side */}
            <div className="flex flex-1 items-center gap-2">
              {/* Mobile menu trigger */}
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
              <div className="flex items-center gap-6">
                {/* Logo */}
                <a href="/" className="text-primary hover:text-primary/90">
                  <Logo />
                </a>
                {/* Desktop navigation - text links */}
                <NavigationMenu className="hidden md:flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link) => (
                      <NavigationMenuItem key={link.label}>
                        <NavigationMenuLink
                          href={link.href}
                          className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <ThemeToggle />
              {/* Language selector */}
              <LanguageSwitcher />

              <Button
                onClick={() => (window.location.href = "/waitlist")}
                className="text-sm  cursor-pointer border-2 bg-transparent border-indigo-700 hover:bg-indigo-700 text-foreground"
              >
                Waitlist
              </Button>
              {/* User menu */}
              {!loading &&
                (session?.user ? (
                  <UserMenu />
                ) : (
                  <Button
                    onClick={() => (window.location.href = "/signin")}
                    className="text-sm bg-indigo-600 text-white hover:bg-indigo- cursor-pointer"
                  >
                    Sign In
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background shadow-lg md:hidden"
            >
              <div className="flex h-full flex-col p-4">
                {/* Navigation links */}
                <nav className="flex flex-col gap-2">
                  {navigationLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-foreground transition-colors"
                      >
                        <Icon size={18} className="text-muted-foreground" />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
