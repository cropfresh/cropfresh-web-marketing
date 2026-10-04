# Feature status register

**Reviewed:** 2026-10-03\
**Scope:** Repository evidence, not production endpoint or commercial availability verification.\
**Owner:** Engineering/product, unassigned. DEC-007 resolves external capability verification.

## 1. Status vocabulary

| Status | Meaning | Required public treatment |
|---|---|---|
| `live` | Verified in production for stated audience/location/version, with responsible support | Describe only confirmed capability and conditions |
| `pilot` | Confirmed limited operation with documented eligibility, period, and owner | Display pilot area and constraints at the action point |
| `demo` | Local, sample, simulated, or externally dependent behavior without production verification | Show demo/sample label; no real transaction or verified-result implication |
| `planned` | Described product capability without a working user journey established here | Use product-direction language or omit from conversion promise |
| `coming_soon` | Explicitly unreleased experience; timing unconfirmed unless supplied | No actionable download/booking promise; no invented release date |

**Separate evidence state:** `implemented`, `partial`, `external_unverified`, `not_implemented`, or `not_mounted`. A component can be implemented and still be a demo. No capability is classified `live` or `pilot` solely because its UI exists or an API helper names it.

## 2. Capability matrix

Component sources are below `src/components/sections/` unless an explicit `src/` path is given.

| ID | Capability | Evidence and current behavior | Publication status / evidence state | Proposed owner | Required transition evidence |
|---|---|---|---|---|---|
| FTR-001 | Homepage/about/contact/blog presentation | Route pages and components render content; facts and integrations still need review | `demo` / implemented (local content surface; no live-service approval implied) | Frontend/marketing | Deployed page QA plus content approval |
| FTR-002 | Farmer marketing and callback journey | `FarmerHero`, benefits, download, and callback components exist, but `/farmers` mounts a dashboard | `planned` / not_mounted | Product/frontend | Resolved route architecture and working landing CTA/form |
| FTR-003 | Buyer marketing and demo-request journey | `BuyerHero`, benefits, pricing and demo form exist, but `/buyers` mounts a marketplace dashboard | `planned` / not_mounted | Product/frontend | Working public landing path and qualified demo delivery |
| FTR-004 | Hauler information and callback surface | `/haulers` mounts marketing, earnings, requirements, testimonial, downloads, callback form | `demo` / implemented; operational statements unverified | Product/operations | Approved eligibility/terms and durable callback delivery |
| FTR-005 | Demo authentication and user roles | `src/contexts/AuthContext.tsx` checks client demo credentials and stores user in localStorage | `demo` / implemented | Engineering | Secure session provider and server authorization before production accounts |
| FTR-006 | Farmer dashboard/market insights | `src/app/farmers/page.tsx` combines local showcase counts with hardcoded KPIs and crop prices | `demo` / implemented | Product/data | Per-user data plus dated market source; label sample values until then |
| FTR-007 | Farmer listing creation and buyer matches | `src/app/farmers/new-listing/page.tsx` simulates analysis and buyers; `ShowcaseContext` writes browser state | `demo` / implemented | Product/backend | Real listing, analysis, matching, and notification services |
| FTR-008 | Farmer listing history | `src/app/farmers/listings/page.tsx` filters a hardcoded array independent of new local listings | `demo` / implemented | Product/backend | One persisted source for history and created listings |
| FTR-009 | Buyer produce search and offers | `src/app/buyers/page.tsx` filters commodity text, simulates delay, writes local offers | `demo` / implemented | Product/backend | Search/offer endpoints, inventory validation, actual ordering terms |
| FTR-010 | Distance filtering and AI ranking | Buyer placeholder suggests radius; first result receives a “Top Match” badge by position | `planned` / not_implemented | Product/backend | Geographic filter/ranking implementation and tested explanations |
| FTR-011 | Listings and orders API routes | `src/app/api/listings/route.ts` and `orders/route.ts` use in-memory mock arrays | `demo` / implemented | Backend | Persistent database, validation, authorization, concurrency and production contract |
| FTR-012 | Farmer voice transcription | Farmer dashboard calls `voiceApi.process`; client service in `src/lib/services.ts` targets external API | `demo` / external_unverified | Engineering/ML | Verified endpoint, permission/error paths, supported languages, data handling |
| FTR-013 | AI chat/voice showcase | `AIChatDemo` attempts WebSocket/REST/SSE and applies an example fallback payload when requests fail; its `response_text` key does not populate the message's `text` field | `demo` / external_unverified | Engineering/ML | Verified deployment, response provenance, corrected/tested fallback rendering, user-data policy |
| FTR-014 | AISP price calculator | `PricingEngineDemo` requests `/api/v1/pricing/aisp`, absent locally, then calculates a mock price | `demo` / partial | Engineering/finance | Routed pricing endpoint; reconciled amounts/adjustments; approved fee model |
| FTR-015 | Vision models and five-point quality verification | AI pipeline shows diagrams and hardcoded example JSON; no model execution or physical-inspection workflow demonstrated locally | `planned` / not_implemented | ML/operations | Model evaluation and deployed flow; grading SOP and field verification capacity |
| FTR-016 | Batch QR/traceability record | Marketing describes Digital Twin; types include QR fields; no complete batch-custody user journey established | `planned` / partial | Product/backend | Persisted chain-of-custody record, QR view, corrections/access model, coverage evidence |
| FTR-017 | Route optimization and load matching | Hauler sections describe workflows and graphics; no authenticated hauler dashboard or optimizer established | `planned` / not_implemented | Product/logistics | Tested routes/assignments, live capacity, partner dashboard and operational support |
| FTR-018 | UPI settlement and transaction payments | Services expose order/settle helpers; local offers have a mock AISP; no verified payment execution established | `planned` / external_unverified | Finance/backend | Provider integration, real payment state, reversals/disputes, settlement terms |
| FTR-019 | Lead collection and notifications | Four `src/app/api/leads/*/route.ts` handlers validate and save local JSON; no CRM delivery/notification is demonstrated | `demo` / partial | Backend/operations | Durable storage, access control, routing, notification receipt and support SLA |
| FTR-020 | Newsletter subscription | Non-integrated footer form removed on 2026-10-04; product-preview link replaces it | `planned` / not_implemented | Growth/backend | Consent-aware provider acceptance, routing, confirmation/unsubscribe |
| FTR-021 | Mobile app distribution and APKs | `ContactSupport` contains three Play URLs; product/hauler links use `#`; farmer APK announces unreleased status | `coming_soon` / external_unverified | Product/mobile | Store ownership and actual published releases; verified download/deep-link assets |
| FTR-022 | Website localization and speech language scope | `src/i18n.ts` defines en/kn/hi; global selector changes lang/storage; some forms use inline messages; speech demo lists five languages | `planned` / partial | Frontend/localization | All public journeys translated; native review; separately verified speech language matrix |
| FTR-023 | Extended procurement/support features | Subscriptions, forecasts, ERP integration, certifications, analytics, GPS/ratings appear in marketing; help center explicitly says coming soon | `planned` / not_implemented (help center `coming_soon`) | Product | Individual roadmap/feature tests before promoting any as available |

