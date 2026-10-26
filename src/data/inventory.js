/**
 * Highlander Gold & Silver — Inventory Data Architecture
 * Prepared for static rendering and direct integration with Supabase or external headless database.
 */

export const BUSINESS_INFO = {
  name: "Highlander Gold & Silver",
  shortName: "HGS",
  address: "119 Jewel Basin Ct. B3, Bigfork, MT 59911",
  street: "119 Jewel Basin Ct. B3",
  city: "Bigfork",
  state: "MT",
  zip: "59911",
  phone: "406-407-0281",
  phoneFormatted: "(406) 407-0281",
  email: "Stratford1955@icloud.com",
  payPalUrl: "https://paypal.me/HighlanderGoldSilver",
  terms: {
    buyersPremium: "15%",
    shipping: "USPS Priority & Ground, fully insured in-house packaging",
    salesTax: "Montana Tax-Exempt (0% State Sales Tax)",
    closeTrigger: "Instant Close / Checkout triggered upon customer request",
    hours: "Online Store Open 24/7"
  }
};

export const INVENTORY_ITEMS = [
  {
    id: "item-001",
    lotNumber: "1",
    title: "1876 George T. Morgan Proposed $100 Gold Union™",
    lead: "1876 Private Issue George T. Morgan Ultra High Relief Gold Union .999 Gem Proof",
    description: "1876 Private Issue George T. Morgan Ultra High Relief Gold Union .999 Pure Gold Ultra Cameo Gem Proof. Only 999 units minted worldwide, making this a premier collector trophy. Struck in solid 1 Troy Ounce .999 fine gold with mirror-deep fields and frosted high relief devices.",
    category: "Gold",
    metal: "Gold",
    purity: ".999 Pure Gold (1 Troy Oz)",
    grade: "NGC Ultra Cameo Gem Proof",
    mintage: "999 Units Worldwide",
    price: 4850.00,
    priceFormatted: "$4,850.00",
    estimateRange: "$4,250.00 – $5,700.00 USD",
    paymentNote: "High-value item: Wire transfer payment preferred with HGS wire credit on settlement.",
    featuredImage: "/assets/items/lot1_morgan_gold_1.jpg",
    additionalImages: [
      "/assets/items/lot1_morgan_gold_1.jpg",
      "/assets/items/lot1_morgan_gold_2.jpg"
    ],
    isFeatured: true,
    status: "Available"
  },
  {
    id: "item-153",
    lotNumber: "153",
    title: "1897 Morgan Silver Dollar MS-65 PL (Prooflike)",
    lead: "1897 Morgan Silver Dollar MS-65 PL with Cartwheel Luster & Toned Rim",
    description: "1897 Morgan Silver Dollar graded MS-65 Prooflike (PL) by PCI. Exceptional mirrored fields with frosted cartwheel devices on Lady Liberty, complemented by delicate iridescent toning along the rim denticles. Hand-picked for superior eye appeal.",
    category: "Morgan Dollars",
    metal: "Silver",
    purity: ".900 Fine Silver (26.73g)",
    grade: "PCI MS-65 PL (Guaranteed Value)",
    mintage: "2,822,000",
    price: 1450.00,
    priceFormatted: "$1,450.00",
    estimateRange: "$630.00 – $3,250.00 USD",
    paymentNote: "Self-Pay via PayPal or Zelle. Prompt payment ships within 24 hours.",
    featuredImage: "/assets/items/lot153_morgan_1897_1.jpg",
    additionalImages: [
      "/assets/items/lot153_morgan_1897_1.jpg",
      "/assets/items/lot153_morgan_1897_2.jpg"
    ],
    isFeatured: true,
    status: "Available"
  },
  {
    id: "item-009",
    lotNumber: "9",
    title: "1921 Pilgrim Tercentenary 50¢ Silver Commemorative MS-65",
    lead: "1921 Pilgrim 50C Tercentenary Silver Coin MS-65 NGC",
    description: "1921 Pilgrim Tercentenary Silver Half Dollar certified MS 65 by NGC. Commemorates the 300th anniversary of the Pilgrims' landing at Plymouth Rock. Obverse features Governor William Bradford holding the Bible; reverse displays the Mayflower under full sail.",
    category: "Commemorative",
    metal: "Silver",
    purity: ".900 Fine Silver (12.5g)",
    grade: "NGC MS-65",
    mintage: "20,053 Total",
    price: 340.00,
    priceFormatted: "$340.00",
    estimateRange: "$280.00 – $375.00 USD",
    paymentNote: "Instant Checkout eligible via PayPal. USPS Priority Insured Shipping.",
    featuredImage: "/assets/items/lot9_pilgrim_1921_1.jpg",
    additionalImages: [
      "/assets/items/lot9_pilgrim_1921_1.jpg",
      "/assets/items/lot9_pilgrim_1921_2.jpg"
    ],
    isFeatured: true,
    status: "Available"
  },
  {
    id: "item-203",
    lotNumber: "203",
    title: "2023-S Peace Silver Dollar PR70 Reverse Proof CAC",
    lead: "2023-S $1 PR70 Peace Reverse Proof CAC Advanced Delivery",
    description: "2023-S Peace Silver Dollar certified PR70 Reverse Proof by CAC (Green Bean Verified) with Advanced Delivery designation. Features mirror-finished devices and frosty satin fields, presenting the highest attainable grade for modern sovereign silver.",
    category: "Silver Bullion",
    metal: "Silver",
    purity: ".999 Fine Silver (0.859 Troy Oz)",
    grade: "CAC PR70 Reverse Proof",
    mintage: "San Francisco Mint Special Issue",
    price: 285.00,
    priceFormatted: "$285.00",
    estimateRange: "$260.00 – $340.00 USD",
    paymentNote: "Self-Pay via PayPal with instant settlement confirmation.",
    featuredImage: "/assets/items/lot203_peace_dollar_2023_pr70.jpg",
    additionalImages: [
      "/assets/items/lot203_peace_dollar_2023_pr70.jpg"
    ],
    isFeatured: true,
    status: "Available"
  },
  {
    id: "item-170",
    lotNumber: "170",
    title: "10 oz Scottsdale .999 Silver Stacker® Bullion Bar",
    lead: "10oz. Scottsdale .999 Silver Stacker Precision Ingot",
    description: "10 Troy Ounces of .999 Fine Silver precision-machined by Scottsdale Mint. Engineered interlocking stacker design with reeded security edges, crowned lion hallmark, and anti-counterfeit swirl stamp on the reverse flan.",
    category: "Silver Bullion",
    metal: "Silver",
    purity: ".999 Fine Silver (10 Troy Oz)",
    grade: "Mint State Bullion (Uncirculated)",
    mintage: "Scottsdale Private Mint",
    price: 385.00,
    priceFormatted: "$385.00",
    estimateRange: "$360.00 – $420.00 USD",
    paymentNote: "Shipped fully insured in tamper-evident protective sleeve.",
    featuredImage: "/assets/items/lot170_scottsdale_10oz_bar.jpg",
    additionalImages: [
      "/assets/items/lot170_scottsdale_10oz_bar.jpg"
    ],
    isFeatured: true,
    status: "Available"
  },
  {
    id: "item-012",
    lotNumber: "12",
    title: "2015 Burundi 5000 Francs Amiot 143 Vintage Aircraft Gold Proof",
    lead: "2015 Burundi S5000F Amiot 143 PF-69 Ultra Cameo Gold Coin",
    description: "2015 Republic of Burundi legal tender 5000 Francs sovereign gold commemorative. Honors the historic French Amiot 143 vintage aircraft soaring above cloud banks. Minted in .999 pure gold with mirror proof finish and certified PF-69 Ultra Cameo.",
    category: "Gold",
    metal: "Gold",
    purity: ".999 Pure Gold (1 Troy Oz)",
    grade: "PF-69 Ultra Cameo",
    mintage: "Limited Sovereign Issue",
    price: 495.00,
    priceFormatted: "$495.00",
    estimateRange: "$420.00 – $550.00 USD",
    paymentNote: "Direct PayPal checkout or Bank Wire. Shipped fully insured.",
    featuredImage: "/assets/items/lot12_burundi_gold_5000f.jpg",
    additionalImages: [
      "/assets/items/lot12_burundi_gold_5000f.jpg"
    ],
    isFeatured: false,
    status: "Available"
  },
  {
    id: "item-028",
    lotNumber: "28",
    title: "2011 Liberia S$5 Shinkansen Bullet Train & Mt. Fuji Silver Proof",
    lead: "2011 Liberia S$5 Shinkansen PF-69 UC Silver Proof (Bullet Train)",
    description: "2011 Liberia 5 Dollars sovereign silver commemorative proof. Celebrates the high-speed Japanese Shinkansen railway traversing beneath Mount Fuji. Certified PF-69 Ultra Cameo by NGC with pristine mirror contrast.",
    category: "Commemorative",
    metal: "Silver",
    purity: ".999 Fine Silver (1 Troy Oz)",
    grade: "NGC PF-69 Ultra Cameo",
    mintage: "Commemorative Series",
    price: 225.00,
    priceFormatted: "$225.00",
    estimateRange: "$185.00 – $260.00 USD",
    paymentNote: "In-house packaged and shipped via USPS Priority insured.",
    featuredImage: "/assets/items/lot28_liberia_shinkansen_silver.jpg",
    additionalImages: [
      "/assets/items/lot28_liberia_shinkansen_silver.jpg"
    ],
    isFeatured: false,
    status: "Available"
  },
  {
    id: "item-044",
    lotNumber: "44",
    title: "1902-O Morgan Silver Dollar PCGS MS-66",
    lead: "1902-O Morgan Silver Dollar PCGS MS-66 Cartwheel Luster",
    description: "1902-O Morgan Silver Dollar struck at the New Orleans Mint. Certified MS-66 by PCGS. Boasts radiating cartwheel mint luster across spotless cheek surfaces and fully struck eagle breast plumage. Hand-picked for exceptional eye appeal.",
    category: "Morgan Dollars",
    metal: "Silver",
    purity: ".900 Fine Silver (26.73g)",
    grade: "PCGS MS-66",
    mintage: "8,290,000",
    price: 460.00,
    priceFormatted: "$460.00",
    estimateRange: "$340.00 – $520.00 USD",
    paymentNote: "Instant close eligible. PayPal pay link pre-configured.",
    featuredImage: "/assets/items/lot44_morgan_1902_o_ms66.jpg",
    additionalImages: [
      "/assets/items/lot44_morgan_1902_o_ms66.jpg"
    ],
    isFeatured: false,
    status: "Available"
  },
  {
    id: "item-077",
    lotNumber: "77",
    title: "Kingdom of Elymais AR Silver Drachm (c. 54–32 BC)",
    lead: "Ancient Kingdom of Elymais AR Drachm Ch-VF Kamnaskires V",
    description: "Ancient Hellenistic silver drachm of the Kingdom of Elymais struck under King Kamnaskires V (c. 54–32 BC). Diademed portrait of the king facing left on obverse; diademed head and archer monogram on reverse. Choice Very Fine condition with verified provenance.",
    category: "Ancient",
    metal: "Silver",
    purity: "Ancient Silver Flan (3.78g)",
    grade: "Choice VF (Certified Provenance)",
    mintage: "Ancient Coinage",
    price: 235.00,
    priceFormatted: "$235.00",
    estimateRange: "$195.00 – $275.00 USD",
    paymentNote: "Ships in archival display capsule with provenance report.",
    featuredImage: "/assets/items/lot77_elymais_silver_drachm.jpg",
    additionalImages: [
      "/assets/items/lot77_elymais_silver_drachm.jpg"
    ],
    isFeatured: false,
    status: "Available"
  },
  {
    id: "item-062",
    lotNumber: "62",
    title: "1883 Morgan Silver Dollar MS-65 Uncirculated",
    lead: "1883 Morgan Silver Dollar MS-65 Philadelphia Gem Strike",
    description: "1883 Morgan Silver Dollar certified MS-65. Philadelphia mint strike featuring crisp white frosted devices, sharp central details on the wreath and stars, and brilliant original mint bloom. Guaranteed sold value under the HGS numismatic promise.",
    category: "Morgan Dollars",
    metal: "Silver",
    purity: ".900 Fine Silver (26.73g)",
    grade: "MS-65 (Hand-Picked Quality)",
    mintage: "12,290,000",
    price: 275.00,
    priceFormatted: "$275.00",
    estimateRange: "$220.00 – $310.00 USD",
    paymentNote: "Self-Pay via PayPal or Zelle with immediate confirmation.",
    featuredImage: "/assets/items/lot153_morgan_1897_1.jpg",
    additionalImages: [
      "/assets/items/lot153_morgan_1897_1.jpg"
    ],
    isFeatured: false,
    status: "Available"
  }
];

/**
 * Database abstraction helper methods (prepared for future Supabase client integration)
 */
export async function getInventory() {
  return Promise.resolve([...INVENTORY_ITEMS]);
}

export async function getItemById(id) {
  return Promise.resolve(INVENTORY_ITEMS.find(item => item.id === id || item.lotNumber === String(id)) || null);
}

export function generatePayPalPaymentLink(amount, note = '') {
  const base = BUSINESS_INFO.payPalUrl;
  const cleanAmount = Number(amount).toFixed(2);
  return `${base}/${cleanAmount}`;
}

export function generateEmailInquiryLink(item) {
  const subject = encodeURIComponent(`Inquiry on Lot #${item.lotNumber}: ${item.title}`);
  const body = encodeURIComponent(
    `Hello Highlander Gold & Silver,\n\nI am interested in acquiring Lot #${item.lotNumber} (${item.title}) listed at ${item.priceFormatted}.\n\nPlease let me know availability and settlement arrangements.\n\nThank you!`
  );
  return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
}
