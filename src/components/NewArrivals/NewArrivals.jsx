import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import productOne from "../../assets/images/new-arrival-1.jpg";
import productTwo from "../../assets/images/new-arrival-2.jpg";
import productThree from "../../assets/images/new-arrival-3.jpg";
import productFour from "../../assets/images/new-arrival-4.jpg";
import productFive from "../../assets/images/new-arrival-5.jpg";
import productSix from "../../assets/images/new-arrival-6.jpg";

import "./NewArrivals.css";

const products = [
  {
    id: 1,
    image: productOne,
    category: "Living Room",
    title: "Marble-Inlay Coffee Table",
    oldPrice: "$299",
    price: "$249",
  },
  {
    id: 2,
    image: productTwo,
    category: "Lighting",
    title: "Nordic Pendant Light",
    oldPrice: "",
    price: "$89",
  },
  {
    id: 3,
    image: productThree,
    category: "Bedroom",
    title: "Rattan Accent Chair",
    oldPrice: "$159",
    price: "$139",
  },
  {
    id: 4,
    image: productFour,
    category: "Wall Art",
    title: "Abstract Wall Frame Set",
    oldPrice: "",
    price: "$75",
  },
  {
    id: 5,
    image: productFive,
    category: "Rugs & Carpets",
    title: "Boho Patterned Rug",
    oldPrice: "$210",
    price: "$179",
  },
  {
    id: 6,
    image: productSix,
    category: "Office",
    title: "Minimal Wooden Desk",
    oldPrice: "$350",
    price: "$299",
  },
];

const NewArrivals = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

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

  const updateSliderState = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const current = slider.scrollLeft;

    setProgress(maxScroll <= 0 ? 100 : (current / maxScroll) * 100);
    setCanPrev(current > 5);
    setCanNext(current < maxScroll - 5);
  };

  useEffect(() => {
    updateSliderState();

    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener("scroll", updateSliderState);
    window.addEventListener("resize", updateSliderState);

    return () => {
      slider.removeEventListener("scroll", updateSliderState);
      window.removeEventListener("resize", updateSliderState);
    };
  }, []);

  const handleSlide = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector(".arrival-card");
    const cardWidth = card ? card.offsetWidth + 24 : 320;

    slider.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`arrivals-section ${visible ? "arrivals-visible" : ""}`}
    >
      <div className="arrivals-container">
        <div className="arrivals-top">
          <p>//04</p>
          <p>/New Arrivals</p>
        </div>

        <div className="arrivals-heading-row">
          <h2>fresh finds just in</h2>

          <a href="#" className="arrivals-view-btn">
            <span>See All Products</span>
            <ArrowRight size={25} strokeWidth={1.55} />
          </a>
        </div>

        <div className="arrivals-slider-wrap">
          <div className="arrivals-slider" ref={sliderRef}>
            {products.map((product, index) => (
              <article className="arrival-card" key={product.id}>
                <div className="arrival-count">
                  //{String(index + 1).padStart(3, "0")}
                </div>

                <div className="arrival-image">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="arrival-info">
                  <p className="arrival-category">{product.category}</p>

                  <h3>{product.title}</h3>

                  <div className="arrival-price-row">
                    {product.oldPrice && (
                      <span className="arrival-old-price">
                        {product.oldPrice}
                      </span>
                    )}

                    <span className="arrival-price">{product.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="arrivals-controls">
          <div className="arrivals-arrows">
            <button
              type="button"
              onClick={() => handleSlide("prev")}
              className={!canPrev ? "disabled" : ""}
              aria-label="Previous product"
            >
              <ArrowLeft size={25} strokeWidth={1.45} />
            </button>

            <button
              type="button"
              onClick={() => handleSlide("next")}
              className={!canNext ? "disabled" : ""}
              aria-label="Next product"
            >
              <ArrowRight size={25} strokeWidth={1.45} />
            </button>
          </div>

          <div className="arrivals-progress">
            <span style={{ width: `${Math.max(progress, 28)}%` }}></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;