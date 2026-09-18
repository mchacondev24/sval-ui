import React, { useState } from 'react';
import { 
  Palette, 
  Sliders, 
  Copy, 
  Check, 
  Save, 
  Sparkles, 
  Code, 
  Download,
  Eye
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraInput } from '../components/Input';
import { AuraBadge } from '../components/Badge';
import { AuraTabs } from '../components/Tabs';
import { useAura } from '../context';
import { THEME_PRESETS } from '../tokens';
import { AuraThemeEngine } from '../theme-engine';
import { saveThemeToSQLite } from '../sqlite-db';
import { ThemePreset } from '../../types';

export const ThemeStudioView: React.FC = () => {
  const { 
    theme, 
    themePreset, 
    setThemePreset, 
    density, 
    setDensity, 
    radiusMode, 
    setRadiusMode,
    updateCustomColor,
    addToast 
  } = useAura();

  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'json'>('css');
  const [copiedCode, setCopiedCode] = useState(false);
  const [themeNameInput, setThemeNameInput] = useState('My Custom Nordic Theme');
  const [isSaving, setIsSaving] = useState(false);

  const presets: { id: ThemePreset; label: string; mode: string }[] = [
    { id: 'nordic-light', label: 'Stockholm Light', mode: 'light' },
    { id: 'nordic-dark', label: 'Reykjavik Dark', mode: 'dark' },
    { id: 'fjord-blue', label: 'Bergen Fjord', mode: 'dark' },
    { id: 'forest-pine', label: 'Helsinki Pine', mode: 'dark' },
    { id: 'sandstone', label: 'Copenhagen Sand', mode: 'light' },
    { id: 'high-contrast', label: 'High Contrast (AAA)', mode: 'light' },
  ];

  const handleSaveToSqlite = async () => {
    setIsSaving(true);
    try {
      await saveThemeToSQLite({
        id: `custom-${Date.now()}`,
        name: themeNameInput,
        mode: theme.mode,
        primary_color: theme.tokens.primary,
        accent_color: theme.tokens.accent,
        radius: theme.radius.md,
        density: theme.density,
      });

      addToast({
        title: 'Theme Saved to SQLite',
        description: `"${themeNameInput}" inserted into aura_themes table.`,
        type: 'success',
      });
    } catch (e: any) {
      addToast({
        title: 'Save Failed',
        description: e.message,
        type: 'danger',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const codeExports = {
    css: AuraThemeEngine.exportAsCss(theme),
    tailwind: AuraThemeEngine.exportAsTailwindPlugin(theme),
    json: AuraThemeEngine.exportAsJson(theme),
  };

  const copyExportedCode = () => {
    navigator.clipboard.writeText(codeExports[activeCodeTab]);
    setCopiedCode(true);
    addToast({ title: 'Code Copied', description: `${activeCodeTab.toUpperCase()} configuration copied to clipboard.`, type: 'info' });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
              Aura Studio & Theme Engine
            </h2>
            <AuraBadge variant="accent">Dynamic Runtime</AuraBadge>
          </div>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
            Realtime CSS variable synthesis, token introspection, and instant SQLite persistence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AuraButton
            variant="primary"
            size="sm"
            onClick={handleSaveToSqlite}
            isLoading={isSaving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Theme to SQLite
          </AuraButton>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        {presets.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => setThemePreset(p.id)}
            className={`
              px-3.5 py-2 text-xs rounded-[var(--aura-radius-md)] font-medium border transition-all flex items-center gap-2
              ${themePreset === p.id
                ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-transparent shadow-xs'
                : 'bg-[var(--aura-surface-1)] text-[var(--aura-text-secondary)] border-[var(--aura-border-default)] hover:text-[var(--aura-text-primary)]'
              }
            `}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: THEME_PRESETS[p.id].tokens.accent }}
            />
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Two Column Layout: Editor Controls & Live Component Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Interactive Color & Token Controls */}
        <div className="flex flex-col gap-4">
          <AuraCard variant="solid" padding="md">
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-3">
              Semantic Color Tokens
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[var(--aura-text-secondary)] block mb-1">
                  Primary Brand
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.tokens.primary}
                    onChange={e => updateCustomColor('primary', e.target.value)}
                    className="w-8 h-8 rounded border border-[var(--aura-border-default)] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.tokens.primary}
                    onChange={e => updateCustomColor('primary', e.target.value)}
                    className="w-full text-xs font-mono h-8 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[var(--aura-text-secondary)] block mb-1">
                  Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.tokens.accent}
                    onChange={e => updateCustomColor('accent', e.target.value)}
                    className="w-8 h-8 rounded border border-[var(--aura-border-default)] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.tokens.accent}
                    onChange={e => updateCustomColor('accent', e.target.value)}
                    className="w-full text-xs font-mono h-8 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[var(--aura-text-secondary)] block mb-1">
                  Canvas Background
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.tokens.bg}
                    onChange={e => updateCustomColor('bg', e.target.value)}
                    className="w-8 h-8 rounded border border-[var(--aura-border-default)] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.tokens.bg}
                    onChange={e => updateCustomColor('bg', e.target.value)}
                    className="w-full text-xs font-mono h-8 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[var(--aura-text-secondary)] block mb-1">
                  Surface 1 (Card)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.tokens.surface1}
                    onChange={e => updateCustomColor('surface1', e.target.value)}
                    className="w-8 h-8 rounded border border-[var(--aura-border-default)] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={theme.tokens.surface1}
                    onChange={e => updateCustomColor('surface1', e.target.value)}
                    className="w-full text-xs font-mono h-8 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--aura-border-subtle)]">
              <label className="text-[11px] font-semibold text-[var(--aura-text-secondary)] block mb-1">
                Save Theme As
              </label>
              <AuraInput
                size="sm"
                value={themeNameInput}
                onChange={e => setThemeNameInput(e.target.value)}
                placeholder="Theme name..."
              />
            </div>
          </AuraCard>

          {/* Density & Radii Quick Selector */}
          <AuraCard variant="soft" padding="md">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--aura-text-secondary)] mb-2">
              Optical Geometry
            </h4>
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--aura-text-secondary)]">Corner Radius</span>
                <span className="font-mono text-[var(--aura-text-primary)]">{theme.radius.md}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--aura-text-secondary)]">Layout Density</span>
                <span className="font-mono text-[var(--aura-text-primary)] capitalize">{theme.density}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--aura-text-secondary)]">Typography Base</span>
                <span className="font-mono text-[var(--aura-text-primary)]">Plus Jakarta Sans 16px</span>
              </div>
            </div>
          </AuraCard>
        </div>

        {/* Right Column: Live Responsive Component Sandbox */}
        <div className="flex flex-col gap-4">
          <AuraCard variant="solid" padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--aura-text-primary)]">
                Live Dynamic Components Preview
              </h3>
              <AuraBadge variant="neutral" size="sm">Active Surface</AuraBadge>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <AuraButton variant="primary">Primary Trigger</AuraButton>
                <AuraButton variant="secondary">Secondary</AuraButton>
                <AuraButton variant="outline">Outline</AuraButton>
                <AuraButton variant="destructive">Destructive</AuraButton>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <AuraInput label="Sample Field" placeholder="Type here..." />
                <AuraInput label="Filled State" value="Stockholm Node" readOnly />
              </div>

              <div className="flex items-center gap-2">
                <AuraBadge variant="neutral" dot>Offline</AuraBadge>
                <AuraBadge variant="accent" dot>Synchronized</AuraBadge>
                <AuraBadge variant="success" dot>Active</AuraBadge>
                <AuraBadge variant="warning" dot>Pending</AuraBadge>
              </div>
            </div>
          </AuraCard>

          {/* Export Code Box */}
          <AuraCard variant="solid" padding="none">
            <div className="p-2.5 bg-[var(--aura-surface-2)]/70 border-b border-[var(--aura-border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--aura-text-secondary)]">
                <Code className="w-3.5 h-3.5 text-[var(--aura-color-accent)]" />
                <span>Export Configuration</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {(['css', 'tailwind', 'json'] as const).map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveCodeTab(tab)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded ${activeCodeTab === tab ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]' : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'}`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                <AuraButton variant="ghost" size="sm" onClick={copyExportedCode}>
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </AuraButton>
              </div>
            </div>

            <div className="p-3 bg-black/95 text-slate-200 text-xs font-mono max-h-40 overflow-y-auto">
              <pre className="whitespace-pre">{codeExports[activeCodeTab]}</pre>
            </div>
          </AuraCard>
        </div>
      </div>
    </div>
  );
};
