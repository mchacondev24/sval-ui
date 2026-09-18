import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
}

export interface AuraStepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const AuraStepper: React.FC<AuraStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isUpcoming = idx > currentStep;

          return (
            <div key={step.id} className="flex items-start gap-3 relative">
              {idx < steps.length - 1 && (
                <div 
                  className={`absolute left-3.5 top-8 w-0.5 h-[calc(100%-8px)] -ml-[1px] transition-colors ${
                    isCompleted ? 'bg-[var(--aura-color-primary)]' : 'bg-[var(--aura-border-default)]'
                  }`} 
                />
              )}
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(idx)}
                disabled={!onStepClick}
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 z-10
                  ${isCompleted 
                    ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]'
                    : isCurrent
                    ? 'border-2 border-[var(--aura-color-primary)] text-[var(--aura-color-primary)] bg-[var(--aura-surface-1)]'
                    : 'border border-[var(--aura-border-default)] text-[var(--aura-text-muted)] bg-[var(--aura-surface-2)]'
                  }
                `}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </button>
              <div className="flex flex-col text-left">
                <span className={`text-xs font-semibold ${isCurrent ? 'text-[var(--aura-text-primary)]' : 'text-[var(--aura-text-secondary)]'}`}>
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-[11px] text-[var(--aura-text-muted)] mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center w-full ${className}`}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(idx)}
                disabled={!onStepClick}
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0
                  ${isCompleted 
                    ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)]'
                    : isCurrent
                    ? 'border-2 border-[var(--aura-color-primary)] text-[var(--aura-color-primary)] bg-[var(--aura-surface-1)]'
                    : 'border border-[var(--aura-border-default)] text-[var(--aura-text-muted)] bg-[var(--aura-surface-2)]'
                  }
                `}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </button>
              <span className={`text-xs font-medium hidden sm:inline ${isCurrent ? 'text-[var(--aura-text-primary)] font-bold' : 'text-[var(--aura-text-secondary)]'}`}>
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div 
                className={`flex-1 h-0.5 mx-2 sm:mx-3 transition-colors ${
                  idx < currentStep ? 'bg-[var(--aura-color-primary)]' : 'bg-[var(--aura-border-default)]'
                }`} 
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
