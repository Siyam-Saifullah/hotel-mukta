/**
 * HOTEL MUKTA INTERNATIONAL — Interactive Scripts
 * - Dual Language Engine (English & Bengali)
 * - Interactive WhatsApp Reservation Message Generator
 * - Photo Lightbox & Category Filtering
 * - Room Details Modal
 * - Mobile Navigation & Scroll Animations
 */

// Global State
const state = {
  currentLang: localStorage.getItem('hmi_lang') || 'en',
  activeFilter: 'all',
  currentLightboxIndex: 0
};

// Hotel Information Constants
const HOTEL_INFO = {
  nameEn: "Hotel Mukta International",
  nameBn: "হোটেল মুক্তা ইন্টারন্যাশনাল",
  whatsappNumber: "8801711302322",
  phoneDisplay: "01711-302322",
  hotlineDisplay: "01758-355468",
  addressEn: "Batar More, Shaheb Bazar / Ganakpara, Rajshahi-6100, Bangladesh",
  addressBn: "বাটার মোড়, সাহেব বাজার / গণকপাড়া, রাজশাহী-৬১০০, বাংলাদেশ",
  coordinates: { lat: 24.366963, lng: 88.6003258 }
};

// Bilingual Dictionaries
const TRANSLATIONS = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "The Property",
    "nav.rooms": "Accommodations",
    "nav.amenities": "Amenities",
    "nav.gallery": "Gallery",
    "nav.location": "Location",
    "nav.contact": "Reservations",
    "nav.call": "01711-302322",
    "nav.bookWa": "Book via WhatsApp",

    // Hero
    "hero.badge": "HOTEL MUKTA INTERNATIONAL · RAJSHAHI",
    "hero.title": "Sanctuary of Quiet Refinement",
    "hero.desc": "At Batar More, Shaheb Bazar. An intimate retreat pairing warm Bengali hospitality with modern serenity.",
    "hero.ctaReserve": "Reserve with Concierge",
    "hero.ctaExplore": "View Accommodations",

    // Stats
    "stat.location.val": "Shaheb Bazar",
    "stat.location.label": "Prime Location",
    "stat.desk.val": "24 / 7",
    "stat.desk.label": "Concierge Desk",
    "stat.wifi.val": "High-Speed",
    "stat.wifi.label": "Fiber Wi-Fi",
    "stat.comfort.val": "AC Suites",
    "stat.comfort.label": "Climate Control",

    // Fast Inquiry Bar
    "inquiry.title": "Check Availability",
    "inquiry.direct": "Direct Front Desk Confirmation",
    "inquiry.checkin": "Check-In",
    "inquiry.checkout": "Check-Out",
    "inquiry.room": "Suite Category",
    "inquiry.guests": "Guests",
    "inquiry.roomSelect.all": "All Suites",
    "inquiry.roomSelect.deluxe": "Deluxe Twin Room (৳3,400)",
    "inquiry.roomSelect.premium": "Premium Twin Room (৳4,500)",
    "inquiry.roomSelect.triple": "Triple Family Suite (৳3,850)",
    "inquiry.btn": "Check Availability",

    // About
    "about.tag": "The Property",
    "about.title": "Where Discreet Comfort Meets Rajshahi Heritage",
    "about.p1": "Positioned at Batar More, moments from the historic Padma River promenade and silk markets, Hotel Mukta International provides a peaceful sanctuary for discerning business and leisure guests.",
    "about.p2": "Experience quietly appointed air-conditioned suites, round-the-clock personalized service, and genuine warmth crafted for restful stays.",
    "about.f1.title": "Prime Location",
    "about.f1.desc": "Shaheb Bazar, Silk District & rail transit within minutes.",
    "about.f2.title": "24-Hour Concierge",
    "about.f2.desc": "Dedicated room dining, morning refreshments & front desk.",
    "about.f3.title": "Curated Suites",
    "about.f3.desc": "Generously proportioned twin and family suites.",
    "about.f4.title": "Peace of Mind",
    "about.f4.desc": "24/7 monitored premises and discreet guest privacy.",
    "about.badge.title": "Boutique Hospitality",
    "about.badge.desc": "Rajshahi, Bangladesh",

    // Rooms
    "rooms.tag": "Accommodations",
    "rooms.title": "Suites & Guest Rooms",
    "rooms.subtitle": "Thoughtfully appointed spaces designed for restful quiet and effortless productivity.",
    "room.perNight": "Per Night",
    "room.btnWa": "Reserve via WhatsApp",
    "room.btnDetails": "Specs",
    "room.freeCancel": "Complimentary Cancellation",

    // Room 1: Deluxe Twin
    "room.deluxe.title": "Deluxe Twin Room",
    "room.deluxe.desc": "Two single beds with crisp linens, executive work desk, split AC, and private bath.",
    "room.deluxe.beds": "2 Single Beds",
    "room.deluxe.guests": "2 Guests",
    "room.deluxe.price": "৳ 3,400",
    "room.deluxe.ref": "~$31 USD",

    // Room 2: Premium Twin
    "room.premium.title": "Premium Twin Room",
    "room.premium.desc": "Spacious layout with luxury bedding, whisper AC, satellite entertainment, and refrigerator.",
    "room.premium.beds": "2 Luxury Beds",
    "room.premium.guests": "2 Guests",
    "room.premium.price": "৳ 4,500",
    "room.premium.ref": "~$41 USD",

    // Room 3: Triple Room
    "room.triple.title": "Triple Family Suite",
    "room.triple.desc": "Generously proportioned family suite accommodating three guests with full climate control.",
    "room.triple.beds": "3 Beds / Family Setup",
    "room.triple.guests": "3 Guests",
    "room.triple.price": "৳ 3,850",
    "room.triple.ref": "~$35 USD",

    // Amenities
    "amenities.tag": "Hospitality",
    "amenities.title": "Curated Amenities",
    "amenities.subtitle": "Every detail considered for an effortless, restorative stay.",
    "amenity.fd.title": "24-Hour Concierge",
    "amenity.fd.desc": "Dedicated round-the-clock reception & local guidance.",
    "amenity.wifi.title": "High-Speed Wi-Fi",
    "amenity.wifi.desc": "Complimentary high-speed fiber throughout property.",
    "amenity.ac.title": "Climate Control",
    "amenity.ac.desc": "Whisper-quiet split air conditioning in every suite.",
    "amenity.dine.title": "In-Room Dining",
    "amenity.dine.desc": "Authentic regional cuisine & breakfast delivered fresh.",
    "amenity.prayer.title": "Prayer Facilities",
    "amenity.prayer.desc": "Clean prayer mats & Qibla directional guidance.",
    "amenity.conf.title": "Executive Gatherings",
    "amenity.conf.desc": "Convenient meeting area for corporate discussions.",
    "amenity.park.title": "Secure Parking",
    "amenity.park.desc": "Dedicated on-premise vehicle & motorcycle spaces.",
    "amenity.clean.title": "Housekeeping",
    "amenity.clean.desc": "Daily linen refresh and professional valet care.",
    "amenity.sec.title": "24/7 Monitored Safety",
    "amenity.sec.desc": "Comprehensive CCTV and round-the-clock safety.",

    // Gallery
    "gallery.tag": "Visuals",
    "gallery.title": "Property Gallery",
    "gallery.subtitle": "Real glimpses of our suites, reception, and exterior facade.",
    "gallery.filter.all": "All",
    "gallery.filter.rooms": "Suites",
    "gallery.filter.lobby": "Lobby & Reception",
    "gallery.filter.exterior": "Exterior",

    // Location
    "location.tag": "Location",
    "location.title": "At the City's Epicenter",
    "location.subtitle": "Positioned at Batar More, Shaheb Bazar with immediate access to Rajshahi's key destinations.",
    "location.addressTitle": "Hotel Mukta International",
    "location.dirBtn": "Directions on Google Maps",
    "landmark.padma": "Padma River Waterfront Promenade",
    "landmark.padma.dist": "5 mins",
    "landmark.station": "Rajshahi Railway Station",
    "landmark.station.dist": "10 mins",
    "landmark.varendra": "Varendra Research Museum",
    "landmark.varendra.dist": "7 mins",
    "landmark.ru": "Rajshahi University Campus",
    "landmark.ru.dist": "15 mins",
    "landmark.silk": "Rajshahi Silk City Showrooms",
    "landmark.silk.dist": "6 mins",

    // Contact
    "contact.tag": "Reservations",
    "contact.title": "Direct Concierge Inquiries",
    "contact.subtitle": "Connect directly with our reservation desk via WhatsApp or phone for immediate confirmation and best rates.",
    "contact.boxTitle": "WhatsApp Reservation Request",
    "contact.boxDesc": "Select your dates and desired suite below to connect directly with front desk.",
    "contact.guestName": "Guest Name",
    "contact.phone": "Mobile Contact",
    "contact.note": "Special Requests (Optional)",
    "contact.sendWa": "Send Reservation Inquiry",
    "contact.hotlineTitle": "Primary WhatsApp Concierge",
    "contact.phoneTitle": "Front Desk 24/7 Hotline",
    "contact.emailTitle": "Corporate & Group Bookings",
    "contact.addrTitle": "Property Address",

    // Floating & Modals
    "floating.wa": "Concierge",
    "modal.close": "Close",
    "modal.waBook": "Reserve This Suite on WhatsApp"
  },

  bn: {
    // Nav
    "nav.home": "হোম",
    "nav.about": "পরিচিতি",
    "nav.rooms": "রুম ও স্যুট",
    "nav.amenities": "সুবিধাসমূহ",
    "nav.gallery": "গ্যালারি",
    "nav.location": "লোকেশন",
    "nav.contact": "রিজার্ভেশন",
    "nav.call": "০১৭১১-৩০২৩২২",
    "nav.bookWa": "হোয়াটসঅ্যাপে বুকিং",

    // Hero
    "hero.badge": "হোটেল মুক্তা ইন্টারন্যাশনাল · রাজশাহী",
    "hero.title": "রাজশাহীর প্রাণকেন্দ্রে শান্ত আভিজাত্য",
    "hero.desc": "বাটার মোড়, সাহেব বাজার সংলগ্ন। আধুনিক প্রশান্তি ও আন্তরিক সেবার মেলবন্ধন।",
    "hero.ctaReserve": "হোয়াটসঅ্যাপে বুকিং",
    "hero.ctaExplore": "রুম ও স্যুটসমূহ",

    // Stats
    "stat.location.val": "সাহেব বাজার",
    "stat.location.label": "মূল কেন্দ্রস্থল",
    "stat.desk.val": "২৪ / ৭",
    "stat.desk.label": "ফ্রন্ট ডেস্ক",
    "stat.wifi.val": "হাই-স্পিড",
    "stat.wifi.label": "ওয়াই-ফাই",
    "stat.comfort.val": "এসি স্যুট",
    "stat.comfort.label": "শীতাতপ নিয়ন্ত্রিত",

    // Fast Inquiry Bar
    "inquiry.title": "প্রাপ্যতা যাচাই",
    "inquiry.direct": "সরাসরি ফ্রন্ট ডেস্ক কনফার্মেশন",
    "inquiry.checkin": "চেক-ইন",
    "inquiry.checkout": "চেক-আউট",
    "inquiry.room": "রুমের ধরন",
    "inquiry.guests": "অতিথি",
    "inquiry.roomSelect.all": "সকল স্যুট",
    "inquiry.roomSelect.deluxe": "ডিলাক্স টুইন রুম (৳৩,৪০০)",
    "inquiry.roomSelect.premium": "প্রিমিয়াম টুইন রুম (৳৪,৫০০)",
    "inquiry.roomSelect.triple": "ট্রিপল ফ্যামিলি স্যুট (৳৩,৮৫০)",
    "inquiry.btn": "প্রাপ্যতা যাচাই করুন",

    // About
    "about.tag": "পরিচিতি",
    "about.title": "পদ্মাপাড়ের রাজশাহী শহরে মার্জিত আতিথেয়তা",
    "about.p1": "পদ্মা নদীর পাড় ও ঐতিহ্যবাহী সিল্ক মার্কেটের নিকটবর্তী বাটার মোড়ে অবস্থিত হোটেল মুক্তা ইন্টারন্যাশনাল। ব্যবসায়িক ও পারিবারিক ভ্রমণার্থীদের জন্য একটি শান্ত ও নির্ভরযোগ্য ঠিকানা।",
    "about.p2": "শীতাতপ নিয়ন্ত্রিত আধুনিক রুম, সার্বক্ষণিক ফ্রন্ট ডেস্ক সেবা ও আন্তরিক আতিথেয়তার সাথে উপভোগ করুন নির্ঝঞ্ঝাট বিশ্রাম।",
    "about.f1.title": "কেন্দ্রীয় অবস্থান",
    "about.f1.desc": "সাহেব বাজার, সিল্ক শোরুম ও স্টেশন খুব কাছেই।",
    "about.f2.title": "২৪ ঘণ্টা সার্ভিস",
    "about.f2.desc": "রুম ডাইনিং ও সার্বক্ষণিক ফ্রন্ট ডেস্ক সহায়তা।",
    "about.f3.title": "পরিপাটি স্যুট",
    "about.f3.desc": "টুইন ও পারিবারিক আবাসন ব্যবস্থা।",
    "about.f4.title": "নিরাপদ পরিবেশ",
    "about.f4.desc": "সার্বক্ষণিক সিসিটিভি ও নিশ্ছিদ্র নিরাপত্তা।",
    "about.badge.title": "বিশ্বস্ত আতিথেয়তা",
    "about.badge.desc": "রাজশাহী, বাংলাদেশ",

    // Rooms
    "rooms.tag": "আমাদের রুমসমূহ",
    "rooms.title": "রুম ও স্যুটসমূহ",
    "rooms.subtitle": "শীতাতপ নিয়ন্ত্রণ, দ্রুতগতির ওয়াই-ফাই ও আধুনিক বাথরুম সম্বলিত সুসজ্জিত শান্ত পরিবেশ।",
    "room.perNight": "প্রতি রাত",
    "room.btnWa": "হোয়াটসঅ্যাপে বুকিং",
    "room.btnDetails": "বিস্তারিত",
    "room.freeCancel": "ফ্রি ক্যান্সেলেশন সুবিধা",

    // Room 1: Deluxe Twin
    "room.deluxe.title": "ডিলাক্স টুইন রুম",
    "room.deluxe.desc": "দুটি আরামদায়ক সিঙ্গেল বেড, পড়ার টেবিল, স্প্লিট এসি ও পরিচ্ছন্ন বাথরুম।",
    "room.deluxe.beds": "২টি সিঙ্গেল বেড",
    "room.deluxe.guests": "২ জন অতিথি",
    "room.deluxe.price": "৳ ৩,৪০০",
    "room.deluxe.ref": "~$৩১ USD",

    // Room 2: Premium Twin
    "room.premium.title": "প্রিমিয়াম টুইন রুম",
    "room.premium.desc": "উন্নত আসবাবপত্র, নীরব এসি, স্যাটেলাইট টেলিভিশন ও ফ্রিজ সম্বলিত পরিপাটি রুম।",
    "room.premium.beds": "২টি প্রিমিয়াম বেড",
    "room.premium.guests": "২ জন অতিথি",
    "room.premium.price": "৳ ৪,৫০০",
    "room.premium.ref": "~$৪১ USD",

    // Room 3: Triple Room
    "room.triple.title": "ট্রিপল ফ্যামিলি স্যুট",
    "room.triple.desc": "তিনজন অতিথির জন্য আরামদায়ক সুপ্রশস্ত পারিবারিক স্যুট ও কার্যকর এসি সুবিধা।",
    "room.triple.beds": "৩ জনের বেড সেটআপ",
    "room.triple.guests": "৩ জন অতিথি",
    "room.triple.price": "৳ ৩,৮৫০",
    "room.triple.ref": "~$৩৫ USD",

    // Amenities
    "amenities.tag": "সুযোগ-সুবিধা",
    "amenities.title": "অতিথি সুবিধাসমূহ",
    "amenities.subtitle": "আপনার প্রতিটি মুহূর্তকে স্বাচ্ছন্দ্যময় করতে আমাদের আন্তরিক আয়োজন।",
    "amenity.fd.title": "২৪ ঘণ্টা কনসিয়ার্জ",
    "amenity.fd.desc": "সার্বক্ষণিক ফ্রন্ট ডেস্ক সহায়তা ও স্থানীয় তথ্য।",
    "amenity.wifi.title": "হাই-স্পিড ওয়াই-ফাই",
    "amenity.wifi.desc": "পুরো হোটেল জুড়ে দ্রুতগতির ফাইবার ইন্টারনেট।",
    "amenity.ac.title": "শীতাতপ নিয়ন্ত্রণ",
    "amenity.ac.desc": "প্রতিটি রুমে শান্ত ও কার্যকর স্প্লিট এসি।",
    "amenity.dine.title": "ইন-রুম ডাইনিং",
    "amenity.dine.desc": "সুস্বাদু দেশীয় খাবার ও ফ্রেশ নাস্তা।",
    "amenity.prayer.title": "ইবাদতের ব্যবস্থা",
    "amenity.prayer.desc": "পরিচ্ছন্ন জায়নামাজ ও কিবলা দিকনির্দেশনা।",
    "amenity.conf.title": "মিটিং স্পেস",
    "amenity.conf.desc": "ব্যবসায়িক আলোচনা ও অফিসিয়াল মিটিং সুবিধা।",
    "amenity.park.title": "নিরাপদ পার্কিং",
    "amenity.park.desc": "মোটরসাইকেল ও প্রাইভেট কারের জন্য পার্কিং।",
    "amenity.clean.title": "হাউসকিপিং",
    "amenity.clean.desc": "নিয়মিত পরিচ্ছন্নতা ও লন্ড্রি সেবা।",
    "amenity.sec.title": "২৪/৭ নিরাপত্তা",
    "amenity.sec.desc": "সিসিটিভি নজরদারি ও নিবেদিত সিকিউরিটি।",

    // Gallery
    "gallery.tag": "চিত্রশালা",
    "gallery.title": "ফটোগ্রাফি গ্যালারি",
    "gallery.subtitle": "আমাদের রুম, রিসেপশন ও ভবনের বাস্তব চিত্র।",
    "gallery.filter.all": "সব ছবি",
    "gallery.filter.rooms": "স্যুটসমূহ",
    "gallery.filter.lobby": "লবি ও রিসেপশন",
    "gallery.filter.exterior": "ভবন",

    // Location
    "location.tag": "অবস্থান",
    "location.title": "শহরের মূল কেন্দ্রে",
    "location.subtitle": "বাটার মোড়, সাহেব বাজার — প্রধান দর্শনীয় স্থান ও যাতায়াত ব্যবস্থার খুব কাছে।",
    "location.addressTitle": "হোটেল মুক্তা ইন্টারন্যাশনাল",
    "location.dirBtn": "গুগল ম্যাপে লোকেশন",
    "landmark.padma": "পদ্মা নদীর পাড় ও টি-বাঁধ",
    "landmark.padma.dist": "৫ মিনিট",
    "landmark.station": "রাজশাহী রেলওয়ে স্টেশন",
    "landmark.station.dist": "১০ মিনিট",
    "landmark.varendra": "বরেন্দ্র গবেষণা জাদুঘর",
    "landmark.varendra.dist": "৭ মিনিট",
    "landmark.ru": "রাজশাহী বিশ্ববিদ্যালয় ক্যাম্পাস",
    "landmark.ru.dist": "১৫ মিনিট",
    "landmark.silk": "রাজশাহী সিল্ক শোরুম",
    "landmark.silk.dist": "৬ মিনিট",

    // Contact
    "contact.tag": "রিজার্ভেশন",
    "contact.title": "সরাসরি বুকিং ও তথ্য",
    "contact.subtitle": "সেরা রেট ও তাৎক্ষণিক কনফার্মেশনের জন্য সরাসরি হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করুন।",
    "contact.boxTitle": "হোয়াটসঅ্যাপে রিজার্ভেশন",
    "contact.boxDesc": "আপনার কাঙ্ক্ষিত তারিখ ও তথ্য দিয়ে সরাসরি ফ্রন্ট ডেস্কে পাঠান।",
    "contact.guestName": "আপনার নাম",
    "contact.phone": "মোবাইল নম্বর",
    "contact.note": "বিশেষ প্রয়োজন (ঐচ্ছিক)",
    "contact.sendWa": "ইনকোয়ারি পাঠান",
    "contact.hotlineTitle": "প্রধান হোয়াটসঅ্যাপ কনসিয়ার্জ",
    "contact.phoneTitle": "ফ্রন্ট ডেস্ক ২৪/৭ হটলাইন",
    "contact.emailTitle": "কর্পোরেট ও গ্রুপ বুকিং",
    "contact.addrTitle": "হোটেলের ঠিকানা",

    // Floating & Modals
    "floating.wa": "কনসিয়ার্জ",
    "modal.close": "বন্ধ করুন",
    "modal.waBook": "এই রুমটি বুক করুন"
  }
};

