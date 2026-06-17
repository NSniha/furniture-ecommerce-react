import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import aboutImage from "../../assets/images/about-decor.jpg";
import "./AboutIntro.css";

const AboutIntro = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      {
        threshold: 0.22,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-10 opacity-0";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f8f8f6] py-[100px] max-[1180px]:py-[88px] max-[900px]:py-[68px] max-[640px]:py-[54px]"
    >
      {/* ==================== Shared section container ==================== */}

      <div className="site-container">
        {/* ==================== Section labels ==================== */}

        <div
          className={`flex items-center justify-between transition-all duration-700 ease-out ${revealClass}`}
        >
          <p className="m-0 text-[17px] font-normal leading-none tracking-[-0.02em] text-[#5d5d5d] max-[900px]:text-[15px] max-[640px]:text-[14px]">
            //01
          </p>

          <p className="m-0 text-[17px] font-normal leading-none tracking-[-0.02em] text-[#5d5d5d] max-[900px]:text-[15px] max-[640px]:text-[14px]">
            /Our Story
          </p>
        </div>

        {/* ==================== Introduction heading ==================== */}

        <div className="mt-[58px] grid grid-cols-[0.95fr_1.05fr] items-start gap-[100px] max-[1180px]:gap-[70px] max-[900px]:mt-[48px] max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[640px]:mt-[38px]">
          <div
            className={`transition-all duration-700 ease-out ${revealClass}`}
            style={{
              transitionDelay: "120ms",
            }}
          >
            <h2 className="about-display-font m-0 text-[78px] font-normal lowercase leading-[0.98] tracking-[-0.055em] text-[#121212] max-[1440px]:text-[76px] max-[1180px]:text-[74px] max-[900px]:text-[68px] max-[640px]:text-[52px] max-[420px]:text-[46px]">
              about decorist
            </h2>
          </div>

          <div
            className={`pt-[104px] transition-all duration-700 ease-out max-[1180px]:pt-[86px] max-[900px]:pt-0 ${revealClass}`}
            style={{
              transitionDelay: "220ms",
            }}
          >
            <h3 className="m-0 max-w-[700px] text-[46px] font-normal uppercase leading-[1.2] tracking-[-0.045em] text-[#5f5f5f] max-[1440px]:text-[38px] max-[1180px]:text-[38px] max-[900px]:text-[36px] max-[640px]:text-[26px] max-[420px]:text-[24px]">
              Thoughtful interiors
              <br />
              shaped around real life.
            </h3>
          </div>
        </div>

        {/* ==================== Image and supporting content ==================== */}

        <div className="mt-[50px] grid grid-cols-[1.08fr_0.72fr] items-end gap-[150px] max-[1440px]:gap-[110px] max-[1180px]:gap-[76px] max-[900px]:mt-[48px] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:mt-10">
          <div
            className={`about-image-card h-[460px] w-full overflow-hidden bg-[#e7e3dd] transition-all duration-700 ease-out max-[1440px]:h-[430px] max-[1180px]:h-[390px] max-[900px]:h-[430px] max-[640px]:h-[330px] max-[420px]:h-[270px] ${revealClass}`}
            style={{
              transitionDelay: "320ms",
            }}
          >
            <img
              src={aboutImage}
              alt="Modern home decor interior"
              className="block h-full w-full object-cover object-center"
            />
          </div>

          <div
            className={`w-full max-w-[500px] pb-[72px] transition-all duration-700 ease-out max-[1180px]:pb-[46px] max-[900px]:max-w-[680px] max-[900px]:pb-0 ${revealClass}`}
            style={{
              transitionDelay: "420ms",
            }}
          >
            <p className="mb-5 mt-0 text-[17.5px] font-normal leading-[1.6] tracking-[-0.02em] text-[#686868] max-[1180px]:text-[16px] max-[640px]:text-[15px]">
              At Decorist, we believe a beautiful home should feel natural,
              personal, and easy to live in. Every piece is selected to bring
              warmth, balance, and lasting character into your space.
            </p>

            <p className="mb-[42px] mt-0 text-[17.5px] font-normal leading-[1.6] tracking-[-0.02em] text-[#686868] max-[1180px]:mb-9 max-[1180px]:text-[16px] max-[640px]:mb-8 max-[640px]:text-[15px]">
              From timeless furniture to expressive finishing touches, our
              collections help you create rooms that feel considered without
              ever feeling overdone.
            </p>

            <Link
              to="/about"
              className="group inline-flex h-[52px] min-w-[154px] items-center justify-center gap-[18px] rounded-[3px] border border-[#5a5a5a] bg-transparent px-6 text-[16px] font-medium uppercase leading-none tracking-[-0.01em] text-[#171717] no-underline transition-all duration-300 hover:-translate-y-1 hover:border-[#171717] hover:bg-[#171717] hover:text-white max-[900px]:h-[50px] max-[900px]:px-[22px] max-[900px]:text-[14px] max-[640px]:h-[48px] max-[640px]:min-w-[145px] max-[640px]:px-5 max-[640px]:text-[13px]"
            >
              <span>Our Story</span>

              <ArrowRight
                size={25}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;