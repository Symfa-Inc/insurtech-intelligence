# InsurTech Intelligence — Specification

## Executive Summary

A static portfolio website showcasing Symfa's insurance AI capabilities through 4 interactive proof-of-concept projects. Built for a mixed audience (business decision-makers and technical evaluators), it communicates what Symfa can build, how it works, and lets visitors try live demos. Modern tech aesthetic with dark-mode-first design.

## Problem Statement

Symfa has built 4 insurance AI proof-of-concepts (claim processing, fraud detection, pricing prediction, forecasting) but lacks a unified showcase to present these capabilities to potential clients. Currently there's no single destination where prospects can understand the full range of competencies, see the technical depth, and try live demos — all in one place.

## Success Criteria

- Visitors understand Symfa's insurance AI capabilities within 30 seconds of landing
- Each project is presented with consistent, professional detail (models, data, methodology)
- Live demos are one click away from each project page
- Non-technical stakeholders get the "why" while technical evaluators get the "how"
- Content is easy to update without touching React components (JSON/MDX data files)
- Site loads fast (static generation, no runtime backend)

## User Personas

### Business Decision-Maker (Primary)

- CTO, VP of Engineering, or Insurance Executive
- Evaluating Symfa as a potential partner
- Wants: proof of competence, domain expertise, ease of engagement
- Needs: clear value propositions, outcomes-focused descriptions, easy contact path

### Technical Evaluator (Secondary)

- Data Scientist, ML Engineer, or Solutions Architect
- Assessing technical depth and feasibility
- Wants: model details, architecture info, data methodology, live demos to test
- Needs: specific model names, frameworks, evaluation metrics, data sources

## User Journey

1. **Land on home page** → See hero with value proposition ("AI-powered insurance solutions")
2. **Scroll to capabilities** → Understand Symfa's skill areas (NLP, ML, time-series, explainability)
3. **Browse project grid** → See 4 project cards with titles, short descriptions, and category tags
4. **Click a project card** → Navigate to project detail page
5. **Read project detail** → Understand problem, models, data, methodology
6. **Click "Try Demo"** → Opens live demo app in a new browser tab
7. **Return and contact** → Use mailto: CTA to reach out

## Pages & Sections

### Home Page (`/`)

#### 1. Navigation Bar

- Symfa logo (left)
- Nav links: Home, Projects, Capabilities, Contact
- Dark/light mode toggle (right)

#### 2. Hero Section

- Headline: communicates insurance AI expertise
- Subheadline: 1-2 sentences on what Symfa delivers
- CTA button: scrolls to projects or links to contact
- Visual element: abstract/geometric background or subtle animation

#### 3. Capabilities Section

- Grid or icon-based layout showing core competencies:
  - Document Intelligence & OCR
  - Fraud Detection & Risk Scoring
  - Predictive Pricing Models
  - Time-Series Forecasting
  - Explainable AI (SHAP)
  - LLM Integration
- Each capability: icon + title + 1-line description

#### 4. Projects Grid

- 4 cards in a responsive grid (2x2 on desktop, 1-column on mobile)
- Each card shows:
  - Project name
  - Short description (1-2 sentences)
  - Category tags (e.g., "NLP", "AutoML", "SHAP")
  - Placeholder image / screenshot thumbnail
  - Link to detail page

#### 5. Contact CTA Section

- Simple section with heading ("Let's Build Something Together" or similar)
- Email link (mailto:) as primary CTA button
- Brief text about customizing these solutions for clients

#### 6. Footer

- Symfa logo + copyright
- Links to projects, contact
- Optional: social links

### Project Detail Pages (`/projects/[slug]`)

Consistent structure across all 4 projects:

#### 1. Project Header

- Project name
- Category tags
- "Try Demo" button (external link, new tab)

#### 2. Overview & Problem Solved

- What insurance problem this addresses
- How the solution works (high-level)
- Key outcomes / value delivered

#### 3. Models & Tech Stack

- ML/AI models used (with names and purposes)
- Tech stack summary (backend, frontend, key libraries)
- Architecture overview (text-based or simple diagram)

#### 4. Data & Methodology

- Data sources used
- Preprocessing and feature engineering approach
- Training methodology and evaluation metrics
- Explainability approach (if applicable)

