import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import featuredSofa from "../../assets/images/featured-sofa.jpg";

import "./FeaturedProduct.css";

const productFeatures = [
  "Deep cushioning designed for everyday comfort",
  "Soft, durable upholstery in three neutral tones",
  "Spacious silhouette with a matching ottoman",
];

const FeaturedProduct = () => {
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
        threshold: 0.18,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const headingReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[30px] opacity-0";

  const imageReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[36px] opacity-0";

  const contentReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[32px] opacity-0";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f8f8f6] pb-[108px] pt-[60px] max-[1180px]:pb-[92px] max-[1180px]:pt-[68px] max-[900px]:pb-[78px] max-[900px]:pt-[60px] max-[640px]:pb-[66px] max-[640px]:pt-[52px]"
    >
      <div className="site-container">
        {/* ==================== Section heading ==================== */}

        <div
          className={`mb-[74px] flex flex-col items-center gap-[30px] text-center transition-all duration-[850ms] ease-out max-[1180px]:mb-[62px] max-[900px]:mb-[52px] max-[900px]:gap-6 max-[640px]:mb-10 max-[640px]:gap-5 ${headingReveal}`}
        >
          <h2 className="featured-title-font m-0 text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[0.95] tracking-[-0.055em] text-[#111111] max-[900px]:text-[58px] max-[640px]:text-[46px] max-[640px]:leading-none max-[420px]:text-[42px]">
            the comfort edit
          </h2>

          <p className="section-copy m-0 max-w-[580px] text-center text-[#555555] max-[640px]:max-w-[340px]">
            A refined living-room centerpiece created to bring softness,
            balance, and effortless comfort into your everyday space.
          </p>
        </div>

        {/* ==================== Featured product image ==================== */}

        <div
          className={`group relative h-[458px] w-full overflow-hidden bg-[#d7cbbc] transition-all delay-[120ms] duration-[900ms] ease-out max-[1180px]:h-[410px] max-[900px]:h-[350px] max-[640px]:h-[290px] max-[480px]:h-[250px] max-[420px]:h-[225px] ${imageReveal}`}
        >
          <img
            src={featuredSofa}
            alt="Luna velvet sofa with matching ottoman"
            className="block h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
          />

          <span className="absolute right-[31px] top-6 inline-flex h-[38px] min-w-[122px] items-center justify-center bg-white px-[17px] text-[15px] font-medium leading-none tracking-[-0.015em] text-[#151515] max-[900px]:right-5 max-[900px]:top-5 max-[640px]:right-4 max-[640px]:top-4 max-[640px]:h-[34px] max-[640px]:min-w-[104px] max-[640px]:px-[13px] max-[640px]:text-[13px]">
            Living Room
          </span>
        </div>

        {/* ==================== Product information ==================== */}

        <div className="grid grid-cols-[1fr_0.92fr] items-start gap-[92px] pt-[36px] max-[1180px]:gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-11 max-[900px]:pt-8 max-[640px]:gap-9 max-[640px]:pt-7">
          {/* ==================== Product details ==================== */}

          <div
            className={`max-w-[620px] transition-all delay-[220ms] duration-[850ms] ease-out ${contentReveal}`}
          >
            <h3 className="mb-5 mt-0 text-[34px] font-medium uppercase leading-[1.15] tracking-[-0.045em] text-[#151515] max-[1180px]:text-[30px] max-[640px]:mb-4 max-[640px]:text-[25px] max-[420px]:text-[22px]">
              Luna Velvet Lounge Sofa
            </h3>

            <p className="m-0 text-[72px] font-normal leading-[0.95] tracking-[-0.07em] text-[#111111] max-[1180px]:text-[64px] max-[640px]:text-[56px] max-[420px]:text-[50px]">
              $520
            </p>

            <p className="section-copy pt-5 mb-0 mt-[38px] max-w-[580px] text-[#696969] max-[900px]:mt-7 max-[640px]:mt-6">
              Designed with a generous profile and softly tailored upholstery,
              the Luna sofa creates an inviting place to unwind while keeping
              your living room calm, modern, and beautifully composed.
            </p>
          </div>

          {/* ==================== Product features and action ==================== */}

          <div
            className={`w-full max-w-[520px] justify-self-end pt-1 transition-all delay-[320ms] duration-[850ms] ease-out max-[900px]:max-w-full max-[900px]:justify-self-start max-[900px]:pt-0 ${contentReveal}`}
          >
            <ul className="m-0 list-disc space-y-[12px] pl-[23px] text-[#171717] max-[640px]:space-y-[10px]">
              {productFeatures.map((feature) => (
                <li
                  key={feature}
                  className="pl-0.5 text-[18px] font-medium italic leading-[1.45] tracking-[-0.025em] max-[640px]:text-[16px] max-[420px]:text-[15px]"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to="/shop"
              className="group mt-[68px] inline-flex h-[52px] min-w-[174px] items-center justify-center gap-[19px] border border-[#111111] bg-[#111111] px-[23px] text-[14px] font-medium uppercase leading-none tracking-[-0.01em] text-white no-underline transition-all duration-300 hover:-translate-y-[3px] hover:bg-transparent hover:text-[#111111] max-[1180px]:mt-[54px] max-[900px]:mt-[36px] max-[640px]:mt-[32px] max-[640px]:h-[50px] max-[640px]:min-w-[158px] max-[640px]:px-[21px] max-[640px]:text-[13px]"
            >
              <span>Explore Product</span>

              <ArrowRight
                size={22}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-[5px]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;