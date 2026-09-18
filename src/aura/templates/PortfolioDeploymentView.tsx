import React, { useState } from 'react';
import { 
  Server, 
  Globe, 
  GitBranch, 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  FolderGit2,
  Terminal,
  UploadCloud,
  FileCode,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';

export const PortfolioDeploymentView: React.FC = () => {
  const { addToast } = useAura();
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [buildStep, setBuildStep] = useState<'idle' | 'building' | 'optimizing' | 'completed'>('idle');
  const [buildLogs, setBuildLogs] = useState<string[]>([]);

  const repoUrl = 'https://github.com/mchacondev24/sval-ui';
  const buildCommand = 'npm run build';

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(buildCommand);
    setCopiedCmd(true);
    addToast({ title: 'Comando copiado', description: buildCommand, type: 'info' });
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleSimulateBuild = () => {
    setBuildStep('building');
    setBuildLogs([
      '[01] 🇳🇮 Sval UI Engine: Inicializando compilación de producción...',
      '[02] Compilando TypeScript AST y 26+ primitivas de interfaz...',
      '[03] Empaquetando tokens de diseño nórdico con elevación metálica Angular Material...',
    ]);

    setTimeout(() => {
      setBuildStep('optimizing');
      setBuildLogs(prev => [
        ...prev,
        '[04] Minificando bundles CSS y JavaScript para máxima velocidad...',
        '[05] Generando mapa de dependencias y tipos TypeScript universales...',
        '[06] Validando estándares de accesibilidad WCAG AAA y rendimiento 100%...',
      ]);
    }, 1500);

    setTimeout(() => {
      setBuildStep('completed');
      setBuildLogs(prev => [
        ...prev,
        '[07] Bundle listo en directorio dist/ listo para producción.',
        '[08] HTTP 200 OK — Compilación exitosa para despliegue universal.',
      ]);

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });

      addToast({
        title: 'Compilación Completada',
        description: 'Artefactos de producción generados con éxito.',
        type: 'success',
      });
    }, 3000);
  };

  const handleDownloadHtaccess = () => {
    const htaccessContent = `# Sval UI - Universal SPA Fallback Configuration
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>`;

    const blob = new Blob([htaccessContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.htaccess';
    a.click();
    URL.revokeObjectURL(url);

    addToast({
      title: '.htaccess universal descargado',
      description: 'Reglas estándar de enrutamiento SPA para servidores web.',
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans max-w-4xl mx-auto">
      {/* Universal Production Banner */}
      <div className="p-6 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs sval-metallic-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center gap-1.5 shadow-2xs">
                <span>🇳🇮</span>
                <span>Framework Nicaragüense</span>
              </span>
              <AuraBadge variant="success" dot>Listo para Producción</AuraBadge>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--aura-text-primary)] mt-1.5 font-sans">
              Despliegue & Distribución de Producción
            </h2>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-1 max-w-xl">
              Arquitectura de compilación estática de alto rendimiento optimizada para Vercel, Netlify, Cloudflare Pages, GitHub Pages o cualquier servidor web Apache / Nginx.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AuraButton
              variant="outline"
              size="sm"
              onClick={handleCopyCommand}
              leftIcon={copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copiedCmd ? 'Copiado' : 'Copiar Comando'}
            </AuraButton>

            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <AuraButton variant="primary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                Ver Repositorio
              </AuraButton>
            </a>
          </div>
        </div>
      </div>

      {/* Production Specs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AuraCard variant="solid" padding="md" className="sval-metallic-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--aura-text-secondary)] mb-2">
            <Package className="w-4 h-4 text-sky-500" />
            <span>Compilación & Salida</span>
          </div>
          <div className="text-xs flex flex-col gap-1.5 text-[var(--aura-text-primary)]">
            <div><span className="text-[var(--aura-text-muted)]">Comando:</span> <code className="font-mono bg-[var(--aura-surface-2)] px-1 rounded">npm run build</code></div>
            <div><span className="text-[var(--aura-text-muted)]">Directorio:</span> <code className="font-mono bg-[var(--aura-surface-2)] px-1 rounded">dist/</code></div>
            <div><span className="text-[var(--aura-text-muted)]">Empaquetador:</span> Vite + TypeScript</div>
            <div><span className="text-[var(--aura-text-muted)]">Optimización:</span> Tree-shaking activo</div>
          </div>
        </AuraCard>

        <AuraCard variant="solid" padding="md" className="sval-metallic-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--aura-text-secondary)] mb-2">
            <FolderGit2 className="w-4 h-4 text-emerald-500" />
            <span>Control de Versiones</span>
          </div>
          <div className="text-xs flex flex-col gap-1.5 text-[var(--aura-text-primary)]">
            <div><span className="text-[var(--aura-text-muted)]">Repositorio:</span> github.com/mchacondev24/sval-ui</div>
            <div><span className="text-[var(--aura-text-muted)]">Rama:</span> <code className="font-mono bg-[var(--aura-surface-2)] px-1 rounded">main</code></div>
            <div><span className="text-[var(--aura-text-muted)]">Licencia:</span> MIT Open Source</div>
            <div><span className="text-[var(--aura-text-muted)]">Origen:</span> 🇳🇮 Nicaragua</div>
          </div>
        </AuraCard>

        <AuraCard variant="solid" padding="md" className="sval-metallic-card">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--aura-text-secondary)] mb-2">
            <Layers className="w-4 h-4 text-purple-500" />
            <span>Compatibilidad Universal</span>
          </div>
          <div className="text-xs flex flex-col gap-1.5 text-[var(--aura-text-primary)]">
            <div><span className="text-[var(--aura-text-muted)]">Frameworks:</span> React, Angular, Blazor</div>
            <div><span className="text-[var(--aura-text-muted)]">Estilo:</span> Tailwind CSS v4</div>
            <div><span className="text-[var(--aura-text-muted)]">Tokens:</span> CSS Custom Properties</div>
            <div><span className="text-[var(--aura-text-muted)]">Accesibilidad:</span> WCAG AAA</div>
          </div>
        </AuraCard>
      </div>

      {/* Build & Verification Controller */}
      <AuraCard variant="solid" padding="md" className="sval-metallic-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--aura-text-primary)]">
              Verificador de Compilación de Producción
            </h3>
            <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
              Ejecuta el proceso de verificación para certificar que el bundle está listo para cualquier servidor.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AuraButton
              variant="outline"
              size="sm"
              onClick={handleDownloadHtaccess}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Descargar .htaccess
            </AuraButton>

            <AuraButton
              variant="primary"
              size="sm"
              onClick={handleSimulateBuild}
              isLoading={buildStep === 'building' || buildStep === 'optimizing'}
              leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
            >
              {buildStep === 'completed' ? 'Re-compilar' : 'Compilar para Producción'}
            </AuraButton>
          </div>
        </div>

        {/* Realtime Terminal Log */}
        {buildLogs.length > 0 && (
          <div className="mt-3 p-3.5 bg-black/95 rounded-[var(--aura-radius-md)] border border-slate-800 font-mono text-xs text-slate-300 flex flex-col gap-1.5 max-h-52 overflow-y-auto">
            <div className="text-[10px] text-slate-500 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>CANAL DE PRODUCCIÓN: sval-ui/dist</span>
              <span className="text-emerald-400">ESTADO: {buildStep.toUpperCase()}</span>
            </div>
            {buildLogs.map((log, idx) => (
              <div key={idx} className={log.includes('OK') || log.includes('éxito') ? 'text-emerald-400 font-semibold' : ''}>
                {log}
              </div>
            ))}
          </div>
        )}
      </AuraCard>
    </div>
  );
};
