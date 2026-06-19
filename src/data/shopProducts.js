/* ==================== New arrival images ==================== */

import newArrivalOne from "../assets/images/new-arrival-1.jpg";
import newArrivalTwo from "../assets/images/new-arrival-2.jpg";
import newArrivalThree from "../assets/images/new-arrival-3.jpg";
import newArrivalFour from "../assets/images/new-arrival-4.jpg";
import newArrivalFive from "../assets/images/new-arrival-5.jpg";
import newArrivalSix from "../assets/images/new-arrival-6.jpg";

/* ==================== Featured and sale images ==================== */

import featuredSofaImage from "../assets/images/featured-sofa-shop.jpg";
import featuredLampImage from "../assets/images/featured-lamp-shop.jpg";
import saleBlanketImage from "../assets/images/sale-blanket-shop.jpg";
import saleSconceImage from "../assets/images/sale-sconce-shop.jpg";
import saleTrayImage from "../assets/images/sale-tray-shop.jpg";

/* ==================== Curated product images ==================== */

import curatedProductOne from "../assets/images/shop/curated-product-01.jpg";
import curatedProductTwo from "../assets/images/shop/curated-product-02.jpg";
import curatedProductThree from "../assets/images/shop/curated-product-03.jpg";
import curatedProductFour from "../assets/images/shop/curated-product-04.jpg";
import curatedProductFive from "../assets/images/shop/curated-product-05.jpg";
import curatedProductSix from "../assets/images/shop/curated-product-06.jpg";
import curatedProductSeven from "../assets/images/shop/curated-product-07.jpg";
import curatedProductEight from "../assets/images/shop/curated-product-08.jpg";
import curatedProductNine from "../assets/images/shop/curated-product-09.jpg";
import curatedProductTen from "../assets/images/shop/curated-product-10.jpg";
import curatedProductEleven from "../assets/images/shop/curated-product-11.jpg";
import curatedProductTwelve from "../assets/images/shop/curated-product-12.jpg";

const curatedImages = [
  curatedProductOne,
  curatedProductTwo,
  curatedProductThree,
  curatedProductFour,
  curatedProductFive,
  curatedProductSix,
  curatedProductSeven,
  curatedProductEight,
  curatedProductNine,
  curatedProductTen,
  curatedProductEleven,
  curatedProductTwelve,
];

/* ==================== Product categories ==================== */

export const shopCategories = [
  "All",
  "Living Room",
  "Bedroom",
  "Kitchen & Dining",
  "Office",
  "Wall Art",
  "Lighting",
  "Outdoor",
  "Rug & Carpet",
];

/* ==================== Shared product enhancer ==================== */

const enhanceProduct = (product, index = 0) => {
  return {
    quantity: 1,
    rating: product.rating || 4.8,
    reviews: product.reviews || 120 + index * 4,
    stock: product.stock || 12 + (index % 9),
    sku: product.sku || `DEC-${String(product.id).padStart(4, "0")}`,
    material: product.material || "Premium mixed materials",
    dimensions: product.dimensions || "Standard home-friendly size",
    care: product.care || "Wipe clean with a soft dry cloth.",
    tags: product.tags || [
      product.category,
      "Decorist",
      "Modern Home",
    ],
    gallery: product.gallery || [
      product.image,
    ],
    ...product,
  };
};

/* ==================== Homepage / Shop new arrivals ==================== */

