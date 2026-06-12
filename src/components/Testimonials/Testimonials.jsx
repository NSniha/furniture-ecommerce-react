import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import testimonialOne from "../../assets/images/testimonial-1.jpg";
import testimonialTwo from "../../assets/images/testimonial-2.jpg";
import testimonialThree from "../../assets/images/testimonial-3.jpg";
import testimonialFour from "../../assets/images/testimonial-4.jpg";
import testimonialFive from "../../assets/images/testimonial-5.jpg";

import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    image: testimonialOne,
    title: "Decorist Completely Transformed My Living Room!",
    description:
      "The quality of the furniture is outstanding, and the designs are just stunning. It feels like I’m living in a magazine. Delivery was quick, and the customer support was top-notch.",
    name: "Amanda Lowe",
    location: "Brooklyn, NY",
  },
  {
    id: 2,
    image: testimonialTwo,
    title: "Every Detail Feels Thoughtfully Designed!",
    description:
      "The entire experience was effortless from start to finish. Every piece feels carefully selected, beautifully finished, and perfectly suited to our home.",
    name: "Daniel Carter",
    location: "Austin, TX",
  },
  {
    id: 3,
    image: testimonialThree,
    title: "Our Bedroom Finally Feels Calm And Complete!",
    description:
      "The furniture looks even more beautiful in person. The materials feel premium, the proportions are perfect, and the room now feels warm and complete.",
    name: "Sophia Miller",
    location: "Chicago, IL",
  },
  {
    id: 4,
    image: testimonialFour,
    title: "A Beautiful Balance Of Comfort And Style!",
    description:
      "We wanted a modern space that still felt welcoming. The final result exceeded our expectations and every detail feels personal and timeless.",
    name: "Ethan Brooks",
    location: "Seattle, WA",
  },
  {
    id: 5,
    image: testimonialFive,
    title: "The Entire Experience Was Smooth And Inspiring!",
    description:
      "Finding the right pieces was simple and enjoyable. The quality, delivery, and customer service were all exceptional from beginning to end.",
    name: "Olivia Harris",
    location: "Miami, FL",
  },
];

const AUTO_SLIDE_DELAY = 6500;

const Testimonials = () => {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

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
      { threshold: 0.16 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || isPaused) return;

    const timer = window.setTimeout(() => {
      setDirection("next");

      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % testimonials.length;
      });
    }, AUTO_SLIDE_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, visible, isPaused]);

  const handleNext = () => {
    setDirection("next");

    setActiveIndex((currentIndex) => {
      return (currentIndex + 1) % testimonials.length;
    });
  };

  const handlePrevious = () => {
    setDirection("previous");

    setActiveIndex((currentIndex) => {
      return (
        (currentIndex - 1 + testimonials.length) %
        testimonials.length
      );
    });
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  };

  const sectionReveal = visible
    ? "testimonials-section-visible"
    : "";

  const formattedCurrent = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(testimonials.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className={`testimonials-section ${sectionReveal}`}
    >
      <div className="testimonials-container">
        {/* Top Labels */}
        <div className="testimonials-top">
          <p>//06</p>
          <p>/Testimonials</p>
        </div>

        {/* Section Title */}
        <div className="testimonials-heading">
          <h2>what our customers say</h2>
        </div>

        {/* Testimonial Slider */}
        <div
          className="testimonials-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={handleBlur}
        >
          {/* Image */}
          <div className="testimonials-image-wrap">
            <div
              key={`image-${activeTestimonial.id}-${direction}`}
              className={`testimonials-image ${
                direction === "next"
                  ? "slide-image-next"
                  : "slide-image-previous"
              }`}
            >
              <img
                src={activeTestimonial.image}
                alt={`${activeTestimonial.name} living room`}
              />
            </div>
          </div>

          {/* Content */}
          <div className="testimonials-content">
            <div
              key={`content-${activeTestimonial.id}-${direction}`}
              className={`testimonials-copy ${
                direction === "next"
                  ? "slide-content-next"
                  : "slide-content-previous"
              }`}
            >
              <span
                className="testimonials-quote"
                aria-hidden="true"
              >
                “
              </span>

              <h3>{activeTestimonial.title}</h3>

              <p className="testimonials-description">
                {activeTestimonial.description}
              </p>

              <div className="testimonials-divider" />

              <p className="testimonials-author">
                <strong>{activeTestimonial.name},</strong>{" "}
                <span>{activeTestimonial.location}</span>
              </p>
            </div>

            {/* Bottom Controls */}
            <div className="testimonials-bottom">
              <div className="testimonials-arrows">
                <button
                  type="button"
                  onClick={handlePrevious}
                  aria-label="Previous testimonial"
                  className="testimonial-arrow testimonial-arrow-previous"
                >
                  <ArrowLeft size={17} strokeWidth={1.6} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="testimonial-arrow testimonial-arrow-next"
                >
                  <ArrowRight size={17} strokeWidth={1.6} />
                </button>
              </div>

              <div
                className="testimonials-counter"
                aria-live="polite"
              >
                <strong>{formattedCurrent}</strong>
                <span>/</span>
                <p>{formattedTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;