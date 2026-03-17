export function ContactCTA() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let&apos;s Build Something Together</h2>
        <p className="mx-auto mb-8 max-w-2xl text-text-secondary">
          These proof-of-concepts showcase what&apos;s possible. We adapt and customize these AI
          models to fit your specific insurance workflows, data, and business requirements.
        </p>
        <a
          href="mailto:contact@symfa.com"
          className="inline-block rounded-full bg-primary px-8 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