// Room Detailed Specifications
const ROOM_DATABASE = {
  deluxe: {
    id: "deluxe",
    nameEn: "Deluxe Twin Room",
    nameBn: "ডিলাক্স টুইন রুম",
    priceBdt: "৳ 3,400",
    priceUsd: "$31.00",
    image: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_deluxetwin_hotelplacer.com.jpg",
    capacityEn: "2 Adults (Twin Bedding)",
    capacityBn: "২ জন প্রাপ্তবয়স্ক (টুইন বেড)",
    size: "220 sq.ft",
    amenitiesEn: [
      "Split Air Conditioning",
      "High-Speed Fiber Wi-Fi",
      "HD Flat-Screen Television",
      "Executive Desk with Electrical Outlet",
      "Refrigerator & Mini Bar Shelf",
      "Clean Prayer Mats Available",
      "Satellite TV Channels (ESPN, CNN)",
      "Attached Bathroom with Toiletries",
      "24-Hour Hot & Cold Water"
    ],
    amenitiesBn: [
      "স্প্লিট এয়ার কন্ডিশনার",
      "উচ্চগতির ফাইবার ওয়াই-ফাই",
      "এইচডি ফ্ল্যাট প্যানেল টিভি",
      "ইলেকট্রিক প্লাগসহ পড়ার/কাজের টেবিল",
      "রেফ্রিজারেটর",
      "পরিচ্ছন্ন জায়নামাজ",
      "স্যাটেলাইট টেলিভিশন সংযোগ",
      "সংযুক্ত বাথরুম ও টয়লেট্রিজ",
      "২৪ ঘণ্টা গরম ও ঠান্ডা পানি"
    ]
  },
  premium: {
    id: "premium",
    nameEn: "Premium Twin Room",
    nameBn: "প্রিমিয়াম টুইন রুম",
    priceBdt: "৳ 4,500",
    priceUsd: "$41.00",
    image: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_premiumtwin_hotelplacer.com.jpg",
    capacityEn: "2 Adults (Luxury Bedding)",
    capacityBn: "২ জন প্রাপ্তবয়স্ক (প্রিমিয়াম বেড)",
    size: "260 sq.ft",
    amenitiesEn: [
      "Enhanced Quiet Split Air Conditioning",
      "High-Speed Fiber Wi-Fi",
      "HD Flat-Screen Television with Cable",
      "Large Work Desk with Multi-Plug Sockets",
      "Compact Refrigerator",
      "Prayer Mats & Qibla Compass Guide",
      "Deluxe Bed Linens & Pillows",
      "Modern Bathroom with Luxury Toiletries",
      "Daily Morning Tea / Coffee Amenities"
    ],
    amenitiesBn: [
      "নীরব স্প্লিট এয়ার কন্ডিশনার",
      "উচ্চগতির ফাইবার ওয়াই-ফাই",
      "এইচডি ফ্ল্যাট স্ক্রিন টেলিভিশন",
      "বড় পড়ার টেবিল ও মাল্টিপ্লাগ সকেট",
      "কম্প্যাক্ট রেফ্রিজারেটর",
      "জায়নামাজ ও কিবলা দিকনির্দেশনা",
      "উন্নত মানের পরিষ্কার চাদর ও বালিশ",
      "আধুনিক বাথরুম ও বিশেষ টয়লেট্রিজ",
      "সকালের চা/কফি তৈরির সুযোগ"
    ]
  },
  triple: {
    id: "triple",
    nameEn: "Triple Room / Family Suite",
    nameBn: "ট্রিপল রুম / ফ্যামিলি স্যুট",
    priceBdt: "৳ 3,850",
    priceUsd: "$35.00",
    image: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_triple_hotelplacer.com.jpeg",
    capacityEn: "3 Guests (Family Setup)",
    capacityBn: "৩ জন অতিথি (ফ্যামিলি সেটআপ)",
    size: "290 sq.ft",
    amenitiesEn: [
      "Heavy-Duty Air Conditioning",
      "High-Speed Fiber Wi-Fi",
      "HD Television with Satellite Entertainment",
      "Family Seating Area & Desk",
      "Refrigerator",
      "Prayer Mats for Family Use",
      "Spacious Wardrobe & Storage",
      "Attached Private Bathroom with Geyser",
      "24-Hour Room Service Access"
    ],
    amenitiesBn: [
      "ক্ষমতাশালী এসি ইউনিট",
      "উচ্চগতির ফাইবার ওয়াই-ফাই",
      "স্যাটেলাইট চ্যানেলসহ এইচডি টিভি",
      "পারিবারিক বসার জায়গা ও টেবিল",
      "রেফ্রিজারেটর",
      "পরিবারের জন্য পরিচ্ছন্ন জায়নামাজ",
      "সুপ্রশস্ত ওয়্যারড্রোব ও লাগেজ স্পেস",
      "গিজারযুক্ত প্রাইভেট বাথরুম",
      "২৪ ঘণ্টা রুম সার্ভিসের সুবিধা"
    ]
  }
};

