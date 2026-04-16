import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <div className="logo">
              <img src="/Logo_Binus_University.png" alt="Binus University" style={{width: '100%', height: '100%'}} />
            </div>
          </div>

          {/* Title
          <div className="navbar-title">Binus University Lost and Found</div> */}

          {/* Menu */}
          <ul className="navbar-menu">
            <li><a href="#">Report Lost Item</a></li>
            <li><a href="#">Browse Lost Items</a></li>
            <li><a href="#">My Claims</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>

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

        {/* Featured Items Section */}
        <section className="items-section">
          <div className="items-container">
            <div className="section-header">
              <h2>Recently Found Items</h2>
              <a href="#" className="see-all-link">See all items →</a>
            </div>
            
            <div className="items-grid">
              <div className="item-card">
                <img src="/placeholder.png" alt="Black laptop bag" className="item-image" />
                <h3>Black laptop bag</h3>
                <p className="item-location">Student Lounge · 2 days ago</p>
                <p className="item-date">2-3d</p>
                <span className="item-tag">Electronics</span>
              </div>
              
              <div className="item-card">
                <img src="/placeholder.png" alt="Student ID card" className="item-image" />
                <h3>Student ID card</h3>
                <p className="item-location">Auditorium · 3 days ago</p>
                <p className="item-date">3d</p>
                <span className="item-tag personal">Personal</span>
              </div>
              
              <div className="item-card">
                <img src="/placeholder.png" alt="Blue water bottle" className="item-image" />
                <h3>Blue water bottle</h3>
                <p className="item-location">Room 622 · 4 days ago</p>
                <p className="item-date">4d</p>
                <span className="item-tag personal">Personal</span>
              </div>
              
              <div className="item-card">
                <img src="/placeholder.png" alt="Wireless earbuds" className="item-image" />
                <h3>Wireless earbuds</h3>
                <p className="item-location">Library · 5 days ago</p>
                <p className="item-date">5d</p>
                <span className="item-tag">Electronics</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="how-it-works-container">
            <h2 className="how-it-works-title">HOW IT WORKS</h2>
            
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Item is found & recorded</h3>
                <p>Security or BM staff find an item and log it in the system with photos and details.</p>
              </div>
              
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Browse & identify</h3>
                <p>Search the public listings by category, color, or location to find your item.</p>
              </div>
              
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Claim & collect</h3>
                <p>Submit a claim request and schedule an appointment to verify ownership and pick it up.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
