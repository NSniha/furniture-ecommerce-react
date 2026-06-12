import { useEffect, useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

import heroOne from "../../assets/images/hero-1.jpg";
import heroTwo from "../../assets/images/hero-2.jpg";
import heroThree from "../../assets/images/hero-3.jpg";

const navItems = ["HOME", "ABOUT", "SHOP", "CONTACT US"];

const heroSlides = [
  {
    id: 1,
    image: heroOne,
    titleLineOne: "let your decor tell",
    titleLineTwo: "a story",
    text: "Mix textures, colors, and personality with our uniquely expressive home pieces.",
    buttonText: "Shop the Collection",
  },
  {
    id: 2,
    image: heroTwo,
    titleLineOne: "warm wood, calm",
    titleLineTwo: "living",
    text: "Discover timeless wooden furniture designed to bring softness, comfort, and character into every room.",
    buttonText: "Explore Furniture",
  },
  {
    id: 3,
    image: heroThree,
    titleLineOne: "crafted spaces for",
    titleLineTwo: "slow living",
    text: "Create a home that feels natural, balanced, and beautifully personal with our curated wooden collections.",
    buttonText: "View New Arrivals",
  },
];

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#73583d] text-white">
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1400ms] ease-out ${
              index === activeSlide
                ? "scale-[1.01] opacity-100"
                : "scale-[1.055] opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Dark Brown Overlay */}
      <div className="hero-premium-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="hero-soft-vignette pointer-events-none absolute inset-0 z-[2]" />
      <div className="hero-bottom-fade pointer-events-none absolute inset-0 z-[3]" />

      {/* Navbar */}
      <header className="fixed left-0 top-0 z-50 w-full">
        <div className="site-container flex h-[82px] items-center justify-between lg:h-[92px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 text-white no-underline">
            <span className="relative block h-[30px] w-[32px] overflow-hidden bg-white sm:h-[32px] sm:w-[34px]">
              <span className="absolute right-[-2px] top-1/2 z-[2] h-[24px] w-[24px] -translate-y-1/2 rounded-full bg-[#6d5138] sm:h-[27px] sm:w-[27px]" />
            </span>

            <span className="logo-font text-[26px] font-medium leading-none tracking-[-0.04em] sm:text-[32px] lg:text-[26px]">
              DECORIST
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-9 lg:flex xl:gap-11">
            <nav className="flex items-center gap-8 xl:gap-10">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`group relative text-[14px] font-semibold tracking-[0.015em] no-underline transition-colors duration-300 xl:text-[15px] ${
                    index === 0
                      ? "text-white"
                      : "text-white/62 hover:text-white"
                  }`}
                >
                  {item}

                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-white transition-all duration-300 ${
                      index === 0 ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </nav>

            <div className="h-[34px] w-px bg-white/40" />

            <div className="flex items-center gap-7">
              <button
                type="button"
                aria-label="Search"
                className="inline-flex items-center justify-center border-0 bg-transparent p-0 text-white transition duration-300 hover:-translate-y-0.5 hover:text-white/80"
              >
                <Search size={27} strokeWidth={1.65} />
              </button>

              <button
                type="button"
                aria-label="Cart"
                className="inline-flex items-center justify-center border-0 bg-transparent p-0 text-white transition duration-300 hover:-translate-y-0.5 hover:text-white/80"
              >
                <ShoppingCart size={28} strokeWidth={1.65} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 p-0 text-white backdrop-blur-md transition hover:bg-white/15 lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] transition duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu backdrop"
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 border-0 bg-black/60 p-0 backdrop-blur-md"
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[84%] max-w-[360px] bg-[#4b3322] px-7 py-8 text-white shadow-2xl transition duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 p-0 text-white transition hover:bg-white/15"
          >
            <X size={22} />
          </button>

          <div className="mb-12 flex items-center gap-3">
            <span className="relative block h-[30px] w-[32px] overflow-hidden bg-white">
              <span className="absolute right-[-2px] top-1/2 z-[2] h-[24px] w-[24px] -translate-y-1/2 rounded-full bg-[#4b3322]" />
            </span>

            <span className="logo-font text-[25px] font-medium tracking-[-0.04em]">
              DECORIST
            </span>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <a
                href="#"
                key={item}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-4 text-[15px] font-semibold tracking-[0.04em] no-underline transition ${
                  index === 0
                    ? "bg-white/12 text-white"
                    : "text-white/72 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              aria-label="Search"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 p-0 text-white transition hover:bg-white/15"
            >
              <Search size={21} />
            </button>

            <button
              type="button"
              aria-label="Cart"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 p-0 text-white transition hover:bg-white/15"
            >
              <ShoppingCart size={22} />
            </button>
          </div>
        </aside>
      </div>

      {/* Hero Content */}
      <div className="site-container relative z-10 min-h-screen">
        {/* Heading */}
        <div
          key={`heading-${activeSlide}`}
          className="animate-fade-up-soft absolute left-1/2 top-[17%] w-full max-w-[650px] -translate-x-1/2 text-center md:top-[18%] md:max-w-[720px] lg:left-auto lg:right-0 lg:top-[20.5%] lg:max-w-[780px] lg:translate-x-0 lg:text-left"
        >
          <h1 className="hero-heading-font text-[42px] font-normal lowercase leading-[1.04] tracking-[-0.035em] text-white sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[94px]">
            {currentSlide.titleLineOne}
            <br />
            <span className="block pt-3 sm:pt-4 lg:pt-5">
              {currentSlide.titleLineTwo}
            </span>
          </h1>
        </div>

        {/* Bottom Left Content */}
        <div
          key={`content-${activeSlide}`}
          className="animate-fade-left-soft absolute bottom-[44px] left-0 max-w-[300px] sm:bottom-[56px] sm:max-w-[350px] md:max-w-[380px] lg:bottom-[72px] lg:max-w-[400px]"
        >
          <p className="mb-6 text-[14.5px] font-normal leading-[1.62] tracking-[-0.005em] text-white/90 sm:text-[16px] md:text-[18px] lg:mb-8 lg:text-[19px]">
            {currentSlide.text}
          </p>

          <a
            href="#"
            className="group inline-flex h-[50px] items-center gap-4 rounded-[3px] bg-white/95 px-5 text-[11.5px] font-bold uppercase tracking-[0.01em] text-[#151515] no-underline shadow-[0_16px_38px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_22px_52px_rgba(0,0,0,0.16)] sm:h-[56px] sm:px-6 sm:text-[13px] md:h-[60px] md:px-7 md:text-[14px] lg:h-[64px] lg:text-[15px]"
          >
            <span>{currentSlide.buttonText}</span>
            <span className="text-[25px] font-light leading-none transition duration-300 group-hover:translate-x-1 sm:text-[27px] lg:text-[30px]">
              →
            </span>
          </a>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-[52px] right-0 z-20 hidden items-center gap-2 sm:flex lg:bottom-[92px]">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full border-0 p-0 transition-all duration-300 hover:scale-110 ${
                index === activeSlide
                  ? "w-[22px] bg-white"
                  : "w-2 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;