export default function EmergencySection() {
  return (
    <section className="emergency-section">
      <h2>Emergency Resources</h2>
      <p>Immediate help is available 24/7.</p>

      <div className="emergency-cards">

        {/* National Hotline */}
        <div className="emergency-card">
          <h3>National Hotline</h3>
          <p>24/7 confidential support</p>

          <a
            href="tel:988"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-emergency">Call Now</button>
          </a>
        </div>

        {/* Crisis Chat */}
        {/* Crisis Chat */}
      <div className="emergency-card">
        <h3>Crisis Chat</h3>
        <p>Live text support available</p>

        <a
          href="https://findahelpline.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="btn-emergency">Start Chat</button>
        </a>
      </div>


        {/* Local Shelters */}
        <div className="emergency-card">
          <h3>Local Shelters</h3>
          <p>Find nearby safe spaces</p>

          <a
            href="https://www.womenshelters.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-emergency">Find Shelters</button>
          </a>
        </div>

        {/* Safety Planning */}
        <div className="emergency-card">
          <h3>Safety Planning</h3>
          <p>Create your safety plan</p>

          <a
            href="https://www.mysafetyplan.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-emergency">Start Planning</button>
          </a>
        </div>

      </div>
    </section>
  );
}
