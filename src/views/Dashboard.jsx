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
      <div className="max-w-[1100px] mx-auto w-full">
         <Card>
           <EmptyState
             title="No financial records yet"
             description="Add your first transaction to start building your dashboard summary and charts."
           />
         </Card>
      </div>
    )
  }

  return (
    <div className="max-w-[1100px] mx-auto w-full space-y-6 pb-20">
      {/* Overview section matches aesthetic with large fonts and tight design */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="flex flex-col justify-between h-[135px] md:h-[155px]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-on-surface-variant font-semibold text-[10.5px] tracking-wider uppercase">
               <Wallet size={15} /> Total Balance
            </div>
          </div>
          <div>
             <h2 className="font-headline font-extrabold text-3xl md:text-[42px] tracking-tighter text-on-surface">
               {moneyFormatter.format(dashboardSummary.balance)}
             </h2>
             <p className="text-[11px] md:text-xs text-on-surface-variant mt-0 font-medium">Current net position</p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-[135px] md:h-[155px]">
          <div>
            <div className="flex items-center gap-1.5 bg-[#eaffe2]/60 text-[#12661e] w-max px-2.5 py-1.5 rounded-md font-bold text-[9px] tracking-widest uppercase">
               <ArrowUpCircle size={14} className="stroke-[2.5]" /> Income
            </div>
          </div>
          <div>
             <h2 className="font-headline font-extrabold text-2xl md:text-[32px] tracking-tight text-on-surface">
               {moneyFormatter.format(dashboardSummary.income)}
             </h2>
             <p className="text-[11px] md:text-xs text-on-surface-variant mt-0 font-medium">Total money coming in</p>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-[135px] md:h-[155px]">
          <div>
            <div className="flex items-center gap-1.5 text-[#cc2a2a] bg-[#fff0f0] w-max px-2.5 py-1.5 rounded-md font-bold text-[9px] tracking-widest uppercase">
               <ArrowDownCircle size={14} className="stroke-[2.5]" /> Expenses
            </div>
          </div>
          <div>
             <h2 className="font-headline font-extrabold text-2xl md:text-[32px] tracking-tight text-on-surface">
               {moneyFormatter.format(dashboardSummary.expenses)}
             </h2>
             <p className="text-[11px] md:text-xs text-on-surface-variant mt-0 font-medium">Total money going out</p>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        <Card
          title="Balance Trend Over Time"
          subtitle="Monthly income, expenses, and running balance"
          className="min-h-[380px]"
        >
          <div className="h-[300px] w-full mt-4">
            <TrendChart data={trendData} />
          </div>
        </Card>

        <Card
          title="Spending Breakdown"
          subtitle="Expense categories represented in multiple colors"
          className="min-h-[380px]"
        >
          <div className="h-[300px] w-full mt-4">
            {expenseBreakdown.length ? (
              <DonutChart data={expenseBreakdown} />
            ) : (
              <EmptyState
                title="No expense data"
                description="Your donut chart appears once there are expense transactions."
              />
            )}
          </div>
        </Card>
      </section>
    </div>
  )
}
