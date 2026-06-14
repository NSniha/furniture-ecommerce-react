import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import "./Footer.css";

const footerLinks = [
  {
    id: 1,
    label: "Home",
    path: "/",
    end: true,
  },
  {
    id: 2,
    label: "About Us",
    path: "/about",
  },
  {
    id: 3,
    label: "Shop All",
    path: "/shop",
  },
  {
    id: 4,
    label: "Contact",
    path: "/contact",
  },
  {
    id: 5,
    label: "FAQ",
    path: "/contact#faq",
    hash: "#faq",
  },
];

const socialLinks = [
  {
    id: 1,
    label: "Instagram",
    url: "https://www.instagram.com/",
  },
  {
    id: 2,
    label: "Facebook",
    url: "https://www.facebook.com/",
  },
  {
    id: 3,
    label: "Twitter/X",
    url: "https://x.com/",
  },
  {
    id: 4,
    label: "Pinterest",
    url: "https://www.pinterest.com/",
  },
];

const Footer = () => {
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentYear = new Date().getFullYear();

  /* ==================== Newsletter submission ==================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    setSubmitted(true);
    setEmail("");
  };

  /* ==================== Footer link active state ==================== */

  const isFooterLinkActive = (link) => {
    if (link.path === "/") {
      return location.pathname === "/" && !location.hash;
    }

    if (link.hash) {
      return (
        location.pathname === "/contact" &&
        location.hash === link.hash
      );
    }

    if (link.path === "/contact") {
      return (
        location.pathname === "/contact" &&
        location.hash !== "#faq"
      );
    }

    return location.pathname === link.path;
  };

  return (
    <footer className="w-full overflow-hidden bg-[#767064] font-['Inter',sans-serif] text-white">
      <div className="site-container flex min-h-[900px] flex-col pt-16 pb-10 max-[1180px]:min-h-[820px] max-[1180px]:py-11 max-[900px]:min-h-0 max-[900px]:py-[60px] max-[640px]:py-12">
        {/* ==================== Newsletter and navigation ==================== */}

        <div className="grid grid-cols-[minmax(0,1fr)_240px] items-start gap-20 max-[1180px]:grid-cols-[minmax(0,1fr)_210px] max-[1180px]:gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-[58px] max-[640px]:gap-12">
          {/* ==================== Newsletter content ==================== */}

          <div>
            <h2 className="m-0 max-w-[860px] text-[36px] font-normal uppercase leading-[1.24] tracking-[-0.035em] text-white max-[1180px]:max-w-[700px] max-[1180px]:text-[32px] max-[900px]:max-w-[760px] max-[640px]:text-[26px] max-[640px]:leading-[1.3] max-[420px]:text-[23px]">
              Sign up for exclusive offers, design tips,
              <br className="max-[640px]:hidden" />
              and early access to new arrivals.
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-[70px] flex h-12 w-[338px] items-center border-b border-white/60 max-[900px]:mt-[52px] max-[640px]:mt-10 max-[640px]:w-full max-[640px]:max-w-[390px]"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitted(false);
                }}
                placeholder="Enter Your Email Address"
                className="footer-email-input h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[18px] font-normal tracking-[-0.015em] text-white outline-none placeholder:text-white/60 max-[640px]:text-[16px]"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="group ml-4 inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-end border-0 bg-transparent p-0 text-white/70 transition-colors duration-300 hover:text-white"
              >
                <ArrowRight
                  size={30}
                  strokeWidth={1.35}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <span className="sr-only" aria-live="polite">
                {submitted
                  ? "Subscription submitted successfully."
                  : ""}
              </span>
            </form>
          </div>

          {/* ==================== Footer navigation ==================== */}

          <nav aria-label="Footer navigation">
            <ul className="m-0 flex list-none flex-col gap-7 p-0 max-[900px]:grid max-[900px]:grid-cols-3 max-[900px]:gap-x-8 max-[900px]:gap-y-5 max-[640px]:grid-cols-2">
              {footerLinks.map((link) => {
                const isActive = isFooterLinkActive(link);

                return (
                  <li key={link.id}>
                    <NavLink
                      to={link.path}
                      end={link.end}
                      className={`inline-block text-[21px] font-normal uppercase leading-none tracking-[-0.025em] no-underline transition-all duration-300 hover:translate-x-1 hover:text-white max-[1180px]:text-[20px] max-[640px]:text-[17px] ${
                        isActive
                          ? "text-white"
                          : "text-white/60"
                      }`}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* ==================== Large footer brand ==================== */}

        <div className="mt-auto max-[900px]:mt-[110px] max-[640px]:mt-[84px]">
          <p className="footer-brand-text m-0 whitespace-nowrap text-center text-[clamp(170px,19vw,300px)] font-normal uppercase leading-[0.98] tracking-[-0.065em] text-white max-[1180px]:text-[clamp(130px,16.5vw,210px)] max-[900px]:text-[clamp(90px,16vw,145px)] max-[640px]:text-[clamp(58px,18vw,102px)]">
            Decorist
          </p>
        </div>

        {/* ==================== Social links ==================== */}

        <div className="mt-[72px] grid min-h-[74px] grid-cols-4 items-center border-y border-white/30 max-[1180px]:mt-[62px] max-[900px]:mt-[54px] max-[640px]:grid-cols-2">
          {socialLinks.map((social, index) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex h-full min-h-[72px] items-center justify-center text-[22px] font-normal uppercase leading-none tracking-[-0.025em] text-white/70 no-underline transition-colors duration-300 hover:text-white max-[1180px]:text-[19px] max-[640px]:min-h-[58px] max-[640px]:text-[15px] ${
                index >= 2
                  ? "max-[640px]:border-t max-[640px]:border-white/20"
                  : ""
              }`}
            >
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                {social.label}
              </span>
            </a>
          ))}
        </div>

        {/* ==================== Copyright information ==================== */}

        <p className="mb-0 mt-[31px] pt-12 text-center text-[18px] font-normal leading-none tracking-[-0.015em] text-white/50 max-[640px]:mt-7 max-[640px]:text-[14px]">
          ©{currentYear} Decorist. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;