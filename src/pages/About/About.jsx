import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

import aboutHeroImage from "../../assets/images/about-hero-room.jpg";

import Partners from "../../components/Partners/Partners";

import aboutVisionImage from "../../assets/images/about-vision-room.jpg";

import aboutValuesImage from "../../assets/images/about-values-room.jpg";

import valueDesignIcon from "../../assets/images/value-design-led.svg";
import valueCustomerIcon from "../../assets/images/value-customer-centered.svg";
import valueQualityIcon from "../../assets/images/value-quality.svg";
import valueSustainabilityIcon from "../../assets/images/value-sustainability.svg";
import valueCreativeIcon from "../../assets/images/value-creative.svg";
import valueCraftsmanshipIcon from "../../assets/images/value-craftsmanship.svg";

import aboutMilestoneImage from "../../assets/images/about-milestone-image.jpg";

import claraImage from "../../assets/images/clara-bennett.jpg";
import leoImage from "../../assets/images/leo-matthews.jpg";
import amaraImage from "../../assets/images/amara-chen.jpg";
import nathanImage from "../../assets/images/nathan-ellis.jpg";
import sofiaImage from "../../assets/images/sofia-ramirez.jpg";
import jadeImage from "../../assets/images/jade-nguyen.jpg";

import aboutFinalCtaImage from "../../assets/images/about-dream-cta-bg.jpg";

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


/* ==================== About milestone information ==================== */

const aboutMilestones = [
  {
    id: 1,
    year: "2029",
    title: "Decorist Was Born",
    description:
      "We launched with a small online collection of 100 products for modern apartments and urban homes.",
    active: true,
  },
  {
    id: 2,
    year: "2030",
    title: "First Pop-up Store Opened",
    description:
      "We connected with our community in person through our first Decorist pop-up in San Francisco.",
  },
  {
    id: 3,
    year: "2031",
    title: "Featured in Top Design Magazines",
    description:
      "Our thoughtful collections gained recognition from leading interior and lifestyle publications.",
  },
  {
    id: 4,
    year: "2032",
    title: "Sustainable Materials Initiative",
    description:
      "We began incorporating recycled and ethically sourced materials into 60% of our product range.",
  },
  {
    id: 5,
    year: "2033",
    title: "50,000+ Happy Customers",
    description:
      "A major customer milestone that reinforced our commitment to quality, service, and design.",
  },
  {
    id: 6,
    year: "2034",
    title: "Global Shipping Launched",
    description:
      "Decorist expanded its service worldwide, bringing curated home decor to global customers in over 25 countries.",
  },
];


/* ==================== About team information ==================== */

