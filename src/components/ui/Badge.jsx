import { clsx } from 'clsx'

export function Badge({ type, children }) {
  return <span className={clsx('badge', `badge-${type}`)}>{children}</span>
}
