# Case Study: TS Estate & Builders

**A premium real estate and construction website, built to turn property discovery into qualified conversations.**

| Project snapshot | |
|---|---|
| Client | TS Estate & Builders |
| Industry | Real estate, construction & property development |
| Project type | Marketing website + property listing experience |
| Scope | Brand experience, listing discovery, service & project storytelling, lead capture, deployment |
| Build window | 15 – 24 October 2026 |
| Status | Delivered |
| Core stack | Next.js 16, React 19, TypeScript, Tailwind CSS |

## 1. Project Overview

TS Estate & Builders is an integrated real estate and construction company offering property sales, rentals, management, investment consulting, residential and commercial construction, architecture, interior design, renovation, civil engineering, and turnkey delivery.

The brief was to create one digital home for two closely connected practices: property and construction. It needed to present the brand as established and trustworthy, make listings easy to explore, give every property a complete story, and turn interest into a consultation or a scheduled visit — without adding operational overhead.

The result is a fast, responsive website with a cinematic hero, a curated property experience, dedicated service and project hubs, rich property detail modals, a validated consultation form, pre-filled WhatsApp visit requests, and direct WhatsApp, phone, and email contact paths.

## 2. The Problem / Challenge

- **Two practices, one brand.** Real estate and construction are related but distinct. The site had to present both clearly without making the business feel fragmented.
- **Listings were hard to explore.** Visitors needed to browse by purpose, property type, and bedrooms, then sort by price — not scroll through an undifferentiated list.
- **Property details were scattered.** Photos, specifications, amenities, location, floor plans, and agent contact all needed to live in one coherent view.
- **Inquiries depended on chat and memory.** There was no structured way to capture requirements, budget, preferred contact method, or a viewing request.
- **Trust had to be earned immediately.** A premium property and construction brand cannot look like a generic template.
- **Simple updates required technical help.** Listings, services, and projects needed a predictable content structure that could be edited without rebuilding pages.
- **Mobile and speed mattered.** Buyers and investors research on their phones, often on slow connections.
- **The solution had to stay lean.** The business needed reliable lead capture without a heavy backend or a complicated hosting setup.
- **Local communication habits mattered.** WhatsApp and direct phone contact are part of how property conversations actually happen.

## 3. Goals

- Create a premium online flagship that builds trust from the first click.
- Make it effortless to browse properties for sale and for rent.
- Give each listing a complete, self-contained story.
- Make it simple to request a consultation or schedule a property visit.
- Present the full depth of the real estate and construction practices.
- Build credibility through real project stories, service detail, and transparent process.
- Keep the experience fast on mobile and desktop.
- Keep hosting and maintenance lean.
- Structure content so it can grow without a redesign.

## 4. Solution & Our Approach

### A brand that feels established

We built a calm, architectural identity around deep navy, accent blue, soft blue, and generous white space. Marcellus serif headings give the brand a premium, editorial feel; Quicksand keeps body copy approachable and readable. Subtle motion, layered gradients, and full-width photography carry the same visual language from the hero to the smallest detail card.

The result is a site that feels like a property and construction company with a point of view — not a rented theme.

### Discovery without page reloads

The property experience is built around a single, responsive flow. Featured listings can be filtered between sale and rent on the homepage. The dedicated For Sale and For Rent pages add property-type pills, bedroom filters, and price sorting. Every card opens a full property modal, so visitors can move from browsing to a complete listing without losing their place.

Property modals include a gallery with lightbox, specifications, pricing, overview, interior and exterior highlights, neighborhood facilities, amenities, floor plan support, an OpenStreetMap location, agent details, FAQs, and similar properties. Listings can also be shared through a deep link that reopens the exact property.

### Every property tells the full story

Each listing is a structured record rather than a page of loose copy. That means the same fields — price, reference, bedrooms, bathrooms, area, parking, year built, condition, furnishing, highlights, amenities, map coordinates, agent, advantages, and FAQs — appear consistently across every property.

This consistency makes the experience easier to scan for buyers and easier to maintain for the business.

### Services and projects that show the depth of the business

The real estate and construction practices each have a dedicated hub. Fourteen services are presented with an overview, scope, benefits, a four-step workflow, and FAQs. Six construction projects are presented as mini case studies with scope, materials, challenges, and solutions — giving prospective clients evidence of how the team thinks and delivers.

### A lead path built around real behavior

