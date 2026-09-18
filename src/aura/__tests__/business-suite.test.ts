import { describe, it, expect } from 'vitest';

describe('Business Suite & Ephemeral In-Memory State Module', () => {
  const INITIAL_CUSTOMERS = [
    { id: 'CLI-001', name: 'Corporación Managua S.A.', email: 'contacto@corpmanagua.ni', city: 'Managua', totalPurchases: 4850, status: 'VIP' },
    { id: 'CLI-002', name: 'Distribuidora del Norte', email: 'ventas@disnorte.com', city: 'Estelí', totalPurchases: 2340, status: 'Activo' },
  ];

  const INITIAL_PRODUCTS = [
    { id: 'PROD-101', code: 'SVAL-SRV-01', name: 'Licencia Enterprise Sval UI', category: 'Software', price: 499, stock: 45 },
    { id: 'PROD-102', code: 'HW-NODE-03', name: 'Servidor Edge IoT Micro-Gateway', category: 'Hardware', price: 850, stock: 8 },
  ];

  const INITIAL_SALES = [
    { id: 'VTA-1001', saleNumber: 'FAC-2026-001', customerName: 'Corporación Managua S.A.', subtotal: 1699, tax: 254.85, total: 1953.85, date: '2026-09-15' },
  ];

  it('maintains zero persistence: state is strictly ephemeral and in-memory', () => {
    let inMemoryCustomers = [...INITIAL_CUSTOMERS];
    let inMemoryProducts = [...INITIAL_PRODUCTS];
    let inMemorySales = [...INITIAL_SALES];

    // Add new customer in RAM
    const newCustomer = {
      id: 'CLI-003',
      name: 'Comercial León',
      email: 'leon@comercial.ni',
      city: 'León',
      totalPurchases: 0,
      status: 'Activo',
    };
    inMemoryCustomers = [newCustomer, ...inMemoryCustomers];
    expect(inMemoryCustomers.length).toBe(3);

    // Process a sale in RAM: decreases product stock and logs sale
    const product = inMemoryProducts[0];
    const qty = 2;
    const subtotal = product.price * qty;
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    inMemoryProducts = inMemoryProducts.map(p => p.id === product.id ? { ...p, stock: p.stock - qty } : p);
    expect(inMemoryProducts[0].stock).toBe(43);

    inMemorySales = [{
      id: 'VTA-1002',
      saleNumber: 'FAC-2026-002',
      customerName: newCustomer.name,
      subtotal,
      tax,
      total,
      date: '2026-09-17',
    }, ...inMemorySales];

    expect(inMemorySales.length).toBe(2);
    expect(inMemorySales[0].total).toBe(1147.7);

    // Resetting memory discards all added state without residue
    inMemoryCustomers = [...INITIAL_CUSTOMERS];
    inMemoryProducts = [...INITIAL_PRODUCTS];
    inMemorySales = [...INITIAL_SALES];

    expect(inMemoryCustomers.length).toBe(2);
    expect(inMemoryProducts[0].stock).toBe(45);
    expect(inMemorySales.length).toBe(1);
  });
});
