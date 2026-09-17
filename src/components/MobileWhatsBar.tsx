import WhatsAppIcon from "./WhatsAppIcon";
import { useEnquiry } from "../context/enquiry";

export default function MobileWhatsBar() {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.25)] md:hidden">
      <button
        type="button"
        onClick={openEnquiry}
        className="btn-cta flex w-full items-center justify-center gap-2.5 py-4 text-base font-semibold"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Get a kitchen quote on WhatsApp
      </button>
    </div>
  );
}