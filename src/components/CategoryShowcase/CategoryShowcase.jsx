import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import livingImg from "../../assets/images/category-living.jpg";
import bedroomImg from "../../assets/images/category-bedroom.jpg";
import kitchenImg from "../../assets/images/category-kitchen.jpg";
import officeImg from "../../assets/images/category-office.jpg";
import lightingImg from "../../assets/images/category-lighting.jpg";
import rugsImg from "../../assets/images/category-rugs.jpg";
import wallArtImg from "../../assets/images/category-wall-art.jpg";
import outdoorImg from "../../assets/images/category-outdoor.jpg";

import "./CategoryShowcase.css";

const categories = [
  {
    id: 1,
    title: "Living Room",
    image: livingImg,
  },
  {
    id: 2,
    title: "Bedroom",
    image: bedroomImg,
  },
  {
    id: 3,
    title: "Kitchen & Dining",
    image: kitchenImg,
  },
  {
    id: 4,
    title: "Office",
    image: officeImg,
  },
  {
    id: 5,
    title: "Lighting",
    image: lightingImg,
  },
  {
    id: 6,
    title: "Rugs & Carpets",
    image: rugsImg,
  },
  {
    id: 7,
    title: "Wall Art",
    image: wallArtImg,
  },
  {
    id: 8,
    title: "Outdoor",
    image: outdoorImg,
  },
];

const CategoryShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const activeCategory = categories[activeIndex];

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
        threshold: 0.22,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const topReveal = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-6";

  const imageReveal = visible
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-[34px]";

  const listReveal = visible
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-[34px]";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f3f0e8] py-[48px] sm:py-[56px] md:py-[66px] xl:py-[82px] 2xl:py-[82px]"
    >
      <div className="mx-auto w-[calc(100%_-_28px)] max-w-[420px] sm:w-[calc(100%_-_32px)] sm:max-w-[680px] md:w-[calc(100%_-_56px)] md:max-w-[920px] xl:w-[calc(100%_-_96px)] xl:max-w-[1380px]">
        {/* Top Label */}
        <div
          className={`mb-[30px] flex items-center justify-between transition-all duration-[800ms] ease-out sm:mb-[34px] xl:mb-[42px] ${topReveal}`}
        >
          <p className="m-0 text-[15px] font-normal leading-none tracking-[-0.025em] text-[#5c5c5c] xl:text-[18px]">
            //03
          </p>

          <p className="m-0 text-[15px] font-normal leading-none tracking-[-0.025em] text-[#5c5c5c] xl:text-[18px]">
            /Categories
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-center gap-[42px] xl:grid-cols-[0.98fr_0.92fr] xl:gap-11">
          {/* Image Area */}
          <div
            className={`transition-all delay-[120ms] duration-[900ms] ease-out ${imageReveal}`}
          >
            <div className="category-image-card relative h-[330px] w-full overflow-hidden bg-[#ddd8ce] sm:h-[430px] md:h-[560px] xl:h-[720px] 2xl:h-[750px]">
              {categories.map((item, index) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={`${item.title} decor`}
                  className={`category-image-layer ${
                    index === activeIndex ? "active" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* List Area */}
          <div
            className={`relative flex min-h-0 items-start pt-[6px] transition-all delay-[220ms] duration-[900ms] ease-out xl:min-h-[780px] xl:items-center xl:pt-0 2xl:min-h-[840px] ${listReveal}`}
          >
            <div className="w-full pr-0 md:pr-[100px] xl:pr-0">
              {categories.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`group mb-4 flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-0 text-left font-sans text-[30px] font-medium uppercase leading-[1.5] tracking-[-0.055em] outline-0 transition duration-300 last:mb-0 hover:translate-x-1 hover:text-[#111111] sm:mb-[18px] sm:text-[clamp(30px,9vw,42px)] md:mb-[22px] md:w-fit md:gap-7 md:text-[clamp(36px,6vw,50px)] xl:mb-6 xl:text-[clamp(30px,2.35vw,40px)] 2xl:mb-7 ${
                      isActive ? "text-[#111111]" : "text-[#666666]"
                    }`}
                  >
                    <span className="relative inline-block">
                      {item.title}

                      <span
                        className={`absolute left-0 bottom-[3px] h-[2px] bg-current transition-all duration-300 xl:bottom-[5px] ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </span>

                    {isActive && (
                      <ArrowRight
                        className="category-arrow shrink-0 text-[#111111]"
                        size={28}
                        strokeWidth={1.5}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-[26px] text-[15px] font-semibold leading-none tracking-[-0.025em] text-[#5e5e5e] md:absolute md:right-0 md:top-3 md:mt-0 xl:top-[125px] 2xl:top-[145px]">
              {String(activeCategory.id).padStart(3, "0")}/008
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;