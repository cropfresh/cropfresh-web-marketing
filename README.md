# cropfresh-web-marketing

## Website improvement program

- [Agriculture-first theme and five-second message](./docs/AGRITECH_THEME.md)
- [Measured website audit and improvement plan — 2026-10-04](./docs/WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md)
- [Phase 0 implementation and verification](./docs/phase-0/README.md)
- [Development phase plan and launch gates](./WEBSITE_DEVELOPMENT_PHASE_PLAN.md)
- [Phase 1: product strategy, evidence, and content](./docs/phase-1/README.md)
- [Phase 1: website implementation progress](./docs/phase-1/IMPLEMENTATION_PROGRESS.md)
- [Phase 2: sitemap, CTA destinations, and user journeys](./docs/phase-2/README.md)

The audit records the pre-Phase-0 baseline and **Quick wins → Core fixes → Advanced** plan. Phase 0 now passes a fresh source-snapshot install, typecheck, zero-warning lint, **5 suites / 15 tests**, strict build, **zero production dependency vulnerabilities**, and normal/standalone HTTP checks. Five development-only lint dependency findings remain. Remote CI/branch protection and actual hosting verification are still open; the confirmed live domain is `https://cropfresh.in`.

Use Node **22.23.3**, `npm ci`, `npm run check`, and `npm run verify:phase0`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for environment, branch/release, and fresh-snapshot verification instructions. Phase 1 follows confirmation of the remaining Phase 0 remote gate.

**Current publication requirement:** no public demos, placeholders, unsupported claims, or unfinished sections. Missing business facts stay in the report's owner TODOs. The earlier Phase 1/2 demo-publication proposals are superseded; their packs retain useful claims, content, journey, and form research. Large implementation refactors await approval of the updated plan.
