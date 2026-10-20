"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { Stagger, StaggerItem } from "./ui-helpers";
import { useUIStore } from "@/lib/store";

export function ServiceGroupGrid({ group }: { group: "Real Estate" | "Construction" }) {
  const openService = useUIStore((s) => s.openService);
  const services = SERVICES.filter((s) => s.group === group);

  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
      {services.map((service) => (
        <StaggerItem key={service.slug}>
          <motion.button
            onClick={() => openService(service.slug)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="group card-modern flex h-full w-full flex-col items-start overflow-hidden rounded-2xl border border-border bg-white text-left transition-colors hover:border-accent-blue/40 hover:shadow-soft-lg"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="text-lg font-bold text-navy">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body-text">
                {service.shortDescription}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue">
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