// Gallery Images List
const GALLERY_ITEMS = [
  {
    category: "exterior",
    thumb: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_exterior_hotelplacer.com.jpg",
    titleEn: "Hotel Mukta International Facade",
    titleBn: "হোটেল মুক্তা ইন্টারন্যাশনাল ভবন",
    subEn: "Batar More, Rajshahi City",
    subBn: "বাটার মোড়, রাজশাহী শহর"
  },
  {
    category: "lobby",
    thumb: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_reception_hotelplacer.com.jpg",
    titleEn: "24/7 Reception & Front Desk",
    titleBn: "২৪ ঘণ্টা ফ্রন্ট ডেস্ক ও রিসেপশন",
    subEn: "Attentive Guest Concierge",
    subBn: "অতিথিদের আন্তরিক অভ্যর্থনা"
  },
  {
    category: "lobby",
    thumb: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_lobby_hotelplacer.com.jpg",
    titleEn: "Guest Lobby & Waiting Lounge",
    titleBn: "গেস্ট লবি ও বিশ্রাম লাউঞ্জ",
    subEn: "Spacious & Comfortable",
    subBn: "পরিপাটি ও আরামদায়ক পরিবেশ"
  },
  {
    category: "rooms",
    thumb: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_deluxetwin_hotelplacer.com.jpg",
    titleEn: "Deluxe Twin Room",
    titleBn: "ডিলাক্স টুইন রুম",
    subEn: "Air-Conditioned with Twin Beds",
    subBn: "শীতাতপ নিয়ন্ত্রিত টুইন বেড"
  },
  {
    category: "rooms",
    thumb: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_premiumtwin_hotelplacer.com.jpg",
    titleEn: "Premium Twin Room",
    titleBn: "প্রিমিয়াম টুইন রুম",
    subEn: "Luxury Furnished Stay",
    subBn: "অভিজাত আসবাবপত্রে সাজানো রুম"
  },
  {
    category: "rooms",
    thumb: "https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_triple_hotelplacer.com.jpeg",
    titleEn: "Triple Room / Family Suite",
    titleBn: "ট্রিপল রুম / ফ্যামিলি স্যুট",
    subEn: "Spacious for 3 Guests",
    subBn: "৩ জনের জন্য সুপ্রশস্ত রুম"
  },
  {
    category: "exterior",
    thumb: "https://lh3.googleusercontent.com/grass-cs/AABkmLfo00ythjjsv_Y9mMEHYBMw1G0I_wi3ta9t0jCyQkeTpm5DhBetOHs5kCO8OZHJSfu-ExayPOU64r2FltXQGZaWW5Dnvar8IyQJ4xuqG9x0HNPT_HaFCLxMj_ioGUK4zPymJlSG=w1200-h800-k-no",
    titleEn: "Hotel Location & City View",
    titleBn: "হোটেল অবস্থান ও শহরের দৃশ্য",
    subEn: "Central Rajshahi Metropolis",
    subBn: "রাজশাহীর প্রাণকেন্দ্র"
  }
];

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initDatePickers();
  initHeaderScroll();
  initMobileNav();
  initGallery();
  initWhatsAppForms();
  initBackToTop();
  setupSmoothScroll();
});

