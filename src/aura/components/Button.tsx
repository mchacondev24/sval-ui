import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export interface AuraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const AuraButton = React.forwardRef<HTMLButtonElement, AuraButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 h-8 gap-1.5 rounded-[var(--aura-radius-sm)]",
    md: "text-sm px-4 py-2 h-10 gap-2 rounded-[var(--aura-radius-md)]",
    lg: "text-base px-5 py-2.5 h-12 gap-2.5 rounded-[var(--aura-radius-lg)]",
  };

  const variantStyles = {
    primary: "bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] hover:bg-[var(--aura-color-primary-hover)] active:scale-[0.98] focus-visible:ring-[var(--aura-color-primary)] shadow-sm",
    secondary: "bg-[var(--aura-surface-2)] text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-3)] active:scale-[0.98] border border-[var(--aura-border-default)]",
    outline: "border border-[var(--aura-border-strong)] text-[var(--aura-text-primary)] bg-transparent hover:bg-[var(--aura-surface-2)] active:scale-[0.98]",
    ghost: "text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-2)] active:scale-[0.98]",
    subtle: "bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-3)]",
    destructive: "bg-[var(--aura-color-danger)] text-white hover:opacity-90 active:scale-[0.98] shadow-sm",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      <span className="truncate">{children}</span>

      {!isLoading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
});

AuraButton.displayName = 'AuraButton';
