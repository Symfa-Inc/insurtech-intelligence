import { getAllProjects } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectGrid() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Projects</h2>
          <p className="mx-auto max-w-2xl text-text-secondary">
            Production-ready proof-of-concepts demonstrating our insurance AI capabilities. Each
            project includes a live demo you can try.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
