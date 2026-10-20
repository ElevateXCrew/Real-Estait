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
  title: "Properties For Rent — TS Estate & Builders",
  description:
    "Browse quality rental properties — fully furnished apartments and family homes with full screening and tenancy support.",
};

export default function PropertiesForRentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <PageHero
          title="Properties For Rent"
          breadcrumb="Properties"
          image="/hero-back-6.png"
          description="Quality rental homes and apartments — thoroughly screened listings, fair pricing, and support throughout your tenancy."
        />

        <section className="bg-light-bg py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Browse Listings"
                title="Find a place to call home."
                description="Every rental listing is field-checked and ready for viewing by appointment."
              />
            </Reveal>
            <div className="mt-10">
              <PropertyGroupGrid status="For Rent" />
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-white pb-16 pt-8 sm:pb-20 sm:pt-10">
          <Container>
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-navy px-7 py-12 text-center sm:px-12 sm:py-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to move in?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-soft-blue/80">
                  Request a viewing or ask about lease terms — our leasing specialists
                  will get back to you within one business day.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="shine inline-flex h-11 items-center gap-2 rounded-xl bg-accent-blue px-6 text-sm font-bold text-white transition hover:brightness-110 hover:shadow-glow"
                  >
                    Talk to a Specialist
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/properties/for-sale"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Properties For Sale
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
