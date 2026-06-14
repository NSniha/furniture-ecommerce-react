import { useEffect, useRef, useState } from "react";

import metricsSofa from "../../assets/images/metrics-sofa.jpg";
import metricsChair from "../../assets/images/metrics-chair.jpg";
import metricsRound from "../../assets/images/metrics-round.png";
import metricsStar from "../../assets/images/metrics-star.png";

import "./KeyMetrics.css";

const KeyMetrics = () => {
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
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const revealClass = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[34px] opacity-0";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f8f8f6] py-[92px] max-[1180px]:py-[78px] max-[900px]:py-[64px] max-[640px]:py-[52px]"
    >
      {/* ==================== Shared section container ==================== */}

      <div className="site-container">
        {/* ==================== Section labels ==================== */}

        <div
          className={`mb-[22px] flex items-center justify-between transition-all duration-[800ms] ease-out max-[640px]:mb-[34px] ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-[26px] opacity-0"
          }`}
        >
          <p className="m-0 text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            //02
          </p>

          <p className="m-0 text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            /Key Metrics
          </p>
        </div>

        {/* ==================== Section heading ==================== */}

        <div
          className={`mb-[100px] text-center transition-all delay-[120ms] duration-[850ms] ease-out max-[1180px]:mb-[76px] max-[900px]:mb-[54px] max-[900px]:mt-[42px] max-[640px]:mb-[42px] max-[640px]:mt-0 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-[30px] opacity-0"
          }`}
        >
          <h2 className="metrics-title-font m-0 text-[clamp(66px,5.9vw,94px)] font-normal lowercase leading-none tracking-[-0.055em] text-[#131313] max-[900px]:text-[clamp(48px,12vw,72px)] max-[640px]:tracking-[-0.045em]">
            our lucky numbers
          </h2>
        </div>

        {/* ==================== Desktop and tablet metrics grid ==================== */}

        <div
          className={`grid grid-cols-[1.05fr_0.2fr_0.4fr_0.95fr] grid-rows-[156px_156px_160px] border-y border-[#dededb] transition-all delay-[240ms] duration-[900ms] ease-out max-[1180px]:grid-rows-[145px_145px_150px] max-[900px]:grid-cols-2 max-[900px]:grid-rows-none max-[640px]:hidden ${revealClass}`}
        >
          <div className="col-[1/3] row-[1] flex items-center gap-9 border-r border-[#dededb] pl-[92px] max-[1180px]:pl-[52px] max-[900px]:col-[1/3] max-[900px]:row-[1] max-[900px]:min-h-[150px] max-[900px]:justify-center max-[900px]:border-r-0 max-[900px]:pl-0">
            <div className="text-[84px] font-normal leading-[0.95] tracking-[-0.075em] text-[#111111] max-[1180px]:text-[70px]">
              98%
            </div>

            <div className="text-[25px] font-normal leading-[1.45] tracking-[-0.045em] text-[#626262] max-[1180px]:text-[22px]">
              Customer
              <br />
              Satisfaction
            </div>
          </div>

          <div className="col-[3/5] row-[1] flex items-center justify-center max-[900px]:col-[1/2] max-[900px]:row-[2] max-[900px]:min-h-[150px] max-[900px]:border-r max-[900px]:border-t max-[900px]:border-[#dededb]">
            <img
              src={metricsRound}
              alt="Decorative round line pattern"
              className="block h-[150px] w-[120px] object-contain opacity-90 transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[94px] max-[1180px]:w-[66px]"
            />
          </div>

          <div className="col-[1/4] row-[2] flex items-center justify-center border-r border-t border-[#dededb] max-[900px]:col-[2/3] max-[900px]:row-[2] max-[900px]:min-h-[150px] max-[900px]:border-r-0">
            <img
              src={metricsSofa}
              alt="Minimal sofa interior"
              className="block h-[138px] w-[276px] object-cover object-center transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[126px] max-[1180px]:w-[250px]"
            />
          </div>

          <div className="col-[4/5] row-[2] flex items-center justify-center gap-9 border-t border-[#dededb] max-[900px]:col-[1/3] max-[900px]:row-[3] max-[900px]:min-h-[150px]">
            <div className="text-[83px] font-normal leading-[0.95] tracking-[-0.075em] text-[#111111] max-[1180px]:text-[70px]">
              4.9/5
            </div>

            <div className="text-[25px] font-normal leading-[1.45] tracking-[-0.045em] text-[#626262] max-[1180px]:text-[22px]">
              Product
              <br />
              Rating
            </div>
          </div>

          <div className="col-[1/3] row-[3] flex items-center justify-center gap-[34px] border-r border-t border-[#dededb] max-[900px]:col-[1/2] max-[900px]:row-[4] max-[900px]:min-h-[150px] max-[900px]:flex-col max-[900px]:gap-[10px]">
            <div className="text-[82px] font-normal leading-[0.95] tracking-[-0.075em] text-[#111111] max-[1180px]:text-[70px]">
              48
            </div>

            <div className="text-[25px] font-normal leading-[1.45] tracking-[-0.045em] text-[#626262] max-[1180px]:text-[22px]">
              Hour Dispatch
              <br />
              Time
            </div>
          </div>

          <div className="col-[3/4] row-[3] flex items-center justify-center border-r border-t border-[#dededb] max-[900px]:hidden">
            <img
              src={metricsStar}
              alt="Decorative star shape"
              className="block h-[112px] w-[112px] object-contain opacity-90 transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[96px] max-[1180px]:w-[96px]"
            />
          </div>

          <div className="col-[4/5] row-[3] flex items-center justify-center border-t border-[#dededb] max-[900px]:col-[2/3] max-[900px]:row-[4] max-[900px]:min-h-[150px]">
            <img
              src={metricsChair}
              alt="Premium accent chair"
              className="block h-[138px] w-[232px] object-cover object-center transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[126px] max-[1180px]:w-[210px]"
            />
          </div>
        </div>

        {/* ==================== Mobile metrics grid ==================== */}

        <div
          className={`hidden border-y border-[#d5d5d2] transition-all delay-[240ms] duration-[900ms] ease-out max-[640px]:block ${revealClass}`}
        >
          {/* ==================== Customer satisfaction row ==================== */}

          <div className="grid min-h-[166px] grid-cols-[1.12fr_1fr_0.68fr] border-b border-[#d5d5d2] max-[420px]:min-h-[154px]">
            <div className="flex items-center pl-[4px]">
              <span className="text-[clamp(52px,15vw,64px)] font-normal leading-[0.9] tracking-[-0.07em] text-[#111111]">
                98%
              </span>
            </div>

            <div className="flex items-center">
              <p className="m-0 text-[clamp(16px,4.5vw,20px)] font-normal leading-[1.45] tracking-[-0.035em] text-[#626262]">
                Customer
                <br />
                Satisfaction
              </p>
            </div>

            <div className="flex items-center justify-center border-l border-[#d5d5d2]">
              <img
                src={metricsRound}
                alt="Decorative round line pattern"
                className="block h-[82px] w-[62px] object-contain opacity-90 max-[420px]:h-[72px] max-[420px]:w-[54px]"
              />
            </div>
          </div>

          {/* ==================== Product rating row ==================== */}

          <div className="grid min-h-[184px] grid-cols-[0.72fr_1.42fr_0.92fr] border-b border-[#d5d5d2] max-[420px]:min-h-[172px]">
            <div className="flex items-center justify-center border-r border-[#d5d5d2]">
              <img
                src={metricsChair}
                alt="Premium accent chair"
                className="block h-[112px] w-[70px] object-cover object-center max-[420px]:h-[102px] max-[420px]:w-[64px]"
              />
            </div>

            <div className="flex items-center justify-center px-2">
              <span className="whitespace-nowrap text-[clamp(50px,14vw,62px)] font-normal leading-[0.9] tracking-[-0.07em] text-[#111111]">
                4.9/5
              </span>
            </div>

            <div className="flex items-center">
              <p className="m-0 text-[clamp(16px,4.5vw,20px)] font-normal leading-[1.45] tracking-[-0.035em] text-[#626262]">
                Product
                <br />
                Rating
              </p>
            </div>
          </div>

          {/* ==================== Dispatch time row ==================== */}

          <div className="grid min-h-[158px] grid-cols-[0.88fr_1.18fr_0.72fr] max-[420px]:min-h-[148px]">
            <div className="flex items-center pl-[4px]">
              <span className="text-[clamp(52px,15vw,64px)] font-normal leading-[0.9] tracking-[-0.07em] text-[#111111]">
                48
              </span>
            </div>

            <div className="flex items-center">
              <p className="m-0 text-[clamp(16px,4.5vw,20px)] font-normal leading-[1.45] tracking-[-0.035em] text-[#626262]">
                Hour Dispatch
                <br />
                Time
              </p>
            </div>

            <div className="flex items-center justify-center border-l border-[#d5d5d2]">
              <img
                src={metricsStar}
                alt="Decorative star shape"
                className="block h-[78px] w-[78px] object-contain opacity-90 max-[420px]:h-[68px] max-[420px]:w-[68px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyMetrics;