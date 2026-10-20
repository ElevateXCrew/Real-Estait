"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, Check, ArrowRight, Phone } from "lucide-react";
import { useUIStore } from "@/lib/store";
import { SERVICES } from "@/lib/data";
import { DynamicIcon } from "../dynamic-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ServiceModal() {
  const { serviceSlug, closeService, openService } = useUIStore();
  const service = SERVICES.find((s) => s.slug === serviceSlug) || null;

  return (
    <AnimatePresence>
      {service && (
        <ServiceModalInner
          key={service.slug}
          service={service}
          onClose={closeService}
          onOpenRelated={openService}
        />
      )}
    </AnimatePresence>
  );
}

function ServiceModalInner({
  service,
  onClose,
  onOpenRelated,
}: {
  service: (typeof SERVICES)[number];
  onClose: () => void;
  onOpenRelated: (slug: string) => void;
}) {
  const related = SERVICES.filter(
    (s) => s.slug !== service.slug && s.group === service.group,
  ).slice(0, 4);

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
            <div className="relative h-56 w-full sm:h-72">
              { }
              <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-navy backdrop-blur transition hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                  <DynamicIcon name={service.icon} className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-blue">
                    {service.group} Service
                  </span>
                  <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                    {service.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-8 sm:px-8 lg:px-10">
            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-navy">Service Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-body-text">{service.overview}</p>
            </section>

            {/* Scope + Benefits */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <section>
                <h2 className="text-lg font-bold text-navy">Scope of Work</h2>
                <ul className="mt-4 space-y-2.5">
                  {service.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-body-text">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-lg font-bold text-navy">Benefits &amp; Deliverables</h2>
                <ul className="mt-4 space-y-2.5">
                  {service.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-body-text">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-accent-blue" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Workflow */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Project Workflow</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {service.workflow.map((step, i) => (
                  <div key={step.title} className="relative rounded-xl border border-border bg-light-bg p-4">
                    <span className="text-3xl font-bold text-soft-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-navy">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-body-text">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="mt-4 w-full">
                {service.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-navy hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-body-text">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Related services */}
            {related.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-navy">Related Services</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => {
                        onOpenRelated(s.slug);
                        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                      }}
                      className="group card-modern flex flex-col items-start rounded-xl border border-border bg-white p-4 text-left transition hover:border-accent-blue/40 hover:shadow-soft-lg"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-soft-blue text-accent-blue transition group-hover:bg-navy group-hover:text-white">
                        <DynamicIcon name={s.icon} className="h-5 w-5" />
                      </span>
                      <h3 className="mt-3 text-sm font-bold text-navy">{s.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-body-text">{s.shortDescription}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-blue">
                        Learn More
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mt-10 overflow-hidden rounded-2xl bg-navy p-8 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Request a {service.title} Consultation
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-soft-blue/80">
                Share your requirements and timeline — our team will respond within one business day with next steps.
              </p>
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.querySelector("#contact");
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 72;
                      window.scrollTo({ top, behavior: "smooth" });
                    } else {
                      window.location.href = "/contact";
                    }
                  }, 200);
                }}
                className="shine shine-light mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-navy transition hover:bg-soft-blue hover:shadow-glow"
              >
                <Phone className="h-4 w-4" />
                Request a Consultation
              </button>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
