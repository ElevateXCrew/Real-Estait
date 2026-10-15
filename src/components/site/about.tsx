"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Container, Reveal, SectionHeading } from "./ui-helpers";
import { ABOUT_IMAGE } from "@/lib/data";

const POINTS = [
  "Integrated real estate, construction, and property management",
  "Architect-led design with disciplined project delivery",
  "Transparent pricing and regular progress communication",
  "Verified listings and documented construction quality",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-light-bg py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              { }
              <img
                src={ABOUT_IMAGE}
                alt="Premium architecture by Meridian"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
              />
            </div>
            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="absolute -bottom-6 -right-2 max-w-[16rem] rounded-2xl border border-border bg-white p-5 shadow-soft-lg sm:-right-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-2xl font-bold leading-none text-navy">340+</p>
                  <p className="mt-1 text-xs text-body-text">Projects delivered</p>
                </div>
              </div>
              <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-body-text">
                Illustrative figure — replace with verified data before launch.
              </p>
            </motion.div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="About Our Company"
              title="Your Trusted Partner in Property and Construction."
              align="left"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-body-text">
              <p>
                Meridian brings together seasoned agents, architects, engineers, and
                project managers under one roof — so whether you are buying a home,
                developing a site, or renovating a space, you work with a single,
                accountable team.
              </p>
              <p>
                Our real estate practice covers buying, selling, rentals, management,
                and investment consulting. Our construction practice spans residential
                and commercial builds, architecture, interior design, renovation, civil
                engineering, and turnkey delivery.
              </p>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-main-text">{point}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                const el = document.querySelector("#services");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="shine group mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-navy px-6 text-sm font-bold text-white transition-all hover:bg-navy-700 hover:shadow-glow"
            >
              Discover Our Company
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
