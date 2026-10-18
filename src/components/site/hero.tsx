"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "./ui-helpers";

const HERO_IMAGES = ["/hero-back-1.png", "/hero-back-2.png", "/hero-back-3.png", "/hero-back-4.png", "/hero-back-5.png"];
const SLIDE_DURATION = 6000;

export function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-navy">
      {/* Background slideshow with crossfade + zoom */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={slide}
            src={HERO_IMAGES[slide]}
            alt="Modern luxury architecture"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 9, ease: "easeOut" },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* Layered overlays for depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-navy/40" />
        {/* Subtle mesh glow */}
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent-blue/25 blur-[120px]" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-28 lg:pb-32">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[2.8rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-balance"
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
            construction, architecture, and turnkey development — TS Estate &amp; Builders is your
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
          </motion.div>
        </div>
      </Container>

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

