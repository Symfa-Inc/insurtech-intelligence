# InsurTech Intelligence

A collection of proof-of-concept projects exploring **AI and ML applications in insurance** — from document processing and fraud detection to predictive analytics and time-series forecasting.

## Projects

### Claim Assistant

An AI-powered solution for **automating insurance claim intake and processing**, reducing manual effort and accelerating claim handling. Combines Azure Document Intelligence with OpenAI for field extraction, mapping, and validation.

**Stack:** Python, TypeScript | Azure DI, OpenAI, FastAPI, React

### Fraud Detection

An AI-powered solution for **identifying potentially fraudulent insurance claims**, helping claims analysts prioritize investigations and reduce financial losses. Uses AutoGluon with SHAP explainability and optional LLM summaries.

**Stack:** Python, TypeScript | AutoGluon, SHAP, OpenAI, FastAPI, Next.js

### Insurance Pricing

An end-to-end ML system for **predicting annual insurance charges** with per-prediction explainability and business-readable evaluation reports. Features SHAP-based local explanations and LLM-interpreted evaluation metrics.

**Stack:** Python, TypeScript | AutoGluon, SHAP, OpenAI, FastAPI, Next.js

### InsureCast

**Time-series models applied to insurance data** for predictive analytics and risk forecasting.

**Stack:** Python, TypeScript | FastAPI, Next.js

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint 9 + Prettier
- **Package Manager:** pnpm
