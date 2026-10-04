# CropFresh Website Audit & Complete Improvement Plan

> **Historical review, superseded on 2026-10-04.** Use the [current measured audit](../WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md) and [current development plan](../../WEBSITE_DEVELOPMENT_PHASE_PLAN.md). The scores below are historical manual assessments. The type/lint/build findings and public-demo recommendations no longer describe the current requirements or measured working tree.

**Audit date:** 2026-10-03\
**Project:** `cropfresh-web-marketing`\
**Framework:** Next.js 16.1.1, React 19, TypeScript, Tailwind CSS, Framer Motion\
**Current score:** **5.6 / 10**\
**Recommended target after implementation:** **8.5 / 10**

> This audit is based on the repository implementation, routes, content, assets, metadata, and available build checks. It is a product and production-readiness review rather than a measured Lighthouse report or user-research study. Real conversion, Core Web Vitals, accessibility, and broken-link scores should be measured again on the deployed domain after the fixes below.

---

## 1. Executive summary

CropFresh has a strong product idea and a visually distinctive agritech identity. The website communicates a three-sided marketplace for farmers, buyers, and haulers, and it contains more product depth than a typical marketing landing page: audience-specific pages, AI demonstrations, dashboards, lead forms, testimonials, a blog, app concepts, and multilingual form content.

The current experience is held back by an important gap between **presentation quality** and **functional trust**:

- Several high-value CTAs do not complete an action or navigate to a real destination.
- The production build is configured to ignore TypeScript and ESLint failures.
- The project currently has TypeScript errors, 23 ESLint errors, and 54 ESLint warnings.
- SEO metadata points to image and icon files that are not present in `public/`.
- Footer links point to routes that do not exist.
- The language selector changes the document language and local storage value, but the main site content is not connected to the translation files.
- Many performance and accessibility decisions are individually reasonable but become expensive when combined across the many client-side animated sections.
- Several numerical, AI, marketplace, payment, and “first in India” claims need proof, source notes, or clearer “pilot/demo” labels.

### Overall recommendation

Keep the visual direction, but shift the next phase from adding more effects and sections to making the current experience reliable, provable, accessible, and conversion-focused. Fix the P0 blockers before adding new marketing features.

---

## 2. Scorecard out of 10

| Area | Weight | Score | Weighted result | Assessment |
|---|---:|---:|---:|---|
| Brand and visual design | 15% | **7.5** | 11.25 | Memorable green/orange agritech palette, strong hero, polished cards and motion. The dark glassmorphism treatment is sometimes overused and the visual system is not fully consistent. |
| UX and information architecture | 15% | **6.0** | 9.00 | Good audience segmentation and page coverage. Primary navigation is understandable, but some routes, anchors, and actions are incomplete or misleading. |
| Content and positioning | 10% | **6.5** | 6.50 | The farmer/buyer/hauler value propositions are clear. Messaging is repetitive, jargon-heavy in places, and not always supported by evidence. |
| Conversion readiness | 15% | **4.5** | 6.75 | Lead forms are a strong foundation, but major buttons use placeholder destinations, newsletter signup is not connected, and CTAs are not consistently mapped to a funnel. |
| Accessibility | 10% | **5.5** | 5.50 | Good use of semantic headings, labels, alt text in many areas, focus styles in some components, and reduced-motion support. Tabs, menu behavior, contrast, live regions, and keyboard behavior need work. |
| Performance | 10% | **5.5** | 5.50 | Next Image and AVIF/WebP support are present. Heavy client components, repeated Framer Motion effects, priority images, blur filters, and large media can increase LCP, JS, and GPU cost. |
| SEO and discoverability | 10% | **5.0** | 5.00 | Strong title/description intent, sitemap, robots file, blog, and Open Graph configuration. Missing referenced assets, incomplete sitemap coverage, limited structured data usage, and missing canonicals reduce readiness. |
| Technical quality | 10% | **4.5** | 4.50 | Build compiles, but validation is explicitly bypassed and the codebase has type/lint failures, dead imports, undefined CSS variables, and demo-only persistence. |
| Trust and operational readiness | 3% | **4.0** | 1.20 | Forms and contact information look complete, but placeholder data, unverified claims, dead policies, and demo authentication weaken credibility. |
| Localization | 2% | **5.0** | 1.00 | English, Kannada, and Hindi resources exist and callback forms include translations. The global navigation selector does not yet localize the actual marketing pages. |
| **Total** | **100%** |  | **56.2 / 100 = 5.6 / 10** |  |

### What the score means

- **5.6/10:** A promising, visually polished product showcase that is not yet ready to be treated as a fully trustworthy production marketing site.
- **7.0/10:** Achievable after fixing broken paths, CTAs, metadata, validation, accessibility basics, and claim clarity.
- **8.5/10:** Achievable after adding evidence-backed content, real conversion flows, complete localization, production data integrations, performance measurement, and continuous optimization.

---

## 3. What is already working well

### Product and page strategy

