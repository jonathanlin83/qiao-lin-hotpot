import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CURRENT_PTS = 2450
const DIAMOND_AT = 4450

const rewards = [
  { name: 'Free Drink',    nameZh: '免费饮料',    pts: 500,   icon: '🧋' },
  { name: '10% Off',       nameZh: '九折优惠',    pts: 800,   icon: '🏷️' },
  { name: 'Free Dessert',  nameZh: '免费甜点',    pts: 800,   icon: '🍮' },
  { name: '1M Sliced Beef',nameZh: '1人份牛肉卷', pts: 3000,  icon: '🥩' },
  { name: 'Free Combo',    nameZh: '免费套餐',    pts: 3000,  icon: '🍲' },
  { name: '40% Off',       nameZh: '六折优惠',    pts: 10000, icon: '🎁' },
]

const records = [
  { date: 'Apr 20', store: 'Chicago Downtown',  storeZh: '芝加哥市区店',   amount: '$65.00', pts: '+65 pts' },
  { date: 'Apr 10', store: 'Chicago Chinatown', storeZh: '芝加哥唐人街店', amount: '$85.00', pts: '+85 pts' },
  { date: 'Mar 28', store: 'Atlanta',           storeZh: '亚特兰大店',     amount: '$95.00', pts: '+95 pts' },
]


function QiaoLinLogo() {
  return (
    <img
      src="/logo.jpg"
      alt="Qiao Lin Hotpot"
      className="h-9 w-auto object-contain"
    />
  )
}

function QRCodeSVG({ size = 180 }) {
  const N = 21
  const cell = size / N

  const finderCell = (r, c) => {
    if (r === 0 || r === 6 || c === 0 || c === 6) return true
    if (r === 1 || r === 5 || c === 1 || c === 5) return false
    return true
  }

  const getCell = (r, c) => {
    if (r <= 6 && c <= 6) return finderCell(r, c)
    if (r <= 6 && c >= 14) return finderCell(r, c - 14)
    if (r >= 14 && c <= 6) return finderCell(r - 14, c)
    if (r === 7 && c <= 7) return false
    if (r === 7 && c >= 13) return false
    if (r === 13 && c <= 7) return false
    if (c === 7 && r <= 7) return false
    if (c === 7 && r >= 13) return false
    if (c === 13 && r <= 6) return false
    if (r === 6 && c >= 8 && c <= 12) return c % 2 === 0
    if (c === 6 && r >= 8 && r <= 12) return r % 2 === 0
    if (r === 13 && c === 8) return true
    const v = (r * 41 + c * 53 + r * c * 7 + r + c) % 13
    return v < 6
  }

  const rects = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (getCell(r, c)) {
        rects.push(
          <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#1A1A1A" />
        )
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <rect width={size} height={size} fill="white" />
      {rects}
    </svg>
  )
}

