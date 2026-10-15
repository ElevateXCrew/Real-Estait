"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Building2,
  Home,
  Hammer,
  Briefcase,
  PencilRuler,
  KeyRound,
  HardHat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./ui-helpers";
import { useUIStore } from "@/lib/store";
import { DynamicIcon } from "../dynamic-icon";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  {
    label: "Properties",
    href: "#properties",
    dropdown: [
      { label: "All Properties", href: "#properties", icon: "Building2" },
      { label: "For Sale", href: "#properties", icon: "Tag" },
      { label: "For Rent", href: "#properties", icon: "KeyRound" },
      { label: "Residential", href: "#properties", icon: "Home" },
      { label: "Commercial", href: "#properties", icon: "Briefcase" },
    ],
  },
  { label: "Construction", href: "#projects", icon: "HardHat" },
  {
    label: "Services",
    href: "#services",
    dropdown: [
      { label: "All Services", href: "#services", icon: "Briefcase" },
      { label: "Real Estate Services", href: "#services", icon: "Home" },
      { label: "Construction Services", href: "#services", icon: "HardHat" },
      { label: "Property Management", href: "#services", icon: "Building2" },
      { label: "Turnkey Construction", href: "#services", icon: "KeyRound" },
    ],
  },
  { label: "Projects", href: "#projects" },
  { label: "Contact Us", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { mobileNavOpen, setMobileNav } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileNav(false);
    setOpenDropdown(null);
    const el = document.querySelector(href);
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - 72; // offset for navbar
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-dark border-b border-white/10 shadow-[0_4px_30px_rgba(11,31,58,0.12)]"
            : "bg-transparent"
        )}
      >
        <Container className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-2.5"
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-all",
                scrolled ? "bg-white text-navy" : "bg-white text-navy"
              )}
            >
              <Building2 className="h-5 w-5" />
            </span>
            <span
              className={cn(
                "text-xl font-extrabold tracking-tight transition-colors",
                "text-white"
              )}
            >
              Meridian
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.dropdown ? link.label : null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                    scrolled
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        openDropdown === link.label && "rotate-180"
                      )}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2"
                      >
                        <div className="overflow-hidden rounded-xl border border-border bg-white/95 p-1.5 shadow-soft-lg backdrop-blur-xl">
                          {link.dropdown.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleNavClick(item.href)}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-navy-700 transition-colors hover:bg-soft-blue hover:text-accent-blue"
                            >
                              {item.icon && (
                                <DynamicIcon
                                  name={item.icon}
                                  className="h-4 w-4 text-accent-blue"
                                />
                              )}
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+14155550142"
              className={cn(
                "flex items-center gap-2 text-sm font-semibold transition-colors",
                "text-white/90 hover:text-white"
              )}
            >
              <Phone className="h-4 w-4 text-accent-blue" />
              <span className="hidden xl:inline">(415) 555-0142</span>
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="shine inline-flex h-10 items-center justify-center rounded-lg bg-accent-blue px-5 text-sm font-bold text-white transition-all hover:brightness-110 hover:shadow-glow"
            >
              Get a Consultation
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg lg:hidden",
              "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </Container>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-navy/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNav(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <span className="flex items-center gap-2 text-lg font-bold text-navy">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
                    <Building2 className="h-4.5 w-4.5" />
                  </span>
                  Meridian
                </span>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-soft-blue"
                  onClick={() => setMobileNav(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="mb-1">
                    <button
                      onClick={() =>
                        link.dropdown
                          ? setOpenDropdown((p) => (p === link.label ? null : link.label))
                          : handleNavClick(link.href)
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-navy-700 hover:bg-soft-blue"
                    >
                      {link.label}
                      {link.dropdown && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openDropdown === link.label && "rotate-180"
                          )}
                        />
                      )}
                    </button>
                    {link.dropdown && openDropdown === link.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3"
                      >
                        {link.dropdown.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleNavClick(item.href)}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-body-text hover:bg-soft-blue hover:text-accent-blue"
                          >
                            {item.icon && (
                              <DynamicIcon name={item.icon} className="h-4 w-4 text-accent-blue" />
                            )}
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="border-t border-border p-4">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="shine flex w-full items-center justify-center rounded-lg bg-accent-blue px-5 py-3 text-sm font-bold text-white hover:brightness-110"
                >
                  Get a Consultation
                </button>
                <a
                  href="tel:+14155550142"
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-navy-700"
                >
                  <Phone className="h-4 w-4 text-accent-blue" />
                  (415) 555-0142
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
