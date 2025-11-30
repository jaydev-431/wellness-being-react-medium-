import { useNavigate } from "react-router-dom";

export default function PathSection() {
  const navigate = useNavigate();

  const handleProtectedClick = (role) => {
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      navigate("/login");
      return;
    }
    
    // Redirect to respective dashboard
    const user = JSON.parse(userData);
    if (user.role === role) {
      navigate(`/${role}`);
    } else {
      alert(`You are logged in as ${user.role}. Please login as ${role} to access this dashboard.`);
    }
  };

  return (
    <section id="path-section" className="path-section">
      <div className="container">
        <h2>Choose Your Path to Healing</h2>

        <p className="section-subtitle">
          Select the role that best describes you to access personalized resources.
        </p>

        <div className="path-cards">

          <div className="path-card">
            <div className="path-header">
              <h3>Survivor/Victim</h3>
              <i className="fas fa-user-shield"></i>
            </div>

            <ul className="path-features">
              <li><i className="fas fa-check"></i> Legal rights info</li>
              <li><i className="fas fa-check"></i> Emotional support</li>
              <li><i className="fas fa-check"></i> Safety planning tools</li>
              <li><i className="fas fa-check"></i> Progress tracking</li>
            </ul>

            <button 
              className="btn btn-primary" 
              onClick={() => handleProtectedClick("victim")}
            >
              Get Support Now
            </button>
          </div>

          <div className="path-card">
            <div className="path-header">
              <h3>Counselor</h3>
              <i className="fas fa-user-md"></i>
            </div>

            <ul className="path-features">
              <li><i className="fas fa-check"></i> Client management</li>
              <li><i className="fas fa-check"></i> Progress monitoring</li>
              <li><i className="fas fa-check"></i> Secure chat</li>
            </ul>

            <button 
              className="btn btn-primary" 
              onClick={() => handleProtectedClick("counselor")}
            >
              Start Helping
            </button>
          </div>

          <div className="path-card">
            <div className="path-header">
              <h3>Legal Advisor</h3>
              <i className="fas fa-scale-balanced"></i>
            </div>

            <ul className="path-features">
              <li><i className="fas fa-check"></i> Case tracking</li>
              <li><i className="fas fa-check"></i> Document management</li>
              <li><i className="fas fa-check"></i> Legal assistance tools</li>
            </ul>

            <button 
              className="btn btn-primary" 
              onClick={() => handleProtectedClick("legal")}
            >
              Provide Legal Aid
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}