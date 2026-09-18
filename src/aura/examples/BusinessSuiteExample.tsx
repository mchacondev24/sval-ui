import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  FileText, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  RefreshCw, 
  Layers, 
  Trash2, 
  Printer, 
  Download, 
  CreditCard, 
  Building2, 
  Lock, 
  Mail, 
  User, 
  Store,
  Sparkles,
  BarChart3,
  Calendar,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { AuraInput } from '../components/Input';
import { AuraSelect } from '../components/Select';
import { AuraDialog } from '../components/Dialog';
import { useAura } from '../context';

// --- Ephemeral In-Memory Initial JSON Data ---
const INITIAL_CUSTOMERS = [
  { id: 'CLI-001', name: 'Corporación Managua S.A.', email: 'contacto@corpmanagua.ni', phone: '+505 2278-1000', city: 'Managua', totalPurchases: 4850, status: 'VIP' },
  { id: 'CLI-002', name: 'Distribuidora del Norte', email: 'ventas@disnorte.com', phone: '+505 2713-2244', city: 'Estelí', totalPurchases: 2340, status: 'Activo' },
  { id: 'CLI-003', name: 'Servicios Digitales Granada', email: 'info@granadadigital.ni', phone: '+505 2552-8900', city: 'Granada', totalPurchases: 1280, status: 'Activo' },
  { id: 'CLI-004', name: 'Soluciones Tecnológicas León', email: 'admin@stleon.com', phone: '+505 2311-5500', city: 'León', totalPurchases: 3600, status: 'VIP' },
  { id: 'CLI-005', name: 'Agrocomercial Matagalpa', email: 'agro@matagalpa.ni', phone: '+505 2772-4300', city: 'Matagalpa', totalPurchases: 890, status: 'Inactivo' },
];

const INITIAL_PRODUCTS = [
  { id: 'PROD-101', code: 'SVAL-SRV-01', name: 'Licencia Enterprise Sval UI', category: 'Software', price: 499, stock: 45, status: 'Disponible' },
  { id: 'PROD-102', code: 'SVAL-SRV-02', name: 'Soporte 24/7 Nivel 3 (Anual)', category: 'Servicios', price: 1200, stock: 20, status: 'Disponible' },
  { id: 'PROD-103', code: 'HW-NODE-03', name: 'Servidor Edge IoT Micro-Gateway', category: 'Hardware', price: 850, stock: 8, status: 'Disponible' },
  { id: 'PROD-104', code: 'SVAL-ACC-04', name: 'Pack Iconos Nórdicos & SVGs Pro', category: 'Diseño', price: 79, stock: 150, status: 'Disponible' },
  { id: 'PROD-105', code: 'HW-ROUT-05', name: 'Router VPN Industrial Gigabit', category: 'Hardware', price: 340, stock: 4, status: 'Bajo Stock' },
  { id: 'PROD-106', code: 'SVAL-AUD-06', name: 'Auditoría de Accesibilidad WCAG AAA', category: 'Servicios', price: 1500, stock: 12, status: 'Disponible' },
];

const INITIAL_SALES = [
  {
    id: 'VTA-1001',
    saleNumber: 'FAC-2026-001',
    customerId: 'CLI-001',
    customerName: 'Corporación Managua S.A.',
    itemsCount: 2,
    subtotal: 1699,
    tax: 254.85,
    total: 1953.85,
    paymentMethod: 'Transferencia',
    date: '2026-09-15',
    status: 'Completada',
  },
  {
    id: 'VTA-1002',
    saleNumber: 'FAC-2026-002',
    customerId: 'CLI-004',
    customerName: 'Soluciones Tecnológicas León',
    itemsCount: 1,
    subtotal: 1200,
    tax: 180.00,
    total: 1380.00,
    paymentMethod: 'Tarjeta',
    date: '2026-09-16',
    status: 'Completada',
  },
  {
    id: 'VTA-1003',
    saleNumber: 'FAC-2026-003',
    customerId: 'CLI-002',
    customerName: 'Distribuidora del Norte',
    itemsCount: 3,
    subtotal: 919,
    tax: 137.85,
    total: 1056.85,
    paymentMethod: 'Efectivo',
    date: '2026-09-17',
    status: 'Completada',
  },
];

