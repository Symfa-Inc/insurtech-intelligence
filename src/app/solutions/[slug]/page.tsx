import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSolutionBySlug, getAllSolutionSlugs } from '@/lib/solutions';
import { SolutionHeader } from '@/components/solution/SolutionHeader';
import { Overview } from '@/components/solution/Overview';
import { ModelsAndTech } from '@/components/solution/ModelsAndTech';
import { DataMethodology } from '@/components/solution/DataMethodology';
import { Previews } from '@/components/solution/Previews';
import { DemoCTA } from '@/components/solution/DemoCTA';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  return {
    title: `${solution.name} | InsurTech Intelligence`,
    description: solution.shortDescription,
    openGraph: {
      title: `${solution.name} | InsurTech Intelligence`,
      description: solution.shortDescription,
      images: [
        {
          url: solution.thumbnail,
          width: 1200,
          height: 630,
          alt: `${solution.name} - ${solution.shortDescription}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${solution.name} | InsurTech Intelligence`,
      description: solution.shortDescription,
      images: [solution.thumbnail],
    },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return (
    <>
      <SolutionHeader solution={solution} />
      <Overview solution={solution} />
      <ModelsAndTech solution={solution} />
      <DataMethodology solution={solution} />
      <Previews solution={solution} />
      <DemoCTA solution={solution} />
    </>
  );
}
