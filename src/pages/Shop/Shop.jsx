import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

import NewArrivals from "../../components/NewArrivals/NewArrivals";
import RedesignCTA from "../../components/RedesignCTA/RedesignCTA";

import {
  featuredProducts,
  normalizeCategory,
  saleProducts,
  shopCategories,
  shopProducts,
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

const getUniqueProducts = (products = []) => {
  return Array.from(
    new Map(
      products.map((product) => [
        String(product.id),
        product,
      ])
    ).values()
  );
};

const getProductPayload = (product) => {
  return {
    id: product.id,
    slug: product.slug,
    image: product.image,
    category: product.category,
    categoryKey: product.categoryKey || normalizeCategory(product.category),
    title: product.title,
    subtitle: product.subtitle || "",
    oldPrice: product.oldPrice || "",
    price: product.price,
    discount: product.discount || "",
    quantity: 1,
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

const Shop = () => {
  const {
    sectionRef: heroRef,
    visible: heroVisible,
  } = useSectionReveal(0.12);

  const {
    sectionRef: featuredRef,
    visible: featuredVisible,
  } = useSectionReveal(0.1);

  const {
    sectionRef: saleRef,
    visible: saleVisible,
  } = useSectionReveal(0.16);

  const {
    sectionRef: curatedRef,
    visible: curatedVisible,
  } = useSectionReveal(0.08);

  const [wishlistIds, setWishlistIds] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  const filteredProducts = useMemo(() => {
    const uniqueProducts = getUniqueProducts(shopProducts);
    const activeCategoryKey = normalizeCategory(activeCategory);

    if (activeCategoryKey === "all") {
      return uniqueProducts;
    }

    return uniqueProducts.filter((product) => {
      const productCategoryKey =
        product.categoryKey || normalizeCategory(product.category);

      return productCategoryKey === activeCategoryKey;
    });
  }, [activeCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  const visibleProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return filteredProducts.slice(startIndex, endIndex);
  }, [currentPage, filteredProducts]);

  /* ==================== Page clamp when filter changes ==================== */

  useEffect(() => {
    setCurrentPage((previousPage) => {
      return Math.min(previousPage, totalPages);
    });
  }, [totalPages]);

  /* ==================== Wishlist state sync ==================== */

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

  /* ==================== Category filter action ==================== */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  /* ==================== Pagination action ==================== */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  /* ==================== Wishlist action ==================== */

  const handleWishlistToggle = (product) => {
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
        getProductPayload(product),
      ];
    }

    saveStoredItems(WISHLIST_ITEMS_KEY, nextWishlistItems);
    updateCount(WISHLIST_COUNT_KEY, nextWishlistItems.length);

    setWishlistIds(
      nextWishlistItems.map((item) => Number(item.id))
    );
  };

  /* ==================== Add to cart action ==================== */

  const handleAddToCart = (product) => {
    const cartItems = getStoredItems(CART_ITEMS_KEY);

    const existingProduct = cartItems.find((item) => {
      return Number(item.id) === Number(product.id);
    });

    let nextCartItems;

    if (existingProduct) {
      nextCartItems = cartItems.map((item) => {
        if (Number(item.id) !== Number(product.id)) {
          return item;
        }

        return {
          ...item,
          quantity: Number(item.quantity || 1) + 1,
        };
      });
    } else {
      nextCartItems = [
        ...cartItems,
        getProductPayload(product),
      ];
    }

    saveStoredItems(CART_ITEMS_KEY, nextCartItems);
    updateCount(CART_COUNT_KEY, getTotalCartQuantity(nextCartItems));

    window.dispatchEvent(
      new CustomEvent(CART_ADDED_EVENT, {
        detail: getProductPayload(product),
      })
    );
  };

  /* ==================== Product action buttons ==================== */

  const renderProductActions = (product) => {
    const isWishlisted = wishlistIds.includes(Number(product.id));

    return (
      <div className="absolute right-4 top-4 z-20 flex translate-x-4 flex-col gap-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 max-[1024px]:translate-x-0 max-[1024px]:opacity-100 max-[480px]:right-3 max-[480px]:top-3 max-[480px]:gap-2.5">
        <button
          type="button"
          onClick={() => handleWishlistToggle(product)}
          aria-label={
            isWishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border p-0 shadow-[0_12px_28px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 max-[480px]:h-10 max-[480px]:w-10 ${
            isWishlisted
              ? "border-[#151515] bg-[#151515] text-white"
              : "border-white/80 bg-white/95 text-[#151515] hover:bg-[#151515] hover:text-white"
          }`}
        >
          <Heart
            size={19}
            strokeWidth={1.55}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        <Link
          to={`/shop-details/${product.id}`}
          aria-label={`View ${product.title} details`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/95 text-[#151515] no-underline shadow-[0_12px_28px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#151515] hover:text-white max-[480px]:h-10 max-[480px]:w-10"
        >
          <Eye
            size={19}
            strokeWidth={1.55}
          />
        </Link>

        <button
          type="button"
          onClick={() => handleAddToCart(product)}
          aria-label={`Add ${product.title} to cart`}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/80 bg-white/95 p-0 text-[#151515] shadow-[0_12px_28px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#151515] hover:text-white max-[480px]:h-10 max-[480px]:w-10"
        >
          <ShoppingCart
            size={19}
            strokeWidth={1.55}
          />
        </button>
      </div>
    );
  };

  return (
    <main className="w-full overflow-hidden scroll-smooth bg-[#f8f8f6] text-[#151515]">
      {/* ==================== Shop hero section ==================== */}

      <section
        ref={heroRef}
        className="w-full bg-[#f8f8f6] pb-[118px] pt-[70px] max-[1400px]:pb-[102px] max-[1400px]:pt-[62px] max-[1024px]:pb-[82px] max-[1024px]:pt-[56px] max-[640px]:pb-[64px] max-[640px]:pt-[46px]"
      >
        <div className="site-container">
          <div
            className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              heroVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[38px] opacity-0"
            }`}
          >
            <h1 className="m-0 max-w-[1320px] font-['Playfair_Display',serif] text-[clamp(68px,5.7vw,94px)] font-normal lowercase italic leading-[1.1] tracking-[-0.055em] text-[#151515] max-[1024px]:max-w-[860px] max-[1024px]:text-[clamp(58px,8vw,78px)] max-[640px]:text-[clamp(44px,13vw,62px)]">
              <span className="block">
                discover home decor that
              </span>

              <span className="mt-[12px] block max-[640px]:mt-[6px]">
                speaks to you
              </span>
            </h1>
          </div>

          <div className="mt-[48px] flex justify-end max-[1024px]:mt-[42px] max-[768px]:justify-start max-[640px]:mt-[34px]">
            <p
              className={`m-0 max-w-[675px] text-[22px] font-normal uppercase leading-[1.35] tracking-[-0.025em] text-[#666666] transition-all delay-[160ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1400px]:max-w-[620px] max-[1400px]:text-[20px] max-[1024px]:max-w-[560px] max-[1024px]:text-[18px] max-[640px]:text-[14px] max-[640px]:leading-[1.5] ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[30px] opacity-0"
              }`}
            >
              Shop curated timeless pieces, seasonal accents,
              and modern essentials for every room.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== Shop new arrivals section ==================== */}

      <NewArrivals
        sectionNumber="//01"
        sectionLabel="/New Arrivals"
        showViewButton={false}
        centeredHeading
      />

      {/* ==================== Featured products section ==================== */}

      <section
        ref={featuredRef}
        className="w-full bg-[#f1eee5] pb-[118px] pt-[112px] max-[1400px]:pb-[100px] max-[1400px]:pt-[96px] max-[1024px]:pb-[82px] max-[1024px]:pt-[78px] max-[640px]:pb-[64px] max-[640px]:pt-[62px]"
      >
        <div className="site-container">
          {/* ==================== Section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              featuredVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[24px] opacity-0"
            }`}
          >
            <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[768px]:text-[15px]">
              //02
            </p>

            <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[768px]:text-[15px]">
              /Featured Products
            </p>
          </div>

          {/* ==================== Featured heading ==================== */}

          <div className="mt-[72px] grid grid-cols-[0.95fr_1.05fr] items-end gap-[90px] max-[1180px]:gap-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-[34px] max-[640px]:mt-[50px]">
            <h2
              className={`m-0 font-['Playfair_Display',serif] text-[clamp(68px,5.2vw,78px)] font-normal lowercase italic leading-[0.95] tracking-[-0.055em] text-[#151515] transition-all delay-[80ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[640px]:text-[clamp(44px,12vw,58px)] ${
                featuredVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[36px] opacity-0"
              }`}
            >
              featured in
            </h2>

            <p
              className={`m-0 max-w-[650px] text-[17px] font-normal leading-[1.55] tracking-[-0.02em] text-[#666666] transition-all delay-[150ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[640px]:text-[14px] ${
                featuredVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[30px] opacity-0"
              }`}
            >
              Discover handpicked pieces our customers can’t stop talking
              about, chosen for their style, quality, and charm.
            </p>
          </div>

          {/* ==================== Featured product cards ==================== */}

          <div className="mt-[44px] grid grid-cols-2 gap-[28px] max-[900px]:grid-cols-1 max-[640px]:mt-[38px]">
            {featuredProducts.map((product, index) => (
              <article
                key={product.id}
                style={{
                  transitionDelay: featuredVisible
                    ? `${220 + index * 120}ms`
                    : "0ms",
                }}
                className={`group transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
                  featuredVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[40px] opacity-0"
                }`}
              >
                <div className="relative aspect-[708/506] overflow-hidden bg-[#ddd5c9]">
                  <Link
                    to={`/shop-details/${product.id}`}
                    aria-label={`View ${product.title} details`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
                    />
                  </Link>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent" />

                  <span className="absolute right-[34px] top-[34px] z-10 bg-white px-[19px] py-[13px] text-[14px] font-semibold leading-none tracking-[-0.01em] text-[#151515] max-[640px]:right-4 max-[640px]:top-4 max-[640px]:px-4 max-[640px]:py-[11px] max-[640px]:text-[12px]">
                    {product.category}
                  </span>

                  {renderProductActions(product)}

                  <div className="absolute bottom-[36px] left-[38px] z-10 max-[640px]:bottom-6 max-[640px]:left-6">
                    <Link
                      to={`/shop-details/${product.id}`}
                      className="block text-white no-underline"
                    >
                      <h3 className="m-0 max-w-[570px] text-[32px] font-medium uppercase leading-[1.1] tracking-[-0.045em] underline decoration-[1.5px] underline-offset-[5px] max-[1180px]:text-[27px] max-[640px]:text-[22px]">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="m-0 mt-[24px] w-fit text-[36px] font-normal leading-none tracking-[-0.045em] text-white underline decoration-[1.5px] underline-offset-[6px] max-[640px]:mt-4 max-[640px]:text-[28px]">
                      {product.price}
                    </p>
                  </div>
                </div>

                <div className="mt-[30px] grid grid-cols-[0.9fr_1.1fr] gap-[36px] max-[1180px]:gap-6 max-[640px]:grid-cols-1 max-[640px]:gap-4">
                  <ul className="m-0 flex list-disc flex-col gap-[11px] pl-[18px] text-[#151515]">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-[15px] font-medium italic leading-[1.35] tracking-[-0.02em] max-[640px]:text-[14px]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <p className="m-0 max-w-[360px] text-[15px] font-normal leading-[1.55] tracking-[-0.02em] text-[#666666] max-[640px]:max-w-full max-[640px]:text-[14px]">
                    {product.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* ==================== Sale products section ==================== */}

          <div
            id="sale-products"
            ref={saleRef}
            className="scroll-mt-[120px] mt-[160px] max-[1024px]:mt-[120px] max-[640px]:mt-[88px]"
          >
            <div
              className={`mx-auto text-center transition-all duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
                saleVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[42px] opacity-0"
              }`}
            >
              <h2 className="m-0 font-['Playfair_Display',serif] text-[clamp(68px,5.2vw,78px)] font-normal lowercase italic leading-none tracking-[-0.055em] text-[#151515] max-[640px]:text-[clamp(44px,12vw,58px)]">
                sale products
              </h2>
            </div>

            <div className="mt-[72px] grid grid-cols-3 gap-[45px] max-[1180px]:gap-[30px] max-[900px]:grid-cols-2 max-[640px]:mt-[52px] max-[640px]:grid-cols-1 max-[640px]:gap-[46px]">
              {saleProducts.map((product, index) => (
                <article
                  key={product.id}
                  style={{
                    transitionDelay: saleVisible
                      ? `${180 + index * 140}ms`
                      : "0ms",
                  }}
                  className={`group transition-all duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
                    saleVisible
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-[58px] scale-[0.985] opacity-0"
                  }`}
                >
                  <p
                    className={`mb-[12px] mt-0 text-[16px] font-medium leading-none tracking-[-0.035em] text-[#5e5e5e] transition-all duration-[850ms] ease-out motion-reduce:transition-none ${
                      saleVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0"
                    }`}
                  >
                    //{String(index + 1).padStart(3, "0")}
                  </p>

                  <div className="relative aspect-[452/389] overflow-hidden bg-[#ddd5c9]">
                    <Link
                      to={`/shop-details/${product.id}`}
                      aria-label={`View ${product.title} details`}
                      className="block h-full w-full"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`h-full w-full object-cover object-center transition-all duration-[1250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] motion-reduce:transition-none ${
                          saleVisible
                            ? "scale-100 opacity-100"
                            : "scale-[1.06] opacity-0"
                        }`}
                      />
                    </Link>

                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.08]" />

                    {renderProductActions(product)}
                  </div>

                  <div
                    className={`pt-[26px] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[640px]:pt-[22px] ${
                      saleVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-[24px] opacity-0"
                    }`}
                  >
                    <p className="mb-[14px] mt-0 text-[16px] font-semibold leading-none tracking-[-0.035em] text-[#74746f] max-[640px]:text-[14px]">
                      {product.category}
                    </p>

                    <Link
                      to={`/shop-details/${product.id}`}
                      className="block w-fit text-inherit no-underline"
                    >
                      <h3 className="m-0 text-[17px] font-semibold uppercase leading-[1.25] tracking-[-0.035em] text-[#151515] transition-colors duration-300 hover:text-[#6b665f] max-[640px]:text-[15px]">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="m-0 mt-[26px] text-[28px] font-normal uppercase leading-none tracking-[-0.035em] text-[#ff0000] transition-transform duration-300 group-hover:translate-x-1 max-[640px]:mt-[22px] max-[640px]:text-[23px]">
                      {product.discount}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Curated products section ==================== */}

      <section
        id="curated-products"
        ref={curatedRef}
        className="w-full bg-[#fafaf8] pb-[122px] pt-[112px] max-[1400px]:pb-[104px] max-[1400px]:pt-[96px] max-[1024px]:pb-[84px] max-[1024px]:pt-[78px] max-[640px]:pb-[66px] max-[640px]:pt-[62px]"
      >
        <div className="site-container">
          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              curatedVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[24px] opacity-0"
            }`}
          >
            <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[768px]:text-[15px]">
              //03
            </p>

            <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[768px]:text-[15px]">
              /Curated Products
            </p>
          </div>

          <div className="mt-[72px] grid grid-cols-[0.95fr_1.05fr] items-end gap-[90px] max-[1180px]:gap-[58px] max-[900px]:grid-cols-1 max-[900px]:gap-[42px] max-[640px]:mt-[50px]">
            <h2
              className={`m-0 max-w-[700px] font-['Playfair_Display',serif] text-[clamp(68px,5.2vw,78px)] font-normal lowercase italic leading-[1.05] tracking-[-0.055em] text-[#151515] transition-all delay-[90ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[640px]:text-[clamp(44px,12vw,58px)] ${
                curatedVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[36px] opacity-0"
              }`}
            >
              <span className="block">
                explore our curated
              </span>

              <span className="mt-[8px] block">
                products
              </span>
            </h2>

            <div
              className={`flex flex-wrap items-center justify-end gap-x-[13px] gap-y-3 transition-all delay-[160ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] max-[900px]:justify-start ${
                curatedVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[30px] opacity-0"
              }`}
            >
              {shopCategories.map((category, index) => {
                const isActive =
                  normalizeCategory(category) === normalizeCategory(activeCategory);

                return (
                  <div
                    key={category}
                    className="flex items-center gap-x-[13px]"
                  >
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(category)}
                      className={`cursor-pointer border-0 bg-transparent p-0 font-['Inter',sans-serif] text-[13px] font-medium uppercase leading-none tracking-[-0.015em] transition-colors duration-300 max-[640px]:text-[12px] ${
                        isActive
                          ? "text-[#151515] underline decoration-[1.5px] underline-offset-[4px]"
                          : "text-[#666666] hover:text-[#151515]"
                      }`}
                    >
                      {category}
                    </button>

                    {index !== shopCategories.length - 1 && (
                      <span className="text-[13px] font-medium leading-none text-[#666666]">
                        /
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            key={`${normalizeCategory(activeCategory)}-${currentPage}`}
            className="mt-[70px] grid grid-cols-4 gap-x-[34px] gap-y-[70px] max-[1280px]:gap-x-[28px] max-[1024px]:grid-cols-3 max-[900px]:grid-cols-2 max-[640px]:mt-[52px] max-[640px]:grid-cols-1 max-[640px]:gap-y-[48px]"
          >
            {visibleProducts.map((product, index) => (
              <article
                key={product.id}
                style={{
                  transitionDelay: curatedVisible
                    ? `${120 + index * 45}ms`
                    : "0ms",
                }}
                className={`group transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
                  curatedVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[34px] opacity-0"
                }`}
              >
                <p className="mb-[12px] mt-0 font-['Inter',sans-serif] text-[16px] font-medium leading-none tracking-[-0.035em] text-[#5e5e5e] max-[640px]:text-[14px]">
                  //
                  {String(
                    index + 1 + (currentPage - 1) * productsPerPage
                  ).padStart(3, "0")}
                </p>

                <div className="relative aspect-[263/310] overflow-hidden bg-[#e4ddd3]">
                  <Link
                    to={`/shop-details/${product.id}`}
                    aria-label={`View ${product.title} details`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
                    />
                  </Link>

                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.08]" />

                  {renderProductActions(product)}
                </div>

                <div className="pt-[22px]">
                  <p className="mb-[12px] mt-0 font-['Inter',sans-serif] text-[13px] font-medium leading-none tracking-[-0.02em] text-[#74746f]">
                    {product.category}
                  </p>

                  <Link
                    to={`/shop-details/${product.id}`}
                    className="block w-fit text-inherit no-underline"
                  >
                    <h3 className="m-0 font-['Inter',sans-serif] text-[13px] font-bold uppercase leading-[1.25] tracking-[-0.025em] text-[#151515] transition-colors duration-300 hover:text-[#6b665f]">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="mt-[20px] flex items-center gap-[14px]">
                    {product.oldPrice && (
                      <span className="font-['Inter',sans-serif] text-[17px] font-normal leading-none tracking-[-0.03em] text-[#c9c9c6] line-through">
                        {product.oldPrice}
                      </span>
                    )}

                    <span className="font-['Inter',sans-serif] text-[17px] font-medium leading-none tracking-[-0.03em] text-[#151515]">
                      {product.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div
            className={`mt-[78px] flex items-center justify-center gap-[10px] transition-all delay-[260ms] duration-[900ms] ease-out max-[640px]:mt-[58px] ${
              curatedVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[26px] opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="inline-flex h-[28px] min-w-[28px] cursor-pointer items-center justify-center border-0 bg-[#f1eee5] px-[8px] text-[12px] font-medium text-[#9a968f] transition-all duration-300 hover:bg-[#151515] hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              «
            </button>

            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex h-[28px] min-w-[28px] cursor-pointer items-center justify-center border-0 bg-[#f1eee5] px-[8px] text-[12px] font-medium text-[#9a968f] transition-all duration-300 hover:bg-[#151515] hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              ‹
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => index + 1
            )
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, index, pages) => {
                const previousPage = pages[index - 1];
                const shouldShowDots =
                  previousPage && page - previousPage > 1;

                return (
                  <div
                    key={page}
                    className="flex items-center gap-[10px]"
                  >
                    {shouldShowDots && (
                      <span className="text-[12px] font-medium text-[#8c887f]">
                        ...
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`inline-flex h-[28px] min-w-[28px] cursor-pointer items-center justify-center border-0 px-[8px] text-[12px] font-medium transition-all duration-300 ${
                        page === currentPage
                          ? "bg-[#8c877d] text-white"
                          : "bg-transparent text-[#6f6b64] hover:bg-[#151515] hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex h-[28px] min-w-[28px] cursor-pointer items-center justify-center border-0 bg-[#f1eee5] px-[8px] text-[12px] font-medium text-[#9a968f] transition-all duration-300 hover:bg-[#151515] hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              ›
            </button>

            <button
              type="button"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="inline-flex h-[28px] min-w-[28px] cursor-pointer items-center justify-center border-0 bg-[#f1eee5] px-[8px] text-[12px] font-medium text-[#9a968f] transition-all duration-300 hover:bg-[#151515] hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              »
            </button>
          </div>
        </div>
      </section>

      {/* ==================== Shop redesign CTA section ==================== */}

      <RedesignCTA />
    </main>
  );
};

export default Shop;