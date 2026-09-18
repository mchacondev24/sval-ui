import React, { forwardRef, TextareaHTMLAttributes } from 'react';

export interface AuraTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  characterLimit?: number;
}

export const AuraTextarea = forwardRef<HTMLTextAreaElement, AuraTextareaProps>(({
  label,
  hint,
  error,
  characterLimit,
  className = '',
  id,
  value,
  disabled,
  rows = 4,
  ...props
}, ref) => {
  const generatedId = id || (label ? `sval-textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left font-sans">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={generatedId} className="text-xs font-semibold tracking-tight text-[var(--aura-text-primary)]">
            {label}
          </label>
          {characterLimit && (
            <span className={`text-[10px] font-mono ${currentLength > characterLimit ? 'text-[var(--aura-color-danger)] font-bold' : 'text-[var(--aura-text-muted)]'}`}>
              {currentLength} / {characterLimit}
            </span>
          )}
        </div>
      )}

      <textarea
        ref={ref}
        id={generatedId}
        value={value}
        disabled={disabled}
        rows={rows}
        className={`
          w-full px-3 py-2 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-1)]
          border transition-all duration-150 resize-y
          text-[var(--aura-text-primary)] placeholder-[var(--aura-text-muted)]
          focus:outline-none
          ${error 
            ? 'border-[var(--aura-color-danger)] focus:ring-1 focus:ring-[var(--aura-color-danger)]' 
            : 'border-[var(--aura-border-default)] focus:border-[var(--aura-color-primary)]'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed bg-[var(--aura-surface-2)]' : ''}
          ${className}
        `}
        {...props}
      />

      {error ? (
        <span className="text-[11px] text-[var(--aura-color-danger)] flex items-center gap-1 font-medium">
          <span className="inline-block w-1 h-1 rounded-full bg-[var(--aura-color-danger)]" />
          {error}
        </span>
      ) : hint ? (
        <span className="text-[11px] text-[var(--aura-text-muted)]">
          {hint}
        </span>
      ) : null}
    </div>
  );
});

AuraTextarea.displayName = 'AuraTextarea';
