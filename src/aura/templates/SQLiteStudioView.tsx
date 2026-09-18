import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Play, 
  Download, 
  Terminal, 
  Check, 
  Copy, 
  Layers, 
  RefreshCw, 
  Code,
  FileSpreadsheet
} from 'lucide-react';
import { AuraCard } from '../components/Card';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { useAura } from '../context';
import { 
  getAuraDatabase, 
  runQuery, 
  getThemesFromSQLite, 
  getDeploymentsFromSQLite, 
  exportDatabaseBinary 
} from '../sqlite-db';

export const SQLiteStudioView: React.FC = () => {
  const { addToast } = useAura();
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM sval_deployments;");
  const [queryResult, setQueryResult] = useState<{ columns: string[]; values: any[][] } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTable, setActiveTable] = useState<'deployments' | 'themes' | 'components' | 'custom'>('deployments');

  const executeSql = async (queryToRun?: string) => {
    const q = queryToRun || sqlQuery;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await runQuery(q);
      if (res && res.length > 0) {
        setQueryResult(res[0]);
      } else {
        setQueryResult({ columns: ['status'], values: [['Query executed successfully with 0 returned rows.']] });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'SQLite execution error');
      setQueryResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    executeSql("SELECT * FROM sval_deployments;");
  }, []);

  const handlePreset = (tableName: string, query: string, tab: any) => {
    setActiveTable(tab);
    setSqlQuery(query);
    executeSql(query);
  };

  const handleDownloadDb = async () => {
    try {
      const bytes = await exportDatabaseBinary();
      const blob = new Blob([bytes], { type: 'application/x-sqlite3' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sval-design-system.sqlite';
      a.click();
      URL.revokeObjectURL(url);
      addToast({
        title: 'SQLite Database Exported',
        description: 'Binary .sqlite file downloaded successfully.',
        type: 'success',
      });
    } catch (e: any) {
      addToast({
        title: 'Export Failed',
        description: e.message,
        type: 'danger',
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[var(--aura-surface-1)] border border-[var(--aura-border-default)] rounded-[var(--aura-radius-xl)] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[var(--aura-text-primary)]">
              Sval SQLite Engine & SQL Studio
            </h2>
            <AuraBadge variant="accent" dot>WebAssembly 1.12</AuraBadge>
          </div>
          <p className="text-xs text-[var(--aura-text-secondary)] mt-1">
            Zero-latency embedded relational storage for design tokens, component manifests, and portfolio deployments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AuraButton
            variant="outline"
            size="sm"
            onClick={handleDownloadDb}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export .sqlite File
          </AuraButton>
        </div>
      </div>

      {/* Quick Table Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => handlePreset('sval_deployments', 'SELECT * FROM sval_deployments;', 'deployments')}
          className={`px-3 py-1.5 text-xs rounded-[var(--aura-radius-sm)] font-medium border transition-all ${activeTable === 'deployments' ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-transparent' : 'bg-[var(--aura-surface-1)] text-[var(--aura-text-secondary)] border-[var(--aura-border-default)] hover:text-[var(--aura-text-primary)]'}`}
        >
          sval_deployments (Portfolio)
        </button>

        <button
          type="button"
          onClick={() => handlePreset('sval_themes', 'SELECT * FROM sval_themes;', 'themes')}
          className={`px-3 py-1.5 text-xs rounded-[var(--aura-radius-sm)] font-medium border transition-all ${activeTable === 'themes' ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-transparent' : 'bg-[var(--aura-surface-1)] text-[var(--aura-text-secondary)] border-[var(--aura-border-default)] hover:text-[var(--aura-text-primary)]'}`}
        >
          sval_themes (Design Tokens)
        </button>

        <button
          type="button"
          onClick={() => handlePreset('sval_components', 'SELECT * FROM sval_components;', 'components')}
          className={`px-3 py-1.5 text-xs rounded-[var(--aura-radius-sm)] font-medium border transition-all ${activeTable === 'components' ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-transparent' : 'bg-[var(--aura-surface-1)] text-[var(--aura-text-secondary)] border-[var(--aura-border-default)] hover:text-[var(--aura-text-primary)]'}`}
        >
          sval_components (Registry)
        </button>
      </div>

      {/* SQL Editor Terminal */}
      <AuraCard variant="solid" padding="none">
        <div className="p-3 bg-[var(--aura-surface-2)]/70 border-b border-[var(--aura-border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--aura-text-secondary)]">
            <Terminal className="w-3.5 h-3.5 text-[var(--aura-color-accent)]" />
            <span>SQLite Terminal Console</span>
          </div>

          <AuraButton
            variant="primary"
            size="sm"
            onClick={() => executeSql()}
            isLoading={isLoading}
            leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
          >
            Execute SQL
          </AuraButton>
        </div>

        <div className="p-4 bg-[var(--aura-surface-1)]">
          <textarea
            value={sqlQuery}
            onChange={e => {
              setSqlQuery(e.target.value);
              setActiveTable('custom');
            }}
            rows={3}
            className="w-full font-mono text-xs bg-[var(--aura-surface-2)] text-[var(--aura-text-primary)] p-3 rounded-[var(--aura-radius-md)] border border-[var(--aura-border-default)] focus:outline-none focus:border-[var(--aura-color-primary)] resize-none"
            placeholder="Write SQLite query here..."
          />
        </div>
      </AuraCard>

      {/* Query Result Grid */}
      {errorMsg ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-[var(--aura-radius-md)] text-xs font-mono">
          SQL Error: {errorMsg}
        </div>
      ) : queryResult ? (
        <AuraCard variant="solid" padding="none">
          <div className="p-3 border-b border-[var(--aura-border-subtle)] flex items-center justify-between text-xs text-[var(--aura-text-muted)]">
            <span>Result: {queryResult.values.length} records</span>
            <span className="font-mono">SQLITE_OK</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-[var(--aura-surface-2)] border-b border-[var(--aura-border-default)] text-[var(--aura-text-secondary)] font-semibold">
                  {queryResult.columns.map(col => (
                    <th key={col} className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--aura-border-subtle)] font-mono text-[11px]">
                {queryResult.values.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--aura-surface-2)]/40 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2 text-[var(--aura-text-primary)] whitespace-nowrap">
                        {cell === null ? (
                          <span className="text-[var(--aura-text-muted)] italic">NULL</span>
                        ) : (
                          String(cell)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AuraCard>
      ) : null}

      {/* Integration Code Snippet */}
      <AuraCard variant="soft" padding="md">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--aura-text-secondary)] mb-2">
          How to connect SQLite with Aura UI in Production
        </h4>
        <p className="text-xs text-[var(--aura-text-secondary)] mb-3">
          Aura UI provides an official schema package that sets up your SQLite database automatically:
        </p>

        <pre className="p-3 bg-black/90 text-emerald-400 font-mono text-xs rounded-[var(--aura-radius-md)] overflow-x-auto">
{`// server.js or backend API
import Database from 'better-sqlite3';
import { auraSqliteSchema } from '@aura-ui/sqlite';

const db = new Database('./aura.db');
db.exec(auraSqliteSchema);

// Query components, themes and telemetry
const activeThemes = db.prepare('SELECT * FROM aura_themes WHERE mode = ?').all('dark');`}
        </pre>
      </AuraCard>
    </div>
  );
};
