"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, ArrowUpRight, Calendar } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { Container, Reveal, SectionHeading } from "./ui-helpers";
import { useUIStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Residential", "Commercial", "Renovation", "Interior Design", "Architecture"] as const;
type ProjectFilter = (typeof FILTERS)[number];

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const openProject = useUIStore((s) => s.openProject);

  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="scroll-mt-20 bg-white py-8 sm:py-12">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Construction Portfolio"
            title="Built with Precision. Designed to Last."
            description="A selection of our residential, commercial, renovation, and architectural projects — each delivered with disciplined management and documented quality."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  filter === f
                    ? "bg-navy text-white shadow-md"
                    : "border border-border bg-white text-navy-700 hover:border-accent-blue/40 hover:text-accent-blue"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.button
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openProject(project.slug)}
                className="group card-modern relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white text-left transition-all hover:border-accent-blue/40 hover:shadow-soft-lg"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm",
                      project.status === "Completed"
                        ? "bg-navy/90 text-white"
                        : project.status === "In Progress"
                          ? "bg-accent-blue/90 text-white"
                          : "bg-white/90 text-navy"
                    )}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-blue">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-body-text">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-navy">{project.name}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-body-text">
                    <MapPin className="h-3.5 w-3.5 text-accent-blue" />
                    {project.location}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-body-text line-clamp-2">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue">
                    View Project Details
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
