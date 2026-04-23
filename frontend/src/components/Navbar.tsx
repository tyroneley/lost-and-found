export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo">
            <img src="/Logo_Binus_University.png" alt="Binus University" style={{width: '100%', height: '100%'}} />
          </div>
        </div>

        {/* Menu */}
        <ul className="navbar-menu">
          <li><a href="#">Report Lost Item</a></li>
          <li><a href="#">Browse Lost Items</a></li>
          <li><a href="#">My Claims</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
