# Product strategy and audience briefs

**Status:** Audience/positioning draft v1; lead-first launch direction approved by the project requester on 2026-10-03; research and other business decisions require validation.\
**Decision owner:** Product/founder, unassigned.\
**Dependencies:** DEC-001, DEC-002, DEC-005, DEC-009, DEC-010 in the [decision register](./README.md#decision-and-approval-register).

## 1. Positioning

**Category:** Agritech marketplace concept with farmer, business-buyer, and delivery-partner workflows.

**Proposed purpose:** Make produce sourcing easier to understand and coordinate, with clearer product information, prices, and delivery arrangements.

**Proposed one-line positioning:**

> CropFresh is building a simpler way for farmers, food businesses, and delivery partners to connect.

“Is building” describes the product direction while the [feature register](./FEATURE_STATUS.md) distinguishes implemented demos from verified services. If operations verifies an available service, use specific present-tense wording only for that audience, location, and feature.

### Approved launch direction

Prioritize a public marketing and lead-generation experience, with a separately identified interactive demonstration. Public forms must have working, durable delivery before the site invites real submissions. Live orders, payments, authenticated inventory, and deliveries need the Phase 7 production integrations and business terms before being sold as available.

**The requester approved this launch/design direction in [APR-001](../phase-2/README.md#approval-record--apr-001).** Service availability and production integrations still require evidence. Do not infer service coverage from village lists, seed data, dashboard addresses, or blog text.

## 2. Audience hypotheses

These briefs are design hypotheses derived from existing content. They are not completed interviews, demographic research, or verified customer profiles.

### AUD-001 — Farmer

| Attribute | Brief |
|---|---|
| Primary job | Understand whether CropFresh can help sell a crop, then get assisted onboarding or explore a listing demo |
| Context | Mobile use; potentially intermittent connection; voice or assisted interaction may be preferred; validate language and device assumptions in Phase 3 |
| Trigger | A harvest is approaching, market prices are unclear, or the farmer wants an alternative buyer connection |
| Questions | Do you serve my village/crop? What quantity is accepted? Who checks quality? What fees apply? When is payment due? Who can help me? |
| Main objections | Unclear fees, payout risk, confusing registration, quality disputes, unsupported language, unclear pickup arrangements |
| Primary conversion | A successfully delivered farmer-interest/callback request |
| Qualification | Name, contact number, area, preferred support language; crops/quantity can be collected in follow-up unless confirmed necessary |
| Required proof | Approved service area, clear fee/payment conditions, explained inspection process, real support channel, permission-backed story if available |
| Primary CTA | **Request a call** |
| Secondary CTA | **Explore the farmer demo**; app download only after store verification |
| Success feedback | Submission acknowledged only after durable receipt; explain the next step without an unapproved SLA |

**Content order:** availability → farmer benefit → process → fees/payment conditions → proof → callback → FAQ.

**Research tasks:** observe first-click and form completion; ask users to restate fees and payment timing; test Kannada comprehension, microphone-denied path, and low-bandwidth usability.

### AUD-002 — Business buyer

| Attribute | Brief |
|---|---|
| Primary job | Evaluate whether CropFresh fits a business's sourcing needs and arrange a product discussion |
| Context | Mobile or desktop; restaurants, hotels, retail businesses, caterers, and processors may have different quantity and delivery needs |
| Trigger | Inconsistent produce quality, sourcing effort, price uncertainty, or a new supplier requirement |
| Questions | Which crops/grades are supported? What is the delivered price? Is minimum quantity required? What delivery windows apply? How are disputes handled? What batch evidence is available? |
| Main objections | Reliability, vague grading, hidden logistics fees, unproven traceability, unclear delivery or return terms |
| Primary conversion | A successfully delivered qualified demo request |
| Qualification | Business/contact details, business type, area; optional procurement spend band and crop needs for follow-up |
| Required proof | Clearly labeled sample batch record, approved grading process, price breakdown, delivery coverage/terms, verified buyer reference if available |
| Primary CTA | **Request a demo** |
| Secondary CTA | **Explore sample produce** |
| Success feedback | Acknowledge the request; explain how scheduling will be arranged; do not imply account creation already happened |

**Content order:** sourcing fit → quality/price explanation → sample produce → delivery/returns → proof → demo request → FAQ.

**Research tasks:** ask users to distinguish sample inventory from real stock; validate delivered-price comprehension, search expectations, and request-demo completion.

### AUD-003 — Delivery partner

| Attribute | Brief |
|---|---|
| Primary job | Learn whether the role fits a vehicle/location and express interest in delivery work |
| Context | Mobile; owner-driver or fleet contact; route availability and net earnings matter more than technical AI details |
| Trigger | Interest in loads, route utilization, flexible work, or clearer payment terms |
| Questions | Are there loads near me? Which vehicles are accepted? What documents are needed? Who pays for fuel? What deductions apply? When are payments made? |
| Main objections | Unrealistic earning promises, empty-return guarantees, unclear eligibility, document collection, payment delays |
| Primary conversion | A successfully delivered delivery-partner interest request |
| Qualification | Name, contact number, city/area, vehicle type; no document uploads at the interest stage |
| Required proof | Approved eligibility/locations, illustrative earnings assumptions with costs, payout conditions, real support path |
| Primary CTA | **Register your interest** |
| Secondary CTA | **See partner requirements** |
| Success feedback | Acknowledge interest and explain eligibility review; do not promise a load, acceptance, or guaranteed income |

**Content order:** role fit → locations → requirements → route example → earnings explanation → interest form → FAQ.

**Research tasks:** verify understanding of gross versus net earnings; test eligibility questions, partner-interest form, and non-English terminology.

### AUD-004 — Partner, investor, or media contact

- **Job:** Evaluate the concept, team, evidence, and partnership opportunity.
- **Questions:** What is currently available? What is demonstrated? What data supports traction? Who is responsible? How do I contact the team?
- **Primary conversion:** Routed partnership/media inquiry with clear next step.
- **Proof:** Confirmed business identity/team, dated outcome methodology, explicitly labeled prototype architecture, approved case studies.
- **CTA:** **Discuss a partnership** or **Contact the team**.
- **Avoid:** Inflated adoption, unsupported addressable market, fabricated biographies, speculative technology described as deployed infrastructure.

## 3. Business goals and metrics

Targets below are measurement definitions. Current values and growth targets are **not measured**; set numerical business targets after the first reliable baseline.

| KPI | Definition | Proposed owner | Measurement dependency |
|---|---|---|---|
| Role selection rate | Sessions with an intentional farmer/buyer/partner path selection ÷ eligible landing sessions | Growth | Consistent CTA events and bot filtering |
| CTA click-through | Sessions clicking a role's primary CTA ÷ sessions on that role landing page | Growth | One stable primary CTA and route attribution |
| Form completion | Accepted, deduplicated requests ÷ sessions that started that form | Product/growth | Durable backend acceptance plus client start event |
| Qualified lead rate | Leads meeting the role/location criteria ÷ accepted, deduplicated leads | Operations | Agreed qualification criteria and CRM outcome |
| Human response time | Time of first human response minus durable submission time | Support | CRM/contact timestamps; distinguish acknowledgement from response |
| Demo scheduling rate | Leads with a scheduled buyer demo ÷ qualified buyer leads | Sales | Scheduling/CRM outcome |
| Locale completion | Accepted requests ÷ form starts, segmented by site language | Product | Locale attribute; no personal data in analytics |
| Trust comprehension | Participants accurately distinguishing live/pilot/demo and terms ÷ tested participants | Design | Phase 3 moderated sessions |

Count duplicates consistently. Keep personally identifying lead records in the operational system, not analytics properties. Do not use simulated offers, local listings, or fallback answers as production adoption/conversion.

## 4. Content requirements for UI/UX 10/10

The parent plan's 10/10 target is a tested acceptance rubric, not a claim established by this brief.

- A five-second test should reveal audience, purpose, and next action.
- Each role page has one dominant action and concise supporting content.
- A visitor can explain sample versus live data before acting.
- Terms that affect money, quality, eligibility, or privacy appear at the decision point.
- Form labels, errors, and success messages work in all three website languages.
- Alternate text and text summaries communicate the meaning of imagery and diagrams.
- Real service limitations remain readable on mobile; they are not hidden behind hover or tiny footnotes.
- Proposed research target: at least 90% of participants choose the correct primary path. Report participant count and limitations; do not treat internal proxies as external customer validation.

## 5. Handoff

Phase 2 must resolve the dashboard/landing-route conflict, map real CTA destinations, and define role-based forms. Phase 3 validates the audience hypotheses. Phase 6 adopts reviewed copy. Phases 7–8 supply live integration evidence and translation/content review. Before promoting a feature as available, resolve the relevant DEC and FTR records.
