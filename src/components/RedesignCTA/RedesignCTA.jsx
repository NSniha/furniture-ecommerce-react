import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";

import redesignRoom from "../../assets/images/redesign-room.jpg";
import redesignOffice from "../../assets/images/redesign-office.jpg";

import "./RedesignCTA.css";

const RedesignCTA = () => {
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

  const contentReveal = visible
    ? "translate-x-0 opacity-100"
    : "-translate-x-[34px] opacity-0";

  const firstImageReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[36px] opacity-0";

  const secondImageReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[52px] opacity-0";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f1eee5] py-[110px] max-[1180px]:py-[90px] max-[900px]:py-20 max-[640px]:py-[60px]"
    >
      <div className="site-container">
        {/* ==================== CTA content layout ==================== */}

        <div className="grid grid-cols-[0.92fr_1.08fr] items-stretch gap-[72px] max-[1280px]:gap-[54px] max-[1180px]:gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-[58px] max-[640px]:gap-11">
          {/* ==================== CTA heading and action ==================== */}

          <div
            className={`flex h-full flex-col items-start justify-center pr-[24px] transition-all duration-[950ms] ease-out max-[1180px]:pr-0 max-[900px]:justify-start ${contentReveal}`}
          >
            <h2 className="redesign-title-font m-0 max-w-[720px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.15] tracking-[-0.035em] text-[#111111] max-[900px]:max-w-[700px] max-[900px]:text-[58px] max-[900px]:leading-[1.08] max-[640px]:max-w-[390px] max-[640px]:text-[46px] max-[640px]:leading-[1.08] max-[420px]:text-[42px]">
              <span className="block">ready to</span>
              <span className="block">redesign your</span>
              <span className="block">space?</span>
            </h2>

            <a
              href="#"
              className="group mt-[72px] inline-flex h-[60px] min-w-[252px] items-center justify-center gap-[20px] rounded-[4px] border border-[#111111] bg-[#111111] px-[26px] font-['Inter',sans-serif] text-[16px] font-medium uppercase leading-none tracking-[-0.015em] text-white no-underline transition-all duration-300 hover:-translate-y-[3px] hover:bg-transparent hover:text-[#111111] max-[1180px]:mt-[58px] max-[900px]:mt-11 max-[640px]:mt-9 max-[640px]:h-[54px] max-[640px]:min-w-[215px] max-[640px]:gap-4 max-[640px]:px-[22px] max-[640px]:text-[14px]"
            >
              <span>Start Shopping</span>

              <ShoppingCart
                size={25}
                strokeWidth={1.6}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 max-[640px]:h-[22px] max-[640px]:w-[22px]"
              />
            </a>
          </div>

          {/* ==================== CTA interior images ==================== */}

          <div className="grid grid-cols-2 items-stretch gap-[30px] max-[1180px]:gap-6 max-[640px]:gap-3">
            {/* ==================== Living room image ==================== */}

            <div
              className={`group aspect-[438/703] w-full overflow-hidden bg-[#d5c9bd] transition-all delay-[140ms] duration-[950ms] ease-out ${firstImageReveal}`}
            >
              <img
                src={redesignRoom}
                alt="Minimal warm living room interior"
                className="block h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
              />
            </div>

            {/* ==================== Home office image ==================== */}

            <div
              className={`group aspect-[438/703] w-full overflow-hidden bg-[#c99572] transition-all delay-[260ms] duration-[950ms] ease-out ${secondImageReveal}`}
            >
              <img
                src={redesignOffice}
                alt="Warm home office with wooden desk and chair"
                className="block h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedesignCTA;