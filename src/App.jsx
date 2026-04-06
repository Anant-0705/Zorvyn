import { useMemo, useState } from 'react'
import { Header } from './components/layout/Header'
import { TransactionProvider } from './context/TransactionContext'
import { UserProvider } from './context/UserContext'
import { Dashboard } from './views/Dashboard'
import { Insights } from './views/Insights'
import { LandingPage } from './views/LandingPage'
import { Transactions } from './views/Transactions'
import { Bell, Search, Menu } from 'lucide-react'

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const view = useMemo(() => {
    if (activeView === 'transactions') return <Transactions />
    if (activeView === 'insights') return <Insights />
    return <Dashboard />
  }, [activeView])

  return (
    <div className="flex h-screen bg-[#fcfcfd] font-body text-on-surface antialiased overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Header 
        activeView={activeView} 
        onViewChange={(v) => { setActiveView(v); setIsMobileMenuOpen(false); }} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f4f5f7]">
        {/* Top bar */}
        <header className="h-[76px] px-4 md:px-8 border-b border-outline-variant/10 flex items-center justify-between shrink-0 bg-[#f4f5f7]">
          <div className="flex items-center gap-3 md:gap-2 text-on-surface-variant font-medium text-[13px]">
            <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 hover:bg-black/5 text-on-surface transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={20} />
            </button>
            <span className="material-symbols-outlined text-[18px] hidden md:block">history</span>
            <span className="hidden sm:inline">Recent Activity</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-outline-variant absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Quick find..."
                className="pl-10 pr-4 py-2.5 bg-[#ffffff] border border-outline-variant/20 focus:border-outline-variant/40 rounded-full text-sm w-40 md:w-64 transition-all outline-none"
              />
            </div>
            <button className="sm:hidden w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 text-on-surface-variant hover:bg-black/5 transition-colors">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant/20 text-on-surface-variant hover:bg-black/5 transition-colors relative">
              <Bell className="w-[18px] h-[18px]" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#f4f5f7]"></div>
            </button>
            <div className="w-[40px] h-[40px] ml-1 shrink-0 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">person</span>
            </div>
          </div>
        </header>

        {/* Scrollable workspace */}
        <div className="flex-1 overflow-y-auto px-4 md:px-10 py-6 md:py-12 relative w-full">
          {view}
        </div>
      </main>
    </div>
  )
}

function DashboardApp() {
  return (
    <UserProvider>
      <TransactionProvider>
        <AppContent />
      </TransactionProvider>
    </UserProvider>
  )
}

function App() {
  const isDashboardPath =
    window.location.pathname === '/dashboard' ||
    window.location.pathname.startsWith('/dashboard/')

  return isDashboardPath ? <DashboardApp /> : <LandingPage />
}

export default App
