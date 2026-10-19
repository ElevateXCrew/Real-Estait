"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BedDouble, Bath, Maximize, MapPin, ArrowRight } from "lucide-react";
import { PROPERTIES } from "@/lib/data";
import { Container, Reveal, SectionHeading } from "./ui-helpers";
import { useUIStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Filter = "All" | "For Sale" | "For Rent";

export function FeaturedProperties() {
  const [filter, setFilter] = useState<Filter>("All");
  const openProperty = useUIStore((s) => s.openProperty);

  const filtered =
    filter === "All"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.status === filter);

  return (
    <section id="properties" className="scroll-mt-20 bg-light-bg py-8 sm:py-12">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured Listings"
            title="Explore Our Featured Properties"
            description="A curated selection of residential and commercial properties for sale and rent — each field-checked and ready for viewing."
          />
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {(["All", "For Sale", "For Rent"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                  filter === f
                    ? "bg-navy text-white shadow-md"
                    : "bg-white text-navy-700 border border-border hover:border-accent-blue/40 hover:text-accent-blue"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((property) => (
              <motion.button
                layout
                key={property.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openProperty(property.slug)}
                className="group card-modern flex flex-col overflow-hidden rounded-2xl border border-border bg-white text-left transition-all hover:border-accent-blue/40 hover:shadow-soft-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  { }
                  <img
                    src={property.cover}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm",
                      property.status === "For Sale"
                        ? "bg-navy/90 text-white"
                        : "bg-accent-blue/90 text-white"
                    )}
                  >
                    {property.status}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                    {property.type}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-body-text">
                    <MapPin className="h-3.5 w-3.5 text-accent-blue" />
                    {property.location}
                  </p>
                  <h3 className="mt-1.5 text-lg font-bold text-navy">{property.title}</h3>

                  {/* Specs */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-body-text">
                    {property.bedrooms > 0 && (
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="h-4 w-4 text-navy-700" />
                        {property.bedrooms} Beds
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Bath className="h-4 w-4 text-navy-700" />
                      {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Maximize className="h-4 w-4 text-navy-700" />
                      {property.area.toLocaleString()} sqft
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-body-text">{property.status === "For Rent" ? "Monthly Rent" : "Asking Price"}</p>
                      <p className="text-lg font-bold text-navy">{property.priceLabel}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-soft-blue px-3.5 py-2 text-xs font-semibold text-accent-blue transition-colors group-hover:bg-navy group-hover:text-white">
                      View Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => {
                const el = document.querySelector("#properties");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-navy bg-white px-6 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              View All Properties
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
