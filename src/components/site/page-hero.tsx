import Link from "next/link";
import { Container } from "./ui-helpers";

export function PageHero({
  title,
  description,
  breadcrumb,
  image,
}: {
  title: string;
  description?: string;
  breadcrumb: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/* Background photo */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Navy overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy/85" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/95"
      />

      <Container className="relative flex min-h-[170px] flex-col items-center justify-center px-5 pb-8 pt-20 text-center sm:min-h-[195px] sm:pb-10 sm:pt-24 lg:pb-12 lg:pt-28">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold">
          <Link href="/" className="text-white/85 transition hover:text-white">
            Home
          </Link>
          <span className="text-white/35">/</span>
          <span className="text-accent-blue">{breadcrumb}</span>
        </nav>

        <h1 className="mt-5 text-4xl font-normal leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-soft-blue/85 sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
