# Sitemap, navigation and route contracts

**Status:** Proposed v1; English paths below describe the target architecture.

**Owners:** Product/frontend lead, unassigned.

**Decisions:** IA-001, IA-002, IA-004, IA-005 in the [Phase 2 decision register](./README.md#architecture-decisions).

## 1. Proposed sitemap

```text
Public marketing
/
├── #choose-role
├── #how-it-works
├── #technology
├── /farmers
│   ├── #how-it-works
│   ├── #fees-and-payment
│   ├── #callback
│   └── #faq
├── /buyers
│   ├── #quality
│   ├── #pricing
│   ├── #traceability
│   ├── #request-demo
│   └── #faq
├── /haulers
│   ├── #requirements
│   ├── #earnings
│   ├── #callback
│   └── #faq
├── /ai
│   ├── #live-voice             existing ID; visible label says demo
│   └── #ai-architecture
├── /about
├── /blog
│   └── /blog/[slug]            publication-approved articles only
├── /contact#contact-form
├── /privacy
└── /terms

Conditional public content
/cookies                       actual cookie/analytics practices
/refund                        actual transactional service and policy
/careers                       real vacancies or approved careers content
/press                         approved media assets and contacts
/pricing                       deferred; /buyers#pricing is initial target

Clearly labeled sample workflows
/demo
├── /demo/login
├── /demo/farmers
│   ├── /demo/farmers/listings
│   └── /demo/farmers/new-listing
└── /demo/buyers

Legacy aliases after approved migration
/login                         → /demo/login
/farmers/listings              → /demo/farmers/listings
/farmers/new-listing            → /demo/farmers/new-listing
```

The existing hauler page is informational; there is no implemented hauler dashboard to move. Do not add a hauler workspace, orders/settings screen, app store destination, or testimonial/story destination to navigation just because a link or sample user exists. Farmer stories and app-download sections can be added after evidence/release approval; until then the primary path is the callback form.

## 2. Route register

`Exists` refers to source files, not deployment QA. `Target` describes proposed behavior, not current routing.

| ID | English route | Current source/exposure | Target purpose and publication treatment | Accountable owner role |
|---|---|---|---|---|
| RTE-001 | `/` | Exists: `src/app/page.tsx` | Public role choice and product explanation; add `#choose-role` | Frontend lead |
| RTE-002 | `/farmers` | Exists: demo dashboard | Public farmer landing and callback; adopt MSG-003 | Frontend lead |
| RTE-003 | `/buyers` | Exists: sample marketplace | Public buyer landing and demo request; adopt MSG-004 | Frontend lead |
| RTE-004 | `/haulers` | Exists: marketing/interest form | Public delivery-partner fit, requirements and interest; adopt MSG-005 | Frontend lead |
| RTE-005 | `/ai` | Exists: AI showcase | Public explanation and explicitly labeled demos; adopt MSG-006 | Engineering lead |
| RTE-006 | `/about` | Exists | Public product approach and confirmed identities; adopt MSG-007 | Content lead |
| RTE-007 | `/blog` | Exists | Public approved articles with search/filter and honest empty state | Editorial lead |
| RTE-008 | `/blog/[slug]` | Exists: MDX dynamic route | Only approved, published, non-future articles; enforce the same visibility in metadata/feed/sitemap | Editorial lead |
| RTE-009 | `/contact` | Exists | Inquiry type, verified contact methods and persistent acknowledgement; adopt MSG-008 | Operations lead |
| RTE-010 | `/privacy` | Absent; linked by forms/footer | Required notice describing confirmed form/data practices before real lead collection | Business/privacy owner |
| RTE-011 | `/terms` | Absent; footer link | Reviewed site/demo terms; expand when real transactions are offered | Business/legal owner |
| RTE-012 | `/cookies` | Absent; footer link | Publish applicable reviewed notice if actual providers/practices require it | Business/privacy owner |
| RTE-013 | `/refund` | Absent; footer link | Publish when real order/payment/refund terms exist; otherwise omit this footer action | Operations/finance lead |
| RTE-014 | `/careers` | Absent; footer link | Publish supplied vacancies/process; otherwise omit careers-page link | People/founder owner |
| RTE-015 | `/press` | Absent; footer link | Publish approved press content; otherwise route a correctly labeled media inquiry to contact | Content lead |
| RTE-016 | `/pricing` | Absent; footer link | Initial link uses `/buyers#pricing`; standalone tariff page deferred pending finance inputs | Product/finance lead |
| RTE-017 | `/demo` | Absent | Sample-workflow entry; farmer/buyer choice, demo limits and exit to marketing | Frontend lead |
| RTE-018 | `/demo/login` | Absent; current UI at `/login` | Clearly labeled demo-persona access, not registered-account authentication | Frontend lead |
| RTE-019 | `/demo/farmers` | Absent; current UI at `/farmers` | Relocated sample farmer dashboard; all values/interactions labeled | Frontend lead |
| RTE-020 | `/demo/farmers/listings` | Absent; current UI at `/farmers/listings` | Relocated sample listing history; coherent with local creation state | Frontend lead |
| RTE-021 | `/demo/farmers/new-listing` | Absent; current UI at `/farmers/new-listing` | Relocated sample listing workflow, manual alternative and sample result | Frontend lead |
| RTE-022 | `/demo/buyers` | Absent; current UI at `/buyers` | Relocated sample-produce exploration and simulated offer | Frontend lead |
| RTE-023 | `/login` | Exists | Legacy redirect to RTE-018 after migration; no second sign-in implementation | Frontend lead |
| RTE-024 | `/farmers/listings` | Exists | Legacy redirect to RTE-020 after migration | Frontend lead |
| RTE-025 | `/farmers/new-listing` | Exists | Legacy redirect to RTE-021 after migration; preserve validated sample-input parameters | Frontend lead |

API endpoints and `/blog/feed.xml` are functional endpoints, not primary navigation pages. Keep `/api/leads/{farmer,buyer,hauler,contact}` for coordinated form integration; define production authentication/order/payment services separately in Phase 7. Do not redirect an API request to a marketing page.

## 3. Shared navigation

| Surface | Proposed contents | Behavioral requirement |
|---|---|---|
| Public desktop header | Logo/home, Farmers, Buyers, Delivery partners, AI demo, About, Blog, Contact; language control; Get started | Role-page links always open marketing; demo session does not change their meaning |
| Public mobile header/menu | Same destinations and language choice as desktop | Keyboard-operable menu, labelled open/close, focus restoration, usable at 320px |
| Footer product links | Farmer, buyer, delivery-partner pages; price explanation; Explore product demo | Full page paths with anchors; no current-page `#download` |
| Footer company/policy links | About, blog, contact, privacy, terms; applicable conditional pages | Render only implemented, reviewed destinations |
| Demo header/navigation | Demo badge, role/sample name, implemented workflow links, change demo role, return to website | Mobile equivalent of sidebar; no inert settings/orders/notification/profile controls |
| Article navigation | Back to blog, related approved articles, relevant role action | An article never implies its sample claims are operational evidence |

Use “Delivery partners” in visible navigation while retaining `/haulers` as the stable route. For each shell define one header, one main landmark and one footer where appropriate. Pages currently render their own navbar/footer; migrating to shared layouts must prevent duplicate shells and nested main landmarks.

## 4. Migration contract

1. Confirm IA-001/002; record the accepted public/demo split.
2. Add the demo entry, login, and relocated farmer/buyer routes with the existing workflows preserved as sample experiences.
3. Scope demo persona/sample providers to the demo shell. Refactor the public `Navbar`'s current `useAuth()` dependency in the same change so it can render outside that provider, with an explicit demo-entry link instead of implying a production account. The public page body must render without waiting for demo localStorage hydration. Client preference controls should enhance, rather than gate, public content.
4. Create the public farmer/buyer landing pages using the reusable components after Phase 1 copy review. Mount callback/request-demo targets before enabling their CTA links.
5. Update every dashboard link, voice-listing navigation, auth success destination, role selector, mobile navigation and success-state next step in the same migration. Sources include `AuthContext.tsx`, `DashboardLayout.tsx`, farmer/buyer pages, listing pages and `/login`.
6. Only offer farmer/buyer demo access with an implemented destination. Current hauler demo credentials route to a marketing page; replace that misleading path with an explicit requirements/interest path until a genuine demo is built.
7. Add temporary legacy redirects while the migration is validated; use permanent redirects only after acceptance. `/farmers` and `/buyers` themselves stay public landing routes, rather than redirecting away from marketing.
8. Retain only approved query parameters; test deep-link return paths, reloads, back/forward and any preserved fragment behavior. New-listing commodity/quantity inputs are editable sample prefills, not trusted pricing/availability facts.
9. Update discovery metadata/sitemap to the approved public pages; demo and alias URLs must not inherit the root's current indexable metadata.
10. Run route/link, role-error, mobile, form, and publication-control checks before release. Keep a route-migration rollback that restores a consistent set of links and page meanings.

Route groups such as `(marketing)` and `(demo)` can organize separate Next.js layouts, but group names do not add URL prefixes. A `/demo` segment must actually exist. A future production app's path, server sessions and authorization are Phase 7 contracts; client demo role selection establishes neither identity nor production access control.

## 5. Anchors, language and discovery

- Anchors in the sitemap are implementation contracts. `#technology`, `/ai#live-voice`, `/ai#ai-architecture`, and role form IDs already exist in their components; several proposed role anchors and `#choose-role` still need mounting/creation.
- Each enabled anchor must occur exactly once on its intended rendered page in initial, error and accepted states. Use fixed-header scroll offset and focus a labelled heading; reduced-motion users receive immediate navigation rather than forced smooth scrolling.
- Proposed IA-004: English stays unprefixed, with `/kn` and `/hi` variants for reviewed localized pages. Apply the agreed scheme consistently to marketing, policy and demo journeys; APIs remain unprefixed. Final Next.js/next-intl routing is a Phase 8 implementation decision.
- Preserve the current path, selected role and anchor when changing language. Keep **website locale** separate from **preferred callback language**. Translate critical labels/errors/acknowledgements together.
- A translated article URL should exist only for an actual reviewed translation. Otherwise explicitly label the English article and its language; do not publish duplicate English bodies as translated pages.
- Canonical domain, alternate-language URLs and language metadata require DEC-008/010. Do not assert ownership of the existing `cropfresh.in` value.
- Index reviewed public pages and applicable policies. Exclude demo/login/legacy aliases/API pages from discovery; index control is not an access-control mechanism.
- Include `/ai` in the public sitemap after copy/demo review. Generate article listing/feed/sitemap/metadata from the same publication predicate; draft/future posts must also be rejected at direct article URLs.

## 6. Route acceptance

- [ ] Approved public routes render the specified purpose with coherent titles and navigation.
- [ ] Public role pages are independent of demo-session hydration.
- [ ] Every enabled anchor/CTA resolves on desktop and mobile, including direct loads.
- [ ] Demo login, correct/wrong-role states, deep links, sign-out and reloads remain inside the agreed experience.
- [ ] Legacy aliases preserve only the agreed inputs and have no redirect loops.
- [ ] Unimplemented conditional pages and demo controls are absent from enabled navigation.
- [ ] Public sitemap, canonical/locale metadata and direct article visibility agree with publication state.
