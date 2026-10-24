"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  ArrowRight,
  SlidersHorizontal,
  SearchX,
} from "lucide-react";
import { PROPERTIES } from "@/lib/data";
import { useUIStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type SortOption = "default" | "price-asc" | "price-desc";

export function PropertyGroupGrid({ status }: { status: "For Sale" | "For Rent" }) {
  const openProperty = useUIStore((s) => s.openProperty);

  const all = useMemo(() => PROPERTIES.filter((p) => p.status === status), [status]);
  const types = useMemo(() => Array.from(new Set(all.map((p) => p.type))), [all]);
  const hasBedrooms = useMemo(() => all.some((p) => p.bedrooms > 0), [all]);

  const [type, setType] = useState<string>("All");
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let list = all.filter(
      (p) => (type === "All" || p.type === type) && (bedrooms === 0 || p.bedrooms >= bedrooms)
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [all, type, bedrooms, sort]);

  const pillCls = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition-all",
      active
        ? "bg-navy text-white shadow-md"
        : "border border-border bg-white text-navy-700 hover:border-accent-blue/40 hover:text-accent-blue"
    );

  return (
    <div>
      {/* Filters bar */}
      {all.length > 0 && (
      <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          {/* Type pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-body-text">
              <SlidersHorizontal className="h-3.5 w-3.5 text-accent-blue" />
              Type
            </span>
            <button onClick={() => setType("All")} className={pillCls(type === "All")}>
              All
            </button>
            {types.map((t) => (
              <button key={t} onClick={() => setType(t)} className={pillCls(type === t)}>
                {t}
              </button>
            ))}
          </div>

          <div className="h-px bg-border" />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {/* Bedrooms */}
            {hasBedrooms && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-bold uppercase tracking-wider text-body-text">
                  Bedrooms
                </span>
                <button onClick={() => setBedrooms(0)} className={pillCls(bedrooms === 0)}>
                  Any
                </button>
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setBedrooms(n)}
                    className={pillCls(bedrooms === n)}
                  >
                    {n}+
                  </button>
                ))}
              </div>
            )}

            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-body-text">
                Sort
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-9 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-navy outline-none transition-colors focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/15"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Results count */}
      {all.length > 0 && (
        <p className="mt-5 text-sm font-semibold text-body-text">
          Showing {filtered.length} of {all.length}{" "}
          {filtered.length === 1 ? "property" : "properties"}
          {type !== "All" && ` · ${type}`}
          {bedrooms > 0 && ` · ${bedrooms}+ beds`}
        </p>
      )}

      {/* Grid */}
      <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((property) => (
            <motion.button
              layout
              key={property.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openProperty(property.slug)}
              className="group card-modern flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white text-left transition-all hover:border-accent-blue/40 hover:shadow-soft-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={property.cover}
                  alt={property.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm",
                    property.status === "For Sale"
                      ? "bg-navy/90 text-white"
                      : "bg-accent-blue/90 text-white"
                  )}
                >
                  {property.status}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                  {property.type}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 text-xs font-medium text-body-text">
                  <MapPin className="h-3.5 w-3.5 text-accent-blue" />
                  {property.location}
                </p>
                <h3 className="mt-1.5 text-lg font-bold text-navy">{property.title}</h3>

                {/* Specs */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-body-text">
                  {property.bedrooms > 0 && (
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="h-4 w-4 text-navy-700" />
                      {property.bedrooms} Beds
                    </span>
                  )}
                  {property.bathrooms > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Bath className="h-4 w-4 text-navy-700" />
                      {property.bathrooms} Baths
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Maximize className="h-4 w-4 text-navy-700" />
                    {property.areaLabel ?? `${property.area.toLocaleString()} sqft`}
                  </span>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-body-text">
                      {property.status === "For Rent" ? "Monthly Rent" : "Asking Price"}
                    </p>
                    <p className="text-lg font-bold text-navy">{property.priceLabel}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-soft-blue px-3.5 py-2 text-xs font-semibold text-accent-blue transition-colors group-hover:bg-navy group-hover:text-white">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border bg-white py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-blue text-accent-blue">
            <SearchX className="h-7 w-7" />
          </span>
          <h3 className="mt-4 text-lg font-bold text-navy">
            {all.length === 0 ? "No properties available right now" : "No matching properties"}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-body-text">
            {all.length === 0
              ? "New listings are added regularly — get in touch and we will let you know as soon as something fits your needs."
              : "Try changing the type or bedroom filters to see more listings."}
          </p>
          {all.length > 0 && (
            <button
              onClick={() => {
                setType("All");
                setBedrooms(0);
                setSort("default");
              }}
              className="mt-5 inline-flex h-10 items-center rounded-xl bg-navy px-5 text-sm font-bold text-white transition hover:bg-navy-700"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
