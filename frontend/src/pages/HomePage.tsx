import { useNavigate } from 'react-router-dom'
import { ItemCard } from '../components/ItemCard'
import { Item } from '../App'

interface HomePageProps {
  items: Item[];
}

export function HomePage({ items }: HomePageProps) {
  const navigate = useNavigate()

  const steps = [
    {
      number: 1, 
      title: 'Item is found & handed in',
      description: 'Someone finds a lost item and brings it to the security desk. Security logs it with photos, a description, and where it was found.',
      actor: 'Security staff',
      actorClass: 'actor-security'
    },
    {
      number: 2,
      title: 'Browse & identify your item',
      description: 'Search the public listings by name, category, color, or location. No account needed to browse — just look through what\'s been found.',
      actor: 'Anyone',
      actorClass: 'actor-public'
    },
    {
      number: 3,
      title: 'Submit a claim',
      description: 'Found your item? Create a free account, describe why it\'s yours, and request an appointment with security to verify and collect it.',
      actor: 'Registered users',
      actorClass: 'actor-public'
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <p className="hero-eyebrow">BINUS University International · Lost & Found</p>
          <h1 className="hero-title">Lost something on campus?</h1>
          <p className="hero-subtitle">Browse items found and held by security across BINUS @ Senayan. Find your item and submit a claim to arrange a pickup.</p>
          
          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search by item name, color, location…" 
              className="search-input" 
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  navigate('/browse')
                }
              }}
            />
            <button className="search-btn" onClick={() => navigate('/browse')}>Search items</button>
          </div>
        </div>
      </section>

      {/* "How It Works" Section */}
      <section className="how-it-works-section">
        <div className="how-it-works-container">
          <p className="section-eyebrow">The process</p>
          <h2 className="how-it-works-title">How it works</h2>
          
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className={`actor-pill ${step.actorClass}`}>{step.actor}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="items-section">
        <div className="items-container">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Just added</p>
              <h2>Recently found items</h2>
            </div>
            <a href="#" className="see-all-link" onClick={(e) => { e.preventDefault(); navigate('/browse') }}>See all items →</a>
          </div>
          
          <div className="items-grid">
            {items.slice(0, 4).map((item) => (
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

          {items.length === 0 && (
            <div className="empty-state">
              <p>No items found yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <span className="footer-text">Footer text | Lorem ipsum dolor sit amet nostrud nonumy consequat.</span>
      </footer>
    </main>
  )
}
