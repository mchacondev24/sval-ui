import React from 'react';

export interface AuraSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
  unit?: string;
  className?: string;
}

export const AuraSlider: React.FC<AuraSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
  showValue = true,
  unit = '',
  className = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="font-medium text-[var(--aura-text-secondary)]">{label}</span>}
          {showValue && (
            <span className="font-mono text-[11px] font-semibold text-[var(--aura-text-primary)]">
              {value}{unit}
            </span>
          )}
        </div>
      )}

      <div className="relative flex items-center w-full h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-[var(--aura-surface-3)] rounded-full appearance-none cursor-pointer accent-[var(--aura-color-primary)] disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, var(--aura-color-primary) 0%, var(--aura-color-primary) ${percentage}%, var(--aura-surface-3) ${percentage}%, var(--aura-surface-3) 100%)`
          }}
        />
      </div>
    </div>
  );
};
