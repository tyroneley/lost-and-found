import { Item } from '../App'

export function ItemStrip({ item }: { item: Item }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // TODO: Later, fetch image from backend using item.photos[0] or item.id
  // const imageUrl = `${API_URL}/items/${item.id}/photo` or use photos array

  return (
    <div className="claim-item-strip">
      <img 
        src={item.image} 
        alt={item.name}
        className="claim-item-thumb"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).style.background = '#e0e6ed'
        }}
      />
      <div>
        <p className="claim-item-name">{item.name}</p>
        <p className="claim-item-meta">
          {item.location} · Found {formatDate(item.foundAt)}
        </p>
      </div>
    </div>
  )
}
