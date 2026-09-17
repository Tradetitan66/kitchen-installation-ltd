import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildEnquiryMessage,
  BUSINESS,
  PROJECT_TYPES,
  whatsappLink,
} from "../lib/business";
import { useEnquiry } from "../context/enquiry";
import WhatsAppIcon from "./WhatsAppIcon";

const FOCUSABLE =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FormData = {
  name: string;
  postcode: string;
  projectType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL: FormData = {
  name: "",
  postcode: "",
  projectType: PROJECT_TYPES[0],
  message: "",
};

function fieldClasses(invalid: boolean) {
  return `w-full rounded-lg border bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 ${
    invalid
      ? "border-[#a33] focus:border-[#a33] focus:ring-[#a33]/30"
      : "border-line focus:border-brand focus:ring-brand/30"
  }`;
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

export default function WhatsAppModal() {
  const { isOpen, closeEnquiry } = useEnquiry();
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const set = useCallback((field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }, []);

  // Body scroll lock + Escape + initial focus while open.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => nameInputRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      closeEnquiry();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeEnquiry]);

  // Clear fields shortly after the modal hides so nothing lingers.
  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setData(INITIAL), 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const node = dialogRef.current;
    if (!node) return;
    const focusables = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (!node.contains(active)) {
      e.preventDefault();
      first.focus();
      return;
    }
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.postcode.trim()) next.postcode = "Please enter your postcode.";
    if (!data.projectType) next.projectType = "Please choose the type of project.";
    if (!data.message.trim())
      next.message = "Please tell us a little about your project.";
    setErrors(next);

    const order: (keyof FormData)[] = ["name", "postcode", "projectType", "message"];
    const firstInvalid = order.find((f) => next[f]);
    if (firstInvalid) {
      const el = document.getElementById(`wam-${firstInvalid}`);
      (el as HTMLElement | null)?.focus();
    }
    return !firstInvalid;
  };

  const handleContinue = () => {
    if (!validate()) return;
    const url = whatsappLink(
      buildEnquiryMessage({
        name: data.name.trim(),
        postcode: data.postcode.trim(),
        projectType: data.projectType,
        message: data.message.trim(),
      }),
    );
    window.open(url, "_blank", "noopener,noreferrer");
    closeEnquiry();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Get a kitchen quote"
      onKeyDown={trapFocus}
      onClick={closeEnquiry}
    >
      <div
        ref={dialogRef}
        role="document"
        className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white text-ink shadow-2xl sm:max-h-[86vh] sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-dark px-4 py-3.5 text-white sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cta text-white">
              <WhatsAppIcon className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold leading-tight tracking-tight">
                Get a kitchen quote
              </h2>
              <p className="text-xs text-white/65">
                We&rsquo;ll open WhatsApp with your details ready to send.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeEnquiry}
            className="-mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close quote form"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:space-y-5 sm:px-7">
          <div>
            <label htmlFor="wam-name" className="mb-1.5 block text-sm font-semibold text-ink">
              Your name <span className="text-cta">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="wam-name"
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Sarah Miller"
              className={fieldClasses(!!errors.name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "wam-name-err" : undefined}
            />
            {errors.name && (
              <p id="wam-name-err" role="alert" className="mt-2 text-sm font-medium text-[#a33]">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="wam-postcode" className="mb-1.5 block text-sm font-semibold text-ink">
              Postcode <span className="text-cta">*</span>
            </label>
            <input
              id="wam-postcode"
              type="text"
              autoComplete="postal-code"
              value={data.postcode}
              onChange={(e) => set("postcode", e.target.value)}
              placeholder="e.g. EH23 4NG"
              className={fieldClasses(!!errors.postcode)}
              aria-invalid={!!errors.postcode}
              aria-describedby={errors.postcode ? "wam-postcode-err" : undefined}
            />
            {errors.postcode && (
              <p id="wam-postcode-err" role="alert" className="mt-2 text-sm font-medium text-[#a33]">
                {errors.postcode}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="wam-projectType" className="mb-1.5 block text-sm font-semibold text-ink">
              Type of project <span className="text-cta">*</span>
            </label>
            <select
              id="wam-projectType"
              value={data.projectType}
              onChange={(e) => set("projectType", e.target.value)}
              className={`${fieldClasses(!!errors.projectType)} focus:outline-none`}
              aria-invalid={!!errors.projectType}
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p role="alert" className="mt-2 text-sm font-medium text-[#a33]">
                {errors.projectType}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="wam-message" className="mb-1.5 block text-sm font-semibold text-ink">
              Tell us about your project <span className="text-cta">*</span>
            </label>
            <textarea
              id="wam-message"
              rows={3}
              value={data.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Room size, what you'd like changed, the look you're after…"
              className={`${fieldClasses(!!errors.message)} resize-none`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "wam-message-err" : undefined}
            />
            {errors.message && (
              <p id="wam-message-err" role="alert" className="mt-2 text-sm font-medium text-[#a33]">
                {errors.message}
              </p>
            )}
          </div>

          <p className="text-xs leading-relaxed text-ink-muted">
            You can also send photos once WhatsApp opens. No details are stored.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-line bg-paper px-5 py-4 sm:px-7 sm:py-5">
          <button
            type="button"
            onClick={handleContinue}
            className="btn-cta min-h-[52px] w-full px-6 py-3.5 text-base"
          >
            Continue to WhatsApp
            <ArrowUpRightIcon className="h-5 w-5" />
          </button>
          <p className="pt-3 text-center text-xs text-ink-muted">
            Prefer to talk?{" "}
            <a
              href={`tel:${BUSINESS.phoneIntl}`}
              className="inline-flex items-center gap-1 font-semibold text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              Call {BUSINESS.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}