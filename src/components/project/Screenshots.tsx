import type { Project } from '@/lib/types';

export function Screenshots({ project }: { project: Project }) {
  if (project.screenshots.length === 0) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">Screenshots</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-surface text-sm text-text-secondary"
              >
                Screenshot coming soon
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Screenshots</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              className="rounded-lg border border-border"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
