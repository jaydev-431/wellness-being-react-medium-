export default function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="container nav-container">

          <div className="nav-logo">
            <a href="#home">
              <i className="fas fa-hands-helping"></i> WellnessBridge
            </a>
          </div>

          <div className="nav-menu">
            <a href="#problem" className="nav-link">Identify Issue</a>
            <a href="#path" className="nav-link">Get Help</a>
            <a href="#solution" className="nav-link">Services</a>
            <a href="#emergency" className="nav-link">Emergency</a>
          </div>

          {/* NEW LOGIN BUTTON */}
          <a href="/login" className="btn btn-primary" style={{padding:"10px 20px", borderRadius:"8px"}}>
            Login / Signup
          </a>

        </div>
      </nav>
    </header>
  );
}