export const newArrivalProducts = [
  {
    id: 1,
    slug: "marble-inlay-coffee-table",
    image: newArrivalOne,
    category: "Living Room",
    title: "Marble-Inlay Coffee Table",
    oldPrice: "$299",
    price: "$249",
    description:
      "A sculptural coffee table with a marble-inspired surface and warm wooden base, designed to anchor modern living rooms.",
    features: [
      "Statement marble-inspired tabletop",
      "Warm wooden pedestal base",
      "Perfect for living room styling",
    ],
    material: "Engineered stone top with solid wood base",
    dimensions: "42W x 24D x 16H inches",
    care: "Clean with a soft damp cloth and avoid harsh chemicals.",
    rating: 4.9,
    reviews: 148,
    stock: 18,
  },
  {
    id: 2,
    slug: "nordic-pendant-light",
    image: newArrivalTwo,
    category: "Lighting",
    title: "Nordic Pendant Light",
    oldPrice: "",
    price: "$89",
    description:
      "A soft modern pendant light crafted for warm ambient lighting above dining tables, reading corners, and kitchen islands.",
    features: [
      "Soft diffused lighting",
      "Minimal Nordic silhouette",
      "Adjustable hanging height",
    ],
    material: "Powder-coated metal with frosted diffuser",
    dimensions: "18W x 18D x 14H inches",
    care: "Dust gently with a dry microfiber cloth.",
    rating: 4.7,
    reviews: 96,
    stock: 24,
  },
  {
    id: 3,
    slug: "rattan-accent-chair",
    image: newArrivalThree,
    category: "Bedroom",
    title: "Rattan Accent Chair",
    oldPrice: "$159",
    price: "$139",
    description:
      "A relaxed rattan accent chair with a soft cushion, perfect for bedroom corners, reading spaces, and natural interiors.",
    features: [
      "Natural rattan-inspired frame",
      "Comfortable loose cushion",
      "Lightweight accent design",
    ],
    material: "Rattan weave with metal frame and fabric cushion",
    dimensions: "29W x 30D x 34H inches",
    care: "Vacuum cushion and wipe frame with a dry cloth.",
    rating: 4.8,
    reviews: 112,
    stock: 15,
  },
  {
    id: 4,
    slug: "abstract-wall-frame-set",
    image: newArrivalFour,
    category: "Wall Art",
    title: "Abstract Wall Frame Set",
    oldPrice: "",
    price: "$75",
    description:
      "A refined wall frame set designed to add quiet visual rhythm and modern personality to blank walls.",
    features: [
      "Minimal abstract artwork",
      "Ready-to-style wall frame",
      "Perfect for gallery walls",
    ],
    material: "Printed canvas with wooden frame",
    dimensions: "24W x 32H inches",
    care: "Keep away from direct moisture and dust lightly.",
    rating: 4.6,
    reviews: 87,
    stock: 20,
  },
  {
    id: 5,
    slug: "boho-patterned-rug",
    image: newArrivalFive,
    category: "Rug & Carpet",
    title: "Boho Patterned Rug",
    oldPrice: "$210",
    price: "$179",
    description:
      "A warm patterned rug that brings softness, texture, and a relaxed bohemian feel to living rooms and bedrooms.",
    features: [
      "Soft woven texture",
      "Warm neutral pattern",
      "Ideal for layered interiors",
    ],
    material: "Cotton blend with woven backing",
    dimensions: "5 x 7 feet",
    care: "Spot clean gently and rotate regularly.",
    rating: 4.8,
    reviews: 134,
    stock: 11,
  },
  {
    id: 6,
    slug: "minimal-wooden-desk",
    image: newArrivalSix,
    category: "Office",
    title: "Minimal Wooden Desk",
    oldPrice: "$350",
    price: "$299",
    description:
      "A clean wooden desk designed for focused work, practical storage, and beautifully minimal home offices.",
    features: [
      "Clean modern work surface",
      "Warm wooden finish",
      "Great for compact offices",
    ],
    material: "Solid wood veneer with reinforced frame",
    dimensions: "48W x 24D x 30H inches",
    care: "Wipe with a dry cloth and use coasters for drinks.",
    rating: 4.9,
    reviews: 158,
    stock: 9,
  },
].map(enhanceProduct);

/* ==================== Shop featured products ==================== */