const teamMembers = [
  {
    id: 1,
    number: "//001",
    name: "Clara Bennett",
    role: "Founder & Creative Director",
    image: claraImage,
  },
  {
    id: 2,
    number: "//002",
    name: "Leo Matthews",
    role: "Head of Product Design",
    image: leoImage,
  },
  {
    id: 3,
    number: "//003",
    name: "Amara Chen",
    role: "Lead Interior Stylist",
    image: amaraImage,
  },
  {
    id: 4,
    number: "//004",
    name: "Nathan Ellis",
    role: "E-commerce & UX Strategist",
    image: nathanImage,
  },
  {
    id: 5,
    number: "//005",
    name: "Sofia Ramirez",
    role: "Marketing & Brand Manager",
    image: sofiaImage,
  },
  {
    id: 6,
    number: "//006",
    name: "Jade Nguyen",
    role: "Customer Experience Lead",
    image: jadeImage,
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

  const {
    sectionRef: milestoneRef,
    visible: milestoneVisible,
  } = useSectionReveal(0.06);

  const {
    sectionRef: teamRef,
    visible: teamVisible,
  } = useSectionReveal(0.06);

  const {
    sectionRef: finalCtaRef,
    visible: finalCtaVisible,
  } = useSectionReveal(0.14);

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

      {/* ==================== About milestone section ==================== */}

      <section
        id="about-milestone"
        ref={milestoneRef}
        className="w-full scroll-mt-8 bg-[#f1eee5] pb-[118px] pt-[112px] max-[1400px]:pb-[100px] max-[1400px]:pt-[96px] max-[1024px]:pb-[82px] max-[1024px]:pt-[78px] max-[640px]:pb-[64px] max-[640px]:pt-[62px]"
      >
        <div className="site-container">
          {/* ==================== Milestone section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              milestoneVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[24px] opacity-0"
            }`}
          >
            <p className="section-label">//05</p>

            <p className="section-label">
              /Milestone
            </p>
          </div>

          {/* ==================== Milestone main content ==================== */}

          <div className="relative mt-[76px] max-[1400px]:mt-[66px] max-[1024px]:mt-[58px] max-[640px]:mt-[48px]">
            {/* ==================== Milestone heading ==================== */}

            <h2
              className={`about-display-font m-0 max-w-[650px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.1] tracking-[-0.055em] text-[#151515] transition-all delay-[80ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:text-[clamp(58px,7vw,70px)] max-[640px]:text-[clamp(44px,12vw,58px)] ${
                milestoneVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[38px] opacity-0"
              }`}
            >
              our journey
            </h2>

            {/* ==================== Milestone introduction ==================== */}

            <p
              className={`section-copy mt-[32px] max-w-[690px] transition-all delay-[140ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[640px]:mt-[24px] ${
                milestoneVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[30px] opacity-0"
              }`}
            >
              A timeline of growth, creativity, and commitment
              to beautiful living.
            </p>

            {/* ==================== Milestone feature image ==================== */}

            <div
              className={`absolute right-0 top-[132px] aspect-square w-[420px] overflow-hidden bg-[#d8d1c7] transition-all delay-[190ms] duration-[1050ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1500px]:w-[380px] max-[1400px]:w-[350px] max-[1180px]:relative max-[1180px]:right-auto max-[1180px]:top-auto max-[1180px]:mt-[48px] max-[1180px]:w-full max-[1180px]:max-w-[520px] max-[640px]:mt-[38px] ${
                milestoneVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[42px] opacity-0"
              }`}
            >
              <img
                src={aboutMilestoneImage}
                alt="Decorist designer selecting interior materials"
                className={`h-full w-full object-cover object-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  milestoneVisible
                    ? "scale-100"
                    : "scale-[1.045]"
                }`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-black/[0.035]" />
            </div>

            {/* ==================== Milestone timeline ==================== */}

            <div className="mt-[112px] max-w-[1120px] max-[1500px]:max-w-[1000px] max-[1400px]:max-w-[900px] max-[1180px]:mt-[76px] max-[1180px]:max-w-none max-[640px]:mt-[58px]">
              {aboutMilestones.map((item, index) => (
                <article
                  key={item.id}
                  style={{
                    transitionDelay: `${250 + index * 90}ms`,
                  }}
                  className={`grid grid-cols-[20px_156px_minmax(0,1fr)] items-start gap-x-[42px] py-[48px] transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none first:pt-0 last:pb-0 max-[1400px]:grid-cols-[18px_132px_minmax(0,1fr)] max-[1400px]:gap-x-[34px] max-[1180px]:grid-cols-[18px_120px_minmax(0,1fr)] max-[1024px]:py-[42px] max-[768px]:grid-cols-[16px_92px_minmax(0,1fr)] max-[768px]:gap-x-[24px] max-[640px]:grid-cols-[14px_72px_minmax(0,1fr)] max-[640px]:gap-x-[16px] max-[640px]:py-[34px] ${
                    milestoneVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-[38px] opacity-0"
                  }`}
                >
                  {/* ==================== Timeline marker ==================== */}

                  <span
                    aria-hidden="true"
                    className={`mt-[7px] block h-[20px] w-[20px] max-[1400px]:h-[18px] max-[1400px]:w-[18px] max-[640px]:mt-[5px] max-[640px]:h-[14px] max-[640px]:w-[14px] ${
                      item.active
                        ? "bg-[#151515]"
                        : "bg-[#6c6c69]"
                    }`}
                  />

                  {/* ==================== Timeline year ==================== */}

                  <p
                    className={`m-0 text-[36px] font-medium leading-none tracking-[-0.045em] max-[1400px]:text-[32px] max-[1024px]:text-[29px] max-[768px]:text-[25px] max-[640px]:text-[21px] ${
                      item.active
                        ? "text-[#151515]"
                        : "text-[#686866]"
                    }`}
                  >
                    {item.year}
                  </p>

                  {/* ==================== Timeline information ==================== */}

                  <div className="min-w-0">
                    <h3
                      className={`m-0 text-[30px] font-medium uppercase leading-[1.18] tracking-[-0.035em] max-[1400px]:text-[27px] max-[1180px]:text-[25px] max-[900px]:text-[22px] max-[640px]:text-[18px] ${
                        item.active
                          ? "text-[#151515]"
                          : "text-[#686866]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="section-copy mt-[18px] max-w-[720px] max-[640px]:mt-[14px]">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== About team section ==================== */}

      <section
        id="about-team"
        ref={teamRef}
        className="w-full scroll-mt-8 bg-[#f8f8f6] pb-[118px] pt-[112px] max-[1400px]:pb-[100px] max-[1400px]:pt-[96px] max-[1024px]:pb-[82px] max-[1024px]:pt-[78px] max-[640px]:pb-[64px] max-[640px]:pt-[62px]"
      >
        <div className="site-container">
          {/* ==================== Team section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              teamVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[24px] opacity-0"
            }`}
          >
            <p className="section-label">//06</p>

            <p className="section-label">
              /Our Team
            </p>
          </div>

          {/* ==================== Team section heading ==================== */}

          <div
            className={`mx-auto mt-[72px] max-w-[1000px] text-center transition-all delay-[80ms] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none max-[1024px]:mt-[62px] max-[640px]:mt-[50px] ${
              teamVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[36px] opacity-0"
            }`}
          >
            <h2 className="about-display-font m-0 text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.08] tracking-[-0.055em] text-[#151515] max-[1024px]:text-[clamp(58px,7vw,70px)] max-[640px]:text-[clamp(44px,12vw,58px)]">
              meet our team
            </h2>
          </div>

          {/* ==================== Team member grid ==================== */}

          <div className="mt-[62px] grid grid-cols-3 gap-x-[42px] gap-y-[82px] max-[1400px]:gap-x-[34px] max-[1180px]:gap-x-[28px] max-[1024px]:mt-[54px] max-[1024px]:grid-cols-2 max-[1024px]:gap-x-[34px] max-[1024px]:gap-y-[68px] max-[680px]:grid-cols-1 max-[680px]:gap-y-[58px] max-[640px]:mt-[46px]">
            {teamMembers.map((member, index) => (
              <article
                key={member.id}
                style={{
                  transitionDelay: `${160 + index * 80}ms`,
                }}
                className={`group min-w-0 transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  teamVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-[42px] opacity-0"
                }`}
              >
                {/* ==================== Team member image ==================== */}

                <div className="relative aspect-square w-full overflow-hidden bg-[#d8d0c8]">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="h-full w-full object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* ==================== Team member information ==================== */}

                <div className="mt-[22px] flex items-start justify-between gap-[24px] max-[640px]:mt-[18px]">
                  <p className="m-0 shrink-0 text-[15px] font-normal leading-none tracking-[-0.02em] text-[#777777] max-[640px]:text-[13px]">
                    {member.number}
                  </p>

                  <div className="min-w-0 text-right">
                    <h3 className="m-0 text-[21px] font-medium uppercase leading-[1.15] tracking-[-0.035em] text-[#151515] transition-transform duration-400 group-hover:-translate-y-[2px] max-[1400px]:text-[19px] max-[1180px]:text-[18px] max-[640px]:text-[17px]">
                      {member.name}
                    </h3>

                    <p className="m-0 mt-[8px] text-[15px] font-normal italic leading-[1.4] tracking-[-0.015em] text-[#85827b] max-[1180px]:text-[14px] max-[640px]:text-[13px]">
                      {member.role}
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

export default About;