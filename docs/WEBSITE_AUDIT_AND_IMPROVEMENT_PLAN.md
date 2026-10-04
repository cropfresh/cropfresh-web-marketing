# CropFresh — measured website audit and improvement plan

**Audit date:** 2026-10-04\
**Project:** `cropfresh-web-marketing`\
**Confirmed production domain:** `https://cropfresh.in`\
**Measured deployment:** local production build of the current working tree, based on `a9f6b63` plus uncommitted changes\
**Implementation status:** pre-Phase-0 baseline captured; subsequent local stabilization is verified, with remote sign-off pending\
**Roadmap:** [development phase plan](../WEBSITE_DEVELOPMENT_PHASE_PLAN.md)

> **Subsequent development:** The [Phase 0 verification record](./phase-0/README.md) documents the successful fresh install, 15 tests, zero production dependency vulnerabilities, withdrawn credential/mock API paths, and current homepage regression measurements. The tables below preserve the earlier baseline; use the follow-up for current engineering status. Full Phase 0 exit is pending a verified published-checkout GitHub run/branch protection.

## 1. Executive findings

The agriculture-first homepage is readable, responsive, and performs well on desktop. Its first screen states **“CropFresh is a farm-to-business agritech platform.”** Local typecheck, lint, tests, and strict production build pass.

Release readiness is held back by public sample marketplaces, unfinished content, dependency vulnerabilities, an incompatible clean install, secondary-page accessibility problems, missing SEO assets/canonicals, and leads without demonstrated durable delivery.

### Immediate release blockers

1. **Public demos and invented transactions remain exposed.** `/farmers`, `/buyers`, `/login`, `/ai`, farmer subroutes, and mock authentication/listing/order APIs require removal or replacement with verified production functionality. Homepage demo/planned previews also conflict with the current publication requirement. A label or `noindex` alone does not satisfy that requirement.
2. **Production dependencies have 1 critical and 7 high findings.** The all-dependency audit reports 54 affected packages. Next.js is critical; its AVIF image-optimization advisory is relevant to the configured image formats.
3. **A clean install fails.** `npm ci --dry-run --ignore-scripts` returns `ERESOLVE`: `next-intl@3.26.5` supports Next through 15, while the installed application uses Next `16.1.1`. Successful checks against existing `node_modules` do not establish a reproducible checkout or passing remote CI.
4. **The public mock-auth endpoint has a hardcoded signing-key fallback.** It accepts an unverified supplied role and phone, then issues a 30-day JWT/cookie. Source evidence establishes the unsafe implementation; access to a real protected backend was not demonstrated.
5. **14 of 16 sampled routes have axe findings.** There are 37 route/rule instances affecting 153 reported nodes, including critical unnamed buttons/selects and unlabeled inputs. These counts include axe best-practice rules and can overlap on an element.
6. **Contact collection is not operationally verified.** Lead APIs write local JSON files, use per-process rate limiting, and lack demonstrated CRM/notification delivery. Privacy and terms routes return 404; public contact facts and response promises need owner confirmation.
7. **Live deployment remains unverified.** Fetching the confirmed domain returned `ENOTFOUND` in this environment. DNS, TLS, CDN, production headers, deployed forms, and monitoring require verification from an environment with access.

### Publication rule

Publish complete, supported content and working actions. Remove or hide unfinished sections, public simulations, unsupported claims, sample prices, fabricated endorsements, unverified company/contact facts, and nonfunctional store links. Missing-information TODOs belong in this report and the decision registers. Public dashboards/authentication are future product scope unless real functionality is explicitly approved and proven.

## 2. Scope, method, and score interpretation

- **Runtime:** Node `24.21.0`, Next.js `16.1.1`, React `19.2.0`; local `next start` after a production build.
- **Tools:** Lighthouse `13.5.0`, Chrome `154.0.8037.57`, axe-core `4.13.0`, Puppeteer `25.12.0`, Knip `6.39.0`.
- **Lighthouse:** three homepage mobile runs using default simulated mobile throttling; one homepage desktop run using the desktop configuration; one mobile run for each of seven other routes. Homepage mobile values are medians, not a selected best run. `/ai` has a timeout warning and its result is provisional.
- **Browser crawl:** 16 routes at 1440×1000 after scrolling to activate below-fold content: eight main public pages, `/login`, two farmer subroutes, and all five published blog articles. Checked rendered metadata, headings, links, images, schema, console errors, and axe WCAG 2/2.1/2.2 AA plus best-practice rules.
- **Responsive checks:** Firefox at 1440×1000, 768×1000, 390×844, and 320×740, including homepage menu/Escape/focus return, role anchor, FAQ, image loading, and overflow assertions.
- **HTTP/source checks:** local route/asset/header responses, invalid contact requests, mock APIs, storage, analytics, deployment configuration, clean-install resolution, dependency audit, and dead-code candidates. No real lead was submitted during this audit.

