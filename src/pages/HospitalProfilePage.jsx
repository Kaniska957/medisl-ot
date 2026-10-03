function HospitalProfilePage({
  hospital,
  appointments,
  setPage,
  onLogout,
}) {
  return (
    <div className="hospital-profile-page">
      <div className="hospital-page-heading">
        <div>
          <span className="hospital-dashboard-label">
            HOSPITAL PORTAL
          </span>

          <h1>Hospital Profile</h1>

          <p>
            View your hospital registration and administrator
            information.
          </p>
        </div>
      </div>

      <div className="hospital-profile-layout">
        {/* Hospital Overview */}

        <div className="hospital-profile-main-card">
          <div className="hospital-profile-icon">
            <span>+</span>
          </div>

          <h2>{hospital?.hospitalName}</h2>

          <p>{hospital?.location}</p>

          <span className="hospital-profile-badge">
            Registered Hospital
          </span>
        </div>

        {/* Hospital Information */}

        <div className="hospital-profile-details">
          <h2>Hospital Information</h2>

          <div className="hospital-profile-row">
            <span>Hospital Name</span>
            <strong>{hospital?.hospitalName}</strong>
          </div>

          <div className="hospital-profile-row">
            <span>Hospital Email</span>
            <strong>{hospital?.hospitalEmail}</strong>
          </div>

          <div className="hospital-profile-row">
            <span>Phone Number</span>
            <strong>{hospital?.phone}</strong>
          </div>

          <div className="hospital-profile-row">
            <span>Location</span>
            <strong>{hospital?.location}</strong>
          </div>

          <div className="hospital-profile-row">
            <span>Address</span>
            <strong>{hospital?.address}</strong>
          </div>

          <div className="hospital-profile-row">
            <span>Registration Number</span>
            <strong>
              {hospital?.registrationNumber}
            </strong>
          </div>
        </div>
      </div>

      {/* Administrator Information */}

      <div className="hospital-admin-card">
        <h2>Administrator Information</h2>

        <div className="hospital-admin-grid">
          <div>
            <span>Administrator Name</span>
            <strong>{hospital?.adminName}</strong>
          </div>

          <div>
            <span>Administrator Email</span>
            <strong>{hospital?.adminEmail}</strong>
          </div>

          <div>
            <span>Account Type</span>
            <strong>Hospital Administrator</strong>
          </div>
        </div>
      </div>

      {/* Activity */}

      <div className="hospital-profile-stats">
        <div>
          <span>Total Appointments</span>
          <strong>{appointments.length}</strong>
        </div>

        <div>
          <span>Hospital Status</span>
          <strong className="active-text">
            Active
          </strong>
        </div>
      </div>

      {/* Actions */}

      <div className="hospital-profile-actions">
        <button
          className="hospital-secondary-btn"
          onClick={() => setPage("hospital-dashboard")}
        >
          ← Back to Dashboard
        </button>

        <button
          className="hospital-logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default HospitalProfilePage;