import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AuraAccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export const AuraAccordion: React.FC<AuraAccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (allowMultiple) {
      setOpenIds(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-[var(--aura-border-subtle)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] overflow-hidden bg-[var(--aura-surface-1)] ${className}`}>
      {items.map(item => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="transition-colors">
            <button
              type="button"
              onClick={() => toggleItem(item.id, item.disabled)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              className={`
                w-full px-4 py-3 flex items-center justify-between gap-3 text-left text-xs font-semibold
                transition-colors
                ${item.disabled ? 'opacity-40 cursor-not-allowed text-[var(--aura-text-muted)]' : 'hover:bg-[var(--aura-surface-2)] text-[var(--aura-text-primary)]'}
              `}
            >
              <span className="flex-1">{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--aura-text-muted)] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-3.5 pt-1 text-xs text-[var(--aura-text-secondary)] leading-relaxed bg-[var(--aura-surface-1)]">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
