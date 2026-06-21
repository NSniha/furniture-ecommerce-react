import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import aboutFinalCtaImage from "../../assets/images/about-dream-cta-bg.jpg";

import {
  allProducts,
  getProductById,
} from "../../data/shopProducts";

const CART_ITEMS_KEY = "decoristCartItems";
const CART_COUNT_KEY = "decoristCartCount";

const WISHLIST_ITEMS_KEY = "decoristWishlistItems";
const WISHLIST_COUNT_KEY = "decoristWishlistCount";

const COUNT_UPDATE_EVENT = "decorist-counts-updated";
const CART_ADDED_EVENT = "decorist-cart-item-added";

/* ==================== Storage helpers ==================== */

const getStoredItems = (key) => {
  try {
    const savedItems = JSON.parse(localStorage.getItem(key));

    return Array.isArray(savedItems) ? savedItems : [];
  } catch {
    return [];
  }
};

const saveStoredItems = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

const updateCount = (key, count) => {
  localStorage.setItem(key, String(count));

  window.dispatchEvent(new Event(COUNT_UPDATE_EVENT));
};

const getTotalCartQuantity = (items) => {
  return items.reduce((total, item) => {
    return total + Number(item.quantity || 1);
  }, 0);
};

const getPriceNumber = (price = "") => {
  const cleanPrice = String(price).replace(/[^0-9.]/g, "");
  const numericPrice = Number(cleanPrice);

  return Number.isFinite(numericPrice) ? numericPrice : 0;
};

const getProductPayload = (product, quantity = 1) => {
  return {
    id: product.id,
    slug: product.slug,
    image: product.image,
    category: product.category,
    categoryKey: product.categoryKey || "",
    title: product.title,
    subtitle: product.subtitle || "",
    oldPrice: product.oldPrice || "",
    price: product.price,
    discount: product.discount || "",
    quantity,
    description: product.description || "",
    features: product.features || [],
    material: product.material || "",
    dimensions: product.dimensions || "",
    care: product.care || "",
    rating: product.rating || 4.8,
    reviews: product.reviews || 0,
    stock: product.stock || 0,
    sku: product.sku || "",
    tags: product.tags || [],
    gallery: product.gallery || [
      product.image,
    ],
  };
};

/* ==================== Section reveal hook ==================== */

const useSectionReveal = (threshold = 0.14) => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [threshold]);

  return {
    sectionRef,
    visible,
  };
};

/* ==================== Product gallery helper ==================== */

const getGalleryImages = (product) => {
  const productGallery =
    Array.isArray(product.gallery) && product.gallery.length > 0
      ? product.gallery
      : [
          product.image,
        ];

  const baseImage = productGallery[0] || product.image;

  return [
    {
      id: 1,
      image: productGallery[0] || baseImage,
      alt: `${product.title} main angle`,
      objectPosition: "center center",
      thumbnailTransform: "scale(1.05)",
    },
    {
      id: 2,
      image: productGallery[1] || baseImage,
      alt: `${product.title} left angle`,
      objectPosition: "left 42%",
      thumbnailTransform: "scale(1.35) translateX(-11%) translateY(2%)",
    },
    {
      id: 3,
      image: productGallery[2] || baseImage,
      alt: `${product.title} styled center angle`,
      objectPosition: "center 35%",
      thumbnailTransform: "scale(1.2) translateY(8%) rotate(1.2deg)",
    },
    {
      id: 4,
      image: productGallery[3] || baseImage,
      alt: `${product.title} right angle`,
      objectPosition: "right 40%",
      thumbnailTransform:
        "scale(1.42) translateX(12%) translateY(-5%) rotate(-1.2deg)",
    },
  ];
};

/* ==================== Review data ==================== */

const reviewItems = [
  {
    id: 1,
    rating: 5,
    title: "Quiet, beautiful, and adds warmth, love this piece!",
    text:
      "It looks even better in person! The texture is rich and feels authentic, and I’ve already received several compliments from guests.",
    name: "Emily Kingsley",
    location: "Seattle, WA",
  },
  {
    id: 2,
    rating: 4,
    title: "Shipping was quick, and it arrived in perfect condition.",
    text:
      "Great craftsmanship. You can tell it’s made with care. The minimalist design works well in my office, and the finish feels premium.",
    name: "Jonah Robin",
    location: "San Antonio, TX",
  },
];

