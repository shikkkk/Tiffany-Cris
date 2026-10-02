---
name: Tiffany & Cris Luxury Design System
description: Haute-couture editorial design system for luxury designer bag catalog and private boutique concierge.
colors:
  primary: "#c59c55"
  primary-hover: "#d4aa65"
  primary-muted: "#7a6a50"
  primary-deep: "#5a4a28"
  neutral-bg: "#050403"
  neutral-surface: "#0a0804"
  neutral-card: "#0d0a05"
  text-primary: "#f0e4cc"
  text-secondary: "#d4c4a0"
  text-muted: "#9a8a70"
  text-subtle: "#4a3e28"
typography:
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(52px, 8vw, 96px)"
    fontWeight: 400
    lineHeight: "1.0"
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(40px, 6vw, 68px)"
    fontWeight: 300
    lineHeight: "1.1"
  title:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: "1.2"
    letterSpacing: "0.08em"
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: "1.7"
    letterSpacing: "0.02em"
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    letterSpacing: "0.3em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.none}"
    padding: "16px 36px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "16px 36px"
  filter-tab:
    backgroundColor: "transparent"
    textColor: "{colors.text-subtle}"
    rounded: "{rounded.none}"
    padding: "18px 20px"
---

# Design System: Tiffany & Cris

## Overview

**Creative North Star: "The Obsidian Atelier"**

The visual language of Tiffany & Cris is grounded in high-end Parisian atelier aesthetics and intimate private showroom consultation. The palette emerges from deep obsidian blacks (`#050403`) layered with warm luminous golds (`#c59c55`) and champagne ivories (`#f0e4cc`), creating an evocative, museum-grade dark atmosphere that frames each handcrafted leather bag as a singular work of art.

Typography carries the entire emotional weight of the brand: majestic, razor-sharp serif headlines in *Cormorant Garamond* celebrate heritage and craftsmanship, anchored by disciplined, ultra-tracked sans-serif metadata in *Montserrat* for clear technical specifications and navigation.

**Key Characteristics:**
- **Atelier Obsidian Atmosphere:** Atmospheric radial warm glows and fine grain textures on deep black canvas.
- **Editorial Contrast:** High-drama scale variance between oversized editorial display headlines and micro-tracked labels.
- **Razor Sharp Geometry:** Architectural zero-radius contours on cards and buttons evoking luxury packaging and bespoke leather gift boxes.
- **Tactile Transitions:** Subdued, silky image zoom and micro-hover states that feel organic and heavyweight.

## Colors

The palette is restrained, noble, and warm, avoiding harsh synthetic contrasts.

### Primary
- **Champagne Gold** (`#c59c55`): The signature luxury hallmark. Used for primary CTAs, active states, key icons, and emphasized italic titles.
- **Luminous Warm Gold** (`#d4aa65`): Interactive hover elevation for gold buttons and links.
- **Muted Bronze Gold** (`#7a6a50`): Inactive navigation links, secondary icons, and subtle brand accents.
- **Antique Deep Gold** (`#5a4a28`): Fine dividers, subtitle tracking, and category tags.

### Neutral
- **Obsidian Noir** (`#050403`): Base background canvas and page backdrop.
- **Dark Amber Charcoal** (`#0a0804`): Modal containers, filter bars, input fields, and info cards.
- **Ebony Leather** (`#0d0a05`): Product image stage containers and thumbnail frames.
- **Warm Pearl Ivory** (`#f0e4cc`): Main titles, hero typography, and high-emphasis text.
- **Champagne Sand** (`#d4c4a0`): Product names and primary body copy.
- **Muted Warm Clay** (`#9a8a70`): Specifications, secondary descriptions, and helper text.
- **Espresso Bronze** (`#4a3e28`): Form labels, placeholders, and subtle borders.

### Named Rules
**The Rarity Rule.** Champagne Gold (`#c59c55`) is reserved for high-intent actions, active navigation, and key accents. It must never coat large surface fills or overwhelm content.

**The No-Hard-White Rule.** True `#ffffff` is never used. All highlights and text rely on warm pearl and champagne tones (`#f0e4cc`, `#e8dcc8`) to preserve analog warmth.

## Typography

**Display Font:** Cormorant Garamond (fallback: Georgia, serif)  
**Body Font:** Montserrat (fallback: -apple-system, sans-serif)  
**Label Font:** Montserrat (uppercase, letter-spacing: 0.2em–0.48em)

**Character:** Timeless editorial elegance meets haute-horlogerie precision tracking.

