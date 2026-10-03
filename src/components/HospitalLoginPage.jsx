import { useState } from "react";

function HospitalLoginPage({ onLogin, onSignup, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-card hospital-auth-card">
        <div className="auth-logo">MediSlot</div>

        <div className="portal-label">HOSPITAL PORTAL</div>

        <h1>Hospital Login</h1>

        <p>
          Login to manage your hospital, doctors, and appointments.
        </p>

        <form onSubmit={submit}>
          <label>Hospital Email</label>

          <input
            type="email"
            placeholder="Enter hospital email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have a hospital account?{" "}
          <button onClick={onSignup}>
            Register Hospital
          </button>
        </p>

        <button className="back-portal-btn" onClick={onBack}>
          ← Back to Portal Selection
        </button>
      </div>
    </div>
  );
}

export default HospitalLoginPage;