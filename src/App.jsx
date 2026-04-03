import { useMemo, useState } from 'react'
import { Header } from './components/layout/Header'
import { TransactionProvider } from './context/TransactionContext'
import { UserProvider } from './context/UserContext'
import { Dashboard } from './views/Dashboard'
import { Insights } from './views/Insights'
import { Transactions } from './views/Transactions'

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard')

  const view = useMemo(() => {
    if (activeView === 'transactions') {
      return <Transactions />
    }

    if (activeView === 'insights') {
      return <Insights />
    }

    return <Dashboard />
  }, [activeView])

  return (
    <div className="app-shell">
      <Header activeView={activeView} onViewChange={setActiveView} />
      <main className="main-content">{view}</main>
    </div>
  )
}

function App() {
  return (
    <UserProvider>
      <TransactionProvider>
        <AppContent />
      </TransactionProvider>
    </UserProvider>
  )
}

export default App
