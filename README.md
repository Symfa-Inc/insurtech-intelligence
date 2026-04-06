<div align="center">

<img src="public/logo.png" width="150" alt="InsurTech Intelligence Logo">

# InsurTech Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8.svg)](https://tailwindcss.com/)

Showcase platform for AI and ML solutions in insurance, featuring Claim Assistant, Fraud Detection, Insurance Pricing, and InsureCast.

**[Live Demo](https://insurtech-intelligence.symfa.ai/)** · **[GitHub](https://github.com/Symfa-Inc/insurtech-intelligence)** · **[Confluence](https://symfa.atlassian.net/wiki/x/CIC_KgE)**

</div>

## Preview

<p align="center">
<img src=".assets/insurtech-intelligence.png" width="80%" alt="InsurTech Intelligence Preview">
</p>

## Features

- **Solution Showcase** – Dedicated pages for each AI/ML insurance solution with overview, models, tech stack, and live demo links
- **Interactive Navigation** – Dynamic routing for solution detail pages with rich structured content
- **Dark/Light Theme** – Built-in theme toggle with system preference detection
- **Responsive Design** – Mobile-friendly layout with collapsible navigation

## How It Works

InsurTech Intelligence is a static Next.js site that serves as the entry point for Symfa's insurance AI solutions. Each solution (Claim Assistant, Fraud Detection, Insurance Pricing, InsureCast) has its own detail page generated from structured JSON data files. The site is statically exported at build time and served via Nginx, requiring no backend or database.

## Tech Stack

| Category           | Technologies                                     |
| ------------------ | ------------------------------------------------ |
| Framework          | Next.js 16 (App Router)                          |
| Language           | TypeScript                                       |
| UI                 | React 19, Tailwind CSS 4                         |
| Linting            | ESLint 9, Prettier                               |
| Package Management | pnpm                                             |
| Deployment         | Docker, GitHub Actions, Google Artifact Registry |

## Getting Started

### Prerequisites

- Node.js 22+ / [pnpm](https://pnpm.io/)

### Installation & Running

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

[MIT](LICENSE)
