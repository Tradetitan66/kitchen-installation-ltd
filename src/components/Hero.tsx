import { BUSINESS, whatsappLink } from "../lib/business";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Hero() {
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
          <h1 className="h1-display max-w-3xl text-white sm:text-5xl md:text-6xl">
            A kitchen you&rsquo;ll love coming home to
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Kitchen installation and full renovations in Bonnyrigg, Midlothian
            planned, fitted and finished by one team.
          </p>
          <a
            href={whatsappLink("Hi Kitchen Installation Team, I'd like a kitchen quote.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta mt-8 w-full max-w-md px-7 py-4 text-base sm:w-auto sm:max-w-none sm:px-8 sm:py-3.5 sm:text-lg"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Get a kitchen quote on WhatsApp
          </a>
          <p className="mt-4 text-sm text-white/70">
            Rated {BUSINESS.rating} on Google &middot; {BUSINESS.reviewCount} reviews
          </p>
        </div>
      </div>
    </section>
  );
}