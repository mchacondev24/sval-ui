import React, { useState } from 'react';
import { 
  Layout, 
  Layers, 
  Plus, 
  Search, 
  Terminal, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Home,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraBreadcrumb } from '../components/Breadcrumb';
import { AuraBadge } from '../components/Badge';
import { AuraAvatar } from '../components/Avatar';
import { useAura } from '../context';

export const StartersExample: React.FC = () => {
  const { addToast } = useAura();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans">
      {/* Shell Header */}
      <div className="h-14 px-4 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-[var(--aura-radius-sm)] bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] flex items-center justify-center font-bold text-xs">
            AP
          </div>
          <span className="text-xs font-bold tracking-tight">Enterprise Application Shell</span>
          <AuraBadge variant="neutral" size="sm">Starter Scaffold</AuraBadge>
        </div>

        <div className="flex items-center gap-2">
          <AuraAvatar name="Maxwell Chacon" size="sm" />
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="px-6 py-2.5 bg-[var(--aura-surface-2)]/50 border-b border-[var(--aura-border-subtle)]">
        <AuraBreadcrumb
          items={[
            { label: 'Workspaces', href: '#' },
            { label: 'Stockholm Cluster', href: '#' },
            { label: 'Production Node', active: true },
          ]}
        />
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8 flex-1 min-h-[440px] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
              Welcome to your new Sval Application
            </h2>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
              This scaffold provides a production-ready starting structure for modern web applications.
            </p>
          </div>

          <AuraButton 
            variant="primary" 
            size="sm" 
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => addToast({ title: 'New Resource', description: 'Resource created in workspace.', type: 'success' })}
          >
            Create Resource
          </AuraButton>
        </div>

        {/* 3 Quickstart Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AuraCard padding="md">
            <h3 className="text-xs font-bold text-[var(--aura-text-primary)]">1. Explore Primitives</h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
              Browse 26+ accessible components including buttons, inputs, modals, and data tables.
            </p>
            <div className="mt-4">
              <AuraButton variant="outline" size="sm">Browse Catalog</AuraButton>
            </div>
          </AuraCard>

          <AuraCard padding="md">
            <h3 className="text-xs font-bold text-[var(--aura-text-primary)]">2. Configure Themes</h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
              Tune Nordic Light, Nordic Dark, or configure Scandinavian accent tokens in Theme Studio.
            </p>
            <div className="mt-4">
              <AuraButton variant="outline" size="sm">Open Theme Studio</AuraButton>
            </div>
          </AuraCard>

          <AuraCard padding="md">
            <h3 className="text-xs font-bold text-[var(--aura-text-primary)]">3. Check Accessibility</h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
              Verify compliance with WCAG 2.2 AAA guidelines, keyboard navigation, and ARIA 1.2.
            </p>
            <div className="mt-4">
              <AuraButton variant="outline" size="sm">Audit Standards</AuraButton>
            </div>
          </AuraCard>
        </div>
      </div>
    </div>
  );
};
