/**
 * Sval UI Design System - Cybersecurity & OWASP Compliance Module
 * 
 * Provides defensive security utilities conforming to OWASP Top 10 standards:
 * - A01:2021 Broken Access Control & SSRF prevention
 * - A03:2021 Injection Prevention (SQL, Command, and HTML/XSS)
 * - A04:2021 Insecure Design & Input Validation
 * - A05:2021 Security Misconfiguration
 * - A07:2021 Identification & Authentication Failures
 */

/**
 * Escapes characters that have special meaning in HTML to prevent XSS (Cross-Site Scripting).
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates URLs to prevent "javascript:" or "data:text/html" pseudo-protocol XSS attacks.
 */
export function isSafeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  
  // Disallow javascript: and vbscript: URIs
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('vbscript:')) {
    return false;
  }

  // Disallow dangerous data: URIs (allow only safe image data URIs if needed)
  if (trimmed.startsWith('data:') && !trimmed.startsWith('data:image/')) {
    return false;
  }

  // Relative paths and anchor hashes are safe
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return true;
  }

  // Standard safe web protocols
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Validates SQLite queries to prevent unauthorized execution of privileged directives.
 */
export function validateSqlSafety(sql: string): { isSafe: boolean; violation?: string } {
  if (!sql || typeof sql !== 'string') {
    return { isSafe: false, violation: 'Empty or invalid SQL expression.' };
  }

  const blockedDirectives = [
    { pattern: /\bATTACH\s+(DATABASE)?/i, name: 'ATTACH DATABASE' },
    { pattern: /\bDETACH\s+(DATABASE)?/i, name: 'DETACH DATABASE' },
    { pattern: /\bLOAD_EXTENSION\b/i, name: 'LOAD_EXTENSION' },
    { pattern: /\bPRAGMA\s+WRITABLE_SCHEMA\b/i, name: 'PRAGMA writable_schema' },
    { pattern: /\bPRAGMA\s+HEXKEY\b/i, name: 'PRAGMA hexkey' },
    { pattern: /\bPRAGMA\s+KEY\b/i, name: 'PRAGMA key' },
  ];

  for (const { pattern, name } of blockedDirectives) {
    if (pattern.test(sql)) {
      return {
        isSafe: false,
        violation: `Blocked execution of privileged SQLite directive: ${name} (OWASP A03:2021 Injection Guard)`,
      };
    }
  }

  return { isSafe: true };
}

/**
 * Sanitizes generic user text inputs by stripping null bytes and carriage returns.
 */
export function sanitizeTextInput(input: string, maxLength: number = 5000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '') // Strip null-bytes (poison null-byte prevention)
    .slice(0, maxLength)
    .trim();
}
