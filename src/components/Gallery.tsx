import { useState, useCallback, useRef, useEffect } from "react";

const SLIDES = [
  {
    src: "/images/gallery-1.webp",
    alt: "A newly fitted kitchen with flat-panel white units and a light countertop",
  },
  {
    src: "/images/gallery-2.webp",
    alt: "A fitted kitchen with cabinets and worktops installed",
  },
  {
    src: "/images/gallery-3.webp",
    alt: "A completed kitchen installation with darker units and wood-toned worktop",
  },
  {
    src: "/images/gallery-4.webp",
    alt: "A modern fitted kitchen with integrated appliances",
  },
  {
    src: "/images/gallery-5.webp",
    alt: "A kitchen renovation project with tiled splashback",
  },
  {
    src: "/images/gallery-6.webp",
    alt: "A recent kitchen fitting with new units and worktop",
  },
  {
    src: "/images/gallery-7.webp",
    alt: "A newly installed kitchen with fitted units",
  },
  {
    src: "/images/gallery-8.webp",
    alt: "A recently fitted kitchen with shaker-style doors and pendant lighting",
  },
] as const;

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const slideCount = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const bounded = Math.max(0, Math.min(index, slideCount - 1));
      el.scrollTo({ left: bounded * el.clientWidth, behavior: "smooth" });
    },
    [slideCount],
  );

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active) setActive(Math.max(0, Math.min(index, slideCount - 1)));
  }, [active, slideCount]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    const onResize = () => handleScroll();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => goTo((active + 1) % slideCount), 3000);
    return () => clearInterval(id);
  }, [paused, active, goTo, slideCount]);

  return (
    <section id="our-work" className="section-pad bg-paper" aria-label="Our work">
      <div className="container-site">
        <h2 className="heading-serif text-center text-3xl text-ink sm:text-4xl">
          Our work
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-ink-muted sm:text-lg">
          Recent kitchen installations and renovations fitted for homes around
          Bonnyrigg.
        </p>
      </div>

      <div className="container-site mt-10 sm:mt-12">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Photos of our kitchen work"
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Scrollable photo gallery, use left and right arrow keys to browse"
          >
            {SLIDES.map((slide, i) => (
              <figure
                key={slide.src}
                className="w-full shrink-0 snap-center sm:w-[85%]"
                aria-hidden={i !== active}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
                />
              </figure>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand bg-white text-brand transition-colors hover:bg-brand hover:text-white disabled:opacity-40"
              aria-label="Previous photo"
              disabled={active === 0}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Choose a photo">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Photo ${i + 1} of ${slideCount}`}
                  onClick={() => goTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === active ? "bg-brand" : "bg-line hover:bg-brand/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand bg-white text-brand transition-colors hover:bg-brand hover:text-white disabled:opacity-40"
              aria-label="Next photo"
              disabled={active === slideCount - 1}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}