import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Users,
  ArrowUpRight,
  Phone,
  MapPin,
  Check,
  Copy,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Wifi,
  Wind,
  Coffee,
  Car,
  Compass,
  Mail,
  MessageSquare,
  Maximize2,
} from 'lucide-react';
import {
  Language,
  Currency,
  RoomSpec,
  GalleryPhoto,
  HOTEL_CONTACT,
  ROOM_PALETTE_SWATCHES,
  ROOMS_DATA,
  GALLERY_PHOTOS,
  LANDMARKS_DATA,
  AMENITIES_LIST,
  buildWhatsAppUrl,
} from './data/hotelData';
import { ResilientImage } from './components/ResilientImage';

export default function App() {
  // Language & Currency State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('hmi_lang');
    return saved === 'bn' ? 'bn' : 'en';
  });
  const [currency, setCurrency] = useState<Currency>('BDT');

  // Default Check-in (Today) & Check-out (Tomorrow)
  const defaultDates = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return {
      checkIn: today.toISOString().split('T')[0],
      checkOut: tomorrow.toISOString().split('T')[0],
    };
  }, []);

  // Booking & Configurator State
  const [checkIn, setCheckIn] = useState<string>(defaultDates.checkIn);
  const [checkOut, setCheckOut] = useState<string>(defaultDates.checkOut);
  const [selectedRoomId, setSelectedRoomId] = useState<'deluxe' | 'premium' | 'triple'>('premium');
  const [guests, setGuests] = useState<string>('2 Adults');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Interactive Hero Photo & Palette State
  const [activeHeroSlide, setActiveHeroSlide] = useState<number>(0);

  // Gallery Filter & Lightbox State
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'suites' | 'lobby' | 'exterior'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Active Room Detail Modal State
  const [inspectedRoom, setInspectedRoom] = useState<RoomSpec | null>(null);
  const [inspectedPhotoIdx, setInspectedPhotoIdx] = useState<number>(0);

  // Reservation Slip Preview Modal State
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);

  // Active Landmark in Location Guide
  const [activeLandmarkId, setActiveLandmarkId] = useState<string>('padma');

  useEffect(() => {
    localStorage.setItem('hmi_lang', lang);
    if (lang === 'bn') {
      document.body.classList.add('lang-bn');
    } else {
      document.body.classList.remove('lang-bn');
    }
  }, [lang]);

  const isBn = lang === 'bn';

  // Calculate Nights
  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const selectedRoom = useMemo(
    () => ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[1],
    [selectedRoomId]
  );

  const formatRate = (bdt: number, usd: number) => {
    if (currency === 'BDT') {
      return `৳${bdt.toLocaleString('en-IN')}`;
    }
    return `$${usd}`;
  };

  const estimatedTotalString = useMemo(() => {
    const totalBdt = selectedRoom.priceBdt * nightsCount;
    const totalUsd = selectedRoom.priceUsd * nightsCount;
    return currency === 'BDT'
      ? `৳${totalBdt.toLocaleString('en-IN')} (~$${totalUsd} USD)`
      : `$${totalUsd} USD (৳${totalBdt.toLocaleString('en-IN')})`;
  }, [selectedRoom, nightsCount, currency]);

  const whatsAppPayload = useMemo(() => {
    return buildWhatsAppUrl({
      lang,
      roomName: isBn ? selectedRoom.nameBn : selectedRoom.nameEn,
      checkIn,
      checkOut,
      nights: nightsCount,
      guests,
      estimatedTotal: estimatedTotalString,
      guestName,
      guestPhone,
      specialNotes,
    });
  }, [
    lang,
    isBn,
    selectedRoom,
    checkIn,
    checkOut,
    nightsCount,
    guests,
    estimatedTotalString,
    guestName,
    guestPhone,
    specialNotes,
  ]);

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'all') return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((item) => item.category === galleryFilter);
  }, [galleryFilter]);

  // Keyboard Navigation for Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectedRoom(null);
        setLightboxIndex(null);
        setShowSlipModal(false);
      } else if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % filteredGallery.length : null
          );
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + filteredGallery.length) % filteredGallery.length
              : null
          );
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const handleCopySlip = async () => {
    try {
      await navigator.clipboard.writeText(whatsAppPayload.message);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      setCopiedMessage(false);
    }
  };

  const heroShowcases = [
    {
      photo: GALLERY_PHOTOS[1], // Premium Twin Room
      swatch: ROOM_PALETTE_SWATCHES[2], // Mulberry Silk #521F2C
      captionEn: 'Premium Twin Residence · Mulberry Silk & Warm Teak',
      captionBn: 'প্রিমিয়াম টুইন রেসিডেন্স · মালবেরি সিল্ক ও সেগুন কাঠের আবহ',
    },
    {
      photo: GALLERY_PHOTOS[3], // Deluxe Twin Room
      swatch: ROOM_PALETTE_SWATCHES[1], // Aged Mahogany #382226
      captionEn: 'Deluxe Twin Sanctuary · Handcrafted Mahogany & Linen',
      captionBn: 'ডিলাক্স টুইন স্যুট · মেহগনি কাঠ ও শুভ্র লিনেন',
    },
    {
      photo: GALLERY_PHOTOS[2], // Reception
      swatch: ROOM_PALETTE_SWATCHES[4], // Burnished Teak Bronze #A36E4A
      captionEn: '24-Hour Front Desk · Burnished Teak & Golden Sconce',
      captionBn: '২৪ ঘণ্টা রিসেপশন · বার্নিশড সেগুন ও সোনালি আলো',
    },
    {
      photo: GALLERY_PHOTOS[4], // Lobby
      swatch: ROOM_PALETTE_SWATCHES[0], // Evening Aubergine #2E1F29
      captionEn: 'Guest Salon & Lounge · Deep Aubergine Velvet',
      captionBn: 'গেস্ট লাউঞ্জ · গাঢ় বেগুনি ভেলভেট সোফা',
    },
    {
      photo: GALLERY_PHOTOS[0], // Exterior
      swatch: ROOM_PALETTE_SWATCHES[3], // Varendra Terracotta #6A302B
      captionEn: 'Batar More Facade · At the Heart of Shaheb Bazar',
      captionBn: 'বাটার মোড় ভবন · সাহেব বাজারের প্রাণকেন্দ্রে',
    },
  ];

  const currentHero = heroShowcases[activeHeroSlide] || heroShowcases[0];
  const activeLandmark =
    LANDMARKS_DATA.find((l) => l.id === activeLandmarkId) || LANDMARKS_DATA[0];

  return (
    <div className="min-h-screen bg-[#1B1218] text-[#F7F2EE] selection:bg-[#A36E4A]/30">
      {/* Subtle Ambient Room-Toned Lighting */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-45 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle at 18% 12%, ${currentHero.swatch.hex}44 0%, transparent 48%), radial-gradient(circle at 82% 78%, #521F2C38 0%, transparent 52%)`,
        }}
      />

      {/* ===================================================================
          TOP BAR CONTRACT (Strict 3-Zone Single-Row Architecture)
          Zone 1: Single text wordmark | Zone 2: 5 Nav links | Zone 3: 1 Primary CTA
         =================================================================== */}
      <header className="sticky top-0 z-40 border-b border-[#A36E4A]/20 bg-[#1B1218]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-display text-xl font-semibold tracking-tight text-[#F7F2EE] whitespace-nowrap shrink-0"
          >
            {isBn ? 'হোটেল মুক্তা ইন্টারন্যাশনাল' : 'Hotel Mukta International'}
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#C5B5AC]">
            <a
              href="#suites"
              className="hover:text-[#F7F2EE] hover:underline underline-offset-8 decoration-[#C89572] transition-colors whitespace-nowrap shrink-0"
            >
              {isBn ? 'স্যুটসমূহ' : 'Suites'}
            </a>
            <a
              href="#experience"
              className="hover:text-[#F7F2EE] hover:underline underline-offset-8 decoration-[#C89572] transition-colors whitespace-nowrap shrink-0"
            >
              {isBn ? 'সুবিধাসমূহ' : 'Experience'}
            </a>
            <a
              href="#gallery"
              className="hover:text-[#F7F2EE] hover:underline underline-offset-8 decoration-[#C89572] transition-colors whitespace-nowrap shrink-0"
            >
              {isBn ? 'গ্যালারি' : 'Gallery'}
            </a>
            <a
              href="#location"
              className="hover:text-[#F7F2EE] hover:underline underline-offset-8 decoration-[#C89572] transition-colors whitespace-nowrap shrink-0"
            >
              {isBn ? 'অবস্থান' : 'Location'}
            </a>
            <a
              href="#concierge"
              className="hover:text-[#F7F2EE] hover:underline underline-offset-8 decoration-[#C89572] transition-colors whitespace-nowrap shrink-0"
            >
              {isBn ? 'রিজার্ভেশন' : 'Concierge'}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href="#concierge"
              className="rounded-lg bg-[#A36E4A] px-4 py-2 text-xs font-semibold text-[#1B1218] hover:bg-[#C89572] transition-colors whitespace-nowrap shrink-0"
            >
              {isBn ? 'স্যুট বুকিং করুন' : 'Reserve a Suite'}
            </a>
          </div>
        </div>
      </header>

      {/* ===================================================================
          HERO & BILINGUAL UTILITY BAR
         =================================================================== */}
      <main className="relative z-10">
        {/* Sub-Header Utility Strip (Location context + Interactive Language/Currency Controls) */}
        <div className="border-b border-[#A36E4A]/15 bg-[#24181F]/70">
          <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-2.5 max-w-[1280px] text-xs text-[#C5B5AC]">
            <div className="flex flex-wrap items-center gap-2">
              <span>
                {isBn
                  ? 'বাটার মোড়, সাহেব বাজার · রাজশাহী-৬১০০'
                  : 'Batar More, Shaheb Bazar · Rajshahi-6100'}
              </span>
              <span aria-hidden="true">·</span>
              <a
                href={`tel:+${HOTEL_CONTACT.whatsappRaw}`}
                className="font-mono-tabular text-[#D9A985] hover:underline"
              >
                {HOTEL_CONTACT.whatsappDisplay}
              </a>
              <span className="hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="hidden sm:inline">
                {isBn ? '২৪/৭ ফ্রন্ট ডেস্ক অভ্যর্থনা' : '24/7 Front Desk Concierge'}
              </span>
            </div>

            {/* Interactive Segmented Switches for Language & Currency */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1 rounded-md bg-[#1B1218] p-0.5 border border-[#A36E4A]/25"
                role="group"
                aria-label="Language selector"
              >
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    lang === 'en'
                      ? 'bg-[#A36E4A] text-[#1B1218] font-semibold'
                      : 'text-[#C5B5AC] hover:text-[#F7F2EE]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                    lang === 'bn'
                      ? 'bg-[#A36E4A] text-[#1B1218] font-semibold'
                      : 'text-[#C5B5AC] hover:text-[#F7F2EE]'
                  }`}
                >
                  বাংলা
                </button>
              </div>

              <div
                className="flex items-center gap-1 rounded-md bg-[#1B1218] p-0.5 border border-[#A36E4A]/25"
                role="group"
                aria-label="Currency selector"
              >
                <button
                  type="button"
                  onClick={() => setCurrency('BDT')}
                  className={`px-2.5 py-1 text-xs font-mono-tabular rounded transition-colors whitespace-nowrap shrink-0 ${
                    currency === 'BDT'
                      ? 'bg-[#521F2C] text-[#F7F2EE] font-semibold'
                      : 'text-[#C5B5AC] hover:text-[#F7F2EE]'
                  }`}
                >
                  BDT ৳
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-mono-tabular rounded transition-colors whitespace-nowrap shrink-0 ${
                    currency === 'USD'
                      ? 'bg-[#521F2C] text-[#F7F2EE] font-semibold'
                      : 'text-[#C5B5AC] hover:text-[#F7F2EE]'
                  }`}
                >
                  USD $
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            HERO SECTION (2-Column Asymmetric Split + Full-Width Booking Bar)
           =================================================================== */}
        <section className="mx-auto max-w-[1280px] px-6 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Column: Editorial Narrative & Room-Derived Palette Selector */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-xs font-medium text-[#C89572] tracking-wide">
                  {isBn
                    ? 'রাজশাহী শহরের কেন্দ্রে অবস্থিত আভিজাত্যের ঠিকানা'
                    : 'Boutique Sanctuary in Central Rajshahi'}
                </p>

                <h1
                  className="mt-4 font-display font-semibold text-[#F7F2EE] text-balance tracking-tight"
                  style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)', lineHeight: 1.08 }}
                >
                  {isBn
                    ? 'উষ্ণ মেহগনি, রাজশাহী সিল্কের আভা ও নির্জন বিশ্রামের মেলবন্ধন'
                    : 'Warm Mahogany, Mulberry Silk Tones & Quiet Refinement'}
                </h1>

                <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[#C5B5AC]">
                  {isBn
                    ? 'পদ্মা নদীর পাড় ও ঐতিহ্যবাহী সাহেব বাজারের বাটার মোড়ে অবস্থিত হোটেল মুক্তা ইন্টারন্যাশনাল। আমাদের প্রতিটি শীতাতপ নিয়ন্ত্রিত স্যুট সাজানো হয়েছে উষ্ণ কাঠের আসবাব, শুভ্র লিনেন এবং সার্বক্ষণিক আন্তরিক আতিথেয়তায়।'
                    : 'Positioned at Batar More in Shaheb Bazar—five minutes from the Padma River promenade. Our air-conditioned suites pair handcrafted mahogany woodwork, mulberry-toned drapery, and crisp ivory linens with 24-hour front desk hospitality.'}
                </p>

                {/* Primary Hero CTA & Secondary Action */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsAppPayload.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-lg bg-[#A36E4A] px-6 py-3.5 text-sm font-semibold text-[#1B1218] hover:bg-[#C89572] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>
                      {isBn ? 'হোয়াটসঅ্যাপে তাৎক্ষণিক বুকিং' : 'Reserve via WhatsApp'}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <a
                    href="#suites"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#A36E4A]/35 bg-[#281A21]/70 px-5 py-3.5 text-sm font-medium text-[#F7F2EE] hover:border-[#C89572] hover:bg-[#382226] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{isBn ? 'রুম ও ভাড়া দেখুন' : 'Explore Suites & Rates'}</span>
                  </a>
                </div>
              </div>

              {/* Interactive Interior Palette Strip (Extracted Directly from Hotel Rooms & Photos) */}
              <div className="mt-10 pt-8 border-t border-[#A36E4A]/20">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-[#C5B5AC]">
                    {isBn
                      ? 'হোটেলের রুম ও আলোকচিত্র থেকে নেওয়া রঙের আবহ (পরিবর্তন করতে ক্লিক করুন)'
                      : 'Interior Palette Extracted from Our Suites & Spaces (Select to preview)'}
                  </span>
                  <span className="font-mono-tabular text-xs text-[#C89572]">
                    {currentHero.swatch.hex}
                  </span>
                </div>

                <div className="mt-3.5 grid grid-cols-5 gap-2.5">
                  {heroShowcases.map((item, idx) => {
                    const isActive = idx === activeHeroSlide;
                    return (
                      <button
                        key={item.swatch.hex}
                        type="button"
                        onClick={() => setActiveHeroSlide(idx)}
                        className={`group flex flex-col items-start rounded-lg p-2.5 text-left transition-all border ${
                          isActive
                            ? 'border-[#C89572] bg-[#382226]/90'
                            : 'border-[#A36E4A]/15 bg-[#24171E]/60 hover:border-[#A36E4A]/40'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-1.5">
                          <span
                            className="h-5 w-5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: item.swatch.hex }}
                          />
                          <span className="font-mono-tabular text-[11px] text-[#8E7D76] group-hover:text-[#C5B5AC]">
                            0{idx + 1}
                          </span>
                        </div>
                        <span className="mt-2 line-clamp-1 text-xs font-medium text-[#F7F2EE]">
                          {isBn ? item.swatch.nameBn : item.swatch.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Real Hotel Photography Showcase with Measured Contrast Scrim */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative flex-1 min-h-[380px] lg:min-h-[520px] rounded-xl overflow-hidden border border-[#A36E4A]/30 bg-[#2E1F29]">
                <ResilientImage
                  src={currentHero.photo.url}
                  alt={isBn ? currentHero.photo.titleBn : currentHero.photo.titleEn}
                  accentColor={currentHero.swatch.hex}
                  className="h-full w-full lg:h-full"
                />

                {/* Measured Scrim for Guaranteed Legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1218] via-[#1B1218]/35 to-transparent" />

                {/* Bottom Caption & Slide Controls */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-end">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#D9A985]">
                      <span>
                        {isBn ? currentHero.swatch.nameBn : currentHero.swatch.nameEn}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {isBn
                          ? currentHero.photo.locationBn
                          : currentHero.photo.locationEn}
                      </span>
                    </div>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-[#F7F2EE]">
                      {isBn ? currentHero.photo.titleBn : currentHero.photo.titleEn}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveHeroSlide(
                          (prev) => (prev - 1 + heroShowcases.length) % heroShowcases.length
                        )
                      }
                      aria-label="Previous interior photo"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#A36E4A]/35 bg-[#1B1218]/80 text-[#F7F2EE] hover:border-[#C89572] hover:bg-[#382226] transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveHeroSlide((prev) => (prev + 1) % heroShowcases.length)
                      }
                      aria-label="Next interior photo"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#A36E4A]/35 bg-[#1B1218]/80 text-[#F7F2EE] hover:border-[#C89572] hover:bg-[#382226] transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              FULL-WIDTH INTERACTIVE AVAILABILITY & LIVE STAY CALCULATOR BAR
             =================================================================== */}
          <div className="mt-10 rounded-xl border border-[#A36E4A]/30 bg-[#261920]/95 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#A36E4A]/15">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#F7F2EE]">
                <span>
                  {isBn
                    ? 'তাৎক্ষণিক রুম প্রাপ্যতা ও ভাড়া ক্যালকুলেটর'
                    : 'Direct Stay Configurator & Rate Estimator'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#C5B5AC]">
                <span>
                  {isBn
                    ? 'কোনো অগ্রিম অনলাইন পেমেন্টের প্রয়োজন নেই'
                    : 'No online prepay required'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#D9A985]">
                  {isBn ? 'ফ্রি ক্যান্সেলেশন সুবিধা' : 'Complimentary Cancellation'}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
              {/* Suite Selector */}
              <div className="lg:col-span-3">
                <label
                  htmlFor="bar-suite-select"
                  className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                >
                  {isBn ? 'পছন্দের স্যুট' : 'Suite Category'}
                </label>
                <select
                  id="bar-suite-select"
                  value={selectedRoomId}
                  onChange={(e) =>
                    setSelectedRoomId(e.target.value as 'deluxe' | 'premium' | 'triple')
                  }
                  className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm text-[#F7F2EE] focus:border-[#C89572]"
                >
                  {ROOMS_DATA.map((room) => (
                    <option key={room.id} value={room.id}>
                      {isBn ? room.nameBn : room.nameEn} (
                      {formatRate(room.priceBdt, room.priceUsd)}/
                      {isBn ? 'রাত' : 'night'})
                    </option>
                  ))}
                </select>
              </div>

              {/* Check-in Date */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="bar-checkin"
                  className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                >
                  {isBn ? 'চেক-ইন তারিখ' : 'Check-In'}
                </label>
                <input
                  id="bar-checkin"
                  type="date"
                  value={checkIn}
                  min={defaultDates.checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3 py-2.5 text-sm font-mono-tabular text-[#F7F2EE] focus:border-[#C89572]"
                />
              </div>

              {/* Check-out Date */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="bar-checkout"
                  className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                >
                  {isBn ? 'চেক-আউট তারিখ' : 'Check-Out'}
                </label>
                <input
                  id="bar-checkout"
                  type="date"
                  value={checkOut}
                  min={checkIn || defaultDates.checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3 py-2.5 text-sm font-mono-tabular text-[#F7F2EE] focus:border-[#C89572]"
                />
              </div>

              {/* Guests */}
              <div className="lg:col-span-2">
                <label
                  htmlFor="bar-guests"
                  className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                >
                  {isBn ? 'অতিথি সংখ্যা' : 'Guests'}
                </label>
                <select
                  id="bar-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3 py-2.5 text-sm text-[#F7F2EE] focus:border-[#C89572]"
                >
                  <option value="1 Adult">{isBn ? '১ জন অতিথি' : '1 Adult'}</option>
                  <option value="2 Adults">{isBn ? '২ জন অতিথি' : '2 Adults'}</option>
                  <option value="3 Guests (Family)">
                    {isBn ? '৩ জন অতিথি (ফ্যামিলি)' : '3 Guests (Family)'}
                  </option>
                  <option value="4+ Guests (Multiple Suites)">
                    {isBn ? '৪+ জন (একাধিক রুম)' : '4+ Guests (Group)'}
                  </option>
                </select>
              </div>

              {/* Live Rate Estimate + Direct Action */}
              <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0">
                <div className="text-left lg:text-right">
                  <span className="block text-[11px] text-[#C5B5AC] tabular-nums">
                    {nightsCount} {isBn ? 'রাতের আনুমানিক ভাড়া' : nightsCount === 1 ? 'Night Total' : 'Nights Total'}
                  </span>
                  <span className="font-mono-tabular text-lg font-semibold text-[#D9A985]">
                    {currency === 'BDT'
                      ? `৳${(selectedRoom.priceBdt * nightsCount).toLocaleString('en-IN')}`
                      : `$${selectedRoom.priceUsd * nightsCount} USD`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSlipModal(true)}
                  className="rounded-lg bg-[#A36E4A] px-4 py-2.5 text-xs font-semibold text-[#1B1218] hover:bg-[#C89572] transition-colors whitespace-nowrap shrink-0"
                >
                  {isBn ? 'বুকিং স্লিপ দেখুন' : 'Check Availability'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SUITES & ACCOMMODATIONS SECTION (#suites)
            Zero-Pill Metadata Discipline + Real Suite Photos + Room Inspector
           =================================================================== */}
        <section
          id="suites"
          className="border-t border-[#A36E4A]/15 bg-[#22161C] py-20"
        >
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#C89572]">
                  {isBn ? '০১ · আমাদের আবাসন ব্যবস্থা' : '01 · Accommodations & Suites'}
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F7F2EE] text-balance">
                  {isBn
                    ? 'শান্ত ও সুসজ্জিত শীতাতপ নিয়ন্ত্রিত স্যুটসমূহ'
                    : 'Climate-Controlled Suites Dressed in Warm Timber'}
                </h2>
              </div>

              <p className="max-w-md text-sm text-[#C5B5AC]">
                {isBn
                  ? 'প্রতিটি রুমে রয়েছে স্প্লিট এসি, দ্রুতগতির ফাইবার ওয়াই-ফাই, ফ্ল্যাট-প্যানেল টিভি, রেফ্রিজারেটর এবং ২৪ ঘণ্টা রুম সার্ভিস।'
                  : 'All rates include complimentary morning breakfast, high-speed fiber Wi-Fi, split air conditioning, and flexible cancellation.'}
              </p>
            </div>

            {/* 3 Architectural Suite Cards */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {ROOMS_DATA.map((room) => {
                const isSelected = room.id === selectedRoomId;
                return (
                  <article
                    key={room.id}
                    className={`flex flex-col justify-between rounded-xl border transition-colors overflow-hidden bg-[#2B1C23] ${
                      isSelected
                        ? 'border-[#C89572]'
                        : 'border-[#A36E4A]/20 hover:border-[#A36E4A]/45'
                    }`}
                  >
                    <div>
                      {/* Suite Real Photo */}
                      <div
                        className="relative h-64 w-full cursor-pointer group"
                        onClick={() => {
                          setInspectedRoom(room);
                          setInspectedPhotoIdx(0);
                        }}
                      >
                        <ResilientImage
                          src={room.image}
                          alt={isBn ? room.nameBn : room.nameEn}
                          accentColor={room.swatchHex}
                          className="h-full w-full"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2B1C23] via-transparent to-black/25" />

                        {/* Quiet Room Palette Indicator */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-[#F7F2EE] drop-shadow">
                          <span
                            className="h-3 w-3 rounded-full border border-white/40"
                            style={{ backgroundColor: room.swatchHex }}
                          />
                          <span>{isBn ? room.floorToneBn : room.floorToneEn}</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectedRoom(room);
                            setInspectedPhotoIdx(0);
                          }}
                          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-[#1B1218]/85 px-3 py-1.5 text-xs font-medium text-[#F7F2EE] border border-[#A36E4A]/30 hover:border-[#C89572] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Maximize2 className="h-3.5 w-3.5 text-[#C89572]" />
                          <span>{isBn ? 'বিস্তারিত দেখুন' : 'Inspect Suite'}</span>
                        </button>
                      </div>

                      {/* Card Body: Unboxed Metadata & Editorial Hierarchy */}
                      <div className="p-6">
                        {/* Unboxed Metadata Line with · separators */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#C5B5AC] tabular-nums">
                          <span>{room.sizeSqFt} sq.ft</span>
                          <span aria-hidden="true">·</span>
                          <span>{isBn ? room.bedConfigBn : room.bedConfigEn}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {isBn
                              ? `সর্বোচ্চ ${room.maxGuests} জন`
                              : `Up to ${room.maxGuests} Guests`}
                          </span>
                        </div>

                        <h3 className="mt-2.5 font-display text-2xl font-semibold text-[#F7F2EE]">
                          {room.index}. {isBn ? room.nameBn : room.nameEn}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-[#C5B5AC]">
                          {isBn ? room.descBn : room.descEn}
                        </p>

                        {/* Clean Unboxed Amenity Highlights */}
                        <div className="mt-5 pt-4 border-t border-[#A36E4A]/15 text-xs text-[#D9A985]">
                          {(isBn ? room.amenitiesBn : room.amenitiesEn)
                            .slice(0, 4)
                            .join(' · ')}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Rate + Working Interactive Handlers */}
                    <div className="px-6 pb-6 pt-3 flex items-center justify-between gap-4 border-t border-[#A36E4A]/15">
                      <div>
                        <span className="block text-[11px] text-[#8E7D76]">
                          {isBn ? 'প্রতি রাতের ভাড়া (নাস্তাসহ)' : 'Nightly Rate · Incl. Breakfast'}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono-tabular text-xl font-semibold text-[#F7F2EE]">
                            {formatRate(room.priceBdt, room.priceUsd)}
                          </span>
                          <span className="font-mono-tabular text-xs text-[#C5B5AC]">
                            {currency === 'BDT'
                              ? `(~$${room.priceUsd})`
                              : `(৳${room.priceBdt.toLocaleString('en-IN')})`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRoomId(room.id);
                            setShowSlipModal(true);
                          }}
                          className="rounded-lg bg-[#A36E4A] px-4 py-2 text-xs font-semibold text-[#1B1218] hover:bg-[#C89572] transition-colors whitespace-nowrap shrink-0"
                        >
                          {isBn ? 'বুক করুন' : 'Reserve Suite'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            EXPERIENCE, AMENITIES & BENTO ARCHITECTURE (#experience)
           =================================================================== */}
        <section id="experience" className="py-20 bg-[#1B1218]">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium text-[#C89572]">
                  {isBn ? '০২ · আতিথেয়তা ও সুবিধাসমূহ' : '02 · Property Capabilities & Comforts'}
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F7F2EE] text-balance">
                  {isBn
                    ? 'ব্যবসায়িক সফর ও পারিবারিক বিশ্রামের জন্য নিখুঁত আয়োজন'
                    : 'Engineered for Effortless Business & Family Stays'}
                </h2>
              </div>
              <div className="lg:col-span-5 text-sm text-[#C5B5AC]">
                {isBn
                  ? 'রিসেপশন থেকে শুরু করে রুম ডাইনিং—প্রতিটি ক্ষেত্রে আমাদের প্রশিক্ষিত কর্মীরা ২৪ ঘণ্টা আপনার সেবায় নিয়োজিত।'
                  : 'From uninterrupted high-speed fiber internet to private on-premise parking and 24-hour room service, every essential is included.'}
              </div>
            </div>

            {/* Asymmetric Bento Grid: Real Reception & Lounge Showcase + Numbered Capabilities */}
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Marquee Visual Feature (Col Span 5) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#A36E4A]/25 bg-[#2A1B22] overflow-hidden">
                <div className="relative h-72 w-full">
                  <ResilientImage
                    src="https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_reception_hotelplacer.com.jpg"
                    alt={isBn ? '২৪ ঘণ্টা ফ্রন্ট ডেস্ক' : '24-Hour Front Desk & Reception'}
                    accentColor="#A36E4A"
                    className="h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2A1B22] via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#D9A985] tabular-nums">
                    <span>CRS Property ID 911</span>
                    <span aria-hidden="true">·</span>
                    <span>Check-in 12:00 PM</span>
                    <span aria-hidden="true">·</span>
                    <span>Check-out 11:00 AM</span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#F7F2EE]">
                    {isBn
                      ? 'উষ্ণ অভ্যর্থনা ও তাৎক্ষণিক হোয়াটসঅ্যাপ কনসিয়ার্জ'
                      : 'Personal Concierge Desk & Direct WhatsApp Confirmation'}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#C5B5AC]">
                    {isBn
                      ? 'মধ্যস্বত্বভোগী বা থার্ড-পার্টি বুকিং সাইটের অতিরিক্ত চার্জ ছাড়াই সরাসরি আমাদের ফ্রন্ট ডেস্কে কথা বলে রুম নিশ্চিত করুন।'
                      : 'Skip third-party booking fees. Connect directly with our Batar More reception desk to arrange early check-in, corporate group rates, or station transfers.'}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#A36E4A]/20 grid grid-cols-3 gap-4 text-left">
                    <div>
                      <span className="font-mono-tabular text-xl font-semibold text-[#F7F2EE]">
                        24/7
                      </span>
                      <span className="block text-xs text-[#C5B5AC]">
                        {isBn ? 'ফ্রন্ট ডেস্ক' : 'Reception Desk'}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono-tabular text-xl font-semibold text-[#F7F2EE]">
                        100%
                      </span>
                      <span className="block text-xs text-[#C5B5AC]">
                        {isBn ? 'স্প্লিট এসি রুম' : 'Split AC Suites'}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono-tabular text-xl font-semibold text-[#F7F2EE]">
                        5 min
                      </span>
                      <span className="block text-xs text-[#C5B5AC]">
                        {isBn ? 'পদ্মা নদীর পাড়' : 'To Padma River'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6 Editorial Numbered Capabilities (Col Span 7) */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AMENITIES_LIST.map((item) => (
                  <div
                    key={item.index}
                    className="flex flex-col justify-between rounded-xl border border-[#A36E4A]/20 bg-[#24171E] p-6 hover:border-[#A36E4A]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#C89572]">
                        <span className="font-mono-tabular font-medium">
                          {item.index}
                        </span>
                        <span>{isBn ? item.metricBn : item.metricEn}</span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-semibold text-[#F7F2EE]">
                        {isBn ? item.titleBn : item.titleEn}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#C5B5AC]">
                        {isBn ? item.detailBn : item.detailEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            REAL PHOTOGRAPHY GALLERY & COLOR STORY (#gallery)
           =================================================================== */}
        <section
          id="gallery"
          className="border-t border-[#A36E4A]/15 bg-[#22161C] py-20"
        >
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#C89572]">
                  {isBn ? '০৩ · হোটেলের বাস্তব আলোকচিত্র' : '03 · Verified Property Archive'}
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F7F2EE] text-balance">
                  {isBn
                    ? 'আমাদের রুম, লবি ও ভবনের বাস্তব চিত্রশালা'
                    : 'Inside Hotel Mukta International'}
                </h2>
              </div>

              {/* Interactive Filter Controls (Functional Segmented Buttons) */}
              <div
                className="flex flex-wrap items-center gap-1 rounded-lg bg-[#1B1218] p-1 border border-[#A36E4A]/25"
                role="tablist"
                aria-label="Gallery category filter"
              >
                {(
                  [
                    { key: 'all', labelEn: 'All Spaces (7)', labelBn: 'সব ছবি (৭)' },
                    { key: 'suites', labelEn: 'Suites (3)', labelBn: 'স্যুটসমূহ (৩)' },
                    { key: 'lobby', labelEn: 'Lobby & Desk (2)', labelBn: 'লবি ও রিসেপশন (২)' },
                    { key: 'exterior', labelEn: 'Exterior (2)', labelBn: 'ভবন ও অবস্থান (২)' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setGalleryFilter(tab.key)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      galleryFilter === tab.key
                        ? 'bg-[#A36E4A] text-[#1B1218] font-semibold'
                        : 'text-[#C5B5AC] hover:text-[#F7F2EE]'
                    }`}
                  >
                    {isBn ? tab.labelBn : tab.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGallery.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group cursor-pointer rounded-xl border border-[#A36E4A]/20 bg-[#2B1C23] overflow-hidden hover:border-[#C89572] transition-colors"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <ResilientImage
                      src={photo.url}
                      alt={isBn ? photo.titleBn : photo.titleEn}
                      accentColor={photo.dominantColor}
                      className="h-full w-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1218]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-[#F7F2EE]">
                      <span
                        className="h-3 w-3 rounded-full border border-white/40"
                        style={{ backgroundColor: photo.dominantColor }}
                      />
                      <span>
                        {isBn ? photo.paletteNameBn : photo.paletteNameEn}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#F7F2EE]">
                        {isBn ? photo.titleBn : photo.titleEn}
                      </h3>
                      <p className="text-xs text-[#C5B5AC]">
                        {isBn ? photo.locationBn : photo.locationEn}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#C89572] group-hover:translate-x-0.5 transition-transform whitespace-nowrap shrink-0">
                      {isBn ? 'বড় করে দেখুন' : 'View'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            LOCATION & RAJSHAHI NEIGHBORHOOD GUIDE (#location)
           =================================================================== */}
        <section id="location" className="py-20 bg-[#1B1218]">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#C89572]">
                  {isBn ? '০৪ · অবস্থান ও রাজশাহী গাইড' : '04 · Location & Rajshahi Transit'}
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F7F2EE] text-balance">
                  {isBn
                    ? 'সাহেব বাজারের বাটার মোড়ে—সবকিছুর কেন্দ্রবিন্দুতে'
                    : 'At Batar More, Shaheb Bazar—Minutes from Every Landmark'}
                </h2>
              </div>

              <a
                href={HOTEL_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#A36E4A]/35 bg-[#281A21] px-4 py-2.5 text-xs font-semibold text-[#F7F2EE] hover:border-[#C89572] transition-colors whitespace-nowrap shrink-0"
              >
                <Compass className="h-4 w-4 text-[#C89572]" />
                <span>
                  {isBn ? 'গুগল ম্যাপে দিকনির্দেশনা' : 'Open in Google Maps'}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Interactive Landmark Proximity List (Col Span 5) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                {LANDMARKS_DATA.map((lm) => {
                  const isSelected = lm.id === activeLandmarkId;
                  return (
                    <button
                      key={lm.id}
                      type="button"
                      onClick={() => setActiveLandmarkId(lm.id)}
                      className={`w-full text-left rounded-xl border p-4 transition-colors ${
                        isSelected
                          ? 'border-[#C89572] bg-[#382226]/85'
                          : 'border-[#A36E4A]/20 bg-[#24171E] hover:border-[#A36E4A]/45'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs text-[#C89572] tabular-nums">
                        <span>
                          {lm.index} · {isBn ? lm.categoryBn : lm.categoryEn}
                        </span>
                        <span className="font-mono-tabular">
                          {lm.distanceKm} · {isBn ? lm.distanceTimeBn : lm.distanceTimeEn}
                        </span>
                      </div>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-[#F7F2EE]">
                        {isBn ? lm.nameBn : lm.nameEn}
                      </h3>
                      {isSelected && (
                        <p className="mt-2 text-xs leading-relaxed text-[#C5B5AC]">
                          {isBn ? lm.descBn : lm.descEn}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Embedded Google Map + Property Coordinates Card (Col Span 7) */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#A36E4A]/25 bg-[#261920] overflow-hidden">
                <div className="h-[360px] lg:h-full min-h-[340px] w-full">
                  <iframe
                    src={HOTEL_CONTACT.googleMapsEmbed}
                    title="Hotel Mukta International Location on Google Maps"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="p-5 border-t border-[#A36E4A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#C89572] font-mono-tabular">
                      GPS: 24.366963° N, 88.600326° E
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[#F7F2EE]">
                      {isBn ? HOTEL_CONTACT.addressBn : HOTEL_CONTACT.addressEn}
                    </p>
                  </div>
                  <div className="text-xs text-[#C5B5AC] shrink-0">
                    {isBn ? 'নির্বাচিত গন্তব্য:' : 'Selected:'}{' '}
                    <span className="text-[#D9A985] font-medium">
                      {isBn ? activeLandmark.nameBn : activeLandmark.nameEn} (
                      {activeLandmark.distanceKm})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            DIRECT WHATSAPP CONCIERGE & RESERVATION DESK (#concierge)
           =================================================================== */}
        <section
          id="concierge"
          className="border-t border-[#A36E4A]/20 bg-[#22161C] py-20"
        >
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#C89572]">
                {isBn ? '০৫ · সরাসরি বুকিং ও ফ্রন্ট ডেস্ক' : '05 · Direct Reservations & Concierge'}
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#F7F2EE] text-balance">
                {isBn
                  ? 'হোয়াটসঅ্যাপ বা ফোনে সরাসরি আপনার রুম নিশ্চিত করুন'
                  : 'Reserve Directly with Our Rajshahi Front Desk'}
              </h2>
              <p className="mt-3 text-sm text-[#C5B5AC]">
                {isBn
                  ? 'নিচের ফর্মটি পূরণ করলে আপনার তথ্যসহ একটি প্রস্তুতকৃত বার্তা তৈরি হবে, যা এক ক্লিকেই আমাদের অফিসিয়াল হোয়াটসঅ্যাপে (+880 1711-302322) পাঠাতে পারবেন।'
                  : 'Complete your stay details below. Our configurator prepares a structured reservation slip that connects directly to our front desk on WhatsApp (+880 1711-302322).'}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Left Column: Guest Reservation Builder Form (Col Span 7) */}
              <div className="lg:col-span-7 rounded-xl border border-[#A36E4A]/25 bg-[#2B1C23] p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-[#F7F2EE]">
                  {isBn ? 'অতিথি ও রিজার্ভেশন তথ্য' : 'Guest Reservation Details'}
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="concierge-name"
                      className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                    >
                      {isBn ? 'অতিথির নাম' : 'Full Name'}
                    </label>
                    <input
                      id="concierge-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={isBn ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                      className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm text-[#F7F2EE] placeholder-[#8E7D76] focus:border-[#C89572]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-phone"
                      className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                    >
                      {isBn ? 'মোবাইল নম্বর' : 'Mobile / WhatsApp Number'}
                    </label>
                    <input
                      id="concierge-phone"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm font-mono-tabular text-[#F7F2EE] placeholder-[#8E7D76] focus:border-[#C89572]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-suite"
                      className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                    >
                      {isBn ? 'স্যুট নির্বাচন' : 'Selected Suite'}
                    </label>
                    <select
                      id="concierge-suite"
                      value={selectedRoomId}
                      onChange={(e) =>
                        setSelectedRoomId(e.target.value as 'deluxe' | 'premium' | 'triple')
                      }
                      className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm text-[#F7F2EE] focus:border-[#C89572]"
                    >
                      {ROOMS_DATA.map((room) => (
                        <option key={room.id} value={room.id}>
                          {isBn ? room.nameBn : room.nameEn} —{' '}
                          {formatRate(room.priceBdt, room.priceUsd)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-guests"
                      className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                    >
                      {isBn ? 'অতিথি সংখ্যা' : 'Number of Guests'}
                    </label>
                    <select
                      id="concierge-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm text-[#F7F2EE] focus:border-[#C89572]"
                    >
                      <option value="1 Adult">{isBn ? '১ জন অতিথি' : '1 Adult'}</option>
                      <option value="2 Adults">{isBn ? '২ জন অতিথি' : '2 Adults'}</option>
                      <option value="3 Guests (Family)">
                        {isBn ? '৩ জন অতিথি (ফ্যামিলি)' : '3 Guests (Family)'}
                      </option>
                      <option value="4+ Guests (Group)">
                        {isBn ? '৪+ জন (গ্রুপ বুকিং)' : '4+ Guests (Group)'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-checkin"
                      className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                    >
                      {isBn ? 'চেক-ইন তারিখ' : 'Check-In Date'}
                    </label>
                    <input
                      id="concierge-checkin"
                      type="date"
                      value={checkIn}
                      min={defaultDates.checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm font-mono-tabular text-[#F7F2EE] focus:border-[#C89572]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="concierge-checkout"
                      className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                    >
                      {isBn ? 'চেক-আউট তারিখ' : 'Check-Out Date'}
                    </label>
                    <input
                      id="concierge-checkout"
                      type="date"
                      value={checkOut}
                      min={checkIn || defaultDates.checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm font-mono-tabular text-[#F7F2EE] focus:border-[#C89572]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="concierge-notes"
                      className="block text-xs font-medium text-[#C5B5AC] mb-1.5"
                    >
                      {isBn
                        ? 'বিশেষ অনুরোধ (ঐচ্ছিক)'
                        : 'Special Requests (Arrival time, parking, extra bedding)'}
                    </label>
                    <input
                      id="concierge-notes"
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder={
                        isBn
                          ? 'যেমন: দুপুর ১টায় চেক-ইন, গাড়ি পার্কিং প্রয়োজন...'
                          : 'e.g. Arriving by Banalata Express at 1:30 PM, require car parking...'
                      }
                      className="w-full rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] px-3.5 py-2.5 text-sm text-[#F7F2EE] placeholder-[#8E7D76] focus:border-[#C89572]"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={whatsAppPayload.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#A36E4A] px-6 py-3 text-sm font-semibold text-[#1B1218] hover:bg-[#C89572] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>
                      {isBn
                        ? 'হোয়াটসঅ্যাপে রিজার্ভেশন পাঠান'
                        : 'Send Reservation via WhatsApp'}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySlip}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#A36E4A]/35 bg-[#1B1218] px-4 py-3 text-xs font-medium text-[#F7F2EE] hover:border-[#C89572] transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="h-4 w-4 text-[#C89572]" />
                        <span>{isBn ? 'বার্তা কপি হয়েছে!' : 'Copied Reservation Slip'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-[#C89572]" />
                        <span>{isBn ? 'বুকিং টেক্সট কপি করুন' : 'Copy Reservation Text'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Live Reservation Slip Preview & Direct Channels (Col Span 5) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                {/* Live Slip Preview */}
                <div className="rounded-xl border border-[#A36E4A]/25 bg-[#1B1218] p-6">
                  <div className="flex items-center justify-between border-b border-[#A36E4A]/15 pb-3">
                    <span className="text-xs font-medium text-[#C89572]">
                      {isBn ? 'লাইভ হোয়াটসঅ্যাপ বার্তা প্রিভিউ' : 'Live Reservation Slip Preview'}
                    </span>
                    <span className="font-mono-tabular text-xs text-[#C5B5AC]">
                      {HOTEL_CONTACT.whatsappDisplay}
                    </span>
                  </div>
                  <pre className="mt-4 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#F7F2EE]/90">
                    {whatsAppPayload.message}
                  </pre>
                </div>

                {/* Direct Contact Lines */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`tel:+${HOTEL_CONTACT.whatsappRaw}`}
                    className="rounded-xl border border-[#A36E4A]/20 bg-[#2B1C23] p-4 hover:border-[#C89572] transition-colors"
                  >
                    <span className="text-xs text-[#C5B5AC]">
                      {isBn ? 'প্রধান রিজার্ভেশন হটলাইন' : 'Primary Hotline & WhatsApp'}
                    </span>
                    <p className="mt-1 font-mono-tabular text-base font-semibold text-[#F7F2EE]">
                      {HOTEL_CONTACT.whatsappDisplay}
                    </p>
                  </a>

                  <a
                    href={`tel:${HOTEL_CONTACT.frontDeskTel}`}
                    className="rounded-xl border border-[#A36E4A]/20 bg-[#2B1C23] p-4 hover:border-[#C89572] transition-colors"
                  >
                    <span className="text-xs text-[#C5B5AC]">
                      {isBn ? 'ফ্রন্ট ডেস্ক ২৪/৭ ফোন' : '24/7 Reception Desk'}
                    </span>
                    <p className="mt-1 font-mono-tabular text-base font-semibold text-[#F7F2EE]">
                      {HOTEL_CONTACT.frontDeskDisplay}
                    </p>
                  </a>
                </div>

                <a
                  href={`mailto:${HOTEL_CONTACT.email}?subject=Suite%20Reservation%20Inquiry`}
                  className="rounded-xl border border-[#A36E4A]/20 bg-[#2B1C23] p-4 hover:border-[#C89572] transition-colors block"
                >
                  <span className="text-xs text-[#C5B5AC]">
                    {isBn ? 'কর্পোরেট ও গ্রুপ বুকিং ইমেইল' : 'Corporate & Delegation Inquiries'}
                  </span>
                  <p className="mt-1 font-mono-tabular text-sm font-medium text-[#D9A985]">
                    {HOTEL_CONTACT.email}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          QUIET EDITORIAL FOOTER
         =================================================================== */}
      <footer className="border-t border-[#A36E4A]/20 bg-[#160E13] py-12 text-xs text-[#C5B5AC]">
        <div className="mx-auto max-w-[1280px] px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-semibold text-[#F7F2EE]">
              {isBn
                ? 'হোটেল মুক্তা ইন্টারন্যাশনাল · রাজশাহী'
                : 'Hotel Mukta International · Rajshahi'}
            </p>
            <p className="mt-1 text-[#8E7D76]">
              {isBn ? HOTEL_CONTACT.addressBn : HOTEL_CONTACT.addressEn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#suites" className="hover:text-[#F7F2EE] transition-colors">
              {isBn ? 'স্যুটসমূহ' : 'Suites'}
            </a>
            <a href="#experience" className="hover:text-[#F7F2EE] transition-colors">
              {isBn ? 'সুবিধাসমূহ' : 'Experience'}
            </a>
            <a href="#gallery" className="hover:text-[#F7F2EE] transition-colors">
              {isBn ? 'গ্যালারি' : 'Gallery'}
            </a>
            <a href="#location" className="hover:text-[#F7F2EE] transition-colors">
              {isBn ? 'লোকেশন' : 'Location'}
            </a>
            <a
              href={whatsAppPayload.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D9A985] hover:underline"
            >
              WhatsApp: {HOTEL_CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      </footer>

      {/* ===================================================================
          MODAL 1: SUITE INSPECTOR MODAL (Multi-Photo + Full Specs)
         =================================================================== */}
      {inspectedRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setInspectedRoom(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#A36E4A]/35 bg-[#24171E] p-6 sm:p-8 text-[#F7F2EE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#C89572] tabular-nums">
                  {inspectedRoom.sizeSqFt} sq.ft ·{' '}
                  {isBn ? inspectedRoom.bedConfigBn : inspectedRoom.bedConfigEn} ·{' '}
                  {isBn ? inspectedRoom.floorToneBn : inspectedRoom.floorToneEn}
                </p>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold">
                  {isBn ? inspectedRoom.nameBn : inspectedRoom.nameEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedRoom(null)}
                aria-label="Close suite inspector"
                className="rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] p-2 text-[#C5B5AC] hover:text-[#F7F2EE]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Active Photo */}
            <div className="mt-5 relative h-72 sm:h-80 w-full rounded-xl overflow-hidden border border-[#A36E4A]/25">
              <ResilientImage
                src={
                  inspectedRoom.secondaryImages[inspectedPhotoIdx] ||
                  inspectedRoom.image
                }
                alt={isBn ? inspectedRoom.nameBn : inspectedRoom.nameEn}
                accentColor={inspectedRoom.swatchHex}
                className="h-full w-full"
              />
            </div>

            {/* Photo Switcher Thumbnails */}
            <div className="mt-3 flex items-center gap-3">
              {inspectedRoom.secondaryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInspectedPhotoIdx(idx)}
                  className={`h-14 w-24 rounded-lg overflow-hidden border transition-all ${
                    inspectedPhotoIdx === idx
                      ? 'border-[#C89572] scale-105'
                      : 'border-[#A36E4A]/20 opacity-65 hover:opacity-100'
                  }`}
                >
                  <ResilientImage
                    src={imgUrl}
                    alt={`View ${idx + 1}`}
                    accentColor={inspectedRoom.swatchHex}
                    className="h-full w-full"
                  />
                </button>
              ))}
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#C5B5AC]">
              {isBn ? inspectedRoom.descBn : inspectedRoom.descEn}
            </p>

            {/* Full Amenities List */}
            <div className="mt-6 pt-5 border-t border-[#A36E4A]/20">
              <h4 className="text-xs font-semibold text-[#C89572]">
                {isBn ? 'রুমের অন্তর্ভুক্ত সুবিধাসমূহ' : 'Included Suite Amenities'}
              </h4>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-[#F7F2EE]">
                {(isBn ? inspectedRoom.amenitiesBn : inspectedRoom.amenitiesEn).map(
                  (am, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#C89572] shrink-0" />
                      <span>{am}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-5 border-t border-[#A36E4A]/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-[#C5B5AC]">
                  {nightsCount}{' '}
                  {isBn
                    ? 'রাতের মোট আনুমানিক ভাড়া'
                    : nightsCount === 1
                    ? 'Night Rate'
                    : 'Nights Estimated Total'}
                </span>
                <span className="font-mono-tabular text-2xl font-semibold text-[#D9A985]">
                  {currency === 'BDT'
                    ? `৳${(inspectedRoom.priceBdt * nightsCount).toLocaleString('en-IN')}`
                    : `$${inspectedRoom.priceUsd * nightsCount} USD`}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRoomId(inspectedRoom.id);
                    setInspectedRoom(null);
                    setShowSlipModal(true);
                  }}
                  className="rounded-lg bg-[#A36E4A] px-5 py-2.5 text-xs font-semibold text-[#1B1218] hover:bg-[#C89572] transition-colors whitespace-nowrap shrink-0"
                >
                  {isBn
                    ? 'হোয়াটসঅ্যাপে এই স্যুট বুক করুন'
                    : 'Reserve This Suite via WhatsApp'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: RESERVATION SLIP PREVIEW & WHATSAPP LAUNCHER
         =================================================================== */}
      {showSlipModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowSlipModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-[#A36E4A]/40 bg-[#24171E] p-6 sm:p-8 text-[#F7F2EE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#C89572]">
                  {isBn ? 'সরাসরি ফ্রন্ট ডেস্ক কনফার্মেশন' : 'Direct Front Desk Reservation Slip'}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold">
                  {isBn ? selectedRoom.nameBn : selectedRoom.nameEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSlipModal(false)}
                aria-label="Close reservation slip"
                className="rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] p-2 text-[#C5B5AC] hover:text-[#F7F2EE]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[#A36E4A]/25 bg-[#1B1218] p-4">
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#F7F2EE]">
                {whatsAppPayload.message}
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopySlip}
                className="inline-flex items-center gap-2 rounded-lg border border-[#A36E4A]/35 bg-[#1B1218] px-4 py-2.5 text-xs font-medium text-[#F7F2EE] hover:border-[#C89572] transition-colors"
              >
                {copiedMessage ? (
                  <>
                    <Check className="h-4 w-4 text-[#C89572]" />
                    <span>{isBn ? 'কপি হয়েছে' : 'Copied to Clipboard'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#C89572]" />
                    <span>{isBn ? 'বার্তা কপি করুন' : 'Copy Message'}</span>
                  </>
                )}
              </button>

              <a
                href={whatsAppPayload.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#A36E4A] px-5 py-2.5 text-xs font-semibold text-[#1B1218] hover:bg-[#C89572] transition-colors"
              >
                <span>
                  {isBn ? 'হোয়াটসঅ্যাপ ওপেন করুন' : 'Continue to WhatsApp'}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: FULLSCREEN GALLERY LIGHTBOX
         =================================================================== */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 text-sm text-[#F7F2EE]">
              <div>
                <span className="font-display text-xl font-semibold">
                  {isBn
                    ? filteredGallery[lightboxIndex].titleBn
                    : filteredGallery[lightboxIndex].titleEn}
                </span>
                <span className="ml-3 text-xs text-[#C5B5AC]">
                  {isBn
                    ? filteredGallery[lightboxIndex].paletteNameBn
                    : filteredGallery[lightboxIndex].paletteNameEn}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="rounded-lg border border-[#A36E4A]/30 bg-[#1B1218] p-2 text-[#C5B5AC] hover:text-[#F7F2EE]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative h-[65vh] w-full rounded-xl overflow-hidden border border-[#A36E4A]/30 bg-[#1B1218]">
              <ResilientImage
                src={filteredGallery[lightboxIndex].url}
                alt={
                  isBn
                    ? filteredGallery[lightboxIndex].titleBn
                    : filteredGallery[lightboxIndex].titleEn
                }
                accentColor={filteredGallery[lightboxIndex].dominantColor}
                className="h-full w-full"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredGallery.length) %
                      filteredGallery.length
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#A36E4A]/35 bg-[#24171E] px-4 py-2 text-xs font-medium text-[#F7F2EE] hover:border-[#C89572]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{isBn ? 'পূর্ববর্তী ছবি' : 'Previous'}</span>
              </button>

              <span className="font-mono-tabular text-xs text-[#C5B5AC]">
                {lightboxIndex + 1} / {filteredGallery.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)
                }
                className="inline-flex items-center gap-2 rounded-lg border border-[#A36E4A]/35 bg-[#24171E] px-4 py-2 text-xs font-medium text-[#F7F2EE] hover:border-[#C89572]"
              >
                <span>{isBn ? 'পরবর্তী ছবি' : 'Next'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
