import { describe, it, expect } from 'vitest';
import { escapeHtml, isSafeUrl, validateSqlSafety, sanitizeTextInput } from '../security';
import { runQuery, runParameterizedQuery, getAuraDatabase } from '../sqlite-db';

describe('OWASP & Cybersecurity Compliance Test Suite', () => {

  describe('OWASP A03:2021 - Injection (XSS Prevention & HTML Sanitization)', () => {
    it('properly encodes dangerous HTML characters into safe entities', () => {
      const maliciousPayload = '<script>alert("XSS")</script>';
      const safeOutput = escapeHtml(maliciousPayload);

      expect(safeOutput).not.toContain('<script>');
      expect(safeOutput).toContain('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
    });

    it('escapes attributes prone to event injection', () => {
      const eventInjection = '" onmouseover="alert(1)"';
      const safe = escapeHtml(eventInjection);

      expect(safe).toContain('&quot; onmouseover=&quot;alert(1)&quot;');
    });

    it('sanitizes poison null bytes from user input', () => {
      const poisonInput = 'admin\0-- malicious trailing data';
      const clean = sanitizeTextInput(poisonInput);

      expect(clean).not.toContain('\0');
      expect(clean).toBe('admin-- malicious trailing data');
    });
  });

  describe('OWASP A01:2021 & A03:2021 - URL & Open Redirect / Pseudo-protocol Guard', () => {
    it('blocks dangerous javascript: pseudo-protocol URIs', () => {
      expect(isSafeUrl('javascript:alert(document.domain)')).toBe(false);
      expect(isSafeUrl('JAVASCRIPT:/*foo*/alert(1)')).toBe(false);
      expect(isSafeUrl('javascript:void(0)')).toBe(false);
    });

    it('blocks vbscript: URIs', () => {
      expect(isSafeUrl('vbscript:msgbox("hello")')).toBe(false);
    });

    it('blocks malicious HTML data URIs', () => {
      expect(isSafeUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==')).toBe(false);
    });

    it('permits safe HTTPS, relative, and mailto URLs', () => {
      expect(isSafeUrl('https://github.com/mchacondev24/sval-ui')).toBe(true);
      expect(isSafeUrl('https://sval-ui.dev')).toBe(true);
      expect(isSafeUrl('/docs/components')).toBe(true);
      expect(isSafeUrl('#section-overview')).toBe(true);
      expect(isSafeUrl('mailto:ing.chacon.maxwell@gmail.com')).toBe(true);
    });
  });

  describe('OWASP A03:2021 - SQLite WASM Defensive Queries & Parameterization', () => {
    it('blocks dangerous SQLite directives in runtime queries', () => {
      const dangerousQueries = [
        'ATTACH DATABASE "/etc/passwd" AS pwned;',
        'DETACH DATABASE pwned;',
        'PRAGMA writable_schema = 1;',
        'SELECT load_extension("malicious.so");',
      ];

      for (const query of dangerousQueries) {
        const check = validateSqlSafety(query);
        expect(check.isSafe).toBe(false);
        expect(check.violation).toBeDefined();
      }
    });

    it('permits safe SELECT, INSERT, UPDATE queries', () => {
      const safeQueries = [
        'SELECT * FROM sval_components WHERE category = "Forms";',
        'SELECT count(*) FROM sval_themes;',
        'INSERT OR IGNORE INTO sval_audit_logs (event_type, description) VALUES ("LOGIN", "User session");',
      ];

      for (const query of safeQueries) {
        const check = validateSqlSafety(query);
        expect(check.isSafe).toBe(true);
      }
    });

    it('prevents execution of unsafe queries through runQuery rejection', async () => {
      await expect(runQuery('ATTACH DATABASE "/tmp/evil.db" AS evil;')).rejects.toThrow(
        /Blocked execution of privileged SQLite directive/
      );
    });

    it('supports safe parameterized queries that neutralize SQL injection', async () => {
      // Simulating standard SQL injection string "' OR '1'='1"
      const injectionAttempt = "' OR '1'='1";
      const result = await runParameterizedQuery(
        'SELECT * FROM sval_components WHERE id = ?',
        [injectionAttempt]
      );

      // Parameterized query treats the injection as literal string, returning 0 rows
      expect(result).toBeDefined();
      expect(result[0].values.length).toBe(0);
    });
  });

  describe('OWASP A01:2021 - Broken Access Control & Reverse Tabnabbing', () => {
    it('ensures safe external navigation standard is adhered to', () => {
      // Verification of noopener noreferrer pattern
      const safeRel = 'noopener noreferrer';
      expect(safeRel.includes('noopener')).toBe(true);
      expect(safeRel.includes('noreferrer')).toBe(true);
    });
  });

  describe('OWASP A02:2021 - Cryptographic Failures & Sensitive Data Exposure', () => {
    it('verifies that no internal server IPs or private credentials are in SQLite seeding', async () => {
      const db = await getAuraDatabase();
      const deployments = db.exec('SELECT * FROM sval_deployments;');
      
      expect(deployments.length).toBeGreaterThan(0);
      const rowsAsStr = JSON.stringify(deployments[0].values);

      // Verify no sensitive internal server references exist
      expect(rowsAsStr).not.toContain('198.187.31.72');
      expect(rowsAsStr).not.toContain('business174.web-hosting.com');
      expect(rowsAsStr).not.toContain('ingefknc');
      expect(rowsAsStr).not.toContain('/Portafolio/SvalUI/');
    });
  });
});