The consultation form captures the details that actually qualify an inquiry: name, email, phone, service required, property or project type, budget range, preferred contact method, and project requirements.

The form validates on the client with React Hook Form and Zod. On submit, it builds a structured WhatsApp message with the visitor's details and opens WhatsApp ready to send — no email service or backend required.

For visitors who prefer to talk first, every listing includes direct phone, email, and pre-filled WhatsApp links, including a property-specific visit request.

### Fast, lean, and easy to maintain

The site uses typed content models for listings, services, and projects, so content stays consistent and predictable. Images are served through Next.js image optimization in AVIF and WebP. The production build runs as a standalone Next.js application behind Caddy, keeping hosting simple and the surface area small.

There is no database, authentication layer, or dashboard to maintain — just a fast marketing site with reliable lead capture.

## 5. Key Features

### For visitors

- Cinematic hero slideshow with layered overlays and subtle motion.
- Animated company statistics.
- Featured listings with sale/rent filtering.
- Dedicated For Sale and For Rent pages.
- Property-type, bedroom, and price-sort filters.
- Full property detail modals with gallery and lightbox.
- Floor plan support, location map, amenities, and neighborhood context.
- Agent contact details with phone, email, and WhatsApp.
- Shareable property deep links.
- Consultation form with service, project type, budget, and contact preference.
- Pre-filled WhatsApp visit requests tied to a specific listing.
- Real estate and construction service hubs with detailed service modals.
- Construction project portfolio with challenge-and-solution case studies.
- About page with mission, vision, values, and practice overview.
- Contact page with office map and a clear response process.
- Privacy policy and terms pages.
- Responsive navigation with mobile drawer.
- Page-level SEO metadata and Open Graph tags.

### For the business

- A structured lead-capture path instead of unstructured chat messages.
- Qualified inquiries with budget and contact preferences.
- Viewing requests tied to the exact property.
- Inquiries delivered directly to WhatsApp with all qualifying details.
- One typed content layer for listings, services, and projects.
- Consistent listing fields across the entire catalogue.
- Direct WhatsApp, phone, and email contact from every property.
- SEO-ready page metadata.
- A lightweight site with no database or dashboard to operate.
- A foundation that can accept a CMS or database later without a redesign.

## 6. Results / Impact

**A stronger first impression.** The site presents TS Estate & Builders as an established, integrated property and construction brand, with a cohesive visual system that carries from the homepage through every listing and service page.

**A smoother path to discovery.** Visitors can filter by purpose, type, and bedrooms, sort by price, and open a complete property story without leaving the page. Deep links make it easy to share a specific listing.

**Clearer, more useful inquiries.** The consultation and visit forms capture the details the team needs to respond well — service, budget, timeline context, preferred contact method, and viewing preferences.

**Less manual back-and-forth.** Pre-filled WhatsApp links and structured forms reduce the "what are you looking for?" stage of the conversation.

**Stronger credibility.** Detailed service pages and project case studies give prospective clients evidence of capability, not just claims.

**A lean foundation for growth.** The site is fast, responsive, and built on a maintainable content model. It can grow into a CMS, database, or richer client portal when the business is ready.

## 7. Visuals

The repository includes the core brand, hero, and property photography assets:



Each listing uses a cover image plus a gallery, so the same photography system supports cards, property modals, lightboxes, and similar-property suggestions.

## 8. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Design | Tailwind CSS v4 and a custom navy/blue design system |
| Typography | Marcellus (display) and Quicksand (body) |
| Motion | Framer Motion |
| UI state | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Next.js App Router |
| Lead delivery | WhatsApp (pre-filled message) |
| Media | Next.js image optimization with AVIF and WebP |
| Maps | OpenStreetMap embeds and Google Maps |
| Icons | Lucide React |
| Deployment | Standalone Next.js build behind Caddy |
| Content | Typed data model: 20 listings, 14 services, 6 projects |

## 9. What's Next

- Move listings and content into a CMS or database so the team can publish without a deploy.
- Add an inquiry CRM and a simple lead pipeline.
- Send automated confirmation and follow-up emails.
- Add saved searches, favorites, and property comparison.
- Support virtual tours and video walkthroughs.
- Add verified client testimonials and richer agent profiles.
- Introduce analytics and conversion tracking for listings and inquiries.
- Add online viewing-slot booking.
- Continue accessibility and performance improvements.
- Expand reporting and marketing tools as the business grows.
