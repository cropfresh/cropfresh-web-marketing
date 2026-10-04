# Message hierarchy and draft copy

**Status:** Draft v1 — proposed English master, not marketing or operations approval.\
**Owner:** Product/marketing, unassigned.\
**Dependencies:** [Claims register](./CLAIMS_REGISTER.md), [feature register](./FEATURE_STATUS.md), DEC-001, DEC-003, DEC-004, DEC-007, DEC-009.

## 1. Message order

1. **Who it is for:** farmers, food businesses, delivery partners.
2. **What the product is building:** simpler connections and clearer produce information.
3. **How to explore:** role-specific interest request, product demo, or contact.
4. **What is available:** explicit live/pilot/demo status, supported locations, and conditions.
5. **Why to believe:** process evidence and approved real results, where available.
6. **What happens next:** acknowledgement, qualification, and follow-up without invented deadlines.

Use “is building,” “explore,” and “designed to” for unverified product direction. Present-tense promises need the applicable FTR record marked `live` or verified `pilot`, with accepted evidence.

## 2. Homepage draft

### MSG-001 — Category and hero

**Eyebrow:** Connecting the produce supply chain

**Headline:**

> A simpler way to connect farms, food businesses, and delivery partners.

**Supporting copy:**

> Explore how CropFresh is building clearer produce listings, pricing information, and delivery coordination. Choose your role to see the product and register your interest.

**Role paths:**

| Role label | Button copy | Intended outcome |
|---|---|---|
| For farmers | Explore selling with CropFresh | Farmer landing page with process and callback |
| For buyers | Explore produce sourcing | Buyer landing page with demo request |
| For delivery partners | Explore delivery opportunities | Hauler landing page with requirements and interest form |

**Header action:** Get started → role choice. Phase 2 must define working routes before these labels are implemented.

**Secondary action:** Explore the product demo → labeled demo.

### MSG-002 — Benefits and process

- **For farmers:** Understand the listing process and ask about support for your crop and area.
- **For buyers:** Explore sample produce information and discuss your business's sourcing needs.
- **For delivery partners:** Learn about vehicle requirements, delivery workflows, and participation.

**Process introduction:**

> See the intended journey from produce listing to delivery. The demo uses sample information; service availability and commercial terms are confirmed separately.

**Proof treatment:** Use explanatory process or sample batch material until approved evidence exists. Do not replace unsupported numbers with invented pilot numbers. An aspiration such as “reduce waste” must not be formatted like a measured result.

## 3. Role-page drafts

### MSG-003 — Farmers

**Headline:** Your harvest. A clearer path to buyers.

**Supporting copy:**

> See how CropFresh is being designed to help farmers describe their produce and connect with business buyers. Tell us your area and preferred language to discuss availability and next steps.

**Primary action:** Request a call.

**Secondary action:** Explore the farmer demo.

**Form introduction:**

> Share your contact details and area so the team can respond to your interest. Availability, fees, and payment terms will be confirmed before you decide to participate.

**FAQ prompts:** Do you support my crop and area? What information is needed? How is quality checked? What charges apply? When is payment made? How can I get help in my language?

### MSG-004 — Buyers

**Headline:** Explore a clearer way to source produce.

**Supporting copy:**

> Review the CropFresh product demo and discuss your crop, quantity, and delivery needs. Sample listings show how quality information and price breakdowns could support sourcing decisions.

**Primary action:** Request a demo.

**Secondary action:** View sample produce.

**Form introduction:**

> Tell us about your business and sourcing needs. The team can discuss product availability and arrange a demonstration; submitting this request does not place an order or create an account.

**Procurement field naming:** Use “Monthly procurement spend” for rupee bands. The current label “Monthly Procurement Volume” refers to money, not kilograms; fix its wording during form implementation.

**FAQ prompts:** What produce is supported? What does each grade mean? What is included in the price? What delivery areas and windows are available? How are quality disputes handled?

### MSG-005 — Delivery partners

**Headline:** Explore delivery opportunities with CropFresh.

**Supporting copy:**

> Learn about the proposed delivery workflow and partner requirements. Share your area and vehicle type to discuss whether the program is a fit.

**Primary action:** Register your interest.

**Secondary action:** See partner requirements.

**Form introduction:**

> Share your contact details, area, and vehicle type. Participation and load availability are subject to confirmation; this request is not a job offer or a guaranteed earnings commitment.

**Earnings section:**

> An earnings example should explain the vehicle, distance, working time, fuel, costs, deductions, and payout basis. It is an illustration, not an average customer result.

## 4. Supporting pages

### MSG-006 — AI

**Headline:** Explore the CropFresh AI demo.

**Supporting copy:**

