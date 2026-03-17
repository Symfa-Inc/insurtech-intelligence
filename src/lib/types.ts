export interface ProjectModel {
  name: string;
  purpose: string;
  details?: string;
}

export interface TechStackCategory {
  category: string;
  items: string[];
}

export interface ProjectOverview {
  problem: string;
  solution: string;
  outcomes: string[];
}

export interface ProjectData {
  sources: string;
  methodology: string;
  metrics?: string;
}

export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  tags: string[];
  demoUrl: string;
  thumbnail: string;
  overview: ProjectOverview;
  models: ProjectModel[];
  techStack: TechStackCategory[];
  data: ProjectData;
  screenshots: string[];
}
