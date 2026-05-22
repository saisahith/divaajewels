# Divaa Jewels N Ensemble Shopify Theme

## Project

Divaa Jewels N Ensemble Shopify Theme.

This is a premium ethnic boutique storefront focused on jewelry and clothing.

## Core Rules

- The store has only two main product categories: Jewelry and Clothing.
- Jewelry is the primary business focus.
- Clothing is secondary.
- Main navigation must be exactly: New Arrivals, Jewelry, Bridal, Clothing, Sale, Clearance, Membership.
- Do not add any extra main categories.
- Do not add blouses, clutches, bags, sunglasses, phone cases, dupattas, suits, skirts, nose rings, or any unrelated categories.
- Use Product Type -> Style hierarchy.
- Do not use Style -> Product Type hierarchy.
- Keep the design premium, minimal, mobile-first, and luxury ethnic boutique.
- Visual style should use ivory, warm white, champagne, rose-gold, charcoal, and deep maroon accents.
- Do not use neon colors, cheap gold gradients, heavy shadows, cluttered banners, or marketplace-style UI.
- Do not claim real gold, real diamonds, hallmark, 916 gold, pure silver, certification, lifetime warranty, fair trade, women-owned, or eco packaging unless real product/client data explicitly supports it.
- Prefer reusable Shopify Liquid sections and snippets.
- Keep sections editable from Shopify theme customizer whenever possible.
- Do not delete required Shopify files.
- Do not break theme settings schema.
- Run available theme checks, build checks, or lint checks after changes.
- Collection pages must show only real Shopify products from the active collection. If no products exist, show a clean empty state.

## Approved Main Navigation

The main navigation must remain exactly:

- New Arrivals
- Jewelry
- Bridal
- Clothing
- Sale
- Clearance
- Membership

Bridal is a curated destination made only from approved existing bridal-related categories:

- Bridal Necklace Sets
- Maang Tikka
- Passa
- Matha Patti
- Hathphool
- Bajuband
- Waist Belt / Kamarband
- Bridal Sarees

Do not add extra bridal categories.

## Approved Jewelry Structure

Jewelry must use this Product Type -> Style structure:

- Necklace Sets
  - American Diamond
  - Kundan
  - Temple Jewelry
  - Traditional Jewelry
  - Oxidized Jewelry
  - Bridal Necklace Sets
  - Fusion / Contemporary
  - Premium Collection
- Earrings
  - American Diamond Earrings
  - Kundan Earrings
  - Temple Earrings
  - Oxidized Earrings
- Bangles & Bracelets
  - Bangles
  - Kadas
  - American Diamond Bangles
  - Kundan Bangles
  - Temple Bangles
  - Oxidized Bangles
- Rings
  - American Diamond Rings
  - Kundan Rings
- Bridal Accessories
  - Maang Tikka
  - Passa
  - Matha Patti
  - Hathphool
  - Bajuband
  - Waist Belt / Kamarband

Do not add more jewelry categories.

## Approved Clothing Structure

Clothing must use this structure:

- Sarees
  - Banarasi Sarees
  - Kanchivaram Sarees
  - Bridal Sarees
  - Designer Sarees
  - Party Wear Sarees
- Lehengas
  - Party Wear Lehenga
- Dresses / Gowns
  - Indo Western
  - Anarkali
  - Party Wear Dresses

Do not add more clothing categories.

## Shopping Logic

The correct shopping logic is Product Type -> Style.

Do not structure the store as Style -> Product Type.

## Design Direction

The site should feel premium, elegant, minimal, feminine but not childish, jewelry-first, mobile-first, and like a high-end ethnic boutique.

Use ivory, warm white, soft champagne, rose gold, champagne gold, deep maroon / wine accents, charcoal, warm brown, and muted black.

Avoid bright red, neon pink, cheap gold gradients, heavy shadows, too many animations, cluttered product cards, and generic marketplace UI.

## Placeholder Rules

Do not render temporary preview products on customer-facing collection pages.

- Do not create fake live products.
- Do not silently mix fake placeholders with real products.
- Empty collections should use a clean empty state instead of preview product cards.

## Shopify Implementation Rules

- Work inside the existing Shopify theme.
- Inspect files before editing.
- Reuse existing theme conventions.
- Do not delete required files.
- Do not break `settings_schema.json`.
- Add valid Shopify section schema for new sections.
- Keep snippets reusable.
- Keep Liquid syntax valid.
- Run `shopify theme check` after changes when available.

