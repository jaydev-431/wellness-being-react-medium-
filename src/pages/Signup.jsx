import { useState } from "react";
import axios from "axios";
import "../styles/main.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    role: "victim"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.age || !formData.gender || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.age < 1) {
      setError("Age must be greater than 0");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/signup", {
        fullName: formData.fullName,
        age: parseInt(formData.age),
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (res.data.success) {
        alert(res.data.message);
        window.location.href = "/login";
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      
      {error && <div className="error-msg">{error}</div>}

      <form className="auth-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          min="1"
          value={formData.age}
          onChange={handleChange}
        />

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min. 6 characters)"
          value={formData.password}
          onChange={handleChange}
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="victim">Victim / Survivor</option>
          <option value="counselor">Counselor</option>
          <option value="legal">Legal Advisor</option>
        </select>

        <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
          Create Account
        </button>
      </form>

      <p className="switch-link">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}