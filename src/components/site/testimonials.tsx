"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { Container, Reveal, SectionHeading } from "./ui-helpers";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = TESTIMONIALS[index];

  const next = () => setIndex((p) => (p + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="bg-navy py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Client Feedback"
            title="What Our Clients Say"
            description="Genuine, verified feedback is the goal. The entries below are clearly labeled placeholder content for this demo."
            light
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
              <Quote className="absolute right-6 top-6 h-12 w-12 text-white/10" />

              <div className="flex gap-1">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-accent-blue text-accent-blue" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mt-5 text-lg leading-relaxed text-white/90 sm:text-xl">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div className="mt-7 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue text-sm font-bold text-white">
                      {current.initials}
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">{current.name}</p>
                      <p className="text-sm text-soft-blue/80">
                        {current.role} · {current.project}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {current.placeholder && (
                <p className="mt-5 flex items-start gap-2 rounded-lg border border-accent-blue/20 bg-accent-blue/10 p-3 text-xs text-soft-blue">
                  <Info className="mt-0.5 h-3.5 w-3.5 flex-none text-accent-blue" />
                  Placeholder testimonial — replace with verified client feedback and proper consent before launch.
                </p>
              )}
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === index ? "w-8 bg-accent-blue" : "w-2 bg-white/30 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