#### 5. Screenshots / Visuals

- Placeholder images initially (will be replaced with real screenshots)
- 2-4 images showing key UI screens

#### 6. Demo CTA

- Prominent button linking to the live demo (opens in new tab)
- Brief instruction on what to expect in the demo

## Project Data

### 1. Claim Assistant

- **Slug**: `claim-assistant`
- **Category tags**: Document AI, OCR, LLM, NLP
- **Models**: Azure Document Intelligence (prebuilt-document), OpenAI GPT-5 family
- **Data**: State-specific insurance claim forms (FL, NH, MN, IA, KS, NY, OH, WI), policy database
- **Methodology**: 5-stage pipeline — Data Prep → Key Extraction (Azure DI) → Form Filling (GPT) → Policy Matching → Validation/Coverage Analysis
- **Key features**: Confidence-based validation (80% threshold), evidence tracking, PDF field highlighting, coverage analysis with reasoning
- **Demo URL**: https://claim-assistant-demo.d11.symfa.com/
- **Tech stack**: Python 3.13, FastAPI, Next.js 16, React 19, Tailwind, Azure DI SDK, OpenAI API

### 2. Risk Profiler

- **Slug**: `risk-profiler`
- **Category tags**: AutoML, Fraud Detection, Explainable AI, SHAP
- **Models**: AutoGluon TabularPredictor (NeuralNetTorch ensemble), SHAP KernelExplainer, OpenAI GPT-4o-mini for summaries
- **Data**: 2023 Travelers NESS Statathon (Kaggle) — 10 features including driver demographics, claim info, vehicle safety
- **Methodology**: AutoGluon ensemble training, 0.65 fraud probability threshold, SHAP per-instance explanations, LLM-generated risk summaries
- **Key features**: Fraud probability scoring, waterfall SHAP visualization, global feature importance, risk assessment gauge, natural language summaries
- **Demo URL**: https://risk-profiler-demo.symfa.com/ (confirm)
- **Tech stack**: Python 3.13, FastAPI, AutoGluon, SHAP, Next.js 16, React 19, Tailwind

### 3. Insurance Pricing

- **Slug**: `insurance-pricing`
- **Category tags**: Regression, AutoML, Explainable AI, SHAP
- **Models**: AutoGluon TabularPredictor (regression ensemble — GBM, XGBoost, CatBoost, RF), SHAP TreeExplainer, OpenAI GPT-4o-mini for interpretation
- **Data**: US Health Insurance Dataset — 6 features (age, sex, BMI, children, smoker, region), ~1300 rows
- **Methodology**: Winsorization + log transform + feature interactions (smoker_bmi, age_bmi), stratified split, MAPE optimization, 5-fold bagging
- **Key features**: Per-prediction SHAP explanations, LLM interpretation with fallback, extrapolation detection/warnings, feature impact visualization
- **Demo URL**: (to be confirmed)
- **Tech stack**: Python 3.13, FastAPI, AutoGluon, SHAP, scikit-learn, Next.js 16, React 19, Tailwind

### 4. InsureCast

- **Slug**: `insurecast`
- **Category tags**: Time-Series, Forecasting, Scenario Analysis
- **Models**: SARIMAX (1,1,1)(1,1,1,12), lognormal severity distribution, fallback seasonal heuristics
- **Data**: OSHA Severe Injury Reports — aggregated by state (50+DC), industry (Manufacturing, Construction, Healthcare), claim type (LostTime, MedicalOnly, Indemnity)
- **Methodology**: SARIMAX with 12-month seasonality, synthetic data filling for sparse segments, lognormal cost modeling with state/industry/type adjustments, 3% annual inflation
- **Key features**: 12-month forecast with confidence intervals, scenario analysis (frequency shocks ±10-25%, severity inflation 0-20%), multi-dimensional segmentation, interactive Recharts dashboard
- **Demo URL**: (to be confirmed)
- **Tech stack**: Python 3.13, FastAPI, Pandas, Next.js 16, React 19, Recharts, Tailwind

## Technical Architecture

### Framework & Stack

- **Framework**: Next.js 16 (App Router) with static export (SSG)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Package manager**: pnpm

### Content Architecture

