"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
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
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
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
            ? "glass-dark border-b border-white/10 shadow-[0_4px_30px_rgba(11,31,58,0.15)]"
            : "bg-gradient-to-b from-navy/60 to-transparent"
        )}
      >
        <Container className="flex h-16 items-center justify-between lg:h-20">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-3"
          >
            {/* Big logo at far left */}
            <img
              src="/logo.png"
              alt="TS Estate & Builders"
              className="-ml-5 h-32 w-32 flex-none rounded-full object-contain drop-shadow-[0_6px_18px_rgba(11,31,58,0.4)] sm:-ml-8 lg:-ml-12 lg:h-40 lg:w-40"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.dropdown ? link.label : null)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="group relative flex items-center gap-1 rounded-lg px-3 py-2 text-[0.82rem] font-semibold text-white/85 transition-colors hover:text-white xl:px-3.5 xl:text-sm"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 opacity-60 transition-all duration-200",
                        openDropdown === link.label && "rotate-180 opacity-100"
                      )}
                    />
                  )}
                  {/* Hover underline */}
                  <span className="absolute bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-accent-blue transition-all duration-300 group-hover:w-[60%]" />
                </button>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2.5"
                      >
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-[0_20px_60px_rgba(11,31,58,0.25)]">
                          {/* Top accent line */}
                          <div className="mx-2 mb-1 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />
                          {link.dropdown.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleNavClick(item.href)}
                              className="group/item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-navy-700 transition-all hover:bg-soft-blue hover:text-accent-blue"
                            >
                              {item.icon && (
                                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-soft-blue text-accent-blue transition-colors group-hover/item:bg-accent-blue group-hover/item:text-white">
                                  <DynamicIcon name={item.icon} className="h-4 w-4" />
                                </span>
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
          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <a
              href="tel:+14155550142"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-accent-blue/50 hover:bg-white/10 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-accent-blue" />
              <span className="hidden xl:inline">(415) 555-0142</span>
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
              className="shine inline-flex h-10 items-center justify-center rounded-xl bg-accent-blue px-5 text-sm font-bold text-white transition-all hover:brightness-110 hover:shadow-glow"
            >
              Get a Consultation
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white backdrop-blur-sm transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-navy/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNav(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <span className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="TS Estate & Builders logo"
                    className="h-12 w-12 rounded-xl object-contain"
                  />
                  <span className="flex flex-col leading-none">
                    <span className="text-base font-extrabold tracking-tight text-navy">
                      TS Estate
                    </span>
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent-blue">
                      &amp; Builders
                    </span>
                  </span>
                </span>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-navy transition-colors hover:bg-soft-blue"
                  onClick={() => setMobileNav(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    className="mb-0.5"
                  >
                    <button
                      onClick={() =>
                        link.dropdown
                          ? setOpenDropdown((p) => (p === link.label ? null : link.label))
                          : handleNavClick(link.href)
                      }
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-base font-semibold transition-colors",
                        openDropdown === link.label
                          ? "bg-soft-blue text-accent-blue"
                          : "text-navy-700 hover:bg-soft-blue"
                      )}
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
                    <AnimatePresence>
                      {link.dropdown && openDropdown === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-3"
                        >
                          <div className="ml-3 border-l-2 border-accent-blue/20 pl-3">
                            {link.dropdown.map((item) => (
                              <button
                                key={item.label}
                                onClick={() => handleNavClick(item.href)}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-body-text transition-colors hover:bg-soft-blue hover:text-accent-blue"
                              >
                                {item.icon && (
                                  <DynamicIcon name={item.icon} className="h-4 w-4 text-accent-blue" />
                                )}
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>
              <div className="border-t border-border p-4">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="shine flex w-full items-center justify-center rounded-xl bg-accent-blue px-5 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
                >
                  Get a Consultation
                </button>
                <a
                  href="tel:+14155550142"
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-navy-700"
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
