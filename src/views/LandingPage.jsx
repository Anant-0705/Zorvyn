import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed antialiased min-h-screen pb-0 m-0">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-5 md:px-8 py-4 md:py-5 max-w-[1400px] mx-auto">
          <div className="text-xl font-bold tracking-tight text-on-surface font-headline flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full"></span>
            Atelier Finance
          </div>
          
          <div className="hidden lg:flex items-center space-x-10 font-headline font-semibold tracking-tight text-[13px] uppercase">
            <a className="text-on-surface border-b border-on-surface pb-0.5" href="#">Wealth</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Insights</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Advisory</a>
            <a className="text-on-surface-variant hover:text-on-surface transition-colors" href="#">Firm</a>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <a href="/dashboard" className="bg-on-surface text-surface px-7 py-2.5 rounded-full font-headline font-bold text-xs uppercase tracking-widest hover:bg-primary-dim transition-all">Go to Dashboard</a>
          </div>

          <button className="lg:hidden text-on-surface-variant hover:text-on-surface" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
           <div className="lg:hidden bg-surface absolute top-full left-0 w-full border-b border-outline-variant/10 shadow-lg px-5 py-6 flex flex-col gap-6">
             <div className="flex flex-col space-y-4 font-headline font-semibold tracking-tight text-sm uppercase">
               <a href="#" className="text-on-surface" onClick={() => setMobileMenuOpen(false)}>Wealth</a>
               <a href="#" className="text-on-surface-variant" onClick={() => setMobileMenuOpen(false)}>Insights</a>
               <a href="#" className="text-on-surface-variant" onClick={() => setMobileMenuOpen(false)}>Advisory</a>
               <a href="#" className="text-on-surface-variant" onClick={() => setMobileMenuOpen(false)}>Firm</a>
             </div>
             <div className="h-px bg-outline-variant/10 w-full"></div>
             <div className="flex flex-col gap-4">
               <a href="/dashboard" className="bg-on-surface text-white text-center px-4 py-3 rounded-full font-headline font-bold text-xs uppercase tracking-widest">Go to Dashboard</a>
             </div>
           </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 md:pt-20">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/20">
          
                </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold font-headline leading-[0.95] text-on-surface tracking-[-0.03em]">
                Shared <br />
                <span className="text-reveal">Finances</span> <br />
                Simplified.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-on-surface-variant max-w-xl leading-relaxed font-medium">
               An expense tracking app designed to help individuals and groups keep track of shared expenses in an organized way. It allows users to record daily expenses, categorize spending, and monitor who owes money and how much.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <a href="/dashboard" className="smooth-gradient text-white px-10 py-5 rounded-full font-headline font-bold text-lg hover:shadow-2xl transition-all flex w-max items-center justify-center gap-4">
                  Go to Dashboard
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              {/* Large Decorative Monolith */}
              <div className="relative z-10 bg-white p-12 rounded-[4rem] editorial-shadow border border-outline-variant/20 transform lg:rotate-2 lg:translate-x-12">
                <div className="space-y-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total Shared</p>
                      <h3 className="text-5xl font-headline font-bold tabular-nums tracking-tighter">$14,240</h3>
                    </div>
                    <div className="p-3 bg-tertiary/10 text-tertiary rounded-2xl">
                      <span className="material-symbols-outlined">group</span>
                    </div>
                  </div>
                  <div className="h-48 flex items-end gap-3">
                    <div className="flex-1 bg-surface-container-low rounded-xl h-[40%] group-hover:h-[50%] transition-all"></div>
                    <div className="flex-1 bg-surface-container-high rounded-xl h-[65%]"></div>
                    <div className="flex-1 bg-primary/20 rounded-xl h-[55%]"></div>
                    <div className="flex-1 bg-primary/60 rounded-xl h-[85%]"></div>
                    <div className="flex-1 bg-on-surface rounded-xl h-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Settled</p>
                      <p className="text-xl font-bold text-tertiary">84%</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">To Collect</p>
                      <p className="text-xl font-bold">$2,278</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Abstract geometry behind */}
              <div className="absolute -top-20 -right-20 w-[120%] h-[120%] bg-surface-container-high asymmetric-shape -z-10 opacity-30"></div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-20 border-y border-outline-variant/10">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex flex-wrap justify-between items-center gap-12 opacity-30 grayscale contrast-125">
              <img alt="Bloomberg" className="h-5 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwX5lQt5Gj8vibOK5AXdRbv-lZFDzMxeIwX1vuLQLS721AAYdaNtBDDUuCm5UCQ8QBVT3I7xy1y101TPmAtlDGk42C64L0zPET-pQdf1CCWlMEiL4ljn06H_ZPNmkW7_pu4E0JWidVZSpWBrHbTswNrAgcULjMawWc0cdRQFPuILmAy-sb28lIIxs9gpyXj1O0hgkE7ak4EwCTTQwbCD1kgn4BEuvhCeAf_kRnROEwCxc8bMp1W3ldF17VGPAeNiHu4ZDo3U2Ck_9j" />
              <img alt="Forbes" className="h-4 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv5ZjTkbfgfReOf3RVTbW7bY1vqloUFUBYAYMsqg5rI5VyUJbNeld5ppzWVsylpKCJPuK_MZLta5OMMC33Ae-WjnGh3S6RsM4aO8WLJR-izUEaxOUepT9C5UXlk3U6g8tmws09YFTxWbNJHo8ZUlZkhUFfo0aSbHnPJqoqQ2Aa73xJxG2ko2df7EucvH5gUOYMHe0CijOH-h3X5nq34GQApogXU0CPVojUkDc7HK3wEyYmF77jVR50rHWhr434v4Tz7vPFhmFPJITj" />
              <img alt="Reuters" className="h-5 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw48tvXZRb9WJNF7j0UuFoxWDx9OL2zxbuUtAKiN1mTwJw32Ofv-rGOMszNnofv7B8BqlA8XXItG_yXKgGOeuAAcbr1L2lcApP98JxZT1zAj8GqcMQJfyGDPAQC9OaOt4PLXEaFhB7iEEr8F2TI6F1GGCKVbCGELKcn4aAKaUkNwm2_-TsLeHkagiJ_UM35pclwWFTi7Aqf1KQ-YniSCmBLqzgdu5Ow8MaNbn8fo3ySr2xVMggZTxw8YTDXE5XW7e-KKVdqslOXlmO" />
              <img alt="WSJ" className="h-5 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMVteTZZzTDQmKFFcLKoOjvhw6wCi7fE31NoxpjokVH_d7pJNGlmKDy9psW9PgiQwiG3zIXgbfx1iGBwdCmbiTRmuSqqYY43WCXYQkahWALayj5tMpzBkmEJJtDPIgyGbB2CP8NTl_ap56IjzRzzbiwZWFe1UeBvAEJprCMOKu3sV_7Yu4DDOua7IeKWq5ZRcd-UsyaHTsVm1-A2H6zLo8IzPlfUmQRVVFmjdvxuFQFeRQzSOoSSoDfKtEbjA1dfdLssco4eFAaBt6" />
              <img alt="FT" className="h-5 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55lOOuzTtiuNl5QxvJRtUA0MoH19u83EtPnSQfVIXLxjn2GW-j4d9hspvl-LVKH8Uc_SFKylPwdUQdlK3dKW86IxYGhzdJSr6N92MG26txns9xTBjQ1Jt0zpXBpXBtJQPrqAfuH0mcAtwDJ3vEcxbB5KQbAnZVJC5kh09dSYIjQw_yHDiR4MjfRKYX5Qqnzjr5IGVIde6BWMBea-FsCLKkkjGW_VRY_JFp3B0R3FSH-w9Hum6_spVCnwRWoa1x7FRqoueC5PLt_7s" />
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="px-8 py-40 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-4 relative lg:sticky lg:top-40 z-10 bg-surface-container-lowest">
                <span className="font-headline font-bold text-xs uppercase tracking-[0.4em] text-primary mb-6 block">Features</span>
                <h2 className="text-5xl font-headline font-extrabold text-on-surface leading-[1.1] tracking-tighter">
                  Split Bills, <br /> Not Friends.
                </h2>
                <p className="mt-8 text-lg text-on-surface-variant leading-relaxed max-w-sm">
                  We provide the perfect ledger for your shared expenses, allowing your group to settle debts instantly without awkward conversations.
                </p>
              </div>
              <div className="lg:col-span-8 grid md:grid-cols-2 gap-x-12 gap-y-24">
                {/* Feature 1 */}
                <div className="group">
                  <div className="mb-10 inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4h16v16H4V4z" strokeWidth="0.5"></path>
                      <path d="M4 12h16M12 4v16" strokeDasharray="1 2" strokeWidth="0.5"></path>
                      <circle cx="12" cy="12" r="3" strokeWidth="1.5"></circle>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4 tracking-tight">Unified Dashboards</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg">
                    Visualize exactly who owes whom and monitor group balances effortlessly across trips, households, or events.
                  </p>
                </div>
                {/* Feature 2 */}
                <div className="group">
                  <div className="mb-10 inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="0.5"></path>
                      <path d="M12 7l3 5-3 5-3-5 3-5z" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4 tracking-tight">Smart Categorization</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg">
                    Automatically group and categorize combined expenses in real-time to exactly see where the group's money is going.
                  </p>
                </div>
                {/* Feature 3 */}
                <div className="group">
                  <div className="mb-10 inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3v18h18M7 16l4-4 4 4 6-6" strokeWidth="1.5"></path>
                      <circle cx="21" cy="10" fill="currentColor" r="1.5"></circle>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4 tracking-tight">Instant Settlement</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg">
                    Record your reimbursements instantly and maintain a reliable, constant track record of completed settlements.
                  </p>
                </div>
                {/* Feature 4 */}
                <div className="group">
                  <div className="mb-10 inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1v22M1 12h22" strokeDasharray="2 4" strokeWidth="0.5"></path>
                      <rect height="10" rx="2" strokeWidth="1.5" width="10" x="7" y="7"></rect>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-4 tracking-tight">Shared Ledgers</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg">
                    Every member of your group organization is provided a clear and transparent lens ensuring alignment on mutual costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 pb-32 bg-surface-container-lowest">
          <div className="max-w-[1400px] mx-auto relative group">
            <div className="bg-on-surface rounded-[4rem] p-16 md:p-32 overflow-hidden relative">
              {/* Architectural Grid Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-7xl font-headline font-extrabold text-white tracking-tight leading-[0.95]">
                    Start Tracking <br /> Together.
                  </h2>
                  <p className="text-xl text-surface-variant/60 max-w-md font-medium">
                    Join thousands of groups keeping their shared expenses organized and stress-free.
                  </p>
                </div>
                <div className="flex lg:justify-end mt-10 lg:mt-0">
                  <a href="/dashboard" className="inline-block bg-surface text-on-surface px-8 py-5 sm:px-12 sm:py-8 rounded-full font-headline font-bold text-xl sm:text-2xl hover:bg-primary-fixed transition-all editorial-shadow transform hover:scale-[1.02] duration-300 w-full sm:w-max text-center">
                    Create Your Group
                  </a>
                </div>
              </div>
              {/* Decoration */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 border border-white/10 rounded-full"></div>
              <div className="absolute -bottom-32 -right-32 w-80 h-80 border border-white/5 rounded-full"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest w-full border-t border-outline-variant/10">
        <div className="max-w-[1400px] mx-auto px-12 py-20 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8">
            <div className="text-2xl font-bold tracking-tighter text-on-surface font-headline">Atelier Finance</div>
            <p className="text-on-surface-variant font-medium text-lg max-w-xs leading-relaxed">Elevating shared expenses through tracking precision.</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-on-surface hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-sm">share</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-10">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface mb-6">Platform</p>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Wealth</a>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Governance</a>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Reports</a>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface mb-6">Firm</p>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">About</a>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Insights</a>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Press</a>
            </div>
            <div className="space-y-4 col-span-2 lg:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface mb-6">Legal</p>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy</a>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms</a>
              <a className="block text-on-surface-variant hover:text-on-surface transition-colors" href="#">Disclosures</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-12 py-8 border-t border-outline-variant/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">
          <span>© 2024 Atelier Finance. All rights reserved.</span>
          <span>The Financial Atelier</span>
        </div>
      </footer>
    </div>
  )
}
