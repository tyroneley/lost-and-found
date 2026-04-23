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

  return (
    <div className="item-card" onClick={onClick}>
      <img src={image} alt={name} className="item-image" />
      <h3>{name}</h3>
      <p className="item-location">{location}</p>
      <p className="item-date">Found on: {foundAt}</p>
      <span 
        className="item-tag"
        style={{
          backgroundColor: categoryColor.backgroundColor,
          color: categoryColor.color,
        }}
      >
        {category}
      </span>
    </div>
  );
}
