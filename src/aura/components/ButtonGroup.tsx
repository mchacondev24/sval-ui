import React from 'react';

export interface AuraButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  isAttached?: boolean;
}

export const AuraButtonGroup: React.FC<AuraButtonGroupProps> = ({
  children,
  className = '',
  isAttached = true,
}) => {
  return (
    <div 
      className={`
        inline-flex items-center
        ${isAttached 
          ? '[&>button]:rounded-none [&>button:first-child]:rounded-l-[var(--aura-radius-md)] [&>button:last-child]:rounded-r-[var(--aura-radius-md)] [&>button:not(:first-child)]:-ml-[1px]' 
          : 'gap-2'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export interface AuraDividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export const AuraDivider: React.FC<AuraDividerProps> = ({
  orientation = 'horizontal',
  label,
  className = '',
}) => {
  if (orientation === 'vertical') {
    return <div className={`w-[1px] h-full bg-[var(--aura-border-default)] self-stretch ${className}`} />;
  }

  if (label) {
    return (
      <div className={`flex items-center my-4 w-full ${className}`}>
        <div className="flex-1 h-[1px] bg-[var(--aura-border-default)]" />
        <span className="px-3 text-[11px] font-medium uppercase tracking-wider text-[var(--aura-text-muted)] bg-[var(--aura-bg)]">
          {label}
        </span>
        <div className="flex-1 h-[1px] bg-[var(--aura-border-default)]" />
      </div>
    );
  }

  return <hr className={`w-full border-t border-[var(--aura-border-default)] my-4 ${className}`} />;
};
