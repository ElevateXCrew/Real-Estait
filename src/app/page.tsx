import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Services } from "@/components/site/services";
import { FeaturedProperties } from "@/components/site/featured-properties";
import { Projects } from "@/components/site/projects";
import { WhyChoose } from "@/components/site/why-choose";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { ModalOverlays } from "@/components/site/modal-overlays";

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
      <ModalOverlays />
    </div>
  );
}
