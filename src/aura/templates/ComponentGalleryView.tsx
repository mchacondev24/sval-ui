import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Code, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { AuraInput } from '../components/Input';
import { AuraSelect } from '../components/Select';
import { AuraSwitch } from '../components/Switch';
import { AuraCheckbox } from '../components/Checkbox';
import { AuraTabs } from '../components/Tabs';
import { AuraDataTable } from '../components/DataTable';
import { useAura } from '../context';
import { COMPONENT_DOCS } from '../docs-data';
import { ComponentDocumentation } from '../../types';

export const ComponentGalleryView: React.FC = () => {
  const { addToast, frameworkTab, setFrameworkTab, openCommandPalette } = useAura();
  const [selectedComponentId, setSelectedComponentId] = useState('button');
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);

  // Interactive component states for playground
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'destructive'>('primary');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnLoading, setBtnLoading] = useState(false);

  const [inputVal, setInputVal] = useState('Stockholm Design Node');
  const [inputError, setInputError] = useState('');

  const [selectVal, setSelectVal] = useState('sweden');
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  const activeDoc = COMPONENT_DOCS.find(c => c.id === selectedComponentId) || COMPONENT_DOCS[0];

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeKey(id);
    addToast({
      title: 'Code Copied to Clipboard',
      description: `Copied ${frameworkTab.toUpperCase()} syntax. Ready to paste!`,
      type: 'success',
    });
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  const sampleOrders = [
    { id: 'ORD-101', customer: 'Astrid Lindgren', email: 'astrid@stockholm.se', product: 'Oak Lounger', amount: 840, status: 'completed', region: 'Nordic' },
    { id: 'ORD-102', customer: 'Henrik Ibsen', email: 'henrik@oslo.no', product: 'Fjord Desk Lamp', amount: 260, status: 'processing', region: 'Nordic' },
    { id: 'ORD-103', customer: 'Kasper Schmeichel', email: 'kasper@cph.dk', product: 'Ceramic Vessel', amount: 110, status: 'pending', region: 'Nordic' },
    { id: 'ORD-104', customer: 'Sigrid Valdimar', email: 'sigrid@reykjavik.is', product: 'Wool Throw', amount: 195, status: 'completed', region: 'Nordic' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 text-left font-sans">
      {/* Sidebar List of Components */}
      <div className="w-full lg:w-60 shrink-0 flex flex-col gap-1.5">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--aura-text-muted)]">
          Component Registry
        </div>

        {COMPONENT_DOCS.map(doc => {
          const isSelected = doc.id === selectedComponentId;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => setSelectedComponentId(doc.id)}
              className={`
                w-full flex items-center justify-between px-3.5 py-2.5 rounded-[var(--aura-radius-md)] text-xs font-medium transition-all text-left
                ${isSelected
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] shadow-xs'
                  : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] hover:text-[var(--aura-text-primary)]'
                }
              `}
            >
              <span>{doc.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20' : 'bg-[var(--aura-surface-3)] text-[var(--aura-text-muted)]'}`}>
                {doc.category}
              </span>
            </button>
          );
        })}

        <div className="mt-4 pt-4 border-t border-[var(--aura-border-subtle)] px-2">
          <AuraButton
            variant="outline"
            size="sm"
            fullWidth
            onClick={openCommandPalette}
            className="text-xs"
          >
            Quick Search (Ctrl + K)
          </AuraButton>
        </div>
      </div>

      {/* Main Detail & Interactive Showcase */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        {/* Component Title & Badges */}
        <div className="p-5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-[var(--aura-text-primary)]">
                  {activeDoc.name}
                </h2>
                <AuraBadge variant="neutral" size="sm">WCAG 2.2 AAA</AuraBadge>
                <AuraBadge variant="accent" size="sm">Multi-Framework</AuraBadge>
              </div>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
                {activeDoc.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[var(--aura-text-muted)]">
                Category: {activeDoc.category}
              </span>
            </div>
          </div>
        </div>

        {/* Live Interactive Playground Card */}
        <AuraCard variant="solid" padding="none">
          <div className="p-3 bg-[var(--aura-surface-2)]/70 border-b border-[var(--aura-border-subtle)] flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--aura-text-secondary)]">
              Interactive Component Sandbox
            </span>

            {/* Framework Switcher (React / Angular / Blazor / HTML) */}
            <div className="flex items-center gap-1 p-0.5 bg-[var(--aura-surface-1)] rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)]">
              {(['react', 'angular', 'blazor', 'html'] as const).map(fw => (
                <button
                  key={fw}
                  type="button"
                  onClick={() => setFrameworkTab(fw)}
                  className={`
                    px-2.5 py-1 text-[11px] font-semibold rounded uppercase tracking-wider transition-colors
                    ${frameworkTab === fw
                      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]'
                      : 'text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]'
                    }
                  `}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Rendering Canvas */}
          <div className="p-8 flex items-center justify-center min-h-[180px] bg-[var(--aura-bg)]/40 border-b border-[var(--aura-border-subtle)]">
            {activeDoc.id === 'button' && (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <AuraButton
                  variant={btnVariant}
                  size={btnSize}
                  isLoading={btnLoading}
                >
                  Interactive Trigger
                </AuraButton>

                <AuraButton
                  variant="outline"
                  size={btnSize}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Secondary Action
                </AuraButton>
              </div>
            )}

            {activeDoc.id === 'input' && (
              <div className="w-full max-w-sm">
                <AuraInput
                  label="Workspace Name"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  hint="Public label for your cluster node"
                  error={inputError}
                  isClearable
                  onClear={() => setInputVal('')}
                />
              </div>
            )}

            {activeDoc.id === 'select' && (
              <div className="w-full max-w-sm">
                <AuraSelect
                  label="Select Headquarters"
                  value={selectVal}
                  onChange={setSelectVal}
                  options={[
                    { value: 'sweden', label: 'Stockholm, Sweden', description: 'Central Node' },
                    { value: 'norway', label: 'Oslo, Norway', description: 'Maritime Hub' },
                    { value: 'denmark', label: 'Copenhagen, Denmark', description: 'Design Studio' },
                    { value: 'finland', label: 'Helsinki, Finland', description: 'AI Research' },
                  ]}
                  searchable
                />
              </div>
            )}

            {activeDoc.id === 'switch' && (
              <div className="flex flex-col gap-3">
                <AuraSwitch
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                  label="Zero-Latency WebSockets"
                  description="Propagate state updates without polling overhead"
                />
              </div>
            )}

            {activeDoc.id === 'card' && (
              <div className="w-full max-w-sm">
                <AuraCard
                  variant="solid"
                  header={<span className="text-xs font-semibold">Node Stockholm-01</span>}
                  footer={<span className="text-xs text-[var(--aura-text-muted)]">Latency: 12ms</span>}
                >
                  <p className="text-xs text-[var(--aura-text-secondary)]">
                    Surface container engineered with clean 1px border hierarchy and optical balance.
                  </p>
                </AuraCard>
              </div>
            )}

            {activeDoc.id === 'datatable' && (
              <div className="w-full">
                <AuraDataTable
                  data={sampleOrders}
                  columns={[
                    { key: 'id', header: 'Order ID', sortable: true },
                    { key: 'customer', header: 'Customer', sortable: true },
                    { key: 'product', header: 'Item', sortable: true },
                    { key: 'amount', header: 'Amount', sortable: true, render: o => `$${o.amount}` },
                    { 
                      key: 'status', 
                      header: 'Status', 
                      render: o => (
                        <AuraBadge variant={o.status === 'completed' ? 'success' : 'accent'} size="sm">
                          {o.status}
                        </AuraBadge>
                      )
                    }
                  ]}
                  keyField="id"
                  pageSize={3}
                />
              </div>
            )}
          </div>

          {/* Sandbox Controls Toolbar */}
          {activeDoc.id === 'button' && (
            <div className="p-4 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-subtle)] flex items-center gap-4 flex-wrap text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[var(--aura-text-muted)]">Variant:</span>
                {(['primary', 'secondary', 'outline', 'ghost', 'subtle', 'destructive'] as const).map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setBtnVariant(v)}
                    className={`px-2 py-1 rounded text-[11px] font-medium border ${btnVariant === v ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]' : 'bg-[var(--aura-surface-2)] border-[var(--aura-border-default)]'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[var(--aura-text-muted)]">Size:</span>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setBtnSize(s)}
                    className={`px-2 py-1 rounded text-[11px] font-medium border ${btnSize === s ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]' : 'bg-[var(--aura-surface-2)] border-[var(--aura-border-default)]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <AuraSwitch
                  checked={btnLoading}
                  onChange={setBtnLoading}
                  label="Loading State"
                  size="sm"
                />
              </div>
            </div>
          )}

          {/* Code Viewer Panel with One-Click Copy */}
          <div className="p-4 bg-black/95 text-slate-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-emerald-400">
                {frameworkTab.toUpperCase()} CODE SNIPPET (Ready to copy & paste)
              </span>

              <AuraButton
                variant="outline"
                size="sm"
                onClick={() => handleCopyCode(activeDoc.codeExamples[frameworkTab], activeDoc.id)}
                leftIcon={copiedCodeKey === activeDoc.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedCodeKey === activeDoc.id ? 'Copied!' : 'Copy Code'}
              </AuraButton>
            </div>

            <pre className="text-xs font-mono overflow-x-auto leading-relaxed max-h-56 overflow-y-auto">
              {activeDoc.codeExamples[frameworkTab]}
            </pre>
          </div>
        </AuraCard>

        {/* Props Specification Table */}
        <AuraCard variant="solid" padding="md">
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-3">
            Component API & Properties
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--aura-border-default)] text-[var(--aura-text-muted)] font-mono uppercase text-[10px]">
                  <th className="py-2 pr-4">Prop</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Default</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--aura-border-subtle)] font-mono text-[11px]">
                {activeDoc.props.map(prop => (
                  <tr key={prop.name}>
                    <td className="py-2.5 pr-4 text-[var(--aura-color-accent)] font-semibold">{prop.name}</td>
                    <td className="py-2.5 pr-4 text-[var(--aura-text-secondary)]">{prop.type}</td>
                    <td className="py-2.5 pr-4 text-[var(--aura-text-muted)]">{prop.default}</td>
                    <td className="py-2.5 text-[var(--aura-text-primary)] font-sans">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AuraCard>

        {/* Design Philosophy & Accessibility Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuraCard variant="soft" padding="md">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--aura-text-primary)] mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Nordic Minimalism Principle</span>
            </div>
            <p className="text-xs text-[var(--aura-text-secondary)] leading-relaxed">
              {activeDoc.nordicDesignNote}
            </p>
          </AuraCard>

          <AuraCard variant="soft" padding="md">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--aura-text-primary)] mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Accessibility & ARIA Protocol</span>
            </div>
            <ul className="text-xs text-[var(--aura-text-secondary)] flex flex-col gap-1 list-disc pl-4">
              {activeDoc.accessibilityNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </AuraCard>
        </div>
      </div>
    </div>
  );
};
