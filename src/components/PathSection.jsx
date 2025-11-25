export default function PathSection() {

  const handleProtectedClick = () => {
    const loggedIn = localStorage.getItem("user");

    if (!loggedIn) {
      window.location.href = "/login";
      return;
    }
  };

  return (
    <section id="path" className="path-section">
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

            <button className="btn btn-primary" onClick={handleProtectedClick}>
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

            <button className="btn btn-primary" onClick={handleProtectedClick}>
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

            <button className="btn btn-primary" onClick={handleProtectedClick}>
              Provide Legal Aid
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
