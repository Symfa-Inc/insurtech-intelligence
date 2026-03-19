# InsurTech Intelligence Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static portfolio website showcasing Symfa's 4 insurance AI proof-of-concepts with a modern dark-mode-first design.

**Architecture:** Next.js 16 App Router with static generation. Project content lives in JSON data files loaded at build time. Dark/light theme via CSS custom properties toggled by a `.dark` class on `<html>`. All pages are server components except the theme toggle and mobile nav (client components).

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, pnpm

**Spec:** `thoughts/shared/specs/2026-03-17-insurtech-intelligence.md`

---

## File Map

### New files to create

| File                                         | Responsibility                                                    |
| -------------------------------------------- | ----------------------------------------------------------------- |
| `src/lib/types.ts`                           | `Project` interface and related types                             |
| `src/lib/projects.ts`                        | Load project JSON files, `getAllProjects()`, `getProjectBySlug()` |
| `src/data/projects/claim-assistant.json`     | Content data for Claim Assistant                                  |
| `src/data/projects/risk-profiler.json`       | Content data for Risk Profiler                                    |
| `src/data/projects/insurance-pricing.json`   | Content data for Insurance Pricing                                |
| `src/data/projects/insurecast.json`          | Content data for InsureCast                                       |
| `src/components/layout/Navbar.tsx`           | Top navigation bar with logo, links, theme toggle, mobile menu    |
| `src/components/layout/MobileNav.tsx`        | Client component: hamburger menu for mobile                       |
| `src/components/layout/Footer.tsx`           | Site footer with logo, links, copyright                           |
| `src/components/layout/ThemeToggle.tsx`      | Client component: dark/light mode switch                          |
| `src/components/layout/ThemeScript.tsx`      | Inline script to prevent flash of wrong theme                     |
| `src/components/home/Hero.tsx`               | Hero section with headline, subline, CTA                          |
| `src/components/home/Capabilities.tsx`       | 6-item capabilities grid with icons                               |
| `src/components/home/ProjectGrid.tsx`        | Container that renders 4 ProjectCards                             |
| `src/components/home/ProjectCard.tsx`        | Single project card with title, description, tags, link           |
| `src/components/home/ContactCTA.tsx`         | Contact section with mailto link                                  |
| `src/components/project/ProjectHeader.tsx`   | Project name, tags, demo button                                   |
| `src/components/project/Overview.tsx`        | Problem, solution, outcomes                                       |
| `src/components/project/ModelsAndTech.tsx`   | Models list + tech stack table                                    |
| `src/components/project/DataMethodology.tsx` | Data sources, methodology, metrics                                |
| `src/components/project/Screenshots.tsx`     | Screenshot gallery with placeholders                              |
| `src/components/project/DemoCTA.tsx`         | Bottom demo call-to-action                                        |
| `src/app/projects/[slug]/page.tsx`           | Project detail page with dynamic route                            |
| `public/images/logo/symfa.webp`              | Symfa logo (moved from root)                                      |

### Files to modify

| File                  | Changes                                                           |
| --------------------- | ----------------------------------------------------------------- |
| `src/app/globals.css` | Replace with theme CSS variables (dark/light), Tailwind config    |
| `src/app/layout.tsx`  | Update metadata, add Navbar + Footer, add ThemeScript, dark class |
| `src/app/page.tsx`    | Replace boilerplate with home page sections                       |
| `next.config.ts`      | Add `output: 'export'` for static generation                      |

### Files to delete

| File                | Reason                    |
| ------------------- | ------------------------- |
| `public/next.svg`   | Boilerplate asset, unused |
| `public/vercel.svg` | Boilerplate asset, unused |
| `public/file.svg`   | Boilerplate asset, unused |
| `public/globe.svg`  | Boilerplate asset, unused |
| `public/window.svg` | Boilerplate asset, unused |

---

## Task 1: Foundation — Types, Data Files, and Data Loading

**Files:**

- Create: `src/lib/types.ts`
- Create: `src/data/projects/claim-assistant.json`
- Create: `src/data/projects/risk-profiler.json`
- Create: `src/data/projects/insurance-pricing.json`
- Create: `src/data/projects/insurecast.json`
- Create: `src/lib/projects.ts`

- [ ] **Step 1: Create the Project type definition**

Create `src/lib/types.ts`:

```typescript
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
```

- [ ] **Step 2: Create Claim Assistant data file**

Create `src/data/projects/claim-assistant.json`:

