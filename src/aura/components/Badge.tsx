import React from 'react';

export interface AuraBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const AuraBadge: React.FC<AuraBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const sizeMap = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantMap = {
    neutral: 'bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] border border-[var(--aura-border-default)]',
    accent: 'bg-[var(--aura-color-accent)]/10 text-[var(--aura-color-accent)] border border-[var(--aura-color-accent)]/20',
    success: 'bg-[var(--aura-color-success)]/10 text-[var(--aura-color-success)] border border-[var(--aura-color-success)]/20',
    warning: 'bg-[var(--aura-color-warning)]/10 text-[var(--aura-color-warning)] border border-[var(--aura-color-warning)]/20',
    danger: 'bg-[var(--aura-color-danger)]/10 text-[var(--aura-color-danger)] border border-[var(--aura-color-danger)]/20',
    outline: 'bg-transparent text-[var(--aura-text-secondary)] border border-[var(--aura-border-strong)]',
  };

  const dotColorMap = {
    neutral: 'bg-[var(--aura-text-muted)]',
    accent: 'bg-[var(--aura-color-accent)]',
    success: 'bg-[var(--aura-color-success)]',
    warning: 'bg-[var(--aura-color-warning)]',
    danger: 'bg-[var(--aura-color-danger)]',
    outline: 'bg-[var(--aura-text-primary)]',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center font-medium rounded-full select-none whitespace-nowrap
        ${sizeMap[size]}
        ${variantMap[variant]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColorMap[variant]}`} />
      )}
      <span>{children}</span>
    </span>
  );
};
