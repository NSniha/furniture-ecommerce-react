import { useEffect, useRef, useState } from "react";
import "./WorkProcess.css";

const processSteps = [
  {
    id: 1,
    title: "Browse Our Curated Designs",
    description:
      "Discover a curated collection of designs for every taste and lifestyle. Whether you prefer modern, classic, or eclectic styles, find the perfect pieces to suit your personality and elevate your space.",
  },
  {
    id: 2,
    title: "Choose Your Perfect Pieces",
    description:
      "Explore materials, finishes, dimensions, and thoughtful details to select furniture and decor that perfectly complement your space and personal style.",
  },
  {
    id: 3,
    title: "Confirm Your Order",
    description:
      "Review your selected products, confirm the required details, and complete your purchase through a simple and secure checkout experience.",
  },
  {
    id: 4,
    title: "Delivery To Your Space",
    description:
      "Your carefully selected pieces are prepared, dispatched, and delivered with attention to detail, ensuring a smooth experience from our store to your home.",
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

  useEffect(() => {
    if (!visible || isPaused) return;

    const timer = window.setInterval(() => {
      const nextProgress = progressRef.current + TIMER_INCREMENT;

      if (nextProgress >= 100) {
        progressRef.current = 0;
        setTimerProgress(0);

        setActiveIndex((currentIndex) => {
          return (currentIndex + 1) % processSteps.length;
        });

        return;
      }

      progressRef.current = nextProgress;
      setTimerProgress(nextProgress);
    }, TIMER_INTERVAL);

    return () => window.clearInterval(timer);
  }, [visible, isPaused]);

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
    Math.ceil(
      (TAB_DURATION * (1 - timerProgress / 100)) / 1000
    )
  );

  const topReveal = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-[26px]";

  const titleReveal = visible
    ? "opacity-100 translate-x-0"
    : "opacity-0 -translate-x-[34px]";

  const processReveal = visible
    ? "opacity-100 translate-x-0"
    : "opacity-0 translate-x-[34px]";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#f3f0e8] py-[108px] max-[1180px]:py-[88px] max-[900px]:py-[70px] max-[640px]:py-[54px]"
    >
      <div className="mx-auto w-[min(calc(100%_-_96px),1380px)] max-[1180px]:w-[min(calc(100%_-_72px),1180px)] max-[900px]:w-[min(calc(100%_-_40px),860px)] max-[640px]:w-[min(calc(100%_-_28px),560px)]">
        {/* Top Labels */}
        <div
          className={`mb-[52px] flex items-center justify-between transition-all duration-[800ms] ease-out max-[900px]:mb-[46px] max-[640px]:mb-[38px] ${topReveal}`}
        >
          <p className="m-0 text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            //05
          </p>

          <p className="m-0 text-[18px] font-normal leading-none tracking-[-0.025em] text-[#5f5f5f] max-[640px]:text-[15px]">
            /Work Process
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-[0.92fr_1.08fr] items-start gap-[86px] max-[1180px]:gap-[58px] max-[900px]:grid-cols-1 max-[900px]:gap-[54px] max-[640px]:gap-10">
          {/* Left Heading */}
          <div
            className={`pt-[22px] transition-all delay-[120ms] duration-[900ms] ease-out max-[900px]:pt-0 ${titleReveal}`}
          >
            <h2 className="work-process-title-font m-0 max-w-[590px] text-[clamp(68px,5.25vw,88px)] font-normal lowercase leading-[1.38] tracking-[-0.055em] text-[#111111] max-[1180px]:text-[clamp(58px,5.5vw,76px)] max-[900px]:max-w-[700px] max-[900px]:text-[clamp(58px,10vw,78px)] max-[900px]:leading-[1.2] max-[640px]:text-[clamp(46px,14vw,62px)] max-[640px]:leading-[1.16] max-[420px]:text-[44px]">
              a seamless
              <br />
              experience made
              <br />
              for you
            </h2>
          </div>

          {/* Process Area */}
          <div
            className={`w-full transition-all delay-[220ms] duration-[900ms] ease-out ${processReveal}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={handleProcessBlur}
          >
            {/* Tab Numbers */}
            <div
              role="tablist"
              aria-label="Work process steps"
              className="grid grid-cols-4 border-b border-[#d8d6d0]"
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
                    onKeyDown={(event) =>
                      handleKeyDown(event, index)
                    }
                    className={`group relative flex h-[164px] items-center justify-center overflow-hidden border-0 border-r border-[#d8d6d0] p-0 text-[94px] font-normal leading-none tracking-[-0.065em] outline-none transition-colors duration-500 last:border-r-0 max-[1180px]:h-[146px] max-[1180px]:text-[82px] max-[900px]:h-[130px] max-[900px]:text-[72px] max-[640px]:h-[88px] max-[640px]:text-[48px] max-[420px]:h-[76px] max-[420px]:text-[40px] ${
                      isActive
                        ? "bg-[#817d73] text-white"
                        : "bg-[#f8f8f6] text-[#5e5e5e] hover:bg-[#efede7] hover:text-[#242424]"
                    }`}
                  >
                    <span className="relative z-10">
                      {String(step.id).padStart(2, "0")}
                    </span>

                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 z-20 h-[3px] bg-[#e9e5dc] transition-[width] duration-[40ms] ease-linear"
                        style={{ width: `${timerProgress}%` }}
                      />
                    )}

                    <span className="pointer-events-none absolute inset-0 translate-y-full bg-black/[0.035] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  </button>
                );
              })}
            </div>

            {/* Active Process Content */}
            <div className="relative min-h-[374px] overflow-hidden bg-[#f8f8f6] px-[48px] py-[74px] max-[1180px]:min-h-[340px] max-[1180px]:px-10 max-[1180px]:py-[60px] max-[900px]:min-h-[320px] max-[900px]:px-[42px] max-[900px]:py-[58px] max-[640px]:min-h-[310px] max-[640px]:px-6 max-[640px]:py-10">
              <div
                key={activeStep.id}
                id={`work-process-panel-${activeIndex}`}
                role="tabpanel"
                aria-labelledby={`work-process-tab-${activeIndex}`}
                className="work-process-panel-animation"
              >
                <p className="m-0 text-[15px] font-medium uppercase leading-none tracking-[0.08em] text-[#817d73]">
                  Step {String(activeStep.id).padStart(2, "0")}
                </p>

                <h3 className="mb-0 mt-[28px] text-[36px] font-medium uppercase leading-[1.15] tracking-[-0.045em] text-[#171717] max-[1180px]:text-[32px] max-[640px]:mt-[22px] max-[640px]:text-[25px] max-[420px]:text-[22px]">
                  {activeStep.title}
                </h3>

                <p className="mb-0 mt-[34px] max-w-[650px] text-[19px] font-normal leading-[1.55] tracking-[-0.025em] text-[#78746c] max-[1180px]:text-[18px] max-[640px]:mt-[26px] max-[640px]:text-[16px] max-[640px]:leading-[1.6]">
                  {activeStep.description}
                </p>
              </div>

              {/* Decorative Background Number */}
              <span className="pointer-events-none absolute bottom-[-28px] right-5 select-none text-[150px] font-normal leading-none tracking-[-0.08em] text-[#817d73]/[0.035] max-[640px]:hidden">
                {String(activeStep.id).padStart(2, "0")}
              </span>
            </div>

            {/* Mobile Timer */}
            <div className="mt-4 hidden items-center justify-between max-[640px]:flex">
              <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#77736b]">
                {isPaused ? "Process paused" : "Auto-changing process"}
              </span>

              <span className="text-[12px] font-medium tracking-[0.04em] text-[#77736b]">
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