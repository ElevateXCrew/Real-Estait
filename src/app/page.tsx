"use client";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Services } from "@/components/site/services";
import { FeaturedProperties } from "@/components/site/featured-properties";
import { Projects } from "@/components/site/projects";
import { WhyChoose } from "@/components/site/why-choose";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { PropertyModal } from "@/components/site/property-modal";
import { ServiceModal } from "@/components/site/service-modal";
import { ProjectModal } from "@/components/site/project-modal";
import { Lightbox } from "@/components/site/lightbox";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <FeaturedProperties />
        <CTA />
        <Services />
        <WhyChoose />
        <Projects />
      </main>
      <Footer />

      {/* Overlays */}
      <PropertyModal />
      <ServiceModal />
      <ProjectModal />
      <Lightbox />
    </div>
  );
}
