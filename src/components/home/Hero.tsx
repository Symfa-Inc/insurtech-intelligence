export function Hero() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-secondary">
          AI-Powered Insurance Solutions
        </div>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Intelligence That <span className="text-primary">Transforms</span> Insurance
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          From claim processing to fraud detection, predictive pricing to forecasting — we build
          production-ready AI solutions for the insurance industry. Explore our proof-of-concept
          demos below.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-primary px-8 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-8 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
