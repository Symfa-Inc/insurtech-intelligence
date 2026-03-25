import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/Button';

export function DemoCTA({ project }: { project: Project }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="mb-4 text-2xl font-bold">Try It Yourself</h2>
        <p className="mb-6 text-text-secondary">
          Experience {project.name} with real data. No signup required.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Open Live Demo
          </Button>
          <Button href="/#solutions" variant="secondary">
            View All Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
