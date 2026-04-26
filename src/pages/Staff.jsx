import { useState } from 'react'

const MEMBER = {
  name: 'Marcus',
  tier: 'Gold Member',
  pts: 2450,
}

const CORRECT_CODE = 'CH0001'

const EXISTING_RECORD_DATES = ['Apr 20', 'Apr 10', 'Mar 28']

const STEP_LABELS = ['Scan Member', 'Store Code', 'Table Number', 'Enter Amount']

function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-[#6B7280] mb-4 active:opacity-60 transition-opacity"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[13px] font-medium">Back</span>
    </button>
  )
}

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-300 ${
              n < current
                ? 'bg-[#0f9e82] text-white'
                : n === current
                ? 'bg-[#0f9e82] text-white ring-4 ring-[#0f9e82]/20'
                : 'bg-gray-100 text-[#9CA3AF]'
            }`}
          >
            {n < current ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              n
            )}
          </div>
          {n < 4 && (
            <div
              className={`w-8 h-[2px] rounded-full transition-all duration-300 ${
                n < current ? 'bg-[#0f9e82]' : 'bg-gray-100'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function MemberCard({ name, tier, pts }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-[#0f9e82]/10 flex items-center justify-center flex-shrink-0">
        <span className="text-[#0f9e82] text-lg font-bold">{name[0]}</span>
      </div>
      <div className="flex-1">
        <p className="font-semibold text-[#1A1A1A] text-[15px]">{name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-amber-400 text-[10px]">✦</span>
          <p className="text-[12px] text-[#6B7280]">{tier}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-[#0f9e82] text-[15px]">{pts.toLocaleString()}</p>
        <p className="text-[11px] text-[#6B7280]">pts</p>
      </div>
    </div>
  )
}

export default function Staff() {
  const [step, setStep] = useState(1)
  const [storeCode, setStoreCode] = useState('')
  const [storeError, setStoreError] = useState(false)
  const [tableNumber, setTableNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const pts = Math.max(0, parseInt(amount) || 0)
  const newTotal = MEMBER.pts + pts

  const today = new Date()
  const todayLabel = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const hasDuplicateToday = EXISTING_RECORD_DATES.includes(todayLabel)
  const showDuplicateWarning = pts > 0 && hasDuplicateToday

  const handleVerifyCode = () => {
    if (storeCode.trim().toUpperCase() === CORRECT_CODE) {
      setStoreError(false)
      setStep(3)
    } else {
      setStoreError(true)
    }
  }

  const handleReset = () => {
    setStep(1)
    setStoreCode('')
    setStoreError(false)
    setTableNumber('')
    setAmount('')
    setShowSuccess(false)
  }

  // ── Success screen ──
  if (showSuccess) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAFA]">
        <div className="bg-[#0f9e82] text-white text-center py-3 px-4 fade-in">
          <p className="text-[13px] font-medium">
            +{pts} pts credited · Total: {newTotal.toLocaleString()} pts
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-10 scale-in">
          <div className="w-24 h-24 rounded-full bg-[#0f9e82]/10 flex items-center justify-center mb-6">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M10 24l10 10 18-18" stroke="#0f9e82" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="text-[36px] font-bold text-[#0f9e82] mb-1">+{pts} pts added</p>
          <p className="text-[15px] text-[#6B7280] text-center">
            {MEMBER.name} now has{' '}
            <span className="font-semibold text-[#1A1A1A]">{newTotal.toLocaleString()} pts</span>
          </p>
        </div>

        <div className="px-4 pb-8">
          <button
            className="w-full bg-[#0f9e82] text-white font-semibold py-[15px] rounded-2xl text-[15px] active:opacity-90"
            onClick={handleReset}
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-[#0f9e82] flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">QL</span>
            </div>
            <span className="text-[13px] font-bold text-[#0f9e82]">Staff Portal</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#9CA3AF]">Step {step} / 4</span>
            <p className="text-[12px] font-semibold text-[#1A1A1A]">{STEP_LABELS[step - 1]}</p>
          </div>
        </div>
        <StepIndicator current={step} />
      </div>

      {/* ── Step content ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-8">

        {/* STEP 1 — Member Info */}
        {step === 1 && (
          <div className="fade-in">
            <p className="text-[18px] font-bold text-[#1A1A1A] mb-1">Member Scanned</p>
            <p className="text-[13px] text-[#6B7280] mb-5">
              QR code read successfully. Confirm member below.
            </p>

            <div className="relative mb-4">
              <MemberCard name={MEMBER.name} tier={MEMBER.tier} pts={MEMBER.pts} />
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0f9e82] flex items-center justify-center shadow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="bg-[#0f9e82]/10 rounded-xl px-4 py-3 mb-6">
              <p className="text-[12px] text-[#0f9e82]">✓ Member identity verified via QR code</p>
            </div>

            <button
              className="w-full bg-[#0f9e82] text-white font-semibold py-[15px] rounded-2xl text-[15px] active:opacity-90"
              onClick={() => setStep(2)}
            >
              Confirm Member
            </button>
          </div>
        )}

        {/* STEP 2 — Store Code */}
        {step === 2 && (
          <div className="fade-in">
            <BackButton onBack={() => setStep(1)} />
            <p className="text-[18px] font-bold text-[#1A1A1A] mb-1">Enter Store Code</p>
            <p className="text-[13px] text-[#6B7280] mb-5">
              Enter the 6-digit code for your store location.
            </p>

            <div className="mb-3">
              <input
                type="text"
                value={storeCode}
                onChange={(e) => {
                  setStoreCode(e.target.value)
                  setStoreError(false)
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
                placeholder="e.g. CH0001"
                maxLength={6}
                className={`w-full bg-white rounded-2xl px-4 py-4 text-[15px] text-[#1A1A1A] font-mono tracking-widest border-2 outline-none transition-colors ${
                  storeError
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-gray-100 focus:border-[#0f9e82]'
                }`}
                style={{ textTransform: 'uppercase' }}
                autoFocus
              />
              {storeError && (
                <p className="text-[12px] text-red-500 mt-2 ml-1 fade-in">
                  Invalid store code, please try again
                </p>
              )}
            </div>

            <button
              className="w-full bg-[#0f9e82] text-white font-semibold py-[15px] rounded-2xl text-[15px] active:opacity-90 disabled:opacity-40 mt-3"
              disabled={storeCode.trim().length === 0}
              onClick={handleVerifyCode}
            >
              Verify
            </button>
          </div>
        )}

        {/* STEP 3 — Table Number */}
        {step === 3 && (
          <div className="fade-in">
            <BackButton onBack={() => setStep(2)} />
            <p className="text-[18px] font-bold text-[#1A1A1A] mb-1">Enter Table Number</p>
            <p className="text-[13px] text-[#6B7280] mb-5">
              Which table is this member at?
            </p>

            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && tableNumber.trim() && setStep(4)}
              placeholder="e.g. T-12"
              className="w-full bg-white rounded-2xl px-4 py-4 text-[15px] text-[#1A1A1A] border-2 border-gray-100 focus:border-[#0f9e82] outline-none transition-colors mb-3"
              autoFocus
            />

            <button
              className="w-full bg-[#0f9e82] text-white font-semibold py-[15px] rounded-2xl text-[15px] active:opacity-90 disabled:opacity-40 mt-3"
              disabled={tableNumber.trim().length === 0}
              onClick={() => setStep(4)}
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 4 — Enter Amount */}
        {step === 4 && (
          <div className="fade-in">
            <BackButton onBack={() => setStep(3)} />
            <p className="text-[18px] font-bold text-[#1A1A1A] mb-1">Enter Spending Amount</p>
            <p className="text-[13px] text-[#6B7280] mb-5">
              How much did {MEMBER.name} spend today?
            </p>

            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-[17px] font-medium">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full bg-white rounded-2xl pl-8 pr-4 py-4 text-[20px] font-semibold text-[#1A1A1A] border-2 border-gray-100 focus:border-[#0f9e82] outline-none transition-colors"
                autoFocus
              />
            </div>

            {pts > 0 && (
              <div className="bg-[#0f9e82]/10 rounded-xl px-4 py-3 mb-3 fade-in">
                <p className="text-[14px] text-[#0f9e82] font-medium text-center">
                  ${pts} spent → +{pts} pts
                </p>
              </div>
            )}

            {showDuplicateWarning && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-3 fade-in">
                <p className="text-[13px] text-amber-700">
                  ⚠️ Points already added today. Confirm to proceed?
                </p>
              </div>
            )}

            <div className="bg-white rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-[#1A1A1A]">{MEMBER.name}</p>
                <p className="text-[11px] text-[#6B7280]">Table {tableNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-[#6B7280]">
                  {MEMBER.pts.toLocaleString()} → {pts > 0 ? newTotal.toLocaleString() : '—'}
                </p>
                <p className="text-[11px] text-[#0f9e82]">{pts > 0 ? `+${pts} pts` : 'pts'}</p>
              </div>
            </div>

            <button
              className="w-full bg-[#0f9e82] text-white font-semibold py-[15px] rounded-2xl text-[15px] active:opacity-90 disabled:opacity-40"
              disabled={pts <= 0}
              onClick={() => setShowSuccess(true)}
            >
              Confirm Points
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