export const BusinessSuiteExample: React.FC = () => {
  const { addToast } = useAura();

  // --- Authentication State ---
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState<'Administrador' | 'Vendedor' | 'Gerente'>('Administrador');
  const [loginEmail, setLoginEmail] = useState('maxwell@sval-ui.com');
  const [loginPassword, setLoginPassword] = useState('demo1234');
  const [authError, setAuthError] = useState('');

  // --- Active Module Navigation ---
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clientes' | 'productos' | 'ventas' | 'reportes'>('dashboard');

  // --- Ephemeral In-Memory JSON Database (Zero Persistence) ---
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [sales, setSales] = useState(INITIAL_SALES);

  // --- Dialogs & Forms State ---
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', city: 'Managua', status: 'Activo' });

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ code: '', name: '', category: 'Software', price: 100, stock: 10 });

  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [saleCustomer, setSaleCustomer] = useState(INITIAL_CUSTOMERS[0].id);
  const [saleProduct, setSaleProduct] = useState(INITIAL_PRODUCTS[0].id);
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [salePaymentMethod, setSalePaymentMethod] = useState<'Tarjeta' | 'Transferencia' | 'Efectivo'>('Tarjeta');

  // Search & Filters
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState('Todos');
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('Todos');

  // TypeScript Service Inspector Modal State
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceModalTab, setServiceModalTab] = useState<'screen' | 'service' | 'angular'>('screen');
  const [copiedModalCode, setCopiedModalCode] = useState(false);

  // Reset in-memory database to original initial state
  const handleResetMemory = () => {
    setCustomers(INITIAL_CUSTOMERS);
    setProducts(INITIAL_PRODUCTS);
    setSales(INITIAL_SALES);
    addToast({
      title: 'Memoria JSON Reiniciada',
      description: 'Los datos en RAM han vuelto a su estado inicial. Nada fue guardado en disco ni servidores.',
      type: 'info',
    });
  };

  // --- Login Handler ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setAuthError('Por favor ingrese correo y contraseña.');
      return;
    }
    setAuthError('');
    setIsAuthenticated(true);
    addToast({
      title: 'Sesión Iniciada',
      description: `Bienvenido al ERP Sval UI como ${userRole}. Base de datos efímera en RAM.`,
      type: 'success',
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    addToast({
      title: 'Sesión Finalizada',
      description: 'Has salido de la plataforma de ejemplo.',
      type: 'info',
    });
  };

  // --- Add Customer Handler ---
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return;

    const created = {
      id: `CLI-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone || '+505 2200-0000',
      city: newCustomer.city,
      totalPurchases: 0,
      status: newCustomer.status as any,
    };

    setCustomers(prev => [created, ...prev]);
    setIsCustomerModalOpen(false);
    setNewCustomer({ name: '', email: '', phone: '', city: 'Managua', status: 'Activo' });
    addToast({
      title: 'Cliente Creado (RAM)',
      description: `${created.name} añadido a la base JSON en memoria.`,
      type: 'success',
    });
  };

  // --- Add Product Handler ---
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.code) return;

    const created = {
      id: `PROD-${products.length + 101}`,
      code: newProduct.code.toUpperCase(),
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price) || 50,
      stock: Number(newProduct.stock) || 1,
      status: Number(newProduct.stock) > 5 ? 'Disponible' : 'Bajo Stock',
    };

    setProducts(prev => [created, ...prev]);
    setIsProductModalOpen(false);
    setNewProduct({ code: '', name: '', category: 'Software', price: 100, stock: 10 });
    addToast({
      title: 'Producto Registrado (RAM)',
      description: `${created.name} agregado al catálogo temporal.`,
      type: 'success',
    });
  };

  // --- Create Sale Handler ---
  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === saleProduct);
    const cust = customers.find(c => c.id === saleCustomer);
    if (!prod || !cust) return;

    if (prod.stock < saleQuantity) {
      addToast({
        title: 'Stock Insuficiente',
        description: `Solo quedan ${prod.stock} unidades de ${prod.name}.`,
        type: 'danger',
      });
      return;
    }

    const subtotal = prod.price * saleQuantity;
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const newSale = {
      id: `VTA-${sales.length + 1001}`,
      saleNumber: `FAC-2026-${String(sales.length + 4).padStart(3, '0')}`,
      customerId: cust.id,
      customerName: cust.name,
      itemsCount: saleQuantity,
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
      paymentMethod: salePaymentMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'Completada',
    };

    // Update sales and reduce product stock in RAM
    setSales(prev => [newSale, ...prev]);
    setProducts(prev => prev.map(p => {
      if (p.id === prod.id) {
        const nextStock = p.stock - saleQuantity;
        return {
          ...p,
          stock: nextStock,
          status: nextStock <= 0 ? 'Agotado' : nextStock <= 5 ? 'Bajo Stock' : 'Disponible',
        };
      }
      return p;
    }));

    // Update customer purchases in RAM
    setCustomers(prev => prev.map(c => c.id === cust.id ? { ...c, totalPurchases: c.totalPurchases + total } : c));

    setIsSaleModalOpen(false);
    setSaleQuantity(1);

    addToast({
      title: '¡Venta Procesada Exitosamente!',
      description: `${newSale.saleNumber} por $${total.toFixed(2)} a ${cust.name}. Stock actualizado en RAM.`,
      type: 'success',
    });
  };

  // --- Calculations for Dashboard & Reports ---
  const totalRevenue = useMemo(() => sales.reduce((acc, s) => acc + s.total, 0), [sales]);
  const totalStockItems = useMemo(() => products.reduce((acc, p) => acc + p.stock, 0), [products]);
  const lowStockCount = useMemo(() => products.filter(p => p.stock <= 5).length, [products]);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
                          c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          c.city.toLowerCase().includes(customerSearch.toLowerCase());
      const matchStatus = customerStatusFilter === 'Todos' || c.status === customerStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [customers, customerSearch, customerStatusFilter]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.code.toLowerCase().includes(productSearch.toLowerCase());
      const matchCat = productCategoryFilter === 'Todos' || p.category === productCategoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, productSearch, productCategoryFilter]);

  // =========================================================================
  // VIEW 1: AUTHENTICATION (LOGIN)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 font-sans text-left">
        <AuraCard variant="solid" padding="lg" className="sval-metallic-card shadow-lg">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Store className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                🇳🇮 Framework Nicaragüense
              </span>
            </div>
            <h2 className="text-xl font-bold text-[var(--aura-text-primary)]">
              Acceso al Sistema Comercial
            </h2>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
              Ejemplo modular integrado (Clientes, Productos, Ventas y Reportes)
            </p>
          </div>

          {/* Ephemeral Warning Banner */}
          <div className="mb-5 p-3 rounded-[var(--aura-radius-md)] bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Base de Datos Temporal:</span> Todos los datos se gestionan en un JSON en memoria RAM. No se escribe en ninguna base de datos física ni disco.
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <AuraInput
              label="Correo Electrónico"
              type="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="admin@sval-ui.com"
            />

            <AuraInput
              label="Contraseña"
              type="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div>
              <label className="block text-xs font-medium text-[var(--aura-text-secondary)] mb-1">
                Rol de Usuario
              </label>
              <select
                value={userRole}
                onChange={e => setUserRole(e.target.value as any)}
                className="w-full text-xs h-9 px-3 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
              >
                <option value="Administrador">Administrador (Acceso Completo)</option>
                <option value="Vendedor">Vendedor (Punto de Venta)</option>
                <option value="Gerente">Gerente (Reportes y Analítica)</option>
              </select>
            </div>

            <AuraButton type="submit" variant="primary" size="md" fullWidth className="mt-2 font-semibold">
              Iniciar Sesión en Demo
            </AuraButton>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('maxwell@sval-ui.com');
                  setLoginPassword('demo1234');
                  setUserRole('Administrador');
                }}
                className="text-[11px] text-[var(--aura-color-accent)] hover:underline"
              >
                Autocompletar credenciales de demostración
              </button>
            </div>
          </form>
        </AuraCard>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: LOGGED-IN SUITE (DASHBOARD, CLIENTES, PRODUCTOS, VENTAS, REPORTES)
  // =========================================================================
  return (
    <div className="flex flex-col gap-6 font-sans text-left w-full">
      {/* Top Application Header */}
      <div className="p-4 sm:p-5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs sval-metallic-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[var(--aura-text-primary)]">
                  Suite Comercial Sval
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  🇳🇮 Nicaragua
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  RAM Ephemeral DB
                </span>
              </div>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                Usuario activo: <span className="font-semibold text-[var(--aura-text-primary)]">{loginEmail}</span> ({userRole})
              </p>
            </div>
          </div>

          {/* Ephemeral Memory Controls & TypeScript Service Inspector */}
          <div className="flex items-center gap-2 flex-wrap">
            <AuraButton
              variant="primary"
              size="sm"
              onClick={() => setIsServiceModalOpen(true)}
              leftIcon={<Code className="w-3.5 h-3.5 text-white" />}
              title="Inspeccionar el TypeScript de la pantalla llamando al servicio"
            >
              TypeScript del Servicio
            </AuraButton>

            <AuraButton
              variant="outline"
              size="sm"
              onClick={handleResetMemory}
              leftIcon={<RefreshCw className="w-3.5 h-3.5 text-sky-500" />}
              title="Restaura los arreglos JSON en memoria a su estado inicial"
            >
              Reiniciar Datos RAM
            </AuraButton>

            <AuraButton
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-3.5 h-3.5 text-rose-500" />}
            >
              Cerrar Sesión
            </AuraButton>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-1 mt-4 pt-4 border-t border-[var(--aura-border-subtle)] overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'clientes', label: `Clientes (${customers.length})`, icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'productos', label: `Productos (${products.length})`, icon: <Package className="w-3.5 h-3.5" /> },
            { id: 'ventas', label: `Ventas (${sales.length})`, icon: <ShoppingCart className="w-3.5 h-3.5" /> },
            { id: 'reportes', label: 'Reporte Ejecutivo', icon: <FileText className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-[var(--aura-radius-md)] transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] shadow-xs'
                  : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)] hover:text-[var(--aura-text-primary)]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          TAB 1: DASHBOARD
      ====================================================================== */}
      {activeTab === 'dashboard' && (
        <div className="flex flex-col gap-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <div className="flex items-center justify-between text-xs text-[var(--aura-text-muted)] mb-1">
                <span>Ventas Totales</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-[var(--aura-text-primary)] font-mono">
                ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+18.4% vs mes anterior</span>
              </div>
            </AuraCard>

            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <div className="flex items-center justify-between text-xs text-[var(--aura-text-muted)] mb-1">
                <span>Clientes en Memoria</span>
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-[var(--aura-text-primary)] font-mono">
                {customers.length}
              </div>
              <div className="text-[11px] text-[var(--aura-text-secondary)] mt-1">
                {customers.filter(c => c.status === 'VIP').length} clientes nivel VIP
              </div>
            </AuraCard>

            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <div className="flex items-center justify-between text-xs text-[var(--aura-text-muted)] mb-1">
                <span>Artículos en Catálogo</span>
                <Package className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-[var(--aura-text-primary)] font-mono">
                {products.length}
              </div>
              <div className="text-[11px] text-[var(--aura-text-secondary)] mt-1">
                {totalStockItems} unidades en stock total
              </div>
            </AuraCard>

            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <div className="flex items-center justify-between text-xs text-[var(--aura-text-muted)] mb-1">
                <span>Alertas de Inventario</span>
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-[var(--aura-text-primary)] font-mono">
                {lowStockCount}
              </div>
              <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
                {lowStockCount > 0 ? 'Requiere reabastecimiento' : 'Stock óptimo'}
              </div>
            </AuraCard>
          </div>

          {/* Quick Actions & Recent Sales */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Sales Table (2 cols) */}
            <div className="lg:col-span-2">
              <AuraCard variant="solid" padding="md" className="sval-metallic-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--aura-text-primary)]">
                      Transacciones Recientes (JSON en RAM)
                    </h3>
                    <p className="text-xs text-[var(--aura-text-secondary)]">
                      Últimas operaciones procesadas durante esta sesión interactiva
                    </p>
                  </div>
                  <AuraButton variant="primary" size="sm" onClick={() => setIsSaleModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                    Nueva Venta
                  </AuraButton>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[var(--aura-border-default)] text-[var(--aura-text-muted)]">
                        <th className="py-2 font-medium">Factura</th>
                        <th className="py-2 font-medium">Cliente</th>
                        <th className="py-2 font-medium">Fecha</th>
                        <th className="py-2 font-medium">Método</th>
                        <th className="py-2 font-medium text-right">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--aura-border-subtle)]">
                      {sales.slice(0, 5).map(s => (
                        <tr key={s.id} className="hover:bg-[var(--aura-surface-2)]/50 transition-colors">
                          <td className="py-2.5 font-mono font-medium text-[var(--aura-color-accent)]">{s.saleNumber}</td>
                          <td className="py-2.5 font-medium text-[var(--aura-text-primary)]">{s.customerName}</td>
                          <td className="py-2.5 text-[var(--aura-text-secondary)]">{s.date}</td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)]">
                              {s.paymentMethod}
                            </span>
                          </td>
                          <td className="py-2.5 font-mono font-bold text-right text-[var(--aura-text-primary)]">
                            ${s.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AuraCard>
            </div>

            {/* Quick Actions & System Info */}
            <div className="flex flex-col gap-4">
              <AuraCard variant="solid" padding="md" className="sval-metallic-card">
                <h3 className="text-sm font-semibold text-[var(--aura-text-primary)] mb-3">
                  Accesos Rápidos
                </h3>
                <div className="flex flex-col gap-2">
                  <AuraButton variant="outline" size="sm" fullWidth onClick={() => setIsSaleModalOpen(true)} leftIcon={<ShoppingCart className="w-3.5 h-3.5 text-emerald-500" />}>
                    Registrar Venta Directa
                  </AuraButton>
                  <AuraButton variant="outline" size="sm" fullWidth onClick={() => setIsCustomerModalOpen(true)} leftIcon={<Users className="w-3.5 h-3.5 text-blue-500" />}>
                    Agregar Nuevo Cliente
                  </AuraButton>
                  <AuraButton variant="outline" size="sm" fullWidth onClick={() => setIsProductModalOpen(true)} leftIcon={<Package className="w-3.5 h-3.5 text-purple-500" />}>
                    Dar de Alta Producto
                  </AuraButton>
                  <AuraButton variant="outline" size="sm" fullWidth onClick={() => setActiveTab('reportes')} leftIcon={<BarChart3 className="w-3.5 h-3.5 text-amber-500" />}>
                    Ver Reporte Ejecutivo
                  </AuraButton>
                </div>
              </AuraCard>

              <AuraCard variant="solid" padding="md" className="sval-metallic-card bg-blue-500/5 border-blue-500/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Arquitectura Efímera (RAM)</span>
                </div>
                <p className="text-[11px] text-[var(--aura-text-secondary)] leading-relaxed">
                  Para fines de prueba e integración, todas las operaciones de esta suite persisten exclusivamente en el estado React en memoria. Al refrescar la ventana o cerrar sesión se reinician automáticamente.
                </p>
              </AuraCard>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: MÓDULO DE CLIENTES
      ====================================================================== */}
      {activeTab === 'clientes' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <AuraInput
                placeholder="Buscar por nombre, correo o ciudad..."
                value={customerSearch}
                onChange={e => setCustomerSearch(e.target.value)}
                leftIcon={<Search className="w-3.5 h-3.5" />}
              />
              <select
                value={customerStatusFilter}
                onChange={e => setCustomerStatusFilter(e.target.value)}
                className="text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
              >
                <option value="Todos">Todos</option>
                <option value="VIP">VIP</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <AuraButton variant="primary" size="sm" onClick={() => setIsCustomerModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Nuevo Cliente
            </AuraButton>
          </div>

          <AuraCard variant="solid" padding="none" className="overflow-hidden sval-metallic-card">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--aura-surface-2)] border-b border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Código</th>
                    <th className="px-4 py-3">Nombre Comercial</th>
                    <th className="px-4 py-3">Correo & Teléfono</th>
                    <th className="px-4 py-3">Ciudad</th>
                    <th className="px-4 py-3 text-right">Volumen Compras</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--aura-border-subtle)]">
                  {filteredCustomers.map(c => (
                    <tr key={c.id} className="hover:bg-[var(--aura-surface-2)]/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-medium text-[var(--aura-text-muted)]">{c.id}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--aura-text-primary)]">{c.name}</td>
                      <td className="px-4 py-3">
                        <div className="text-[var(--aura-text-primary)]">{c.email}</div>
                        <div className="text-[10px] text-[var(--aura-text-muted)]">{c.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-[var(--aura-text-secondary)]">{c.city}</td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-[var(--aura-text-primary)]">
                        ${c.totalPurchases.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'VIP'
                            ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                            : c.status === 'Activo'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AuraCard>
        </div>
      )}

      {/* =====================================================================
          TAB 3: MÓDULO DE PRODUCTOS
      ====================================================================== */}
      {activeTab === 'productos' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <AuraInput
                placeholder="Buscar por código o producto..."
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                leftIcon={<Search className="w-3.5 h-3.5" />}
              />
              <select
                value={productCategoryFilter}
                onChange={e => setProductCategoryFilter(e.target.value)}
                className="text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
              >
                <option value="Todos">Todas las Categorías</option>
                <option value="Software">Software</option>
                <option value="Servicios">Servicios</option>
                <option value="Hardware">Hardware</option>
                <option value="Diseño">Diseño</option>
              </select>
            </div>

            <AuraButton variant="primary" size="sm" onClick={() => setIsProductModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Nuevo Producto
            </AuraButton>
          </div>

          <AuraCard variant="solid" padding="none" className="overflow-hidden sval-metallic-card">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--aura-surface-2)] border-b border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Código SKU</th>
                    <th className="px-4 py-3">Nombre del Producto</th>
                    <th className="px-4 py-3">Categoría</th>
                    <th className="px-4 py-3 text-right">Precio Unitario</th>
                    <th className="px-4 py-3 text-right">Stock Disponible</th>
                    <th className="px-4 py-3 text-center">Disponibilidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--aura-border-subtle)]">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-[var(--aura-surface-2)]/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-[var(--aura-color-accent)] font-medium">{p.code}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--aura-text-primary)]">{p.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[10px]">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-[var(--aura-text-primary)]">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium">
                        {p.stock} uds.
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'Disponible'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : p.status === 'Bajo Stock'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AuraCard>
        </div>
      )}

      {/* =====================================================================
          TAB 4: MÓDULO DE VENTAS
      ====================================================================== */}
      {activeTab === 'ventas' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
                Registro Histórico de Facturación (RAM)
              </h3>
              <p className="text-xs text-[var(--aura-text-secondary)]">
                {sales.length} transacciones generadas en esta sesión
              </p>
            </div>

            <AuraButton variant="primary" size="sm" onClick={() => setIsSaleModalOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Nueva Venta
            </AuraButton>
          </div>

          <AuraCard variant="solid" padding="none" className="overflow-hidden sval-metallic-card">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--aura-surface-2)] border-b border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] font-semibold">
                  <tr>
                    <th className="px-4 py-3">Factura</th>
                    <th className="px-4 py-3">Cliente</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3">Método</th>
                    <th className="px-4 py-3 text-right">Subtotal</th>
                    <th className="px-4 py-3 text-right">IVA (15%)</th>
                    <th className="px-4 py-3 text-right">Total Facturado</th>
                    <th className="px-4 py-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--aura-border-subtle)]">
                  {sales.map(s => (
                    <tr key={s.id} className="hover:bg-[var(--aura-surface-2)]/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-[var(--aura-color-accent)]">{s.saleNumber}</td>
                      <td className="px-4 py-3 font-medium text-[var(--aura-text-primary)]">{s.customerName}</td>
                      <td className="px-4 py-3 text-[var(--aura-text-secondary)]">{s.date}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)]">
                          {s.paymentMethod}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[var(--aura-text-secondary)]">
                        ${s.subtotal.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-[var(--aura-text-secondary)]">
                        ${s.tax.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-[var(--aura-text-primary)]">
                        ${s.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AuraCard>
        </div>
      )}

      {/* =====================================================================
          TAB 5: MÓDULO DE REPORTES (CON COMPONENTES SVAL)
      ====================================================================== */}
      {activeTab === 'reportes' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs sval-metallic-card">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[var(--aura-text-primary)]">
                  Reporte Ejecutivo de Rendimiento Comercial
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                  Generado con Sval UI
                </span>
              </div>
              <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
                Análisis consolidado en tiempo real calculado a partir del estado JSON en memoria.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <AuraButton
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
              >
                Imprimir Reporte
              </AuraButton>

              <AuraButton
                variant="primary"
                size="sm"
                onClick={() => {
                  const dataStr = JSON.stringify({ sales, customers, products }, null, 2);
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'reporte-comercial-sval.json';
                  a.click();
                  URL.revokeObjectURL(url);
                  addToast({ title: 'Reporte Exportado', description: 'Archivo JSON temporal descargado.', type: 'success' });
                }}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Exportar JSON
              </AuraButton>
            </div>
          </div>

          {/* Key Metric Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <div className="text-xs font-semibold text-[var(--aura-text-secondary)] mb-1">
                Facturación Total Acumulada
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--aura-text-primary)]">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-xs text-[var(--aura-text-muted)] mt-1">
                Impuestos recaudados: ${(totalRevenue * 0.15).toFixed(2)} (IVA 15%)
              </div>
            </AuraCard>

            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <div className="text-xs font-semibold text-[var(--aura-text-secondary)] mb-1">
                Ticket Promedio por Venta
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--aura-text-primary)]">
                ${sales.length > 0 ? (totalRevenue / sales.length).toFixed(2) : '0.00'}
              </div>
              <div className="text-xs text-[var(--aura-text-muted)] mt-1">
                Total de {sales.length} facturas emitidas
              </div>
            </AuraCard>

            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <div className="text-xs font-semibold text-[var(--aura-text-secondary)] mb-1">
                Valoración Total de Inventario
              </div>
              <div className="text-2xl font-bold font-mono text-[var(--aura-text-primary)]">
                ${products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-[var(--aura-text-muted)] mt-1">
                Distribuido en {products.length} líneas de producto
              </div>
            </AuraCard>
          </div>

          {/* Top Products and Customer Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-secondary)] mb-4 flex items-center justify-between">
                <span>Top Clientes por Facturación</span>
                <Users className="w-3.5 h-3.5 text-blue-500" />
              </h4>
              <div className="flex flex-col gap-3">
                {[...customers].sort((a, b) => b.totalPurchases - a.totalPurchases).slice(0, 4).map(c => {
                  const pct = totalRevenue > 0 ? Math.min(100, Math.round((c.totalPurchases / totalRevenue) * 100)) : 0;
                  return (
                    <div key={c.id} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[var(--aura-text-primary)]">{c.name}</span>
                        <span className="font-mono text-[var(--aura-text-secondary)]">${c.totalPurchases.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--aura-surface-2)] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AuraCard>

            <AuraCard variant="solid" padding="md" className="sval-metallic-card">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--aura-text-secondary)] mb-4 flex items-center justify-between">
                <span>Distribución por Método de Pago</span>
                <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
              </h4>
              <div className="flex flex-col gap-3">
                {['Transferencia', 'Tarjeta', 'Efectivo'].map(method => {
                  const methodSales = sales.filter(s => s.paymentMethod === method);
                  const amount = methodSales.reduce((acc, s) => acc + s.total, 0);
                  const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
                  return (
                    <div key={method} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[var(--aura-text-primary)]">{method}</span>
                        <span className="font-mono text-[var(--aura-text-secondary)]">${amount.toFixed(2)} ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--aura-surface-2)] rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </AuraCard>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 1: REGISTRAR CLIENTE
      ====================================================================== */}
      <AuraDialog
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        title="Registrar Nuevo Cliente"
        description="Añade un cliente a la colección JSON en memoria volátil."
      >
        <form onSubmit={handleAddCustomer} className="flex flex-col gap-3 pt-2">
          <AuraInput
            label="Nombre o Razón Social"
            value={newCustomer.name}
            onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="Ej. Inversiones Centroamericanas"
            required
          />
          <AuraInput
            label="Correo Electrónico"
            type="email"
            value={newCustomer.email}
            onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
            placeholder="contacto@inversiones.ni"
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <AuraInput
              label="Teléfono"
              value={newCustomer.phone}
              onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              placeholder="+505 2200-1122"
            />
            <div>
              <label className="block text-xs font-medium text-[var(--aura-text-secondary)] mb-1">Ciudad</label>
              <select
                value={newCustomer.city}
                onChange={e => setNewCustomer({ ...newCustomer, city: e.target.value })}
                className="w-full text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
              >
                <option value="Managua">Managua</option>
                <option value="León">León</option>
                <option value="Granada">Granada</option>
                <option value="Estelí">Estelí</option>
                <option value="Matagalpa">Matagalpa</option>
                <option value="Rivas">Rivas</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--aura-text-secondary)] mb-1">Categoría</label>
            <select
              value={newCustomer.status}
              onChange={e => setNewCustomer({ ...newCustomer, status: e.target.value })}
              className="w-full text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
            >
              <option value="Activo">Activo</option>
              <option value="VIP">VIP</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-[var(--aura-border-default)]">
            <AuraButton type="button" variant="ghost" size="sm" onClick={() => setIsCustomerModalOpen(false)}>
              Cancelar
            </AuraButton>
            <AuraButton type="submit" variant="primary" size="sm">
              Guardar en Memoria RAM
            </AuraButton>
          </div>
        </form>
      </AuraDialog>

      {/* =====================================================================
          MODAL 2: REGISTRAR PRODUCTO
      ====================================================================== */}
      <AuraDialog
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title="Dar de Alta Producto"
        description="Añade un nuevo producto al catálogo temporal."
      >
        <form onSubmit={handleAddProduct} className="flex flex-col gap-3 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <AuraInput
              label="Código SKU"
              value={newProduct.code}
              onChange={e => setNewProduct({ ...newProduct, code: e.target.value })}
              placeholder="SVAL-IT-01"
              required
            />
            <div>
              <label className="block text-xs font-medium text-[var(--aura-text-secondary)] mb-1">Categoría</label>
              <select
                value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
              >
                <option value="Software">Software</option>
                <option value="Servicios">Servicios</option>
                <option value="Hardware">Hardware</option>
                <option value="Diseño">Diseño</option>
              </select>
            </div>
          </div>

          <AuraInput
            label="Descripción del Producto"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Ej. Servidor Blade Xeon 64GB"
            required
          />

          <div className="grid grid-cols-2 gap-2">
            <AuraInput
              label="Precio Unitario ($)"
              type="number"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              required
            />
            <AuraInput
              label="Stock Inicial"
              type="number"
              value={newProduct.stock}
              onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-[var(--aura-border-default)]">
            <AuraButton type="button" variant="ghost" size="sm" onClick={() => setIsProductModalOpen(false)}>
              Cancelar
            </AuraButton>
            <AuraButton type="submit" variant="primary" size="sm">
              Agregar al Catálogo
            </AuraButton>
          </div>
        </form>
      </AuraDialog>

      {/* =====================================================================
          MODAL 3: CREAR NUEVA VENTA (PUNTO DE VENTA)
      ====================================================================== */}
      <AuraDialog
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        title="Crear Nueva Venta"
        description="Selecciona el cliente, producto y método de pago para emitir la factura en memoria."
      >
        <form onSubmit={handleCreateSale} className="flex flex-col gap-3 pt-2">
          <div>
            <label className="block text-xs font-medium text-[var(--aura-text-secondary)] mb-1">
              Cliente
            </label>
            <select
              value={saleCustomer}
              onChange={e => setSaleCustomer(e.target.value)}
              className="w-full text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[var(--aura-text-secondary)] mb-1">
                Producto
              </label>
              <select
                value={saleProduct}
                onChange={e => setSaleProduct(e.target.value)}
                className="w-full text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} - ${p.price} ({p.stock} disponibles)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <AuraInput
                label="Cantidad"
                type="number"
                min="1"
                value={saleQuantity}
                onChange={e => setSaleQuantity(Math.max(1, Number(e.target.value)))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--aura-text-secondary)] mb-1">
              Método de Pago
            </label>
            <select
              value={salePaymentMethod}
              onChange={e => setSalePaymentMethod(e.target.value as any)}
              className="w-full text-xs h-9 px-2 bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-md)] text-[var(--aura-text-primary)]"
            >
              <option value="Tarjeta">Tarjeta de Crédito / Débito</option>
              <option value="Transferencia">Transferencia Bancaria ACH</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>

          {/* Realtime calculation summary */}
          {(() => {
            const prod = products.find(p => p.id === saleProduct);
            const sub = (prod ? prod.price : 0) * saleQuantity;
            const iva = sub * 0.15;
            const tot = sub + iva;
            return (
              <div className="p-3 mt-2 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)] text-xs flex flex-col gap-1">
                <div className="flex justify-between text-[var(--aura-text-secondary)]">
                  <span>Subtotal:</span>
                  <span className="font-mono">${sub.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--aura-text-secondary)]">
                  <span>IVA (15%):</span>
                  <span className="font-mono">${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[var(--aura-text-primary)] pt-1 border-t border-[var(--aura-border-subtle)]">
                  <span>Total a Facturar:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">${tot.toFixed(2)}</span>
                </div>
              </div>
            );
          })()}

          <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-[var(--aura-border-default)]">
            <AuraButton type="button" variant="ghost" size="sm" onClick={() => setIsSaleModalOpen(false)}>
              Cancelar
            </AuraButton>
            <AuraButton type="submit" variant="primary" size="sm">
              Procesar y Emitir Factura
            </AuraButton>
          </div>
        </form>
      </AuraDialog>

      {/* TypeScript Service Inspector Dialog */}
      <AuraDialog
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title="Arquitectura TypeScript: Pantalla buscando el Servicio"
        size="lg"
      >
        <div className="flex flex-col gap-4 text-left">
          <p className="text-xs text-[var(--aura-text-secondary)]">
            Demostración de código TypeScript desacoplado: la pantalla (<code className="text-indigo-500 font-mono">BusinessSuiteScreen.tsx</code>) consume asíncronamente los métodos de la capa de servicio (<code className="text-indigo-500 font-mono">business.service.ts</code>) con arquitectura de memoria RAM efímera (Zero Persistence).
          </p>

          {/* Selector de Pestañas de Código */}
          <div className="flex items-center justify-between border-b border-[var(--aura-border-default)] pb-2 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'screen', label: '1. TS Pantalla (React Screen)' },
                { id: 'service', label: '2. TS Servicio (business.service.ts)' },
                { id: 'angular', label: '3. Angular TS (Inyección DI)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setServiceModalTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    serviceModalTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                const textToCopy = serviceModalTab === 'screen' ? CODE_SCREEN_TS : serviceModalTab === 'service' ? CODE_SERVICE_TS : CODE_ANGULAR_TS;
                navigator.clipboard.writeText(textToCopy);
                setCopiedModalCode(true);
                addToast({ title: 'Código Copiado', description: 'Código TypeScript copiado al portapapeles.', type: 'success' });
                setTimeout(() => setCopiedModalCode(false), 2000);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--aura-surface-2)] hover:bg-[var(--aura-surface-3)] text-xs text-[var(--aura-text-primary)] transition-colors border border-[var(--aura-border-default)]"
            >
              {copiedModalCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedModalCode ? 'Copiado' : 'Copiar TS'}</span>
            </button>
          </div>

          {/* Visualizador de Código */}
          <div className="rounded-lg bg-[#121214] text-gray-200 border border-gray-800 p-4 max-h-96 overflow-y-auto font-mono text-xs leading-relaxed">
            <pre className="overflow-x-auto">
              <code>
                {serviceModalTab === 'screen' ? CODE_SCREEN_TS : serviceModalTab === 'service' ? CODE_SERVICE_TS : CODE_ANGULAR_TS}
              </code>
            </pre>
          </div>

          <div className="flex justify-end pt-2">
            <AuraButton variant="primary" size="sm" onClick={() => setIsServiceModalOpen(false)}>
              Entendido y Cerrar
            </AuraButton>
          </div>
        </div>
      </AuraDialog>
    </div>
  );
};

// --- TypeScript Code Representation Constants ---
const CODE_SCREEN_TS = `// ============================================================================
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

      // Llamada asíncrona concurrente a la capa de servicios
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
                    {p.name} (Stock: {p.stock}) - \${p.price}
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
}`;

const CODE_SERVICE_TS = `// ============================================================================
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

export const businessService = new BusinessService();`;

const CODE_ANGULAR_TS = `// ============================================================================
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
      <header class="flex justify-between items-center pb-4 border-b border-[var(--aura-border-default)]">
        <div>
          <h1 class="text-xl font-bold text-[var(--aura-text-primary)]">Suite Comercial (Angular)</h1>
          <p class="text-xs text-[var(--aura-text-secondary)]">Inyección de Dependencias Angular con Sval Tokens</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600">
          DI Service Connected
        </span>
      </header>

      <div *ngIf="isLoading" class="text-center py-12 text-sm text-[var(--aura-text-muted)]">
        Consultando servicio de negocio con Angular...
      </div>

      <div *ngIf="!isLoading" class="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div class="p-4 rounded-xl border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)]">
          <span class="text-xs text-[var(--aura-text-secondary)]">Clientes en RAM</span>
          <p class="text-2xl font-bold mt-1 text-[var(--aura-text-primary)]">{{ customers.length }}</p>
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
