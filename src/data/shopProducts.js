import productImageOne from "../assets/images/shop/curated-product-01.jpg";
import productImageTwo from "../assets/images/shop/curated-product-02.jpg";
import productImageThree from "../assets/images/shop/curated-product-03.jpg";
import productImageFour from "../assets/images/shop/curated-product-04.jpg";
import productImageFive from "../assets/images/shop/curated-product-05.jpg";
import productImageSix from "../assets/images/shop/curated-product-06.jpg";
import productImageSeven from "../assets/images/shop/curated-product-07.jpg";
import productImageEight from "../assets/images/shop/curated-product-08.jpg";
import productImageNine from "../assets/images/shop/curated-product-09.jpg";
import productImageTen from "../assets/images/shop/curated-product-10.jpg";
import productImageEleven from "../assets/images/shop/curated-product-11.jpg";
import productImageTwelve from "../assets/images/shop/curated-product-12.jpg";

const productImages = [
  productImageOne,
  productImageTwo,
  productImageThree,
  productImageFour,
  productImageFive,
  productImageSix,
  productImageSeven,
  productImageEight,
  productImageNine,
  productImageTen,
  productImageEleven,
  productImageTwelve,
];

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

const rawProducts = [
  {
    id: 301,
    slug: "sculptural-ceramic-lamp",
    category: "Lighting",
    title: "Sculptural Ceramic Lamp",
    price: "$95",
    oldPrice: "",
    description:
      "A soft-glow ceramic table lamp designed to bring warmth, texture, and calm character to any corner.",
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
  },
];

export const shopProducts = rawProducts.map((product, index) => ({
  ...product,
  image: productImages[index % productImages.length],
  quantity: 1,
  material: "Premium mixed materials",
  dimensions: "Standard home-friendly size",
  care: "Wipe clean with a soft dry cloth",
  rating: 4.8,
  reviews: 120 + index * 3,
  stock: 12 + (index % 8),
  tags: [
    product.category,
    "Decorist",
    "Modern Home",
  ],
}));