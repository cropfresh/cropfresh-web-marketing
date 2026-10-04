# Development and release workflow

## Runtime and local checks

Use Node **22.23.3** from `.nvmrc` / `.node-version` and npm 10 or 11. Next.js, React, and tool versions are locked in `package-lock.json`.

```bash
nvm install
nvm use
npm ci
npm run check
npm run verify:phase0
```

`check` regenerates route types, checks TypeScript, enforces zero lint warnings, runs tests, audits production dependencies at high severity, and builds with validation enabled. `verify:phase0` requires that build and checks normal/standalone production servers, static assets/image optimization, withdrawn mock routes, and unauthorized lead reads.

For a fresh source-snapshot check, use an external temporary directory:

```bash
npm run verify:phase0 -- --clean-dir /tmp/omnirush/cropfresh-phase0-clean
```

This creates a unique snapshot, excludes dependencies/builds/local secrets/lead data, runs a clean install and the full quality pipeline, then performs runtime checks. It establishes current-source reproducibility; a committed checkout and remote CI still require separate evidence. Results live in ignored `.verification/phase-0/`. Generated `.next/` and `.verification/` output are excluded from source linting/test-module indexing.

## Environment contract

| Environment | Purpose | Configuration |
|---|---|---|
| Development | Local `npm run dev` and checks | Optional `.env.local`, based on `.env.example`; no customer data or public mock auth |
| Staging | Approved release preview, synthetic lead delivery and alert/deployment tests | Separate host-managed secrets and test integrations; actual provisioning requires host access |
| Production | Approved release at `https://cropfresh.in` | Host-managed secrets, actual monitored integrations, verified DNS/TLS and rollback |

The definitions above do not provision hosting environments. Never commit `.env.local` or real keys. `NEXT_PUBLIC_*` values are browser-visible; `ADMIN_API_KEY` is server-only and an empty/missing key denies lead reads. No JWT/demo-login configuration is supported by the marketing site. Do not enable analytics, backend, store, or contact claims using invented values.

CI reads `.nvmrc`; Amplify reads the same file using nvm and runs a clean install plus quality checks. Docker uses the matching Node image and a non-root standalone runtime with public/static assets. Vercel runs `npm ci` and `npm run check`. Actual hosting selection, platform runtime settings, deployments, and remote results need owner verification.

## Branch, review, and release conventions

- `main`: approved production source; `develop`: integration work when used by the team.
- Work branches: `fix/<topic>`, `feat/<topic>`, `chore/<topic>`.
- Use concise conventional messages consistent with repository history, for example `fix(build): restore reproducible dependency installation`.
- Keep commits focused. Review existing modified/untracked files before staging; attach test/HTTP/audit evidence to the intended change. Include necessary new source/tests/configuration so a clean checkout is self-contained.
- Pull requests describe the change and its purpose, linked phase tasks, actual checks, and remaining owner dependencies. Source CI is declared in `.github/workflows/ci.yml`.
- Repository owners must configure and verify the quality job's status as a required branch check (`Typecheck, lint, test, and build` in the `Quality checks` workflow). Confirm the actual observed check name from a run. Protection and remote execution are pending until observed; a workflow file alone is insufficient evidence.
- Use release notes in `CHANGELOG.md`; tag approved releases as `v<major>.<minor>.<patch>` after deployment acceptance. Record the deployed commit, verification artifacts, and previous known-good rollback target.

## Published scope and QA

Follow the [current audit](docs/WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md) and [phase plan](WEBSITE_DEVELOPMENT_PHASE_PLAN.md). Public demos, invented prices/results, unfinished controls, and unsupported business facts are excluded from launch. Owner TODOs stay in documentation.

Target current Chrome/Edge/Firefox and Safari/iOS Safari for retained critical journeys. Actual current browser evidence covers local Chrome Lighthouse and Firefox viewport/interaction checks; Safari/assistive-technology/native-language review remains a release task. Recheck changed journeys at 320px mobile through desktop, with keyboard/reduced motion and representative devices. Use comparable Lighthouse profiles and separately measured field CWV; do not infer INP or search rankings from lab scores.
