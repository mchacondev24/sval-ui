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
  const [codeTab, setCodeTab] = useState<'screen-ts' | 'service-ts' | 'angular' | 'html' | 'css'>('screen-ts');
  const [copied, setCopied] = useState(false);

  // 1. TypeScript Screen Component (Calling the Service)
  const sampleScreenTsCode = example.id === 'app-business-suite' ? `// ============================================================================
// Sval UI Design System — Pantalla Suite Comercial (TypeScript + React)
// Archivo: BusinessSuiteScreen.tsx
// Arquitectura Desacoplada: La vista consume el servicio de negocio 'businessService'
// ============================================================================

import React, { useState, useEffect } from 'react';
import { 
  Customer, 
  Product, 
  Sale, 
  ExecutiveReport, 
  businessService 
} from '../services/business.service';
import { 
  AuraButton, 
  AuraCard, 
  AuraBadge, 
  AuraInput, 
  AuraSelect, 
  AuraDialog 
} from '@sval-ui/react';

export function BusinessSuiteScreen() {
  // 1. Estado reactivo alimentado exclusivamente desde el Servicio
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [report, setReport] = useState<ExecutiveReport | null>(null);

  // Estados de control asíncrono
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessingSale, setIsProcessingSale] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estado de navegación modular
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clientes' | 'productos' | 'ventas' | 'reportes'>('dashboard');

  // Formulario reactivo para nueva venta
  const [saleForm, setSaleForm] = useState({
    customerId: '',
    productId: '',
    quantity: 1,
    paymentMethod: 'Tarjeta' as 'Tarjeta' | 'Transferencia' | 'Efectivo',
  });

  // 2. Ciclo de Vida: Busca los datos en el servicio asíncrono al montar la pantalla
  useEffect(() => {
    fetchDataFromService();
  }, []);

  /**
   * Invoca los métodos del servicio en paralelo para optimizar la carga
   */
  const fetchDataFromService = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      // Llamada asíncrona al servicio de negocio
      const [custList, prodList, salesList, execReport] = await Promise.all([
        businessService.getCustomers(),
        businessService.getProducts(),
        businessService.getSales(),
        businessService.getExecutiveReport(),
      ]);

      setCustomers(custList);
      setProducts(prodList);
      setSales(salesList);
      setReport(execReport);

      if (custList.length > 0 && prodList.length > 0) {
        setSaleForm(prev => ({
          ...prev,
          customerId: prev.customerId || custList[0].id,
          productId: prev.productId || prodList[0].id,
        }));
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al conectar con el servicio de datos.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Procesa la facturación delegando la transacción al servicio
   */
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!saleForm.customerId || !saleForm.productId) return;

    try {
      setIsProcessingSale(true);
      // 1. Delegación completa de validación de stock y cálculos al servicio
      const processedSale = await businessService.processSale({
        customerId: saleForm.customerId,
        productId: saleForm.productId,
        quantity: Number(saleForm.quantity),
        paymentMethod: saleForm.paymentMethod,
      });

      // 2. Refresca los datos llamando al servicio para sincronizar el estado
      await fetchDataFromService();
      alert(\`Factura \${processedSale.saleNumber} generada exitosamente. Total: $\${processedSale.total}\`);
    } catch (err: any) {
      alert(\`Fallo en la operación: \${err.message}\`);
    } finally {
      setIsProcessingSale(false);
    }
  };

  /**
   * Restablece la memoria RAM temporal llamando al servicio
   */
  const handleResetData = async () => {
    businessService.resetToInitialState();
    await fetchDataFromService();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-[var(--aura-text-muted)] font-mono">
        Buscando datos en el servicio de negocio (RAM Data Provider)...
      </div>
    );
  }

  return (
    <div className="sval-layout max-w-7xl mx-auto p-6 font-sans space-y-6">
      {/* Cabecera Principal con Indicadores de Servicio */}
      <header className="flex items-center justify-between pb-4 border-b border-[var(--aura-border-default)]">
        <div>
          <h1 className="text-xl font-bold text-[var(--aura-text-primary)]">Suite Comercial Sval</h1>
          <p className="text-xs text-[var(--aura-text-secondary)]">Pantalla TypeScript con Inyección de Servicio Asíncrono</p>
        </div>
        <div className="flex items-center gap-2">
          <AuraBadge variant="success" dot>Servicio Activo</AuraBadge>
          <AuraButton variant="outline" size="sm" onClick={handleResetData}>Reiniciar RAM</AuraButton>
        </div>
      </header>

      {/* Navegación Modular */}
      <nav className="flex gap-2">
        {(['dashboard', 'clientes', 'productos', 'ventas', 'reportes'] as const).map(tab => (
          <AuraButton 
            key={tab} 
            variant={activeTab === tab ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </AuraButton>
        ))}
      </nav>

      {/* Vista de Facturación / Registro de Ventas */}
      {activeTab === 'ventas' && (
        <AuraCard className="p-6">
          <h2 className="text-lg font-bold mb-4">Nueva Factura</h2>
          <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold mb-1">Cliente</label>
              <select 
                value={saleForm.customerId} 
                onChange={e => setSaleForm({ ...saleForm, customerId: e.target.value })}
                className="w-full p-2 rounded border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] text-sm"
              >
                {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Producto</label>
              <select 
                value={saleForm.productId} 
                onChange={e => setSaleForm({ ...saleForm, productId: e.target.value })}
                className="w-full p-2 rounded border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] text-sm"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                    {p.name} (Stock: {p.stock}) - ${p.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Cantidad</label>
              <input 
                type="number" 
                min={1} 
                value={saleForm.quantity} 
                onChange={e => setSaleForm({ ...saleForm, quantity: Number(e.target.value) })}
                className="w-full p-2 rounded border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] text-sm"
              />
            </div>

            <AuraButton type="submit" variant="primary" loading={isProcessingSale} fullWidth>
              Procesar en Servicio
            </AuraButton>
          </form>
        </AuraCard>
      )}
    </div>
  );
}` : `// ============================================================================
// Sval UI Design System — Pantalla TypeScript (${example.name})
// Arquitectura: Componente TypeScript desacoplado que busca datos en el Servicio
// ============================================================================

import React, { useState, useEffect } from 'react';
import { AuraButton, AuraCard, AuraBadge } from '@sval-ui/react';

interface ComponentData {
  id: string;
  title: string;
  status: 'active' | 'pending';
  lastUpdated: string;
}

export default function ${example.name.replace(/[^a-zA-Z0-9]/g, '')}Screen() {
  const [data, setData] = useState<ComponentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Busca datos en la capa de servicios
    async function loadData() {
      try {
        setLoading(true);
        // Simula la llamada al servicio TypeScript
        const response = await fetch('/api/resource-data').then(res => res.json()).catch(() => ({
          id: '${example.id}',
          title: '${example.name}',
          status: 'active' as const,
          lastUpdated: new Date().toISOString(),
        }));
        setData(response);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="sval-layout max-w-7xl mx-auto p-6 font-sans">
      <header className="flex items-center justify-between pb-6 border-b border-[var(--aura-border-default)]">
        <div>
          <h1 className="text-xl font-bold text-[var(--aura-text-primary)]">${example.name}</h1>
          <p className="text-xs text-[var(--aura-text-secondary)]">${example.description}</p>
        </div>
        <AuraBadge variant="success" dot>Servicio Conectado</AuraBadge>
      </header>

      <main className="mt-6">
        {loading ? (
          <p className="text-sm text-[var(--aura-text-muted)]">Cargando datos del servicio...</p>
        ) : (
          <AuraCard className="p-6">
            <h2 className="text-base font-semibold">{data?.title}</h2>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">ID: {data?.id} | Estado: {data?.status}</p>
          </AuraCard>
        )}
      </main>
    </div>
  );
}`;

  // 2. TypeScript Service Layer (business.service.ts)
  const sampleServiceTsCode = example.id === 'app-business-suite' ? `// ============================================================================
// Sval UI Design System — Capa de Servicio TypeScript de Negocio
// Archivo: business.service.ts
// Arquitectura: Base de Datos Efímera en Memoria RAM (Zero Persistence)
// ============================================================================

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalPurchases: number;
  status: 'VIP' | 'Activo' | 'Inactivo';
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: 'Software' | 'Servicios' | 'Hardware' | 'Diseño';
  price: number;
  stock: number;
  status: 'Disponible' | 'Bajo Stock' | 'Agotado';
}

export interface Sale {
  id: string;
  saleNumber: string;
  customerId: string;
  customerName: string;
  itemsCount: number;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'Tarjeta' | 'Transferencia' | 'Efectivo';
  date: string;
  status: 'Completada' | 'Cancelada';
}

export interface ExecutiveReport {
  totalRevenue: number;
  totalTax: number;
  averageTicket: number;
  totalInStock: number;
  inventoryValuation: number;
  topCustomers: { id: string; name: string; totalPurchases: number; percentage: number }[];
  paymentDistribution: { method: string; total: number; percentage: number }[];
}

export interface CreateSaleDto {
  customerId: string;
  productId: string;
  quantity: number;
  paymentMethod: 'Tarjeta' | 'Transferencia' | 'Efectivo';
}

export class BusinessService {
  // Almacenamiento volátil en memoria RAM (Zero Persistence)
  private customers: Customer[] = [
    { id: 'CLI-001', name: 'Corporación Managua S.A.', email: 'contacto@corpmanagua.ni', phone: '+505 2278-1000', city: 'Managua', totalPurchases: 4850, status: 'VIP' },
    { id: 'CLI-002', name: 'Distribuidora del Norte', email: 'ventas@disnorte.com', phone: '+505 2713-2244', city: 'Estelí', totalPurchases: 2340, status: 'Activo' },
  ];

  private products: Product[] = [
    { id: 'PROD-101', code: 'SVAL-SRV-01', name: 'Licencia Enterprise Sval UI', category: 'Software', price: 499, stock: 45, status: 'Disponible' },
    { id: 'PROD-102', code: 'HW-NODE-03', name: 'Servidor Edge IoT Micro-Gateway', category: 'Hardware', price: 850, stock: 8, status: 'Disponible' },
  ];

  private sales: Sale[] = [
    { id: 'VTA-1001', saleNumber: 'FAC-2026-001', customerId: 'CLI-001', customerName: 'Corporación Managua S.A.', itemsCount: 2, subtotal: 1699, tax: 254.85, total: 1953.85, paymentMethod: 'Transferencia', date: '2026-09-15', status: 'Completada' },
  ];

  // Métodos del Servicio
  public async getCustomers(): Promise<Customer[]> {
    return [...this.customers];
  }

  public async getProducts(): Promise<Product[]> {
    return [...this.products];
  }

  public async getSales(): Promise<Sale[]> {
    return [...this.sales];
  }

  public async processSale(dto: CreateSaleDto): Promise<Sale> {
    const product = this.products.find(p => p.id === dto.productId);
    if (!product) throw new Error('Producto no encontrado.');
    if (product.stock < dto.quantity) throw new Error(\`Stock insuficiente (quedan \${product.stock} unidades).\`);

    const customer = this.customers.find(c => c.id === dto.customerId);
    if (!customer) throw new Error('Cliente no encontrado.');

    const subtotal = Number((product.price * dto.quantity).toFixed(2));
    const tax = Number((subtotal * 0.15).toFixed(2)); // IVA 15%
    const total = Number((subtotal + tax).toFixed(2));

    const newSale: Sale = {
      id: \`VTA-\${Date.now()}\`,
      saleNumber: \`FAC-2026-\${String(this.sales.length + 1).padStart(3, '0')}\`,
      customerId: customer.id,
      customerName: customer.name,
      itemsCount: dto.quantity,
      subtotal,
      tax,
      total,
      paymentMethod: dto.paymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'Completada',
    };

    // Actualiza en memoria RAM
    this.sales = [newSale, ...this.sales];
    this.products = this.products.map(p => p.id === product.id ? { ...p, stock: p.stock - dto.quantity } : p);
    this.customers = this.customers.map(c => c.id === customer.id ? { ...c, totalPurchases: c.totalPurchases + total } : c);

    return newSale;
  }

  public async getExecutiveReport(): Promise<ExecutiveReport> {
    const totalRevenue = Number(this.sales.reduce((acc, s) => acc + s.total, 0).toFixed(2));
    const totalTax = Number((totalRevenue * 0.15).toFixed(2));
    const averageTicket = this.sales.length > 0 ? Number((totalRevenue / this.sales.length).toFixed(2)) : 0;
    const totalInStock = this.products.reduce((acc, p) => acc + p.stock, 0);
    const inventoryValuation = Number(this.products.reduce((acc, p) => acc + (p.price * p.stock), 0).toFixed(2));

    return {
      totalRevenue,
      totalTax,
      averageTicket,
      totalInStock,
      inventoryValuation,
      topCustomers: this.customers.slice(0, 5).map(c => ({ id: c.id, name: c.name, totalPurchases: c.totalPurchases, percentage: 50 })),
      paymentDistribution: [{ method: 'Tarjeta', total: totalRevenue, percentage: 100 }],
    };
  }

  public resetToInitialState(): void {
    // Restablece los datos iniciales volátiles
  }
}

export const businessService = new BusinessService();` : `// ============================================================================
// Sval UI Design System — Capa de Servicio TypeScript (${example.name})
// Archivo: data.service.ts
// ============================================================================

export interface ServiceResponse<T> {
  data: T;
  timestamp: string;
  status: 'ok' | 'error';
}

export class DataService {
  public async getResource(): Promise<ServiceResponse<any>> {
    return {
      data: { id: '${example.id}', name: '${example.name}' },
      timestamp: new Date().toISOString(),
      status: 'ok',
    };
  }
}

export const dataService = new DataService();`;

  // 3. Angular Standalone Component with Dependency Injection
  const sampleAngularCode = `// ============================================================================
// Sval UI Design System — Componente Angular 17+ (TypeScript Standalone)
// Archivo: business-suite.component.ts
// Consumiendo BusinessService mediante Inyección de Dependencias (DI)
// ============================================================================

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService, Customer, Product, Sale } from './business.service';

@Component({
  selector: 'app-business-suite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div class="sval-suite max-w-7xl mx-auto p-6 font-sans">
      <!-- Cabecera -->
      <header class="flex justify-between items-center pb-4 border-b border-[var(--aura-border-default)]">
        <div>
          <h1 class="text-xl font-bold text-[var(--aura-text-primary)]">Suite Comercial (Angular)</h1>
          <p class="text-xs text-[var(--aura-text-secondary)]">Inyección de Dependencias Angular con Sval Tokens</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600">
          DI Service Connected
        </span>
      </header>

      <!-- Estado de Carga -->
      <div *ngIf="isLoading" class="text-center py-12 text-sm text-[var(--aura-text-muted)]">
        Consultando servicio de negocio con Angular...
      </div>

      <!-- Métricas y Contenido -->
      <div *ngIf="!isLoading" class="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div class="p-4 rounded-xl border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)]">
          <span class="text-xs text-[var(--aura-text-secondary)]">Clientes en RAM</span>
          <p class="text-2xl font-bold mt-1 text-[var(--aura-text-primary)]">{{ customers.length }}</p>
        </div>
        <div class="p-4 rounded-xl border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)]">
          <span class="text-xs text-[var(--aura-text-secondary)]">Catálogo Productos</span>
          <p class="text-2xl font-bold mt-1 text-[var(--aura-text-primary)]">{{ products.length }}</p>
        </div>
        <div class="p-4 rounded-xl border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)]">
          <span class="text-xs text-[var(--aura-text-secondary)]">Ventas Registradas</span>
          <p class="text-2xl font-bold mt-1 text-[var(--aura-text-primary)]">{{ sales.length }}</p>
        </div>
      </div>
    </div>
  \`
})
export class BusinessSuiteComponent implements OnInit {
  // Inyección del servicio tipado
  private businessService = inject(BusinessService);

  public customers: Customer[] = [];
  public products: Product[] = [];
  public sales: Sale[] = [];
  public isLoading: boolean = true;

  async ngOnInit(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.isLoading = true;
    try {
      this.customers = await this.businessService.getCustomers();
      this.products = await this.businessService.getProducts();
      this.sales = await this.businessService.getSales();
    } finally {
      this.isLoading = false;
    }
  }
}`;

  // 4. Universal HTML Markup
  const sampleHtmlCode = `<!-- Sval Design System — Universal Semantic HTML5 -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${example.name} — Sval UI</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sval-ui/core/dist/sval.min.css">
</head>
<body class="sval-theme-light">
  <div class="sval-container max-w-7xl mx-auto p-6 font-sans">
    <header class="sval-header flex justify-between items-center pb-4 border-b border-gray-200">
      <h1 class="text-xl font-bold">${example.name}</h1>
      <button class="sval-btn sval-btn--primary px-4 py-2 rounded-lg bg-zinc-900 text-white font-medium">Ejecutar Acción</button>
    </header>
  </div>
</body>
</html>`;

  // 5. CSS Tokens
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

  const currentCode = 
    codeTab === 'screen-ts' ? sampleScreenTsCode :
    codeTab === 'service-ts' ? sampleServiceTsCode :
    codeTab === 'angular' ? sampleAngularCode :
    codeTab === 'html' ? sampleHtmlCode : sampleCssCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    addToast({
      title: 'Código Copiado',
      description: `Código ${codeTab.toUpperCase()} copiado para ${example.name}`,
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    const extensionMap: Record<typeof codeTab, string> = {
      'screen-ts': 'tsx',
      'service-ts': 'service.ts',
      'angular': 'component.ts',
      'html': 'html',
      'css': 'css',
    };
    element.download = `${example.id}.${extensionMap[codeTab]}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    addToast({
      title: 'Ejemplo Descargado',
      description: `Archivo descargado: ${example.id}.${extensionMap[codeTab]}`,
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
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'screen-ts', label: 'TS Pantalla' },
                { id: 'service-ts', label: 'TS Servicio' },
                { id: 'angular', label: 'Angular TS' },
                { id: 'html', label: 'HTML5' },
                { id: 'css', label: 'Tokens CSS' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCodeTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    codeTab === tab.id 
                      ? 'bg-white/15 text-white font-bold shadow-xs' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
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
