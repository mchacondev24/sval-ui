import { AuraThemeConfig, DensityMode, RadiusPreset } from '../types';
import { THEME_PRESETS } from './tokens';

export class AuraThemeEngine {
  private static currentTheme: AuraThemeConfig = THEME_PRESETS['nordic-light'];

  public static applyTheme(theme: AuraThemeConfig): void {
    this.currentTheme = theme;
    const root = document.documentElement;

    // Toggle dark class on root
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set dataset attributes
    root.setAttribute('data-aura-theme', theme.id);
    root.setAttribute('data-aura-density', theme.density);

    // Apply CSS Variables
    root.style.setProperty('--aura-color-primary', theme.tokens.primary);
    root.style.setProperty('--aura-color-primary-hover', theme.tokens.primaryHover);
    root.style.setProperty('--aura-color-primary-foreground', theme.tokens.primaryForeground);
    root.style.setProperty('--aura-color-accent', theme.tokens.accent);

    root.style.setProperty('--aura-bg', theme.tokens.bg);
    root.style.setProperty('--aura-surface-1', theme.tokens.surface1);
    root.style.setProperty('--aura-surface-2', theme.tokens.surface2);
    root.style.setProperty('--aura-surface-3', theme.tokens.surface3);

    root.style.setProperty('--aura-border-subtle', theme.tokens.borderSubtle);
    root.style.setProperty('--aura-border-default', theme.tokens.borderDefault);
    root.style.setProperty('--aura-border-strong', theme.tokens.borderStrong);

    root.style.setProperty('--aura-text-primary', theme.tokens.textPrimary);
    root.style.setProperty('--aura-text-secondary', theme.tokens.textSecondary);
    root.style.setProperty('--aura-text-muted', theme.tokens.textMuted);

    root.style.setProperty('--aura-color-success', theme.tokens.success);
    root.style.setProperty('--aura-color-warning', theme.tokens.warning);
    root.style.setProperty('--aura-color-danger', theme.tokens.danger);
    root.style.setProperty('--aura-color-info', theme.tokens.info);

    // Apply Radii
    root.style.setProperty('--aura-radius-sm', theme.radius.sm);
    root.style.setProperty('--aura-radius-md', theme.radius.md);
    root.style.setProperty('--aura-radius-lg', theme.radius.lg);
    root.style.setProperty('--aura-radius-xl', theme.radius.xl);
    root.style.setProperty('--aura-radius-pill', theme.radius.pill);

    // Density values
    const densityMap: Record<DensityMode, string> = {
      compact: '3px',
      comfortable: '4px',
      spacious: '6px',
    };
    root.style.setProperty('--aura-space-unit', densityMap[theme.density] || '4px');
  }

  public static getTheme(): AuraThemeConfig {
    return this.currentTheme;
  }

  public static exportAsCss(theme: AuraThemeConfig): string {
    return `:root[data-aura-theme="${theme.id}"] {
  --aura-color-primary: ${theme.tokens.primary};
  --aura-color-primary-hover: ${theme.tokens.primaryHover};
  --aura-color-primary-foreground: ${theme.tokens.primaryForeground};
  --aura-color-accent: ${theme.tokens.accent};

  --aura-bg: ${theme.tokens.bg};
  --aura-surface-1: ${theme.tokens.surface1};
  --aura-surface-2: ${theme.tokens.surface2};
  --aura-surface-3: ${theme.tokens.surface3};

  --aura-border-subtle: ${theme.tokens.borderSubtle};
  --aura-border-default: ${theme.tokens.borderDefault};
  --aura-border-strong: ${theme.tokens.borderStrong};

  --aura-text-primary: ${theme.tokens.textPrimary};
  --aura-text-secondary: ${theme.tokens.textSecondary};
  --aura-text-muted: ${theme.tokens.textMuted};

  --aura-radius-sm: ${theme.radius.sm};
  --aura-radius-md: ${theme.radius.md};
  --aura-radius-lg: ${theme.radius.lg};
  --aura-radius-xl: ${theme.radius.xl};
}`;
  }

  public static exportAsJson(theme: AuraThemeConfig): string {
    return JSON.stringify(theme, null, 2);
  }

  public static exportAsTailwindPlugin(theme: AuraThemeConfig): string {
    return `// aura.tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        aura: {
          primary: 'var(--aura-color-primary)',
          'primary-foreground': 'var(--aura-color-primary-foreground)',
          accent: 'var(--aura-color-accent)',
          bg: 'var(--aura-bg)',
          surface1: 'var(--aura-surface-1)',
          surface2: 'var(--aura-surface-2)',
          surface3: 'var(--aura-surface-3)',
          border: 'var(--aura-border-default)',
          text: 'var(--aura-text-primary)',
          'text-muted': 'var(--aura-text-muted)'
        }
      },
      borderRadius: {
        'aura-sm': 'var(--aura-radius-sm)',
        'aura-md': 'var(--aura-radius-md)',
        'aura-lg': 'var(--aura-radius-lg)'
      }
    }
  }
};`;
  }
}
