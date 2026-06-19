import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

import productOne from "../../assets/images/new-arrival-1.jpg";
import productTwo from "../../assets/images/new-arrival-2.jpg";
import productThree from "../../assets/images/new-arrival-3.jpg";
import productFour from "../../assets/images/new-arrival-4.jpg";
import productFive from "../../assets/images/new-arrival-5.jpg";
import productSix from "../../assets/images/new-arrival-6.jpg";

import "./NewArrivals.css";

const CART_ITEMS_KEY = "decoristCartItems";
const CART_COUNT_KEY = "decoristCartCount";

const WISHLIST_ITEMS_KEY = "decoristWishlistItems";
const WISHLIST_COUNT_KEY = "decoristWishlistCount";

const COUNT_UPDATE_EVENT = "decorist-counts-updated";

const products = [
  {
    id: 1,
    slug: "marble-inlay-coffee-table",
    image: productOne,
    category: "Living Room",
    title: "Marble-Inlay Coffee Table",
    oldPrice: "$299",
    price: "$249",
    quantity: 1,
  },
  {
    id: 2,
    slug: "nordic-pendant-light",
    image: productTwo,
    category: "Lighting",
    title: "Nordic Pendant Light",
    oldPrice: "",
    price: "$89",
    quantity: 1,
  },
  {
    id: 3,
    slug: "rattan-accent-chair",
    image: productThree,
    category: "Bedroom",
    title: "Rattan Accent Chair",
    oldPrice: "$159",
    price: "$139",
    quantity: 1,
  },
  {
    id: 4,
    slug: "abstract-wall-frame-set",
    image: productFour,
    category: "Wall Art",
    title: "Abstract Wall Frame Set",
    oldPrice: "",
    price: "$75",
    quantity: 1,
  },
  {
    id: 5,
    slug: "boho-patterned-rug",
    image: productFive,
    category: "Rugs & Carpets",
    title: "Boho Patterned Rug",
    oldPrice: "$210",
    price: "$179",
    quantity: 1,
  },
  {
    id: 6,
    slug: "minimal-wooden-desk",
    image: productSix,
    category: "Office",
    title: "Minimal Wooden Desk",
    oldPrice: "$350",
    price: "$299",
    quantity: 1,
  },
];

/* ==================== Local storage helpers ==================== */

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

const getProductPayload = (product) => {
  return {
    id: product.id,
    slug: product.slug,
    image: product.image,
    category: product.category,
    title: product.title,
    oldPrice: product.oldPrice,
    price: product.price,
    quantity: 1,
  };
};

