import React, { useId } from 'react';
import { Check, Minus } from 'lucide-react';

export interface AuraCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const AuraCheckbox: React.FC<AuraCheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  const id = useId();

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`inline-flex items-start gap-2.5 cursor-pointer select-none font-sans ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
    >
      <div
        role="checkbox"
        id={id}
        tabIndex={disabled ? -1 : 0}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        className={`
          w-4 h-4 mt-0.5 shrink-0 rounded-[var(--aura-radius-sm)] border transition-all flex items-center justify-center outline-none
          focus-visible:ring-2 focus-visible:ring-[var(--aura-color-primary)]/20 focus-visible:border-[var(--aura-color-primary)]
          ${(checked || indeterminate)
            ? 'bg-[var(--aura-color-primary)] border-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]'
            : 'bg-[var(--aura-surface-1)] border-[var(--aura-border-strong)] hover:border-[var(--aura-color-primary)]'
          }
        `}
      >
        {indeterminate ? (
          <Minus className="w-3 h-3 stroke-[3]" />
        ) : checked ? (
          <Check className="w-3 h-3 stroke-[3]" />
        ) : null}
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-[var(--aura-text-primary)] cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-[var(--aura-text-muted)]">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
