import { useNavigate } from 'react-router-dom'
import { ItemCard } from '../components/ItemCard'
import { StepCard } from '../components/StepCard'
import { Item } from '../App'

interface HomePageProps {
  items: Item[];
}

export function HomePage({ items }: HomePageProps) {
  const navigate = useNavigate()

  const steps = [
    {
      number: 1, 
      title: 'Item is found & recorded',
      description: 'Security or BM staff find an item and log it in the system with photos and details.',
    },
    {
      number: 2,
      title: 'Browse & identify',
      description: 'Search the public listings by category, color, or location to find your item.',
    },
    {
      number: 3,
      title: 'Claim & collect',
      description: 'Submit a claim request and schedule an appointment to verify ownership and pick it up.',
    },
  ]

  return (
    <main>
      {/* Banner Section */}
      <section className="banner">
        <div className="banner-container">
          <h1 className="banner-title">Lost something on campus?</h1>
          <p className="banner-subtitle">Browse items found and submitted by security across Campus. Submit a claim and arrange a pickup.</p>
          
          {/* Action Buttons */}
          <div className="banner-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/browse')}>Browse lost items</button>
            <button className="btn btn-secondary">Report a found item</button>
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <input type="text" placeholder="Search by item name, color, or location..." className="search-input" />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="items-section">
        <div className="items-container">
          <div className="section-header">
            <h2>Recently Found Items</h2>
            <a href="#" className="see-all-link" onClick={(e) => { e.preventDefault(); navigate('/browse') }}>See all items →</a>
          </div>
          
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                image={item.image}
                name={item.name}
                location={item.location}
                foundAt={item.foundAt}
                category={item.category}
                onClick={() => navigate(`/items/${item.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* "How It Works" Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <h2 className="how-it-works-title">HOW IT WORKS</h2>
          
          <div className="steps-grid">
            {steps.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
