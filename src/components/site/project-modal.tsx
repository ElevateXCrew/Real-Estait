"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, MapPin, Calendar, Check, ZoomIn, ArrowRight, Phone } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { PROJECTS } from "@/lib/data";
import { DynamicIcon } from "../dynamic-icon";
import { cn } from "@/lib/utils";

export function ProjectModal() {
  const { projectSlug, closeProject, openProject, openLightbox } = useUIStore();
  const project = PROJECTS.find((p) => p.slug === projectSlug) || null;

  return (
    <AnimatePresence>
      {project && (
        <ProjectModalInner
          key={project.slug}
          project={project}
          onClose={closeProject}
          onOpenLightbox={openLightbox}
          onOpenRelated={openProject}
        />
      )}
    </AnimatePresence>
  );
}

function ProjectModalInner({
  project,
  onClose,
  onOpenLightbox,
  onOpenRelated,
}: {
  project: (typeof PROJECTS)[number];
  onClose: () => void;
  onOpenLightbox: (images: string[], index?: number) => void;
  onOpenRelated: (slug: string) => void;
}) {
  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto bg-navy/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="min-h-full w-full"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto my-0 max-w-5xl bg-white lg:my-6 lg:rounded-2xl lg:shadow-2xl">
          {/* Hero */}
          <div className="relative overflow-hidden lg:rounded-t-2xl">
            <div className="relative h-60 w-full sm:h-80">
              { }
              <img src={project.cover} alt={project.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-navy backdrop-blur transition hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-blue px-3 py-1 text-xs font-semibold text-white">
                  {project.category}
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    project.status === "Completed"
                      ? "bg-white/90 text-navy"
                      : "bg-white/20 text-white"
                  )}
                >
                  {project.status}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  <Calendar className="h-3 w-3" />
                  {project.year}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{project.name}</h1>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-soft-blue">
                <MapPin className="h-4 w-4" />
                {project.location}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-8 sm:px-8 lg:px-10">
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-navy">Project Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-body-text">{project.description}</p>
            </section>

            {/* Gallery */}
            <section className="mt-8">
              <h2 className="text-xl font-bold text-navy">Project Gallery</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => onOpenLightbox(project.gallery, i)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-light-bg"
                  >
                    { }
                    <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all group-hover:bg-navy/40 group-hover:opacity-100">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Scope + Materials */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <section>
                <h2 className="text-lg font-bold text-navy">Scope of Work</h2>
                <ul className="mt-4 space-y-2.5">
                  {project.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-body-text">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-accent-blue" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-navy">Materials &amp; Specifications</h2>
                <ul className="mt-4 space-y-2.5">
                  {project.materials.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-body-text">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Challenges + Solutions */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-light-bg p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-navy">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                    <DynamicIcon name="MessagesSquare" className="h-4 w-4" />
                  </span>
                  Project Challenges
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body-text">{project.challenges}</p>
              </div>
              <div className="rounded-xl border border-border bg-light-bg p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-navy">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                    <DynamicIcon name="ShieldCheck" className="h-4 w-4" />
                  </span>
                  Our Solutions
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-body-text">{project.solutions}</p>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-navy">Related Projects</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  {related.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => {
                        onOpenRelated(p.slug);
                        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                      }}
                      className="group card-modern flex flex-col overflow-hidden rounded-xl border border-border bg-white text-left transition hover:border-accent-blue/40 hover:shadow-soft-lg"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        { }
                        <img src={p.cover} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-3.5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue">{p.category}</p>
                        <p className="mt-1 line-clamp-1 text-sm font-bold text-navy">{p.name}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-body-text">{p.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-10 overflow-hidden rounded-2xl bg-navy p-8 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Request a Similar Project Consultation
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-soft-blue/80">
                Inspired by this project? Let's discuss how we can deliver something tailored to your site, budget, and goals.
              </p>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.querySelector("#contact");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 72;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }, 200);
                }}
                className="shine shine-light mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-navy transition hover:bg-soft-blue hover:shadow-glow"
              >
                <Phone className="h-4 w-4" />
                Start a Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
