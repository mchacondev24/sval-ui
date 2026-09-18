import { describe, it, expect } from 'vitest';
import { 
  getAuraDatabase, 
  runQuery, 
  getThemesFromSQLite, 
  getDeploymentsFromSQLite,
  saveThemeToSQLite 
} from '../sqlite-db';

describe('SQLite 3 Embedded Persistence Integration', () => {
  it('successfully initializes SQLite WASM database with Sval schemas', async () => {
    const db = await getAuraDatabase();
    expect(db).toBeDefined();

    // Verify sval_themes table exists and has rows
    const themeRes = await runQuery('SELECT COUNT(*) as total FROM sval_themes;');
    expect(themeRes.length).toBeGreaterThan(0);
    const count = themeRes[0].values[0][0];
    expect(count).toBeGreaterThanOrEqual(5);
  });

  it('contains Maxwell Chacon production deployment record for SvalUI', async () => {
    const deployments = await getDeploymentsFromSQLite();
    expect(deployments.length).toBeGreaterThan(0);
    
    const svalDeploy = deployments.find(d => d.git_repo === 'https://github.com/mchacondev24/sval-ui');
    expect(svalDeploy).toBeDefined();
    expect(svalDeploy?.author).toBe('Maxwell Chacón');
    expect(svalDeploy?.git_repo).toBe('https://github.com/mchacondev24/sval-ui');
    expect(svalDeploy?.status).toBe('PROD_READY');
  });

  it('can insert and retrieve a custom theme in SQLite', async () => {
    const customTheme = {
      id: 'custom-nordic-test',
      name: 'Custom Nordic Test Polar',
      mode: 'dark',
      primary_color: '#0284c7',
      accent_color: '#38bdf8',
      radius: '10px',
      density: 'compact',
    };

    await saveThemeToSQLite(customTheme);

    const themes = await getThemesFromSQLite();
    const found = themes.find(t => t.id === 'custom-nordic-test');
    expect(found).toBeDefined();
    expect(found?.name).toBe('Custom Nordic Test Polar');
    expect(found?.primary_color).toBe('#0284c7');
  });

  it('can execute complex SQL queries dynamically', async () => {
    const res = await runQuery("SELECT name, wcag_compliance FROM sval_components WHERE wcag_compliance = 'AAA';");
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].columns).toEqual(['name', 'wcag_compliance']);
    expect(res[0].values.length).toBeGreaterThan(5);
  });
});
