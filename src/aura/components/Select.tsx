import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface AuraSelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  error?: string;
}

export const AuraSelect: React.FC<AuraSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  disabled = false,
  searchable = false,
  className = '',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const selectId = useId();

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (opt.description && opt.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div ref={containerRef} className={`w-full flex flex-col gap-1.5 text-left font-sans relative ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold tracking-wide text-[var(--aura-text-secondary)] uppercase select-none"
        >
          {label}
        </label>
      )}

      <button
        id={selectId}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          w-full flex items-center justify-between text-sm h-10 px-3.5
          rounded-[var(--aura-radius-md)]
          bg-[var(--aura-surface-1)]
          border border-[var(--aura-border-default)]
          text-[var(--aura-text-primary)]
          transition-all outline-none
          ${isOpen ? 'border-[var(--aura-color-primary)] ring-2 ring-[var(--aura-color-primary)]/10' : ''}
          ${error ? 'border-[var(--aura-color-danger)]' : ''}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon}
          <span className={selectedOption ? 'font-medium' : 'text-[var(--aura-text-muted)]'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown className={`w-4 h-4 text-[var(--aura-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 p-1.5
            bg-[var(--aura-surface-1)]
            border border-[var(--aura-border-default)]
            rounded-[var(--aura-radius-md)]
            shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {searchable && (
            <div className="p-1 mb-1 border-b border-[var(--aura-border-subtle)] relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--aura-text-muted)]" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full pl-7 pr-2 py-1 text-xs bg-transparent border-none outline-none text-[var(--aura-text-primary)] placeholder:text-[var(--aura-text-muted)]"
                autoFocus
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="py-3 text-center text-xs text-[var(--aura-text-muted)]">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`
                    flex items-center justify-between px-3 py-2 text-xs rounded-[var(--aura-radius-sm)] cursor-pointer select-none transition-colors
                    ${isSelected ? 'bg-[var(--aura-surface-3)] font-semibold text-[var(--aura-text-primary)]' : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] hover:text-[var(--aura-text-primary)]'}
                  `}
                >
                  <div className="flex items-center gap-2 truncate">
                    {option.icon}
                    <div>
                      <div>{option.label}</div>
                      {option.description && (
                        <div className="text-[10px] text-[var(--aura-text-muted)] font-normal">{option.description}</div>
                      )}
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[var(--aura-color-accent)] shrink-0" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
