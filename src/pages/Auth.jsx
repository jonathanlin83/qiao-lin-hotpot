import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ── Icons ──────────────────────────────────────────────────────────────────
function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

// ── Reusable pieces ────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div>
      {label && <p className="text-[11.5px] font-semibold text-[#6B7280] mb-1.5 uppercase tracking-wide">{label}</p>}
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1 leading-snug">{error}</p>}
    </div>
  )
}

const inputBase = (err) =>
  `w-full bg-white rounded-xl px-4 py-3.5 text-[14px] text-[#1A1A1A] placeholder-gray-300 border-2 outline-none transition-colors ${err ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-[#0f9e82]'}`

function PasswordInput({ value, onChange, placeholder, error }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputBase(error)} pr-11`}
      />
      <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
        <EyeIcon open={show} />
      </button>
    </div>
  )
}

function Checkbox({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none">
      <div className="relative flex-shrink-0 mt-0.5">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="sr-only" />
        <div
          className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-all ${checked ? 'bg-[#0f9e82] border-[#0f9e82]' : 'bg-white border-gray-300 hover:border-[#0f9e82]'}`}
        >
          {checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      <div className="text-[12.5px] text-[#6B7280] leading-relaxed">{children}</div>
    </label>
  )
}

// Pinned bottom CTA bar — shared by all forms
function BottomBar({ children }) {
  return (
    <div className="flex-shrink-0 px-5 py-4 bg-[#F8FAFA] border-t border-gray-100">
      {children}
    </div>
  )
}

function PrimaryBtn({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-[#0f9e82] text-white font-semibold py-4 rounded-2xl text-[15px] active:opacity-90 transition-opacity"
    >
      {children}
    </button>
  )
}

// ── Brand header ───────────────────────────────────────────────────────────
function AuthHeader() {
  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-100 px-6 pt-7 pb-5 text-center">
      <div className="h-0.5 w-12 bg-[#0f9e82] rounded-full mx-auto mb-4" />
      <img src="/logo.jpg" alt="Qiao Lin Hotpot" className="h-10 w-auto object-contain mx-auto mb-2" />
      <p className="text-[11px] font-bold tracking-[0.18em] text-[#0f9e82] uppercase">Qiao Lin Hotpot</p>
    </div>
  )
}

// ── Login ──────────────────────────────────────────────────────────────────
function LoginForm({ onSignup, onForgot, onDone }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})

  const clr = (k) => setErrors(p => ({ ...p, [k]: '' }))

  const submit = () => {
    const e = {}
    if (!identifier.trim()) e.identifier = 'Email or phone number is required.'
    if (!password) e.password = 'Password is required.'
    if (Object.keys(e).length) return setErrors(e)
    console.log('[Qiao Lin Auth] Login payload:', { identifier, rememberMe })
    onDone()
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        <p className="text-[22px] font-bold text-[#1A1A1A] mb-1">Welcome back</p>
        <p className="text-[13px] text-[#6B7280] mb-6">Sign in to access your rewards.</p>

        <div className="space-y-4">
          <Field label="Email or Phone" error={errors.identifier}>
            <input
              type="text"
              value={identifier}
              onChange={e => { setIdentifier(e.target.value); clr('identifier') }}
              placeholder="you@email.com or +1 (312) 555-0000"
              className={inputBase(errors.identifier)}
            />
          </Field>

          <Field label="Password" error={errors.password}>
            <PasswordInput
              value={password}
              onChange={e => { setPassword(e.target.value); clr('password') }}
              placeholder="Enter your password"
              error={errors.password}
            />
          </Field>

          <div className="flex items-center justify-between pt-1">
            <Checkbox id="remember" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}>
              <span className="text-[#1A1A1A]">Remember me</span>
            </Checkbox>
            <button type="button" onClick={onForgot} className="text-[12px] text-[#0f9e82] font-semibold flex-shrink-0 ml-4">
              Forgot password?
            </button>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-[13px] text-[#6B7280]">
            New to Qiao Lin Hotpot?{' '}
            <button type="button" onClick={onSignup} className="text-[#0f9e82] font-semibold">
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/* Pinned CTA */}
      <BottomBar>
        <PrimaryBtn onClick={submit}>Log In</PrimaryBtn>
      </BottomBar>
    </div>
  )
}

