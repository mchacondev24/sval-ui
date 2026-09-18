import React, { useId } from 'react';
import { motion } from 'motion/react';

export interface AuraSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AuraSwitch: React.FC<AuraSwitchProps> = ({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const id = useId();

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  const sizes = {
    sm: { track: 'w-8 h-4 p-0.5', thumb: 'w-3 h-3', translate: 16 },
    md: { track: 'w-11 h-6 p-0.5', thumb: 'w-5 h-5', translate: 20 },
    lg: { track: 'w-14 h-7 p-1', thumb: 'w-5 h-5', translate: 28 },
  };

  const curSize = sizes[size];

  return (
    <div
      className={`inline-flex items-center gap-3 cursor-pointer select-none font-sans ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      onClick={handleToggle}
    >
      <div
        role="switch"
        id={id}
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex items-center shrink-0 rounded-full transition-colors duration-200 outline-none
          focus-visible:ring-2 focus-visible:ring-[var(--aura-color-primary)]/20 focus-visible:border-[var(--aura-color-primary)]
          ${checked ? 'bg-[var(--aura-color-primary)]' : 'bg-[var(--aura-surface-3)]'}
          ${curSize.track}
        `}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
          animate={{ x: checked ? curSize.translate : 0 }}
          className={`
            inline-block rounded-full bg-white shadow-sm pointer-events-none
            ${curSize.thumb}
          `}
        />
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
