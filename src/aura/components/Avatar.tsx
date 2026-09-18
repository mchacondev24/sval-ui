import React from 'react';

export interface AuraAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const AuraAvatar: React.FC<AuraAvatarProps> = ({
  src,
  alt = '',
  name,
  size = 'md',
  status,
  className = '',
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg font-bold',
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5 bottom-0 right-0',
    sm: 'w-2 h-2 bottom-0 right-0',
    md: 'w-2.5 h-2.5 bottom-0.5 right-0.5',
    lg: 'w-3 h-3 bottom-0.5 right-0.5',
    xl: 'w-3.5 h-3.5 bottom-1 right-1',
  };

  const statusColors = {
    online: 'bg-[var(--aura-color-success)]',
    offline: 'bg-[var(--aura-text-muted)]',
    busy: 'bg-[var(--aura-color-danger)]',
    away: 'bg-[var(--aura-color-warning)]',
  };

  const getInitials = (n?: string) => {
    if (!n) return 'SV';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className={`relative inline-flex shrink-0 select-none ${className}`} {...props}>
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full overflow-hidden flex items-center justify-center
          bg-[var(--aura-surface-3)] text-[var(--aura-text-primary)] font-medium
          border border-[var(--aura-border-default)]
        `}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          aria-label={`Status: ${status}`}
          className={`
            absolute ${statusSize[size]} ${statusColors[status]}
            rounded-full ring-2 ring-[var(--aura-bg)]
          `}
        />
      )}
    </div>
  );
};

export interface AuraAvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  children: React.ReactNode;
}

export const AuraAvatarGroup: React.FC<AuraAvatarGroupProps> = ({
  max = 4,
  children,
  className = '',
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const visible = childrenArray.slice(0, max);
  const remaining = childrenArray.length - max;

  return (
    <div className={`flex items-center -space-x-2 overflow-hidden ${className}`} {...props}>
      {visible}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-[var(--aura-surface-3)] text-[var(--aura-text-secondary)] border-2 border-[var(--aura-bg)] flex items-center justify-center text-[10px] font-semibold">
          +{remaining}
        </div>
      )}
    </div>
  );
};
