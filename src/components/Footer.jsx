export default function Footer() {
  return (
    <footer>
      <div className="container footer-content">

        {/* Left Section */}
        <div className="footer-section">
          <h3>WellnessBridge</h3>
          <p>
            A safe, confidential platform supporting individuals facing domestic violence.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#problem">The Problem</a></li>
            <li><a href="#solution">Our Solution</a></li>
            <li><a href="#emergency">Emergency Resources</a></li>
          </ul>
        </div>

        {/* Team Members */}
        <div className="footer-section">
          <h4>Developed By</h4>
          <ul>
            <li><strong>2400031706 : P. Sritha</strong> (Lead)</li>
            <li>2400030431 : B. Jaydev</li>
            <li>2400030673 : K. Sai Teja</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>Thank You.</p>
      </div>
    </footer>
  );
}
