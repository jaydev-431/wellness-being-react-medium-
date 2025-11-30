import { useState, useEffect } from "react";
import axios from "axios";

export default function VictimDashboard() {
  const [confession, setConfession] = useState("");
  const [category, setCategory] = useState("emotional");
  const [submitted, setSubmitted] = useState(false);
  const [myConfessions, setMyConfessions] = useState([]);
  const [viewMode, setViewMode] = useState("submit"); 

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && viewMode === "view") {
      fetchMyConfessions();
    }
  }, [viewMode, user]);

  const fetchMyConfessions = async () => {
  try {
    const res = await axios.get(`http://localhost:5001/api/my-confessions/${user.id}`);
    console.log("Confessions API response:", res.data); // Debug log
    setMyConfessions(res.data.data || res.data); // Handle both response formats
  } catch (error) {
    console.error("Error fetching confessions:", error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submit button clicked");
    
    if (!confession.trim()) {
      alert("Please write your confession before submitting.");
      return;
    }

    console.log("User from localStorage:", user);
    
    if (!user || !user.id) {
      alert("Please login first. Redirecting to login...");
      window.location.href = "/login";
      return;
    }

    try {
      console.log("Sending confession to server...");
      console.log("Data being sent:", {
        userId: user.id,
        category,
        confession,
        status: "pending"
      });
      
      const res = await axios.post("http://localhost:5001/api/confessions", {
        userId: user.id,
        category,
        confession,
        status: "pending"
      });

      console.log("Server response:", res.data);

      if (res.data.success) {
        setSubmitted(true);
        setConfession("");
        alert("Your confession has been submitted successfully!");
        fetchMyConfessions();
      }
    } catch (error) {
      console.error("Submission error:", error);
      console.error("Error response:", error.response?.data);
      alert("Failed to submit confession: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Victim Support Dashboard</h1>
        <p>Share your concerns confidentially. We're here to help you.</p>
        
        <div className="view-toggle">
          <button 
            className={`btn ${viewMode === "submit" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setViewMode("submit")}
          >
            Submit New Concern
          </button>
          <button 
            className={`btn ${viewMode === "view" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setViewMode("view")}
          >
            View My Submissions & Replies
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {viewMode === "submit" ? (
          !submitted ? (
            <form className="confession-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category of Issue:</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="emotional">Emotional/Mental Health Issue</option>
                  <option value="legal">Legal Issue (Domestic Violence, Harassment)</option>
                  <option value="safety">Safety Concern</option>
                  <option value="financial">Financial Abuse</option>
                  <option value="housing">Housing/Shelter Need</option>
                  <option value="medical">Medical Assistance</option>
                  <option value="child">Child Protection Issue</option>
                  <option value="other">Other Issue</option>
                </select>
              </div>

              <div className="form-group">
                <label>Share Your Concern (Confidential):</label>
                <textarea
                  value={confession}
                  onChange={(e) => setConfession(e.target.value)}
                  placeholder="Please enter you confession here..."
                  rows="10"
                  className="form-textarea"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Confession
              </button>
            </form>
          ) : (
            <div className="success-message">
              <h3>Thank You for Sharing</h3>
              <p>Your confession has been received. A trained counselor will review it and respond within 24 hours.</p>
              <p>You can view responses in "View My Submissions & Replies" section.</p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setViewMode("view");
                }}
                className="btn btn-secondary"
              >
                View My Submissions
              </button>
            </div>
          )
        ) : (
          <div className="my-confessions">
            <h3>My Submissions & Responses</h3>
            
            {myConfessions.length === 0 ? (
              <p>You haven't submitted any concerns yet.</p>
            ) : (
              myConfessions.map((confession) => (
                <div key={confession._id} className="confession-with-reply">
                  <div className="submission-details">
                    <div className="submission-header">
                      <span className="category">{confession.category.toUpperCase()}</span>
                      <span className="date">
                        Submitted: {new Date(confession.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`status status-${confession.status}`}>
                        {confession.status}
                      </span>
                    </div>
                    <div className="my-confession">
                      <strong>My Concern:</strong>
                      <p>{confession.confession}</p>
                    </div>
                  </div>

                  {confession.counselorReply && (
                    <div className="counselor-response">
                      <div className="response-header">
                        <strong>Counselor's Response</strong>
                        {confession.counselorId && (
                          <span>by {confession.counselorId.fullName}</span>
                        )}
                        <span className="response-date">
                          {new Date(confession.counselorRepliedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="response-message">
                        {confession.counselorReply}
                      </div>
                    </div>
                  )}

                  {confession.legalAdvice && (
                    <div className="legal-response">
                      <div className="response-header">
                        <strong>Legal Advisor's Guidance</strong>
                        {confession.legalAdvisorId && (
                          <span>by {confession.legalAdvisorId.fullName}</span>
                        )}
                        <span className="response-date">
                          {new Date(confession.legalAdvisedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="response-message">
                        {confession.legalAdvice}
                      </div>
                    </div>
                  )}

                  {!confession.counselorReply && (
                    <div className="pending-response">
                      <p>Your concern is being reviewed by our counselors. You will receive a response soon.</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        <div className="resources-panel">
          <h3>Immediate Help Resources</h3>
          <div className="resource-cards">
            <div className="resource-card">
              <i className="fas fa-phone"></i>
              <h4>Emergency Hotline</h4>
              <p>Call 24/7 for immediate assistance</p>
              <a href="tel:988" className="btn btn-emergency">Call Now</a>
            </div>
            
            <div className="resource-card">
              <i className="fas fa-shield-alt"></i>
              <h4>Safety Planning</h4>
              <p>Create your personal safety plan</p>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}