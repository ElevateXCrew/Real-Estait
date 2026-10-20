"use client";

import dynamic from "next/dynamic";

const PropertyModal = dynamic(() => import("./property-modal").then((m) => m.PropertyModal), { ssr: false });
const ServiceModal = dynamic(() => import("./service-modal").then((m) => m.ServiceModal), { ssr: false });
const ProjectModal = dynamic(() => import("./project-modal").then((m) => m.ProjectModal), { ssr: false });
const Lightbox = dynamic(() => import("./lightbox").then((m) => m.Lightbox), { ssr: false });

export function ModalOverlays() {
  return (
    <>
      <PropertyModal />
      <ServiceModal />
      <ProjectModal />
      <Lightbox />
    </>
  );
}
