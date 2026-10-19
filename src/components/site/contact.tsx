"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Container, Reveal, SectionHeading } from "./ui-helpers";
import { CONTACT_INFO } from "@/lib/data";
import { DynamicIcon } from "../dynamic-icon";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  contactMethod: z.string().min(1, "Please select a preferred contact method"),
  message: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
  "Buy a Property",
  "Sell a Property",
  "Rent a Property",
  "Property Management",
  "Residential Construction",
  "Commercial Construction",
  "Renovation",
  "Architecture & Design",
  "Project Management",
  "General Inquiry",
];
const PROJECT_TYPES = ["Residential", "Commercial", "Renovation", "Land / Plot", "Not sure yet"];
const BUDGETS = ["Under $100k", "$100k – $500k", "$500k – $1M", "$1M – $5M", "$5M+", "Prefer to discuss"];
const CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "In-person meeting"];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      projectType: "",
      budget: "",
      contactMethod: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-light-bg py-8 sm:py-12">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Request a Consultation"
            description="Tell us about your property goals or construction plans. We will respond within one business day."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-border bg-white p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.fullName?.message} required>
                  <input
                    {...register("fullName")}
                    className={inputCls(!!errors.fullName)}
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email Address" error={errors.email?.message} required>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputCls(!!errors.email)}
                    placeholder="jane@example.com"
                  />
                </Field>
                <Field label="Phone Number" error={errors.phone?.message} required>
                  <input
                    {...register("phone")}
                    className={inputCls(!!errors.phone)}
                    placeholder="+1 (415) 555-0123"
                  />
                </Field>
                <Field label="Service Required" error={errors.service?.message} required>
                  <select {...register("service")} className={inputCls(!!errors.service)}>
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Property or Project Type" error={errors.projectType?.message} required>
                  <select {...register("projectType")} className={inputCls(!!errors.projectType)}>
                    <option value="">Select a type</option>
                    {PROJECT_TYPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Budget Range" error={errors.budget?.message} required>
                  <select {...register("budget")} className={inputCls(!!errors.budget)}>
                    <option value="">Select a range</option>
                    {BUDGETS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred Contact Method" error={errors.contactMethod?.message} required>
                  <select {...register("contactMethod")} className={inputCls(!!errors.contactMethod)}>
                    <option value="">Select a method</option>
                    {CONTACT_METHODS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Message / Project Requirements" error={errors.message?.message} required>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={cn(inputCls(!!errors.message), "resize-none")}
                    placeholder="Tell us about your property goals, timeline, or project scope..."
                  />
                </Field>
              </div>

              {/* Status */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 flex items-start gap-2.5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-none text-green-600" />
                    <span>Thank you — your inquiry has been received. Our team will contact you within one business day.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4.5 w-4.5 flex-none text-red-600" />
                    <span>Something went wrong sending your inquiry. Please try again or contact us directly by phone or email.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === "loading"}
                className="shine group mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-bold text-white transition-all hover:bg-navy-700 hover:shadow-glow disabled:opacity-70 sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </Reveal>

          {/* Company info */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-700 p-6 text-white shadow-soft-lg sm:p-8">
              {/* Decorative glows */}
              <span aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-blue/25 blur-[70px]" />
              <span aria-hidden className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-accent-blue/15 blur-[70px]" />
              {/* Top accent line */}
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-blue via-accent-blue/60 to-transparent" />

              <div className="relative">
                <h3 className="text-2xl font-extrabold tracking-tight">{CONTACT_INFO.company}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-soft-blue/80">
                  {CONTACT_INFO.tagline}
                </p>
              </div>

              <div className="relative mt-6 space-y-3 border-t border-white/10 pt-6">
                <InfoRow icon="Phone" label="Phone" value={CONTACT_INFO.phone} href={`tel:${CONTACT_INFO.phone}`} />
                <InfoRow icon="Mail" label="Email" value={CONTACT_INFO.email} href={`mailto:${CONTACT_INFO.email}`} />
                <InfoRow icon="MapPin" label="Office" value={CONTACT_INFO.address} />
                <InfoRow icon="Clock" label="Hours" value={CONTACT_INFO.hours} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "h-11 w-full rounded-xl border bg-white px-3.5 text-sm font-medium text-navy outline-none transition-all placeholder:text-body-text/50",
    hasError
      ? "border-red-300 focus:border-red-400"
      : "border-border focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/15"
  );
}

function Field({
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

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all hover:border-accent-blue/40 hover:bg-white/10">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent-blue/20 text-accent-blue">
        <DynamicIcon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[0.68rem] font-bold uppercase tracking-wider text-soft-blue/60">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium leading-snug text-white/90">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition hover:-translate-y-0.5">
      {content}
    </a>
  ) : (
    content
  );
}
