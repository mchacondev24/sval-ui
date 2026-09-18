import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Code, 
  Globe, 
  Mail,
  HelpCircle,
  Cpu,
  Palette,
  Layout,
  CheckCircle2,
  Star
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraBadge } from '../components/Badge';
import { AuraSwitch } from '../components/Switch';
import { AuraInput } from '../components/Input';
import { AuraAccordion } from '../components/Accordion';
import { useAura } from '../context';

export const MarketingExample: React.FC = () => {
  const { addToast } = useAura();
  const [isAnnual, setIsAnnual] = useState(true);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast({
      title: 'Subscribed to Sval Dispatch',
      description: `Welcome! Future UI releases will be sent to ${email}`,
      type: 'success',
    });
    setEmail('');
  };

  const pricingPlans = [
    {
      name: 'Community Open Source',
      price: '$0',
      description: 'Zero cost forever for indie developers, personal projects, and startups.',
      features: ['All 26+ UI Components', 'Basic Nordic Theme', 'MIT Open Source License', 'Community Discord Support'],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Design System Pro',
      price: isAnnual ? '$29' : '$39',
      period: '/ month',
      description: 'Full token synchronization, multi-brand themes, and enterprise Figma kits.',
      features: ['Everything in Community', 'Custom Sval Theme Studio Export', 'Figma Design Tokens Sync', 'Priority SLA Security Updates', 'Commercial Production Rights'],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise Architecture',
      price: isAnnual ? '$199' : '$249',
      period: '/ month',
      description: 'Dedicated code audit, on-premise governance, and design system consulting.',
      features: ['Unlimited seats & applications', 'Custom Accessibility (WCAG AAA) Audit', 'Private NPM registry package', '24/7 Dedicated Slack Channel', 'Custom Component Development'],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans sval-metallic-card shadow-lg">
      {/* Hero Section */}
      <section className="px-6 py-14 sm:py-18 flex flex-col items-center text-center max-w-5xl mx-auto relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Sval UI v2.4 • Titanium Edition</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Angular Material Inspiration
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--aura-text-primary)] max-w-3xl leading-[1.15]">
          Architectural Precision for Modern Web Systems
        </h1>

        <p className="text-sm sm:text-base text-[var(--aura-text-secondary)] mt-4 max-w-2xl leading-relaxed">
          Sval combines the mathematical restraint of Scandinavian design with the tactile material elevation of Angular Material. Built for developers crafting high-density enterprise applications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <AuraButton 
            variant="primary" 
            size="lg" 
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => addToast({ title: 'Terminal Installed', description: 'npx create-sval-app initialized.', type: 'info' })}
            className="shadow-md font-bold"
          >
            Start Building with Sval
          </AuraButton>
          <AuraButton 
            variant="outline" 
            size="lg"
            onClick={() => addToast({ title: 'Figma Library', description: 'Opening design tokens community file...', type: 'info' })}
          >
            Explore Design Tokens
          </AuraButton>
        </div>

        {/* Rich Product UI Mockup Screen with Metallic Chrome Frame */}
        <div className="w-full mt-10 rounded-[var(--aura-radius-xl)] sval-metallic-card overflow-hidden border border-[var(--aura-border-default)] shadow-2xl relative group">
          {/* Mockup Browser Window Topbar */}
          <div className="h-9 bg-[var(--aura-surface-2)] border-b border-[var(--aura-border-default)] flex items-center px-4 justify-between sval-metallic-surface">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-mono text-[var(--aura-text-muted)] bg-[var(--aura-surface-1)] px-6 py-0.5 rounded-full border border-[var(--aura-border-subtle)] shadow-2xs">
              https://app.sval-system.cloud/nordic-cockpit
            </span>
            <div className="w-10" />
          </div>

          <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80"
              alt="Sval Design System Dashboard Mockup"
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500 text-white">
                    Live Telemetry
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    4 European Node Clusters
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Next-Gen Operations Console Powered by Sval Tokens
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Proof Logomarks & Avatars */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 pt-8 border-t border-[var(--aura-border-subtle)] w-full">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--aura-text-muted)]">
            <div className="flex -space-x-2 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80" alt="" className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </div>
            <span>Trusted by 4,200+ Nordic Engineers</span>
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-[var(--aura-text-muted)] opacity-60">
            VOLVO • IKEA • KLARNA • SAS • SPOTIFY
          </span>
        </div>
      </section>

      {/* Feature Grid with Jewel-Colored Icons */}
      <section className="px-6 py-12 bg-[var(--aura-surface-1)] border-t border-[var(--aura-border-default)] sval-metallic-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--aura-text-primary)]">
              Engineered for Enterprise Depth
            </h2>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
              Zero compromises between mathematical beauty and production reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center mb-3 shadow-xs">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
                  Microsecond Hydration
                </h3>
                <p className="text-xs text-[var(--aura-text-secondary)] mt-1 leading-relaxed">
                  Pure zero-runtime CSS tokens with zero layout thrashing. Instant tactile feedback on every click.
                </p>
              </div>
              <span className="text-[10px] font-mono text-amber-500 font-bold mt-4">
                &lt;1.2ms TTFB
              </span>
            </div>

            <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center mb-3 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
                  WCAG AAA Certified
                </h3>
                <p className="text-xs text-[var(--aura-text-secondary)] mt-1 leading-relaxed">
                  Every primitive includes ARIA 1.2 compliance, full keyboard traps, and high-contrast color ratios.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 font-bold mt-4">
                100% Screen Reader Tested
              </span>
            </div>

            <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-indigo-500 to-sky-600 text-white flex items-center justify-center mb-3 shadow-xs">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
                  Multi-Framework Themes
                </h3>
                <p className="text-xs text-[var(--aura-text-secondary)] mt-1 leading-relaxed">
                  Export dynamic design tokens directly to React, Vue, Angular, Svelte, or native CSS variables.
                </p>
              </div>
              <span className="text-[10px] font-mono text-indigo-500 font-bold mt-4">
                Universal Token Bridge
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Metallic Cards */}
      <section className="px-6 py-16 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
            Pick the license that fits your engineering team and workflow.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-xs font-medium ${!isAnnual ? 'text-[var(--aura-text-primary)] font-bold' : 'text-[var(--aura-text-muted)]'}`}>
              Monthly
            </span>
            <AuraSwitch checked={isAnnual} onChange={setIsAnnual} />
            <span className={`text-xs font-medium flex items-center gap-1.5 ${isAnnual ? 'text-[var(--aura-text-primary)] font-bold' : 'text-[var(--aura-text-muted)]'}`}>
              <span>Annual Billing</span>
              <AuraBadge variant="success" size="sm">Save 20%</AuraBadge>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards with Metallic Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map(plan => (
            <div
              key={plan.name}
              className={`
                p-6 rounded-[var(--aura-radius-lg)] border flex flex-col justify-between transition-all relative sval-metallic-card
                ${plan.popular
                  ? 'border-2 border-[var(--aura-color-primary)] shadow-xl'
                  : 'border-[var(--aura-border-default)]'
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-sm">
                    Most Popular Choice
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-base font-bold text-[var(--aura-text-primary)]">{plan.name}</h3>
                <p className="text-xs text-[var(--aura-text-secondary)] mt-1 min-h-[34px]">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 my-5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[var(--aura-text-primary)]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xs text-[var(--aura-text-muted)] font-mono">{plan.period}</span>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--aura-border-subtle)]">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[var(--aura-text-secondary)]">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--aura-border-subtle)]">
                <AuraButton 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  size="md" 
                  fullWidth
                  onClick={() => addToast({ title: plan.name, description: `Plan selected: ${plan.price}`, type: 'success' })}
                  className="font-bold shadow-xs"
                >
                  {plan.cta}
                </AuraButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-6 py-12 bg-[var(--aura-surface-1)] border-t border-[var(--aura-border-default)] sval-metallic-surface">
        <div className="max-w-xl mx-auto text-center flex flex-col gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[var(--aura-text-primary)]">
            Stay in the Design System Loop
          </h3>
          <p className="text-xs text-[var(--aura-text-secondary)]">
            Monthly technical dispatches covering token architecture, performance benchmarks, and new components.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto w-full mt-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="engineer@company.com"
              className="flex-1 h-9 px-3 text-xs rounded-[var(--aura-radius-md)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] focus:outline-none focus:border-[var(--aura-color-primary)]"
            />
            <AuraButton type="submit" variant="primary" size="sm">
              Subscribe
            </AuraButton>
          </form>
        </div>
      </section>
    </div>
  );
};
