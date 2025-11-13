// Design Tokens - Single source of truth for all design values

export const colors = {
  // Primary Colors
  primary: {
    DEFAULT: 'hsl(173 80% 30%)',
    foreground: 'hsl(0 0% 100%)',
    hover: 'hsl(173 80% 25%)',
    light: 'hsl(173 80% 40%)',
    dark: 'hsl(173 80% 20%)',
  },
  
  // Secondary Colors (Gold)
  secondary: {
    DEFAULT: 'hsl(42 58% 58%)',
    foreground: 'hsl(0 0% 100%)',
    hover: 'hsl(42 58% 50%)',
    light: 'hsl(42 58% 65%)',
    dark: 'hsl(42 58% 45%)',
  },
  
  // Accent Colors
  accent: {
    DEFAULT: 'hsl(15 80% 60%)',
    foreground: 'hsl(0 0% 100%)',
    hover: 'hsl(15 80% 55%)',
  },
  
  // Background Colors
  background: {
    light: 'hsl(0 0% 98%)',
    dark: 'hsl(220 20% 10%)',
  },
  
  // Text Colors
  text: {
    primary: 'hsl(220 15% 15%)',
    secondary: 'hsl(220 10% 50%)',
    light: 'hsl(0 0% 100%)',
    dark: 'hsl(220 20% 10%)',
  },
  
  // Status Colors
  success: 'hsl(142 72% 36%)',
  warning: 'hsl(38 92% 50%)',
  error: 'hsl(0 84% 60%)',
  info: 'hsl(199 89% 48%)',
  
  // Border Colors
  border: 'hsl(220 15% 90%)',
  input: 'hsl(220 15% 94%)',
  ring: 'hsl(180 65% 45%)',
};

export const typography = {
  fontFamily: {
    sans: ['var(--font-sans)', 'sans-serif'],
    heading: ['var(--font-heading)', 'serif'],
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

export const borderRadius = {
  none: '0px',
  sm: '0.125rem', // 2px
  DEFAULT: '0.375rem', // 6px
  md: '0.5rem', // 8px
  lg: '0.75rem', // 12px
  xl: '1rem', // 16px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem', // 32px
  full: '9999px',
};

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

export const transitions = {
  duration: {
    fastest: '75ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
  timing: {
    ease: 'ease',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Export all tokens as a single object
export const tokens = {
  colors,
  typography,
  shadows,
  borderRadius,
  zIndex,
  transitions,
};

export default tokens;
