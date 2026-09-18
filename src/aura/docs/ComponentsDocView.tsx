import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Trash2, 
  MoreVertical, 
  Mail, 
  Lock, 
  CreditCard,
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  AlertOctagon,
  ArrowRight,
  ChevronRight,
  Home,
  User,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraInput } from '../components/Input';
import { AuraSelect } from '../components/Select';
import { AuraCheckbox } from '../components/Checkbox';
import { AuraRadioGroup } from '../components/Radio';
import { AuraSwitch } from '../components/Switch';
import { AuraSlider } from '../components/Slider';
import { AuraDatePicker } from '../components/DatePicker';
import { AuraCard } from '../components/Card';
import { AuraAlert } from '../components/Alert';
import { AuraBadge } from '../components/Badge';
import { AuraAvatar, AuraAvatarGroup } from '../components/Avatar';
import { AuraDialog } from '../components/Dialog';
import { AuraDropdown } from '../components/Dropdown';
import { AuraTooltip } from '../components/Tooltip';
import { AuraPopover } from '../components/Popover';
import { AuraTabs } from '../components/Tabs';
import { AuraAccordion } from '../components/Accordion';
import { AuraDataTable } from '../components/DataTable';
import { AuraPagination } from '../components/Pagination';
import { AuraProgress, AuraCircularProgress } from '../components/Progress';
import { AuraSpinner } from '../components/Spinner';
import { AuraSkeleton } from '../components/Skeleton';
import { AuraBreadcrumb } from '../components/Breadcrumb';
import { AuraTextarea } from '../components/Textarea';
import { AuraChip } from '../components/Chip';
import { AuraDrawer } from '../components/Drawer';
import { AuraStepper } from '../components/Stepper';
import { AuraFileUpload } from '../components/FileUpload';
import { AuraButtonGroup } from '../components/ButtonGroup';
import { AuraDivider } from '../components/Divider';
import { SvalExample } from './SvalExample';
import { PropsTable } from './PropsTable';
import { useAura } from '../context';

export interface ComponentsDocViewProps {
  componentId: string;
}

