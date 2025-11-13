import { tokens } from './design-tokens';

/**
 * Generates a CSS variable string for a given color path
 * Example: getColor('primary.DEFAULT') => 'hsl(173 80% 30%)'
 */
export function getColor(path: string): string {
  const [category, variant = 'DEFAULT'] = path.split('.');
  return (tokens.colors as any)[category]?.[variant] || '';
}

/**
 * Generates a CSS variable string for a given typography value
 * Example: getTypography('fontSize.2xl') => '1.5rem'
 */
export function getTypography(path: string): string {
  const [category, variant = 'DEFAULT'] = path.split('.');
  return (tokens.typography as any)[category]?.[variant] || '';
}

/**
 * Generates a CSS variable string for a given shadow value
 */
export function getShadow(key: keyof typeof tokens.shadows): string {
  return tokens.shadows[key];
}

/**
 * Generates a CSS variable string for a given border radius value
 */
export function getBorderRadius(key: keyof typeof tokens.borderRadius): string {
  return tokens.borderRadius[key];
}

/**
 * Creates a consistent transition string
 */
export function createTransition(
  properties: string | string[], 
  duration: keyof typeof tokens.transitions.duration = 'normal',
  timing: keyof typeof tokens.transitions.timing = 'inOut'
): string {
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  return `${props} ${tokens.transitions.duration[duration]} ${tokens.transitions.timing[timing]}`;
}

/**
 * Returns a responsive font size with line height
 */
export function responsiveFontSize(
  size: keyof typeof tokens.typography.fontSize,
  lineHeight: keyof typeof tokens.typography.lineHeight = 'normal'
): string {
  return `
    font-size: ${tokens.typography.fontSize[size]};
    line-height: ${tokens.typography.lineHeight[lineHeight]};
  `;
}

/**
 * Returns a consistent focus ring style
 */
export function focusRing(offset = '2px'): string {
  return `
    outline: 2px solid transparent;
    outline-offset: ${offset};
    box-shadow: 0 0 0 ${offset} ${tokens.colors.ring};
  `;
}

/**
 * Returns consistent hover and focus states for interactive elements
 */
export function interactiveStates(
  bgColor: string,
  textColor: string = tokens.colors.text.light,
  borderColor: string = 'transparent'
): string {
  return `
    transition: ${createTransition(['background-color', 'color', 'border-color', 'box-shadow'])};
    
    &:hover {
      background-color: ${bgColor};
      color: ${textColor};
      border-color: ${borderColor};
    }
    
    &:focus-visible {
      ${focusRing()}
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
}
