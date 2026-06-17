import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useLocation } from "react-router-dom";

import contactImage from "../../assets/images/contact-room.jpg";

import RedesignCTA from "../../components/RedesignCTA/RedesignCTA";

import "./Contact.css";

/* ==================== Contact information ==================== */

const contactInformation = [
  {
    id: 1,
    title: "Email Our Studio",
    lines: ["hello@decorist.com"],
    href: "mailto:hello@decorist.com",
  },
  {
    id: 2,
    title: "Speak With Our Team",
    lines: ["+1 (800) 824-3160"],
    href: "tel:+18008243160",
  },
  {
    id: 3,
    title: "Visit Our Studio",
    lines: [
      "86 Willow Avenue",
      "Portland, OR, USA",
    ],
  },
  {
    id: 4,
    title: "Studio Hours",
    lines: [
      "Monday – Friday",
      "9:00 AM – 5:30 PM (PST)",
    ],
  },
];

/* ==================== FAQ information ==================== */

const faqItems = [
  {
    id: 1,
    question: "Can you help me choose the right size?",
    answer:
      "Yes. Share your room measurements, preferred layout, and the product you are considering. Our team will help you choose a size that feels balanced in your space.",
  },
  {
    id: 2,
    question: "What happens after I place an order?",
    answer:
      "You will receive an order confirmation by email. Once your item is prepared for dispatch, we will send another message with delivery and tracking information.",
  },
  {
    id: 3,
    question: "Do you offer room styling advice?",
    answer:
      "Yes. We can help with furniture placement, colour combinations, materials, lighting, and finishing details for a more considered interior.",
  },
  {
    id: 4,
    question: "Can delivery be scheduled?",
    answer:
      "Scheduling options depend on the product and delivery location. Our delivery team will contact you when an appointment is available.",
  },
  {
    id: 5,
    question: "What is your return process?",
    answer:
      "Eligible unused items may be returned within 30 days of delivery. Products must remain in their original condition and packaging.",
  },
];

/* ==================== Section reveal hook ==================== */

const useSectionReveal = (threshold = 0.15) => {
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
        threshold,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [threshold]);

  return {
    sectionRef,
    visible,
  };
};

