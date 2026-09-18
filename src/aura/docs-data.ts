import { ComponentDocumentation } from '../types';

export const COMPONENT_DOCS: ComponentDocumentation[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Primitives',
    description: 'Universal interactive trigger with refined microinteractions, tactile scale feedback, loading states, and full ARIA support.',
    whenToUse: 'For primary actions, form submissions, modal triggers, and step confirmations.',
    whenNotToUse: 'For navigating between web URLs (use Link/Anchor instead to maintain browser semantics).',
    nordicDesignNote: 'No aggressive drop shadows or glossy gradients. Elevation is achieved purely through contrast and subtle 1px border tension.',
    accessibilityNotes: [
      'Full keyboard support with Enter and Space keys.',
      'Auto-aria-disabled when disabled or isLoading is true.',
      'High-contrast focus ring with visible 2px offset.',
    ],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle' | 'destructive'", default: "'primary'", description: 'Visual hierarchy style' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Density and touch target size' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Replaces icon/text with minimal spinner' },
      { name: 'leftIcon', type: 'ReactNode', default: 'undefined', description: 'Leading decorative or contextual icon' },
      { name: 'rightIcon', type: 'ReactNode', default: 'undefined', description: 'Trailing icon (e.g. arrow or chevron)' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Expands button to fill parent container' },
    ],
    tokensUsed: ['--aura-color-primary', '--aura-color-primary-hover', '--aura-color-primary-foreground', '--aura-radius-md'],
    codeExamples: {
      react: `import { AuraButton } from '@aura-ui/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function ActionExample() {
  return (
    <div className="flex items-center gap-3">
      <AuraButton variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
        Confirm Order
      </AuraButton>
      <AuraButton variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
        Explore System
      </AuraButton>
    </div>
  );
}`,
      angular: `// Standalone Component in Angular 18+ zoneless
import { Component } from '@angular/core';
import { AuraButtonDirective } from '@aura-ui/angular';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [AuraButtonDirective],
  template: \`
    <button auraButton="primary" size="md" [isLoading]="isSubmitting()">
      Confirm Order
    </button>
  \`
})
export class CheckoutComponent {
  isSubmitting = signal(false);
}`,
      blazor: `@using AuraUI.Blazor

<AuraButton Variant="ButtonVariant.Primary" Size="ButtonSize.Medium" OnClick="HandleConfirm">
  Confirm Order
</AuraButton>

@code {
  private async Task HandleConfirm() {
    // Process order in Blazor Server / WebAssembly
  }
}`,
      html: `<!-- Standard Web Component / Pure HTML & Aura CSS Tokens -->
<button class="aura-btn aura-btn--primary">
  <span>Confirm Order</span>
</button>`,
    }
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Forms',
    description: 'Precision text input with integrated floating or top labels, instant clearable button, inline error messages, and contextual icons.',
    whenToUse: 'For textual data collection, search queries, email fields, and numeric quantities.',
    whenNotToUse: 'For long multi-line narrative content (use AuraTextarea) or selecting from predefined options (use AuraSelect).',
    nordicDesignNote: 'Restrained border with zero glare. Focus state gently shifts border contrast without vibrating colored glows.',
    accessibilityNotes: [
      'Automatically associates label with input ID via HTML for/id pairing.',
      'Announces error messages via aria-describedby and marks aria-invalid="true".',
    ],
    props: [
      { name: 'label', type: 'string', default: 'undefined', description: 'Field header label' },
      { name: 'hint', type: 'string', default: 'undefined', description: 'Helper text displayed below input' },
      { name: 'error', type: 'string', default: 'undefined', description: 'Validation error text with alert icon' },
      { name: 'isClearable', type: 'boolean', default: 'false', description: 'Shows single-click clear button' },
      { name: 'leftIcon', type: 'ReactNode', default: 'undefined', description: 'Contextual icon at start of input' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Vertical padding & height' },
    ],
    tokensUsed: ['--aura-surface-1', '--aura-border-default', '--aura-text-primary', '--aura-color-danger'],
    codeExamples: {
      react: `import { AuraInput } from '@aura-ui/react';
import { Mail } from 'lucide-react';

export function EmailField() {
  const [email, setEmail] = useState('');
  return (
    <AuraInput
      label="Work Email"
      placeholder="maxwell@company.com"
      value={email}
      onChange={e => setEmail(e.target.value)}
      leftIcon={<Mail className="w-4 h-4" />}
      isClearable
      onClear={() => setEmail('')}
      hint="We never share your corporate email address."
    />
  );
}`,
      angular: `@Component({
  standalone: true,
  imports: [AuraInputComponent, ReactiveFormsModule],
  template: \`
    <aura-input
      label="Work Email"
      placeholder="maxwell@company.com"
      [formControl]="emailControl"
      [clearable]="true"
      hint="We never share your corporate email address."
    />
  \`
})`,
      blazor: `<AuraInput 
  @bind-Value="Model.Email" 
  Label="Work Email" 
  Placeholder="maxwell@company.com" 
  Clearable="true" 
  Hint="We never share your corporate email address." 
/>`,
      html: `<div class="aura-field">
  <label class="aura-label">Work Email</label>
  <input class="aura-input" placeholder="maxwell@company.com" />
</div>`,
    }
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Forms',
    description: 'Custom accessible combobox/select with option search, custom icons, and keyboard arrow navigation.',
    whenToUse: 'When selecting one item from a list of 5+ options where native dropdown lacks branding or icons.',
    whenNotToUse: 'For binary Yes/No choices (use AuraSwitch or AuraCheckbox) or 2-3 items (use AuraTabs segment).',
    nordicDesignNote: 'Floating overlay with delicate 1px border and crisp backdrop filtering that feels feather-light.',
    accessibilityNotes: [
      'Complies with WAI-ARIA 1.2 Combobox pattern.',
      'Supports Arrow Up/Down, Enter selection, and Escape to dismiss.',
    ],
    props: [
      { name: 'options', type: 'SelectOption[]', default: '[]', description: 'Array of { value, label, description, icon }' },
      { name: 'value', type: 'string', default: 'undefined', description: 'Currently active option value' },
      { name: 'searchable', type: 'boolean', default: 'false', description: 'Enables instant search filter inside menu' },
      { name: 'placeholder', type: 'string', default: "'Select option...'", description: 'Unselected prompt text' },
    ],
    tokensUsed: ['--aura-surface-1', '--aura-surface-2', '--aura-surface-3', '--aura-border-default'],
    codeExamples: {
      react: `import { AuraSelect } from '@aura-ui/react';

const regions = [
  { value: 'nordic', label: 'Nordic Countries', description: 'Sweden, Norway, Finland, Denmark' },
  { value: 'central-eu', label: 'Central Europe', description: 'Germany, Switzerland, Austria' },
  { value: 'na', label: 'North America', description: 'USA, Canada' },
];

export function RegionSelector() {
  const [val, setVal] = useState('nordic');
  return (
    <AuraSelect
      label="Deployment Region"
      options={regions}
      value={val}
      onChange={setVal}
      searchable
    />
  );
}`,
      angular: `<aura-select 
  label="Deployment Region" 
  [options]="regions" 
  [(ngModel)]="selectedRegion" 
  [searchable]="true" 
/>`,
      blazor: `<AuraSelect TValue="string" Options="@Regions" @bind-Value="SelectedRegion" Searchable="true" />`,
      html: `<div class="aura-select" data-expanded="false">
  <button class="aura-select-trigger">Nordic Countries</button>
</div>`,
    }
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Forms',
    description: 'Instant state toggle with calibrated physical spring easing and high optical clarity.',
    whenToUse: 'For settings that take immediate effect without needing a form save button.',
    whenNotToUse: 'Within multi-field forms where action only applies after pressing Submit (use AuraCheckbox).',
    nordicDesignNote: 'Proportional capsule with pure white thumb and high contrast transition.',
    accessibilityNotes: [
      'role="switch" with aria-checked state binding.',
      'Accessible via Spacebar and Enter keys.',
    ],
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Current binary toggle state' },
      { name: 'onChange', type: '(checked: boolean) => void', default: 'undefined', description: 'Event callback' },
      { name: 'label', type: 'ReactNode', default: 'undefined', description: 'Primary label text' },
      { name: 'description', type: 'string', default: 'undefined', description: 'Secondary descriptive text' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Physical scale of switch' },
    ],
    tokensUsed: ['--aura-color-primary', '--aura-surface-3', '--aura-radius-pill'],
    codeExamples: {
      react: `import { AuraSwitch } from '@aura-ui/react';

export function TelemetrySetting() {
  const [enabled, setEnabled] = useState(true);
  return (
    <AuraSwitch
      checked={enabled}
      onChange={setEnabled}
      label="Enterprise Audit Logging"
      description="Record all cryptographic key access to SQLite database"
    />
  );
}`,
      angular: `<aura-switch
  label="Enterprise Audit Logging"
  description="Record all cryptographic key access to SQLite database"
  [(ngModel)]="auditEnabled"
/>`,
      blazor: `<AuraSwitch @bind-Value="AuditEnabled" Label="Enterprise Audit Logging" />`,
      html: `<div class="aura-switch" role="switch" aria-checked="true">
  <span class="aura-switch-thumb"></span>
</div>`,
    }
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Surfaces & Overlays',
    description: 'Foundational container for grouping related content with subtle border hierarchies and optional glass surfaces.',
    whenToUse: 'To segment dashboards, stats, profile widgets, and product listings.',
    whenNotToUse: 'Do not arbitrarily nest cards inside cards to prevent visual visual clutter.',
    nordicDesignNote: 'Subtle perimeter boundary with zero noisy gradient drop-shadows.',
    accessibilityNotes: [
      'Semantic structure with clear section headings.',
    ],
    props: [
      { name: 'variant', type: "'solid' | 'soft' | 'outline' | 'glass' | 'elevated'", default: "'solid'", description: 'Surface appearance' },
      { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Inner content spacing' },
      { name: 'header', type: 'ReactNode', default: 'undefined', description: 'Top section with bottom divider' },
      { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Bottom section with background tint' },
    ],
    tokensUsed: ['--aura-surface-1', '--aura-surface-2', '--aura-border-default', '--aura-radius-lg'],
    codeExamples: {
      react: `import { AuraCard, AuraBadge, AuraButton } from '@aura-ui/react';

export function MetricCard() {
  return (
    <AuraCard
      variant="solid"
      header={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Nodes</span>
          <AuraBadge variant="success" dot>Online</AuraBadge>
        </div>
      }
      footer={
        <div className="flex items-center justify-between w-full text-xs">
          <span className="text-slate-500">Stockholm Region</span>
          <AuraButton variant="ghost" size="sm">Inspect</AuraButton>
        </div>
      }
    >
      <div className="text-3xl font-bold font-mono">1,024</div>
      <p className="text-xs text-slate-500 mt-1">+14.2% workload this month</p>
    </AuraCard>
  );
}`,
      angular: `<aura-card variant="solid">
  <div auraCardHeader>Active Nodes</div>
  <div class="text-3xl font-bold">1,024</div>
  <div auraCardFooter>Stockholm Region</div>
</aura-card>`,
      blazor: `<AuraCard Variant="CardVariant.Solid">
  <HeaderContent>Active Nodes</HeaderContent>
  <ChildContent>
    <div class="text-3xl font-bold">1,024</div>
  </ChildContent>
</AuraCard>`,
      html: `<div class="aura-card aura-card--solid">
  <div class="aura-card-body">Content</div>
</div>`,
    }
  },
  {
    id: 'datatable',
    name: 'DataTable',
    category: 'Data Display',
    description: 'Enterprise grade grid featuring sorting, global search filter, multi-row selection, CSV export, and responsive adaptation.',
    whenToUse: 'For managing, sorting, and analyzing dense datasets, customers, orders, inventory, and logs.',
    whenNotToUse: 'For simple 2-column key-value lists (use AuraDescriptionList instead).',
    nordicDesignNote: 'Crisp horizontal hairline dividers, generous cell padding, and high typographic baseline clarity.',
    accessibilityNotes: [
      'Accessible table semantics (th, scope="col", caption).',
      'Row selection states indicated with aria-selected.',
    ],
    props: [
      { name: 'data', type: 'T[]', default: '[]', description: 'Array of data records' },
      { name: 'columns', type: 'ColumnDef<T>[]', default: '[]', description: 'Column configuration and custom renderers' },
      { name: 'keyField', type: 'keyof T', default: "'id'", description: 'Unique identifier key in each record' },
      { name: 'pageSize', type: 'number', default: '6', description: 'Rows per pagination view' },
    ],
    tokensUsed: ['--aura-surface-1', '--aura-surface-2', '--aura-border-default', '--aura-text-primary'],
    codeExamples: {
      react: `import { AuraDataTable, ColumnDef } from '@aura-ui/react';

interface Customer {
  id: string;
  name: string;
  plan: string;
  revenue: number;
}

const columns: ColumnDef<Customer>[] = [
  { key: 'name', header: 'Customer', sortable: true },
  { key: 'plan', header: 'Subscription', sortable: true },
  { key: 'revenue', header: 'ARR', sortable: true, render: c => '$' + c.revenue.toLocaleString() },
];

export function CustomersGrid({ customers }: { customers: Customer[] }) {
  return (
    <AuraDataTable
      data={customers}
      columns={columns}
      keyField="id"
      title="Corporate Accounts"
      description="Active enterprise licenses synced via SQLite"
    />
  );
}`,
      angular: `<aura-data-table 
  [data]="customers" 
  [columns]="columns" 
  keyField="id"
  (onExport)="handleExport($event)"
/>`,
      blazor: `<AuraDataTable TItem="Customer" Items="@Customers" KeyField="x => x.Id" />`,
      html: `<div class="aura-table-container">
  <table class="aura-table">...</table>
</div>`,
    }
  }
];
