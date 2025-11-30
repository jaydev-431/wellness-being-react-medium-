import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        alert(res.data.message);
        
        if (res.data.role === "victim") {
          navigate("/victim");
        } else if (res.data.role === "counselor") {
          navigate("/counselor");
        } else if (res.data.role === "legal") {
          navigate("/legal");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {error && <div className="error-msg">{error}</div>}

      <form className="auth-form" onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }} 
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }} 
        />

        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>

      <p className="switch-link">
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}