```json
{
  "slug": "claim-assistant",
  "name": "Claim Assistant",
  "shortDescription": "AI-powered claim intake automation that extracts, validates, and analyzes insurance claim forms using document intelligence and large language models.",
  "tags": ["Document AI", "OCR", "LLM", "NLP"],
  "demoUrl": "https://claim-assistant-demo.d11.symfa.com/",
  "thumbnail": "/images/projects/claim-assistant/thumbnail.webp",
  "overview": {
    "problem": "Insurance claim processing is manual, error-prone, and slow. Adjusters spend hours extracting data from PDF forms, cross-referencing policy records, and writing coverage analyses — repetitive work that delays claim resolution.",
    "solution": "Claim Assistant automates the entire intake pipeline: Azure Document Intelligence extracts key-value pairs from scanned PDFs, GPT-5 maps extractions to structured form fields with evidence tracking, and an LLM-powered validation engine performs coverage analysis against policy records.",
    "outcomes": [
      "Automated field extraction with confidence scoring (flags fields below 80% for human review)",
      "Evidence-tracked form filling — every answer links back to source document extractions",
      "Policy matching with weighted name similarity (Levenshtein) and date validation",
      "LLM-generated coverage analysis with reasoning and confidence scores"
    ]
  },
  "models": [
    {
      "name": "Azure Document Intelligence",
      "purpose": "OCR and key-value extraction from scanned/filled PDF claim forms",
      "details": "Uses the prebuilt-document model to extract key-value pairs with confidence scores and bounding regions from insurance claim PDFs across 8+ US states."
    },
    {
      "name": "OpenAI GPT-5 Family",
      "purpose": "Structured form filling and coverage analysis",
      "details": "GPT-5.2 performs form filling by mapping DI extractions to form fields using structured output parsing. GPT-5-nano handles coverage analysis, reasoning about whether claims fall within policy terms."
    }
  ],
  "techStack": [
    { "category": "Backend", "items": ["Python 3.13", "FastAPI", "Uvicorn", "Pydantic"] },
    { "category": "Frontend", "items": ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"] },
    {
      "category": "ML/AI",
      "items": ["Azure Document Intelligence SDK", "OpenAI API", "Levenshtein similarity"]
    },
    { "category": "Data Processing", "items": ["FillPDF", "ReportLab", "PyPDF2"] }
  ],
  "data": {
    "sources": "State-specific insurance claim form templates (FL, NH, MN, IA, KS, NY, OH, WI) with structured field schemas, plus a policy database with coverage terms, holder information, and validity periods.",
    "methodology": "5-stage modular pipeline: (1) Data Preparation — normalize scanned PDFs, (2) Key Extraction — Azure DI prebuilt-document model extracts key-value pairs with confidence scores, (3) Form Filling — GPT-5.2 maps extractions to form fields with one-to-many evidence tracking, (4) Policy Matching — lookup by policy ID with weighted Levenshtein name verification, (5) Validation — LLM-based coverage analysis with date and claimant verification.",
    "metrics": "Field extraction confidence threshold: 80%. Name matching uses weighted similarity: 60% policy ID, 15% first name, 25% last name."
  },
  "screenshots": []
}
```

- [ ] **Step 3: Create Risk Profiler data file**

Create `src/data/projects/risk-profiler.json`:

