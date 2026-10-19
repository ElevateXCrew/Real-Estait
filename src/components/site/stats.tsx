"use client";

import { STATS } from "@/lib/data";
import { Container, Reveal, AnimatedCounter } from "./ui-helpers";
import { DynamicIcon } from "../dynamic-icon";

export function Stats() {
  return (
    <section className="relative z-20 bg-white py-8 sm:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center justify-center gap-3 bg-white px-4 py-8 text-center sm:py-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-blue text-accent-blue">
                  <DynamicIcon name={stat.icon} className="h-6 w-6" />
                </span>
                <div className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-body-text sm:text-sm">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
