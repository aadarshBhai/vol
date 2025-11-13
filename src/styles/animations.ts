import { Variants } from 'framer-motion';

// Animation presets
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

export const slideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: [0.2, 0.8, 0.2, 1]
    }
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Transition presets
export const transition = {
  default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  quick: { duration: 0.15, ease: 'easeInOut' },
  slow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
} as const;

// Hover and focus styles
export const hoverFocusStyles = {
  // Scale
  scale: 'transform transition-transform duration-200 hover:scale-105 focus:scale-105',
  scaleSm: 'transform transition-transform duration-200 hover:scale-102 focus:scale-102',
  scaleLg: 'transform transition-transform duration-200 hover:scale-110 focus:scale-110',
  
  // Opacity
  opacity: 'transition-opacity duration-200 hover:opacity-90 focus:opacity-90',
  
  // Background
  bg: 'transition-colors duration-200 hover:bg-opacity-90 focus:bg-opacity-90',
  
  // Shadow
  shadow: 'transition-shadow duration-200 hover:shadow-md focus:shadow-md',
  
  // Border
  border: 'transition-colors duration-200 hover:border-opacity-70 focus:border-opacity-70',
  
  // Text
  text: 'transition-colors duration-200 hover:text-opacity-80 focus:text-opacity-80',
} as const;

// Animation variants for list items
export const staggerContainer = (staggerChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      when: 'beforeChildren',
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.8, 0.2, 1]
    }
  }
};

// Responsive animation variants
export const responsiveVariants = (variants: Variants) => ({
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: {
    ...variants,
    hidden: (custom: any) => ({
      ...(typeof variants.hidden === 'function' ? variants.hidden(custom) : variants.hidden),
      ...(custom?.isMobile && {
        opacity: 1, // Skip animation on mobile if needed
        y: 0,
        x: 0
      })
    })
  }
});
