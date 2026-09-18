import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Trash2, 
  MoreVertical, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  AlertOctagon, 
  Mail, 
  Lock, 
  CreditCard,
  Download,
  Copy,
  Check,
  Plus
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraInput } from '../components/Input';
import { AuraSelect } from '../components/Select';
import { AuraCheckbox } from '../components/Checkbox';
import { AuraRadioGroup } from '../components/Radio';
import { AuraSwitch } from '../components/Switch';
import { AuraSlider } from '../components/Slider';
import { AuraBadge } from '../components/Badge';
import { AuraAlert } from '../components/Alert';
import { AuraAvatar, AuraAvatarGroup } from '../components/Avatar';
import { AuraProgress, AuraCircularProgress } from '../components/Progress';
import { AuraSpinner } from '../components/Spinner';
import { AuraSkeleton } from '../components/Skeleton';
import { AuraPagination } from '../components/Pagination';
import { AuraTabs } from '../components/Tabs';
import { AuraAccordion } from '../components/Accordion';
import { AuraBreadcrumb } from '../components/Breadcrumb';
import { AuraChip } from '../components/Chip';
import { AuraTextarea } from '../components/Textarea';
import { useAura } from '../context';

export const CheatsheetView: React.FC = () => {
  const { addToast } = useAura();
  const [btnLoading, setBtnLoading] = useState(false);
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(55);
  const [radioVal, setRadioVal] = useState('standard');
  const [page, setPage] = useState(2);

  return (
    <div className="flex flex-col gap-10 text-left font-sans w-full">
      {/* Cheatsheet Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
          <AuraBadge variant="primary" size="sm">Kitchen Sink</AuraBadge>
          <AuraBadge variant="neutral" size="sm">Universal Cheatsheet</AuraBadge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--aura-text-primary)]">
          Sval Component Cheatsheet
        </h1>
        <p className="text-sm text-[var(--aura-text-secondary)] mt-1.5 max-w-3xl leading-relaxed">
          Dense visual overview of all core Sval Design System primitives, variants, and interactive states in a single scannable reference canvas.
        </p>
      </div>

      {/* 1. BUTTONS */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-[var(--aura-text-primary)] pb-1.5 border-b border-[var(--aura-border-default)]">
          1. Buttons & Triggers
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <AuraButton variant="primary" size="md">Primary</AuraButton>
          <AuraButton variant="secondary" size="md">Secondary</AuraButton>
          <AuraButton variant="outline" size="md">Outline</AuraButton>
          <AuraButton variant="ghost" size="md">Ghost</AuraButton>
          <AuraButton variant="subtle" size="md">Subtle</AuraButton>
          <AuraButton variant="destructive" size="md">Destructive</AuraButton>
          <AuraButton variant="primary" size="md" isLoading>Loading</AuraButton>
          <AuraButton variant="primary" size="md" disabled>Disabled</AuraButton>
          <AuraButton variant="primary" size="sm">Small</AuraButton>
          <AuraButton variant="primary" size="lg">Large</AuraButton>
          <AuraButton variant="outline" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
            With Icon
          </AuraButton>
        </div>
      </section>

      {/* 2. FORM CONTROLS */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-[var(--aura-text-primary)] pb-1.5 border-b border-[var(--aura-border-default)]">
          2. Form Controls & Inputs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AuraInput
            label="Standard Text Input"
            placeholder="Type your name..."
            defaultValue="Stockholm Design Node"
          />
          <AuraInput
            label="With Icon & Clearable"
            leftIcon={<Mail className="w-4 h-4" />}
            isClearable
            defaultValue="contact@nordic.io"
          />
          <AuraInput
            label="Validation Error State"
            defaultValue="invalid-format"
            error="Please provide a valid Scandinavian VAT number."
          />
          <AuraSelect
            label="Select Dropdown"
            defaultValue="se"
            options={[
              { value: 'se', label: 'Stockholm, Sweden' },
              { value: 'no', label: 'Oslo, Norway' },
              { value: 'dk', label: 'Copenhagen, Denmark' },
            ]}
          />
          <AuraTextarea
            label="Textarea Box"
            defaultValue="Nordic design system token architecture with WCAG AAA accessibility."
            characterLimit={120}
          />
          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold text-[var(--aura-text-primary)]">Toggles & Checks</label>
            <div className="flex items-center gap-4">
              <AuraSwitch checked={switchVal} onChange={setSwitchVal} label="Switch" />
              <AuraCheckbox checked={checkboxVal} onChange={setCheckboxVal} label="Checkbox" />
            </div>
            <AuraSlider value={sliderVal} onChange={setSliderVal} min={0} max={100} label="Intensity Slider" />
          </div>
        </div>
      </section>

      {/* 3. BADGES & CHIPS */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-[var(--aura-text-primary)] pb-1.5 border-b border-[var(--aura-border-default)]">
          3. Badges, Indicators & Chips
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <AuraBadge variant="neutral" size="md">Neutral</AuraBadge>
          <AuraBadge variant="primary" size="md">Primary</AuraBadge>
          <AuraBadge variant="success" size="md">Success</AuraBadge>
          <AuraBadge variant="warning" size="md">Warning</AuraBadge>
          <AuraBadge variant="danger" size="md">Danger</AuraBadge>
          <AuraBadge variant="info" size="md">Info</AuraBadge>
          <AuraChip label="Removable Tag" onRemove={() => addToast({ title: 'Removed', description: 'Chip tag deleted', type: 'info' })} />
          <AuraChip label="Selected Category" selected />
          <AuraChip label="Outlined Filter" variant="outline" />
        </div>
      </section>

      {/* 4. ALERTS & CALLOUTS */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-[var(--aura-text-primary)] pb-1.5 border-b border-[var(--aura-border-default)]">
          4. Feedback Alerts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AuraAlert
            type="info"
            title="Design Token Synchronization"
            message="CSS variables are derived directly from the mathematical Nordic palette."
          />
          <AuraAlert
            type="success"
            title="Cluster Deployed"
            message="Node 04 in Stockholm has passed health check with 0ms errors."
          />
          <AuraAlert
            type="warning"
            title="Quota Warning"
            message="Storage pool has reached 84% capacity."
          />
          <AuraAlert
            type="danger"
            title="Session Expired"
            message="Please re-authenticate with your security token."
          />
        </div>
      </section>

      {/* 5. AVATARS & PROGRESS */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-[var(--aura-text-primary)] pb-1.5 border-b border-[var(--aura-border-default)]">
          5. Avatars & Progress Indicators
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <AuraAvatar name="Astrid Lindgren" size="sm" />
            <AuraAvatar name="Maxwell Chacon" size="md" />
            <AuraAvatar name="Henrik Ibsen" size="lg" />
          </div>

          <AuraAvatarGroup
            max={3}
            avatars={[
              { name: 'Kasper Schmeichel' },
              { name: 'Sigrid Undset' },
              { name: 'Elinor Ostrom' },
              { name: 'Jonas Lie' },
            ]}
          />

          <div className="w-44 flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-mono">
              <span>Progress</span>
              <span>68%</span>
            </div>
            <AuraProgress value={68} variant="primary" />
          </div>

          <div className="flex items-center gap-3">
            <AuraCircularProgress value={74} size={36} />
            <AuraSpinner size="md" />
          </div>
        </div>
      </section>

      {/* 6. SURFACES & ACCORDION */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-[var(--aura-text-primary)] pb-1.5 border-b border-[var(--aura-border-default)]">
          6. Surfaces & Accordion
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuraCard padding="md">
            <h4 className="text-xs font-bold text-[var(--aura-text-primary)]">Sval Surface Card</h4>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
              Flat, authentic 1px border contrast with zero gratuitous dropshadows.
            </p>
            <div className="mt-3">
              <AuraButton variant="outline" size="sm">Inspect Card</AuraButton>
            </div>
          </AuraCard>

          <AuraAccordion
            items={[
              {
                id: 'acc-1',
                title: 'What makes Sval Nordic?',
                content: 'Restrained typography, subtle 1px border tension, zero colored glows, and high-contrast accessibility.',
              },
              {
                id: 'acc-2',
                title: 'Does it support dark mode?',
                content: 'Yes, full token synchronization between Nordic Light and Nordic Dark out of the box.',
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};