- The product is explained through the needs of **three distinct users**: farmers, buyers, and haulers.
- The homepage has a logical broad narrative: hero → problems → solutions → workflow → product apps → AI → testimonials → impact.
- Dedicated routes exist for `/farmers`, `/buyers`, `/haulers`, `/about`, `/ai`, `/blog`, and `/contact`.
- The homepage and audience pages use a consistent farm-to-fork story instead of presenting unrelated features.
- Lead-generation forms are implemented with React Hook Form and Zod validation.
- The blog includes MDX posts, reading-time support, related posts, sharing, and a feed route.

### Visual system

- The green and orange palette is relevant to agriculture, earnings, and calls to action.
- Typography uses Outfit for display headings and Inter for body copy, which creates useful hierarchy.
- Cards, badges, stat blocks, step timelines, phone mockups, and bento layouts give the site a strong product-led feel.
- The hero contains a clear headline, supporting proposition, primary CTA, secondary CTA, and trust metrics.
- Many interactive elements include hover and focus-visible styling.
- `prefers-reduced-motion` is addressed in `src/app/globals.css`.

### Technical foundation

- Image optimization is configured in `next.config.ts` for AVIF and WebP.
- Security-related headers include `X-Content-Type-Options` and `Referrer-Policy`.
- `robots.txt` and a generated sitemap are present.
- Analytics helper functions cover CTA clicks, form events, language changes, and scroll-depth events.
- API route boundaries exist for contact, farmer, buyer, and hauler leads.
- The production build currently completes and generates the primary static and dynamic routes.

---

## 4. Critical issues to fix first

These issues have the greatest effect on user trust, lead generation, SEO, or release safety.

### P0 — Release blockers

#### 4.1 Restore strict validation

**Evidence:**

- `next.config.ts` sets `typescript.ignoreBuildErrors: true`.
- `next.config.ts` sets `eslint.ignoreDuringBuilds: true`, which Next 16 reports as an invalid configuration option.
- `npm run typecheck` fails with errors in `next.config.ts` and `Navbar.tsx`.
- `npm run lint` reports **23 errors and 54 warnings**.

**Required action:**

1. Remove the invalid `eslint` block from `next.config.ts`.
2. Set `typescript.ignoreBuildErrors` to `false` or remove it.
3. Make the CI pipeline run `npm run typecheck`, `npm run lint`, and `npm run build`.
4. Fix existing errors before merging new features.
5. Keep warnings at zero for production-facing files where practical.

**Specific first fixes:**

- Use `user.user_type` or expose a correctly typed `role` property in `AuthContextType`; `Navbar.tsx` currently reads `role` even though the context type does not provide it.
- Escape unescaped apostrophes and quotation marks reported by `react/no-unescaped-entities`.
- Replace `any` in blog MDX and AI pipeline components with explicit types.
- Remove unused imports and variables.
- Fix the synchronous `setState`-inside-effect lint findings in `Navbar`, `AuthContext`, and `ShowcaseContext` using a hydration-safe initialization pattern.

**Done when:** A clean clone passes typecheck, lint, build, and the CI pipeline without ignored failures.

#### 4.2 Make every primary CTA perform a real action

**Current problems:**

- The desktop Navbar “Get Started” button only tracks an event and does not navigate.
- The hero “Join the Marketplace” CTA only tracks `"/join"`; `/join` is not an application route.
- The hero “See How AI Works” CTA scrolls to `#ai-tech`, but `AITechnology.tsx` uses `id="technology"`.
- The Products section “Download on Google Play” uses `href="#"`.
- Hauler app buttons use `href="#"`.
- The buyer success-state “Create Business Account” action uses `href="#"`.
- Footer links include paths such as `/pricing`, `/careers`, `/press`, `/privacy`, `/terms`, `/refund`, and `/cookies`, but matching routes are not present in the app route list.

**Recommended CTA map:**

| CTA | Destination |
|---|---|
| Homepage farmer CTA | `/farmers#callback` or a real signup flow |
| Homepage buyer CTA | `/buyers#request-demo` |
| Homepage hauler CTA | `/haulers#callback` |
| Navbar Get Started | Open a three-option role chooser or `/contact?type=general` |
| See How AI Works | `#technology` |
| Buyer success CTA | A real authenticated onboarding route or `/buyers` |
| App downloads | Verified Play Store/App Store URLs or a disabled button with honest “Coming soon” copy |
| Legal links | Publish real pages before linking to them |

**Done when:** No user-facing interactive control leads to `#`, a nonexistent route, or a no-op unless it is clearly labeled as a demo.

#### 4.3 Fix missing SEO and social assets

The code references assets that could not be found in `public/`:

- `/og-image.png`
- `/images/farmers-og.png`
- `/images/buyers-og.png`
- `/favicon.ico`
- `/favicon-16x16.png`
- `/apple-touch-icon.png`
- `/site.webmanifest`
- `/images/playstore-icon.png`
- `/logo.png` in the organization schema, while the available logo files are inside `public/logo/`

**Required action:**

- Create production Open Graph images for the home, farmer, buyer, hauler, AI, about, and blog pages.
- Add favicon and manifest files or remove references until they exist.
- Point structured data to an actual logo file.
- Add a `metadataBase`-compatible canonical strategy for all indexable pages.
- Test every image URL with a production build and a crawler.

