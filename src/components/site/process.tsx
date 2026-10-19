"use client";

import { PROCESS_STEPS } from "@/lib/data";
import { Container, Reveal, SectionHeading, Stagger, StaggerItem } from "./ui-helpers";

export function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-light-bg py-8 sm:py-12">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How We Work"
            title="A Clear Process, Start to Handover"
            description="From first conversation to final keys, our process keeps every stage transparent, documented, and on schedule."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group card-modern relative h-full overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all hover:border-accent-blue/40 hover:shadow-soft-lg">
                <span className="absolute right-4 top-3 text-5xl font-extrabold text-soft-blue transition-colors group-hover:text-accent-blue/15">
                  {step.number}
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-navy">{step.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-body-text">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
