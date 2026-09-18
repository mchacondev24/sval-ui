import React, { useState } from 'react';
import { 
  Key, 
  Shield, 
  Bell, 
  Database, 
  Check, 
  Copy, 
  RefreshCw,
  Globe,
  Sliders
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraInput } from '../components/Input';
import { AuraSwitch } from '../components/Switch';
import { AuraBadge } from '../components/Badge';
import { AuraSelect } from '../components/Select';
import { useAura } from '../context';

export const SettingsProfileTemplate: React.FC = () => {
  const { theme, density, setDensity, radiusMode, setRadiusMode, addToast } = useAura();
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [sqliteSync, setSqliteSync] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [deployRegion, setDeployRegion] = useState('stockholm');

  const copyKey = () => {
    navigator.clipboard.writeText('aura_live_9f0d32f42843443a81ee');
    setApiKeyCopied(true);
    addToast({ title: 'API Key Copied', description: 'Token saved to system clipboard.', type: 'info' });
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
          Account & Environment Configuration
        </h2>
        <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
          Manage system density, token persistence, and SQLite replication parameters.
        </p>
      </div>

      {/* Organization Card */}
      <AuraCard variant="solid" padding="md">
        <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-4">
          Identidad & Repositorio Público
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AuraInput
            label="Principal Author"
            value="Maxwell Chacón"
            readOnly
            hint="Lead Architect & Open Source Maintainer"
          />

          <AuraInput
            label="Official Repository Endpoint"
            value="https://github.com/mchacondev24/sval-ui"
            readOnly
            hint="Public open-source repository (Nicaragua 🇳🇮)"
          />
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--aura-border-subtle)] flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-wide text-[var(--aura-text-secondary)] uppercase">
            Identificador del Paquete Público NPM
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value="@sval-ui/core@1.0.0-rc.1"
              readOnly
              className="w-full text-xs font-mono h-9 px-3 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
            />
            <AuraButton variant="outline" size="sm" onClick={copyKey} leftIcon={apiKeyCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}>
              {apiKeyCopied ? 'Copiado' : 'Copiar'}
            </AuraButton>
          </div>
        </div>
      </AuraCard>

      {/* Design System Density & Radii */}
      <AuraCard variant="solid" padding="md">
        <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-4">
          Design Token Matrix Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold tracking-wide text-[var(--aura-text-secondary)] uppercase mb-2 block">
              Layout Density Mode
            </label>
            <div className="flex items-center gap-2">
              {(['compact', 'comfortable', 'spacious'] as const).map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDensity(d)}
                  className={`
                    flex-1 py-2 text-xs font-medium rounded-[var(--aura-radius-md)] border transition-all capitalize
                    ${density === d
                      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-[var(--aura-color-primary)] shadow-xs'
                      : 'bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] border-[var(--aura-border-default)] hover:text-[var(--aura-text-primary)]'
                    }
                  `}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[var(--aura-text-muted)] mt-1.5">
              Affects paddings, row heights, and spacing tokens dynamically.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wide text-[var(--aura-text-secondary)] uppercase mb-2 block">
              Corner Radius Philosophy
            </label>
            <div className="flex items-center gap-2">
              {(['sharp', 'subtle', 'organic', 'pill'] as const).map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRadiusMode(r)}
                  className={`
                    flex-1 py-2 text-xs font-medium rounded-[var(--aura-radius-md)] border transition-all capitalize
                    ${radiusMode === r
                      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-[var(--aura-color-primary)] shadow-xs'
                      : 'bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] border-[var(--aura-border-default)] hover:text-[var(--aura-text-primary)]'
                    }
                  `}
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[var(--aura-text-muted)] mt-1.5">
              Updates --aura-radius-* variables globally across every component.
            </p>
          </div>
        </div>
      </AuraCard>

      {/* Security & SQLite Preferences */}
      <AuraCard variant="solid" padding="md">
        <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-4">
          Local SQLite Engine & Sync Protocol
        </h3>

        <div className="flex flex-col gap-4">
          <AuraSwitch
            checked={sqliteSync}
            onChange={setSqliteSync}
            label="In-Memory SQLite Snapshot"
            description="Keep local schema and component audit logs preserved in WebAssembly SQLite"
          />

          <AuraSwitch
            checked={mfaEnabled}
            onChange={setMfaEnabled}
            label="Hardware FIDO2 Security Gate"
            description="Require cryptographic token confirmation before generating production tarballs"
          />
        </div>
      </AuraCard>
    </div>
  );
};
