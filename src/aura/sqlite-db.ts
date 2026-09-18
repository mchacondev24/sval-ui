import initSqlJs, { Database } from 'sql.js';

let dbInstance: Database | null = null;
let initPromise: Promise<Database> | null = null;

export interface SQLiteThemeRecord {
  id: string;
  name: string;
  mode: string;
  primary_color: string;
  accent_color: string;
  radius: string;
  density: string;
  created_at: string;
}

export interface SQLiteDeploymentRecord {
  id: number;
  project_name: string;
  target_url: string;
  git_repo: string;
  author: string;
  version: string;
  status: string;
  deployed_at: string;
}

export async function getAuraDatabase(): Promise<Database> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const isNodeEnv = typeof process !== 'undefined' && Boolean(process?.versions?.node);
      let sqlConfig = {};

      if (isNodeEnv) {
        try {
          const path = await import('path');
          const wasmPath = path.resolve(process.cwd(), 'node_modules/sql.js/dist');
          sqlConfig = {
            locateFile: (file: string) => path.join(wasmPath, file),
          };
        } catch {
          sqlConfig = {};
        }
      } else {
        sqlConfig = {
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`,
        };
      }

      const SQL = await initSqlJs(sqlConfig);
      const db = new SQL.Database();

      // Create Tables
      db.run(`
        CREATE TABLE IF NOT EXISTS sval_themes (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          mode TEXT NOT NULL,
          primary_color TEXT NOT NULL,
          accent_color TEXT NOT NULL,
          radius TEXT NOT NULL,
          density TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS sval_deployments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          project_name TEXT NOT NULL,
          target_url TEXT NOT NULL,
          git_repo TEXT NOT NULL,
          author TEXT NOT NULL,
          version TEXT NOT NULL,
          status TEXT NOT NULL,
          deployed_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS sval_components (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          angular_selector TEXT NOT NULL,
          react_export TEXT NOT NULL,
          wcag_compliance TEXT NOT NULL,
          downloads INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS sval_audit_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_type TEXT NOT NULL,
          description TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS aura_themes (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          mode TEXT NOT NULL,
          primary_color TEXT NOT NULL,
          accent_color TEXT NOT NULL,
          radius TEXT NOT NULL,
          density TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS aura_deployments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          project_name TEXT NOT NULL,
          target_url TEXT NOT NULL,
          git_repo TEXT NOT NULL,
          author TEXT NOT NULL,
          version TEXT NOT NULL,
          status TEXT NOT NULL,
          deployed_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS aura_components (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          angular_selector TEXT NOT NULL,
          react_export TEXT NOT NULL,
          wcag_compliance TEXT NOT NULL,
          downloads INTEGER DEFAULT 0
        );
      `);

      // Seed Initial Themes
      db.run(`
        INSERT OR IGNORE INTO sval_themes (id, name, mode, primary_color, accent_color, radius, density)
        VALUES 
          ('nordic-light', 'Nordic Light Stockholm', 'light', '#0f172a', '#0284c7', '8px', 'comfortable'),
          ('nordic-dark', 'Nordic Dark Reykjavik', 'dark', '#f8fafc', '#38bdf8', '8px', 'comfortable'),
          ('fjord-blue', 'Fjord Blue Bergen', 'dark', '#38bdf8', '#0284c7', '10px', 'comfortable'),
          ('forest-pine', 'Forest Pine Helsinki', 'dark', '#4ade80', '#22c55e', '9px', 'comfortable'),
          ('sandstone', 'Sandstone Copenhagen', 'light', '#3a2e21', '#b45309', '8px', 'comfortable');

        INSERT OR IGNORE INTO aura_themes SELECT * FROM sval_themes;
      `);

      // Seed Portfolio Deployment Details for Maxwell Chacón
      db.run(`
        INSERT OR IGNORE INTO sval_deployments (id, project_name, target_url, git_repo, author, version, status)
        VALUES 
          (1, 'Sval UI Design System', 'https://github.com/mchacondev24/sval-ui', 'https://github.com/mchacondev24/sval-ui', 'Maxwell Chacón', '1.0.0-rc.1', 'PROD_READY'),
          (2, 'Sval Angular Directives', 'https://github.com/mchacondev24/sval-angular', 'https://github.com/mchacondev24/sval-angular', 'Maxwell Chacón', '1.0.0-rc.1', 'ACTIVE');

        INSERT OR IGNORE INTO aura_deployments SELECT * FROM sval_deployments;
      `);

      // Seed Core Component Registry
      db.run(`
        INSERT OR IGNORE INTO sval_components (id, name, category, angular_selector, react_export, wcag_compliance, downloads)
        VALUES 
          ('btn', 'Button', 'Primitives', 'sval-button', 'SvalButton', 'AAA', 14200),
          ('inp', 'Input', 'Forms', 'sval-input', 'SvalInput', 'AAA', 12100),
          ('sel', 'Select', 'Forms', 'sval-select', 'SvalSelect', 'AA', 9800),
          ('chk', 'Checkbox', 'Forms', 'sval-checkbox', 'SvalCheckbox', 'AAA', 8500),
          ('swi', 'Switch', 'Forms', 'sval-switch', 'SvalSwitch', 'AAA', 7900),
          ('crd', 'Card', 'Surfaces', 'sval-card', 'SvalCard', 'AAA', 15400),
          ('dlg', 'Dialog Modal', 'Overlays', 'sval-dialog', 'SvalDialog', 'AAA', 6400),
          ('tbl', 'DataTable', 'Data Display', 'sval-data-table', 'SvalDataTable', 'AAA', 11200),
          ('tst', 'Toast Notification', 'Feedback', 'sval-toast', 'SvalToast', 'AAA', 8900),
          ('cmd', 'Command Palette', 'Navigation', 'sval-command', 'SvalCommand', 'AAA', 9300);

        INSERT OR IGNORE INTO aura_components SELECT * FROM sval_components;
      `);

      dbInstance = db;
      return db;
    } catch (err) {
      console.warn('SQLite in-memory fallback enabled:', err);
      throw err;
    }
  })();

  return initPromise;
}

export async function runQuery(sql: string): Promise<{ columns: string[]; values: any[][] }[]> {
  const db = await getAuraDatabase();
  return db.exec(sql);
}

export async function saveThemeToSQLite(theme: {
  id: string;
  name: string;
  mode: string;
  primary_color: string;
  accent_color: string;
  radius: string;
  density: string;
}): Promise<void> {
  const db = await getAuraDatabase();
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO aura_themes (id, name, mode, primary_color, accent_color, radius, density)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run([
    theme.id,
    theme.name,
    theme.mode,
    theme.primary_color,
    theme.accent_color,
    theme.radius,
    theme.density,
  ]);
  stmt.free();
}

export async function getThemesFromSQLite(): Promise<SQLiteThemeRecord[]> {
  const db = await getAuraDatabase();
  const res = db.exec("SELECT * FROM aura_themes ORDER BY created_at DESC");
  if (!res.length) return [];
  const cols = res[0].columns;
  return res[0].values.map(row => {
    const item: any = {};
    cols.forEach((col, idx) => {
      item[col] = row[idx];
    });
    return item as SQLiteThemeRecord;
  });
}

export async function getDeploymentsFromSQLite(): Promise<SQLiteDeploymentRecord[]> {
  const db = await getAuraDatabase();
  const res = db.exec("SELECT * FROM aura_deployments ORDER BY id DESC");
  if (!res.length) return [];
  const cols = res[0].columns;
  return res[0].values.map(row => {
    const item: any = {};
    cols.forEach((col, idx) => {
      item[col] = row[idx];
    });
    return item as SQLiteDeploymentRecord;
  });
}

export async function exportDatabaseBinary(): Promise<Uint8Array> {
  const db = await getAuraDatabase();
  return db.export();
}
