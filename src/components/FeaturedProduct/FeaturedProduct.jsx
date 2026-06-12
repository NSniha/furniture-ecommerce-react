import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import featuredSofa from "../../assets/images/featured-sofa.jpg";
import "./FeaturedProduct.css";

const productFeatures = [
  "Premium fabric with plush seating",
  "Available in 3 colors",
  "Easy-to-assemble design",
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
      { threshold: 0.18 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const headingReveal = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-[30px]";

  const imageReveal = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-[36px]";

  const contentReveal = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-[32px]";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f8f8f6] py-[74px] pb-[108px] max-[1180px]:py-[68px] max-[1180px]:pb-[92px] max-[900px]:py-[60px] max-[900px]:pb-[78px] max-[640px]:py-[52px] max-[640px]:pb-[66px]"
    >
      <div className="mx-auto w-[min(calc(100%_-_96px),1380px)] max-[1180px]:w-[min(calc(100%_-_72px),1080px)] max-[900px]:w-[min(calc(100%_-_48px),820px)] max-[640px]:w-[min(calc(100%_-_32px),560px)] max-[420px]:w-[min(calc(100%_-_28px),390px)]">
        {/* Heading */}
        <div
          className={`mb-[74px] text-center transition-all duration-[850ms] ease-out max-[1180px]:mb-[62px] max-[900px]:mb-[52px] max-[640px]:mb-10 ${headingReveal}`}
        >
          <h2 className="featured-title-font m-0 text-[clamp(68px,5.7vw,94px)] font-normal lowercase leading-[0.95] tracking-[-0.055em] text-[#111111] max-[900px]:text-[clamp(58px,11vw,78px)] max-[640px]:text-[clamp(48px,15vw,64px)] max-[640px]:leading-none max-[420px]:text-[48px]">
            featured in
          </h2>

          <p className="mx-auto mb-0 mt-[34px] max-w-[520px] text-[16px] font-normal leading-[1.5] tracking-[-0.025em] text-[#222222] max-[900px]:mt-[26px] max-[640px]:mt-[22px] max-[640px]:max-w-[330px] max-[640px]:text-[14px] max-[640px]:leading-[1.55]">
            Handpicked pieces our customers can’t stop talking about.
          </p>
        </div>

        {/* Featured Image */}
        <div
          className={`group relative h-[458px] w-full overflow-hidden bg-[#d7cbbc] transition-all delay-[120ms] duration-[900ms] ease-out max-[1180px]:h-[410px] max-[900px]:h-[340px] max-[640px]:h-[270px] max-[420px]:h-[225px] ${imageReveal}`}
        >
          <img
            src={featuredSofa}
            alt="Velvet tufted sofa with matching ottoman"
            className="block h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
          />

          <span className="absolute right-[31px] top-6 inline-flex h-[38px] min-w-[122px] items-center justify-center bg-white px-[17px] text-[15px] font-medium leading-none tracking-[-0.015em] text-[#151515] max-[900px]:right-5 max-[900px]:top-5 max-[640px]:right-4 max-[640px]:top-4 max-[640px]:h-[34px] max-[640px]:min-w-[104px] max-[640px]:px-[13px] max-[640px]:text-[13px]">
            Living Room
          </span>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-[1fr_0.92fr] items-start gap-[92px] pt-[29px] max-[1180px]:gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:gap-[34px] max-[640px]:pt-6">
          {/* Product Details */}
          <div
            className={`max-w-[620px] transition-all delay-[220ms] duration-[850ms] ease-out ${contentReveal}`}
          >
            <h3 className="mb-5 mt-0 text-[34px] font-medium uppercase leading-[1.15] tracking-[-0.045em] text-[#151515] max-[1180px]:text-[30px] max-[640px]:mb-4 max-[640px]:text-[25px] max-[420px]:text-[22px]">
              Velvet Tufted Sofa
            </h3>

            <p className="m-0 text-[72px] font-normal leading-[0.95] tracking-[-0.07em] text-[#111111] max-[1180px]:text-[64px] max-[640px]:text-[56px] max-[420px]:text-[50px]">
              $520
            </p>

            <p className="mb-0 mt-[38px] max-w-[580px] text-[16px] font-normal leading-[1.55] tracking-[-0.02em] text-[#696969] max-[900px]:mt-7 max-[640px]:mt-6 max-[640px]:text-[15px] max-[640px]:leading-[1.58]">
              Add a touch of timeless luxury and exceptional comfort with this
              elegant velvet tufted sofa, perfect for both entertaining and
              relaxing.
            </p>
          </div>

          {/* Features */}
          <div
            className={`w-full max-w-[520px] justify-self-end pt-1 transition-all delay-[320ms] duration-[850ms] ease-out max-[900px]:max-w-full max-[900px]:justify-self-start max-[900px]:pt-0 ${contentReveal}`}
          >
            <ul className="m-0 list-disc space-y-[9px] pl-[23px] text-[#171717]">
              {productFeatures.map((feature) => (
                <li
                  key={feature}
                  className="pl-0.5 text-[18px] font-medium italic leading-[1.4] tracking-[-0.025em] max-[640px]:text-[16px] max-[420px]:text-[15px]"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="group mt-[73px] inline-flex h-[52px] min-w-[164px] items-center justify-center gap-[19px] border border-[#111111] bg-[#111111] px-[23px] text-[14px] font-medium uppercase leading-none tracking-[-0.01em] text-white no-underline transition-all duration-300 hover:-translate-y-[3px] hover:bg-transparent hover:text-[#111111] max-[1180px]:mt-[58px] max-[900px]:mt-[34px] max-[640px]:mt-[30px] max-[640px]:h-[50px] max-[640px]:min-w-[150px] max-[640px]:px-[21px] max-[640px]:text-[13px]"
            >
              <span>Shop Now</span>

              <ArrowRight
                size={22}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-[5px]"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;