import type { LucideIcon } from "lucide-react";

export type ListingStatus = "For Sale" | "For Rent";
export type PropertyType =
  | "Villa"
  | "Apartment"
  | "Flat"
  | "House"
  | "Farm House"
  | "Penthouse"
  | "Townhouse"
  | "Office"
  | "Commercial";
export type PropertyCategory = "Residential" | "Commercial";

export interface PropertyHighlight {
  label: string;
  value: string;
  icon: string; // lucide icon name
}

export interface PropertyAmenity {
  name: string;
  icon: string;
}

export interface Property {
  slug: string;
  title: string;
  location: string;
  city: string;
  status: ListingStatus;
  category: PropertyCategory;
  type: PropertyType;
  price: number;
  priceLabel: string;
  reference: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // sq ft
  areaLabel?: string; // display override, e.g. "7 Marla"
  parking: number;
  yearBuilt: number;
  condition: string;
  furnished: string;
  cover: string;
  gallery: string[];
  overview: string;
  description: string[];
  interiorHighlights: string[];
  exteriorHighlights: string[];
  neighborhood: string;
  nearbyFacilities: string[];
  sellingPoints: string[];
  highlights: PropertyHighlight[];
  amenities: PropertyAmenity[];
  floorPlan?: string;
  mapLat: number;
  mapLng: number;
  videoUrl?: string;
  agent: {
    name: string;
    role: string;
    phone: string;
    email: string;
    initials: string;
  };
  advantages: { title: string; description: string; icon: string }[];
  faqs: { question: string; answer: string }[];
  featured: boolean;
}

export interface Service {
  slug: string;
  title: string;
  group: "Real Estate" | "Construction";
  icon: string;
  shortDescription: string;
  overview: string;
  scope: string[];
  benefits: string[];
  workflow: { title: string; description: string }[];
  image: string;
  faqs: { question: string; answer: string }[];
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  location: string;
  status: "Completed" | "In Progress" | "Planning";
  year: string;
  cover: string;
  gallery: string[];
  description: string;
  scope: string[];
  materials: string[];
  challenges: string;
  solutions: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  project: string;
  quote: string;
  initials: string;
  rating: number;
  placeholder: boolean;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

export interface IconMap {
  [key: string]: LucideIcon;
}

export interface ContactInfo {
  company: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  social: { label: string; href: string; icon: string }[];
}
