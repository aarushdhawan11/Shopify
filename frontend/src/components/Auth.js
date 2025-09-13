import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { loginUser } from "../api/api";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const data = await loginUser(email, password);

      if (data.success) {
        // Save token and user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="link-text">
        Don't have an account?{" "}
        <span className="link" onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </div>
  );
};

export default Auth;
