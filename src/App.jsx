import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Customer from './pages/Customer'
import Staff from './pages/Staff'
import Manager from './pages/Manager'
import Auth from './pages/Auth'

function DemoNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isCustomer = pathname.startsWith('/customer')
  const isStaff = pathname.startsWith('/staff')
  const isManager = pathname.startsWith('/manager')
  const isAuth = pathname.startsWith('/login')

  return (
    <div className="hidden sm:flex items-center gap-1 mt-3 bg-white/60 backdrop-blur rounded-full px-1.5 py-1.5 shadow-sm border border-white/80">
      <span className="text-[10px] text-gray-400 font-semibold tracking-widest px-2">DEMO</span>
      <button
        onClick={() => navigate('/login')}
        className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
          isAuth ? 'bg-[#0f9e82] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => navigate('/customer')}
        className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
          isCustomer ? 'bg-[#0f9e82] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'
        }`}
      >
        Customer
      </button>
      <button
        onClick={() => navigate('/staff')}
        className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
          isStaff ? 'bg-[#0f9e82] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'
        }`}
      >
        Staff
      </button>
      <button
        onClick={() => navigate('/manager')}
        className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
          isManager ? 'bg-[#0f9e82] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A1A]'
        }`}
      >
        Manager
      </button>
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isManager = pathname.startsWith('/manager')

  if (isManager) {
    return (
      <>
        <Routes>
          <Route path="/manager" element={<Manager />} />
        </Routes>
        <div className="flex justify-center pb-6 bg-[#F3F4F6]">
          <DemoNav />
        </div>
      </>
    )
  }

  return (
    // Mobile: full-width, exact screen height so bottom nav pins to bottom
    // Desktop: centered phone frame with gray surround
    <div className="flex flex-col h-screen bg-[#F8FAFA] sm:bg-gray-200 sm:justify-start sm:items-center sm:py-6">
      <div
        className="flex-1 w-full sm:flex-none sm:w-[375px] sm:h-[812px] bg-[#F8FAFA] relative overflow-hidden sm:rounded-[2.5rem] sm:shadow-2xl"
        style={{ flexShrink: 0 }}
      >
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      <DemoNav />
    </div>
  )
}
