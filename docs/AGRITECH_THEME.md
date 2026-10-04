# CropFresh agriculture-first theme

**Implemented locally:** 2026-10-04\
**Direction:** Agriculture should be the first impression; technology supports the produce journey.

> **Publication update — 2026-10-04:** The [current audit](./WEBSITE_AUDIT_AND_IMPROVEMENT_PLAN.md) requires removal of public demos, planned/coming-soon blocks, unsupported claims, and unfinished sections. Preview descriptions below record the implemented baseline, not approved launch content. Keep the agriculture-first design while replacing those journeys with complete verified public content.

## First-screen message

- **Category:** Farm-to-business agritech.
- **Headline:** Fresh produce. From farms to businesses.
- **Definition:** CropFresh is a farm-to-business agritech platform.
- **Purpose:** A simpler way for farmers to sell their harvest, businesses to source produce, and delivery partners to bring them together.
- **Next action:** Find your path, followed by farmer, buyer, and delivery-partner choices.

The definition and role-choice action are visible on the initial desktop/tablet/mobile screens. This implements the five-second clarity goal through hierarchy and plain language; representative-user five-second testing remains a research task, not a measured outcome of the code change.

## Visual language

| Element | Treatment |
|---|---|
| Main surface | Warm cream `#FAF8EF` and off-white paper |
| Supporting sections | Sage `#EDF1E5` and warm earth `#F3EFE2` |
| Headings | Forest `#193D2B`; editorial serif hero, clean sans-serif section headings |
| Agriculture accents | Leaf `#356744`, muted field greens, harvest orange `#B75125` |
| Imagery | Existing illustrative farmer/field images, new local harvest-basket and field-line SVG artwork |
| Shapes | Soft card corners, leaf-inspired icon containers, gently arched farm images |
| Technology section | A calm forest-green section with practical benefits and honest demo/planned labels |
| Motion | Stable hero and message; no rotating headline, auto-advancing hero, neon mesh, or hidden-on-animation headline |
| Shared shell | Cream navigation and a forest footer across public pages |

The root secondary-page tokens now use forest/leaf/earth colors. The homepage has its own light agriculture theme rather than overriding legacy hardcoded dark-page styles.

## Homepage story

1. Agriculture-first hero and grow → source → deliver explanation.
2. “I grow produce,” “I source produce,” and “I deliver produce” audience paths.
3. What CropFresh is and how it connects the harvest journey.
4. Four intended steps from listing to delivery.
5. Farmer/buyer browser previews with agricultural produce artwork.
6. Practical uses for assisted entry, quality information, and pricing technology.
7. Native expandable questions and answers.
8. Role-choice next step and participation details.

Real availability, commercial terms, AI capabilities, and customer outcomes need owner evidence. Public demos/sample results are now excluded by the current publication requirement. Illustrative farmer artwork is not a testimonial.

## Implementation files

- `src/app/agriculture.css`: marketing palette, layout, responsive styles, controls, and shared shell.
- `src/data/marketing.ts`: English category, headline, definition, metadata copy, and role paths.
- `src/components/sections/AgricultureHero.tsx`: first-screen message and farm visual.
- `src/components/sections/AgricultureSections.tsx`: story, harvest journey, product previews, technology, and FAQ.
- `src/components/sections/AudiencePaths.tsx` and `ParticipationNextSteps.tsx`: themed role choice and final section.
- `src/components/sections/AgricultureNavbar.tsx` and `AgricultureFooter.tsx`: shared public navigation/footer, exported through the existing section index.
- `public/images/harvest-basket.svg` and `field-lines.svg`: local agricultural artwork.

Legacy technical homepage sections are not mounted by the new homepage. Review those components before reintroducing them into this light theme.

## Verification

- Typecheck, lint, the existing 3 test suites / 5 tests, and production build pass.
- Headless Firefox browser checks use actual viewports of **1440×1000, 768×1000, 390×844, and 320×740**.
- Each initial viewport has one H1, the explicit agritech definition, and the primary role-choice action visible; page/navigation horizontal-overflow checks pass.
- Rendered farm and SVG artwork load; below-the-fold imagery is verified after scrolling into view.
- Mobile navigation opens, closes on Escape, returns focus to its trigger, and closes after role-choice navigation.
- The role-choice anchor and native FAQ expansion work.
- Homepage internal links/anchors resolve; **9 linked route destinations** return HTTP 200.
- The key text/action palette was reviewed for contrast; primary action text is above 4.5:1 against its harvest background.
- Desktop, tablet, and phone screenshots were generated for local visual review.

This is local browser and build evidence. Cross-browser/screen-reader acceptance, native translation review, owner content acceptance, and formal five-second usability research remain in the development plan.