// --- Language Engine ---
function initLanguage() {
  setLanguage(state.currentLang);

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = state.currentLang === 'en' ? 'bn' : 'en';
      setLanguage(newLang);
    });
  }
}

function setLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('hmi_lang', lang);

  if (lang === 'bn') {
    document.body.classList.add('lang-bn');
  } else {
    document.body.classList.remove('lang-bn');
  }

  // Update text for all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  // Update toggle button text
  const currentLangLabel = document.getElementById('currentLangLabel');
  if (currentLangLabel) {
    currentLangLabel.textContent = lang === 'en' ? 'বাংলা' : 'English';
  }
}

// --- WhatsApp Message Generator & Sender ---
function sendWhatsAppBooking({ roomType = '', checkIn = '', checkOut = '', guests = '', name = '', phone = '', note = '' }) {
  const isBn = state.currentLang === 'bn';

  let greeting = isBn 
    ? "আসসালামু আলাইকুম / নমস্কার হোটেল মুক্তা ইন্টারন্যাশনাল!"
    : "Hello Hotel Mukta International,";

  let bodyHeader = isBn
    ? "আমি আপনাদের হোটেলে একটি রুম বুকিং / ইনকোয়ারি করতে চাচ্ছি।"
    : "I would like to check availability and make a reservation at your hotel.";

  let detailsText = "";
  if (roomType) {
    detailsText += isBn ? `\n🏨 রুম: ${roomType}` : `\n🏨 Room: ${roomType}`;
  }
  if (checkIn) {
    detailsText += isBn ? `\n📅 চেক-ইন: ${checkIn}` : `\n📅 Check-in: ${checkIn}`;
  }
  if (checkOut) {
    detailsText += isBn ? `\n📅 চেক-আউট: ${checkOut}` : `\n📅 Check-out: ${checkOut}`;
  }
  if (guests) {
    detailsText += isBn ? `\n👥 অতিথি: ${guests}` : `\n👥 Guests: ${guests}`;
  }
  if (name) {
    detailsText += isBn ? `\n👤 নাম: ${name}` : `\n👤 Guest Name: ${name}`;
  }
  if (phone) {
    detailsText += isBn ? `\n📱 মোবাইল: ${phone}` : `\n📱 Contact: ${phone}`;
  }
  if (note) {
    detailsText += isBn ? `\n📝 বিশেষ নোট: ${note}` : `\n📝 Note: ${note}`;
  }

  let closing = isBn
    ? "\n\nঅনুগ্রহ করে রুমের বর্তমান প্রাপ্যতা ও বুকিং নিশ্চিতকরণের বিস্তারিত জানাবেন। ধন্যবাদ!"
    : "\n\nPlease let me know the availability and confirmation details. Thank you!";

  const fullMessage = `${greeting}\n${bodyHeader}${detailsText}${closing}`;
  const encoded = encodeURIComponent(fullMessage);
  const waUrl = `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encoded}`;

  window.open(waUrl, '_blank');
}

