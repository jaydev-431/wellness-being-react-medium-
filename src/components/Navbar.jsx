import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    // Scroll to top when going to home
    window.scrollTo(0, 0);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="container nav-container">

          <div className="nav-logo">
            <a href="#home" onClick={(e) => {
              e.preventDefault();
              handleLogoClick();
            }} style={{cursor: 'pointer'}}>
              <i className="fas fa-hands-helping"></i> WellnessBridge
            </a>
          </div>

          <div className="nav-menu">
            <a href="#problem" className="nav-link">Identify Issue</a>
            <a href="#path-section" className="nav-link">Get Help</a>
            <a href="#solution" className="nav-link">Services</a>
            <a href="#emergency" className="nav-link">Emergency</a>
          </div>

          {/* LOGIN BUTTON */}
          <a href="/login" className="btn btn-primary" style={{padding:"10px 20px", borderRadius:"8px"}}>
            Login / Signup
          </a>

        </div>
      </nav>
    </header>
  );
}