import React from 'react';

export interface AuraSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const AuraSkeleton: React.FC<AuraSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded-[var(--aura-radius-xs)]',
    circular: 'rounded-full',
    rectangular: 'rounded-[var(--aura-radius-md)]',
  };

  return (
    <div
      aria-hidden="true"
      className={`
        animate-pulse bg-[var(--aura-surface-3)]
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};
