# Hotel Mukta International — Project Task Plan

## Project Vision & Objective
Create a modern, stunning, and responsive luxury-feel hotel showcase website for **Hotel Mukta International (হোটেল মুক্তা ইন্টারন্যাশনাল)** located in Rajshahi, Bangladesh.
**Direct Booking Policy:** No automated online checkout/booking engine on the website. Instead, conversion is driven via direct WhatsApp chat, phone calls, and reservation inquiry forms/email.

---

## Phases & Checklists

### Phase 1: Research, Asset Gathering & Architectural Discovery
- [x] Extract hotel details, amenities, room types, and pricing from the legacy CRS reservation platform (`aiocrs.com` PropID: 911).
- [x] Gather real photos (Exterior, Lobby, Reception, Deluxe Twin, Premium Twin, Triple Room) from verified sources.
- [x] Create project tracking files: `task_plan.md`, `findings.md`, `progress.md`.
- [x] Solicit user input and clarify key design decisions:
  - Theme: Midnight Gold & Deep Slate with glowing accents
  - Language: Dual Language Toggle (English & বাংলা)
  - Currency: BDT (৳) primary + USD ($) reference
  - Contact Flow: Interactive WhatsApp inquiry & reservation generator pre-populating message to `+8801711302322`


### Phase 2: Design System & Project Setup
- [x] Establish visual aesthetic: Midnight Gold & Deep Slate palette, luxury serif headings (Cinzel), modern sans (Plus Jakarta Sans), and Bengali typography (Hind Siliguri).
- [x] Implement core design tokens in `styles.css` (custom variables, glassmorphism, responsive grid, micro-interactions).
- [x] Configure dual language engine (English & বাংলা) with instant switcher and local storage persistence.

### Phase 3: Core Website Sections & Features
- [x] **Navigation Header**: Sticky glassmorphic navbar with brand logo crest, bilingual switcher, phone link, and WhatsApp CTA.
- [x] **Hero Section**: High-impact luxury hero with live rating beacon, responsive tagline, and primary CTAs.
- [x] **Floating Availability & WhatsApp Inquiry Bar**: Fast reservation builder connecting directly to `+8801711302322`.
- [x] **About & Heritage Section**: Highlights location at Batar More, Shaheb Bazar, and 4 core value propositions.
- [x] **Rooms & Suites Showcase**:
  - Deluxe Twin, Premium Twin, and Triple Family Suite cards with real verified photos.
  - Full amenity chips, pricing with BDT primary and USD reference.
  - Interactive "Quick Specs" modal with bedding, area, and complete amenities.
  - "Reserve via WhatsApp" buttons generating pre-filled reservation messages.
- [x] **Amenities & Services Grid**: 9 luxury cards with illuminated gold SVG icons (24h Front Desk, Wi-Fi, AC, Restaurant, Prayer Mats, etc.).
- [x] **Interactive Photo Gallery**: Category filter tabs (All, Rooms, Lobby, Exterior) and fullscreen lightbox viewer.
- [x] **Location & Rajshahi City Guide**: Interactive proximity badges to major landmarks (Padma River, Station, Museum, University) and embedded Google Map.
- [x] **Direct WhatsApp Reservation & Contact Form**: Dedicated message builder + direct hotline cards for `01711302322` and `01758355468`.
- [x] **Floating Action Buttons**: Floating WhatsApp chat button with pulse animation + smooth back-to-top button.

### Phase 4: Polish, Responsiveness & Testing
- [x] Tested in live browser session on local web server (`http://localhost:8080`).
- [x] Verified bilingual toggle (English ↔ বাংলা) across all headers, cards, and buttons.
- [x] Tested Quick Specs modal opening and closing.
- [x] Tested Gallery Lightbox modal with fullscreen high-res imagery.
- [x] Validated semantic HTML5, SEO meta tags, OpenGraph tags, and Schema.org Hotel structured data.

### Phase 5: Client Review & Delivery
- [x] Completed full initialization and browser verification.
- [ ] Solicit user feedback on live results and potential further customizations.

