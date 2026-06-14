import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import heroOne from "../../assets/images/hero-1.jpg";
import heroTwo from "../../assets/images/hero-2.jpg";
import heroThree from "../../assets/images/hero-3.jpg";

const heroSlides = [
  {
    id: 1,
    image: heroOne,
    imagePosition:
      "object-[50%_center] max-[1180px]:object-[48%_center] max-[900px]:object-[53%_center] max-[640px]:object-[63%_center]",
    titleLineOne: "beautiful spaces made",
    titleLineTwo: "to feel personal",
    mobileTitleLines: ["beautiful spaces", "made to feel", "personal"],
    text: "Bring warmth, personality, and thoughtful detail into your home with furniture and decor chosen for everyday living.",
    buttonText: "Discover Collection",
    buttonPath: "/shop",
  },
  {
    id: 2,
    image: heroTwo,
    imagePosition:
      "object-[50%_center] max-[900px]:object-[55%_center] max-[640px]:object-[61%_center]",
    titleLineOne: "natural forms for",
    titleLineTwo: "modern living",
    mobileTitleLines: ["natural forms", "for modern", "living"],
    text: "Explore timeless wooden pieces designed to balance natural character, lasting comfort, and modern simplicity.",
    buttonText: "Explore Furniture",
    buttonPath: "/shop",
  },
  {
    id: 3,
    image: heroThree,
    imagePosition:
      "object-[50%_center] max-[900px]:object-[54%_center] max-[640px]:object-[60%_center]",
    titleLineOne: "timeless details for",
    titleLineTwo: "slower days",
    mobileTitleLines: ["timeless details", "for slower", "days"],
    text: "Create a calmer home with beautifully curated pieces that make daily moments feel softer and more meaningful.",
    buttonText: "View New Arrivals",
    buttonPath: "/shop",
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((currentIndex) => {
        return (currentIndex + 1) % heroSlides.length;
      });
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <section className="relative h-[108svh] min-h-[800px] max-h-[1120px] w-full overflow-hidden bg-[#73583d] text-white max-[900px]:h-[102svh] max-[900px]:min-h-[740px] max-[640px]:h-[100svh] max-[640px]:min-h-[700px] max-[640px]:max-h-none max-[420px]:min-h-[680px]">
      {/* ==================== Background slides ==================== */}
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-all duration-[1400ms] ease-out ${
                isActive
                  ? "scale-[1.01] opacity-100"
                  : "scale-[1.055] opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt=""
                className={`block h-full w-full object-cover ${slide.imagePosition}`}
              />
            </div>
          );
        })}
      </div>

      {/* ==================== Visual overlay layers ==================== */}
      <div className="hero-premium-overlay pointer-events-none absolute inset-0 z-[1]" />
      <div className="hero-soft-vignette pointer-events-none absolute inset-0 z-[2]" />
      <div className="hero-bottom-fade pointer-events-none absolute inset-0 z-[3]" />

      {/* ==================== Shared hero content container ==================== */}
      <div className="site-container relative z-10 h-full">
        {/* Desktop and tablet heading */}
        <div
          key={`desktop-heading-${activeSlide}`}
          className="animate-fade-up-soft absolute right-[-1.5%] top-[18%] w-full max-w-[900px] text-left max-[1440px]:right-[-1%] max-[1440px]:max-w-[800px] max-[1180px]:right-0 max-[1180px]:max-w-[720px] max-[900px]:left-1/2 max-[900px]:right-auto max-[900px]:top-[17%] max-[900px]:max-w-[720px] max-[900px]:-translate-x-1/2 max-[900px]:text-center max-[640px]:hidden"
        >
          <h1 className="hero-heading-font m-0 text-[100px] font-normal lowercase leading-[1.04] tracking-[-0.04em] text-white max-[1440px]:text-[90px] max-[1180px]:text-[78px] max-[900px]:text-[68px]">
            {currentSlide.titleLineOne}

            <span className="block pt-4 max-[900px]:pt-3">
              {currentSlide.titleLineTwo}
            </span>
          </h1>
        </div>

        {/* ==================== Desktop and tablet supporting content ==================== */}
        <div
          key={`desktop-content-${activeSlide}`}
          className="animate-fade-left-soft absolute bottom-[100px] left-0 w-full max-w-[430px] max-[1400px]:bottom-[82px] max-[1400px]:max-w-[400px] max-[1180px]:bottom-[68px] max-[1180px]:max-w-[380px] max-[900px]:bottom-[54px] max-[900px]:max-w-[350px] max-[640px]:hidden"
        >
          <p className="section-copy-large m-0 text-white/95">
            {currentSlide.text}
          </p>

          <Link
            to={currentSlide.buttonPath}
            className="group mt-8 inline-flex h-[66px] items-center justify-center gap-[22px] rounded-[3px] bg-white px-[28px] text-[15px] font-semibold uppercase leading-none tracking-[-0.01em] text-[#151515] no-underline shadow-[0_16px_38px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(0,0,0,0.16)] max-[1180px]:mt-7 max-[1180px]:h-[60px] max-[1180px]:px-6 max-[1180px]:text-[14px] max-[900px]:h-[56px] max-[900px]:gap-[18px] max-[900px]:text-[13px]"
          >
            <span>{currentSlide.buttonText}</span>

            <span className="text-[30px] font-light leading-none transition-transform duration-300 group-hover:translate-x-1 max-[900px]:text-[27px]">
              →
            </span>
          </Link>
        </div>

        {/* ==================== Desktop and tablet slide navigation ==================== */}
        <div className="absolute bottom-[108px] right-0 z-20 flex items-center gap-[7px] max-[1400px]:bottom-[90px] max-[1180px]:bottom-[78px] max-[900px]:bottom-[64px] max-[640px]:hidden">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeSlide;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-[7px] cursor-pointer rounded-full border-0 p-0 transition-all duration-300 hover:scale-110 ${
                  isActive
                    ? "w-[20px] bg-white"
                    : "w-[7px] bg-white/45 hover:bg-white/80"
                }`}
              />
            );
          })}
        </div>

        {/* ==================== Mobile hero content ==================== */}
        <div
          key={`mobile-content-${activeSlide}`}
          className="animate-fade-up-soft absolute inset-x-0 top-[118px] hidden flex-col items-center text-center max-[640px]:flex max-[480px]:top-[132px] max-[420px]:top-[130px]"
        >
          <h1 className="hero-heading-font m-0 w-full max-w-[365px] text-[clamp(48px,13vw,56px)] font-normal lowercase leading-[1.20] tracking-[-0.045em] text-white max-[480px]:max-w-[345px] max-[420px]:max-w-[320px] max-[420px]:text-[clamp(43px,12.5vw,49px)]">
            {currentSlide.mobileTitleLines.map((line, index) => (
              <span
                key={`${line}-${index}`}
                className="block"
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="m-0 max-w-[350px] px-2 pt-[36px] text-[16px] font-normal leading-[1.58] tracking-[-0.015em] text-white/95 max-[480px]:max-w-[330px] max-[480px]:pt-8 max-[420px]:max-w-[305px] max-[420px]:pt-7 max-[420px]:text-[15px] max-[420px]:leading-[1.55]">
            {currentSlide.text}
          </p>

          <Link
            to={currentSlide.buttonPath}
            className="group mt-9 inline-flex h-[58px] w-full max-w-[250px] items-center justify-between rounded-[3px] bg-white px-6 text-[15px] font-semibold uppercase leading-none tracking-[-0.01em] text-[#151515] no-underline shadow-[0_16px_38px_rgba(0,0,0,0.12)] transition-all duration-300 active:scale-[0.98] max-[480px]:mt-8 max-[480px]:max-w-[250px] max-[420px]:h-[54px] max-[420px]:max-w-[230px] max-[420px]:px-5 max-[420px]:text-[13px]"
          >
            <span>{currentSlide.buttonText}</span>

            <span className="text-[27px] font-light leading-none max-[420px]:text-[24px]">
              →
            </span>
          </Link>
        </div>

        {/* ==================== Mobile slide navigation ==================== */}
        <div className="absolute bottom-[34px] left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center gap-2 max-[640px]:flex max-[480px]:bottom-[30px] max-[420px]:bottom-[26px]">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeSlide;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-[7px] cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${
                  isActive
                    ? "w-[30px] bg-white"
                    : "w-[8px] bg-white/45"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;