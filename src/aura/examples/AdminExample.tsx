import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Server, 
  Activity, 
  Key, 
  Search, 
  UserPlus, 
  MoreVertical, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  Cpu,
  Database,
  Radio,
  Fingerprint
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraBadge } from '../components/Badge';
import { AuraSwitch } from '../components/Switch';
import { AuraAvatar } from '../components/Avatar';
import { AuraProgress } from '../components/Progress';
import { useAura } from '../context';

export const AdminExample: React.FC = () => {
  const { addToast } = useAura();
  const [users, setUsers] = useState([
    { 
      id: 'usr-1', 
      name: 'Maxwell Chacón', 
      email: 'maxwell@sval-ui.dev', 
      role: 'Super Admin', 
      active: true, 
      twoFactor: true, 
      lastLogin: '10 min ago',
      avatar: 'https://avatars.githubusercontent.com/u/152914109?v=4'
    },
    { 
      id: 'usr-2', 
      name: 'Astrid Lindgren', 
      email: 'astrid@stockholm.se', 
      role: 'Security Lead', 
      active: true, 
      twoFactor: true, 
      lastLogin: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    { 
      id: 'usr-3', 
      name: 'Henrik Ibsen', 
      email: 'henrik@oslo.no', 
      role: 'Developer', 
      active: true, 
      twoFactor: false, 
      lastLogin: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    { 
      id: 'usr-4', 
      name: 'Kasper Schmeichel', 
      email: 'kasper@cph.dk', 
      role: 'Auditor', 
      active: false, 
      twoFactor: true, 
      lastLogin: '5 days ago',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
    },
    { 
      id: 'usr-5', 
      name: 'Sigrid Undset', 
      email: 'sigrid@nordic.is', 
      role: 'Developer', 
      active: true, 
      twoFactor: true, 
      lastLogin: 'Yesterday',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
    },
  ]);

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextActive = !u.active;
        addToast({
          title: `User ${u.name} ${nextActive ? 'Enabled' : 'Suspended'}`,
          description: `Access credentials have been updated in RBAC registry.`,
          type: nextActive ? 'success' : 'warning',
        });
        return { ...u, active: nextActive };
      }
      return u;
    }));
  };

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans sval-metallic-card shadow-lg">
      {/* Top Banner with Metallic Surface */}
      <div className="p-4 sm:p-5 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 sval-metallic-surface">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-rose-500 to-red-700 text-white flex items-center justify-center font-bold text-sm shadow-xs border border-white/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold tracking-tight text-[var(--aura-text-primary)]">
                Enterprise RBAC & Security Admin
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Audit Grade AAA
              </span>
            </div>
            <p className="text-[11px] text-[var(--aura-text-muted)] mt-0.5">
              Role permissions, multi-factor enforcement, and European server cluster monitoring.
            </p>
          </div>
        </div>

        <AuraButton 
          variant="primary" 
          size="sm" 
          leftIcon={<UserPlus className="w-3.5 h-3.5" />}
          onClick={() => addToast({ title: 'Invite User', description: 'Invitation modal opened for enterprise IAM.', type: 'info' })}
        >
          Invite Administrator
        </AuraButton>
      </div>

      {/* Main Container */}
      <div className="p-4 sm:p-6 flex flex-col gap-6">
        {/* System Health Indicators with Jewel Icons & Metallic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--aura-text-secondary)] flex items-center gap-2 font-semibold">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                Cluster Compute (Node 01-08)
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">24%</span>
            </div>
            <div className="mt-3">
              <AuraProgress value={24} variant="success" size="sm" />
            </div>
          </div>

          <div className="p-4 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--aura-text-secondary)] flex items-center gap-2 font-semibold">
                <div className="w-6 h-6 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Database className="w-3.5 h-3.5" />
                </div>
                Memory & SQLite Buffers
              </span>
              <span className="font-mono font-bold text-sky-600 dark:text-sky-400">4.2 / 8 GB</span>
            </div>
            <div className="mt-3">
              <AuraProgress value={52} variant="info" size="sm" />
            </div>
          </div>

          <div className="p-4 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--aura-text-secondary)] flex items-center gap-2 font-semibold">
                <div className="w-6 h-6 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                Average API Latency
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">38 ms</span>
            </div>
            <div className="mt-3">
              <AuraProgress value={18} variant="primary" size="sm" />
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="rounded-[var(--aura-radius-lg)] sval-metallic-card overflow-hidden">
          <div className="p-4 border-b border-[var(--aura-border-default)] flex items-center justify-between sval-metallic-surface">
            <div>
              <h3 className="text-xs font-bold text-[var(--aura-text-primary)]">
                Authorized Personnel ({users.length} registered)
              </h3>
              <p className="text-[11px] text-[var(--aura-text-muted)]">
                Toggle access switches to instantaneously invalidate active session cookies.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Fingerprint className="w-3 h-3" />
              FIDO2 2FA Enforced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] font-semibold border-b border-[var(--aura-border-default)]">
                <tr>
                  <th className="py-3 px-4">User & Identity</th>
                  <th className="py-3 px-4">Role & Privileges</th>
                  <th className="py-3 px-4">2FA Key Status</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4 text-center">Account Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--aura-border-subtle)]">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-[var(--aura-surface-2)]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover border border-white/20 shadow-2xs"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-[var(--aura-text-primary)]">{u.name}</span>
                          <span className="text-[10px] text-[var(--aura-text-muted)] font-mono">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        u.role === 'Super Admin'
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                          : u.role === 'Security Lead'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                          : 'bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {u.twoFactor ? (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>YubiKey Hardware</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5 font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>SMS Only</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[var(--aura-text-muted)] font-mono">
                      {u.lastLogin}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <AuraSwitch
                          checked={u.active}
                          onChange={() => toggleUserStatus(u.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