// Global hook for direct room booking buttons
window.bookRoomOnWhatsApp = function(roomId) {
  const room = ROOM_DATABASE[roomId];
  const isBn = state.currentLang === 'bn';
  const roomName = room ? (isBn ? room.nameBn : room.nameEn) : 'Room Reservation';

  // Read dates from top bar if selected
  const checkIn = document.getElementById('inquiryCheckin')?.value || '';
  const checkOut = document.getElementById('inquiryCheckout')?.value || '';

  sendWhatsAppBooking({
    roomType: roomName,
    checkIn: checkIn,
    checkOut: checkOut,
    guests: room ? (isBn ? room.capacityBn : room.capacityEn) : ''
  });
};

// Global hook for room detail modal
window.openRoomModal = function(roomId) {
  const room = ROOM_DATABASE[roomId];
  if (!room) return;

  const isBn = state.currentLang === 'bn';
  const modal = document.getElementById('roomDetailModal');
  const titleEl = document.getElementById('modalRoomTitle');
  const priceEl = document.getElementById('modalRoomPrice');
  const imgEl = document.getElementById('modalRoomImg');
  const sizeEl = document.getElementById('modalRoomSize');
  const capEl = document.getElementById('modalRoomCapacity');
  const amenitiesListEl = document.getElementById('modalRoomAmenities');
  const waBtnEl = document.getElementById('modalRoomWaBtn');

  if (titleEl) titleEl.textContent = isBn ? room.nameBn : room.nameEn;
  if (priceEl) priceEl.innerHTML = `${room.priceBdt} <span style="font-size:0.85rem; font-weight:400; color:var(--text-subtle);">/ night</span>`;
  if (imgEl) imgEl.src = room.image;
  if (sizeEl) sizeEl.textContent = room.size;
  if (capEl) capEl.textContent = isBn ? room.capacityBn : room.capacityEn;

  if (amenitiesListEl) {
    const list = isBn ? room.amenitiesBn : room.amenitiesEn;
    amenitiesListEl.innerHTML = list.map(item => `
      <li class="modal-amenity-item">
        <i class="fas fa-check-circle"></i>
        <span>${item}</span>
      </li>
    `).join('');
  }

  if (waBtnEl) {
    waBtnEl.onclick = () => {
      bookRoomOnWhatsApp(roomId);
    };
  }

  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
};