#### 4.4 Replace demo-only trust signals before public launch

The site currently presents a mixture of real-looking and demo-looking information:

- Dashboard data and authentication are stored in `localStorage`.
- Demo users and a shared demo password are embedded in `AuthContext.tsx`.
- `ShowcaseContext.tsx` seeds sample listing and order data in the browser.
- Footer contact information includes `hello@cropfresh.ai` and a phone number that should be verified.
- Farmer and hauler pages contain numerical earnings and performance claims.

**Required action:**

- Label demos clearly as “Interactive demo” or “Preview mode”.
- Connect public flows to the real backend before presenting them as live marketplace functionality.
- Never ship shared demo credentials as if they were production authentication.
- Confirm ownership of the email, phone number, app URLs, testimonials, user names, photos, and claims.
- Add claim sources or a short methodology note for all percentages and market-size figures.

---

## 5. Detailed audit by area

## 5.1 Brand and visual design — 7.5/10

### Strengths

- The identity is clearly positioned as modern agritech rather than a generic grocery marketplace.
- Orange is used for attention and green for agriculture and positive outcomes.
- The display typography is strong for large headlines.
- The hero showcase, timeline, phone mockups, and AI bento cards create a product-demo feeling.

### Improvement opportunities

- The homepage uses a very dark, high-contrast, neon glass style almost everywhere. This makes sections feel similar and can reduce content hierarchy.
- Blur, glow, grid, noise, animated orbs, shimmer, floating icons, and hover movement are frequently combined. Use fewer effects per section.
- Some audience pages use different accent colors and UI languages without enough shared structure. The user should always feel they are still inside one CropFresh product.
- The CSS design token file references variables that are not declared, including variants of teal, glow sizes, timing values, and role colors. Invalid custom-property values can silently remove expected styles.
- Body and form text often uses low-opacity white on dark backgrounds. Contrast should be measured, not estimated.

### Recommended visual direction

1. Keep the dark hero and product-demo sections.
2. Use a calmer light or warm-neutral background for proof, testimonials, FAQs, and forms.
3. Reserve glow effects for hero highlights and primary CTAs.
4. Standardize one primary green, one CTA orange, one information blue, and one neutral text scale.
5. Introduce photography and real produce/farmer imagery in every major audience journey.
6. Use one card radius scale and one shadow scale across all sections.

## 5.2 User experience and information architecture — 6.0/10

### What works

- The main navigation is understandable.
- Audience-specific routes are easy to discover.
- The homepage makes the stakeholder problem visible before presenting solutions.
- The mobile navigation has a full-screen menu and closes when a route is selected.

### Problems

- The navigation contains many competing destinations: Home, Farmers, Buyers, Haulers, About, Blog, Contact, AI, language, Login, and Get Started. The primary conversion path is not visually dominant enough.
- Mobile navigation does not include the separate CropFresh AI link that exists on desktop.
- The audience pages mix marketing and dashboard behavior under the same routes. A new visitor and an authenticated user need clearer separation.
- The buyer search placeholder promises location filtering (`"Tomatoes within 50km radius"`), while the implementation currently filters only by commodity text and simulates a delay.
- Several section tabs change content but do not expose their selected state to assistive technologies.
- “Learn more” links in solution sections point to a generic section anchor rather than a relevant detail or proof page.

### Recommended information architecture

```text
Home
├── For Farmers
│   ├── How it works
│   ├── Farmer stories
│   └── Join / request a call
├── For Buyers
│   ├── Quality and traceability
│   ├── Pricing
│   └── Request a demo
├── For Haulers
│   ├── Earnings
│   ├── Requirements
│   └── Join / request a call
├── How CropFresh Works
├── CropFresh AI
├── Stories / Resources
├── About
└── Contact
```

Use the header CTA for the role-selection step, not an ambiguous `/join` destination.

## 5.3 Content and messaging — 6.5/10

### What works

- “Zero middlemen,” “T+0 payments,” “quality verification,” and “traceability” are easy to recognize as benefits.
- Each audience has a reasonably clear economic outcome.
- The process is explained in four steps.

### Problems

- The page repeats the same claims in multiple forms: instant payments, 20–40% higher prices, 25–30% lower costs, 30% fuel savings, 100% traceability, and AI verification.
- Internal product terms such as DPLE, AISP, Digital Twin, and “immutable” appear before enough plain-language explanation.
- “India’s first AI-powered Agri-Intelligence Marketplace” is a very strong claim and needs evidence or softer wording.
- Claims such as “60% revenue lost to middlemen,” “95% accuracy,” “99% delivery reliability,” and “under 24 hours” should include market, pilot, date, sample size, or methodology.
- Several success stories and testimonials should include consent, location, crop/business context, and measurable before/after results.

### Recommended homepage message hierarchy

**Primary headline:**

> Sell fresher produce at a fairer price—direct from Indian farms to verified buyers.

**Supporting statement:**

