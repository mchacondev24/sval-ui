import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { AuraThemeConfig, DensityMode, RadiusPreset, ThemePreset, ToastItem } from '../types';
import { THEME_PRESETS } from './tokens';
import { AuraThemeEngine } from './theme-engine';

interface AuraContextValue {
  theme: AuraThemeConfig;
  themePreset: ThemePreset;
  setThemePreset: (preset: ThemePreset) => void;
  density: DensityMode;
  setDensity: (density: DensityMode) => void;
  radiusMode: RadiusPreset;
  setRadiusMode: (mode: RadiusPreset) => void;
  updateCustomColor: (key: keyof AuraThemeConfig['tokens'], value: string) => void;
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  activeInspectorToken: string | null;
  setActiveInspectorToken: (token: string | null) => void;
  frameworkTab: 'react' | 'angular' | 'blazor' | 'html';
  setFrameworkTab: (fw: 'react' | 'angular' | 'blazor' | 'html') => void;
}

const AuraContext = createContext<AuraContextValue | null>(null);

export const AuraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themePreset, setThemePresetState] = useState<ThemePreset>('nordic-light');
  const [currentTheme, setCurrentTheme] = useState<AuraThemeConfig>(THEME_PRESETS['nordic-light']);
  const [density, setDensityState] = useState<DensityMode>('comfortable');
  const [radiusMode, setRadiusModeState] = useState<RadiusPreset>('subtle');
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeInspectorToken, setActiveInspectorToken] = useState<string | null>(null);
  const [frameworkTab, setFrameworkTab] = useState<'react' | 'angular' | 'blazor' | 'html'>('react');

  // Sync theme changes to DOM
  useEffect(() => {
    AuraThemeEngine.applyTheme(currentTheme);
  }, [currentTheme]);

  // Handle Preset switch
  const setThemePreset = useCallback((preset: ThemePreset) => {
    setThemePresetState(preset);
    const base = THEME_PRESETS[preset] || THEME_PRESETS['nordic-light'];
    const updated: AuraThemeConfig = {
      ...base,
      density,
    };
    setCurrentTheme(updated);
  }, [density]);

  // Handle Density switch
  const setDensity = useCallback((newDensity: DensityMode) => {
    setDensityState(newDensity);
    setCurrentTheme(prev => ({
      ...prev,
      density: newDensity,
    }));
  }, []);

  // Handle Radius preset
  const setRadiusMode = useCallback((mode: RadiusPreset) => {
    setRadiusModeState(mode);
    const radiusMap: Record<RadiusPreset, AuraThemeConfig['radius']> = {
      sharp: { sm: '0px', md: '0px', lg: '0px', xl: '0px', pill: '9999px' },
      subtle: { sm: '4px', md: '8px', lg: '12px', xl: '16px', pill: '9999px' },
      organic: { sm: '8px', md: '14px', lg: '20px', xl: '26px', pill: '9999px' },
      pill: { sm: '9999px', md: '9999px', lg: '9999px', xl: '9999px', pill: '9999px' },
    };

    setCurrentTheme(prev => ({
      ...prev,
      radius: radiusMap[mode],
    }));
  }, []);

  const updateCustomColor = useCallback((key: keyof AuraThemeConfig['tokens'], value: string) => {
    setCurrentTheme(prev => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        [key]: value,
      }
    }));
  }, []);

  // Toast Management
  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastItem = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    const duration = toast.duration ?? 4500;
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Keyboard shortcut for Command Palette: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);

  const value = useMemo(() => ({
    theme: currentTheme,
    themePreset,
    setThemePreset,
    density,
    setDensity,
    radiusMode,
    setRadiusMode,
    updateCustomColor,
    toasts,
    addToast,
    removeToast,
    isCommandPaletteOpen,
    openCommandPalette,
    closeCommandPalette,
    activeInspectorToken,
    setActiveInspectorToken,
    frameworkTab,
    setFrameworkTab,
  }), [
    currentTheme,
    themePreset,
    setThemePreset,
    density,
    setDensity,
    radiusMode,
    setRadiusMode,
    updateCustomColor,
    toasts,
    addToast,
    removeToast,
    isCommandPaletteOpen,
    openCommandPalette,
    closeCommandPalette,
    activeInspectorToken,
    setActiveInspectorToken,
    frameworkTab,
    setFrameworkTab,
  ]);

  return (
    <AuraContext.Provider value={value}>
      {children}
    </AuraContext.Provider>
  );
};

export const useAura = (): AuraContextValue => {
  const context = useContext(AuraContext);
  if (!context) {
    throw new Error('useAura must be used within an AuraProvider');
  }
  return context;
};