> Try the demonstration and learn about the proposed voice, quality-information, and pricing workflows. Clearly labeled sample responses and illustrative calculations are not live listings or transaction quotes.

**Primary action:** Try the demo.

**Secondary action:** Discuss the technology.

The UI must state when a response came from an external service versus an example fallback. Do not use “real backend,” “any Indian language,” “95% accuracy,” or latency claims without capability evidence. Architecture descriptions need engineering review.

### MSG-007 — About and partnerships

**Headline:** Building clearer connections across the produce supply chain.

**Supporting copy:**

> CropFresh brings farmer, business-buyer, and delivery-partner workflows into one product vision. Explore the approach and contact the team about collaboration.

Use confirmed identities, milestones, and operating locations once supplied. Do not present sample bylines or model diagrams as a verified company biography.

### MSG-008 — Contact and newsletter

**Headline:** Talk with the CropFresh team.

**Supporting copy:**

> Tell us whether you are a farmer, buyer, delivery partner, or interested in a partnership so your inquiry can reach the right person.

**Primary action:** Send inquiry.

**Newsletter introduction, only after integration:** Receive product updates by email.

Do not show a subscriber-success message until the subscription service accepts the request. Contact inboxes, response deadlines, subscription frequency, and data-use wording require DEC-004/DEC-008 confirmation.

## 5. Form and demo microcopy

Use the following as the shared English source for Phase 6–7 behavior. Translate from these strings after review.

| State | Draft text | Condition |
|---|---|---|
| Farmer request accepted | “Your request has been received. The team will contact you about availability and next steps.” | Durable request delivery verified |
| Buyer request accepted | “Your demo request has been received. The team will contact you to discuss your sourcing needs.” | Request accepted; not a scheduled demo until actual booking |
| Partner interest accepted | “Your interest has been received. The team will contact you about requirements and availability.” | No implied job acceptance |
| Contact accepted | “Your inquiry has been received.” | Delivery verified; display real reference when available |
| Duplicate | “We have already received a recent request with these details.” | Server detects duplicate; do not create misleading second lead |
| Submitting | “Sending your request…” | Awaiting server response |
| Request failed | “We could not send your request. Please try again.” | Preserve input and provide a verified fallback contact when available |
| Invalid phone | “Enter a valid 10-digit Indian mobile number.” | Current +91 phone schema |
| Microphone denied | “Microphone access is unavailable. You can use the text input instead.” | A working text/manual alternative must exist |
| Network demo failure | “The service is unavailable. This is an example response, not a submitted listing.” | Example fallback is actually used |
| Sample inventory | “Demo inventory — sample produce, not current stock.” | Local showcase listings |
| Sample transaction | “Demo offer — no purchase or payment is made.” | Local order/offer flow |
| Sample calculator | “Illustrative price — not a live market quote or binding offer.” | Local pricing calculation |
| Unverified app | “App availability will be announced after release confirmation.” | Avoid a clickable unverified store/download action |

### Privacy wording requirement

The interest form should explain why contact details are collected, which team receives them, and where the privacy notice is available. Marketing opt-in must be separate from an operational response request. Exact controller, retention, rights, processors, and policy wording remain DEC-008 inputs; do not invent a “100% secure” or “we only ever use your number” guarantee.

## 6. Metadata and search copy

Search previews, Open Graph, Twitter cards, and JSON-LD must carry the same availability and claim limits as visible copy.

| Page | Proposed title before the root template | Draft description intent |
|---|---|---|
| Home | CropFresh: Farms, Buyers & Delivery Partners | Explore the product vision and choose a role; no instant-pay or nationwide-availability promise |
| Farmers | For Farmers: Explore CropFresh | Crop/area inquiry, listing demo, assisted next step |
| Buyers | For Buyers: Produce Sourcing Demo | Business sourcing discussion and sample product information |
| Haulers | For Delivery Partners: Explore CropFresh | Requirements and interest registration; no income guarantee |
| AI | CropFresh AI Demo | Voice/pricing demonstration with sample-state clarity |
| About | About CropFresh | Product approach and confirmed team details |
| Contact | Contact the CropFresh Team | Routed role-based inquiry and verified contacts |

Apply the brand once through the root title template where practical. Do not use structured data to publish evidence-free authors, founding dates, organization identity, stock availability, or ratings.

## 7. Copy review criteria

- Each page clearly identifies its audience and first action.
- Fees, payment, quality, availability, and demo conditions remain precise.
- Avoid “first,” “best,” “guaranteed,” “never,” “instant,” or outcome percentages without approved proof.
- All CTA labels match the actual next step.
- No text promises a working destination before Phase 2 resolves it.
- English source, metadata, translations, FAQs, and success messages change together.
- Draft copy becomes accepted only after DEC-009 is recorded; publication needs the related CLM/FTR and operational approvals.
