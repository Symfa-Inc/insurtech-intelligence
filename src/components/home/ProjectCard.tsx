import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

const cardGradients: Record<string, string> = {
  'claim-assistant': 'from-blue-600/20 via-cyan-500/10 to-transparent',
  'risk-profiler': 'from-red-600/20 via-orange-500/10 to-transparent',
  'insurance-pricing': 'from-emerald-600/20 via-teal-500/10 to-transparent',
  insurecast: 'from-violet-600/20 via-purple-500/10 to-transparent',
};

const cardIcons: Record<string, string> = {
  'claim-assistant':
    'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  'risk-profiler':
    'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  'insurance-pricing':
    'M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  insurecast:
    'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
};

function hasPreview(thumbnail: string): boolean {
  if (!thumbnail) return false;
  const filePath = path.join(process.cwd(), 'public', thumbnail);
  return fs.existsSync(filePath);
}

export function ProjectCard({ project }: { project: Project }) {
  const gradient = cardGradients[project.slug] ?? 'from-gray-600/20 to-transparent';
  const iconPath = cardIcons[project.slug];
  const showImage = hasPreview(project.thumbnail);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      {showImage ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div
          className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br ${gradient}`}
        >
          {iconPath && (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="h-24 w-24 text-foreground/10 transition-transform duration-500 group-hover:scale-110"
            >
              <path d={iconPath} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
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
