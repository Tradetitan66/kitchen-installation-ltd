import { BUSINESS } from "../lib/business";
import WhatsAppIcon from "./WhatsAppIcon";
import Stars from "./Stars";
import { useEnquiry } from "../context/enquiry";

export default function Hero() {
  const { openEnquiry } = useEnquiry();
  return (
    <section
      id="top"
      className="section-pad border-y border-line bg-white"
      aria-label="Introduction"
    >
      <div className="container-site flex flex-col items-center text-center">
        <p className="rise-in rounded-full border border-brand/30 bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white sm:text-sm">
          Kitchen Installation &amp; Renovation
        </p>
        <h1
          className="h1-display rise-in mt-5 max-w-3xl text-4xl text-ink sm:text-5xl md:text-6xl"
          style={{ animationDelay: "100ms" }}
        >
          A kitchen you&rsquo;ll love coming home to
        </h1>
        <p
          className="rise-in mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          Kitchen installation and full renovations in Bonnyrigg, Midlothian
          planned, fitted and finished by one team.
        </p>
        <button
          type="button"
          onClick={openEnquiry}
          className="btn-cta rise-in mt-8 w-auto px-6 py-3 text-sm sm:px-8 sm:py-3.5 sm:text-lg"
          style={{ animationDelay: "300ms" }}
        >
          <WhatsAppIcon className="h-5 w-5" />
          Get a kitchen quote on WhatsApp
        </button>
        <div
          className="rise-in mt-4 flex flex-col items-center gap-1.5 text-sm text-ink-muted"
          style={{ animationDelay: "400ms" }}
        >
          <Stars className="h-4 w-4" />
          <span>
            Rated {BUSINESS.rating} on Google &middot; {BUSINESS.reviewCount} reviews
          </span>
        </div>
      </div>
    </section>
  );
}