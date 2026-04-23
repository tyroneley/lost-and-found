import './App.css'
import { useState } from 'react'
import { ItemDetails } from './ItemDetails'
import { Navbar } from './components/Navbar'
import { ItemCard } from './components/ItemCard'
import { StepCard } from './components/StepCard'

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

function App() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  {/* Recent Items */}
  const items = [
    {
      id: 1,
      name: 'Black laptop bag',
      description: 'A black leather laptop bag with multiple compartments and padded shoulder straps. Found with personal documents inside.',
      color: 'Black',
      category: 'Electronics',
      location: 'Student Lounge',
      foundAt: 'April 21, 2026',
      expiry: 'May 21, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 2,
      name: 'Student ID card',
      description: 'Blue BINUS student ID card with photo. Name visible on card.',
      color: 'Blue',
      category: 'Personal Belonging',
      location: 'Auditorium',
      foundAt: 'April 20, 2026',
      expiry: 'May 20, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 3,
      name: 'Blue water bottle',
      description: 'Stainless steel water bottle with blue exterior and white logo print. Lightly used.',
      color: 'Blue',
      category: 'Personal Belonging',
      location: 'Room 622',
      foundAt: 'April 19, 2026',
      expiry: 'May 19, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
    {
      id: 4,
      name: 'Wireless earbuds',
      description: 'White wireless earbuds with charging case. Brand name visible on case.',
      color: 'White',
      category: 'Electronics',
      location: 'Library',
      foundAt: 'April 18, 2026',
      expiry: 'May 18, 2026',
      status: 'Active Ticket',
      image: '/placeholder.png',
    },
  ]

  {/* How it Works */}
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

  if (selectedItem) {
    return <ItemDetails item={selectedItem} onBack={() => setSelectedItem(null)} />
  }
  
  return (
    <>
      <Navbar />

      <main>
        {/* Banner Section */}
        <section className="banner">
          <div className="banner-container">
            <h1 className="banner-title">Lost something on campus?</h1>
            <p className="banner-subtitle">Browse items found and submitted by security across Campus. Submit a claim and arrange a pickup.</p>
            
            {/* Action Buttons */}
            <div className="banner-buttons">
              <button className="btn btn-primary">Browse lost items</button>
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
              <a href="#" className="see-all-link">See all items →</a>
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
                  onClick={() => setSelectedItem(item)}
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
    </>
  )
}

export default App
