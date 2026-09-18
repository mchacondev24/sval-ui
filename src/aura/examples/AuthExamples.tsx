import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  User,
  RefreshCw,
  Fingerprint,
  Sparkles,
  Shield
} from 'lucide-react';
import { AuraButton } from '../components/Button';
import { AuraCard } from '../components/Card';
import { AuraInput } from '../components/Input';
import { AuraCheckbox } from '../components/Checkbox';
import { AuraBadge } from '../components/Badge';
import { AuraAvatar } from '../components/Avatar';
import { useAura } from '../context';

export const AuthExamples: React.FC = () => {
  const { addToast } = useAura();
  const [authView, setAuthView] = useState<'signin' | 'signup' | 'forgot' | 'lock'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('maxwell@sval-ui.dev');
  const [password, setPassword] = useState('••••••••••••');
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast({
        title: authView === 'signin' ? 'Session Authenticated' : authView === 'signup' ? 'Account Provisioned' : 'Recovery Instructions Sent',
        description: `Handshake successful for ${email}`,
        type: 'success',
      });
    }, 700);
  };

  return (
    <div className="w-full bg-[var(--aura-bg)] text-[var(--aura-text-primary)] rounded-[var(--aura-radius-lg)] border border-[var(--aura-border-default)] overflow-hidden flex flex-col font-sans sval-metallic-card shadow-lg">
      {/* View Switcher Top Bar with Metallic Surface */}
      <div className="p-3.5 bg-[var(--aura-surface-1)] border-b border-[var(--aura-border-default)] flex items-center justify-between gap-2 overflow-x-auto sval-metallic-surface">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'signin', label: 'Sign In' },
            { id: 'signup', label: 'Create Account' },
            { id: 'forgot', label: 'Forgot Password' },
            { id: 'lock', label: 'Lock Screen' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAuthView(tab.id as any)}
              className={`
                px-3.5 py-1.5 rounded-[var(--aura-radius-sm)] text-xs font-semibold transition-all shrink-0 border
                ${authView === tab.id
                  ? 'bg-[var(--aura-color-primary)] text-[var(--aura-color-primary-foreground)] border-transparent shadow-xs sval-metallic-pill'
                  : 'text-[var(--aura-text-secondary)] border-transparent hover:bg-[var(--aura-surface-2)]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Fingerprint className="w-3 h-3" />
            FIDO2 / WebAuthn
          </span>
        </div>
      </div>

      {/* Main Split Authentication Canvas */}
      <div className="p-6 sm:p-10 flex items-center justify-center min-h-[580px]">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-[var(--aura-radius-xl)] border border-[var(--aura-border-default)] overflow-hidden sval-metallic-card shadow-2xl">
          {/* Left Hero Pane: Rich Photography & Security Metrics */}
          <div className="relative hidden md:flex flex-col justify-between p-8 bg-slate-950 text-white overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
              alt="Biometric Security Vault"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <div className="relative z-10 flex flex-col gap-2">
              <div className="w-10 h-10 rounded-[var(--aura-radius-md)] bg-gradient-to-br from-indigo-500 to-sky-600 flex items-center justify-center font-bold text-sm shadow-md border border-white/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 mt-2">
                Enterprise Zero-Trust IAM
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
                Cryptographic authentication designed with Scandinavian security rigor.
              </h3>
            </div>

            <div className="relative z-10 flex flex-col gap-3 pt-6 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hardware token & biometric passkeys</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Single sign-on via SAML 2.0 & Okta</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SOC 2 Type II & GDPR compliant storage</span>
              </div>
            </div>
          </div>

          {/* Right Form Pane */}
          <div className="p-6 sm:p-8 bg-[var(--aura-surface-1)] flex flex-col justify-center">
            {/* SIGN IN VIEW */}
            {authView === 'signin' && (
              <div>
                <div className="text-left mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--aura-color-accent)] font-semibold">
                    Portal Access
                  </span>
                  <h3 className="text-xl font-extrabold tracking-tight text-[var(--aura-text-primary)] mt-1">
                    Welcome to Sval
                  </h3>
                  <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                    Sign in with your enterprise credentials
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <AuraInput
                    label="Work Email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-4 h-4 text-sky-500" />}
                    placeholder="name@company.com"
                    required
                  />

                  <div className="relative">
                    <AuraInput
                      label="Master Password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      leftIcon={<Lock className="w-4 h-4 text-indigo-500" />}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <AuraCheckbox
                      label="Remember session for 30 days"
                      checked={remember}
                      onChange={setRemember}
                    />
                    <button
                      type="button"
                      onClick={() => setAuthView('forgot')}
                      className="text-[var(--aura-color-accent)] font-semibold hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <AuraButton 
                    variant="primary" 
                    size="md" 
                    type="submit" 
                    fullWidth 
                    isLoading={isLoading}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="mt-2 font-bold shadow-md"
                  >
                    Authenticate Securely
                  </AuraButton>
                </form>

                <div className="mt-6 pt-4 border-t border-[var(--aura-border-subtle)] text-center text-xs text-[var(--aura-text-secondary)]">
                  Don't have an enterprise seat?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthView('signup')}
                    className="text-[var(--aura-color-accent)] font-bold hover:underline"
                  >
                    Request access
                  </button>
                </div>
              </div>
            )}

            {/* SIGN UP VIEW */}
            {authView === 'signup' && (
              <div>
                <div className="text-left mb-6">
                  <h3 className="text-xl font-extrabold tracking-tight text-[var(--aura-text-primary)]">
                    Create Workspace
                  </h3>
                  <p className="text-xs text-[var(--aura-text-secondary)] mt-0.5">
                    Start your 14-day full platform evaluation
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <AuraInput
                    label="Full Name"
                    leftIcon={<User className="w-4 h-4 text-emerald-500" />}
                    placeholder="Astrid Lindgren"
                    required
                  />

                  <AuraInput
                    label="Work Email"
                    type="email"
                    leftIcon={<Mail className="w-4 h-4 text-sky-500" />}
                    placeholder="astrid@company.se"
                    required
                  />

                  <AuraInput
                    label="Create Secure Password"
                    type="password"
                    leftIcon={<Lock className="w-4 h-4 text-indigo-500" />}
                    hint="Minimum 10 characters with numbers & symbols"
                    required
                  />

                  <AuraCheckbox
                    label="I accept Sval Open Source Terms & Privacy Policy"
                    checked={remember}
                    onChange={setRemember}
                  />

                  <AuraButton 
                    variant="primary" 
                    size="md" 
                    type="submit" 
                    fullWidth 
                    isLoading={isLoading}
                    className="mt-2 font-bold shadow-md"
                  >
                    Provision Free Account
                  </AuraButton>
                </form>

                <div className="mt-6 pt-4 border-t border-[var(--aura-border-subtle)] text-center text-xs text-[var(--aura-text-secondary)]">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthView('signin')}
                    className="text-[var(--aura-color-accent)] font-bold hover:underline"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}

            {/* FORGOT PASSWORD VIEW */}
            {authView === 'forgot' && (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white mx-auto flex items-center justify-center mb-3 shadow-md">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--aura-text-primary)]">
                  Reset Password
                </h3>
                <p className="text-xs text-[var(--aura-text-secondary)] mt-1 mb-5">
                  Enter your email and we'll send a cryptographic one-time recovery token.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <AuraInput
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />

                  <AuraButton variant="primary" size="md" type="submit" fullWidth isLoading={isLoading} className="font-bold shadow-md">
                    Send Recovery Link
                  </AuraButton>
                  
                  <button
                    type="button"
                    onClick={() => setAuthView('signin')}
                    className="text-xs text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)] mt-2 font-medium"
                  >
                    Back to sign in
                  </button>
                </form>
              </div>
            )}

            {/* LOCK SCREEN VIEW */}
            {authView === 'lock' && (
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <img
                    src="https://avatars.githubusercontent.com/u/152914109?v=4"
                    alt="Maxwell Chacón"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[var(--aura-color-primary)] mx-auto shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 p-1 bg-amber-500 rounded-full text-slate-950">
                    <Lock className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--aura-text-primary)]">
                  Maxwell Chacón
                </h3>
                <p className="text-xs text-[var(--aura-text-muted)] mt-0.5 mb-5 font-mono">
                  maxwell@sval-ui.dev
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <AuraInput
                    type="password"
                    placeholder="Enter PIN or PIN passphrase"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />

                  <AuraButton variant="primary" size="md" type="submit" fullWidth isLoading={isLoading} className="font-bold shadow-md">
                    Unlock Session
                  </AuraButton>

                  <button
                    type="button"
                    onClick={() => setAuthView('signin')}
                    className="text-xs text-[var(--aura-text-muted)] hover:text-[var(--aura-text-primary)] mt-2 font-medium"
                  >
                    Switch Account
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