export const ComponentsDocView: React.FC<ComponentsDocViewProps> = ({ componentId }) => {
  const { addToast } = useAura();

  // Button Playground State
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'destructive'>('primary');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Input Playground State
  const [inputVal, setInputVal] = useState('Stockholm Central Hub');
  const [inputState, setInputState] = useState<'default' | 'error' | 'warning' | 'disabled'>('default');

  // Select Playground State
  const [selectVal, setSelectVal] = useState('stockholm');

  // Checkbox State
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);

  // Radio State
  const [radioVal, setRadioVal] = useState('card');

  // Switch State
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(true);

  // Slider State
  const [sliderVal, setSliderVal] = useState(65);

  // DatePicker State
  const [dateVal, setDateVal] = useState('2026-09-16');

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'basic' | 'confirm' | 'destructive'>('basic');

  // Pagination State
  const [page, setPage] = useState(1);

  // Drawer & Stepper State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [stepperStep, setStepperStep] = useState(1);
  const [chipSelected, setChipSelected] = useState(true);

  // Sample data for DataTable
  const sampleUsers = [
    { id: 'USR-01', name: 'Astrid Lindgren', email: 'astrid@stockholm.se', role: 'Architect', status: 'active', quota: '94%' },
    { id: 'USR-02', name: 'Henrik Ibsen', email: 'henrik@oslo.no', role: 'Maintainer', status: 'active', quota: '68%' },
    { id: 'USR-03', name: 'Kasper Schmeichel', email: 'kasper@cph.dk', role: 'Developer', status: 'pending', quota: '42%' },
    { id: 'USR-04', name: 'Sigrid Valdimar', email: 'sigrid@reykjavik.is', role: 'Security Lead', status: 'active', quota: '85%' },
    { id: 'USR-05', name: 'Elinor Ostrom', email: 'elinor@nordic.io', role: 'DevOps', status: 'inactive', quota: '12%' },
  ];

  // ----------------------------------------------------
  // BUTTON DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-button') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Primitives</AuraBadge>
            <AuraBadge variant="success" size="sm">Stable</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Button</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Universal interactive trigger featuring tactile microinteractions, zero noisy drop shadows, restrained 1px border tension, and WCAG AA focus compliance.
          </p>
        </div>

        {/* Live Interactive Playground */}
        <SvalExample
          title="Interactive Button Playground"
          code={{
            react: `<AuraButton variant="${btnVariant}" size="${btnSize}" isLoading={${btnLoading}} disabled={${btnDisabled}}>
  Interactive Trigger
</AuraButton>`,
            angular: `<button auraButton="${btnVariant}" size="${btnSize}" [isLoading]="${btnLoading}" [disabled]="${btnDisabled}">
  Interactive Trigger
</button>`,
            blazor: `<AuraButton Variant="ButtonVariant.${btnVariant.charAt(0).toUpperCase() + btnVariant.slice(1)}" Size="ButtonSize.${btnSize.toUpperCase()}">
  Interactive Trigger
</AuraButton>`,
            html: `<button class="sval-btn sval-btn--${btnVariant} sval-btn--${btnSize}">Interactive Trigger</button>`,
          }}
        >
          <div className="flex flex-col items-center gap-6 w-full">
            <AuraButton
              variant={btnVariant}
              size={btnSize}
              isLoading={btnLoading}
              disabled={btnDisabled}
              onClick={() => addToast({ title: 'Button Triggered', description: `Clicked ${btnVariant} button!`, type: 'info' })}
            >
              Interactive Trigger
            </AuraButton>

            {/* Controls */}
            <div className="w-full pt-4 border-t border-[var(--aura-border-subtle)] flex flex-wrap items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[var(--aura-text-muted)]">Variant:</span>
                {(['primary', 'secondary', 'outline', 'ghost', 'subtle', 'destructive'] as const).map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setBtnVariant(v)}
                    className={`px-2 py-1 rounded text-[11px] font-medium border ${btnVariant === v ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]' : 'bg-[var(--aura-surface-2)] border-[var(--aura-border-default)]'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[var(--aura-text-muted)]">Size:</span>
                {(['sm', 'md', 'lg'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setBtnSize(s)}
                    className={`px-2 py-1 rounded text-[11px] font-medium border ${btnSize === s ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]' : 'bg-[var(--aura-surface-2)] border-[var(--aura-border-default)]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <AuraSwitch checked={btnLoading} onChange={setBtnLoading} label="Loading" size="sm" />
                <AuraSwitch checked={btnDisabled} onChange={setBtnDisabled} label="Disabled" size="sm" />
              </div>
            </div>
          </div>
        </SvalExample>

        {/* Variants Section */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Visual Variants</h3>
          <p className="text-xs text-[var(--aura-text-secondary)] mb-4">Establish clear visual hierarchy without distracting color noise.</p>
          <SvalExample
            title="All Button Variants"
            code={{
              react: `<div className="flex flex-wrap gap-2">
  <AuraButton variant="primary">Primary</AuraButton>
  <AuraButton variant="secondary">Secondary</AuraButton>
  <AuraButton variant="outline">Outline</AuraButton>
  <AuraButton variant="ghost">Ghost</AuraButton>
  <AuraButton variant="subtle">Subtle</AuraButton>
  <AuraButton variant="destructive">Destructive</AuraButton>
</div>`,
            }}
          >
            <div className="flex flex-wrap gap-2.5 items-center justify-center">
              <AuraButton variant="primary">Primary</AuraButton>
              <AuraButton variant="secondary">Secondary</AuraButton>
              <AuraButton variant="outline">Outline</AuraButton>
              <AuraButton variant="ghost">Ghost</AuraButton>
              <AuraButton variant="subtle">Subtle</AuraButton>
              <AuraButton variant="destructive">Destructive</AuraButton>
            </div>
          </SvalExample>
        </div>

        {/* Sizes & With Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Sizes</h3>
            <SvalExample
              title="Button Sizes"
              code={{
                react: `<AuraButton size="sm">Small (32px)</AuraButton>
<AuraButton size="md">Medium (40px)</AuraButton>
<AuraButton size="lg">Large (48px)</AuraButton>`,
              }}
            >
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <AuraButton size="sm">Small</AuraButton>
                <AuraButton size="md">Medium</AuraButton>
                <AuraButton size="lg">Large</AuraButton>
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">With Icons & Icon Only</h3>
            <SvalExample
              title="Icon Integrations"
              code={{
                react: `<AuraButton leftIcon={<Search className="w-4 h-4" />}>Search</AuraButton>
<AuraButton leftIcon={<Plus className="w-4 h-4" />}>Add Item</AuraButton>
<AuraButton variant="destructive" leftIcon={<Trash2 className="w-4 h-4" />}>Delete</AuraButton>
<AuraButton variant="outline" aria-label="Settings"><Settings className="w-4 h-4" /></AuraButton>`,
              }}
            >
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <AuraButton leftIcon={<Search className="w-4 h-4" />}>Search</AuraButton>
                <AuraButton leftIcon={<Plus className="w-4 h-4" />}>Add</AuraButton>
                <AuraButton variant="destructive" leftIcon={<Trash2 className="w-4 h-4" />}>Delete</AuraButton>
                <AuraButton variant="outline" aria-label="More options"><MoreVertical className="w-4 h-4" /></AuraButton>
              </div>
            </SvalExample>
          </div>
        </div>

        {/* Full Width */}
        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Full Width</h3>
          <SvalExample
            title="Block / Full Width Button"
            code={{
              react: `<AuraButton fullWidth variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
  Continue to Checkout
</AuraButton>`,
            }}
          >
            <div className="w-full max-w-sm">
              <AuraButton fullWidth variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue to Checkout
              </AuraButton>
            </div>
          </SvalExample>
        </div>

        <PropsTable
          props={[
            { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'destructive'", default: "'primary'", description: 'Visual hierarchy style' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Physical scale and touch target' },
            { name: 'isLoading', type: 'boolean', default: 'false', description: 'Replaces leading icon with spinning indicator' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables pointer and keyboard triggers' },
            { name: 'leftIcon', type: 'ReactNode', default: 'undefined', description: 'Icon glyph displayed before label' },
            { name: 'rightIcon', type: 'ReactNode', default: 'undefined', description: 'Icon glyph displayed after label' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Expands button across entire parent width' },
          ]}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // INPUT DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-input') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Forms</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Input</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            High-precision text input with associated label pairing, inline validation error alerts, instant clear button, and contextual leading icons.
          </p>
        </div>

        <SvalExample
          title="Input States & Variations"
          code={{
            react: `<div className="space-y-4 max-w-sm w-full">
  <AuraInput label="Workspace Name" value={val} onChange={e => setVal(e.target.value)} isClearable />
  <AuraInput label="Email Address" placeholder="name@domain.com" leftIcon={<Mail className="w-4 h-4" />} />
  <AuraInput label="Database Host" error="Connection timed out to cluster" value="192.168.1.1" />
  <AuraInput label="System Key" disabled value="sval_live_key_9281726" />
</div>`,
          }}
        >
          <div className="w-full max-w-sm flex flex-col gap-4">
            <AuraInput
              label="Standard Text Input"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              isClearable
              onClear={() => setInputVal('')}
              hint="Click cross to clear value immediately"
            />

            <AuraInput
              label="With Leading Icon"
              placeholder="you@domain.se"
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <AuraInput
              label="With Validation Error"
              value="invalid-format@"
              error="Please provide a fully qualified corporate email"
            />

            <AuraInput
              label="Disabled Input"
              value="Read-only system identifier"
              disabled
            />
          </div>
        </SvalExample>

        <PropsTable
          props={[
            { name: 'label', type: 'string', default: 'undefined', description: 'Semantic header label' },
            { name: 'placeholder', type: 'string', default: 'undefined', description: 'Ghost placeholder text' },
            { name: 'hint', type: 'string', default: 'undefined', description: 'Subtle guidance caption' },
            { name: 'error', type: 'string', default: 'undefined', description: 'Inline validation message' },
            { name: 'isClearable', type: 'boolean', default: 'false', description: 'Shows right clear trigger' },
            { name: 'leftIcon', type: 'ReactNode', default: 'undefined', description: 'Contextual leading glyph' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables field input' },
          ]}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // SELECT DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-select') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Forms</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Select / Combobox</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Accessible custom select dropdown with live search filter, option descriptions, and keyboard arrow navigation.
          </p>
        </div>

        <SvalExample
          title="Searchable Select Component"
          code={{
            react: `<AuraSelect
  label="Deployment Region"
  value={val}
  onChange={setVal}
  searchable
  options={[
    { value: 'stockholm', label: 'Stockholm, Sweden', description: 'Central Node (8ms)' },
    { value: 'oslo', label: 'Oslo, Norway', description: 'Maritime Hub (12ms)' },
    { value: 'copenhagen', label: 'Copenhagen, Denmark', description: 'Design Studio (14ms)' },
    { value: 'reykjavik', label: 'Reykjavik, Iceland', description: 'Geothermal DC (19ms)' },
  ]}
/>`,
          }}
        >
          <div className="w-full max-w-sm">
            <AuraSelect
              label="Primary Node Region"
              value={selectVal}
              onChange={setSelectVal}
              searchable
              options={[
                { value: 'stockholm', label: 'Stockholm, Sweden', description: 'Central Core (8ms)' },
                { value: 'oslo', label: 'Oslo, Norway', description: 'Fjord DC (12ms)' },
                { value: 'copenhagen', label: 'Copenhagen, Denmark', description: 'Oresund Hub (14ms)' },
                { value: 'helsinki', label: 'Helsinki, Finland', description: 'Baltic Router (16ms)' },
                { value: 'reykjavik', label: 'Reykjavik, Iceland', description: 'Geothermal Edge (24ms)' },
              ]}
            />
          </div>
        </SvalExample>

        <PropsTable
          props={[
            { name: 'options', type: 'SelectOption[]', default: '[]', description: 'List of { value, label, description }' },
            { name: 'value', type: 'string', default: 'undefined', description: 'Active selected option value' },
            { name: 'onChange', type: '(val: string) => void', default: 'undefined', description: 'Selection callback' },
            { name: 'searchable', type: 'boolean', default: 'false', description: 'Enables filter search input' },
            { name: 'label', type: 'string', default: 'undefined', description: 'Field header label' },
          ]}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // CHECKBOX & RADIO DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-checkbox' || componentId === 'cmp-radio') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Forms</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Checkbox & Radio Group
          </h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Accessible binary checkboxes and mutually exclusive radio groups supporting standard and card layouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Checkbox States</h3>
            <SvalExample
              title="Checkbox Controls"
              code={{
                react: `<AuraCheckbox checked={c1} onChange={setC1} label="Unchecked Option" />
<AuraCheckbox checked={c2} onChange={setC2} label="Checked Option" description="With secondary description text" />
<AuraCheckbox checked={false} disabled label="Disabled Checkbox" />`,
              }}
            >
              <div className="flex flex-col gap-3">
                <AuraCheckbox checked={check1} onChange={setCheck1} label="Unchecked Option" />
                <AuraCheckbox checked={check2} onChange={setCheck2} label="Checked Option" description="With secondary description text" />
                <AuraCheckbox checked={false} disabled label="Disabled Checkbox" />
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Radio Group (Card Layout)</h3>
            <SvalExample
              title="Radio Group Selection"
              code={{
                react: `<AuraRadioGroup
  name="payment"
  layout="card"
  value={radioVal}
  onChange={setRadioVal}
  options={[
    { value: 'card', label: 'Credit Card', description: 'Instant processing' },
    { value: 'sepa', label: 'SEPA Bank Giro', description: 'Nordic clearance' },
  ]}
/>`,
              }}
            >
              <div className="w-full max-w-xs">
                <AuraRadioGroup
                  name="payment"
                  layout="card"
                  value={radioVal}
                  onChange={setRadioVal}
                  options={[
                    { value: 'card', label: 'Credit Card', description: 'Instant processing' },
                    { value: 'sepa', label: 'SEPA Bank Giro', description: 'Nordic clearance' },
                  ]}
                />
              </div>
            </SvalExample>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // SWITCH & SLIDER DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-switch' || componentId === 'cmp-slider') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Forms</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Switch & Range Slider
          </h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Smooth physical toggles and calibrated range sliders with instant visual feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Toggle Switches</h3>
            <SvalExample
              title="AuraSwitch Variations"
              code={{
                react: `<AuraSwitch checked={s1} onChange={setS1} label="Desktop Notifications" />
<AuraSwitch checked={s2} onChange={setS2} label="Dark Mode" description="Follows Nordic Reykjavik palette" />
<AuraSwitch checked={s3} onChange={setS3} label="Auto Save" size="sm" />`,
              }}
            >
              <div className="flex flex-col gap-4">
                <AuraSwitch checked={switch1} onChange={setSwitch1} label="Desktop Notifications" />
                <AuraSwitch checked={switch2} onChange={setSwitch2} label="Dark Mode" description="Follows Nordic Reykjavik palette" />
                <AuraSwitch checked={switch3} onChange={setSwitch3} label="Auto Save" size="sm" />
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Range Slider</h3>
            <SvalExample
              title="AuraSlider Control"
              code={{
                react: `<AuraSlider
  value={sliderVal}
  onChange={setSliderVal}
  min={0}
  max={100}
  unit="%"
  label="Cache Allocation Limit"
/>`,
              }}
            >
              <div className="w-full max-w-xs">
                <AuraSlider
                  value={sliderVal}
                  onChange={setSliderVal}
                  min={0}
                  max={100}
                  unit="%"
                  label="Cache Allocation Limit"
                />
              </div>
            </SvalExample>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // CARD DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-card') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Surfaces</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Card</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Content grouping surface with structured header, body, and footer slots, subtle 1px border hierarchy, and no artificial drop-shadow noise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AuraCard
            variant="solid"
            header={<span className="text-xs font-semibold">Standard Solid Card</span>}
            footer={<span className="text-[11px] text-[var(--aura-text-muted)]">Footer note</span>}
          >
            <p className="text-xs text-[var(--aura-text-secondary)]">
              Flat container surface with 1px border tension and balanced internal padding.
            </p>
          </AuraCard>

          <AuraCard
            variant="soft"
            header={
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-semibold">Pricing Tier</span>
                <AuraBadge variant="accent" size="sm">Nordic Pro</AuraBadge>
              </div>
            }
            footer={
              <AuraButton fullWidth variant="primary" size="sm">
                Choose Plan
              </AuraButton>
            }
          >
            <div className="text-2xl font-bold font-mono text-[var(--aura-text-primary)]">$49<span className="text-xs font-normal text-[var(--aura-text-muted)]">/mo</span></div>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">Unlimited team clusters and 24/7 priority assistance.</p>
          </AuraCard>

          <AuraCard
            variant="glass"
            header={<span className="text-xs font-semibold">Telemetry Metric</span>}
          >
            <div className="text-3xl font-bold font-mono text-[var(--aura-color-accent)]">99.98%</div>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">Uptime across Stockholm region.</p>
          </AuraCard>
        </div>

        <PropsTable
          props={[
            { name: 'variant', type: "'solid' | 'soft' | 'outline' | 'glass' | 'elevated'", default: "'solid'", description: 'Surface appearance' },
            { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Inner content spacing' },
            { name: 'header', type: 'ReactNode', default: 'undefined', description: 'Top section with bottom divider' },
            { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Bottom section with background tint' },
          ]}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // ALERT & BADGE DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-alert' || componentId === 'cmp-badge') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Feedback</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Alert & Badge</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Notice banners and compact status indicators providing instant visual feedback without visual clutter.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Alert Variants</h3>
          <SvalExample
            title="All Alert Styles"
            code={{
              react: `<AuraAlert variant="info" title="System Maintenance" description="Scheduled database reindexing tonight at 03:00 UTC." />
<AuraAlert variant="success" title="Cluster Provisioned" description="Node stockholm-01 is online and routing traffic." />
<AuraAlert variant="warning" title="Approaching Limit" description="Storage volume is at 88% capacity." />
<AuraAlert variant="danger" title="Connection Interrupted" description="Check network credentials or SSL certificates." />`,
            }}
          >
            <div className="flex flex-col gap-3 w-full max-w-lg">
              <AuraAlert variant="info" title="System Maintenance" description="Scheduled database reindexing tonight at 03:00 UTC." />
              <AuraAlert variant="success" title="Cluster Provisioned" description="Node stockholm-01 is online and routing traffic." />
              <AuraAlert variant="warning" title="Approaching Limit" description="Storage volume is at 88% capacity." />
              <AuraAlert variant="danger" title="Connection Interrupted" description="Check network credentials or SSL certificates." />
            </div>
          </SvalExample>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Badge Tags</h3>
          <SvalExample
            title="Badge Styles & Status Dots"
            code={{
              react: `<div className="flex flex-wrap gap-2">
  <AuraBadge variant="neutral">New</AuraBadge>
  <AuraBadge variant="accent" dot>Active</AuraBadge>
  <AuraBadge variant="success" dot>Paid</AuraBadge>
  <AuraBadge variant="warning" dot>Pending</AuraBadge>
  <AuraBadge variant="danger" dot>Cancelled</AuraBadge>
  <AuraBadge variant="outline">Draft</AuraBadge>
</div>`,
            }}
          >
            <div className="flex flex-wrap gap-2.5 items-center justify-center">
              <AuraBadge variant="neutral">New</AuraBadge>
              <AuraBadge variant="accent" dot>Active</AuraBadge>
              <AuraBadge variant="success" dot>Paid</AuraBadge>
              <AuraBadge variant="warning" dot>Pending</AuraBadge>
              <AuraBadge variant="danger" dot>Cancelled</AuraBadge>
              <AuraBadge variant="outline">Draft</AuraBadge>
            </div>
          </SvalExample>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AVATAR DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-avatar') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Data Display</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Avatar & Avatar Group</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            User representation element with image loading fallback to initials, online status dots, and overlapping avatar group stacking.
          </p>
        </div>

        <SvalExample
          title="Avatar Sizes & Status Badges"
          code={{
            react: `<div className="flex items-center gap-4">
  <AuraAvatar name="Astrid Lindgren" size="xs" />
  <AuraAvatar name="Henrik Ibsen" size="sm" status="online" />
  <AuraAvatar name="Maxwell Chacón" size="md" status="busy" />
  <AuraAvatar name="Kasper Schmeichel" size="lg" status="away" />
  <AuraAvatar name="Sigrid Valdimar" size="xl" status="offline" />
</div>`,
          }}
        >
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <AuraAvatar name="Astrid Lindgren" size="xs" />
            <AuraAvatar name="Henrik Ibsen" size="sm" status="online" />
            <AuraAvatar name="Maxwell Chacón" size="md" status="busy" />
            <AuraAvatar name="Kasper Schmeichel" size="lg" status="away" />
            <AuraAvatar name="Sigrid Valdimar" size="xl" status="offline" />
          </div>
        </SvalExample>

        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Avatar Group Stacking</h3>
          <SvalExample
            title="AuraAvatarGroup"
            code={{
              react: `<AuraAvatarGroup max={3}>
  <AuraAvatar name="Maxwell Chacón" />
  <AuraAvatar name="Astrid Lindgren" />
  <AuraAvatar name="Henrik Ibsen" />
  <AuraAvatar name="Kasper Schmeichel" />
  <AuraAvatar name="Sigrid Valdimar" />
</AuraAvatarGroup>`,
            }}
          >
            <AuraAvatarGroup max={3}>
              <AuraAvatar name="Maxwell Chacón" />
              <AuraAvatar name="Astrid Lindgren" />
              <AuraAvatar name="Henrik Ibsen" />
              <AuraAvatar name="Kasper Schmeichel" />
              <AuraAvatar name="Sigrid Valdimar" />
            </AuraAvatarGroup>
          </SvalExample>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // DIALOG / MODAL DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-dialog') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Overlays</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Dialog / Modal</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Accessible modal dialog layer with backdrop blur, focus trap, Escape key listener, and confirmation action buttons.
          </p>
        </div>

        <SvalExample
          title="Interactive Dialog Triggers"
          code={{
            react: `<AuraButton onClick={() => setIsOpen(true)}>Open Confirmation Dialog</AuraButton>

<AuraDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Purge Node Cache"
  description="Are you sure you want to invalidate all cached queries?"
  confirmLabel="Confirm Invalidation"
  onConfirm={() => handleConfirm()}
>
  <p>This action will force cold-starts on edge queries for up to 30 seconds.</p>
</AuraDialog>`,
          }}
        >
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <AuraButton 
              variant="outline"
              onClick={() => { setDialogType('basic'); setDialogOpen(true); }}
            >
              Open Standard Dialog
            </AuraButton>
            <AuraButton 
              variant="destructive"
              onClick={() => { setDialogType('destructive'); setDialogOpen(true); }}
            >
              Open Destructive Dialog
            </AuraButton>
          </div>
        </SvalExample>

        <AuraDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title={dialogType === 'destructive' ? 'Revoke Master API Token?' : 'Confirm Node Synchronization'}
          description={dialogType === 'destructive' ? 'This action immediately revokes all microservice access credentials.' : 'Synchronize 2,400 database records across Nordic nodes.'}
          confirmLabel={dialogType === 'destructive' ? 'Revoke Immediately' : 'Proceed Sync'}
          variant={dialogType === 'destructive' ? 'destructive' : 'default'}
          onConfirm={() => {
            setDialogOpen(false);
            addToast({ title: 'Dialog Action Confirmed', description: 'Operation completed cleanly.', type: 'success' });
          }}
        >
          <div className="text-xs text-[var(--aura-text-secondary)] leading-relaxed">
            {dialogType === 'destructive'
              ? 'Warning: Active connections will terminate immediately. This operation cannot be reversed.'
              : 'All pending SQLite mutations will be committed to the WAL journal.'}
          </div>
        </AuraDialog>

        <PropsTable
          props={[
            { name: 'isOpen', type: 'boolean', default: 'false', description: 'Controls modal open state' },
            { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback on dismissal / backdrop click' },
            { name: 'title', type: 'string', default: 'undefined', description: 'Dialog header title' },
            { name: 'description', type: 'string', default: 'undefined', description: 'Subtitle description' },
            { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Text for primary confirm button' },
            { name: 'variant', type: "'default' | 'destructive'", default: "'default'", description: 'Styling for confirm action' },
          ]}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // DROPDOWN & MENU DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-dropdown') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Navigation</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Dropdown & Menu</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Floating action menu with icons, keyboard shortcuts, section dividers, and destructive actions.
          </p>
        </div>

        <SvalExample
          title="Interactive Dropdown"
          code={{
            react: `<AuraDropdown
  trigger={<AuraButton variant="outline">Options Menu</AuraButton>}
  items={[
    { id: 'view', label: 'View Details', icon: <Eye className="w-3.5 h-3.5" />, shortcut: '⌘O' },
    { id: 'edit', label: 'Edit Configuration', icon: <Sliders className="w-3.5 h-3.5" />, shortcut: '⌘E' },
    { id: 'div1', label: '', divider: true },
    { id: 'del', label: 'Delete Cluster', icon: <Trash2 className="w-3.5 h-3.5" />, destructive: true },
  ]}
/>`,
          }}
        >
          <AuraDropdown
            trigger={<AuraButton variant="outline">Actions Menu</AuraButton>}
            items={[
              { id: 'view', label: 'Inspect Telemetry', icon: <Eye className="w-3.5 h-3.5" />, shortcut: '⌘I' },
              { id: 'sync', label: 'Synchronize Node', icon: <Sparkles className="w-3.5 h-3.5" />, shortcut: '⌘S' },
              { id: 'div1', label: '', divider: true },
              { id: 'delete', label: 'Terminate Cluster', icon: <Trash2 className="w-3.5 h-3.5" />, destructive: true },
            ]}
          />
        </SvalExample>
      </div>
    );
  }

  // ----------------------------------------------------
  // TOOLTIP & POPOVER DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-tooltip' || componentId === 'cmp-popover') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Overlays</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Tooltip & Popover</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Non-intrusive micro-guidance tooltips and rich interactive popover containers with dismiss listeners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Tooltip Positions</h3>
            <SvalExample
              title="Tooltip Directions"
              code={{
                react: `<AuraTooltip content="Top positioned tooltip" position="top">
  <AuraButton size="sm" variant="outline">Hover Top</AuraButton>
</AuraTooltip>
<AuraTooltip content="Bottom tooltip" position="bottom">
  <AuraButton size="sm" variant="outline">Hover Bottom</AuraButton>
</AuraTooltip>`,
              }}
            >
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <AuraTooltip content="Top positioned tooltip" position="top">
                  <AuraButton size="sm" variant="outline">Hover Top</AuraButton>
                </AuraTooltip>
                <AuraTooltip content="Bottom tooltip" position="bottom">
                  <AuraButton size="sm" variant="outline">Hover Bottom</AuraButton>
                </AuraTooltip>
                <AuraTooltip content="Right tooltip" position="right">
                  <AuraButton size="sm" variant="outline">Hover Right</AuraButton>
                </AuraTooltip>
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Interactive Popover</h3>
            <SvalExample
              title="AuraPopover Container"
              code={{
                react: `<AuraPopover
  title="Security Verification"
  trigger={<AuraButton size="sm" variant="outline">Click for Popover</AuraButton>}
  content={
    <div>
      <p className="text-xs mb-2">Two-factor biometric authentication active.</p>
      <AuraButton size="sm" variant="primary">Review Keys</AuraButton>
    </div>
  }
/>`,
              }}
            >
              <AuraPopover
                title="Cluster Diagnostics"
                trigger={<AuraButton size="sm" variant="outline">Click for Popover</AuraButton>}
                content={
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-[var(--aura-text-secondary)]">
                      Stockholm cluster responding with 12ms latency across all peer nodes.
                    </p>
                    <AuraButton size="sm" variant="primary" fullWidth>
                      View Live Metrics
                    </AuraButton>
                  </div>
                }
              />
            </SvalExample>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TABS & ACCORDION DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-tabs' || componentId === 'cmp-accordion') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Navigation</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Tabs & Accordion</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Content disclosure patterns for progressive disclosure and multi-view switching.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Segmented Tabs</h3>
          <SvalExample
            title="AuraTabs"
            code={{
              react: `<AuraTabs
  tabs={[
    { id: 'general', label: 'General Info' },
    { id: 'security', label: 'Security & Keys', badge: 'Active' },
    { id: 'billing', label: 'Billing' },
  ]}
  activeTab="general"
  onChange={id => console.log(id)}
/>`,
            }}
          >
            <div className="w-full max-w-md">
              <AuraTabs
                tabs={[
                  { id: 'general', label: 'Overview' },
                  { id: 'nodes', label: 'Active Nodes', badge: '3' },
                  { id: 'security', label: 'Security & Access' },
                ]}
                activeTab="general"
                onChange={() => {}}
              />
            </div>
          </SvalExample>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Accordion FAQ</h3>
          <SvalExample
            title="AuraAccordion"
            code={{
              react: `<AuraAccordion
  items={[
    { id: 'q1', title: 'How does Sval achieve zero drop shadow blur?', content: 'Elevation is constructed purely through contrast and 1px borders.' },
    { id: 'q2', title: 'Is SQLite WASM persistent in browser?', content: 'Yes, SQLite compiles into WebAssembly with OPFS storage.' },
  ]}
/>`,
            }}
          >
            <div className="w-full max-w-lg">
              <AuraAccordion
                items={[
                  { id: 'q1', title: 'How does Sval achieve optical balance without heavy drop shadows?', content: 'Elevation is constructed purely through contrast, 1px borders, and mathematical step ratios, maintaining a calm Scandinavian feel.' },
                  { id: 'q2', title: 'Can Sval be used with React, Angular, and Blazor simultaneously?', content: 'Yes! Sval exports tokenized Web Components and framework adapters so the design system remains unified across modern polyglot architectures.' },
                  { id: 'q3', title: 'Is the SQLite studio running entirely client-side?', content: 'Correct. We load the official SQLite3 WebAssembly engine compiled with Web Worker support and OPFS persistence.' },
                ]}
              />
            </div>
          </SvalExample>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TABLE & DATATABLE DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-table' || componentId === 'cmp-datatable') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="accent" size="sm">Data Display</AuraBadge>
            <AuraBadge variant="success" size="sm">Pro Feature</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">DataTable & Grid</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Enterprise-grade data table featuring instant column sorting, global text filtering, row selection, pagination, and responsive adaptation.
          </p>
        </div>

        <SvalExample
          title="Live DataTable Playground"
          code={{
            react: `<AuraDataTable
  data={users}
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'status', header: 'Status', render: u => <AuraBadge variant="success">{u.status}</AuraBadge> },
  ]}
  keyField="id"
  pageSize={4}
/>`,
          }}
        >
          <div className="w-full">
            <AuraDataTable
              data={sampleUsers}
              columns={[
                { key: 'name', header: 'Developer', sortable: true },
                { key: 'email', header: 'Corporate Email', sortable: true },
                { key: 'role', header: 'Role', sortable: true },
                { 
                  key: 'status', 
                  header: 'Status', 
                  sortable: true,
                  render: u => (
                    <AuraBadge variant={u.status === 'active' ? 'success' : 'warning'} size="sm" dot>
                      {u.status}
                    </AuraBadge>
                  )
                },
                { key: 'quota', header: 'Storage Quota' },
              ]}
              keyField="id"
              pageSize={3}
            />
          </div>
        </SvalExample>

        <PropsTable
          props={[
            { name: 'data', type: 'T[]', default: '[]', description: 'Array of data records' },
            { name: 'columns', type: 'ColumnDef<T>[]', default: '[]', description: 'Columns configuration and sorting definitions' },
            { name: 'keyField', type: 'keyof T', default: "'id'", description: 'Unique row key attribute' },
            { name: 'pageSize', type: 'number', default: '5', description: 'Rows per pagination view' },
          ]}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // PROGRESS, SPINNER & SKELETON DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-progress' || componentId === 'cmp-spinner' || componentId === 'cmp-skeleton') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Feedback</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Progress, Spinner & Skeleton
          </h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Loading states and progress representations for seamless asynchronous operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Linear Progress</h3>
            <SvalExample
              title="AuraProgress"
              code={{
                react: `<AuraProgress value={75} showLabel />
<AuraProgress value={45} variant="success" />
<AuraProgress indeterminate variant="accent" />`,
              }}
            >
              <div className="flex flex-col gap-3 w-full">
                <AuraProgress value={75} showLabel />
                <AuraProgress value={45} variant="success" />
                <AuraProgress indeterminate variant="accent" />
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Circular Progress</h3>
            <SvalExample
              title="AuraCircularProgress"
              code={{
                react: `<AuraCircularProgress value={82} variant="accent" />
<AuraCircularProgress value={100} variant="success" />`,
              }}
            >
              <div className="flex items-center gap-6 justify-center">
                <AuraCircularProgress value={82} variant="accent" />
                <AuraCircularProgress value={100} variant="success" />
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Spinners</h3>
            <SvalExample
              title="AuraSpinner Sizes"
              code={{
                react: `<AuraSpinner size="sm" />
<AuraSpinner size="md" variant="primary" />
<AuraSpinner size="lg" variant="accent" />`,
              }}
            >
              <div className="flex items-center gap-4 justify-center">
                <AuraSpinner size="sm" />
                <AuraSpinner size="md" variant="primary" />
                <AuraSpinner size="lg" variant="accent" />
              </div>
            </SvalExample>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Skeleton Loading Shimmer</h3>
          <SvalExample
            title="Card & Text Skeletons"
            code={{
              react: `<div className="flex items-center gap-3">
  <AuraSkeleton variant="circular" width={40} height={40} />
  <div className="space-y-2 flex-1">
    <AuraSkeleton variant="text" width="60%" />
    <AuraSkeleton variant="text" width="90%" />
  </div>
</div>`,
            }}
          >
            <div className="w-full max-w-sm flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <AuraSkeleton variant="circular" width={40} height={40} />
                <div className="space-y-2 flex-1">
                  <AuraSkeleton variant="text" width="60%" />
                  <AuraSkeleton variant="text" width="90%" />
                </div>
              </div>
              <AuraSkeleton variant="rectangular" height={90} />
            </div>
          </SvalExample>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TOAST, BREADCRUMB & PAGINATION DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-toast' || componentId === 'cmp-breadcrumb' || componentId === 'cmp-pagination' || componentId === 'cmp-datepicker') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Utility & Navigation</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Toast, Breadcrumb, DatePicker & Pagination
          </h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Essential application utilities for system messaging, hierarchical breadcrumb paths, calendar date selection, and data paging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Live Toast Triggers</h3>
            <SvalExample
              title="Global Toast Notification"
              code={{
                react: `addToast({ title: 'Saved Successfully', description: 'Changes synced to SQLite', type: 'success' });`,
              }}
            >
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <AuraButton 
                  size="sm" 
                  variant="outline"
                  onClick={() => addToast({ title: 'Success', description: 'Changes saved to SQLite journal.', type: 'success' })}
                >
                  Trigger Success
                </AuraButton>
                <AuraButton 
                  size="sm" 
                  variant="outline"
                  onClick={() => addToast({ title: 'Information', description: 'Stockholm cluster node online.', type: 'info' })}
                >
                  Trigger Info
                </AuraButton>
                <AuraButton 
                  size="sm" 
                  variant="destructive"
                  onClick={() => addToast({ title: 'Alert', description: 'Network timeout detected.', type: 'danger' })}
                >
                  Trigger Error
                </AuraButton>
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Breadcrumb Navigation</h3>
            <SvalExample
              title="AuraBreadcrumb"
              code={{
                react: `<AuraBreadcrumb
  items={[
    { label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { label: 'Infrastructure' },
    { label: 'Stockholm Core', active: true },
  ]}
/>`,
              }}
            >
              <AuraBreadcrumb
                items={[
                  { label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
                  { label: 'Clusters' },
                  { label: 'Stockholm Core', active: true },
                ]}
              />
            </SvalExample>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">DatePicker & Calendar</h3>
            <SvalExample
              title="AuraDatePicker"
              code={{
                react: `<AuraDatePicker
  label="Deployment Date"
  value={dateVal}
  onChange={setDateVal}
/>`,
              }}
            >
              <div className="w-full max-w-xs">
                <AuraDatePicker
                  label="Deployment Date"
                  value={dateVal}
                  onChange={setDateVal}
                />
              </div>
            </SvalExample>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-2">Pagination Controls</h3>
            <SvalExample
              title="AuraPagination"
              code={{
                react: `<AuraPagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`,
              }}
            >
              <AuraPagination
                currentPage={page}
                totalPages={10}
                onPageChange={setPage}
              />
            </SvalExample>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TEXTAREA DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-textarea') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Form Controls</AuraBadge>
            <AuraBadge variant="success" size="sm">Stable</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Textarea</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Multi-line text input field supporting character limits, auto-resize capabilities, error states, and clear helper labels.
          </p>
        </div>

        <SvalExample
          title="Standard Textarea with Character Counter"
          code={{
            react: `<AuraTextarea
  label="Project Scope & Architecture Notes"
  hint="Detail the functional and technical requirements"
  placeholder="Enter notes..."
  characterLimit={300}
/>`,
          }}
        >
          <div className="w-full max-w-md">
            <AuraTextarea
              label="Project Scope & Architecture Notes"
              hint="Detail the functional and technical requirements"
              placeholder="Describe your design system parameters..."
              characterLimit={300}
            />
          </div>
        </SvalExample>
      </div>
    );
  }

  // ----------------------------------------------------
  // CHIP & TAG DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-chip') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Indicators</AuraBadge>
            <AuraBadge variant="success" size="sm">Stable</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Chip & Tag</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Compact interactive elements for filtering, tagging categories, or presenting removable selected criteria.
          </p>
        </div>

        <SvalExample
          title="Interactive Chips & Removable Tags"
          code={{
            react: `<div className="flex flex-wrap gap-2">
  <AuraChip label="Design Tokens" selected={chipSelected} onClick={() => setChipSelected(!chipSelected)} />
  <AuraChip label="Nordic Clean" variant="outline" />
  <AuraChip label="Deletable Filter" onRemove={() => {}} />
</div>`,
          }}
        >
          <div className="flex flex-wrap gap-2">
            <AuraChip label="Design Tokens" selected={chipSelected} onClick={() => setChipSelected(!chipSelected)} />
            <AuraChip label="Nordic Clean" variant="outline" />
            <AuraChip label="WCAG AAA" variant="subtle" />
            <AuraChip label="Deletable Filter" onRemove={() => addToast({ title: 'Tag Removed', description: 'Filter chip dismissed', type: 'info' })} />
          </div>
        </SvalExample>
      </div>
    );
  }

  // ----------------------------------------------------
  // DRAWER DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-drawer') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Overlays</AuraBadge>
            <AuraBadge variant="success" size="sm">Stable</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Drawer / Slide-over</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Side-anchored overlay panel for supplementary actions, shopping carts, settings panels, and navigation menus.
          </p>
        </div>

        <SvalExample
          title="Interactive Slide-over Drawer"
          code={{
            react: `<AuraButton variant="primary" onClick={() => setDrawerOpen(true)}>
  Open Right Drawer
</AuraButton>

<AuraDrawer
  isOpen={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  title="Resource Inspector"
  position="right"
>
  <p>Drawer content panel...</p>
</AuraDrawer>`,
          }}
        >
          <div>
            <AuraButton variant="primary" onClick={() => setDrawerOpen(true)}>
              Open Right Drawer
            </AuraButton>

            <AuraDrawer
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              title="Resource Inspector"
              position="right"
            >
              <div className="flex flex-col gap-4 text-xs">
                <p className="text-[var(--aura-text-secondary)]">
                  Slide-over panels are ideal for complex configuration settings, cart inspection, or detail records without losing parent context.
                </p>
                <AuraInput label="Setting Name" defaultValue="Stockholm Regional Cluster" />
                <AuraButton variant="primary" fullWidth onClick={() => setDrawerOpen(false)}>
                  Apply Changes
                </AuraButton>
              </div>
            </AuraDrawer>
          </div>
        </SvalExample>
      </div>
    );
  }

  // ----------------------------------------------------
  // STEPPER DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-stepper') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Navigation</AuraBadge>
            <AuraBadge variant="success" size="sm">Stable</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">Stepper</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Multi-step workflow progress tracker guiding users through sequential tasks, wizards, and verification flows.
          </p>
        </div>

        <SvalExample
          title="Horizontal Workflow Stepper"
          code={{
            react: `<AuraStepper
  currentStep={stepperStep}
  onStepClick={setStepperStep}
  steps={[
    { id: 0, label: 'Account', description: 'User credentials' },
    { id: 1, label: 'Profile', description: 'Personal details' },
    { id: 2, label: 'Review', description: 'Final confirmation' },
  ]}
/>`,
          }}
        >
          <div className="w-full max-w-xl">
            <AuraStepper
              currentStep={stepperStep}
              onStepClick={setStepperStep}
              steps={[
                { id: 0, label: 'Account', description: 'User credentials' },
                { id: 1, label: 'Verification', description: 'KYC Document' },
                { id: 2, label: 'Confirmation', description: 'Final signoff' },
              ]}
            />
            <div className="flex items-center gap-2 mt-4">
              <AuraButton 
                variant="outline" 
                size="sm" 
                disabled={stepperStep === 0} 
                onClick={() => setStepperStep(s => Math.max(0, s - 1))}
              >
                Previous Step
              </AuraButton>
              <AuraButton 
                variant="primary" 
                size="sm" 
                disabled={stepperStep === 2} 
                onClick={() => setStepperStep(s => Math.min(2, s + 1))}
              >
                Next Step
              </AuraButton>
            </div>
          </div>
        </SvalExample>
      </div>
    );
  }

  // ----------------------------------------------------
  // FILE UPLOAD DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-fileupload') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Form Controls</AuraBadge>
            <AuraBadge variant="success" size="sm">Stable</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">FileUpload</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Drag-and-drop file upload target supporting multi-file selection, format validation, and progress tracking.
          </p>
        </div>

        <SvalExample
          title="Drag and Drop Target"
          code={{
            react: `<AuraFileUpload
  label="Upload Documents"
  hint="PDF, PNG, JPG up to 10MB"
  onFilesSelected={(files) => console.log(files)}
/>`,
          }}
        >
          <div className="w-full max-w-md">
            <AuraFileUpload
              label="Company Registry Documentation"
              hint="PDF or PNG scan up to 15MB"
              onFilesSelected={(files) => {
                addToast({
                  title: 'File Attached',
                  description: `${files[0].name} ready for processing.`,
                  type: 'success',
                });
              }}
            />
          </div>
        </SvalExample>
      </div>
    );
  }

  // ----------------------------------------------------
  // BUTTON GROUP & DIVIDER DOCUMENTATION
  // ----------------------------------------------------
  if (componentId === 'cmp-buttongroup') {
    return (
      <div className="flex flex-col gap-8 text-left font-sans">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">Components</span>
            <AuraBadge variant="neutral" size="sm">Layout</AuraBadge>
            <AuraBadge variant="success" size="sm">Stable</AuraBadge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">ButtonGroup & Divider</h1>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
            Segmented action button grouping and optical dividers for organizing complex layouts.
          </p>
        </div>

        <SvalExample
          title="Segmented Action Grouping"
          code={{
            react: `<AuraButtonGroup attached>
  <AuraButton variant="outline">Day</AuraButton>
  <AuraButton variant="primary">Week</AuraButton>
  <AuraButton variant="outline">Month</AuraButton>
</AuraButtonGroup>`,
          }}
        >
          <div className="flex flex-col gap-4">
            <AuraButtonGroup attached>
              <AuraButton variant="outline" size="sm">Daily</AuraButton>
              <AuraButton variant="primary" size="sm">Weekly</AuraButton>
              <AuraButton variant="outline" size="sm">Quarterly</AuraButton>
            </AuraButtonGroup>

            <AuraDivider label="OR" />

            <div className="flex items-center gap-3">
              <span>Left Item</span>
              <AuraDivider orientation="vertical" className="h-6" />
              <span>Right Item</span>
            </div>
          </div>
        </SvalExample>
      </div>
    );
  }

  // Fallback if componentId is not matched: default to button
  return <ComponentsDocView componentId="cmp-button" />;
};
