import React, { useState } from 'react';
import { 
  Coffee, 
  Utensils, 
  Cake, 
  Sparkles, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  CheckCircle2, 
  Receipt,
  User,
  ShoppingBag,
  RefreshCw,
  Flame,
  Zap,
  Tag
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraBadge } from '../components/Badge';
import { AuraDialog } from '../components/Dialog';
import { AuraInput } from '../components/Input';
import { useAura } from '../context';

interface ProductItem {
  id: string;
  name: string;
  category: 'coffee' | 'pastry' | 'sandwich' | 'juice';
  price: number;
  calories: string;
  image: string;
  tag?: string;
}

const POS_PRODUCTS: ProductItem[] = [
  { 
    id: 'p1', 
    name: 'Stockholm Roast Espresso', 
    category: 'coffee', 
    price: 4.50, 
    calories: '5 kcal', 
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p2', 
    name: 'Oat Milk Flat White', 
    category: 'coffee', 
    price: 5.50, 
    calories: '120 kcal',
    tag: 'Artisan',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p3', 
    name: 'Cold Brew Arctic Tonic', 
    category: 'coffee', 
    price: 6.00, 
    calories: '15 kcal', 
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p4', 
    name: 'Cardamom Cinnamon Bun', 
    category: 'pastry', 
    price: 4.75, 
    calories: '310 kcal', 
    tag: 'Kanelbulle',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p5', 
    name: 'Almond Sourdough Croissant', 
    category: 'pastry', 
    price: 5.25, 
    calories: '380 kcal',
    tag: 'Fresh Baked',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p6', 
    name: 'Cloudberry Forest Tartlet', 
    category: 'pastry', 
    price: 6.50, 
    calories: '260 kcal',
    tag: 'Chef Spec',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p7', 
    name: 'Smoked Salmon Rye Toast', 
    category: 'sandwich', 
    price: 12.50, 
    calories: '420 kcal', 
    tag: 'Wild Catch',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p8', 
    name: 'Aged Havarti & Dill Panini', 
    category: 'sandwich', 
    price: 10.50, 
    calories: '490 kcal',
    tag: 'Crispy',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p9', 
    name: 'Sea Buckthorn Immunity Juice', 
    category: 'juice', 
    price: 6.50, 
    calories: '140 kcal',
    tag: 'Cold Pressed',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'p10', 
    name: 'Arctic Lingonberry Sparkler', 
    category: 'juice', 
    price: 5.50, 
    calories: '95 kcal',
    tag: 'Botanical',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop&q=80'
  },
];

