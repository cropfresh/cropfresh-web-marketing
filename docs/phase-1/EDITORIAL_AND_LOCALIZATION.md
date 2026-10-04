# Editorial rules and localization glossary

**Status:** Proposed English master rules and translation brief. Candidate Kannada/Hindi terms are unreviewed; no native-speaker sign-off is claimed.\
**Owner:** Marketing/localization, unassigned.\
**Dependencies:** DEC-003, DEC-007, DEC-008, DEC-009, DEC-010 in the [decision register](./README.md#decision-and-approval-register).

## 1. Voice and writing rules

- Be practical, calm, respectful, and specific. A farmer, buyer, or partner should understand what happens next without knowing internal technology names.
- Use **CropFresh** consistently; preserve brand case in all languages.
- Use sentence case for headings, buttons, labels, and status messages.
- Use active voice and short sentences. Explain the user outcome before AI architecture.
- Prefer **produce**, **farmers**, **business buyers**, and **delivery partners**. “Hauler” may remain a technical/route name but public labels should say “Delivery partners.”
- Write one canonical fact once and reuse it in body copy, FAQs, metadata, structured data, and translations.
- Use the feature's verified status; do not translate a product aspiration into a present-tense guarantee.
- Keep sample numbers separate from real outcomes. “Illustrative” does not mean “pilot.”
- Do not write or edit a customer quotation without the approved original and translation permission.
- Describe field agent work separately from model estimates. An AI estimate is not a physical inspection or certification.
- Avoid “zero literacy”/“farmers don't type” as generalizations. Prefer “voice-assisted” and keep manual/assisted alternatives.

## 2. Canonical glossary

| Term | Plain-language definition | Editorial rule |
|---|---|---|
| Farmer | A person or business offering agricultural produce | Avoid assuming literacy, device ownership, or guaranteed results |
| Business buyer | A food business exploring or procuring produce | Distinguish a demo visitor from a verified customer |
| Delivery partner / hauler | A driver or logistics operator participating in produce delivery | Interest submission is not employment acceptance or guaranteed loads |
| Produce listing | A record describing a crop, quantity, asking price, and relevant batch information | State whether it is sample, submitted, active, or verified |
| Asking price | The amount requested by the seller, usually per stated unit | Not necessarily the delivered price or final payout |
| Farmer payout | The confirmed amount payable to the farmer after the agreed breakdown | Do not infer a production amount from a demo split |
| Gross earnings | Revenue before operating costs and deductions | Never label as net income/profit |
| Net earnings | Earnings after explicitly stated costs/deductions | List fuel, time, vehicle, fee and other assumptions for examples |
| AISP | All-Inclusive Single Price: the proposed delivered-price breakdown | Explain base amount, adjustments, logistics, fees/taxes/buffer if applicable; commercial definition awaits finance review |
| DPLE | Internal pricing-engine acronym with conflicting expansions in current copy | Use **pricing engine** until the owner chooses Learning or Liquidity and defines the capability |
| T+0 | Settlement scheduled on the transaction's defined settlement day | Define the trigger/day/timezone; not a universal instant bank-credit promise |
| UPI | Unified Payments Interface, an Indian payment system | Use UPI as a familiar acronym; availability and timing need provider confirmation |
| Quality grade | Crop-specific category based on documented checks | Explain criteria; A/B/C is not a universal or statutory guarantee |
| AI-assisted grading | A model estimate from input such as produce photographs | Describe uncertainty, crop scope and human-review behavior; no unapproved accuracy percentage |
| Field verification | A human check performed against defined produce criteria | Claim only when inspection workflow/capacity is confirmed |
| Verified buyer/farm | An entity that completed a specified verification process | State what was checked; a decorative badge is not verification |
| Digital Twin | Product term for a proposed digital batch representation/record | Introduce as **batch record**; avoid immutable/tamper-proof without architecture evidence |
| Traceability | Ability to follow recorded batch origin and custody events | State coverage; QR code possession alone is not complete chain-of-custody |
| QR code | A scannable link or identifier associated with a record | Explain what scanning reveals and how corrections are handled |
| Market price | A dated price observation for a stated market/crop/grade/unit | Show source/time; not a guaranteed offer |
| AI matching | Proposed suggestions using specified listing/buyer information | Differentiate recommendation from confirmed acceptance |
| Route optimization | Proposed route planning using locations and constraints | Avoid “no empty returns” and outcome savings without actual evidence |
| Live | Verified available capability for the stated audience/location/version | Follow FTR evidence and support requirements |
| Pilot | Documented limited real operation with eligible users, area, and period | Do not use to describe fabricated/sample results |
| Demo | A sample or simulated experience, possibly dependent on unverified external services | Show label at the point of interaction |
| Coming soon | Not yet available to the visitor | Do not invent a release date or enable a misleading CTA |
| Callback request | Interest in a human response | Acknowledgement is not a completed call or guaranteed SLA |
| Demo request | Interest in arranging a product demonstration | Receipt is not a scheduled appointment |

## 3. Language scope and candidate terms

### Website versus AI support

- **Website target:** English (`en`), Kannada (`kn`), Hindi (`hi`) across the full public journey.
- **Current reality:** JSON files exist and some forms have independent inline translations; global pages are not fully translated.
- **AI speech target/availability:** Separate engineering-owned matrix. The UI lists Kannada, Hindi, Telugu, Tamil, and English; that is not verified endpoint support or complete website localization.
- **Native review:** Assign a Kannada and Hindi reviewer through DEC-010. Technical and financial wording requires both native comprehension and owner agreement.

### Candidate common labels

These are translation starting points for reviewer discussion, not automatically approved production strings. Brand and framework names remain unchanged unless the owner specifies an accepted transliteration.

| English master | Kannada candidate | Hindi candidate |
|---|---|---|
| Farmer | ರೈತ | किसान |
| Buyer | ಖರೀದಿದಾರ | खरीदार |
| Delivery partner | ವಿತರಣಾ ಪಾಲುದಾರ | डिलीवरी पार्टनर |
| Your name | ನಿಮ್ಮ ಹೆಸರು | आपका नाम |
| Mobile number | ಮೊಬೈಲ್ ಸಂಖ್ಯೆ | मोबाइल नंबर |
| Preferred language | ಆದ್ಯತೆಯ ಭಾಷೆ | पसंदीदा भाषा |
| Contact us | ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ | हमसे संपर्क करें |
| Learn more | ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ | और जानें |
| Request a call | ಕರೆಗಾಗಿ ವಿನಂತಿಸಿ | कॉल का अनुरोध करें |
| Request a demo | ಡೆಮೊ ವಿನಂತಿಸಿ | डेमो का अनुरोध करें |

Review “call,” “demo,” “batch record,” “delivered price,” “settlement,” and “quality estimate” with representative users. Literal translations of technical terms may be less understandable than a short explanation.

## 4. Formatting and inputs

- **Money:** INR with an explicit unit, such as `₹25/kg`. Use Indian grouping consistently (`₹1,50,000`) and say whether the amount is sample, gross, net, per kg, trip, day, or month.
- **Percentages:** Include a baseline and scope; do not turn a rupee price change into an income/profit claim.
- **Dates:** Use unambiguous month names for public dates and ISO dates in internal evidence records. Show market observation timestamps with timezone; generated timestamps are not evidence of a fresh data feed.
- **Phone:** Explain +91 and the required mobile number format. During Phase 8, verify pasted/spaced/localized-digit input normalization against the current ASCII server schema.
- **Quantities:** Always show unit (kg/tonne etc.) and distinguish mass from procurement spend.
- **Location:** Use one approved spelling/variant such as Bengaluru/Bangalore; do not force an official preference without DEC-002/009 confirmation.
- **Dynamic text:** Use ICU/plural-aware messages rather than concatenating translated fragments. Verify variable order, currencies, quantity and error rendering.
- **Reading and status:** Preserve numeric/technical facts across languages; translation must not silently add “instant,” “guaranteed,” “free,” or “every.”

## 5. Translation workflow and acceptance

1. Accept the English master and record related MSG, CLM, and FTR IDs.
2. Assign one canonical key per label, CTA, error, FAQ, status and metadata string.
3. Consolidate inline dictionaries and JSON messages during implementation; detect missing/extra keys. For example, buyer volume-error keys differ across current locale resources.
4. Translate from the accepted master with glossary context, not stale unmounted components.
5. Run native review; record reviewer, date, content version and any clarification.
6. Run owner review of money, terms, permissions and product status after translation.
7. Test expansion, line wrapping, script font coverage, labels, placeholders, select values and status announcements at 320px and desktop.
8. Verify persisted/shared language choice and correct document/section `lang` values; critical mixed-language text must be tagged appropriately.
9. Change all languages together when facts, fees, contacts, availability or support promises change.

### Translation review record

```text
Content/key IDs and English version:
Locale:
Native reviewer and date:
Financial/operational/technical reviewer:
Known terms or ambiguity resolved:
Desktop/mobile/assistive-technology check:
Approved text and version:
Next review trigger:
```

## 6. Editorial publication checklist

- [ ] Audience, next action, and feature status are understandable without an animation.
- [ ] MSG source copy is accepted and all affected CLM records are resolved or their claims removed.
- [ ] Live/pilot eligibility and limitations remain visible in each language.
- [ ] Form errors and accepted/duplicate/failure messages match actual server behavior.
- [ ] Contact/policy/newsletter wording describes confirmed business practices.
- [ ] Byline, quote, image, video, and statistics have the necessary identity/rights/evidence records.
- [ ] Metadata, schema, blog, FAQ and app/download text match visible copy.
- [ ] Kannada/Hindi critical journeys have native review and layout/accessibility evidence.

**Handoff:** Phase 3 validates comprehension; Phase 6 implements canonical strings; Phase 8 completes native and accessibility review. This document establishes rules and a glossary; it does not certify the current translations.
