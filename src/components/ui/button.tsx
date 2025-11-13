import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { tokens } from "@/styles/design-tokens";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary button - Main call-to-action
        primary: `bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-dark 
                focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2
                disabled:bg-primary/50`,
                
        // Secondary button - Secondary actions
        secondary: `bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-dark
                  focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2
                  disabled:bg-secondary/50`,
                  
        // Outline button - Alternative actions
        outline: `border border-input bg-transparent hover:bg-accent/10 hover:text-accent-foreground
                focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2
                disabled:opacity-50 disabled:hover:bg-transparent`,
                
        // Ghost button - Subtle actions
        ghost: `hover:bg-accent/10 hover:text-accent-foreground
              focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2
              disabled:hover:bg-transparent`,
              
        // Link button - Navigation actions
        link: `text-primary underline-offset-4 hover:underline
             focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2
             disabled:opacity-50 disabled:no-underline disabled:hover:text-primary`,
             
        // Destructive button - Destructive actions
        destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90
                   focus-visible:ring-2 focus-visible:ring-destructive/50 focus-visible:ring-offset-2
                   disabled:bg-destructive/50`,
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    fullWidth,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, fullWidth, className }))} 
        ref={ref} 
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {children}
            </span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
