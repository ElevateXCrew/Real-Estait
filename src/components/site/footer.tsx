"use client";

import { useState } from "react";
import { Building2, Send, Check, Phone, Mail, MapPin } from "lucide-react";
import { Container } from "./ui-helpers";
import { CONTACT_INFO, SERVICES } from "@/lib/data";
import { DynamicIcon } from "../dynamic-icon";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const realEstate = SERVICES.filter((s) => s.group === "Real Estate").slice(0, 5);
  const construction = SERVICES.filter((s) => s.group === "Construction").slice(0, 5);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-navy text-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-navy">
                <Building2 className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold tracking-tight">Meridian</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-soft-blue/80">
              {CONTACT_INFO.tagline}
            </p>

            {/* Newsletter */}
            <form onSubmit={subscribe} className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-wider text-soft-blue/70">
                Newsletter
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 p-1.5 focus-within:border-accent-blue">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="h-9 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-soft-blue/50"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shine flex h-9 w-9 flex-none items-center justify-center rounded-md bg-accent-blue text-white transition hover:bg-accent-blue/80"
                >
                  {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-accent-blue">Thanks — you are subscribed.</p>
              )}
            </form>
          </div>

          {/* Quick Links */}
          <FooterCol title="Quick Links">
            <FooterLink onClick={() => scrollTo("#home")}>Home</FooterLink>
            <FooterLink onClick={() => scrollTo("#about")}>About Us</FooterLink>
            <FooterLink onClick={() => scrollTo("#properties")}>Properties</FooterLink>
            <FooterLink onClick={() => scrollTo("#projects")}>Construction</FooterLink>
            <FooterLink onClick={() => scrollTo("#projects")}>Projects</FooterLink>
            <FooterLink onClick={() => scrollTo("#contact")}>Contact Us</FooterLink>
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
        </div>

        {/* Contact bar */}
        <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-2.5 text-sm text-soft-blue/80">
            <Phone className="h-4 w-4 text-accent-blue" />
            {CONTACT_INFO.phone}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-soft-blue/80">
            <Mail className="h-4 w-4 text-accent-blue" />
            {CONTACT_INFO.email}
          </div>
          <div className="flex items-start gap-2.5 text-sm text-soft-blue/80">
            <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent-blue" />
            {CONTACT_INFO.address}
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-soft-blue/60">
            © {new Date().getFullYear()} {CONTACT_INFO.company}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button className="text-xs text-soft-blue/70 transition hover:text-white">Privacy Policy</button>
            <button className="text-xs text-soft-blue/70 transition hover:text-white">Terms &amp; Conditions</button>
            <div className="flex gap-2.5">
              {CONTACT_INFO.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-accent-blue"
                >
                  <DynamicIcon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-soft-blue/70">{title}</h4>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex items-center gap-1.5 text-sm text-soft-blue/80 transition hover:text-white"
      >
        <span className="h-px w-0 bg-accent-blue transition-all duration-200 group-hover:w-3" />
        {children}
      </button>
    </li>
  );
}
