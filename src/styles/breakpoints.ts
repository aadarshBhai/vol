/**
 * Breakpoints for responsive design
 * These values should match Tailwind's default breakpoints
 */

export const breakpoints = {
  // Small devices (landscape phones, 576px and up)
  sm: '640px',
  // Medium devices (tablets, 768px and up)
  md: '768px',
  // Large devices (desktops, 1024px and up)
  lg: '1024px',
  // Extra large devices (large desktops, 1280px and up)
  xl: '1280px',
  // Extra extra large devices (larger desktops, 1536px and up)
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Media query helper for responsive styles
 * Usage: ${media.sm`display: none;`}
 */
export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
} as const;

/**
 * Container widths for different breakpoints
 */
export const containerWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Container padding for different breakpoints
 */
export const containerPaddings = {
  base: '1rem',
  sm: '1.5rem',
  lg: '2rem',
} as const;

/**
 * Responsive spacing scale
 * Used for margins, paddings, and gaps
 */
export const spacing = {
  '0': '0',
  '0.5': '0.125rem', // 2px
  '1': '0.25rem',   // 4px
  '1.5': '0.375rem', // 6px
  '2': '0.5rem',    // 8px
  '2.5': '0.625rem', // 10px
  '3': '0.75rem',   // 12px
  '3.5': '0.875rem', // 14px
  '4': '1rem',      // 16px
  '5': '1.25rem',   // 20px
  '6': '1.5rem',    // 24px
  '7': '1.75rem',   // 28px
  '8': '2rem',      // 32px
  '9': '2.25rem',   // 36px
  '10': '2.5rem',   // 40px
  '11': '2.75rem',  // 44px
  '12': '3rem',     // 48px
  '14': '3.5rem',   // 56px
  '16': '4rem',     // 64px
  '20': '5rem',     // 80px
  '24': '6rem',     // 96px
  '28': '7rem',     // 112px
  '32': '8rem',     // 128px
  '36': '9rem',     // 144px
  '40': '10rem',    // 160px
  '44': '11rem',    // 176px
  '48': '12rem',    // 192px
  '52': '13rem',    // 208px
  '56': '14rem',    // 224px
  '60': '15rem',    // 240px
  '64': '16rem',    // 256px
  '72': '18rem',    // 288px
  '80': '20rem',    // 320px
  '96': '24rem',    // 384px
} as const;

export type SpacingSize = keyof typeof spacing;
