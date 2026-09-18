import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Github, 
  ExternalLink, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { useAura } from '../context';

export const ReadmeGeneratorView: React.FC = () => {
  const { addToast } = useAura();
  const [copied, setCopied] = useState(false);

  const readmeMarkdown = `# ❄️ SVAL DESIGN SYSTEM
> **Next-Generation Universal UI & Design System with Nordic Minimalism**
> *🇳🇮 Framework Nicaragüense creado con orgullo por [Maxwell Chacón](https://github.com/mchacondev24) para la comunidad global de código abierto.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0--rc.1-blue.svg)](https://github.com/mchacondev24/sval-ui)
[![WCAG](https://img.shields.io/badge/WCAG-2.2%20AAA-emerald.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Frameworks](https://img.shields.io/badge/Frameworks-React%20%7C%20Angular%20%7C%20Blazor%20%7C%20HTML-violet.svg)](#framework-support)
[![Storage](https://img.shields.io/badge/Database-SQLite%20(WASM)-cyan.svg)](#sqlite-persistence)
[![Country](https://img.shields.io/badge/Made%20in-Nicaragua%20🇳🇮-0067C6.svg)](https://github.com/mchacondev24/sval-ui)

---

## 🌟 Vision & Mission
Sval is an authentic Scandinavian UI platform (*"Sval"* — Norwegian/Swedish for calm, refreshing clarity and serene balance). It is engineered to democratize elite-grade visual aesthetics, extreme optical legibility, and architectural precision for SaaS, ERP, CRM, and modern web applications.

Rooted in **Nordic Minimalism**, Sval eliminates unneeded drop shadows, visual noise, and artificial gimmicks in favor of crisp 1px borders, purposeful white space, and mathematical typography step scales.

> *"The component adapts to the product, not the product to the component."*

---

## 🏛️ System Architecture

\`\`\`
   ┌─────────────────────────────────────────────────────────────┐
   │                     SVAL DESIGN SYSTEM                      │
   └─────────────────────────────────────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
 ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
 │ Primitive     │        │ Semantic      │        │ Component     │
 │ Tokens        │───────►│ Tokens        │───────►│ Tokens        │
 │ (Color, Space)│        │ (Surface, Ink)│        │ (Button, Card)│
 └───────────────┘        └───────────────┘        └───────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
 ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
 │ React (JSX)   │        │ Angular 18+   │        │ Blazor / .NET │
 │ @sval-ui/react│        │ Standalone    │        │ Razor Classes │
 └───────────────┘        └───────────────┘        └───────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │ SQLite Database Layer     │
                    │ In-Memory & Server Sync   │
                    └───────────────────────────┘
\`\`\`

---

## 🚀 Quickstart

### 1. Install via npm / pnpm / yarn
\`\`\`bash
npm install @sval-ui/react @sval-ui/tokens
# or for Angular:
ng add @sval-ui/angular
# or for Blazor / .NET:
dotnet add package SvalUI.Blazor
\`\`\`

### 2. React Example
\`\`\`tsx
import { SvalButton, SvalCard, SvalBadge } from '@sval-ui/react';

export function DashboardWidget() {
  return (
    <SvalCard variant="solid">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">System Metric</h3>
        <SvalBadge variant="success" dot>Live</SvalBadge>
      </div>
      <SvalButton variant="primary" className="mt-4">
        Deploy Cluster
      </SvalButton>
    </SvalCard>
  );
}
\`\`\`

### 3. Angular 18+ Standalone Example
\`\`\`typescript
import { Component } from '@angular/core';
import { SvalButtonDirective, SvalCardComponent } from '@sval-ui/angular';

@Component({
  selector: 'app-metric',
  standalone: true,
  imports: [SvalButtonDirective, SvalCardComponent],
  template: \`
    <sval-card variant="solid">
      <button svalButton="primary" (click)="onDeploy()">Deploy</button>
    </sval-card>
  \`
})
export class MetricComponent {}
\`\`\`

---

## 🗄️ SQLite Integration

Sval includes a native SQLite database schema for persistent token configurations, audit logs, and component manifests:

\`\`\`typescript
import { getSvalDatabase, runQuery } from '@sval-ui/sqlite';

// Run queries directly in browser WASM or Node.js
const result = await runQuery('SELECT * FROM sval_themes WHERE mode = "dark";');
\`\`\`

---

## 🎨 Nordic Color Palettes

* **Nordic Light (Stockholm)**: Clean off-white surface, deep slate contrast.
* **Nordic Dark (Reykjavik)**: Deep obsidian fjord, ultra-subtle 1px boundaries.
* **Fjord Blue (Bergen Deep)**: Maritime cool oceanic tones.
* **Forest Pine (Helsinki)**: Organic conifer evergreen accents.
* **Sandstone (Copenhagen Craft)**: Warm tactile Danish craft minimalism.
* **High Contrast**: WCAG 2.2 AAA black/white mathematical hierarchy.

---

## 🌐 Repositorio & Documentación Oficial
Explora la suite completa de componentes, ejemplos interactivos y tokens en:
👉 **[https://github.com/mchacondev24/sval-ui](https://github.com/mchacondev24/sval-ui)**

---

## 👨‍💻 Autor & Comunidad Open Source
Creado y mantenido con ❤️ desde **Nicaragua 🇳🇮** por **Maxwell Chacón**:
* **GitHub:** [@mchacondev24](https://github.com/mchacondev24)
* **Email:** ing.chacon.maxwell@gmail.com
* **Nacionalidad:** Nicaragüense 🇳🇮

*Licencia: MIT — Libre para proyectos personales y empresariales.*
`;

  const copyReadme = () => {
    navigator.clipboard.writeText(readmeMarkdown);
    setCopied(true);
    addToast({
      title: 'README.md Copied',
      description: 'Full markdown documentation copied to clipboard.',
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReadmeFile = () => {
    const blob = new Blob([readmeMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    addToast({
      title: 'README.md Downloaded',
      description: 'Ready to commit to your GitHub repository root.',
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
            Open Source GitHub Documentation (README.md)
          </h2>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
            Complete specification created by Maxwell Chacón with badges, quickstart, and SQLite guide.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AuraButton
            variant="outline"
            size="sm"
            onClick={downloadReadmeFile}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download .md
          </AuraButton>

          <AuraButton
            variant="primary"
            size="sm"
            onClick={copyReadme}
            leftIcon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied' : 'Copy README.md'}
          </AuraButton>
        </div>
      </div>

      {/* Markdown Preview Container */}
      <AuraCard variant="solid" padding="none">
        <div className="p-3 bg-[var(--aura-surface-2)]/70 border-b border-[var(--aura-border-subtle)] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-mono text-[var(--aura-text-secondary)]">
            <FileText className="w-3.5 h-3.5 text-[var(--aura-color-accent)]" />
            <span>README.md (Open Source Package Root)</span>
          </div>
          <span className="text-[11px] text-[var(--aura-text-muted)] font-mono">MIT License</span>
        </div>

        <div className="p-5 overflow-x-auto max-h-[600px] overflow-y-auto">
          <pre className="text-xs font-mono text-[var(--aura-text-primary)] leading-relaxed whitespace-pre-wrap">
            {readmeMarkdown}
          </pre>
        </div>
      </AuraCard>
    </div>
  );
};
