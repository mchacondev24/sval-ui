import React, { useState } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  Code, 
  Copy, 
  Check, 
  Download, 
  ArrowLeft,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';
import { ExampleMetadata } from './examples-data';

// Import Example Views
import { PosExample } from './PosExample';
import { DashboardExample } from './DashboardExample';
import { CrmExample } from './CrmExample';
import { AdminExample } from './AdminExample';
import { MarketingExample } from './MarketingExample';
import { AuthExamples } from './AuthExamples';
import { FormsExample } from './FormsExample';
import { StartersExample } from './StartersExample';
import { BusinessSuiteExample } from './BusinessSuiteExample';
import { SaaSDashboardTemplate } from '../templates/SaaSDashboardTemplate';
import { ECommerceGridTemplate } from '../templates/ECommerceGridTemplate';
import { SettingsProfileTemplate } from '../templates/SettingsProfileTemplate';

export interface ExampleViewerProps {
  example: ExampleMetadata;
  onBack: () => void;
  onNavigateToComponent?: (componentName: string) => void;
}

export const ExampleViewer: React.FC<ExampleViewerProps> = ({
  example,
  onBack,
  onNavigateToComponent,
}) => {
  const { addToast } = useAura();
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [codeTab, setCodeTab] = useState<'react' | 'html' | 'css'>('react');
  const [copied, setCopied] = useState(false);

  // Generate real code representation
  const sampleReactCode = example.id === 'app-business-suite' ? `// Sval UI Design System — Suite Comercial Integrada (React)
// Arquitectura con Base de Datos JSON en Memoria RAM (Zero Persistence)
import React, { useState } from 'react';
import { 
  AuraButton, 
  AuraCard, 
  AuraBadge, 
  AuraInput,
  AuraDialog 
} from '@sval-ui/react';

// Estructura de Datos JSON en Memoria Volátil
interface Customer { id: string; name: string; email: string; city: string; totalPurchases: number; }
interface Product { id: string; code: string; name: string; price: number; stock: number; }
interface Sale { id: string; saleNumber: string; customerName: string; total: number; date: string; }

export function BusinessSuiteApp() {
  // 1. Estado de Autenticación (Login)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clientes' | 'productos' | 'ventas' | 'reportes'>('dashboard');

  // 2. Base de Datos Temporal en Estado React (Se borra al salir)
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'CLI-001', name: 'Corporación Managua S.A.', email: 'corp@managua.ni', city: 'Managua', totalPurchases: 4850 },
    { id: 'CLI-002', name: 'Distribuidora del Norte', email: 'ventas@disnorte.com', city: 'Estelí', totalPurchases: 2340 },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 'PROD-101', code: 'SVAL-SRV-01', name: 'Licencia Enterprise Sval UI', price: 499, stock: 45 },
    { id: 'PROD-102', code: 'HW-NODE-03', name: 'Servidor Edge IoT Micro-Gateway', price: 850, stock: 8 },
  ]);

  const [sales, setSales] = useState<Sale[]>([
    { id: 'VTA-1001', saleNumber: 'FAC-2026-001', customerName: 'Corporación Managua S.A.', total: 1953.85, date: '2026-09-17' },
  ]);

  // Handler de Facturación Directa
  const handleCheckout = (productId: string, customerId: string, qty: number) => {
    const prod = products.find(p => p.id === productId);
    const cust = customers.find(c => c.id === customerId);
    if (!prod || !cust) return;

    const total = (prod.price * qty) * 1.15; // Con IVA 15%
    const newSale = {
      id: \`VTA-\${Date.now()}\`,
      saleNumber: \`FAC-2026-\${sales.length + 1}\`,
      customerName: cust.name,
      total,
      date: new Date().toISOString().split('T')[0],
    };

    // Actualiza en memoria RAM únicamente
    setSales(prev => [newSale, ...prev]);
    setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, stock: p.stock - qty } : p));
  };

  return (
    <div className="sval-layout max-w-7xl mx-auto p-6 font-sans">
      <header className="flex items-center justify-between pb-4 border-b border-[var(--aura-border-default)]">
        <div>
          <h1 className="text-xl font-bold text-[var(--aura-text-primary)]">Suite Comercial Sval</h1>
          <p className="text-xs text-[var(--aura-text-secondary)]">Base de Datos Efímera en Memoria RAM</p>
        </div>
        <AuraBadge variant="success" dot>RAM Activa (Zero Persistence)</AuraBadge>
      </header>

      {/* Renderizado de Módulos: Dashboard, Clientes, Productos, Ventas, Reportes */}
      <nav className="flex gap-2 my-4">
        {(['dashboard', 'clientes', 'productos', 'ventas', 'reportes'] as const).map(tab => (
          <AuraButton key={tab} variant={activeTab === tab ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </AuraButton>
        ))}
      </nav>
    </div>
  );
}` : `import React from 'react';
import { 
  AuraButton, 
  AuraCard, 
  AuraBadge, 
  AuraInput 
} from '@sval-ui/react';

export default function ${example.name.replace(/[^a-zA-Z0-9]/g, '')}() {
  return (
    <div className="sval-layout max-w-7xl mx-auto p-6 font-sans">
      <header className="flex items-center justify-between pb-6 border-b border-[var(--aura-border-default)]">
        <div>
          <h1 className="text-xl font-bold text-[var(--aura-text-primary)]">
            ${example.name}
          </h1>
          <p className="text-xs text-[var(--aura-text-secondary)]">
            ${example.description}
          </p>
        </div>
        <AuraButton variant="primary" size="md">
          Action Trigger
        </AuraButton>
      </header>
      {/* Component architecture built with Sval Design System */}
    </div>
  );
}`;

  const sampleHtmlCode = `<!-- Sval Design System — Universal HTML & CSS Tokens -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${example.name} — Sval UI</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sval-ui/core/dist/sval.min.css">
</head>
<body class="sval-theme-light">
  <div class="sval-container">
    <header class="sval-header">
      <h1 class="sval-title">${example.name}</h1>
      <button class="sval-btn sval-btn--primary">Execute Action</button>
    </header>
  </div>
</body>
</html>`;

  const sampleCssCode = `/* Sval Design System Tokens for ${example.name} */
:root {
  --aura-color-primary: #18181b;
  --aura-color-primary-foreground: #ffffff;
  --aura-surface-1: #ffffff;
  --aura-surface-2: #f4f4f5;
  --aura-border-default: #e4e4e7;
  --aura-radius-md: 8px;
  --aura-font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}`;

  const currentCode = codeTab === 'react' ? sampleReactCode : codeTab === 'html' ? sampleHtmlCode : sampleCssCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    addToast({
      title: 'Code Copied to Clipboard',
      description: `Copied ${codeTab.toUpperCase()} code for ${example.name}`,
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${example.id}.${codeTab === 'react' ? 'tsx' : codeTab === 'html' ? 'html' : 'css'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    addToast({
      title: 'Example Downloaded',
      description: `Downloaded ${example.id}.${codeTab === 'react' ? 'tsx' : codeTab}`,
      type: 'success',
    });
  };

  const renderComponent = () => {
    switch (example.id) {
      case 'app-business-suite':
        return <BusinessSuiteExample />;
      case 'app-pos':
        return <PosExample />;
      case 'dashboard-basic':
        return <DashboardExample />;
      case 'analytics-dashboard':
        return <SaaSDashboardTemplate />;
      case 'app-crm':
        return <CrmExample />;
      case 'app-admin':
        return <AdminExample />;
      case 'marketing-landing':
      case 'marketing-pricing':
        return <MarketingExample />;
      case 'ecommerce-catalog':
      case 'ecommerce-checkout':
        return <ECommerceGridTemplate />;
      case 'forms-wizard':
      case 'forms-registration':
        return <FormsExample />;
      case 'auth-suite':
        return <AuthExamples />;
      case 'starters-app-shell':
      case 'starters-minimal':
      default:
        return <StartersExample />;
    }
  };

  return (
    <div className={`flex flex-col gap-6 text-left font-sans w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-[var(--aura-bg)] p-4 sm:p-6 overflow-y-auto' : ''}`}>
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--aura-border-default)]">
        <div className="flex items-center gap-3">
          <AuraButton 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            All Examples
          </AuraButton>
          <div className="h-4 w-[1px] bg-[var(--aura-border-default)] hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--aura-text-primary)]">
                {example.name}
              </h1>
              <AuraBadge variant="neutral" size="sm">{example.category}</AuraBadge>
            </div>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
              {example.description}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Viewport Switcher */}
          <div className="flex items-center p-1 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)]">
            {[
              { id: 'desktop', icon: <Monitor className="w-3.5 h-3.5" />, title: 'Desktop (100%)' },
              { id: 'tablet', icon: <Tablet className="w-3.5 h-3.5" />, title: 'Tablet (768px)' },
              { id: 'mobile', icon: <Smartphone className="w-3.5 h-3.5" />, title: 'Mobile (375px)' },
            ].map(vp => (
              <button
                key={vp.id}
                type="button"
                onClick={() => setViewport(vp.id as any)}
                title={vp.title}
                className={`p-1.5 rounded-[var(--aura-radius-sm)] transition-all ${
                  viewport === vp.id
                    ? 'bg-[var(--aura-surface-1)] text-[var(--aura-color-primary)] shadow-xs'
                    : 'text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]'
                }`}
              >
                {vp.icon}
              </button>
            ))}
          </div>

          {/* View Code Toggle */}
          <AuraButton
            variant={showCode ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setShowCode(!showCode)}
            leftIcon={<Code className="w-3.5 h-3.5" />}
          >
            {showCode ? 'Hide Source' : '<> View Source'}
          </AuraButton>

          {/* Download Example */}
          <AuraButton
            variant="outline"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download
          </AuraButton>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Open in Fullscreen'}
            className="p-2 rounded-[var(--aura-radius-sm)] border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Built With Component Pills */}
      <div className="flex items-center gap-2 flex-wrap text-xs text-[var(--aura-text-secondary)]">
        <span className="font-semibold text-[var(--aura-text-primary)] flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-[var(--aura-color-primary)]" />
          Built with Sval Components:
        </span>
        {example.componentsUsed.map(comp => (
          <button
            key={comp}
            type="button"
            onClick={() => onNavigateToComponent && onNavigateToComponent(`cmp-${comp.toLowerCase()}`)}
            className="px-2 py-0.5 rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-2)] text-[var(--aura-text-primary)] border border-[var(--aura-border-subtle)] hover:border-[var(--aura-color-primary)] transition-colors font-medium text-[11px]"
          >
            {comp} →
          </button>
        ))}
      </div>

      {/* Code Inspector Drawer / Box */}
      {showCode && (
        <div className="rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] bg-[#121214] text-gray-100 overflow-hidden shadow-lg animate-fade-in">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1c1c1f] border-b border-gray-800">
            <div className="flex items-center gap-2">
              {(['react', 'html', 'css'] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setCodeTab(tab)}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors uppercase ${
                    codeTab === tab 
                      ? 'bg-white/10 text-white font-bold' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-gray-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto max-h-72">
            <code>{currentCode}</code>
          </pre>
        </div>
      )}

      {/* Interactive Responsive Viewport */}
      <div className="flex justify-center w-full py-2">
        <div 
          className={`
            w-full transition-all duration-300
            ${viewport === 'tablet' ? 'max-w-[768px] border-x border-[var(--aura-border-default)] px-4 py-2 bg-[var(--aura-surface-2)]/30 rounded-xl' : ''}
            ${viewport === 'mobile' ? 'max-w-[375px] border-x border-[var(--aura-border-default)] px-2 py-4 bg-[var(--aura-surface-2)]/30 rounded-2xl shadow-xl' : ''}
          `}
        >
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};