> CropFresh helps farmers list produce, helps buyers source verified quality, and helps delivery partners earn from smarter routes.

**Three role CTAs:**

- I’m a Farmer — Sell my produce
- I’m a Buyer — Source produce
- I’m a Delivery Partner — Earn with CropFresh

Then show proof, process, product, and the AI layer. Keep technical terms in the dedicated AI page and glossary.

## 5.4 Conversion and lead generation — 4.5/10

### Existing strengths

- Farmer, buyer, hauler, and general contact forms exist.
- Zod validation is used on the main lead forms.
- Success states are visually clear.
- Form submission events are tracked in several components.
- The farmer form supports Kannada, Hindi, and English labels.

### Conversion blockers

- The top-of-page CTA does not send users into a clear conversion path.
- Placeholder links make the site look unfinished when clicked.
- Newsletter signup only changes local component state; it does not call an API or persist the email.
- Forms ask for several fields before showing enough proof of value or response expectations.
- A user who submits a buyer demo cannot immediately create an account because the success CTA has no destination.
- There is no visible lead-routing expectation: response owner, business hours, phone option, or confirmation reference.
- Analytics helper functions exist, but consistent funnel events and conversion dashboards are not demonstrated.

### Recommended conversion flow

1. Visitor selects a role.
2. Page shows one role-specific promise and one primary action.
3. Visitor sees proof: real result, process, pricing explanation, or verified story.
4. Visitor submits a short form.
5. Success state confirms the next step and provides a real contact option.
6. CRM/email/notification workflow stores and routes the lead.
7. Analytics records source, role, page, form start, form completion, and qualified outcome.

### Form improvements

- Add explicit `id`, `htmlFor`, `aria-invalid`, and `aria-describedby` associations everywhere.
- Add a visible privacy statement and link it to a real policy page.
- Add submission error recovery without losing the user’s input.
- Add a success reference number or response SLA.
- Use `autocomplete` attributes for name, email, and phone.
- Consider a two-step form for buyer leads: role/business basics first, qualification details second.
- Add a phone-call option for farmers and haulers.
- Send newsletter signups to a real consent-aware email service.

## 5.5 Accessibility — 5.5/10

### Positive implementation details

- Images often have meaningful alt text.
- The global layout uses a real `<html lang>` attribute.
- Forms use labels in several components.
- `prefers-reduced-motion` is handled globally.
- Some buttons have visible focus rings.
- Semantic `<main>`, `<nav>`, `<section>`, `<header>`, and `<footer>` elements are used.

### Required improvements

- Add `aria-current="page"` to the active navigation link.
- Add `aria-expanded`, `aria-controls`, and an appropriate menu relationship to the mobile menu.
- Add `aria-selected`, `role="tablist"`, `role="tab"`, and `role="tabpanel"` to the farmer/buyer/hauler tabs.
- Make the mobile language and menu controls fully keyboard and screen-reader testable.
- Add accessible names or `aria-hidden="true"` to decorative animated elements.
- Use live regions for form success, error, voice-recording status, and async search status.
- Do not rely on color alone for grade, trend, active tab, or status changes.
- Test text opacity values against WCAG AA contrast targets.
- Give the scroll indicator a real button role and keyboard activation if it remains interactive.
- Ensure dialogs, drawers, and dropdowns manage focus and close on Escape.
- Verify that autoplaying visual carousels can be paused or are not essential to understanding the page.

### Accessibility acceptance targets

- Keyboard-only navigation has no traps.
- Every interactive control has a visible focus indicator.
- VoiceOver/NVDA can identify page structure, current navigation item, tab state, form errors, and success state.
- WCAG 2.2 AA contrast passes for body text, controls, and status labels.
- Reduced-motion mode disables nonessential movement and auto-rotation.

## 5.6 Performance — 5.5/10

### Main performance risks

- The homepage contains many client components, which increases JavaScript and hydration work.
- Framer Motion is used throughout the homepage and audience pages for repeated entrance, floating, glow, and rotation effects.
- The hero marks every rotating showcase image as `priority`, although only the initial visual is immediately needed.
- Large blur filters, backdrop filters, animated gradients, and mix-blend layers can be expensive on mobile GPUs.
- A large global stylesheet contains many unused or undefined utility tokens.
- Some dashboard surfaces use raw `<img>` instead of `next/image`.
- The hero video exists in `public/videos/` and should be checked for size, preload behavior, poster image, and mobile data usage if used in other sections.

### Recommended performance plan

1. Measure real deployed performance with Lighthouse and WebPageTest on a mid-range Android device and a simulated 4G connection.
2. Set a performance budget: LCP under 2.5 seconds, CLS under 0.1, INP under 200 milliseconds on key pages.
3. Use `priority` only for the actual LCP image.
4. Lazy-load below-the-fold media and nonessential animations.
5. Replace decorative motion with CSS or static backgrounds where possible.
6. Reduce simultaneous blur layers and remove animation from offscreen content.
7. Add poster images and `preload="none"` for nonessential video.
8. Replace raw `<img>` elements with optimized `Image` components where remote image configuration supports them.
9. Avoid mounting entire dashboard behavior for unauthenticated marketing visitors.
10. Use `content-visibility: auto` carefully for long marketing sections after visual testing.

