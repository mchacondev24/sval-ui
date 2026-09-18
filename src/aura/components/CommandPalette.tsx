import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Layers, 
  Palette, 
  FileCode2, 
  Database, 
  ArrowRight, 
  Command, 
  BookOpen, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAura } from '../context';

export interface CommandItemDef {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const AuraCommandPalette: React.FC<{
  onNavigateToSection?: (sectionId: string) => void;
}> = ({ onNavigateToSection }) => {
  const { isCommandPaletteOpen, closeCommandPalette, setThemePreset, addToast } = useAura();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItemDef[] = [
    {
      id: 'doc-overview',
      title: 'Documentation Overview & Philosophy',
      category: 'Documentation',
      icon: <BookOpen className="w-4 h-4 text-sky-500" />,
      action: () => {
        onNavigateToSection?.('overview');
        closeCommandPalette();
      },
    },
    {
      id: 'doc-install',
      title: 'Installation & Universal Multi-Framework Setup',
      category: 'Getting Started',
      icon: <BookOpen className="w-4 h-4 text-sky-400" />,
      action: () => {
        onNavigateToSection?.('installation');
        closeCommandPalette();
      },
    },
    {
      id: 'components-catalog',
      title: 'Component Catalog (Visual Grid of All Primitives)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('components-catalog');
        closeCommandPalette();
      },
    },
    {
      id: 'components-cheatsheet',
      title: 'Component Cheatsheet (Kitchen Sink Quick Reference)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('components-cheatsheet');
        closeCommandPalette();
      },
    },
    {
      id: 'examples-gallery',
      title: 'Examples Gallery (Browse 8+ Functional Real-World Apps)',
      category: 'Examples',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigateToSection?.('examples');
        closeCommandPalette();
      },
    },
    {
      id: 'example-pos',
      title: 'Point of Sale (POS) Restaurant & Retail Cashier',
      category: 'Examples',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigateToSection?.('example-pos');
        closeCommandPalette();
      },
    },
    {
      id: 'example-dashboard',
      title: 'Executive Analytics & Revenue Metrics Dashboard',
      category: 'Examples',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigateToSection?.('example-dashboard');
        closeCommandPalette();
      },
    },
    {
      id: 'example-crm',
      title: 'Commercial CRM Deal Pipeline & Customer Board',
      category: 'Examples',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigateToSection?.('example-crm');
        closeCommandPalette();
      },
    },
    {
      id: 'example-admin',
      title: 'RBAC Security Admin Panel & Permissions Console',
      category: 'Examples',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigateToSection?.('example-admin');
        closeCommandPalette();
      },
    },
    {
      id: 'example-marketing',
      title: 'Marketing Landing Page & Interactive Tier Pricing',
      category: 'Examples',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigateToSection?.('example-marketing');
        closeCommandPalette();
      },
    },
    {
      id: 'example-auth',
      title: 'Enterprise Authentication Suite (Sign-In, 2FA, Recovery)',
      category: 'Examples',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onNavigateToSection?.('example-auth');
        closeCommandPalette();
      },
    },
    {
      id: 'comp-btn',
      title: 'Button Component (Variants, Sizes, Icons, States)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('cmp-button');
        closeCommandPalette();
      },
    },
    {
      id: 'comp-textarea',
      title: 'Textarea Component (Multi-line, Character Counter, Resize)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('cmp-textarea');
        closeCommandPalette();
      },
    },
    {
      id: 'comp-chip',
      title: 'Chip & Tag Component (Filterable, Removable, Badges)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('cmp-chip');
        closeCommandPalette();
      },
    },
    {
      id: 'comp-drawer',
      title: 'Drawer / Sheet Component (Slide-overs, Off-canvas, Carts)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('cmp-drawer');
        closeCommandPalette();
      },
    },
    {
      id: 'comp-stepper',
      title: 'Stepper Component (Multi-step Wizard, Linear Progress)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('cmp-stepper');
        closeCommandPalette();
      },
    },
    {
      id: 'comp-fileupload',
      title: 'FileUpload Component (Drag-and-Drop, Validation, Preview)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onNavigateToSection?.('cmp-fileupload');
        closeCommandPalette();
      },
    },
    {
      id: 'comp-input',
      title: 'Input Component (Validation, Clearable, Icons)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-input'),
    },
    {
      id: 'comp-select',
      title: 'Select Component (Searchable Combobox)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-select'),
    },
    {
      id: 'comp-card',
      title: 'Card Component (Header, Footer, Pricing, Glass)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-card'),
    },
    {
      id: 'comp-datatable',
      title: 'DataTable Component (Sort, Filter, Pagination, Row Select)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-datatable'),
    },
    {
      id: 'comp-alert',
      title: 'Alert & Notice Banners (Info, Success, Warning, Danger)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-alert'),
    },
    {
      id: 'comp-avatar',
      title: 'Avatar & AvatarGroup (Sizes, Initials, Status Dots)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-avatar'),
    },
    {
      id: 'comp-dialog',
      title: 'Dialog & Modal Overlays (Confirmation & Destructive)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-dialog'),
    },
    {
      id: 'comp-dropdown',
      title: 'Dropdown & Action Menus (Shortcuts, Icons, Dividers)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('cmp-dropdown'),
    },
    {
      id: 'comp-forms',
      title: 'Form Layouts & Validation (Account Registration, Checkout)',
      category: 'Forms',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => onNavigateToSection?.('forms-showcase'),
    },
    {
      id: 'foundations-colors',
      title: 'Design Tokens: Colors (Nordic Palette, CSS Variables)',
      category: 'Foundations',
      icon: <Palette className="w-4 h-4 text-purple-500" />,
      action: () => onNavigateToSection?.('foundations-colors'),
    },
    {
      id: 'foundations-typography',
      title: 'Design Tokens: Typography (Major Second Scale)',
      category: 'Foundations',
      icon: <Palette className="w-4 h-4 text-purple-500" />,
      action: () => onNavigateToSection?.('foundations-typography'),
    },
    {
      id: 'lab-a11y',
      title: 'Accessibility Lab & WCAG 2.2 Matrix',
      category: 'Accessibility',
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('accessibility'),
    },
    {
      id: 'comp-gallery',
      title: 'Component Gallery (Full Grid Showcase)',
      category: 'Components',
      icon: <Layers className="w-4 h-4 text-emerald-500" />,
      action: () => onNavigateToSection?.('components'),
    },
    {
      id: 'theme-studio',
      title: 'Aura Studio & Realtime Theme Engine',
      category: 'Design Tokens',
      icon: <Palette className="w-4 h-4 text-purple-500" />,
      action: () => onNavigateToSection?.('theme-studio'),
    },
    {
      id: 'templates-showcase',
      title: 'Enterprise Templates (Dashboard, SaaS, CRM)',
      category: 'Templates',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => onNavigateToSection?.('templates'),
    },
    {
      id: 'sqlite-studio',
      title: 'Aura SQLite Database & SQL Studio',
      category: 'Data & Persistence',
      icon: <Database className="w-4 h-4 text-rose-500" />,
      action: () => onNavigateToSection?.('sqlite-studio'),
    },
    {
      id: 'deploy-guide',
      title: 'Despliegue de Producción & Git',
      category: 'Deployment',
      icon: <ExternalLink className="w-4 h-4 text-blue-500" />,
      action: () => onNavigateToSection?.('deployment'),
    },
    {
      id: 'theme-light',
      title: 'Switch Theme to Nordic Light (Stockholm)',
      category: 'Theme Actions',
      icon: <Palette className="w-4 h-4 text-slate-500" />,
      action: () => {
        setThemePreset('nordic-light');
        addToast({ title: 'Theme Updated', description: 'Switched to Nordic Light (Stockholm)', type: 'info' });
      },
      shortcut: '1',
    },
    {
      id: 'theme-dark',
      title: 'Switch Theme to Nordic Dark (Reykjavik)',
      category: 'Theme Actions',
      icon: <Palette className="w-4 h-4 text-slate-400" />,
      action: () => {
        setThemePreset('nordic-dark');
        addToast({ title: 'Theme Updated', description: 'Switched to Nordic Dark (Reykjavik)', type: 'info' });
      },
      shortcut: '2',
    },
    {
      id: 'theme-fjord',
      title: 'Switch Theme to Fjord Blue (Bergen Deep)',
      category: 'Theme Actions',
      icon: <Palette className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setThemePreset('fjord-blue');
        addToast({ title: 'Theme Updated', description: 'Switched to Fjord Blue (Bergen)', type: 'info' });
      },
      shortcut: '3',
    },
    {
      id: 'theme-pine',
      title: 'Switch Theme to Forest Pine (Helsinki)',
      category: 'Theme Actions',
      icon: <Palette className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setThemePreset('forest-pine');
        addToast({ title: 'Theme Updated', description: 'Switched to Forest Pine (Helsinki)', type: 'info' });
      },
      shortcut: '4',
    },
    {
      id: 'theme-sand',
      title: 'Switch Theme to Sandstone (Copenhagen Craft)',
      category: 'Theme Actions',
      icon: <Palette className="w-4 h-4 text-amber-600" />,
      action: () => {
        setThemePreset('sandstone');
        addToast({ title: 'Theme Updated', description: 'Switched to Sandstone (Copenhagen)', type: 'info' });
      },
      shortcut: '5',
    },
  ];

  const filtered = commandItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isCommandPaletteOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        closeCommandPalette();
      }
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCommandPalette}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 450 }}
            className="relative w-full max-w-xl bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-2xl overflow-hidden z-10 font-sans"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[var(--aura-border-subtle)] gap-3">
              <Search className="w-4 h-4 text-[var(--aura-text-muted)] shrink-0" />
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search documentation..."
                className="w-full bg-transparent text-sm text-[var(--aura-text-primary)] placeholder:text-[var(--aura-text-muted)] outline-none border-none"
              />
              <span className="text-[11px] font-mono px-1.5 py-0.5 bg-[var(--aura-surface-2)] text-[var(--aura-text-muted)] rounded border border-[var(--aura-border-subtle)]">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--aura-text-muted)]">
                  No matching commands found
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.action();
                        closeCommandPalette();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`
                        flex items-center justify-between px-3 py-2.5 rounded-[var(--aura-radius-md)] cursor-pointer select-none transition-colors
                        ${isSelected ? 'bg-[var(--aura-surface-2)] text-[var(--aura-text-primary)]' : 'text-[var(--aura-text-secondary)]'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <div>
                          <div className="text-xs font-medium text-[var(--aura-text-primary)]">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-[var(--aura-text-muted)]">
                            {item.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.shortcut && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--aura-surface-3)] text-[var(--aura-text-secondary)]">
                            {item.shortcut}
                          </span>
                        )}
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[var(--aura-color-accent)]" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[var(--aura-surface-2)]/60 border-t border-[var(--aura-border-subtle)] flex items-center justify-between text-[11px] text-[var(--aura-text-muted)]">
              <span className="flex items-center gap-1.5">
                <Command className="w-3 h-3" /> Aura Command Engine
              </span>
              <span>Use ↑ ↓ to navigate, Enter to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
