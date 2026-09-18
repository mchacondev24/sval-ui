/**
 * Sval UI Design System — Business Service Layer (TypeScript)
 * 
 * Ephemeral In-Memory Business Operations (Zero Persistence Architecture)
 * Provides strongly typed asynchronous methods for Customers, Products, Sales and Reports.
 */

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

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone?: string;
  city: string;
  status?: 'VIP' | 'Activo' | 'Inactivo';
}

export interface CreateProductDto {
  code: string;
  name: string;
  category: 'Software' | 'Servicios' | 'Hardware' | 'Diseño';
  price: number;
  stock: number;
}

const DEFAULT_CUSTOMERS: Customer[] = [
  { id: 'CLI-001', name: 'Corporación Managua S.A.', email: 'contacto@corpmanagua.ni', phone: '+505 2278-1000', city: 'Managua', totalPurchases: 4850, status: 'VIP' },
  { id: 'CLI-002', name: 'Distribuidora del Norte', email: 'ventas@disnorte.com', phone: '+505 2713-2244', city: 'Estelí', totalPurchases: 2340, status: 'Activo' },
  { id: 'CLI-003', name: 'Servicios Digitales Granada', email: 'info@granadadigital.ni', phone: '+505 2552-8900', city: 'Granada', totalPurchases: 1280, status: 'Activo' },
  { id: 'CLI-004', name: 'Soluciones Tecnológicas León', email: 'admin@stleon.com', phone: '+505 2311-5500', city: 'León', totalPurchases: 3600, status: 'VIP' },
  { id: 'CLI-005', name: 'Agrocomercial Matagalpa', email: 'agro@matagalpa.ni', phone: '+505 2772-4300', city: 'Matagalpa', totalPurchases: 890, status: 'Inactivo' },
];

const DEFAULT_PRODUCTS: Product[] = [
  { id: 'PROD-101', code: 'SVAL-SRV-01', name: 'Licencia Enterprise Sval UI', category: 'Software', price: 499, stock: 45, status: 'Disponible' },
  { id: 'PROD-102', code: 'SVAL-SRV-02', name: 'Soporte 24/7 Nivel 3 (Anual)', category: 'Servicios', price: 1200, stock: 20, status: 'Disponible' },
  { id: 'PROD-103', code: 'HW-NODE-03', name: 'Servidor Edge IoT Micro-Gateway', category: 'Hardware', price: 850, stock: 8, status: 'Disponible' },
  { id: 'PROD-104', code: 'SVAL-ACC-04', name: 'Pack Iconos Nórdicos & SVGs Pro', category: 'Diseño', price: 79, stock: 150, status: 'Disponible' },
  { id: 'PROD-105', code: 'HW-ROUT-05', name: 'Router VPN Industrial Gigabit', category: 'Hardware', price: 340, stock: 4, status: 'Bajo Stock' },
  { id: 'PROD-106', code: 'SVAL-AUD-06', name: 'Auditoría de Accesibilidad WCAG AAA', category: 'Servicios', price: 1500, stock: 12, status: 'Disponible' },
];

