# Content inventory and publication handoff

**Reviewed:** 2026-10-03\
**Status:** 29 content groups inspected. This inventory records code exposure and proposed treatment, not production approval.\
**Owner:** Product/marketing, unassigned.

Component sources are below `src/components/sections/` unless a full repository path is shown. `mounted` means the route imports/renders the component; it is not a browser usability result. `reusable/unmounted` means the code exists but is not exposed by the corresponding role route today.

**Implementation update, 2026-10-04:** The tables record the original audit snapshot. [Implementation progress](./IMPLEMENTATION_PROGRESS.md) tracks the newer homepage, navigation/footer, metadata, and dashboard-label changes. Homepage testimonials/impact counters are now unmounted; absent pricing/legal/careers/press links and unverified contact/social references are removed from the footer. Related content elsewhere and required policy pages still need review.

## 1. Pages and shared surfaces

| ID | Surface and source | Current exposure | Required content work | Proposed owner / handoff |
|---|---|---|---|---|
| CNT-001 | `/`: `src/app/page.tsx`, hero/problems/solutions/workflow/products/AI/testimonials/impact sections | Mounted | Adopt MSG-001/002; replace unsupported counters and claims; label demos; add reviewed FAQs | Marketing/design; Phases 2–3, 6 |
| CNT-002 | `/farmers`: `src/app/farmers/page.tsx` | Mounted dashboard, not marketing page | Resolve landing/app split; sample earnings, score, prices and offers; voice/data conditions | Product/frontend; Phases 2, 6–7 |
| CNT-003 | `/buyers`: `src/app/buyers/page.tsx` | Mounted demo marketplace, not marketing page | Resolve landing/app split; search promises, sample stock, verified badges, offer feedback | Product/frontend; Phases 2, 6–7 |
| CNT-004 | `/haulers`: `src/app/haulers/page.tsx`, hauler sections | Mounted marketing/form | Adopt MSG-005; eligibility/coverage, gross/net illustration, no empty-return or income guarantees | Operations/marketing; Phases 6–8 |
| CNT-005 | `/ai`: `src/app/ai/page.tsx`, AI showcase sections | Mounted network-dependent demos and explanatory diagrams | Adopt MSG-006; distinguish real/fallback response, mock pricing, proposed architecture | Engineering/marketing; Phases 6–8 |
| CNT-006 | `/about`: `src/app/about/page.tsx`, about sections | Mounted | Confirm story/team/milestones; replace unsupported farmer/delivery/outcome counts | Founder/marketing; Phases 6, 8 |
| CNT-007 | `/contact`: `src/app/contact/page.tsx`, contact sections | Mounted | Verified contacts/SLA; rewrite facts in FAQ/partner highlights; durable inquiry delivery | Support/backend/marketing; Phases 6–8 |
| CNT-008 | `/blog`, `/blog/feed.xml`: blog route/layout/feed and shared blog components | Mounted; feed generated from published metadata | Review article completeness, bylines, crops/sources, related actions; no auto-approved draft evidence | Editorial; Phases 6, 8 |
| CNT-009 | `/login`: `src/app/login/page.tsx`, `AuthContext` | Mounted client demo sign-in | Explain demo access; no registered-account claim until real authentication | Product/backend; Phases 6–7 |
| CNT-010 | `/farmers/listings`: `src/app/farmers/listings/page.tsx` | Mounted hardcoded history | Label sample listings/dates and connect real data only after integration | Product/backend; Phases 6–7 |
| CNT-011 | `/farmers/new-listing`: `src/app/farmers/new-listing/page.tsx` | Mounted local simulation | Bedrock/real-time prices/12km match scores need provenance; demo publish is not real buyer notification | Engineering/product; Phases 6–7 |
| CNT-012 | Global `Navbar` / `Footer` | Mounted on public marketing pages; dashboards use a separate shell | One role-based action; verify all links; business identity/contact language; real subscriber feedback | Frontend/marketing; Phases 2, 6–8 |
| CNT-013 | `FarmerHero`, `FarmerBenefits`, `FarmerGetStarted`, `FarmerTestimonial`, `FarmerDownload`, `FarmerCallbackForm` | Reusable/unmounted on `/farmers` | Preserve useful layout/form work; revise copy/claims; mount only through approved route architecture | Product/design; Phases 2–3, 6 |
| CNT-014 | `BuyerHero`, `BuyerBenefits`, `BuyerBusinessTypes`, `BuyerHowItWorks`, `BuyerPricing`, `BuyerDemoForm` | Reusable/unmounted on `/buyers` | Replace guaranteed-quality language; label pricing; money bands are spend, not physical volume | Product/design; Phases 2–3, 6 |
| CNT-015 | `/pricing` referenced by footer; `BuyerPricing` reusable section | No standalone `/pricing` page | Decide a reviewed pricing destination with finance inputs; omit unsupported tariff charts | Finance/product; Phases 2, 6 |
| CNT-016 | `/privacy`, `/terms`, `/refund`, `/cookies` referenced by footer/forms | Route pages absent | Confirm legal entity/data practices/service terms before writing factual policies | Business/privacy owner; Phases 1, 6–8 |
| CNT-017 | `/careers`, `/press`, help-center content | Careers/press routes absent; help center says coming soon | Publish only real roles/media material; verify careers contact; do not link nonexistent support pages | Founder/marketing/support; Phases 2, 6 |

