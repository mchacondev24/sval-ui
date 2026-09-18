import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  MousePointer, 
  CheckSquare, 
  Menu, 
  Maximize2, 
  Sliders, 
  Calendar, 
  Table, 
  MessageSquare, 
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { AuraCard } from '../components/Card';
import { AuraInput } from '../components/Input';
import { AuraSwitch } from '../components/Switch';
import { AuraCheckbox } from '../components/Checkbox';
import { AuraAvatar } from '../components/Avatar';
import { AuraProgress } from '../components/Progress';
import { AuraSpinner } from '../components/Spinner';
import { AuraAlert } from '../components/Alert';
import { AuraBreadcrumb } from '../components/Breadcrumb';

export interface CatalogItem {
  id: string;
  name: string;
  category: 'Form Controls' | 'Navigation' | 'Layout' | 'Buttons & Indicators' | 'Popups & Modals' | 'Data';
  description: string;
  tag?: string;
  renderMiniPreview: () => React.ReactNode;
}

export interface ComponentCatalogViewProps {
  onSelectComponent: (componentId: string) => void;
  onNavigateToCheatsheet: () => void;
}

export const ComponentCatalogView: React.FC<ComponentCatalogViewProps> = ({
  onSelectComponent,
  onNavigateToCheatsheet,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const catalogItems: CatalogItem[] = [
    // BUTTONS & INDICATORS
    {
      id: 'cmp-button',
      name: 'Button',
      category: 'Buttons & Indicators',
      description: 'Tactile interactive trigger with subtle scale microinteractions and loading states.',
      tag: 'Core',
      renderMiniPreview: () => (
        <div className="flex items-center gap-2">
          <AuraButton variant="primary" size="sm">Primary</AuraButton>
          <AuraButton variant="outline" size="sm">Outline</AuraButton>
        </div>
      ),
    },
    {
      id: 'cmp-badge',
      name: 'Badge',
      category: 'Buttons & Indicators',
      description: 'Compact status tag for metadata and state signaling.',
      tag: 'Core',
      renderMiniPreview: () => (
        <div className="flex items-center gap-2">
          <AuraBadge variant="success" size="sm">Active</AuraBadge>
          <AuraBadge variant="neutral" size="sm">v2.4.0</AuraBadge>
        </div>
      ),
    },
    {
      id: 'cmp-progress',
      name: 'Progress',
      category: 'Buttons & Indicators',
      description: 'Linear and circular percentage bars for loading processes.',
      renderMiniPreview: () => (
        <div className="w-32 flex flex-col gap-1">
          <AuraProgress value={65} variant="primary" size="sm" />
        </div>
      ),
    },
    {
      id: 'cmp-spinner',
      name: 'Spinner',
      category: 'Buttons & Indicators',
      description: 'Lightweight CSS rotating indicator with zero layout shift.',
      renderMiniPreview: () => (
        <div className="flex items-center gap-3">
          <AuraSpinner size="sm" />
          <AuraSpinner size="md" />
        </div>
      ),
    },

    // FORM CONTROLS
    {
      id: 'cmp-input',
      name: 'Input',
      category: 'Form Controls',
      description: 'Precision text field with integrated labels, error states, and clear triggers.',
      tag: 'Core',
      renderMiniPreview: () => (
        <div className="w-full max-w-[180px]">
          <AuraInput placeholder="Stockholm..." defaultValue="Sval UI" />
        </div>
      ),
    },
    {
      id: 'cmp-select',
      name: 'Select',
      category: 'Form Controls',
      description: 'Refined native dropdown selector with custom arrow glyph.',
      renderMiniPreview: () => (
        <select className="h-8 px-2 text-xs rounded bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)]">
          <option>Option 01</option>
          <option>Option 02</option>
        </select>
      ),
    },
    {
      id: 'cmp-checkbox',
      name: 'Checkbox',
      category: 'Form Controls',
      description: 'Accessible check control with keyboard focus indicator.',
      renderMiniPreview: () => (
        <div className="flex items-center gap-2">
          <AuraCheckbox label="Option" checked onChange={() => {}} />
        </div>
      ),
    },
    {
      id: 'cmp-switch',
      name: 'Switch',
      category: 'Form Controls',
      description: 'Smooth sliding toggle for instant binary state switching.',
      renderMiniPreview: () => (
        <AuraSwitch checked onChange={() => {}} />
      ),
    },
    {
      id: 'cmp-slider',
      name: 'Slider',
      category: 'Form Controls',
      description: 'Precision range slider for numeric adjustments.',
      renderMiniPreview: () => (
        <div className="w-28">
          <input type="range" className="w-full accent-[var(--aura-color-primary)]" defaultValue={60} />
        </div>
      ),
    },
    {
      id: 'cmp-datepicker',
      name: 'DatePicker',
      category: 'Form Controls',
      description: 'Calendar date selection input with ISO format validation.',
      renderMiniPreview: () => (
        <div className="flex items-center gap-1.5 text-xs text-[var(--aura-text-muted)] font-mono">
          <Calendar className="w-3.5 h-3.5 text-[var(--aura-color-primary)]" />
          <span>2026-09-16</span>
        </div>
      ),
    },

    // LAYOUT
    {
      id: 'cmp-card',
      name: 'Card',
      category: 'Layout',
      description: 'Versatile surface container with mathematical 1px border contrast.',
      tag: 'Surface',
      renderMiniPreview: () => (
        <div className="p-2.5 rounded bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[11px] text-[var(--aura-text-secondary)]">
          Nordic Surface
        </div>
      ),
    },
    {
      id: 'cmp-accordion',
      name: 'Accordion',
      category: 'Layout',
      description: 'Collapsible content panels with smooth height transition.',
      renderMiniPreview: () => (
        <div className="w-full px-2 py-1 rounded bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[11px] font-semibold flex justify-between">
          <span>Expandable item</span>
          <span>▾</span>
        </div>
      ),
    },

    // NAVIGATION
    {
      id: 'cmp-tabs',
      name: 'Tabs',
      category: 'Navigation',
      description: 'Segmented navigation controller for switching active contexts.',
      renderMiniPreview: () => (
        <div className="flex items-center gap-1 p-0.5 rounded bg-[var(--aura-surface-2)] text-[10px]">
          <span className="px-2 py-0.5 rounded bg-[var(--aura-surface-1)] font-bold text-[var(--aura-text-primary)]">Tab 1</span>
          <span className="px-2 py-0.5 text-[var(--aura-text-muted)]">Tab 2</span>
        </div>
      ),
    },
    {
      id: 'cmp-breadcrumb',
      name: 'Breadcrumb',
      category: 'Navigation',
      description: 'Hierarchical path navigation with chevron separators.',
      renderMiniPreview: () => (
        <div className="flex items-center gap-1 text-[11px] text-[var(--aura-text-muted)]">
          <span>Docs</span>
          <span>/</span>
          <span className="text-[var(--aura-text-primary)] font-bold">Button</span>
        </div>
      ),
    },
    {
      id: 'cmp-pagination',
      name: 'Pagination',
      category: 'Navigation',
      description: 'Numeric multi-page navigator with active page high contrast.',
      renderMiniPreview: () => (
        <div className="flex items-center gap-1">
          <span className="w-5 h-5 rounded bg-[var(--aura-color-primary)] text-white text-[10px] flex items-center justify-center font-bold">1</span>
          <span className="w-5 h-5 rounded bg-[var(--aura-surface-2)] text-[10px] flex items-center justify-center">2</span>
        </div>
      ),
    },

    // POPUPS & MODALS
    {
      id: 'cmp-dialog',
      name: 'Dialog / Modal',
      category: 'Popups & Modals',
      description: 'Accessible modal overlay with focus trapping and ESC dismissal.',
      tag: 'Overlay',
      renderMiniPreview: () => (
        <div className="p-2 rounded bg-[var(--aura-surface-1)] border border-[var(--aura-color-primary)] shadow-sm text-[10px] font-bold">
          Dialog Modal
        </div>
      ),
    },
    {
      id: 'cmp-dropdown',
      name: 'Dropdown / Menu',
      category: 'Popups & Modals',
      description: 'Contextual popover menu for secondary actions.',
      renderMiniPreview: () => (
        <div className="px-2 py-1 rounded bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[11px] flex items-center gap-1">
          <span>Actions</span>
          <span>▾</span>
        </div>
      ),
    },
    {
      id: 'cmp-toast',
      name: 'Toast / Snackbar',
      category: 'Popups & Modals',
      description: 'Global non-blocking notification banners with auto-dismissal.',
      renderMiniPreview: () => (
        <div className="px-2 py-1 rounded bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] text-[10px] flex items-center gap-1.5 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--aura-color-success)]" />
          <span>Success</span>
        </div>
      ),
    },

    // DATA
    {
      id: 'cmp-datatable',
      name: 'DataTable',
      category: 'Data',
      description: 'High-density tabular ledger with sorting, filtering and selection.',
      tag: 'Enterprise',
      renderMiniPreview: () => (
        <div className="w-full flex flex-col gap-1 text-[9px] font-mono">
          <div className="flex justify-between font-bold border-b pb-0.5">
            <span>ID</span>
            <span>STATUS</span>
          </div>
          <div className="flex justify-between text-[var(--aura-text-muted)]">
            <span>#01</span>
            <span className="text-[var(--aura-color-success)]">OK</span>
          </div>
        </div>
      ),
    },
    {
      id: 'cmp-skeleton',
      name: 'Skeleton',
      category: 'Data',
      description: 'Harmonic placeholder shapes reducing perceived loading latency.',
      renderMiniPreview: () => (
        <div className="w-24 flex flex-col gap-1">
          <div className="h-2 w-full bg-[var(--aura-surface-3)] rounded animate-pulse" />
          <div className="h-2 w-2/3 bg-[var(--aura-surface-3)] rounded animate-pulse" />
        </div>
      ),
    },
  ];

  const categories = ['All', 'Buttons & Indicators', 'Form Controls', 'Layout', 'Navigation', 'Popups & Modals', 'Data'];

  const filteredItems = catalogItems.filter(item => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 text-left font-sans w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Documentation</span>
            <AuraBadge variant="primary" size="sm">26+ Primitives</AuraBadge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Component Catalog
          </h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1 max-w-2xl">
            Browse all production-ready Sval primitives. Each component includes live preview playgrounds, multi-framework code snippets, and complete API specifications.
          </p>
        </div>

        <AuraButton 
          variant="outline" 
          size="sm"
          onClick={onNavigateToCheatsheet}
          leftIcon={<LayoutGrid className="w-3.5 h-3.5" />}
        >
          Open Kitchen Sink Cheatsheet
        </AuraButton>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-3 border-b border-[var(--aura-border-default)]">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-[var(--aura-text-muted)] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search components (e.g. Button, Input, Modal)..."
            className="w-full h-9 pl-9 pr-3 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] focus:outline-none focus:border-[var(--aura-color-primary)]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`
                px-3 py-1 rounded-[var(--aura-radius-sm)] text-xs font-medium shrink-0 transition-all border
                ${selectedCat === cat
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold shadow-xs sval-metallic-pill border-transparent'
                  : 'bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] border-[var(--aura-border-subtle)] hover:text-[var(--aura-text-primary)]'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectComponent(item.id)}
            className="flex flex-col justify-between p-4 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] hover:border-[var(--aura-color-accent)] cursor-pointer transition-all group shadow-xs hover:shadow-lg sval-metallic-card"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-[var(--aura-text-primary)] group-hover:text-[var(--aura-color-accent)] transition-colors">
                  {item.name}
                </h3>
                {item.tag && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--aura-surface-2)] text-[var(--aura-text-muted)] font-semibold border border-[var(--aura-border-subtle)]">
                    {item.tag}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[var(--aura-text-secondary)] line-clamp-2 leading-relaxed min-h-[32px]">
                {item.description}
              </p>
            </div>

            {/* Mini Live Preview Canvas */}
            <div className="my-4 h-16 rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-2)]/60 border border-[var(--aura-border-subtle)] p-3 flex items-center justify-center overflow-hidden sval-metallic-surface">
              {item.renderMiniPreview()}
            </div>

            {/* Footer Link */}
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--aura-text-muted)] group-hover:text-[var(--aura-color-accent)] transition-colors pt-2.5 border-t border-[var(--aura-border-subtle)]">
              <span className="text-[11px]">View specification</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
