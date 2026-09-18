import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Bell, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  LayoutDashboard,
  BarChart3,
  UserCheck,
  Package,
  Settings,
  ShieldCheck,
  CreditCard,
  Building2
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraBadge } from '../components/Badge';
import { AuraAvatar } from '../components/Avatar';
import { AuraProgress } from '../components/Progress';
import { useAura } from '../context';

export const DashboardExample: React.FC = () => {
  const { addToast } = useAura();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'customers' | 'products' | 'settings'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const transactions = [
    { 
      id: 'TX-9041', 
      customer: 'Astrid Lindgren', 
      company: 'Nordic Studio', 
      amount: '$1,420.00', 
      status: 'completed', 
      date: 'Just now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    },
    { 
      id: 'TX-9040', 
      customer: 'Henrik Ibsen', 
      company: 'Fjord Technologies', 
      amount: '$850.00', 
      status: 'completed', 
      date: '25 min ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    },
    { 
      id: 'TX-9039', 
      customer: 'Kasper Schmeichel', 
      company: 'Cph Architecture', 
      amount: '$3,120.00', 
      status: 'pending', 
      date: '1 hour ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
    },
    { 
      id: 'TX-9038', 
      customer: 'Sigrid Undset', 
      company: 'Oslo Cloud Ops', 
      amount: '$640.00', 
      status: 'completed', 
      date: '3 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    },
    { 
      id: 'TX-9037', 
      customer: 'Jonas Lie', 
      company: 'Stockholm Fintech', 
      amount: '$2,750.00', 
      status: 'failed', 
      date: '5 hours ago',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      badgeColor: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
    },
  ];

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans sval-metallic-card shadow-lg">
      {/* Dashboard Top Header with Metallic Sheen */}
      <div className="h-14 px-4 sm:px-6 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)] flex items-center justify-between sval-metallic-surface">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-indigo-500 to-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-white/20">
            SD
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-tight text-[var(--aura-text-primary)]">
              Sval Enterprise Executive
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Sync
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 text-[var(--aura-text-muted)] absolute left-2.5 top-2.5" />
            <input 
              type="text" 
              placeholder="Search ledger, transactions..."
              className="h-8 pl-8 pr-3 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] focus:outline-none focus:border-[var(--aura-color-primary)]"
            />
          </div>
          <button 
            type="button"
            onClick={() => addToast({ title: 'Notifications', description: 'All EU nodes operating at 99.99% availability.', type: 'info' })}
            className="p-1.5 rounded-[var(--aura-radius-sm)] hover:bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-sky-500 absolute top-1 right-1 animate-pulse" />
          </button>
          <img 
            src="https://avatars.githubusercontent.com/u/152914109?v=4" 
            alt="Maxwell Chacon" 
            className="w-7 h-7 rounded-full border border-[var(--aura-border-default)] object-cover"
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-[600px]">
        {/* Left Mini Sidebar */}
        <aside className="w-full lg:w-48 bg-[var(--aura-surface-1)]/60 border-b lg:border-b-0 lg:border-r border-[var(--aura-border-default)] p-3 flex flex-row lg:flex-col gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-sky-500" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4 text-indigo-500" /> },
            { id: 'customers', label: 'Customers', icon: <UserCheck className="w-4 h-4 text-emerald-500" /> },
            { id: 'products', label: 'Products', icon: <Package className="w-4 h-4 text-amber-500" /> },
            { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4 text-slate-400" /> },
          ].map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id as any)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-[var(--aura-radius-md)] text-xs font-semibold shrink-0 transition-all text-left
                ${activeTab === item.id
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] shadow-xs sval-metallic-pill'
                  : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] hover:text-[var(--aura-text-primary)]'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[var(--aura-text-primary)]">
                Operations & Revenue Overview
              </h2>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                Real-time metrics from European cluster nodes across Stockholm, Oslo and Copenhagen.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-0.5 rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)] flex items-center">
                {(['7d', '30d', '90d'] as const).map(range => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setTimeRange(range)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-all ${
                      timeRange === range 
                        ? 'bg-[var(--aura-surface-1)] text-[var(--aura-text-primary)] shadow-xs sval-metallic-pill' 
                        : 'text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]'
                    }`}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
              </div>
              <AuraButton 
                variant="outline" 
                size="sm" 
                leftIcon={<Download className="w-3.5 h-3.5 text-sky-500" />}
                onClick={() => addToast({ title: 'Report Exported', description: 'CSV financial sheet generated successfully.', type: 'success' })}
              >
                Export
              </AuraButton>
            </div>
          </div>

          {/* 4 Rich Metric Cards with Metallic Sheen and Jewel-Colored Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--aura-text-secondary)] font-medium">Total Revenue</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center shadow-xs">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono text-[var(--aura-text-primary)] mt-3">
                $84,500.00
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14.2% vs last month</span>
              </div>
            </div>

            <div className="p-4 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--aura-text-secondary)] font-medium">Orders Processed</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono text-[var(--aura-text-primary)] mt-3">
                1,284
              </div>
              <div className="flex items-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+8.4% volume</span>
              </div>
            </div>

            <div className="p-4 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--aura-text-secondary)] font-medium">Active Accounts</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-xs">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono text-[var(--aura-text-primary)] mt-3">
                42,890
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+2,140 new signups</span>
              </div>
            </div>

            <div className="p-4 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--aura-text-secondary)] font-medium">Conversion Rate</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-violet-600 text-white flex items-center justify-center shadow-xs">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono text-[var(--aura-text-primary)] mt-3">
                3.42%
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Optimal SLA pace</span>
              </div>
            </div>
          </div>

          {/* Revenue Trajectory & Bar Graph with Metallic Finish */}
          <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-[var(--aura-text-primary)] uppercase tracking-wider flex items-center gap-2">
                  <span>Revenue Trajectory & Pipeline Performance</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    WASM Aggregator
                  </span>
                </h3>
                <span className="text-[11px] text-[var(--aura-text-muted)]">
                  Net sales booked in EUR converted to USD across daily settlement cycles
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-sky-600 to-indigo-500 shadow-xs" />
                  <span className="text-[var(--aura-text-secondary)] font-medium">Actual Sales</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[var(--aura-surface-3)]" />
                  <span className="text-[var(--aura-text-secondary)] font-medium">Target Plan</span>
                </div>
              </div>
            </div>

            {/* Visual Bar Graph */}
            <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2 border-b border-[var(--aura-border-default)]">
              {[
                { day: 'Mon', h1: 50, h2: 40, val: '$12k' },
                { day: 'Tue', h1: 68, h2: 55, val: '$18k' },
                { day: 'Wed', h1: 85, h2: 70, val: '$24k' },
                { day: 'Thu', h1: 60, h2: 65, val: '$16k' },
                { day: 'Fri', h1: 92, h2: 80, val: '$28k' },
                { day: 'Sat', h1: 75, h2: 60, val: '$21k' },
                { day: 'Sun', h1: 88, h2: 72, val: '$25k' },
              ].map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-mono font-bold text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.val}
                  </div>
                  <div className="w-full max-w-[36px] flex items-end justify-center gap-1.5 h-32">
                    <div 
                      className="w-1/2 bg-gradient-to-t from-sky-600 to-indigo-500 rounded-t-[var(--aura-radius-xs)] transition-all duration-300 shadow-xs group-hover:from-sky-500 group-hover:to-indigo-400"
                      style={{ height: `${bar.h1}%` }} 
                    />
                    <div 
                      className="w-1/2 bg-[var(--aura-surface-3)] rounded-t-[var(--aura-radius-xs)] transition-all duration-300"
                      style={{ height: `${bar.h2}%` }} 
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--aura-text-secondary)]">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Ledger Table with Rich Avatars & Company Badges */}
          <div className="rounded-[var(--aura-radius-lg)] sval-metallic-card overflow-hidden">
            <div className="p-4 border-b border-[var(--aura-border-default)] flex items-center justify-between sval-metallic-surface">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-bold text-[var(--aura-text-primary)]">
                  Recent Global Enterprise Transactions
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[var(--aura-text-muted)]">
                5 Settled / 0 Disputed
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] font-semibold border-b border-[var(--aura-border-default)]">
                  <tr>
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Customer & Account</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Settlement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--aura-border-subtle)]">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-[var(--aura-surface-2)]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[var(--aura-color-accent)]">{tx.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={tx.avatar} 
                            alt={tx.customer} 
                            className="w-7 h-7 rounded-full object-cover border border-white/20 shadow-2xs" 
                          />
                          <span className="font-bold text-[var(--aura-text-primary)]">{tx.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1.5 text-[var(--aura-text-secondary)]">
                          <Building2 className="w-3.5 h-3.5 opacity-60 text-slate-400" />
                          {tx.company}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-extrabold text-[var(--aura-text-primary)]">{tx.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${tx.badgeColor}`}>
                          {tx.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-[var(--aura-text-muted)] font-mono">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
