import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Contact } from "@/components/site/contact";
import { Container, Reveal, SectionHeading } from "@/components/site/ui-helpers";
import { CONTACT_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us — TS Estate & Builders",
  description:
    "Get in touch with TS Estate & Builders — request a consultation for property buying, selling, construction, or renovation. We respond within one business day.",
};

const QUICK_CONTACTS = [
  {
    icon: Phone,
    label: "Call Us",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`,
    note: "Mon – Sat, 9 AM – 7 PM",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    note: "Replies within one business day",
  },
  {
    icon: MapPin,
    label: "Visit Our Office",
    value: CONTACT_INFO.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`,
    note: "Appointments recommended",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: CONTACT_INFO.hours,
    note: "Closed on Sundays and public holidays",
  },
];

const STEPS = [
  {
    number: "01",
    title: "You Submit",
    description:
      "Share your goals, budget, and timeline through the form — every inquiry reaches our team instantly.",
  },
  {
    number: "02",
    title: "We Review",
    description:
      "A specialist reviews your requirements personally — you get considered advice, not a generic reply.",
  },
  {
    number: "03",
    title: "We Respond",
    description:
      "Expect a personal response within one business day, by whichever method you prefer — email, phone, WhatsApp, or in person.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-navy pb-16 pt-32 lg:pb-20 lg:pt-40">
          <Container>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-soft-blue/80 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-soft-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                  Contact Us
                </span>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Let&apos;s talk about your{" "}
                  <span className="text-gradient-light">property goals</span>.
                </h1>
                <p className="mt-5 text-base leading-relaxed text-soft-blue/80 sm:text-lg">
                  Buying, selling, building, or renovating — tell us what you have in
                  mind and the right specialist will get back to you within one
                  business day.
                </p>
              </div>
              <div className="flex flex-none flex-wrap gap-3">
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
                  className="shine inline-flex h-11 items-center gap-2 rounded-xl bg-accent-blue px-6 text-sm font-bold text-white transition hover:brightness-110 hover:shadow-glow"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT_INFO.phone}
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Quick contact cards */}
        <section className="border-b border-border bg-light-bg py-8 sm:py-10">
          <Container>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_CONTACTS.map((item, i) => {
                const inner = (
                  <div className="card-modern flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-5">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-soft-blue text-accent-blue">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-body-text">
                        {item.label}
                      </p>
                      <p className="mt-1 break-words text-sm font-bold text-navy">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-body-text/80">{item.note}</p>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={item.label} delay={i * 0.05} className="h-full">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className="block h-full transition hover:-translate-y-0.5"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Form + company info (shared component, same as home page) */}
        <Contact />

        {/* What to expect */}
        <section className="bg-white py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="What To Expect"
                title="Simple, fast, and personal."
                description="No call centers, no automated replies — your inquiry is handled by a specialist from our team."
              />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.07}>
                  <div className="card-modern h-full rounded-2xl border border-border bg-white p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-sm font-extrabold text-white">
                        {step.number}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-accent-blue/40 to-transparent" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body-text">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-light-bg p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent-blue/15 text-accent-blue">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">
                      Prefer to see us in person?
                    </p>
                    <p className="mt-1 text-sm text-body-text">
                      {CONTACT_INFO.address} — {CONTACT_INFO.hours}
                    </p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex flex-none items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-bold text-navy transition hover:border-accent-blue/40 hover:text-accent-blue"
                >
                  Get Directions
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
