# User journeys and validation tasks

**Status:** Proposed journeys derived from Phase 1 audience hypotheses; no user study has been completed.

**Owner:** Product/design lead, unassigned.

**Inputs:** [Audience briefs](../phase-1/PRODUCT_STRATEGY.md), [CTA matrix](./CTA_MATRIX.md), [state contracts](./FORM_AND_STATE_CONTRACTS.md).

## 1. Role journeys

### JRN-001 — First-time farmer on a low-end mobile device

**Job:** Find out whether participation is relevant and request assisted contact.

**Primary:** Farmer interest request. **Secondary:** Explore a labeled listing demo.

```text
Home/search/referral → /farmers → process and availability explanation
  → #callback → enter name, mobile, area, preferred callback language
  → validate → submit → received or duplicate acknowledgement
  → review farmer process / await an operational follow-up

Optional exploration → /demo/farmers → sample listing/voice-or-manual path
  → labeled sample result → return to /farmers#callback
```

| Step | Required experience |
|---|---|
| Orient | Farmer purpose and Request a call are visible before decorative media; location eligibility is conditional |
| Evaluate | Simple process; fees/payment questions answered only from approved terms; unverified app release is not the primary path |
| Complete | Short labelled fields, native phone keyboard, helpful location entry including an Other/manual path |
| Recover | Invalid field focus and correction; keep values on failure; manual alternative if voice/microphone is unavailable |
| Confirm | Durable receipt is distinct from a completed call, approved enrollment or guaranteed sale |

**Phase 3 task:** “You have produce to sell. Find how to ask about support in your area and request a call.” Observe first click, completion, error recovery and understanding of payment/availability. Ask the participant whether a sample listing reaches real buyers.

### JRN-002 — Buyer comparing suppliers on desktop

**Job:** Understand the product's fit, quality/pricing explanation and arrange a discussion.

**Primary:** Buyer demo request. **Secondary:** View sample produce.

```text
Home/search/article → /buyers → quality + pricing + traceability explanation
  → #request-demo → business/contact details and qualification
  → validate → submit → request received or already received
  → /demo/buyers sample exploration / await scheduling discussion

Optional evaluation → /demo/buyers → search sample crops → review example grade/price
  → optional simulated offer with explicit demo state → return to /buyers#request-demo
```

**Required:** Distinguish asking/delivered prices, illustrative breakdown and real terms. Monthly rupee bands are **procurement spend**, not mass/quantity. Sample stock, ranking and offers cannot imply verified live inventory, geographic matching, ordering or payment. Accepted request feedback never says an account or meeting has already been created.

**Recovery:** Clear sample-search no-results with reset; editable request fields; duplicate-aware acknowledgement; visible failure/retry instead of success on request initiation. Signed-out/wrong-role simulated actions lead to explicit demo-persona selection with an appropriate return path.

**Phase 3 task:** “Evaluate whether this could suit your business, explain what the displayed price means, and request a demonstration.” Test sample-versus-live comprehension, request completion and clarity of next steps.

### JRN-003 — Delivery partner joining from a mobile device

**Job:** Check location/vehicle fit and express interest.

**Primary:** Register interest. **Secondary:** Read requirements and illustrative earnings.

```text
Home/referral → /haulers → #requirements → eligibility questions
  → optional #earnings explanation with explicit costs/assumptions
  → #callback → name, mobile, city/area, vehicle type
  → validate → submit → interest received or already received
  → review requirements / await eligibility discussion
```

**Required:** Requirements, lanes and payment terms depend on operations confirmation. An earnings example separates revenue from costs/net earnings. No “guaranteed loads,” job acceptance, empty-return guarantee, identity-document upload or unavailable hauler dashboard follows the interest request.

**Recovery:** Other/manual area entry; correct vehicle selection; input preservation on network failure; preferred callback-language option only after support capability and schema agree.

**Phase 3 task:** “Check whether your vehicle and area might fit, then express interest.” Ask whether submission guarantees work and whether any earnings example is gross or net.

## 2. Additional required journeys

