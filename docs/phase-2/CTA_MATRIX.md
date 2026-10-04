# CTA destinations and ownership

**Status:** Proposed contracts, not implemented or owner-approved navigation.

**Inputs:** [Message hierarchy](../phase-1/MESSAGE_HIERARCHY.md), [route register](./SITEMAP_AND_ROUTES.md#2-route-register).

**Decisions:** IA-001–005; assign one named accountable destination owner per action before sign-off.

## 1. Core conversion and exploration actions

The owner column names the single accountable role for the destination. Copy, evidence, localization and backend reviewers can contribute without changing destination accountability. Repeated placements may share a contract ID when label, target and outcome are the same.

| ID | Surface / audience | Proposed action | Exact English target | Accountable destination owner | Completion condition |
|---|---|---|---|---|---|
| CTA-001 | Public header, desktop/mobile | Get started | `/#choose-role` | Frontend lead | Visible, focusable role chooser; not analytics-only `/signup` |
| CTA-002 | Home / farmer | Explore selling with CropFresh | `/farmers` | Frontend lead | Farmer landing opens with Request a call action |
| CTA-003 | Home / buyer | Explore produce sourcing | `/buyers` | Frontend lead | Buyer landing opens with Request a demo action |
| CTA-004 | Home / delivery partner | Explore delivery opportunities | `/haulers` | Frontend lead | Requirements and interest path are visible |
| CTA-005 | Home / all | Explore the product demo | `/demo` | Frontend lead | Labeled sample-workflow selector opens |
| CTA-006 | Home / all | See how AI works | `/#technology` | Frontend lead | Correct explanatory section receives navigation/focus |
| CTA-007 | Farmer landing / primary | Request a call | `/farmers#callback` | Frontend lead | Mounted, accessible farmer-interest form opens |
| CTA-008 | Farmer landing / secondary | Explore the farmer demo | `/demo/farmers` | Frontend lead | Labeled sample view or explicit demo-persona entry opens |
| CTA-009 | Farmer landing / process | See how it works | `/farmers#how-it-works` | Frontend lead | Farmer process heading is reached |
| CTA-010 | Buyer landing / primary | Request a demo | `/buyers#request-demo` | Frontend lead | Mounted, accessible demo-request form opens |
| CTA-011 | Buyer landing / secondary | View sample produce | `/demo/buyers` | Frontend lead | Sample inventory is clear before any simulated action |
| CTA-012 | Buyer landing / price explanation | Understand the price breakdown | `/buyers#pricing` | Product/finance lead | Approved conditional or explicitly illustrative explanation is reached |
| CTA-013 | Delivery-partner landing / primary | Register your interest | `/haulers#callback` | Frontend lead | Interest form opens; no implied job acceptance |
| CTA-014 | Delivery-partner landing / secondary | See partner requirements | `/haulers#requirements` | Operations lead | Approved requirements or clearly pending program criteria are reached |
| CTA-015 | AI page / primary | Try the demo | `/ai#live-voice` | Engineering lead | Demo inputs, response provenance and manual alternative are visible |
| CTA-016 | AI page / supporting | See the proposed architecture | `/ai#ai-architecture` | Engineering lead | Labeled diagram and readable explanation are reached |
| CTA-017 | AI page / inquiry | Discuss the technology | `/contact?type=partnership#contact-form` | Operations lead | Inquiry form opens with valid partnership preselection |
| CTA-018 | About / partner | Discuss a partnership | `/contact?type=partnership#contact-form` | Operations lead | Same owned partnership request path opens |
| CTA-019 | Farmer accepted state | Review the farmer process | `/farmers#how-it-works` | Frontend lead | Working next step; acknowledgement remains understandable |
| CTA-020 | Buyer accepted state | Explore sample produce | `/demo/buyers` | Frontend lead | Explicit demo path; no account-created claim |
| CTA-021 | Partner accepted state | Review partner requirements | `/haulers#requirements` | Operations lead | Working next step; no employment/load guarantee |
| CTA-022 | Contact accepted state | Explore CropFresh | `/#choose-role` | Frontend lead | Returns to a useful role choice |
| CTA-023 | Contact partner/investor section | Discuss a partnership | `/contact?type=partnership#contact-form` | Operations lead | Initial and client navigation both preselect correctly |
| CTA-024 | Footer / all | Contact the team | `/contact#contact-form` | Operations lead | General inquiry form opens |
| CTA-025 | Footer / price | Understand pricing | `/buyers#pricing` | Product/finance lead | Reaches implemented explanation rather than missing `/pricing` |
| CTA-026 | Demo chooser / farmer | Explore farmer demo | `/demo/farmers` | Frontend lead | Farmer sample path and role state are clear |
| CTA-027 | Demo chooser / buyer | Explore buyer demo | `/demo/buyers` | Frontend lead | Buyer sample path and role state are clear |
| CTA-028 | Demo / persona access | Enter demo | `/demo/login` | Frontend lead | Demo access form opens, with supported role/deep-link context when supplied |
| CTA-029 | Farmer demo / creation | Create a sample listing | `/demo/farmers/new-listing` | Frontend lead | Correct-role creation path opens or asks for demo persona explicitly |
| CTA-030 | Farmer demo / history | View sample listings | `/demo/farmers/listings` | Frontend lead | Coherent sample history opens; replaces inert History button |
| CTA-031 | Demo / all | Return to website | `/` | Frontend lead | Public website opens without changing its role-page meanings |
| CTA-032 | Form/footer / privacy | Privacy notice | `/privacy` | Business/privacy owner | Reviewed policy opens before real data collection |
| CTA-033 | Footer / terms | Website terms | `/terms` | Business/legal owner | Reviewed applicable terms open |

Header/footer logo and ordinary navigation links use the matching RTE-001–009 targets; their accountable owner is the relevant route owner. Desktop/mobile placements must have the same destinations. Blog cards and related links use publication-approved RTE-008 slugs; a context-specific article CTA reuses the appropriate role contract rather than inventing `/join`.

## 2. Conditional actions

These actions become enabled only when their destination exists and the content/release is approved. Until then omit the clickable action; informative availability text may remain where useful.

| ID | Action | Destination contract | Accountable destination owner | Enablement requirement |
|---|---|---|---|---|
| CTA-034 | Cookie policy | `/cookies` | Business/privacy owner | Applicable actual practices and implemented reviewed page |
| CTA-035 | Refund policy | `/refund` | Operations/finance lead | Offered transactional service and approved refund terms |
| CTA-036 | Careers | `/careers` | People/founder owner | Actual reviewed opportunities/process and implemented page |
| CTA-037 | Press kit | `/press` | Content lead | Owned approved media assets and implemented page; use separately labeled `/contact?type=press_media#contact-form` inquiry otherwise |
| CTA-038 | Download farmer app | One approved canonical farmer store URL | Mobile product owner | DEC-007; published release, ownership and target device/country verification |
| CTA-039 | Download buyer app | One approved canonical buyer store URL | Mobile product owner | DEC-007; published release, ownership and target device/country verification |
| CTA-040 | Download delivery-partner app | One approved canonical partner store URL | Mobile product owner | DEC-007; published release, ownership and target device/country verification |

The three store destinations remain pending owner input; existing package IDs are not accepted releases. An APK action needs its own real versioned file, release owner and device requirements before publication. Do not map a generic Download app footer action to whichever page happens to have a download anchor.

## 3. External and submit actions

| Action family | One destination per enabled action | Accountable owner | Required behavior |
|---|---|---|---|
| Email contact | Canonical approved `mailto:` address | Operations lead | Explain purpose; real monitored mailbox; reconcile `.ai`/`.in` values |
| Phone contact | Canonical approved `tel:` number | Operations lead | Consistent displayed number and actual availability |
| Social profile | Approved URL for each distinct profile | Content lead | Owned profile; descriptive accessible label; appropriate new-tab notice |
| Newsletter | Selected subscription provider, not a navigation placeholder | Growth lead | Show only with accepted consent/provider flow; provider acknowledgement controls success |
| Interest/inquiry submit | FRM-001–004 endpoint for that role/type | Backend lead | [Form contract](./FORM_AND_STATE_CONTRACTS.md) defines received/duplicate/failure states |
| Sample offer/listing/AI input | Implemented demo controller/service for that operation | Engineering lead | Visible sample/response-source state; no implied real order or buyer notification |

Record actual named owners and canonical URLs with DEC-004/006/007/008. External actions are conditional until those facts are supplied. The analytics helper call is a side effect; it cannot fulfill navigation or submission.

## 4. Shared interaction requirements

- Use links for route/anchor navigation and buttons for state changes or submission. Valid navigation must survive missing analytics and ordinary modified-link behavior.
- A primary CTA label describes the immediate result: Request a demo is a request, not a booked meeting; View sample produce is not live purchasing.
- Cross-page anchors always include the page path. Same-page fragment links must target a mounted unique ID and account for the fixed header.
- Preserve valid role, language and return context. Use only allowlisted inquiry types/demo destinations; unrelated query parameters must not overwrite user-edited fields.
- Opening/closing role or mobile selectors has labelled state and predictable keyboard focus; returning from a demo preserves a useful marketing path.
- Accepted-state CTAs work without a timer; no `href="#"`, inert create-account action or fabricated reference.
- Record `cta_click` using stable contract ID, surface, role, locale and approved target. Existing `trackCTAClick` can carry the ID as its name. Events must reflect the actual destination; sending an event is not task completion.
- Do not send form values, phone numbers, names, email addresses, free-text messages, audio/transcripts or full input-bearing URLs to analytics. New-lead conversion counts exclude server-detected duplicates and sample interactions.

## 5. Verification tasks

- [ ] Every core action has an implemented route/anchor, one named owner and truthful localized label.
- [ ] Every conditional/external action is approved and enabled, or absent from the clickable UI.
- [ ] Keyboard, touch, modified-click, direct-link and mobile-menu behavior reach the same result.
- [ ] UI, analytics target, route metadata and actual destination agree.
- [ ] Accepted-state and wrong-role recovery paths have working next steps.
- [ ] No primary action depends on an animation, analytics service or delayed DOM mutation.
