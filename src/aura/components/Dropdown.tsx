import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export interface AuraDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const AuraDropdown: React.FC<AuraDropdownProps> = ({
  trigger,
  items,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-flex">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          className={`
            absolute top-full mt-1.5 ${align === 'right' ? 'right-0' : 'left-0'} z-50 min-w-[180px]
            py-1.5 rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-1)]
            border border-[var(--aura-border-default)] shadow-lg
            ${className}
          `}
        >
          {items.map((item, idx) => {
            if (item.divider) {
              return <div key={`div-${idx}`} className="my-1 border-t border-[var(--aura-border-subtle)]" />;
            }
            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`
                  w-full px-3 py-1.5 flex items-center justify-between gap-3 text-xs text-left transition-colors
                  ${item.disabled ? 'opacity-40 cursor-not-allowed text-[var(--aura-text-muted)]' : ''}
                  ${!item.disabled && item.destructive ? 'text-[var(--aura-color-danger)] hover:bg-[var(--aura-color-danger)]/10' : ''}
                  ${!item.disabled && !item.destructive ? 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-2)]' : ''}
                `}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="w-3.5 h-3.5 shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[10px] font-mono text-[var(--aura-text-muted)] tracking-wider">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