## 5.7 SEO and discoverability — 5.0/10

### Strengths

- Root metadata has title templates, descriptions, keywords, Open Graph, Twitter, robots, and metadata base.
- Audience layouts provide page-specific title and description values.
- A sitemap includes the homepage, core audience pages, about, contact, blog, and blog posts.
- `robots.txt` identifies the sitemap and blocks API routes.
- Blog content provides a useful organic-search foundation.

### Problems

- Referenced social preview and icon assets are missing.
- `organizationSchema` exists in `src/lib/metadata.ts` but is not visibly injected as JSON-LD in the root layout or relevant pages.
- Canonical URLs are not clearly emitted on every indexable page.
- The sitemap omits `/ai`, `/login`, and farmer subroutes. Exclude private/demo routes intentionally, but include all public landing pages that should rank.
- The sitemap uses `new Date()` for many `lastModified` values, which makes every page appear changed on every generation.
- The root page does not appear to have an explicit structured data strategy for Organization, WebSite, FAQ, Article, or Product/App where appropriate.
- Legal and policy pages are linked from the footer but are absent, creating crawl and trust issues.

### SEO action list

- Add canonical metadata for every public page.
- Add Organization and WebSite JSON-LD globally.
- Add Article JSON-LD to blog posts.
- Add FAQPage JSON-LD only where the visible page contains the same FAQ content.
- Add BreadcrumbList JSON-LD to blog posts and deep audience pages.
- Generate real OG images with the page title and audience.
- Use one primary keyword intent per page instead of repeating broad keywords.
- Add location-specific landing pages only when there is unique, useful content for each location.
- Improve internal links between audience pages, case studies, blog posts, contact forms, and the AI page.
- Set stable `lastModified` dates from content or source data rather than the current time.

## 5.8 Technical quality — 4.5/10

### Issues found

- TypeScript and lint validation are bypassed in configuration.
- The Next 16 configuration contains an unsupported `eslint` property.
- `Navbar.tsx` has a type mismatch around `role`.
- Multiple unused imports and variables make the code harder to maintain.
- Several CSS variables are referenced but not defined, including `--color-teal`, `--color-teal-dark`, `--glass-light-bg`, `--glass-heavy-bg`, `--glow-primary-sm`, `--glow-accent-md`, `--ease-out-expo`, and related variants.
- Many client components contain data and presentation together, making localization, testing, and content updates harder.
- Demo state is browser-local rather than server-backed.
- Some user-facing controls are no-op buttons or placeholder links.

### Technical improvement approach

- Create a typed content model for audience claims, benefits, FAQs, testimonials, and CTA destinations.
- Move repeated audience data into `src/data/` and render it through shared components.
- Create a `LinkButton` component that requires a real destination unless explicitly marked as a demo action.
- Create a shared `AudienceTabs` component with accessible tab semantics.
- Create a shared `FormStatus` component with consistent live-region behavior.
- Add unit tests for lead payload validation, route destinations, and critical utility functions.
- Add an automated broken-link test for internal routes and local asset references.

## 5.9 Trust, proof, and operational readiness — 4.0/10

### Main risks

- Quantitative claims are numerous but not sourced.
- “AI” wording can sound more certain than the implementation demonstrates.
- The “Digital Twin” is described as immutable/tamper-proof; this needs technical and legal precision.
- Payment language such as “T+0” needs clear conditions, settlement dependency, and exceptions.
- Testimonials and images need verified consent and attribution.
- Footer contact details, social URLs, and app store links need verification.
- Privacy, terms, refund, and cookie pages are linked but missing.

### Trust improvement plan

- Add a “How we measure this” link to important statistics.
- Add pilot locations, dates, cohort sizes, and methodology to case studies.
- Separate “available today,” “pilot,” “coming soon,” and “concept/demo” features visually.
- Publish real legal pages before collecting personal data at scale.
- Add company registration details and a verifiable business contact where appropriate.
- Add a security/privacy summary near lead forms.
- Show real product screenshots or short, captioned videos instead of only abstract icon cards.

## 5.10 Localization — 5.0/10

### Current state

- `en`, `kn`, and `hi` are defined in `src/i18n.ts`.
- English and Kannada translation files are present; Hindi is also referenced by the project.
- Farmer and hauler callback forms contain localized text.
- The Navbar persists a locale in `localStorage` and updates the document language.

### Current limitation

The main site does not use `next-intl` translation hooks or locale routes. The selector dispatches a `locale-change` event, but the repository search shows no marketing components listening for that event. As a result, most homepage and audience-page content remains in English after changing the language.

### Recommended rollout

1. Decide between URL-based locale routing (`/en`, `/kn`, `/hi`) and a client-side locale switcher.
2. Prefer URL-based routing for SEO, sharing, analytics, and reliable refresh behavior.
3. Translate navigation, hero, buttons, FAQs, errors, forms, footer, metadata, and structured data.
4. Use native-language review by Kannada and Hindi speakers; machine translation alone is not enough for farmer-facing trust.
5. Test long text, mixed scripts, phone inputs, select controls, and mobile layout at each locale.

