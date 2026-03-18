import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects';
import { ProjectHeader } from '@/components/project/ProjectHeader';
import { Overview } from '@/components/project/Overview';
import { ModelsAndTech } from '@/components/project/ModelsAndTech';
import { DataMethodology } from '@/components/project/DataMethodology';
import { Screenshots } from '@/components/project/Screenshots';
import { DemoCTA } from '@/components/project/DemoCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} | InsurTech Intelligence`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} | InsurTech Intelligence`,
      description: project.shortDescription,
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: `${project.name} - ${project.shortDescription}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | InsurTech Intelligence`,
      description: project.shortDescription,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHeader project={project} />
      <Overview project={project} />
      <ModelsAndTech project={project} />
      <DataMethodology project={project} />
      <Screenshots project={project} />
      <DemoCTA project={project} />
    </>
  );
}
