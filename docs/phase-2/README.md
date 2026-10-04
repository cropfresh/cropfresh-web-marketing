# Phase 2 — Information architecture and user journeys

**Prepared:** 2026-10-03

**Status:** Lead-first research prepared; the 2026-10-03 public-demo direction is superseded by the 2026-10-04 no-public-demo requirement. Updated route/CTA implementation approval remains pending.

> The [current measured audit](../WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md) and [updated parent plan](../../WEBSITE_DEVELOPMENT_PHASE_PLAN.md) control publication. Existing demo routes, illustrative prices, and unfinished actions in the detailed draft contracts are historical proposals, not current implementation requirements. Reconcile them before implementation; no public `/demo` area will be introduced.

**Parent plan:** [Website development phase plan](../../WEBSITE_DEVELOPMENT_PHASE_PLAN.md#phase-2--information-architecture-and-user-journeys)

**Inputs:** [Phase 1 delivery pack](../phase-1/README.md), including its pending DEC-001–010 decisions.

## Deliverables

| Deliverable | Document | Coverage |
|---|---|---|
| Sitemap, page purpose, navigation, route migration, indexing | [Sitemap and routes](./SITEMAP_AND_ROUTES.md) | RTE-001–025; public/demo separation and conditional pages |
| Primary/secondary actions, destination owner, completion condition | [CTA matrix](./CTA_MATRIX.md) | CTA-001–040; proposed targets and external-link requirements |
| Role journeys, cross-cutting journeys, recovery and research tasks | [User journeys](./USER_JOURNEYS.md) | JRN-001–009; all eight journeys requested by the parent plan plus partnership/media |
| Field contracts, query handling, form/demo/navigation states | [Form and state contracts](./FORM_AND_STATE_CONTRACTS.md) | FRM-001–004; accepted, duplicate, failed, unknown, offline and role-error behavior |

## Working architecture

- Public role pages explain the service and lead to interest forms: `/farmers`, `/buyers`, `/haulers`.
- Existing sample workflows and mock APIs are withdrawn from public deployment; no replacement public demo namespace.
- The first public conversion is a durably received inquiry, not an order, payment, account creation, or scheduled appointment.
- “Get started” goes to `/#choose-role`; each role page has one dominant interest action and one supporting exploration path.
- Retained pages and real actions need complete approved content; choose appropriate recovery for withdrawn legacy routes during updated scope approval.

The historical public-demo split was approved for earlier wireframes and is now superseded. Lead-first public role journeys remain the proposed replacement. Available services, operating locations, contacts, fees, app releases, and language support still depend on Phase 1 evidence.

## Repository findings

Findings are source observations, not browser test results. Paths below are relative to the repository root.

| ID | Observed issue and source | Proposed resolution / handoff |
|---|---|---|
| GAP-001 | `Navbar.tsx`: Get Started only calls analytics with `/signup`; no navigation occurs and that page is absent | CTA-001; use a real role-selection link; Phase 6 |
| GAP-002 | `HeroSection.tsx`: Join the Marketplace only records `/join`; no navigation occurs and that page is absent | Replace with role paths CTA-002–004; Phase 6 |
| GAP-003 | Homepage AI action queries `#ai-tech`; mounted `AITechnology` uses `id="technology"` | CTA-006; align target and mounted anchor; Phase 6 |
| GAP-004 | `/farmers` renders a dashboard; farmer marketing/callback components are unmounted there | RTE-002/019; public landing plus separate demo; Phases 5–6 |
| GAP-005 | `/buyers` renders a sample marketplace; buyer marketing/demo-request components are unmounted there | RTE-003/022; public landing plus separate demo; Phases 5–6 |
| GAP-006 | Footer links `/pricing`, `/careers`, `/press`, `/privacy`, `/terms`, `/cookies`, `/refund` have no page files | Route and conditional-publication rules; Phases 6–8 |
| GAP-007 | Footer uses page-relative `#download`; product/hauler download links use `#`; store releases are unverified | Remove dead affordances; publish only approved role-specific store targets; Phase 6 |
| GAP-008 | `BuyerDemoForm.tsx`: accepted state shows Create Business Account with `href="#"` and an analytics-only handler | CTA-020; honest next step to sample produce; Phase 6 |
| GAP-009 | `DashboardLayout.tsx`: farmer settings, buyer orders/settings, hauler routes/settings have no page files | Publish only implemented demo navigation; no implied hauler workspace; Phases 5–6 |
| GAP-010 | Desktop navbar has a separate `/ai` pill; the mobile menu's link list omits it | Desktop/mobile information parity; Phase 6 |
| GAP-011 | Dashboard sidebar is hidden on mobile; its header has a logo in the mobile-menu placeholder | Define usable mobile demo navigation; Phases 3, 5–6 |
| GAP-012 | Root `AuthProvider` returns `null` before hydration and wraps all public pages | Scope demo-state hydration to the demo shell; public content should render independently; Phase 5 |
| GAP-013 | `ContactForm.tsx` resets accepted feedback after six seconds | Persistent accepted/duplicate state and explicit next step; Phase 6 |
| GAP-014 | `ContactPartner.tsx` changes inquiry selection using delayed DOM mutation; `ContactForm` reads URL parameters in an effect | Shared allowlisted preselection contract; reliable initial and client navigation; Phase 6 |
| GAP-015 | `src/app/sitemap.ts` omits `/ai` and includes dashboard paths as public role pages | Approved marketing-only discovery, demo exclusion, publication-aware articles; Phase 8 |

## Architecture decisions

IA-001 retains the lead-first recommendation; IA-002's public-demo namespace is withdrawn. Updated retained-route/CTA design approval and IA-003–006 remain pending. Each operational owner role still needs a named person; historical design approval does not establish business facts or acceptance of every field, locale rule or user flow.

| ID | Decision | Working recommendation | Proposed accountable owner | Dependency |
|---|---|---|---|---|
| IA-001 | Public launch mode and conversion | Real lead-first marketing with interest requests; no public simulations | Project requester; operations owner unassigned | Updated route/CTA approval; DEC-002/004 evidence pending |
| IA-002 | Dashboard namespace and legacy behavior | Withdraw public mock routes/APIs; proposed real `/farmers` and `/buyers` landing pages; legacy recovery to approve | Project requester; frontend lead unassigned | Current no-demo rule; detailed migration approval pending |
| IA-003 | Primary CTAs, form scope, field changes | Adopt this pack's CTA matrix; retain current wire fields until coordinated schema changes | Product/operations lead | DEC-002, DEC-004, DEC-008, DEC-009 |
| IA-004 | Language URLs and content fallback | English unprefixed; `/kn` and `/hi` variants for reviewed localized pages; explicit English-only articles | Product/localization lead | DEC-010; Phase 8 routing decision |
| IA-005 | Conditional pricing, refund, cookie, careers, press and app destinations | Publish only applicable, supplied, reviewed content; pricing explanation lives at `/buyers#pricing` initially | Product/content lead | DEC-003, DEC-006–008 |
| IA-006 | Journey approval and validation ownership | Approve draft flows, then test them in Phase 3 before high-fidelity work | Product/design lead | IA-001–005; research participants |

### Approval record — APR-001

**Historical approval; public-demo portion superseded on 2026-10-04.** Preserve this record as evidence of the earlier decision. The current requirement excludes public demos; updated route/CTA design and business/provider decisions are still open.

- **Decision IDs:** DEC-001 launch direction; IA-001 and IA-002 public/demo design direction.
- **Result:** Use lead-first marketing with public farmer/buyer landing pages and separately labeled `/demo` workflows for Phase 3 wireframes.
- **Approver:** Project requester in this conversation; name and organizational role not supplied.
- **Evidence:** Requester answered “yes” to: “Before proceeding to Phase 3 wireframes, should I use this lead-first marketing structure with separately labeled demos as the launch direction?”
- **Date:** 2026-10-03.
- **Scope:** Launch/design direction. Detailed wireframes, commercial terms, contacts, live capabilities, translations, integrations and release readiness retain their individual review requirements.
- **Review trigger:** Change to launch mode or public/demo route purpose.

## Coverage and handoff

| Parent-plan requirement | Draft coverage | Remaining work |
|---|---|---|
| All primary pages in a sitemap | RTE-001–025 and explicit conditional-page rules | IA-001/002/005 approval and implementation |
| Every CTA has one destination owner | CTA-001–040 plus external-link publication rules | Assign real people; verify implemented routes/anchors |
| Every role has primary and secondary journeys | JRN-001–003 and JRN-009; cross-cutting JRN-004–008 | IA-006 approval and Phase 3 usability testing |
| Dead routes/placeholder links implemented or removed | GAP-001–015 mapped to route/action contracts | Phase 6 runtime changes and link QA |
| User flows approved before high-fidelity work | Review tasks and acceptance conditions defined | Product owner records approval after resolving IA decisions |

### Draft delivery checklist

- [x] Current navigation, route conflicts, form handlers and lead schemas inspected.
- [x] Sitemap and legacy-route migration contract prepared.
- [x] CTA destinations and accountable owner roles mapped.
- [x] Farmer, buyer, delivery-partner and partnership primary/secondary paths defined.
- [x] All eight required journey scenarios covered, with recovery paths.
- [x] Forms, query parameters and interaction states specified for implementation.

**Verification performed:** Checked sequential coverage for 25 route contracts, 40 CTA contracts, nine journeys and four form contracts; reviewed relative document links and referenced headings; compared route/navigation/form observations with the repository. Whitespace checks passed for the tracked diff and for each new Phase 2 file using `git diff --no-index --check`. Verification covers the draft documents; runtime route and usability checks remain implementation tasks.

### Phase 2 exit gates

- [ ] Product owner confirms IA-001–005 and assigns named destination owners.
- [ ] All primary pages exist in the approved sitemap.
- [ ] Every enabled CTA reaches its implemented, owned destination.
- [ ] Dead routes and placeholder actions are implemented or removed from the runtime UI.
- [ ] Product/design owner approves the user flows before high-fidelity implementation.

**Next handoff:** Phase 3 uses the approved lead-first direction to prepare low-fidelity wireframes and research tasks. IA-003–006 and relevant Phase 1 evidence remain pending; runtime migration and release verification follow the implementation phases. Draft completeness does not establish task-completion results or launch readiness.
