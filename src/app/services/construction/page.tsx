import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { ServiceGroupGrid } from "@/components/site/service-group-grid";
import { ServiceModal } from "@/components/site/service-modal";
import { Container, Reveal, SectionHeading } from "@/components/site/ui-helpers";

export const metadata: Metadata = {
  title: "Construction Services — TS Estate & Builders",
  description:
    "Residential and commercial construction, architecture, interiors, renovation, civil engineering, and turnkey delivery — quality builds with disciplined project management.",
};

export default function ConstructionServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <PageHero
          title="Construction Services"
          breadcrumb="Services"
          image="/cta-image.png"
          description="Architecture, construction, interiors, renovation, and turnkey delivery — premium materials, certified contractors, and disciplined schedules."
        />

        <section className="bg-light-bg py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="What We Build"
                title="From first sketch to final handover."
                description="Click any service to see its full scope, benefits, and process."
              />
            </Reveal>
            <div className="mt-10">
              <ServiceGroupGrid group="Construction" />
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-white pb-16 pt-8 sm:pb-20 sm:pt-10">
          <Container>
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-navy px-7 py-12 text-center sm:px-12 sm:py-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to break ground?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-soft-blue/80">
                  Share your site, scope, and timeline — we will put the right
                  architects and engineers on it and respond within one business day.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="shine inline-flex h-11 items-center gap-2 rounded-xl bg-accent-blue px-6 text-sm font-bold text-white transition hover:brightness-110 hover:shadow-glow"
                  >
                    Get a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services/real-estate"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Real Estate Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
      <ServiceModal />
    </div>
  );
}