---

## 6. Page-by-page improvement plan

## 6.1 Homepage `/`

### Keep

- Three-audience framing.
- Strong hero visual.
- Problems-to-solutions sequence.
- Process timeline.
- AI explanation.

### Change

- Replace the rotating headline with a stable, searchable primary headline. The rotating word can remain as a decorative supporting element.
- Replace one generic “Join the Marketplace” CTA with three role-specific CTAs.
- Add a compact “Who is CropFresh for?” section immediately below the hero.
- Add proof immediately after the first CTA: verified pilot numbers, partner logos, real case study, or a transparent “pilot” label.
- Reduce the number of repeated stats and show the source/date for each.
- Fix the `#ai-tech` anchor to `#technology` or rename the target consistently.
- Make the app showcase controls real buttons with labels and pause behavior.
- Add a final CTA that leads to a working form or role chooser.

### Suggested homepage order

1. Header with one clear CTA.
2. Hero with three role paths.
3. Proof bar with source/date.
4. Audience cards.
5. Problem and solution overview.
6. How it works.
7. Real case study/testimonial.
8. Product/app experience.
9. AI and traceability explanation.
10. FAQ.
11. Final role-based CTA.
12. Footer with working legal and support links.

## 6.2 Farmers `/farmers`

- Keep the strong income and voice-listing narrative.
- Put “Get a call back” and app download actions above the fold.
- Explain commission, payment timing, quality verification, and geographic availability in plain language.
- Add a real farmer result with crop, district, time period, old outcome, and new outcome.
- Clearly mark the dashboard as demo or connect it to a real account.
- Replace hardcoded KPI values such as `₹45,200` and `92/100` with real user data or a labeled sample state.
- Make the market insights source and timestamp visible.
- Add a fallback for browsers without microphone permission or `MediaRecorder` support.
- Ensure the voice feature has a text alternative and clear privacy messaging.

## 6.3 Buyers `/buyers`

- Lead with procurement outcomes: reliable supply, verified grade, delivery window, landed price, and traceability.
- Replace the simulated “AI ranking” behavior with a real search or label it as a prototype.
- Either implement radius/filter search or change the placeholder to match current behavior.
- Show a real produce detail view with origin, harvest date, grade, quantity, price breakdown, and delivery estimate.
- Connect “Request Demo” and post-submit “Create Business Account” to working destinations.
- Add buyer-specific proof: fewer stockouts, lower procurement variance, or faster receiving.

## 6.4 Haulers `/haulers`

- Show an earnings example with route assumptions, distance, hours, fuel, and payout calculation.
- Clarify vehicle eligibility, documents, service locations, onboarding time, and payment conditions.
- Replace placeholder app links with verified stores or a callback form.
- Add a real route screenshot or short video.
- Make the “no empty returns” claim conditional and evidence-backed rather than absolute.

## 6.5 AI `/ai`

- This is a strong differentiator, but it should distinguish live functionality, prototype simulation, and roadmap items.
- Explain what data enters each model, what a human verifies, and how errors are handled.
- Add model evaluation details for “95% accuracy”: dataset, class definition, date, and limitations.
- Include a plain-language glossary for DPLE, AISP, Digital Twin, quality grade, and traceability.
- Avoid implying that an animation or demo proves production-grade AI capability.
- Add an investor/technical CTA with a real contact or demo request destination.

## 6.6 About `/about`

- Add founder/team biographies with real names, roles, and professional links if available.
- Explain why CropFresh started, which geography is served, and what is currently live.
- Add milestones and pilot evidence instead of only broad mission language.
- Make the team section meaningful on mobile and accessible.

## 6.7 Blog `/blog`

- Add author, publication date, update date, category, and reading time consistently.
- Use article structured data.
- Add related conversion CTAs based on article intent.
- Create content clusters for farmer education, B2B procurement, logistics, AI agriculture, and Karnataka market insights.
- Avoid publishing unsupported market statistics without a source.

## 6.8 Contact `/contact`

- Keep the general contact form, but add clear response times and direct phone/email options.
- Publish privacy policy and consent language before scaling lead collection.
- Connect newsletter signup to a real provider.
- Add a confirmation ID and clear next step after submission.
- Ensure all support links and FAQ links resolve.

---

## 7. Design-system cleanup

### Token work

Create one authoritative token list and remove references to undeclared variables. At minimum, define or replace:

```css
--color-teal
--color-teal-dark
--color-primary-green
--color-primary-blue
--glass-light-bg
--glass-light-blur
--glass-light-border
--glass-heavy-bg
--glass-heavy-blur
--glass-heavy-border
--glow-primary-sm
--glow-primary-md
--glow-primary-lg
--glow-accent-sm
--glow-accent-md
--glow-accent-lg
--ease-out-expo
--duration-fast
--duration-slower
--space-2
--space-3
```

### Component standards

