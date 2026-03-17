import type { Project } from '@/lib/types';

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <section className="px-6 pb-12 pt-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{project.name}</h1>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
          {project.shortDescription}
        </p>
        {project.demoUrl !== '#' && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            Try Live Demo
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
    </section>
  );
}
