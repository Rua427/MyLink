# MyLink - Project Guide

This file describes the structure, technology stack, development rules, and key workflows of the MyLink project. All AI agents and developers working on this project must adhere to this guide.

## 1. Project Overview
- **Purpose:** A micro-landing page service (Linktree clone) that allows developers and creators to collect and share multiple links on a single integrated page.
- **Core Values:** Simplicity, intuitive editing (inline editing), fast sharing.

## 2. Technical Stack
- **Framework:** Next.js 15+ (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Icons:** Lucide React
- **Backend/DB/Auth:** Firebase (Authentication, Firestore)
- **Language:** TypeScript
- **Tooling:** ESLint, Prettier

## 3. Project Structure
```text
/
├── app/                # Next.js App Router (Pages and layouts)
├── components/         # Shared components
│   ├── ui/             # shadcn/ui components
│   └── ...
├── docs/               # Project documentation (PRD, User Scenarios, etc.)
├── hooks/              # Custom React Hooks
├── lib/                # Utilities and configurations (Firebase config, etc.)
├── public/             # Static assets (Images, favicons, etc.)
└── ...
```

## 4. Database Modeling (Firestore)
- **`displayNames` collection:** For duplicate check optimization (ID: `displayName`, Field: `uid`)
- **`users` collection:** Basic user profile (ID: `uid`)
- **`links` sub-collection (`users/{uid}/links`):** Link list (Sorted by latest)

## 5. Development Guidelines
- **File Reference:** When mentioning files or directories, prefix the name with `@` (e.g., `@app/page.tsx`, `@package.json`).
- **Inline Editing:** Priority is given to inline editing where profile and link information are modified directly on the page without separate modals.
- **Favicon:** Link favicons are dynamically rendered using the Google API (`https://www.google.com/s2/favicons?domain={url}`).
- **Styling:** Use shadcn/ui and Tailwind CSS v4 to maintain a consistent design system.
- **Type Safety:** All data models and functions must have clear TypeScript interfaces/types.

## 6. Key Commands
- **Run dev server:** `npm run dev`
- **Build:** `npm run build`
- **Lint check:** `npm run lint`
- **Format code:** `npm run format`
- **Type check:** `npm run typecheck`

## 7. References
- [PRD (Product Requirements Document)](docs/PRD.md)
- [User Scenarios](docs/USER_SCENARIO.md)
- [Wireframe](docs/WIREFRAME.md)
