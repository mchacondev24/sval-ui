import React from 'react';
import { X } from 'lucide-react';

export interface AuraChipProps {
  label: string;
  variant?: 'default' | 'primary' | 'outline' | 'subtle';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

export const AuraChip: React.FC<AuraChipProps> = ({
  label,
  variant = 'default',
  size = 'md',
  icon,
  onRemove,
  onClick,
  selected = false,
  disabled = false,
  className = '',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  const variantClasses = {
    default: selected 
      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]' 
      : 'bg-[var(--aura-surface-2)] text-[var(--aura-text-primary)] border border-[var(--aura-border-subtle)] hover:border-[var(--aura-border-default)]',
    primary: 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]',
    outline: selected
      ? 'border border-[var(--aura-color-primary)] text-[var(--aura-color-primary)] bg-[var(--aura-color-primary)]/10'
      : 'border border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]',
    subtle: 'bg-[var(--aura-surface-3)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]',
  }[variant];

  return (
    <span
      onClick={!disabled && onClick ? onClick : undefined}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium transition-all select-none
        ${onClick && !disabled ? 'cursor-pointer' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${sizeClasses}
        ${variantClasses}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onRemove();
          }}
          className="hover:opacity-75 focus:outline-none p-0.5 rounded-full transition-opacity"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
