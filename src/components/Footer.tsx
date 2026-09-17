import { BUSINESS, whatsappLink } from "../lib/business";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">
              {BUSINESS.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Kitchen installation and full renovations, fitted for homes across
              Bonnyrigg and Midlothian.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a
                  href={`tel:${BUSINESS.phoneIntl}`}
                  className="transition-colors hover:text-white"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>{BUSINESS.address}</li>
              <li>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
                >
                  Find us on Google Maps
                </a>
              </li>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <a
              href={whatsappLink("Hi Kitchen Installation Team, I'd like a kitchen quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta px-6 py-3 text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Get a kitchen quote
            </a>
            <p className="mt-4 text-xs text-white/60">
              Tradesman &middot; {BUSINESS.phoneDisplay}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. Kitchen
            installation &amp; renovation in Bonnyrigg, Scotland.
          </p>
        </div>
      </div>
    </footer>
  );
}