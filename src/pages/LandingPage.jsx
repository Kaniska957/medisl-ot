function LandingPage({
  onPatient,
  onHospital,
  onDoctor,
}) {
  return (
    <div className="landing-page">
      <div className="landing-content">

        <div className="landing-logo">
          MediSlot
        </div>

        <h1>Welcome to MediSlot</h1>

        <p className="landing-subtitle">
          How would you like to continue?
        </p>

        <div className="portal-options">

          {/* =========================
              PATIENT PORTAL
          ========================= */}

          <div className="portal-card">

            <div className="portal-icon patient-icon">
              <div className="portal-icon-head"></div>
              <div className="portal-icon-body"></div>
            </div>

            <h2>Patient Portal</h2>

            <p>
              Find hospitals and doctors, book
              appointments, and manage your healthcare
              visits.
            </p>

            <button
              className="primary-btn portal-btn"
              onClick={onPatient}
            >
              Login / Register
            </button>

          </div>

          {/* =========================
              HOSPITAL PORTAL
          ========================= */}

          <div className="portal-card">

            <div className="portal-icon hospital-icon">
              <span>+</span>
            </div>

            <h2>Hospital Portal</h2>

            <p>
              Register your hospital, manage doctors,
              appointments, departments, and
              availability.
            </p>

            <button
              className="primary-btn portal-btn"
              onClick={onHospital}
            >
              Login / Register
            </button>

          </div>

          {/* =========================
              DOCTOR PORTAL
          ========================= */}

          <div className="portal-card">

            <div className="portal-icon doctor-icon">
              <div className="doctor-icon-head"></div>
              <div className="doctor-icon-body"></div>
              <span className="doctor-icon-cross">
                +
              </span>
            </div>

            <h2>Doctor Portal</h2>

            <p>
              View patient appointments, manage your
              schedule, and control your availability.
            </p>

            <button
              className="primary-btn portal-btn"
              onClick={onDoctor}
            >
              Doctor Login
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LandingPage;