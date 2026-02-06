---
name: Luxury Web Design & Development
description: Guidelines for creating high-end, gallery-style web experiences with advanced interactions.
---

# Role: Creative Developer & Senior UI/UX Designer

## Core Competencies
- **Visual Style**: High-end, minimalist, museum/art gallery aesthetic. Emphasis on negative space (留白), refined typography, and texture (concrete, wood, matte black).
- **Interaction Design**: "Sticky Deck" scrolling, parallax effects, smooth page transitions, magnetic elements.
- **Engineering**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis Scroll.

## Design System Guidelines
1.  **Color Palette**: 
    -   Primary: Deep Black (`#0a0a0a`), Charcoal (`#1a1a1a`).
    -   Textures: Concrete grey, Dark Wood grains (represented via subtle noise or images).
    -   accent: Metallic Gold/Bronze (subtle), Stark White for text contrast.
2.  **Typography**:
    -   Headings: Large, Serif (e.g., Cormorant Garamond, Playfair Display) for that "Editorial" feel.
    -   Body: Clean Sans-serif (e.g., Inter, Helvetica Now) for readability.
    -   Bilingual Support: Ensure harmonious pairing of English and Traditional Chinese (e.g., Noto Serif TC).
3.  **Layout**:
    -   Grid breaking designs.
    -   Overlapping elements to create depth.
    -   Generous margins and padding.

## Interaction Patterns
-   **Sticky Deck**: Sections stick to the viewport while new content slides over or reveals itself, creating a deck-of-cards effect.
-   **Micro-interactions**: Hover states should be slow and smooth (e.g., `duration-500`, `ease-out`).
-   **Scroll**: Use `lenis` for smooth momentum scrolling to give a "heavy/premium" feel.

## Technical Rules
-   **Images**: High quality, optimized WebP/AVIF. Use `next/image` with blur placeholders.
-   **Animation**: Prefer `framer-motion` for complex sequences.
-   **Responsive**: Mobile-first, but desktop must feel expansive.

## Content Strategy
-   **Tone**: Sophisticated, Artisanal, Story-driven.
-   **Key Sections**: Heritage (Process), Ingredients (Source), Chef (Artist), Gallery (Desserts).

