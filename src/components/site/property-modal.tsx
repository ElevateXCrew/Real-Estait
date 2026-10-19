"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  X,
  Share2,
  Heart,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  CalendarDays,
  CheckCircle2,
  Loader2,
  Download,
  ZoomIn,
} from "lucide-react";
import { useUIStore } from "@/lib/store";
import { PROPERTIES } from "@/lib/data";
import { DynamicIcon } from "../dynamic-icon";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const visitSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
  visitors: z.string().min(1, "Please select number of visitors"),
  message: z.string().optional(),
});

type VisitData = z.infer<typeof visitSchema>;

export function PropertyModal() {
  const { propertySlug, closeProperty, openProperty, openLightbox } = useUIStore();
  const property = PROPERTIES.find((p) => p.slug === propertySlug) || null;

  return (
    <AnimatePresence>
      {property && (
        <PropertyModalInner
          key={property.slug}
          property={property}
          onClose={closeProperty}
          onOpenLightbox={openLightbox}
          onOpenSimilar={openProperty}
        />
      )}
    </AnimatePresence>
  );
}

function PropertyModalInner({
  property,
  onClose,
  onOpenLightbox,
  onOpenSimilar,
}: {
  property: (typeof PROPERTIES)[number];
  onClose: () => void;
  onOpenLightbox: (images: string[], index?: number) => void;
  onOpenSimilar: (slug: string) => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [visitStatus, setVisitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const similar = PROPERTIES.filter(
    (p) => p.slug !== property.slug && p.category === property.category,
  ).slice(0, 3);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VisitData>({
    resolver: zodResolver(visitSchema),
    defaultValues: { name: "", email: "", phone: "", date: "", time: "", visitors: "1", message: "" },
  });

  const submitVisit = async (data: VisitData) => {
    setVisitStatus("loading");
    try {
      const res = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, property: property.slug }),
      });
      if (!res.ok) throw new Error("failed");
      setVisitStatus("success");
      reset();
      setTimeout(() => setVisitStatus("idle"), 6000);
    } catch {
      setVisitStatus("error");
      setTimeout(() => setVisitStatus("idle"), 6000);
    }
  };

  const mapBbox = `${property.mapLng - 0.012}%2C${property.mapLat - 0.008}%2C${property.mapLng + 0.012}%2C${property.mapLat + 0.008}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBbox}&layer=mapnik&marker=${property.mapLat}%2C${property.mapLng}`;

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
        <div className="mx-auto my-0 max-w-6xl bg-white lg:my-6 lg:rounded-2xl lg:shadow-2xl">
          {/* Top bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-white/95 px-5 py-3 backdrop-blur lg:rounded-t-2xl">
            <nav className="flex items-center gap-1.5 text-xs font-medium text-body-text">
              <button onClick={() => document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-accent-blue">
                Home
              </button>
              <span className="text-border">/</span>
              <button onClick={onClose} className="hover:text-accent-blue">Properties</button>
              <span className="text-border">/</span>
              <span className="font-semibold text-navy line-clamp-1">{property.title}</span>
            </nav>
            <button
              onClick={onClose}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg text-navy hover:bg-soft-blue"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-6 sm:px-8 lg:px-10">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      property.status === "For Sale" ? "bg-navy text-white" : "bg-accent-blue text-white"
                    )}
                  >
                    {property.status}
                  </span>
                  <span className="rounded-full bg-soft-blue px-3 py-1 text-xs font-semibold text-navy">
                    {property.type}
                  </span>
                </div>
                <h1 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">{property.title}</h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-body-text">
                  <MapPin className="h-4 w-4 text-accent-blue" />
                  {property.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const shareUrl = `${window.location.origin}?project=${property.slug}`;
                    const shareData = {
                      title: property.title,
                      text: `${property.title} — ${property.location}`,
                      url: shareUrl,
                    };
                    try {
                      if (navigator.share) {
                        await navigator.share(shareData);
                      } else {
                        await navigator.clipboard.writeText(shareUrl);
                        alert("Link copied to clipboard!");
                      }
                    } catch (err) {
                      if (err.name !== "AbortError") {
                        await navigator.clipboard.writeText(shareUrl);
                        alert("Link copied to clipboard!");
                      }
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-navy transition hover:border-accent-blue hover:text-accent-blue"
                  aria-label="Share this property"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-body-text">
              Reference: <span className="text-navy">{property.reference}</span>
            </p>

            {/* Gallery */}
            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              {/* Main image */}
              <div
                className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl bg-light-bg"
                onClick={() => onOpenLightbox(property.gallery, activeImg)}
              >
                { }
                <img
                  src={property.gallery[activeImg]}
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <ZoomIn className="h-3.5 w-3.5" />
                  Click to zoom
                </span>
                {property.gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImg((p) => (p - 1 + property.gallery.length) % property.gallery.length);
                      }}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImg((p) => (p + 1) % property.gallery.length);
                      }}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow transition hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-white">
                  {activeImg + 1} / {property.gallery.length}
                </span>
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto sm:w-24 sm:flex-col sm:overflow-visible sm:pr-1">
                {property.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "relative h-16 w-24 flex-none overflow-hidden rounded-lg sm:h-20 sm:w-full",
                      i === activeImg ? "ring-2 ring-accent-blue ring-offset-2" : "opacity-70 hover:opacity-100"
                    )}
                  >
                    { }
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Overview + Inquiry card */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <h2 className="text-xl font-bold text-navy">Property Overview</h2>
                <p className="mt-3 text-sm leading-relaxed text-body-text">{property.overview}</p>

                {/* Highlights */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {property.highlights.map((h) => (
                    <div key={h.label} className="rounded-xl border border-border bg-light-bg p-3.5">
                      <DynamicIcon name={h.icon} className="h-5 w-5 text-accent-blue" />
                      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-body-text">
                        {h.label}
                      </p>
                      <p className="text-sm font-bold text-navy">{h.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky inquiry card */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_14px_40px_rgba(11,31,58,0.10)]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-body-text">
                    {property.status === "For Rent" ? "Monthly Rent" : "Asking Price"}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-navy">{property.priceLabel}</p>
                  <p className="mt-1 text-xs text-body-text">Reference {property.reference}</p>

                  <div className="mt-5 space-y-2.5">
                    <button
                      onClick={() => document.getElementById("schedule-visit")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      className="shine flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy text-sm font-bold text-white transition hover:bg-navy-700 hover:shadow-glow"
                    >
                      <CalendarDays className="h-4 w-4" />
                      Schedule a Visit
                    </button>
                    <button
                      onClick={() => document.getElementById("contact-agent")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      className="shine shine-light flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-navy text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
                    >
                      <Phone className="h-4 w-4" />
                      Contact Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">About This Property</h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-body-text">
                {property.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy">Interior Highlights</h3>
                  <ul className="mt-3 space-y-2">
                    {property.interiorHighlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-body-text">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-accent-blue" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-navy">Exterior Highlights</h3>
                  <ul className="mt-3 space-y-2">
                    {property.exteriorHighlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-body-text">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-accent-blue" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Neighborhood */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Neighborhood &amp; Nearby</h2>
              <p className="mt-3 text-sm leading-relaxed text-body-text">{property.neighborhood}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {property.nearbyFacilities.map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-lg border border-border bg-light-bg px-3.5 py-2.5 text-sm font-medium text-navy-700">
                    <MapPin className="h-4 w-4 text-accent-blue" />
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Features &amp; Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {property.amenities.map((a) => (
                  <div key={a.name} className="flex items-center gap-2.5 rounded-xl border border-border bg-light-bg p-3">
                    <DynamicIcon name={a.icon} className="h-5 w-5 flex-none text-accent-blue" />
                    <span className="text-sm font-medium text-navy-700">{a.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Floor plan */}
            {property.floorPlan && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-navy">Floor Plan</h2>
                <div
                  className="mt-4 cursor-pointer overflow-hidden rounded-xl border border-border bg-light-bg"
                  onClick={() => onOpenLightbox([property.floorPlan!], 0)}
                >
                  { }
                  <img src={property.floorPlan} alt="Floor plan" className="h-full w-full object-contain" />
                </div>
              </section>
            )}

            {/* Location map */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Property Location</h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-body-text">
                <MapPin className="h-4 w-4 text-accent-blue" />
                {property.location}
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-border">
                <iframe
                  title="Property location map"
                  src={mapSrc}
                  className="h-[320px] w-full"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-xs text-body-text/70">
                Approximate public location shown for privacy. Exact address shared with verified interested buyers or tenants.
              </p>
            </section>

            {/* Why choose this property */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Why Choose This Property?</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {property.advantages.map((a) => (
                  <div key={a.title} className="flex items-start gap-3 rounded-xl border border-border bg-light-bg p-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white text-accent-blue">
                      <DynamicIcon name={a.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-navy">{a.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-body-text">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Agent */}
            <section id="contact-agent" className="mt-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-navy">Contact Agent</h2>
              <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-border bg-light-bg p-6 sm:flex-row sm:items-center">
                <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-navy text-xl font-bold text-white">
                  {property.agent.initials}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-navy">{property.agent.name}</h3>
                  <p className="text-sm text-body-text">{property.agent.role}</p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-navy-700">
                    <a href={`tel:${property.agent.phone}`} className="flex items-center gap-1.5 hover:text-accent-blue">
                      <Phone className="h-3.5 w-3.5 text-accent-blue" />
                      {property.agent.phone}
                    </a>
                    <a href={`mailto:${property.agent.email}`} className="flex items-center gap-1.5 hover:text-accent-blue">
                      <Mail className="h-3.5 w-3.5 text-accent-blue" />
                      {property.agent.email}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:w-44">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex h-10 items-center justify-center gap-2 rounded-lg bg-navy text-sm font-semibold text-white hover:bg-navy-700"
                  >
                    <Phone className="h-4 w-4" />
                    Contact Agent
                  </a>
                  <a
                    href={`https://wa.me/${property.agent.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="shine shine-light flex h-10 items-center justify-center gap-2 rounded-lg border border-navy text-sm font-semibold text-navy hover:bg-navy hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </section>

            {/* Schedule a visit */}
            <section id="schedule-visit" className="mt-10 scroll-mt-24">
              <h2 className="text-xl font-bold text-navy">Schedule a Property Visit</h2>
              <p className="mt-2 text-sm text-body-text">
                Request a viewing time. Confirmation is subject to agent availability and will be confirmed by our team.
              </p>
              <form
                onSubmit={handleSubmit(submitVisit)}
                className="mt-4 rounded-2xl border border-border bg-white p-5 sm:p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <VisitField label="Full Name" error={errors.name?.message} required>
                    <input {...register("name")} className={visitInputCls(!!errors.name)} placeholder="Jane Doe" />
                  </VisitField>
                  <VisitField label="Email" error={errors.email?.message} required>
                    <input type="email" {...register("email")} className={visitInputCls(!!errors.email)} placeholder="jane@example.com" />
                  </VisitField>
                  <VisitField label="Phone Number" error={errors.phone?.message} required>
                    <input {...register("phone")} className={visitInputCls(!!errors.phone)} placeholder="+1 (415) 555-0123" />
                  </VisitField>
                  <VisitField label="Preferred Date" error={errors.date?.message} required>
                    <input type="date" {...register("date")} className={visitInputCls(!!errors.date)} />
                  </VisitField>
                  <VisitField label="Preferred Time" error={errors.time?.message} required>
                    <input type="time" {...register("time")} className={visitInputCls(!!errors.time)} />
                  </VisitField>
                  <VisitField label="Number of Visitors" error={errors.visitors?.message} required>
                    <select {...register("visitors")} className={visitInputCls(!!errors.visitors)}>
                      <option value="1">1 visitor</option>
                      <option value="2">2 visitors</option>
                      <option value="3">3 visitors</option>
                      <option value="4+">4+ visitors</option>
                    </select>
                  </VisitField>
                </div>
                <VisitField label="Additional Message" error={undefined}>
                  <textarea
                    {...register("message")}
                    rows={3}
                    className={cn(visitInputCls(false), "resize-none")}
                    placeholder="Anything else we should know?"
                  />
                </VisitField>

                {visitStatus === "success" && (
                  <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-none text-green-600" />
                    Your visit request has been received. Our team will confirm availability and contact you shortly.
                  </div>
                )}
                {visitStatus === "error" && (
                  <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    Request could not be sent. Please try again or call the agent directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={visitStatus === "loading"}
                  className="shine mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-navy text-sm font-bold text-white transition hover:bg-navy-700 disabled:opacity-70 sm:w-auto sm:px-8"
                >
                  {visitStatus === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <CalendarDays className="h-4 w-4" />
                      Request Visit
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* FAQ */}
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="mt-4 w-full">
                {property.faqs.map((faq, i) => (
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

            {/* Similar properties */}
            {similar.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-navy">Similar Properties</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  {similar.map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => {
                        onOpenSimilar(p.slug);
                        setTimeout(() => {
                          document.querySelector('[data-modal-scroll]')?.scrollTo({ top: 0, behavior: "smooth" });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }, 100);
                      }}
                      className="group card-modern flex flex-col overflow-hidden rounded-xl border border-border bg-white text-left transition hover:border-accent-blue/40 hover:shadow-soft-lg"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        { }
                        <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute left-2 top-2 rounded-full bg-navy/90 px-2.5 py-0.5 text-xs font-semibold text-white">
                          {p.status}
                        </span>
                      </div>
                      <div className="p-3.5">
                        <p className="line-clamp-1 text-sm font-bold text-navy">{p.title}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-body-text">{p.location}</p>
                        <p className="mt-2 text-sm font-bold text-navy">{p.priceLabel}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Final CTA */}
            <section className="mt-12 overflow-hidden rounded-2xl bg-navy p-8 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Interested in This Property?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-soft-blue/80">
                Contact the agent, schedule a visit, or request more information. We are here to help you make a confident decision.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="shine shine-light inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-navy transition hover:bg-soft-blue"
                >
                  <Phone className="h-4 w-4" />
                  Contact Agent
                </a>
                <button
                  onClick={() => document.getElementById("schedule-visit")?.scrollIntoView({ behavior: "smooth" })}
                  className="shine shine-light inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  <CalendarDays className="h-4 w-4" />
                  Schedule a Visit
                </button>
                <a
                  href={`mailto:${property.agent.email}?subject=More information about ${property.title}`}
                  className="shine shine-light inline-flex h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  <Mail className="h-4 w-4" />
                  Request More Info
                </a>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function visitInputCls(hasError: boolean) {
  return cn(
    "h-11 w-full rounded-lg border bg-white px-3.5 text-sm font-medium text-navy outline-none transition-colors placeholder:text-body-text/50",
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-border focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/15"
  );
}

function VisitField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-navy-700">
        {label}
        {required && <span className="text-accent-blue"> *</span>}
      </span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
