---
name: Civic Authority
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#3f4946'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#6f7976'
  outline-variant: '#bec9c5'
  surface-tint: '#0e6a5b'
  primary: '#005145'
  on-primary: '#ffffff'
  primary-container: '#0f6b5c'
  on-primary-container: '#99e8d5'
  inverse-primary: '#86d5c3'
  secondary: '#006b5b'
  on-secondary: '#ffffff'
  secondary-container: '#95f4de'
  on-secondary-container: '#007261'
  tertiary: '#424755'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a5f6d'
  on-tertiary-container: '#d5d9ea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a2f2de'
  primary-fixed-dim: '#86d5c3'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#005144'
  secondary-fixed: '#95f4de'
  secondary-fixed-dim: '#79d7c2'
  on-secondary-fixed: '#00201a'
  on-secondary-fixed-variant: '#005144'
  tertiary-fixed: '#dee2f3'
  tertiary-fixed-dim: '#c2c6d6'
  on-tertiary-fixed: '#161b27'
  on-tertiary-fixed-variant: '#424754'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-unit: 8px
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-8: 32px
  space-10: 40px
  space-12: 48px
  space-16: 64px
  container-max: 1440px
  gutter-desktop: 24px
  gutter-tablet: 16px
  gutter-mobile: 12px
---

## Brand & Style

This design system delivers an authoritative, high-integrity digital platform for public administration, statutory land acquisitions, and predictive workflow management. Combining the procedural rigor of GOV.UK with the refined typographic hierarchy and micro-precision of modern enterprise systems, the design communicates institutional trust, transparency, and bureaucratic finality.

The aesthetic balance reflects civic responsibility: utilitarian, structured, and immaculate. The interface purposefully rejects decorative flourishes, gradients, neon glows, and non-standard animations. Spatial composition relies on a deliberate balance of generous structural whitespace, crisp 1px hairline delimiters, and purposeful data density. Bilingual parity (English and Kannada script) is treated as a structural foundation rather than an afterthought, maintaining strict vertical alignment and optical weight across scripts.

The intended emotional response is absolute certainty, institutional dignity, and effortless navigational clarity for senior revenue officials, nodal project officers, legal authorities, and project managers handling complex public interest proceedings.

## Colors

The palette establishes an institutional standard rooted in deep mineral teals and archival paper neutrals:

- **Primary (`#0F6B5C`)**: Deep State Teal. Used exclusively for primary calls to action, active navigation anchors, primary identification markers, and high-level structural rules.
- **Secondary (`#138270`)**: Muted Jade Teal. Reserved for secondary interactive states, focus rings, hover indicators, and interactive tab highlights.
- **Backgrounds**: The core canvas sits at `#F7F8FA` (Warm Off-White/Parchment Neutral), while discrete operational modules, records tables, and document envelopes sit on pure `#FFFFFF`.
- **Typographic Neutral Hierarchy**:
  - Headings and Key Values: `#1A1F2B` (Deep Slate Charcoal)
  - Standard Body and Data Labels: `#4B5563` (Neutral Charcoal)
  - Form Meta, Auxiliary Codes, and Microcopy: `#6B7280` (Muted Steel Gray)
- **Delimiters & Hairlines**: All card splits, table rows, and grid headers utilize `#E2E8F0` or `#E5E7EB` at a razor-thin 1px weight.
- **State & Machine Learning Health Tokens**:
  - On-Schedule / Approved: `#15803D` (Forest Green, 50-tint container `#F0FDF4`, border `#BBF7D0`)
  - Warning / ML Moderate Risk: `#B45309` (Burnished Amber, 50-tint container `#FFFBEB`, border `#FDE68A`)
  - Escalated Delay / Legal Hold: `#B91C1C` (Crimson Carmine, 50-tint container `#FEF2F2`, border `#FECACA`)

To ensure clarity and prevent visual alarm, individual operational views enforce a strict ceiling: **no screen may contain more than two active status badges/pills at a time**.

## Typography

Typographic hierarchy enforces extreme cognitive discipline: **a maximum of 3 distinct font sizes may appear in any single operational viewport**.

- **Display & Headings**: Set in **Plus Jakarta Sans**, providing clear geometry, contemporary legibility, and architectural precision for survey identifiers, gazette notification headers, and key case indicators.
- **Body & Data Grid Cells**: Set in **Inter**, guaranteeing neutral, high-density legibility for survey numbers, chainage data, compensation matrices, and legal descriptions.
- **Kannada Script Integration**: For regional script toggles (`EN | ಕನ್ನಡ`), regional strings map to system Kannada equivalents (`Nudi`, `Kedage`, or Google Noto Sans Kannada) with a deliberate 1.15x line-height compensation factor to ensure vertical accents and subscript vowels maintain baseline hygiene against English counterparts.
- **Data Display Numbers**: Survey plot numbers, financial award values, and parcel areas must be set with tabular lining figures (`font-variant-numeric: tabular-nums`) to preserve scannability across enterprise ledger tables.

## Layout & Spacing

The architecture operates on an unyielding 8-point structural grid. All padding, margins, gutters, and element heights are mathematically divisible by 8 (with 4px reserved strictly for sub-element padding such as tags and compact badge insets).

### Screen Grid Matrix
- **Desktop (1024px – 1440px+)**: 12-column layout. Max container constraint of `1440px`. 24px margins, 24px column gutters. A permanent 260px administrative left rail anchors operational context (district/taluk selection, SLA milestones, legal stage navigation).
- **Tablet (768px – 1023px)**: 8-column layout. 16px margins, 16px gutters. Left-rail collapses into an off-canvas drawer; top identity header stays locked.
- **Mobile (320px – 767px)**: 4-column layout. 16px margins, 12px gutters. Data tables switch to card-based sequential record disclosures.

