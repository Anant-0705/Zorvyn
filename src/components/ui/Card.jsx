import { clsx } from 'clsx'

export function Card({ title, subtitle, children, className, action }) {
  return (
    <section className={clsx('bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-[0_2px_12px_rgba(43,52,55,0.03)]', className)}>
      {(title || subtitle || action) && (
        <header className="flex justify-between items-start mb-5">
          <div>
            {title ? <h3 className="font-headline font-bold text-[17px] text-on-surface leading-tight tracking-tight">{title}</h3> : null}
            {subtitle ? <p className="text-[13px] text-on-surface-variant font-medium mt-1">{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </header>
      )}
      {children}
    </section>
  )
}
