import type { Project } from '@/lib/types';

export function Overview({ project }: { project: Project }) {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Overview</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">The Problem</h3>
            <p className="leading-relaxed text-text-secondary">{project.overview.problem}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">Our Solution</h3>
            <p className="leading-relaxed text-text-secondary">{project.overview.solution}</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-primary">Key Outcomes</h3>
            <ul className="space-y-2">
              {project.overview.outcomes.map((outcome, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
