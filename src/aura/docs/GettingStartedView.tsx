import React, { useState } from 'react';
import { Copy, Check, Terminal, Package, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';

export const GettingStartedView: React.FC<{ defaultTab?: 'installation' | 'quickstart' }> = ({ defaultTab = 'installation' }) => {
  const { addToast, setFrameworkTab, frameworkTab } = useAura();
  const [activeTab, setActiveTab] = useState<'installation' | 'quickstart'>(defaultTab);
  const [packageManager, setPackageManager] = useState<'npm' | 'yarn' | 'pnpm' | 'bun'>('npm');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    addToast({
      title: 'Copied to Clipboard',
      description: text,
      type: 'success',
    });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const installCmds = {
    npm: 'npm install @sval-ui/react lucide-react',
    yarn: 'yarn add @sval-ui/react lucide-react',
    pnpm: 'pnpm add @sval-ui/react lucide-react',
    bun: 'bun add @sval-ui/react lucide-react',
  };

  return (
    <div className="flex flex-col gap-8 text-left font-sans">
      {/* Header */}
      <div className="p-6 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">
            Developer Experience
          </span>
          <AuraBadge variant="success" size="sm">Universal Compatibility</AuraBadge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
          Getting Started with Sval UIX
        </h1>
        <p className="text-xs text-[var(--aura-text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Install and configure Sval in your existing React, Angular, Blazor, or pure HTML application in under two minutes.
        </p>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mt-6 border-t border-[var(--aura-border-subtle)] pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('installation')}
            className={`px-3 py-1.5 rounded-[var(--aura-radius-sm)] text-xs font-medium transition-colors ${activeTab === 'installation' ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold' : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)]'}`}
          >
            Installation & Setup
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quickstart')}
            className={`px-3 py-1.5 rounded-[var(--aura-radius-sm)] text-xs font-medium transition-colors ${activeTab === 'quickstart' ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold' : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)]'}`}
          >
            Quick Start Guide
          </button>
        </div>
      </div>

      {activeTab === 'installation' && (
        <div className="flex flex-col gap-6">
          {/* Step 1: Package install */}
          <AuraCard variant="solid" padding="md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] mb-3">
              <span>Step 1</span>
              <span>—</span>
              <span className="text-[var(--aura-text-primary)]">Install Dependency</span>
            </div>

            {/* Package Manager Toggle */}
            <div className="flex items-center gap-1 mb-3">
              {(['npm', 'yarn', 'pnpm', 'bun'] as const).map(pm => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setPackageManager(pm)}
                  className={`px-2.5 py-1 text-xs font-mono uppercase rounded transition-colors ${packageManager === pm ? 'bg-[var(--aura-surface-3)] text-[var(--aura-text-primary)] font-bold' : 'text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]'}`}
                >
                  {pm}
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-[var(--aura-radius-md)] bg-black/95 text-emerald-400 font-mono text-xs flex items-center justify-between">
              <code>{installCmds[packageManager]}</code>
              <button
                type="button"
                onClick={() => handleCopy(installCmds[packageManager], 'install')}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                {copiedKey === 'install' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </AuraCard>

          {/* Step 2: Global CSS Import */}
          <AuraCard variant="solid" padding="md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] mb-3">
              <span>Step 2</span>
              <span>—</span>
              <span className="text-[var(--aura-text-primary)]">Import Design Tokens & Global Styles</span>
            </div>
            <p className="text-xs text-[var(--aura-text-secondary)] mb-3">
              Import the unified Sval design tokens into your root stylesheet (<code className="font-mono text-[11px] bg-[var(--aura-surface-2)] px-1 py-0.5 rounded">src/index.css</code>):
            </p>

            <div className="p-3.5 rounded-[var(--aura-radius-md)] bg-black/95 text-slate-200 font-mono text-xs flex items-center justify-between">
              <code>@import "@sval-ui/core/tokens.css";</code>
              <button
                type="button"
                onClick={() => handleCopy('@import "@sval-ui/core/tokens.css";', 'css')}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                {copiedKey === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </AuraCard>

          {/* Step 3: Provider Setup */}
          <AuraCard variant="solid" padding="md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--aura-text-muted)] mb-3">
              <span>Step 3</span>
              <span>—</span>
              <span className="text-[var(--aura-text-primary)]">Wrap Application in SvalProvider</span>
            </div>

            <div className="p-4 rounded-[var(--aura-radius-md)] bg-black/95 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
              <pre>{`import React from 'react';
import ReactDOM from 'react-dom/client';
import { SvalProvider } from '@sval-ui/react';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SvalProvider defaultTheme="nordic-light">
      <App />
    </SvalProvider>
  </React.StrictMode>
);`}</pre>
            </div>
          </AuraCard>
        </div>
      )}

      {activeTab === 'quickstart' && (
        <div className="flex flex-col gap-6">
          <AuraCard variant="solid" padding="md">
            <h3 className="text-sm font-semibold mb-2 text-[var(--aura-text-primary)]">Your First Sval Component</h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mb-4">
              Here is a clean example of composing Button, Card, Input, and Badge:
            </p>

            <div className="p-4 rounded-[var(--aura-radius-md)] bg-black/95 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
              <pre>{`import { AuraButton, AuraCard, AuraInput, AuraBadge } from '@sval-ui/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function ProjectLaunchWidget() {
  const [name, setName] = useState('');

  return (
    <AuraCard variant="solid" padding="md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold">New Node</h3>
        <AuraBadge variant="accent" dot>Ready</AuraBadge>
      </div>

      <AuraInput
        label="Cluster Name"
        placeholder="e.g. stockholm-node-01"
        value={name}
        onChange={e => setName(e.target.value)}
        isClearable
      />

      <div className="mt-4 flex items-center justify-end gap-2">
        <AuraButton variant="ghost" size="sm">Cancel</AuraButton>
        <AuraButton variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
          Deploy Node
        </AuraButton>
      </div>
    </AuraCard>
  );
}`}</pre>
            </div>
          </AuraCard>
        </div>
      )}
    </div>
  );
};