// ── Sign Up ────────────────────────────────────────────────────────────────
function SignupForm({ onLogin, onDone }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
  const [consent, setConsent] = useState({ terms: false, email: false, sms: false })
  const [errors, setErrors] = useState({})

  const sf = (k) => (e) => { setForm(p => ({ ...p, [k]: e.target.value })); setErrors(p => ({ ...p, [k]: '' })) }
  const sc = (k) => (e) => setConsent(p => ({ ...p, [k]: e.target.checked }))

  const submit = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required.'
    if (!form.lastName.trim()) e.lastName = 'Last name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.phone.trim()) e.phone = 'Phone number is required.'
    if (!form.password) e.password = 'Password is required.'
    else if (form.password.length < 8) e.password = 'Must be at least 8 characters.'
    if (!form.confirm) e.confirm = 'Please confirm your password.'
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    if (!consent.terms) e.terms = 'You must agree to the Terms of Service and Privacy Policy to continue.'
    if (Object.keys(e).length) return setErrors(e)

    const now = new Date().toISOString()
    const payload = {
      firstName: form.firstName, lastName: form.lastName,
      email: form.email, phone: form.phone,
      acceptedTerms: true, acceptedTermsAt: now,
      emailMarketingOptIn: consent.email, emailMarketingOptInAt: consent.email ? now : null,
      smsMarketingOptIn: consent.sms, smsMarketingOptInAt: consent.sms ? now : null,
      termsVersion: '1.0', privacyVersion: '1.0',
    }
    console.log('[Qiao Lin Auth] Signup payload:', payload)
    onDone(form.firstName)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        <p className="text-[22px] font-bold text-[#1A1A1A] mb-1">Create your account</p>
        <p className="text-[13px] text-[#6B7280] mb-6">Earn points and unlock rewards with every visit.</p>

        <div className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" error={errors.firstName}>
              <input value={form.firstName} onChange={sf('firstName')} placeholder="First" className={inputBase(errors.firstName)} />
            </Field>
            <Field label="Last Name" error={errors.lastName}>
              <input value={form.lastName} onChange={sf('lastName')} placeholder="Last" className={inputBase(errors.lastName)} />
            </Field>
          </div>

          <Field label="Email" error={errors.email}>
            <input type="email" value={form.email} onChange={sf('email')} placeholder="you@email.com" className={inputBase(errors.email)} />
          </Field>

          <Field label="Phone Number" error={errors.phone}>
            <input type="tel" value={form.phone} onChange={sf('phone')} placeholder="+1 (312) 555-0000" className={inputBase(errors.phone)} />
          </Field>

          <Field label="Password" error={errors.password}>
            <PasswordInput value={form.password} onChange={sf('password')} placeholder="At least 8 characters" error={errors.password} />
          </Field>

          <Field label="Confirm Password" error={errors.confirm}>
            <PasswordInput value={form.confirm} onChange={sf('confirm')} placeholder="Repeat your password" error={errors.confirm} />
          </Field>

          {/* ── Consent section ── */}
          <div className="pt-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-gray-100" />
              <p className="text-[10.5px] font-bold tracking-widest text-[#9CA3AF] uppercase flex-shrink-0">Agreements</p>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Required: Terms */}
            <div className={`rounded-xl px-4 py-3 mb-2 ${errors.terms ? 'bg-red-50/50 ring-1 ring-red-200' : 'bg-gray-50'}`}>
              <Checkbox id="terms" checked={consent.terms} onChange={sc('terms')}>
                <span>
                  I agree to Qiao Lin Hotpot's{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#0f9e82] font-semibold underline underline-offset-2">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0f9e82] font-semibold underline underline-offset-2">Privacy Policy</a>.{' '}
                  <span className="text-red-500 font-semibold">*</span>
                </span>
              </Checkbox>
              {errors.terms && <p className="text-[11px] text-red-500 mt-1.5 ml-7 leading-snug">{errors.terms}</p>}
            </div>

            {/* Optional marketing — grouped */}
            <div className="bg-gray-50 rounded-xl px-4 pt-3 pb-3">
              <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2.5">Stay updated</p>
              <div className="mb-3">
                <Checkbox id="email-mkt" checked={consent.email} onChange={sc('email')}>
                  Send me email offers and membership updates.{' '}
                  <span className="text-[#9CA3AF]">(Optional)</span>
                </Checkbox>
              </div>
              <div>
                <Checkbox id="sms-mkt" checked={consent.sms} onChange={sc('sms')}>
                  Send me text message offers and membership updates.{' '}
                  <span className="text-[#9CA3AF]">(Optional)</span>
                </Checkbox>
                {consent.sms && (
                  <div className="ml-7 mt-1.5 space-y-1">
                    <p className="text-[10.5px] text-[#9CA3AF] leading-relaxed">
                      By checking the SMS box, I agree to receive promotional text messages from Qiao Lin Hotpot at the phone number provided. Message and data rates may apply. Message frequency may vary. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase.
                    </p>
                    <p className="text-[10.5px] text-[#9CA3AF] leading-relaxed">
                      We do not sell or share your SMS opt-in consent or phone number with third parties for their marketing purposes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Toggle link */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-[13px] text-[#6B7280]">
            Already have an account?{' '}
            <button type="button" onClick={onLogin} className="text-[#0f9e82] font-semibold">
              Log in
            </button>
          </p>
        </div>
      </div>

      {/* Pinned CTA */}
      <BottomBar>
        <PrimaryBtn onClick={submit}>Join Qiao Lin Rewards</PrimaryBtn>
      </BottomBar>
    </div>
  )
}

// ── Forgot Password ────────────────────────────────────────────────────────
function ForgotForm({ onBack }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = () => {
    if (!email.trim()) return setError('Email is required.')
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email.')
    console.log('[Qiao Lin Auth] Password reset requested for:', email)
    setSent(true)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        <button type="button" onClick={onBack} className="flex items-center gap-1 text-[#6B7280] mb-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[13px] font-medium">Back</span>
        </button>

        {!sent ? (
          <>
            <p className="text-[22px] font-bold text-[#1A1A1A] mb-1">Reset your password</p>
            <p className="text-[13px] text-[#6B7280] mb-6">Enter your email and we'll send you a reset link.</p>
            <Field label="Email" error={error}>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="you@email.com"
                className={inputBase(error)}
              />
            </Field>
          </>
        ) : (
          <div className="flex flex-col items-center text-center pt-8">
            <div className="w-16 h-16 rounded-full bg-[#0f9e82]/10 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#0f9e82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22,6 12,13 2,6" stroke="#0f9e82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-[18px] font-bold text-[#1A1A1A] mb-2">Check your inbox</p>
            <p className="text-[13px] text-[#6B7280] mb-6 leading-relaxed">
              We sent a reset link to <span className="font-semibold text-[#1A1A1A]">{email}</span>. It may take a few minutes.
            </p>
            <button type="button" onClick={onBack} className="text-[13px] text-[#0f9e82] font-semibold">
              Back to Log In
            </button>
          </div>
        )}
      </div>

      {/* Pinned CTA — hidden after sent */}
      {!sent && (
        <BottomBar>
          <PrimaryBtn onClick={submit}>Send Reset Link</PrimaryBtn>
        </BottomBar>
      )}
    </div>
  )
}

// ── Welcome state ──────────────────────────────────────────────────────────
function WelcomeState({ firstName, onContinue }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 pb-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#0f9e82]/10 flex items-center justify-center mb-5">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 20l8 8 16-16" stroke="#0f9e82" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-[10.5px] font-bold tracking-[0.18em] text-[#0f9e82] uppercase mb-2">Account Created</p>
        <p className="text-[24px] font-bold text-[#1A1A1A] mb-2 leading-snug">
          Welcome to Qiao Lin Rewards{firstName ? `, ${firstName}` : ''}.
        </p>
        <p className="text-[13px] text-[#6B7280] mb-8 leading-relaxed">
          Your account has been created successfully. Earn points with every visit and unlock exclusive rewards.
        </p>

        <div className="w-full bg-white rounded-2xl shadow-sm px-5 py-4 text-left border border-gray-100">
          <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-1">Your Member ID</p>
          <p className="text-[15px] font-mono font-bold text-[#1A1A1A] tracking-wider">
            QL-{new Date().getFullYear()}-{Math.floor(10000 + Math.random() * 89999)}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-amber-400 text-[10px]">✦</span>
            <p className="text-[12px] text-[#6B7280]">Bronze Member — 0 pts</p>
          </div>
        </div>
      </div>

      <BottomBar>
        <PrimaryBtn onClick={onContinue}>Start Exploring</PrimaryBtn>
      </BottomBar>
    </div>
  )
}

// ── Root Auth page ─────────────────────────────────────────────────────────
export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'signup' | 'forgot' | 'welcome'
  const [welcomeName, setWelcomeName] = useState('')

  const handleSignupDone = (firstName) => {
    setWelcomeName(firstName)
    setMode('welcome')
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFA]">
      <AuthHeader />

      {mode === 'login' && (
        <LoginForm
          onSignup={() => setMode('signup')}
          onForgot={() => setMode('forgot')}
          onDone={() => navigate('/customer')}
        />
      )}
      {mode === 'signup' && (
        <SignupForm
          onLogin={() => setMode('login')}
          onDone={handleSignupDone}
        />
      )}
      {mode === 'forgot' && (
        <ForgotForm onBack={() => setMode('login')} />
      )}
      {mode === 'welcome' && (
        <WelcomeState
          firstName={welcomeName}
          onContinue={() => navigate('/customer')}
        />
      )}
    </div>
  )
}