### Hierarchy
- **Display** (Regular 400, clamp(52px, 8vw, 96px), line-height: 1.0, letter-spacing: -0.01em): Hero titles and major editorial statements.
- **Headline** (Light 300, clamp(40px, 6vw, 72px), line-height: 1.1): Collection heroes, section intros, and modal headers.
- **Title** (Regular 400, 22px–36px, line-height: 1.2, letter-spacing: 0.08em): Brand name, card headers, and showroom locations.
- **Body** (Light 300, 13px–14px, line-height: 1.7–1.8, letter-spacing: 0.02em–0.06em): Product descriptions, concierge notes, and storytelling copy.
- **Label** (Medium 500 / SemiBold 600, 8px–10px, line-height: 1.0, letter-spacing: 0.22em–0.48em, uppercase): Eyebrows, categories, filters, and button labels.

### Named Rules
**The Editorial Pairing Rule.** Headlines above 24px must use Cormorant Garamond. All navigation, metadata, specifications, and UI controls must use Montserrat in uppercase tracking.

## Layout

- **Container Widths:** Standard maximum container is 1280px for product grids and 1100px for inquiry/editorial layouts.
- **Spatial Rhythm:** Generous vertical breathing room (80px–160px section padding) to mimic luxury editorial spreads.
- **Grid Architecture:** 4-column product grid on desktop (>= 1100px), 3-column on tablet (720px–1100px), and 2-column on mobile (< 720px).
- **Navigation:** Sticky floating navbar with subtle blur (`backdrop-filter: blur(14px)`) and hairline bottom border.

## Elevation & Depth

Tiffany & Cris rejects loud dropshadows and skeumorphism in favor of **tonal layering and luminous radial ambient glows**.

- **Surface Layering:** Deep black (`#050403`) -> Elevated container (`#0a0804`) -> Image showcase canvas (`#0d0a05`).
- **Hairline Gold Borders:** 1px borders with low opacity (`rgba(197, 156, 85, 0.08)` to `rgba(197, 156, 85, 0.28)`) define structural bounds without heavy separation.
- **Ambient Glows:** Soft radial gradients (`radial-gradient(ellipse, rgba(197,156,85,0.07) 0%, transparent 70%)`) cast warm focal lighting behind featured products and heroes.

### Named Rules
**The Ghost Border Rule.** Boundaries between surfaces are created via 1px low-opacity gold hairlines and subtle tonal shifts, never heavy solid borders or dark drop-shadows.

## Shapes

- **Corner Language:** Razor-sharp rectilinear corners (`border-radius: 0px`) on buttons, cards, images, and inputs to evoke luxury packaging and architectural precision.
- **Exceptions:** Circular indicators (`border-radius: 50%`) strictly for dot indicators, carousel arrow buttons, and badge status markers.

## Components

### Buttons
- **Shape:** Rectilinear (`border-radius: 0px`)
- **Primary:** Solid Champagne Gold (`#c59c55`) with dark obsidian text (`#0a0704`), `padding: 16px 36px`, uppercase Montserrat 10px (`letter-spacing: 0.3em`).
- **Secondary / Ghost:** Transparent background with 1px Champagne Gold border (`#c59c55`) and gold text.
- **Hover:** Subdued 1px lift (`transform: translateY(-1px)`) and background transition (`0.25s`).

### Product Cards
- **Stage:** Aspect ratio 4:5 with `#0d0a05` background.
- **Interaction:** Smooth zoom on hover (`transform: scale(1.03)` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`) and title gold tint.
- **Metadata:** Micro category eyebrow in uppercase (`7.5px`, `0.32em` tracking) above Cormorant Garamond title (`15px`).

### Modal Inspector
- **Layout:** 2-column split (image carousel on left, specifications & concierge inquiry actions on right).
- **Specs Table:** Hairline divided rows detailing material, hardware, provenance, dimensions, and availability.

### Form Fields & Inputs
- **Style:** Deep charcoal fill (`#0a0804`), 1px gold hairline border (`rgba(197,156,85,0.15)`), `padding: 14px 16px`, zero border radius.
- **Focus:** Highlighted border (`rgba(197, 156, 85, 0.55)`) with smooth transition.

## Do's and Don'ts

### Do:
- **Do** maintain generous whitespace and deliberate padding around luxury bag photography.
- **Do** format all metadata, categories, and buttons in uppercase with wide letter-spacing (≥ 0.22em).
- **Do** use Cormorant Garamond italics selectively for evocative emphasis words (e.g. *Collection*, *Private*).
- **Do** ensure all image stages maintain a consistent 4:5 aspect ratio.

### Don't:
- **Don't** use generic rounded corners (e.g. 8px, 16px) on product cards, inputs, or buttons; preserve the bespoke rectilinear silhouette.
- **Don't** introduce high-saturation neon colors, cold blues, or synthetic purples.
- **Don't** crowd the screen with automated checkout banners, countdown timers, or aggressive discount badges.
- **Don't** use pure stark white (`#ffffff`) for typography; always use pearl/champagne tones.
