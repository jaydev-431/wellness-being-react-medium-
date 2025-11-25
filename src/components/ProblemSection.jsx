export default function ProblemSection() {
  return (
    <section id="problem" className="problem-section">
      <div className="container">
        <h2>What Are You Struggling With?</h2>

        <p className="section-subtitle">
          Select the category that best describes the type of issue you or someone you know may be facing.
        </p>

        <div className="problem-cards">

          <div className="problem-card">
            <div className="card-icon"><i className="fas fa-heart-broken"></i></div>
            <h3>Emotional Distress</h3>
            <p>Feeling overwhelmed, anxious, unsafe, or mentally stressed.</p>
          </div>

          <div className="problem-card">
            <div className="card-icon"><i className="fas fa-user-lock"></i></div>
            <h3>Abuse or Threats</h3>
            <p>Physical, emotional, financial, or psychological harm.</p>
          </div>

          <div className="problem-card">
            <div className="card-icon"><i className="fas fa-scale-balanced"></i></div>
            <h3>Legal Confusion</h3>
            <p>Need help understanding rights, laws, or filing a case.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
