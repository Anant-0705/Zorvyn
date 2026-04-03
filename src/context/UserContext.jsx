import { useMemo, useState } from 'react'
import { UserContext } from './user-context'

const USER_ROLE_KEY = 'finance-dashboard-role'
const ROLES = ['viewer', 'admin']

export function UserProvider({ children }) {
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem(USER_ROLE_KEY)
    return ROLES.includes(saved) ? saved : 'viewer'
  })

  const handleRoleChange = (nextRole) => {
    if (!ROLES.includes(nextRole)) {
      return
    }

    setRole(nextRole)
    localStorage.setItem(USER_ROLE_KEY, nextRole)
  }

  const value = useMemo(
    () => ({
      role,
      roles: ROLES,
      setRole: handleRoleChange,
    }),
    [role],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
