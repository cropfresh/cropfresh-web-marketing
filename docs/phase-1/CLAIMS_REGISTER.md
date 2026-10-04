# Claims and proof register

**Reviewed:** 2026-10-03\
**Status:** 46 claim families inventoried. No commercial/result claim is approved by this review.\
**Source of truth:** Owner-supplied evidence plus the [decision register](./README.md#decision-and-approval-register).

## 1. Evidence and review rules

Code, sample data, API names, model names, configuration, and published text prove only what the repository contains. They do not establish customer results, live service coverage, payments, model accuracy, availability, or rights to use an endorsement.

### Required record for each retained claim

| Field | Current default | Required before publication |
|---|---|---|
| Evidence reference | Not supplied | Source/report URL or redacted private evidence reference |
| Observation period | Unknown | Start/end date; do not infer from a blog publication date |
| Geography and audience | Unconfirmed | Applicable locations, crops, lanes, audience, and exclusions |
| Measurement definition | Unconfirmed | Numerator/denominator, baseline, unit, method, and sample size |
| Owner | Suggested role below; person unassigned | Named accountable owner |
| Approval date | Not approved | Recorded acceptance date and reviewer |
| Review date | Before first publication; not scheduled | Named owner sets a dated review/expiry after approval |
| Publication status | `unverified`, `conflicting`, or `demonstration` below | `approved` only with conditions and evidence |

**Maintenance recommendation:** Review operating contacts/availability monthly, aggregate outcomes quarterly, and AI metrics at each model/version change. Refresh all related locales, metadata, diagrams, blog copy, and FAQ answers together. Remove an expired claim until revalidated.

`demonstration` means the repository contains a local or illustrative example. It is not a customer pilot. Do not label unverified numbers “pilot results” to avoid collecting proof.

## 2. Repository source conventions

Component basenames in the tables refer to `src/components/sections/<name>.tsx`. App paths refer to files below `src/app/`. Blog filenames refer to `content/blog/`. Translations in `src/messages/en.json`, `kn.json`, and `hi.json` repeat several claim families and must be reviewed when the English master changes.

## 3. Scale, money, quality, and availability claims

| ID | Current claim and observed source | Status | Required evidence / proposed owner | Interim treatment or draft replacement |
|---|---|---|---|---|
| CLM-001 | “India's first” in `HeroSection`; “most advanced” in `app/ai/page.tsx` metadata | unverified | Dated comparative market research with a precise category; Marketing | “Explore the CropFresh product” — omit superlatives |
| CLM-002 | 500+ farmers in `ImpactStats`, `AboutImpact`, `FarmerHero`, `app/farmers/layout.tsx`; 10,000+ in `ContactPartner` | conflicting | Dated deduplicated counts; define onboarded versus active/paying; Product/data | Remove count until one canonical definition is accepted |
| CLM-003 | 100+ active buyers in `ImpactStats`; 100+ buyers served in `AboutImpact` | unverified | Distinguish active, registered, and served; reporting period; Product/data | “For food businesses” |
| CLM-004 | 1,000+ active haulers in `HaulerHero` | unverified | Active partner definition, deduplication, period, lane coverage; Operations | “Explore delivery opportunities” |
| CLM-005 | 2,000+ completed deliveries in `ImpactStats` and `AboutImpact` | unverified | Completed delivery events excluding canceled/demo orders; Product/data | Replace counter with a process description |
| CLM-006 | ₹25L+ farmer earnings paid instantly in `ImpactStats` | unverified | Confirmed settled farmer payouts, period, refunds/reversals, net/gross; Finance | Omit financial aggregate |
| CLM-007 | 35%+ income boost in `HeroSection`; 20–40%/40% higher prices in `SolutionsSection`/`ProductsSection`; 30%+ in `AboutImpact` | conflicting | Comparable crop/grade/time/location baseline; distinguish price from income/profit; Finance/data | “Discuss how the listing and pricing process works” |
| CLM-008 | Ramanna: ₹15/kg → ₹25/kg and 66% income increase in `TestimonialsCarousel` and `ramanna-success-story.mdx` | unverified | Original interview, consent, transactions, crop/grade/date/costs; Marketing/finance | Hold endorsement; price change alone is not an income-growth calculation |
| CLM-009 | Ramesh: 30% more for tomatoes and same-day payment in `FarmerTestimonial` | unverified | Identity, permission, original quote, matched outcome data; Marketing/finance | Replace with a non-testimonial process example |
| CLM-010 | Hauler: 2× earnings in `TestimonialsCarousel`; 25–40% uplift and ₹1,500–₹3,000/day in `HaulerEarnings`; ₹45,000/month in `HaulerTestimonial` | unverified | Gross/net, vehicle, distance, time, fuel/costs, deductions, cohort/date; Finance/operations | Label a costed example as illustrative; remove “average” and observed uplift without data |
| CLM-011 | 25% less wastage in `HeroSection`; 40% less waste in `AITechnology` | conflicting | Mass-based waste definition, baseline, crop, period, cohort; Operations/data | “Designed to support clearer produce coordination” |
| CLM-012 | 40% logistics savings in `HeroSection`; 30% fuel savings in `SolutionsSection`, `AITechnology`, `ProductsSection` | unverified | Separate logistics cost from fuel/distance savings; matched-route method; Operations/data | “Explore the proposed route workflow” |
| CLM-013 | 95% quality-grading accuracy in `AITechnology`, `ContactFAQ`, `ContactPartner` | unverified | Dataset provenance, size, crop/classes, ground truth, held-out protocol, metric, model/version/date; ML owner | “Learn about the proposed quality-information workflow” |
| CLM-014 | 99% delivery reliability in `SolutionsSection`/`ProductsSection`; 99.2% on-time in `ImpactStats` | conflicting | Scheduled-window definition, completed events, exception handling, dates; Operations/data | State confirmed delivery windows only, after lane verification |
| CLM-015 | 100% traceability in `AITechnology`, `ProductsSection`, `SolutionsSection`, `TestimonialsCarousel` | unverified | Batch-level origin/verification/custody/delivery completeness; proportion covered; Product/operations | “See an illustrative batch record” |
| CLM-016 | 0% farmer commission in `HeroSection`; keep 100% in `FarmerBenefits`/messages; sample 95% farmer payout in `ShowcaseContext` | conflicting | Actual fee schedule and payer of logistics/platform charges; Finance | “Review fees and payout terms before participating”; sample split is not a business tariff |
| CLM-017 | Middlemen take 40–60%/60% in `ProblemsSolved`; 30–40% in `AboutStory`/messages | conflicting | Authoritative dated data with value-chain scope; do not equate markup with lost income; Marketing/research | “Intermediaries and opaque pricing can make outcomes harder to understand” |
| CLM-018 | Farmers have 0% price transparency, zero quality incentive, 30–90-day waits in `ProblemsSolved`; different wait bands in other copy | unverified | Representative survey, crop/geography, statistic definition and period; Research | Describe concerns as user hypotheses, without universal zeros or delay ranges |
| CLM-019 | 30% buyer quality variance, 40% price swings, weekly stockouts, 0% farm visibility in `ProblemsSolved` | unverified | Buyer survey or procurement dataset; definition and sample; Research | “Buyers need clearer quality, price, and supply information” |
| CLM-020 | 60% empty returns, 40% extra distance, 3+ hours wasted, 15–30-day payout delay in `ProblemsSolved` | unverified | Lane/vehicle cohort, trip log, baseline, dates; Operations/research | Describe partner concerns without population-wide numbers |
| CLM-021 | ₹40 lakh crore supply chain in `ProblemsSolved`; ₹50K Cr+ addressable market in `ContactPartner` | unverified | Source/year, market boundaries, TAM/SAM definition, currency/unit calculation; Founder/marketing | Remove figures from public investor section until sourced; these are different possible scopes |
| CLM-022 | Karnataka in `ContactFAQ`/launch post; surrounding states in `ImpactStats`; three states in `ContactPartner` | conflicting | Current state/district/crop/lane availability plus launch dates; Operations | “Tell us your location to discuss availability” |
| CLM-023 | Listing in 30 seconds in `SolutionsSection`, `HowItWorks`, `ProductsSection` | unverified | Tested device/network/language, task definition, median/p95, completed listings; Product/design | “Explore voice-assisted listing” with demo status |
| CLM-024 | Buyer matching in under 5 minutes in `HowItWorks`/`AITechnology`; 3× loads in `SolutionsSection`/`ProductsSection` | unverified | Meaning of match, acceptance rate, start/end event, load cohort; Product/data | “Explore buyer and load matching concepts” |
| CLM-025 | Farm-to-buyer under 24 hours in `HowItWorks`; same-day delivery in `BuyerBenefits` and buyer metadata | unverified | Crop/lane, cut-off, operating window, capacity, exceptions, completion data; Operations | Publish lane-specific terms only once confirmed |
| CLM-026 | Instant UPI / T+0 payouts across hero, workflow, benefits, FAQ, app and metadata copy | unverified | Settlement trigger, time zone/business day, escrow/dispute conditions, provider/bank delay, actual payouts; Finance | Define intended payment workflow; do not equate same-day settlement with instant receipt |
| CLM-027 | 24-hour callbacks/contact response, 48-hour buyer demo, Mon–Fri 9–6 IST in forms/API messages/`ContactInfo` | unverified | Monitored queue, staffing, actual response times, holidays, timezone and SLA definition; Support | Acknowledge receipt without a fixed response time until approved |
| CLM-028 | Free field verification, no registration/hidden charges, “100% Secure & Free” in `FarmerBenefits`/`FarmerCallbackForm` | unverified | Pricing policy, restrictions, operational cost and privacy/security review; Finance/privacy | Explain confirmed charges and data use; remove security absolute |
| CLM-029 | Every batch field/AI verified, five-point grading, guaranteed quality/delivery, rejection-free ordering, fair-price guarantee in benefits and solutions | unverified | Written crop-specific grading criteria, inspection capacity, exclusions, contract, dispute/refund terms; Operations | Explain sample grading; no guarantee without service terms |
| CLM-030 | Food-safety compliance, origin certificates, organic certification support in `SolutionsSection`/`ProductsSection` | unverified | Specific standards, document issuer, certification scope, responsible entity; Operations/legal | Distinguish traceability information from certification and compliance |
| CLM-031 | Immutable/tamper-proof Digital Twin in `AITechnology`, `BuyerBenefits`, `HowItWorks`, architecture, FAQ, metadata | unverified | Actual persistence/audit model, access control, correction semantics, security review; Engineering | “Batch record” or “proposed traceability record”; QR alone does not prove immutability |

## 4. Technology, demos, business identity, and publishing claims

| ID | Current claim and observed source | Status | Required evidence / proposed owner | Interim treatment or draft replacement |
|---|---|---|---|---|
| CLM-032 | Voice under 2s in `AIChatDemo`/`AIVoiceFlow`; vision under 4s in `AIVisionPipeline`; ~50/80/200/300/500/600ms architecture stages | unverified | End-to-end versus stage timing, device/network, languages, p50/p95, model/version; Engineering/ML | Omit latency values or label a design budget, not measured performance |
| CLM-033 | Five spoken languages, any Indian language, 22 languages, 14+ intents in AI demo/architecture/voice flow | conflicting | Tested language/dialect matrix and intent list per endpoint/version; ML/localization | Specify tested demo languages; website translation and speech support are separate |
| CLM-034 | YOLOv26, DINOv2, ResNet50, ONNX browser execution, WebRTC/Pipecat, database/vector/cloud stack in AI diagrams; Next14/React18 in `AITechStack` | unverified | Architecture/deployment/model ownership evidence; current package versions contradict frontend labels; Engineering | “Proposed architecture”; update frontend references to Next16/React19 during adoption |
| CLM-035 | Three downloadable apps in `ProductsSection`/`ContactSupport`; farmer Play Store URL, APK launch wording, hauler `#` downloads | conflicting | Owned published store listings, release IDs, device/country eligibility, actual APK asset; Product | “App availability pending release confirmation”; no unverified download promise |
| CLM-036 | AISP full cost breakdown and fixed percentage split in `BuyerPricing`; local price/fee formula in `PricingEngineDemo`; sample payout split in `ShowcaseContext` | demonstration | One finance-approved model; define base, premium, adjustments, logistics, platform fee, buffer/tax/unit and total; Finance | “Illustrative price breakdown — not a binding quote”; test displayed parts sum to total |
| CLM-037 | Live prices from 100+ markets, demand forecasts, price history, subscriptions, ERP/API integration in solutions/products/`BuyerDemoForm` | unverified | Available data feeds, licensing, timestamps, product endpoint and feature demo; Product/data | Refer to product direction; no market count or live feed claim |
| CLM-038 | Dashboard “live data,” weekly crop prices, ₹45,200, 92/100 grade, fallback 2 pending orders; hardcoded match scores in new-listing flow | demonstration | Actual per-user service and score definitions; distinguish seed history from transactions; Product/engineering | “Sample dashboard data”; local sample state is not live market/earnings data |
| CLM-039 | Registered-credential sign-in while client demo users/localStorage auth are used in `AuthContext`/`app/login/page.tsx` | demonstration | Production identity, server sessions and authorization; Engineering | “Demo sign-in”; does not verify identity or production account access |
| CLM-040 | “Live AI — Real Backend, No Sign-up” in `AIHero`; chat network requests with example fallback and different base URL conventions | unverified | Successful configured deployment tests, real/fallback provenance, connection failures, data-use review; Engineering | “Interactive AI demo”; reveal actual response source without claiming live status globally |
| CLM-041 | CropFresh Technologies Pvt. Ltd., 2025 founding date, office/team, CEO Vikram Singh, content lead Priya Sharma, Dr. Ananya Rao with 15 years' experience | unverified | Registered legal identity, approved names/roles, professional credentials, founding date/address; Founder | Publish confirmed brand/team facts only; remove unsupported organization/author schema |
| CLM-042 | Official Karnataka launch dated 2026-02-10 and 50,000 farmers/200 village drop-point year-end goals in `cropfresh-launch-karnataka.mdx` | unverified | Launch approval/date/service map; approved dated goals distinguished from outcomes; Product/operations | Hold news item or rewrite with actual documented milestone |
| CLM-043 | Newsletter “Thanks for subscribing!” in `Footer` while only React state changes | demonstration | Mailing provider acceptance, consent, list routing, confirmation/unsubscribe behavior; Growth | Hide subscription flow until integration or label a UI example |
| CLM-044 | Customer images/quotes, hero/hauler photos, named blog authors/covers, farmer/hauler video testimonials | unverified | Asset provenance/licenses, consent, quote verification, correct subject/alt text, actual video URLs; Marketing | Use approved neutral product imagery; placeholder testimonial videos must not be endorsements |
| CLM-045 | 25% lower buyer costs in `HeroSection`; savings up to 20% and traditional 30% markup in `BuyerPricing` | unverified | Like-for-like crop/grade/quantity/delivery/tax comparison, baseline period and cost scope; Finance/data | Explain an illustrative delivered-price breakdown without a measured savings claim |
| CLM-046 | No minimum hours, work on your terms, accepted vehicle list and driving license/RC/Aadhaar requirements in `HaulerRequirements` | unverified | Actual partner contract, eligibility/capacity, supported locations, required-document purpose and verification policy; Operations/privacy | Present eligibility as subject to program confirmation; do not promise flexibility or collect documents at the interest stage |

## 5. Contradictions to close first

| Priority | Records | Resolution |
|---|---|---|
| P0 | CLM-002, CLM-004, CLM-022 | One dated adoption/coverage register; do not select the largest number |
| P0 | CLM-016, CLM-026, CLM-028, CLM-036 | One fee and payout policy; clearly distinguish sample arithmetic from contractual amounts |
| P0 | CLM-027, CLM-035, CLM-039, CLM-040, CLM-043 | Align public action promises with actual delivery/auth/store/demo integrations |
| P1 | CLM-007, CLM-011, CLM-014 | Reconcile metric definitions and dates; never average inconsistent marketing figures |
| P1 | CLM-033, CLM-034 | Confirm language/intent/model stack and actual frontend versions |
| P1 | CLM-031, CLM-036, CLM-037 | Define DPLE naming and what the pricing/traceability implementation really covers |

## 6. Proof templates

### Numeric outcome

```text
Claim ID and proposed wording:
Metric/unit and numerator/denominator:
Baseline and comparison group:
Crops, grades, geography, and cohort size:
Observation period:
Method and exclusions (refunds, duplicates, canceled/demo records):
Evidence reference:
Owner/reviewer:
Approved wording and conditions:
Approval date / review date:
Affected component, locale, metadata, FAQ, blog, and diagram references:
```

### Testimonial

```text
Claim ID:
Approved public name/role/location:
Original interview or quote record:
Permission reference for quote, photo, and video:
Dates and transaction/outcome support:
Exact approved quotation (do not rewrite in quotation marks):
Translation review and approval:
Publication date / review or withdrawal handling:
```

### AI or performance capability

```text
Claim ID:
Model, endpoint, and deployed version:
Test data and ground truth:
Languages/crops/classes/devices/networks:
Metric definition, sample count, p50/p95 or per-class score:
Fallback and human-review behavior:
Evaluation date and independent reviewer:
Allowed wording and limitations:
Retest trigger:
```

Attach redacted evidence references, not customer contact data, payment credentials, private IDs, or consent documents containing personal details, to this public repository.

## 7. Implementation handoff

**2026-10-04 implementation update:** The [first homepage content pass](./IMPLEMENTATION_PROGRESS.md) applies interim replacements to mounted homepage sections, shared navigation/footer, root metadata, and dashboard demo notices. Homepage testimonials and impact counters are held from rendering. The tables above preserve the 2026-10-03 claim audit; removing a claim from one surface does not approve it or resolve its other-page/locale occurrences.

- **Phase 2:** Map the interim claim treatment to routes and action expectations.
- **Phase 6:** Replace current unsupported copy, testimonials, and counters in all mounted and reusable surfaces.
- **Phase 7:** Supply integration and operational evidence for requests, auth, listings, pricing, and payment.
- **Phase 8:** Review retained claims across all translations, metadata, blog content, and schema.
- **Phase 10:** Verify no rejected, conflicting, expired, or demonstration result is displayed as a production fact.

Publication can proceed with evidence-backed claims **or** clear non-quantified product-direction copy. A missing evidence record is not a reason to fabricate a result.
