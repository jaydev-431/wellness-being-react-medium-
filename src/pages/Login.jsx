import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      alert(res.data.message);

      if (res.data.role === "victim") {
        window.location.href = "/victim";
      } else if (res.data.role === "counselor") {
        window.location.href = "/counselor";
      } else if (res.data.role === "legal") {
        window.location.href = "/legal";
      }

    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <div className="auth-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>
      </div>

      <p className="switch-link">
        Don’t have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
}
