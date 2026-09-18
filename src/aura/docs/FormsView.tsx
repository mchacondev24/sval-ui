import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  Building,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraInput } from '../components/Input';
import { AuraSelect } from '../components/Select';
import { AuraCheckbox } from '../components/Checkbox';
import { AuraRadioGroup } from '../components/Radio';
import { AuraSwitch } from '../components/Switch';
import { AuraAlert } from '../components/Alert';
import { SvalExample } from './SvalExample';
import { useAura } from '../context';

export const FormsView: React.FC = () => {
  const { addToast } = useAura();

  // Form 1: Account Registration State
  const [accountForm, setAccountForm] = useState({
    name: 'Maxwell Chacón',
    email: 'ing.chacon.maxwell@gmail.com',
    password: 'Password123!',
    country: 'sweden',
    terms: true,
  });
  const [accountErrors, setAccountErrors] = useState<Record<string, string>>({});
  const [isSubmittingAccount, setIsSubmittingAccount] = useState(false);
  const [accountSuccess, setAccountSuccess] = useState(false);

  // Form 2: Checkout State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [savePayment, setSavePayment] = useState(true);

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!accountForm.name.trim()) errors.name = 'Full name is required';
    if (!accountForm.email.includes('@')) errors.email = 'Valid email address is required';
    if (accountForm.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!accountForm.terms) errors.terms = 'You must accept the terms of service';

    setAccountErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmittingAccount(true);
      setTimeout(() => {
        setIsSubmittingAccount(false);
        setAccountSuccess(true);
        addToast({
          title: 'Account Created',
          description: `Welcome to Sval, ${accountForm.name}!`,
          type: 'success',
        });
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-left font-sans">
      {/* Header */}
      <div className="p-6 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--aura-text-muted)]">
          Real-World Patterns
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)] mt-1">
          Form Layouts & Validation
        </h1>
        <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 max-w-2xl leading-relaxed">
          Robust, accessible forms featuring clear error states, keyboard navigation, inline helper hints, and responsive composition.
        </p>
      </div>

      {/* Example 1: Full Account Creation */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-[var(--aura-text-primary)]">
          1. Registration & Validation Form
        </h2>
        <p className="text-xs text-[var(--aura-text-secondary)]">
          Complete registration workflow with live client-side validation, error messages, and loading feedback.
        </p>

        <SvalExample
          title="Account Creation Playground"
          code={{
            react: `import { AuraInput, AuraSelect, AuraCheckbox, AuraButton, AuraAlert } from '@sval-ui/react';
import { User, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

export function RegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: 'sweden', terms: false });
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
      <AuraInput
        label="Full Name"
        value={form.name}
        onChange={e => setForm({...form, name: e.target.value})}
        leftIcon={<User className="w-4 h-4" />}
        error={errors.name}
        required
      />
      <AuraInput
        label="Work Email"
        type="email"
        value={form.email}
        onChange={e => setForm({...form, email: e.target.value})}
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email}
        required
      />
      <AuraInput
        label="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({...form, password: e.target.value})}
        leftIcon={<Lock className="w-4 h-4" />}
        error={errors.password}
        required
      />
      <AuraCheckbox
        checked={form.terms}
        onChange={checked => setForm({...form, terms: checked})}
        label="I accept the Sval Terms of Service & Privacy Policy"
        error={errors.terms}
      />
      <div className="flex gap-2 justify-end">
        <AuraButton variant="ghost">Cancel</AuraButton>
        <AuraButton variant="primary" type="submit">Create Account</AuraButton>
      </div>
    </form>
  );
}`,
          }}
        >
          <div className="w-full max-w-md mx-auto">
            {accountSuccess ? (
              <AuraAlert
                variant="success"
                title="Account Registration Complete"
                description={`Verification token sent to ${accountForm.email}. Ready to access cluster nodes.`}
                onClose={() => setAccountSuccess(false)}
              />
            ) : (
              <form onSubmit={handleAccountSubmit} className="flex flex-col gap-4">
                <AuraInput
                  label="Full Name"
                  placeholder="e.g. Maxwell Chacón"
                  value={accountForm.name}
                  onChange={e => setAccountForm({ ...accountForm, name: e.target.value })}
                  leftIcon={<User className="w-4 h-4" />}
                  error={accountErrors.name}
                  hint="Public developer identifier"
                  required
                />

                <AuraInput
                  label="Work Email"
                  placeholder="name@company.com"
                  type="email"
                  value={accountForm.email}
                  onChange={e => setAccountForm({ ...accountForm, email: e.target.value })}
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={accountErrors.email}
                  required
                />

                <AuraInput
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  value={accountForm.password}
                  onChange={e => setAccountForm({ ...accountForm, password: e.target.value })}
                  leftIcon={<Lock className="w-4 h-4" />}
                  error={accountErrors.password}
                  hint="Must be at least 6 characters with mixed symbols"
                  required
                />

                <AuraSelect
                  label="Jurisdiction / Country"
                  value={accountForm.country}
                  onChange={val => setAccountForm({ ...accountForm, country: val })}
                  options={[
                    { value: 'sweden', label: 'Stockholm, Sweden' },
                    { value: 'norway', label: 'Oslo, Norway' },
                    { value: 'finland', label: 'Helsinki, Finland' },
                    { value: 'denmark', label: 'Copenhagen, Denmark' },
                    { value: 'iceland', label: 'Reykjavik, Iceland' },
                  ]}
                />

                <AuraCheckbox
                  checked={accountForm.terms}
                  onChange={checked => setAccountForm({ ...accountForm, terms: checked })}
                  label="I accept the Sval UIX License & Terms"
                  description="We strictly respect privacy and never share telemetric telemetry."
                  error={accountErrors.terms}
                />

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--aura-border-subtle)]">
                  <AuraButton 
                    variant="ghost" 
                    size="sm" 
                    type="button"
                    onClick={() => setAccountForm({ name: '', email: '', password: '', country: 'sweden', terms: false })}
                  >
                    Reset
                  </AuraButton>
                  <AuraButton 
                    variant="primary" 
                    size="sm" 
                    type="submit" 
                    isLoading={isSubmittingAccount}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Create Account
                  </AuraButton>
                </div>
              </form>
            )}
          </div>
        </SvalExample>
      </div>

      {/* Example 2: Payment Checkout Selection */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-[var(--aura-text-primary)]">
          2. Payment Method Card Selection
        </h2>
        <p className="text-xs text-[var(--aura-text-secondary)]">
          Segmented radio selection group with card styling and contextual sub-inputs.
        </p>

        <SvalExample
          title="Payment Checkout Form"
          code={{
            react: `<AuraRadioGroup
  name="payment"
  layout="card"
  value={paymentMethod}
  onChange={setPaymentMethod}
  options={[
    { value: 'card', label: 'Credit Card', description: 'Visa, Mastercard, Amex' },
    { value: 'bank', label: 'Bank Transfer (SEPA)', description: 'Direct Euro debit clearance' },
    { value: 'crypto', label: 'Digital Ledger', description: 'Zero-fee cryptographic clearance' },
  ]}
/>`,
          }}
        >
          <div className="w-full max-w-md mx-auto flex flex-col gap-4">
            <AuraRadioGroup
              name="payment"
              layout="card"
              value={paymentMethod}
              onChange={setPaymentMethod}
              options={[
                { value: 'card', label: 'Credit Card', description: 'Visa, Mastercard, American Express' },
                { value: 'bank', label: 'Nordic Bank Giro (SEPA)', description: 'Direct Scandinavian clearance' },
                { value: 'invoice', label: 'Monthly Enterprise Invoice', description: '30-day net settlement' },
              ]}
            />

            {paymentMethod === 'card' && (
              <div className="p-4 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-2)]/50 flex flex-col gap-3">
                <AuraInput
                  label="Card Number"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  leftIcon={<CreditCard className="w-4 h-4" />}
                />
                <div className="grid grid-cols-2 gap-3">
                  <AuraInput label="Expires" placeholder="MM/YY" />
                  <AuraInput label="CVC" placeholder="123" />
                </div>
              </div>
            )}

            <AuraSwitch
              checked={savePayment}
              onChange={setSavePayment}
              label="Save payment instrument for automatic renewal"
            />
          </div>
        </SvalExample>
      </div>
    </div>
  );
};
