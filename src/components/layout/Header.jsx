import { X, LayoutDashboard, ReceiptText, Lightbulb, ShieldCheck, ShieldEllipsis, Settings, HelpCircle, Home } from 'lucide-react'
import { useUser } from '../../hooks/useUser'

export function Header({ activeView, onViewChange, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { role, roles, setRole } = useUser()

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'transactions', label: 'Transactions', icon: ReceiptText },
    { key: 'insights', label: 'Insights', icon: Lightbulb },
  ]

  const cycleRole = () => {
    const nextIndex = (roles.indexOf(role) + 1) % roles.length
    setRole(roles[nextIndex])
  }

  return (
    <aside className={`fixed md:static inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 w-[280px] md:w-[260px] border-r border-[#e9ecef] bg-[#ffffff] flex flex-col justify-between shrink-0 h-full py-8`}>
      <div>
        {/* Brand */}
        <div className="px-6 md:px-8 pb-10 flex justify-between items-start">
          <div>
            <h1 className="font-headline font-black text-[22px] tracking-tight text-on-surface leading-none">
              Atelier Finance
            </h1>
            <p className="text-[9px] uppercase tracking-[0.16em] font-extrabold text-on-surface-variant/80 mt-1.5">
              Wealth Management
            </p>
          </div>
          <button className="md:hidden text-outline-variant hover:text-on-surface p-1" onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.key

            return (
              <button
                key={item.key}
                onClick={() => { onViewChange(item.key); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-full text-[13.5px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#f4f5f7] text-[#111316]'
                    : 'text-[#6a7281] hover:bg-[#f8f9fa] hover:text-[#111316]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#111316] stroke-[2.5]' : 'text-outline-variant/80'} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer Nav */}
      <div className="px-6 space-y-7">
        <button
          onClick={cycleRole}
          className="w-full flex items-center justify-center gap-2.5 bg-[#f4f5f7] border border-outline-variant/10 text-on-surface py-3 px-4 rounded-full font-headline font-bold text-[11px] uppercase tracking-wider hover:bg-[#e9ecef] transition-all"
        >
          {role === 'admin' ? <ShieldCheck size={15} /> : <ShieldEllipsis size={15} />}
          {role === 'admin' ? 'Admin Base' : 'Viewer Base'}
        </button>

        <div className="px-2 space-y-2">
          <a href="/" className="flex items-center gap-3 text-[13px] font-semibold px-4 py-3 rounded-full text-[#6a7281] hover:text-[#111316] hover:bg-[#f8f9fa] w-full transition-all">
            <Home size={16} className="text-outline-variant/80" />
            Landing Page
          </a>
          <button className="flex items-center gap-3 text-[13px] font-semibold px-4 py-3 rounded-full text-[#6a7281] hover:text-[#111316] hover:bg-[#f8f9fa] w-full transition-all">
            <Settings size={16} className="text-outline-variant/80" />
            Settings
          </button>
          <button className="flex items-center gap-3 text-[13px] font-semibold px-4 py-3 rounded-full text-[#6a7281] hover:text-[#111316] hover:bg-[#f8f9fa] w-full transition-all">
            <HelpCircle size={16} className="text-outline-variant/80" />
            Support
          </button>
        </div>
      </div>
    </aside>
  )
}
