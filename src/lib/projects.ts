import type { Project } from './types';

import claimAssistant from '@/data/projects/claim-assistant.json';
import riskProfiler from '@/data/projects/risk-profiler.json';
import insurancePricing from '@/data/projects/insurance-pricing.json';
import insurecast from '@/data/projects/insurecast.json';

const projects: Project[] = [
  claimAssistant as Project,
  riskProfiler as Project,
  insurancePricing as Project,
  insurecast as Project,
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
