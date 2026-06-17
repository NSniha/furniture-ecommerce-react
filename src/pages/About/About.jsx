import {
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import aboutHeroImage from "../../assets/images/about-hero-room.jpg";

import Partners from "../../components/Partners/Partners";

/* ==================== Section reveal hook ==================== */

const useSectionReveal = (threshold = 0.12) => {
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

const About = () => {
  const {
    sectionRef: heroRef,
    visible: heroVisible,
  } = useSectionReveal(0.08);

  const {
    sectionRef: introductionRef,
    visible: introductionVisible,
  } = useSectionReveal(0.1);

  return (
    <main className="w-full overflow-hidden bg-[#f8f8f6] text-[#151515]">
      {/* ==================== About hero section ==================== */}

      <section
        ref={heroRef}
        className="w-full overflow-hidden bg-[#f8f8f6] pb-[100px] max-[1400px]:pb-[88px] max-[1024px]:pb-[74px] max-[640px]:pb-[56px]"
      >
        {/* ==================== About hero content ==================== */}

        <div className="site-container pb-[78px] pt-[42px] max-[1400px]:pb-[68px] max-[1400px]:pt-[36px] max-[1024px]:pb-[60px] max-[1024px]:pt-[42px] max-[640px]:pb-[48px] max-[640px]:pt-[34px]">
          {/* ==================== Main heading ==================== */}

          <div
            className={`mx-auto max-w-[1500px] text-center transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              heroVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[38px] opacity-0"
            }`}
          >
            <h1 className="about-display-font m-0 text-[clamp(68px,5.7vw,94px)] font-normal lowercase leading-[1.07] tracking-[-0.055em] text-[#151515] max-[1024px]:text-[clamp(58px,8vw,78px)] max-[640px]:text-[clamp(44px,13vw,62px)]">
              <span className="block">
                designed to inspire every
              </span>

              <span className="mt-[14px] block max-[1024px]:mt-[10px] max-[640px]:mt-[6px]">
                room
              </span>
            </h1>
          </div>

          {/* ==================== Hero supporting content ==================== */}

          <div className="mt-[86px] flex items-end justify-between gap-[70px] max-[1400px]:mt-[76px] max-[1024px]:mt-[64px] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-[34px] max-[640px]:mt-[52px]">
            {/* ==================== Hero description ==================== */}

            <p
              className={`m-0 max-w-[570px] text-[19px] font-normal uppercase leading-[1.45] tracking-[-0.025em] text-[#666666] transition-all delay-[160ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1400px]:max-w-[520px] max-[1400px]:text-[17px] max-[1024px]:max-w-[470px] max-[1024px]:text-[16px] max-[640px]:max-w-[340px] max-[640px]:text-[14px] ${
                heroVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[34px] opacity-0"
              }`}
            >
              Decorist believes home reflects
              <br className="max-[480px]:hidden" />
              your personality, comfort, and
              <br className="max-[480px]:hidden" />
              lifestyle.
            </p>

            {/* ==================== Scroll down link ==================== */}

            <a
              href="#about-introduction"
              aria-label="Scroll to the About Us section"
              className={`inline-flex shrink-0 items-center text-[15px] font-normal uppercase leading-none tracking-[-0.02em] text-[#666666] no-underline transition-all delay-[240ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#151515] motion-reduce:transition-none max-[1024px]:text-[14px] max-[768px]:self-end max-[640px]:self-start max-[640px]:text-[13px] ${
                heroVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[34px] opacity-0"
              }`}
            >
              (Scroll Down)
            </a>
          </div>
        </div>

        {/* ==================== About hero image ==================== */}

        <div
          className={`relative h-[clamp(500px,39.7vw,815px)] w-full overflow-hidden bg-[#e5e1d8] transition-all delay-[280ms] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:h-[58vw] max-[768px]:h-[68vw] max-[640px]:h-[82vw] max-[420px]:h-[94vw] ${
            heroVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-[46px] opacity-0"
          }`}
        >
          <img
            src={aboutHeroImage}
            alt="Minimal Decorist interior with wooden cabinet, chair and indoor plants"
            className={`h-full w-full object-cover object-center transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              heroVisible
                ? "scale-100"
                : "scale-[1.045]"
            }`}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.015] via-transparent to-black/[0.035]" />
        </div>
      </section>

      {/* ==================== About introduction section ==================== */}

      <section
        id="about-introduction"
        ref={introductionRef}
        className="w-full scroll-mt-8 bg-[#f8f8f6] pb-[100px] max-[1400px]:pb-[88px] max-[1024px]:pb-[74px] max-[640px]:pb-[56px]"
      >
        <div className="site-container">
          {/* ==================== Section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              introductionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[24px] opacity-0"
            }`}
          >
            <p className="section-label">//01</p>

            <p className="section-label">
              /About Us
            </p>
          </div>

          {/* ==================== Introduction content ==================== */}

          <div className="mt-[58px] grid grid-cols-[0.78fr_1.22fr] grid-rows-[auto_auto] gap-x-[96px] gap-y-[78px] max-[1400px]:gap-x-[72px] max-[1180px]:grid-cols-[0.85fr_1.15fr] max-[1180px]:gap-x-[56px] max-[1024px]:mt-[52px] max-[900px]:grid-cols-1 max-[900px]:grid-rows-none max-[900px]:gap-y-[48px] max-[640px]:mt-[44px]">
            {/* ==================== Introduction heading ==================== */}

            <h2
              className={`about-display-font col-start-1 row-start-1 m-0 max-w-[500px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.12] tracking-[-0.055em] text-[#151515] transition-all delay-[80ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:text-[clamp(58px,7vw,70px)] max-[900px]:order-1 max-[900px]:col-start-1 max-[900px]:row-auto max-[640px]:text-[clamp(44px,12vw,58px)] ${
                introductionVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[38px] opacity-0"
              }`}
            >
              <span className="block">
                welcome to
              </span>

              <span className="mt-[14px] block max-[640px]:mt-[8px]">
                decorist
              </span>
            </h2>

            {/* ==================== Introduction description ==================== */}

            <div
              className={`col-start-2 row-start-1 max-w-[760px] transition-all delay-[150ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[900px]:order-2 max-[900px]:col-start-1 max-[900px]:row-auto max-[900px]:max-w-[720px] ${
                introductionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[34px] opacity-0"
              }`}
            >
              <p className="section-copy">
                Decorist is a modern home decor brand focused on
                bringing elevated style and quality into everyday
                living spaces. With a curated selection of furniture,
                lighting, wall art, and decor accessories, we help
                individuals and interior enthusiasts create homes
                that feel personal, timeless, and inspired.
              </p>

              <p className="section-copy mt-[24px]">
                Our approach is rooted in thoughtful design,
                attention to detail, and accessible luxury. Whether
                you’re revamping one room or your entire home, we
                make decorating a joyful and effortless experience
                from discovery to delivery.
              </p>
            </div>

            {/* ==================== Contact button ==================== */}

            <Link
              to="/contact"
              className={`group col-start-1 row-start-2 inline-flex h-[54px] w-fit min-w-[190px] items-center justify-center gap-[18px] self-end border border-[#8c8c88] bg-transparent px-[26px] text-[14px] font-medium uppercase leading-none tracking-[-0.01em] text-[#151515] no-underline transition-all delay-[230ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:border-[#151515] hover:bg-[#151515] hover:text-white motion-reduce:transition-none max-[900px]:order-4 max-[900px]:col-start-1 max-[900px]:row-auto max-[640px]:h-[50px] max-[640px]:min-w-[174px] max-[640px]:px-[22px] max-[640px]:text-[12px] ${
                introductionVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[30px] opacity-0"
              }`}
            >
              <span>Contact Us</span>

              <ArrowRight
                size={21}
                strokeWidth={1.45}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* ==================== About statistics ==================== */}

            <div
              className={`col-start-2 row-start-2 grid grid-cols-2 items-start gap-x-[92px] transition-all delay-[230ms] duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1400px]:gap-x-[60px] max-[900px]:order-3 max-[900px]:col-start-1 max-[900px]:row-auto max-[900px]:max-w-[720px] max-[640px]:grid-cols-1 max-[640px]:gap-y-[46px] ${
                introductionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[42px] opacity-0"
              }`}
            >
              {/* ==================== Products statistic ==================== */}

              <div>
                <p className="m-0 text-[clamp(54px,4.5vw,72px)] font-medium leading-none tracking-[-0.055em] text-[#151515] max-[640px]:text-[52px]">
                  1,200+
                </p>

                <p className="mt-[24px] max-w-[230px] text-[20px] font-normal leading-[1.42] tracking-[-0.025em] text-[#666666] max-[1180px]:text-[18px] max-[640px]:mt-[18px] max-[640px]:text-[16px]">
                  Curated products,
                  <br />
                  growing each season
                </p>
              </div>

              {/* ==================== Customer statistic ==================== */}

              <div className="mt-[102px] max-[1180px]:mt-[78px] max-[900px]:mt-[70px] max-[640px]:mt-0">
                <p className="m-0 text-[clamp(54px,4.5vw,72px)] font-medium leading-none tracking-[-0.055em] text-[#151515] max-[640px]:text-[52px]">
                  50,000+
                </p>

                <p className="mt-[24px] max-w-[300px] text-[20px] font-normal leading-[1.42] tracking-[-0.025em] text-[#666666] max-[1180px]:text-[18px] max-[640px]:mt-[18px] max-[640px]:text-[16px]">
                  Trusted by happy customers
                  <br className="max-[420px]:hidden" />
                  worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Partners section ==================== */}

      <Partners />

      {/* ==================== About section three ==================== */}

      {/* Section three code will be added here */}

      {/* ==================== About section four ==================== */}

      {/* Section four code will be added here */}

      {/* ==================== About section five ==================== */}

      {/* Section five code will be added here */}

      {/* ==================== About section six ==================== */}

      {/* Section six code will be added here */}
    </main>
  );
};

export default About;