import { ShieldCheck, ShieldEllipsis } from 'lucide-react'
import { useUser } from '../../hooks/useUser'

const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'insights', label: 'Insights' },
]

export function Header({ activeView, onViewChange }) {
  const { role, roles, setRole } = useUser()

  return (
    <header className="app-header">
      <div className="heading-block">
        <p className="eyebrow">Finance Intelligence</p>
        <h1>Personal Finance Dashboard</h1>
        <p className="subline">Track balances, explore transactions, and uncover spending signals.</p>
      </div>

      <div className="toolbar">
        <div className="role-switcher" aria-label="Role switcher">
          {role === 'admin' ? <ShieldCheck size={16} /> : <ShieldEllipsis size={16} />}
          <label htmlFor="role-select">Role</label>
          <select
            id="role-select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            {roles.map((item) => (
              <option key={item} value={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <nav className="tab-nav" aria-label="Main navigation tabs">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={activeView === item.key ? 'tab active' : 'tab'}
              onClick={() => onViewChange(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
