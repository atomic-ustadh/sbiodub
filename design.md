---
name: Emerald & Gold
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#404944'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#302f24'
  on-tertiary: '#ffffff'
  tertiary-container: '#46453a'
  on-tertiary-container: '#b5b2a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e6e3d3'
  tertiary-fixed-dim: '#cac7b8'
  on-tertiary-fixed: '#1c1c13'
  on-tertiary-fixed-variant: '#48473c'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
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
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is built for a vibrant, modern Islamic youth organization. The visual language balances traditional reverence with contemporary energy, aiming to inspire community action and spiritual growth. 

The design style is **Corporate / Modern** with a **Minimalist** foundation, enriched by high-quality photography and geometric motifs. It avoids dated tropes by using "geometric Islamic patterns" as subtle, low-opacity background textures rather than heavy decorative elements. The interface should feel spacious, utilizing heavy whitespace to let the rich brand colors and photography provide the emotional weight. The goal is to evoke a sense of belonging, excellence, and forward-looking optimism.

## Colors

The palette is rooted in a **Deep Emerald Green** (#064E3B), representing growth and Islamic heritage, used primarily for headers, primary actions, and brand-heavy surfaces. **Rich Gold** (#D4AF37) serves as a prestigious accent color for highlights, call-to-actions, and active states. 

**Soft Cream** (#FFFBEB) provides a warm, inviting alternative to pure white for page backgrounds, reducing eye strain and adding a premium feel. **Slate Gray** (#334155) ensures high-contrast readability for body text and UI iconography. Success, error, and warning states should utilize adjusted shades of the emerald and slate to maintain a cohesive atmospheric feel.

## Typography

The typographic hierarchy employs a "Serif for Display, Sans for Utility" strategy. **Playfair Display** is used for headings to provide a sophisticated, editorial, and respectful tone. Its high contrast adds elegance to titles and pull-quotes.

**Plus Jakarta Sans** is selected for body copy and UI labels. It is softer and more approachable than Inter, aligning with the "welcoming" brand pillar. Use `body-lg` for introductory paragraphs to maintain an energetic, "big-picture" feel. All labels and buttons should use the slightly wider tracking of the Sans font to ensure accessibility and a modern tech-forward appearance.

## Layout & Spacing

The layout follows a **Fixed Grid** system for desktop (12 columns) and a fluid model for mobile (4 columns). A generous 8px base unit drives all spacing decisions, favoring larger gaps (`lg` and `xl`) between major sections to promote a sense of "calm and clarity."

Mobile layouts should increase horizontal margins to 24px to provide a "frame" for the content, emphasizing the premium quality of the photography. Content cards should utilize a consistent gutter of 24px to ensure the UI feels organized and systematic.

## Elevation & Depth

This design system utilizes **Tonal Layers** combined with **Ambient Shadows**. Instead of harsh black shadows, elevations use a soft, low-opacity version of the Slate Gray or a tinted Emerald for dark-on-dark components.

- **Level 0 (Base):** Soft Cream background.
- **Level 1 (Cards):** White surfaces with a 1px border of #E2E8F0 (Light Slate) and a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)).
- **Level 2 (Overlays/Modals):** Increased shadow spread and a slight gold-tinted rim to denote high priority.

Geometric patterns should be applied at Level 0 with 3-5% opacity, ensuring they never compete with text readability.

## Shapes

The shape language is **Rounded**, using a 0.5rem (8px) base radius. This strikes a balance between the precision of Islamic geometry and the friendliness of a youth-focused community. 

Buttons and input fields follow the `rounded-md` standard. Large containers and imagery should use `rounded-xl` (24px) to create a modern, "app-like" aesthetic. Circular treatments are reserved exclusively for avatars and specific status indicators.

## Components

### Buttons
- **Primary:** Solid Deep Emerald background, white text. Bold, 16px font.
- **Secondary:** Solid Rich Gold background, Deep Emerald text. Used for "Join" or "Donate" actions.
- **Ghost:** Deep Emerald border (2px), Emerald text. Used for secondary navigation.

### Cards
Cards are the primary container for events and news. They must feature a top-aligned image with `rounded-t-lg`. Content within the card should have a 24px padding. Use the Rich Gold for small "Category" chips (e.g., "Community," "Education") placed inside the cards.

### Input Fields
Fields use a white background with a 1px Slate Gray border. On focus, the border transitions to Deep Emerald with a 2px Gold outer glow (glow-ring).

### Featured Pattern Hero
A specialized component for the landing page that features a 10% opacity geometric star pattern over a Deep Emerald gradient, with centered Playfair Display typography in Gold and White.

### Navigation
A "sticky" top navigation using a semi-transparent Soft Cream with a backdrop-blur (12px), creating a glass-like effect that allows photography to peek through as the user scrolls.