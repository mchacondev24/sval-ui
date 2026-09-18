import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Terminal, 
  Database, 
  Palette, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Cpu, 
  Code2, 
  CheckCircle2,
  ExternalLink,
  Github,
  Mail,
  Award,
  BookOpen,
  LayoutDashboard,
  ShoppingCart,
  Briefcase
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';
import { EXAMPLES_CATALOG } from '../examples/examples-data';

export const OverviewView: React.FC<{
  onNavigate: (section: string) => void;
}> = ({ onNavigate }) => {
  const { openCommandPalette } = useAura();

  const githubUser = 'mchacondev24';
  const githubRepoUrl = 'https://github.com/mchacondev24/sval-ui';
  const githubProfileUrl = 'https://github.com/mchacondev24';
  const avatarUrl = `https://github.com/${githubUser}.png`;

  return (
    <div className="flex flex-col gap-10 text-left font-sans w-full max-w-6xl mx-auto">
      {/* Hero Section with Creator Spotlight & Metallic Sheen */}
      <div className="relative p-6 sm:p-8 md:p-12 rounded-[var(--aura-radius-xl)] bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] shadow-lg overflow-hidden sval-metallic-card">
        {/* Subtle decorative background motif */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[var(--aura-color-primary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Vision & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center gap-1.5 shadow-2xs">
                <span>🇳🇮</span>
                <span>Framework Nicaragüense</span>
              </span>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--aura-color-accent)]">
                Universal UI & Design System
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                Angular Material Polish
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                v1.0.0-rc.1
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--aura-text-primary)] leading-[1.12]">
              SVAL DESIGN SYSTEM
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[var(--aura-text-secondary)] mt-4 leading-relaxed max-w-2xl">
              Un sistema de diseño y framework nicaragüense de alta precisión construido con 
              <span className="text-[var(--aura-text-primary)] font-semibold"> Minimalismo Nórdico</span>, 
              arquitectura token-first, elevación táctil metálica inspirada en Angular Material, y soporte nativo multi-framework para 
              <span className="font-semibold text-[var(--aura-text-primary)]"> React, Angular & Blazor</span>.
            </p>

            {/* Creator Attribution Badge in Hero with Avatar Photo */}
            <div className="flex items-center gap-3 mt-4 py-1.5 px-3.5 rounded-full bg-[var(--aura-surface-2)] border border-[var(--aura-border-subtle)] text-xs sval-metallic-pill">
              <img 
                src={avatarUrl} 
                alt="Maxwell Chacón" 
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white/40 shadow-xs" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/152914109?v=4';
                }}
              />
              <span className="text-[var(--aura-text-muted)]">Diseñado y construido por</span>
              <a 
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--aura-text-primary)] hover:underline flex items-center gap-1.5"
              >
                <span>Maxwell Chacón</span>
                <span title="Nicaragua">🇳🇮</span>
                <ExternalLink className="w-3 h-3 text-[var(--aura-text-muted)]" />
              </a>
            </div>

            <div className="flex items-center gap-3 mt-8 flex-wrap">
              <AuraButton
                variant="primary"
                size="lg"
                onClick={() => onNavigate('components-catalog')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold shadow-md"
              >
                Explore Components
              </AuraButton>

              <AuraButton
                variant="outline"
                size="lg"
                onClick={() => onNavigate('examples')}
                leftIcon={<Sparkles className="w-4 h-4 text-sky-500" />}
                className="shadow-xs"
              >
                Interactive Examples
              </AuraButton>

              <AuraButton
                variant="ghost"
                size="lg"
                onClick={openCommandPalette}
                leftIcon={<Terminal className="w-4 h-4 text-emerald-500" />}
              >
                Commands (⌘K)
              </AuraButton>
            </div>
          </div>

          {/* Right Column: Featured Creator Spotlight Card with Metallic Styling */}
          <div className="lg:col-span-5 w-full">
            <div className="p-6 rounded-[var(--aura-radius-xl)] bg-[var(--aura-surface-2)]/90 border border-[var(--aura-border-default)] shadow-md flex flex-col gap-4 relative sval-metallic-card">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={avatarUrl}
                    alt="Maxwell Chacón - Creator & Lead Architect"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-[var(--aura-radius-md)] object-cover ring-2 ring-[var(--aura-color-accent)] shadow-md"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/152914109?v=4';
                    }}
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-emerald-500 text-white shadow-xs" title="Author Verified">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--aura-color-accent)] font-bold">
                    Creator & Architect
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--aura-text-primary)] truncate">
                      Maxwell Chacón
                    </h3>
                    <span className="text-base" title="Nicaragua">🇳🇮</span>
                  </div>
                  <p className="text-xs text-[var(--aura-text-secondary)] mt-1 leading-snug">
                    Ingeniero de Software Nicaragüense & Lead Architect.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center gap-1">
                      <span>🇳🇮</span>
                      <span>Nicaragua</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      Framework Nicaragüense
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      WCAG AAA
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sky-500/15 text-sky-600 dark:text-sky-400">
                      Open Source
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[var(--aura-text-secondary)] leading-relaxed border-t border-[var(--aura-border-subtle)] pt-3">
                Arquitectura de componentes universal sin dependencias pesadas, con rigurosa matemática espacial nórdica, elevación metálica Angular Material y sincronización de tokens.
              </p>

              {/* Creator Links & Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] text-[var(--aura-text-primary)] hover:border-[var(--aura-color-accent)] transition-colors shadow-xs"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repo</span>
                </a>

                <a
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-[var(--aura-radius-sm)] bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] hover:opacity-90 transition-opacity shadow-xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Perfil GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Examples Showcase Strip with Rich Photos */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--aura-text-primary)] tracking-tight">
              Featured Application Examples
            </h2>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
              Production-ready enterprise reference apps showcasing real photography, jewel icons, and metallic finishes.
            </p>
          </div>
          <AuraButton
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('examples')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            View All ({EXAMPLES_CATALOG.length})
          </AuraButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EXAMPLES_CATALOG.slice(0, 3).map((ex) => (
            <div
              key={ex.id}
              onClick={() => onNavigate(`example-${ex.id}`)}
              className="rounded-[var(--aura-radius-lg)] overflow-hidden border border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] sval-metallic-card shadow-sm hover:shadow-xl hover:border-[var(--aura-color-accent)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={ex.image}
                    alt={ex.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xs">
                      {ex.badgeText || ex.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold truncate drop-shadow-sm">{ex.name}</span>
                    <span className="text-[10px] font-mono opacity-80">{ex.category.toUpperCase()}</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <p className="text-xs text-[var(--aura-text-secondary)] line-clamp-2 leading-relaxed">
                    {ex.description}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-[var(--aura-border-subtle)] text-xs">
                <span className="text-[11px] font-mono text-[var(--aura-text-muted)]">
                  {ex.componentsUsed.length} components integrated
                </span>
                <span className="text-xs font-bold text-[var(--aura-color-accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Launch App →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Pillars of Sval with Jewel Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-sky-400 to-indigo-600 text-white flex items-center justify-center mb-3.5 shadow-xs">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
              Nordic & Metallic Depth
            </h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 leading-relaxed">
              Tactile elevation inspired by Angular Material, paired with crisp 1px border tension and clean negative space.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--aura-border-subtle)] text-[11px] font-mono text-sky-500 font-semibold">
            Token: --aura-metallic
          </div>
        </div>

        <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center mb-3.5 shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
              Token-First Architecture
            </h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 leading-relaxed">
              3-tier design token model (Primitives → Semantics → Components) allowing full runtime rebranding without altering code.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--aura-border-subtle)] text-[11px] font-mono text-emerald-500 font-semibold">
            DTCG Specification
          </div>
        </div>

        <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-purple-400 to-violet-600 text-white flex items-center justify-center mb-3.5 shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
              SQLite 3 Engine
            </h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 leading-relaxed">
              Zero-latency relational persistence for component configurations, user custom themes, and portfolio telemetry.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--aura-border-subtle)] text-[11px] font-mono text-purple-500 font-semibold">
            WASM Relational DB
          </div>
        </div>

        <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center mb-3.5 shadow-xs">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[var(--aura-text-primary)]">
              Multi-Framework Native
            </h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1.5 leading-relaxed">
              Idiomatic implementations for React 19, Angular 18+ Signals/Standalone directives, and Blazor C# Razor components.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--aura-border-subtle)] text-[11px] font-mono text-amber-500 font-semibold">
            React • Angular • Blazor
          </div>
        </div>
      </div>

      {/* Quick Terminal Installation with Metallic Styling */}
      <div className="p-5 rounded-[var(--aura-radius-lg)] sval-metallic-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[var(--aura-text-primary)] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>Instant Multi-Framework Package Installation</span>
          </h3>
          <AuraButton 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('installation')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Installation Guide
          </AuraButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)]">
            <div className="text-[10px] font-mono text-[var(--aura-text-muted)] uppercase mb-1 font-bold">React 19 / Next.js</div>
            <code className="text-xs font-mono text-[var(--aura-color-accent)] font-semibold select-all block">
              npm i @sval-ui/react
            </code>
          </div>

          <div className="p-3 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)]">
            <div className="text-[10px] font-mono text-[var(--aura-text-muted)] uppercase mb-1 font-bold">Angular 18+ Standalone</div>
            <code className="text-xs font-mono text-rose-500 font-semibold select-all block">
              ng add @sval-ui/angular
            </code>
          </div>

          <div className="p-3 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)]">
            <div className="text-[10px] font-mono text-[var(--aura-text-muted)] uppercase mb-1 font-bold">Blazor .NET Core</div>
            <code className="text-xs font-mono text-purple-500 font-semibold select-all block">
              dotnet add package SvalUI
            </code>
          </div>
        </div>
      </div>

      {/* Production Deployment Callout */}
      <div className="p-6 bg-[var(--aura-surface-2)]/80 border border-[var(--aura-border-default)] rounded-[var(--aura-radius-lg)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 sval-metallic-surface">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--aura-color-accent)]">
              Framework Nicaragüense
            </span>
            <span className="text-xs">🇳🇮</span>
          </div>
          <h4 className="text-base font-bold text-[var(--aura-text-primary)] mt-0.5">
            Listo para Despliegue en Producción
          </h4>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
            Compilación estática optimizada de alto rendimiento y sincronizada con el repositorio Git <span className="font-mono text-[var(--aura-text-primary)] font-bold">mchacondev24/sval-ui</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AuraButton
            variant="primary"
            size="sm"
            onClick={() => onNavigate('deployment')}
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            className="font-bold shadow-xs"
          >
            Guía de Despliegue
          </AuraButton>
        </div>
      </div>
    </div>
  );
};
