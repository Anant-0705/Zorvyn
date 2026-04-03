import { useMemo } from 'react'
import { useUser } from './useUser'

export function usePermissions() {
  const { role } = useUser()

  const permissions = useMemo(() => {
    const canManageTransactions = role === 'admin'

    return {
      role,
      canViewData: true,
      canAddTransaction: canManageTransactions,
      canEditTransaction: canManageTransactions,
    }
  }, [role])

  return permissions
}
