import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Eye,
  Handshake,
  Home,
  Target,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import {
  AnimatedCounter,
  Container,
  Reveal,
  SectionHeading,
} from "@/components/site/ui-helpers";
import { CONTACT_INFO, SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us — TS Estate & Builders",
  description:
    "Learn about TS Estate & Builders — 18+ years in real estate, construction, architecture, and property development across 24 cities.",
};

const HIGHLIGHTS = [
  "Integrated real estate, construction, and property management",
  "Architect-led design with disciplined project delivery",
  "Transparent pricing and regular progress communication",
  "Verified listings and documented construction quality",
];

const MISSION =
  "To make property and construction simple, transparent, and dependable — helping families and investors make confident decisions with a single accountable team.";
const VISION =
  "To be the most trusted name in integrated real estate and construction, known for quality that lasts and relationships that endure.";

const VALUES = [
  {
    title: "Integrity",
    description:
      "Honest advice, fair pricing, and no hidden terms — we recommend what we would choose ourselves.",
    icon: Handshake,
  },
  {
    title: "Quality",
    description:
      "Premium materials, certified contractors, and rigorous inspection at every milestone.",
    icon: Target,
  },
  {
    title: "Transparency",
    description:
      "Documented costs, clear timelines, and regular progress reports throughout the engagement.",
    icon: Eye,
  },
  {
    title: "Client Focus",
    description:
      "A single point of contact who knows your project from day one through long after handover.",
    icon: Users,
  },
];


export default function AboutPage() {
  const realEstate = SERVICES.filter((s) => s.group === "Real Estate");
  const construction = SERVICES.filter((s) => s.group === "Construction");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Page header */}
        <PageHero
          title="About Us"
          breadcrumb="About"
          image="/about.png"
          description="Real estate, construction, architecture, and property development — under one trusted roof. One accountable team for buying, building, and everything in between."
        />

        {/* Our story */}
        <section className="bg-white py-14 sm:py-16">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal className="relative">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/about.png"
                    alt="Premium architecture by TS Estate & Builders"
                    className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <SectionHeading
                  eyebrow="Our Story"
                  title="One roof for everything property and construction."
                  align="left"
                />
                <div className="mt-6 space-y-4 text-base leading-relaxed text-body-text">
                  <p>
                    Founded in {new Date().getFullYear() - 18} as a boutique property
                    advisory, {CONTACT_INFO.company} has grown into a full-service real
                    estate and construction company — without losing the personal,
                    accountable way we work.
                  </p>
                  <p>
                    Our real estate practice covers buying, selling, rentals,
                    management, and investment consulting. Our construction practice
                    spans residential and commercial builds, architecture, interior
                    design, renovation, civil engineering, and turnkey delivery.
                  </p>
                </div>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {HIGHLIGHTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-medium text-main-text">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Mission & Vision */}
        <section className="bg-light-bg py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Mission & Vision"
                title="What drives us every day."
                description="Clear purpose, shared across every agent, architect, and site engineer on our team."
              />
            </Reveal>
            <div className="mx-auto mt-10 grid max-w-4xl gap-10 sm:grid-cols-2">
              <Reveal>
                <div className="h-full sm:pr-10">
                  <h3 className="text-xl font-bold text-navy sm:text-2xl">
                    Our Mission
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-body-text">
                    {MISSION}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="h-full border-border sm:border-l-4 sm:pl-10">
                  <h3 className="text-xl font-bold text-navy sm:text-2xl">
                    Our Vision
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-body-text">
                    {VISION}
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="bg-white py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Our Values"
                title="Principles we never compromise on."
              />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value, i) => (
                <Reveal key={value.title} delay={i * 0.06}>
                  <div className="card-modern h-full rounded-2xl border border-border bg-white p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft-blue text-accent-blue">
                      <value.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body-text">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* What we do */}
        <section className="bg-white py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="What We Do"
                title="Two practices. One accountable team."
                description="Whether it is finding the right property or building the right structure, the same standards apply."
              />
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Reveal delay={0.05}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-navy p-7 text-white sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/20 text-accent-blue">
                    <Home className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold sm:text-2xl">
                    Real Estate
                  </h3>
                  <ul className="mt-4 grid flex-1 gap-2.5 sm:grid-cols-2">
                    {realEstate.map((s) => (
                      <li
                        key={s.slug}
                        className="flex items-start gap-2 text-sm text-soft-blue/80"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 flex-none text-accent-blue"
                          strokeWidth={3}
                        />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services/real-estate"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent-blue transition hover:gap-3"
                  >
                    Explore real estate services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-navy p-7 text-white sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/20 text-accent-blue">
                    <Building2 className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold sm:text-2xl">
                    Construction &amp; Design
                  </h3>
                  <ul className="mt-4 grid flex-1 gap-2.5 sm:grid-cols-2">
                    {construction.map((s) => (
                      <li
                        key={s.slug}
                        className="flex items-start gap-2 text-sm text-soft-blue/80"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 flex-none text-accent-blue"
                          strokeWidth={3}
                        />
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services/construction"
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent-blue transition hover:gap-3"
                  >
                    Explore construction services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-light-bg pb-16 pt-8 sm:pb-20 sm:pt-10">
          <Container>
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-navy px-7 py-12 text-center sm:px-12 sm:py-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Let&apos;s build something great together.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-soft-blue/80">
                  Tell us about your property goal or construction vision — we will
                  put the right team on it and respond within one business day.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/#contact"
                    className="shine inline-flex h-11 items-center gap-2 rounded-xl bg-accent-blue px-6 text-sm font-bold text-white transition hover:brightness-110 hover:shadow-glow"
                  >
                    Get a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
