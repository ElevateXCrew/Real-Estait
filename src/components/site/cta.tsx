"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "./ui-helpers";

export function CTA() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-navy py-8 sm:py-10">
      {/* Decorative glows */}
      <div className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent-blue/5 blur-3xl" />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Left: text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl text-balance"
            >
              Ready to Find Your Property or Start Your Next Project?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-soft-blue/90 sm:text-base"
            >
              Whether you are searching for the right property, planning a construction
              project, exploring a renovation, or refining an investment strategy — our
              team is ready to help you take the next step.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => scrollTo("#properties")}
                className="shine shine-light group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-navy transition-all hover:bg-soft-blue hover:shadow-glow"
              >
                View Properties
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="shine shine-light inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/15"
              >
                <Phone className="h-4 w-4" />
                Let's Talk
              </button>
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative lg:translate-x-6 lg:-mr-4"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-soft-lg">
              <img
                src="/cta-image.png"
                alt="TS Estate & Builders project"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
