import { useEffect, useRef, useState } from "react";

import partnerOne from "../../assets/images/partner-1.png";
import partnerTwo from "../../assets/images/partner-2.png";
import partnerThree from "../../assets/images/partner-3.png";
import partnerFour from "../../assets/images/partner-4.png";
import partnerFive from "../../assets/images/partner-5.png";

import "./Partners.css";

const partners = [
  {
    id: 1,
    name: "Logo Ipsum One",
    logo: partnerOne,
  },
  {
    id: 2,
    name: "Logo Ipsum Two",
    logo: partnerTwo,
  },
  {
    id: 3,
    name: "Logo Ipsum Three",
    logo: partnerThree,
  },
  {
    id: 4,
    name: "Logo Ipsum Four",
    logo: partnerFour,
  },
  {
    id: 5,
    name: "Logo Ipsum Five",
    logo: partnerFive,
  },
];

const PartnerGroup = ({ duplicate = false }) => {
  return (
    <div
      aria-hidden={duplicate}
      className="grid w-[clamp(1200px,calc(100vw_-_96px),1708px)] shrink-0 grid-cols-5 max-[1180px]:w-[1200px] max-[900px]:w-[1100px] max-[640px]:w-[1000px] max-[420px]:w-[900px]"
    >
      {partners.map((partner) => (
        <div
          key={`${duplicate ? "duplicate" : "original"}-${partner.id}`}
          className="group flex h-[154px] items-center justify-center border-l border-[#d1d0cb] px-[34px] py-[30px] last:border-r max-[1180px]:h-[142px] max-[1180px]:px-[30px] max-[1180px]:py-7 max-[900px]:h-[128px] max-[900px]:px-7 max-[900px]:py-[25px] max-[640px]:h-[112px] max-[640px]:px-6 max-[640px]:py-[22px] max-[420px]:h-[104px] max-[420px]:p-5"
        >
          <img
            src={partner.logo}
            alt={duplicate ? "" : partner.name}
            className="block h-auto max-h-[68px] w-auto max-w-[225px] object-contain opacity-70 grayscale transition-all duration-300 ease-out group-hover:scale-[1.035] group-hover:opacity-100 group-hover:grayscale-0 max-[1180px]:max-h-[60px] max-[1180px]:max-w-[195px] max-[900px]:max-h-[54px] max-[900px]:max-w-[180px] max-[640px]:max-h-12 max-[640px]:max-w-[150px] max-[420px]:max-h-11 max-[420px]:max-w-[138px]"
          />
        </div>
      ))}
    </div>
  );
};

const Partners = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
        threshold: 0.18,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const topReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-6 opacity-0";

  const titleReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const sliderReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[34px] opacity-0";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f3f0e8] pb-[122px] pt-[124px] max-[1180px]:pb-[105px] max-[1180px]:pt-[100px] max-[900px]:pb-[88px] max-[900px]:pt-[78px] max-[640px]:pb-[68px] max-[640px]:pt-[58px]"
    >
      <div className="site-container">
        {/* ==================== Section labels ==================== */}

        <div
          className={`mb-[78px] flex items-center justify-between transition-all duration-[800ms] ease-out max-[1180px]:mb-[68px] max-[900px]:mb-[54px] max-[640px]:mb-[42px] ${topReveal}`}
        >
          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            //07
          </p>

          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            /Our Partners
          </p>
        </div>

        {/* ==================== Section heading ==================== */}

        <div
          className={`mb-[116px] text-center transition-all delay-[100ms] duration-[900ms] ease-out max-[1180px]:mb-[94px] max-[900px]:mb-[72px] max-[640px]:mb-[54px] ${titleReveal}`}
        >
          <h2 className="partners-title-font m-0 text-[clamp(68px,5.7vw,94px)] font-normal lowercase leading-[0.95] tracking-[-0.055em] text-[#111111] max-[900px]:text-[58px] max-[640px]:text-[46px] max-[640px]:leading-none max-[420px]:text-[42px]">
            trusted by thousands
          </h2>
        </div>

        {/* ==================== Infinite partners slider ==================== */}

        <div
          className={`w-full overflow-hidden transition-all delay-[220ms] duration-[950ms] ease-out ${sliderReveal}`}
        >
          <div className="flex w-max items-stretch will-change-transform [animation:partnersInfiniteSlide_24s_linear_infinite] max-[1180px]:[animation-duration:22s] max-[900px]:[animation-duration:20s] max-[640px]:[animation-duration:18s] motion-reduce:[animation-duration:60s]">
            <PartnerGroup />
            <PartnerGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;