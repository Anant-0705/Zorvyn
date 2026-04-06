import { useMemo, useState } from 'react'
import { Pencil, PlusCircle, Search, ShoppingBag, DollarSign, Utensils, TrendingUp, Home, Briefcase, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePermissions } from '../hooks/usePermissions'
import { useTransactions } from '../hooks/useTransactions'

const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
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
    day: 'numeric',
    year: 'numeric',
  })
}

function CategoryIcon({ category }) {
  const iconMap = {
    Electronics: <ShoppingBag size={14} />,
    Salary: <DollarSign size={14} />,
    Dining: <Utensils size={14} />,
    Investment: <TrendingUp size={14} />,
    Housing: <Home size={14} />,
    Groceries: <ShoppingBag size={14} />,
    Utilities: <Briefcase size={14} />,
  }

  return (
    <div className="w-8 h-8 rounded-lg bg-surface-container-high/60 flex items-center justify-center text-outline-variant mr-3 shrink-0">
      {iconMap[category] || <FileText size={14} />}
    </div>
  )
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
  const [showAddForm, setShowAddForm] = useState(false)

  const availableCategories = useMemo(() => {
    return categories.length ? categories : ['Housing', 'Groceries', 'Utilities', 'Dining', 'Salary', 'Electronics', 'Investment']
  }, [categories])

  const handleCreate = (event) => {
    event.preventDefault()
    if (!canAddTransaction) return
    if (!draft.date || !draft.description || !draft.category || Number(draft.amount) <= 0) return

    addTransaction({
      ...draft,
      amount: Number(draft.amount),
    })
    setDraft(initialDraft)
    setShowAddForm(false)
  }

  const startEdit = (transaction) => {
    if (!canEditTransaction) return
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
    if (!canEditTransaction || !editingId) return
    if (!editingDraft.date || !editingDraft.description || !editingDraft.category || Number(editingDraft.amount) <= 0) return

    updateTransaction(editingId, {
      ...editingDraft,
      amount: Number(editingDraft.amount),
    })
    setEditingId(null)
    setEditingDraft(initialDraft)
  }

  return (
    <div className="max-w-[1100px] mx-auto w-full pb-20">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-5 mb-8">
        <div>
          <h2 className="text-2xl md:text-[28px] font-headline font-extrabold tracking-tight text-[#111316]">Transactions</h2>
          <p className="text-on-surface-variant mt-1 text-sm md:text-[13.5px]">Manage and filter your latest activity</p>
        </div>
        
        {canAddTransaction ? (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-[#5d5e61] text-white px-5 py-2.5 rounded-full font-headline font-bold text-[11px] uppercase tracking-widest hover:bg-[#2b3437] transition-all shadow-sm"
          >
            <PlusCircle size={15} className="stroke-[2.5]" />
            Add Transaction
          </button>
        ) : (
          <p className="text-xs text-outline-variant font-medium">Viewer role has read-only access.</p>
        )}
      </div>

      {showAddForm && canAddTransaction && (
        <div className="bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-[0_2px_12px_rgba(43,52,55,0.03)] mb-6 animate-in slide-in-from-top-4 fade-in duration-200">
          <form className="flex flex-wrap gap-4 items-end" onSubmit={handleCreate}>
            <label className="flex-1 min-w-[140px]">
              <span className="block text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mb-2">Date</span>
              <input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} required className="w-full py-2.5 px-3 bg-[#f8f9fa] border-transparent focus:bg-white focus:border-outline-variant/30 rounded-lg text-[13.5px]" />
            </label>
            <label className="flex-2 min-w-[180px]">
              <span className="block text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mb-2">Description</span>
              <input type="text" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} placeholder="Apple Store Soho" required className="w-full py-2.5 px-3 bg-[#f8f9fa] border-transparent focus:bg-white focus:border-outline-variant/30 rounded-lg text-[13.5px]" />
            </label>
            <label className="flex-1 min-w-[140px]">
              <span className="block text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mb-2">Category</span>
              <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} required className="w-full py-2.5 px-3 bg-[#f8f9fa] border-transparent focus:bg-white focus:border-outline-variant/30 rounded-lg text-[13.5px] appearance-none">
                <option value="" disabled>Select</option>
                {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="flex-[0.8] min-w-[120px]">
              <span className="block text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mb-2">Type</span>
              <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} className="w-full py-2.5 px-3 bg-[#f8f9fa] border-transparent focus:bg-white focus:border-outline-variant/30 rounded-lg text-[13.5px] appearance-none">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>
            <label className="flex-1 min-w-[120px]">
              <span className="block text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/70 mb-2">Amount</span>
              <input type="number" step="0.01" min="0" value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} placeholder="199.99" required className="w-full py-2.5 px-3 bg-[#f8f9fa] border-transparent focus:bg-white focus:border-outline-variant/30 rounded-lg text-[13.5px]" />
            </label>
            <button type="submit" className="py-2.5 px-6 rounded-lg bg-[#111316] text-white text-[13.5px] font-semibold hover:bg-black transition-colors">
              Save
            </button>
          </form>
        </div>
      )}

      {/* Filters mimicking the white card */}
      <div className="bg-white p-4 rounded-xl border border-outline-variant/10 shadow-[0_2px_12px_rgba(43,52,55,0.02)] mb-6 flex flex-wrap gap-4 items-end">
        <label className="flex-[1.5] min-w-[200px]">
          <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-on-surface-variant mb-2.5 ml-1">Search</span>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline-variant w-[14px] h-[14px]" />
            <input type="text" value={filters.search} onChange={e => updateFilters({search: e.target.value})} placeholder="Merchant or ID..." className="pl-[34px] pr-4 py-2.5 w-full bg-[#f4f5f7] border-transparent focus:border-outline-variant/30 focus:bg-white rounded-xl text-[13.5px] text-on-surface placeholder-on-surface-variant/50 transition-colors" />
          </div>
        </label>
        
        <label className="flex-1 w-[150px]">
          <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-on-surface-variant mb-2.5 ml-1">Type</span>
          <select value={filters.type} onChange={e => updateFilters({type: e.target.value})} className="w-full py-2.5 px-4 bg-[#f4f5f7] border-transparent focus:border-outline-variant/30 rounded-xl text-[13.5px] text-[#555a64] appearance-none font-medium transition-colors">
             <option value="all">All Types</option>
             <option value="income">Income</option>
             <option value="expense">Expense</option>
          </select>
        </label>

        <label className="flex-[1.2] w-[170px]">
          <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-on-surface-variant mb-2.5 ml-1">Category</span>
          <select value={filters.category} onChange={e => updateFilters({category: e.target.value})} className="w-full py-2.5 px-4 bg-[#f4f5f7] border-transparent focus:border-outline-variant/30 rounded-xl text-[13.5px] text-[#555a64] appearance-none font-medium transition-colors">
             <option value="all">All Categories</option>
             {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="flex-1 w-[150px]">
           <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-on-surface-variant mb-2.5 ml-1">Sort By</span>
           <select value={filters.sortBy} onChange={e => updateFilters({sortBy: e.target.value})} className="w-full py-2.5 px-4 bg-[#f4f5f7] border-transparent focus:border-outline-variant/30 rounded-xl text-[13.5px] text-[#555a64] appearance-none font-medium transition-colors">
             <option value="date-desc">Newest First</option>
             <option value="date-asc">Oldest First</option>
             <option value="amount-desc">Highest Amount</option>
             <option value="amount-asc">Lowest Amount</option>
           </select>
        </label>

        <button onClick={resetFilters} className="px-7 py-2.5 border border-outline-variant/20 rounded-xl text-[13.5px] font-semibold hover:bg-surface-container-low transition-colors h-[42px] text-on-surface">
          Reset
        </button>
      </div>

      {/* Table Data Block */}
       <div className="bg-white rounded-[1.25rem] border border-outline-variant/10 shadow-[0_4px_30px_rgba(43,52,55,0.03)] overflow-hidden">
          {filteredTransactions.length ? (
            <div className="w-full overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr>
                     <th className="px-6 pt-7 pb-4 text-[9px] font-black tracking-[0.18em] uppercase text-on-surface-variant/70 border-b border-outline-variant/10 whitespace-nowrap">Date</th>
                     <th className="px-6 pt-7 pb-4 text-[9px] font-black tracking-[0.18em] uppercase text-on-surface-variant/70 border-b border-outline-variant/10">Description</th>
                     <th className="px-6 pt-7 pb-4 text-[9px] font-black tracking-[0.18em] uppercase text-on-surface-variant/70 border-b border-outline-variant/10 whitespace-nowrap">Category</th>
                     <th className="px-6 pt-7 pb-4 text-[9px] font-black tracking-[0.18em] uppercase text-on-surface-variant/70 border-b border-outline-variant/10 whitespace-nowrap text-center">Type</th>
                     <th className="px-6 pt-7 pb-4 text-[9px] font-black tracking-[0.18em] uppercase text-on-surface-variant/70 border-b border-outline-variant/10 whitespace-nowrap text-right">Amount</th>
                     <th className="px-6 pt-7 pb-4 text-[9px] font-black tracking-[0.18em] uppercase text-on-surface-variant/70 border-b border-outline-variant/10 whitespace-nowrap text-center">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                    {filteredTransactions.map(transaction => {
                      const isEditing = editingId === transaction.id
                      const amountColor = transaction.type === 'income' ? 'text-green-600' : 'text-red-500'
                      const pillBg = transaction.type === 'income' ? 'bg-[#eaffe2]/60 text-[#12661e]' : 'bg-[#fff0f0] text-[#cc2a2a]'
                      
                      if (isEditing) {
                        return (
                          <tr key={transaction.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-[#f8f9fa] transition-colors">
                            <td colSpan={6} className="p-3 sm:p-4">
                              <form className="flex flex-col md:flex-row md:items-center gap-3 bg-white p-3 rounded-lg border border-outline-variant/20 shadow-sm" onSubmit={submitEdit}>
                                <input type="date" value={editingDraft.date} onChange={e => setEditingDraft({...editingDraft, date: e.target.value})} className="border border-outline-variant/30 rounded px-2 py-1.5 text-sm w-full md:w-36" required />
                                <input type="text" value={editingDraft.description} onChange={e => setEditingDraft({...editingDraft, description: e.target.value})} className="border border-outline-variant/30 rounded px-2 py-1.5 text-sm w-full md:flex-1" required />
                                
                                <div className="flex gap-3 w-full md:w-auto">
                                  <select value={editingDraft.category} onChange={e => setEditingDraft({...editingDraft, category: e.target.value})} className="border border-outline-variant/30 rounded px-2 py-1.5 text-sm flex-1 md:w-32 bg-white">
                                    {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                  </select>
                                  <select value={editingDraft.type} onChange={e => setEditingDraft({...editingDraft, type: e.target.value})} className="border border-outline-variant/30 rounded px-2 py-1.5 text-sm flex-[0.7] md:w-24 bg-white">
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                  </select>
                                </div>
                                
                                <div className="flex items-center justify-between gap-3 w-full md:w-auto">
                                  <input type="number" step="0.01" min="0" value={editingDraft.amount} onChange={e => setEditingDraft({...editingDraft, amount: e.target.value})} className="border border-outline-variant/30 rounded px-2 py-1.5 text-sm flex-1 md:w-28" required />
                                  <div className="flex gap-2 shrink-0 md:pr-2">
                                    <button type="submit" className="bg-[#111316] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-black transition-colors">Save</button>
                                    <button type="button" onClick={() => setEditingId(null)} className="px-3 py-1.5 text-outline-variant text-xs font-bold hover:text-on-surface transition-colors">Cancel</button>
                                  </div>
                                </div>
                              </form>
                            </td>
                          </tr>
                        )
                      }
                      
                      const idSubtext = transaction.id.replace('tx_', '')
                      
                      return (
                        <tr key={transaction.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-[#fcfcfd] transition-colors group">
                           <td className="px-6 py-5 text-[13px] text-on-surface-variant font-medium whitespace-nowrap">
                             {formatDate(transaction.date)}
                           </td>
                           <td className="px-6 py-5">
                             <div className="flex items-center">
                               <CategoryIcon category={transaction.category} />
                               <div>
                                  <p className="text-[13.5px] font-bold text-on-surface">{transaction.description}</p>
                                  <p className="text-[10px] text-outline-variant font-medium mt-0.5 tracking-wide">ID: TX-{idSubtext.slice(0,5).toUpperCase()}</p>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-5 text-[13px] text-on-surface-variant font-medium whitespace-nowrap">
                             {transaction.category}
                           </td>
                           <td className="px-6 py-5 text-center">
                             <span className={`inline-flex items-center px-3 py-1 rounded w-max text-[9px] uppercase tracking-widest font-black ${pillBg}`}>
                                {transaction.type}
                             </span>
                           </td>
                           <td className={`px-6 py-5 text-[13.5px] font-bold text-right whitespace-nowrap ${amountColor}`}>
                             {transaction.type === 'income' ? '+' : '-'}
                             {moneyFormatter.format(transaction.amount)}
                           </td>
                           <td className="px-6 py-5 text-center align-middle">
                              {canEditTransaction && (
                                <button onClick={() => startEdit(transaction)} className="text-outline-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container-high mx-auto inline-flex">
                                   <Pencil size={15} className="stroke-[2.5]" />
                                </button>
                              )}
                           </td>
                        </tr>
                      )
                    })}
                 </tbody>
               </table>
            </div>
          ) : (
            <div className="p-12 text-center">
               <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto text-outline-variant mb-4">
                 <Search size={24} />
               </div>
               <h3 className="font-headline font-bold text-lg mb-1">No matching transactions</h3>
               <p className="text-sm text-on-surface-variant max-w-sm mx-auto">Try changing your filters or add a new transaction as an admin to see it here.</p>
            </div>
          )}
          
          {/* Footer of Table */}
          {filteredTransactions.length > 0 && (
             <div className="px-6 py-4 border-t border-outline-variant/10 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-on-surface-variant">Showing 1-{filteredTransactions.length} of {filteredTransactions.length} transactions</p>
                <div className="flex items-center gap-1.5">
                   <button className="w-6 h-6 rounded flex items-center justify-center text-outline-variant"><ChevronLeft size={14}/></button>
                   <button className="w-6 h-6 rounded bg-[#5d5e61] text-white text-xs font-bold">1</button>
                   <button className="w-6 h-6 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-bold">2</button>
                   <button className="w-6 h-6 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-bold">3</button>
                   <button className="w-6 h-6 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface"><ChevronRight size={14}/></button>
                </div>
             </div>
          )}
       </div>
    </div>
  )
}
