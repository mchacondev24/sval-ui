import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Eye, Keyboard, Sparkles, AlertTriangle, Info } from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { AuraInput } from '../components/Input';
import { AuraSwitch } from '../components/Switch';
import { AuraCheckbox } from '../components/Checkbox';
import { SvalExample } from './SvalExample';

export const AccessibilityView: React.FC = () => {
  const [testFocusVal, setTestFocusVal] = useState('Tab to me with keyboard');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const checklist = [
    { label: 'Keyboard Navigation (Tab, Space, Enter, Arrows)', status: 'Verified', desc: 'Every interactive element can be reached and activated solely via keyboard.' },
    { label: 'Visible Focus Rings (:focus-visible)', status: 'Verified', desc: 'High-contrast 2px outline with 2px offset ensures optical visibility for assistive technology.' },
    { label: 'WAI-ARIA 1.2 Roles & States', status: 'Verified', desc: 'Proper aria-expanded, aria-checked, aria-selected, aria-disabled, and role definitions.' },
    { label: 'WCAG 2.2 Level AA/AAA Color Contrast', status: 'Verified', desc: 'Text contrast exceeds 4.5:1; UI borders and component indicators exceed 3.0:1.' },
    { label: 'prefers-reduced-motion Support', status: 'Verified', desc: 'Spring and microinteractions gracefully clamp when reduced motion is requested by OS.' },
    { label: 'Accessible Form Field Association', status: 'Verified', desc: 'Inputs generate unique IDs linked to labels, helper text, and aria-describedby error announcements.' },
  ];

  return (
    <div className="flex flex-col gap-8 text-left font-sans">
      {/* Header */}
      <div className="p-6 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">
            A11y Compliance
          </span>
          <AuraBadge variant="success" size="sm" dot>WCAG 2.2 Ready</AuraBadge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
          Accessibility Lab & ARIA Protocol
        </h1>
        <p className="text-xs text-[var(--aura-text-secondary)] mt-2 max-w-2xl leading-relaxed">
          Sval is designed from the ground up to empower developers to deliver software that is completely accessible to all humans regardless of motor or visual differences.
        </p>
      </div>

      {/* Verification Checklist Matrix */}
      <AuraCard variant="solid" padding="md">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--aura-border-subtle)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)]">
              Accessibility Audit Matrix
            </h3>
          </div>
          <AuraBadge variant="success" size="sm">6 / 6 Standards Passed</AuraBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklist.map(item => (
            <div key={item.label} className="p-3.5 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)] bg-[var(--aura-surface-2)]/40 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-[var(--aura-text-primary)]">{item.label}</span>
                <p className="text-[11px] text-[var(--aura-text-secondary)] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </AuraCard>

      {/* Live Focus Playground */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-[var(--aura-text-primary)]">
          Live Keyboard Focus Playground
        </h2>
        <p className="text-xs text-[var(--aura-text-secondary)]">
          Press the <kbd className="font-mono text-[11px] bg-[var(--aura-surface-2)] px-1.5 py-0.5 rounded border border-[var(--aura-border-default)]">Tab</kbd> key to navigate between elements below. Observe the clear optical ring.
        </p>

        <SvalExample title="Keyboard Tab Sequence Testing">
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
            <AuraButton variant="primary" size="md">
              Focusable 1
            </AuraButton>
            <AuraButton variant="outline" size="md">
              Focusable 2
            </AuraButton>
            <AuraInput
              value={testFocusVal}
              onChange={e => setTestFocusVal(e.target.value)}
              className="w-56"
            />
            <AuraSwitch
              checked={highContrast}
              onChange={setHighContrast}
              label="High Contrast Ring"
            />
          </div>
        </SvalExample>
      </div>
    </div>
  );
};
