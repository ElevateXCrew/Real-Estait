"use client";

import { create } from "zustand";

interface UIState {
  // Modals
  propertySlug: string | null;
  serviceSlug: string | null;
  projectSlug: string | null;
  // Mobile nav
  mobileNavOpen: boolean;
  // Lightbox
  lightboxImages: string[] | null;
  lightboxIndex: number;
  // Actions
  openProperty: (slug: string) => void;
  closeProperty: () => void;
  openService: (slug: string) => void;
  closeService: () => void;
  openProject: (slug: string) => void;
  closeProject: () => void;
  setMobileNav: (open: boolean) => void;
  openLightbox: (images: string[], index?: number) => void;
  closeLightbox: () => void;
  setLightboxIndex: (index: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  propertySlug: null,
  serviceSlug: null,
  projectSlug: null,
  mobileNavOpen: false,
  lightboxImages: null,
  lightboxIndex: 0,
  openProperty: (slug) => {
    set({ propertySlug: slug });
    document.body.style.overflow = "hidden";
  },
  closeProperty: () => {
    set({ propertySlug: null });
    if (!useUIStore.getState().serviceSlug && !useUIStore.getState().projectSlug)
      document.body.style.overflow = "";
  },
  openService: (slug) => {
    set({ serviceSlug: slug });
    document.body.style.overflow = "hidden";
  },
  closeService: () => {
    set({ serviceSlug: null });
    if (!useUIStore.getState().propertySlug && !useUIStore.getState().projectSlug)
      document.body.style.overflow = "";
  },
  openProject: (slug) => {
    set({ projectSlug: slug });
    document.body.style.overflow = "hidden";
  },
  closeProject: () => {
    set({ projectSlug: null });
    if (!useUIStore.getState().propertySlug && !useUIStore.getState().serviceSlug)
      document.body.style.overflow = "";
  },
  setMobileNav: (open) => set({ mobileNavOpen: open }),
  openLightbox: (images, index = 0) =>
    set({ lightboxImages: images, lightboxIndex: index }),
  closeLightbox: () => set({ lightboxImages: null }),
  setLightboxIndex: (index) => set({ lightboxIndex: index }),
}));
