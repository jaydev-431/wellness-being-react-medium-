import { useState, useEffect } from "react";
import axios from "axios";

export default function LegalDashboard() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [legalAdvice, setLegalAdvice] = useState("");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/legal-cases");
      setCases(res.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  const handleProvideAdvice = async (caseId) => {
    if (!legalAdvice.trim()) {
      alert("Please provide legal advice before submitting.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      await axios.post("http://localhost:5000/api/legal-advice", {
        caseId,
        legalAdvisorId: user.id,
        advice: legalAdvice,
        timestamp: new Date()
      });

      setLegalAdvice("");
      setSelectedCase(null);
      alert("Legal advice submitted successfully!");
      fetchCases(); // Refresh the list
    } catch (error) {
      console.error("Error submitting advice:", error);
      alert("Failed to submit advice. Please try again.");
    }
  };

  const getCasePriority = (category) => {
    const priorities = {
      legal: "High",
      safety: "High", 
      child: "High",
      financial: "Medium",
      housing: "Medium",
      medical: "Medium",
      emotional: "Low",
      other: "Low"
    };
    return priorities[category] || "Low";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Legal Advisor Dashboard</h1>
        <p>Provide legal assistance and guidance to victims</p>
      </div>

      <div className="dashboard-content">
        <div className="cases-list">
          <h3>Legal Cases Requiring Assistance ({cases.filter(c => c.legalStatus === "pending").length})</h3>
          
          {cases.length === 0 ? (
            <p>No legal cases requiring assistance at the moment.</p>
          ) : (
            cases.map((legalCase) => (
              <div 
                key={legalCase._id} 
                className="case-item"
                onClick={() => setSelectedCase(legalCase)}
              >
                <div className="case-header">
                  <span className="case-category">{legalCase.category.toUpperCase()}</span>
                  <span className={`priority-${getCasePriority(legalCase.category).toLowerCase()}`}>
                    Priority: {getCasePriority(legalCase.category)}
                  </span>
                </div>
                <p className="case-preview">
                  {legalCase.confession.substring(0, 120)}...
                </p>
                <div className="case-meta">
                  <span>Counselor Response: {legalCase.counselorReply ? "✅" : "⏳"}</span>
                  <span>Legal Status: {legalCase.legalStatus}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedCase && (
          <div className="legal-advice-section">
            <h3>Provide Legal Assistance</h3>
            
            <div className="case-details">
              <div className="detail-row">
                <strong>Case Category:</strong> {selectedCase.category}
              </div>
              <div className="detail-row">
                <strong>Priority:</strong> 
                <span className={`priority-${getCasePriority(selectedCase.category).toLowerCase()}`}>
                  {getCasePriority(selectedCase.category)}
                </span>
              </div>
              <div className="detail-row">
                <strong>Victim's Statement:</strong>
                <div className="victim-statement">
                  {selectedCase.confession}
                </div>
              </div>
              
              {selectedCase.counselorReply && (
                <div className="detail-row">
                  <strong>Counselor's Assessment:</strong>
                  <div className="counselor-assessment">
                    {selectedCase.counselorReply}
                  </div>
                </div>
              )}
            </div>

            <div className="legal-advice-form">
              <h4>Your Legal Advice:</h4>
              <textarea
                value={legalAdvice}
                onChange={(e) => setLegalAdvice(e.target.value)}
                placeholder="Provide detailed legal advice, including:
• Applicable laws and rights
• Recommended legal actions
• Documentation requirements
• Next steps for the victim
• Any immediate legal protections available"
                rows="8"
                className="form-textarea"
              />
              
              <div className="advice-templates">
                <h5>Quick Templates:</h5>
                <div className="template-buttons">
                  <button 
                    onClick={() => setLegalAdvice("Based on your situation, I recommend documenting all incidents with dates, times, and evidence. You have the right to file for a protection order immediately.")}
                    className="btn btn-small"
                  >
                    Protection Order Advice
                  </button>
                  <button 
                    onClick={() => setLegalAdvice("You should gather financial documents, bank statements, and evidence of economic abuse. Consider consulting with a family law attorney about your financial rights.")}
                    className="btn btn-small"
                  >
                    Financial Abuse Guidance
                  </button>
                  <button 
                    onClick={() => setLegalAdvice("For child-related concerns, document all incidents affecting the children. Contact child protective services and consider emergency custody arrangements if safety is immediate concern.")}
                    className="btn btn-small"
                  >
                    Child Protection Steps
                  </button>
                </div>
              </div>

              <div className="advice-actions">
                <button 
                  onClick={() => handleProvideAdvice(selectedCase._id)}
                  className="btn btn-primary"
                >
                  Submit Legal Advice
                </button>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}