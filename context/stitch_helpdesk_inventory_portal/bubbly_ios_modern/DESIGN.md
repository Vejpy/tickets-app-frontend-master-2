---
name: Bubbly iOS Modern
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#43474c'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#74777c'
  outline-variant: '#c4c7cc'
  surface-tint: '#4e6072'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#091d2c'
  on-primary-container: '#738699'
  inverse-primary: '#b6c9dd'
  secondary: '#854d63'
  on-secondary: '#ffffff'
  secondary-container: '#ffb8d1'
  on-secondary-container: '#7c455b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1f'
  on-tertiary-container: '#828488'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e5fa'
  primary-fixed-dim: '#b6c9dd'
  on-primary-fixed: '#091d2c'
  on-primary-fixed-variant: '#37495a'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#f9b3cc'
  on-secondary-fixed: '#360b1f'
  on-secondary-fixed-variant: '#6a364b'
  tertiary-fixed: '#e2e2e7'
  tertiary-fixed-dim: '#c6c6cb'
  on-tertiary-fixed: '#1a1c1f'
  on-tertiary-fixed-variant: '#45474b'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 48px
  safe-margin: 20px
  gutter: 16px
---

## Brand & Style
This design system is built on the principles of **Minimalism** infused with **Tactile** playfulness. It targets a modern mobile-first audience that appreciates the polish of native iOS interfaces but seeks a warmer, more approachable personality. The aesthetic is "bubbly"—meaning forms are full, soft, and inviting rather than clinical.

The UI should evoke a sense of lightness and responsiveness. By using heavy whitespace and ultra-smooth "squircle" geometries, the design system creates a premium, high-fidelity environment that feels like a physical object made of polished glass and soft plastic.

## Colors
The palette is rooted in a "Pure White" foundation to maximize clarity and perceived lightness. 
- **Primary:** A deep, high-contrast dark blue (#001221) is used for all primary text and critical iconography to ensure maximum readability.
- **Secondary (Accent):** A soft, playful pink (#FFB8D1) is reserved for decorative underlines and subtle brand moments, providing warmth without overwhelming the interface.
- **Tertiary:** A standard iOS-style light gray (#F2F2F7) is used for secondary backgrounds, capsule tracks, and inactive states.
- **Background:** The canvas is strictly #FFFFFF.

## Typography
This design system utilizes **Plus Jakarta Sans** for its friendly, rounded terminals that complement the "bubbly" aesthetic. 

**Headings:** Use H1 and H2 sparingly. The "Soft Pink Underline" should be applied to the last word or the entire phrase of an H1, rendered as a 6px thick stroke positioned behind the text (baseline offset) with rounded caps.
**Body:** Text should maintain high contrast against the white background. Use the "Dark Blue" primary color for all body copy to achieve a crisp, high-fidelity look.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous safe-area margins (20px) to mimic native iOS app behavior. 

Spacing is governed by an 8px rhythm. Components should use "md" (20px) for internal padding to maintain the "bubbly" feel—dense layouts should be avoided. Use generous vertical "lg" (32px) spacing between sections to allow the white background to act as a separator, reducing the need for horizontal rules.

## Elevation & Depth
The design system avoids harsh borders, relying instead on **Ambient Shadows** and tonal layering. 

- **Primary Elevation:** White boxes use a very soft, diffused shadow: `0px 10px 30px rgba(0, 0, 0, 0.04)`. This creates a "floating" effect without looking heavy.
- **Floating Capsule:** The bottom navbar is a floating element with a higher elevation shadow: `0px 15px 35px rgba(0, 0, 0, 0.08)`.
- **Interaction:** Upon press, elements should slightly scale down (0.97x) rather than changing color, emphasizing the "squishy" physical nature of the UI.

## Shapes
The "Squircle" is the fundamental geometric unit of this design system. 
- All cards and primary containers must use `rounded-xl` (1.5rem / 24px) to achieve the bubbly look.
- Small elements like buttons and input fields use `rounded-lg` (1rem / 16px).
- Navigation bars and search fields should be fully rounded (pill-shaped) to distinguish them from content containers.

## Components
- **Floating Capsule Navbar:** A pill-shaped container centered at the bottom of the screen. Active states are indicated by a subtle light gray (#F2F2F7) circular background behind the icon.
- **Buttons:** Primary buttons are solid dark blue with white text. Secondary buttons are pure white with a soft shadow (no border). All buttons must have a height of at least 50px for touch ergonomics.
- **Cards (White Boxes):** Content is housed in white squircles. The shadow provides the boundary; do not use strokes.
- **Inputs:** Fields are light gray (#F2F2F7) with no border. On focus, they remain gray but can gain a subtle 1px stroke of the primary color.
- **Chips:** Fully rounded (pill) shapes using the tertiary gray background. Text is primary dark blue.
- **Lists:** Use a "In-set" style where list items are grouped inside a single squircle container, separated by a 0.5px subtle gray line that doesn't reach the edges of the container.