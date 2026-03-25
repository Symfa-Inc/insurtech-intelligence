import type { Solution } from '@/lib/types';

export function DataMethodology({ solution }: { solution: Solution }) {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Data & Methodology</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">Data Sources</h3>
            <p className="leading-relaxed text-text-secondary">{solution.data.sources}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">Methodology</h3>
            <p className="leading-relaxed text-text-secondary">{solution.data.methodology}</p>
          </div>
          {solution.data.metrics && (
            <div>
              <h3 className="mb-2 text-lg font-semibold text-primary">Evaluation Metrics</h3>
              <p className="leading-relaxed text-text-secondary">{solution.data.metrics}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
