import type { Solution } from './types';

import claimAssistant from '@/data/solutions/claim-assistant.json';
import riskProfiler from '@/data/solutions/risk-profiler.json';
import insurancePricing from '@/data/solutions/insurance-pricing.json';
import insurecast from '@/data/solutions/insurecast.json';

const solutions: Solution[] = [
  claimAssistant as Solution,
  riskProfiler as Solution,
  insurancePricing as Solution,
  insurecast as Solution,
];

export function getAllSolutions(): Solution[] {
  return solutions;
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((solution) => solution.slug);
}
