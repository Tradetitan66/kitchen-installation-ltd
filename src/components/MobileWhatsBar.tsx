import { whatsappLink } from "../lib/business";
import WhatsAppIcon from "./WhatsAppIcon";

export default function MobileWhatsBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.25)] md:hidden">
      <a
        href={whatsappLink("Hi Kitchen Installation Team, I'd like a kitchen quote.")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cta flex w-full items-center justify-center gap-2.5 py-4 text-base font-semibold"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Get a kitchen quote on WhatsApp
      </a>
    </div>
  );
}