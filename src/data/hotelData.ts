export type Language = 'en' | 'bn';
export type Currency = 'BDT' | 'USD';

export interface RoomSpec {
  id: 'deluxe' | 'premium' | 'triple';
  index: string;
  nameEn: string;
  nameBn: string;
  taglineEn: string;
  taglineBn: string;
  descEn: string;
  descBn: string;
  priceBdt: number;
  priceUsd: number;
  sizeSqFt: number;
  maxGuests: number;
  bedConfigEn: string;
  bedConfigBn: string;
  viewEn: string;
  viewBn: string;
  floorToneEn: string;
  floorToneBn: string;
  swatchHex: string;
  image: string;
  secondaryImages: string[];
  amenitiesEn: string[];
  amenitiesBn: string[];
}

export interface GalleryPhoto {
  id: string;
  category: 'suites' | 'lobby' | 'exterior';
  url: string;
  titleEn: string;
  titleBn: string;
  locationEn: string;
  locationBn: string;
  dominantColor: string;
  paletteNameEn: string;
  paletteNameBn: string;
}

export interface LandmarkItem {
  id: string;
  index: string;
  nameEn: string;
  nameBn: string;
  categoryEn: string;
  categoryBn: string;
  distanceTimeEn: string;
  distanceTimeBn: string;
  distanceKm: string;
  descEn: string;
  descBn: string;
}

export const HOTEL_CONTACT = {
  whatsappRaw: '8801711302322',
  whatsappDisplay: '+880 1711-302322',
  frontDeskDisplay: '+880 1758-355468',
  frontDeskTel: '+8801758355468',
  email: 'hotelmuktainternational@gmail.com',
  addressEn: 'Batar More, Shaheb Bazar / Ganakpara, Rajshahi-6100, Bangladesh',
  addressBn: 'বাটার মোড়, সাহেব বাজার / গণকপাড়া, রাজশাহী-৬১০০, বাংলাদেশ',
  coordinates: {
    lat: 24.366963,
    lng: 88.6003258,
  },
  googleMapsUrl: 'https://maps.google.com/?q=24.366963,88.6003258',
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14537.64846388118!2d88.6003258!3d24.366963!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x12e8f4ba52bca12!2sHotel%20Mukta%20International!5e0!3m2!1sen!2sbd!4v1667915266465!5m2!1sen!2sbd',
};

export const ROOM_PALETTE_SWATCHES = [
  {
    hex: '#2E1F29',
    nameEn: 'Evening Aubergine',
    nameBn: 'সন্ধ্যার বেগুনি আভা',
    sourceEn: 'Lobby Velvet & Ambient Shadows',
    sourceBn: 'লবি ভেলভেট ও আবছা আলো',
  },
  {
    hex: '#382226',
    nameEn: 'Aged Mahogany',
    nameBn: 'মেহগনি কাঠের রঙ',
    sourceEn: 'Handcrafted Suite Headboards',
    sourceBn: 'স্যুটের কাঠের কারুকাজ',
  },
  {
    hex: '#521F2C',
    nameEn: 'Rajshahi Mulberry Silk',
    nameBn: 'রাজশাহী সিল্ক মেরুন',
    sourceEn: 'Suite Drapery & Upholstered Seating',
    sourceBn: 'পর্দা ও প্রিমিয়াম সোফা',
  },
  {
    hex: '#6A302B',
    nameEn: 'Varendra Terracotta',
    nameBn: 'বরেন্দ্র টেরাকোটা',
    sourceEn: 'Reception Stone & Warm Timber',
    sourceBn: 'রিসেপশন ও উষ্ণ কাঠের ফিনিশ',
  },
  {
    hex: '#A36E4A',
    nameEn: 'Burnished Teak Bronze',
    nameBn: 'বার্নিশড সেগুন ও ব্রোঞ্জ',
    sourceEn: 'Warm Brass Sconces & Trim',
    sourceBn: 'ব্রোঞ্জ লাইটিং ও সেগুন কাঠ',
  },
];