const NewArrivals = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);

  const mobilePage = Math.min(2, Math.floor(activeCard / 2));

  /* ==================== Initial wishlist state ==================== */

  useEffect(() => {
    const wishlistItems = getStoredItems(WISHLIST_ITEMS_KEY);

    setWishlistIds(
      wishlistItems.map((item) => Number(item.id))
    );
  }, []);

  /* ==================== Section reveal observer ==================== */

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
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* ==================== Slider measurements ==================== */

  const getCardStep = () => {
    const slider = sliderRef.current;

    if (!slider) return 320;

    const card = slider.querySelector(".arrival-card");

    if (!card) return 320;

    const sliderStyle = window.getComputedStyle(slider);

    const sliderGap =
      Number.parseFloat(sliderStyle.columnGap || sliderStyle.gap) || 0;

    return card.getBoundingClientRect().width + sliderGap;
  };

  const updateSliderState = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const currentScroll = slider.scrollLeft;
    const cardStep = getCardStep();

    const nextActiveCard = Math.min(
      products.length - 1,
      Math.max(0, Math.round(currentScroll / cardStep))
    );

    setProgress(
      maxScroll <= 0 ? 100 : (currentScroll / maxScroll) * 100
    );

    setActiveCard(nextActiveCard);
    setCanPrev(currentScroll > 5);
    setCanNext(currentScroll < maxScroll - 5);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const frameId = window.requestAnimationFrame(updateSliderState);

    slider.addEventListener("scroll", updateSliderState, {
      passive: true,
    });

    window.addEventListener("resize", updateSliderState);

    return () => {
      window.cancelAnimationFrame(frameId);

      slider.removeEventListener("scroll", updateSliderState);
      window.removeEventListener("resize", updateSliderState);
    };
  }, []);

  /* ==================== Slider navigation ==================== */

  const handleSlide = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const cardStep = getCardStep();

    slider.scrollBy({
      left: direction === "next" ? cardStep : -cardStep,
      behavior: "smooth",
    });
  };

  const handleMobilePage = (pageIndex) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const targetIndex = pageIndex * 2;
    const cards = slider.querySelectorAll(".arrival-card");
    const targetCard = cards[targetIndex];

    if (!targetCard) return;

    slider.scrollTo({
      left: targetCard.offsetLeft,
      behavior: "smooth",
    });
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
      new CustomEvent("decorist-cart-item-added", {
        detail: getProductPayload(product),
      })
    );
  };

  return (
    <section
      ref={sectionRef}
      className="arrivals-section w-full overflow-hidden bg-[#f8f8f6] pb-[92px] pt-[82px] max-[1280px]:pb-[86px] max-[1280px]:pt-[76px] max-[1024px]:pb-[78px] max-[1024px]:pt-[66px] max-[768px]:pb-[70px] max-[768px]:pt-[56px] max-[480px]:pb-[62px] max-[480px]:pt-12"
    >
      <div className="site-container">
        {/* ==================== Section labels ==================== */}

        <div
          className={`arrivals-reveal mb-[58px] flex items-center justify-between transition-all duration-[800ms] ease-out max-[1024px]:mb-[46px] max-[768px]:mb-9 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[768px]:text-[15px]">
            //04
          </p>

          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[768px]:text-[15px]">
            /New Arrivals
          </p>
        </div>

        {/* ==================== Section heading ==================== */}

        <div className="mb-[72px] flex items-center justify-between gap-10 max-[1024px]:mb-14 max-[1024px]:items-start max-[768px]:mb-11 max-[768px]:flex-col max-[768px]:gap-7">
          <h2
            className={`arrivals-reveal m-0 font-['Playfair_Display',serif] text-[clamp(68px,5.2vw,78px)] font-normal lowercase italic leading-[0.95] tracking-[-0.058em] text-[#111111] transition-all delay-[120ms] duration-[850ms] ease-out max-[768px]:text-[clamp(48px,14vw,68px)] max-[768px]:leading-none max-[480px]:text-[46px] ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-7 opacity-0"
            }`}
          >
            fresh finds just in
          </h2>

          <Link
            to="/shop"
            className={`arrivals-reveal inline-flex h-[54px] w-fit shrink-0 items-center gap-[22px] rounded-[3px] border border-[#5d5d5d] bg-transparent px-6 font-['Inter',sans-serif] text-[15px] font-medium uppercase leading-none tracking-[-0.01em] text-[#151515] no-underline transition-all delay-[220ms] duration-300 hover:border-[#151515] hover:bg-[#151515] hover:text-white max-[768px]:h-[50px] max-[768px]:gap-[18px] max-[768px]:px-5 max-[768px]:text-[13px] ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-7 opacity-0"
            }`}
          >
            <span>See All Products</span>

            <ArrowRight size={25} strokeWidth={1.55} />
          </Link>
        </div>

        {/* ==================== Product slider ==================== */}

        <div
          className={`arrivals-reveal w-[calc(100%+((100vw-100%)/2))] overflow-visible transition-all delay-300 duration-[900ms] ease-out min-[1401px]:w-full min-[1401px]:overflow-hidden ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-[34px] opacity-0"
          }`}
        >
          <div
            ref={sliderRef}
            className="arrivals-slider flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-1 max-[480px]:gap-4"
          >
            {products.map((product, index) => {
              const isWishlisted = wishlistIds.includes(Number(product.id));

              return (
                <article
                  key={product.id}
                  className="arrival-card group block flex-[0_0_270px] snap-start text-inherit max-[1280px]:flex-[0_0_255px] max-[1024px]:flex-[0_0_250px] max-[768px]:flex-[0_0_245px] max-[480px]:flex-[0_0_78%]"
                >
                  <div className="mb-3 font-['Inter',sans-serif] text-[14px] font-medium leading-none tracking-[-0.035em] text-[#5e5e5e] max-[480px]:mb-4 max-[480px]:text-[17px] max-[480px]:font-semibold">
                    //{String(index + 1).padStart(3, "0")}
                  </div>

                  <div className="relative h-[326px] w-full overflow-hidden bg-[#e3ded4] max-[1280px]:h-[306px] max-[1024px]:h-[300px] max-[768px]:h-[292px] max-[480px]:h-[340px] max-[420px]:h-[320px]">
                    <Link
                      to={`/shop-details/${product.id}`}
                      aria-label={`View ${product.title} details`}
                      className="block h-full w-full text-inherit no-underline"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="block h-full w-full object-cover object-center transition-transform duration-[1100ms] ease-out group-hover:scale-[1.045]"
                      />
                    </Link>

                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.08]" />

                    {/* ==================== Product hover actions ==================== */}

                    <div className="absolute right-4 top-4 z-10 flex translate-x-4 flex-col gap-3 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 max-[1024px]:translate-x-0 max-[1024px]:opacity-100 max-[480px]:right-3 max-[480px]:top-3 max-[480px]:gap-2.5">
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
                        aria-label={`Quick view ${product.title}`}
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
                  </div>

                  <div className="pt-[26px] max-[768px]:pt-[22px] max-[480px]:pt-7">
                    <p className="mb-[14px] mt-0 font-['Inter',sans-serif] text-[16.5px] font-semibold leading-none tracking-[-0.035em] text-[#74746f] max-[480px]:text-[15px]">
                      {product.category}
                    </p>

                    <Link
                      to={`/shop-details/${product.id}`}
                      className="block w-fit text-inherit no-underline"
                    >
                      <h3 className="mb-[22px] mt-0 w-fit font-['Inter',sans-serif] text-[15.5px] font-semibold uppercase leading-[1.2] tracking-[-0.035em] text-[#151515] underline decoration-[1.5px] underline-offset-[3px] transition-colors duration-300 hover:text-[#6b665f] max-[480px]:text-[15px]">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-[18px]">
                      {product.oldPrice && (
                        <span className="font-['Inter',sans-serif] text-[19px] font-normal leading-none tracking-[-0.03em] text-[#c7c7c4] line-through max-[480px]:text-[18px]">
                          {product.oldPrice}
                        </span>
                      )}

                      <span className="font-['Inter',sans-serif] text-[19px] font-medium leading-none tracking-[-0.03em] text-[#151515] max-[480px]:text-[18px]">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ==================== Desktop slider controls ==================== */}

        <div
          className={`arrivals-reveal mt-[58px] flex items-center gap-7 transition-all delay-[420ms] duration-[850ms] ease-out max-[768px]:mt-[42px] max-[768px]:gap-[18px] max-[480px]:hidden ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center gap-[22px]">
            <button
              type="button"
              onClick={() => handleSlide("prev")}
              disabled={!canPrev}
              aria-label="Previous product"
              className={`inline-flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 transition-transform duration-300 ${
                canPrev
                  ? "cursor-pointer text-[#111111] hover:-translate-x-[3px]"
                  : "cursor-not-allowed text-[#c9c9c6]"
              }`}
            >
              <ArrowLeft size={25} strokeWidth={1.45} />
            </button>

            <button
              type="button"
              onClick={() => handleSlide("next")}
              disabled={!canNext}
              aria-label="Next product"
              className={`inline-flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 transition-transform duration-300 ${
                canNext
                  ? "cursor-pointer text-[#111111] hover:translate-x-[3px]"
                  : "cursor-not-allowed text-[#c9c9c6]"
              }`}
            >
              <ArrowRight size={25} strokeWidth={1.45} />
            </button>
          </div>

          <div className="relative h-[2px] w-[510px] flex-none overflow-hidden bg-[#cfcfcb] max-[1280px]:w-[460px] max-[1024px]:w-[360px] max-[768px]:w-auto max-[768px]:flex-1">
            <span
              className="absolute left-0 top-0 h-full bg-[#151515] transition-[width] duration-300 ease-out"
              style={{
                width: `${Math.max(progress, 28)}%`,
              }}
            />
          </div>
        </div>

        {/* ==================== Mobile slide navigation ==================== */}

        <div
          className={`arrivals-reveal mt-12 hidden items-center justify-center gap-2 transition-all delay-[420ms] duration-[850ms] ease-out max-[480px]:flex ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {[0, 1, 2].map((pageIndex) => {
            const isActive = pageIndex === mobilePage;

            return (
              <button
                key={pageIndex}
                type="button"
                onClick={() => handleMobilePage(pageIndex)}
                aria-label={`Go to product group ${pageIndex + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-[9px] cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-[#111111]"
                    : "w-3 bg-[#c9c9c6]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;