const Contact = () => {
  const location = useLocation();

  const {
    sectionRef: contactSectionRef,
    visible: contactVisible,
  } = useSectionReveal(0.12);

  const {
    sectionRef: formSectionRef,
    visible: formVisible,
  } = useSectionReveal(0.14);

  const {
    sectionRef: faqSectionRef,
    visible: faqVisible,
  } = useSectionReveal(0.12);

  const [openFaq, setOpenFaq] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  /* ==================== FAQ hash navigation ==================== */

  useEffect(() => {
    if (location.hash !== "#faq") return;

    const timeout = window.setTimeout(() => {
      const faqSection =
        document.getElementById("faq");

      faqSection?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.hash]);

  /* ==================== Form field update ==================== */

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSubmitted(false);
  };

  /* ==================== Form submission ==================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page w-full overflow-hidden bg-[#fbfbf9] text-[#171717]">
      {/* ==================== Contact information section ==================== */}

      <section
        ref={contactSectionRef}
        className="w-full bg-[#fbfbf9] pb-[138px] pt-[80px] max-[1180px]:pb-[100px] max-[1180px]:pt-[72px] max-[900px]:pb-[94px] max-[900px]:pt-[64px] max-[640px]:pb-[72px] max-[640px]:pt-[52px]"
      >
        <div className="site-container">
          {/* ==================== Contact page introduction ==================== */}

          <div
            className={`relative min-h-[230px] transition-all duration-[950ms] ease-out max-[1400px]:min-h-[218px] max-[1180px]:min-h-[195px] max-[900px]:flex max-[900px]:min-h-0 max-[900px]:flex-col max-[900px]:gap-[34px] ${
              contactVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[32px] opacity-0"
            }`}
          >
            <h1 className="display-serif-font m-0 max-w-[940px] text-[clamp(68px,5.7vw,94px)] font-normal lowercase leading-[1.02] tracking-[-0.055em] text-[#171717] max-[1180px]:max-w-[760px] max-[900px]:max-w-[680px] max-[900px]:text-[58px] max-[640px]:text-[46px] max-[420px]:text-[42px]">
              let’s create something beautiful
            </h1>

            <p className="absolute bottom-[20px] right-0 m-0 max-w-[500px] text-[18px] font-normal uppercase leading-[1.50] tracking-[-0.025em] text-[#666666] max-[1400px]:max-w-[455px] max-[1180px]:max-w-[395px] max-[1180px]:text-[16px] max-[900px]:static max-[900px]:max-w-[560px] max-[640px]:text-[14px]">
              From product guidance to order support,
              we’re here to make every step feel simple.
            </p>
          </div>

          {/* ==================== Contact section labels ==================== */}

          <div
            className={`mt-[92px] flex items-center justify-between transition-all delay-[100ms] duration-[900ms] ease-out max-[1180px]:mt-[82px] max-[900px]:mt-[76px] max-[640px]:mt-[62px] ${
              contactVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[22px] opacity-0"
            }`}
          >
            <p className="section-label">//01</p>

            <p className="section-label">
              /Our Contact
            </p>
          </div>

          {/* ==================== Contact image and details ==================== */}

          <div className="mt-[48px] grid grid-cols-[0.88fr_1fr] items-stretch gap-[86px] max-[1400px]:gap-[64px] max-[1180px]:grid-cols-[0.9fr_1.1fr] max-[1180px]:gap-[48px] max-[900px]:grid-cols-1 max-[900px]:gap-[62px] max-[640px]:mt-[38px] max-[640px]:gap-[48px]">
            {/* ==================== Contact image ==================== */}

            <div
              className={`group aspect-[312/414] w-full overflow-hidden bg-[#d8cec1] transition-all delay-[160ms] duration-[1000ms] ease-out max-[900px]:max-w-[640px] ${
                contactVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[44px] opacity-0"
              }`}
            >
              <img
                src={contactImage}
                alt="Warm minimal dining room interior"
                className="h-full w-full object-cover object-center transition-transform duration-[1300ms] ease-out group-hover:scale-[1.025]"
              />
            </div>

            {/* ==================== Contact details ==================== */}

            <div
              className={`flex min-w-0 flex-col justify-center transition-all delay-[240ms] duration-[1000ms] ease-out ${
                contactVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[40px] opacity-0"
              }`}
            >
              <h2 className="display-serif-font m-0 max-w-[620px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.08] tracking-[-0.055em] text-[#171717] max-[1180px]:text-[clamp(56px,5.5vw,74px)] max-[900px]:text-[58px] max-[640px]:text-[46px] max-[420px]:text-[42px]">
                <span className="block">
                  your ideas,
                </span>

                <span className="block">
                  our attention
                </span>
              </h2>

              <div className="mt-[96px] grid grid-cols-2 gap-x-[72px] gap-y-[70px] max-[1400px]:gap-x-[48px] max-[1180px]:mt-[70px] max-[1180px]:gap-y-[52px] max-[640px]:mt-[54px] max-[640px]:grid-cols-1 max-[640px]:gap-9">
                {contactInformation.map((item) => (
                  <div key={item.id}>
                    <h3 className="m-0 text-[17px] font-semibold uppercase leading-[1.2] tracking-[-0.025em] text-[#171717] max-[1180px]:text-[15px]">
                      {item.title}
                    </h3>

                    <div className="mt-[17px]">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[16px] font-normal leading-[1.55] tracking-[-0.015em] text-[#777777] no-underline transition-colors duration-300 hover:text-[#171717] max-[1180px]:text-[15px]"
                        >
                          {item.lines[0]}
                        </a>
                      ) : (
                        item.lines.map((line) => (
                          <p
                            key={line}
                            className="m-0 text-[16px] font-normal leading-[1.55] tracking-[-0.015em] text-[#777777] max-[1180px]:text-[15px]"
                          >
                            {line}
                          </p>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Contact form section ==================== */}

      <section
        ref={formSectionRef}
        className="w-full bg-[#f1eee5] pb-[132px] pt-[110px] max-[1180px]:pb-[90px] max-[1180px]:pt-[106px] max-[900px]:pb-[92px] max-[900px]:pt-[84px] max-[640px]:pb-[72px] max-[640px]:pt-[66px]"
      >
        <div className="site-container">
          {/* ==================== Form section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-out ${
              formVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[22px] opacity-0"
            }`}
          >
            <p className="section-label">//02</p>

            <p className="section-label">/Form</p>
          </div>

          {/* ==================== Form content ==================== */}

          <div className="mt-[88px] grid grid-cols-[0.78fr_1.22fr] items-start gap-[110px] max-[1400px]:gap-[76px] max-[1180px]:gap-[58px] max-[900px]:mt-[66px] max-[900px]:grid-cols-1 max-[900px]:gap-[68px] max-[640px]:mt-[52px] max-[640px]:gap-[54px]">
            {/* ==================== Form introduction ==================== */}

            <div
              className={`transition-all delay-[100ms] duration-[950ms] ease-out ${
                formVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-[38px] opacity-0"
              }`}
            >
              <h2 className="display-serif-font m-0 max-w-[540px] text-[clamp(66px,5.3vw,78px)] font-normal lowercase leading-[1.08] tracking-[-0.055em] text-[#171717] max-[1180px]:text-[clamp(58px,5.8vw,78px)] max-[900px]:text-[58px] max-[640px]:max-w-[390px] max-[640px]:text-[46px] max-[420px]:text-[42px]">
                <span className="block">
                  tell us what
                </span>

                <span className="block">
                  you have in mind
                </span>
              </h2>

              <p className="section-copy pt-6  mt-[54px] max-w-[455px] max-[1180px]:mt-[42px] max-[640px]:mt-8">
                Looking for the right piece, checking
                an order, or planning a room? Share a
                few details and our team will reply
                within one to two business days.
              </p>
            </div>

            {/* ==================== Contact form ==================== */}

            <form
              onSubmit={handleSubmit}
              className={`grid grid-cols-2 gap-x-[34px] gap-y-[42px] transition-all delay-[180ms] duration-[950ms] ease-out max-[640px]:grid-cols-1 max-[640px]:gap-y-8 ${
                formVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[38px] opacity-0"
              }`}
            >
              {/* ==================== First name ==================== */}

              <label className="block">
                <span className="block text-[15px] font-semibold leading-none tracking-[-0.02em] text-[#171717]">
                  First Name*
                </span>

                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleFieldChange}
                  placeholder="First name"
                  className="contact-form-control mt-[20px] h-[42px] w-full border-0 border-b border-[#cdc8bd] bg-transparent px-0 pb-[14px] text-[14px] font-normal text-[#171717] outline-none placeholder:text-[#8a877f] focus:border-[#171717]"
                />
              </label>

              {/* ==================== Last name ==================== */}

              <label className="block">
                <span className="block text-[15px] font-semibold leading-none tracking-[-0.02em] text-[#171717]">
                  Last Name*
                </span>

                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleFieldChange}
                  placeholder="Last name"
                  className="contact-form-control mt-[20px] h-[42px] w-full border-0 border-b border-[#cdc8bd] bg-transparent px-0 pb-[14px] text-[14px] font-normal text-[#171717] outline-none placeholder:text-[#8a877f] focus:border-[#171717]"
                />
              </label>

              {/* ==================== Email address ==================== */}

              <label className="block">
                <span className="block text-[15px] font-semibold leading-none tracking-[-0.02em] text-[#171717]">
                  E-mail*
                </span>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder="your@email.com"
                  className="contact-form-control mt-[20px] h-[42px] w-full border-0 border-b border-[#cdc8bd] bg-transparent px-0 pb-[14px] text-[14px] font-normal text-[#171717] outline-none placeholder:text-[#8a877f] focus:border-[#171717]"
                />
              </label>

              {/* ==================== Subject selection ==================== */}

              <label className="block">
                <span className="block text-[15px] font-semibold leading-none tracking-[-0.02em] text-[#171717]">
                  Subject*
                </span>

                <span className="relative mt-[20px] block">
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleFieldChange}
                    className="contact-form-select h-[42px] w-full appearance-none border-0 border-b border-[#cdc8bd] bg-transparent px-0 pb-[14px] pr-8 text-[14px] font-normal text-[#8a877f] outline-none focus:border-[#171717]"
                  >
                    <option value="" disabled>
                      Select subject
                    </option>

                    <option value="furniture-guidance">
                      Furniture guidance
                    </option>

                    <option value="existing-order">
                      Existing order
                    </option>

                    <option value="delivery">
                      Delivery and assembly
                    </option>

                    <option value="styling">
                      Styling consultation
                    </option>

                    <option value="partnership">
                      Trade and partnerships
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute right-0 top-[4px] text-[#4f4d48]"
                  />
                </span>
              </label>

              {/* ==================== Message field ==================== */}

              <label className="col-span-2 block max-[640px]:col-span-1">
                <span className="block text-[15px] font-semibold leading-none tracking-[-0.02em] text-[#171717]">
                  Message*
                </span>

                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleFieldChange}
                  placeholder="Tell us a little about your space or enquiry..."
                  className="contact-form-control mt-[20px] min-h-[128px] w-full resize-none border-0 border-b border-[#cdc8bd] bg-transparent px-0 pb-[16px] text-[14px] font-normal leading-[1.6] text-[#171717] outline-none placeholder:text-[#8a877f] focus:border-[#171717]"
                />
              </label>

              {/* ==================== Form submit action ==================== */}

              <div className="col-span-2 flex items-center gap-5 max-[640px]:col-span-1 max-[640px]:flex-col max-[640px]:items-start">
                <button
                  type="submit"
                  className="group inline-flex h-[52px] min-w-[178px] cursor-pointer items-center justify-center gap-[14px] border border-[#171717] bg-[#171717] px-[22px] text-[12px] font-semibold uppercase leading-none tracking-[-0.005em] text-white transition-all duration-300 hover:-translate-y-[3px] hover:bg-transparent hover:text-[#171717]"
                >
                  <span>Send Inquiry</span>

                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p
                  aria-live="polite"
                  className={`m-0 max-w-[330px] text-[13px] leading-[1.5] text-[#5d5a54] transition-opacity duration-300 ${
                    submitted
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  Thanks for reaching out. A member of
                  our team will be in touch shortly.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== FAQ section ==================== */}

      <section
        id="faq"
        ref={faqSectionRef}
        className="contact-faq-section w-full scroll-mt-6 bg-[#fbfbf9] pb-[120px] pt-[120px] max-[1180px]:pb-[120px] max-[1180px]:pt-[104px] max-[900px]:pb-[96px] max-[900px]:pt-[84px] max-[640px]:pb-[74px] max-[640px]:pt-[66px]"
      >
        <div className="site-container">
          {/* ==================== FAQ section labels ==================== */}

          <div
            className={`flex items-center justify-between transition-all duration-[900ms] ease-out ${
              faqVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[22px] opacity-0"
            }`}
          >
            <p className="section-label">//03</p>

            <p className="section-label">/FAQs</p>
          </div>

          {/* ==================== FAQ heading and description ==================== */}

          <div
            className={`mx-auto mt-[88px] flex max-w-[1160px] flex-col items-center text-center transition-all delay-[100ms] duration-[950ms] ease-out max-[900px]:mt-[68px] max-[640px]:mt-[52px] ${
              faqVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[34px] opacity-0"
            }`}
          >
            <h2 className="display-serif-font m-0 max-w-[1100px] text-center text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.08] tracking-[-0.055em] text-[#171717] max-[900px]:text-[58px] max-[640px]:text-[46px] max-[420px]:text-[42px]">
              a few helpful answers
            </h2>

            <p className="section-copy mx-auto mt-[30px] max-w-[700px] pt-6 text-center max-[640px]:mt-[22px]">
              Everything you may want to know before
              choosing, ordering, or styling your next
              piece.
            </p>
          </div>

          {/* ==================== FAQ accordion ==================== */}

          <div
            className={`mx-auto mt-[76px] w-full max-w-[940px] transition-all delay-[180ms] duration-[950ms] ease-out max-[900px]:mt-[60px] max-[900px]:max-w-[760px] max-[640px]:mt-[46px] ${
              faqVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[38px] opacity-0"
            }`}
          >
            {faqItems.map((item, index) => {
              const isOpen = openFaq === item.id;
              const isLastItem =
                index === faqItems.length - 1;

              return (
                <article
                  key={item.id}
                  className={
                    isLastItem
                      ? ""
                      : "border-b border-[#d8d8d4]"
                  }
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    onClick={() =>
                      setOpenFaq((currentFaq) =>
                        currentFaq === item.id
                          ? null
                          : item.id
                      )
                    }
                    className="group flex w-full cursor-pointer items-center justify-between gap-8 border-0 bg-transparent px-[26px] py-[30px] text-left text-[#171717] max-[640px]:gap-5 max-[640px]:px-0 max-[640px]:py-[24px]"
                  >
                    <span className="text-[17px] font-medium uppercase leading-[1.3] tracking-[-0.025em] max-[900px]:text-[16px] max-[640px]:text-[14px]">
                      {item.question}
                    </span>

                    <ChevronDown
                      size={21}
                      strokeWidth={1.55}
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-answer-${item.id}`}
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="m-0 px-[26px] pb-[30px] text-[16px] font-normal leading-[1.65] tracking-[-0.015em] text-[#777777] max-[900px]:text-[15px] max-[640px]:px-0 max-[640px]:pb-[24px] max-[640px]:text-[14px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== Redesign call to action ==================== */}

      <RedesignCTA />
    </div>
  );
};

export default Contact;