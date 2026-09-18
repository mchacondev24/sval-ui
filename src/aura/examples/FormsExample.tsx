import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraInput } from '../components/Input';
import { AuraSelect } from '../components/Select';
import { AuraStepper } from '../components/Stepper';
import { AuraFileUpload } from '../components/FileUpload';
import { AuraCheckbox } from '../components/Checkbox';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';

export const FormsExample: React.FC = () => {
  const { addToast } = useAura();
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [fullName, setFullName] = useState('Astrid Lindgren');
  const [email, setEmail] = useState('astrid@stockholm-lab.se');
  const [organization, setOrganization] = useState('Stockholm University');
  const [role, setRole] = useState('architect');
  const [taxNumber, setTaxNumber] = useState('SE556012-3456');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const steps = [
    { id: 0, label: 'Identity & Organization', description: 'Personal & business info' },
    { id: 1, label: 'KYC & Verification', description: 'Upload company registry' },
    { id: 2, label: 'Tax & Compliance', description: 'VAT / Tax residency' },
    { id: 3, label: 'Review & Activate', description: 'Final confirmation' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      addToast({
        title: 'Enterprise Account Activated!',
        description: 'Verification packet completed and submitted to compliance.',
        type: 'success',
      });
      setCurrentStep(0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans">
      {/* Stepper Header Bar */}
      <div className="p-4 sm:p-6 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)]">
        <div className="max-w-3xl mx-auto">
          <AuraStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={(s) => setCurrentStep(s)}
          />
        </div>
      </div>

      {/* Main Form Step Content */}
      <div className="p-6 sm:p-10 max-w-2xl mx-auto w-full min-h-[440px] flex flex-col justify-between">
        {/* STEP 0: IDENTITY */}
        {currentStep === 0 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div>
              <h3 className="text-base font-bold text-[var(--aura-text-primary)]">
                Organization & Account Holder Details
              </h3>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                Ensure information matches your national identity document.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <AuraInput
                label="Full Legal Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
              <AuraInput
                label="Official Work Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AuraInput
                label="Enterprise Entity Name"
                value={organization}
                onChange={e => setOrganization(e.target.value)}
                required
              />
              <AuraSelect
                label="Primary Technical Role"
                value={role}
                onChange={e => setRole(e.target.value)}
                options={[
                  { value: 'architect', label: 'Lead Solutions Architect' },
                  { value: 'security', label: 'CISO / Security Director' },
                  { value: 'frontend', label: 'Senior Frontend Engineer' },
                  { value: 'designer', label: 'Design System Lead' },
                ]}
              />
            </div>
          </div>
        )}

        {/* STEP 1: KYC UPLOAD */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div>
              <h3 className="text-base font-bold text-[var(--aura-text-primary)]">
                KYC Verification & Company Registry Certificate
              </h3>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                Please upload an official registration excerpt (Bolagsverket, Companies House, or Commercial Registry).
              </p>
            </div>

            <div className="mt-2">
              <AuraFileUpload
                label="Upload Registry PDF or High-Resolution Scan"
                hint="Accepted formats: PDF, PNG, JPG up to 15MB"
                onFilesSelected={(files) => {
                  addToast({
                    title: 'File Uploaded',
                    description: `${files[0].name} attached to verification form.`,
                    type: 'info',
                  });
                }}
              />
            </div>
          </div>
        )}

        {/* STEP 2: TAX & COMPLIANCE */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div>
              <h3 className="text-base font-bold text-[var(--aura-text-primary)]">
                Tax Residency & Invoicing Compliance
              </h3>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                European VAT validation through the VIES directory.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <AuraInput
                label="VAT Identification Number"
                value={taxNumber}
                onChange={e => setTaxNumber(e.target.value)}
                hint="Validated automatically against EU VIES"
                required
              />
              <AuraSelect
                label="Tax Jurisdiction"
                defaultValue="se"
                options={[
                  { value: 'se', label: 'Sweden (Sverige)' },
                  { value: 'no', label: 'Norway (Norge)' },
                  { value: 'dk', label: 'Denmark (Danmark)' },
                  { value: 'fi', label: 'Finland (Suomi)' },
                  { value: 'is', label: 'Iceland (Ísland)' },
                ]}
              />
            </div>

            <div className="pt-2">
              <AuraCheckbox
                label="Company is exempt from reverse-charge VAT regulations under Directive 2006/112/EC"
                checked={agreeTerms}
                onChange={setAgreeTerms}
              />
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & ACTIVATE */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div>
              <h3 className="text-base font-bold text-[var(--aura-text-primary)]">
                Review Account Configuration
              </h3>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                Confirm your parameters before cryptographic provisioning.
              </p>
            </div>

            <div className="p-4 rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)] flex flex-col gap-2.5 text-xs mt-2">
              <div className="flex justify-between">
                <span className="text-[var(--aura-text-secondary)]">Account Holder:</span>
                <span className="font-semibold text-[var(--aura-text-primary)]">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--aura-text-secondary)]">Organization:</span>
                <span className="font-semibold text-[var(--aura-text-primary)]">{organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--aura-text-secondary)]">Email:</span>
                <span className="font-mono text-[var(--aura-text-primary)]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--aura-text-secondary)]">VAT Number:</span>
                <span className="font-mono font-bold text-[var(--aura-color-primary)]">{taxNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--aura-text-secondary)]">Verification:</span>
                <AuraBadge variant="success" size="sm">KYC Documents Attached</AuraBadge>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[var(--aura-border-default)] mt-8">
          <AuraButton
            variant="outline"
            size="md"
            onClick={handleBack}
            disabled={currentStep === 0}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </AuraButton>

          <AuraButton
            variant="primary"
            size="md"
            onClick={handleNext}
            rightIcon={currentStep === steps.length - 1 ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          >
            {currentStep === steps.length - 1 ? 'Activate Account' : 'Continue'}
          </AuraButton>
        </div>
      </div>
    </div>
  );
};
