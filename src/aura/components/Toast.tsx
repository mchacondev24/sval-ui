import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useAura } from '../context';
import { ToastItem } from '../../types';

export const AuraToastContainer: React.FC = () => {
  const { toasts, removeToast } = useAura();

  const iconMap = {
    default: <Info className="w-4 h-4 text-[var(--aura-text-secondary)] shrink-0" />,
    success: <CheckCircle2 className="w-4 h-4 text-[var(--aura-color-success)] shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-[var(--aura-color-warning)] shrink-0" />,
    danger: <AlertCircle className="w-4 h-4 text-[var(--aura-color-danger)] shrink-0" />,
    info: <Info className="w-4 h-4 text-[var(--aura-color-info)] shrink-0" />,
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast: ToastItem) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-lg)] shadow-lg backdrop-blur-md text-left font-sans"
          >
            {iconMap[toast.type || 'default']}

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-[var(--aura-text-primary)]">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action?.onClick();
                    removeToast(toast.id);
                  }}
                  className="mt-2 text-xs font-semibold text-[var(--aura-color-accent)] hover:underline"
                >
                  {toast.action.label}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)] p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