```json
{
  "slug": "risk-profiler",
  "name": "Risk Profiler",
  "shortDescription": "Machine learning fraud detection system that scores insurance claims for fraud probability with explainable AI and natural language risk summaries.",
  "tags": ["AutoML", "Fraud Detection", "Explainable AI", "SHAP"],
  "demoUrl": "https://risk-profiler-demo.symfa.com/",
  "thumbnail": "/images/projects/risk-profiler/thumbnail.webp",
  "overview": {
    "problem": "Insurance fraud costs the industry billions annually, but identifying fraudulent claims requires experienced investigators and is often inconsistent. Traditional rule-based systems miss complex fraud patterns and lack transparency in their decisions.",
    "solution": "Risk Profiler uses an AutoGluon ensemble model trained on real insurance claim data to predict fraud probability, with SHAP explainability showing exactly which factors drive each prediction and LLM-generated natural language summaries for non-technical reviewers.",
    "outcomes": [
      "Fraud probability scoring with configurable threshold (default 0.65)",
      "Per-prediction SHAP waterfall showing each feature's contribution to the score",
      "Global feature importance ranking across the entire model",
      "Natural language risk summaries generated by GPT-4o-mini with rule-based fallback"
    ]
  },
  "models": [
    {
      "name": "AutoGluon TabularPredictor",
      "purpose": "Fraud classification from structured claim features",
      "details": "Ensemble model with NeuralNetTorch backend, trained on 10 features including driver demographics, claim information, and vehicle safety ratings. Uses 0.65 probability threshold for fraud determination."
    },
    {
      "name": "SHAP KernelExplainer",
      "purpose": "Per-instance feature contribution explanations",
      "details": "Computes Shapley values using 100 background samples to show how each input feature pushes the fraud probability up or down from the baseline."
    },
    {
      "name": "OpenAI GPT-4o-mini",
      "purpose": "Natural language risk assessment summaries",
      "details": "Generates professional 2-3 sentence summaries of fraud assessments, highlighting key risk drivers and protective factors. Falls back to rule-based summaries when unavailable."
    }
  ],
  "techStack": [
    { "category": "Backend", "items": ["Python 3.13", "FastAPI", "Uvicorn", "Pydantic"] },
    { "category": "Frontend", "items": ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"] },
    { "category": "ML/AI", "items": ["AutoGluon 1.5", "SHAP 0.45", "scikit-learn", "OpenAI API"] },
    { "category": "Data Processing", "items": ["Pandas", "NumPy"] }
  ],
  "data": {
    "sources": "2023 Travelers NESS Statathon dataset from Kaggle — real insurance claim records with 10 features: age_of_driver, gender, high_education_ind, annual_income, living_status, claim_day_of_week, claim_est_payout, past_num_of_claims, witness_present_ind, and safety_rating.",
    "methodology": "AutoGluon ensemble training with automatic model selection and hyperparameter tuning. Binary classification with 0.65 probability threshold. SHAP KernelExplainer with 100 background samples for per-instance explanations. Top 10 features ranked by global SHAP importance.",
    "metrics": "Top features by SHAP importance: annual income (1.0), age of driver (0.91), claim day of week (0.61). Model evaluated on holdout test set."
  },
  "screenshots": []
}
```

- [ ] **Step 4: Create Insurance Pricing data file**

Create `src/data/projects/insurance-pricing.json`:

```json
{
  "slug": "insurance-pricing",
  "name": "Insurance Pricing",
  "shortDescription": "Predictive pricing model that estimates annual insurance charges with transparent SHAP explanations and LLM-powered interpretation of each prediction.",
  "tags": ["Regression", "AutoML", "Explainable AI", "SHAP"],
  "demoUrl": "#",
  "thumbnail": "/images/projects/insurance-pricing/thumbnail.webp",
  "overview": {
    "problem": "Insurance pricing requires balancing actuarial accuracy with customer transparency. Traditional black-box models produce estimates without explaining why, making it difficult for both underwriters and customers to understand pricing decisions.",
    "solution": "Insurance Pricing combines an AutoGluon regression ensemble with SHAP explainability and LLM-powered interpretation. Every prediction comes with a breakdown of which factors (age, BMI, smoking status, etc.) drove the price up or down, plus a plain-English explanation.",
    "outcomes": [
      "Accurate annual charge predictions using ensemble of GBM, XGBoost, CatBoost, and Random Forest",
      "Per-prediction SHAP feature impact visualization showing positive and negative drivers",
      "LLM-generated plain-English interpretation with fallback to rule-based explanations",
      "Extrapolation detection that warns when inputs fall outside training data range"
    ]
  },
  "models": [
    {
      "name": "AutoGluon TabularPredictor",
      "purpose": "Insurance charge regression from customer profile features",
      "details": "Ensemble of GBM, XGBoost, CatBoost, Random Forest, and Extra Trees with regularized hyperparameters, 5-fold bagging, and MAPE optimization. Trained on 6 features with engineered interactions (smoker×BMI, age×BMI)."
    },
    {
      "name": "SHAP TreeExplainer",
      "purpose": "Feature contribution explanations for tree-based models",
      "details": "Uses TreeExplainer for tree-based models with KernelExplainer fallback. Returns top 8 features by absolute SHAP value per prediction."
    },
    {
      "name": "OpenAI GPT-4o-mini",
      "purpose": "Human-readable prediction interpretation",
      "details": "Generates structured interpretation with headline and bullet points explaining key pricing factors. Falls back to rule-based interpretation for robustness."
    }
  ],
  "techStack": [
    { "category": "Backend", "items": ["Python 3.13", "FastAPI", "Uvicorn", "Pydantic"] },
    { "category": "Frontend", "items": ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"] },
    { "category": "ML/AI", "items": ["AutoGluon 1.5", "SHAP 0.49", "scikit-learn", "OpenAI API"] },
    { "category": "Data Processing", "items": ["Pandas", "NumPy", "SciPy", "joblib"] }
  ],
  "data": {
    "sources": "US Health Insurance Dataset — 1,300 records with 6 features: age (18-64), sex, BMI (15-53), number of children (0-6), smoker status, and US region (northeast, northwest, southeast, southwest). Target: annual insurance charges in dollars.",
    "methodology": "Preprocessing: Winsorization (IQR 1.5x) for BMI/charges outliers, log1p transformation on target, StandardScaler on age/BMI, one-hot encoding for region, binary encoding for sex/smoker, feature interactions (smoker×BMI, age×BMI). Stratified 80/20 train/test split by smoker and region. AutoGluon training with 300s time limit and 5-fold bagging.",
    "metrics": "Evaluation metrics: R², MAPE (Mean Absolute Percentage Error), and SMAPE. MAPE used as primary optimization target."
  },
  "screenshots": []
}
```

