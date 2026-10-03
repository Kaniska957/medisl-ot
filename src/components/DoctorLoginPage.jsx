function DoctorLoginPage({
  onLogin,
  onBack,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    onLogin(email, password);
  };

  return (
    <div className="doctor-auth-page">
      <div className="doctor-auth-card">

        <button
          className="doctor-back-btn"
          onClick={onBack}
        >
          ← Back to Portal Selection
        </button>

        <div className="doctor-auth-icon">
          +
        </div>

        <div className="doctor-auth-heading">
          <span>MEDISLOT</span>

          <h1>Doctor Portal</h1>

          <p>
            Sign in to manage your appointments and
            availability.
          </p>
        </div>

        <form
          className="doctor-auth-form"
          onSubmit={handleSubmit}
        >
          <div className="doctor-auth-field">
            <label>Doctor Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="doctor-auth-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="doctor-login-btn"
          >
            Login
          </button>
        </form>

        <div className="doctor-auth-note">
          Doctor accounts are created and managed by the
          hospital administration.
        </div>

      </div>
    </div>
  );
}

export default DoctorLoginPage;