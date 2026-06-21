import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import {
  Link,
  useLocation,
} from "react-router-dom";

import logoImage from "../../assets/images/logo-white.png";
import { allProducts } from "../../data/shopProducts";

const navItems = [
  {
    id: 1,
    label: "Home",
    path: "/",
  },
  {
    id: 2,
    label: "About",
    path: "/about",
  },
  {
    id: 3,
    label: "Shop",
    path: "/shop",
  },
  {
    id: 4,
    label: "Contact Us",
    path: "/contact",
  },
];

const CART_ITEMS_KEY = "decoristCartItems";
const CART_COUNT_KEY = "decoristCartCount";

const WISHLIST_ITEMS_KEY = "decoristWishlistItems";
const WISHLIST_COUNT_KEY = "decoristWishlistCount";

const COUNT_UPDATE_EVENT = "decorist-counts-updated";
const CART_ADDED_EVENT = "decorist-cart-item-added";

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

const getProductFromData = (productId) => {
  return allProducts.find((product) => {
    return String(product.id) === String(productId);
  });
};

const getPriceNumber = (price = "") => {
  const cleanPrice = String(price).replace(/[^0-9.]/g, "");
  const numericPrice = Number(cleanPrice);

  return Number.isFinite(numericPrice) ? numericPrice : 0;
};

const getCartQuantity = (items) => {
  return items.reduce((total, item) => {
    return total + Number(item.quantity || 1);
  }, 0);
};

const hydrateItem = (item) => {
  const productFromData = getProductFromData(item.id);

  return {
    ...(productFromData || {}),
    ...item,
    id: item.id || productFromData?.id,
    slug: item.slug || productFromData?.slug || "",
    image: item.image || productFromData?.image || "",
    category: item.category || productFromData?.category || "",
    title: item.title || productFromData?.title || "Decorist Product",
    price: item.price || productFromData?.price || "$0",
    oldPrice: item.oldPrice || productFromData?.oldPrice || "",
    discount: item.discount || productFromData?.discount || "",
    description: item.description || productFromData?.description || "",
    quantity: Math.max(1, Number(item.quantity || 1)),
  };
};

const hydrateItems = (items) => {
  return items
    .filter((item) => item && item.id)
    .map(hydrateItem);
};

const mergeCartItems = (items) => {
  const mergedItems = [];

  items.forEach((item) => {
    const hydratedItem = hydrateItem(item);

    const existingItem = mergedItems.find((cartItem) => {
      return String(cartItem.id) === String(hydratedItem.id);
    });

    if (existingItem) {
      existingItem.quantity =
        Number(existingItem.quantity || 1) +
        Number(hydratedItem.quantity || 1);
    } else {
      mergedItems.push(hydratedItem);
    }
  });

  return mergedItems;
};

const mergeWishlistItems = (items) => {
  const uniqueItems = [];

  items.forEach((item) => {
    const hydratedItem = {
      ...hydrateItem(item),
      quantity: 1,
    };

    const alreadyExists = uniqueItems.some((wishlistItem) => {
      return String(wishlistItem.id) === String(hydratedItem.id);
    });

    if (!alreadyExists) {
      uniqueItems.push(hydratedItem);
    }
  });

  return uniqueItems;
};

