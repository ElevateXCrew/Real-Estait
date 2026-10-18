"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { Container, Reveal, SectionHeading, Stagger, StaggerItem } from "./ui-helpers";
import { DynamicIcon } from "../dynamic-icon";
import { useUIStore } from "@/lib/store";

const realEstate = SERVICES.filter((s) => s.group === "Real Estate");
const construction = SERVICES.filter((s) => s.group === "Construction");

export function Services() {
  const openService = useUIStore((s) => s.openService);

  return (
    <section id="services" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Complete Property & Construction Solutions"
            description="Two practices, one accountable partner. Explore our real estate and construction services, each backed by experienced specialists and a transparent process."
          />
        </Reveal>

        {/* Real Estate Services */}
        <div className="mt-14">
          <Reveal>
            <h3 className="text-2xl font-bold text-navy sm:text-3xl">Real Estate Services</h3>
          </Reveal>
          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {realEstate.map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} onOpen={() => openService(service.slug)} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Construction Services */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-2xl font-bold text-navy sm:text-3xl">Construction Services</h3>
          </Reveal>
          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {construction.map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} onOpen={() => openService(service.slug)} compact />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  service,
  onOpen,
  compact = false,
}: {
  service: (typeof SERVICES)[number];
  onOpen: () => void;
  compact?: boolean;
}) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className={`group card-modern flex h-full w-full flex-col items-start rounded-xl border border-border bg-white p-5 text-left transition-colors hover:border-accent-blue/40 hover:shadow-soft-lg ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-soft-blue text-accent-blue transition-colors group-hover:bg-navy group-hover:text-white">
        <DynamicIcon name={service.icon} className="h-6 w-6" />
      </span>
      <h4 className="mt-4 text-base font-semibold text-navy">{service.title}</h4>
      <p className={`mt-2 text-sm leading-relaxed text-body-text ${compact ? "line-clamp-2" : ""}`}>
        {service.shortDescription}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue">
        Learn More
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}