export const PosExample: React.FC = () => {
  const { addToast } = useAura();
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'pastry' | 'sandwich' | 'juice'>('all');
  const [cart, setCart] = useState<{ product: ProductItem; quantity: number }[]>([
    { product: POS_PRODUCTS[0], quantity: 2 },
    { product: POS_PRODUCTS[3], quantity: 2 },
    { product: POS_PRODUCTS[6], quantity: 1 },
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'contactless'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredProducts = activeCategory === 'all' 
    ? POS_PRODUCTS 
    : POS_PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product: ProductItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as { product: ProductItem; quantity: number }[];
    });
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% Nordic standard VAT
  const total = subtotal + tax;

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      clearCart();
      addToast({
        title: 'Transaction Authorized',
        description: `Order successfully billed for $${total.toFixed(2)}. Digital receipt dispatched.`,
        type: 'success',
      });
    }, 900);
  };

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans sval-metallic-card shadow-lg">
      {/* POS Top Terminal Header with Metallic Lustre */}
      <div className="h-16 px-4 sm:px-6 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)] flex items-center justify-between sval-metallic-surface">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-sm shadow-sm border border-amber-400/30">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-[var(--aura-text-primary)]">
                Fjord & Kaffe • Terminal #04
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Register
              </span>
            </div>
            <p className="text-[11px] text-[var(--aura-text-muted)]">
              Cashier: Maxwell Chacón • Shift #2 • Stockholm Central
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <AuraButton variant="outline" size="sm" onClick={clearCart} leftIcon={<RefreshCw className="w-3.5 h-3.5 text-sky-500" />}>
            New Ticket
          </AuraButton>
        </div>
      </div>

      {/* Main Register Body */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-[580px]">
        {/* Left Side: Categories & Product Grid with Real Photography */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-[var(--aura-border-default)]">
          {/* Category Tabs with Jewel Colored Icons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Items', icon: <ShoppingBag className="w-4 h-4 text-slate-500" /> },
              { id: 'coffee', label: 'Artisan Coffee', icon: <Coffee className="w-4 h-4 text-amber-500" /> },
              { id: 'pastry', label: 'Nordic Bakery', icon: <Cake className="w-4 h-4 text-rose-400" /> },
              { id: 'sandwich', label: 'Kitchen & Rye', icon: <Utensils className="w-4 h-4 text-emerald-500" /> },
              { id: 'juice', label: 'Cold Pressed', icon: <Sparkles className="w-4 h-4 text-orange-500" /> },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`
                  flex items-center gap-2 px-3.5 py-2 rounded-[var(--aura-radius-md)] text-xs font-semibold shrink-0 transition-all border
                  ${activeCategory === cat.id
                    ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-transparent shadow-sm sval-metallic-pill'
                    : 'bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] border-[var(--aura-border-subtle)] hover:border-[var(--aura-border-default)] hover:text-[var(--aura-text-primary)]'
                  }
                `}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Product Cards Grid with Rich Real Photography */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 overflow-y-auto max-h-[500px] pr-1">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                type="button"
                onClick={() => addToCart(product)}
                className="flex flex-col text-left rounded-[var(--aura-radius-lg)] bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] hover:border-[var(--aura-color-primary)] hover:shadow-md transition-all group overflow-hidden active:scale-[0.98] sval-metallic-card"
              >
                {/* Product Photo Thumbnail */}
                <div className="h-28 w-full relative overflow-hidden bg-[var(--aura-surface-2)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  {/* Price Tag with Metallic Pill */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold font-mono bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-xs backdrop-blur-xs">
                    ${product.price.toFixed(2)}
                  </div>

                  {product.tag && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 shadow-2xs">
                      {product.tag}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col justify-between flex-1">
                  <h4 className="text-xs font-bold text-[var(--aura-text-primary)] group-hover:text-[var(--aura-color-accent)] transition-colors line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-[var(--aura-text-muted)] mt-2 pt-1 border-t border-[var(--aura-border-subtle)]">
                    <span>{product.calories}</span>
                    <span className="text-[var(--aura-color-primary)] font-semibold flex items-center gap-0.5">
                      <Plus className="w-3 h-3" /> Add
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Active Ticket / Cart with Metallic Texture */}
        <div className="w-full lg:w-84 bg-[var(--aura-surface-1)] flex flex-col justify-between p-4 sval-metallic-surface">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--aura-border-default)]">
              <span className="text-xs font-bold text-[var(--aura-text-primary)] flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-emerald-500" />
                Current Order ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <button
                type="button"
                onClick={clearCart}
                disabled={cart.length === 0}
                className="text-[11px] font-medium text-[var(--aura-text-muted)] hover:text-rose-500 disabled:opacity-40"
              >
                Clear
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px] pr-1">
              {cart.length === 0 ? (
                <div className="py-16 text-center text-xs text-[var(--aura-text-muted)] flex flex-col items-center gap-2">
                  <ShoppingBag className="w-8 h-8 opacity-30 text-amber-500" />
                  <span>Cart is empty. Tap items on the left to add.</span>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.product.id}
                    className="p-2.5 rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)] flex items-center justify-between gap-2.5 text-xs shadow-2xs"
                  >
                    <img 
                      src={item.product.image} 
                      alt="" 
                      className="w-10 h-10 rounded-[var(--aura-radius-sm)] object-cover shrink-0" 
                    />
                    <div className="flex flex-col truncate flex-1 min-w-0">
                      <span className="font-semibold text-[var(--aura-text-primary)] truncate">
                        {item.product.name}
                      </span>
                      <span className="text-[10px] text-[var(--aura-text-muted)]">
                        ${item.product.price.toFixed(2)} each
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-5 h-5 rounded bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] flex items-center justify-center text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-3)] active:scale-95"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-5 h-5 rounded bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] flex items-center justify-center text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-3)] active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold font-mono text-[var(--aura-text-primary)] shrink-0 w-12 text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pricing Calculation & Checkout Trigger */}
          <div className="flex flex-col gap-2 pt-3 border-t border-[var(--aura-border-default)] mt-4">
            <div className="flex justify-between text-xs text-[var(--aura-text-secondary)]">
              <span>Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--aura-text-secondary)]">
              <span>VAT / Tax (8%)</span>
              <span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[var(--aura-text-primary)] pt-1 border-t border-[var(--aura-border-subtle)]">
              <span>Total Balance</span>
              <span className="font-mono text-lg text-emerald-600 dark:text-emerald-400 font-extrabold">
                ${total.toFixed(2)}
              </span>
            </div>

            <AuraButton
              variant="primary"
              size="lg"
              fullWidth
              disabled={cart.length === 0}
              onClick={() => setIsCheckoutOpen(true)}
              leftIcon={<CreditCard className="w-4 h-4" />}
              className="mt-1 shadow-md font-bold"
            >
              Authorize & Charge ${total.toFixed(2)}
            </AuraButton>
          </div>
        </div>
      </div>

      {/* Checkout Modal with Angular Material Touch & Sheen */}
      <AuraDialog
        isOpen={isCheckoutOpen}
        onClose={() => !isProcessing && setIsCheckoutOpen(false)}
        title="Complete Touch Register Transaction"
        size="md"
        footer={
          <>
            <AuraButton variant="ghost" size="sm" onClick={() => setIsCheckoutOpen(false)} disabled={isProcessing}>
              Cancel
            </AuraButton>
            <AuraButton 
              variant="primary" 
              size="sm" 
              isLoading={isProcessing} 
              onClick={handleCompleteOrder}
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            >
              Authorize Payment ${total.toFixed(2)}
            </AuraButton>
          </>
        }
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="p-3.5 rounded-[var(--aura-radius-md)] sval-metallic-card flex items-center justify-between">
            <span className="text-[var(--aura-text-secondary)] font-medium">Due Balance</span>
            <span className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
              ${total.toFixed(2)}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--aura-text-primary)] block mb-1.5">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4 text-indigo-500" /> },
                { id: 'contactless', label: 'Apple / Google Pay', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
                { id: 'cash', label: 'Cash Tender', icon: <Receipt className="w-4 h-4 text-emerald-500" /> },
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`
                    flex flex-col items-center gap-1.5 p-3 rounded-[var(--aura-radius-md)] border text-center transition-all
                    ${paymentMethod === method.id
                      ? 'border-[var(--aura-color-primary)] bg-[var(--aura-surface-2)] text-[var(--aura-color-primary)] font-bold sval-metallic-pill'
                      : 'border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] text-[var(--aura-text-secondary)]'
                    }
                  `}
                >
                  {method.icon}
                  <span className="text-[11px]">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AuraInput
            label="Customer Email (for digital invoice & receipt)"
            placeholder="guest@scandi-cafe.se"
            type="email"
          />
        </div>
      </AuraDialog>
    </div>
  );
};
