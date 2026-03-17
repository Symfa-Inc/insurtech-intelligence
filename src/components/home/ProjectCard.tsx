import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="aspect-video w-full rounded-t-xl bg-border/30" />
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed text-text-secondary">{project.shortDescription}</p>
      </div>
    </Link>
  );
}
