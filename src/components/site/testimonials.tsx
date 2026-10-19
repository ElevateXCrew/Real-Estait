"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { Container, Reveal } from "./ui-helpers";
import { cn } from "@/lib/utils";

const AVATARS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  const next = () => setIndex((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="relative overflow-hidden bg-navy py-12 sm:py-16">
      {/* Background image with overlays */}
      <div aria-hidden className="absolute inset-0">
        <img
          src="/testimonials-bg.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/70 to-navy-700/60" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent-blue/10 blur-[130px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading */}
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-blue">
              Client Feedback
            </p>
            <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
              What Our <span className="text-gradient-light">Clients Say</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-soft-blue/85">
              Real stories from homeowners, investors, and businesses who trusted
              TS Estate &amp; Builders with their most important spaces.
            </p>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-5">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-accent-blue" : "w-2 bg-white/30 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition hover:border-accent-blue/60 hover:bg-white/15"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition hover:border-accent-blue/60 hover:bg-white/15"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Right: testimonial glass card */}
          <Reveal delay={0.1}>
            <div className="relative">
              {/* Decorative quote */}
              <Quote className="absolute -top-6 -left-2 h-16 w-16 text-accent-blue/25" />

              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-soft-lg backdrop-blur-xl sm:p-10">
                {/* Top accent */}
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue via-accent-blue/60 to-transparent" />

                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-5 text-lg leading-relaxed text-white sm:text-xl">
                      &ldquo;{current.quote}&rdquo;
                    </p>

                    <div className="mt-7 flex items-center gap-4">
                      <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full border-2 border-amber-400/70 bg-accent-blue">
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                          {current.initials}
                        </span>
                        <img
                          src={AVATARS[index % AVATARS.length]}
                          alt={current.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </span>
                      <div>
                        <p className="text-base font-bold text-white">{current.name}</p>
                        <p className="text-sm text-soft-blue/80">
                          {current.role} · {current.project}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
