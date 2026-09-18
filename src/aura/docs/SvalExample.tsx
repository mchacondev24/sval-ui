import React, { useState } from 'react';
import { Copy, Check, Monitor, Tablet, Smartphone, Code, Eye } from 'lucide-react';
import { useAura } from '../context';

export interface SvalExampleProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code?: {
    react?: string;
    angular?: string;
    blazor?: string;
    html?: string;
  };
  defaultViewport?: 'desktop' | 'tablet' | 'mobile';
  className?: string;
}

export const SvalExample: React.FC<SvalExampleProps> = ({
  title,
  description,
  children,
  code,
  defaultViewport = 'desktop',
  className = '',
}) => {
  const { frameworkTab, setFrameworkTab, addToast } = useAura();
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>(defaultViewport);
  const [isCopied, setIsCopied] = useState(false);

  const currentCode = code?.[frameworkTab] || code?.react || code?.html || '// Code example coming soon';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setIsCopied(true);
    addToast({
      title: 'Code Copied',
      description: `Copied ${frameworkTab.toUpperCase()} snippet to clipboard.`,
      type: 'success',
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const viewportWidths = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] mx-auto',
    mobile: 'max-w-[375px] mx-auto',
  };

  return (
    <div className={`my-6 border border-[var(--aura-border-default)] rounded-[var(--aura-radius-lg)] overflow-hidden bg-[var(--aura-surface-1)] shadow-xs ${className}`}>
      {/* Top Controls Bar */}
      <div className="px-4 py-2.5 bg-[var(--aura-surface-2)]/80 border-b border-[var(--aura-border-subtle)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {title && (
            <span className="text-xs font-semibold text-[var(--aura-text-primary)]">
              {title}
            </span>
          )}
          {/* Preview / Code Tab Switcher */}
          <div className="flex items-center p-0.5 bg-[var(--aura-surface-1)] rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)]">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`
                px-2.5 py-1 text-[11px] font-medium rounded flex items-center gap-1.5 transition-colors
                ${activeTab === 'preview'
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold'
                  : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'
                }
              `}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`
                px-2.5 py-1 text-[11px] font-medium rounded flex items-center gap-1.5 transition-colors
                ${activeTab === 'code'
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold'
                  : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'
                }
              `}
            >
              <Code className="w-3 h-3" />
              <span>Code</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport Switcher (Preview Mode Only) */}
          {activeTab === 'preview' && (
            <div className="hidden sm:flex items-center gap-1 p-0.5 bg-[var(--aura-surface-1)] rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)] text-[var(--aura-text-muted)]">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                title="Desktop View (100%)"
                className={`p-1 rounded transition-colors ${viewport === 'desktop' ? 'bg-[var(--aura-surface-3)] text-[var(--aura-text-primary)]' : 'hover:text-[var(--aura-text-primary)]'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('tablet')}
                title="Tablet View (768px)"
                className={`p-1 rounded transition-colors ${viewport === 'tablet' ? 'bg-[var(--aura-surface-3)] text-[var(--aura-text-primary)]' : 'hover:text-[var(--aura-text-primary)]'}`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                title="Mobile View (375px)"
                className={`p-1 rounded transition-colors ${viewport === 'mobile' ? 'bg-[var(--aura-surface-3)] text-[var(--aura-text-primary)]' : 'hover:text-[var(--aura-text-primary)]'}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Framework Switcher (Code Mode) */}
          {activeTab === 'code' && (
            <div className="flex items-center gap-0.5 p-0.5 bg-[var(--aura-surface-1)] rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)]">
              {(['react', 'angular', 'blazor', 'html'] as const).map(fw => (
                <button
                  key={fw}
                  type="button"
                  onClick={() => setFrameworkTab(fw)}
                  className={`
                    px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded transition-colors
                    ${frameworkTab === fw
                      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold'
                      : 'text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]'
                    }
                  `}
                >
                  {fw}
                </button>
              ))}
            </div>
          )}

          {/* Copy Code Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-1)] hover:bg-[var(--aura-surface-3)] border border-[var(--aura-border-default)] text-xs text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] transition-colors font-medium"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {description && (
        <div className="px-4 py-2 text-xs text-[var(--aura-text-secondary)] border-b border-[var(--aura-border-subtle)] bg-[var(--aura-surface-1)]/50">
          {description}
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === 'preview' ? (
        <div className="p-6 bg-[var(--aura-bg)]/40 overflow-x-auto transition-all">
          <div className={`${viewportWidths[viewport]} transition-all duration-300 border border-[var(--aura-border-subtle)] rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-1)] p-6 min-h-[120px] flex items-center justify-center`}>
            {children}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-neutral-950 text-neutral-200 overflow-x-auto">
          <pre className="text-xs font-mono leading-relaxed max-h-96 overflow-y-auto">
            {currentCode}
          </pre>
        </div>
      )}
    </div>
  );
};
