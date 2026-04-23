import { Navbar } from './components/Navbar'
import { getCategoryColor } from './utils/categoryColors'

interface Item {
  id: number;
  name: string;
  description: string;
  color: string;
  category: string;
  location: string;
  foundAt: string;
  expiry: string;
  status: string;
  image: string;
}

interface ItemDetailsProps {
  item: Item;
  onBack: () => void;
}

export function ItemDetails({ item, onBack }: ItemDetailsProps) {
  const categoryColor = getCategoryColor(item.category)

  return (
    <>
      <Navbar />

      <main>
        <section className="item-details-section">
          <div className="item-details-container">
            
            {/* Back */}
            <button className="back-button" onClick={onBack}>← Back to items</button>

            <div className="item-details-content">
              {/* Item Image */}
              <div className="item-details-image-wrapper">
                <img src={item.image} alt={item.name} className="item-details-image" />
              </div>

              {/* Item Information */}
              <div className="item-details-info">
                <h1 className="item-details-title">{item.name}</h1>
                
                <div className="item-details-meta">
                  <div className="meta-item">
                    <span className="meta-label">Location:</span>
                    <span className="meta-value">{item.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Found:</span>
                    <span className="meta-value">{item.foundAt}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Color:</span>
                    <span className="meta-value">{item.color}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span 
                      className="item-tag-details"
                      style={{
                        backgroundColor: categoryColor.backgroundColor,
                        color: categoryColor.color,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Status:</span>
                    <span className="meta-value">{item.status}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Expires:</span>
                    <span className="meta-value">{item.expiry}</span>
                  </div>
                </div>

                <div className="item-details-description">
                  <h2>Description</h2>
                  <p>{item.description}</p>
                </div>

                <div className="item-details-actions">
                  <button className="btn btn-primary-dark btn-large">Claim Item</button>
                  <button className="btn btn-secondary-light btn-large">Contact Security</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
