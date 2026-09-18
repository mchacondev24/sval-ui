import React, { useState } from 'react';
import { ShoppingBag, Star, Heart, Check, SlidersHorizontal } from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  inStock: boolean;
  designer: string;
  image: string;
}

export const ECommerceGridTemplate: React.FC = () => {
  const { addToast } = useAura();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(2);

  const products: ProductItem[] = [
    {
      id: 'p1',
      name: 'Kobenhavn Oak Lounger',
      category: 'Seating',
      price: 840,
      rating: 4.9,
      inStock: true,
      designer: 'Hans J. Møller',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p2',
      name: 'Fjord Minimalist Desk Lamp',
      category: 'Lighting',
      price: 260,
      rating: 4.8,
      inStock: true,
      designer: 'Astrid Lind',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p3',
      name: 'Stockholm Ceramic Vessel',
      category: 'Decor',
      price: 110,
      rating: 4.7,
      inStock: false,
      designer: 'Lars Nygård',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'p4',
      name: 'Reykjavik Wool Throw',
      category: 'Textiles',
      price: 195,
      rating: 5.0,
      inStock: true,
      designer: 'Sigrid Valdimar',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const categories = ['All', 'Seating', 'Lighting', 'Decor', 'Textiles'];

  const filtered = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6 text-left font-sans">
      {/* Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--aura-border-default)]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Nordic Design Collection
          </h2>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
            Ultra-minimalist functional furniture handcrafted in Scandinavia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)]">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3 py-1.5 text-xs rounded-[var(--aura-radius-sm)] font-medium transition-all
                  ${selectedCategory === cat
                    ? 'bg-[var(--aura-surface-1)] text-[var(--aura-text-primary)] shadow-xs font-semibold'
                    : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          <AuraButton
            variant="outline"
            size="sm"
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
          >
            Bag ({cartCount})
          </AuraButton>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(product => (
          <AuraCard key={product.id} variant="solid" padding="none" className="group">
            {/* Image Box */}
            <div className="relative aspect-4/3 overflow-hidden bg-[var(--aura-surface-2)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <AuraBadge variant={product.inStock ? 'neutral' : 'warning'} size="sm">
                  {product.inStock ? 'Available' : 'Made to Order'}
                </AuraBadge>
              </div>
              <button
                type="button"
                aria-label="Save to wishlist"
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-slate-700 hover:text-red-500 hover:bg-white transition-colors shadow-xs"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Info Body */}
            <div className="p-4 flex flex-col gap-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--aura-text-muted)]">
                {product.designer}
              </div>

              <h4 className="text-sm font-semibold text-[var(--aura-text-primary)] leading-snug">
                {product.name}
              </h4>

              <div className="flex items-center justify-between pt-2 mt-1 border-t border-[var(--aura-border-subtle)]">
                <span className="text-base font-bold font-mono text-[var(--aura-text-primary)]">
                  ${product.price}
                </span>

                <AuraButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setCartCount(c => c + 1);
                    addToast({
                      title: 'Added to Bag',
                      description: `${product.name} added successfully.`,
                      type: 'success',
                    });
                  }}
                >
                  Acquire
                </AuraButton>
              </div>
            </div>
          </AuraCard>
        ))}
      </div>
    </div>
  );
};
