import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react'
import { DonutChart } from '../components/charts/DonutChart'
import { TrendChart } from '../components/charts/TrendChart'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { useTransactions } from '../hooks/useTransactions'

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function Dashboard() {
  const { dashboardSummary, trendData, expenseBreakdown, transactions } = useTransactions()

  if (!transactions.length) {
    return (
      <Card>
        <EmptyState
          title="No financial records yet"
          description="Add your first transaction to start building your dashboard summary and charts."
        />
      </Card>
    )
  }

  return (
    <div className="view-grid">
      <section className="summary-grid">
        <Card title="Total Balance" className="metric-card">
          <div className="metric-row">
            <Wallet size={18} />
            <strong>{moneyFormatter.format(dashboardSummary.balance)}</strong>
          </div>
          <p className="metric-caption">Current net position</p>
        </Card>

        <Card title="Income" className="metric-card">
          <div className="metric-row income">
            <ArrowUpCircle size={18} />
            <strong>{moneyFormatter.format(dashboardSummary.income)}</strong>
          </div>
          <p className="metric-caption">Total money coming in</p>
        </Card>

        <Card title="Expenses" className="metric-card">
          <div className="metric-row expense">
            <ArrowDownCircle size={18} />
            <strong>{moneyFormatter.format(dashboardSummary.expenses)}</strong>
          </div>
          <p className="metric-caption">Total money going out</p>
        </Card>
      </section>

      <section className="chart-grid">
        <Card
          title="Balance Trend Over Time"
          subtitle="Monthly income, expenses, and running balance"
          className="chart-card"
        >
          <TrendChart data={trendData} />
        </Card>

        <Card
          title="Spending Breakdown"
          subtitle="Expense categories represented in multiple colors"
          className="chart-card"
        >
          {expenseBreakdown.length ? (
            <DonutChart data={expenseBreakdown} />
          ) : (
            <EmptyState
              title="No expense data"
              description="Your donut chart appears once there are expense transactions."
            />
          )}
        </Card>
      </section>
    </div>
  )
}
