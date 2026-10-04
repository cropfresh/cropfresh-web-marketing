# Form, context and interaction-state contracts

**Status:** Proposed UX/integration requirements; current APIs retain their existing behavior.

**Owners:** Product, frontend, backend and operations leads, unassigned.

**Inputs:** [Draft microcopy](../phase-1/MESSAGE_HIERARCHY.md#5-form-and-demo-microcopy), [editorial rules](../phase-1/EDITORIAL_AND_LOCALIZATION.md), DEC-002/004/008/010 and IA-003/004.

## 1. Role-specific forms

These wire fields come from the current form and API schemas. Visible wording and future qualification changes must be implemented consistently across client validation, server validation, durable storage, CRM mapping and all locales. Proposed additions/optional fields are not silently accepted by today's schemas.

| ID | Entry / endpoint | Current required wire fields | Draft UX and coordinated changes | Accountable integration owner |
|---|---|---|---|---|
| FRM-001 | `/farmers#callback`; `POST /api/leads/farmer` | `name`, `phone`, `village`, `language` (`en`/`kn`/`hi`) | Name/mobile/area/preferred callback language; retain `village` key initially; add accessible Other/manual area path and review supported location list | Backend lead |
| FRM-002 | `/buyers#request-demo`; `POST /api/leads/buyer` | `businessName`, `contactPerson`, `email`, `phone`, `businessType`, `monthlyVolume` | Label `monthlyVolume` as Monthly procurement spend; propose area and optional spend/crop needs only after IA-003 approval and schema coordination | Backend lead |
| FRM-003 | `/haulers#callback`; `POST /api/leads/hauler` | `name`, `phone`, `city`, `vehicleType` | City/area and vehicle type; reviewed eligibility values and Other/manual path; preferred callback language requires an added field and operational support | Backend lead |
| FRM-004 | `/contact#contact-form`; `POST /api/leads/contact` | `inquiryType`, `name`, `email`, `message`; optional `phone` | Valid inquiry preselection, editable type, optional mobile clearly marked; persistent acknowledgement; role-support taxonomy reviewed with operations | Backend lead |

Buyer wire enums currently include business types `restaurant`, `retail`, `food_processing`, `catering`, `other` and spend bands `under_50k`, `50k_2l`, `2l_5l`, `5l_10l`, `over_10l`. Changing the visible spend label does not require renaming the payload key. Reducing mandatory fields or adding location requires a coordinated contract change, not a frontend-only edit.

Current contact inquiry types are `general`, `farmer_support`, `buyer_support`, `partnership`, `press_media`, `careers`. There is no `hauler_support` type today; a delivery-partner question can use general inquiry until operations approves and both schemas implement a distinct type. A careers inquiry is not evidence of an open vacancy.

### Input requirements

- Names and messages accept Unicode text, including Kannada/Hindi. Trim surrounding whitespace; do not constrain names to ASCII letters. Agree sensible server/client length bounds rather than using mismatched limits.
- Current phone schemas require ten ASCII digits starting 6–9. Implement shared normalization for recognized spacing, localized digits and explicit Indian country prefixes, then validate; avoid arbitrary-character stripping that silently converts invalid input. Preserve a clear +91 explanation and keyboard/autocomplete behavior.
- Label every field, including select inputs; placeholders are examples, not labels. Use `autocomplete`, useful input modes and error descriptions without making numeric phone fields lose leading-format information.
- Accept an area inquiry without implying that every listed village/city is served. Other/manual input must be represented meaningfully in the wire contract, not as a value that loses the user's actual area.
- Explain operational data use and link the real privacy notice. Separate newsletter/marketing opt-in from an interest response; the policy and consent basis need DEC-008 input.
- Keep site locale separate from callback-language preference. Preserve edited values when either changes; server errors map to reviewed locale keys rather than raw English exception text.
- Interest forms collect neither payment information nor identity-document uploads. Eligibility and commercial terms are discussed after the interest stage unless the business approves another journey.

## 2. Context and URL contract

| Context | Allowed values and behavior |
|---|---|
| Contact `type` | Only the six current inquiry enums until a coordinated change; absent/invalid → `general`; show valid preselection on initial load and client navigation |
| Contact editing | User can change inquiry type. Query changes must not wipe name/message or override an intentionally edited type during unrelated navigation |
| Demo `role` | `farmer` or `buyer` for implemented sample workflows; unsupported values → explicit role choice; no implied hauler workspace |
| Demo return context | Optional `next` may point only to an agreed internal `/demo` route compatible with the selected role; fallback to that role's sample landing |
| Listing sample prefill | Existing `commodity`/`quantity_kg` inputs are validated, editable demo suggestions; do not treat them as confirmed crop, stock or price |
| Locale | Follow approved IA-004 path/preference rules; locale and callback language are separate attributes |

URLs and analytics contain no lead contact details, free-text inquiry, microphone recording or transcript. A displayed lead reference must come from actual server receipt; do not invent a status URL or expose unprotected lead lookup. Use framework/state-level preselection rather than timer-driven DOM mutation.

## 3. Form state machine

```text
idle → editing → client validation
  invalid → field errors + summary → editing
  valid → submitting
    accepted → persistent received state + useful next step
    duplicate → persistent already-received state + useful next step
    server field errors → mapped field errors → editing
    retryable failure → preserved input + retry
    timeout / connection lost after send → outcome unknown + idempotent retry
    rate limited → preserved input + server-directed retry guidance
offline before send → preserved input + explicit unsent state
```

| State | Feedback / behavior | Acceptance condition |
|---|---|---|
| Idle/editing | Required/optional labels, purpose, privacy link and next-step explanation | Keyboard and selected locale work before any network request |
| Invalid | Inline field errors linked with `aria-describedby`; focus an error summary or first invalid field | User can understand/correct errors without losing values |
| Submitting | “Sending your request…”; prevent repeated submit; keep appropriate navigation available | Exactly one deliberate request in flight; announced busy state |
| Accepted | Role-specific received text from MSG source; real reference if supplied; CTA-019–022 next step | Durable receipt and reliable team handoff have been verified; response not inferred from button click |
| Duplicate | “We have already received a recent request with these details.” | No new lead/conversion is claimed; reference shown only if safely supplied by backend |
| Server validation | Reviewable localized errors; preserve corrected values | Client/server fields and constraints agree |
| Retryable error | Explain request failure; retain input; offer retry and approved fallback contact | No fabricated success; retries use appropriate idempotency context |
| Outcome unknown | “We could not confirm whether your request was received. Retry to check safely.” | Reuse the same request identity; neither claim failure nor create another lead blindly |
| Rate limited | Clear wait/retry guidance derived from actual server response | Respect supplied retry timing; do not invent a countdown |
| Offline before send | “You are offline. Your request has not been sent.” | No silent queue/success claim; keep inputs and allow explicit retry after reconnect |

Accepted and duplicate states persist until explicit user action/navigation; do not disappear after six seconds. Move focus to a labelled confirmation region and announce it without repeatedly interrupting reading. Give an intentional “Send another inquiry” action only when useful, with clear reset behavior.

## 4. Backend acceptance and response handoff

The four current handlers use local JSON files, return `success`, `message`, sometimes `leadId`, and indicate a duplicate with `duplicate: true` and HTTP 200. Client code currently treats most duplicates as fresh success. Contact alone has in-process rate limiting; this is not durable multi-instance infrastructure.

Phase 7 integration requirements:

1. Preserve an explicit distinction between durable accepted receipt, existing duplicate, field failure, temporary failure and rate limiting.
2. Return a real receipt reference when supported. A missing `leadId` on today's duplicate response must not cause a client-generated substitute.
3. Commit durable lead storage and a reliable operational handoff before acknowledging acceptance. Notifications/CRM delivery may use a durable retryable queue; receipt does not mean a human has responded or a meeting has been booked.
4. Define request idempotency and atomic duplicate handling for concurrent retries. Reuse a per-attempt request identity after an unknown outcome; a button's disabled state or read-modify-write JSON file does not meet this requirement.
5. Review current 24-hour duplicate rules with operations: farmer/hauler phone, buyer phone or email, contact email plus inquiry type. Ensure repeated requests with meaningfully changed needs have a documented path.
6. Map structured server field errors to localized UI keys, avoiding raw internal details. If rate-limit timing is supplied, expose consistent retry behavior.
7. Verify durable receipt, team routing, notification retry, deduplication and support expectations end to end. Adopt CLM-027 wording only after DEC-004 approval.
8. Count actual accepted non-duplicate leads separately from client form starts, acknowledgements and simulated actions. Keep identifying payloads in the operational system.

The form UX can be implemented against a stable adapter while the provider is chosen; real public collection still requires the storage/operational/privacy requirements to be met. This document does not select a CRM, database or mail provider.

## 5. Demo and navigation states

| State | Required experience |
|---|---|
| Demo entry | Sample label before interaction; clear farmer/buyer choice and return-to-website action |
| Signed-out sample view | Read-only exploration or explicit persona prompt; an offer/listing action never silently does nothing |
| Correct demo role | Simulated mutations have sample feedback; no real purchase/payment/listing-notification claim |
| Wrong/unsupported role | Explain the supported sample path; change role or return to that role's public interest page without an unexplained redirect |
| Demo hydration/loading | Scoped loading inside demo; public marketing remains readable; avoid blank whole-site gate |
| Sample search loading/empty | Describe sample filtering, not unimplemented live AI ranking; clear/reset path on no results |
| Voice permission denied/unavailable | Working text/manual input; explain microphone state and stop/release recording appropriately |
| External AI response | Identify response source and any unavailable capability; no global live-backend claim without evidence |
| Example fallback | Clearly label an example; show actual text; it is not a submitted listing or real market quote |
| Demo mutation success/error | Persistent enough to read; sample result shown; input recoverable on failure |
| Menu/role selector | Labelled expanded state, close/escape and focus restoration; full mobile navigation parity |
| Missing/unpublished route | Useful not-found path to home/role/contact; drafts do not leak through article metadata or direct URLs |
| Media unavailable | Meaningful text/alt fallback and stable layout; task never requires video or hover |

## 6. Wireframe and implementation checks

- [ ] FRM-001–004 required/optional fields and any changes are owner-approved and schema-coordinated.
- [ ] Initial, edited, invalid, busy, accepted, duplicate, failed, unknown, offline and rate-limited states are designed.
- [ ] Form context works on direct load, client transitions, back/forward and language changes.
- [ ] Keyboard focus, screen-reader status, translations and input preservation are tested.
- [ ] No receipt is inferred from timers, DOM changes, analytics events or example fallbacks.
- [ ] Phase 7 verifies durable routing and idempotency before real collection.
