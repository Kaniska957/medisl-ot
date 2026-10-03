function ProfilePage({
  user,
  appointments,
  upcomingAppointments,
  completedAppointments,
  setPage,
  onLogout,
}) {
  return (
    <div className="profile-page">
      <div className="page-heading">
        <div>
          <h1>My Profile</h1>
          <p>View your account information and appointment activity.</p>
        </div>
      </div>

      <div className="profile-layout">
        <div className="profile-card profile-main-card">
          <div className="large-profile-avatar">
            <div className="profile-icon-head"></div>
            <div className="profile-icon-body"></div>
          </div>

          <h2>{user?.name}</h2>
          <p>{user?.email}</p>

          <span className="profile-badge">Patient Account</span>
        </div>

        <div className="profile-details-card">
          <h2>Account Information</h2>

          <div className="profile-info-row">
            <span>Full Name</span>
            <strong>{user?.name}</strong>
          </div>

          <div className="profile-info-row">
            <span>Email Address</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="profile-info-row">
            <span>Account Type</span>
            <strong>Patient</strong>
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat-card">
          <span>Total Appointments</span>
          <strong>{appointments.length}</strong>
        </div>

        <div className="profile-stat-card">
          <span>Upcoming Appointments</span>
          <strong>{upcomingAppointments.length}</strong>
        </div>

        <div className="profile-stat-card">
          <span>Completed Appointments</span>
          <strong>{completedAppointments.length}</strong>
        </div>
      </div>

      <div className="profile-actions-card">
        <h2>Quick Actions</h2>

        <div className="profile-action-buttons">
          <button
            className="primary-btn"
            onClick={() => setPage("appointments")}
          >
            View My Appointments
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("hospitals")}
          >
            Book an Appointment
          </button>

          <button
            className="logout-profile-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;