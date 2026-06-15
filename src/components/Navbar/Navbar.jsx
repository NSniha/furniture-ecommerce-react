import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import logoImage from "../../assets/images/logo-white.png";

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

const CART_COUNT_KEY = "decoristCartCount";
const WISHLIST_COUNT_KEY = "decoristWishlistCount";
const COUNT_UPDATE_EVENT = "decorist-counts-updated";

const getSavedCount = (key) => {
  const savedValue = Number(localStorage.getItem(key));

  if (!Number.isFinite(savedValue) || savedValue < 0) {
    return 0;
  }

  return savedValue;
};

const Navbar = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const isHomePage = location.pathname === "/";

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getSavedCount(CART_COUNT_KEY));
      setWishlistCount(getSavedCount(WISHLIST_COUNT_KEY));
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener(COUNT_UPDATE_EVENT, updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener(COUNT_UPDATE_EVENT, updateCounts);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearch = () => {
    console.log("Open search");
  };

  const handleWishlist = () => {
    console.log("Open wishlist");
  };

  const handleCart = () => {
    console.log("Open cart");
  };

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`left-0 top-0 z-50 w-full ${
          isHomePage
            ? "absolute bg-transparent"
            : "relative bg-[#fafaf8]"
        }`}
      >
        <div className="site-container flex h-[104px] items-center justify-between max-[1400px]:h-[94px] max-[1024px]:h-[82px] max-[640px]:h-[76px]">
          {/* Logo */}
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

          {/* Desktop Navigation and Actions */}
          <div className="hidden items-center gap-[40px] lg:flex xl:gap-[46px]">
            {/* Navigation */}
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

                    {/* Hover-only underline */}
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

            {/* Divider */}
            <div
              className={`h-[32px] w-px ${
                isHomePage
                  ? "bg-white/45"
                  : "bg-black/20"
              }`}
            />

            {/* Actions */}
            <div className="flex items-center gap-[27px]">
              {/* Search */}
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
                <Search
                  size={24}
                  strokeWidth={1.55}
                />
              </button>

              {/* Wishlist */}
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
                <Heart
                  size={24}
                  strokeWidth={1.55}
                />

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

              {/* Cart */}
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
                <ShoppingCart
                  size={25}
                  strokeWidth={1.55}
                />

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

          {/* Mobile Hamburger Button */}
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
            <Menu
              size={29}
              strokeWidth={1.55}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible pointer-events-auto opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation backdrop"
          className="absolute inset-0 h-full w-full cursor-default border-0 bg-black/60 p-0 backdrop-blur-sm"
        />

        {/* Mobile Drawer */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[84%] max-w-[380px] flex-col overflow-y-auto bg-[#4b3322] px-7 pb-8 pt-7 text-white shadow-[-24px_0_70px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
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

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:rotate-90 hover:text-white/70"
            >
              <X
                size={27}
                strokeWidth={1.55}
              />
            </button>
          </div>

          {/* Mobile Navigation */}
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

          {/* Mobile Actions */}
          <div className="mt-8 flex items-center gap-5">
            {/* Search */}
            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search"
              className="inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/70"
            >
              <Search
                size={23}
                strokeWidth={1.55}
              />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={`Open wishlist with ${wishlistCount} items`}
              className="relative inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/70"
            >
              <Heart
                size={23}
                strokeWidth={1.55}
              />

              <span className="absolute -right-[10px] -top-[10px] inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-[#4b3322]">
                {wishlistCount}
              </span>
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={handleCart}
              aria-label={`Open cart with ${cartCount} items`}
              className="relative inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-white transition-all duration-300 hover:-translate-y-0.5 hover:text-white/70"
            >
              <ShoppingCart
                size={24}
                strokeWidth={1.55}
              />

              <span className="absolute -right-[10px] -top-[10px] inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-[#4b3322]">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Drawer Description */}
          <div className="mt-auto pt-12">
            <p className="text-[12px] m-0 text-white/65">
              Thoughtfully curated furniture and decor for beautifully personal
              spaces.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;