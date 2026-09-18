import React, { useState } from 'react';
import { 
  Layers, 
  Palette, 
  Database, 
  FileText, 
  ExternalLink, 
  Terminal, 
  Sun, 
  Moon, 
  Github, 
  Globe, 
  Sparkles,
  Search,
  BookOpen,
  LayoutGrid,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AuraProvider, useAura } from './aura/context';
import { AuraButton } from './aura/components/Button';
import { AuraBadge } from './aura/components/Badge';
import { AuraToastContainer } from './aura/components/Toast';
import { AuraCommandPalette } from './aura/components/CommandPalette';

// Section Views
import { OverviewView } from './aura/templates/OverviewView';
import { ComponentGalleryView } from './aura/templates/ComponentGalleryView';
import { ThemeStudioView } from './aura/templates/ThemeStudioView';
import { SaaSDashboardTemplate } from './aura/templates/SaaSDashboardTemplate';
import { ECommerceGridTemplate } from './aura/templates/ECommerceGridTemplate';
import { SettingsProfileTemplate } from './aura/templates/SettingsProfileTemplate';
import { SQLiteStudioView } from './aura/templates/SQLiteStudioView';
import { PortfolioDeploymentView } from './aura/templates/PortfolioDeploymentView';
import { ReadmeGeneratorView } from './aura/templates/ReadmeGeneratorView';

// Interactive Documentation System
import { DocsSidebar } from './aura/docs/DocsSidebar';
import { FoundationsView } from './aura/docs/FoundationsView';
import { GettingStartedView } from './aura/docs/GettingStartedView';
import { FormsView } from './aura/docs/FormsView';
import { AccessibilityView } from './aura/docs/AccessibilityView';
import { ComponentsDocView } from './aura/docs/ComponentsDocView';
import { ComponentCatalogView } from './aura/docs/ComponentCatalogView';
import { CheatsheetView } from './aura/docs/CheatsheetView';

// Examples Gallery & Interactive Views
import { ExamplesGalleryView } from './aura/examples/ExamplesGalleryView';
import { ExampleViewer } from './aura/examples/ExampleViewer';
import { EXAMPLES_CATALOG } from './aura/examples/examples-data';

