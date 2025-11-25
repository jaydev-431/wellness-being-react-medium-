import { useState } from "react";
import axios from "axios";
import "../styles/main.css";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("victim");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/signup", {
        fullName,
        age,
        email,
        password,
        role,
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>

      <form className="auth-form" onSubmit={handleSignup}>
        
        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="victim">Victim / Survivor</option>
          <option value="counselor">Counselor</option>
          <option value="legal">Legal Advisor</option>
        </select>

        <button className="btn btn-primary" style={{ width: "100%" }}>
          Signup
        </button>
      </form>
    </div>
  );
}
