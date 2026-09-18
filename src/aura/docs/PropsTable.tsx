import React from 'react';
import { ComponentProp } from '../../types';

export interface PropsTableProps {
  props: ComponentProp[];
  title?: string;
}

export const PropsTable: React.FC<PropsTableProps> = ({ props, title = 'API Reference' }) => {
  return (
    <div className="my-6 border border-[var(--aura-border-default)] rounded-[var(--aura-radius-lg)] overflow-hidden bg-[var(--aura-surface-1)] shadow-xs">
      <div className="px-4 py-3 bg-[var(--aura-surface-2)]/60 border-b border-[var(--aura-border-subtle)] flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--aura-text-primary)]">
          {title}
        </h4>
        <span className="text-[10px] font-mono text-[var(--aura-text-muted)]">
          {props.length} Properties Defined
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--aura-border-default)] text-[var(--aura-text-muted)] font-mono uppercase text-[10px] bg-[var(--aura-surface-2)]/30">
              <th className="py-2.5 px-4 font-semibold">Prop</th>
              <th className="py-2.5 px-4 font-semibold">Type</th>
              <th className="py-2.5 px-4 font-semibold">Default</th>
              <th className="py-2.5 px-4 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--aura-border-subtle)] font-mono text-[11px]">
            {props.map(p => (
              <tr key={p.name} className="hover:bg-[var(--aura-surface-2)]/40 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-[var(--aura-color-accent)] whitespace-nowrap">
                  {p.name}
                </td>
                <td className="py-2.5 px-4 text-[var(--aura-text-secondary)] whitespace-nowrap max-w-xs overflow-hidden text-ellipsis">
                  <span className="bg-[var(--aura-surface-3)] px-1.5 py-0.5 rounded text-[10px]">
                    {p.type}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-[var(--aura-text-muted)] whitespace-nowrap">
                  {p.default || '—'}
                </td>
                <td className="py-2.5 px-4 text-[var(--aura-text-primary)] font-sans text-xs">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