## 2. Articles and cross-page content

| ID | Surface and source | Current exposure | Required content work | Proposed owner / handoff |
|---|---|---|---|---|
| CNT-018 | `content/blog/ai-revolutionizing-indian-agriculture.mdx` | `draft: false`; featured | Intro/body contains ellipses/placeholders; DPLE expansion conflicts; no completed source-backed article | Editorial/engineering; rewrite before launch |
| CNT-019 | `content/blog/tomato-quality-grading-guide.mdx` | `draft: false` | Crop/grade standards and claims about profitability need agronomy review; confirm author/credentials | Agronomy/editorial; Phases 6, 8 |
| CNT-020 | `content/blog/ramanna-success-story.mdx` | `draft: false` | Quote/outcome/guaranteed price require permission and transactions; hold as unverified testimonial | Marketing; CLM-008/044 |
| CNT-021 | `content/blog/cropfresh-launch-karnataka.mdx` | `draft: false` | Official launch/date/statewide operations and scale goals need owner confirmation | Founder/operations; CLM-042 |
| CNT-022 | `content/blog/seasonal-crop-pricing-trends.mdx` | `draft: false` | Supply decade-of-data source; remove unverified guaranteed baseline effect; resolve DPLE naming | Editorial/data; CLM-037/041 |
| CNT-023 | Root/role/blog metadata, `src/lib/metadata.ts`, blog JSON-LD | Metadata exposed on indexable routes | Mirror accepted page facts; founding date/identity/bylines need verification; Article schema already exists but uses missing logo URL | SEO/editorial; Phases 6, 8 |
| CNT-024 | Contact addresses, social URLs, store links in footer/contact/download components | Public references, ownership/delivery unverified | Build canonical contact/asset record with DEC-004/007/008; prevent domain drift | Operations/product; before publication |
| CNT-025 | `public/images/`, `public/logo/`, `public/testimonials/`, embedded video and blog assets | Local assets referenced; media rights unverified; some blog assets absent | Provenance, rights, correct subject/alt text, mobile crop, actual testimonial video and author/covers | Marketing/design; Phases 4, 6, 8 |
| CNT-026 | `src/messages/en.json`, `kn.json`, `hi.json`; component-inline dictionaries; `src/i18n.ts` | Translation files plus partial independent forms; global pages not wired to them | Approved English master; unify keys; synchronize locale/errors/status/metadata; native review | Localization/frontend; Phases 6, 8 |
| CNT-027 | Four lead APIs and form success/error/duplicate messages | Browser forms plus local-file handlers; no confirmed production notification | Harmonize claim-free acknowledgement, duplicate and error wording; confirm support expectations/data notice | Support/backend; Phases 6–8 |
| CNT-028 | `ShowcaseContext`, dashboard seed prices/KPIs, AI example prompts/fallbacks | Sample values displayed in public/demo paths | Clearly identify sample data at point of interaction; no adoption/earnings/accuracy inference | Product/engineering; Phases 6–7 |
| CNT-029 | AI architecture, voice/vision diagrams, technology stack and example JSON | Mounted technical explanatory content | Engineering-owned labels/versions/status; frontend labels currently Next14/React18 versus installed Next16/React19 | Engineering/marketing; Phases 6, 8 |