- Project data stored in `/src/data/projects/` as individual JSON or MDX files
- Each file contains all structured content for one project
- TypeScript types enforce consistent schema across all projects
- Home page reads all project files to render the grid
- Detail pages use dynamic routes (`/projects/[slug]`) with `generateStaticParams`

### Project Data Schema (TypeScript)

```typescript
interface Project {
  slug: string;
  name: string;
  shortDescription: string; // 1-2 sentences for card
  tags: string[]; // category tags
  demoUrl: string; // external demo link
  thumbnail: string; // path to card image
  overview: {
    problem: string; // what problem it solves
    solution: string; // how it works (high-level)
    outcomes: string[]; // key value points
  };
  models: {
    name: string;
    purpose: string;
    details?: string;
  }[];
  techStack: {
    category: string; // "Backend", "Frontend", "ML/AI", etc.
    items: string[];
  }[];
  data: {
    sources: string; // data sources description
    methodology: string; // preprocessing & training approach
    metrics?: string; // evaluation metrics if applicable
  };
  screenshots: string[]; // paths to screenshot images
}
```

### Color System

Based on Symfa logo (deep teal ~`#1a6b5a`):

**Dark mode (default):**

- Background: `#0a0a0a` → `#111111` (near-black gradient)
- Surface: `#1a1a2e` (dark blue-gray cards)
- Primary: `#2dd4a8` (bright teal — derived from logo, high contrast on dark)
- Primary hover: `#34eabd`
- Text primary: `#f0f0f0`
- Text secondary: `#a0a0b0`
- Border: `#2a2a3e`
- Accent: `#4ade80` (green for success/CTA states)

**Light mode:**

- Background: `#fafafa` → `#ffffff`
- Surface: `#ffffff` (white cards with subtle shadow)
- Primary: `#0d7d5f` (deeper teal for contrast on white)
- Primary hover: `#0a6b50`
- Text primary: `#111111`
- Text secondary: `#555566`
- Border: `#e0e0e8`

### Typography

- **Headings**: Geist Sans (already configured in the project) — clean, geometric
- **Body**: Geist Sans
- **Code/technical**: Geist Mono

### File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, theme provider, nav
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind + theme CSS variables
│   └── projects/
│       └── [slug]/
│           └── page.tsx        # Project detail page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Capabilities.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ContactCTA.tsx
│   └── project/
│       ├── ProjectHeader.tsx
│       ├── Overview.tsx
│       ├── ModelsAndTech.tsx
│       ├── DataMethodology.tsx
│       ├── Screenshots.tsx
│       └── DemoCTA.tsx
├── data/
│   └── projects/
│       ├── claim-assistant.json
│       ├── risk-profiler.json
│       ├── insurance-pricing.json
│       └── insurecast.json
├── lib/
│   ├── projects.ts             # Data loading utilities
│   └── types.ts                # TypeScript interfaces
└── public/
    ├── images/
    │   ├── logo/
    │   │   └── symfa.webp
    │   └── projects/
    │       ├── claim-assistant/
    │       ├── risk-profiler/
    │       ├── insurance-pricing/
    │       └── insurecast/
    └── ...
```

### Responsive Breakpoints

- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2-column grid)
- Desktop: > 1024px (full layout, 2x2 project grid)

## Non-Functional Requirements

- **Performance**: Lighthouse score > 90 (static site, should be straightforward)
- **SEO**: Proper meta tags, Open Graph, page titles per project
- **Accessibility**: Semantic HTML, proper heading hierarchy, alt text, keyboard navigation
- **Browser support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **Hosting**: Any static hosting (Vercel, Netlify, S3+CloudFront, GitHub Pages)

## Out of Scope

- Backend / API server
- User authentication
- CMS integration (content managed via JSON files in repo)
- Blog or news section
- Multi-language / i18n support
- Analytics integration (can be added later)
- Animated demo walkthroughs or video embeds
- Search functionality

## Open Questions for Implementation

1. Confirm demo URLs for Insurance Pricing and InsureCast projects
2. Contact email address for the mailto: CTA
3. Hero section copy — specific headline and subheadline text
4. Whether any specific SEO keywords should be targeted
5. Deployment target (Vercel, Netlify, or other)
