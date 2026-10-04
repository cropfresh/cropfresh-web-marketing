# CropFresh Website Development Phase Plan

## Evidence-backed roadmap and launch acceptance criteria

**Project:** `cropfresh-web-marketing`\
**Updated:** 2026-10-04\
**Confirmed domain:** `https://cropfresh.in`\
**Audit homepage baseline (before Phase 0):** mobile Lighthouse performance **87/100** (three-run median), desktop **100/100**; mobile LCP **4,061.75ms**\
**Plan status:** Phase 0 engineering, committed-checkout, and remote CI verification complete; branch-enforcement gate open; Phase 1 queued\
**Related audit:** [Current measured audit and readiness ledger](./docs/WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md)

> The current audit replaces the historical subjective 5.6/10 baseline and 8.5+/10 target with measured tool results and an explicit pass/fail/blocked readiness ledger. No unmeasured improvement score or search ranking is promised. The current requirement removes public demos, placeholders, unsupported claims, and unfinished sections; earlier approvals for a public `/demo` area are superseded. Keep owner-dependent TODOs in documentation.

---

## 1. Product outcome

CropFresh must become a credible, high-converting, multilingual agritech website that helps visitors quickly choose the right path:

- **Farmers:** understand the verified selling process and availability, then reach a real inquiry or callback path.
- **Buyers:** understand the actual procurement and quality process, then contact the responsible team.
- **Haulers:** understand approved operating lanes, eligibility, and payment conditions, then express interest.
- **Partners and investors:** understand the business, technology, evidence, team, and contact path.

The final website must have:

1. No dead-end CTAs, placeholder links, or misleading buttons.
2. No build release that ignores TypeScript or lint failures.
3. No unverified public claim presented as established fact.
4. No missing metadata, favicon, legal, policy, or social assets.
5. Verified keyboard, screen-reader, mobile, and reduced-motion support for the published scope.
6. Real lead routing, analytics, monitoring, and error handling.
7. A repeatable staging-to-production deployment process with rollback.

---

## 2. Current baseline and launch targets

### Measured audit baseline before Phase 0 — 2026-10-04

**Latest verification:** [Phase 0 record](./docs/phase-0/README.md). Fresh committed-checkout and published PR CI checks pass install/typecheck/zero-warning lint/15 tests/strict build, with zero production dependency vulnerabilities and passing normal/standalone smoke checks. Current homepage mobile median performance is 87, LCP 3,845.57ms, TBT 64ms, CLS 0; desktop performance is 100. Five development-only lint findings and required branch enforcement remain open. The table below retains the earlier audit baseline.

| Area | Audit baseline before Phase 0 | Required outcome |
|---|---|---|
| Scoring | Ten-category verified gate counts in the current audit; no composite quality score | Attach actual results to each release gate |
| UI/UX | Agriculture-first homepage passes four-width rendering/menu checks; role CTAs still reach demos | Complete real role journeys and usability acceptance |
| TypeScript | `npm run typecheck` passes in installed tree | Preserve zero type errors on a clean install |
| ESLint | Zero ESLint errors/warnings; baseline-data freshness notice | Preserve clean lint |
| Automated tests | `npm test -- --runInBand`: 3 suites, 5 tests pass | Meaningful tests for changed critical journeys and API behavior |
| Build | Strict production build passes with TypeScript validation | Preserve validation; verify from clean checkout and CI |
| Clean install | `npm ci --dry-run --ignore-scripts` fails: Next 16 / next-intl 3 peer conflict | Compatible lockfile; actual `npm ci` and CI pass without bypass |
| Dependencies | Production audit: 1 critical, 7 high, 4 moderate; full audit: 54 affected packages | No critical/high production findings; reviewed remaining findings |
| Performance | Homepage mobile median 87, LCP 4.062s, TBT 53ms, CLS 0; desktop 100 | Comparable lab budgets and later field CWV verification |
| Accessibility | Axe findings on 14/16 routes; homepage/About have zero detected violations | Retained-page axe plus manual assistive-technology acceptance |
| CTA behavior | Four linked 404 destinations, two placeholder hauler actions; mock journeys | Every published action completes a real journey |
| SEO | 0/16 canonicals; 21 tested asset URLs fail; two duplicate title/description groups | Correct metadata/canonicals and working retained assets |
| Localization | Locale selector exists; most marketing copy remains English | Expose only complete reviewed language journeys; Kannada/Hindi in Advanced stage |
| Data/auth | Public browser/in-memory demos; mock JWT endpoint has default signing key | Withdraw mock UI/APIs; real product/auth only in explicitly approved future scope |
| Legal/contact | `/privacy` and `/terms` 404; business/support facts unapproved | Publish reviewed applicable policies and monitored real contacts |
| Operations | Leads write local JSON; durable receipt/alerts unverified; Docker assumptions inconsistent | Durable monitored delivery and verified actual hosting pipeline |
| Live checks | Confirmed domain fetch returns `ENOTFOUND` here | Verify DNS/TLS/headers/crawl/forms from an accessible environment |

### Required release gates

| Gate | Minimum before production |
|---|---:|
| UI/UX | Evidence for every applicable acceptance criterion in Section 4; all critical real journeys pass |
| Accessibility | WCAG 2.2 AA critical checks pass; no critical axe findings |
| Performance | Proposed lab: mobile median performance ≥95, LCP <2.5s, CLS ≤0.1; field p75 INP <200ms measured separately when data exists |
| SEO | No broken indexable page, canonical, metadata, sitemap, robots, and schema checks pass |
| Functional | 100% of critical-path smoke tests pass |
| Security | No critical/high production dependency finding; mock signing/auth removed; secrets outside repository; headers/authorization verified |
| Reliability | Lead, analytics, error, and uptime monitoring verified |
| Content trust | All public claims, testimonials, images, contacts, and app links approved |
| Localization | Every exposed language choice fully translates its critical journey; Kannada/Hindi launch timing depends on native review |
| Release quality | Typecheck, lint, tests, build, and deployment smoke tests pass without bypasses |

---

## 3. Development principles

### 3.1 User-first

Design around completed tasks, not around the number of sections or animations. Every page should answer:

1. Where am I?
2. Is this for me?
3. What value do I get?
4. Why should I trust CropFresh?
5. What should I do next?

### 3.2 Evidence before claims

Every percentage, market statistic, income result, AI accuracy, payment promise, delivery promise, and testimonial must have:

- source or internal methodology,
- date or pilot period,
- geography or audience,
- conditions and limitations,
- approval from the content owner.

### 3.3 One system, three audiences

Farmers, buyers, and haulers may have different content and accent colors, but they must share the same navigation logic, typography, controls, form behavior, accessibility standard, and trust language.

### 3.4 Publish complete verified functionality

Remove public simulations, sample prices/results, mock authentication, and unfinished/coming-soon sections. Public TODOs and labels do not replace completion. Real pilot functionality may be described only with verified scope and conditions. Research prototypes may remain private, outside deployed routes.

### 3.5 Quality is a release requirement

TypeScript, ESLint, tests, accessibility, performance, security, content approval, and deployment verification are part of “done,” not tasks postponed after design.

---

## 4. UI/UX acceptance criteria

These ten dimensions define the desired experience; each applicable criterion needs evidence. The audit's readiness count has its own explicit ten-gate ledger and is not a measured user-satisfaction score. A serious failure in a critical journey blocks launch.

