import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface AuraPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  compact?: boolean;
  showFirstLast?: boolean;
  className?: string;
}

export const AuraPagination: React.FC<AuraPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  compact = false,
  showFirstLast = true,
  className = '',
}) => {
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage, '...', totalPages];
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={`flex items-center gap-1 text-xs select-none ${className}`}
    >
      {showFirstLast && !compact && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          aria-label="Go to first page"
          className="p-1.5 rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className="p-1.5 rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {compact ? (
        <span className="px-3 text-xs text-[var(--aura-text-secondary)] font-mono">
          {currentPage} / {totalPages}
        </span>
      ) : (
        <div className="flex items-center gap-1">
          {getPages().map((page, idx) => {
            if (page === '...') {
              return (
                <span key={`dots-${idx}`} className="px-1 text-[var(--aura-text-muted)]">
                  …
                </span>
              );
            }
            const isCurrent = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                type="button"
                onClick={() => onPageChange(Number(page))}
                aria-current={isCurrent ? 'page' : undefined}
                className={`
                  w-7 h-7 flex items-center justify-center rounded-[var(--aura-radius-sm)] font-medium text-xs transition-colors
                  ${isCurrent
                    ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold shadow-xs'
                    : 'border border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] hover:text-[var(--aura-text-primary)]'
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
        className="p-1.5 rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] disabled:opacity-40 disabled:pointer-events-none"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>

      {showFirstLast && !compact && (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          aria-label="Go to last page"
          className="p-1.5 rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      )}
    </nav>
  );
};
