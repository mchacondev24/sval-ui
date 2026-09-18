import { describe, it, expect, beforeEach } from 'vitest';
import { AuraThemeEngine } from '../theme-engine';
import { THEME_PRESETS } from '../tokens';

describe('Theme Engine & Token System', () => {
  beforeEach(() => {
    // Reset document element styles
    document.documentElement.className = '';
    document.documentElement.removeAttribute('style');
  });

  it('contains preconfigured Nordic theme presets', () => {
    expect(THEME_PRESETS['nordic-light']).toBeDefined();
    expect(THEME_PRESETS['nordic-dark']).toBeDefined();
    expect(THEME_PRESETS['fjord-blue']).toBeDefined();
    expect(THEME_PRESETS['forest-pine']).toBeDefined();
    expect(THEME_PRESETS['sandstone']).toBeDefined();

    expect(THEME_PRESETS['nordic-light'].mode).toBe('light');
    expect(THEME_PRESETS['nordic-dark'].mode).toBe('dark');
  });

  it('correctly applies dark mode class and custom properties to documentElement', () => {
    const darkTheme = THEME_PRESETS['nordic-dark'];
    AuraThemeEngine.applyTheme(darkTheme);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--aura-color-primary')).toBe(darkTheme.tokens.primary);
    expect(document.documentElement.style.getPropertyValue('--aura-color-accent')).toBe(darkTheme.tokens.accent);
    expect(document.documentElement.style.getPropertyValue('--aura-radius-md')).toBe(darkTheme.radius.md);
  });

  it('correctly removes dark class when light theme is applied', () => {
    AuraThemeEngine.applyTheme(THEME_PRESETS['nordic-dark']);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    AuraThemeEngine.applyTheme(THEME_PRESETS['nordic-light']);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('generates valid CSS variable blocks for developer copy-paste', () => {
    const css = AuraThemeEngine.exportAsCss(THEME_PRESETS['nordic-light']);
    expect(css).toContain(':root[data-aura-theme="nordic-light"] {');
    expect(css).toContain('--aura-color-primary: #0f172a;');
    expect(css).toContain('--aura-color-accent: #0284c7;');
    expect(css).toContain('--aura-radius-md: 8px;');
    expect(css).toContain('}');
  });
});

