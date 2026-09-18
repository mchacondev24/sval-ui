import React from 'react';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface AuraRadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  layout?: 'standard' | 'card';
  className?: string;
}

export const AuraRadioGroup: React.FC<AuraRadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  orientation = 'vertical',
  layout = 'standard',
  className = '',
}) => {
  return (
    <div
      role="radiogroup"
      className={`
        flex gap-2.5
        ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
        ${className}
      `}
    >
      {options.map(opt => {
        const isChecked = value === opt.value;
        const isDisabled = opt.disabled;

        if (layout === 'card') {
          return (
            <label
              key={opt.value}
              className={`
                relative flex items-start gap-3 p-3.5 rounded-[var(--aura-radius-md)] border cursor-pointer select-none transition-all
                ${isChecked 
                  ? 'border-[var(--aura-color-primary)] bg-[var(--aura-surface-2)] ring-1 ring-[var(--aura-color-primary)]' 
                  : 'border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] hover:bg-[var(--aura-surface-2)]'
                }
                ${isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
              `}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div
                className={`
                  w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors
                  ${isChecked 
                    ? 'border-[var(--aura-color-primary)] bg-[var(--aura-color-primary)]' 
                    : 'border-[var(--aura-border-strong)] bg-transparent'
                  }
                `}
              >
                {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-[var(--aura-color-primary-foreground)]" />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[var(--aura-text-primary)]">
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-[11px] text-[var(--aura-text-secondary)] mt-0.5">
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        }

        return (
          <label
            key={opt.value}
            className={`
              inline-flex items-center gap-2.5 cursor-pointer select-none text-xs
              ${isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
            `}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div
              className={`
                w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors
                ${isChecked 
                  ? 'border-[var(--aura-color-primary)] bg-[var(--aura-color-primary)]' 
                  : 'border-[var(--aura-border-strong)] bg-transparent'
                }
              `}
            >
              {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-[var(--aura-color-primary-foreground)]" />}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[var(--aura-text-primary)] font-medium">
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-[11px] text-[var(--aura-text-muted)]">
                  {opt.description}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};