const Navbar = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const isHomePage = location.pathname === "/";
  const isCartPopupOpen = activePopup === "cart";
  const isWishlistPopupOpen = activePopup === "wishlist";

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + getPriceNumber(item.price) * Number(item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const isLinkActive = (item) => {
    if (item.path === "/") {
      return location.pathname === "/";
    }

    if (item.path === "/shop") {
      return (
        location.pathname === "/shop" ||
        location.pathname.startsWith("/shop-details/")
      );
    }

    return location.pathname === item.path;
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const syncStorageState = () => {
    const nextCartItems = mergeCartItems(
      hydrateItems(getStoredItems(CART_ITEMS_KEY))
    );

    const nextWishlistItems = mergeWishlistItems(
      hydrateItems(getStoredItems(WISHLIST_ITEMS_KEY))
    );

    const nextCartCount = getCartQuantity(nextCartItems);
    const nextWishlistCount = nextWishlistItems.length;

    saveStoredItems(CART_ITEMS_KEY, nextCartItems);
    saveStoredItems(WISHLIST_ITEMS_KEY, nextWishlistItems);

    localStorage.setItem(CART_COUNT_KEY, String(nextCartCount));
    localStorage.setItem(WISHLIST_COUNT_KEY, String(nextWishlistCount));

    setCartItems(nextCartItems);
    setWishlistItems(nextWishlistItems);
    setCartCount(nextCartCount);
    setWishlistCount(nextWishlistCount);
  };

  const updateCartStorage = (items) => {
    const nextCartItems = mergeCartItems(items);
    const nextCartCount = getCartQuantity(nextCartItems);

    saveStoredItems(CART_ITEMS_KEY, nextCartItems);
    localStorage.setItem(CART_COUNT_KEY, String(nextCartCount));

    setCartItems(nextCartItems);
    setCartCount(nextCartCount);

    window.dispatchEvent(new Event(COUNT_UPDATE_EVENT));
  };

  const updateWishlistStorage = (items) => {
    const nextWishlistItems = mergeWishlistItems(items);
    const nextWishlistCount = nextWishlistItems.length;

    saveStoredItems(WISHLIST_ITEMS_KEY, nextWishlistItems);
    localStorage.setItem(WISHLIST_COUNT_KEY, String(nextWishlistCount));

    setWishlistItems(nextWishlistItems);
    setWishlistCount(nextWishlistCount);

    window.dispatchEvent(new Event(COUNT_UPDATE_EVENT));
  };

  const handleSearch = () => {
    console.log("Open search");
  };

  const handleWishlist = () => {
    syncStorageState();
    setMenuOpen(false);
    setActivePopup("wishlist");
  };

  const handleCart = () => {
    syncStorageState();
    setMenuOpen(false);
    setActivePopup("cart");
  };

  const handleRemoveCartItem = (productId) => {
    const nextCartItems = cartItems.filter((item) => {
      return String(item.id) !== String(productId);
    });

    updateCartStorage(nextCartItems);
  };

  const handleIncreaseQuantity = (productId) => {
    const nextCartItems = cartItems.map((item) => {
      if (String(item.id) !== String(productId)) {
        return item;
      }

      return {
        ...item,
        quantity: Number(item.quantity || 1) + 1,
      };
    });

    updateCartStorage(nextCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const targetItem = cartItems.find((item) => {
      return String(item.id) === String(productId);
    });

    if (!targetItem) return;

    if (Number(targetItem.quantity || 1) <= 1) {
      handleRemoveCartItem(productId);
      return;
    }

    const nextCartItems = cartItems.map((item) => {
      if (String(item.id) !== String(productId)) {
        return item;
      }

      return {
        ...item,
        quantity: Number(item.quantity || 1) - 1,
      };
    });

    updateCartStorage(nextCartItems);
  };

  const handleRemoveWishlistItem = (productId) => {
    const nextWishlistItems = wishlistItems.filter((item) => {
      return String(item.id) !== String(productId);
    });

    updateWishlistStorage(nextWishlistItems);
  };

  const handleMoveWishlistToCart = (product) => {
    const currentCartItems = getStoredItems(CART_ITEMS_KEY);

    const nextCartItems = [
      ...currentCartItems,
      {
        ...hydrateItem(product),
        quantity: 1,
      },
    ];

    const nextWishlistItems = wishlistItems.filter((item) => {
      return String(item.id) !== String(product.id);
    });

    updateCartStorage(nextCartItems);
    updateWishlistStorage(nextWishlistItems);
    setActivePopup("cart");
  };

  const handleClearCart = () => {
    updateCartStorage([]);
  };

  const handleClearWishlist = () => {
    updateWishlistStorage([]);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || activePopup ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, activePopup]);

  useEffect(() => {
    syncStorageState();

    const handleStorageUpdate = () => {
      syncStorageState();
    };

    const handleCartItemAdded = () => {
      syncStorageState();
      setActivePopup("cart");
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener(COUNT_UPDATE_EVENT, handleStorageUpdate);
    window.addEventListener(CART_ADDED_EVENT, handleCartItemAdded);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener(COUNT_UPDATE_EVENT, handleStorageUpdate);
      window.removeEventListener(CART_ADDED_EVENT, handleCartItemAdded);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setActivePopup(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {/* ==================== Main navbar ==================== */}

      <header
        className={`left-0 top-0 z-50 w-full ${
          isHomePage
            ? "absolute bg-transparent"
            : "relative bg-[#fafaf8]"
        }`}
      >
        <div className="site-container flex h-[104px] items-center justify-between max-[1400px]:h-[94px] max-[1024px]:h-[82px] max-[640px]:h-[76px]">
          {/* ==================== Logo ==================== */}

          <Link
            to="/"
            aria-label="Decorist homepage"
            className="inline-flex shrink-0 items-center no-underline"
          >
            <img
              src={logoImage}
              alt="Decorist"
              className={`block h-auto w-[218px] object-contain object-left transition-all duration-300 max-[1400px]:w-[195px] max-[1180px]:w-[180px] max-[640px]:w-[154px] ${
                isHomePage
                  ? "grayscale-0 brightness-100"
                  : "grayscale brightness-0"
              }`}
            />
          </Link>

          {/* ==================== Desktop navigation and actions ==================== */}

          <div className="hidden items-center gap-[40px] lg:flex xl:gap-[46px]">
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-[40px] xl:gap-[46px]"
            >
              {navItems.map((item) => {
                const isActive = isLinkActive(item);

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`group relative inline-flex py-2 text-[14px] font-medium uppercase leading-none tracking-[0.005em] no-underline transition-colors duration-300 xl:text-[15px] ${
                      isHomePage
                        ? isActive
                          ? "text-white"
                          : "text-white/65 hover:text-white"
                        : isActive
                          ? "text-[#171717]"
                          : "text-[#171717]/55 hover:text-[#171717]"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                        isHomePage
                          ? "bg-white"
                          : "bg-[#171717]"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div
              className={`h-[32px] w-px ${
                isHomePage
                  ? "bg-white/45"
                  : "bg-black/20"
              }`}
            />

            <div className="flex items-center gap-[27px]">
              <button
                type="button"
                onClick={handleSearch}
                aria-label="Search"
                className={`inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-all duration-300 hover:-translate-y-0.5 ${
                  isHomePage
                    ? "text-white hover:text-white/75"
                    : "text-[#171717] hover:text-[#171717]/60"
                }`}
              >
                <Search size={24} strokeWidth={1.55} />
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={`Open wishlist with ${wishlistCount} items`}
                className={`relative inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-all duration-300 hover:-translate-y-0.5 ${
                  isHomePage
                    ? "text-white hover:text-white/75"
                    : "text-[#171717] hover:text-[#171717]/60"
                }`}
              >
                <Heart size={24} strokeWidth={1.55} />

                <span
                  className={`absolute -right-[11px] -top-[11px] inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[9px] font-semibold leading-none ${
                    isHomePage
                      ? "bg-white text-[#171717]"
                      : "bg-[#171717] text-white"
                  }`}
                >
                  {wishlistCount}
                </span>
              </button>

              <button
                type="button"
                onClick={handleCart}
                aria-label={`Open cart with ${cartCount} items`}
                className={`relative inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-all duration-300 hover:-translate-y-0.5 ${
                  isHomePage
                    ? "text-white hover:text-white/75"
                    : "text-[#171717] hover:text-[#171717]/60"
                }`}
              >
                <ShoppingCart size={25} strokeWidth={1.55} />

                <span
                  className={`absolute -right-[11px] -top-[11px] inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[9px] font-semibold leading-none ${
                    isHomePage
                      ? "bg-white text-[#171717]"
                      : "bg-[#171717] text-white"
                  }`}
                >
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* ==================== Mobile hamburger button ==================== */}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className={`hidden cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-all duration-300 hover:scale-105 max-[1023px]:inline-flex ${
              isHomePage
                ? "text-white hover:text-white/75"
                : "text-[#171717] hover:text-[#171717]/60"
            }`}
          >
            <Menu size={29} strokeWidth={1.55} />
          </button>
        </div>
      </header>

      {/* ==================== Mobile menu ==================== */}

      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation backdrop"
          className="absolute inset-0 h-full w-full cursor-default border-0 bg-black/60 p-0 backdrop-blur-sm"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[84%] max-w-[380px] flex-col overflow-y-auto bg-[#4b3322] px-7 pb-8 pt-7 text-white shadow-[-24px_0_70px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-6">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              aria-label="Decorist homepage"
              className="inline-flex items-center no-underline"
            >
              <img
                src={logoImage}
                alt="Decorist"
                className="block h-auto w-[172px] object-contain object-left max-[380px]:w-[150px]"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:rotate-90 hover:text-white/70"
            >
              <X size={27} strokeWidth={1.55} />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="mt-[70px] flex flex-col"
          >
            {navItems.map((item, index) => {
              const isActive = isLinkActive(item);

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center justify-between border-b border-white/15 py-5 text-[18px] font-medium uppercase tracking-[-0.015em] no-underline transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-[11px] font-medium tracking-[0.06em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{item.label}</span>
                  </span>

                  <span
                    className={`text-[23px] font-light transition-transform duration-300 group-hover:translate-x-1 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-35"
                    }`}
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 flex items-center gap-5">
            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search"
              className="inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/70"
            >
              <Search size={23} strokeWidth={1.55} />
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={`Open wishlist with ${wishlistCount} items`}
              className="relative inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/70"
            >
              <Heart size={23} strokeWidth={1.55} />

              <span className="absolute -right-[10px] -top-[10px] inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-[#4b3322]">
                {wishlistCount}
              </span>
            </button>

            <button
              type="button"
              onClick={handleCart}
              aria-label={`Open cart with ${cartCount} items`}
              className="relative inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/70"
            >
              <ShoppingCart size={24} strokeWidth={1.55} />

              <span className="absolute -right-[10px] -top-[10px] inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-[#4b3322]">
                {cartCount}
              </span>
            </button>
          </div>

          <div className="mt-auto pt-12">
            <p className="m-0 text-[12px] text-white/65">
              Thoughtfully curated furniture and decor for beautifully personal
              spaces.
            </p>
          </div>
        </aside>
      </div>

      {/* ==================== Cart and wishlist popup ==================== */}

      <div
        className={`fixed inset-0 z-[120] transition-all duration-300 ${
          activePopup
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup backdrop"
          className="absolute inset-0 h-full w-full cursor-default border-0 bg-black/45 p-0 backdrop-blur-[3px]"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[92%] max-w-[440px] flex-col bg-[#fafaf8] px-6 pb-6 pt-6 text-[#151515] shadow-[-26px_0_80px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-[480px]:w-full max-[480px]:max-w-none ${
            activePopup
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between gap-5 border-b border-black/10 pb-5">
            <div>
              <p className="m-0 text-[12px] font-medium uppercase leading-none tracking-[0.08em] text-[#77736b]">
                Decorist
              </p>

              <h2 className="m-0 pt-2 text-[22px] font-medium uppercase leading-none tracking-[-0.045em] text-[#151515]">
                {isCartPopupOpen ? "Shopping Cart" : "Wishlist"}
              </h2>
            </div>

            <button
              type="button"
              onClick={closePopup}
              aria-label="Close popup"
              className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-transparent p-0 text-[#151515] transition-all duration-300 hover:rotate-90 hover:bg-[#151515] hover:text-white"
            >
              <X size={22} strokeWidth={1.55} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            {isCartPopupOpen && (
              <>
                {cartItems.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {cartItems.map((item) => (
                      <article
                        key={item.id}
                        className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 border-b border-black/10 pb-5 last:border-b-0"
                      >
                        <Link
                          to={`/shop-details/${item.id}`}
                          onClick={closePopup}
                          className="block h-[104px] overflow-hidden bg-[#e5ded4]"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </Link>

                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="m-0 text-[12px] font-medium leading-none tracking-[-0.02em] text-[#77736b]">
                                {item.category}
                              </p>

                              <Link
                                to={`/shop-details/${item.id}`}
                                onClick={closePopup}
                                className="mt-2 block text-[14px] font-semibold uppercase leading-[1.25] tracking-[-0.035em] text-[#151515] no-underline hover:underline"
                              >
                                {item.title}
                              </Link>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveCartItem(item.id)}
                              aria-label={`Remove ${item.title} from cart`}
                              className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[#77736b] transition-colors duration-300 hover:text-[#151515]"
                            >
                              <Trash2 size={17} strokeWidth={1.55} />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4">
                            <div className="flex h-9 items-center border border-black/12">
                              <button
                                type="button"
                                onClick={() => handleDecreaseQuantity(item.id)}
                                aria-label={`Decrease ${item.title} quantity`}
                                className="inline-flex h-full w-9 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[#151515]"
                              >
                                <Minus size={14} strokeWidth={1.7} />
                              </button>

                              <span className="inline-flex h-full min-w-9 items-center justify-center text-[13px] font-medium">
                                {item.quantity || 1}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleIncreaseQuantity(item.id)}
                                aria-label={`Increase ${item.title} quantity`}
                                className="inline-flex h-full w-9 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[#151515]"
                              >
                                <Plus size={14} strokeWidth={1.7} />
                              </button>
                            </div>

                            <p className="m-0 text-[18px] font-medium leading-none tracking-[-0.035em] text-[#151515]">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <ShoppingCart
                      size={42}
                      strokeWidth={1.3}
                      className="text-[#a8a49c]"
                    />

                    <h3 className="m-0 pt-3 text-[18px] font-medium uppercase tracking-[-0.035em] text-[#151515]">
                      Cart is empty
                    </h3>

                    <p className="m-0 pt-2 max-w-[280px] text-[14px] leading-[1.6] text-[#77736b]">
                      Add your favorite furniture and decor pieces to see them
                      here.
                    </p>
                  </div>
                )}
              </>
            )}

            {isWishlistPopupOpen && (
              <>
                {wishlistItems.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {wishlistItems.map((item) => (
                      <article
                        key={item.id}
                        className="grid grid-cols-[92px_minmax(0,1fr)] gap-4 border-b border-black/10 pb-5 last:border-b-0"
                      >
                        <Link
                          to={`/shop-details/${item.id}`}
                          onClick={closePopup}
                          className="block h-[104px] overflow-hidden bg-[#e5ded4]"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </Link>

                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="m-0 text-[12px] font-medium leading-none tracking-[-0.02em] text-[#77736b]">
                                {item.category}
                              </p>

                              <Link
                                to={`/shop-details/${item.id}`}
                                onClick={closePopup}
                                className="mt-2 block text-[14px] font-semibold uppercase leading-[1.25] tracking-[-0.035em] text-[#151515] no-underline hover:underline"
                              >
                                {item.title}
                              </Link>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveWishlistItem(item.id)
                              }
                              aria-label={`Remove ${item.title} from wishlist`}
                              className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-[#77736b] transition-colors duration-300 hover:text-[#151515]"
                            >
                              <Trash2 size={17} strokeWidth={1.55} />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4">
                            <p className="m-0 text-[18px] font-medium leading-none tracking-[-0.035em] text-[#151515]">
                              {item.price}
                            </p>

                            <button
                              type="button"
                              onClick={() => handleMoveWishlistToCart(item)}
                              className="inline-flex h-9 items-center justify-center gap-2 border border-[#151515] bg-[#151515] px-3 text-[11px] font-semibold uppercase leading-none tracking-[-0.01em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#151515]"
                            >
                              <span>Add</span>
                              <ShoppingCart size={14} strokeWidth={1.55} />
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <Heart
                      size={42}
                      strokeWidth={1.3}
                      className="text-[#a8a49c]"
                    />

                    <h3 className="m-0 pt-3 text-[18px] font-medium uppercase tracking-[-0.035em] text-[#151515]">
                      Wishlist is empty
                    </h3>

                    <p className="m-0 pt-2 max-w-[280px] text-[14px] leading-[1.6] text-[#77736b]">
                      Save your favorite products and quickly find them later.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {isCartPopupOpen && (
            <div className="border-t border-black/10 pt-5">
              <div className="flex items-center justify-between gap-5">
                <p className="m-0 text-[15px] font-medium uppercase tracking-[-0.02em] text-[#77736b]">
                  Subtotal
                </p>

                <p className="m-0 text-[24px] font-medium leading-none tracking-[-0.045em] text-[#151515]">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center border border-[#151515] bg-transparent px-4 text-[12px] font-semibold uppercase leading-none tracking-[-0.01em] text-[#151515] transition-colors duration-300 hover:bg-[#151515] hover:text-white"
                >
                  Clear
                </button>

                <Link
                  to="/shop"
                  onClick={closePopup}
                  className="inline-flex h-12 flex-1 items-center justify-center border border-[#151515] bg-[#151515] px-4 text-[12px] font-semibold uppercase leading-none tracking-[-0.01em] text-white no-underline transition-colors duration-300 hover:bg-transparent hover:text-[#151515]"
                >
                  Continue
                </Link>
              </div>
            </div>
          )}

          {isWishlistPopupOpen && (
            <div className="border-t border-black/10 pt-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleClearWishlist}
                  className="inline-flex h-12 cursor-pointer items-center justify-center border border-[#151515] bg-transparent px-4 text-[12px] font-semibold uppercase leading-none tracking-[-0.01em] text-[#151515] transition-colors duration-300 hover:bg-[#151515] hover:text-white"
                >
                  Clear
                </button>

                <Link
                  to="/shop"
                  onClick={closePopup}
                  className="inline-flex h-12 items-center justify-center border border-[#151515] bg-[#151515] px-4 text-[12px] font-semibold uppercase leading-none tracking-[-0.01em] text-white no-underline transition-colors duration-300 hover:bg-transparent hover:text-[#151515]"
                >
                  Explore
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default Navbar;