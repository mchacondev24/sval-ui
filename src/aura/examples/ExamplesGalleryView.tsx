import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Layers, 
  Code, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Monitor,
  LayoutGrid,
  Filter,
  Eye,
  Coffee,
  BarChart3,
  Users,
  ShieldCheck,
  Globe,
  ShoppingBag,
  Lock,
  Sliders,
  Table,
  Terminal
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraBadge } from '../components/Badge';
import { EXAMPLES_CATALOG, ExampleMetadata } from './examples-data';
import { ExampleViewer } from './ExampleViewer';

export interface ExamplesGalleryViewProps {
  onNavigateToComponent?: (componentId: string) => void;
}

export const ExamplesGalleryView: React.FC<ExamplesGalleryViewProps> = ({
  onNavigateToComponent,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedExample, setSelectedExample] = useState<ExampleMetadata | null>(null);

  const categories = [
    'All',
    'Dashboards',
    'Applications',
    'Marketing',
    'Forms',
    'E-commerce',
    'Authentication',
    'Starters',
    'Data',
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dashboards':
        return <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Applications':
        return <Coffee className="w-3.5 h-3.5 text-amber-500" />;
      case 'Marketing':
        return <Globe className="w-3.5 h-3.5 text-sky-500" />;
      case 'Forms':
        return <Sliders className="w-3.5 h-3.5 text-indigo-500" />;
      case 'E-commerce':
        return <ShoppingBag className="w-3.5 h-3.5 text-teal-500" />;
      case 'Authentication':
        return <Lock className="w-3.5 h-3.5 text-purple-500" />;
      case 'Data':
        return <Table className="w-3.5 h-3.5 text-rose-500" />;
      case 'Starters':
        return <Terminal className="w-3.5 h-3.5 text-cyan-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
    }
  };

  const filteredExamples = EXAMPLES_CATALOG.filter(ex => {
    const matchesCat = selectedCategory === 'All' || ex.category === selectedCategory;
    const matchesSearch = 
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.description.toLowerCase().includes(search.toLowerCase()) ||
      ex.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // If user selected an example to inspect, show the ExampleViewer
  if (selectedExample) {
    return (
      <ExampleViewer
        example={selectedExample}
        onBack={() => setSelectedExample(null)}
        onNavigateToComponent={onNavigateToComponent}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 text-left font-sans w-full">
      {/* Page Header */}
      <div className="p-6 sm:p-8 rounded-[var(--aura-radius-xl)] sval-metallic-card overflow-hidden relative">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-gradient-to-br from-sky-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-color-accent)] font-semibold">
              Real-world Solutions
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              15 Production Examples
            </span>
            <AuraBadge variant="neutral" size="sm">Angular Material-Grade Polish</AuraBadge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--aura-text-primary)]">
            Sval Interactive Examples
          </h1>

          <p className="text-sm sm:text-base text-[var(--aura-text-secondary)] leading-relaxed">
            Production-tested UI architectures crafted with Sval primitives. Includes fully working Point of Sale registers, executive analytics cockpits, enterprise CRM pipelines, and security admin centers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[var(--aura-border-default)]">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-[var(--aura-text-muted)] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search examples (e.g. 'POS', 'CRM', 'Dashboard', 'Checkout')..."
            className="w-full h-9 pl-9 pr-3 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] focus:outline-none focus:border-[var(--aura-color-primary)] shadow-2xs"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-1.5 rounded-[var(--aura-radius-sm)] text-xs font-medium shrink-0 transition-all flex items-center gap-1.5
                ${selectedCategory === cat
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold shadow-xs sval-metallic-pill'
                  : 'bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] border border-[var(--aura-border-subtle)]'
                }
              `}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Examples Grid with Real Rich Photography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExamples.map(example => (
          <div
            key={example.id}
            className="flex flex-col justify-between rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] hover:border-[var(--aura-color-primary)] transition-all overflow-hidden group shadow-xs hover:shadow-lg sval-metallic-card"
          >
            {/* Rich Visual Hero Image Box with Metallic Overlays */}
            <div 
              onClick={() => setSelectedExample(example)}
              className="h-48 relative overflow-hidden cursor-pointer group/img select-none"
            >
              <img
                src={example.image}
                alt={example.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                loading="lazy"
              />

              {/* Shimmer overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold backdrop-blur-md bg-slate-900/80 border border-white/20 text-white flex items-center gap-1.5 shadow-sm">
                  {getCategoryIcon(example.category)}
                  <span>{example.category}</span>
                </span>

                {example.badgeText ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md bg-amber-500/90 text-slate-950 shadow-xs">
                    {example.badgeText}
                  </span>
                ) : example.featured ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md bg-sky-500/90 text-white shadow-xs">
                    Featured
                  </span>
                ) : null}
              </div>

              {/* Hover Quick Action Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="text-xs font-bold text-white tracking-tight drop-shadow-sm truncate pr-2">
                  {example.name}
                </span>

                <span className="px-2.5 py-1 rounded-[var(--aura-radius-sm)] text-[11px] font-semibold bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white backdrop-blur-md shadow-md flex items-center gap-1 opacity-90 group-hover/img:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3 text-sky-500" />
                  <span>Interactive</span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
              <div>
                <h3 
                  onClick={() => setSelectedExample(example)}
                  className="text-base font-bold text-[var(--aura-text-primary)] group-hover:text-[var(--aura-color-accent)] cursor-pointer transition-colors"
                >
                  {example.name}
                </h3>
                <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                  {example.description}
                </p>
              </div>

              {/* Tags & Component Pills with jewel colors */}
              <div className="flex flex-wrap gap-1 mt-1">
                {example.tags.map(t => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--aura-surface-2)] text-[var(--aura-text-muted)] border border-[var(--aura-border-subtle)]"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--aura-border-subtle)] mt-2">
                <AuraButton
                  variant="primary"
                  size="sm"
                  onClick={() => setSelectedExample(example)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="shadow-xs"
                >
                  Open Live App
                </AuraButton>

                <div className="text-[11px] font-mono text-[var(--aura-text-muted)]">
                  {example.componentsUsed.length} Sval UI Primitives
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
