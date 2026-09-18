import React from 'react';

export interface AuraProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 to 100
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  indeterminate?: boolean;
}

export const AuraProgress: React.FC<AuraProgressProps> = ({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  indeterminate = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantColors = {
    default: 'bg-[var(--aura-color-primary)]',
    success: 'bg-[var(--aura-color-success)]',
    warning: 'bg-[var(--aura-color-warning)]',
    danger: 'bg-[var(--aura-color-danger)]',
    accent: 'bg-[var(--aura-color-accent)]',
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && !indeterminate && (
        <div className="flex justify-between text-xs font-mono text-[var(--aura-text-secondary)] mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full bg-[var(--aura-surface-3)] rounded-full overflow-hidden ${heightClasses[size]}`}
      >
        <div
          className={`
            h-full rounded-full transition-all duration-300
            ${variantColors[variant]}
            ${indeterminate ? 'w-1/3 animate-pulse' : ''}
          `}
          style={indeterminate ? undefined : { width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export interface AuraCircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent';
  showValue?: boolean;
}

export const AuraCircularProgress: React.FC<AuraCircularProgressProps> = ({
  value = 0,
  size = 48,
  strokeWidth = 4,
  variant = 'default',
  showValue = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  const strokeColors = {
    default: 'var(--aura-color-primary)',
    success: 'var(--aura-color-success)',
    warning: 'var(--aura-color-warning)',
    danger: 'var(--aura-color-danger)',
    accent: 'var(--aura-color-accent)',
  };

  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--aura-surface-3)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColors[variant]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-300"
        />
      </svg>
      {showValue && (
        <span className="absolute text-[11px] font-mono font-semibold text-[var(--aura-text-primary)]">
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
};