| ID | Visitor/context | Path and success condition | Recovery / design requirement | Phase 3 validation task |
|---|---|---|---|---|
| JRN-004 | Returning lead checking contact | Direct `/contact` → choose suitable inquiry type → ask a follow-up; persistent acknowledgement/reference only if actually supplied | No invented lead-status portal; preserve context without exposing lead details in URLs; show approved contact fallback when available | “You previously sent a request and want to contact the team again. Find a usable follow-up path.” |
| JRN-005 | Native Kannada speaker using callback | Select Kannada → same farmer page/anchor → understand labels/errors → request callback in chosen support language → Kannada acknowledgement | Site locale and callback preference remain separate; preserve input on language change; approved Kannada text/script fonts across the entire path | Conduct farmer task in Kannada with native reviewer; ask user to restate receipt and next step |
| JRN-006 | Search visitor landing on blog article | Published direct `/blog/[slug]` → understand topic/byline/date → related approved article or relevant farmer/buyer/partner action | No inaccessible draft/future direct URLs; image fallback; explicit English-only article when untranslated; no unsupported launch/story proof | “You found this article through search. Find the appropriate next step for your role.” |
| JRN-007 | Keyboard-only and reduced-motion user | Skip to content → header/role selection → role CTA → complete form → hear/read acknowledgement | Visible focus; logical order; menu focus restoration; no hover-only action or forced animation; field errors and accepted state announced | Complete one role task without pointer and with reduced motion; record focus/status blockers |
| JRN-008 | Slow connection; delayed images/video | Direct role page → readable purpose and action before media → manual form → accepted or recoverable network state | Stable media space/alt text; no autoplay dependency; preserve input on offline/unknown outcome; no blanket public auth-hydration gate | Throttle connection and block images; request a call and recover from a timeout without a duplicate lead |

### JRN-009 — Partner, investor or media contact

**Job:** Understand what is demonstrated versus available and reach the right team.

**Primary:** Partnership/media inquiry. **Secondary:** Review product approach and labeled AI architecture.

```text
/about or /ai → confirmed approach/evidence + feature maturity
  → /contact?type=partnership#contact-form
     or /contact?type=press_media#contact-form
  → valid preselection, editable inquiry type → submit → receipt acknowledgement

Optional evaluation → /ai#ai-architecture → proposed architecture explanation
  → technology inquiry / return to /about
```

**Required:** Real identities/results/assets need DEC-005/006/008 evidence. Preselection must work on direct load and client navigation, without changing user-edited content. Missing press kit is handled with a correctly labeled media inquiry, not a dead `/press` link.

**Phase 3 task:** “Determine what is currently available and send a partnership or media question.” Record whether the visitor correctly identifies demos and unsupported traction.

## 3. Cross-journey acceptance

| Measure | Proposed acceptance target / definition | Evidence needed |
|---|---|---|
| First impression | Participant identifies intended audience, purpose and next action after five seconds | Responses, audience/context, tested version |
| Primary path | At least 90% choose the intended first path, as required by the master plan | Actual participant count and denominator; report each audience separately |
| Task completion | Complete the specified request or deliberate sample exploration without a critical blocker | Completion/failure, assistance used, time, error/recovery observations |
| Trust comprehension | Visitor distinguishes demo data, request receipt, scheduling and real service eligibility | Participant explanation; not an analytics-click proxy |
| Input/state access | Labels, validation and accepted/duplicate/failure states are usable by keyboard and in selected locale | Device/browser/assistive technology and native-review findings |
| Slow/offline recovery | User understands pending/unknown/failed outcome and can retry without losing input or multiplying leads | Controlled network scenarios and server idempotency behavior in later implementation |

The Phase 3 plan calls for at least five representative users or documented internal proxies per audience. With five participants, four successes are 80%, so all five are needed to reach a 90% threshold; report raw counts rather than implying statistical certainty. Internal proxies must be identified as such. No scores or task-completion results are recorded here.

## 4. Design/research handoff

Prepare mobile and desktop wireframes for each route decision, including role chooser, public/demo boundary, mobile demo menu, inquiry preselection, input/error/accepted/duplicate/offline states and sample-response provenance. Validate the low-fidelity flows before high-fidelity visual implementation.

Use a session record containing JRN ID, audience, locale, device/connection, version, task, first click, completion, assistance, errors, trust comprehension, issues and next design action. Keep personal contact details separate from research findings. Product/design approval records must identify the accepted version and unresolved issues.
