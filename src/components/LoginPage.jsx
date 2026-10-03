import { useState } from "react";

function LoginPage({ onLogin, onSignup, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">MediSlot</div>

        <h1>Welcome Back</h1>

        <p>Login to manage your healthcare appointments.</p>

        <form onSubmit={submit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <button type="button" onClick={onSignup}>
            Create Account
          </button>
        </p>

        <button
          type="button"
          className="back-portal-btn"
          onClick={onBack}
        >
          ← Back to Portal Selection
        </button>
      </div>
    </div>
  );
}

export default LoginPage;