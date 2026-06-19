import {
  useEffect,
  useRef,
  useState,
} from "react";

import NewArrivals from "../../components/NewArrivals/NewArrivals";

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

  return (
    <main className="w-full overflow-hidden bg-[#f8f8f6] text-[#151515]">
      {/* ==================== Shop hero section ==================== */}

      <section
        ref={heroRef}
        className="w-full bg-[#f8f8f6] pb-[118px] pt-[70px] max-[1400px]:pb-[102px] max-[1400px]:pt-[62px] max-[1024px]:pb-[82px] max-[1024px]:pt-[56px] max-[640px]:pb-[64px] max-[640px]:pt-[46px]"
      >
        <div className="site-container">
          {/* ==================== Shop hero heading ==================== */}

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

          {/* ==================== Shop hero description ==================== */}

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
    </main>
  );
};

export default Shop;