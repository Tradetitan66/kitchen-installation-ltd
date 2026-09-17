const STEPS = [
  {
    step: "01",
    title: "Tell us your plans",
    description:
      "Message us on WhatsApp with the basics: how big your kitchen is and what you have in mind. Photos and rough dimensions help, but they're not essential.",
  },
  {
    step: "02",
    title: "Discuss the job",
    description:
      "We come and look at the space, talk through layout, appliances and timings, and work out what needs doing, including plumbing and joinery.",
  },
  {
    step: "03",
    title: "Get a quote",
    description:
      "You'll receive a clear, no-obligation quote for the full job. No pressure, no hidden extras, just a straightforward price for your new kitchen.",
  },
] as const;

export default function Process() {
  return (
    <section id="process" className="section-pad bg-paper-deep">
      <div className="container-site">
        <h2 className="heading-serif text-center text-3xl text-ink sm:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-ink-muted sm:text-lg">
          Getting a quote for your kitchen is simple: three steps, no hassle.
        </p>

        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand font-display text-lg font-semibold text-white">
                {item.step}
              </span>
              <h3 className="mt-5 font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted sm:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}