import { clsx } from 'clsx'

export function Card({ title, subtitle, children, className, action }) {
  return (
    <section className={clsx('card', className)}>
      {(title || subtitle || action) && (
        <header className="card-header">
          <div>
            {title ? <h3 className="card-title">{title}</h3> : null}
            {subtitle ? <p className="card-subtitle">{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </header>
      )}
      {children}
    </section>
  )
}