- [ ] **Step 5: Create InsureCast data file**

Create `src/data/projects/insurecast.json`:

```json
{
  "slug": "insurecast",
  "name": "InsureCast",
  "shortDescription": "Workers' compensation forecasting dashboard with SARIMAX time-series models, scenario analysis, and multi-dimensional segmentation across states, industries, and claim types.",
  "tags": ["Time-Series", "Forecasting", "Scenario Analysis"],
  "demoUrl": "#",
  "thumbnail": "/images/projects/insurecast/thumbnail.webp",
  "overview": {
    "problem": "Insurance companies need accurate claims forecasts to set reserves, price policies, and plan resources. Manual forecasting is slow, doesn't account for seasonality, and can't easily model 'what-if' scenarios across multiple business dimensions.",
    "solution": "InsureCast applies SARIMAX time-series models to historical OSHA injury data, producing 12-month claims and cost forecasts with confidence intervals. Users can segment by state, industry, and claim type, and run scenario analyses with frequency and severity adjustments.",
    "outcomes": [
      "12-month claims count and cost forecasts with widening confidence intervals",
      "Multi-dimensional filtering: 50+ states, 3 industries, 3 claim types",
      "Interactive scenario analysis with frequency shocks (±10-25%) and severity inflation (0-20%)",
      "Dynamic cost modeling using lognormal severity distributions with state/industry/type adjustments"
    ]
  },
  "models": [
    {
      "name": "SARIMAX",
      "purpose": "Seasonal time-series forecasting of monthly claims counts",
      "details": "Order (1,1,1) with seasonal order (1,1,1,12) capturing 12-month seasonality. Trained on historical data from 2015 onwards. Achieves MAE: 8.4, RMSE: 10.7, MAPE: 6.2%."
    },
    {
      "name": "Lognormal Severity Model",
      "purpose": "Cost estimation per claim based on segment characteristics",
      "details": "Lognormal distribution (μ=8.55, σ=0.72) with base cost $7,200, adjusted by state factor (e.g., CA=1.15, NY=1.2), industry factor (Construction=1.25), and claim type factor (LostTime=1.25). Includes 3% annual inflation and ±2% monthly seasonality."
    }
  ],
  "techStack": [
    { "category": "Backend", "items": ["Python 3.13", "FastAPI", "Uvicorn", "Pydantic"] },
    {
      "category": "Frontend",
      "items": ["Next.js 16", "React 19", "TypeScript", "Recharts", "Tailwind CSS"]
    },
    { "category": "ML/AI", "items": ["SARIMAX", "Lognormal distributions"] },
    { "category": "Data Processing", "items": ["Pandas", "NumPy"] }
  ],
  "data": {
    "sources": "OSHA Severe Injury Reports (SIR) — public occupational injury incident reports from the Bureau of Labor Statistics. Data normalized into monthly claim counts by state, industry (Manufacturing, Construction, Healthcare), and claim type (LostTime, MedicalOnly, Indemnity).",
    "methodology": "OSHA data ingested and aggregated by month/state/industry/claim_type. NAICS codes mapped to industry categories, event types mapped to claim types. Missing month-segment combinations filled with synthetic data sampled from segment-specific distributions. Severity parameters computed per segment with lognormal fitting. SARIMAX models fit with 12-month seasonal period.",
    "metrics": "SARIMAX performance: MAE 8.4, RMSE 10.7, MAPE 6.2%. Forecast horizon: 12 months with confidence intervals widening over time."
  },
  "screenshots": []
}
```