### Rhythmic Density
Negative space is deliberately applied to elevate institutional gravity. Primary card modules maintain `32px` interior padding on desktop (`20px` on mobile). Related metadata entries leverage a tight `8px` or `12px` grouping to preserve direct relationship parsing without artificial divider clutter.

## Elevation & Depth

This design system avoids theatrical drop shadows, ambient halos, or blurred translucent glassmorphic surfaces. Visual hierarchy is established via **tonal elevation layering and precise hairline borders**.

- **Level 0 (Base Canvas)**: Flat `#F7F8FA`. Serves as the bedrock workspace backdrop.
- **Level 1 (Structural Cards & Data Panels)**: Flat `#FFFFFF` bound by a razor-sharp 1px border (`#E2E8F0`). Zero ambient blur shadow. Separation is generated strictly by the optical contrast between pure white surfaces and the off-white canvas.
- **Level 2 (Popovers, Language Dropdown & Interactive Menus)**: `#FFFFFF` surface with a crisp 1px `#E2E8F0` border, paired with an understated administrative shadow: `0 4px 6px -1px rgba(26, 31, 43, 0.06), 0 2px 4px -2px rgba(26, 31, 43, 0.04)`.
- **Level 3 (Statutory Modals & Legal Confirmation Sheets)**: `#FFFFFF` backed by an institutional solid-neutral backdrop overlay of `rgba(26, 31, 43, 0.45)`. Shadow: `0 10px 15px -3px rgba(26, 31, 43, 0.08), 0 4px 6px -4px rgba(26, 31, 43, 0.04)`.

Layer separation must rely on structure and border definition rather than aggressive vertical displacement.

## Shapes

The design uses a restrained, tailored geometry (Level 1: Soft). This reinforces bureaucratic precision, structured forms, and official gazette architecture while avoiding sterile harshness.

- **Base Corner Radius (`rounded-sm`)**: 2px for data inputs, tabular cells, and tag containers.
- **Standard UI Radius (`rounded`)**: 4px for action buttons, select fields, and discrete badge elements.
- **Container Radius (`rounded-lg`)**: 6px to 8px maximum for master case record cards, ML risk projection widgets, and modal dialogues.
- **Full Radius (`rounded-full`)**: Strictly prohibited for buttons or structural wrappers; permitted only for circular state indicators (e.g., small 6px pulse dots inside status containers).

## Components

### 1. Header & Civic Identity Bar
- **State Emblem & Title**: Left-aligned Karnataka emblem with formal text: "Government of Karnataka / ಭೂಮಿ ಸೇತು — Land Acquisition Management System". 
- **Language Switcher**: Segmented toggle (`EN | ಕನ್ನಡ`) using a 1px `#E2E8F0` frame, with active language set in `#0F6B5C` on pure white and inactive in `#4B5563`.
- **Dimensions**: Fixed 64px height, `#FFFFFF` background, 1px bottom border `#E2E8F0`.

### 2. Buttons
- **Primary Action**: Solid `#0F6B5C` background, `#FFFFFF` text, 4px corner radius, 14px semi-bold. Height: 40px (Desktop), 44px (Mobile). Hover: `#138270`. Focus ring: 2px offset with `#138270`.
- **Secondary Action**: White `#FFFFFF` background, 1px border `#E2E8F0`, `#1A1F2B` text. Hover: `#F7F8FA`.
- **Destructive/Halt**: White `#FFFFFF` background, 1px border `#FECACA`, `#B91C1C` text. Hover: `#FEF2F2`.

### 3. Machine Learning Delay Risk Badges
- **Constraint**: Strict maximum of 2 status badges rendered per viewport.
- **Low Risk / On Track**: Background `#F0FDF4`, border `#BBF7D0`, text `#15803D`.
- **Medium Delay Risk**: Background `#FFFBEB`, border `#FDE68A`, text `#B45309`.
- **Critical Delay / Legal Alert**: Background `#FEF2F2`, border `#FECACA`, text `#B91C1C`.
- **Geometry**: 4px radius, 12px medium text, 4px vertical / 8px horizontal padding, non-flashing indicator dot (6px) aligned with baseline.

### 4. Input Fields & Select Selectors
- **Default State**: Surface `#FFFFFF`, 1px border `#E2E8F0`, 4px border radius, 40px height, `#1A1F2B` text, 14px size.
- **Label**: Inter 13px semi-bold in `#1A1F2B`, positioned 6px above the field. Mandatory indicator indicated via deep crimson asterisk (`*`).
- **Focus State**: Border `#0F6B5C`, outline 2px solid `rgba(15, 107, 92, 0.15)`. No glow effects.

### 5. Data Tables & Land Parcel Records
- **Grid Layout**: Explicit 1px borders around header and rows.
- **Header Cell**: Background `#F7F8FA`, 12px uppercase label `#4B5563`, 12px vertical padding, 16px horizontal padding.
- **Data Cell**: Background `#FFFFFF`, 14px tabular numbers `#1A1F2B`, 14px vertical padding, 16px horizontal padding.
- **Row Hover**: Flat `#F7F8FA` background transition without elevation change.

### 6. Cards & Case Dossiers
- Surface `#FFFFFF`, 1px solid `#E2E8F0` frame, 6px radius, zero elevation shadow.
- Interior dividers: 1px horizontal rule in `#E5E7EB` separating dossier summary, preliminary notification metadata (Section 11(1)), and financial disbursement metrics.

### 7. Selection Controls (Checkboxes & Radios)
- Standard 16px x 16px dimension, 2px radius (checkbox) or circular (radio), `#E2E8F0` border.
- Checked State: `#0F6B5C` background with crisp white iconography.