export const featuredProducts = [
  {
    id: 101,
    slug: "velvet-tufted-sofa",
    image: featuredSofaImage,
    category: "Living Room",
    title: "Velvet Tufted Sofa",
    price: "$520",
    oldPrice: "",
    description:
      "Add a touch of luxury and comfort with this elegant velvet tufted sofa, perfect for relaxing and styling.",
    features: [
      "Premium fabric with plush seating",
      "Available in 3 colors",
    ],
    material: "Velvet upholstery with solid wood frame",
    dimensions: "84W x 36D x 31H inches",
    care: "Vacuum gently and spot clean with fabric-safe cleaner.",
    rating: 4.9,
    reviews: 248,
    stock: 8,
  },
  {
    id: 102,
    slug: "industrial-floor-lamp",
    image: featuredLampImage,
    category: "Lighting",
    title: "Industrial Floor Lamp",
    price: "$120",
    oldPrice: "",
    description:
      "Illuminate your home with this stylish floor lamp—both a lighting solution and a statement piece.",
    features: [
      "Adjustable height and angle",
      "Warm ambient glow",
    ],
    material: "Metal frame with matte finish",
    dimensions: "16W x 16D x 62H inches",
    care: "Dust with a soft cloth and unplug before cleaning.",
    rating: 4.7,
    reviews: 174,
    stock: 17,
  },
].map(enhanceProduct);

/* ==================== Shop sale products ==================== */

export const saleProducts = [
  {
    id: 201,
    slug: "geometric-woven-blanket",
    image: saleBlanketImage,
    category: "Bedroom",
    title: "Geometric Woven Blanket",
    discount: "20% OFF",
    price: "$96",
    oldPrice: "$120",
    description:
      "A cozy geometric woven blanket that adds soft texture and warmth to beds, sofas, and reading corners.",
    features: [
      "Soft woven cotton blend",
      "Geometric surface texture",
      "Perfect for layering",
    ],
    material: "Cotton and acrylic blend",
    dimensions: "50W x 60H inches",
    care: "Machine wash cold and tumble dry low.",
    rating: 4.8,
    reviews: 126,
    stock: 22,
  },
  {
    id: 202,
    slug: "glass-globe-wall-sconce-set",
    image: saleSconceImage,
    category: "Lighting",
    title: "Glass Globe Wall Sconce Set",
    discount: "25% OFF",
    price: "$135",
    oldPrice: "$180",
    description:
      "A polished glass globe sconce set that brings warm reflection and elegant lighting to modern walls.",
    features: [
      "Reflective glass globe finish",
      "Ideal for hallway lighting",
      "Set of coordinated sconces",
    ],
    material: "Glass shade with metal hardware",
    dimensions: "8W x 10D x 12H inches each",
    care: "Dust regularly and clean glass with a soft cloth.",
    rating: 4.7,
    reviews: 94,
    stock: 14,
  },
  {
    id: 203,
    slug: "terrazzo-decorative-tray",
    image: saleTrayImage,
    category: "Kitchen & Dining",
    title: "Terrazzo Decorative Tray",
    discount: "18% OFF",
    price: "$82",
    oldPrice: "$100",
    description:
      "A sculptural terrazzo tray designed for serving, shelf styling, and organizing everyday essentials.",
    features: [
      "Modern terrazzo texture",
      "Great for tabletop styling",
      "Durable decorative surface",
    ],
    material: "Terrazzo composite",
    dimensions: "15W x 10D x 1.5H inches",
    care: "Wipe clean with a damp cloth.",
    rating: 4.6,
    reviews: 78,
    stock: 19,
  },
].map(enhanceProduct);

/* ==================== Curated products raw data ==================== */

