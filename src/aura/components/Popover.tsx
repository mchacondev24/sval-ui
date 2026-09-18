import React, { useState, useRef, useEffect } from 'react';

export interface AuraPopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const AuraPopover: React.FC<AuraPopoverProps> = ({
  trigger,
  content,
  title,
  position = 'bottom',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`
            absolute ${positionClasses[position]} z-50 w-72
            p-3.5 rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-1)]
            border border-[var(--aura-border-default)] shadow-lg
            text-xs text-[var(--aura-text-primary)]
            ${className}
          `}
        >
          {title && (
            <div className="font-semibold pb-2 mb-2 border-b border-[var(--aura-border-subtle)] text-[var(--aura-text-primary)]">
              {title}
            </div>
          )}
          <div>{content}</div>
        </div>
      )}
    </div>
  );
};
