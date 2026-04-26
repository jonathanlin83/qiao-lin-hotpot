const KPI = [
  { label: 'Total Members',     value: '1,284',  sub: '+12 this week',   color: '#0f9e82' },
  { label: 'Points Issued Today', value: '3,720', sub: 'across 48 visits', color: '#6366f1' },
  { label: 'Revenue This Month', value: '$28,450', sub: '+8% vs last month', color: '#f59e0b' },
  { label: 'Redemptions',        value: '37',     sub: 'this month',      color: '#ef4444' },
]

const TRANSACTIONS = [
  { time: '2:41 PM', member: 'Marcus L.',   tier: 'Gold',     store: 'Chicago Downtown',  amount: '$65.00',  pts: '+65' },
  { time: '2:15 PM', member: 'Priya S.',    tier: 'Silver',   store: 'Chicago Chinatown', amount: '$42.00',  pts: '+42' },
  { time: '1:58 PM', member: 'Kevin W.',    tier: 'Diamond',  store: 'Atlanta',           amount: '$120.00', pts: '+120' },
  { time: '1:33 PM', member: 'Julia M.',    tier: 'Bronze',   store: 'Chicago Downtown',  amount: '$38.00',  pts: '+38' },
  { time: '1:10 PM', member: 'David C.',    tier: 'Gold',     store: 'Houston',           amount: '$91.00',  pts: '+91' },
  { time: '12:47 PM', member: 'Anna T.',    tier: 'Silver',   store: 'Chicago Chinatown', amount: '$55.00',  pts: '+55' },
  { time: '12:22 PM', member: 'Robert K.',  tier: 'Bronze',   store: 'Atlanta',           amount: '$29.00',  pts: '+29' },
  { time: '11:55 AM', member: 'Mei L.',     tier: 'Diamond',  store: 'Chicago Downtown',  amount: '$148.00', pts: '+148' },
]

const TIERS = [
  { label: 'Diamond', count: 87,  color: '#6366f1', pct: 7 },
  { label: 'Gold',    count: 312, color: '#f59e0b', pct: 24 },
  { label: 'Silver',  count: 498, color: '#9CA3AF', pct: 39 },
  { label: 'Bronze',  count: 387, color: '#cd7c40', pct: 30 },
]

const STORES = [
  { name: 'Chicago Downtown',  visits: 284, revenue: '$11,200', pts: 11200 },
  { name: 'Chicago Chinatown', visits: 219, revenue: '$8,640',  pts: 8640  },
  { name: 'Atlanta',           visits: 178, revenue: '$6,890',  pts: 6890  },
  { name: 'Houston',           visits: 143, revenue: '$5,420',  pts: 5420  },
]

const TIER_COLORS = {
  Diamond: { bg: 'bg-indigo-50',  text: 'text-indigo-600' },
  Gold:    { bg: 'bg-amber-50',   text: 'text-amber-600'  },
  Silver:  { bg: 'bg-gray-100',   text: 'text-gray-500'   },
  Bronze:  { bg: 'bg-orange-50',  text: 'text-orange-600' },
}

const maxRevPts = Math.max(...STORES.map(s => s.pts))

export default function Manager() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Qiao Lin Hotpot" className="h-8 w-auto object-contain" />
          <div className="h-5 w-px bg-gray-200" />
          <span className="text-[14px] font-semibold text-[#1A1A1A]">Manager Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-[#6B7280]">{today}</span>
          <div className="w-8 h-8 rounded-full bg-[#0f9e82]/10 flex items-center justify-center">
            <span className="text-[#0f9e82] text-[13px] font-bold">A</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-5 mb-8">
          {KPI.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] text-[#6B7280] font-medium">{k.label}</p>
                <div className="w-2 h-2 rounded-full" style={{ background: k.color }} />
              </div>
              <p className="text-[28px] font-bold text-[#1A1A1A] leading-none mb-1">{k.value}</p>
              <p className="text-[12px]" style={{ color: k.color }}>{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Main content — two columns */}
        <div className="grid grid-cols-3 gap-5">
          {/* Transactions table — 2 cols */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="text-[15px] font-semibold text-[#1A1A1A]">Recent Transactions</p>
              <span className="text-[12px] text-[#0f9e82] font-medium cursor-pointer">View All</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {['Time', 'Member', 'Tier', 'Store', 'Amount', 'Pts'].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => {
                  const tc = TIER_COLORS[tx.tier]
                  return (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 text-[13px] text-[#9CA3AF]">{tx.time}</td>
                      <td className="px-5 py-3 text-[13px] font-medium text-[#1A1A1A]">{tx.member}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{tx.tier}</span>
                      </td>
                      <td className="px-5 py-3 text-[13px] text-[#6B7280]">{tx.store}</td>
                      <td className="px-5 py-3 text-[13px] font-medium text-[#1A1A1A]">{tx.amount}</td>
                      <td className="px-5 py-3 text-[13px] font-semibold text-[#0f9e82]">{tx.pts}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {/* Member tiers */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <p className="text-[15px] font-semibold text-[#1A1A1A] mb-4">Member Tiers</p>
              <div className="space-y-3">
                {TIERS.map((t) => (
                  <div key={t.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium text-[#1A1A1A]">{t.label}</span>
                      <span className="text-[12px] text-[#6B7280]">{t.count} members</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${t.pct}%`, background: t.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Store performance */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex-1">
              <p className="text-[15px] font-semibold text-[#1A1A1A] mb-4">Store Performance</p>
              <div className="space-y-4">
                {STORES.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-medium text-[#1A1A1A] truncate pr-2">{s.name}</span>
                      <span className="text-[12px] text-[#6B7280] flex-shrink-0">{s.revenue}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0f9e82] rounded-full transition-all duration-700"
                        style={{ width: `${Math.round((s.pts / maxRevPts) * 100)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">{s.visits} visits</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
