# 🎨 Design System & Vibe Coding Philosophy

> "Code is not just functionality; it's the texture of the digital experience."

This document outlines the design decisions, aesthetic principles, and "Vibe Coding" techniques used in **MONOLITH**.

## 🌑 Design Concept: Geological Pastry
The core visual metaphor merges **Geology** (permanence, raw texture, darkness) with **Gastronomy** (ephemeral, delicate, refined).

- **Keywords**: `Raw`, `Refined`, `Tactile`, `Atmospheric`
- **Visual Tension**: Rough mineral textures vs. Smooth glass/liquid interfaces.

## 💎 Design System: "Obsidian"

### Color Palette
We utilize a semantic color system based on mineral properties.

| Token | Value | Semantic Usage |
|-------|-------|----------------|
| `bg-void` | `#0a0a0a` | Deepest background, the "void" |
| `bg-surface` | `#1a1a1a` | Elevated surfaces, cards |
| `text-gold` | `#d4af37` | Accents, luxury highlights, active states |
| `text-mineral` | `#a0a0a0` | Secondary text, subtle details |
| `border-faint` | `rgba(255,255,255,0.05)` | Micro-borders, glass edges |

### Typography
- **Display**: *Playfair Display* (or similar Serif) - Used for headings to evoke luxury and editorial print.
- **UI/Body**: *Inter* or *Geist Sans* - Used for readability, technical data, and UI controls.

### Motion Principles (The "Vibe")
Motion is not decoration; it is the *substance* of the interaction.

1.  **Fluidity**: Elements should feel like they are floating in a viscous medium, not vacuum.
    -   *Implementation*: Custom `bezier` curves and spring physics in Framer Motion.
2.  **Parallax Depth**: The user moves *through* the content, not just scroll past it.
    -   *Implementation*: React Three Fiber depth mapping and multi-layer CSS transforms.
3.  **Micro-Interactions**: Every hover, click, and drag should yield tactile feedback (glow, scale, sound).

## 🔮 Vibe Coding Implementation

"Vibe Coding" in Monolith means prioritizing the **feeling** of the application alongside its function.

### Techniques Used
-   **Procedural Noise**: Using GLSL shaders to generate organic, shifting backgrounds that mimic magma or flowing chocolate.
-   **Lighting as UI**: Using CSS shadows and R3F lighting to guide user attention, rather than traditional borders.
-   **Sound Design**: (Planned) Subtle ambient hums and crisp interaction clicks to enhance immersion.

## 📱 Responsiveness
The "Monolith" experience adapts:
-   **Desktop**: Full immersive 3D gallery, horizontal scroll.
-   **Mobile**: Vertical feed, simplified shaders for battery optimization, touch-first gesture controls.

---

*This design system is a living document and evolves with the project.*
