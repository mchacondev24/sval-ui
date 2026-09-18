import React from 'react';
import { motion } from 'motion/react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface AuraTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pills' | 'underline' | 'segment';
  size?: 'sm' | 'md';
  className?: string;
}

export const AuraTabs: React.FC<AuraTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
  };

  if (variant === 'segment') {
    return (
      <div className={`inline-flex p-1 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)] ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={`
                relative flex items-center justify-center font-medium rounded-[var(--aura-radius-sm)] transition-all select-none
                ${sizeStyles[size]}
                ${tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                ${isActive ? 'text-[var(--aura-text-primary)] font-semibold shadow-xs' : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="segment-pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-[var(--aura-surface-1)] rounded-[var(--aura-radius-sm)] shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.2 bg-[var(--aura-surface-3)] text-[10px] rounded-full">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div className={`flex border-b border-[var(--aura-border-default)] gap-6 ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={`
                relative pb-3 flex items-center font-medium transition-colors select-none text-sm
                ${tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                ${isActive ? 'text-[var(--aura-text-primary)] font-semibold' : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'}
              `}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.5 bg-[var(--aura-surface-2)] text-[11px] rounded-full">
                    {tab.badge}
                  </span>
                )}
              </span>
              {isActive && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--aura-color-primary)]"
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Default: pills
  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center font-medium rounded-[var(--aura-radius-md)] transition-all select-none
              ${sizeStyles[size]}
              ${tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              ${isActive
                ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] shadow-sm'
                : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] hover:text-[var(--aura-text-primary)]'
              }
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full ${isActive ? 'bg-white/20' : 'bg-[var(--aura-surface-3)]'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
