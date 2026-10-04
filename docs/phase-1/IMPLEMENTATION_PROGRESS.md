# Phase 1 — Website content implementation

**Updated:** 2026-10-04\
**Status:** First homepage content implementation completed locally; business exit gates remain open.\
**Basis:** [Message hierarchy](./MESSAGE_HIERARCHY.md), [claims register](./CLAIMS_REGISTER.md), and [feature status](./FEATURE_STATUS.md).

> **Requirement update:** The [current measured audit](../WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md) records remaining issues and the no-public-demo/no-placeholder rule. The demo/planned labeling below is historical implementation evidence; those public surfaces now need withdrawal or complete verified replacement.

**Subsequent design update:** The requester asked for an agriculture-first identity and immediate clarity about CropFresh. The [agritech theme record](../AGRITECH_THEME.md) documents the newer homepage composition, explicit farm-to-business definition, shared shell, and browser verification. The table below records the earlier content pass; the current homepage uses the agriculture-first components.

## Implemented

| Surface | Change | Related records |
|---|---|---|
| Homepage hero | Stable MSG-001 headline, product-direction copy, visible preview/availability note; removed unsupported economic and payment counters | CNT-001; CLM-001/007/011/012/016/026/045 |
| Audience choice | Server-rendered `#choose-role` cards identify farmer and buyer links as demos and the hauler link as a program overview | CNT-001–004; FTR-002–009 |
| Audience needs | Replaced market-size, universal-zero, price-variance, delay, and route metrics with qualitative questions | CLM-017–021 |
| Product approach and workflow | Demo/planned labels, sample-data explanations, conditional availability, no delivery-time or payment guarantees | CLM-007/012/014–016/023–031/037 |
| App showcase | Explicit UI-concept status, sample screens, no outcome metrics or unverified store-download link | CLM-035/037; FTR-021/023 |
| Homepage technology | Planned versus illustrative-demo badges; removed accuracy, savings, matching-time, and traceability metrics | CLM-011–015/024/031/036; FTR-014–018 |
| Homepage proof area | Held the unverified testimonial carousel and impact counters from homepage rendering; added practical participation topics | CLM-002/003/005/006/008/010/014/022/044 |
| Shared navigation | Working `/#choose-role` links, demo route labels, matching mobile AI destination, active-link and selection states | CNT-012; CLM-039 |
| Shared footer | Replaced non-integrated newsletter with role-choice link; removed unverified contacts/social/legal entity and absent pricing/policy/careers/press destinations | CNT-012/015–017/024; CLM-035/041/043 |
| Metadata | Root title, description, Open Graph, Twitter, and helper default description share the new English master | CNT-023; MSG-001 |
| Demo shell | Visible sample-data notice on farmer/buyer dashboard routes; account actions stay behind browser-storage readiness | CNT-002/003/010/011/028; CLM-038/039 |
| Public server rendering | Auth and showcase providers render public children immediately; only dashboard content waits for browser state | FTR-001/005/006/009 |

The English homepage message and current audience links are centralized in `src/data/marketing.ts`. New sections are `AudiencePaths.tsx` and `ParticipationNextSteps.tsx` under `src/components/sections/`.

### Current route contract

`/farmers` and `/buyers` still host browser demos, so their current links say “demo.” `/haulers` is the existing program-information route. The newer requirement withdraws public demos; the earlier [Phase 2 migration contract](../phase-2/SITEMAP_AND_ROUTES.md) must be reconciled. Real farmer/buyer public landing journeys are proposed in the updated plan and await detailed implementation approval.

### Proof publication

`TestimonialsCarousel.tsx` and `ImpactStats.tsx` remain reusable source files but are no longer mounted on `/`. Their claims and assets require review before reuse. No adoption number, testimonial, fee tariff, supported geography, AI metric, or operational promise received business approval through these code changes.

## Verification

- `npm run typecheck` passed.
- `npm run lint` passed with zero ESLint errors/warnings; the tooling prints its existing browser-baseline-data freshness notice.
- `npm test -- --runInBand` passed: **3 suites, 5 tests**, including regression coverage for public server rendering inside both demo providers and pending demo readiness on the server.
- `npm run build` passed with TypeScript validation enabled.
- Local production HTTP smoke check passed: one homepage H1, required preview content, absence of the checked legacy claims/actions, **18 unique rendered links**, **9 route destinations** returning 200, valid homepage anchors, **5 hero/logo images** returning 200, and farmer/buyer demo notices/loading states.
- `git diff --check` passed.

The smoke check uses server-rendered HTML and HTTP requests. It does not establish mobile visual QA, browser interaction, screen-reader review, native translation acceptance, production lead delivery, or business approval.

## Next Phase 1 work

1. Apply the same content treatment to `/haulers`, `/ai`, `/about`, `/contact`, and articles; review role metadata, FAQs, API acknowledgements, and unmounted reusable sections.
2. Resolve DEC-002–010: supported crops/locations, commercial terms, monitored contacts, evidence, media permissions, product releases, business/privacy facts, messaging acceptance, and language reviewers.
3. Withdraw public demo content and mock APIs (search/ranking, sample prices/earnings, voice/sign-in/order simulations); approve real replacement journeys.
4. Prepare approved privacy/consent and lead-response wording before production lead integration. Removing absent footer links is not publication of legal policies.
5. Synchronize accepted English copy with Kannada/Hindi and native-language review.

Phase 1 remains **in progress** until the owner exit gates in the [delivery pack](./README.md#business-exit-gates) are met.
