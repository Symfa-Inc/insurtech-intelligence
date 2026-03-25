export interface SolutionModel {
  name: string;
  purpose: string;
  details?: string;
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export interface SolutionOverview {
  problem: string;
  solution: string;
  outcomes: string[];
}

export interface SolutionData {
  sources: string;
  methodology: string;
  metrics?: string;
}

export interface Solution {
  slug: string;
  name: string;
  shortDescription: string;
  tags: string[];
  demoUrl: string;
  thumbnail: string;
  overview: SolutionOverview;
  models: SolutionModel[];
  techStack: TechStackCategory[];
  data: SolutionData;
  previews: string[];
}
