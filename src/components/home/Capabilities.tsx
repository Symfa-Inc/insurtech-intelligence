const capabilities = [
  {
    title: 'Document Intelligence & OCR',
    description:
      'Extract structured data from scanned forms, PDFs, and handwritten documents with confidence scoring.',
    icon: '\ud83d\udcc4',
  },
  {
    title: 'Fraud Detection & Risk Scoring',
    description:
      'Identify suspicious claims using ensemble ML models with transparent probability scoring.',
    icon: '\ud83d\udee1\ufe0f',
  },
  {
    title: 'Predictive Pricing Models',
    description:
      'Estimate insurance charges with feature-engineered regression ensembles and extrapolation detection.',
    icon: '\ud83d\udcb0',
  },
  {
    title: 'Time-Series Forecasting',
    description:
      'Forecast claims counts and costs with seasonal models, confidence intervals, and scenario analysis.',
    icon: '\ud83d\udcc8',
  },
  {
    title: 'Explainable AI (SHAP)',
    description:
      'Every prediction comes with per-instance feature contributions showing exactly why the model decided what it did.',
    icon: '\ud83d\udd0d',
  },
  {
    title: 'LLM Integration',
    description:
      'Large language models for natural language summaries, structured data extraction, and intelligent analysis.',
    icon: '\ud83e\udd16',
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What We Build</h2>
          <p className="mx-auto max-w-2xl text-text-secondary">
            Our insurance AI toolkit spans the full spectrum — from document intake to predictive
            analytics, all with explainability built in.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-4 text-3xl">{cap.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
