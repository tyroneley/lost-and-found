import { getCategoryColor } from '../utils/categoryColors'

interface ItemCardProps {
  image: string;
  name: string;
  location: string;
  foundAt: string;
  category: string;
  onClick: () => void;
}

export function ItemCard({ image, name, location, foundAt, category, onClick }: ItemCardProps) {
  const categoryColor = getCategoryColor(category)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 30) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-image">
        {image && <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        <span className="card-photo-count">1 photo</span>
      </div>
      <div style={{ padding: '0.75rem' }}>
        <h3>{name}</h3>
        <p className="item-location">{location}</p>
        <div className="item-footer">
          <span 
            className="item-tag"
            style={{
              backgroundColor: categoryColor.backgroundColor,
              color: categoryColor.color,
            }}
          >
            {category}
          </span>
          <span className="item-date">{formatDate(foundAt)}</span>
        </div>
      </div>
    </div>
  );
}
