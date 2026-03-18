export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="animate-fade-in-up mb-6 inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-secondary">
          AI-Powered Insurance Solutions
        </div>
        <h1 className="animate-fade-in-up animation-delay-100 mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
          Intelligence That <span className="text-primary">Transforms</span> Insurance
        </h1>
        <p className="animate-fade-in-up animation-delay-200 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          From claim processing to fraud detection, predictive pricing to forecasting — we build
          production-ready AI solutions for the insurance industry. Explore our proof-of-concept
          demos below.
        </p>
        <div className="animate-fade-in-up animation-delay-300 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
