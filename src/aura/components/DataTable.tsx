import React, { useState, useMemo } from 'react';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Download, 
  Filter, 
  MoreHorizontal, 
  CheckSquare, 
  Square, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { AuraBadge } from './Badge';
import { AuraButton } from './Button';
import { AuraInput } from './Input';
import { EnterpriseOrder } from '../../types';

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

export interface AuraDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyField: keyof T;
  searchPlaceholder?: string;
  title?: string;
  description?: string;
  onRefresh?: () => void;
  pageSize?: number;
}

export function AuraDataTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  searchPlaceholder = 'Search records...',
  title,
  description,
  onRefresh,
  pageSize = 6,
}: AuraDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<any>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting
  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortKey(null);
        setSortDirection('asc');
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Filtered & Sorted Data
  const processedData = useMemo(() => {
    let result = [...data];

    // Global Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(val => 
          val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        )
      );
    }

    // Sort
    if (sortKey) {
      result.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const comp = String(valA).localeCompare(String(valB));
        return sortDirection === 'asc' ? comp : -comp;
      });
    }

    return result;
  }, [data, searchTerm, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  // Selection
  const allPageIds = paginatedData.map(d => d[keyField]);
  const isAllSelected = allPageIds.length > 0 && allPageIds.every(id => selectedIds.has(id));

  const toggleSelectAll = () => {
    const next = new Set(selectedIds);
    if (isAllSelected) {
      allPageIds.forEach(id => next.delete(id));
    } else {
      allPageIds.forEach(id => next.add(id));
    }
    setSelectedIds(next);
  };

  const toggleSelectRow = (id: any) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const exportAsCsv = () => {
    if (!processedData.length) return;
    const headers = columns.map(c => c.header).join(',');
    const rows = processedData.map(item => 
      columns.map(c => `"${String(item[c.key as string] ?? '')}"`).join(',')
    ).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura-table-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          {title && (
            <h3 className="text-base font-semibold text-[var(--aura-text-primary)]">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-[var(--aura-text-muted)]">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <AuraInput
              size="sm"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              leftIcon={<Search className="w-3.5 h-3.5" />}
              isClearable
              onClear={() => setSearchTerm('')}
            />
          </div>

          {onRefresh && (
            <AuraButton variant="outline" size="sm" onClick={onRefresh} aria-label="Refresh table">
              <RefreshCw className="w-3.5 h-3.5" />
            </AuraButton>
          )}

          <AuraButton variant="outline" size="sm" onClick={exportAsCsv} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export
          </AuraButton>
        </div>
      </div>

      {/* Selected Action Banner */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)] rounded-[var(--aura-radius-md)] text-xs text-[var(--aura-text-primary)]">
          <span className="font-medium">
            {selectedIds.size} {selectedIds.size === 1 ? 'row' : 'rows'} selected
          </span>
          <div className="flex items-center gap-2">
            <AuraButton size="sm" variant="ghost" onClick={() => setSelectedIds(new Set())}>
              Clear selection
            </AuraButton>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[var(--aura-border-default)] bg-[var(--aura-surface-2)]/60 text-[var(--aura-text-secondary)] font-semibold uppercase tracking-wider text-[11px]">
              <th className="w-10 px-4 py-3">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="flex items-center text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]"
                >
                  {isAllSelected ? (
                    <CheckSquare className="w-4 h-4 text-[var(--aura-color-accent)]" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  style={{ width: col.width }}
                  className={`px-4 py-3 select-none ${col.sortable ? 'cursor-pointer hover:text-[var(--aura-text-primary)]' : ''}`}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-[var(--aura-text-muted)]">
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-[var(--aura-color-accent)]" /> : <ArrowDown className="w-3 h-3 text-[var(--aura-color-accent)]" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 opacity-40 hover:opacity-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="w-12 px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--aura-border-subtle)]">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="px-4 py-12 text-center text-xs text-[var(--aura-text-muted)]">
                  No records match your query
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const id = row[keyField];
                const isSelected = selectedIds.has(id);
                return (
                  <tr
                    key={String(id)}
                    className={`
                      transition-colors
                      ${isSelected ? 'bg-[var(--aura-surface-2)]/70' : 'hover:bg-[var(--aura-surface-2)]/40'}
                    `}
                  >
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSelectRow(id)}
                        className="flex items-center text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[var(--aura-color-accent)]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {columns.map(col => (
                      <td key={String(col.key)} className="px-4 py-3 text-[var(--aura-text-primary)] whitespace-nowrap">
                        {col.render ? col.render(row) : String(row[col.key as string] ?? '')}
                      </td>
                    ))}

                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="p-1 rounded text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-3)] transition-colors"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between text-xs text-[var(--aura-text-secondary)] px-1">
        <span>
          Showing {processedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} records
        </span>

        <div className="flex items-center gap-1.5">
          <AuraButton
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </AuraButton>

          <span className="px-2 font-medium text-[var(--aura-text-primary)]">
            {currentPage} / {totalPages}
          </span>

          <AuraButton
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </AuraButton>
        </div>
      </div>
    </div>
  );
}
