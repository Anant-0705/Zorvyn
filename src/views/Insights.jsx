import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { useTransactions } from '../hooks/useTransactions'
import { TrendingUp, PieChart, Activity, Zap } from 'lucide-react'

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
      <div className="max-w-[1100px] mx-auto w-full">
         <Card>
           <EmptyState
             title="No insights available"
             description="Insights are generated automatically after transactions are available."
           />
         </Card>
      </div>
    )
  }

  return (
    <div className="max-w-[1100px] mx-auto w-full pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">AI Insights</h2>
        <p className="text-on-surface-variant mt-1 text-[13.5px]">Intelligent analysis of your financial behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="flex flex-col justify-between h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-3 text-on-surface-variant font-semibold text-[10.5px] tracking-widest uppercase">
               <PieChart size={15} className="text-outline-variant" /> Highest Spending
            </div>
          </div>
          <div>
             {insights.highestSpendingCategory ? (
                <>
                  <h2 className="font-headline font-extrabold text-[32px] tracking-tight text-on-surface leading-tight">
                    {insights.highestSpendingCategory.name}
                  </h2>
                  <p className="text-sm font-bold text-on-surface-variant mt-1">{moneyFormatter.format(insights.highestSpendingCategory.value)} Total spent</p>
                </>
             ) : (
                <p className="text-sm text-outline-variant font-medium">No expense categories available yet.</p>
             )}
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-3 text-on-surface-variant font-semibold text-[10.5px] tracking-widest uppercase">
               <Activity size={15} className="text-outline-variant" /> MoM Comparison
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div>
               <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mb-1">Income</p>
               <div className="flex items-center gap-2">
                 <h3 className="font-headline font-bold text-2xl text-on-surface">{formatPercent(insights.monthlyIncomeDelta)}</h3>
               </div>
            </div>
            <div className="w-[1px] h-10 bg-outline-variant/20 mx-4"></div>
            <div>
               <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mb-1">Expenses</p>
               <div className="flex items-center gap-2">
                 <h3 className="font-headline font-bold text-2xl text-on-surface">{formatPercent(insights.monthlyExpenseDelta)}</h3>
               </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-3 text-on-surface-variant font-semibold text-[10.5px] tracking-widest uppercase">
               <TrendingUp size={15} className="text-outline-variant" /> Savings Rate
            </div>
          </div>
          <div>
             <h2 className={`font-headline font-extrabold text-[42px] tracking-tighter leading-none ${insights.savingsRate >= 20 ? 'text-[#12661e]' : 'text-on-surface'}`}>
               {insights.savingsRate === null ? 'N/A' : `${insights.savingsRate.toFixed(1)}%`}
             </h2>
             <p className="text-xs font-semibold text-on-surface-variant mt-2">
                {insights.latestMonth ? `Metrics derived from ${insights.latestMonth.label}` : 'Waiting for consistent monthly data'}
             </p>
          </div>
        </Card>
      </div>

      <Card className="p-8 border-l-4 border-l-[#111316]">
        <div className="flex items-start gap-4">
           <div className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center shrink-0">
             <Zap size={18} className="text-[#111316] fill-black/10" />
           </div>
           <div>
             <h3 className="text-[11px] font-black tracking-widest uppercase text-on-surface-variant mb-2">Automated Observation</h3>
             <p className="text-[15px] leading-relaxed text-on-surface font-medium max-w-3xl">
               {insights.observation}
             </p>
           </div>
        </div>
      </Card>
    </div>
  )
}
