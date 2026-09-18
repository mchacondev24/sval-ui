import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  Settings,
  Mail,
  Home,
  User,
  Bell,
  Download,
  Upload,
  Heart,
  Share2,
  Lock,
  Eye,
  Sliders,
  Maximize2
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';

export interface FoundationsViewProps {
  initialTab?: string;
}

export const FoundationsView: React.FC<FoundationsViewProps> = ({ initialTab = 'colors' }) => {
  const { addToast } = useAura();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [iconSearch, setIconSearch] = useState('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    addToast({
      title: 'Token Copied',
      description: `Copied ${text} to clipboard.`,
      type: 'success',
    });
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const iconList = [
    { name: 'Search', icon: <Search className="w-5 h-5" /> },
    { name: 'Home', icon: <Home className="w-5 h-5" /> },
    { name: 'User', icon: <User className="w-5 h-5" /> },
    { name: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { name: 'Mail', icon: <Mail className="w-5 h-5" /> },
    { name: 'Bell', icon: <Bell className="w-5 h-5" /> },
    { name: 'CheckCircle2', icon: <CheckCircle2 className="w-5 h-5" /> },
    { name: 'AlertTriangle', icon: <AlertTriangle className="w-5 h-5" /> },
    { name: 'Info', icon: <Info className="w-5 h-5" /> },
    { name: 'ShieldCheck', icon: <ShieldCheck className="w-5 h-5" /> },
    { name: 'Trash2', icon: <Trash2 className="w-5 h-5" /> },
    { name: 'Sparkles', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'ArrowRight', icon: <ArrowRight className="w-5 h-5" /> },
    { name: 'Download', icon: <Download className="w-5 h-5" /> },
    { name: 'Upload', icon: <Upload className="w-5 h-5" /> },
    { name: 'Heart', icon: <Heart className="w-5 h-5" /> },
    { name: 'Share2', icon: <Share2 className="w-5 h-5" /> },
    { name: 'Lock', icon: <Lock className="w-5 h-5" /> },
    { name: 'Eye', icon: <Eye className="w-5 h-5" /> },
    { name: 'Sliders', icon: <Sliders className="w-5 h-5" /> },
  ];

  const filteredIcons = iconList.filter(i => 
    i.name.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 text-left font-sans">
      {/* Header Banner */}
      <div className="p-6 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">
                Design Tokens
              </span>
              <AuraBadge variant="neutral" size="sm">Nordic Specification</AuraBadge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
              Foundations & Design Tokens
            </h1>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
              Every color, typographic step, border radius, and motion curve is calibrated using mathematical step ratios and strict Nordic minimalism principles.
            </p>
          </div>
        </div>

        {/* Quick Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 border-t border-[var(--aura-border-subtle)] pt-4">
          {[
            { id: 'colors', label: 'Color System' },
            { id: 'typography', label: 'Typography' },
            { id: 'spacing', label: 'Spacing & Scale' },
            { id: 'radius', label: 'Radius & Borders' },
            { id: 'shadows', label: 'Shadows & Elevation' },
            { id: 'icons', label: 'Icon Gallery' },
            { id: 'motion', label: 'Motion & Physics' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 py-1.5 rounded-[var(--aura-radius-sm)] text-xs font-medium whitespace-nowrap transition-colors
                ${activeTab === tab.id
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold'
                  : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-2)]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. COLORS TAB */}
      {activeTab === 'colors' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Primary (Kola / Fjord)', var: '--aura-color-primary', bg: 'var(--aura-color-primary)', text: 'var(--aura-color-primary-foreground)', desc: 'Main interactive call-to-action tone' },
              { name: 'Accent (Nordic Blue)', var: '--aura-color-accent', bg: 'var(--aura-color-accent)', text: '#ffffff', desc: 'Informational and link indicators' },
              { name: 'Success (Pine Green)', var: '--aura-color-success', bg: 'var(--aura-color-success)', text: '#ffffff', desc: 'Positive affirmations and status checks' },
              { name: 'Warning (Amber Hearth)', var: '--aura-color-warning', bg: 'var(--aura-color-warning)', text: '#000000', desc: 'Cautious warnings and alerts' },
              { name: 'Danger (Crimson Tundra)', var: '--aura-color-danger', bg: 'var(--aura-color-danger)', text: '#ffffff', desc: 'Destructive alerts and error indicators' },
              { name: 'Background', var: '--aura-bg', bg: 'var(--aura-bg)', text: 'var(--aura-text-primary)', desc: 'Canvas backdrop with calibrated warmth' },
              { name: 'Surface Level 1', var: '--aura-surface-1', bg: 'var(--aura-surface-1)', text: 'var(--aura-text-primary)', desc: 'Primary card and modal container layer' },
              { name: 'Surface Level 2', var: '--aura-surface-2', bg: 'var(--aura-surface-2)', text: 'var(--aura-text-primary)', desc: 'Secondary elevation, inputs, and pills' },
            ].map(col => (
              <div 
                key={col.var} 
                onClick={() => handleCopy(`var(${col.var})`, col.var)}
                className="group p-3 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] hover:border-[var(--aura-color-primary)] cursor-pointer transition-all shadow-xs"
              >
                <div 
                  className="w-full h-16 rounded-[var(--aura-radius-sm)] border border-black/10 flex items-end p-2 transition-transform group-hover:scale-[1.01]" 
                  style={{ backgroundColor: col.bg, color: col.text }}
                >
                  <span className="text-[10px] font-mono font-bold">{col.var}</span>
                </div>
                <div className="mt-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--aura-text-primary)]">{col.name}</span>
                    <span className="text-[10px] font-mono text-[var(--aura-text-muted)] group-hover:text-[var(--aura-color-primary)]">
                      {copiedToken === col.var ? '✓ Copied' : 'Copy'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--aura-text-secondary)] mt-0.5">{col.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TYPOGRAPHY TAB */}
      {activeTab === 'typography' && (
        <div className="flex flex-col gap-6">
          <AuraCard variant="solid" padding="md">
            <h3 className="text-sm font-semibold mb-4 text-[var(--aura-text-primary)]">Typographic Scale (Major Second 1.125)</h3>
            <div className="flex flex-col divide-y divide-[var(--aura-border-subtle)]">
              {[
                { level: 'Display 2XL', size: '36px', weight: 'Bold', sample: 'Sval Universal Design System' },
                { level: 'Heading XL', size: '24px', weight: 'Bold', sample: 'Crafted for Scalable Web Infrastructure' },
                { level: 'Heading LG', size: '20px', weight: 'SemiBold', sample: 'Mathematical step ratios with high optical balance' },
                { level: 'Body MD', size: '14px', weight: 'Regular', sample: 'Default prose typography offering optimal readability with 1.6 line height.' },
                { level: 'Caption SM', size: '12px', weight: 'Medium', sample: 'Metadata, labels, badges, and contextual annotations.' },
                { level: 'Code / Mono', size: '11px', weight: 'Mono', sample: 'const sval = new SvalUI({ theme: "nordic-light" });' },
              ].map(t => (
                <div key={t.level} className="py-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <div className="w-40 shrink-0">
                    <span className="text-xs font-semibold text-[var(--aura-text-primary)]">{t.level}</span>
                    <div className="text-[10px] font-mono text-[var(--aura-text-muted)]">{t.size} · {t.weight}</div>
                  </div>
                  <div className="flex-1 text-[var(--aura-text-primary)]" style={{ fontSize: t.size }}>
                    {t.sample}
                  </div>
                </div>
              ))}
            </div>
          </AuraCard>
        </div>
      )}

      {/* 3. SPACING TAB */}
      {activeTab === 'spacing' && (
        <div className="flex flex-col gap-6">
          <AuraCard variant="solid" padding="md">
            <h3 className="text-sm font-semibold mb-4 text-[var(--aura-text-primary)]">Spacing Scale (4px Harmonic Grid)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { token: '--aura-space-1', px: '4px', desc: 'Tight micro-gaps inside badges & compact items' },
                { token: '--aura-space-2', px: '8px', desc: 'Standard inline gaps between icons & labels' },
                { token: '--aura-space-3', px: '12px', desc: 'Input field padding & small card padding' },
                { token: '--aura-space-4', px: '16px', desc: 'Default component container padding' },
                { token: '--aura-space-6', px: '24px', desc: 'Section breaks and medium card padding' },
                { token: '--aura-space-8', px: '32px', desc: 'Major dashboard grid and container gutters' },
              ].map(s => (
                <div key={s.token} className="p-3 border border-[var(--aura-border-subtle)] rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)]/40 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[var(--aura-color-accent)]">{s.token}</span>
                    <p className="text-[11px] text-[var(--aura-text-secondary)] mt-0.5">{s.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--aura-text-primary)]">{s.px}</span>
                    <div className="h-6 bg-[var(--aura-color-primary)] rounded" style={{ width: s.px }} />
                  </div>
                </div>
              ))}
            </div>
          </AuraCard>
        </div>
      )}

      {/* 4. RADIUS & BORDERS */}
      {activeTab === 'radius' && (
        <div className="flex flex-col gap-6">
          <AuraCard variant="solid" padding="md">
            <h3 className="text-sm font-semibold mb-4 text-[var(--aura-text-primary)]">Corner Radii Tokens</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Radius SM (4px)', var: '--aura-radius-sm', radius: '4px', for: 'Buttons, Inputs, Badges' },
                { name: 'Radius MD (8px)', var: '--aura-radius-md', radius: '8px', for: 'Dropdowns, Alerts, Cards' },
                { name: 'Radius LG (12px)', var: '--aura-radius-lg', radius: '12px', for: 'Modals, Drawers' },
                { name: 'Radius Pill (9999px)', var: '--aura-radius-pill', radius: '9999px', for: 'Switches, Status Pills' },
              ].map(r => (
                <div key={r.var} className="p-4 border border-[var(--aura-border-default)] bg-[var(--aura-surface-2)] flex flex-col items-center text-center gap-3">
                  <div 
                    className="w-16 h-16 bg-[var(--aura-color-primary)]/15 border-2 border-[var(--aura-color-primary)] flex items-center justify-center font-mono text-xs font-bold text-[var(--aura-color-primary)]"
                    style={{ borderRadius: r.radius }}
                  >
                    {r.radius}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--aura-text-primary)]">{r.name}</span>
                    <p className="text-[10px] text-[var(--aura-text-muted)] mt-0.5">{r.for}</p>
                  </div>
                </div>
              ))}
            </div>
          </AuraCard>
        </div>
      )}

      {/* 5. SHADOWS TAB */}
      {activeTab === 'shadows' && (
        <div className="flex flex-col gap-6">
          <AuraCard variant="solid" padding="md">
            <h3 className="text-sm font-semibold mb-4 text-[var(--aura-text-primary)]">Restrained Nordic Elevation</h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mb-6 max-w-2xl">
              Nordic design avoids murky, wide-diffused dark drop shadows. Instead, we combine a subtle 1px border with optical elevation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: 'Flat (Border Only)', shadow: 'none', desc: 'Standard cards, table rows, and quiet inputs' },
                { name: 'Subtle (Shadow SM)', shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', desc: 'Hover states, buttons, dropdown triggers' },
                { name: 'Floating (Shadow MD)', shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', desc: 'Modals, dialog overlays, command palette' },
              ].map(s => (
                <div 
                  key={s.name} 
                  className="p-6 rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] flex flex-col justify-center items-center text-center gap-2"
                  style={{ boxShadow: s.shadow }}
                >
                  <span className="text-xs font-semibold text-[var(--aura-text-primary)]">{s.name}</span>
                  <p className="text-[11px] text-[var(--aura-text-secondary)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </AuraCard>
        </div>
      )}

      {/* 6. ICONS GALLERY TAB */}
      {activeTab === 'icons' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--aura-text-primary)]">Curated Icon Library</h3>
              <p className="text-xs text-[var(--aura-text-secondary)]">Standardized 24px/16px vector glyphs with consistent 1.75px optical stroke weight.</p>
            </div>
            <div className="relative w-64">
              <input
                type="text"
                value={iconSearch}
                onChange={e => setIconSearch(e.target.value)}
                placeholder="Search icons..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] focus:outline-none focus:border-[var(--aura-color-primary)]"
              />
              <Search className="w-3.5 h-3.5 text-[var(--aura-text-muted)] absolute left-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredIcons.map(item => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleCopy(`<${item.name} className="w-4 h-4" />`, item.name)}
                className="p-4 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] hover:bg-[var(--aura-surface-2)] hover:border-[var(--aura-color-primary)] flex flex-col items-center justify-center gap-2.5 transition-all text-center group"
              >
                <div className="text-[var(--aura-text-primary)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-xs font-mono text-[var(--aura-text-secondary)] group-hover:text-[var(--aura-text-primary)]">
                  {item.name}
                </span>
                <span className="text-[10px] text-[var(--aura-text-muted)] font-mono">
                  {copiedToken === item.name ? '✓ Copied' : 'Click to copy'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 7. MOTION TAB */}
      {activeTab === 'motion' && (
        <div className="flex flex-col gap-6">
          <AuraCard variant="solid" padding="md">
            <h3 className="text-sm font-semibold mb-2 text-[var(--aura-text-primary)]">Motion Curves & Physics</h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mb-6 max-w-2xl">
              Microinteractions use physical spring dampening and cubic-bezier transitions between 150ms and 250ms. No jarring bounces or slow decorative fades.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-2)] flex flex-col gap-2">
                <span className="text-xs font-semibold text-[var(--aura-text-primary)]">Fast Response (150ms)</span>
                <span className="font-mono text-[10px] text-[var(--aura-text-muted)]">cubic-bezier(0.16, 1, 0.3, 1)</span>
                <p className="text-[11px] text-[var(--aura-text-secondary)] mt-1">Used for button presses, checkbox checks, and hover highlights.</p>
              </div>

              <div className="p-4 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-2)] flex flex-col gap-2">
                <span className="text-xs font-semibold text-[var(--aura-text-primary)]">Standard Modal (200ms)</span>
                <span className="font-mono text-[10px] text-[var(--aura-text-muted)]">cubic-bezier(0.4, 0, 0.2, 1)</span>
                <p className="text-[11px] text-[var(--aura-text-secondary)] mt-1">Used for popovers, dropdown disclosures, and tooltips.</p>
              </div>

              <div className="p-4 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-2)] flex flex-col gap-2">
                <span className="text-xs font-semibold text-[var(--aura-text-primary)]">Page & Overlay (250ms)</span>
                <span className="font-mono text-[10px] text-[var(--aura-text-muted)]">cubic-bezier(0.0, 0, 0.2, 1)</span>
                <p className="text-[11px] text-[var(--aura-text-secondary)] mt-1">Used for full dialog entrances and drawer sheets.</p>
              </div>
            </div>
          </AuraCard>
        </div>
      )}
    </div>
  );
};
