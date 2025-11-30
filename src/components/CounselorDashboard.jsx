import { useState, useEffect } from "react";
import axios from "axios";

export default function CounselorDashboard() {
  const [confessions, setConfessions] = useState([]);
  const [selectedConfession, setSelectedConfession] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/confessions");
      console.log("Confessions API response:", res.data); // Debug log
      
      // Handle both response formats
      if (res.data.success && res.data.data) {
        setConfessions(res.data.data);
      } else if (Array.isArray(res.data)) {
        setConfessions(res.data);
      } else {
        setConfessions([]);
      }
    } catch (error) {
      console.error("Error fetching confessions:", error);
      console.error("Error details:", error.response?.data);
    }
  };

  const handleReply = async (confessionId) => {
    if (!reply.trim()) {
      alert("Please write a response before sending.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      await axios.post("http://localhost:5001/api/replies", {
        confessionId,
        counselorId: user.id,
        message: reply
      });

      setReply("");
      setSelectedConfession(null);
      alert("Response sent successfully!");
      fetchConfessions(); // Refresh the list
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send response. Please try again.");
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      emotional: "#4CAF50",
      legal: "#2196F3",
      safety: "#f44336",
      financial: "#FF9800",
      housing: "#9C27B0",
      medical: "#00BCD4",
      child: "#FF5722",
      other: "#607D8B"
    };
    return colors[category] || "#607D8B";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Counselor Dashboard</h1>
        <p>Review and respond to victim confessions</p>
      </div>

      <div className="dashboard-content">
        <div className="confessions-list">
          <h3>Pending Confessions ({confessions.filter(c => c.status === "pending").length})</h3>
          
          {confessions.length === 0 ? (
            <p>No confessions available at the moment.</p>
          ) : (
            confessions.map((confession) => (
              <div 
                key={confession._id} 
                className="confession-item"
                onClick={() => setSelectedConfession(confession)}
              >
                <div className="confession-header">
                  <span 
                    className="category-badge"
                    style={{ backgroundColor: getCategoryColor(confession.category) }}
                  >
                    {confession.category.toUpperCase()}
                  </span>
                  <span className="date">
                    {new Date(confession.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {/* USER DETAILS */}
                <div className="user-details">
                  <strong>Victim:</strong> {confession.userId?.fullName || 'Unknown'}
                  <br />
                  <strong>Email:</strong> {confession.userId?.email || 'Unknown'}
                  <br />
                  <strong>Age:</strong> {confession.userId?.age || 'Unknown'} • <strong>Gender:</strong> {confession.userId?.gender || 'Unknown'}
                </div>
                
                <p className="confession-preview">
                  {confession.confession?.substring(0, 150)}...
                </p>
                <div className="confession-status">
                  Status: <span className={`status-${confession.status}`}>
                    {confession.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedConfession && (
          <div className="reply-section">
            <h3>Respond to Confession</h3>
            
            <div className="confession-details">
              <div className="user-info-card">
                <h4>Victim Information</h4>
                <p><strong>Name:</strong> {selectedConfession.userId?.fullName || 'Unknown'}</p>
                <p><strong>Email:</strong> {selectedConfession.userId?.email || 'Unknown'}</p>
                <p><strong>Age:</strong> {selectedConfession.userId?.age || 'Unknown'}</p>
                <p><strong>Gender:</strong> {selectedConfession.userId?.gender || 'Unknown'}</p>
              </div>

              <div className="confession-content">
                <p><strong>Category:</strong> {selectedConfession.category}</p>
                <p><strong>Submitted:</strong> {new Date(selectedConfession.createdAt).toLocaleString()}</p>
                <div className="confession-full">
                  <strong>Victim's Concern:</strong>
                  <p>{selectedConfession.confession}</p>
                </div>
              </div>
            </div>

            <div className="reply-form">
              <label><strong>Your Professional Response:</strong></label>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your professional response here..."
                rows="6"
                className="form-textarea"
              />
              <div className="reply-actions">
                <button 
                  onClick={() => handleReply(selectedConfession._id)}
                  className="btn btn-primary"
                >
                  Send Response to {selectedConfession.userId?.fullName || 'Victim'}
                </button>
                <button 
                  onClick={() => setSelectedConfession(null)}
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