import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";
import { Contact } from "@/components/site/contact";
import { Container, Reveal, SectionHeading } from "@/components/site/ui-helpers";
import { CONTACT_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us — TS Estate & Builders",
  description:
    "Get in touch with TS Estate & Builders — request a consultation for property buying, selling, construction, or renovation. We respond within one business day.",
};

const MAPS_LINK =
  "https://www.google.com/maps/search/TS%20Estate%20and%20Builders/@33.49112319946289,73.07272338867188,17z?hl=en";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=33.49112319946289,73.07272338867188&z=17&hl=en&output=embed";

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
        <PageHero
          title="Contact Us"
          breadcrumb="Contact"
          image="/cta-image.webp"
          description="Buying, selling, building, or renovating — tell us what you have in mind and the right specialist will get back to you within one business day."
        />

        {/* Form + company info (shared component, same as home page) */}
        <Contact />

        {/* Office location map */}
        <section className="bg-light-bg py-14 sm:py-16">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Our Office"
                title="Find us on the map."
                description="Visit our head office — walk-ins welcome during business hours, appointments recommended."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-soft-lg">
                <iframe
                  src={MAPS_EMBED}
                  title="TS Estate & Builders office location on Google Maps"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[340px] w-full border-0 sm:h-[420px] lg:h-[480px]"
                />

                {/* Floating info card */}
                <div className="absolute left-4 top-4 max-w-[300px] rounded-xl border border-border bg-white p-4 shadow-soft-lg sm:left-6 sm:top-6 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-soft-blue text-accent-blue">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-navy">
                        {CONTACT_INFO.company}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-body-text">
                        {CONTACT_INFO.address}
                      </p>
                      <p className="mt-1.5 text-xs text-body-text/80">
                        {CONTACT_INFO.hours}
                      </p>
                    </div>
                  </div>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3.5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-accent-blue text-xs font-bold text-white transition hover:brightness-110"
                  >
                    Open in Maps
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

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
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
