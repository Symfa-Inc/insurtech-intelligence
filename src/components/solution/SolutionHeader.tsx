import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Solution } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

function hasPreview(thumbnail: string): boolean {
  if (!thumbnail) return false;
  const filePath = path.join(process.cwd(), 'public', thumbnail);
  return fs.existsSync(filePath);
}

export function SolutionHeader({ solution }: { solution: Solution }) {
  const showImage = hasPreview(solution.thumbnail);

  return (
    <section className="px-6 pb-12 pt-24">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex items-center gap-2 text-sm text-text-secondary">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/#solutions" className="transition-colors hover:text-foreground">
            Solutions
          </Link>
          <span>/</span>
          <span className="text-foreground">{solution.name}</span>
        </nav>
        {showImage && (
          <div className="mb-8 overflow-hidden rounded-xl border border-border">
            <img src={solution.thumbnail} alt={solution.name} className="w-full object-cover" />
          </div>
        )}
        <div className="mb-6 flex flex-wrap gap-2">
          {solution.tags.map((tag) => (
            <Badge key={tag} size="md">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{solution.name}</h1>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
          {solution.shortDescription}
        </p>
        <Button href={solution.demoUrl} target="_blank" rel="noopener noreferrer">
          Try Live Demo
          <span aria-hidden="true">&rarr;</span>
        </Button>
      </div>
    </section>
  );
}
