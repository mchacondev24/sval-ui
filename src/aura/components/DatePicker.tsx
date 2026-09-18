import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export interface AuraDatePickerProps {
  value?: string; // YYYY-MM-DD
  onChange?: (date: string) => void;
  label?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

export const AuraDatePicker: React.FC<AuraDatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    const dateStr = `${year}-${month}-${d}`;
    onChange?.(dateStr);
    setIsOpen(false);
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const startOffset = firstDayOfMonth(year, month);

  return (
    <div className={`relative flex flex-col gap-1 text-left ${className}`}>
      {label && (
        <label className="text-xs font-medium text-[var(--aura-text-secondary)]">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-9 px-3 rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] text-xs text-left flex items-center justify-between text-[var(--aura-text-primary)] hover:border-[var(--aura-border-strong)] transition-colors"
      >
        <span className={value ? 'text-[var(--aura-text-primary)] font-mono' : 'text-[var(--aura-text-muted)]'}>
          {value || placeholder}
        </span>
        <CalendarIcon className="w-3.5 h-3.5 text-[var(--aura-text-muted)]" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1.5 z-50 p-3 rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] shadow-xl w-64 select-none">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--aura-border-subtle)]">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] rounded"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold text-[var(--aura-text-primary)]">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] rounded"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-[10px] font-mono text-[var(--aura-text-muted)] mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`offset-${i}`} />
            ))}
            {Array.from({ length: totalDays }).map((_, i) => {
              const d = i + 1;
              const dateFormatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const isSelected = value === dateFormatted;

              return (
                <button
                  key={`day-${d}`}
                  type="button"
                  onClick={() => handleSelectDay(d)}
                  className={`
                    w-7 h-7 rounded-[var(--aura-radius-sm)] flex items-center justify-center text-[11px] font-medium transition-colors
                    ${isSelected 
                      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold' 
                      : 'hover:bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'
                    }
                  `}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
