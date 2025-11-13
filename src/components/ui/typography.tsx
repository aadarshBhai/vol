import React, { forwardRef, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils"; // Make sure this path is correct
import type { HTMLAttributes, ComponentType, ReactNode, ForwardedRef } from "react";

// --------------------
// Type Definitions
// --------------------

type ElementType = keyof JSX.IntrinsicElements | ComponentType<any>;

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "lead"
  | "large"
  | "small"
  | "muted";

type AnimationVariants = Record<
  string,
  {
    hidden: Record<string, unknown>;
    visible: Record<string, unknown>;
  }
>;

// --------------------
// Animation Presets
// --------------------

const animationVariants: AnimationVariants = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  scaleUp: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  none: { hidden: {}, visible: {} },
};

// --------------------
// Typography Props
// --------------------

interface TypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, "color" | "as"> {
  variant?: TypographyVariant;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "justify";
  alignSm?: "left" | "center" | "right" | "justify";
  alignMd?: "left" | "center" | "right" | "justify";
  alignLg?: "left" | "center" | "right" | "justify";
  weight?:
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | string;
  color?: "default" | "primary" | "secondary" | "destructive" | "muted" | string;
  noMargin?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
  truncate?: boolean;
  responsive?: boolean;
  hoverEffect?: "none" | "scale" | "opacity" | "underline";
  animation?: keyof typeof animationVariants;
  animationDelay?: number;
  animationDuration?: number;
  tabIndex?: number;
}

// --------------------
// Font size definitions
// --------------------

const fontSizes = {
  h1: {
    base: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black",
    weight: "font-bold",
    margin: "mb-6 mt-8",
  },
  h2: {
    base: "text-2xl sm:text-3xl md:text-4xl",
    weight: "font-semibold",
    margin: "mb-5 mt-7",
  },
  p: {
    base: "text-base",
    weight: "font-normal",
    margin: "mb-4",
  },
  small: {
    base: "text-xs sm:text-sm",
    weight: "font-medium",
    margin: "mb-2",
  },
  muted: {
    base: "text-xs sm:text-sm text-muted-foreground/80",
    weight: "font-normal",
    margin: "mb-2",
  },
} as const;

// --------------------
// Accessibility helpers
// --------------------

const accessibility = {
  focusRing:
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  reduceMotion: "motion-reduce:transition-none motion-reduce:transform-none",
  highContrast: "contrast-more:contrast-150",
};

// --------------------
// Typography Component
// --------------------

// Define a simplified props type for the motion component
type MotionComponentProps = {
  variants?: any;
  className?: string;
  children?: React.ReactNode;
  tabIndex?: number;
  [key: string]: any;
};

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (props, ref) => {
    const {
      variant = "p",
      as: Component = "p",
      children,
      className,
      align,
      weight,
      color = "default",
      noMargin = false,
      lineClamp,
      truncate = false,
      hoverEffect = "none",
      animation = "none",
      animationDelay,
      animationDuration,
      tabIndex,
      ...rest
    } = props;

    const elementType: ElementType = Component;

    const MotionComponent = useMemo(() => {
      if (typeof elementType === "string" && elementType in motion) {
        const MotionElement = motion[elementType as keyof typeof motion];
        
        // Create a type-safe wrapper component with explicit props
        const WrappedMotion = React.forwardRef<HTMLDivElement, MotionComponentProps>(
          ({
            variants,
            className,
            children,
            style,
            onAnimationStart,
            onDrag,
            onDragStart,
            onDragEnd,
            ...safeProps
          }, forwardedRef) => {
            return (
              <MotionElement
                ref={forwardedRef}
                variants={variants}
                className={className}
                style={style}
                {...safeProps}
              >
                {children}
              </MotionElement>
            );
          }
        );
        
        WrappedMotion.displayName = `Motion${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`;
        return WrappedMotion;
      }
      return motion.div;
    }, [elementType]);

    const variantStyle = fontSizes[variant as keyof typeof fontSizes] || fontSizes.p;

    const hoverEffectClasses = cn(
      "transition-all duration-200",
      hoverEffect === "scale" && "hover:scale-[1.02] active:scale-[0.98]",
      hoverEffect === "opacity" && "opacity-90 hover:opacity-100",
      hoverEffect === "underline" && "hover:underline underline-offset-4"
    );

    const animationProps =
      animation !== "none"
        ? {
            initial: "hidden",
            animate: "visible",
            variants: animationVariants[animation],
            transition: {
              delay: animationDelay ? animationDelay / 1000 : 0,
              duration: animationDuration ? animationDuration / 1000 : 0.3,
            },
          }
        : {};

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          "transition-colors duration-200",
          accessibility.highContrast,
          accessibility.reduceMotion,
          variantStyle.base,
          variantStyle.weight,
          !noMargin && variantStyle.margin,
          align && `text-${align}`,
          color === "primary"
            ? "text-primary"
            : color === "secondary"
            ? "text-secondary"
            : color === "muted"
            ? "text-muted-foreground"
            : "text-foreground",
          hoverEffect !== "none" && hoverEffectClasses,
          lineClamp && `line-clamp-${lineClamp}`,
          truncate && "truncate",
          accessibility.focusRing,
          className
        )}
        tabIndex={tabIndex}
        {...animationProps}
        {...{
          style: rest.style,
          tabIndex: rest.tabIndex,
          title: rest.title,
          role: rest.role,
          'aria-label': rest['aria-label'],
          'aria-labelledby': rest['aria-labelledby'],
          'aria-describedby': rest['aria-describedby']
        }}
      >
        {children}
      </MotionComponent>
    );
  }
);

Typography.displayName = "Typography";
