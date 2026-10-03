function HospitalDashboardPage({
  hospital,
  appointments,
  setPage,
}) {
  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "Upcoming"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  );

  return (
    <div className="hospital-dashboard">
      <div className="hospital-dashboard-header">
        <div>
          <span className="hospital-dashboard-label">
            HOSPITAL PORTAL
          </span>

          <h1>Welcome, {hospital?.hospitalName}</h1>

          <p>
            Manage your hospital operations, doctors, and
            appointments from one place.
          </p>
        </div>

        <div className="hospital-status">
          <span className="status-dot"></span>
          Hospital Active
        </div>
      </div>

      {/* Statistics */}

      <div className="hospital-stats-grid">
        <div className="hospital-stat-card">
          <span>Total Appointments</span>
          <strong>{appointments.length}</strong>
          <small>All appointments</small>
        </div>

        <div className="hospital-stat-card">
          <span>Upcoming</span>
          <strong>{upcomingAppointments.length}</strong>
          <small>Appointments scheduled</small>
        </div>

        <div className="hospital-stat-card">
          <span>Completed</span>
          <strong>{completedAppointments.length}</strong>
          <small>Visits completed</small>
        </div>

        <div className="hospital-stat-card">
          <span>Cancelled</span>
          <strong>{cancelledAppointments.length}</strong>
          <small>Cancelled appointments</small>
        </div>
      </div>

      {/* Main Dashboard */}

      <div className="hospital-dashboard-grid">
        {/* Quick Actions */}

        <div className="hospital-panel">
          <div className="hospital-panel-header">
            <div>
              <h2>Hospital Management</h2>
              <p>Manage your hospital services.</p>
            </div>
          </div>

          <div className="hospital-action-grid">
            <button
              className="hospital-action-card"
              onClick={() => setPage("hospital-profile")}
            >
              <div className="hospital-action-icon">
                +
              </div>

              <div>
                <strong>Hospital Profile</strong>
                <span>
                  View hospital information
                </span>
              </div>
            </button>

            <button
              className="hospital-action-card"
              onClick={() => setPage("departments")}
            >
              <div className="hospital-action-icon">
                +
              </div>

              <div>
                <strong>Departments</strong>
                <span>
                  Manage hospital departments
                </span>
              </div>
            </button>

            <button
              className="hospital-action-card"
              onClick={() => setPage("doctors")}
            >
              <div className="hospital-action-icon">
                +
              </div>

              <div>
                <strong>Doctors</strong>
                <span>
                  Manage doctors and availability
                </span>
              </div>
            </button>

            <button
              className="hospital-action-card"
              onClick={() => setPage("hospital-appointments")}
            >
              <div className="hospital-action-icon">
                +
              </div>

              <div>
                <strong>Appointments</strong>
                <span>
                  View and manage appointments
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Upcoming Appointments */}

        <div className="hospital-panel">
          <div className="hospital-panel-header">
            <div>
              <h2>Upcoming Appointments</h2>
              <p>Recently scheduled patient visits.</p>
            </div>

            <button
              className="hospital-view-btn"
              onClick={() =>
                setPage("hospital-appointments")
              }
            >
              View All
            </button>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="hospital-empty-state">
              <h3>No upcoming appointments</h3>
              <p>
                New patient appointments will appear here.
              </p>
            </div>
          ) : (
            <div className="hospital-appointment-list">
              {upcomingAppointments
                .slice(0, 4)
                .map((appointment) => (
                  <div
                    className="hospital-appointment-row"
                    key={appointment.id}
                  >
                    <div className="hospital-patient-avatar">
                      {appointment.patient
                        ?.charAt(0)
                        .toUpperCase() || "P"}
                    </div>

                    <div className="hospital-appointment-main">
                      <strong>
                        {appointment.patient || "Patient"}
                      </strong>

                      <span>
                        {appointment.doctor}
                      </span>
                    </div>

                    <div className="hospital-appointment-time">
                      <strong>
                        {appointment.date}
                      </strong>

                      <span>
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Hospital Information */}

      <div className="hospital-info-panel">
        <div>
          <span>Hospital</span>
          <strong>{hospital?.hospitalName}</strong>
        </div>

        <div>
          <span>Location</span>
          <strong>{hospital?.location}</strong>
        </div>

        <div>
          <span>Phone</span>
          <strong>{hospital?.phone}</strong>
        </div>

        <div>
          <span>Hospital Registration</span>
          <strong>
            {hospital?.registrationNumber}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboardPage;