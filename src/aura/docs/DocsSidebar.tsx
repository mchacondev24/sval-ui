import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Layers, 
  Palette, 
  LayoutGrid, 
  Database, 
  ExternalLink, 
  FileText,
  ShieldCheck,
  Sparkles,
  Sliders,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export interface DocCategory {
  category: string;
  items: {
    id: string;
    label: string;
    tag?: string;
    isNew?: boolean;
  }[];
}

export const DOC_SECTIONS: DocCategory[] = [
  {
    category: 'Getting Started',
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start', label: 'Quick Start' },
    ],
  },
  {
    category: 'Component Discovery',
    items: [
      { id: 'components-catalog', label: 'Component Catalog', tag: 'Visual' },
      { id: 'components-cheatsheet', label: 'Component Cheatsheet', tag: 'Kitchen Sink' },
    ],
  },
  {
    category: 'Examples & Solutions',
    items: [
      { id: 'examples', label: 'Examples Gallery', tag: 'Featured' },
      { id: 'example-pos', label: 'Point of Sale (POS)', tag: 'Interactive' },
      { id: 'example-dashboard', label: 'Executive Dashboard' },
      { id: 'example-crm', label: 'Deal Pipeline CRM' },
      { id: 'example-admin', label: 'RBAC Security Admin' },
      { id: 'example-marketing', label: 'Landing & Pricing' },
      { id: 'example-auth', label: 'Authentication Suite' },
      { id: 'example-forms', label: 'KYC Stepper Wizard' },
    ],
  },
  {
    category: 'Foundations',
    items: [
      { id: 'foundations-colors', label: 'Colors' },
      { id: 'foundations-typography', label: 'Typography' },
      { id: 'foundations-spacing', label: 'Spacing' },
      { id: 'foundations-radius', label: 'Radius & Borders' },
      { id: 'foundations-shadows', label: 'Shadows & Elevation' },
      { id: 'foundations-icons', label: 'Icons Gallery', tag: '24+' },
      { id: 'foundations-motion', label: 'Motion & Physics' },
    ],
  },
  {
    category: 'Components',
    items: [
      { id: 'cmp-button', label: 'Button', tag: 'Core' },
      { id: 'cmp-buttongroup', label: 'Button Group & Divider' },
      { id: 'cmp-input', label: 'Input' },
      { id: 'cmp-textarea', label: 'Textarea' },
      { id: 'cmp-select', label: 'Select' },
      { id: 'cmp-checkbox', label: 'Checkbox' },
      { id: 'cmp-radio', label: 'Radio' },
      { id: 'cmp-switch', label: 'Switch' },
      { id: 'cmp-slider', label: 'Slider' },
      { id: 'cmp-datepicker', label: 'DatePicker' },
      { id: 'cmp-fileupload', label: 'FileUpload' },
      { id: 'cmp-card', label: 'Card' },
      { id: 'cmp-chip', label: 'Chip & Tag' },
      { id: 'cmp-alert', label: 'Alert' },
      { id: 'cmp-badge', label: 'Badge' },
      { id: 'cmp-avatar', label: 'Avatar' },
      { id: 'cmp-dialog', label: 'Dialog / Modal' },
      { id: 'cmp-drawer', label: 'Drawer / Sheet' },
      { id: 'cmp-dropdown', label: 'Dropdown / Menu' },
      { id: 'cmp-tooltip', label: 'Tooltip' },
      { id: 'cmp-popover', label: 'Popover' },
      { id: 'cmp-tabs', label: 'Tabs' },
      { id: 'cmp-stepper', label: 'Stepper' },
      { id: 'cmp-accordion', label: 'Accordion' },
      { id: 'cmp-table', label: 'Table' },
      { id: 'cmp-datatable', label: 'DataTable', tag: 'Pro' },
      { id: 'cmp-pagination', label: 'Pagination' },
      { id: 'cmp-progress', label: 'Progress' },
      { id: 'cmp-spinner', label: 'Spinner' },
      { id: 'cmp-skeleton', label: 'Skeleton' },
      { id: 'cmp-toast', label: 'Toast' },
      { id: 'cmp-breadcrumb', label: 'Breadcrumb' },
    ],
  },
  {
    category: 'Forms & Patterns',
    items: [
      { id: 'forms-showcase', label: 'Interactive Forms', tag: 'Live' },
    ],
  },
  {
    category: 'Application Templates',
    items: [
      { id: 'template-saas', label: 'SaaS Operations' },
      { id: 'template-ecommerce', label: 'E-Commerce Store' },
      { id: 'template-settings', label: 'Account & Settings' },
      { id: 'template-login', label: 'Authentication' },
    ],
  },
  {
    category: 'Theme & Customization',
    items: [
      { id: 'theme-studio', label: 'Theme Studio & Builder', tag: 'Interactive' },
    ],
  },
  {
    category: 'Accessibility & Quality',
    items: [
      { id: 'accessibility', label: 'Accessibility Lab', tag: 'WCAG AAA' },
    ],
  },
  {
    category: 'Data & Production',
    items: [
      { id: 'sqlite-studio', label: 'SQLite WASM Studio' },
      { id: 'deployment', label: 'Despliegue de Producción' },
      { id: 'readme', label: 'GitHub Open Source' },
    ],
  },
];

export interface DocsSidebarProps {
  currentSection: string;
  onSelectSection: (id: string) => void;
  onOpenCommandPalette?: () => void;
  className?: string;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
  currentSection,
  onSelectSection,
  onOpenCommandPalette,
  className = '',
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredSections = DOC_SECTIONS.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchFilter.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <aside className={`w-full lg:w-64 shrink-0 flex flex-col gap-4 text-left font-sans select-none ${className}`}>
      {/* Search Input in Sidebar */}
      <div className="relative">
        <input
          type="text"
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          placeholder="Filter documentation..."
          className="w-full h-8 pl-8 pr-3 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] placeholder-[var(--aura-text-muted)] focus:outline-none focus:border-[var(--aura-color-primary)] transition-colors"
        />
        <Search className="w-3.5 h-3.5 text-[var(--aura-text-muted)] absolute left-2.5 top-2.5 pointer-events-none" />
        {searchFilter && (
          <button
            type="button"
            onClick={() => setSearchFilter('')}
            className="absolute right-2 top-2 text-[10px] text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Categories & Navigation Links */}
      <div className="flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
        {filteredSections.map(cat => (
          <div key={cat.category} className="flex flex-col gap-1">
            <h5 className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--aura-text-muted)]">
              {cat.category}
            </h5>
            <div className="flex flex-col gap-0.5">
              {cat.items.map(item => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectSection(item.id)}
                    className={`
                      w-full flex items-center justify-between px-2.5 py-1.5 rounded-[var(--aura-radius-sm)] text-xs font-medium transition-all text-left
                      ${isActive
                        ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold shadow-xs'
                        : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] hover:text-[var(--aura-text-primary)]'
                      }
                    `}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.tag && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-white/20' : 'bg-[var(--aura-surface-3)] text-[var(--aura-text-muted)]'}`}>
                        {item.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
