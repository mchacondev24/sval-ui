import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from './test-utils';
import { AuraButton } from '../components/Button';
import { AuraBadge } from '../components/Badge';
import { AuraCard } from '../components/Card';
import { AuraInput } from '../components/Input';
import { AuraSwitch } from '../components/Switch';

describe('Aura UI Components Suite', () => {
  describe('AuraButton', () => {
    it('renders button with correct text and default primary variant', () => {
      const { container } = render(<AuraButton>Deploy Cluster</AuraButton>);
      const button = container.querySelector('button');
      expect(button).not.toBeNull();
      expect(button?.textContent).toContain('Deploy Cluster');
      expect(button?.className).toContain('rounded-[var(--aura-radius-md)]');
    });

    it('handles disabled state properly', () => {
      const { container } = render(<AuraButton disabled>Inactive</AuraButton>);
      const button = container.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });

    it('renders loading state with spinner icon and disables button', () => {
      const { container } = render(<AuraButton isLoading>Submitting</AuraButton>);
      const button = container.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
      expect(container.querySelector('.animate-spin')).not.toBeNull();
    });

    it('applies fullWidth style when requested', () => {
      const { container } = render(<AuraButton fullWidth>Wide Action</AuraButton>);
      const button = container.querySelector('button');
      expect(button?.className).toContain('w-full');
    });
  });

  describe('AuraBadge', () => {
    it('renders with correct variant and text', () => {
      const { container } = render(<AuraBadge variant="success">Operational</AuraBadge>);
      const badge = container.querySelector('span');
      expect(badge?.textContent).toContain('Operational');
      expect(badge?.className).toContain('var(--aura-color-success)');
    });

    it('renders pulsing dot when dot prop is enabled', () => {
      const { container } = render(<AuraBadge variant="accent" dot>Live Telemetry</AuraBadge>);
      const dot = container.querySelector('.rounded-full.w-1\\.5');
      expect(dot).not.toBeNull();
    });
  });

  describe('AuraCard', () => {
    it('renders container with border and radius tokens', () => {
      const { container } = render(
        <AuraCard variant="solid" padding="md">
          <p>Card Content</p>
        </AuraCard>
      );
      const card = container.firstElementChild as HTMLElement;
      expect(card).not.toBeNull();
      expect(card?.textContent).toContain('Card Content');
      expect(card?.className).toContain('border');
      expect(card?.className).toContain('rounded-[var(--aura-radius-lg)]');
    });
  });

  describe('AuraInput', () => {
    it('renders input with label and placeholder', () => {
      const { container } = render(
        <AuraInput 
          label="Server Host" 
          placeholder="app.example.com" 
          defaultValue="sval-ui.dev"
        />
      );
      const label = container.querySelector('label');
      const input = container.querySelector('input');
      expect(label?.textContent).toContain('Server Host');
      expect(input?.getAttribute('placeholder')).toBe('app.example.com');
      expect(input?.value).toBe('sval-ui.dev');
    });

    it('displays error message when error prop is provided', () => {
      const { container } = render(
        <AuraInput 
          label="Port" 
          error="Port 3000 is required for reverse proxy" 
        />
      );
      expect(container.textContent).toContain('Port 3000 is required for reverse proxy');
    });
  });

  describe('AuraSwitch', () => {
    it('renders toggle switch with label and description', () => {
      const { container } = render(
        <AuraSwitch 
          label="Dark Mode Token Overrides" 
          description="Enable runtime CSS custom property transformation" 
          checked={true}
          onChange={() => {}}
        />
      );
      expect(container.textContent).toContain('Dark Mode Token Overrides');
      expect(container.textContent).toContain('Enable runtime CSS custom property transformation');
      const switchEl = container.querySelector('[role="switch"]');
      expect(switchEl?.getAttribute('aria-checked')).toBe('true');
    });
  });
});