window.closeRoomModal = function() {
  const modal = document.getElementById('roomDetailModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
};

// --- Form Listeners ---
function initWhatsAppForms() {
  // Top Floating Inquiry Bar
  const inquiryForm = document.getElementById('topInquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkIn = document.getElementById('inquiryCheckin')?.value || '';
      const checkOut = document.getElementById('inquiryCheckout')?.value || '';
      const roomSelect = document.getElementById('inquiryRoomSelect');
      const roomText = roomSelect?.options[roomSelect.selectedIndex]?.text || '';
      const guests = document.getElementById('inquiryGuests')?.value || '2 Adults';

      sendWhatsAppBooking({
        roomType: roomText,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests
      });
    });
  }

  // Bottom Contact Section Form
  const contactForm = document.getElementById('contactWaForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const phone = document.getElementById('contactPhone')?.value || '';
      const roomType = document.getElementById('contactRoomSelect')?.value || '';
      const checkIn = document.getElementById('contactCheckin')?.value || '';
      const checkOut = document.getElementById('contactCheckout')?.value || '';
      const note = document.getElementById('contactNote')?.value || '';

      sendWhatsAppBooking({
        name: name,
        phone: phone,
        roomType: roomType,
        checkIn: checkIn,
        checkOut: checkOut,
        note: note
      });
    });
  }
}

