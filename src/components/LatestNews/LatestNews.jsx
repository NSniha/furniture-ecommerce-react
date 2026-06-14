import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import springImage from "../../assets/images/news-spring.jpg";
import lightingImage from "../../assets/images/news-lighting.jpg";
import readingNookImage from "../../assets/images/news-reading-nook.jpg";

import "./LatestNews.css";

const newsItems = [
  {
    id: 1,
    image: springImage,
    title: "7 Easy Ways To Make Your Living Room Feel More Inviting",
    category: "Room Styling",
    date: "18/06/2026",
    dateTime: "2026-06-18",
    featured: true,
  },
  {
    id: 2,
    image: lightingImage,
    title: "How Layered Lighting Can Transform The Mood Of Your Home",
    category: "Lighting Guide",
    date: "07/06/2026",
    dateTime: "2026-06-07",
    featured: false,
  },
  {
    id: 3,
    image: readingNookImage,
    title: "A Simple Guide To Creating The Perfect Reading Corner",
    category: "Home Comfort",
    date: "29/05/2026",
    dateTime: "2026-05-29",
    featured: false,
  },
];

const LatestNews = () => {
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
        threshold: 0.12,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const labelReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[22px] opacity-0";

  const introReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[30px] opacity-0";

  return (
    <section
      ref={sectionRef}
      className="latest-news-motion w-full overflow-hidden bg-[#fafaf8] pb-[90px] pt-[100px] max-[1180px]:pb-[100px] max-[900px]:pb-[82px] max-[900px]:pt-14 max-[640px]:pb-[66px] max-[640px]:pt-[50px]"
    >
      <div className="site-container">
        {/* ==================== Section labels ==================== */}

        <div
          className={`mb-[60px] flex items-center justify-between transition-all duration-[800ms] ease-out max-[900px]:mb-12 max-[640px]:mb-10 ${labelReveal}`}
        >
          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#686866] max-[640px]:text-[15px]">
            //08
          </p>

          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#686866] max-[640px]:text-[15px]">
            /Latest News
          </p>
        </div>

        {/* ==================== Section introduction ==================== */}

        <div
          className={`mb-[72px] grid grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)] items-end gap-[88px] transition-all delay-100 duration-[900ms] ease-out max-[1180px]:gap-[60px] max-[900px]:mb-[58px] max-[900px]:grid-cols-1 max-[900px]:items-start max-[900px]:gap-[38px] max-[640px]:mb-12 max-[640px]:gap-[30px] ${introReveal}`}
        >
          {/* ==================== Heading and action ==================== */}

          <div className="min-w-0">
            <h2 className="latest-news-title-font m-0 max-w-[780px] text-[clamp(68px,5.7vw,94px)] font-normal lowercase leading-[0.95] tracking-[-0.055em] text-[#111111] max-[900px]:max-w-[700px] max-[900px]:text-[58px] max-[640px]:text-[46px] max-[640px]:leading-none max-[420px]:text-[42px]">
              stories for inspired living
            </h2>

            <a
              href="#"
              className="mt-8 inline-flex h-[54px] w-fit shrink-0 items-center gap-[22px] rounded-[3px] border border-[#5d5d5d] bg-transparent px-6 font-['Inter',sans-serif] text-[15px] font-medium uppercase leading-none tracking-[-0.01em] text-[#151515] no-underline transition-all delay-[220ms] duration-300 hover:border-[#151515] hover:bg-[#151515] hover:text-white max-[768px]:h-[50px] max-[768px]:gap-[18px] max-[768px]:px-5 max-[768px]:text-[13px] translate-y-0 opacity-100"
            >
              <span>Explore All Stories</span>

              <ArrowRight
                size={20}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* ==================== Section description ==================== */}

          <p className="section-copy mb-[5px] ml-auto mt-0 w-full max-w-[460px] text-[#696967] max-[900px]:mb-0 max-[900px]:ml-0 max-[900px]:max-w-[570px]">
            Discover practical styling ideas, thoughtful design advice, and
            simple ways to create a home that feels warmer, calmer, and more
            personal.
          </p>
        </div>

        {/* ==================== Latest news list ==================== */}

        <div className="w-full">
          {newsItems.map((item, index) => (
            <article
              key={item.id}
              style={{
                transitionDelay: `${220 + index * 100}ms`,
              }}
              className={`group grid grid-cols-[minmax(0,0.69fr)_minmax(0,0.95fr)] items-stretch gap-x-10 border-t border-[#d4d4d1] pb-[38px] pt-4 transition-all duration-[900ms] ease-out max-[1180px]:grid-cols-[minmax(0,0.76fr)_minmax(0,1fr)] max-[1180px]:gap-8 max-[1180px]:pb-8 max-[900px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] max-[900px]:gap-[26px] max-[760px]:grid-cols-1 max-[760px]:gap-6 max-[760px]:pb-[38px] ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[34px] opacity-0"
              }`}
            >
              {/* ==================== News image ==================== */}

              <a
                href="#"
                aria-label={`Read ${item.title}`}
                className="block h-[322px] w-full overflow-hidden bg-[#e5e0d8] max-[1180px]:h-[292px] max-[900px]:h-[252px] max-[760px]:aspect-[1.62/1] max-[760px]:h-auto"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="block h-full w-full object-cover object-center transition-transform duration-[1000ms] ease-out group-hover:scale-[1.035]"
                />
              </a>

              {/* ==================== News information ==================== */}

              <div className="flex h-[322px] min-w-0 flex-col max-[1180px]:h-[292px] max-[900px]:h-[252px] max-[760px]:h-auto max-[760px]:min-h-[245px] max-[640px]:min-h-[100px]">
                {/* ==================== Title and arrow ==================== */}

                <div className="flex items-start justify-between gap-[30px] max-[640px]:gap-4">
                  <a
                    href="#"
                    className={`min-w-0 max-w-[650px] font-['Inter',sans-serif] text-[clamp(26px,2.35vw,30px)] font-medium uppercase leading-[1.6] tracking-[-0.045em] text-[#151515] no-underline transition-colors duration-300 hover:text-[#625e58] max-[1180px]:text-[29px] max-[900px]:text-[25px] max-[640px]:text-[22px] max-[640px]:leading-[1.55] max-[420px]:text-[20px] ${
                      item.featured
                        ? "underline decoration-[1.5px] underline-offset-[5px]"
                        : "group-hover:underline group-hover:decoration-[1.5px] group-hover:underline-offset-[5px]"
                    }`}
                  >
                    {item.title}
                  </a>

                  <a
                    href="#"
                    aria-label={`Open ${item.title}`}
                    className="mt-[1px] inline-flex shrink-0 items-center justify-center text-[#111111] no-underline transition-transform duration-300 group-hover:translate-x-[6px]"
                  >
                    <ArrowRight
                      size={42}
                      strokeWidth={1.3}
                      className="max-[1180px]:h-[35px] max-[1180px]:w-[35px] max-[640px]:h-[30px] max-[640px]:w-[30px]"
                    />
                  </a>
                </div>

                {/* ==================== News category ==================== */}

                <div className="flex flex-col items-start justify-around gap-40 mt-auto max-[900px]:gap-12 max-[760px]:gap-8 max-[640px]:gap-6">
                    <span className="mt-[21px] inline-flex h-[30px] w-fit items-center justify-center rounded-[3px] border border-[#c9c9c6] px-[11px] font-['Inter',sans-serif] text-[13px] font-normal leading-none tracking-[-0.015em] text-[#343434] max-[900px]:mt-[18px] max-[640px]:h-[29px] max-[640px]:px-[10px] max-[640px]:text-[12px]">
                      {item.category}
                    </span>

                    {/* ==================== Publication date ==================== */}

                    <p className="mb-[7px] mt-auto font-['Inter',sans-serif] text-[13px] font-normal uppercase leading-none tracking-[-0.015em] text-[#666666] max-[760px]:mb-0 max-[640px]:text-[12px]">
                      <strong className="font-semibold">Published</strong>

                      <time
                        dateTime={item.dateTime}
                        className="ml-2 font-normal"
                      >
                        {item.date}
                      </time>
                    </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;