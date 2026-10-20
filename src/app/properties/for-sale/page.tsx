import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { PropertyGroupGrid } from "@/components/site/property-group-grid";
import { PropertyModal } from "@/components/site/property-modal";
import { Container, Reveal, SectionHeading } from "@/components/site/ui-helpers";

export const metadata: Metadata = {
  title: "Properties For Sale — TS Estate & Builders",
  description:
    "Browse verified properties for sale — villas, houses, penthouses, and commercial spaces with accurate specs and documented quality.",
};

export default function PropertiesForSalePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <PageHero
          title="Properties For Sale"
          breadcrumb="Properties"
          image="/hero-back-4.png"
          description="Verified listings with accurate specs, legal status, and current condition — click any property to see full details, gallery, and floor plan."
        />

        <section className="bg-light-bg py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Browse Listings"
                title="Own your next property."
                description="Every listing is field-checked before publishing and ready for viewing by appointment."
              />
            </Reveal>
            <div className="mt-10">
              <PropertyGroupGrid status="For Sale" />
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-white pb-16 pt-8 sm:pb-20 sm:pt-10">
          <Container>
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-navy px-7 py-12 text-center sm:px-12 sm:py-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Found something you like?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-soft-blue/80">
                  Schedule a viewing or request more information — our advisors will
                  confirm availability and answer every question within one business day.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="shine inline-flex h-11 items-center gap-2 rounded-xl bg-accent-blue px-6 text-sm font-bold text-white transition hover:brightness-110 hover:shadow-glow"
                  >
                    Talk to an Advisor
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/properties/for-rent"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Properties For Rent
                  </Link>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
      <PropertyModal />
    </div>
  );
}