| Dimension | Acceptance definition | Evidence required |
|---|---|---|
| Clarity | A first-time visitor understands the page purpose, target audience, benefit, and next action within 5 seconds | Five-second test, stakeholder review, copy approval |
| Information architecture | Users can reach any primary task in two or three intentional steps | Sitemap, journey map, click-path test |
| Conversion | Every role has one clear primary path and a visible response expectation | CTA matrix, form completion test, analytics event test |
| Consistency | Buttons, forms, cards, tabs, spacing, typography, states, and navigation behave consistently | Design-system review, component inventory |
| Accessibility | Keyboard, screen reader, contrast, focus, zoom, reduced motion, errors, and status updates work | axe, keyboard test, NVDA/VoiceOver test, contrast report |
| Responsive design | No content, interaction, or layout failure from 320px mobile through large desktop | Device matrix and visual regression screenshots |
| Feedback | Loading, success, failure, empty, validation, offline, and permission states are understandable | State inventory and interaction test |
| Trust | Only verified proof/claims, applicable policies, and approved privacy language appear at the decision point; no public demos | Content and legal approval |
| Performance | UI interaction remains responsive and key pages meet Core Web Vitals targets | Lighthouse, WebPageTest, RUM data |
| Localization | Every published language preserves meaning, hierarchy, input behavior, and layout | Native-speaker review and locale QA |

### UI/UX launch rule

Do not approve a release because it “looks good.” Approve it only when:

- all ten dimensions have evidence,
- all critical journeys pass,
- all severity-1 and severity-2 UX defects are closed,
- all public CTAs work,
- all major screens have loading, empty, error, and success states,
- responsive and accessibility testing passes,
- the product owner signs the final journey review.

---

## 5. Phase overview

### Current execution order: Quick wins → Core fixes → Advanced

This three-stage plan controls execution. The numbered phases below retain the detailed work breakdown; their durations are provisional planning estimates and their older draft packs require reconciliation with the current publication rule.

| Stage / audit tasks | Priorities | Detailed phases | Exit evidence / approval |
|---|---|---|---|
| **Quick wins — Q1–Q3** | Withdraw public mocks/unfinished content; coordinate patched compatible dependencies and clean install; repair retained links/assets/metadata/crawl rules and critical accessible controls | 0, 1, 2, 6, 8, 9 | Approve implementation batch/retained actions; clean install + quality commands; fresh dependency/link/axe checks; no public placeholders/mocks |
| **Core fixes — C1–C3** | Complete real farmer/buyer landing journeys and consistent agriculture system; durable monitored inquiries/policies; actual host pipeline; measured mobile performance and telemetry | 1–10 | Approve larger route/integration refactors; owner facts/provider configuration; staging lead receipt; comparable Lighthouse; keyboard/screen-reader and deploy/alert evidence |
| **Advanced — A1–A2** | Reviewed Kannada/Hindi journeys; evidence-backed crop/region content; Search Console/local presence; research/field conversion experiments; optional real authenticated product scope | 3, 7, 8, 12 | Owner/native-review/search access; eligibility; actual traffic/field evidence; separate approval for transactional product scope |

