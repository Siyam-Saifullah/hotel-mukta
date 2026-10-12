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
    "nav.about": "About",
    "nav.rooms": "Rooms & Rates",
    "nav.amenities": "Amenities",
    "nav.gallery": "Gallery",
    "nav.location": "Location",
    "nav.contact": "Contact",
    "nav.call": "Call: 01711-302322",
    "nav.bookWa": "Book via WhatsApp",

    // Hero
    "hero.badge": "★ Premier Hospitality in Rajshahi City",
    "hero.title": "Experience Refined Comfort in the Heart of Rajshahi",
    "hero.desc": "Conveniently situated at Batar More, Shaheb Bazar. Enjoy modern air-conditioned rooms, 24/7 personalized service, high-speed Wi-Fi, and authentic warm hospitality.",
    "hero.ctaReserve": "Reserve on WhatsApp",
    "hero.ctaExplore": "Explore Rooms & Rates",

    // Stats
    "stat.location.val": "Prime Batar More",
    "stat.location.label": "Heart of Rajshahi",
    "stat.desk.val": "24 / 7 Front Desk",
    "stat.desk.label": "Always Available",
    "stat.wifi.val": "High-Speed Wi-Fi",
    "stat.wifi.label": "Complimentary",
    "stat.comfort.val": "Premium Rooms",
    "stat.comfort.label": "AC & Family Suites",

    // Fast Inquiry Bar
    "inquiry.title": "Check Availability & Fast WhatsApp Inquiry",
    "inquiry.direct": "Direct WhatsApp Confirmation with Front Desk",
    "inquiry.checkin": "Check-In Date",
    "inquiry.checkout": "Check-Out Date",
    "inquiry.room": "Room Category",
    "inquiry.guests": "Guests",
    "inquiry.roomSelect.all": "All Room Types",
    "inquiry.roomSelect.deluxe": "Deluxe Twin Room (৳3,400 / $31)",
    "inquiry.roomSelect.premium": "Premium Twin Room (৳4,500 / $41)",
    "inquiry.roomSelect.triple": "Triple Room / Family (৳3,850 / $35)",
    "inquiry.btn": "Inquire via WhatsApp",

    // About
    "about.tag": "Welcome to Hotel Mukta",
    "about.title": "Your Serene Sanctuary in Vibrant Rajshahi",
    "about.p1": "Hotel Mukta International stands proudly in the historic and bustling hub of Rajshahi. Whether you are traveling for business, university engagements, or exploring the iconic Padma River bank and Rajshahi silk heritage, our property offers prime accessibility with quiet comfort.",
    "about.p2": "We feature tastefully decorated air-conditioned rooms, round-the-clock front desk assistance, complimentary high-speed internet, on-site dining, and sincere hospitality that makes you feel at home.",
    "about.f1.title": "Central City Access",
    "about.f1.desc": "Steps from Shaheb Bazar, Silk Showrooms & Transport hubs.",
    "about.f2.title": "24-Hour Room Service",
    "about.f2.desc": "Hot food, tea/coffee & concierge ready any time.",
    "about.f3.title": "Family & Business Suites",
    "about.f3.desc": "Spacious twin and triple bed accommodations.",
    "about.f4.title": "Guaranteed Security",
    "about.f4.desc": "24/7 CCTV surveillance & dedicated safety protocol.",
    "about.badge.title": "Renowned Rajshahi Stay",
    "about.badge.desc": "Comfort & value in prime location",

    // Rooms
    "rooms.tag": "Accommodations",
    "rooms.title": "Thoughtfully Designed Rooms & Suites",
    "rooms.subtitle": "Every room is equipped with split air conditioning, high-speed Wi-Fi, flat-panel television, work desk, refrigerator, prayer mats, and immaculate private bathrooms.",
    "room.perNight": "Per Night",
    "room.btnWa": "Reserve via WhatsApp",
    "room.btnDetails": "Quick Specs",
    "room.freeCancel": "Free Cancellation Available",

    // Room 1: Deluxe Twin
    "room.deluxe.title": "Deluxe Twin Room",
    "room.deluxe.desc": "Ideal for colleagues or friends traveling together. Features two comfortable single beds, work desk with electrical outlets, and refreshing air-conditioning.",
    "room.deluxe.beds": "2 Single Beds",
    "room.deluxe.guests": "2 Guests",
    "room.deluxe.price": "৳ 3,400",
    "room.deluxe.ref": "~$31.00 USD",

    // Room 2: Premium Twin
    "room.premium.title": "Premium Twin Room",
    "room.premium.desc": "An elevated stay with superior furnishings, premium linens, enhanced space, HD satellite entertainment, refrigerator, and quiet ambient lighting.",
    "room.premium.beds": "2 Luxury Beds",
    "room.premium.guests": "2 Guests",
    "room.premium.price": "৳ 4,500",
    "room.premium.ref": "~$41.00 USD",

    // Room 3: Triple Room
    "room.triple.title": "Triple Room / Family Suite",
    "room.triple.desc": "Generously proportioned room tailored for families or small groups of up to three guests, featuring full climate control and seating area.",
    "room.triple.beds": "3 Beds / Family Setup",
    "room.triple.guests": "3 Guests",
    "room.triple.price": "৳ 3,850",
    "room.triple.ref": "~$35.00 USD",

    // Amenities
    "amenities.tag": "Property Highlights",
    "amenities.title": "Curated Amenities for a Seamless Stay",
    "amenities.subtitle": "Everything you need for a restful, productive visit to Rajshahi city.",
    "amenity.fd.title": "24-Hour Front Desk",
    "amenity.fd.desc": "Friendly reception staff ready to assist with check-in, local guidance, and transport any time of day or night.",
    "amenity.wifi.title": "High-Speed Wi-Fi",
    "amenity.wifi.desc": "Uninterrupted fiber-optic wireless connectivity across all rooms and public lounges for work or entertainment.",
    "amenity.ac.title": "Air Conditioning",
    "amenity.ac.desc": "Whisper-quiet climate control in every room ensuring comfort through every Rajshahi season.",
    "amenity.dine.title": "Restaurant & Room Service",
    "amenity.dine.desc": "Savory local Bengali dishes and breakfast delivered fresh to your room or enjoyed in our dining space.",
    "amenity.prayer.title": "Prayer Mats & Direction",
    "amenity.prayer.desc": "Clean prayer mats and Qibla directional guidance readily provided in every guest room upon request.",
    "amenity.conf.title": "Meeting & Banquet Space",
    "amenity.conf.desc": "Convenient space for business gatherings, family discussions, or corporate travel delegations.",
    "amenity.park.title": "Free Parking",
    "amenity.park.desc": "Safe motorcycle and car parking options with convenient access for all residing guests.",
    "amenity.clean.title": "Daily Housekeeping & Laundry",
    "amenity.clean.desc": "Fresh linens, crisp towels, and express laundry and valet services whenever required.",
    "amenity.sec.title": "24/7 Security & Safe",
    "amenity.sec.desc": "Round-the-clock surveillance cameras, electronic safety measures, and dedicated night security.",

    // Gallery
    "gallery.tag": "Visual Tour",
    "gallery.title": "Hotel Mukta International Gallery",
    "gallery.subtitle": "Explore our real facade, welcoming reception lobby, and comfortable guest suites.",
    "gallery.filter.all": "All Photos",
    "gallery.filter.rooms": "Rooms",
    "gallery.filter.lobby": "Lobby & Reception",
    "gallery.filter.exterior": "Exterior",

    // Location
    "location.tag": "City Location",
    "location.title": "Easily Accessible in Rajshahi",
    "location.subtitle": "Located at Batar More, Shaheb Bazar — placing you within minutes of Rajshahi's premier attractions, educational hubs, and transport terminals.",
    "location.addressTitle": "Hotel Mukta International",
    "location.dirBtn": "Get Directions on Google Maps",
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
    "contact.tag": "Get in Touch",
    "contact.title": "Direct Reservations & Inquiries",
    "contact.subtitle": "We do not require online credit card payments on our website. Connect directly with our front desk team via WhatsApp or phone for immediate confirmation and best rates.",
    "contact.boxTitle": "Personalized WhatsApp Booking",
    "contact.boxDesc": "Select your dates and desired room below. Clicking send will open WhatsApp directly with our reservation desk with your request pre-typed.",
    "contact.guestName": "Your Name",
    "contact.phone": "Mobile Number",
    "contact.note": "Special Requests (Optional)",
    "contact.sendWa": "Send Inquiry to WhatsApp (01711302322)",
    "contact.hotlineTitle": "Primary WhatsApp Hotline",
    "contact.phoneTitle": "Front Desk Landline / Mobile",
    "contact.emailTitle": "Email Inquiry",
    "contact.addrTitle": "Hotel Address",

    // Floating & Modals
    "floating.wa": "Chat & Book",
    "modal.close": "Close",
    "modal.waBook": "Book This Room on WhatsApp"
  },

  bn: {
    // Nav
    "nav.home": "হোম",
    "nav.about": "পরিচিতি",
    "nav.rooms": "রুম ও ভাড়া",
    "nav.amenities": "সুযোগ-সুবিধা",
    "nav.gallery": "গ্যালারি",
    "nav.location": "লোকেশন",
    "nav.contact": "যোগাযোগ",
    "nav.call": "কল: ০১৭১১-৩০২৩২২",
    "nav.bookWa": "হোয়াটসঅ্যাপে বুকিং",

    // Hero
    "hero.badge": "★ রাজশাহী শহরের কেন্দ্রস্থলে প্রিমিয়ার আতিথেয়তা",
    "hero.title": "রাজশাহীর প্রাণকেন্দ্রে আরামদায়ক ও নিরাপদ আবাসন",
    "hero.desc": "বাটার মোড়, সাহেব বাজারের সন্নিকটে অবস্থিত। শীতাতপ নিয়ন্ত্রিত আধুনিক রুম, সার্বক্ষণিক ২৪/৭ আন্তরিক সেবা, হাই-স্পিড ওয়াই-ফাই ও পরিবারের মতো আতিথেয়তা উপভোগ করুন।",
    "hero.ctaReserve": "হোয়াটসঅ্যাপে বুকিং করুন",
    "hero.ctaExplore": "রুম ও ভাড়ার তালিকা দেখুন",

    // Stats
    "stat.location.val": "বাটার মোড় সংলগ্ন",
    "stat.location.label": "রাজশাহীর প্রাণকেন্দ্রে",
    "stat.desk.val": "২৪/৭ ফ্রন্ট ডেস্ক",
    "stat.desk.label": "সার্বক্ষণিক সেবা",
    "stat.wifi.val": "দ্রুতগতির ওয়াই-ফাই",
    "stat.wifi.label": "সম্পূর্ণ ফ্রি",
    "stat.comfort.val": "প্রিমিয়াম রুমসমূহ",
    "stat.comfort.label": "এসি ও ফ্যামিলি স্যুট",

    // Fast Inquiry Bar
    "inquiry.title": "রুমের প্রাপ্যতা যাচাই ও দ্রুত হোয়াটসঅ্যাপ ইনকোয়ারি",
    "inquiry.direct": "ফ্রন্ট ডেস্কের সাথে সরাসরি হোয়াটসঅ্যাপে কনফার্মেশন",
    "inquiry.checkin": "চেক-ইন তারিখ",
    "inquiry.checkout": "চেক-আউট তারিখ",
    "inquiry.room": "রুমের ধরন",
    "inquiry.guests": "অতিথি সংখ্যা",
    "inquiry.roomSelect.all": "সকল রুমের ধরন",
    "inquiry.roomSelect.deluxe": "ডিলাক্স টুইন রুম (৳৩,৪০০ / $৩১)",
    "inquiry.roomSelect.premium": "প্রিমিয়াম টুইন রুম (৳৪,৫০০ / $৪১)",
    "inquiry.roomSelect.triple": "ট্রিপল রুম / ফ্যামিলি (৳৩,৮৫০ / $৩৫)",
    "inquiry.btn": "হোয়াটসঅ্যাপে বুকিং পাঠান",

    // About
    "about.tag": "হোটেল মুক্তা ইন্টারন্যাশনালে স্বাগতম",
    "about.title": "পদ্মাপাড়ের রাজশাহী শহরে আপনার পছন্দের ঠিকানা",
    "about.p1": "হোটেল মুক্তা ইন্টারন্যাশনাল রাজশাহী শহরের প্রাণকেন্দ্র বাটার মোড় ও সাহেব বাজার এলাকায় বিশ্বস্ত আতিথেয়তা দিয়ে আসছে। ব্যবসায়িক ভ্রমণ, বিশ্ববিদ্যালয় সংক্রান্ত কাজ বা পদ্মা নদীর পাড় ও ঐতিহ্যবাহী সিল্ক কেনাকাটার জন্য এটি আদর্শ অবস্থান।",
    "about.p2": "আমাদের রয়েছে চমৎকার সাজানো এসি রুম, ২৪ ঘণ্টা ফ্রন্ট ডেস্ক ও সিকিউরিটি সার্ভিস, নিরবচ্ছিন্ন উচ্চগতির ইন্টারনেট, নিজস্ব খাবার ব্যবস্থা এবং আন্তরিক কর্মকর্তা-কর্মচারীবৃন্দ।",
    "about.f1.title": "শহরের মূল কেন্দ্র",
    "about.f1.desc": "সাহেব বাজার, সিল্কের শোরুম ও স্টেশন খুব কাছেই।",
    "about.f2.title": "২৪ ঘণ্টা রুম সার্ভিস",
    "about.f2.desc": "যেকোনো সময় গরম খাবার, চা-কফি ও প্রয়োজনীয় সেবা।",
    "about.f3.title": "ফ্যামিলি ও বিজনেস রুম",
    "about.f3.desc": "পরিবার ও কর্পোরেট অতিথিদের জন্য সুপ্রশস্ত রুম।",
    "about.f4.title": "নিরাপদ ও সুশৃঙ্খল পরিবেশ",
    "about.f4.desc": "সিসিটিভি ক্যামেরা ও সার্বক্ষণিক নিরাপত্তা ব্যবস্থা।",
    "about.badge.title": "রাজশাহীর স্বনামধন্য হোটেল",
    "about.badge.desc": "আরাম ও সাধ্যের মধ্যে সেরা সেবা",

    // Rooms
    "rooms.tag": "আমাদের রুমসমূহ",
    "rooms.title": "আধুনিক ও পরিপাটি রুম ও স্যুট",
    "rooms.subtitle": "প্রতিটি রুমে রয়েছে স্প্লিট এয়ার কন্ডিশনার, দ্রুতগতির ওয়াই-ফাই, ফ্ল্যাট প্যানেল টিভি, পড়ার/কাজের টেবিল, রেফ্রিজারেটর, জায়নামাজ ও পরিষ্কার বাথরুম।",
    "room.perNight": "প্রতি রাত",
    "room.btnWa": "হোয়াটসঅ্যাপে বুক করুন",
    "room.btnDetails": "বিস্তারিত তথ্য",
    "room.freeCancel": "ফ্রি ক্যান্সেলেশন সুবিধা",

    // Room 1: Deluxe Twin
    "room.deluxe.title": "ডিলাক্স টুইন রুম",
    "room.deluxe.desc": "বন্ধুবান্ধব বা সহকর্মীদের সাথে ভ্রমণের জন্য আদর্শ। এতে রয়েছে দুটি আরামদায়ক সিঙ্গেল বেড, ইলেকট্রিক্যাল সকেটযুক্ত টেবিল ও কার্যকর এসি সুবিধা।",
    "room.deluxe.beds": "২টি সিঙ্গেল বেড",
    "room.deluxe.guests": "২ জন অতিথি",
    "room.deluxe.price": "৳ ৩,৪০০",
    "room.deluxe.ref": "~$৩১.০০ USD",

    // Room 2: Premium Twin
    "room.premium.title": "প্রিমিয়াম টুইন রুম",
    "room.premium.desc": "উন্নত মানের আসবাবপত্র, আরামদায়ক বিছানা, বাড়তি পরিসর, স্যাটেলাইট টেলিভিশন, ফ্রিজ এবং মনোরম লাইটিং সম্বলিত প্রিমিয়ার রুম।",
    "room.premium.beds": "২টি প্রিমিয়াম বেড",
    "room.premium.guests": "২ জন অতিথি",
    "room.premium.price": "৳ ৪,৫০০",
    "room.premium.ref": "~$৪১.০০ USD",

    // Room 3: Triple Room
    "room.triple.title": "ট্রিপল রুম / ফ্যামিলি স্যুট",
    "room.triple.desc": "পরিবার কিংবা ৩ জনের দলের জন্য চমৎকার বড় পরিসরের রুম। শীতাতপ নিয়ন্ত্রণ, বসার জায়গা ও ব্যক্তিগত বাথরুম সুবিধা সম্বলিত।",
    "room.triple.beds": "৩ জনের বেড সেটআপ",
    "room.triple.guests": "৩ জন অতিথি",
    "room.triple.price": "৳ ৩,৮৫০",
    "room.triple.ref": "~$৩৫.০০ USD",

    // Amenities
    "amenities.tag": "বিশেষ সুবিধাসমূহ",
    "amenities.title": "আপনার স্বাচ্ছন্দ্যে আমাদের সকল আয়োজন",
    "amenities.subtitle": "রাজশাহীতে আপনার ভ্রমণকে নিখুঁত ও আরামদায়ক করতে আধুনিক সকল সেবা।",
    "amenity.fd.title": "২৪ ঘণ্টা ফ্রন্ট ডেস্ক",
    "amenity.fd.desc": "দিন বা রাতের যেকোনো সময় চেক-ইন, তথ্য ও যেকোনো প্রয়োজনে সার্বক্ষণিক সহযোগিতা।",
    "amenity.wifi.title": "হাই-স্পিড ওয়াই-ফাই",
    "amenity.wifi.desc": "পুরো হোটেল জুড়ে উচ্চগতির দ্রুত ও নিরবচ্ছিন্ন ইন্টারনেট সংযোগ।",
    "amenity.ac.title": "শীতাতপ নিয়ন্ত্রণ (এসি)",
    "amenity.ac.desc": "প্রতিটি রুমে শান্ত ও কার্যকর এসি, যা গরমেও দেয় প্রশান্তি।",
    "amenity.dine.title": "রেস্তোরাঁ ও রুম সার্ভিস",
    "amenity.dine.desc": "সুস্বাদু দেশীয় খাবার ও নাস্তা আপনার রুমে তাৎক্ষণিক সরবরাহের ব্যবস্থা।",
    "amenity.prayer.title": "জায়নামাজ ও কিবলা দিকনির্দেশনা",
    "amenity.prayer.desc": "ইবাদতের সুবিধার্থে প্রতিটি রুমের জন্য পরিষ্কার জায়নামাজ ও কিবলার দিকনির্দেশক।",
    "amenity.conf.title": "মিটিং ও কনফারেন্স সুবিধা",
    "amenity.conf.desc": "অফিসিয়াল মিটিং, দলগত আলোচনা বা পারিবারিক ছোট আয়োজনের স্থান।",
    "amenity.park.title": "ফ্রি পার্কিং সুবিধা",
    "amenity.park.desc": "মোটরসাইকেল ও প্রাইভেট কারের জন্য নিরাপদ পার্কিং ব্যবস্থা।",
    "amenity.clean.title": "হাউসকিপিং ও লন্ড্রি",
    "amenity.clean.desc": "রুমের নিয়মিত পরিচ্ছন্নতা, পরিষ্কার চাদর ও কাপড় ইস্ত্রি/লন্ড্রি সেবা।",
    "amenity.sec.title": "২৪/৭ নিরাপত্তা ও সিসিটিভি",
    "amenity.sec.desc": "নিরাপদ পরিবেশে সিসিটিভি নজরদারি ও দায়িত্বশীল নিরাপত্তা কর্মী।",

    // Gallery
    "gallery.tag": "ছবি গ্যালারি",
    "gallery.title": "হোটেল মুক্তা ইন্টারন্যাশনালের চিত্রশালা",
    "gallery.subtitle": "আমাদের ভবনের বহিরাবরণ, সুন্দর রিসেপশন লবি ও মনোরম রুমগুলোর বাস্তব ছবি দেখুন।",
    "gallery.filter.all": "সব ছবি",
    "gallery.filter.rooms": "রুমসমূহ",
    "gallery.filter.lobby": "লবি ও রিসেপশন",
    "gallery.filter.exterior": "ভবনের চিত্র",

    // Location
    "location.tag": "অবস্থান",
    "location.title": "রাজশাহী শহরের মূল কেন্দ্রে সহজ যাতায়াত",
    "location.subtitle": "বাটার মোড়, সাহেব বাজার — যেখান থেকে পদ্মাপাড়, প্রধান পর্যটন স্থান ও বিশ্ববিদ্যালয় খুব কাছে।",
    "location.addressTitle": "হোটেল মুক্তা ইন্টারন্যাশনাল",
    "location.dirBtn": "গুগল ম্যাপে লোকেশন দেখুন",
    "landmark.padma": "পদ্মা নদীর পাড় ও টি-বাঁধ",
    "landmark.padma.dist": "৫ মিনিট",
    "landmark.station": "রাজশাহী রেলওয়ে স্টেশন",
    "landmark.station.dist": "১০ মিনিট",
    "landmark.varendra": "বরেন্দ্র গবেষণা জাদুঘর",
    "landmark.varendra.dist": "৭ মিনিট",
    "landmark.ru": "রাজশাহী বিশ্ববিদ্যালয় ক্যাম্পাস",
    "landmark.ru.dist": "১৫ মিনিট",
    "landmark.silk": "ঐতিহ্যবাহী রাজশাহী সিল্ক শোরুম",
    "landmark.silk.dist": "৬ মিনিট",

    // Contact
    "contact.tag": "যোগাযোগ",
    "contact.title": "সরাসরি বুকিং ও যেকোনো অনুসন্ধান",
    "contact.subtitle": "আমাদের ওয়েবসাইটে অনলাইন ক্রেডিট কার্ড পেমেন্টের প্রয়োজন নেই। সরাসরি হোয়াটসঅ্যাপ বা ফোনে কথা বলে কনফার্মেশন ও সেরা ছাড় পান।",
    "contact.boxTitle": "হোয়াটসঅ্যাপে সরাসরি বুকিং রিকুয়েস্ট",
    "contact.boxDesc": "নিচে তারিখ ও তথ্য পূরণ করে বাটনে চাপ দিন। আপনার তথ্যসহ হোয়াটসঅ্যাপ স্বয়ংক্রিয়ভাবে খুলে যাবে।",
    "contact.guestName": "আপনার নাম",
    "contact.phone": "মোবাইল নম্বর",
    "contact.note": "বিশেষ প্রয়োজন (ঐচ্ছিক)",
    "contact.sendWa": "হোয়াটসঅ্যাপে বুকিং পাঠান (০১৭১১-৩০২৩২২)",
    "contact.hotlineTitle": "প্রধান হোয়াটসঅ্যাপ হটলাইন",
    "contact.phoneTitle": "ফ্রন্ট ডেস্ক ল্যান্ডলাইন / মোবাইল",
    "contact.emailTitle": "ইমেইল অনুসন্ধান",
    "contact.addrTitle": "হোটেলের ঠিকানা",

    // Floating & Modals
    "floating.wa": "হোয়াটসঅ্যাপ বুকিং",
    "modal.close": "বন্ধ করুন",
    "modal.waBook": "এই রুমটি হোয়াটসঅ্যাপে বুক করুন"
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
  if (priceEl) priceEl.innerHTML = `${room.priceBdt} <span style="font-size:0.9rem; color:#94a3b8;">(${room.priceUsd})</span>`;
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