- Use the shared `Button` and shared link/button primitives for all primary actions.
- Add `focus-visible` styles to every custom button.
- Use consistent button heights and touch targets of at least 44px.
- Use a shared `Container` and section spacing scale.
- Create reusable `Stat`, `AudienceTab`, `FeatureCard`, `FormField`, and `SectionHeader` components.
- Add `data-testid` only where meaningful behavior needs automated testing.
- Keep decorative motion behind a single reduced-motion-aware abstraction.

### Content standards

- Sentence case for most headings and labels.
- Avoid all-caps body copy.
- Define “AI-verified,” “field-verified,” “grade,” and “traceable” precisely.
- Use “up to” for variable outcomes and state the conditions.
- Add “Last updated” to live price and market insight content.

---

## 8. Analytics and measurement plan

### Core events

| Event | Required properties |
|---|---|
| `role_selected` | `role`, `page_path`, `source` |
| `primary_cta_click` | `cta_name`, `role`, `destination`, `page_path` |
| `form_view` | `form_name`, `role`, `page_path` |
| `form_start` | `form_name`, `role`, `page_path` |
| `form_submit` | `form_name`, `role`, `page_path`, `success` |
| `form_error` | `form_name`, `field`, `error_type` |
| `app_download_click` | `app_role`, `store`, `destination` |
| `language_changed` | `from`, `to`, `page_path` |
| `video_started` | `video_name`, `page_path` |
| `faq_opened` | `question_id`, `page_path` |

### KPIs

- Visitor-to-role-selection rate.
- Role-page CTA click-through rate.
- Form start rate.
- Form completion rate.
- Form error rate by field.
- Qualified lead rate by audience.
- Time to first human response.
- App store click-through rate.
- Demo-to-account conversion rate.
- Organic traffic by audience and location.
- Core Web Vitals by device and landing page.

### Analytics implementation rules

- Add one consistent event naming convention; the current helpers mix CTA and form-specific names.
- Track real destinations, not intended destinations.
- Do not send phone numbers, email addresses, names, or other personal data as analytics properties.
- Add consent handling before marketing analytics where required.
- Create a dashboard for weekly review and assign an owner for each metric.

---

## 9. Recommended implementation roadmap

## Phase 0 — Stabilize release quality (1–2 days)

**Goal:** Make the existing code safe to iterate on.

- Remove unsupported Next config fields.
- Stop ignoring TypeScript and lint failures.
- Fix the current typecheck errors.
- Fix all ESLint errors.
- Remove unused imports and invalid CSS token references.
- Add a CI command that runs typecheck, lint, build, and a broken-link check.

**Exit criteria:** CI is green and no build validation is bypassed.

## Phase 1 — Repair user journeys (2–4 days)

**Goal:** Make every visible action complete an understandable task.

- Map every CTA to a real route or working form anchor.
- Fix the AI anchor mismatch.
- Replace all `href="#"` actions.
- Add missing `/pricing`, legal, support, careers, and press pages or remove their links.
- Add a role-selection CTA flow.
- Give the mobile menu access to all primary destinations.
- Verify app store links and download behavior.

**Exit criteria:** Manual click-through of every header, hero, card, footer, form, and app CTA has no dead ends.

## Phase 2 — Build trust and conversion (1 week)

**Goal:** Turn the polished showcase into a credible lead-generation site.

- Verify every contact, social, app, testimonial, photo, and metric.
- Label demos, pilots, and coming-soon features.
- Add evidence and dates to claims.
- Add real lead routing for contact, farmer, buyer, and hauler forms.
- Connect newsletter signup to an email provider.
- Add confirmation IDs and response expectations.
- Publish privacy, terms, cookie, and refund policies.
- Add role-specific case studies and FAQs.

**Exit criteria:** A visitor can understand what is live, submit a lead, know what happens next, and verify why the claims are credible.

## Phase 3 — Accessibility, SEO, and performance (1–2 weeks)

**Goal:** Make the site discoverable, usable, and fast.

- Add all missing icons, manifests, OG images, and schema assets.
- Add canonical URLs and JSON-LD.
- Expand the sitemap to intended public pages.
- Add accessible tab, menu, dropdown, status, and modal semantics.
- Run axe, keyboard, screen-reader, and contrast checks.
- Measure Core Web Vitals on mobile.
- Reduce animation, blur, priority images, and client-side work.
- Optimize media and convert large assets to efficient formats.

**Exit criteria:** Lighthouse and axe results meet agreed thresholds, with no critical accessibility or broken-link findings.

## Phase 4 — Localization and content growth (2–4 weeks)

**Goal:** Serve Indian users in the languages promised by the product.

- Implement locale routing or a complete client-side message system.
- Translate all public marketing copy, metadata, form errors, and policies.
- Review Kannada and Hindi copy with native speakers.
- Add localized blog content and search metadata.
- Add location and crop-specific content only where it provides real value.

**Exit criteria:** Changing language updates all visible content on the current page, survives refresh/share, and passes mobile layout QA.

## Phase 5 — Product integration and optimization (ongoing)

**Goal:** Align marketing claims with live product behavior.

