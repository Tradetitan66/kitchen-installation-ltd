import { whatsappLink } from "../lib/business";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#our-work", label: "Our work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Enquiry" },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-dark text-white shadow-[0_1px_0_rgba(255,255,255,0.08)]">
      <nav
        className="container-site flex h-14 items-center justify-between gap-4 md:h-16"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-white md:text-xl"
        >
          Kitchen Installation Team
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink("Hi Kitchen Installation Team, I'd like a kitchen quote.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta px-4 py-2 text-sm"
          >
            Get a quote
          </a>
        </div>

        <a
          href={whatsappLink("Hi Kitchen Installation Team, I'd like a kitchen quote.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta px-4 py-2 text-sm md:hidden"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}