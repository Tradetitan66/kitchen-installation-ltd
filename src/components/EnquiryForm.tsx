import { FormEvent, useState } from "react";
import {
  buildEnquiryMessage,
  BUSINESS,
  PROJECT_TYPES,
  whatsappLink,
} from "../lib/business";
import WhatsAppIcon from "./WhatsAppIcon";

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [projectType, setProjectType] = useState<string>(
    PROJECT_TYPES[0],
  );
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = whatsappLink(
      buildEnquiryMessage({
        name: name.trim(),
        postcode: postcode.trim(),
        projectType,
        message,
      }),
    );
    window.open(url, "_blank", "noopener,noreferrer");
    event.currentTarget.reset();
    setName("");
    setPostcode("");
    setProjectType(PROJECT_TYPES[0]);
    setMessage("");
  };

  return (
    <section id="contact" className="section-pad bg-paper-deep">
      <div className="container-site">
        <div className="mx-auto max-w-xl">
          <h2 className="heading-serif text-center text-3xl text-ink sm:text-4xl">
            Tell us about your kitchen
          </h2>
          <p className="mt-4 text-center text-base text-ink-muted">
            Fill in the form and we&rsquo;ll open WhatsApp with your details
            ready to send; no data is stored.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-ink"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Miller"
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postcode"
                    className="mb-1.5 block text-sm font-semibold text-ink"
                  >
                    Postcode
                  </label>
                  <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    required
                    autoComplete="postal-code"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. EH23 4NG"
                    className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="projectType"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  Type of project
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-base text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold text-ink"
                >
                  Message <span className="font-normal text-ink-muted">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the room: size, what you'd like changed, the look you're after…"
                  className="w-full resize-y rounded-lg border border-line bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <button
                type="submit"
                className="btn-cta w-full px-6 py-3.5 text-base"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Send enquiry on WhatsApp
              </button>
              <p className="text-center text-xs leading-relaxed text-ink-muted">
                Opens WhatsApp to {BUSINESS.phoneDisplay}. Prefer to talk?{" "}
                <a
                  href={`tel:${BUSINESS.phoneIntl}`}
                  className="font-semibold text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark"
                >
                  Call {BUSINESS.phoneDisplay}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}