- Replace localStorage dashboards with authenticated backend data.
- Add real inventory search, location filtering, ordering, routing, and payment status.
- Connect user roles to server-side authorization.
- Add real app download and deep-link flows.
- Run A/B tests on hero message, role CTAs, and form length.
- Review analytics and qualified-lead data weekly.

**Exit criteria:** The public site, demos, dashboards, forms, and claims all reflect the same production system.

---

## 10. Prioritized backlog

| Priority | Task | Impact | Effort | Suggested owner |
|---|---|---:|---:|---|
| P0 | Remove validation bypasses and fix type/lint failures | Very high | Medium | Frontend |
| P0 | Repair all CTAs, anchors, routes, and placeholder links | Very high | Medium | Frontend + Product |
| P0 | Add or remove missing metadata assets | High | Low | Frontend + Design |
| P0 | Publish real privacy/terms pages before lead scale-up | Very high | Medium | Operations + Legal |
| P0 | Verify contact details, testimonials, app URLs, and claims | Very high | Medium | Marketing + Operations |
| P1 | Connect forms to lead routing and confirmation workflow | Very high | Medium | Backend + Growth |
| P1 | Add accessible tab/menu/dropdown/status behavior | High | Medium | Frontend |
| P1 | Replace demo labels and localStorage-only state | High | High | Product + Backend |
| P1 | Add SEO schema, canonicals, OG images, and stable sitemap dates | High | Medium | SEO + Frontend |
| P1 | Reduce motion and optimize hero/media performance | High | Medium | Frontend |
| P1 | Rewrite homepage around role-based outcomes and proof | High | Medium | Product Marketing |
| P2 | Implement complete Kannada/Hindi marketing localization | High | High | Frontend + Localization |
| P2 | Add real case studies and crop/location content | Medium | Medium | Marketing |
| P2 | Add buyer radius search, inventory details, and real product states | High | High | Product + Backend |
| P2 | Add automated route, asset, and CTA regression tests | Medium | Medium | QA + Frontend |
| P3 | Run A/B tests and weekly conversion reviews | Medium | Ongoing | Growth |

---

## 11. QA acceptance checklist

### Functional

- [ ] Header links resolve on desktop and mobile.
- [ ] Mobile menu opens, closes, traps no focus, and closes on Escape.
- [ ] Language switch changes all intended content and updates the URL or persists reliably.
- [ ] Hero CTAs reach a real next step.
- [ ] Every section tab works with mouse, keyboard, and screen reader.
- [ ] Every form validates, submits, handles API errors, and shows a real success state.
- [ ] Newsletter signup reaches a real service.
- [ ] All app download links work or are clearly labeled coming soon.
- [ ] Dashboard demo and production states are clearly differentiated.
- [ ] Authenticated routes enforce the correct user role server-side.

### Accessibility

- [ ] Keyboard-only journey passes from header to footer.
- [ ] Focus indicators are visible on every control.
- [ ] All form fields have associated labels and error descriptions.
- [ ] Tab controls expose selected state.
- [ ] Async status updates are announced.
- [ ] Contrast passes WCAG AA.
- [ ] Reduced-motion mode disables nonessential animation.
- [ ] Screen-reader testing is completed on mobile and desktop breakpoints.

### SEO

- [ ] Every intended public page has a unique title and description.
- [ ] Canonical URL exists and is correct.
- [ ] Open Graph and Twitter images return 200.
- [ ] Favicon and web manifest return 200.
- [ ] Organization, WebSite, Article, and relevant FAQ schema validate.
- [ ] Sitemap contains the correct public routes and stable dates.
- [ ] No intended public page has accidental `noindex`.
- [ ] Internal links do not return 404.

### Performance

- [ ] LCP is under the agreed target on a mid-range Android device.
- [ ] No unnecessary hero images are marked `priority`.
- [ ] Below-the-fold motion and media are lazy-loaded.
- [ ] Large images and video have known byte budgets.
- [ ] CLS is not caused by images, fonts, or animated layout changes.
- [ ] Mobile navigation and form interaction remain responsive under CPU throttling.

### Trust and content

- [ ] All claims have a source, date, condition, or pilot label.
- [ ] Testimonials and images have permission.
- [ ] Contact information is monitored.
- [ ] Policies are published and linked.
- [ ] “Live,” “pilot,” “demo,” and “coming soon” states are unambiguous.

---

## 12. Final assessment

CropFresh is a **promising 5.6/10 website with a strong 8.5/10 potential**. Its strongest assets are the product story, stakeholder segmentation, visual ambition, audience-specific content, and existing lead-form foundation. Its weakest areas are release quality, functional CTA completion, evidence-backed trust, missing routes/assets, accessibility semantics, and incomplete localization.

The fastest route to a meaningful improvement is:

1. Make the build honest by fixing and enforcing validation.
2. Make every CTA and footer link work.
3. Remove or label demo-only behavior.
4. Add real proof and publish the required legal pages.
5. Complete accessibility, metadata, and performance work.
6. Then expand localization and product integrations.

If these steps are completed in order, the site should move from a visually impressive prototype toward a reliable, credible, conversion-ready CropFresh platform.
