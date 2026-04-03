import { useMemo, useState } from 'react'
import { Pencil, PlusCircle, Search } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { usePermissions } from '../hooks/usePermissions'
import { useTransactions } from '../hooks/useTransactions'

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const initialDraft = {
  date: '',
  description: '',
  category: '',
  type: 'expense',
  amount: '',
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export function Transactions() {
  const {
    filteredTransactions,
    filters,
    categories,
    updateFilters,
    resetFilters,
    addTransaction,
    updateTransaction,
  } = useTransactions()
  const { canAddTransaction, canEditTransaction } = usePermissions()

  const [draft, setDraft] = useState(initialDraft)
  const [editingId, setEditingId] = useState(null)
  const [editingDraft, setEditingDraft] = useState(initialDraft)

  const availableCategories = useMemo(() => {
    return categories.length ? categories : ['Housing', 'Groceries', 'Utilities', 'Dining', 'Salary']
  }, [categories])

  const handleCreate = (event) => {
    event.preventDefault()

    if (!canAddTransaction) {
      return
    }

    if (!draft.date || !draft.description || !draft.category || Number(draft.amount) <= 0) {
      return
    }

    addTransaction({
      ...draft,
      amount: Number(draft.amount),
    })

    setDraft(initialDraft)
  }

  const startEdit = (transaction) => {
    if (!canEditTransaction) {
      return
    }

    setEditingId(transaction.id)
    setEditingDraft({
      date: transaction.date,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      amount: String(transaction.amount),
    })
  }

  const submitEdit = (event) => {
    event.preventDefault()

    if (!canEditTransaction || !editingId) {
      return
    }

    if (
      !editingDraft.date ||
      !editingDraft.description ||
      !editingDraft.category ||
      Number(editingDraft.amount) <= 0
    ) {
      return
    }

    updateTransaction(editingId, {
      ...editingDraft,
      amount: Number(editingDraft.amount),
    })

    setEditingId(null)
    setEditingDraft(initialDraft)
  }

  return (
    <div className="transactions-layout">
      <Card title="Filters" className="filters-card">
        <div className="filters-row">
          <label className="field">
            <span>Search</span>
            <div className="input-with-icon">
              <Search size={15} />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilters({ search: event.target.value })}
                placeholder="Search description or category"
              />
            </div>
          </label>

          <label className="field">
            <span>Type</span>
            <select
              value={filters.type}
              onChange={(event) => updateFilters({ type: event.target.value })}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label className="field">
            <span>Category</span>
            <select
              value={filters.category}
              onChange={(event) => updateFilters({ category: event.target.value })}
            >
              <option value="all">All categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Sort</span>
            <select
              value={filters.sortBy}
              onChange={(event) => updateFilters({ sortBy: event.target.value })}
            >
              <option value="date-desc">Latest date</option>
              <option value="date-asc">Oldest date</option>
              <option value="amount-desc">Amount high to low</option>
              <option value="amount-asc">Amount low to high</option>
            </select>
          </label>

          <button className="ghost-button" onClick={resetFilters}>
            Reset
          </button>
        </div>
      </Card>

      {canAddTransaction ? (
        <Card title="Add Transaction" subtitle="Available only for admin role">
          <form className="transaction-form" onSubmit={handleCreate}>
            <input
              type="date"
              value={draft.date}
              onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))}
              required
            />
            <input
              type="text"
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Description"
              required
            />
            <input
              type="text"
              value={draft.category}
              onChange={(event) =>
                setDraft((current) => ({ ...current, category: event.target.value }))
              }
              placeholder="Category"
              required
            />
            <select
              value={draft.type}
              onChange={(event) => setDraft((current) => ({ ...current, type: event.target.value }))}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="number"
              step="0.01"
              min="0"
              value={draft.amount}
              onChange={(event) => setDraft((current) => ({ ...current, amount: event.target.value }))}
              placeholder="Amount"
              required
            />

            <button className="primary-button" type="submit">
              <PlusCircle size={16} />
              Add
            </button>
          </form>
        </Card>
      ) : (
        <Card>
          <p className="muted">
            Viewer role has read-only access. Switch to admin to add or edit transactions.
          </p>
        </Card>
      )}

      <Card title="Transactions" subtitle={`${filteredTransactions.length} records matched`}>
        {filteredTransactions.length ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => {
                  const isEditing = editingId === transaction.id

                  if (isEditing) {
                    return (
                      <tr key={transaction.id}>
                        <td colSpan={6}>
                          <form className="transaction-form edit-inline" onSubmit={submitEdit}>
                            <input
                              type="date"
                              value={editingDraft.date}
                              onChange={(event) =>
                                setEditingDraft((current) => ({
                                  ...current,
                                  date: event.target.value,
                                }))
                              }
                              required
                            />
                            <input
                              type="text"
                              value={editingDraft.description}
                              onChange={(event) =>
                                setEditingDraft((current) => ({
                                  ...current,
                                  description: event.target.value,
                                }))
                              }
                              required
                            />
                            <input
                              type="text"
                              value={editingDraft.category}
                              onChange={(event) =>
                                setEditingDraft((current) => ({
                                  ...current,
                                  category: event.target.value,
                                }))
                              }
                              required
                            />
                            <select
                              value={editingDraft.type}
                              onChange={(event) =>
                                setEditingDraft((current) => ({
                                  ...current,
                                  type: event.target.value,
                                }))
                              }
                            >
                              <option value="income">Income</option>
                              <option value="expense">Expense</option>
                            </select>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={editingDraft.amount}
                              onChange={(event) =>
                                setEditingDraft((current) => ({
                                  ...current,
                                  amount: event.target.value,
                                }))
                              }
                              required
                            />
                            <button type="submit" className="primary-button">
                              Save
                            </button>
                            <button
                              type="button"
                              className="ghost-button"
                              onClick={() => {
                                setEditingId(null)
                                setEditingDraft(initialDraft)
                              }}
                            >
                              Cancel
                            </button>
                          </form>
                        </td>
                      </tr>
                    )
                  }

                  return (
                    <tr key={transaction.id}>
                      <td data-label="Date">{formatDate(transaction.date)}</td>
                      <td data-label="Description">{transaction.description}</td>
                      <td data-label="Category">{transaction.category}</td>
                      <td data-label="Type">
                        <Badge type={transaction.type}>{transaction.type}</Badge>
                      </td>
                      <td
                        data-label="Amount"
                        className={transaction.type === 'income' ? 'amount-income' : 'amount-expense'}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {moneyFormatter.format(transaction.amount)}
                      </td>
                      <td data-label="Action">
                        {canEditTransaction ? (
                          <button
                            className="ghost-button small"
                            onClick={() => startEdit(transaction)}
                          >
                            <Pencil size={13} />
                            Edit
                          </button>
                        ) : (
                          <span className="muted">View only</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No matching transactions"
            description="Try changing filters or add a new transaction as admin."
          />
        )}
      </Card>
    </div>
  )
}