const rawCuratedProducts = [
  {
    id: 301,
    slug: "sculptural-ceramic-lamp",
    category: "Lighting",
    title: "Sculptural Ceramic Lamp",
    price: "$95",
    oldPrice: "",
    description:
      "A soft-glow ceramic table lamp designed to bring warmth, texture, and calm character to any corner.",
    features: [
      "Warm ambient lighting",
      "Sculptural ceramic base",
      "Perfect for side tables",
    ],
  },
  {
    id: 302,
    slug: "linen-upholstered-bench",
    category: "Bedroom",
    title: "Linen Upholstered Bench",
    price: "$165",
    oldPrice: "$185",
    description:
      "A comfortable upholstered bench with clean lines, ideal for bedrooms, entryways, and relaxed seating moments.",
    features: [
      "Soft linen upholstery",
      "Compact bedroom seating",
      "Modern wooden legs",
    ],
  },
  {
    id: 303,
    slug: "minimal-floating-wall-shelf",
    category: "Wall Art",
    title: "Minimal Floating Wall Shelf",
    price: "$70",
    oldPrice: "",
    description:
      "A refined floating shelf for displaying books, ceramics, greenery, and small decorative objects beautifully.",
    features: [
      "Minimal wall-mounted design",
      "Great for decor display",
      "Clean floating profile",
    ],
  },
  {
    id: 304,
    slug: "bamboo-utensil-organizer",
    category: "Kitchen & Dining",
    title: "Bamboo Utensil Organizer",
    price: "$34",
    oldPrice: "",
    description:
      "A practical bamboo organizer that keeps kitchen tools neat, accessible, and naturally styled.",
    features: [
      "Natural bamboo construction",
      "Multiple storage compartments",
      "Drawer-friendly design",
    ],
  },
  {
    id: 305,
    slug: "natural-jute-round-rug",
    category: "Rug & Carpet",
    title: "Natural Jute Round Rug",
    price: "$129",
    oldPrice: "$150",
    description:
      "A handwoven jute rug with organic texture, perfect for layering warmth into living spaces.",
    features: [
      "Natural woven jute",
      "Round organic silhouette",
      "Great for layered styling",
    ],
  },
  {
    id: 306,
    slug: "velvet-accent-armchair",
    category: "Living Room",
    title: "Velvet Accent Armchair",
    price: "$220",
    oldPrice: "",
    description:
      "A cozy accent chair with a sculptural silhouette and soft velvet finish for modern lounging.",
    features: [
      "Soft velvet finish",
      "Curved accent silhouette",
      "Comfortable lounge seating",
    ],
  },
  {
    id: 307,
    slug: "marble-top-coffee-table",
    category: "Living Room",
    title: "Marble Top Coffee Table",
    price: "$275",
    oldPrice: "",
    description:
      "A statement coffee table pairing smooth marble texture with a grounded contemporary profile.",
    features: [
      "Marble-inspired tabletop",
      "Modern compact profile",
      "Durable living room surface",
    ],
  },
  {
    id: 308,
    slug: "minimalist-wooden-bookshelf",
    category: "Office",
    title: "Minimalist Wooden Bookshelf",
    price: "$120",
    oldPrice: "",
    description:
      "A slim wooden bookshelf designed for books, files, and decorative styling in workspaces.",
    features: [
      "Slim vertical storage",
      "Warm wooden finish",
      "Perfect for home office",
    ],
  },
  {
    id: 309,
    slug: "brass-decorative-mirror",
    category: "Living Room",
    title: "Brass Decorative Mirror",
    price: "$110",
    oldPrice: "",
    description:
      "A warm brass mirror that reflects natural light and adds quiet elegance to walls.",
    features: [
      "Warm brass frame",
      "Reflects natural light",
      "Ideal for wall styling",
    ],
  },
  {
    id: 310,
    slug: "industrial-mesh-desk-lamp",
    category: "Office",
    title: "Industrial Mesh Desk Lamp",
    price: "$68",
    oldPrice: "",
    description:
      "A compact desk lamp with industrial texture and focused lighting for productive work sessions.",
    features: [
      "Focused desk lighting",
      "Industrial mesh detail",
      "Compact work setup",
    ],
  },
  {
    id: 311,
    slug: "rattan-patio-lounger",
    category: "Outdoor",
    title: "Rattan Patio Lounger",
    price: "$199",
    oldPrice: "$240",
    description:
      "A breathable rattan lounger crafted for slow outdoor mornings, patios, and balcony corners.",
    features: [
      "Outdoor-friendly frame",
      "Relaxed rattan texture",
      "Comfortable lounging shape",
    ],
  },
  {
    id: 312,
    slug: "abstract-canvas-wall-art",
    category: "Wall Art",
    title: "Abstract Canvas Wall Art",
    price: "$112",
    oldPrice: "$130",
    description:
      "A softly composed canvas piece that adds color, movement, and personality to blank walls.",
    features: [
      "Abstract modern artwork",
      "Ready-to-hang canvas",
      "Soft color composition",
    ],
  },
  {
    id: 313,
    slug: "oak-side-table",
    category: "Living Room",
    title: "Oak Side Table",
    price: "$145",
    oldPrice: "",
    description:
      "A compact oak side table with natural grain and timeless proportions for everyday living.",
    features: [
      "Natural oak finish",
      "Compact side profile",
      "Great beside sofa",
    ],
  },
  {
    id: 314,
    slug: "cotton-waffle-throw",
    category: "Bedroom",
    title: "Cotton Waffle Throw",
    price: "$58",
    oldPrice: "$72",
    description:
      "A soft cotton throw with breathable waffle texture for beds, sofas, and layered styling.",
    features: [
      "Breathable cotton texture",
      "Soft waffle weave",
      "Lightweight cozy layer",
    ],
  },
  {
    id: 315,
    slug: "ceramic-dinner-plate-set",
    category: "Kitchen & Dining",
    title: "Ceramic Dinner Plate Set",
    price: "$84",
    oldPrice: "",
    description:
      "A durable ceramic plate set with an artisanal finish for everyday dining and hosting.",
    features: [
      "Artisanal ceramic finish",
      "Everyday dining set",
      "Easy table styling",
    ],
  },
  {
    id: 316,
    slug: "woven-storage-basket",
    category: "Rug & Carpet",
    title: "Woven Storage Basket",
    price: "$45",
    oldPrice: "",
    description:
      "A natural woven basket for storing blankets, magazines, toys, or daily essentials beautifully.",
    features: [
      "Natural woven texture",
      "Flexible storage use",
      "Great for living rooms",
    ],
  },
  {
    id: 317,
    slug: "modern-wall-clock",
    category: "Wall Art",
    title: "Modern Wall Clock",
    price: "$62",
    oldPrice: "",
    description:
      "A minimal wall clock with clean typography and a calm contemporary presence.",
    features: [
      "Minimal clock face",
      "Quiet wall accent",
      "Modern graphic style",
    ],
  },
  {
    id: 318,
    slug: "linen-curtain-panel",
    category: "Bedroom",
    title: "Linen Curtain Panel",
    price: "$78",
    oldPrice: "$95",
    description:
      "A light-filtering linen curtain panel that softens windows and creates a relaxed mood.",
    features: [
      "Light-filtering fabric",
      "Soft linen texture",
      "Relaxed window styling",
    ],
  },
  {
    id: 319,
    slug: "walnut-writing-desk",
    category: "Office",
    title: "Walnut Writing Desk",
    price: "$310",
    oldPrice: "",
    description:
      "A refined walnut desk with generous workspace and warm natural character.",
    features: [
      "Spacious writing surface",
      "Warm walnut tone",
      "Clean office silhouette",
    ],
  },
  {
    id: 320,
    slug: "glass-pendant-light",
    category: "Lighting",
    title: "Glass Pendant Light",
    price: "$115",
    oldPrice: "$140",
    description:
      "A clear glass pendant that brings soft vertical lighting to dining rooms and kitchens.",
    features: [
      "Clear glass shade",
      "Warm vertical glow",
      "Great above dining tables",
    ],
  },
  {
    id: 321,
    slug: "outdoor-planter-stand",
    category: "Outdoor",
    title: "Outdoor Planter Stand",
    price: "$92",
    oldPrice: "",
    description:
      "A sturdy planter stand for elevating greenery across patios, balconies, and garden corners.",
    features: [
      "Outdoor-ready stand",
      "Elevates greenery",
      "Compact balcony friendly",
    ],
  },
  {
    id: 322,
    slug: "arched-floor-mirror",
    category: "Bedroom",
    title: "Arched Floor Mirror",
    price: "$260",
    oldPrice: "",
    description:
      "A full-length arched mirror that visually opens the room while adding graceful structure.",
    features: [
      "Full-length mirror",
      "Elegant arched shape",
      "Bedroom styling essential",
    ],
  },
  {
    id: 323,
    slug: "textured-wall-tapestry",
    category: "Wall Art",
    title: "Textured Wall Tapestry",
    price: "$98",
    oldPrice: "$120",
    description:
      "A woven wall tapestry with tactile dimension and a warm handmade feel.",
    features: [
      "Woven wall texture",
      "Warm handmade look",
      "Softens empty walls",
    ],
  },
  {
    id: 324,
    slug: "stoneware-serving-bowl",
    category: "Kitchen & Dining",
    title: "Stoneware Serving Bowl",
    price: "$48",
    oldPrice: "",
    description:
      "A sculptural stoneware bowl for serving, styling, and everyday kitchen display.",
    features: [
      "Durable stoneware",
      "Sculptural serving form",
      "Kitchen display piece",
    ],
  },
  {
    id: 325,
    slug: "boucle-lounge-chair",
    category: "Living Room",
    title: "Boucle Lounge Chair",
    price: "$360",
    oldPrice: "$410",
    description:
      "A plush boucle lounge chair with rounded form and inviting comfort.",
    features: [
      "Soft boucle texture",
      "Rounded lounge profile",
      "Premium comfortable seat",
    ],
  },
  {
    id: 326,
    slug: "handmade-table-vase",
    category: "Living Room",
    title: "Handmade Table Vase",
    price: "$52",
    oldPrice: "",
    description:
      "A handmade vase with organic curves for flowers, dried stems, or standalone styling.",
    features: [
      "Organic handmade shape",
      "Perfect for dried stems",
      "Subtle tabletop accent",
    ],
  },
  {
    id: 327,
    slug: "reclaimed-wood-console",
    category: "Living Room",
    title: "Reclaimed Wood Console",
    price: "$430",
    oldPrice: "",
    description:
      "A character-rich console crafted from reclaimed wood for entryways and living rooms.",
    features: [
      "Reclaimed wood texture",
      "Entryway-friendly storage",
      "Warm statement profile",
    ],
  },
  {
    id: 328,
    slug: "woven-desk-organizer",
    category: "Office",
    title: "Woven Desk Organizer",
    price: "$38",
    oldPrice: "",
    description:
      "A compact desk organizer for stationery, notes, and small workspace essentials.",
    features: [
      "Compact desk storage",
      "Natural woven finish",
      "Keeps workspace clean",
    ],
  },
  {
    id: 329,
    slug: "linen-dining-chair",
    category: "Kitchen & Dining",
    title: "Linen Dining Chair",
    price: "$155",
    oldPrice: "$180",
    description:
      "A cushioned dining chair with linen upholstery and clean everyday comfort.",
    features: [
      "Soft linen upholstery",
      "Comfortable dining seat",
      "Modern clean frame",
    ],
  },
  {
    id: 330,
    slug: "soft-wool-area-rug",
    category: "Rug & Carpet",
    title: "Soft Wool Area Rug",
    price: "$245",
    oldPrice: "",
    description:
      "A soft wool area rug that grounds furniture layouts with gentle texture.",
    features: [
      "Soft wool surface",
      "Grounds room layouts",
      "Warm neutral texture",
    ],
  },
  {
    id: 331,
    slug: "adjustable-reading-lamp",
    category: "Lighting",
    title: "Adjustable Reading Lamp",
    price: "$88",
    oldPrice: "",
    description:
      "A flexible reading lamp designed for bedrooms, reading corners, and home offices.",
    features: [
      "Adjustable lamp head",
      "Focused reading light",
      "Compact stylish base",
    ],
  },
  {
    id: 332,
    slug: "outdoor-folding-chair",
    category: "Outdoor",
    title: "Outdoor Folding Chair",
    price: "$118",
    oldPrice: "$135",
    description:
      "A foldable outdoor chair with relaxed comfort and easy seasonal storage.",
    features: [
      "Foldable outdoor design",
      "Easy seasonal storage",
      "Comfortable patio seating",
    ],
  },
  {
    id: 333,
    slug: "gallery-frame-set",
    category: "Wall Art",
    title: "Gallery Frame Set",
    price: "$76",
    oldPrice: "",
    description:
      "A coordinated frame set for building simple, balanced gallery wall arrangements.",
    features: [
      "Coordinated frame set",
      "Gallery wall ready",
      "Minimal modern look",
    ],
  },
  {
    id: 334,
    slug: "wooden-bedside-table",
    category: "Bedroom",
    title: "Wooden Bedside Table",
    price: "$132",
    oldPrice: "",
    description:
      "A warm bedside table with practical storage and timeless wooden texture.",
    features: [
      "Compact bedside storage",
      "Warm wooden surface",
      "Timeless bedroom shape",
    ],
  },
  {
    id: 335,
    slug: "minimal-office-chair",
    category: "Office",
    title: "Minimal Office Chair",
    price: "$210",
    oldPrice: "$250",
    description:
      "A supportive office chair with clean lines for focused work and everyday comfort.",
    features: [
      "Supportive work seating",
      "Minimal office profile",
      "Comfortable daily use",
    ],
  },
  {
    id: 336,
    slug: "marble-serving-board",
    category: "Kitchen & Dining",
    title: "Marble Serving Board",
    price: "$64",
    oldPrice: "",
    description:
      "A polished marble serving board for appetizers, styling, and kitchen display.",
    features: [
      "Polished marble texture",
      "Serving and styling use",
      "Elegant kitchen accent",
    ],
  },
  {
    id: 337,
    slug: "rattan-storage-cabinet",
    category: "Living Room",
    title: "Rattan Storage Cabinet",
    price: "$390",
    oldPrice: "",
    description:
      "A rattan-front cabinet blending hidden storage with natural woven charm.",
    features: [
      "Rattan-front storage",
      "Hidden cabinet space",
      "Natural living room charm",
    ],
  },
  {
    id: 338,
    slug: "ceramic-wall-sconce",
    category: "Lighting",
    title: "Ceramic Wall Sconce",
    price: "$126",
    oldPrice: "$155",
    description:
      "A ceramic wall sconce that adds sculptural lighting to halls, bedrooms, and lounges.",
    features: [
      "Ceramic sculptural shade",
      "Wall-mounted lighting",
      "Warm ambient glow",
    ],
  },
  {
    id: 339,
    slug: "striped-cotton-rug",
    category: "Rug & Carpet",
    title: "Striped Cotton Rug",
    price: "$89",
    oldPrice: "",
    description:
      "A lightweight striped cotton rug for relaxed rooms and layered interiors.",
    features: [
      "Light cotton weave",
      "Relaxed stripe pattern",
      "Easy room layering",
    ],
  },
  {
    id: 340,
    slug: "outdoor-lantern-set",
    category: "Outdoor",
    title: "Outdoor Lantern Set",
    price: "$74",
    oldPrice: "",
    description:
      "A lantern set designed to create warm evening light for patios and garden tables.",
    features: [
      "Warm evening light",
      "Outdoor table styling",
      "Set of matching lanterns",
    ],
  },
  {
    id: 341,
    slug: "scandinavian-tv-unit",
    category: "Living Room",
    title: "Scandinavian TV Unit",
    price: "$480",
    oldPrice: "$540",
    description:
      "A low-profile TV unit with clean storage and a bright Scandinavian finish.",
    features: [
      "Low-profile media unit",
      "Clean hidden storage",
      "Scandinavian wood tone",
    ],
  },
  {
    id: 342,
    slug: "abstract-line-print",
    category: "Wall Art",
    title: "Abstract Line Print",
    price: "$42",
    oldPrice: "",
    description:
      "A minimal abstract print that adds visual rhythm without overwhelming the room.",
    features: [
      "Minimal line artwork",
      "Modern wall accent",
      "Easy frame styling",
    ],
  },
  {
    id: 343,
    slug: "compact-desk-shelf",
    category: "Office",
    title: "Compact Desk Shelf",
    price: "$56",
    oldPrice: "",
    description:
      "A desktop shelf for raising essentials and organizing a calm work surface.",
    features: [
      "Raises desk essentials",
      "Compact storage layer",
      "Clean workspace styling",
    ],
  },
  {
    id: 344,
    slug: "woven-patio-table",
    category: "Outdoor",
    title: "Woven Patio Table",
    price: "$185",
    oldPrice: "",
    description:
      "A woven patio side table built for drinks, books, and outdoor styling.",
    features: [
      "Outdoor side table",
      "Woven natural detail",
      "Patio-friendly size",
    ],
  },
  {
    id: 345,
    slug: "matte-black-cutlery-set",
    category: "Kitchen & Dining",
    title: "Matte Black Cutlery Set",
    price: "$72",
    oldPrice: "$90",
    description:
      "A matte cutlery set that gives table settings a modern graphic edge.",
    features: [
      "Matte black finish",
      "Modern table styling",
      "Complete cutlery set",
    ],
  },
  {
    id: 346,
    slug: "cloud-soft-pillow-set",
    category: "Bedroom",
    title: "Cloud Soft Pillow Set",
    price: "$66",
    oldPrice: "",
    description:
      "A soft pillow set crafted for restful sleep and layered bed styling.",
    features: [
      "Soft supportive fill",
      "Great for bed layering",
      "Comfort-focused design",
    ],
  },
  {
    id: 347,
    slug: "brass-table-lamp",
    category: "Lighting",
    title: "Brass Table Lamp",
    price: "$104",
    oldPrice: "",
    description:
      "A brass table lamp with a warm metallic finish and softly diffused light.",
    features: [
      "Warm brass finish",
      "Soft diffused shade",
      "Elegant tabletop glow",
    ],
  },
  {
    id: 348,
    slug: "hand-tufted-runner-rug",
    category: "Rug & Carpet",
    title: "Hand Tufted Runner Rug",
    price: "$155",
    oldPrice: "$180",
    description:
      "A hand-tufted runner rug for hallways, bedrooms, and narrow living spaces.",
    features: [
      "Hand-tufted texture",
      "Runner rug format",
      "Perfect for hallways",
    ],
  },
  {
    id: 349,
    slug: "curved-accent-stool",
    category: "Living Room",
    title: "Curved Accent Stool",
    price: "$98",
    oldPrice: "",
    description:
      "A curved accent stool that works as seating, display, or a flexible side piece.",
    features: [
      "Flexible accent seating",
      "Curved modern form",
      "Doubles as display",
    ],
  },
  {
    id: 350,
    slug: "framed-botanical-print",
    category: "Wall Art",
    title: "Framed Botanical Print",
    price: "$59",
    oldPrice: "",
    description:
      "A framed botanical print that adds natural softness and fresh color to walls.",
    features: [
      "Botanical wall artwork",
      "Framed and ready",
      "Fresh natural feel",
    ],
  },
];

/* ==================== Curated products with images ==================== */

export const shopProducts = rawCuratedProducts.map((product, index) => {
  return enhanceProduct(
    {
      ...product,
      image: curatedImages[index % curatedImages.length],
      material:
        product.material || "Premium wood, ceramic, fabric, or natural mixed materials",
      dimensions:
        product.dimensions || "Designed for standard modern home spaces",
      care:
        product.care || "Wipe clean with a soft dry cloth and avoid harsh cleaners.",
      rating: 4.6 + (index % 4) * 0.1,
      reviews: 92 + index * 5,
      stock: 8 + (index % 12),
    },
    index
  );
});

/* ==================== All products for Shop Details page ==================== */

export const allProducts = [
  ...newArrivalProducts,
  ...featuredProducts,
  ...saleProducts,
  ...shopProducts,
];

export const getProductById = (productId) => {
  return allProducts.find((product) => {
    return String(product.id) === String(productId);
  });
};

export const getProductBySlug = (slug) => {
  return allProducts.find((product) => {
    return product.slug === slug;
  });
};

export const getProductsByCategory = (category) => {
  if (category === "All") {
    return shopProducts;
  }

  return shopProducts.filter((product) => {
    return product.category === category;
  });
};