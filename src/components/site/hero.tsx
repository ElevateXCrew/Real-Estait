"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, MapPin, Home, Briefcase, Sparkles } from "lucide-react";
import { Container } from "./ui-helpers";
import { HERO_IMAGE } from "@/lib/data";

export function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-navy">
      {/* Background image with zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 9, ease: "easeOut" }}
      >
        { }
        <img
          src={HERO_IMAGE}
          alt="Modern luxury architecture"
          className="h-full w-full object-cover"
        />
        {/* Layered overlays for depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-navy/40" />
        {/* Subtle mesh glow */}
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent-blue/25 blur-[120px]" />
      </motion.div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-48 lg:pb-52">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
            Real Estate &amp; Construction
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl text-balance"
          >
            Building Better Spaces.{" "}
            <span className="text-gradient-light">Creating Lasting Value.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-soft-blue/90 sm:text-lg"
          >
            From premium property sales and management to residential and commercial
            construction, architecture, and turnkey development — Meridian is your
            single trusted partner across the property journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo("#properties")}
              className="shine group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-navy transition-all hover:bg-soft-blue hover:shadow-glow"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="shine-light shine group inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/15"
            >
              Our Construction Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex h-12 items-center gap-1.5 px-2 text-sm font-semibold text-white underline-offset-4 transition hover:text-accent-blue hover:underline"
            >
              Book a Consultation
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </div>
      </Container>

      {/* Glass search panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="absolute inset-x-0 bottom-0 z-10 hidden translate-y-1/2 lg:block"
      >
        <Container>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              scrollTo("#properties");
            }}
            className="grid grid-cols-[1.2fr_1fr_1fr_auto] items-end gap-3 rounded-2xl border border-border bg-white/95 p-3 shadow-soft-lg backdrop-blur-xl"
          >
            <SearchField icon={<Search className="h-4 w-4" />} label="Search" placeholder="Location, name or keyword" />
            <SelectField icon={<Briefcase className="h-4 w-4" />} label="Status" options={["Any", "For Sale", "For Rent"]} />
            <SelectField icon={<Home className="h-4 w-4" />} label="Type" options={["Any", "Villa", "Apartment", "House", "Penthouse", "Townhouse", "Office"]} />
            <button
              type="submit"
              className="shine inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-navy px-7 text-sm font-bold text-white transition-all hover:bg-navy-700 hover:shadow-glow"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>
        </Container>
      </motion.div>

      {/* Mobile search shortcut */}
      <div className="absolute inset-x-0 bottom-0 z-10 lg:hidden">
        <Container className="pb-6">
          <button
            onClick={() => scrollTo("#properties")}
            className="shine-light shine flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-navy shadow-soft-lg"
          >
            <MapPin className="h-4 w-4 text-accent-blue" />
            Browse Properties
          </button>
        </Container>
      </div>
    </section>
  );
}

function SearchField({
  icon,
  label,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 px-3">
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-body-text">
        {icon}
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="h-[34px] w-full border-0 bg-transparent text-sm font-semibold text-navy outline-none placeholder:text-body-text/50"
      />
    </label>
  );
}

function SelectField({
  icon,
  label,
  options,
}: {
  icon: React.ReactNode;
  label: string;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5 border-l border-border px-3">
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-body-text">
        {icon}
        {label}
      </span>
      <select className="h-[34px] w-full border-0 bg-transparent text-sm font-semibold text-navy outline-none">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
