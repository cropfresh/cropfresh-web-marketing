# Phase 0 — stabilization and verification record

**Verified locally:** 2026-10-04; clean working-tree snapshot at 04:39 UTC, exported staged application tree at 05:33 UTC

**Status:** Local engineering implementation and verification passed. Full Phase 0 exit remains open for a successful published-checkout GitHub run and required branch protection. Phase 1 is queued after that gate is confirmed.

**Parent:** [development phase plan](../../WEBSITE_DEVELOPMENT_PHASE_PLAN.md#phase-0--governance-and-technical-stabilization)

## 1. Implemented changes

| Area | Implemented result |
|---|---|
| Runtime | Node 22.23.3 in `.nvmrc` and `.node-version`; package engines define Node 22 and npm 10/11; CI, Amplify, and Docker aligned |
| Dependencies | Next/eslint-config-next 16.3.8, React/React DOM 19.3.0, axios 1.20.0, Jest/`@jest/globals`/environment 30.5.2; compatible transitive patches locked |
| Unused integrations | Removed next-intl's unused plugin/dependency and its Next 16 workaround; removed unused third-party, cookie, state, and JWT packages; locale constants/messages retained |
| Honest quality gate | `next typegen && tsc --noEmit`; zero-warning lint; meaningful tests; production audit; strict build; `npm run check` is repeatable |
| Mock authentication | Removed embedded demo accounts/login page/JWT issuance; browser-local identity/token no longer authenticates or forwards credentials; sign-in links removed from mounted public navigation |
| Mock APIs | Removed in-memory listing/order endpoints; their GET/POST paths return 404 in tested production modes |
| Lead administration | Nonempty configured key required in all environments; unset/empty/whitespace keys deny access; exact constant-time comparison; four handlers share tested authorization |
| Standalone/hosting | Enabled standalone output; Docker has inherited `/app` workdir, static/public copies, non-root runtime; clean install/quality commands aligned in CI/Amplify/Vercel |
| Repeatable verification | `scripts/verify-phase-0.mjs` checks clean source snapshots and production/standalone servers; generated output excluded from lint/typecheck/Jest indexing |
| Governance | [Contribution/environment/branch/release policy](../../CONTRIBUTING.md), [unreleased notes](../../CHANGELOG.md), blank safe `.env.example`, and the known-error register below |

Locale implementation and real product/auth integrations remain later scope. This phase does not establish a deployed authentication system or verify commercial availability.

## 2. Final local check results

Executed with **Node v22.23.3 / npm 11.19.0**. The final snapshot excludes existing `node_modules`, `.next`, local `.env` files, verification output, and lead data.

```bash
npm run verify:phase0 -- --clean-dir /tmp/omnirush/cropfresh-phase0-clean
```

| Check | Actual result |
|---|---|
| Fresh installation | `npm ci` succeeded without `--legacy-peer-deps` or `--force` |
| Typecheck | Route generation and TypeScript passed |
| Lint | Passed with `--max-warnings=0`; zero source lint errors/warnings |
| Tests | **5 suites, 15 tests passed** |
| Production dependency audit | **0 vulnerabilities** across all severities |
| All-dependency audit | **5 high, 0 critical** findings, all classified development-only in the lint-tool chain |
| Strict production build | Next.js 16.3.8 build passed with TypeScript validation |
| Normal production server | **26 HTTP assertions passed** |
| Independent standalone runtime | **26 HTTP assertions passed**, with its public/static assets and image optimization |
| Removed mock paths | `/login`, `/api/auth/demo-login`, `/api/listings`, `/api/orders`: GET and POST each return 404; no mock auth cookie |
| Lead reads | All four endpoints reject missing/empty keys with 401, including an empty configured environment key |
| Invalid contact request | `{}` rejected with 400; no real lead submitted |
| Legacy navigation | `/home` returns 308 to `/`; homepage has one server H1 and no `/login` link |

The source snapshot was `/tmp/omnirush/cropfresh-phase0-clean/snapshot-JKH59b`. It reproduces the current working tree, including necessary uncommitted work; it is **not a committed Git checkout or a GitHub Actions result**.

An additional check exported the Git index with `git checkout-index --all` to `/tmp/omnirush/cropfresh-phase0-index-DEtDxC`. The staged application/configuration/test changes include the earlier agriculture-theme baseline needed by this build. The exported tree, `03de5cc8cae9d0edfb7def5237f67b4a6bca5f7c`, passed `npm ci`, `npm run check`, and `npm run verify:phase0`: **5 suites / 15 tests, zero production findings, five development-only high findings, and 52 HTTP assertions**. This verifies the staged application source, not a commit or the documentation publication set. Its runtime evidence is in that export's `.verification/phase-0/`.

The first install attempt in this export encountered temporary-filesystem quota errors and left incomplete dependency files. After older generated snapshot dependencies/build output were cleared, a fresh `npm ci` and the complete verification sequence passed. No application change was required for that retry.

Regression tests cover browser-controlled saved identity/token, legacy cleanup with unavailable storage, and missing/empty/incorrect administration keys. None uses real customer information or a production credential.

Raw install/quality logs, audit JSON, runtime requests, and results are in ignored `.verification/phase-0/`. A normal working-tree pipeline/runtime check also passed before the final isolated snapshot. Do not commit generated runtime copies or local secrets.

## 3. Post-change homepage browser and Lighthouse checks

Lighthouse 13.5.0 / Chrome 154.0.8037.57 against local production, using three default simulated mobile runs and one desktop run. The original baseline used Node 24.21.0; these checks use the aligned Node 22.23.3 runtime, so small timing differences are not isolated optimization gains.

| Profile | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Mobile run 1 | 85 | 100 | 96 | 100 | 3,845.57ms | 212.89ms | 0 |
| Mobile run 2 | 87 | 100 | 96 | 100 | 4,068.21ms | 64.00ms | 0 |
| Mobile run 3 | 90 | 100 | 96 | 100 | 3,614.06ms | 45.50ms | 0 |
| **Mobile median** | **87** | 100 | 96 | 100 | **3,845.57ms** | **64.00ms** | **0** |
| Desktop | **100** | 100 | 96 | 100 | 777.49ms | 0ms | 0 |

Mobile median FCP: **1,207.28ms**. No Lighthouse run warnings. Performance score remains 87 mobile / 100 desktop, matching the earlier score baseline; mobile LCP is still above the proposed 2.5s target. Field INP remains unmeasured.

Chromium checks at **1440×1000, 768×1000, 390×844, 320×740** passed: zero homepage axe findings in those scanned states, one H1, no horizontal overflow, no mock-login link, and mobile menu/Escape/focus return. These are homepage regression checks; secondary-page, screen-reader, Safari, translated journey, and field-CWV acceptance remain open.

Raw browser/Lighthouse files: `/tmp/omnirush/cropfresh-phase0-browser-results/summary.json` and `lh-home-*.json`. The durable measured summary is the table above.

## 4. Before/after evidence

| Phase 0 blocker | Audit baseline | Verified after implementation |
|---|---|---|
| Clean install | `ERESOLVE` from Next/next-intl peers | Fresh `npm ci` and complete quality pipeline pass |
| Production dependencies | 12 affected packages: 1 critical, 7 high, 4 moderate | **0 affected packages** |
| All dependencies | 54 affected packages: 1 critical, 45 high, 6 moderate, 2 low | **5 development-only high findings**, 0 critical |
| Tests | 3 suites / 5 tests | **5 suites / 15 tests** |
| Mock credential/JWT path | Public login and 30-day JWT/default-key implementation | Current-source credential implementation removed; tested GET/POST routes 404 |
| Mock listing/order APIs | Seeded arrays, fake prices, unverified writes | Tested GET/POST routes 404 |
| Lead admin configuration | Empty configured key could match an empty header; non-production reads bypassed the key | Fail-closed shared authorization; unit and production HTTP checks pass |
| Standalone runtime | Output absent; Docker workdir/static assumptions inconsistent | Output exists; independent standalone smoke passes; actual image build still unverified |
| CI | Incompatible `npm ci`; quality workflow unverified | Workflow declares strict install/quality/audit/runtime steps; current changes not remotely executed |

## 5. Known-error and external-verification register

| ID | Remaining item | Evidence / next action | Phase / owner dependency |
|---|---|---|---|
| P0-EXT-001 | Current changes have no verified GitHub run | Publish a self-contained reviewed branch/PR, run the updated workflow, attach commit/run URL; required check protection must be observed | **Phase 0 exit gate**, repository publishing/admin access |
| P0-EXT-002 | Required branch-check enforcement is absent on `main` | GitHub's branch API reports `protected: false`, protection disabled and required status checks off; the applied branch-rules API returns `[]`. Configure and verify the required quality check after its updated workflow runs | **Phase 0 exit gate**, repository administrator |
| P0-PUB-001 | Resolved locally: Git author/committer identity configured | `git var GIT_AUTHOR_IDENT` and `git var GIT_COMMITTER_IDENT` now succeed; the configured identity is available for commits | Verified locally, 2026-10-04 |
| P0-PUB-002 | Resolved: GitHub CLI authentication verified | `gh auth status` and `gh api user` identify `shrikantha-m`; the token includes `repo` and `workflow` scopes | Verified remotely, 2026-10-04 |
| P0-PUB-003 | Resolved: repository Write access verified | Repository API permissions now include `pull: true`, `push: true`, `triage: true`; `admin: false`, `maintain: false`. Branch publication is enabled; required branch-check configuration still needs an administrator | Verified remotely, 2026-10-04 |
| P0-DEV-001 | Five high development-only lint dependency findings | `braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next`; advisory [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm); npm proposes an incompatible lint-stack downgrade as its forced remediation | Dependency/security follow-up; retained findings are not claimed resolved |
| P0-HOST-001 | Container image not built here | Docker executable unavailable; official Node 22.23.3-alpine tag exists and standalone output passed locally; verify the actual Alpine image/build/runtime | Phases 9/11, host/CI runner access |
| P0-HOST-002 | Staging/production provisioning, live TLS and deployment not verified | Environment contracts/configuration are prepared; actual host/domain/secret/rollback setup requires owner access | Phases 9/11, operations/hosting |
| P1-CNT-001 | Remaining public demo/planned/unsupported content | Homepage previews and farmer/buyer/AI/sample article/hauler content still require removal or verified replacement; Phase 0 removed credential/API surfaces, not all content | **Phase 1 next**, approved public scope and owner facts |
| P1-OPS-001 | Policies, monitored contacts, service/commercial facts and durable lead delivery unapproved | Current audit's owner TODOs and DEC-002–010 remain open; do not invent facts or claim production receipt | Phases 1/7/8, business/operations/privacy owner |

Branch `fix/phase-0-stabilization` starts from `a9f6b63`. The reviewed application baseline is committed as `1e254a6`, and Phase 0 engineering changes as `a1b1655`; the latter's tree exactly matches the verified staged application tree above. Git author and committer identity are configured. GitHub CLI authentication succeeds as `shrikantha-m`, with repository Write access. PR publication and updated remote CI evidence are being prepared. Authenticated branch/rules API checks establish that `main` currently has no enabled protection or applied branch rules; configuration requires the repository administrator.

## 6. Exit decision and Phase 1 handoff

- [x] Current-source clean install and strict quality commands pass.
- [x] Meaningful regression suite passes.
- [x] No current production dependency finding.
- [x] Current-source mock credential/signing/API paths are withdrawn and verified locally.
- [x] Normal and standalone production runtime regression checks pass.
- [x] Runtime/environment/branch/release policy and known-error register are documented.
- [ ] **Published checkout has a successful updated GitHub run and required branch-check enforcement is verified.**

**Decision:** Local engineering verification is complete; full Phase 0 sign-off is pending P0-EXT-001. Do not mark that checkbox complete or declare the live site stabilized using local evidence.

After the gate is confirmed, Phase 1 starts with the existing [product/evidence pack](../phase-1/README.md): remove remaining unsupported/demonstration publication, reconcile master messages and claims, and collect owner approval for retained facts. Commercial, contact, legal, media, language, and operational approvals remain individual Phase 1 requirements. No new public business facts have been invented during Phase 0.