### Blog exposure caveat

All five posts are currently marked `draft: false`. `getAllPosts()` filters drafts for listings/static params, but `getPostBySlug()` and the article route do not reject a directly requested draft or future-dated post. Phase 6–8 must enforce draft visibility across direct URLs, metadata, feeds, sitemaps, and related links when withdrawing or rewriting a post; changing frontmatter alone is not a complete publication control.

## 3. Canonical business/contact data to confirm

These are **existing code values**, not accepted public contact details.

| Item | Existing reference | Required confirmation |
|---|---|---|
| Website domain | `https://cropfresh.in` in metadata/sitemap/schema | Domain ownership and production canonical |
| Footer email | `hello@cropfresh.ai` | Owner and actively monitored mailbox; reconcile with `.in` contacts |
| Support email | `support@cropfresh.in` | Mailbox delivery and responsible support owner |
| Careers email | `careers@cropfresh.in` in `AboutTeam` | Monitored inbox and actual open roles |
| Phone | `+918001234567` via footer/contact | Ownership, reachability, hours; display one consistent format |
| Office/company | CropFresh Technologies Pvt. Ltd.; Bangalore, Karnataka | Legal entity and office/address scope, not just a city label |
| Business hours | Mon–Fri, 9:00–18:00 IST | Staffing, holidays, response expectation |
| Social profiles | Instagram/Twitter `cropfresh`, LinkedIn company `cropfresh`, YouTube `@cropfresh` | Ownership and approved destinations |
| App listings | `com.cropfresh.farmer`, `.buyer`, `.hauler` on Google Play | Store ownership, published release and geographic/device availability |
| Founding date | `2025` in organization schema | Confirmed business/founding date or omit field |

## 4. Media inventory and review requirements

- Hero artwork: `public/images/hero/farmer.png`, `tomato.png`, `truck.png` — confirm provenance and representational use.
- Farmer artwork: `public/images/farmer-hero-award.jpg`, `farmer-hero-bg.jpg` — confirm identity and use permission; no implied customer endorsement.
- Hauler hero reuses `farmer-hero-award.jpg` with a hue rotation and “Delivery Partner” alt text — replace or describe the actual image accurately.
- Testimonials: `public/testimonials/ramanna.png`, `priya.png`, `raju.png` and SVG variants — identity/photo consent and quote rights unverified.
- Farmer and hauler testimonial embeds reference `dQw4w9WgXcQ` as a placeholder — replace with actual approved interview media or remove the testimonial play affordance.
- Blog covers and author avatars reference `/blog/covers/*.jpg` and `/blog/authors/*.jpg`, absent from the inspected public asset inventory — supply approved media or neutral fallback.
- Logo files exist under `public/logo/`; organization/article schema references `/logo.png` — select an actual approved logo asset during SEO implementation.
- OG images, icons, and manifest references require the Phase 8 asset work; approval of a design does not mean a file exists.

Store permission/license references in the inventory, but keep raw consent documents and identifying customer records in private storage.

## 5. Policy and data-use content requirements

DEC-008 must establish actual business practices before policy drafting:

- Responsible entity and contact for privacy requests.
- Form fields and why each is required; operational response versus marketing subscription.
- Audio/photo handling, processors, storage regions and whether AI providers retain input.
- Access, retention, deletion and withdrawal practices.
- Analytics/cookie providers and purpose, separate from product sessions.
- Fee, payout, order, delivery, quality dispute and refund/cancellation terms if transactions are offered.
- Documents required at interest versus onboarding stages; do not collect identity documents in the marketing interest form without a defined purpose.

The repository has local-file lead collection and in-process rate limiting, not evidence of a complete production privacy/storage practice. Transfer implementation questions to Phases 7 and 9.

## 6. Content adoption order

1. Core role promises, contact facts, fees and demo labels: CNT-001–007, 012–016, 024, 027–028.
2. Real proof or replacement explanatory content: CLM register and CNT-018–022/025.
3. Metadata/schema and technical diagrams: CNT-023/029.
4. All website languages: CNT-026 after the English master is accepted.
5. Secondary careers/press/help content: CNT-017 when actual material exists.

Phase 8 release review must check the route, component, locale file, API response, SEO preview, and schema together. Unsupported copy in an unmounted component is still a future regression source.