function NavIcon({ type, active }) {
  const color = active ? '#0f9e82' : '#9CA3AF'
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none' }
  const sp = { stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

  if (type === 'home') return (
    <svg {...props}>
      <path d="M3 12l9-9 9 9" {...sp} />
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" {...sp} />
    </svg>
  )
  if (type === 'rewards') return (
    <svg {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" {...sp} />
      <path d="M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7M12 8v13" {...sp} />
      <path d="M12 8s-1-4-4-3-1 3 4 3zM12 8s1-4 4-3 1 3-4 3z" {...sp} />
    </svg>
  )
  if (type === 'history') return (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" {...sp} />
      <path d="M12 7v5l3 3" {...sp} />
    </svg>
  )
  if (type === 'profile') return (
    <svg {...props}>
      <circle cx="12" cy="8" r="4" {...sp} />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" {...sp} />
    </svg>
  )
  return null
}

const translations = {
  en: {
    home: 'Home', earnPoints: 'Earn Points', profile: 'Profile',
    tier: 'Gold Member', tierBadge: '✦ Gold', diamond: 'Diamond',
    ptsTo: 'pts to', ptsUnit: 'pts',
    ptsToUpgrade: (n) => `${n.toLocaleString()} pts to Diamond`,
    needMore: (n) => `Need ${n.toLocaleString()} more`,
    rewardsSection: 'Rewards', recordsSection: 'Records', viewAll: 'View All',
    membership: 'Membership', currentPoints: 'Current Points',
    totalVisits: 'Total Visits', totalSpent: 'Total Spent', redeemed: 'Redeemed',
    personalInfo: 'Personal Info',
    name: 'Name', nameVal: 'Marcus',
    phone: 'Phone', phoneVal: '(312) 555-0192',
    dob: 'Date of Birth', dobVal: 'January 15, 1990',
    email: 'Email', emailVal: 'marcus@email.com',
    settings: 'Settings',
    language: 'Language', privacyPolicy: 'Privacy Policy',
    signOut: 'Sign Out',
  },
  zh: {
    home: '主页', earnPoints: '积分赚取', profile: '个人',
    tier: '黄金会员', tierBadge: '✦ 黄金', diamond: '钻石',
    ptsTo: '积分升级', ptsUnit: '积分',
    ptsToUpgrade: (n) => `还差 ${n.toLocaleString()} 积分升级钻石`,
    needMore: (n) => `还需 ${n.toLocaleString()} 积分`,
    rewardsSection: '积分兑换', recordsSection: '消费记录', viewAll: '查看全部',
    membership: '会员信息', currentPoints: '当前积分',
    totalVisits: '到访次数', totalSpent: '累计消费', redeemed: '已兑换',
    personalInfo: '个人资料',
    name: '姓名', nameVal: 'Marcus',
    phone: '手机号', phoneVal: '(312) 555-0192',
    dob: '出生日期', dobVal: '1990年1月15日',
    email: '邮箱', emailVal: 'marcus@email.com',
    settings: '设置',
    language: '语言', privacyPolicy: '隐私政策',
    signOut: '退出登录',
  },
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Customer() {
  const navigate = useNavigate()
  const [showQR, setShowQR] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [activeTab, setActiveTab] = useState('home')
  const [lang, setLang] = useState('en')

  const T = translations[lang]

  const navTabs = [
    { id: 'home', label: T.home },
    { id: 'scan', label: T.earnPoints, isAction: true },
    { id: 'profile', label: T.profile },
  ]

  const progressPct = Math.round((CURRENT_PTS / DIAMOND_AT) * 100)

  return (
    <div className="flex flex-col h-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 bg-white border-b border-gray-100 flex-shrink-0">
        <QiaoLinLogo />
        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
              lang === 'en' ? 'bg-white text-[#0f9e82] shadow-sm' : 'text-[#9CA3AF]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('zh')}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
              lang === 'zh' ? 'bg-white text-[#0f9e82] shadow-sm' : 'text-[#9CA3AF]'
            }`}
          >
            中文
          </button>
        </div>
      </div>

      {/* ── Scrollable area ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ── HOME TAB ── */}
        {activeTab === 'home' && (
          <div className="fade-in">
            {/* Points Card */}
            <div
              className="mx-4 mt-4 rounded-2xl shadow-sm px-5 py-5"
              style={{ background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf9 100%)' }}
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[42px] font-bold text-[#1A1A1A] leading-none">2,450</span>
                    <span className="text-lg text-[#6B7280]">pts</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-0.5">{T.tier}</p>
                </div>
                <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-100 mt-1">
                  {T.tierBadge}
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-[#0f9e82] rounded-full"
                  style={{ width: `${progressPct}%`, transition: 'width 0.6s ease' }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <p className="text-[11px] text-[#6B7280]">{T.ptsToUpgrade(2000)}</p>
                <p className="text-[11px] text-[#6B7280]">{progressPct}%</p>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="mx-4 mt-5">
              <p className="text-[15px] font-semibold text-[#1A1A1A] mb-3">{T.rewardsSection}</p>
              <div className="grid grid-cols-3 gap-2.5">
                {rewards.map((r) => {
                  const canAfford = CURRENT_PTS >= r.pts
                  return (
                    <button
                      key={r.name}
                      disabled={!canAfford}
                      onClick={() => setSelectedReward(r)}
                      className={`rounded-xl p-3 text-left transition-opacity ${
                        canAfford
                          ? 'bg-white shadow-sm active:opacity-70'
                          : 'bg-gray-100 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <p className="text-[20px] mb-1.5">{r.icon}</p>
                      <p className={`text-[12px] font-semibold leading-tight ${canAfford ? 'text-[#0f9e82]' : 'text-[#9CA3AF]'}`}>
                        {lang === 'zh' ? r.nameZh : r.name}
                      </p>
                      <p className={`text-[11px] mt-1 ${canAfford ? 'text-[#6B7280]' : 'text-gray-400'}`}>
                        {r.pts.toLocaleString()} {T.ptsUnit}
                      </p>
                      {!canAfford && (
                        <p className="text-[10px] text-red-400 mt-1 font-medium leading-tight">
                          {T.needMore(r.pts - CURRENT_PTS)}
                        </p>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Records */}
            <div className="mx-4 mt-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[15px] font-semibold text-[#1A1A1A]">{T.recordsSection}</p>
                <button className="text-[12px] text-[#0f9e82] font-medium">{T.viewAll}</button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {records.map((rec, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3.5 ${
                      i < records.length - 1 ? 'border-b border-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0f9e82]/10 flex items-center justify-center flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M14 2H6a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2V4a2 2 0 00-2-2z" stroke="#0f9e82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 12h6M9 8h4" stroke="#0f9e82" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-[#1A1A1A]">{lang === 'zh' ? rec.storeZh : rec.store}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-0.5">{rec.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] text-[#1A1A1A]">{rec.amount}</p>
                      <p className="text-[11px] text-[#0f9e82] font-medium mt-0.5">{rec.pts}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div className="fade-in pb-6">

            {/* Avatar + name */}
            <div className="flex flex-col items-center pt-8 pb-6">
              <div className="w-20 h-20 rounded-full bg-[#0f9e82]/15 flex items-center justify-center mb-3">
                <span className="text-[#0f9e82] text-[34px] font-bold">M</span>
              </div>
              <p className="text-[20px] font-bold text-[#1A1A1A]">Marcus</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-amber-400 text-[11px]">✦</span>
                <p className="text-[13px] text-[#6B7280]">{T.tier}</p>
              </div>
              <p className="text-[11px] text-[#9CA3AF] font-mono tracking-wider mt-1">QL-2024-08834</p>
            </div>

            {/* Membership status card */}
            <div className="mx-4 mb-4 bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 pt-4 pb-3 border-b border-gray-50">
                <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">{T.membership}</p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[13px] text-[#6B7280]">{T.currentPoints}</p>
                    <p className="text-[22px] font-bold text-[#1A1A1A] leading-tight">2,450 <span className="text-[13px] font-normal text-[#6B7280]">pts</span></p>
                  </div>
                  <span className="flex items-center gap-1 bg-amber-50 text-amber-600 text-[12px] font-semibold px-3 py-1.5 rounded-full border border-amber-100">
                    {T.tierBadge}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0f9e82] rounded-full" style={{ width: `${progressPct}%` }} />
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-1.5">2,000 {T.ptsTo} {T.diamond} · {progressPct}%</p>
              </div>
              <div className="px-4 py-3 flex justify-around">
                {[
                  { label: T.totalVisits, value: '12' },
                  { label: T.totalSpent, value: '$245' },
                  { label: T.redeemed, value: '3' },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-[17px] font-bold text-[#1A1A1A]">{value}</p>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="mx-4 mb-4 bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 pt-4 pb-1">
                <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2">{T.personalInfo}</p>
              </div>
              {[
                { icon: '👤', label: T.name, value: T.nameVal },
                { icon: '📱', label: T.phone, value: T.phoneVal },
                { icon: '🎂', label: T.dob, value: T.dobVal },
                { icon: '📧', label: T.email, value: T.emailVal },
              ].map(({ icon, label, value }, i, arr) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[15px]">{icon}</span>
                    <p className="text-[13px] text-[#6B7280]">{label}</p>
                  </div>
                  <p className="text-[13px] font-medium text-[#1A1A1A]">{value}</p>
                </div>
              ))}
            </div>

            {/* Settings */}
            <div className="mx-4 mb-4 bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 pt-4 pb-1">
                <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2">{T.settings}</p>
              </div>

              {/* Language toggle row */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-[15px]">🌐</span>
                  <p className="text-[14px] text-[#1A1A1A]">{T.language}</p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                      lang === 'en' ? 'bg-white text-[#0f9e82] shadow-sm' : 'text-[#9CA3AF]'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('zh')}
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                      lang === 'zh' ? 'bg-white text-[#0f9e82] shadow-sm' : 'text-[#9CA3AF]'
                    }`}
                  >
                    中文
                  </button>
                </div>
              </div>

              {/* Privacy Policy row */}
              <div className="flex items-center justify-between px-4 py-3.5 active:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-[15px]">🔒</span>
                  <p className="text-[14px] text-[#1A1A1A]">{T.privacyPolicy}</p>
                </div>
                <ChevronRight />
              </div>
            </div>

            {/* Sign Out */}
            <div className="mx-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-white rounded-2xl shadow-sm px-4 py-3.5 text-[14px] font-semibold text-red-500 active:opacity-70 transition-opacity"
              >
                {T.signOut}
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ── Bottom Nav ── */}
      <div className="relative z-10 flex-shrink-0 bg-white border-t border-gray-100 px-2 pt-1 pb-5" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <div className="flex justify-around items-end">
          {navTabs.map(({ id, label, isAction }) => {
            if (isAction) {
              return (
                <button
                  key={id}
                  onClick={() => setShowQR(true)}
                  className="flex flex-col items-center -mt-5"
                >
                  <div className="w-14 h-14 bg-[#0f9e82] rounded-full shadow-lg flex items-center justify-center border-4 border-[#F8FAFA] active:opacity-90 transition-opacity">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" />
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" />
                      <rect x="14" y="14" width="3" height="3" fill="white" />
                      <rect x="18" y="14" width="3" height="3" fill="white" />
                      <rect x="14" y="18" width="3" height="3" fill="white" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-semibold text-[#0f9e82] mt-1">{label}</span>
                </button>
              )
            }
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex flex-col items-center gap-0.5 pt-2 px-2"
              >
                <NavIcon type={id} active={activeTab === id} />
                <span className={`text-[10px] font-medium ${activeTab === id ? 'text-[#0f9e82]' : 'text-[#9CA3AF]'}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Redeem Reward Modal ── */}
      {selectedReward && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedReward(null)} />
          <div className="relative bg-white rounded-t-3xl px-6 pt-5 pb-10 slide-up">
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
              onClick={() => setSelectedReward(null)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <p className="text-[17px] font-bold text-[#1A1A1A] text-center mb-1">Redeem Reward</p>
            <p className="text-[13px] text-[#6B7280] text-center mb-5">
              {selectedReward.icon} {selectedReward.name} — {selectedReward.pts.toLocaleString()} pts
            </p>

            <div className="flex justify-center mb-5">
              <div className="p-3 border border-gray-100 rounded-2xl shadow-sm">
                <QRCodeSVG size={168} />
              </div>
            </div>

            <div className="text-center">
              <p className="font-bold text-[#1A1A1A] text-[17px]">Marcus</p>
              <p className="text-[12px] text-[#9CA3AF] mt-1 font-mono tracking-wider">QL-2024-08834</p>
              <p className="text-[12px] text-[#6B7280] mt-2">Show this to staff to redeem</p>
            </div>
          </div>
        </div>
      )}

      {/* ── QR Modal ── */}
      {showQR && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowQR(false)} />
          <div className="relative bg-white rounded-t-3xl px-6 pt-5 pb-10 slide-up">
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200"
              onClick={() => setShowQR(false)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <p className="text-[15px] font-semibold text-[#1A1A1A] text-center mb-5 pr-6">
              Show this to staff to earn points
            </p>

            <div className="flex justify-center mb-5">
              <div className="p-3 border border-gray-100 rounded-2xl shadow-sm">
                <QRCodeSVG size={188} />
              </div>
            </div>

            <div className="text-center">
              <p className="font-bold text-[#1A1A1A] text-[18px]">Marcus</p>
              <p className="text-[13px] text-[#6B7280] mt-0.5">Gold Member</p>
              <p className="text-[12px] text-[#9CA3AF] mt-2 font-mono tracking-wider">QL-2024-08834</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
