import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
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
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f8f8f6] py-[54px] sm:py-[68px] lg:py-[88px] xl:py-[100px]"
    >
      <div className="site-container">
        {/* Top Small Text */}
        <div
          className={`flex items-center justify-between transition-all duration-700 ease-out ${revealClass}`}
        >
          <p className="m-0 text-[14px] font-normal leading-none tracking-[-0.02em] text-[#5d5d5d] sm:text-[15px] lg:text-[17px]">
            //01
          </p>

          <p className="m-0 text-[14px] font-normal leading-none tracking-[-0.02em] text-[#5d5d5d] sm:text-[15px] lg:text-[17px]">
            /Introduction
          </p>
        </div>

        {/* Heading Area */}
        <div className="mt-[38px] grid grid-cols-1 gap-8 md:mt-[48px] lg:mt-[58px] lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div
            className={`transition-all duration-700 ease-out ${revealClass}`}
            style={{ transitionDelay: "120ms" }}
          >
            <h2 className="about-display-font m-0 text-[48px] font-normal lowercase leading-[0.98] tracking-[-0.055em] text-[#121212] sm:text-[62px] md:text-[76px] lg:text-[82px] xl:text-[92px]">
              about decorist.
            </h2>
          </div>

          <div
            className={`transition-all duration-700 ease-out lg:pt-[104px] ${revealClass}`}
            style={{ transitionDelay: "220ms" }}
          >
            <h3 className="m-0 max-w-[620px] text-[28px] font-normal uppercase leading-[1.2] tracking-[-0.045em] text-[#5f5f5f] sm:text-[34px] md:text-[40px] lg:text-[43px] xl:text-[49px]">
              Your one-stop destination
              <br />
              for all things home decor.
            </h3>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-[40px] grid grid-cols-1 items-end gap-10 md:mt-[48px] lg:grid-cols-[1.05fr_0.8fr] lg:gap-20 xl:gap-[150px]">
          {/* Image */}
          <div
            className={`about-image-card h-[260px] w-full overflow-hidden bg-[#e7e3dd] transition-all duration-700 ease-out sm:h-[330px] md:h-[430px] lg:h-[405px] ${revealClass}`}
            style={{ transitionDelay: "320ms" }}
          >
            <img
              src={aboutImage}
              alt="Modern home decor interior"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Text */}
          <div
            className={`max-w-full pb-0 transition-all duration-700 ease-out lg:max-w-[455px] lg:pb-[72px] ${revealClass}`}
            style={{ transitionDelay: "420ms" }}
          >
            <p className="m-0 mb-5 text-[15px] font-normal leading-[1.6] tracking-[-0.02em] text-[#686868] sm:text-[16px] lg:text-[17.5px]">
              Whether you're redecorating a cozy apartment or styling your dream
              home, our curated selection of modern and classic pieces is
              designed to reflect your personality and elevate your space.
            </p>

            <p className="m-0 mb-8 text-[15px] font-normal leading-[1.6] tracking-[-0.02em] text-[#686868] sm:text-[16px] lg:mb-[42px] lg:text-[17.5px]">
              We blend style, comfort, and quality to help you create interiors
              that inspire every day.
            </p>

            <a
              href="#"
              className="group inline-flex h-[48px] min-w-[145px] items-center justify-center gap-[18px] rounded-[3px] border border-[#5a5a5a] bg-transparent px-5 text-[13px] font-medium uppercase leading-none tracking-[-0.01em] text-[#171717] no-underline transition duration-300 hover:-translate-y-1 hover:border-[#171717] hover:bg-[#171717] hover:text-white sm:h-[50px] sm:px-[22px] sm:text-[14px] lg:h-[52px] lg:min-w-[154px] lg:px-6 lg:text-[16px]"
            >
              <span>About Us</span>
              <ArrowRight
                size={25}
                strokeWidth={1.7}
                className="transition duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;