export const ROOMS_DATA: RoomSpec[] = [
  {
    id: 'deluxe',
    index: '01',
    nameEn: 'Deluxe Twin Sanctuary',
    nameBn: 'ডিলাক্স টুইন স্যুট',
    taglineEn: 'Tailored for business travelers and restful twin stays',
    taglineBn: 'ব্যবসায়িক ভ্রমণ ও দুইজন অতিথির প্রশান্তির জন্য আদর্শ',
    descEn:
      'Appointed with handcrafted mahogany twin beds, crisp woven linens, a dedicated executive work desk with multi-standard outlets, and whisper-quiet split climate control.',
    descBn:
      'মেহগনি কাঠের দুটি আরামদায়ক সিঙ্গেল বেড, পরিপাটি বিছানা, কাজের টেবিল, দ্রুতগতির ওয়াই-ফাই এবং নীরব স্প্লিট এসি সম্বলিত শান্ত পরিবেশ।',
    priceBdt: 3400,
    priceUsd: 31,
    sizeSqFt: 220,
    maxGuests: 2,
    bedConfigEn: '2 Single Twin Beds',
    bedConfigBn: '২টি সিঙ্গেল বেড',
    viewEn: 'Shaheb Bazar Cityscape',
    viewBn: 'সাহেব বাজার সিটি ভিউ',
    floorToneEn: 'Teak & Warm Ivory',
    floorToneBn: 'সেগুন ও আইভরি আবহ',
    swatchHex: '#A36E4A',
    image:
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_deluxetwin_hotelplacer.com.jpg',
    secondaryImages: [
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_deluxetwin_hotelplacer.com.jpg',
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_lobby_hotelplacer.com.jpg',
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_reception_hotelplacer.com.jpg',
    ],
    amenitiesEn: [
      'Whisper-Quiet Split Air Conditioning',
      'Complimentary High-Speed Fiber Wi-Fi',
      'HD Flat-Panel Satellite Television',
      'Executive Work Desk with Power Outlets',
      'In-Room Refrigerator & Refreshment Tray',
      'Clean Prayer Mats & Qibla Direction',
      'En-Suite Bath with 24h Hot & Cold Water',
      'Complimentary Morning Breakfast',
    ],
    amenitiesBn: [
      'নীরব স্প্লিট এয়ার কন্ডিশনার',
      'ফ্রি হাই-স্পিড ফাইবার ওয়াই-ফাই',
      'এইচডি ফ্ল্যাট প্যানেল স্যাটেলাইট টিভি',
      'ইলেকট্রিক সকেটসহ এক্সিকিউটিভ টেবিল',
      'ইন-রুম রেফ্রিজারেটর',
      'পরিচ্ছন্ন জায়নামাজ ও কিবলা নির্দেশনা',
      '২৪ ঘণ্টা গরম ও ঠান্ডা পানিসহ বাথরুম',
      'সকালের সৌজন্যমূলক নাস্তা',
    ],
  },
  {
    id: 'premium',
    index: '02',
    nameEn: 'Premium Twin Residence',
    nameBn: 'প্রিমিয়াম টুইন রেসিডেন্স',
    taglineEn: 'Elevated proportions with rich mulberry-toned upholstery',
    taglineBn: 'সুপ্রশস্ত পরিসর ও প্রিমিয়াম আসবাবপত্রের আভিজাত্য',
    descEn:
      'Our flagship twin category pairs warm teak cabinetry and deep burgundy drapery with generous lounging space, plush orthopedic mattresses, and priority room dining.',
    descBn:
      'উন্নত সেগুন কাঠের আসবাব, মেরুন পর্দা, অর্থোপেডিক ম্যাট্রেস, প্রশস্ত বসার জায়গা এবং প্রিমিয়াম বাথরুম সুবিধাসহ আমাদের অন্যতম সেরা স্যুট।',
    priceBdt: 4500,
    priceUsd: 41,
    sizeSqFt: 260,
    maxGuests: 2,
    bedConfigEn: '2 Luxury Twin Beds',
    bedConfigBn: '২টি প্রিমিয়াম বেড',
    viewEn: 'Batar More Avenue View',
    viewBn: 'বাটার মোড় অ্যাভিনিউ ভিউ',
    floorToneEn: 'Mulberry Wine & Bronze',
    floorToneBn: 'মালবেরি ও ব্রোঞ্জ আবহ',
    swatchHex: '#521F2C',
    image:
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_premiumtwin_hotelplacer.com.jpg',
    secondaryImages: [
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_premiumtwin_hotelplacer.com.jpg',
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_reception_hotelplacer.com.jpg',
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_exterior_hotelplacer.com.jpg',
    ],
    amenitiesEn: [
      'Precision Split Climate Control',
      'High-Speed Dedicated Fiber Wi-Fi',
      'HD Television with International Channels',
      'Full-Size Executive Writing Desk',
      'Compact Refrigerator & Tea/Coffee Service',
      'Orthopedic Mattresses & Plush Linens',
      'Prayer Mats & Qibla Compass Guide',
      'Upgraded Bath Amenities & 24h Room Service',
    ],
    amenitiesBn: [
      'উন্নত স্প্লিট এয়ার কন্ডিশনিং',
      'হাই-স্পিড ফাইবার ওয়াই-ফাই ইন্টারনেট',
      'আন্তর্জাতিক চ্যানেলসহ এইচডি টেলিভিশন',
      'প্রশস্ত রিডিং ও ওয়ার্ক ডেস্ক',
      'রেফ্রিজারেটর এবং চা/কফি সুবিধা',
      'অর্থোপেডিক ম্যাট্রেস ও প্রিমিয়াম চাদর',
      'পরিচ্ছন্ন জায়নামাজ ও কিবলা কম্পাস',
      'আধুনিক বাথরুম টয়লেট্রিজ ও ২৪/৭ রুম সার্ভিস',
    ],
  },
  {
    id: 'triple',
    index: '03',
    nameEn: 'Triple Family Suite',
    nameBn: 'ট্রিপল ফ্যামিলি স্যুট',
    taglineEn: 'Spacious multi-bed layout crafted for families and groups',
    taglineBn: 'পরিবার কিংবা তিনজন অতিথির একত্রে আবাসনের প্রশস্ত স্যুট',
    descEn:
      'Designed for families and visiting delegations, featuring three full beds, expansive luggage and wardrobe storage, heavy-duty climate control, and a private geyser bath.',
    descBn:
      'পরিবার বা তিনজন অতিথির আরামদায়ক আবাসনের জন্য তিনটি বেড, প্রশস্ত ওয়্যারড্রোব, শক্তিশালী এসি এবং গিজারযুক্ত বাথরুম সম্বলিত ফ্যামিলি স্যুট।',
    priceBdt: 3850,
    priceUsd: 35,
    sizeSqFt: 290,
    maxGuests: 3,
    bedConfigEn: '3 Beds (Family Setup)',
    bedConfigBn: '৩টি বেড (ফ্যামিলি সেটআপ)',
    viewEn: 'Quiet Courtyard & City View',
    viewBn: 'শান্ত সিটি ভিউ',
    floorToneEn: 'Mahogany & Warm Travertine',
    floorToneBn: 'মেহগনি ও উষ্ণ ট্র্যাভার্টিন',
    swatchHex: '#6A302B',
    image:
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_triple_hotelplacer.com.jpeg',
    secondaryImages: [
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_triple_hotelplacer.com.jpeg',
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_lobby_hotelplacer.com.jpg',
      'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_exterior_hotelplacer.com.jpg',
    ],
    amenitiesEn: [
      'Heavy-Duty Split Air Conditioning',
      'High-Speed Multi-Device Fiber Wi-Fi',
      'HD Flat-Panel TV with Family Channels',
      'Family Seating Area & Reading Table',
      'Full-Size Wardrobe & Luggage Storage',
      'In-Room Refrigerator',
      'Multiple Prayer Mats Available',
      'Private Bathroom with Hot Water Geyser',
    ],
    amenitiesBn: [
      'উচ্চ ক্ষমতাসম্পন্ন স্প্লিট এসি',
      'মাল্টি-ডিভাইস হাই-স্পিড ওয়াই-ফাই',
      'পারিবারিক চ্যানেলসহ এইচডি টিভি',
      'পারিবারিক বসার জায়গা ও টেবিল',
      'বড় ওয়্যারড্রোব ও লাগেজ স্পেস',
      'ইন-রুম রেফ্রিজারেটর',
      'পরিবারের জন্য একাধিক জায়নামাজ',
      'গরম পানির গিজারসহ প্রাইভেট বাথরুম',
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'ext-main',
    category: 'exterior',
    url: 'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_exterior_hotelplacer.com.jpg',
    titleEn: 'Hotel Mukta International Facade',
    titleBn: 'হোটেল মুক্তা ইন্টারন্যাশনাল ভবন',
    locationEn: 'Batar More, Shaheb Bazar',
    locationBn: 'বাটার মোড়, সাহেব বাজার',
    dominantColor: '#382226',
    paletteNameEn: 'Warm Brick & Twilight Bronze',
    paletteNameBn: 'ইটের উষ্ণতা ও গোধূলি ব্রোঞ্জ',
  },
  {
    id: 'suite-premium',
    category: 'suites',
    url: 'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_premiumtwin_hotelplacer.com.jpg',
    titleEn: 'Premium Twin Residence',
    titleBn: 'প্রিমিয়াম টুইন রেসিডেন্স',
    locationEn: '260 sq.ft · Luxury Twin',
    locationBn: '২৬০ বর্গফুট · প্রিমিয়াম টুইন',
    dominantColor: '#521F2C',
    paletteNameEn: 'Mulberry Wine & Crisp Linen',
    paletteNameBn: 'মালবেরি মেরুন ও শুভ্র লিনেন',
  },
  {
    id: 'lobby-reception',
    category: 'lobby',
    url: 'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_reception_hotelplacer.com.jpg',
    titleEn: '24-Hour Concierge & Front Desk',
    titleBn: '২৪ ঘণ্টা ফ্রন্ট ডেস্ক ও রিসেপশন',
    locationEn: 'Ground Floor Sanctuary',
    locationBn: 'গ্রাউন্ড ফ্লোর অভ্যর্থনা কক্ষ',
    dominantColor: '#A36E4A',
    paletteNameEn: 'Burnished Teak & Golden Sconce',
    paletteNameBn: 'বার্নিশড সেগুন ও সোনালি আলো',
  },
  {
    id: 'suite-deluxe',
    category: 'suites',
    url: 'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_deluxetwin_hotelplacer.com.jpg',
    titleEn: 'Deluxe Twin Sanctuary',
    titleBn: 'ডিলাক্স টুইন স্যুট',
    locationEn: '220 sq.ft · Executive Twin',
    locationBn: '২২০ বর্গফুট · ডিলাক্স টুইন',
    dominantColor: '#6A302B',
    paletteNameEn: 'Mahogany Wood & Warm Alabaster',
    paletteNameBn: 'মেহগনি কাঠ ও উষ্ণ দেয়াল',
  },
  {
    id: 'lobby-lounge',
    category: 'lobby',
    url: 'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_lobby_hotelplacer.com.jpg',
    titleEn: 'Guest Waiting Lounge & Salon',
    titleBn: 'গেস্ট লাউঞ্জ ও বিশ্রাম কক্ষ',
    locationEn: 'Reception Concourse',
    locationBn: 'রিসেপশন লাউঞ্জ',
    dominantColor: '#2E1F29',
    paletteNameEn: 'Deep Aubergine & Plush Velvet',
    paletteNameBn: 'গাঢ় বেগুনি ও ভেলভেট সোফা',
  },
  {
    id: 'suite-triple',
    category: 'suites',
    url: 'https://hotelplacer.com/content/images/hotels/back/911/book_hotel_mukta_int_triple_hotelplacer.com.jpeg',
    titleEn: 'Triple Family Suite',
    titleBn: 'ট্রিপল ফ্যামিলি স্যুট',
    locationEn: '290 sq.ft · 3-Bed Suite',
    locationBn: '২৯০ বর্গফুট · ৩ বেড ফ্যামিলি স্যুট',
    dominantColor: '#A36E4A',
    paletteNameEn: 'Caramel Bronze & Silk Ivory',
    paletteNameBn: 'কারামেল ব্রোঞ্জ ও সিল্ক আইভরি',
  },
  {
    id: 'ext-city',
    category: 'exterior',
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfo00ythjjsv_Y9mMEHYBMw1G0I_wi3ta9t0jCyQkeTpm5DhBetOHs5kCO8OZHJSfu-ExayPOU64r2FltXQGZaWW5Dnvar8IyQJ4xuqG9x0HNPT_HaFCLxMj_ioGUK4zPymJlSG=w1200-h800-k-no',
    titleEn: 'Batar More Commercial District',
    titleBn: 'বাটার মোড় বাণিজ্যিক কেন্দ্র',
    locationEn: 'Heart of Rajshahi City',
    locationBn: 'রাজশাহী শহরের প্রাণকেন্দ্র',
    dominantColor: '#382226',
    paletteNameEn: 'Evening Slate & Amber Streetlight',
    paletteNameBn: 'সন্ধ্যার স্লেট ও অ্যাম্বার আলো',
  },
];

export const LANDMARKS_DATA: LandmarkItem[] = [
  {
    id: 'padma',
    index: '01',
    nameEn: 'Padma River Waterfront Promenade',
    nameBn: 'পদ্মা নদীর পাড় ও টি-বাঁধ প্রমেনাড',
    categoryEn: 'Riverfront & Leisure',
    categoryBn: 'নদীর পাড় ও ভ্রমণ',
    distanceTimeEn: '5 mins drive',
    distanceTimeBn: '৫ মিনিট দূরত্ব',
    distanceKm: '1.4 km',
    descEn: 'Walk along the breeze-swept Padma riverfront, sunset tea stalls, and scenic embankments just south of Shaheb Bazar.',
    descBn: 'সাহেব বাজারের কাছেই পদ্মা নদীর নির্মল বাতাস, সূর্যাস্তের দৃশ্য এবং মনোরম হাঁটার পথ।',
  },
  {
    id: 'silk',
    index: '02',
    nameEn: 'Rajshahi Silk Heritage Showrooms',
    nameBn: 'রাজশাহী সিল্ক শোরুম ও বিসিক',
    categoryEn: 'Craft & Shopping',
    categoryBn: 'ঐতিহ্যবাহী সিল্ক ও কেনাকাটা',
    distanceTimeEn: '6 mins drive',
    distanceTimeBn: '৬ মিনিট দূরত্ব',
    distanceKm: '2.1 km',
    descEn: 'Explore Bangladesh’s famed mulberry silk weaving houses, Sopura silk emporiums, and handloom boutiques.',
    descBn: 'বিশ্বখ্যাত রাজশাহী সিল্কের শোরুম, সপুরা সিল্ক এবং ঐতিহ্যবাহী তাঁত বস্ত্রের সমাহার।',
  },
  {
    id: 'varendra',
    index: '03',
    nameEn: 'Varendra Research Museum',
    nameBn: 'বরেন্দ্র গবেষণা জাদুঘর',
    categoryEn: 'History & Architecture',
    categoryBn: 'ইতিহাস ও প্রত্নতত্ত্ব',
    distanceTimeEn: '7 mins drive',
    distanceTimeBn: '৭ মিনিট দূরত্ব',
    distanceKm: '1.8 km',
    descEn: 'The oldest museum in Bangladesh, housing rare Pala, Sena, and ancient Bengal sculptures and manuscripts.',
    descBn: 'বাংলাদেশের প্রাচীনতম জাদুঘর, যেখানে পাল ও সেন যুগের দুর্লভ ভাস্কর্য ও প্রাচীন পান্ডুলিপি সংরক্ষিত রয়েছে।',
  },
  {
    id: 'station',
    index: '04',
    nameEn: 'Rajshahi Railway Station',
    nameBn: 'রাজশাহী রেলওয়ে স্টেশন',
    categoryEn: 'Intercity Transit',
    categoryBn: 'রেল যোগাযোগ কেন্দ্র',
    distanceTimeEn: '10 mins drive',
    distanceTimeBn: '১০ মিনিট দূরত্ব',
    distanceKm: '3.2 km',
    descEn: 'Direct express rail terminal connecting Rajshahi with Dhaka (Silk City, Padma, Banalata Express) and Khulna.',
    descBn: 'ঢাকা ও দেশের বিভিন্ন প্রান্তের সাথে আন্তঃনগর ট্রেন (বনলতা, সিল্ক সিটি, পদ্মা এক্সপ্রেস) যোগাযোগের মূল স্টেশন।',
  },
  {
    id: 'ru',
    index: '05',
    nameEn: 'University of Rajshahi Campus',
    nameBn: 'রাজশাহী বিশ্ববিদ্যালয় ক্যাম্পাস',
    categoryEn: 'Academic & Cultural',
    categoryBn: 'শিক্ষা ও সংস্কৃতি',
    distanceTimeEn: '15 mins drive',
    distanceTimeBn: '১৫ মিনিট দূরত্ব',
    distanceKm: '5.5 km',
    descEn: 'Lush 753-acre botanical campus renowned for Paris Road, academic conferences, and cultural landmarks.',
    descBn: 'প্যারিস রোড ও সবুজ প্রকৃতিতে ঘেরা দেশের অন্যতম বৃহৎ ও ঐতিহ্যবাহী বিশ্ববিদ্যালয় প্রাঙ্গণ।',
  },
];

export const AMENITIES_LIST = [
  {
    index: '01',
    titleEn: '24-Hour Concierge & Front Desk',
    titleBn: '২৪ ঘণ্টা ফ্রন্ট ডেস্ক ও অভ্যর্থনা',
    detailEn: 'Round-the-clock check-in assistance, local transport coordination, and immediate guest support at any hour.',
    detailBn: 'দিন-রাত ২৪ ঘণ্টা চেক-ইন সহায়তা, স্থানীয় যাতায়াত ব্যবস্থা এবং তাৎক্ষণিক রিসেপশন সেবা।',
    metricEn: '24 / 7 Monitored Desk',
    metricBn: 'সার্বক্ষণিক অভ্যর্থনা',
  },
  {
    index: '02',
    titleEn: 'Split Climate Control & Fiber Wi-Fi',
    titleBn: 'স্প্লিট এসি ও ফাইবার ওয়াই-ফাই',
    detailEn: 'Every guest room is equipped with whisper-quiet split air conditioning and high-speed fiber internet across all floors.',
    detailBn: 'প্রতিটি রুমে নীরব স্প্লিট এয়ার কন্ডিশনিং এবং সব ফ্লোরে নিরবচ্ছিন্ন হাই-স্পিড ওয়াই-ফাই সুবিধা।',
    metricEn: '100% AC Suites',
    metricBn: 'শতভাগ এসি স্যুট',
  },
  {
    index: '03',
    titleEn: 'In-Room Dining & Morning Breakfast',
    titleBn: 'ইন-রুম ডাইনিং ও সকালের নাস্তা',
    detailEn: 'Fresh regional Bengali dishes, complimentary morning breakfast options, and lobby coffee and tea service.',
    detailBn: 'স্বাস্থ্যসম্মত সুস্বাদু খাবার, সকালের সৌজন্যমূলক নাস্তা এবং লবিতে চা ও কফি পরিবেশন।',
    metricEn: 'Complimentary Breakfast',
    metricBn: 'সৌজন্যমূলক নাস্তা',
  },
  {
    index: '04',
    titleEn: 'Secure On-Premise Parking & CCTV',
    titleBn: 'নিরাপদ পার্কিং ও ২৪/৭ সিসিটিভি নিরাপত্তা',
    detailEn: 'Dedicated indoor parking for private vehicles and motorcycles guarded by 24/7 CCTV surveillance and security staff.',
    detailBn: 'গাড়ি ও মোটরসাইকেলের জন্য নিজস্ব নিরাপদ পার্কিং এবং ২৪ ঘণ্টা সিসিটিভি ক্যামেরা ও প্রহরী নিরাপত্তা।',
    metricEn: 'Complimentary Parking',
    metricBn: 'ফ্রি নিরাপদ পার্কিং',
  },
  {
    index: '05',
    titleEn: 'Cultural Comfort & Prayer Facilities',
    titleBn: 'জায়নামাজ ও ইবাদতের সুব্যবস্থা',
    detailEn: 'Clean prayer mats and accurate Qibla directional markings thoughtfully provided in every guest suite.',
    detailBn: 'অতিথিদের সুবিধার্থে প্রতিটি রুমে পরিচ্ছন্ন জায়নামাজ ও সঠিক কিবলা দিকনির্দেশনা।',
    metricEn: 'In-Suite Prayer Setup',
    metricBn: 'রুমের ভেতরেই সুব্যবস্থা',
  },
  {
    index: '06',
    titleEn: 'Executive Meeting & Valet Care',
    titleBn: 'মিটিং স্পেস ও লন্ড্রি সার্ভিস',
    detailEn: 'Daily housekeeping refresh, express laundry/valet service, and intimate meeting space for visiting corporate delegations.',
    detailBn: 'প্রতিদিন রুম পরিচ্ছন্নতা, লন্ড্রি সেবা এবং ব্যবসায়িক প্রতিনিধিদের জন্য মিটিং ও আলোচনার সুব্যবস্থা।',
    metricEn: 'Daily Housekeeping',
    metricBn: 'দৈনিক হাউসকিপিং',
  },
];

export function buildWhatsAppUrl(params: {
  lang: Language;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  estimatedTotal: string;
  guestName?: string;
  guestPhone?: string;
  specialNotes?: string;
}): { url: string; message: string } {
  const isBn = params.lang === 'bn';
  const lines: string[] = [];

  if (isBn) {
    lines.push('আসসালামু আলাইকুম হোটেল মুক্তা ইন্টারন্যাশনাল,');
    lines.push('আমি আপনাদের হোটেলে একটি স্যুট রিজার্ভেশন করতে আগ্রহী:');
    lines.push('');
    lines.push(`• স্যুট: ${params.roomName}`);
    if (params.checkIn) lines.push(`• চেক-ইন: ${params.checkIn}`);
    if (params.checkOut) lines.push(`• চেক-আউট: ${params.checkOut} (${params.nights} রাত)`);
    if (params.guests) lines.push(`• অতিথি সংখ্যা: ${params.guests}`);
    if (params.estimatedTotal) lines.push(`• আনুমানিক ভাড়া: ${params.estimatedTotal}`);
    if (params.guestName?.trim()) lines.push(`• অতিথির নাম: ${params.guestName.trim()}`);
    if (params.guestPhone?.trim()) lines.push(`• মোবাইল নম্বর: ${params.guestPhone.trim()}`);
    if (params.specialNotes?.trim()) lines.push(`• বিশেষ অনুরোধ: ${params.specialNotes.trim()}`);
    lines.push('');
    lines.push('অনুগ্রহ করে রুমের প্রাপ্যতা ও বুকিং কনফার্মেশন জানাবেন। ধন্যবাদ।');
  } else {
    lines.push('Hello Hotel Mukta International,');
    lines.push('I would like to request a direct reservation with the front desk:');
    lines.push('');
    lines.push(`• Suite: ${params.roomName}`);
    if (params.checkIn) lines.push(`• Check-in: ${params.checkIn}`);
    if (params.checkOut) lines.push(`• Check-out: ${params.checkOut} (${params.nights} ${params.nights === 1 ? 'night' : 'nights'})`);
    if (params.guests) lines.push(`• Guests: ${params.guests}`);
    if (params.estimatedTotal) lines.push(`• Estimated Total: ${params.estimatedTotal}`);
    if (params.guestName?.trim()) lines.push(`• Guest Name: ${params.guestName.trim()}`);
    if (params.guestPhone?.trim()) lines.push(`• Contact Phone: ${params.guestPhone.trim()}`);
    if (params.specialNotes?.trim()) lines.push(`• Special Request: ${params.specialNotes.trim()}`);
    lines.push('');
    lines.push('Please confirm availability and reservation details. Thank you.');
  }

  const message = lines.join('\n');
  const url = `https://wa.me/${HOTEL_CONTACT.whatsappRaw}?text=${encodeURIComponent(message)}`;
  return { url, message };
}