**Baseline scores below count verified release-readiness gates:** each category has ten equally weighted checks listed in Section 8. Pass earns one point; fail or blocked earns zero verified points. Blocked denotes missing access/evidence, not a demonstrated implementation defect. These are transparent checklist counts; official Lighthouse scores remain separately reported out of 100. A critical defect blocks release regardless of the count. No overall weighted quality score, predicted improvement score, field INP result, or search-ranking outcome is claimed.

The historical 5.6/10 assessment and 8.5+/10 target have been retired as current baselines. Trust readiness of 0/10 reflects pending owner evidence and failed operational checks; it is not a finding about the legal legitimacy of the business.

## 3. Category audit table

Effort is a planning estimate: **Low** is a focused change; **Med** spans several related changes; **High** requires a multi-part implementation or owner/provider dependency.

| Category | Baseline score | Issues found | Evidence | Fix | Priority (High/Med/Low) | Effort |
|---|---:|---|---|---|---|---|
| UI/UX and design | **4/10** verified gates | Farmer/buyer CTAs enter demos; unfinished actions; agriculture theme is not consistent on secondary pages; language choice does not translate core copy | Firefox first-screen/overflow checks pass; E-03/E-04/E-11; one research gate blocked | Replace role demos with approved lead-first landing journeys; align public pages with agriculture tokens; expose only working language choices | High | High |
| Performance | **5/10** verified gates | Mobile homepage LCP 4.062s; initial JS/CSS exceed proposed budgets; field INP unavailable | E-01: mobile performance 87, desktop 100; E-10 network sizes; one field gate blocked | Improve actual LCP image priority/size; inspect unused JS and provider imports; reduce CSS/client work; measure with the same profile | High | Med |
| Technical SEO | **4/10** verified gates | 0/16 canonicals; broken destinations; indexable demos; sitemap/robots mismatches; live verification blocked | E-03/E-04; robots/sitemap 200; `/home` 308 and unknown URL 404 | Publication-aware sitemap, stable dates, exact canonicals, correct crawler groups; allow rendering assets; verify live crawl | High | Med |
| On-page SEO | **2/10** verified gates | Duplicate title/description groups; 11/16 initial HTML pages have one H1; heading-order issues; failing share/schema assets | E-04: two duplicate groups each; 15/16 hydrated pages have one H1; E-03 image failures | Unique factual metadata, server-rendered H1s, logical headings, real OG/Twitter assets, verified Article/Organization/WebSite data where appropriate | High | Med |
| Content quality / E-E-A-T | **1/10** verified gates | Incomplete published MDX; unverified authors, launch/coverage/results and testimonials; public demo/planned copy; absent policies | E-12; five owner-evidence gates blocked; `/privacy` and `/terms` 404 | Unpublish unsupported articles/sections; retain only approved useful copy; complete About/contact/policies using actual business facts | High | High |
| Accessibility | **2/10** verified gates | 14/16 routes affected; button/select names, labels, contrast, heading and landmark problems | E-02; homepage/About each have zero detected violations; one manual acceptance gate blocked | Fix retained-page controls/contrast/landmarks; then keyboard, screen reader, 200% zoom and reduced-motion QA | High | Med |
| Security and best practices | **4/10** verified gates | Critical/high production dependencies; public mock JWT/default signing key; malformed JSON gives 500; local CSP/framing protection absent | E-05/E-07/E-08; unauthenticated lead GETs 401; nosniff/referrer headers present; live TLS blocked | Coordinated dependency upgrade; remove mock auth/APIs; safe parse/validation and durable abuse controls; tested header policy | High | High |
| Code quality | **4/10** verified gates | Clean-install conflict; unused/dead-code candidates; tracked debug logs; dirty unreleased tree; custom recovery screens absent | E-06/E-09; Knip: 7 files, 91 exports, 3 dependencies, 3 devDependencies; four quality commands pass | Resolve peers and regenerate lockfile; review reachability before cleanup; reconcile hosting build; make scoped verified commits | High | Med |
| Trust and legitimacy | **0/10** verified gates | Owner identity/coverage/contacts/provenance unconfirmed; public mock transactions; missing policies; delivery not demonstrated | E-08/E-12; six owner-evidence gates blocked | Supply business facts privately; publish approved contact/policy content; remove unsupported proof and simulations; prove lead receipt | High | High |
| Analytics and monitoring | **1/10** verified gates | No demonstrated GA bootstrap/conversions, field Web Vitals, external error tracking, or lead-failure alert; owner consoles unavailable | E-10; `window.gtag` undefined on 16/16 pages; source helpers avoid contact PII; three owner gates blocked | Approved analytics/consent setup, real funnel events, CWV/error/uptime monitoring and verified alerts | Med | High |

