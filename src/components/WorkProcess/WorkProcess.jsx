import { useEffect, useRef, useState } from "react";

import "./WorkProcess.css";

const processSteps = [
  {
    id: 1,
    title: "Browse Our Curated Collection",
    description:
      "Explore thoughtfully selected furniture and decor designed for different rooms, styles, and everyday needs. Discover pieces that feel personal, practical, and beautifully considered.",
  },
  {
    id: 2,
    title: "Select The Right Pieces",
    description:
      "Compare materials, finishes, dimensions, and design details to choose pieces that complement your space, lifestyle, and personal taste.",
  },
  {
    id: 3,
    title: "Review And Confirm",
    description:
      "Check your selected products, confirm the necessary information, and complete your purchase through a clear and secure checkout experience.",
  },
  {
    id: 4,
    title: "Delivered To Your Home",
    description:
      "Your order is carefully prepared, dispatched, and delivered with attention at every step, creating a smooth experience from our collection to your space.",
  },
];

const TAB_DURATION = 5000;
const TIMER_INTERVAL = 40;
const TIMER_INCREMENT = (TIMER_INTERVAL / TAB_DURATION) * 100;

const WorkProcess = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeStep = processSteps[activeIndex];

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
        threshold: 0.18,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* ==================== Automatic tab timer ==================== */

  useEffect(() => {
    if (!visible || isPaused) return;

    const timer = window.setInterval(() => {
      const nextProgress = progressRef.current + TIMER_INCREMENT;

      if (nextProgress >= 100) {
        progressRef.current = 0;
        setTimerProgress(0);

        setActiveIndex(
          (currentIndex) => (currentIndex + 1) % processSteps.length
        );

        return;
      }

      progressRef.current = nextProgress;
      setTimerProgress(nextProgress);
    }, TIMER_INTERVAL);

    return () => window.clearInterval(timer);
  }, [visible, isPaused]);

  /* ==================== Tab navigation ==================== */

  const resetTimer = () => {
    progressRef.current = 0;
    setTimerProgress(0);
  };

  const handleTabChange = (index) => {
    setActiveIndex(index);
    resetTimer();
  };

  const handleKeyDown = (event, index) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % processSteps.length;
    }

    if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + processSteps.length) % processSteps.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = processSteps.length - 1;
    }

    if (nextIndex === index) return;

    event.preventDefault();
    handleTabChange(nextIndex);

    window.requestAnimationFrame(() => {
      document
        .getElementById(`work-process-tab-${nextIndex}`)
        ?.focus();
    });
  };

  const handleProcessBlur = (event) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      !nextFocusedElement ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setIsPaused(false);
    }
  };

  const remainingSeconds = Math.max(
    1,
    Math.ceil((TAB_DURATION * (1 - timerProgress / 100)) / 1000)
  );

  const topReveal = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-[26px] opacity-0";

  const titleReveal = visible
    ? "translate-x-0 opacity-100"
    : "-translate-x-[34px] opacity-0";

  const processReveal = visible
    ? "translate-x-0 opacity-100"
    : "translate-x-[34px] opacity-0";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f3f0e8] py-[108px] max-[1180px]:py-[88px] max-[900px]:py-[70px] max-[640px]:py-[54px]"
    >
      <div className="site-container">
        {/* ==================== Section labels ==================== */}

        <div
          className={`mb-[64px] flex items-center justify-between transition-all duration-[800ms] ease-out max-[900px]:mb-[48px] max-[640px]:mb-[38px] ${topReveal}`}
        >
          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            //05
          </p>

          <p className="m-0 font-['Inter',sans-serif] text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            /Work Process
          </p>
        </div>

        {/* ==================== Process section content ==================== */}

        <div className="grid grid-cols-[0.88fr_1.12fr] items-start gap-[86px] max-[1280px]:gap-[64px] max-[1024px]:gap-[48px] max-[900px]:grid-cols-1 max-[900px]:gap-[46px] max-[640px]:gap-[34px]">
          {/* ==================== Section heading ==================== */}

          <div
            className={`pt-[20px] transition-all delay-[120ms] duration-[900ms] ease-out max-[900px]:pt-0 ${titleReveal}`}
          >
            <h2 className="work-process-title-font m-0 max-w-[600px] text-[clamp(68px,5.2vw,78px)] font-normal lowercase leading-[1.25] tracking-[-0.055em] text-[#111111] max-[1180px]:text-[clamp(58px,5.5vw,76px)] max-[900px]:max-w-[720px] max-[900px]:text-[58px] max-[640px]:max-w-[360px] max-[640px]:text-[46px] max-[640px]:leading-[1.06] max-[420px]:text-[42px]">
              a seamless
              <br />
              experience made
              <br />
              for you
            </h2>
          </div>

          {/* ==================== Interactive process tabs ==================== */}

          <div
            className={`w-full transition-all delay-[220ms] duration-[900ms] ease-out ${processReveal}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={handleProcessBlur}
          >
            {/* ==================== Process tab numbers ==================== */}

            <div
              role="tablist"
              aria-label="Work process steps"
              className="grid grid-cols-4 overflow-hidden border border-[#d8d6d0] border-b-0"
            >
              {processSteps.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={step.id}
                    id={`work-process-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`work-process-panel-${index}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleTabChange(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className={`group relative flex h-[154px] min-w-0 items-center justify-center overflow-hidden border-0 border-r border-[#d8d6d0] p-0 font-['Inter',sans-serif] outline-none transition-colors duration-500 last:border-r-0 max-[1180px]:h-[138px] max-[1024px]:h-[124px] max-[900px]:h-[118px] max-[640px]:h-[88px] max-[420px]:h-[78px] ${
                      isActive
                        ? "bg-[#817d73] text-white"
                        : "bg-[#f8f8f6] text-[#5e5e5e] hover:bg-[#efede7] hover:text-[#242424]"
                    }`}
                  >
                    <span className="relative z-10 block text-[clamp(50px,4.5vw,60px)] font-normal leading-none tracking-[-0.065em] max-[1180px]:text-[64px] max-[900px]:text-[54px] max-[640px]:text-[38px] max-[420px]:text-[34px]">
                      {String(step.id).padStart(2, "0")}
                    </span>

                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 z-20 h-[3px] bg-[#ede9df] transition-[width] duration-[40ms] ease-linear"
                        style={{
                          width: `${timerProgress}%`,
                        }}
                      />
                    )}

                    <span className="pointer-events-none absolute inset-0 translate-y-full bg-black/[0.035] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  </button>
                );
              })}
            </div>

            {/* ==================== Active process information ==================== */}

            <div className="relative min-h-[390px] overflow-hidden border border-[#d8d6d0] bg-[#f8f8f6] px-[50px] py-[70px] max-[1180px]:min-h-[360px] max-[1180px]:px-10 max-[1180px]:py-[58px] max-[900px]:min-h-[330px] max-[900px]:px-[42px] max-[900px]:py-[54px] max-[640px]:min-h-[320px] max-[640px]:px-[24px] max-[640px]:py-[36px] max-[420px]:min-h-[306px] max-[420px]:px-5 max-[420px]:py-8">
              <div
                key={activeStep.id}
                id={`work-process-panel-${activeIndex}`}
                role="tabpanel"
                aria-labelledby={`work-process-tab-${activeIndex}`}
                aria-live="polite"
                className="work-process-panel-animation relative z-10"
              >
                <p className="m-0 font-['Inter',sans-serif] text-[14px]  font-medium uppercase leading-none tracking-[0.1em] text-[#817d73] max-[640px]:text-[12px]">
                  Step {String(activeStep.id).padStart(2, "0")}
                </p>

                <h3 className="pt-5 mb-0 mt-[25px] max-w-[590px] font-['Inter',sans-serif] text-[28px] font-medium uppercase leading-[1.16] tracking-[-0.045em] text-[#171717] max-[1180px]:text-[30px] max-[640px]:mt-5 max-[640px]:text-[24px] max-[640px]:leading-[1.2] max-[420px]:text-[21px]">
                  {activeStep.title}
                </h3>

                <p className="pt-5 mb-0 mt-[30px] max-w-[640px] font-['Inter',sans-serif] text-[18px] font-normal leading-[1.6] tracking-[-0.02em] text-[#78746c] max-[1180px]:text-[17px] max-[640px]:mt-6 max-[640px]:text-[15px] max-[640px]:leading-[1.65]">
                  {activeStep.description}
                </p>
              </div>

              {/* ==================== Decorative process number ==================== */}

              <span className="pointer-events-none absolute bottom-[-32px] right-[22px] select-none font-['Inter',sans-serif] text-[154px] font-normal leading-none tracking-[-0.08em] text-[#817d73]/[0.04] max-[640px]:bottom-[-18px] max-[640px]:right-3 max-[640px]:text-[104px]">
                {String(activeStep.id).padStart(2, "0")}
              </span>
            </div>

            {/* ==================== Mobile timer information ==================== */}

            <div className="mt-4 hidden items-center justify-between border-t border-[#d8d6d0] pt-4 max-[640px]:flex">
              <span className="font-['Inter',sans-serif] text-[11px] font-medium uppercase tracking-[0.08em] text-[#77736b]">
                {isPaused ? "Process paused" : "Auto-changing process"}
              </span>

              <span className="font-['Inter',sans-serif] text-[11px] font-medium tracking-[0.04em] text-[#77736b]">
                {remainingSeconds}s
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;