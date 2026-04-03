import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { useTransactions } from '../hooks/useTransactions'

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

function formatPercent(value) {
  if (value === null || Number.isNaN(value)) {
    return 'N/A'
  }

  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function Insights() {
  const { insights, transactions } = useTransactions()

  if (!transactions.length) {
    return (
      <Card>
        <EmptyState
          title="No insights available"
          description="Insights are generated automatically after transactions are available."
        />
      </Card>
    )
  }

  return (
    <div className="insights-grid">
      <Card title="Highest Spending Category" className="insight-card">
        {insights.highestSpendingCategory ? (
          <div className="insight-stat">
            <strong>{insights.highestSpendingCategory.name}</strong>
            <span>{moneyFormatter.format(insights.highestSpendingCategory.value)}</span>
          </div>
        ) : (
          <p className="muted">No expense categories available yet.</p>
        )}
      </Card>

      <Card title="Monthly Comparison" className="insight-card">
        <div className="insight-pair">
          <div>
            <p className="muted">Income vs previous month</p>
            <strong>{formatPercent(insights.monthlyIncomeDelta)}</strong>
          </div>
          <div>
            <p className="muted">Expenses vs previous month</p>
            <strong>{formatPercent(insights.monthlyExpenseDelta)}</strong>
          </div>
        </div>
      </Card>

      <Card title="Savings Rate" className="insight-card">
        <div className="insight-stat">
          <strong>{insights.savingsRate === null ? 'N/A' : `${insights.savingsRate.toFixed(1)}%`}</strong>
          <span>
            {insights.latestMonth ? `Based on ${insights.latestMonth.label}` : 'Waiting for monthly data'}
          </span>
        </div>
      </Card>

      <Card title="Observation" className="insight-card full-width">
        <p>{insights.observation}</p>
      </Card>
    </div>
  )
}
