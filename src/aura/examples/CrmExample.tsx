import React, { useState } from 'react';
import { 
  Building, 
  DollarSign, 
  User, 
  ArrowRight, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MoreVertical,
  Briefcase,
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraBadge } from '../components/Badge';
import { AuraAvatar } from '../components/Avatar';
import { AuraDialog } from '../components/Dialog';
import { AuraInput } from '../components/Input';
import { AuraSelect } from '../components/Select';
import { useAura } from '../context';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  contact: string;
  avatar: string;
  stage: 'lead' | 'discovery' | 'proposal' | 'won';
  probability: string;
}

export const CrmExample: React.FC = () => {
  const { addToast } = useAura();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealCompany, setNewDealCompany] = useState('');
  const [newDealValue, setNewDealValue] = useState('25000');

  const [deals, setDeals] = useState<Deal[]>([
    { 
      id: 'D-1', 
      title: 'Enterprise Design License', 
      company: 'Volvo Nordic Group', 
      value: 45000, 
      contact: 'Björn Borg', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      stage: 'proposal', 
      probability: '75%' 
    },
    { 
      id: 'D-2', 
      title: 'Design System Migration', 
      company: 'IKEA Digital Lab', 
      value: 92000, 
      contact: 'Sigrid Larsson', 
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      stage: 'discovery', 
      probability: '40%' 
    },
    { 
      id: 'D-3', 
      title: 'Healthcare Portal UI', 
      company: 'Karolinska Institute', 
      value: 38000, 
      contact: 'Anders Celsius', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      stage: 'won', 
      probability: '100%' 
    },
    { 
      id: 'D-4', 
      title: 'Fintech Mobile UI Suite', 
      company: 'Klarna Engineering', 
      value: 64000, 
      contact: 'Astrid Lind', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      stage: 'lead', 
      probability: '25%' 
    },
    { 
      id: 'D-5', 
      title: 'Aviation Booking Dashboard', 
      company: 'SAS Scandinavian Airlines', 
      value: 110000, 
      contact: 'Kasper Roald', 
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      stage: 'proposal', 
      probability: '80%' 
    },
    { 
      id: 'D-6', 
      title: 'Green Energy Analytics Hub', 
      company: 'Vattenfall Clean Power', 
      value: 55000, 
      contact: 'Helena Berg', 
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      stage: 'lead', 
      probability: '20%' 
    },
  ]);

  const stages: { id: Deal['stage']; label: string; dotColor: string; badgeBg: string }[] = [
    { id: 'lead', label: 'Lead Inbound', dotColor: 'bg-sky-500', badgeBg: 'bg-sky-500/15 text-sky-600 dark:text-sky-400' },
    { id: 'discovery', label: 'Tech Discovery', dotColor: 'bg-amber-500', badgeBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    { id: 'proposal', label: 'Enterprise Proposal', dotColor: 'bg-indigo-500', badgeBg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' },
    { id: 'won', label: 'Contract Won', dotColor: 'bg-emerald-500', badgeBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' },
  ];

  const moveDeal = (dealId: string, nextStage: Deal['stage']) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        addToast({
          title: 'Pipeline Updated',
          description: `${d.title} moved to ${nextStage.toUpperCase()}`,
          type: 'success',
        });
        return { ...d, stage: nextStage };
      }
      return d;
    }));
  };

  const handleCreateDeal = () => {
    if (!newDealTitle) return;
    const newDeal: Deal = {
      id: `D-${deals.length + 1}`,
      title: newDealTitle,
      company: newDealCompany || 'Nordic Enterprise AB',
      value: parseInt(newDealValue) || 30000,
      contact: 'Maxwell Chacón',
      avatar: 'https://avatars.githubusercontent.com/u/152914109?v=4',
      stage: 'lead',
      probability: '20%',
    };
    setDeals(prev => [newDeal, ...prev]);
    setIsAddModalOpen(false);
    setNewDealTitle('');
    setNewDealCompany('');
    addToast({
      title: 'Deal Created',
      description: `${newDeal.title} has been staged in inbound leads.`,
      type: 'success',
    });
  };

  const totalPipeline = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans sval-metallic-card shadow-lg">
      {/* Top Banner with Metallic Surface & Key Metrics */}
      <div className="p-4 sm:p-5 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 sval-metallic-surface">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-xs border border-white/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-[var(--aura-text-primary)]">
                Commercial Pipeline & Deal Hub
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                ${(totalPipeline / 1000).toFixed(0)}k Pipeline Active
              </span>
            </div>
            <p className="text-[11px] text-[var(--aura-text-muted)] mt-0.5">
              Enterprise customer contracts, weighted conversion probabilities, and key stakeholders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--aura-text-muted)] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter deals, accounts..."
              className="h-8 pl-8 pr-3 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] focus:outline-none focus:border-[var(--aura-color-primary)]"
            />
          </div>
          <AuraButton 
            variant="primary" 
            size="sm" 
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            New Deal
          </AuraButton>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto min-h-[520px]">
        {stages.map(stage => {
          const stageDeals = deals.filter(d => 
            d.stage === stage.id && 
            (d.title.toLowerCase().includes(search.toLowerCase()) || d.company.toLowerCase().includes(search.toLowerCase()))
          );
          const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);

          return (
            <div 
              key={stage.id} 
              className="flex flex-col gap-3 p-3.5 rounded-[var(--aura-radius-lg)] bg-[var(--aura-surface-2)]/40 border border-[var(--aura-border-default)] min-h-[440px]"
            >
              {/* Column Header with Metallic Pill */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[var(--aura-border-subtle)]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${stage.dotColor} animate-pulse`} />
                  <span className="text-xs font-bold text-[var(--aura-text-primary)]">
                    {stage.label}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--aura-surface-3)] text-[var(--aura-text-muted)] font-semibold">
                    {stageDeals.length}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-extrabold text-[var(--aura-text-primary)]">
                  ${(stageTotal / 1000).toFixed(0)}k
                </span>
              </div>

              {/* Deal Cards with Metallic Finish & Portraits */}
              <div className="flex flex-col gap-3 overflow-y-auto">
                {stageDeals.map(deal => (
                  <div
                    key={deal.id}
                    className="p-3.5 rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] hover:border-[var(--aura-color-accent)] transition-all shadow-xs hover:shadow-md flex flex-col gap-2.5 group sval-metallic-card"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] font-mono text-[var(--aura-color-accent)] font-bold">
                        {deal.id}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] font-mono font-semibold border border-[var(--aura-border-subtle)]">
                        {deal.probability} win prob
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[var(--aura-text-primary)] group-hover:text-[var(--aura-color-accent)] transition-colors line-clamp-2">
                      {deal.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--aura-text-secondary)]">
                      <Building className="w-3.5 h-3.5 opacity-60 text-slate-400 shrink-0" />
                      <span className="truncate font-medium">{deal.company}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--aura-border-subtle)] mt-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={deal.avatar}
                          alt={deal.contact}
                          className="w-5 h-5 rounded-full object-cover border border-white/30"
                        />
                        <span className="text-[10px] text-[var(--aura-text-muted)] truncate max-w-[80px]">
                          {deal.contact}
                        </span>
                      </div>

                      <span className="text-xs font-mono font-extrabold text-[var(--aura-text-primary)]">
                        ${deal.value.toLocaleString()}
                      </span>
                    </div>

                    {/* Stage transition buttons */}
                    <div className="flex items-center justify-end gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {deal.stage !== 'lead' && (
                        <button
                          type="button"
                          onClick={() => {
                            const prev = deal.stage === 'won' ? 'proposal' : deal.stage === 'proposal' ? 'discovery' : 'lead';
                            moveDeal(deal.id, prev);
                          }}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--aura-surface-2)] text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]"
                        >
                          ←
                        </button>
                      )}
                      {deal.stage !== 'won' && (
                        <button
                          type="button"
                          onClick={() => {
                            const next = deal.stage === 'lead' ? 'discovery' : deal.stage === 'discovery' ? 'proposal' : 'won';
                            moveDeal(deal.id, next);
                          }}
                          className="text-[10px] px-2 py-0.5 rounded bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold flex items-center gap-0.5"
                        >
                          Advance →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Deal Modal */}
      <AuraDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Enterprise Opportunity"
        size="md"
        footer={
          <>
            <AuraButton variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </AuraButton>
            <AuraButton variant="primary" size="sm" onClick={handleCreateDeal} leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}>
              Create Pipeline Deal
            </AuraButton>
          </>
        }
      >
        <div className="flex flex-col gap-3 text-xs">
          <AuraInput
            label="Deal Title"
            placeholder="e.g. Design Token Enterprise Rollout"
            value={newDealTitle}
            onChange={e => setNewDealTitle(e.target.value)}
          />
          <AuraInput
            label="Target Company / Organization"
            placeholder="e.g. Spotify Engineering"
            value={newDealCompany}
            onChange={e => setNewDealCompany(e.target.value)}
          />
          <AuraInput
            label="Estimated Contract Value (USD)"
            placeholder="50000"
            type="number"
            value={newDealValue}
            onChange={e => setNewDealValue(e.target.value)}
          />
        </div>
      </AuraDialog>
    </div>
  );
};