/* ==================== Review stars ==================== */

const ReviewStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-[5px]">
      {Array.from(
        {
          length: 5,
        },
        (_, index) => {
          const isActive = index < rating;

          return (
            <Star
              key={index}
              size={18}
              strokeWidth={1.25}
              fill={isActive ? "#f28a00" : "#d7d7d2"}
              className={isActive ? "text-[#f28a00]" : "text-[#d7d7d2]"}
            />
          );
        }
      )}
    </div>
  );
};

const ShopDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    sectionRef: finalCtaRef,
    visible: finalCtaVisible,
  } = useSectionReveal(0.14);

  const product = useMemo(() => {
    const foundProduct = getProductById(productId);

    return foundProduct || allProducts[0];
  }, [productId]);

  const galleryImages = useMemo(() => {
    return getGalleryImages(product);
  }, [product]);

  const similarProducts = useMemo(() => {
    const sameCategoryProducts = allProducts.filter((item) => {
      return (
        Number(item.id) !== Number(product.id) &&
        item.category === product.category
      );
    });

    const fallbackProducts = allProducts.filter((item) => {
      return (
        Number(item.id) !== Number(product.id) &&
        item.category !== product.category
      );
    });

    return [
      ...sameCategoryProducts,
      ...fallbackProducts,
    ].slice(0, 3);
  }, [product]);

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [openAccordion, setOpenAccordion] = useState("details");

  const isWishlisted = wishlistIds.includes(Number(product.id));
  const productPrice = getPriceNumber(product.price);

  useEffect(() => {
    setActiveImage(galleryImages[0]);
    setQuantity(1);
    setZoomed(false);
    setOpenAccordion("details");
  }, [galleryImages, product.id]);

  useEffect(() => {
    const syncWishlistState = () => {
      const wishlistItems = getStoredItems(WISHLIST_ITEMS_KEY);

      setWishlistIds(
        wishlistItems.map((item) => Number(item.id))
      );
    };

    syncWishlistState();

    window.addEventListener("storage", syncWishlistState);
    window.addEventListener(COUNT_UPDATE_EVENT, syncWishlistState);

    return () => {
      window.removeEventListener("storage", syncWishlistState);
      window.removeEventListener(COUNT_UPDATE_EVENT, syncWishlistState);
    };
  }, []);

  const handleQuantityDecrease = () => {
    setQuantity((currentQuantity) => {
      return Math.max(1, currentQuantity - 1);
    });
  };

  const handleQuantityIncrease = () => {
    setQuantity((currentQuantity) => {
      return currentQuantity + 1;
    });
  };

  const handleWishlistToggle = () => {
    const wishlistItems = getStoredItems(WISHLIST_ITEMS_KEY);

    const alreadyExists = wishlistItems.some((item) => {
      return Number(item.id) === Number(product.id);
    });

    let nextWishlistItems;

    if (alreadyExists) {
      nextWishlistItems = wishlistItems.filter((item) => {
        return Number(item.id) !== Number(product.id);
      });
    } else {
      nextWishlistItems = [
        ...wishlistItems,
        getProductPayload(product, 1),
      ];
    }

    saveStoredItems(WISHLIST_ITEMS_KEY, nextWishlistItems);
    updateCount(WISHLIST_COUNT_KEY, nextWishlistItems.length);

    setWishlistIds(
      nextWishlistItems.map((item) => Number(item.id))
    );
  };

  const handleAddToCart = () => {
    const cartItems = getStoredItems(CART_ITEMS_KEY);

    const existingProduct = cartItems.find((item) => {
      return Number(item.id) === Number(product.id);
    });

    const selectedQuantity = Math.max(1, Number(quantity || 1));

    let nextCartItems;

    if (existingProduct) {
      nextCartItems = cartItems.map((item) => {
        if (Number(item.id) !== Number(product.id)) {
          return item;
        }

        return {
          ...item,
          quantity: Number(item.quantity || 1) + selectedQuantity,
        };
      });
    } else {
      nextCartItems = [
        ...cartItems,
        getProductPayload(product, selectedQuantity),
      ];
    }

    saveStoredItems(CART_ITEMS_KEY, nextCartItems);
    updateCount(CART_COUNT_KEY, getTotalCartQuantity(nextCartItems));

    window.dispatchEvent(
      new CustomEvent(CART_ADDED_EVENT, {
        detail: getProductPayload(product, selectedQuantity),
      })
    );
  };

  const handleAccordionToggle = (item) => {
    setOpenAccordion((currentItem) => {
      return currentItem === item ? "" : item;
    });
  };

  return (
    <main className="w-full overflow-hidden bg-[#f8f8f6] text-[#151515]">
      {/* ==================== Product details section ==================== */}

      <section className="w-full bg-[#f8f8f6] pb-[104px] pt-[70px] max-[1400px]:pb-[92px] max-[1400px]:pt-[60px] max-[1024px]:pb-[78px] max-[1024px]:pt-[52px] max-[640px]:pb-[62px] max-[640px]:pt-[36px]">
        <div className="site-container">
          <div className="grid grid-cols-[1fr_0.95fr] gap-[48px] max-[1280px]:gap-[40px] max-[980px]:grid-cols-1 max-[980px]:gap-[46px]">
            {/* ==================== Product gallery ==================== */}

            <div className="w-full">
              <div className="group relative aspect-[731/516] w-full overflow-hidden bg-[#e8e4dc] max-[640px]:aspect-[1/0.78]">
                <img
                  src={activeImage.image}
                  alt={activeImage.alt}
                  style={{
                    objectPosition: activeImage.objectPosition,
                    transform: zoomed ? "scale(1.18)" : "scale(1)",
                  }}
                  className="h-full w-full object-cover transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.03]" />

                <button
                  type="button"
                  onClick={() => setZoomed((currentValue) => !currentValue)}
                  aria-label={zoomed ? "Zoom out image" : "Zoom in image"}
                  className="absolute right-6 top-6 inline-flex h-12 w-12 translate-y-2 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white/90 p-0 text-[#151515] opacity-0 shadow-[0_16px_34px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0 hover:bg-[#151515] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 max-[1024px]:translate-y-0 max-[1024px]:opacity-100 max-[640px]:right-4 max-[640px]:top-4 max-[640px]:h-10 max-[640px]:w-10"
                >
                  {zoomed ? (
                    <ZoomOut
                      size={20}
                      strokeWidth={1.55}
                    />
                  ) : (
                    <ZoomIn
                      size={20}
                      strokeWidth={1.55}
                    />
                  )}
                </button>
              </div>

              <div className="mt-[18px] grid grid-cols-3 gap-[18px] max-[640px]:mt-[14px] max-[640px]:gap-[10px]">
                {galleryImages.slice(1, 4).map((galleryImage) => {
                  const isActive = activeImage.id === galleryImage.id;

                  return (
                    <button
                      key={galleryImage.id}
                      type="button"
                      onClick={() => {
                        setActiveImage(galleryImage);
                        setZoomed(false);
                      }}
                      aria-label={`Show ${galleryImage.alt}`}
                      className={`group/thumb relative aspect-[205/185] cursor-pointer overflow-hidden border-0 bg-[#e8e4dc] p-0 transition-all duration-300 max-[640px]:aspect-square ${
                        isActive
                          ? "ring-2 ring-[#151515] ring-offset-4 ring-offset-[#f8f8f6]"
                          : "ring-0 hover:ring-2 hover:ring-[#151515]/40 hover:ring-offset-3 hover:ring-offset-[#f8f8f6]"
                      }`}
                    >
                      <img
                        src={galleryImage.image}
                        alt={galleryImage.alt}
                        style={{
                          objectPosition: galleryImage.objectPosition,
                          transform: galleryImage.thumbnailTransform,
                        }}
                        className="h-full w-full object-cover transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />

                      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/thumb:bg-black/[0.05]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==================== Product content ==================== */}

            <div className="w-full pt-[4px] max-[980px]:pt-0">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h1 className="m-0 max-w-[720px] font-['Inter',sans-serif] text-[clamp(30px,2.25vw,38px)] font-semibold uppercase leading-[1.08] tracking-[-0.055em] text-[#151515] max-[640px]:text-[clamp(25px,7vw,31px)]">
                    {product.title}
                  </h1>

                  <p className="section-label pt-[16px] uppercase max-[640px]:pt-[12px]">
                    {product.category}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleWishlistToggle}
                  aria-label={
                    isWishlisted
                      ? `Remove ${product.title} from wishlist`
                      : `Add ${product.title} to wishlist`
                  }
                  className={`inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border p-0 transition-all duration-300 hover:-translate-y-1 max-[640px]:h-10 max-[640px]:w-10 ${
                    isWishlisted
                      ? "border-[#151515] bg-[#151515] text-white"
                      : "border-black/10 bg-transparent text-[#151515] hover:bg-[#151515] hover:text-white"
                  }`}
                >
                  <Heart
                    size={20}
                    strokeWidth={1.55}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="mt-[24px] flex items-center gap-4 pb-[6px] max-[640px]:mt-[20px]">
                {product.oldPrice && (
                  <span className="text-[18px] font-medium leading-none tracking-[-0.03em] text-[#b7b4ad] line-through max-[640px]:text-[16px]">
                    {product.oldPrice}
                  </span>
                )}

                <p className="m-0 text-[clamp(28px,2.25vw,34px)] font-semibold leading-none tracking-[-0.045em] text-[#151515] max-[640px]:text-[27px]">
                  ${productPrice}
                </p>
              </div>

              <div className="mt-[30px] max-w-[665px] max-[640px]:mt-[26px]">
                <h2 className="m-0 text-[15px] font-bold uppercase leading-none tracking-[-0.01em] text-[#151515] max-[640px]:text-[14px]">
                  Description
                </h2>

                <p className="section-copy pt-[18px]">
                  {product.description}
                </p>
              </div>

              <div className="mt-[30px] flex items-end justify-between gap-8 max-[640px]:mt-[28px] max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-5">
                <div>
                  <p className="m-0 mb-[12px] text-[15px] font-bold uppercase leading-none tracking-[-0.01em] text-[#151515] max-[640px]:text-[14px]">
                    Quantity
                  </p>

                  <div className="flex h-[52px] w-[142px] items-center justify-between overflow-hidden rounded-[4px] border border-[#9d9d9d] bg-transparent max-[640px]:h-[50px] max-[640px]:w-[138px]">
                    <button
                      type="button"
                      onClick={handleQuantityDecrease}
                      aria-label="Decrease quantity"
                      className="inline-flex h-full w-[46px] cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[#777777] transition-colors duration-300 hover:text-[#151515]"
                    >
                      <Minus
                        size={18}
                        strokeWidth={1.55}
                      />
                    </button>

                    <span className="inline-flex h-full min-w-[40px] items-center justify-center text-[19px] font-semibold leading-none tracking-[-0.03em] text-[#151515]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleQuantityIncrease}
                      aria-label="Increase quantity"
                      className="inline-flex h-full w-[46px] cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[#151515] transition-colors duration-300 hover:text-[#777777]"
                    >
                      <Plus
                        size={20}
                        strokeWidth={1.55}
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="group inline-flex h-[52px] min-w-[196px] cursor-pointer items-center justify-center gap-[16px] rounded-[4px] border border-[#151515] bg-[#151515] px-[24px] text-[13px] font-bold uppercase leading-none tracking-[0.01em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#151515] max-[640px]:h-[50px] max-[640px]:w-full max-[640px]:min-w-0"
                >
                  <span>
                    Add to Cart
                  </span>

                  <ShoppingCart
                    size={19}
                    strokeWidth={1.55}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* ==================== Product accordion ==================== */}

              <div className="mt-[36px] border-t border-[#d6d3cc] max-[640px]:mt-[32px]">
                <div className="border-b border-[#d6d3cc]">
                  <button
                    type="button"
                    onClick={() => handleAccordionToggle("details")}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent px-0 py-[18px] text-left text-[#151515] max-[640px]:py-[17px]"
                  >
                    <span className="text-[18px] font-semibold uppercase leading-none tracking-[-0.025em] max-[640px]:text-[17px]">
                      Details
                    </span>

                    <ChevronDown
                      size={22}
                      strokeWidth={1.7}
                      className={`shrink-0 transition-transform duration-300 ${
                        openAccordion === "details"
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      openAccordion === "details"
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="m-0 pb-[18px] pl-[18px] text-[15px] font-normal leading-[1.65] tracking-[-0.008em] text-[#666666] max-[640px]:pb-[16px] max-[640px]:text-[13px]">
                        <li>
                          Materials: {product.material || "Premium mixed materials"}
                        </li>

                        <li>
                          Color: Natural warm finish with matte accents
                        </li>

                        <li>
                          Weight: 2.4 lbs (1.1 kg)
                        </li>

                        <li>
                          Dimensions: {product.dimensions || "Standard home-friendly size"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-b border-[#d6d3cc]">
                  <button
                    type="button"
                    onClick={() => handleAccordionToggle("shipping")}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent px-0 py-[18px] text-left text-[#151515] max-[640px]:py-[17px]"
                  >
                    <span className="text-[18px] font-semibold uppercase leading-none tracking-[-0.025em] max-[640px]:text-[17px]">
                      Shipping Info
                    </span>

                    <ChevronDown
                      size={22}
                      strokeWidth={1.7}
                      className={`shrink-0 transition-transform duration-300 ${
                        openAccordion === "shipping"
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      openAccordion === "shipping"
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="section-copy pb-[18px] max-[640px]:pb-[16px]">
                        Orders are usually processed within 1–2 business days.
                        Standard delivery takes 3–7 business days depending on
                        your location.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b border-[#d6d3cc]">
                  <button
                    type="button"
                    onClick={() => handleAccordionToggle("overview")}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent px-0 py-[18px] text-left text-[#151515] max-[640px]:py-[17px]"
                  >
                    <span className="text-[18px] font-semibold uppercase leading-none tracking-[-0.025em] max-[640px]:text-[17px]">
                      Overview
                    </span>

                    <ChevronDown
                      size={22}
                      strokeWidth={1.7}
                      className={`shrink-0 transition-transform duration-300 ${
                        openAccordion === "overview"
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      openAccordion === "overview"
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="section-copy pb-[18px] max-[640px]:pb-[16px]">
                        {product.care || "This piece is designed for everyday use with timeless style and simple maintenance."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Client reviews section ==================== */}

      <section className="w-full bg-[#f1eee5] pb-[108px] pt-[72px] max-[1024px]:pb-[86px] max-[1024px]:pt-[64px] max-[640px]:pb-[68px] max-[640px]:pt-[54px]">
        <div className="site-container">
          <div className="flex items-center justify-between">
            <p className="section-label">
              //01
            </p>

            <p className="section-label">
              /Testimonials
            </p>
          </div>

          <h2 className="m-0 mt-[58px] text-center font-['Playfair_Display',serif] text-[clamp(58px,5vw,84px)] font-normal lowercase italic leading-none tracking-[-0.055em] text-[#151515] max-[768px]:mt-[44px] max-[640px]:text-[clamp(42px,13vw,58px)]">
            client reviews
          </h2>

          <div className="mt-[52px] grid grid-cols-2 gap-[36px] max-[900px]:grid-cols-1 max-[640px]:mt-[38px] max-[640px]:gap-[24px]">
            {reviewItems.map((review) => (
              <article
                key={review.id}
                className="group bg-white px-[44px] py-[42px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,0.08)] max-[1024px]:px-[36px] max-[1024px]:py-[36px] max-[640px]:px-[24px] max-[640px]:py-[28px]"
              >
                <ReviewStars rating={review.rating} />

                <div className="pt-[34px] max-[640px]:pt-[26px]">
                  <h3 className="m-0 max-w-[600px] text-[clamp(24px,2vw,24px)] font-semibold uppercase leading-[1.50] tracking-[-0.055em] text-[#151515] max-[640px]:text-[23px]">
                    “{review.title}”
                  </h3>

                  <p className="section-copy pt-[26px] max-[640px]:pt-[20px]">
                    {review.text}
                  </p>

                  <div className="mt-[34px] h-px w-full bg-[#dededb] max-[640px]:mt-[28px]" />

                  <p className="m-0 pt-[28px] text-right text-[17px] font-normal leading-none tracking-[-0.02em] text-[#666666] max-[640px]:text-left max-[640px]:text-[15px]">
                    <span className="font-semibold text-[#151515]">
                      {review.name}
                    </span>
                    , {review.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Similar products section ==================== */}

      <section className="w-full bg-[#fafaf8] pb-[112px] pt-[98px] max-[1024px]:pb-[88px] max-[1024px]:pt-[78px] max-[640px]:pb-[66px] max-[640px]:pt-[58px]">
        <div className="site-container">
          <div className="flex items-center justify-between">
            <p className="section-label">
              //02
            </p>

            <p className="section-label">
              /Similar Products
            </p>
          </div>

          <div className="mt-[66px] flex items-end justify-between gap-[32px] max-[768px]:mt-[50px] max-[768px]:flex-col max-[768px]:items-start">
            <h2 className="m-0 font-['Playfair_Display',serif] text-[clamp(58px,5vw,84px)] font-normal lowercase italic leading-none tracking-[-0.055em] text-[#151515] max-[640px]:text-[clamp(42px,13vw,58px)]">
              similar products
            </h2>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="group inline-flex h-[48px] cursor-pointer items-center justify-center gap-[18px] border border-[#151515] bg-transparent px-[22px] text-[13px] font-bold uppercase leading-none tracking-[-0.01em] text-[#151515] transition-all duration-300 hover:-translate-y-1 hover:bg-[#151515] hover:text-white max-[640px]:h-[46px] max-[640px]:px-[18px] max-[640px]:text-[12px]"
            >
              <span>
                View All Products
              </span>

              <ArrowRight
                size={20}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className="mt-[74px] grid grid-cols-3 gap-[42px] max-[1180px]:gap-[32px] max-[900px]:grid-cols-2 max-[640px]:mt-[52px] max-[640px]:grid-cols-1 max-[640px]:gap-[42px]">
            {similarProducts.map((item, index) => (
              <article
                key={item.id}
                className="group"
              >
                <div className="pb-[18px] max-[640px]:pb-[14px]">
                  <p className="section-label">
                    //
                    {String(index + 1).padStart(3, "0")}
                  </p>
                </div>

                <Link
                  to={`/shop-details/${item.id}`}
                  className="block aspect-[385/306] overflow-hidden bg-[#e5ded4] no-underline max-[640px]:aspect-[1/0.82]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
                  />
                </Link>

                <div className="pt-[18px] max-[640px]:pt-[16px]">
                  <p className="section-copy-small">
                    {item.category}
                  </p>

                  <Link
                    to={`/shop-details/${item.id}`}
                    className="block pt-[10px] text-[#151515] no-underline"
                  >
                    <h3 className="m-0 text-[16px] font-semibold uppercase leading-[1.2] tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#6b665f] max-[640px]:text-[16px]">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-[18px] pt-[16px]">
                    {item.oldPrice && (
                      <p className="m-0 text-[17px] font-normal leading-none tracking-[-0.03em] text-[#c8c8c4] line-through">
                        {item.oldPrice}
                      </p>
                    )}

                    <p className="m-0 text-[21px] font-medium leading-none tracking-[-0.035em] text-[#151515]">
                      {item.price}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== About final call to action section ==================== */}

      <section
        id="about-final-cta"
        ref={finalCtaRef}
        className="relative flex min-h-[clamp(580px,42.63vw,873px)] w-full items-center justify-center overflow-hidden bg-[#5d402c] text-white max-[1024px]:min-h-[660px] max-[640px]:min-h-[620px]"
      >
        {/* ==================== Final CTA background image ==================== */}

        <div className="absolute inset-0">
          <img
            src={aboutFinalCtaImage}
            alt="Warm modern interior with a wooden table"
            className={`h-full w-full object-cover object-center transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              finalCtaVisible
                ? "scale-100"
                : "scale-[1.06]"
            }`}
          />
        </div>

        {/* ==================== Warm horizontal overlay ==================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,13,4,0.42)_0%,rgba(47,26,12,0.23)_24%,rgba(69,43,23,0.16)_50%,rgba(42,19,8,0.3)_76%,rgba(22,7,2,0.46)_100%)]"
        />

        {/* ==================== Vertical depth overlay ==================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,8,3,0.24)_0%,rgba(30,15,6,0.07)_34%,rgba(27,12,4,0.13)_67%,rgba(14,4,1,0.47)_100%)]"
        />

        {/* ==================== Center readability overlay ==================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_72%_at_50%_42%,rgba(56,33,17,0.02)_0%,rgba(31,14,5,0.11)_55%,rgba(13,4,1,0.29)_100%)]"
        />

        {/* ==================== Final CTA content ==================== */}

        <div className="site-container relative z-10 flex flex-col items-center py-[96px] text-center max-[1024px]:py-[82px] max-[640px]:py-[66px]">
          {/* ==================== Final CTA heading ==================== */}

          <h2
            className={`about-display-font m-0 max-w-[1460px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.08] tracking-[-0.055em] text-white transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:max-w-[820px] max-[640px]:text-[clamp(44px,12vw,58px)] ${
              finalCtaVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[42px] opacity-0"
            }`}
          >
            <span className="block">
              ready to reimagine your
            </span>

            <span className="mt-[14px] block max-[640px]:mt-[8px]">
              dream home?
            </span>
          </h2>

          {/* ==================== Final CTA description ==================== */}

          <p
            className={`m-0 mt-[40px] max-w-[780px] text-[21px] font-normal leading-[1.55] tracking-[-0.018em] text-white/90 transition-all delay-[140ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:mt-[34px] max-[1024px]:max-w-[650px] max-[1024px]:text-[18px] max-[640px]:mt-[28px] max-[640px]:max-w-[380px] max-[640px]:text-[15px] ${
              finalCtaVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[32px] opacity-0"
            }`}
          >
            Find your new favorite piece today and explore fresh styles
            <br className="max-[640px]:hidden" />
            that speak to you.
          </p>

          {/* ==================== Final CTA button ==================== */}

          <Link
            to="/shop"
            className={`group mt-[52px] inline-flex min-h-[66px] min-w-[286px] items-center justify-center gap-[18px] rounded-[4px] border border-white bg-white px-[34px] text-[17px] font-semibold uppercase leading-none tracking-[-0.015em] text-[#171717] no-underline shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-all delay-[240ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[5px] hover:bg-transparent hover:text-white hover:shadow-[0_26px_55px_rgba(0,0,0,0.28)] motion-reduce:transition-none max-[1024px]:mt-[46px] max-[1024px]:min-h-[60px] max-[1024px]:min-w-[246px] max-[1024px]:text-[15px] max-[640px]:mt-[38px] max-[640px]:min-h-[54px] max-[640px]:min-w-[210px] max-[640px]:px-[26px] max-[640px]:text-[13px] ${
              finalCtaVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[34px] opacity-0"
            }`}
          >
            <span>Start Shopping</span>

            <ShoppingCart
              size={24}
              strokeWidth={1.65}
              className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px] max-[640px]:h-[21px] max-[640px]:w-[21px]"
            />
          </Link>
        </div>

        {/* ==================== Bottom soft shadow ==================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-black/30 to-transparent"
        />
      </section>
    </main>
  );
};

export default ShopDetails;