## 4. Measured baseline and evidence

### E-01 — Lighthouse

| Route / profile | Runs | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` mobile median | 3 | **87** (87/87/90) | 100 | 96 | 100 | **4,061.75ms** | 53.00ms | 0 |
| `/` desktop | 1 | **100** | 100 | 96 | 100 | 796.85ms | 0ms | 0 |
| `/haulers` mobile | 1 | 76 | 92 | 96 | 100 | 5,288.32ms | 214.69ms | 0 |
| `/contact` mobile | 1 | 83 | 91 | 96 | 100 | 4,590.58ms | 102.94ms | 0 |
| `/about` mobile | 1 | 86 | 100 | 96 | 100 | 4,074.88ms | 121.63ms | 0 |
| `/ai` mobile, provisional | 1 | 83 | 84 | 96 | 100 | 4,445.85ms | 150.00ms | 0 |
| `/blog` mobile | 1 | 83 | 96 | 96 | 100 | 4,528.69ms | 139.00ms | 0 |
| `/farmers` mobile | 1 | 79 | 89 | 96 | 100 | 5,262.97ms | 128.00ms | 0 |
| `/buyers` mobile | 1 | 88 | 84 | 96 | 100 | 3,971.66ms | 52.50ms | 0 |

Homepage mobile median FCP: **1,206.08ms**. `/ai` warning: “The page loaded too slowly to finish within the time limit. Results may be incomplete.” Lighthouse SEO 100 covers its limited checks; missing canonicals and unsupported content remain independently evidenced.

The LCP element is the illustrated farmer hero image. Lighthouse reports missing high fetch priority, approximately **92KiB image-delivery savings**, **142KiB unused-JS savings**, and **440ms render-blocking savings**. These are diagnostic estimates, not measured gains. Missing `/site.webmanifest` produces homepage console errors and contributes to best-practices failures.

Targets proposed for approval: median mobile performance ≥95, mobile lab LCP <2.5s, CLS ≤0.1; initial JS transfer ≤200KiB and CSS ≤30KiB under the same measurement method. Field p75 LCP/CLS/INP acceptance requires real traffic/CrUX or RUM. TBT cannot establish INP compliance.

### E-02 — Accessibility

| Route/group | Detected axe rule failures | Main findings |
|---|---:|---|
| `/`, `/about` | 0 each | No automated violations detected in sampled states |
| `/ai` | 4 | Button name, select name, contrast, heading order |
| `/blog` | 1 | Contrast |
| `/buyers` | 3 | Button name, contrast, heading order |
| `/contact` | 2 | Select name, contrast |
| `/farmers` | 2 | Button name, contrast |
| `/haulers` | 2 | Select name, contrast |
| `/login` | 5 | Button name, contrast, missing main/H1, content outside landmarks |
| `/farmers/listings` | 3 | Button name, contrast, heading order |
| `/farmers/new-listing` | 3 | Button name, input label, select name |
| Five article routes | 2–3 each | Missing main/content landmarks; contrast on AI/pricing articles |

Zero automated violations does not certify full WCAG conformance. Screen-reader, 200% zoom, all validation states, and broader cross-browser acceptance remain open. First remove out-of-scope demos, then retest all retained pages.

### E-03 — Links and assets

- **Four unique linked destinations return 404:** `/buyers/orders`, `/buyers/settings`, `/farmers/settings`, `/privacy`.
- **Two placeholder actions:** Google Play and APK links on `/haulers`, both `href="#"`.
- **21 tested asset URLs fail:** 12 return 404 and nine Next image-optimization URLs return 400. Raw and optimized variants may refer to the same absent file; this is not a count of 21 unique source images.
- Missing metadata/icon files: `/og-image.png`, `/site.webmanifest`, `/favicon-16x16.png`, `/apple-touch-icon.png`, `/images/buyers-og.png`, `/images/farmers-og.png`.
- Missing article/author imagery under `/blog/covers/` and `/blog/authors/`; `/logo.png` in Article publisher schema is absent; hauler Play Store artwork fails.
- `/terms` also returns 404 when checked directly. `/does-not-exist` correctly returns 404; `/home` returns 308 to `/`. Existing favicon availability must be preserved while fixing the missing icon variants.

### E-04 — Metadata, crawl controls, and content rendering

- Canonicals: **0/16** rendered routes.
- Duplicate title and description groups: homepage/login; farmer landing/listings/new-listing.
- One H1: **11/16** initial server HTML; **15/16** hydrated pages. Login has no H1; the four sampled farmer/buyer dashboard routes expose headings after browser state loads.
- All 16 sampled routes emit `index, follow`, including mock workflows. The sitemap currently lists public farmer/buyer URLs that host demos and omits `/ai`.
- `robots.txt` returns 200 but blocks `/_next/` in its generic group. Googlebot/Bingbot have their own `Allow: /` groups and do not inherit generic disallows. Align groups and keep required rendering assets crawlable; crawler rules are not access control.
- Sitemap generation uses current timestamps for static pages. Use meaningful stable content modification dates and a publication-aware approved route list.
- Article JSON-LD exists on five posts but includes unapproved author/product facts and broken images/logo. Do not add fabricated organization contacts, ratings, locations, inventory, or product offers to schema.

Sources: `src/app/layout.tsx`, `src/app/sitemap.ts`, `public/robots.txt`, role layouts, `src/app/blog/[slug]/layout.tsx`, `src/app/blog/[slug]/page.tsx`.

### E-05 — Dependency security

| Audit scope | Critical | High | Moderate | Low | Total affected packages |
|---|---:|---:|---:|---:|---:|
| `npm audit --json` | 1 | 45 | 6 | 2 | **54** |
| `npm audit --json --omit=dev` | 1 | 7 | 4 | 0 | **12** |

Counts are package-level npm findings, not distinct exploit counts or proof of exploitation. Direct production findings include Next.js (critical), axios/js-cookie (high), and next-intl (moderate). The report includes [Next.js AVIF image-optimization RCE advisory GHSA-2xp9-vwfh-vxw4](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4); `next.config.ts` enables AVIF. Review advisory applicability and patched compatible versions before changing dependencies. Preserve build/locale behavior and rerun both audits after the coordinated upgrade; avoid a blind forced upgrade.

### E-06 — Reproducibility and code inventory

- Passed in the installed working tree: `npm run typecheck`, `npm run lint`, `npm test -- --runInBand` (**3 suites, 5 tests**), `npm run build` with validation enabled.
- Lint has zero ESLint errors/warnings; the browser-baseline dataset freshness notice is a tooling notice.
- Failed: `npm ci --dry-run --ignore-scripts` with the Next/next-intl peer conflict described above. CI uses plain `npm ci`; Amplify uses `--legacy-peer-deps`. Remote CI has not been validated.
- Knip candidates: **7 files, 91 exports, 4 types, 3 runtime dependencies, 3 devDependencies, 3 unlisted imports, 1 duplicate export, 1 missing executable** (`prettier` referenced by the format script).
- File candidates include `src/lib/metadata.ts`, `src/utils/logger.ts`, `src/components/ui/tabs.tsx`, `ProduceCard.tsx`, and three design-prototype files. Documentation prototypes and exports require usage review; scanner output is not permission to delete them.
- The Phase 3 README referenced absent research-plan/findings documents. Its handoff now identifies those gaps and the superseded public-demo direction; research preparation and participant validation remain open.
- Tracked artifacts include `amplify_build_2.log` and `eslint_errors.txt`. Audit their contents before any removal. Existing application/doc changes are uncommitted; review ownership and stage only the intended files for each approved commit.

### E-07 — Public mock endpoints

`src/app/api/auth/demo-login/route.ts:4–37` contains the signing-key fallback, supplied-role payload, and 30-day signing behavior. `src/contexts/AuthContext.tsx` and `ShowcaseContext.tsx` provide browser-local users/listings/orders. `src/app/api/listings/route.ts` and `src/app/api/orders/route.ts` expose seeded in-memory data and writes without production authorization; listing creation can generate a random price and accept spread input fields. Remove these public mock paths for the marketing launch. Preserve private research assets only where they are excluded from deployed routes. Real authorization is a separate explicitly approved product integration.

### E-08 — Leads and privacy

- Unauthenticated GET requests to all four `/api/leads/*` routes return **401** locally in production mode.
- Contact POST `{}` returns **400**; malformed JSON `{` returns **500**. Reject malformed JSON as a client error and avoid exposing internals.
- Source storage is local JSON with read-modify-write behavior; concurrency, ephemeral-host persistence, receipt, retry, retention, access controls, and notification delivery are not established.
- Per-process maps are not a distributed limiter. The deployment must establish trusted proxy/IP handling and abuse controls.
- Contact API logs the submitter name and promises a response within 24 hours. Remove unnecessary personal-data logs and use only an operations-approved response commitment.
- No valid lead submission/delivery/backup test was performed. That acceptance test requires a staging destination, owner, and approved retention/privacy practices.

Source: `src/app/api/leads/contact/route.ts` and sibling lead routes. Existing contact details in `ContactInfo.tsx` are unverified; do not copy them into new public content or schema as facts.

### E-09 — Hosting and headers

`Dockerfile` runs `npm ci`, expects `/app/.next/standalone` without configured standalone output, omits explicit `/app` workdirs in the independent builder/runner stages, and does not copy `.next/static`. Container deployment needs reconciliation or retirement if the approved host uses another build path. A container build/deploy was not executed.

Local responses include gzip, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: origin-when-cross-origin`; static chunks/styles use one-year immutable caching. No local CSP/framing policy was observed. Test a deployment-compatible CSP and framing policy against actual integrations. Verify HTTPS/HSTS at the confirmed host before claiming protection. Live request failure from this environment is not proof of a global outage.

### E-10 — Bundle, analytics, and monitoring

- Homepage Lighthouse initial network: **15 JS requests, 302,165 transferred bytes** (~295.1KiB), **1,045,324 resource bytes**; **2 CSS requests, 36,767 transferred bytes** (~35.9KiB), **258,298 resource bytes**. Transfer figures include response overhead.
- After-scroll DOM-linked JS: **30 files, 1,656,625 raw bytes, 484,022 estimated gzip bytes**. CSS: **258,298 raw bytes, 35,770 estimated gzip bytes**. This includes discovered/prefetched chunks and differs from initial network transfer.
- `window.gtag` is undefined on all 16 sampled routes. `src/lib/analytics.ts` defines helpers but no mounted analytics bootstrap was found. Production environment/provider consoles may add behavior that was not accessible here.
- Current helper payloads do not include name/phone/email fields; continue enforcing this at call sites and in downstream tooling.
- No application field-Web-Vitals collector, integrated external error reporter, release-aware monitoring, or verified lead-delivery alerts were found. Hosting-side uptime configuration and Search Console require owner access.

### E-11 — Design and interaction evidence

The [agriculture theme record](./AGRITECH_THEME.md) documents the cream/sage/forest/harvest palette, farm/produce artwork, stable first-screen message, role choice, native FAQ, and fresh Firefox checks. Each tested initial viewport has one H1 and the definition/action visible; no horizontal/nav overflow was detected. Nine homepage-linked route destinations return 200. These checks establish local rendering and selected interactions, not user comprehension or completed real farmer/buyer conversions.

### E-12 — Editorial and owner evidence

Use the [claims register](./phase-1/CLAIMS_REGISTER.md), [content inventory](./phase-1/CONTENT_INVENTORY.md), and [feature status](./phase-1/FEATURE_STATUS.md). They document unsupported adoption/coverage/payment/results claims and missing publication proof. Five posts are currently public; some contain incomplete copy, unapproved named authors, an official-launch assertion, or customer-outcome claims. Business evidence has not been supplied for accepting those facts. Unpublish unsupported material while preserving its private review record.

### Session evidence artifacts

Raw files are saved under `/tmp/omnirush/cropfresh-audit-results/`: `summary.json`, `brief.json`, `readiness.json`, `lh-*.json`, `page-*.json`, `npm-audit-all.json`, `npm-audit-prod.json`, `knip.json`. These are temporary session artifacts; the baseline tables and findings above are the durable report. Audit tooling was installed outside the application. Capture fresh raw reports with each implementation/release verification.

## 5. Prioritized execution plan

This order replaces earlier proposals to publish labeled demos. Estimates depend on approved route scope and supplied business/provider details. Announce each intended change and its purpose; verify the resulting change; keep implementation commits small and scoped.

| Stage | Work | Acceptance evidence | Approval / dependency |
|---|---|---|---|
| **Quick wins — Q1** | Remove unfinished links/downloads and unsupported publication surfaces; prevent direct access to public mock auth/listing/order endpoints; stop publishing demo/planned homepage previews | Crawl shows no placeholders; excluded mock paths return intentional 404/410; no fake transactions/prices in public rendering; related UI continues to work | Agree retained-page/CTA behavior before removing an audience entry point; no-public-demo requirement already supplied |
| **Quick wins — Q2** | Coordinate patched compatible Next/next-intl/axios dependencies; review/removal of genuinely unused vulnerable packages; regenerate lockfile; align install/build commands | Clean install without peer bypass; typecheck/lint/tests/build pass; new all/production dependency audit; no critical/high production finding | Approve dependency migration; implementation version selection requires compatibility review |
| **Quick wins — Q3** | Repair or remove missing icon/manifest/share references; add truthful unique metadata/canonicals; correct robots/sitemap publication rules; fix retained-page label/button/landmark/contrast defects; malformed JSON handling and PII logs | Retained-page link/asset statuses; exact metadata/schema checks; axe and keyboard checks; API rejection/status checks | Only use confirmed facts/assets; no fabricated author/contact data |
| **Core fixes — C1** | Replace farmer/buyer demos with agriculture-first public role landing pages and a clear real inquiry journey; harmonize About/contact/hauler and retained blog content | Approved task flow; viewport/keyboard/screen-reader/form tests; no public unfinished blocks; role-specific end-to-end receipt | Approve route/CTA design; supply real availability/contacts/claims and reviewed policies |
| **Core fixes — C2** | Connect inquiries to durable storage/CRM and monitored delivery; implement trusted-proxy rate limits, validation, retries, privacy/retention, feedback, and alerting; reconcile actual host/container pipeline | Staging synthetic lead received by its owner; retry/failure/unauthorized tests; persistence/restore checks; deploy smoke and rollback evidence | Hosting/provider credentials through secret storage; owner chooses operational destination and response promise |
| **Core fixes — C3** | Optimize measured mobile LCP/client payload; implement approved analytics/consent and error/uptime/lead monitoring; complete applicable structured data | Three comparable mobile runs + desktop; transfer budgets; no critical accessibility regressions; real analytics/alert signals without PII | Approve proposed budgets and telemetry/provider setup |
| **Advanced — A1** | Complete Kannada/Hindi URL/content journeys with native review; expand evidence-backed crop/region content; Search Console monitoring and eligible local-business setup | Native-language and hreflang/layout tests; useful unique pages; real crawl/query/conversion data | Reviewer access, confirmed service areas, Search Console ownership and Business Profile eligibility |
| **Advanced — A2** | Research-led conversion experiments and field CWV improvement; optionally integrate authenticated product functionality | Real task/conversion/field results; server-side authorization and real data if product scope is approved | Adequate real traffic; explicit approval for product expansion |

Owner-dependent operational blockers must be resolved before launch even when their engineering tasks span stages. A marketing launch does not require simulated dashboards or an unapproved transactional marketplace.

### Search-intent map for approved pages

Google autocomplete was queried with English/India settings for farmer-direct produce sourcing and selling farm produce online. It provides discovery suggestions, not search volumes, competition, rankings, or proof that CropFresh currently supplies a region.

| Intended page | Search intent to validate | Content needed before publication |
|---|---|---|
| `/` | CropFresh; farm-to-business agritech | Clear category, audience choice, actual service direction |
| `/farmers` | Sell farm produce online; connect farmers to buyers | Real supported crops/areas, process, approved fee/payment conditions, working inquiry |
| `/buyers` | Buy vegetables directly from farmers; fresh produce sourcing for businesses | Actual procurement/quality/delivery process and monitored business inquiry |
| `/haulers` | Farm produce transport / delivery partnership | Actual operating lanes, eligibility, payout conditions, inquiry |
| Retained resources | Tomato grading, seasonal produce questions | Complete expert-reviewed advice with reputable dated sources and approved authors |
| Conditional regional pages | Farmer-direct/B2B produce in a verified service area | Distinct useful local information and demonstrated operating coverage; avoid duplicate doorway pages |

Do not promise a search position. Create a Google Business Profile only if CropFresh meets Google's customer-facing physical-location or genuine service-area eligibility and the owner supplies verifiable information.

## 6. Business-owner TODOs

Keep sensitive records, contacts, credentials, and customer evidence in approved private storage; this report needs an approval reference and date, not secrets or private customer data.

| Owner task | Required input / acceptance | Blocks |
|---|---|---|
| Business identity | Approved trading/legal name, applicable registration disclosure, About/team identities | Trust copy, legal pages, organization schema |
| Operations coverage | Real crops, areas, delivery lanes, availability, eligibility; dates/conditions | Role pages, location SEO, service claims |
| Commercial conditions | Actual fees, prices/payout basis, settlement timing/exceptions, delivery terms | Payment/earnings/pricing copy |
| Support | Monitored email/phone if used, hours, named receiving team, feasible response commitment | Contact publication and conversion completion |
| Privacy/legal | Approved policies reflecting collected fields, purposes, processors, retention, rights/support process | Public data collection and analytics configuration |
| Claims and media | Evidence for each retained metric; testimonial consent; author/team/media provenance | Articles, proof blocks, images, E-E-A-T |
| Hosting/integrations | Confirm host/build/runtime, durable lead destination, environment/secret configuration, deployment/rollback access | Clean deployment, forms, TLS/security and monitoring |
| Analytics/search | Approved measurement ID/consent approach, Search Console verification, alert receivers | Funnel validation, indexing and field measurement |
| Languages/research | Native reviewers and actual support-language capability; representative test participants | Translated journeys and usability acceptance |
| Releases | Owned working app-store URLs and proven product functions, only if retained in launch scope | Download/product/auth actions |

## 7. Verification and before/after record

At baseline capture, application code had not changed in the audit rerun and no post-fix measurement existed. Subsequent actual Phase 0 before/after and regression results are recorded in the [verification handoff](./phase-0/README.md#4-beforeafter-evidence). The table below retains the audit baseline and acceptance requirements.

| Check | Current measured baseline | Required after approved fixes |
|---|---|---|
| Installed-tree quality | Typecheck/lint/build pass; 3 suites / 5 tests pass | Same commands green; meaningful regression coverage for changed journeys/API behavior |
| Reproducible install | Dry-run `npm ci` fails with `ERESOLVE` | Actual clean install on approved runtime; CI succeeds without peer bypass |
| Mobile homepage | Median performance 87; LCP 4,061.75ms; TBT 53ms; CLS 0 | Three comparable runs; evaluate approved budgets and route coverage |
| Desktop homepage | Performance 100; LCP 796.85ms; CLS 0 | Comparable run; no regression |
| Accessibility | 14/16 affected routes; 37 rule instances; 153 nodes | Zero critical/serious violations on retained routes; resolved other findings; manual acceptance |
| Internal links/actions | Four 404 destinations; two placeholder actions | Zero unexpected broken/placeholder actions on retained pages |
| Assets | 21 failing tested URLs | All retained referenced assets resolve; no network/manifest console errors |
| Canonicals | 0/16 | Correct absolute canonical for every indexable retained page |
| Production dependency audit | 1 critical, 7 high, 4 moderate | No critical/high findings; documented review of remaining findings |
| Leads | Invalid body 400; malformed JSON 500; unauthenticated GETs 401; no delivery evidence | Safe malformed-body rejection, durable receipt/retry/authorization/alert tests |
| Public mock paths | Mock UI/APIs present | Removed from deployment or replaced with explicitly approved proven production functionality |
| Live deployment | Domain request fails from this environment | DNS/TLS/headers/assets/crawl/forms/alerts and rollback verified at `https://cropfresh.in` |

For each implementation change: state what and why, apply a scoped change, run relevant checks, inspect the diff, then record actual results. Build/lint/tests and Lighthouse comparisons are required for application/release changes; documentation changes use link/content/whitespace validation. Attach results to small commits only after intended files and pre-existing changes are reviewed.

## 8. Readiness check ledger

**P = verified pass; F = observed failed gate; B = blocked/unverified.** Each named item counts once within its category. Budgets and owner acceptance gates are explicit proposed release criteria. Do not compare these readiness counts to the historical subjective score.

| Category | Passed gates (one point each) | Failed gates | Blocked gates |
|---|---|---|---|
| UI/UX — 4P/5F/1B | First-screen definition; first-screen primary action; four-width homepage fit; role/menu/Escape behavior | Real farmer journey; real buyer journey; finished public controls; consistent agriculture system; complete critical-language journeys | Representative five-second/task validation |
| Performance — 5P/4F/1B | Desktop performance ≥95; lab CLS ≤0.1; responsive optimized hero; lazy below-fold images; gzip/immutable local chunks | Mobile performance ≥95; mobile lab LCP <2.5s; initial JS ≤200KiB; initial CSS ≤30KiB | Field p75 INP <200ms |
| Technical SEO — 4P/5F/1B | Robots 200; sitemap 200; unknown route 404; `/home` redirect | Working internal destinations; complete canonicals; publication-aware sitemap; exclude nonproduction indexing; correct named crawler groups | Live DNS/TLS/crawl verification |
| On-page SEO — 2P/8F/0B | Image alt attributes present; descriptions present | Unique titles; unique descriptions; one server H1 per route; heading hierarchy; OG assets; Twitter assets; accurate schema/facts/assets; real conversion links | None |
| Content — 1P/4F/5B | Plain homepage product-direction definition | No unfinished/demo/planned publication; complete sourced articles; privacy page; terms page | Accepted numerical evidence; endorsement provenance; author/team identities; About facts; monitored contact facts |
| Accessibility — 2P/7F/1B | Homepage keyboard/menu/focus; static hero/reduced motion | Zero overall axe findings; zero critical/serious findings; sitewide contrast; form labels; button names; heading structure; content landmarks | Screen-reader and 200% zoom acceptance |
| Security — 4P/5F/1B | Unauthenticated lead reads rejected; invalid contact schema rejected; nosniff header; referrer policy | No critical production package; no high production package; no mock/default-key auth; malformed JSON as client error; CSP/framing policy | Live HTTPS/HSTS verification |
| Code — 4P/6F/0B | Typecheck; lint; existing meaningful tests; strict production build | Clean install; unused-dependency/file review; duplicate/dead surfaces resolved; tracked debug logs reviewed/removed; reviewable committed release tree; custom recovery UI | None |
| Trust — 0P/4F/6B | None | No public mock transactions; privacy route works; terms route works; durable monitored lead destination | Business identity; address/coverage; monitored contacts; approved hours/response promise; retained media/testimonial rights; actual app/commercial availability |
| Analytics — 1P/6F/3B | Existing helper definitions omit contact PII fields | Working analytics bootstrap; real conversion completion measured; field CWV collector; external error integration; lead-failure alert; release/environment monitoring | Search Console ownership; privacy/consent approval; uptime alert verified |

## 9. Approval checkpoint

**Recommended next approval:** proceed with Quick wins Q1–Q3 in small reviewed changes, including a compatible dependency migration and withdrawal of public mock surfaces. Before the larger Core C1 route replacement, approve the retained-page/CTA design and provide the owner facts needed for truthful role and contact pages. Select the durable lead/hosting/telemetry integrations before C2–C3.

The no-public-demo/no-placeholder requirement is already controlling. The implementation choice still needing agreement is the replacement journey and publication scope. Until a complete destination is ready, remove its action/section rather than creating a fake completion or public TODO.
