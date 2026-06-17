import {
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import aboutHeroImage from "../../assets/images/about-hero-room.jpg";

import Partners from "../../components/Partners/Partners";

import aboutVisionImage from "../../assets/images/about-vision-room.jpg";

import aboutValuesImage from "../../assets/images/about-values-room.jpg";

import valueDesignIcon from "../../assets/icons/value-design-led.svg";
import valueCustomerIcon from "../../assets/icons/value-customer-centered.svg";
import valueQualityIcon from "../../assets/icons/value-quality.svg";
import valueSustainabilityIcon from "../../assets/icons/value-sustainability.svg";
import valueCreativeIcon from "../../assets/icons/value-creative.svg";
import valueCraftsmanshipIcon from "../../assets/icons/value-craftsmanship.svg";


/* ==================== About values information ==================== */

const aboutValues = [
  {
    id: 1,
    icon: valueDesignIcon,
    title: "Design-led Thinking",
    description:
      "We put aesthetics and functionality at the core of everything we offer.",
  },
  {
    id: 2,
    icon: valueCustomerIcon,
    title: "Customer-centered",
    description:
      "Your satisfaction shapes our designs, services, and innovations.",
  },
  {
    id: 3,
    icon: valueQualityIcon,
    title: "Quality Always",
    description:
      "Every product is handpicked for its materials, craftsmanship, and longevity.",
  },
  {
    id: 4,
    icon: valueSustainabilityIcon,
    title: "Sustainability Mindset",
    description:
      "We support mindful choices and aim to reduce environmental impact.",
  },
  {
    id: 5,
    icon: valueCreativeIcon,
    title: "Creative Freedom",
    description:
      "We encourage self-expression and help you bring your vision to life.",
  },
  {
    id: 6,
    icon: valueCraftsmanshipIcon,
    title: "Lasting Craftsmanship",
    description:
      "Every detail is considered to create pieces that remain beautiful for years.",
  },
];

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

  const {
    sectionRef: visionRef,
    visible: visionVisible,
  } = useSectionReveal(0.1);

  const {
    sectionRef: valuesRef,
    visible: valuesVisible,
  } = useSectionReveal(0.08);


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

      {/* ==================== Vision and mission section ==================== */}

      <section
        id="about-vision"
        ref={visionRef}
        className="w-full scroll-mt-8 bg-[#f8f8f6] pb-[118px] pt-[112px] max-[1400px]:pb-[100px] max-[1400px]:pt-[96px] max-[1024px]:pb-[82px] max-[1024px]:pt-[78px] max-[640px]:pb-[64px] max-[640px]:pt-[62px]"
      >
        <div className="site-container">
          {/* ==================== Vision section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              visionVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[24px] opacity-0"
            }`}
          >
            <p className="section-label">//03</p>

            <p className="section-label">
              /Vision &amp; Mission
            </p>
          </div>

          {/* ==================== Vision heading and image ==================== */}

          <div className="mt-[68px] grid grid-cols-[0.92fr_1.08fr] items-start gap-[104px] max-[1400px]:gap-[76px] max-[1180px]:gap-[56px] max-[900px]:grid-cols-1 max-[900px]:gap-[48px] max-[640px]:mt-[48px] max-[640px]:gap-[38px]">
            {/* ==================== Vision heading ==================== */}

            <h2
              className={`about-display-font m-0 max-w-[600px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.16] tracking-[-0.055em] text-[#151515] transition-all delay-[80ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:text-[clamp(58px,7vw,70px)] max-[900px]:max-w-[560px] max-[640px]:text-[clamp(44px,12vw,58px)] ${
                visionVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[38px] opacity-0"
              }`}
            >
              <span className="block">
                what we truly
              </span>

              <span className="mt-[14px] block max-[640px]:mt-[8px]">
                stand for
              </span>
            </h2>

            {/* ==================== Vision image ==================== */}

            <div
              className={`group relative aspect-[649/326] w-full overflow-hidden bg-[#e8e2d8] transition-all delay-[150ms] duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                visionVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[42px] opacity-0"
              }`}
            >
              <img
                src={aboutVisionImage}
                alt="Minimal warm interior representing Decorist vision and mission"
                className={`h-full w-full object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  visionVisible
                    ? "scale-100"
                    : "scale-[1.045]"
                }`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-black/[0.025]" />
            </div>
          </div>

          {/* ==================== Vision and mission information ==================== */}

          <div className="mt-[82px] max-[1024px]:mt-[68px] max-[640px]:mt-[54px]">
            {/* ==================== Our vision row ==================== */}

            <article
              className={`grid grid-cols-[70px_320px_minmax(0,1fr)] items-start gap-x-[62px] border-b border-[#d7d7d3] pb-[76px] transition-all delay-[220ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1400px]:grid-cols-[58px_280px_minmax(0,1fr)] max-[1400px]:gap-x-[46px] max-[1180px]:grid-cols-[48px_240px_minmax(0,1fr)] max-[1180px]:gap-x-[34px] max-[900px]:grid-cols-[44px_minmax(0,1fr)] max-[900px]:gap-x-[28px] max-[900px]:gap-y-[26px] max-[900px]:pb-[58px] max-[640px]:grid-cols-[32px_minmax(0,1fr)] max-[640px]:gap-x-[18px] max-[640px]:pb-[44px] ${
                visionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[36px] opacity-0"
              }`}
            >
              <p className="m-0 text-[27px] font-normal leading-none tracking-[-0.035em] text-[#666666] max-[1180px]:text-[23px] max-[640px]:text-[20px]">
                1
              </p>

              <h3 className="m-0 text-[39px] font-medium uppercase leading-[1.1] tracking-[-0.045em] text-[#151515] max-[1400px]:text-[35px] max-[1180px]:text-[31px] max-[900px]:text-[28px] max-[640px]:text-[23px]">
                Our Vision
              </h3>

              <p className="m-0 max-w-[650px] text-[24px] font-normal leading-[1.48] tracking-[-0.025em] text-[#666666] max-[1400px]:text-[21px] max-[1180px]:text-[19px] max-[900px]:col-start-2 max-[900px]:text-[18px] max-[640px]:text-[15px]">
                To become the go-to destination for stylish,
                affordable home decor that makes every space
                feel special.
              </p>
            </article>

            {/* ==================== Our mission row ==================== */}

            <article
              className={`grid grid-cols-[70px_320px_minmax(0,1fr)] items-start gap-x-[62px] pt-[76px] transition-all delay-[300ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1400px]:grid-cols-[58px_280px_minmax(0,1fr)] max-[1400px]:gap-x-[46px] max-[1180px]:grid-cols-[48px_240px_minmax(0,1fr)] max-[1180px]:gap-x-[34px] max-[900px]:grid-cols-[44px_minmax(0,1fr)] max-[900px]:gap-x-[28px] max-[900px]:gap-y-[26px] max-[900px]:pt-[58px] max-[640px]:grid-cols-[32px_minmax(0,1fr)] max-[640px]:gap-x-[18px] max-[640px]:pt-[44px] ${
                visionVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[36px] opacity-0"
              }`}
            >
              <p className="m-0 text-[27px] font-normal leading-none tracking-[-0.035em] text-[#666666] max-[1180px]:text-[23px] max-[640px]:text-[20px]">
                2
              </p>

              <h3 className="m-0 text-[39px] font-medium uppercase leading-[1.1] tracking-[-0.045em] text-[#151515] max-[1400px]:text-[35px] max-[1180px]:text-[31px] max-[900px]:text-[28px] max-[640px]:text-[23px]">
                Our Mission
              </h3>

              <p className="m-0 max-w-[720px] text-[24px] font-normal leading-[1.48] tracking-[-0.025em] text-[#666666] max-[1400px]:text-[21px] max-[1180px]:text-[19px] max-[900px]:col-start-2 max-[900px]:text-[18px] max-[640px]:text-[15px]">
                To deliver beautifully crafted and thoughtfully
                designed pieces that help people express their
                unique style and elevate their homes with ease.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ==================== About values section ==================== */}
      
      <section
        id="about-values"
        ref={valuesRef}
        className="w-full scroll-mt-8 bg-[#f8f8f6] pb-[118px] pt-[112px] max-[1400px]:pb-[100px] max-[1400px]:pt-[96px] max-[1024px]:pb-[82px] max-[1024px]:pt-[78px] max-[640px]:pb-[64px] max-[640px]:pt-[62px]"
      >
        <div className="site-container">
          {/* ==================== Values section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              valuesVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[24px] opacity-0"
            }`}
          >
            <p className="section-label">//04</p>

            <p className="section-label">/Value</p>
          </div>

          {/* ==================== Values heading and description ==================== */}

          <div className="mt-[72px] grid grid-cols-[0.92fr_1.08fr] items-end gap-[104px] max-[1400px]:gap-[76px] max-[1180px]:gap-[56px] max-[900px]:grid-cols-1 max-[900px]:items-start max-[900px]:gap-[38px] max-[640px]:mt-[50px]">
            <h2
              className={`about-display-font m-0 max-w-[610px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.14] tracking-[-0.055em] text-[#151515] transition-all delay-[80ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:text-[clamp(58px,7vw,70px)] max-[640px]:text-[clamp(44px,12vw,58px)] ${
                valuesVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[38px] opacity-0"
              }`}
            >
              <span className="block">
                values we are
              </span>

              <span className="mt-[14px] block max-[640px]:mt-[8px]">
                proud of
              </span>
            </h2>

            <p
              className={`section-copy mb-[10px] max-w-[680px] transition-all delay-[150ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[900px]:mb-0 ${
                valuesVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[32px] opacity-0"
              }`}
            >
              These principles guide how we curate products
              and create experiences, reflecting our purpose
              and passion.
            </p>
          </div>

          {/* ==================== Values feature image ==================== */}

          <div
            className={`group relative mt-[56px] aspect-[1747/595] w-full overflow-hidden bg-[#ddd5ca] transition-all delay-[210ms] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:aspect-[16/6.5] max-[768px]:aspect-[16/8] max-[640px]:mt-[42px] max-[640px]:aspect-[4/3] ${
              valuesVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[42px] opacity-0"
            }`}
          >
            <img
              src={aboutValuesImage}
              alt="Warm Decorist interior with wooden console, lamp, mirror and indoor plant"
              className={`h-full w-full object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                valuesVisible
                  ? "scale-100"
                  : "scale-[1.045]"
              }`}
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/[0.015] via-transparent to-black/[0.035]" />
          </div>

          {/* ==================== Values card grid ==================== */}

          <div className="mt-[72px] grid grid-cols-3 gap-x-0 gap-y-[88px] max-[1180px]:mt-[64px] max-[1024px]:grid-cols-2 max-[1024px]:gap-y-[66px] max-[700px]:grid-cols-1 max-[700px]:gap-y-0 max-[640px]:mt-[52px]">
            {aboutValues.map((item, index) => (
              <article
                key={item.id}
                style={{
                  transitionDelay: `${280 + index * 75}ms`,
                }}
                className={`min-h-[196px] border-l border-[#d4d4d0] px-[38px] transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1400px]:px-[30px] max-[1180px]:px-[26px] max-[1024px]:min-h-[184px] max-[700px]:min-h-0 max-[700px]:border-b max-[700px]:border-l-0 max-[700px]:px-0 max-[700px]:py-[38px] first:max-[700px]:pt-0 last:max-[700px]:border-b-0 last:max-[700px]:pb-0 ${
                  valuesVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[36px] opacity-0"
                }`}
              >
                {/* ==================== Value icon ==================== */}

                <div className="flex h-[64px] items-start max-[640px]:h-[58px]">
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-[58px] w-[58px] object-contain object-left max-[640px]:h-[52px] max-[640px]:w-[52px]"
                  />
                </div>

                {/* ==================== Value title ==================== */}

                <h3 className="m-0 mt-[18px] text-[23px] font-medium uppercase leading-[1.2] tracking-[-0.035em] text-[#151515] max-[1400px]:text-[21px] max-[1180px]:text-[19px] max-[640px]:mt-[14px] max-[640px]:text-[18px]">
                  {item.title}
                </h3>

                {/* ==================== Value description ==================== */}

                <p className="section-copy mt-[20px] max-w-[420px] max-[1180px]:mt-[16px]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== About section five ==================== */}

      {/* Section five code will be added here */}

      {/* ==================== About section six ==================== */}

      {/* Section six code will be added here */}
    </main>
  );
};

export default About;