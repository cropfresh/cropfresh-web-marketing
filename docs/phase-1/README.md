# Phase 1 — Product strategy, evidence, and content

**Prepared:** 2026-10-03\
**Status:** Deliverables prepared; first homepage content implementation completed on 2026-10-04; business approval pending.\
**Parent plan:** [Website development phase plan](../../WEBSITE_DEVELOPMENT_PHASE_PLAN.md#phase-1--product-strategy-evidence-and-content)

**Development handoff:** [Phase 0](../phase-0/README.md) now passes clean committed-checkout and published PR CI installation/quality/runtime checks; required branch-check enforcement remains open. This pack is the next-phase starting point after that gate is confirmed. Remaining public sample/planned/unsupported content and owner approvals have not been accepted by the Phase 0 changes.

> **Current publication rule — 2026-10-04:** The [measured audit](../WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md) supersedes earlier public demo/illustrative-price/coming-soon recommendations in this pack. Remove unsupported or unfinished public material; keep evidence and owner TODOs private/in documentation. DEC-001 remains lead-first direction; its public-demo component is withdrawn.

## Deliverables

| Deliverable | Document | Status |
|---|---|---|
| Audience briefs, launch scope, business goals, KPIs | [Product strategy](./PRODUCT_STRATEGY.md) | Proposed; owner confirmation pending |
| Positioning, page copy, CTA language, response messages | [Message hierarchy](./MESSAGE_HIERARCHY.md) | Draft for design and implementation |
| Quantitative claims, contradictions, required proof, replacement copy | [Claims register](./CLAIMS_REGISTER.md) | 46 claim families reviewed; no business evidence approved |
| Repository capability evidence and publication labels | [Feature status register](./FEATURE_STATUS.md) | 23 capabilities classified conservatively |
| Mounted pages, unused components, blog posts, metadata, contacts, media | [Content inventory](./CONTENT_INVENTORY.md) | 29 content groups inventoried |
| Terminology, language rules, translation workflow, formatting | [Editorial and localization guide](./EDITORIAL_AND_LOCALIZATION.md) | English source rules proposed; native review pending |

This pack is the source of requirements for Phase 2 journeys, Phase 3 wireframes, Phase 6 page copy, Phase 7 integrations, and Phase 8 content/localization review. Repository observations are verified by source inspection. Commercial availability, customer results, operational capacity, rights, and legal identity require owner evidence.

## Website implementation progress

The [2026-10-04 implementation record](./IMPLEMENTATION_PROGRESS.md) tracks the homepage messaging, working audience choice, demo/planned labels, shared footer, matching metadata, and public server-rendering fix. Unsupported homepage testimonials and impact counters are held from rendering. Farmer and buyer dashboards now display a sample-data notice.

These are local content and engineering changes based on the draft pack. DEC-002–010, other page content, translations, policy publication, operational integrations, and business sign-off remain open.

The subsequent [agriculture-first theme](../AGRITECH_THEME.md) follows the requester's design direction: explain CropFresh as a farm-to-business agritech platform immediately, lead with farmers/produce imagery, and show grow/source/deliver audience paths. This updates the current homepage design and English master without approving commercial claims.

## Important discoveries

1. Farmer adoption is described as **500+** on the homepage/about page and **10,000+** on the contact partner section.
2. Coverage is described as **Karnataka**, **Karnataka and surrounding states**, and **three states**.
3. “0% commission / keep 100%” appears in marketing, while the sample order assigns **95%** to farmer payout. A demo calculation does not establish actual commercial fees.
4. `/farmers` and `/buyers` currently render dashboards. Their marketing heroes and lead forms exist as components but are not mounted in those routes.
5. Lead endpoints validate requests and write local JSON files; a production CRM/notification workflow is not established by that implementation.
6. The AI chat attempts network requests and uses example fallback responses. Pricing requests a route absent from this repository before using a local calculator. These are different from verified live services.
7. DPLE has two expansions: “Dynamic Price Learning Engine” and “Dynamic Price Liquidity Engine.” Use “pricing engine” until its owner confirms the name.
8. Five MDX posts are marked `draft: false`, including incomplete copy, launch claims, named authors, and a testimonial with no supporting evidence in this repository.

## Decision and approval register

**DEC-001 launch direction was approved by the project requester on 2026-10-03; DEC-002–010 remain pending.** See [APR-001](../phase-2/README.md#approval-record--apr-001) for the exact approval scope. Owner roles are suggestions; assign a real person and date for operational decisions. The coding agent cannot approve business facts on the owner's behalf.

| ID | Decision needed | Proposed owner | Evidence/input needed | Working recommendation |
|---|---|---|---|---|
| DEC-001 | Launch mode: lead-generation site, limited pilot, or transactional marketplace | Project requester; operational owner unassigned | Lead-first direction; public demos subsequently excluded; service availability still needs evidence | Real lead-first public journeys; updated route/CTA scope awaits approval |
| DEC-002 | Supported geography, crops, delivery lanes, and availability dates | Operations | Current service map; crop list; lane/capacity constraints; review date | Ask for location and confirm availability; do not promise statewide coverage |
| DEC-003 | Farmer fees, buyer price components, hauler deductions, payment timing | Operations/finance | Fee schedule; payout calculation; settlement trigger; bank/provider exceptions; dispute policy | Omit public prices/breakdowns until actual terms are documented |
| DEC-004 | Public contact details and response expectations | Operations/support | Monitored email and phone; business hours/time zone; responsible team; achievable callback/demo SLA | Avoid a fixed 24/48-hour promise before delivery and staffing are verified |
| DEC-005 | Actual adoption and outcome statistics | Product/data owner | Dated, deduplicated counts; baseline comparisons; methods; aggregate evidence | Omit unverified numbers from launch copy |
| DEC-006 | Testimonials, photos, videos, authors, team identities | Marketing/founder | Permission records, attribution, original quote/interview, approved role/name, media licenses | Use process explanations rather than unverified customer endorsements |
| DEC-007 | Published apps and live AI/product capabilities | Engineering/product | Store listing ownership, release version, successful end-to-end tests, model evaluation, feature owner | Remove unfinished/unverified public experiences; publish only proven complete functions |
| DEC-008 | Legal entity, domain, data use, and policies | Business/privacy owner | Registered entity details; approved domain; retention/contact rights; policy text; processors | Define policy requirements without inventing an entity, founding date, or retention promise |
| DEC-009 | Canonical messaging, DPLE naming, primary conversion goals | Product/marketing | Accept or edit the message hierarchy and audience briefs | Plain-language benefits first; describe product direction without guarantees |
| DEC-010 | Language scope, support capability, and translation reviewers | Product/localization owner | English/Kannada/Hindi reviewer names; supported spoken languages; regional copy preferences | Target English, Kannada, Hindi website journeys; separate AI language claims |

### Decision record template

```text
Decision ID:
Decision/result:
Owner name and role:
Approved copy or specification:
Evidence reference (redacted; private records kept privately):
Applicable locations / crops / audience / feature version:
Approval date:
Review or expiry date:
Affected CLM / FTR / CNT records:
Implementation phase and task:
```

## Phase 1 coverage verification

| Plan requirement | Artifact | Verification performed | Remaining dependency |
|---|---|---|---|
| Define farmer, buyer, and hauler goals | Product strategy | Jobs, questions, obstacles, conversions, qualification, and proof defined | DEC-001, DEC-002, DEC-009 |
| Define partner/investor journey | Product strategy and message hierarchy | Evidence/contact path and separate audience goal defined | DEC-005, DEC-006 |
| Replace unsupported absolute language | Message hierarchy, claims register, and implementation record | Draft replacements applied to homepage and shared footer | Owner acceptance; other page and locale adoption |
| Define T+0, AI verification, Digital Twin, AISP, quality grade | Editorial guide | Terms explain conditions and avoid unsupported certainty | DEC-003, DEC-007, DEC-009 |
| Classify feature maturity | Feature status register and implementation record | Homepage maturity labels and shared dashboard demo notice implemented | Detailed demo/other-page labels; DEC-007 before any `live`/`pilot` publication |
| Create evidence/claims register | Claims register | Source paths, required evidence, proposed owner, status, review rule, and interim copy recorded | DEC-003 through DEC-008 |
| Approve primary headline and role propositions | Message hierarchy | Full English draft ready for review | DEC-009; approval not recorded |
| Verify contact, social, app, testimonial, image, team, business data | Content inventory | Existing references and unresolved conflicts identified | DEC-004, DEC-006, DEC-007, DEC-008 |
| Create translation glossary | Editorial guide | English master terms and Kannada/Hindi review workflow defined | DEC-010 and native review |
| Prepare design handoff for UI/UX 10/10 target | Product strategy and message hierarchy | Clarity, task, feedback, proof, locale, and accessibility content criteria linked | Phase 3 user validation and later design/testing |

### Deliverable checklist

- [x] Audience/persona brief drafted.
- [x] Message hierarchy and role-specific copy drafted.
- [x] Claims and proof register created.
- [x] Mounted and unmounted content inventory created.
- [x] Feature status register created.
- [x] Editorial and localization glossary created.
- [x] Major contradictions mapped to proposed owner roles and decision IDs.
- [x] Coverage mapped back to Phase 1 and forward to implementation phases.

**Verification performed:** Confirmed all six required deliverables exist and are linked from this pack and the parent plan; checked the sequential CLM-001–046, FTR-001–023, CNT-001–029, and DEC-001–010 registers; compared primary route/component and blog references with the repository; reviewed relative document links; `git diff --check` passed. This verifies document coverage and source observations, not business evidence or deployment behavior.

### Business exit gates

- [ ] Product owner approves audience goals and launch mode.
- [ ] Marketing owner approves message hierarchy.
- [ ] Operations approves contact details and lead-response promises.
- [ ] Every retained public metric has accepted evidence and conditions; every unsupported metric is removed or explicitly identified as an illustrative demo, not a pilot result.
- [ ] Business/privacy owner confirms policy and consent requirements.

**Handoff status:** The [Phase 2 delivery pack](../phase-2/README.md) uses these artifacts for sitemap, CTA, journey, and form/state planning. DEC-001 launch direction is approved; audience/copy acceptance, DEC-002–010 evidence and production publication remain pending. Local draft completeness is not production approval.
