import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemCard } from '../components/ItemCard'
import { Item } from '../App'

export function BrowsePage({ items }: { items: Item[] }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [filterByRoom, setFilterByRoom] = useState(false)
  const [roomNumber, setRoomNumber] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const categories = ['Electronics', 'Personal Belonging', 'Clothing', 'Sports Equipment', 'Other']
  const locations = ['Student Lounge', 'Auditorium', 'Library', 'Cafeteria', 'Lobby']
  const colors = [
    { name: 'Black', hex: '#222222' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Blue', hex: '#2563eb' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Green', hex: '#16a34a' },
    { name: 'Gray', hex: '#94a3b8' },
  ]

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(item.color)
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(item.location)
      const matchesRoom = !filterByRoom || (item.location.includes('Room') && (!roomNumber || item.location.includes(`Room ${roomNumber}`)))

      return matchesSearch && matchesCategory && matchesColor && matchesLocation && matchesRoom
    })
  }, [items, searchTerm, selectedCategories, selectedColors, selectedLocations, filterByRoom, roomNumber])

  // Sort items
  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems]
    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.foundAt).getTime() - new Date(a.foundAt).getTime())
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.foundAt).getTime() - new Date(b.foundAt).getTime())
    }
    return sorted
  }, [filteredItems, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const paginatedItems = sortedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
    setCurrentPage(1)
  }

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    )
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedLocations([])
    setFilterByRoom(false)
    setRoomNumber('')
    setSearchTerm('')
    setCurrentPage(1)
  }

  const getCategoryCount = (cat: string) => items.filter(i => i.category === cat).length
  const getLocationCount = (loc: string) => items.filter(i => i.location === loc).length

  return (
    <main>
      <section className="browse-section">
        {/* Page Header */}
        <div className="browse-header">
          <div className="breadcrumb">Home <span>/ Browse items</span></div>
          <h1 className="browse-title">Lost items</h1>

          {/* Search and Sort Toolbar */}
          <div className="browse-toolbar">
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Search by name, description, color…"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="search-input"
              />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="browse-select">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <span className="result-count">{sortedItems.length} items</span>
          </div>
        </div>

        {/* Layout */}
        <div className="browse-layout">
          {/* Sidebar */}
          <aside className="browse-sidebar">
            {/* Category Filter */}
            <div className="filter-group">
              <h3 className="filter-label">Category</h3>
              {categories.map(cat => (
                <div key={cat} className="filter-option">
                  <input
                    type="checkbox"
                    id={`cat-${cat}`}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <label htmlFor={`cat-${cat}`}>{cat}</label>
                  <span className="count">{getCategoryCount(cat)}</span>
                </div>
              ))}
            </div>

            {/* Color Filter */}
            <div className="filter-group">
              <h3 className="filter-label">Color</h3>
              <div className="color-swatches">
                {colors.map(color => (
                  <button
                    key={color.name}
                    className={`swatch ${selectedColors.includes(color.name) ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => toggleColor(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="filter-group">
              <h3 className="filter-label">Found location</h3>
              {locations.map(loc => (
                <div key={loc} className="filter-option">
                  <input
                    type="checkbox"
                    id={`loc-${loc}`}
                    checked={selectedLocations.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                  />
                  <label htmlFor={`loc-${loc}`}>{loc}</label>
                  <span className="count">{getLocationCount(loc)}</span>
                </div>
              ))}
              
              {/* Room Number Filter */}
              <div className="filter-option">
                <input
                  type="checkbox"
                  id="filter-room"
                  checked={filterByRoom}
                  onChange={() => {
                    setFilterByRoom(!filterByRoom)
                    if (filterByRoom) setRoomNumber('')
                    setCurrentPage(1)
                  }}
                />
                <label htmlFor="filter-room">Room</label>
              </div>
              {filterByRoom && (
                <input
                  type="text"
                  placeholder="Enter room number"
                  value={roomNumber}
                  onChange={(e) => {
                    setRoomNumber(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="room-input"
                />
              )}
            </div>

            {/* Clear Filters */}
            {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedLocations.length > 0 || filterByRoom || searchTerm) && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear all filters
              </button>
            )}
          </aside>

          {/* Main Content */}
          <div className="browse-main">
            {/* Active Filters Tags */}
            {(selectedCategories.length > 0 || selectedColors.length > 0 || selectedLocations.length > 0 || filterByRoom) && (
              <div className="active-filters">
                {selectedCategories.map(cat => (
                  <div key={cat} className="filter-tag">
                    {cat}
                    <span onClick={() => toggleCategory(cat)}>×</span>
                  </div>
                ))}
                {selectedColors.map(color => (
                  <div key={color} className="filter-tag">
                    {color}
                    <span onClick={() => toggleColor(color)}>×</span>
                  </div>
                ))}
                {selectedLocations.map(loc => (
                  <div key={loc} className="filter-tag">
                    {loc}
                    <span onClick={() => toggleLocation(loc)}>×</span>
                  </div>
                ))}
                {filterByRoom && roomNumber && (
                  <div className="filter-tag">
                    Room {roomNumber}
                    <span onClick={() => {
                      setFilterByRoom(false)
                      setRoomNumber('')
                      setCurrentPage(1)
                    }}>×</span>
                  </div>
                )}
              </div>
            )}

            {/* Items Grid */}
            {paginatedItems.length > 0 ? (
              <>
                <div className="browse-grid">
                  {paginatedItems.map((item) => (
                    <div key={item.id} onClick={() => navigate(`/items/${item.id}`)} className="browse-card">
                      <ItemCard
                        image={item.image}
                        name={item.name}
                        location={item.location}
                        foundAt={item.foundAt}
                        category={item.category}
                        onClick={() => navigate(`/items/${item.id}`)}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="browse-pagination">
                    <button 
                      className="page-btn"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      ‹
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      className="page-btn"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <p>No items found matching your filters.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
