"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT_INFO, SERVICES } from "@/lib/data";
import { DynamicIcon } from "../dynamic-icon";

export function Footer() {
  const realEstate = SERVICES.filter((s) => s.group === "Real Estate").slice(0, 5);
  const construction = SERVICES.filter((s) => s.group === "Construction").slice(0, 5);
  const router = useRouter();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      // Section lives on the home page — navigate there with the hash
      router.push(`/${href}`);
    }
  };

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto w-full px-5 py-8 sm:px-8 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand + social */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-bold tracking-tight">TS Estate &amp; Builders</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-soft-blue/80">
              {CONTACT_INFO.tagline}
            </p>

            {/* Social media icons */}
            <div className="mt-6 flex items-center gap-3">
              {CONTACT_INFO.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-accent-blue/50 hover:bg-accent-blue"
                >
                  <DynamicIcon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterCol title="Quick Links">
            <FooterLink onClick={() => scrollTo("#home")}>Home</FooterLink>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink onClick={() => scrollTo("#properties")}>Properties</FooterLink>
            <FooterLink onClick={() => scrollTo("#projects")}>Construction</FooterLink>
            <FooterLink onClick={() => scrollTo("#projects")}>Projects</FooterLink>
            <FooterLink href="/contact">Contact Us</FooterLink>
          </FooterCol>

          {/* Real Estate Services */}
          <FooterCol title="Real Estate">
            {realEstate.map((s) => (
              <FooterLink key={s.slug}>{s.title}</FooterLink>
            ))}
          </FooterCol>

          {/* Construction Services */}
          <FooterCol title="Construction">
            {construction.map((s) => (
              <FooterLink key={s.slug}>{s.title}</FooterLink>
            ))}
          </FooterCol>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact Details
            </h4>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-soft-blue/80 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 flex-none text-accent-blue" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2.5 break-all text-sm text-soft-blue/80 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-none text-accent-blue" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-soft-blue/80">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent-blue" />
                {CONTACT_INFO.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-4 px-5 py-4 sm:flex-row sm:px-8 lg:px-12">
          <p className="text-xs text-soft-blue/60">
            © {new Date().getFullYear()} {CONTACT_INFO.company}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="text-xs text-soft-blue/70 transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-xs text-soft-blue/70 transition hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const cls =
    "group flex items-center gap-1.5 text-sm text-soft-blue/80 transition hover:text-white";
  const line = (
    <span className="h-px w-0 bg-accent-blue transition-all duration-200 group-hover:w-3" />
  );
  return (
    <li>
      {href ? (
        <Link href={href} className={cls}>
          {line}
          {children}
        </Link>
      ) : (
        <button onClick={onClick} className={cls}>
          {line}
          {children}
        </button>
      )}
    </li>
  );
}
