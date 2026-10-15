"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useUIStore } from "@/lib/store";

export function Lightbox() {
  const { lightboxImages, lightboxIndex, closeLightbox, setLightboxIndex } =
    useUIStore();
  const images = lightboxImages ?? [];

  const next = useCallback(() => {
    if (!images.length) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [images.length, lightboxIndex, setLightboxIndex]);

  const prev = useCallback(() => {
    if (!images.length) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [images.length, lightboxIndex, setLightboxIndex]);

  useEffect(() => {
    if (!images.length) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, closeLightbox, next, prev]);

  return (
    <AnimatePresence>
      {images.length > 0 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <button
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <motion.div
            key={lightboxIndex}
            className="relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            { }
            <img
              src={images[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1} of ${images.length}`}
              className="max-h-[88vh] max-w-[92vw] object-contain"
            />
          </motion.div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
            {lightboxIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