// --- Date Helper Default Setter ---
function initDatePickers() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const checkinInputs = [document.getElementById('inquiryCheckin'), document.getElementById('contactCheckin')];
  const checkoutInputs = [document.getElementById('inquiryCheckout'), document.getElementById('contactCheckout')];

  checkinInputs.forEach(input => {
    if (input) {
      input.value = formatDate(today);
      input.min = formatDate(today);
    }
  });

  checkoutInputs.forEach(input => {
    if (input) {
      input.value = formatDate(tomorrow);
      input.min = formatDate(tomorrow);
    }
  });
}

// --- Header Scroll & Mobile Nav ---
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
}

// --- Photo Gallery & Lightbox ---
function initGallery() {
  renderGallery('all');

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';
      renderGallery(cat);
    });
  });

  // Lightbox Close
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const lightbox = document.getElementById('galleryLightbox');
  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRoomModal();
      if (lightbox) {
        lightbox.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    }
  });
}

function renderGallery(category) {
  const container = document.getElementById('galleryMasonry');
  if (!container) return;

  const isBn = state.currentLang === 'bn';
  const filtered = category === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === category);

  container.innerHTML = filtered.map((item, idx) => `
    <div class="gallery-item" onclick="openLightbox(${idx}, '${category}')">
      <img src="${item.thumb}" alt="${isBn ? item.titleBn : item.titleEn}" class="gallery-thumb" loading="lazy">
      <div class="gallery-overlay">
        <span class="gallery-caption-cat">${item.category.toUpperCase()}</span>
        <h4 class="gallery-caption-title">${isBn ? item.titleBn : item.titleEn}</h4>
      </div>
    </div>
  `).join('');
}

window.openLightbox = function(index, category = 'all') {
  const filtered = category === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === category);
  const item = filtered[index];
  if (!item) return;

  const lightbox = document.getElementById('galleryLightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const isBn = state.currentLang === 'bn';

  if (img) img.src = item.thumb;
  if (caption) caption.textContent = isBn ? item.titleBn : item.titleEn;
  if (lightbox) {
    lightbox.classList.add('active');
    document.body.classList.add('modal-open');
  }
};

// --- Back to Top ---
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Smooth Anchor Navigation ---
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 84;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
