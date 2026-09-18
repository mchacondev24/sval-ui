import React from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, X } from 'lucide-react';

export interface AuraAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  description?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
}

export const AuraAlert: React.FC<AuraAlertProps> = ({
  variant = 'info',
  title,
  description,
  children,
  onClose,
  icon,
  className = '',
  ...props
}) => {
  const variantStyles = {
    info: {
      border: 'border-[var(--aura-color-accent)]/30',
      bg: 'bg-[var(--aura-color-accent)]/8',
      text: 'text-[var(--aura-text-primary)]',
      iconColor: 'text-[var(--aura-color-accent)]',
      defaultIcon: <Info className="w-4 h-4" />,
    },
    success: {
      border: 'border-[var(--aura-color-success)]/30',
      bg: 'bg-[var(--aura-color-success)]/8',
      text: 'text-[var(--aura-text-primary)]',
      iconColor: 'text-[var(--aura-color-success)]',
      defaultIcon: <CheckCircle2 className="w-4 h-4" />,
    },
    warning: {
      border: 'border-[var(--aura-color-warning)]/30',
      bg: 'bg-[var(--aura-color-warning)]/8',
      text: 'text-[var(--aura-text-primary)]',
      iconColor: 'text-[var(--aura-color-warning)]',
      defaultIcon: <AlertTriangle className="w-4 h-4" />,
    },
    danger: {
      border: 'border-[var(--aura-color-danger)]/30',
      bg: 'bg-[var(--aura-color-danger)]/8',
      text: 'text-[var(--aura-text-primary)]',
      iconColor: 'text-[var(--aura-color-danger)]',
      defaultIcon: <AlertOctagon className="w-4 h-4" />,
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      role="alert"
      className={`
        relative flex items-start gap-3 p-3.5 rounded-[var(--aura-radius-md)] border text-xs
        ${style.bg} ${style.border} ${style.text} ${className}
      `}
      {...props}
    >
      <div className={`shrink-0 mt-0.5 ${style.iconColor}`}>
        {icon || style.defaultIcon}
      </div>

      <div className="flex-1 min-w-0 pr-2">
        {title && (
          <h5 className="font-semibold text-xs tracking-tight mb-0.5 text-[var(--aura-text-primary)]">
            {title}
          </h5>
        )}
        {description && (
          <p className="text-xs text-[var(--aura-text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
        {children && (
          <div className="text-xs text-[var(--aura-text-secondary)] mt-1">
            {children}
          </div>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="shrink-0 p-1 text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)] rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
