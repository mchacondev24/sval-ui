import React from 'react';

export interface AuraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'soft' | 'outline' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuraCard: React.FC<AuraCardProps> = ({
  children,
  variant = 'solid',
  padding = 'md',
  header,
  footer,
  className = '',
  ...props
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  const variantMap = {
    solid: 'bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] shadow-[0_1px_3px_rgba(0,0,0,0.05)]',
    soft: 'bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)]',
    outline: 'bg-transparent border border-[var(--aura-border-strong)]',
    glass: 'bg-[var(--aura-surface-1)]/80 backdrop-blur-md border border-[var(--aura-border-default)]/60 shadow-sm',
    elevated: 'bg-[var(--aura-surface-1)] border border-[var(--aura-border-subtle)] shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
  };

  return (
    <div
      className={`
        rounded-[var(--aura-radius-lg)] text-[var(--aura-text-primary)] transition-all overflow-hidden
        ${variantMap[variant]}
        ${className}
      `}
      {...props}
    >
      {header && (
        <div className="px-5 py-3.5 border-b border-[var(--aura-border-subtle)] flex items-center justify-between">
          {header}
        </div>
      )}

      <div className={paddingMap[padding]}>
        {children}
      </div>

      {footer && (
        <div className="px-5 py-3 bg-[var(--aura-surface-2)]/60 border-t border-[var(--aura-border-subtle)] flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
};
