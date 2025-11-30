export default function Hero() {

  const scrollToPathSection = () => {
    const el = document.getElementById("path-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToEmergency = () => {
    const el = document.getElementById("emergency");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>You Are Not Alone</h1>
          <p>
            WellnessBridge is a safe, confidential platform providing support and guidance.
          </p>

          <div className="hero-buttons">
            <button onClick={scrollToPathSection} className="btn btn-primary">
              Get Support
            </button>
            <button onClick={scrollToEmergency} className="btn btn-secondary">
              Emergency Hotline
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}