Do not postpone owner-dependent policy, support, security, or operational blockers beyond launch. See the [audit's task acceptance and owner TODOs](./docs/WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md#5-prioritized-execution-plan). Before each change state what and why; afterward verify the change. Inspect status/diff and create small scoped implementation commits when the approved fixes are complete. Existing uncommitted work needs ownership review before staging.

| Phase | Name | Primary outcome | Suggested duration | Exit gate |
|---|---|---|---:|---|
| 0 | Governance and technical stabilization | Safe development baseline | 1–2 days | Typecheck/lint/build process is honest and reproducible |
| 1 | Product strategy, evidence, and content | Approved positioning and trustworthy content source | 2–4 days | Claims, audiences, KPIs, and content owners approved |
| 2 | Information architecture and user journeys | Clear paths for every audience | 2–4 days | Journey maps and CTA destinations approved |
| 3 | UX research and wireframes | Validated page structure and task flows | 3–5 days | Critical flows pass usability review |
| 4 | Visual design system | Consistent, accessible design language | 4–7 days | Tokens and components meet UI/UX rubric |
| 5 | Frontend foundation and shared components | Maintainable implementation base | 3–5 days | Shared components, routing, states, and tests ready |
| 6 | Page and feature implementation | Complete public website journeys | 1–2 weeks | All pages and critical interactions work |
| 7 | Conversion, backend, and integrations | Real lead, auth, data, app, and analytics flows | 1–2 weeks | Production integrations verified in staging |
| 8 | Accessibility, localization, SEO, and content QA | Discoverable and inclusive public site | 1–2 weeks | WCAG, locale, metadata, and content gates pass |
| 9 | Performance, security, and infrastructure | Fast, secure, observable runtime | 1 week | Budgets, headers, secrets, monitoring, and backup checks pass |
| 10 | QA, UAT, and release candidate | Evidence-backed release candidate | 1 week | No launch-blocking defects remain |
| 11 | Deployment and launch | Production release with rollback | 2–3 days | Go-live checklist and smoke tests pass |
| 12 | Post-launch optimization | Continuous improvement based on real data | Ongoing | Weekly review and controlled experiments active |

---

# 6. Detailed development phases

## Phase 0 — Governance and technical stabilization

**Duration:** 1–2 days\
**Owner:** Engineering lead\
**Goal:** Create a trustworthy foundation before visual or feature work continues.

**Implementation status:** Engineering, clean committed-checkout verification, and published PR CI completed on 2026-10-04. Fresh Node 22.23.3 installation, regenerated types, zero-warning lint, 5 suites/15 tests, zero production findings, strict build, and 52 production/standalone HTTP assertions pass. Mock login/JWT/listing/order routes and embedded credentials are withdrawn; lead administration fails closed. The [Phase 0 record](./docs/phase-0/README.md) contains actual commit/run evidence and the known-error register. Full Phase 0 exit remains pending required branch-check enforcement; actual staging/hosting/container verification remains in Phases 9/11.

### Work items

- Create `development`, `staging`, and `production` environments.
- Record Node, npm, Next.js, TypeScript, and browser support versions.
- Remove `typescript.ignoreBuildErrors` from the production configuration.
- Remove the unsupported Next 16 `eslint` configuration block.
- Make CI run:

  ```bash
  npm ci
  npm run typecheck
  npm run lint
  npm test -- --runInBand
  npm audit --omit=dev --audit-level=high
  npm run build
  npm run verify:phase0
  ```

- Fix the `Navbar` role type mismatch.
- Resolve all current ESLint errors.
- Remove unused imports and variables.
- Replace unsafe `any` types with explicit types.
- Fix hydration-safe localStorage initialization patterns.
- Establish branch, pull request, review, and release naming rules.
- Add a `CHANGELOG.md` or release notes convention.
- Preserve the existing meaningful suite; add regression coverage where approved changes alter critical behavior.
- Resolve Next/next-intl compatibility and regenerate the lockfile; align CI, Amplify, Docker, and approved runtime versions without peer bypasses.
- Upgrade or remove affected production dependencies after compatibility review; rerun production and full dependency audits.
- Remove the deployed mock-auth/default-signing-key path and other public mock APIs.

### Deliverables

- Clean CI workflow.
- Environment and branch policy.
- Known-error register.
- Baseline dependency and runtime inventory.

Delivered locally: updated `.github/workflows/ci.yml`, aligned host/build files, [contribution/environment/release policy](./CONTRIBUTING.md), [changelog](./CHANGELOG.md), `.env.example`, reusable `verify:phase0`, and [Phase 0 evidence/known-error register](./docs/phase-0/README.md). Remote enforcement and actual infrastructure are not established by those source files.

### Exit criteria

- [x] Installed working tree passes typecheck.
- [x] Installed working tree passes lint.
- [x] Installed working tree production build passes without ignored validation.
- [x] An isolated current-source snapshot installs and passes all quality commands without peer bypass.
- [x] Clean committed checkout and updated PR pipeline pass; [commit/run evidence](./docs/phase-0/README.md) attached.
- [ ] Required branch checks are enforced on `main`; a passing workflow alone is insufficient.
- [x] Current-source mock signing-key/embedded credential/API paths are removed and return 404 locally; secrets policy is documented.
- [x] Current-source production dependency audit reports no vulnerabilities; five development-only lint findings are recorded separately.
- [x] A meaningful test suite passes with `npm test -- --runInBand`.

**Transition rule:** Confirm required branch-check enforcement before declaring full Phase 0 sign-off and starting Phase 1 implementation. Published-checkout and remote CI evidence are complete; production deployment acceptance remains separate.

---

## Phase 1 — Product strategy, evidence, and content

**Next-phase handoff:** [Phase 0 engineering/committed-checkout/CI verification](./docs/phase-0/README.md) is complete. Phase 1 implementation is queued behind required branch-check enforcement; retained business facts and DEC-002–010 still require owner input.

**Duration:** 2–4 days\
**Owner:** Product marketing lead\
**Goal:** Define what the website promises and ensure every promise is credible.

**Implementation status:** Draft deliverables prepared and repository evidence reviewed on 2026-10-03. The first website content implementation was completed locally on 2026-10-04: homepage messaging, audience choice, demo/planned labels, shared navigation/footer, matching root metadata, dashboard demo notices, and public server rendering. See the [implementation record](./docs/phase-1/IMPLEMENTATION_PROGRESS.md) for verified scope and next tasks. Lead-first launch direction is approved by the project requester; remaining page/locale adoption, business approvals, and claim verification are pending. Start with the [Phase 1 delivery pack](./docs/phase-1/README.md) for findings, decisions, and handoff status.

**Current requirement update:** The agriculture-first homepage is now implemented locally, but public demo/planned publication must be removed. Earlier labeling work is historical progress, not current launch acceptance. Business verification remains pending.

### Audience definitions

#### Farmers

- Primary job: list and sell produce with less friction.
- Main pain: price uncertainty, delayed payment, quality recognition, and middlemen.
- Primary action: request a callback, join the farmer program, or use a verified app flow.
- Required proof: farmer outcome, service geography, payment terms, support language.

#### Buyers

- Primary job: source consistent, verified produce.
- Main pain: quality variance, supply uncertainty, traceability, and pricing.
- Primary action: submit a real sourcing inquiry; authenticated product access is separate future approved scope.
- Required proof: quality process, sample grade, pricing breakdown, delivery promise, buyer result.

#### Haulers

- Primary job: find efficient loads and receive predictable payment.
- Main pain: empty returns, route inefficiency, fragmented bookings, delayed payment.
- Primary action: request a callback or start verified onboarding.
- Required proof: route example, earnings assumptions, vehicle requirements, service locations.

### Content decisions

- Replace unsupported absolute claims with precise, conditional language.
- Define “T+0,” “AI-verified,” “Digital Twin,” “AISP,” and “quality grade.”
- Classify capabilities as `live`, `pilot`, `demo`, `planned`, or `coming_soon` in the internal feature register; publish only complete supported functions.
- Approve the primary homepage headline and role-specific value propositions.
- Create a claims register with source, date, owner, and review date.
- Approve real contact details, social profiles, app store URLs, testimonials, images, team information, and business details.

### Deliverables

- [x] [Audience/persona brief, proposed launch scope, and KPI definitions](./docs/phase-1/PRODUCT_STRATEGY.md).
- [x] [Message hierarchy, role-specific copy, metadata intent, and form/demo feedback](./docs/phase-1/MESSAGE_HIERARCHY.md).
- [x] [Claims and proof register](./docs/phase-1/CLAIMS_REGISTER.md): 46 claim families, source references, interim treatment, evidence requirements, owners, and review rules.
- [x] [Content inventory](./docs/phase-1/CONTENT_INVENTORY.md): 29 mounted/unmounted content groups, articles, metadata, media, and operational messages.
- [x] [Feature status register](./docs/phase-1/FEATURE_STATUS.md): 23 capabilities, repository evidence, and promotion requirements.
- [x] [Editorial and localization glossary](./docs/phase-1/EDITORIAL_AND_LOCALIZATION.md): English master rules, terminology, and Kannada/Hindi review workflow.
- [x] [Decision register and Phase 1 coverage matrix](./docs/phase-1/README.md): 10 owner decisions and implementation handoff.

### Exit criteria

- [ ] Product owner approves audience goals.
- [ ] Marketing owner approves message hierarchy.
- [ ] Operations approves contact and lead-response promises.
- [ ] Every retained public metric has accepted evidence and conditions; unsupported metrics and sample calculations are removed from public rendering.
- [ ] Legal owner identifies required policy and consent content.

Phase 2 planning can proceed from the draft pack. Phase 1 business sign-off requires owner input; no content, commercial availability, or deployment readiness is approved by the existence of these documents.

---

## Phase 2 — Information architecture and user journeys

**Duration:** 2–4 days\
**Owner:** Product designer + product manager\
**Goal:** Give every visitor a clear, low-friction path to the correct action.

**Implementation status:** Draft sitemap, CTA contracts, journey maps, and form/state requirements were prepared on 2026-10-03. The historical [APR-001](./docs/phase-2/README.md#approval-record--apr-001) public-demo direction is superseded by the current no-public-demo requirement. Lead-first farmer/buyer landing pages remain the recommended replacement, pending detailed route/CTA approval and owner facts. Existing packs remain research inputs rather than the current publication contract.

### Recommended sitemap

```text
/
├── /#choose-role
├── /#technology
├── /farmers
│   ├── /farmers#how-it-works
│   ├── /farmers#fees-and-payment
│   ├── /farmers#callback
│   └── /farmers#faq
├── /buyers
│   ├── /buyers#quality
│   ├── /buyers#pricing
│   ├── /buyers#traceability
│   ├── /buyers#inquiry
│   └── /buyers#faq
├── /haulers
│   ├── /haulers#requirements
│   ├── /haulers#earnings
│   ├── /haulers#callback
│   └── /haulers#faq
├── /ai (only complete, verified explanatory content; otherwise omitted)
├── /about
├── /blog
│   └── /blog/[slug]
├── /contact
├── /privacy
└── /terms
```

`/farmers` and `/buyers` become real public landing pages under the proposed architecture. Existing demo/login/listing routes and mock APIs are withdrawn from deployment; do not introduce a public `/demo` namespace. Choose truthful legacy 404/410 or relevant redirects during route approval. Publish conditional pricing/policy/careers/press, app, story, or AI content only when complete and supported. Remove unfinished controls/anchors instead of linking to absent content. The [earlier route register](./docs/phase-2/SITEMAP_AND_ROUTES.md) requires reconciliation before implementation.

### CTA destination matrix

| Location | Audience | CTA | Destination | Success condition |
|---|---|---|---|---|
| Header | All | Get started | `/#choose-role` | Role selector opens and offers valid role paths |
| Hero | Farmer | Explore selling with CropFresh | `/farmers` | Public farmer information and callback action open |
| Hero | Buyer | Explore produce sourcing | `/buyers` | Verified public buyer information and real inquiry action open |
| Hero | Delivery partner | Explore delivery opportunities | `/haulers` | Requirements and interest path open |
| Hero | All | See how AI works | `/#technology` | Mounted explanation section opens |
| Farmer page | Farmer | Request a call | `/farmers#callback` | Accessible role-interest form opens |
| Buyer page | Buyer | Discuss sourcing | `/buyers#inquiry` | Accessible real sourcing-inquiry form opens |
| Hauler page | Delivery partner | Register your interest | `/haulers#callback` | Accessible interest form opens |
| Footer | All | Contact the team | `/contact#contact-form` | General inquiry form opens |
| Footer | Buyer | Understand pricing | `/buyers#pricing`, only if published | Actual approved pricing/process explanation opens; action omitted while incomplete |
| App area | Role | Download role app | One verified canonical store URL per role | Actual owned release opens; action absent until verified |
| Form accepted state | Lead | Useful next step | CTA-019–022 in the full matrix | Working truthful destination; no account-created claim or placeholder `#` |

The [full CTA matrix](./docs/phase-2/CTA_MATRIX.md) specifies 40 navigation/conversion contracts, one accountable destination-owner role per contract, conditional external actions, and acceptance conditions. Real owner names and enabled store/contact destinations require confirmation.

### Journey maps to produce

- First-time farmer on a low-end mobile device.
- Buyer comparing suppliers on desktop.
- Hauler joining from a mobile device.
- Returning lead checking the contact page.
- Native Kannada speaker using the callback form.
- Search visitor landing on a blog article.
- User with reduced motion and keyboard-only input.
- User on a slow connection with image and video loading delayed.

All eight scenarios are drafted as JRN-001–008, with partnership/media JRN-009 and primary/secondary paths for each audience in the [journey maps](./docs/phase-2/USER_JOURNEYS.md). These remain research hypotheses until Phase 3 validation.

### Deliverables

- [x] [Sitemap, route register, public/demo navigation, and legacy migration contract](./docs/phase-2/SITEMAP_AND_ROUTES.md).
- [x] [CTA destinations, destination-owner roles, and completion conditions](./docs/phase-2/CTA_MATRIX.md).
- [x] [Role and cross-cutting journey maps with recovery and usability tasks](./docs/phase-2/USER_JOURNEYS.md).
- [x] [Four role/inquiry form contracts, context handling, and interaction states](./docs/phase-2/FORM_AND_STATE_CONTRACTS.md).
- [x] [Repository findings, architecture decisions, and coverage matrix](./docs/phase-2/README.md).

### Exit criteria

- [ ] All primary pages are in the sitemap.
- [ ] Every CTA has one destination owner.
- [ ] Every role has a primary and secondary journey.
- [ ] Dead routes and placeholder links are either implemented or removed.
- [ ] User flows are approved before high-fidelity implementation.

Draft document coverage exists, but the public-demo approval is superseded. Reconcile IA-001/002 and downstream CTA/form contracts with the current publication rule, obtain detailed route/flow approval, and attach runtime evidence before marking these exit gates complete.

---

## Phase 3 — UX research and wireframes

**Duration:** 3–5 days\
**Owner:** Product designer\
**Goal:** Validate structure and task completion before polishing visuals.

### Wireframe requirements

Create desktop and mobile wireframes for:

- Homepage.
- Farmer landing page and callback flow.
- Buyer landing page and real sourcing-inquiry flow.
- Hauler landing page and callback flow.
- Complete verified AI explanation, only if retained.
- About page.
- Blog index, article page, and related-content path.
- Contact page.
- Privacy and terms pages.
- Legacy mock-route withdrawal/recovery; real login/product screens only in separately approved production product scope.
- Global header, mobile menu, footer, form states, tab states, loading states, empty states, and error states.

### UX review questions

- Can a new visitor identify the correct role without reading every section?
- Is the first CTA specific rather than generic?
- Are benefits explained before internal technical terms?
- Are users told what happens after form submission?
- Can users recover from validation, API, microphone, search, and network errors?
- Is content understandable when animations do not run?
- Is every important action available without hover?
- Does the page remain useful when images fail to load?

### Usability validation

- Test with at least five representative users or internal proxies per audience.
- Run a five-second first-impression test for the homepage.
- Run a first-click test for farmer, buyer, and hauler journeys.
- Test form completion on a mobile viewport.
- Test Kannada and Hindi content with native-language reviewers.
- Capture task completion, time on task, errors, confusion, and qualitative feedback.

### Deliverables

- Wireframes.
- User-flow diagrams.
- Prototype links.
- Usability findings.
- Prioritized UX issue list.

### Exit criteria

- [ ] 90% or more of test participants choose the correct primary path.
- [ ] All critical task blockers are resolved.
- [ ] The product owner approves the prototype.
- [ ] Empty, loading, error, success, and offline states are defined.

---

## Phase 4 — Visual design system

**Duration:** 4–7 days\
**Owner:** UI designer + frontend lead\
**Goal:** Extend the agriculture-first visual language consistently across retained public pages and meet the acceptance criteria.

### Design tokens

Define and document:

- Brand colors, semantic colors, and contrast-safe variants.
- Background, surface, border, text, disabled, success, warning, error, and info colors.
- Typography families, sizes, weights, line heights, and tracking.
- Spacing scale.
- Radius scale.
- Elevation and focus-ring styles.
- Motion durations and easing.
- Breakpoints and container widths.
- Icon size and stroke rules.
- Form control height and touch target rules.

### CSS token cleanup

The current stylesheet references undeclared values. Define or replace at least:

```css
--color-teal
--color-teal-dark
--color-primary-green
--color-primary-blue
--glass-light-bg
--glass-light-blur
--glass-light-border
--glass-heavy-bg
--glass-heavy-blur
--glass-heavy-border
--glow-primary-sm
--glow-primary-md
--glow-primary-lg
--glow-accent-sm
--glow-accent-md
--glow-accent-lg
--ease-out-expo
--duration-fast
--duration-slower
--space-2
--space-3
```

### Required shared components

- `Navbar`.
- `MobileMenu`.
- `Footer`.
- `Container`.
- `SectionHeader`.
- `Button` and `LinkButton`.
- `AudienceSelector`.
- `Tabs` with full ARIA behavior.
- `Card` and `FeatureCard`.
- `Stat`.
- `FormField`.
- `FormStatus`.
- `Modal` and `Drawer`.
- `Accordion`.
- `Breadcrumbs`.
- `LanguageSwitcher`.
- `LoadingState`, `EmptyState`, `ErrorState`, and `SuccessState`.

### Visual rules

- Use the [agriculture-first cream/sage/forest/harvest system](./docs/AGRITECH_THEME.md), stable farm/produce imagery, and restrained technology accents.
- Use calm accessible surfaces for approved proof, FAQs, forms, and policies; omit unsupported testimonials.
- Use contrast-safe harvest actions consistently.
- Use green for positive agriculture and earning states.
- Use motion to explain state or hierarchy, not as decoration everywhere.
- Every image must have an approved crop, focal point, aspect ratio, and alt text.
- Every animated visual must remain understandable when motion is disabled.

### Exit criteria

- [ ] Design tokens are documented and implemented.
- [ ] All custom CSS variables are defined or removed.
- [ ] Components have default, hover, focus, active, disabled, loading, error, and success states.
- [ ] Contrast review passes for text and controls.
- [ ] Design review maps components to the applicable acceptance criteria with evidence.

---

## Phase 5 — Frontend foundation and shared components

**Duration:** 3–5 days\
**Owner:** Frontend lead\
**Goal:** Build a reliable implementation layer before assembling pages.

### Engineering tasks

- Keep the public marketing shell independent of local mock providers; exclude mock UI/APIs from deployment. Real authenticated product scope requires separate approval.
- Keep public marketing pages server-rendered where possible.
- Use client components only for interaction, animation, and browser APIs.
- Create typed data models for audience content, claims, testimonials, FAQs, products, and CTAs.
- Create a route constants module to avoid string drift.
- Create a local asset registry or validation script.
- Add form schema, route destination, local asset, and critical component tests.
- Configure Jest so the required test command fails on test failures and does not pass through an empty suite.
- Add a reusable `safeWindow`/hydration pattern for browser-only state.
- Add a global error boundary and not-found page.
- Add loading UI for navigation and dynamic route transitions.
- Define image sizes, responsive behavior, and remote-image policy.

### Accessibility implementation

- Add `aria-current="page"` to active navigation links.
- Add `aria-expanded` and `aria-controls` to menu and dropdown buttons.
- Add tablist, tab, tabpanel, `aria-selected`, and keyboard arrow behavior.
- Add live regions for search, voice recording, form status, and async errors.
- Add Escape and focus management for menus, dialogs, drawers, and dropdowns.
- Ensure decorative motion and icons have correct `aria-hidden` behavior.

### Exit criteria

- [ ] Shared controls work independently in a component test or story environment.
- [ ] Keyboard behavior is implemented before page assembly.
- [ ] Common loading/error/success states are reusable.
- [ ] Route and asset validation prevents new dead references.
- [ ] The initial meaningful test suite passes with `npm test -- --runInBand`.

---

## Phase 6 — Page and feature implementation

**Duration:** 1–2 weeks\
**Owner:** Frontend team\
**Goal:** Implement all approved pages and complete public journeys.

### Global shell

- Header has one clear primary CTA.
- Desktop and mobile navigation expose the same essential destinations.
- A retained complete AI explanation is equally reachable on desktop/mobile; otherwise remove its public entry points.
- Active route state is visible and accessible.
- Footer contains only working links.
- Newsletter form has real submission behavior or is removed.

### Homepage

- Stable, searchable headline.
- Three role-based CTAs.
- Proof only with verified source/date and approved conditions; omit while unsupported.
- Audience cards.
- Problems and solutions.
- Four-step workflow.
- Approved real case study/evidence only when available.
- App/product section only for actual complete verified functionality and releases.
- AI and traceability section.
- FAQ.
- Final role-specific CTA.

### Farmer page

- Simple explanation of listing, verification, matching, delivery, and payment.
- Callback form above the fold or within one intentional scroll.
- Explain only verified available processes; no public voice-listing simulation.
- Kannada, Hindi, and English content for the critical path.
- No sample dashboard or invented earnings/results.
- Source and timestamp for market insights.

### Buyer page

- Verified quality and traceability explanation.
- Actual procurement/process information; inventory/search only if real product scope is approved and implemented.
- Real sourcing-inquiry form with validation, loading, accepted, duplicate, and failure states.
- Working truthful next-step action; no simulated account creation.

### Hauler page

- Clear earning model with assumptions.
- Vehicle and document requirements.
- Supported locations.
- Callback form.
- Working owned app download only for a verified release; omit unfinished download sections.

### AI page

- Publish only complete verified capabilities/explanations; withdraw public simulations and planned/coming-soon blocks.
- Plain-language explanation before technical architecture.
- Accuracy methodology and model limitations.
- Human verification and error handling.
- Working real inquiry CTA.

### Blog, about, contact, and policy pages

- Blog index and articles have author, date, reading time, related content, and conversion CTA.
- About page has approved story, team, milestones, and locations.
- Contact page provides approved monitored details, a real form, applicable FAQ/privacy notice, and only an operationally accepted response promise.
- Privacy, terms, cookies, refund, careers, press, and pricing destinations either exist or are removed from navigation.

### Exit criteria

- [ ] All approved pages exist and are linked correctly.
- [ ] Every critical interaction works on desktop and mobile.
- [ ] No `href="#"` remains in production-facing UI.
- [ ] No intended user action is a no-op.
- [ ] Each page has all required empty, loading, error, success, and unavailable states.

---

## Phase 7 — Conversion, backend, and integrations

**Duration:** 1–2 weeks\
**Owner:** Backend + frontend + growth\
**Goal:** Connect the public experience to real operational workflows.

### Lead management

- Connect farmer, buyer, hauler, contact, and newsletter forms to production-approved services.
- Validate payloads server-side, not only in the browser.
- Add spam protection, honeypot verification, rate limiting, and abuse logging.
- Route leads to the correct team or CRM pipeline.
- Send confirmation email/SMS only with approved templates and consent.
- Store submission status and retry failures safely.
- Provide a clear response SLA and support contact.

### Authentication and dashboards

**Separate optional product scope:** the marketing release withdraws mock authentication/dashboards. The following work applies only after explicit approval of real product functionality.

- Use secure server-side sessions or an approved identity provider.
- Enforce user roles server-side.
- Protect farmer, buyer, hauler, listings, and orders routes.
- Never use shared demo credentials in production.
- Do not deploy demo accounts or seeded mock data on the public website.
- Add logout, session expiry, unauthorized, and forbidden states.

### Product integrations

These integrations are conditional on separately approved real product scope; they are not a requirement to manufacture marketplace functionality for a marketing launch.

- Real listing creation and retrieval.
- Real buyer search, filtering, and location behavior.
- Real order and offer state transitions.
- Real hauler assignment and route status where supported.
- Real payment status and settlement conditions.
- Real app store deep links and web fallback.

### Analytics

Implement consistent events:

| Event | Required properties |
|---|---|
| `role_selected` | `role`, `page_path`, `source` |
| `primary_cta_click` | `cta_name`, `role`, `destination`, `page_path` |
| `form_view` | `form_name`, `role`, `page_path` |
| `form_start` | `form_name`, `role`, `page_path` |
| `form_submit` | `form_name`, `role`, `success`, `page_path` |
| `form_error` | `form_name`, `field`, `error_type` |
| `app_download_click` | `app_role`, `store`, `destination` |
| `language_changed` | `from`, `to`, `page_path` |
| `faq_opened` | `question_id`, `page_path` |

Do not send names, phone numbers, emails, or other personal data to analytics.

### Exit criteria

- [ ] Test leads reach the correct owner or system.
- [ ] Server-side validation rejects invalid payloads.
- [ ] API failure leaves user data recoverable.
- [ ] No public mock auth/product routes remain; any separately enabled real routes enforce roles server-side.
- [ ] Critical analytics events appear in staging analytics.
- [ ] No personal data is included in event properties.

---

## Phase 8 — Accessibility, localization, SEO, and content QA

**Duration:** 1–2 weeks\
**Owner:** Accessibility lead + SEO lead + localization reviewer\
**Goal:** Make the website understandable, discoverable, and inclusive.

### Accessibility

- Run axe or equivalent automated checks.
- Run keyboard-only tests at 320px, 768px, and desktop widths.
- Test NVDA/Chrome and VoiceOver/Safari.
- Test zoom to 200%.
- Test forced colors/high contrast where applicable.
- Test reduced motion.
- Test all form errors and async status announcements.
- Test focus order and focus return after menus/dialogs.
- Test contrast for low-opacity text, gradients, badges, and buttons.

### Localization

- Decide URL-based locale routing or complete client-side translation.
- Prefer URL-based routing for SEO and shareable pages.
- Translate navigation, hero, CTA, forms, errors, FAQ, footer, metadata, policies, and status messages.
- Translate critical farmer and hauler paths into Kannada and Hindi with native review.
- Test text expansion, mixed scripts, select controls, labels, phone fields, and mobile layouts.
- Ensure language choice survives reload and share.

### SEO

- Add unique title, description, canonical, Open Graph, and Twitter data for every intended public page.
- Create accurate share images for retained published pages using cleared assets.
- Add favicon, Apple icon, and web manifest.
- Add applicable Organization/WebSite JSON-LD using verified public facts and a working logo, without invented contacts/locations.
- Validate Article JSON-LD only for complete approved published articles.
- Add BreadcrumbList where useful.
- Add FAQ schema only when appropriate and matching visible verified content; do not promise rich results.
- Include public pages in the sitemap with stable last-modified values.
- Exclude private/auth/API paths from indexing as appropriate; remove mock paths from deployment rather than relying on `noindex`.
- Verify `robots.txt` and sitemap in production.
- Verify every internal link and local asset.

### Content QA

- Verify every numerical claim, testimonial, image, contact, social URL, app URL, policy, and team member.
- Add source/date/methodology near claims.
- Remove unsupported demos, sample results, planned/coming-soon sections, and unfinished actions from publication. Confirm any retained real pilot's actual scope.
- Review spelling, punctuation, capitalization, and translation quality.

### Exit criteria

- [ ] No critical accessibility defects.
- [ ] Critical journeys work in every exposed language; Kannada/Hindi have native approval before publication.
- [ ] All intended SEO assets return 200.
- [ ] Structured data validates.
- [ ] Content and legal owners sign off.

---

## Phase 9 — Performance, security, and infrastructure

**Duration:** 1 week\
**Owner:** Engineering lead + DevOps/security reviewer\
**Goal:** Make the website fast, secure, observable, and recoverable.

### Performance

- Repeat three homepage mobile Lighthouse runs and one desktop run with the recorded profile; test retained secondary pages and an actual representative mobile device.
- Collect field Core Web Vitals when sufficient representative traffic exists; lab TBT does not establish INP.
- Optimize the measured farmer-image LCP, including tested high fetch priority and responsive size/compression.
- Lazy-load below-the-fold images, video, and nonessential interactive components.
- Reduce simultaneous blur, backdrop-filter, mix-blend, and infinite motion layers.
- Replace raw `<img>` elements with optimized image components where possible.
- Add image dimensions to prevent layout shifts.
- Keep the stable non-autoplay agriculture hero; evaluate any separately approved video against explicit mobile budgets.
- Keep JavaScript and initial page payload within agreed budgets.
- Test slow network, CPU throttling, low-memory mobile, and reduced motion.

### Performance budgets

| Metric | Target |
|---|---:|
| Mobile Lighthouse performance | Proposed median ≥95 under recorded profile |
| Mobile lab LCP | Proposed <2.5 seconds; current median 4.062s |
| Lab CLS | ≤0.1; current homepage 0 |
| Field CWV | p75 LCP ≤2.5s, CLS ≤0.1, INP <200ms; currently unmeasured |
| Initial homepage JS transfer | Proposed ≤200KiB; current 302,165 bytes incl. response overhead |
| Initial homepage CSS transfer | Proposed ≤30KiB; current 36,767 bytes incl. response overhead |
| Above-the-fold image | Agree responsive transfer budget after LCP optimization measurement |
| Video | No autoplay hero; any approved media has a separate mobile/preload budget |

### Security

- Store secrets only in the hosting provider’s encrypted environment variables.
- Inventory all environment variables, including analytics and backend URLs.
- Add strict transport security after HTTPS is confirmed.
- Configure Content Security Policy after testing required scripts and assets.
- Keep `X-Content-Type-Options`, `Referrer-Policy`, and appropriate permissions policy.
- Add rate limiting to leads, auth, voice, listings, and orders APIs.
- Validate and sanitize all request bodies server-side.
- Prevent open redirects and unsafe external URL handling.
- Review CORS, cookies, CSRF, session expiry, and authorization.
- Scan dependencies and container images.
- Do not expose demo passwords, tokens, API keys, or private customer data.
- Remove public default-key JWT and in-memory mock listing/order endpoints; retain no deployed fake prices or transactions.

### Infrastructure

- Confirm the actual production host and build path; Amplify exists in source, while Docker/CI assumptions need reconciliation.
- Resolve clean-install compatibility before deployment; if Docker is retained, correct workdirs, standalone output, and static asset copies and verify the image.
- Confirm region, runtime, serverless limits, image optimization, and file storage.
- Define database, email, CRM, SMS, analytics, object storage, and payment providers.
- Define backup frequency, retention, restore owner, and restore test cadence.
- Add uptime, error, API latency, form-failure, and lead-routing alerts.
- Add error tracking with release version and environment tags.
- Add structured logs without personal data.

### Exit criteria

- [ ] Performance budgets pass on staging.
- [ ] No high or critical security issue remains.
- [ ] Secrets are managed outside the repository.
- [ ] Monitoring and alerts generate verified test notifications.
- [ ] Backups and restore procedure are documented and tested.

---

## Phase 10 — QA, UAT, and release candidate

**Duration:** 1 week\
**Owner:** QA lead + product owner\
**Goal:** Prove the release works for real users before deployment.

### Functional test matrix

#### Global

- [ ] Desktop navigation.
- [ ] Mobile navigation.
- [ ] Language switcher.
- [ ] Active route state.
- [ ] Public mock-login/API withdrawal; real auth/unauthorized behavior only if separately enabled.
- [ ] Footer links.
- [ ] Newsletter only if a complete monitored service is enabled; otherwise absent.
- [ ] 404 and error pages.

#### Homepage

- [ ] Hero CTA for farmer.
- [ ] Hero CTA for buyer.
- [ ] Hero CTA for hauler.
- [ ] AI anchor/page CTA.
- [ ] Audience tabs.
- [ ] No demo/planned app previews; verified app actions only if retained.
- [ ] Final CTA.

#### Farmer

- [ ] Callback form.
- [ ] Locale-specific labels.
- [ ] No public voice/listing/dashboard simulation.
- [ ] Actual product workflows only if separately approved; permission/failure alternatives then pass.
- [ ] Market insight timestamp.

#### Buyer

- [ ] Verified sourcing-process information.
- [ ] Real inquiry validation, accepted, duplicate, and failure states.
- [ ] Truthful successful-submission next step.
- [ ] No sample marketplace/search/orders; real product flows only if separately approved.

#### Hauler

- [ ] Earnings explanation.
- [ ] Requirements.
- [ ] Callback form.
- [ ] App link.
- [ ] Vehicle and location validation.

#### AI, blog, contact, and policy

- [ ] No public AI simulations or unfinished claims; retained explanation is complete and supported.
- [ ] AI CTA works.
- [ ] Blog index loads.
- [ ] Blog article metadata is correct.
- [ ] Related posts work.
- [ ] Contact form works.
- [ ] Privacy, terms, cookie, and refund links work.

### Cross-browser and device matrix

- Chrome latest on Windows/macOS/Android.
- Safari latest on macOS/iOS.
- Firefox latest on desktop.
- 320px, 375px, 390px, 768px, 1024px, 1280px, and 1440px widths.
- Touch and keyboard interaction.
- Slow 4G and offline transitions.

### Defect severity

| Severity | Definition | Launch rule |
|---|---|---|
| S1 | Security issue, data loss, broken primary CTA, legal failure, inaccessible critical path, or production outage risk | Must fix before launch |
| S2 | Major visual, functional, performance, SEO, or localization issue | Must fix before launch |
| S3 | Minor defect with workaround | May launch only with owner and deadline |
| S4 | Cosmetic or future improvement | Backlog |

### UAT sign-off

- Product owner signs the role journeys.
- Design owner attaches evidence for the applicable UI/UX acceptance criteria.
- Engineering signs release checks.
- QA signs functional and cross-browser matrix.
- Accessibility reviewer signs critical checks.
- Content/legal owner signs claims, policies, and consent.
- Operations owner signs contact, lead routing, monitoring, and support.

### Exit criteria

- [ ] Zero S1 defects.
- [ ] Zero S2 defects.
- [ ] S3 defects have explicit owner and deadline.
- [ ] All sign-offs are recorded.
- [ ] Release candidate is tagged and immutable.

---

## Phase 11 — Deployment and launch

**Duration:** 2–3 days\
**Owner:** Release manager\
**Goal:** Deploy safely and prove the production site is operational.

### Pre-deployment configuration

- [x] Production domain confirmed by requester: `https://cropfresh.in`.
- [ ] Confirmed domain is verified operationally from an accessible environment.
- [ ] DNS records configured.
- [ ] HTTPS/TLS certificate active.
- [ ] Redirects configured for legacy paths such as `/home`.
- [ ] Production environment variables added through the host, never committed.
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` and approved analytics configuration verified.
- [ ] Backend URLs, CRM, email, SMS, storage, and payment integrations point to production services.
- [ ] Production database migrations are reviewed and reversible.
- [ ] Error tracking release is configured.
- [ ] Hosting region and runtime settings are confirmed.

### Build and deployment

Run the release pipeline from a clean checkout:

```bash
npm ci
npm run typecheck
npm run lint
npm test -- --runInBand
npm run build
```

Then:

- [ ] Deploy the approved release candidate.
- [ ] Verify deployment logs contain no fatal errors.
- [ ] Verify server-rendered pages and static assets.
- [ ] Verify image optimization and remote image access.
- [ ] Verify API routes and environment variables.
- [ ] Verify headers and cache behavior.
- [ ] Verify no staging URLs appear in production.

### Production smoke test

Run immediately after deployment:

- [ ] Homepage loads with no console errors.
- [ ] Header and mobile menu work.
- [ ] Every retained approved role/content/contact/policy page loads; excluded mocks/unfinished routes stay unavailable.
- [ ] Every primary CTA reaches its intended destination.
- [ ] Every form submits to the production endpoint and creates a traceable test lead.
- [ ] Test lead is received by the intended owner/system.
- [ ] Analytics events appear without personal data.
- [ ] Sitemap returns 200 and contains intended URLs.
- [ ] `robots.txt` returns 200 and references the correct sitemap.
- [ ] Favicon, manifest, OG images, and logos return 200.
- [ ] 404 and error page behave correctly.
- [ ] Login and role protection behave correctly if enabled.
- [ ] Monitoring receives a synthetic success signal.
- [ ] Rollback command or previous deployment is known and tested.

### Launch decision

Launch only when all are true:

- [ ] Applicable UI/UX acceptance criteria have evidence; real critical journeys pass.
- [ ] All launch gates in Section 2 pass.
- [ ] All S1 and S2 defects are closed.
- [ ] Production smoke tests pass.
- [ ] Product owner gives written approval.
- [ ] Release manager records the deployment version and time.
- [ ] Support owner is available during the launch window.

### Rollback plan

If a critical issue appears:

1. Pause marketing traffic or affected campaigns.
2. Record the error, release version, time, affected journey, and customer impact.
3. Roll back to the last known-good deployment.
4. Confirm homepage, critical CTAs, forms, API, and monitoring after rollback.
5. Notify product, engineering, operations, and support owners.
6. Create a corrective release with regression coverage.
7. Re-run the launch checklist before redeploying.

---

## Phase 12 — Post-launch optimization

**Duration:** Ongoing\
**Owner:** Product + growth + engineering\
**Goal:** Improve real outcomes without destabilizing production.

### First 24 hours

- Monitor uptime, errors, API latency, lead delivery, form completion, and analytics.
- Review real device Core Web Vitals where available.
- Check search indexing, sitemap processing, and social previews.
- Review support questions and user confusion.

### First 7 days

- Compare CTA clicks and form starts by audience.
- Review form abandonment and validation errors.
- Review language usage and untranslated content.
- Review mobile performance and browser error logs.
- Verify leads were contacted within the promised SLA.

### First 30 days

- Run one controlled experiment at a time.
- Test homepage headline, role CTA labels, proof placement, and form length.
- Add one evidence-backed case study or FAQ cluster.
- Review claims with source owners.
- Review accessibility and content regressions.
- Recalculate the scorecard using real data.

### Ongoing standards

- Weekly KPI review.
- Monthly dependency and security review.
- Monthly broken-link and asset check.
- Quarterly accessibility review.
- Quarterly performance budget review.
- Quarterly content and localization review.
- Document every incident and rollback.

---

# 7. Deployment-ready architecture checklist

## Application

- [ ] Public marketing shell is separate from authenticated application shell.
- [ ] Server-side authorization protects private data.
- [ ] API errors are typed and mapped to user-friendly states.
- [ ] All browser-only code is hydration-safe.
- [ ] Error boundaries exist at global and route levels.
- [ ] Loading, empty, offline, permission-denied, error, and success states exist.

## Data and integrations

- [ ] Lead forms route to a monitored destination.
- [ ] Database writes have validation and retry handling.
- [ ] Email/SMS notifications have delivery monitoring.
- [ ] App store URLs are verified.
- [ ] Payment language matches actual payment behavior.
- [ ] No public demo data, fake prices, or mock transaction APIs are deployed.

## SEO

- [ ] Titles and descriptions are unique.
- [ ] Canonicals are correct.
- [ ] Open Graph/Twitter images exist.
- [ ] Favicon and manifest exist.
- [ ] JSON-LD validates.
- [ ] Sitemap is generated with stable dates.
- [ ] Robots file is correct.
- [ ] Internal links return 200 or intentional redirects.
- [ ] Private routes are protected from indexing.

## Accessibility

- [ ] Keyboard navigation passes.
- [ ] Screen-reader navigation passes.
- [ ] Focus indicators are visible.
- [ ] Tabs and menus expose state.
- [ ] Forms expose labels and errors.
- [ ] Async status is announced.
- [ ] Contrast passes.
- [ ] Reduced motion passes.
- [ ] Zoom and mobile text scaling pass.

## Security

- [ ] Secrets are outside the repository.
- [ ] Production HTTPS is active.
- [ ] Security headers are verified.
- [ ] Content Security Policy is reviewed.
- [ ] APIs have rate limits.
- [ ] Request bodies are validated server-side.
- [ ] Cookies and sessions are secure.
- [ ] Dependencies are scanned.
- [ ] Logs do not contain personal data.
- [ ] Backups and restore are tested.

## Observability

- [ ] Uptime monitor is active.
- [ ] Error tracking is active.
- [ ] API and form failure alerts are active.
- [ ] Lead routing alert is active.
- [ ] Analytics dashboard is active.
- [ ] Release version is visible in logs.
- [ ] Rollback is documented.

---

# 8. Audit-to-phase coverage verification

This matrix verifies that every major issue from the website audit is assigned to a development phase and has a measurable exit condition.

| Audit finding | Covered in phase | Verification |
|---|---:|---|
| TypeScript errors | 0, 5, 10, 11 | Typecheck passes in CI and release pipeline |
| ESLint errors and warnings | 0, 5, 10 | Lint gate passes without ignored failures |
| Existing 3 suites/5 tests; changed-journey coverage needed | 0, 5, 10, 11 | Preserve meaningful tests and add critical regression evidence |
| Next/next-intl clean-install incompatibility | 0, 9, 11 | Actual clean install and remote CI pass without bypass |
| Critical/high dependencies and default-key mock auth | 0, 7, 9, 10 | Patched compatible dependency audit and public-mock withdrawal |
| CTA no-ops and `href="#"` | 2, 3, 6, 10, 11 | CTA matrix and production smoke test |
| Retained/withdrawn AI content scope | 2, 6, 10 | Correct published anchors/routes; no public simulations |
| Missing routes and legal pages | 2, 6, 8, 10, 11 | Route inventory and HTTP status check |
| Missing OG, favicon, and manifest assets | 8, 10, 11 | Asset checker returns 200 |
| Unsupported or unclear claims | 1, 6, 8 | Claims register and content sign-off |
| Demo/localStorage/in-memory UI and APIs | 1, 6, 7, 10 | No public mock paths/data; separately approved real product scope is proven |
| Incomplete localization | 1, 2, 3, 6, 8, 10 | English/Kannada/Hindi journey review |
| Accessibility gaps | 3, 4, 5, 8, 10 | axe, keyboard, screen-reader, contrast tests |
| Performance risks | 4, 6, 9, 10, 11 | Lighthouse, WebPageTest, and RUM budgets |
| SEO and schema gaps | 1, 2, 6, 8, 10, 11 | Metadata, schema, sitemap, and crawl validation |
| Fake or unverified contact details | 1, 7, 8, 10 | Operations and content approval |
| Newsletter not connected | 6, 7, 10, 11 | Test signup reaches monitored provider |
| Search behavior mismatch | 2, 3, 6, 7, 10 | Search acceptance tests match copy |
| Missing loading/error/success states | 3, 5, 6, 7, 10 | State inventory and interaction matrix |
| Security and privacy readiness | 1, 7, 8, 9, 10, 11 | Legal, security, and privacy sign-off |
| Monitoring and rollback gaps | 9, 10, 11, 12 | Synthetic alerts and rollback rehearsal |
| Filesystem leads and unverified receipt | 7, 9, 10, 11 | Durable staging lead, retry/failure, recipient/alert and restore evidence |
| Docker/host and inaccessible live domain | 9, 11 | Approved host build, DNS/TLS/headers and deployment smoke verification |

### Coverage result

**Coverage status: Tasks mapped; implementation and owner/live evidence remain incomplete.**\
The plan covers product, content, UX, UI, frontend, backend, integrations, accessibility, localization, SEO, performance, security, QA, deployment, monitoring, rollback, and post-launch optimization.

---

# 9. Final release checklist

## Product and content

- [ ] Audience goals approved.
- [ ] Role-specific value propositions approved.
- [ ] Retained claims have accepted evidence and conditions; unsupported/sample claims are removed.
- [ ] Testimonials and images approved for use.
- [ ] Contact, app, social, team, and business details verified.
- [ ] No public demos, placeholders, planned/coming-soon blocks, or unfinished sections remain.

## UI/UX

- [ ] Applicable UI/UX acceptance criteria have attached evidence.
- [ ] Five-second and first-click tests pass.
- [ ] Critical journeys pass on mobile and desktop.
- [ ] Design tokens and shared components are used consistently.
- [ ] Every CTA has a working destination.
- [ ] All states are designed and implemented.

## Engineering

- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Tests pass.
- [ ] Build passes without ignored validation.
- [ ] No secrets are committed.
- [ ] No unresolved S1/S2 defects remain.

## Accessibility and localization

- [ ] Keyboard test passes.
- [ ] Screen-reader test passes.
- [ ] Contrast test passes.
- [ ] Reduced-motion test passes.
- [ ] English critical flow passes.
- [ ] Kannada critical flow passes.
- [ ] Hindi critical flow passes.

## SEO and performance

- [ ] Metadata and canonicals are correct.
- [ ] OG images, favicon, logo, and manifest return 200.
- [ ] JSON-LD validates.
- [ ] Sitemap and robots are correct.
- [ ] Internal-link check passes.
- [ ] Comparable lab performance/LCP/CLS and transfer budgets pass; field CWV/INP is measured and assessed separately when data exists.

## Deployment and operations

- [ ] Domain and HTTPS are active.
- [ ] Production environment variables are configured.
- [ ] Leads are routed and monitored.
- [ ] Analytics events are verified without personal data.
- [ ] Error tracking and uptime alerts are active.
- [ ] Backups and restore are tested.
- [ ] Rollback is documented and rehearsed.
- [ ] Launch owner and support owner are available.
- [ ] Post-launch monitoring plan is scheduled.

---

# 10. Definition of done

The CropFresh website is **deployment ready** only when all of the following are true:

1. Every applicable UI/UX acceptance criterion has evidence; no unmeasured score is claimed.
2. The site passes all critical user journeys for farmers, buyers, haulers, partners, and content visitors.
3. Every public link, asset, CTA, form, and route is functional.
4. Clean dependency installation, TypeScript, lint, tests, and build pass without bypasses.
5. Accessibility, localization, SEO, performance, and security gates pass.
6. Real integrations work in staging and production configuration is verified.
7. Retained claims, legal content, policies, contacts, testimonials, and app links are approved; public demos/unfinished sections are absent.
8. Monitoring, backups, alerts, support, and rollback are operational.
9. A release candidate is tagged and the deployment record is complete.
10. The launch owner signs off after production smoke testing.
**Final launch decision:** `GO` only after every mandatory checklist item is checked and evidence is attached to the release record.
