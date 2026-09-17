import { BUSINESS } from "../lib/business";
import Stars from "./Stars";

export default function Trust() {
  return (
    <section className="section-pad bg-paper" aria-label="Reviews">
      <div className="container-site">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Stars />
          <p className="mt-4 font-display text-3xl text-ink">
            {BUSINESS.rating} out of 5
          </p>
          <p className="mt-2 text-base text-ink-muted">
            Based on {BUSINESS.reviewCount} Google reviews
          </p>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            See our listing on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}