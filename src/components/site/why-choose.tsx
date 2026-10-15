"use client";

import { WHY_CHOOSE } from "@/lib/data";
import { Container, Reveal, SectionHeading, Stagger, StaggerItem } from "./ui-helpers";
import { DynamicIcon } from "../dynamic-icon";

export function WhyChoose() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Meridian"
            title="Why Clients Choose Us"
            description="We earn trust through consistent quality, clear communication, and a genuine commitment to every project's success."
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {WHY_CHOOSE.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-blue text-accent-blue transition-colors hover:bg-navy hover:text-white">
                  <DynamicIcon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body-text">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
