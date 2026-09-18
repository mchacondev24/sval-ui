import React, { useId } from 'react';
import { X, AlertCircle } from 'lucide-react';

export interface AuraInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  onClear?: () => void;
  isClearable?: boolean;
}

export const AuraInput = React.forwardRef<HTMLInputElement, AuraInputProps>(({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  onClear,
  isClearable = false,
  className = '',
  disabled,
  value,
  id: customId,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const sizeClasses = {
    sm: 'text-xs h-8 px-2.5 rounded-[var(--aura-radius-sm)]',
    md: 'text-sm h-10 px-3.5 rounded-[var(--aura-radius-md)]',
    lg: 'text-base h-12 px-4 rounded-[var(--aura-radius-lg)]',
  };

  const hasValue = value !== undefined && value !== '';

  return (
    <div className="w-full flex flex-col gap-1.5 text-left font-sans">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wide text-[var(--aura-text-secondary)] uppercase select-none"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 text-[var(--aura-text-muted)] pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`
            w-full transition-all outline-none font-normal
            bg-[var(--aura-surface-1)]
            text-[var(--aura-text-primary)]
            placeholder:text-[var(--aura-text-muted)]
            border
            ${error ? 'border-[var(--aura-color-danger)] focus:ring-2 focus:ring-[var(--aura-color-danger)]/20' : 'border-[var(--aura-border-default)] focus:border-[var(--aura-color-primary)] focus:ring-2 focus:ring-[var(--aura-color-primary)]/10'}
            disabled:bg-[var(--aura-surface-2)] disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-9' : ''}
            ${(rightIcon || isClearable) ? 'pr-9' : ''}
            ${sizeClasses[size]}
            ${className}
          `}
          {...props}
        />

        {isClearable && hasValue && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)] p-0.5 rounded transition-colors"
            aria-label="Clear input"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {rightIcon && (!isClearable || !hasValue) && (
          <div className="absolute right-3 text-[var(--aura-text-muted)] pointer-events-none flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <div id={errorId} className="flex items-center gap-1.5 text-xs text-[var(--aura-color-danger)]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : hint ? (
        <p id={hintId} className="text-xs text-[var(--aura-text-muted)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

AuraInput.displayName = 'AuraInput';
