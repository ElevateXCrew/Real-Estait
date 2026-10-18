"use client";

import { WHY_CHOOSE } from "@/lib/data";
import { Container, Reveal, Stagger, StaggerItem } from "./ui-helpers";
import { DynamicIcon } from "../dynamic-icon";

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-0">
          {/* Left: heading with decorative frame */}
          <Reveal className="relative z-10 px-2 py-16 lg:py-36">
            <div className="relative max-w-sm">
              {/* Decorative bracket frame */}
              <span
                aria-hidden
                className="absolute -left-5 -top-10 h-36 w-36 border-l-4 border-t-4 border-accent-blue/30 sm:-left-8 sm:h-44 sm:w-44"
              />
              <span
                aria-hidden
                className="absolute -bottom-10 -right-5 h-36 w-36 border-b-4 border-r-4 border-accent-blue/30 sm:-right-8 sm:h-44 sm:w-44"
              />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-blue">
                Why TS Estate
              </p>
              <h2 className="mt-3 text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-navy sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]">
                Why
                <br />
                Choose
                <br />
                Us?
              </h2>
            </div>
          </Reveal>

          {/* Right: navy panel with diagonal edge + list */}
          <div className="relative">
            {/* Diagonal navy background (desktop) — extends to viewport right edge */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-screen bg-navy lg:block lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0%_100%)]"
            />
            {/* Solid navy background (mobile) — extends to viewport edges */}
            <div aria-hidden className="absolute inset-y-0 left-0 w-screen bg-navy lg:hidden" />

            <Stagger
              className="relative space-y-3 px-6 py-4 sm:px-10 lg:py-5 lg:pl-52 lg:pr-10"
              stagger={0.08}
            >
              {WHY_CHOOSE.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Circular ring icon */}
                    <span className="relative mt-0.5 flex h-12 w-12 flex-none items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-white shadow-[0_8px_24px_rgba(11,31,58,0.35)]" />
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full border-[3px] border-accent-blue border-r-transparent border-b-transparent"
                      />
                      <DynamicIcon
                        name={item.icon}
                        className="relative h-5 w-5 text-navy"
                      />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-soft-blue/85">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
