export type ThemeMode = 'light' | 'dark' | 'system';

export type ThemePreset = 
  | 'nordic-light'
  | 'nordic-dark'
  | 'fjord-blue'
  | 'forest-pine'
  | 'sandstone'
  | 'high-contrast';

export type DensityMode = 'compact' | 'comfortable' | 'spacious';

export type RadiusPreset = 'sharp' | 'subtle' | 'organic' | 'pill';

export interface ColorTokens {
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  accent: string;
  bg: string;
  surface1: string;
  surface2: string;
  surface3: string;
  borderSubtle: string;
  borderDefault: string;
  borderStrong: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface AuraThemeConfig {
  id: string;
  name: string;
  description: string;
  mode: 'light' | 'dark';
  tokens: ColorTokens;
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    pill: string;
  };
  density: DensityMode;
  fontScale: number;
}

export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentDocumentation {
  id: string;
  name: string;
  category: 'Primitives' | 'Forms' | 'Surfaces & Overlays' | 'Data Display' | 'Navigation' | 'Patterns';
  description: string;
  whenToUse: string;
  whenNotToUse: string;
  nordicDesignNote: string;
  accessibilityNotes: string[];
  props: ComponentProp[];
  tokensUsed: string[];
  codeExamples: {
    react: string;
    angular: string;
    blazor: string;
    html: string;
  };
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon?: string;
  shortcut?: string;
  keywords?: string[];
  onSelect: () => void;
}

export interface EnterpriseOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'completed' | 'processing' | 'pending' | 'cancelled';
  region: 'Nordic' | 'Central EU' | 'North America' | 'APAC';
  date: string;
}
