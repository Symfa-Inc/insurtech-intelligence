import type { Project } from '@/lib/types';
import Link from 'next/link';

export function DemoCTA({ project }: { project: Project }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="mb-4 text-2xl font-bold">Try It Yourself</h2>
        <p className="mb-6 text-text-secondary">
          {project.demoUrl !== '#'
            ? `Experience ${project.name} with real data. No signup required.`
            : `A live demo of ${project.name} is being prepared and will be available soon.`}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {project.demoUrl !== '#' ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-8 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
            >
              Open Live Demo
            </a>
          ) : (
            <span className="rounded-full border border-border px-8 py-3 text-sm text-text-secondary">
              Demo Coming Soon
            </span>
          )}
          <Link
            href="/#projects"
            className="rounded-full border border-border px-8 py-3 font-medium transition-colors hover:border-primary hover:text-primary"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