- [ ] **Step 6: Create the data loading utilities**

Create `src/lib/projects.ts`:

```typescript
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
```

- [ ] **Step 7: Verify build**

Run: `pnpm build`
Expected: Build succeeds (types compile, JSON files are resolved).

- [ ] **Step 8: Commit**

```bash
git add src/lib/ src/data/
git commit -m "feat: add Project types, data files for 4 projects, and loading utilities"
```

---

## Task 2: Theme System and Static Export Config

**Files:**

- Modify: `src/app/globals.css`
- Modify: `next.config.ts`

Tailwind CSS 4 uses `@theme inline` for design tokens and `@custom-variant` for custom dark mode variant based on `.dark` class.

- [ ] **Step 1: Replace globals.css with theme system**

Replace `src/app/globals.css` with:

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--fg);
  --color-surface: var(--surface);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-text-secondary: var(--text-secondary);
  --color-border: var(--border-color);
  --color-accent: var(--accent);

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root {
  --bg: #fafafa;
  --fg: #111111;
  --surface: #ffffff;
  --primary: #0d7d5f;
  --primary-hover: #0a6b50;
  --text-secondary: #555566;
  --border-color: #e0e0e8;
  --accent: #059669;
}

.dark {
  --bg: #0a0a0a;
  --fg: #f0f0f0;
  --surface: #1a1a2e;
  --primary: #2dd4a8;
  --primary-hover: #34eabd;
  --text-secondary: #a0a0b0;
  --border-color: #2a2a3e;
  --accent: #4ade80;
}

body {
  background: var(--bg);
  color: var(--fg);
}
```

- [ ] **Step 2: Add static export to next.config.ts**

Replace `next.config.ts` with:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Note: `output: 'export'` enables full static generation. `images.unoptimized: true` is required because the Next.js Image Optimization API isn't available in static exports.

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: Build succeeds. Output in `out/` directory.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css next.config.ts
git commit -m "feat: add dark/light theme system with CSS custom properties and enable static export"
```

---

## Task 3: Layout Components — ThemeToggle, Navbar, Footer

**Files:**

