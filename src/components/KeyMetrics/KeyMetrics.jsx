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
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const revealClass = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-[34px]";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f8f8f6] py-[92px] max-[1180px]:py-[78px] max-[900px]:py-[64px] max-[640px]:py-[52px]"
    >
      <div className="mx-auto w-[min(100%-96px,1380px)] max-[1180px]:w-[min(100%-72px,1380px)] max-[900px]:w-[min(100%-40px,1380px)] max-[640px]:w-[min(100%-28px,1380px)]">
        {/* Top */}
        <div
          className={`mb-[22px] flex items-center justify-between transition-all duration-[800ms] ease-out max-[640px]:mb-[34px] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[26px]"
          }`}
        >
          <p className="m-0 text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            //02
          </p>

          <p className="m-0 text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            /Key Metrics
          </p>
        </div>

        {/* Title */}
        <div
          className={`mb-[100px] text-center transition-all delay-[120ms] duration-[850ms] ease-out max-[1180px]:mb-[76px] max-[900px]:my-[42px] max-[900px]:mb-[54px] max-[640px]:my-0 max-[640px]:mb-[42px] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
          }`}
        >
          <h2 className="metrics-title-font m-0 text-[clamp(66px,5.9vw,94px)] font-normal lowercase leading-none tracking-[-0.055em] text-[#131313] max-[900px]:text-[clamp(48px,12vw,72px)] max-[640px]:tracking-[-0.045em]">
            our lucky numbers
          </h2>
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-[1.05fr_0.2fr_0.4fr_0.95fr] grid-rows-[156px_156px_160px] border-y border-[#dededb] transition-all delay-[240ms] duration-[900ms] ease-out max-[1180px]:grid-rows-[145px_145px_150px] max-[900px]:grid-cols-2 max-[900px]:grid-rows-none max-[640px]:block ${revealClass}`}
        >
          {/* 98% */}
          <div className="col-[1/3] row-[1] flex items-center gap-9 border-r border-[#dededb] pl-[92px] max-[1180px]:pl-[52px] max-[900px]:col-[1/3] max-[900px]:row-[1] max-[900px]:min-h-[150px] max-[900px]:justify-center max-[900px]:border-r-0 max-[900px]:pl-0 max-[640px]:min-h-[150px] max-[640px]:justify-start max-[640px]:gap-[22px] max-[640px]:border-r-0 max-[640px]:px-[10px] max-[640px]:py-7">
            <div className="text-[84px] font-normal leading-[0.95] tracking-[-0.075em] text-[#111111] max-[1180px]:text-[70px] max-[640px]:text-[58px] max-[420px]:text-[50px]">
              98%
            </div>

            <div className="text-[25px] font-normal leading-[1.45] tracking-[-0.045em] text-[#626262] max-[1180px]:text-[22px] max-[640px]:text-[20px] max-[420px]:text-[18px]">
              Customer
              <br />
              Satisfaction
            </div>
          </div>

          {/* Round Image */}
          <div className="col-[3/5] row-[1] flex items-center justify-center border-t-0 max-[900px]:col-[1/2] max-[900px]:row-[2] max-[900px]:min-h-[150px] max-[900px]:border-r max-[900px]:border-t max-[900px]:border-[#dededb] max-[640px]:min-h-[150px] max-[640px]:border-r-0">
            <img
              src={metricsRound}
              alt="Decorative round line pattern"
              className="block h-[150px] w-[120px] object-contain opacity-90 transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[94px] max-[1180px]:w-[66px] max-[640px]:h-[88px] max-[640px]:w-[62px]"
            />
          </div>

          {/* Sofa Image */}
          <div className="col-[1/4] row-[2] flex items-center justify-center border-r border-t border-[#dededb] max-[900px]:col-[2/3] max-[900px]:row-[2] max-[900px]:min-h-[150px] max-[900px]:border-r-0 max-[640px]:min-h-[150px]">
            <img
              src={metricsSofa}
              alt="Minimal sofa interior"
              className="block h-[138px] w-[276px] object-cover object-center transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[126px] max-[1180px]:w-[250px] max-[640px]:h-[150px] max-[640px]:w-full max-[640px]:max-w-[285px]"
            />
          </div>

          {/* Rating */}
          <div className="col-[4/5] row-[2] flex items-center justify-center gap-9 border-t border-[#dededb] max-[900px]:col-[1/3] max-[900px]:row-[3] max-[900px]:min-h-[150px] max-[640px]:justify-start max-[640px]:gap-[22px] max-[640px]:px-[10px] max-[640px]:py-7">
            <div className="text-[83px] font-normal leading-[0.95] tracking-[-0.075em] text-[#111111] max-[1180px]:text-[70px] max-[640px]:text-[58px] max-[420px]:text-[50px]">
              4.9/5
            </div>

            <div className="text-[25px] font-normal leading-[1.45] tracking-[-0.045em] text-[#626262] max-[1180px]:text-[22px] max-[640px]:text-[20px] max-[420px]:text-[18px]">
              Product
              <br />
              Rating
            </div>
          </div>

          {/* 48 */}
          <div className="col-[1/3] row-[3] flex items-center justify-center gap-[34px] border-r border-t border-[#dededb] max-[900px]:col-[1/2] max-[900px]:row-[4] max-[900px]:min-h-[150px] max-[900px]:flex-col max-[900px]:gap-[10px] max-[640px]:flex-row max-[640px]:justify-start max-[640px]:gap-[22px] max-[640px]:border-r-0 max-[640px]:px-[10px] max-[640px]:py-7">
            <div className="text-[82px] font-normal leading-[0.95] tracking-[-0.075em] text-[#111111] max-[1180px]:text-[70px] max-[640px]:text-[58px] max-[420px]:text-[50px]">
              48
            </div>

            <div className="text-[25px] font-normal leading-[1.45] tracking-[-0.045em] text-[#626262] max-[1180px]:text-[22px] max-[640px]:text-[20px] max-[420px]:text-[18px]">
              Hour Dispatch
              <br />
              Time
            </div>
          </div>

          {/* Star Image */}
          <div className="col-[3/4] row-[3] flex items-center justify-center border-r border-t border-[#dededb] max-[900px]:hidden max-[640px]:flex max-[640px]:min-h-[150px] max-[640px]:border-r-0">
            <img
              src={metricsStar}
              alt="Decorative star shape"
              className="block h-[112px] w-[112px] object-contain opacity-90 transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[96px] max-[1180px]:w-[96px] max-[640px]:h-[82px] max-[640px]:w-[82px]"
            />
          </div>

          {/* Chair Image */}
          <div className="col-[4/5] row-[3] flex items-center justify-center border-t border-[#dededb] max-[900px]:col-[2/3] max-[900px]:row-[4] max-[900px]:min-h-[150px] max-[640px]:min-h-[150px]">
            <img
              src={metricsChair}
              alt="Premium accent chair"
              className="block h-[138px] w-[232px] object-cover object-center transition duration-[900ms] ease-out hover:scale-[1.04] max-[1180px]:h-[126px] max-[1180px]:w-[210px] max-[640px]:h-[150px] max-[640px]:w-full max-[640px]:max-w-[285px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyMetrics;