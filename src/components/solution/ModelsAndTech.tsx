import type { Solution } from '@/lib/types';

export function ModelsAndTech({ solution }: { solution: Solution }) {
  return (
    <section className="border-y border-border bg-surface/50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Models & Tech Stack</h2>

        <div className="mb-10 space-y-4">
          <h3 className="text-lg font-semibold">AI/ML Models</h3>
          {solution.models.map((model) => (
            <div key={model.name} className="rounded-lg border border-border bg-background p-5">
              <div className="mb-1 font-semibold">{model.name}</div>
              <div className="mb-2 text-sm text-primary">{model.purpose}</div>
              {model.details && (
                <p className="text-sm leading-relaxed text-text-secondary">{model.details}</p>
              )}
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Tech Stack</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {solution.techStack.map((cat) => (
              <div key={cat.category} className="rounded-lg border border-border bg-background p-5">
                <div className="mb-3 text-sm font-semibold text-primary">{cat.category}</div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
