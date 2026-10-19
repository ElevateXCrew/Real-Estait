import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Container, Reveal } from "@/components/site/ui-helpers";
import { CONTACT_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions — TS Estate & Builders",
  description:
    "Terms and Conditions for TS Estate & Builders — rules and guidelines for using our website and services.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using the {COMPANY} website and services, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website or services.",
    ],
  },
  {
    title: "2. Services",
    body: [
      "We provide real estate brokerage, property sales and rental services, property management, construction, architecture, renovation, and related consulting services. Information on our website — including property listings, prices, and availability — is for general guidance and may change without notice.",
      "All property listings are subject to verification, and final terms are governed by individual written agreements between the parties involved.",
    ],
  },
  {
    title: "3. Use of the Website",
    body: [
      "You agree to use our website only for lawful purposes. You must not use the site to transmit harmful, fraudulent, or illegal content, interfere with the website's operation, attempt unauthorized access, or collect personal information of other users without consent.",
    ],
  },
  {
    title: "4. Listings & Information",
    body: [
      "While we strive to keep property information accurate and current, we do not warrant that listings, descriptions, images, or other content are complete, accurate, or error-free. Dimensions, features, pricing, and availability should be independently verified before any purchase or rental decision.",
    ],
  },
  {
    title: "5. Intellectual Property",
    body: [
      "All content on this website — including text, logos, graphics, images, and software — is the property of {COMPANY} or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written permission.",
    ],
  },
  {
    title: "6. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, {COMPANY} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or services. Our total liability for any claim related to our services shall not exceed the fees paid for the specific service in question.",
    ],
  },
  {
    title: "7. Governing Law",
    body: [
      "These Terms & Conditions shall be governed by and construed in accordance with applicable local laws. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the competent courts in our operating region.",
    ],
  },
  {
    title: "8. Changes to Terms",
    body: [
      "We reserve the right to modify these Terms & Conditions at any time. Updates will be posted on this page with a revised effective date. Continued use of the website after changes constitutes acceptance of the new terms.",
    ],
  },
  {
    title: "9. Contact",
    body: [
      "If you have questions about these Terms & Conditions, contact us at {EMAIL} or {PHONE}.",
    ],
  },
];

export default function TermsAndConditionsPage() {
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
            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-accent-blue/20 text-accent-blue">
                <FileText className="h-7 w-7" />
              </span>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Terms &amp; Conditions
                </h1>
                <p className="mt-2 text-sm text-soft-blue/70">
                  Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Content */}
        <section className="bg-light-bg py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-5xl space-y-10">
              <Reveal>
                <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                  <p className="text-base leading-relaxed text-body-text">
                    Welcome to {CONTACT_INFO.company}. These Terms &amp; Conditions govern your
                    use of our website and services. Please read them carefully before using
                    our website or engaging our services.
                  </p>
                </div>
              </Reveal>

              {SECTIONS.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.03}>
                  <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-navy sm:text-2xl">{section.title}</h2>
                    <div className="mt-4 space-y-3">
                      {section.body.map((para) => (
                        <p key={para} className="text-base leading-relaxed text-body-text">
                          {para
                            .replaceAll("{COMPANY}", CONTACT_INFO.company)
                            .replaceAll("{EMAIL}", CONTACT_INFO.email)
                            .replaceAll("{PHONE}", CONTACT_INFO.phone)}
                        </p>
                      ))}
                    </div>
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
