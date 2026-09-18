import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Server, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Activity,
  Plus
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { AuraSwitch } from '../components/Switch';
import { useAura } from '../context';

export const SaaSDashboardTemplate: React.FC = () => {
  const { addToast } = useAura();
  const [liveStream, setLiveStream] = useState(true);

  const stats = [
    { title: 'Total ARR', value: '$84,200', change: '+14.6%', isPositive: true, icon: <CreditCard className="w-4 h-4 text-sky-500" /> },
    { title: 'Active Organizations', value: '428', change: '+8.2%', isPositive: true, icon: <Users className="w-4 h-4 text-emerald-500" /> },
    { title: 'Global Node Latency', value: '18ms', change: '-4.1%', isPositive: true, icon: <Server className="w-4 h-4 text-purple-500" /> },
    { title: 'Error Rate (SLA)', value: '0.002%', change: '+0.001%', isPositive: false, icon: <Activity className="w-4 h-4 text-amber-500" /> },
  ];

  const recentEvents = [
    { id: 1, user: 'Stockholm Fintech AB', action: 'Upgraded to Enterprise Cluster', time: '4m ago', status: 'success' },
    { id: 2, user: 'Oslo Marine Data', action: 'Provisioned 12 edge instances', time: '22m ago', status: 'accent' },
    { id: 3, user: 'Copenhagen Health Tech', action: 'Automated SQLite snapshot export', time: '1h ago', status: 'neutral' },
    { id: 4, user: 'Helsinki AI Labs', action: 'API key generated for v2 pipeline', time: '2h ago', status: 'accent' },
  ];

  return (
    <div className="flex flex-col gap-6 text-left font-sans">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
              Nordic Cloud Operations
            </h2>
            <AuraBadge variant="success" dot>Healthy</AuraBadge>
          </div>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
            Global telemetry synchronized with SQLite node at Stockholm cluster.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AuraSwitch
            checked={liveStream}
            onChange={setLiveStream}
            label="Live Stream"
            size="sm"
          />
          <AuraButton
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => addToast({ title: 'Cluster Deployment Initiated', description: 'New edge instance spinning up in Helsinki.', type: 'success' })}
          >
            Deploy Instance
          </AuraButton>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <AuraCard key={i} variant="solid" padding="md">
            <div className="flex items-center justify-between text-xs text-[var(--aura-text-secondary)]">
              <span>{stat.title}</span>
              <div className="p-1.5 rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-2)]">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-[var(--aura-text-primary)] mt-3">
              {stat.value}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className={`inline-flex items-center font-medium ${stat.isPositive ? 'text-[var(--aura-color-success)]' : 'text-[var(--aura-color-danger)]'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </span>
              <span className="text-[var(--aura-text-muted)]">vs last cycle</span>
            </div>
          </AuraCard>
        ))}
      </div>

      {/* Two Column Layout: Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Stream */}
        <div className="lg:col-span-2">
          <AuraCard
            variant="solid"
            padding="none"
            header={
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--aura-text-secondary)]">
                  Live Audit Activity
                </span>
                <span className="text-[11px] text-[var(--aura-text-muted)] font-mono">SQLite Stream</span>
              </div>
            }
          >
            <div className="divide-y divide-[var(--aura-border-subtle)]">
              {recentEvents.map(evt => (
                <div key={evt.id} className="p-4 flex items-center justify-between hover:bg-[var(--aura-surface-2)]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--aura-color-accent)]" />
                    <div>
                      <div className="text-xs font-semibold text-[var(--aura-text-primary)]">
                        {evt.user}
                      </div>
                      <div className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                        {evt.action}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[var(--aura-text-muted)] font-mono">
                      {evt.time}
                    </span>
                    <AuraBadge variant={evt.status as any} size="sm">
                      Synced
                    </AuraBadge>
                  </div>
                </div>
              ))}
            </div>
          </AuraCard>
        </div>

        {/* Security & System Info */}
        <div className="flex flex-col gap-4">
          <AuraCard variant="soft" padding="md">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--aura-text-primary)] mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>WCAG 2.2 AAA Validated</span>
            </div>
            <p className="text-xs text-[var(--aura-text-secondary)] leading-relaxed">
              Every interface layer follows high optical contrast and keyboard accessibility protocols.
            </p>
            <div className="mt-4 pt-3 border-t border-[var(--aura-border-subtle)] flex items-center justify-between text-xs">
              <span className="text-[var(--aura-text-muted)]">Design Token Engine</span>
              <span className="font-mono text-[var(--aura-text-primary)]">v1.0.0-rc</span>
            </div>
          </AuraCard>

          <AuraCard variant="solid" padding="md">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--aura-text-secondary)] mb-3">
              Cluster Distribution
            </h4>
            <div className="flex flex-col gap-2.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--aura-text-secondary)]">Stockholm DC-1</span>
                  <span className="font-mono font-medium">68%</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--aura-surface-3)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--aura-color-primary)] rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--aura-text-secondary)]">Oslo Edge-2</span>
                  <span className="font-mono font-medium">42%</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--aura-surface-3)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--aura-color-accent)] rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--aura-text-secondary)]">Helsinki Grid</span>
                  <span className="font-mono font-medium">85%</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--aura-surface-3)] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </AuraCard>
        </div>
      </div>
    </div>
  );
};
