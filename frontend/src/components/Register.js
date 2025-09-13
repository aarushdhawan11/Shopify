import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { registerUser } from "../api/api";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = await registerUser(email, password);
      if (data.success) {
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
