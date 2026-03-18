import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <section className="px-6 pb-12 pt-24">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-sm text-text-secondary">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/#projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.name}</span>
        </nav>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} size="md">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{project.name}</h1>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
          {project.shortDescription}
        </p>
        <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer">
          Try Live Demo
          <span aria-hidden="true">&rarr;</span>
        </Button>
      </div>
    </section>
  );
}