- Create: `src/components/layout/ThemeScript.tsx`
- Create: `src/components/layout/ThemeToggle.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create the ThemeScript component to prevent flash of wrong theme**

This inline script runs before React hydrates, reading localStorage and applying the correct theme class immediately. Prevents the "flash of wrong theme" (FOUWT) when a user has previously selected light mode.

Create `src/components/layout/ThemeScript.tsx`:

```tsx
export function ThemeScript() {
  const script = `
    (function() {
      var theme = localStorage.getItem('theme');
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
```

- [ ] **Step 2: Create the ThemeToggle client component**

Create `src/components/layout/ThemeToggle.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    setDark(stored !== 'light');
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-lg border border-border p-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
    >
      {dark ? '\u2600\ufe0f' : '\ud83c\udf19'}
    </button>
  );
}
```

- [ ] **Step 3: Create the MobileNav client component**

Create `src/components/layout/MobileNav.tsx`:

```tsx
'use client';

import { useState } from 'react';

const navLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/#contact', label: 'Contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="rounded-lg border border-border p-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
      >
        {open ? '\u2715' : '\u2630'}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-background px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create the Navbar component**

Create `src/components/layout/Navbar.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';

const navLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo/symfa.webp" alt="Symfa" width={32} height={32} />
          <span className="text-lg font-semibold">InsurTech Intelligence</span>
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm text-text-secondary transition-colors hover:text-foreground md:block"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 5: Create the Footer component**

Create `src/components/layout/Footer.tsx`:

```tsx
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo/symfa.webp" alt="Symfa" width={24} height={24} />
          <span className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Symfa. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6 text-sm text-text-secondary">
          <Link href="/#projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/#capabilities" className="transition-colors hover:text-foreground">
            Capabilities
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Update layout.tsx with Navbar, Footer, ThemeScript, and metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeScript } from '@/components/layout/ThemeScript';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'InsurTech Intelligence | Symfa',
  description:
    'Explore AI-powered insurance solutions: claim processing, fraud detection, predictive pricing, and forecasting. Built by Symfa.',
  openGraph: {
    title: 'InsurTech Intelligence | Symfa',
    description:
      'AI-powered insurance solutions — claim processing, fraud detection, predictive pricing, and forecasting.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

Note: `className="dark"` sets dark mode as the SSG default. `suppressHydrationWarning` prevents mismatch when ThemeScript adjusts the class before hydration. `ThemeScript` runs in `<head>` before paint to prevent flash of wrong theme.

- [ ] **Step 7: Move logo and clean up boilerplate assets**

```bash
mkdir -p public/images/logo public/images/projects/claim-assistant public/images/projects/risk-profiler public/images/projects/insurance-pricing public/images/projects/insurecast
mv symfa.webp public/images/logo/symfa.webp
rm public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

- [ ] **Step 8: Verify build**

Run: `pnpm build`
Expected: Build succeeds. Static export in `out/`.

- [ ] **Step 9: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx public/images/
git rm --cached symfa.webp 2>/dev/null; git add public/images/logo/symfa.webp
git commit -m "feat: add Navbar with mobile menu, Footer, ThemeToggle, and theme flash prevention"
```

---

## Task 4: Home Page — Hero and Capabilities

**Files:**

- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/Capabilities.tsx`

- [ ] **Step 1: Create the Hero component**

Create `src/components/home/Hero.tsx`:

```tsx
export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-text-secondary">
          AI-Powered Insurance Solutions
        </div>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Intelligence That <span className="text-primary">Transforms</span> Insurance
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          From claim processing to fraud detection, predictive pricing to forecasting — we build
          production-ready AI solutions for the insurance industry. Explore our proof-of-concept
          demos below.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-primary px-8 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-8 py-3 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the Capabilities component**

Create `src/components/home/Capabilities.tsx`:

```tsx
const capabilities = [
  {
    title: 'Document Intelligence & OCR',
    description:
      'Extract structured data from scanned forms, PDFs, and handwritten documents with confidence scoring.',
    icon: '\ud83d\udcc4',
  },
  {
    title: 'Fraud Detection & Risk Scoring',
    description:
      'Identify suspicious claims using ensemble ML models with transparent probability scoring.',
    icon: '\ud83d\udee1\ufe0f',
  },
  {
    title: 'Predictive Pricing Models',
    description:
      'Estimate insurance charges with feature-engineered regression ensembles and extrapolation detection.',
    icon: '\ud83d\udcb0',
  },
  {
    title: 'Time-Series Forecasting',
    description:
      'Forecast claims counts and costs with seasonal models, confidence intervals, and scenario analysis.',
    icon: '\ud83d\udcc8',
  },
  {
    title: 'Explainable AI (SHAP)',
    description:
      'Every prediction comes with per-instance feature contributions showing exactly why the model decided what it did.',
    icon: '\ud83d\udd0d',
  },
  {
    title: 'LLM Integration',
    description:
      'Large language models for natural language summaries, structured data extraction, and intelligent analysis.',
    icon: '\ud83e\udd16',
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What We Build</h2>
          <p className="mx-auto max-w-2xl text-text-secondary">
            Our insurance AI toolkit spans the full spectrum — from document intake to predictive
            analytics, all with explainability built in.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-4 text-3xl">{cap.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify components compile**

Run: `pnpm build`
Expected: Build succeeds (components aren't used on any page yet, but should compile without errors).

- [ ] **Step 4: Commit**

```bash
git add src/components/home/Hero.tsx src/components/home/Capabilities.tsx
git commit -m "feat: add Hero and Capabilities home page sections"
```

---

## Task 5: Home Page — Project Grid, Contact CTA, and Page Assembly

**Files:**

- Create: `src/components/home/ProjectCard.tsx`
- Create: `src/components/home/ProjectGrid.tsx`
- Create: `src/components/home/ContactCTA.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ProjectCard component**

Create `src/components/home/ProjectCard.tsx`:

```tsx
import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="aspect-video w-full rounded-t-xl bg-border/30" />
      <div className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
            </span>
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
```

Note: The `aspect-video` div is a placeholder for the thumbnail image. When real screenshots are available, replace with `<Image>`.

- [ ] **Step 2: Create ProjectGrid component**

Create `src/components/home/ProjectGrid.tsx`:

```tsx
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
```

- [ ] **Step 3: Create ContactCTA component**

Note: The email address `contact@symfa.com` is a placeholder. Update it with the real address when confirmed.

Create `src/components/home/ContactCTA.tsx`:

```tsx
export function ContactCTA() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let&apos;s Build Something Together</h2>
        <p className="mx-auto mb-8 max-w-2xl text-text-secondary">
          These proof-of-concepts showcase what&apos;s possible. We adapt and customize these AI
          models to fit your specific insurance workflows, data, and business requirements.
        </p>
        <a
          href="mailto:contact@symfa.com"
          className="inline-block rounded-full bg-primary px-8 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Replace page.tsx with complete home page**

Replace `src/app/page.tsx` with:

```tsx
import { Hero } from '@/components/home/Hero';
import { Capabilities } from '@/components/home/Capabilities';
import { ProjectGrid } from '@/components/home/ProjectGrid';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <ProjectGrid />
      <ContactCTA />
    </>
  );
}
```

- [ ] **Step 5: Verify build and dev server**

Run: `pnpm build`
Expected: Build succeeds. Home page renders all 4 sections.

Run: `pnpm dev` and verify at `http://localhost:3000`:

- Hero section with headline, subline, two CTA buttons
- 6 capabilities in 3-column grid (desktop)
- 4 project cards in 2-column grid (desktop)
- Contact CTA section
- Cards link to `/projects/[slug]` (404 expected — detail pages not built yet)

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add ProjectGrid, ContactCTA, and assemble complete home page"
```

---

## Task 6: Project Detail Pages

**Files:**

- Create: `src/components/project/ProjectHeader.tsx`
- Create: `src/components/project/Overview.tsx`
- Create: `src/components/project/ModelsAndTech.tsx`
- Create: `src/components/project/DataMethodology.tsx`
- Create: `src/components/project/Screenshots.tsx`
- Create: `src/components/project/DemoCTA.tsx`
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create ProjectHeader component**

Create `src/components/project/ProjectHeader.tsx`:

```tsx
import type { Project } from '@/lib/types';

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <section className="px-6 pb-12 pt-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{project.name}</h1>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-text-secondary">
          {project.shortDescription}
        </p>
        {project.demoUrl !== '#' && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            Try Live Demo
            <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Overview component**

Create `src/components/project/Overview.tsx`:

```tsx
import type { Project } from '@/lib/types';

export function Overview({ project }: { project: Project }) {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Overview</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">The Problem</h3>
            <p className="leading-relaxed text-text-secondary">{project.overview.problem}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">Our Solution</h3>
            <p className="leading-relaxed text-text-secondary">{project.overview.solution}</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-primary">Key Outcomes</h3>
            <ul className="space-y-2">
              {project.overview.outcomes.map((outcome, i) => (
                <li key={i} className="flex gap-3 text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create ModelsAndTech component**

Create `src/components/project/ModelsAndTech.tsx`:

```tsx
import type { Project } from '@/lib/types';

export function ModelsAndTech({ project }: { project: Project }) {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Models & Tech Stack</h2>

        <div className="mb-10 space-y-4">
          <h3 className="text-lg font-semibold">AI/ML Models</h3>
          {project.models.map((model) => (
            <div key={model.name} className="rounded-lg border border-border bg-surface p-5">
              <div className="mb-1 font-semibold">{model.name}</div>
              <div className="mb-2 text-sm text-primary">{model.purpose}</div>
              {model.details && (
                <p className="text-sm leading-relaxed text-text-secondary">{model.details}</p>
              )}
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Tech Stack</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.techStack.map((cat) => (
              <div key={cat.category} className="rounded-lg border border-border bg-surface p-5">
                <div className="mb-3 text-sm font-semibold text-primary">{cat.category}</div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-background px-2.5 py-1 text-xs font-medium text-text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create DataMethodology component**

Create `src/components/project/DataMethodology.tsx`:

```tsx
import type { Project } from '@/lib/types';

export function DataMethodology({ project }: { project: Project }) {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Data & Methodology</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">Data Sources</h3>
            <p className="leading-relaxed text-text-secondary">{project.data.sources}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-primary">Methodology</h3>
            <p className="leading-relaxed text-text-secondary">{project.data.methodology}</p>
          </div>
          {project.data.metrics && (
            <div>
              <h3 className="mb-2 text-lg font-semibold text-primary">Evaluation Metrics</h3>
              <p className="leading-relaxed text-text-secondary">{project.data.metrics}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create Screenshots component**

Create `src/components/project/Screenshots.tsx`:

```tsx
import type { Project } from '@/lib/types';

export function Screenshots({ project }: { project: Project }) {
  if (project.screenshots.length === 0) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">Screenshots</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-surface text-sm text-text-secondary"
              >
                Screenshot coming soon
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Screenshots</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              className="rounded-lg border border-border"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create DemoCTA component**

Create `src/components/project/DemoCTA.tsx`:

```tsx
import type { Project } from '@/lib/types';
import Link from 'next/link';

export function DemoCTA({ project }: { project: Project }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-10 text-center">
        <h2 className="mb-4 text-2xl font-bold">Try It Yourself</h2>
        <p className="mb-6 text-text-secondary">
          Experience {project.name} with real data. No signup required.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {project.demoUrl !== '#' && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-8 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
            >
              Open Live Demo
            </a>
          )}
          <Link
            href="/#projects"
            className="rounded-full border border-border px-8 py-3 font-medium transition-colors hover:border-primary hover:text-primary"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Create the dynamic project detail page**

Create `src/app/projects/[slug]/page.tsx`:

```tsx
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
```

Note: In Next.js 16 App Router with `output: 'export'`, `generateStaticParams` is required for dynamic routes. The `params` prop is a `Promise` per Next.js 16 conventions.

- [ ] **Step 8: Verify full build**

Run: `pnpm build`
Expected: Build succeeds. Output should show pages generated:

- `/` (home page)
- `/projects/claim-assistant`
- `/projects/risk-profiler`
- `/projects/insurance-pricing`
- `/projects/insurecast`

Run: `pnpm dev` and verify:

- Navigate from home → project card → project detail page
- All sections render: header, overview, models, data, screenshots (placeholders), demo CTA
- "View All Projects" link returns to home page project grid
- "Try Demo" opens external URL in new tab (for projects with real URLs)

- [ ] **Step 9: Commit**

```bash
git add src/components/project/ src/app/projects/
git commit -m "feat: add project detail pages with dynamic routing and all content sections"
```

---

## Task 7: Polish — Lint, Format, Final Verification

**Files:**

- All files created/modified above

- [ ] **Step 1: Run formatter**

Run: `pnpm format`
Expected: Prettier formats all files. Some may change.

- [ ] **Step 2: Run linter**

Run: `pnpm lint`
Expected: No errors. If ESLint reports issues, fix them.

- [ ] **Step 3: Run full build**

Run: `pnpm build`
Expected: Clean build with all pages generated statically.

- [ ] **Step 4: Manual smoke test**

Run: `pnpm dev` and verify in browser:

1. Home page loads with dark theme by default
2. Theme toggle switches to light mode and back; persists on page refresh
3. Hero section has headline, subline, two CTA buttons
4. Capabilities section shows 6 cards in 3-column grid (desktop)
5. Project grid shows 4 cards in 2-column grid (desktop)
6. Each card links to correct project detail page
7. Project detail pages show all sections: header, overview, models, data, screenshots, demo CTA
8. "Try Demo" button opens external URL in new tab (for projects with real URLs)
9. Nav links scroll to correct sections on home page
10. Mobile: hamburger menu opens/closes, links navigate correctly
11. Footer links work
12. Responsive: resize to mobile width — single-column layouts throughout
13. All text is readable in both dark and light modes

- [ ] **Step 5: Commit final polish**

```bash
git add -A
git commit -m "chore: lint and format all files"
```

---

## Summary

| Task | What it builds                              | Key files                                          |
| ---- | ------------------------------------------- | -------------------------------------------------- |
| 1    | Types + data files + loading                | `src/lib/`, `src/data/projects/`                   |
| 2    | Theme system + static export                | `globals.css`, `next.config.ts`                    |
| 3    | Navbar, Footer, ThemeToggle, MobileNav      | `src/components/layout/`                           |
| 4    | Hero + Capabilities sections                | `src/components/home/Hero.tsx`, `Capabilities.tsx` |
| 5    | ProjectGrid + ContactCTA + page assembly    | `src/components/home/`, `src/app/page.tsx`         |
| 6    | Project detail pages (6 components + route) | `src/components/project/`, `src/app/projects/`     |
| 7    | Lint, format, smoke test                    | All files                                          |

**Total: 7 tasks, 42 steps**

**Parallelization groups:**

- **Parallel group 1:** Tasks 1 + 2 (foundation — data + theme; independent of each other)
- **Parallel group 2:** Tasks 3 + 4 (layout + hero/capabilities — depend on group 1; independent of each other)
- **Sequential after group 2:** Task 5 (home page assembly — depends on Tasks 3 + 4 for components, writes `page.tsx`)
- **Sequential after Task 5:** Task 6 (project detail pages — depends on data loading from Task 1)
- **Sequential last:** Task 7 (polish — depends on everything)

**Open items (placeholders in code):**

- `contact@symfa.com` in ContactCTA — update when real email confirmed
- `demoUrl: "#"` for Insurance Pricing and InsureCast — update when URLs confirmed
- Screenshot arrays are empty — add paths when screenshots are captured
- `favicon.ico` is still the Next.js default — replace when Symfa favicon is available
