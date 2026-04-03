import { createContext, useMemo, useState } from 'react'
import { mockTransactions } from '../data/mockData'

const TransactionContext = createContext(null)

const STORAGE_KEY = 'finance-dashboard-transactions'

const defaultFilters = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date-desc',
}

function getInitialTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return mockTransactions
    }

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : mockTransactions
  } catch {
    return mockTransactions
  }
}

function monthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function safePercentDifference(currentValue, previousValue) {
  if (!previousValue) {
    return null
  }

  return ((currentValue - previousValue) / previousValue) * 100
}

function mapByMonth(transactions) {
  const monthlyMap = {}

  transactions.forEach((transaction) => {
    const monthKey = transaction.date.slice(0, 7)

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        monthKey,
        label: monthLabel(monthKey),
        income: 0,
        expense: 0,
      }
    }

    if (transaction.type === 'income') {
      monthlyMap[monthKey].income += transaction.amount
    } else {
      monthlyMap[monthKey].expense += transaction.amount
    }
  })

  return Object.values(monthlyMap).sort((a, b) =>
    a.monthKey.localeCompare(b.monthKey),
  )
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(getInitialTransactions)
  const [filters, setFilters] = useState(defaultFilters)

  const categories = useMemo(() => {
    return [...new Set(transactions.map((transaction) => transaction.category))].sort()
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase()

    const result = transactions.filter((transaction) => {
      const typeMatch = filters.type === 'all' || transaction.type === filters.type
      const categoryMatch =
        filters.category === 'all' || transaction.category === filters.category
      const searchMatch =
        !normalizedSearch ||
        transaction.description.toLowerCase().includes(normalizedSearch) ||
        transaction.category.toLowerCase().includes(normalizedSearch)

      return typeMatch && categoryMatch && searchMatch
    })

    result.sort((a, b) => {
      if (filters.sortBy === 'date-asc') {
        return new Date(a.date) - new Date(b.date)
      }

      if (filters.sortBy === 'date-desc') {
        return new Date(b.date) - new Date(a.date)
      }

      if (filters.sortBy === 'amount-asc') {
        return a.amount - b.amount
      }

      return b.amount - a.amount
    })

    return result
  }, [filters, transactions])

  const dashboardSummary = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    const expenses = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    return {
      income,
      expenses,
      balance: income - expenses,
      count: transactions.length,
    }
  }, [transactions])

  const trendData = useMemo(() => {
    const monthly = mapByMonth(transactions)
    let runningBalance = 0

    return monthly.map((item) => {
      runningBalance += item.income - item.expense

      return {
        month: item.label,
        income: item.income,
        expense: item.expense,
        balance: runningBalance,
      }
    })
  }, [transactions])

  const expenseBreakdown = useMemo(() => {
    const grouped = {}

    transactions.forEach((transaction) => {
      if (transaction.type !== 'expense') {
        return
      }

      grouped[transaction.category] =
        (grouped[transaction.category] ?? 0) + transaction.amount
    })

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [transactions])

  const insights = useMemo(() => {
    const monthly = mapByMonth(transactions)
    const latestMonth = monthly[monthly.length - 1]
    const previousMonth = monthly[monthly.length - 2]
    const highestSpendingCategory = expenseBreakdown[0] ?? null

    const monthlyExpenseDelta = latestMonth
      ? safePercentDifference(latestMonth.expense, previousMonth?.expense ?? 0)
      : null

    const monthlyIncomeDelta = latestMonth
      ? safePercentDifference(latestMonth.income, previousMonth?.income ?? 0)
      : null

    const savingsRate = latestMonth?.income
      ? ((latestMonth.income - latestMonth.expense) / latestMonth.income) * 100
      : null

    let observation = 'No transactions available yet. Add data to unlock insights.'

    if (latestMonth) {
      if (latestMonth.expense > latestMonth.income) {
        observation =
          'Spending is higher than income this month. Reducing non-essential expenses can help restore balance.'
      } else if ((savingsRate ?? 0) > 35) {
        observation =
          'Savings momentum is strong this month. You are retaining a healthy share of your income.'
      } else if ((monthlyExpenseDelta ?? 0) > 10) {
        observation =
          'Monthly expenses increased noticeably compared to last month. Check large categories for optimization.'
      } else {
        observation =
          'Spending and income are in a stable range this month. Keeping this pattern can improve predictability.'
      }
    }

    return {
      highestSpendingCategory,
      latestMonth,
      previousMonth,
      monthlyExpenseDelta,
      monthlyIncomeDelta,
      savingsRate,
      observation,
    }
  }, [transactions, expenseBreakdown])

  const persistTransactions = (nextTransactions) => {
    setTransactions(nextTransactions)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTransactions))
  }

  const addTransaction = (payload) => {
    const newTransaction = {
      id: `tx-${Date.now()}`,
      ...payload,
      amount: Number(payload.amount),
    }

    persistTransactions([newTransaction, ...transactions])
  }

  const updateTransaction = (transactionId, payload) => {
    const nextTransactions = transactions.map((transaction) => {
      if (transaction.id !== transactionId) {
        return transaction
      }

      return {
        ...transaction,
        ...payload,
        amount: Number(payload.amount),
      }
    })

    persistTransactions(nextTransactions)
  }

  const updateFilters = (patch) => {
    setFilters((current) => ({ ...current, ...patch }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  const value = useMemo(
    () => ({
      transactions,
      filteredTransactions,
      categories,
      filters,
      dashboardSummary,
      trendData,
      expenseBreakdown,
      insights,
      addTransaction,
      updateTransaction,
      updateFilters,
      resetFilters,
    }),
    [
      transactions,
      filteredTransactions,
      categories,
      filters,
      dashboardSummary,
      trendData,
      expenseBreakdown,
      insights,
    ],
  )

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

export { TransactionContext }
