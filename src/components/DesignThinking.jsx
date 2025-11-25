import "./DesignThinking.css";

export default function DesignThinking() {
  return (
    <div className="design-thinking-wrapper">

      <h2 className="design-title">Design Thinking & Innovation Approach</h2>

      {/* Step 1 */}
      <div className="step-container">
        <div className="step-number">1. Empathize</div>
        <p className="step-description">
          Understand the challenges faced by victims, counsellors, and legal advisors. 
          Identify emotional, physical, and procedural pain points through real conversations 
          and situational analysis.
        </p>
      </div>

      {/* Step 2 */}
      <div className="step-container">
        <div className="step-number">2. Define</div>
        <p className="step-description">
          Clearly outline the core problem — lack of a centralized, safe, and responsive 
          support platform for individuals in distress. Establish user needs and define 
          measurable goals.
        </p>
      </div>

      {/* Step 3 */}
      <div className="step-container">
        <div className="step-number">3. Ideate</div>
        <p className="step-description">
          Brainstorm innovative solutions such as an interactive web-based platform with 
          gender-responsive and multi-role support features. Explore multiple concepts 
          and evaluate feasibility.
        </p>
      </div>

    </div>
  );
}
