import { BUSINESS } from "../lib/business";
import WhatsAppIcon from "./WhatsAppIcon";
import Stars from "./Stars";
import { useEnquiry } from "../context/enquiry";

export default function Hero() {
  const { openEnquiry } = useEnquiry();
  return (
    <section id="top" className="section-pad bg-white" aria-label="Introduction">
      <div className="container-site flex flex-col items-center text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
          Kitchen Installation &amp; Renovation
          <span className="hidden text-white/70 sm:inline">&middot;</span>
          <span className="rounded-full bg-white/25 px-2.5 py-0.5 text-white">
            Bonnyrigg
          </span>
        </p>
        <h1 className="h1-display mt-5 max-w-3xl text-4xl text-ink sm:text-5xl md:text-6xl">
          A kitchen you&rsquo;ll love coming home to
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
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
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink-muted">
          <Stars className="h-4 w-4" />
          <span>
            Rated {BUSINESS.rating} on Google &middot; {BUSINESS.reviewCount} reviews
          </span>
        </p>
      </div>
    </section>
  );
}