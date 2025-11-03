# research.md

Decision: Language/Version
- Chosen: TypeScript (ES2023) / Node.js 18+ for server; React 19 + Next.js 16 for frontend
- Rationale: Repository is a Next.js 16 + React 19 TypeScript project (see `package.json`, `next.config.ts`, `tsconfig.json`). Aligning with existing code prevents compatibility issues.
- Alternatives: Python/Go backend or older Node versions; rejected due to mismatch with current codebase.

Decision: Primary Dependencies
- Chosen: Next.js 16 (App Router), React 19, Tailwind CSS 4, Firebase (Auth, Functions, Storage), ImageKit integration, Data Connect generated clients
- Rationale: These are present in repository (`next.config.ts`, `.github` docs, `functions/`, `src/dataconnect-generated`) and match existing patterns.
- Alternatives: Replace Firebase with a standalone API server; rejected (large migration cost).

Decision: Storage
- Chosen: PostgreSQL via Firebase Data Connect (existing Data Connect schema & generated clients)
- Rationale: `dataconnect/` exists with schema and generated types; continuing with that avoids rework.
- Alternatives: Firestore or MongoDB; rejected due to current schema expectations.

Decision: Testing
- Chosen: Vitest/Jest for unit tests and Playwright or Cypress for e2e where needed
- Rationale: Project already has TypeScript tests (see `test/` and `check_tsconfig.test.ts`), prefer Vitest for speed but can adapt to Jest if already used.
- Alternatives: Mocha; less common for Next.js projects.

Decision: Target Platform
- Chosen: Vercel for frontend, Firebase Functions for serverless backend
- Rationale: repo contains Vercel-specific scripts, `firebase.json`, and `functions/` directory; earlier notes mention Vercel deployment.

Decision: Project Type
- Chosen: Web application (Next.js monorepo-style with `functions/` for server code)
- Rationale: Repo layout contains `src/app`, `functions/`, `public/` and Next.js configs.

Decision: Performance Goals
- Chosen (initial): Serve SSR/SSG pages with p95 < 200ms for cached routes, API p95 < 500ms; optimize images and CDN via ImageKit
- Rationale: Reasonable for creator-focused marketing site and admin portal; can be refined with metrics.

Decision: Constraints
- Chosen: Keep serverless function cold-starts < 500ms where possible; keep client bundle < 200KB gzipped for key pages
- Rationale: Good UX targets for web apps.

Decision: Scale/Scope
- Chosen: Support up to 10k monthly active users in first phase; scale database connections through Data Connect patterns
- Rationale: Aligns with expected client base; Data Connect patterns are already in place.

Research Tasks (to resolve any repo-specific uncertainty)
- Verify exact Node.js runtime in `package.json` / Vercel settings (assume Node 18+)
- Confirm test runner preference (search for vitest/jest configs)
- Confirm whether Playwright/Cypress is used for e2e

Alternatives considered
- Full backend rewrite using Express/Nest: rejected due to time and existing `functions/`.
- Replacing Data Connect with direct DB clients: rejected due to generated client usage.

Next steps
- Create `data-model.md` and `contracts/` in `specs/main/` based on the feature spec once `spec.md` exists or is provided.
- Run the agent-context update script after design artifacts are produced.

