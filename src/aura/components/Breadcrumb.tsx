import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface AuraBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const AuraBreadcrumb: React.FC<AuraBreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-3.5 h-3.5 text-[var(--aura-text-muted)]" />,
  className = '',
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs font-medium ${className}`}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <span className="shrink-0">{separator}</span>}
              {isLast || item.active ? (
                <span
                  aria-current="page"
                  className="text-[var(--aura-text-primary)] font-semibold flex items-center gap-1"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  className="text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] transition-colors flex items-center gap-1"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