const DEFAULT_SALES: Sale[] = [
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

export class BusinessService {
  private customers: Customer[] = [...DEFAULT_CUSTOMERS];
  private products: Product[] = [...DEFAULT_PRODUCTS];
  private sales: Sale[] = [...DEFAULT_SALES];

  /**
   * Resets all RAM records back to initial mock state (Zero Persistence)
   */
  public resetToInitialState(): void {
    this.customers = [...DEFAULT_CUSTOMERS];
    this.products = [...DEFAULT_PRODUCTS];
    this.sales = [...DEFAULT_SALES];
  }

  // --- Customer Operations ---
  public async getCustomers(): Promise<Customer[]> {
    return [...this.customers];
  }

  public async getCustomerById(id: string): Promise<Customer | null> {
    return this.customers.find(c => c.id === id) || null;
  }

  public async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const created: Customer = {
      id: `CLI-${String(this.customers.length + 1).padStart(3, '0')}`,
      name: dto.name,
      email: dto.email,
      phone: dto.phone || '+505 2200-0000',
      city: dto.city,
      totalPurchases: 0,
      status: dto.status || 'Activo',
    };
    this.customers = [created, ...this.customers];
    return created;
  }

  // --- Product Operations ---
  public async getProducts(): Promise<Product[]> {
    return [...this.products];
  }

  public async getProductById(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  public async createProduct(dto: CreateProductDto): Promise<Product> {
    const created: Product = {
      id: `PROD-${this.products.length + 101}`,
      code: dto.code.toUpperCase(),
      name: dto.name,
      category: dto.category,
      price: dto.price,
      stock: dto.stock,
      status: dto.stock > 5 ? 'Disponible' : dto.stock > 0 ? 'Bajo Stock' : 'Agotado',
    };
    this.products = [created, ...this.products];
    return created;
  }

  // --- Sales & Invoicing Operations ---
  public async getSales(): Promise<Sale[]> {
    return [...this.sales];
  }

  public async processSale(dto: CreateSaleDto): Promise<Sale> {
    const product = this.products.find(p => p.id === dto.productId);
    if (!product) {
      throw new Error(`Producto con ID ${dto.productId} no encontrado.`);
    }

    if (product.stock < dto.quantity) {
      throw new Error(`Stock insuficiente. Disponibles: ${product.stock} unidades.`);
    }

    const customer = this.customers.find(c => c.id === dto.customerId);
    if (!customer) {
      throw new Error(`Cliente con ID ${dto.customerId} no encontrado.`);
    }

    const subtotal = Number((product.price * dto.quantity).toFixed(2));
    const tax = Number((subtotal * 0.15).toFixed(2)); // 15% IVA Nicaragua
    const total = Number((subtotal + tax).toFixed(2));

    const newSale: Sale = {
      id: `VTA-${this.sales.length + 1001}`,
      saleNumber: `FAC-2026-${String(this.sales.length + 4).padStart(3, '0')}`,
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

    // Update sales list in RAM
    this.sales = [newSale, ...this.sales];

    // Decrement stock in RAM
    this.products = this.products.map(p => {
      if (p.id === product.id) {
        const nextStock = p.stock - dto.quantity;
        return {
          ...p,
          stock: nextStock,
          status: nextStock <= 0 ? 'Agotado' : nextStock <= 5 ? 'Bajo Stock' : 'Disponible',
        };
      }
      return p;
    });

    // Update customer purchasing volume
    this.customers = this.customers.map(c => {
      if (c.id === customer.id) {
        return { ...c, totalPurchases: Number((c.totalPurchases + total).toFixed(2)) };
      }
      return c;
    });

    return newSale;
  }

  // --- Reporting Operations ---
  public async getExecutiveReport(): Promise<ExecutiveReport> {
    const totalRevenue = Number(this.sales.reduce((acc, s) => acc + s.total, 0).toFixed(2));
    const totalTax = Number((totalRevenue * 0.15).toFixed(2));
    const averageTicket = this.sales.length > 0 ? Number((totalRevenue / this.sales.length).toFixed(2)) : 0;
    const totalInStock = this.products.reduce((acc, p) => acc + p.stock, 0);
    const inventoryValuation = Number(this.products.reduce((acc, p) => acc + (p.price * p.stock), 0).toFixed(2));

    const topCustomers = [...this.customers]
      .sort((a, b) => b.totalPurchases - a.totalPurchases)
      .slice(0, 5)
      .map(c => ({
        id: c.id,
        name: c.name,
        totalPurchases: c.totalPurchases,
        percentage: totalRevenue > 0 ? Math.round((c.totalPurchases / totalRevenue) * 100) : 0,
      }));

    const paymentMethods: ('Transferencia' | 'Tarjeta' | 'Efectivo')[] = ['Transferencia', 'Tarjeta', 'Efectivo'];
    const paymentDistribution = paymentMethods.map(method => {
      const methodSales = this.sales.filter(s => s.paymentMethod === method);
      const total = Number(methodSales.reduce((acc, s) => acc + s.total, 0).toFixed(2));
      const percentage = totalRevenue > 0 ? Math.round((total / totalRevenue) * 100) : 0;
      return { method, total, percentage };
    });

    return {
      totalRevenue,
      totalTax,
      averageTicket,
      totalInStock,
      inventoryValuation,
      topCustomers,
      paymentDistribution,
    };
  }
}

export const businessService = new BusinessService();