function AppShell() {
  const { 
    theme, 
    themePreset, 
    setThemePreset, 
    openCommandPalette, 
    addToast 
  } = useAura();

  const [activeSection, setActiveSection] = useState<string>('overview');
  const [templateSubTab, setTemplateSubTab] = useState<'saas' | 'ecommerce' | 'settings'>('saas');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const githubUser = 'mchacondev24';
  const githubRepoUrl = 'https://github.com/mchacondev24/sval-ui';
  const githubProfileUrl = 'https://github.com/mchacondev24';
  const avatarUrl = `https://github.com/${githubUser}.png`;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'components-catalog', label: 'Components', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'cmp-button', label: 'Docs', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'examples', label: 'Examples', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'foundations-colors', label: 'Foundations', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'theme-studio', label: 'Themes', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'templates', label: 'Templates', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'sqlite-studio', label: 'SQLite Studio', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'deployment', label: 'Deploy & Git', icon: <ExternalLink className="w-3.5 h-3.5" /> },
  ];

  // Accurate hierarchical active nav check
  const isNavActive = (itemId: string): boolean => {
    if (activeSection === itemId) return true;
    if (itemId === 'overview' && activeSection === 'overview') return true;
    if (itemId === 'components-catalog' && (
      activeSection === 'components-catalog' || 
      activeSection === 'components-cheatsheet' || 
      activeSection === 'components'
    )) return true;
    if (itemId === 'cmp-button' && (
      activeSection.startsWith('cmp-') || 
      activeSection === 'installation' || 
      activeSection === 'quick-start' || 
      activeSection === 'forms-showcase' || 
      activeSection === 'accessibility'
    )) return true;
    if (itemId === 'examples' && (
      activeSection === 'examples' || 
      activeSection.startsWith('example-')
    )) return true;
    if (itemId === 'foundations-colors' && activeSection.startsWith('foundations-')) return true;
    if (itemId === 'theme-studio' && activeSection === 'theme-studio') return true;
    if (itemId === 'templates' && (
      activeSection === 'templates' || 
      activeSection.startsWith('template-')
    )) return true;
    if (itemId === 'sqlite-studio' && activeSection === 'sqlite-studio') return true;
    if (itemId === 'deployment' && (
      activeSection === 'deployment' || 
      activeSection === 'readme'
    )) return true;
    return false;
  };

  const toggleThemeMode = () => {
    if (theme.mode === 'light') {
      setThemePreset('nordic-dark');
      addToast({ title: 'Theme Switched', description: 'Activated Nordic Dark (Reykjavik)', type: 'info' });
    } else {
      setThemePreset('nordic-light');
      addToast({ title: 'Theme Switched', description: 'Activated Nordic Light (Stockholm)', type: 'info' });
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[var(--aura-bg)] text-[var(--aura-text-primary)] transition-colors duration-200">
      {/* Universal Command Palette */}
      <AuraCommandPalette onNavigateToSection={(sec) => setActiveSection(sec as any)} />

      {/* Global Toast Manager */}
      <AuraToastContainer />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[var(--aura-surface-1)]/95 backdrop-blur-md border-b border-[var(--aura-border-default)] shadow-2xs">
        <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Logo & Author Credit */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveSection('overview')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              {/* Geometric Nordic Minimalist Emblem */}
              <div className="w-8 h-8 rounded-[var(--aura-radius-sm)] bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] flex items-center justify-center font-bold tracking-tighter text-sm shadow-xs transition-transform group-hover:scale-105">
                SV
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base tracking-tight font-sans">SVAL</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--aura-surface-2)] text-[var(--aura-text-secondary)] border border-[var(--aura-border-subtle)]">
                    UIX
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30" title="Framework Nicaragüense">
                    <span>🇳🇮</span>
                    <span>Nicaragua</span>
                  </span>
                </div>
                <span className="text-[10px] text-[var(--aura-text-muted)] font-medium leading-none flex items-center gap-1">
                  <span>por Maxwell Chacón</span>
                  <span>🇳🇮</span>
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map(item => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id as any)}
                  className={`
                    px-2.5 xl:px-3 py-1.5 rounded-[var(--aura-radius-sm)] text-xs font-medium transition-all flex items-center gap-1.5 shrink-0
                    ${active
                      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold shadow-xs'
                      : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-2)]'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={openCommandPalette}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--aura-radius-sm)] bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] text-xs text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)] transition-colors shadow-2xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Search docs...</span>
              <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-[var(--aura-surface-1)] border border-[var(--aura-border-subtle)]">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleThemeMode}
              aria-label="Toggle theme mode"
              className="p-2 rounded-[var(--aura-radius-sm)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-2)] transition-colors"
            >
              {theme.mode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Author Avatar Pill with Photo */}
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[var(--aura-surface-2)] border border-[var(--aura-border-default)] hover:border-[var(--aura-color-primary)] transition-all group"
              title="Maxwell Chacón (GitHub Profile)"
            >
              <img
                src={avatarUrl}
                alt="Maxwell Chacón"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-[var(--aura-border-default)]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/100000';
                }}
              />
              <span className="text-[11px] font-medium text-[var(--aura-text-secondary)] group-hover:text-[var(--aura-text-primary)] hidden md:inline-flex items-center gap-1">
                <span>Maxwell Chacón</span>
                <span>🇳🇮</span>
              </span>
            </a>

            {/* GitHub Repo Link */}
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-2 rounded-[var(--aura-radius-sm)] text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] hover:bg-[var(--aura-surface-2)] transition-colors"
              title="GitHub Repository: mchacondev24/sval-ui"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Target Live Demo Link */}
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center"
            >
              <AuraButton variant="outline" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                <span>v1.0.0-rc.1</span>
              </AuraButton>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)] rounded-[var(--aura-radius-sm)] hover:bg-[var(--aura-surface-2)]"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)] flex flex-col gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navItems.map(item => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveSection(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--aura-radius-sm)] text-xs font-medium text-left
                    ${active
                      ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] font-semibold'
                      : 'text-[var(--aura-text-secondary)] hover:bg-[var(--aura-surface-2)]'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Viewport - 100% Desktop Responsive */}
      <main className="flex-1 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all">
        {activeSection === 'overview' && (
          <OverviewView onNavigate={(sec) => setActiveSection(sec)} />
        )}

        {/* Examples Gallery */}
        {activeSection === 'examples' && (
          <ExamplesGalleryView onNavigateToComponent={(sec) => setActiveSection(sec)} />
        )}

        {/* Individual Example Direct Viewer */}
        {activeSection.startsWith('example-') && (() => {
          const rawId = activeSection.replace('example-', '');
          const found = EXAMPLES_CATALOG.find(e => 
            e.id === rawId || 
            e.id === `app-${rawId}` || 
            e.id === `${rawId}-basic` ||
            e.id === `${rawId}-landing` ||
            e.id === `${rawId}-pricing` ||
            e.id === `${rawId}-wizard` ||
            e.id === `${rawId}-suite` ||
            (rawId === 'forms' && e.id === 'forms-wizard') ||
            (rawId === 'dashboard' && e.id === 'dashboard-basic') ||
            (rawId === 'marketing' && e.id === 'marketing-landing') ||
            (rawId === 'auth' && e.id === 'auth-suite') ||
            (rawId === 'crm' && e.id === 'app-crm') ||
            (rawId === 'pos' && e.id === 'app-pos') ||
            (rawId === 'admin' && e.id === 'app-admin')
          ) || EXAMPLES_CATALOG[0];

          return (
            <ExampleViewer
              example={found}
              onBack={() => setActiveSection('examples')}
              onNavigateToComponent={(sec) => setActiveSection(sec)}
            />
          );
        })()}

        {/* Component Catalog Grid */}
        {(activeSection === 'components-catalog' || activeSection === 'components') && (
          <ComponentCatalogView
            onSelectComponent={(sec) => setActiveSection(sec)}
            onNavigateToCheatsheet={() => setActiveSection('components-cheatsheet')}
          />
        )}

        {/* Cheatsheet / Kitchen Sink */}
        {activeSection === 'components-cheatsheet' && (
          <CheatsheetView />
        )}

        {/* Documentation Sections with Sticky Left Sidebar */}
        {(activeSection.startsWith('cmp-') || 
          activeSection.startsWith('foundations-') || 
          activeSection === 'installation' || 
          activeSection === 'quick-start' || 
          activeSection === 'forms-showcase' || 
          activeSection === 'accessibility') && (
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            <DocsSidebar
              currentSection={activeSection}
              onSelectSection={(sec) => setActiveSection(sec)}
              onOpenCommandPalette={openCommandPalette}
              className="sticky top-20 w-full lg:w-64 xl:w-72 shrink-0"
            />
            <div className="flex-1 w-full min-w-0">
              {activeSection.startsWith('cmp-') && <ComponentsDocView componentId={activeSection} />}
              {activeSection.startsWith('foundations-') && (
                <FoundationsView initialTab={activeSection.replace('foundations-', '')} />
              )}
              {(activeSection === 'installation' || activeSection === 'quick-start') && (
                <GettingStartedView defaultTab={activeSection === 'quick-start' ? 'quickstart' : 'installation'} />
              )}
              {activeSection === 'forms-showcase' && <FormsView />}
              {activeSection === 'accessibility' && <AccessibilityView />}
            </div>
          </div>
        )}

        {activeSection === 'theme-studio' && (
          <ThemeStudioView />
        )}

        {/* Templates Suite (Fixed router for template-saas, template-ecommerce, template-settings, template-login) */}
        {(activeSection === 'templates' || activeSection.startsWith('template-')) && (() => {
          const currentTab = activeSection === 'template-ecommerce'
            ? 'ecommerce'
            : activeSection === 'template-settings' || activeSection === 'template-login'
            ? 'settings'
            : templateSubTab;

          return (
            <div className="flex flex-col gap-6 w-full">
              {/* Template Sub-Tab Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[var(--aura-border-default)]">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
                    Ready-to-use Enterprise Templates
                  </h2>
                  <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                    Full screen layouts built exclusively with Sval Design System components.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-[var(--aura-surface-2)] rounded-[var(--aura-radius-md)] border border-[var(--aura-border-subtle)] self-start sm:self-auto">
                  {(['saas', 'ecommerce', 'settings'] as const).map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setTemplateSubTab(tab);
                        setActiveSection(`template-${tab}`);
                      }}
                      className={`
                        px-3 py-1.5 text-xs font-medium rounded-[var(--aura-radius-sm)] transition-all capitalize
                        ${currentTab === tab
                          ? 'bg-[var(--aura-surface-1)] text-[var(--aura-text-primary)] font-semibold shadow-xs'
                          : 'text-[var(--aura-text-secondary)] hover:text-[var(--aura-text-primary)]'
                        }
                      `}
                    >
                      {tab === 'saas' ? 'SaaS Operations' : tab === 'ecommerce' ? 'Nordic Catalog' : 'Account & Config'}
                    </button>
                  ))}
                </div>
              </div>

              {currentTab === 'saas' && <SaaSDashboardTemplate />}
              {currentTab === 'ecommerce' && <ECommerceGridTemplate />}
              {currentTab === 'settings' && <SettingsProfileTemplate />}
            </div>
          );
        })()}

        {activeSection === 'sqlite-studio' && (
          <SQLiteStudioView />
        )}

        {activeSection === 'deployment' && (
          <PortfolioDeploymentView />
        )}

        {activeSection === 'readme' && (
          <ReadmeGeneratorView />
        )}
      </main>

      {/* Global Footer with Author Info */}
      <footer className="mt-auto border-t border-[var(--aura-border-default)] bg-[var(--aura-surface-1)] py-8">
        <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--aura-text-secondary)]">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt="Maxwell Chacón"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-[var(--aura-border-default)]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/100000';
              }}
            />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--aura-text-primary)]">SVAL DESIGN SYSTEM</span>
              <span>—</span>
              <span>
                Architected by{' '}
                <a 
                  href={githubProfileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-[var(--aura-text-primary)] hover:underline"
                >
                  Maxwell Chacón
                </a>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--aura-text-muted)]">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              WCAG 2.2 AAA
            </span>
            <span>•</span>
            <a 
              href={githubRepoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[var(--aura-text-primary)] flex items-center gap-1"
            >
              <Github className="w-3 h-3" />
              <span>mchacondev24/sval-ui</span>
            </a>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium text-[var(--aura-text-primary)]">
              <span>Framework Nicaragüense</span>
              <span>🇳🇮</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuraProvider>
      <AppShell />
    </AuraProvider>
  );
}
