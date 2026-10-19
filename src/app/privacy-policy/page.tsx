import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Container, Reveal } from "@/components/site/ui-helpers";
import { CONTACT_INFO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy — TS Estate & Builders",
  description:
    "Privacy Policy for TS Estate & Builders — how we collect, use, and protect your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: [
      "When you use our website or contact us, we may collect personal information such as your name, email address, phone number, mailing address, and any details you share through contact forms, property inquiries, newsletter subscriptions, or visit bookings.",
      "We may also automatically collect non-personal information such as your IP address, browser type, device information, pages visited, and time spent on our website through cookies and similar technologies.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "We use the information we collect to respond to your inquiries, schedule property visits and consultations, provide requested services, send newsletters or marketing communications (with your consent), improve our website and services, and comply with legal obligations.",
      "We do not sell, rent, or trade your personal information to third parties for their marketing purposes.",
    ],
  },
  {
    title: "3. Cookies & Tracking",
    body: [
      "Our website uses cookies to remember your preferences, understand how visitors interact with the site, and enhance your browsing experience. You can control cookies through your browser settings; disabling cookies may affect some website functionality.",
    ],
  },
  {
    title: "4. Information Sharing",
    body: [
      "We may share your information with trusted service providers who assist us in operating our website and delivering services (for example, email or hosting providers), when required by law or legal process, or with your explicit consent.",
    ],
  },
  {
    title: "5. Data Security",
    body: [
      "We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "You have the right to access, correct, or delete the personal information we hold about you, and to opt out of marketing communications at any time. To exercise these rights, contact us using the details below.",
    ],
  },
  {
    title: "7. Third-Party Links",
    body: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    title: "8. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of the website after changes constitutes acceptance of the revised policy.",
    ],
  },
  {
    title: "9. Contact Us",
    body: [
      `If you have questions about this Privacy Policy, contact us at ${CONTACT_INFO.email} or ${CONTACT_INFO.phone}, or visit us at ${CONTACT_INFO.address}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
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
                <ShieldCheck className="h-7 w-7" />
              </span>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  Privacy Policy
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
                    {CONTACT_INFO.company} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
                    committed to protecting your privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when you visit our
                    website and use our services.
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
                          {para}
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
