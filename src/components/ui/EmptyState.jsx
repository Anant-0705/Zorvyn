import { Inbox } from 'lucide-react'

export function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <Inbox size={26} />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}
