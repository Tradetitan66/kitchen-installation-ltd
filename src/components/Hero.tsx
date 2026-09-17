import { BUSINESS } from "../lib/business";
import WhatsAppIcon from "./WhatsAppIcon";
import Stars from "./Stars";
import { useEnquiry } from "../context/enquiry";

export default function Hero() {
  const { openEnquiry } = useEnquiry();
  return (
    <section id="top" className="relative" aria-label="Introduction">
      <div className="relative h-[78vh] max-h-[640px] min-h-[480px] w-full overflow-hidden">
        <img
          src="/images/hero-kitchen.png"
          alt="A recently fitted kitchen designed and installed by Kitchen Installation Team in Bonnyrigg"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container-site absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-brand/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-sm">
            Kitchen Installation &amp; Renovation
            <span className="hidden text-white/70 sm:inline">&middot;</span>
            <span className="rounded-full bg-paper/20 px-2.5 py-0.5 text-white/90">
              Bonnyrigg
            </span>
          </p>
          <h1 className="h1-display mt-5 max-w-3xl text-white sm:text-5xl md:text-6xl">
            A kitchen you&rsquo;ll love coming home to
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Kitchen installation and full renovations in Bonnyrigg, Midlothian
            planned, fitted and finished by one team.
          </p>
          <button
            type="button"
            onClick={openEnquiry}
            className="btn-cta mt-8 w-auto px-6 py-3 text-sm sm:px-8 sm:py-3.5 sm:text-lg"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Get a kitchen quote on WhatsApp
          </button>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
            <Stars className="h-4 w-4" />
            <span>
              Rated {BUSINESS.rating} on Google &middot; {BUSINESS.reviewCount} reviews
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}