`coming_soon` for app distribution is a conservative public label supported by existing launch-soon wording, not a prediction about store status. A real published app may be reclassified only when ownership and availability are confirmed.

## 3. Shared state and data rules

- A network attempt is not proof that a service is live.
- A request succeeding locally does not prove safe/durable serverless storage or monitored lead delivery.
- LocalStorage listings/offers are not shared across real users, devices, or support staff.
- In-memory API arrays are not a production database.
- A random/preseeded grade, price, match, score, payout, or timestamp is sample data.
- A QR field alone does not establish custody completeness or tamper-proof storage.
- Readable blog pages and working schemas do not approve their underlying content claims.

## 4. Labels for design and implementation

| Context | Draft label |
|---|---|
| Whole dashboard | “Interactive demo — sample data” |
| Inventory | “Sample produce; not current stock” |
| Offer | “Demo offer; no purchase or payment” |
| Price | “Illustrative calculation; not a live quote” |
| AI fallback | “Example response; no listing submitted” |
| Architecture diagram | “Proposed workflow; capability verification pending” |
| App launch | “Release availability to be confirmed” |
| Verified pilot later | “Pilot in [approved area], for [eligible audience], from [approved date]” — substitute approved facts only |

Display labels near the action/data, including mobile and screen-reader equivalents. A footer disclaimer is insufficient for a button implying a real purchase or payout.

## 5. Promotion checklist

For `demo`/`planned`/`coming_soon` → `pilot`/`live`:

- [ ] Named feature and support owner assigned.
- [ ] Deployed environment, version, and success/failure evidence recorded.
- [ ] Eligible locations/crops/audiences and release date confirmed.
- [ ] Data/privacy and commercial terms reviewed for the capability.
- [ ] Actual user journey tested; independent review where warranted.
- [ ] Related CLM claims approved with conditions, not copied from sample data.
- [ ] UI labels, forms, FAQs, metadata, diagrams, and translations updated together.

**Handoff:** Phase 2 chooses public/demo/app route separation; Phase 6 implements visible labels; Phase 7 builds real integrations; Phase 8 reviews content and localization; Phase 10 tests consistency between what is promised and what happens.
