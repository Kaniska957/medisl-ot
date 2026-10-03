function DoctorDashboardPage({
  doctor,
  appointments,
  setPage,
}) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Upcoming"
  );

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Completed"
  );

  const todayAppointments = appointments.filter(
    (appointment) =>
      appointment.date === today &&
      appointment.status === "Upcoming"
  );

  const recentAppointments = [...appointments]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="doctor-dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="doctor-dashboard-header">
        <div>
          <span className="doctor-dashboard-label">
            DOCTOR PORTAL
          </span>

          <h1>
            Welcome, {doctor?.name || "Doctor"}
          </h1>

          <p>
            Manage your appointments and daily schedule
            from one place.
          </p>
        </div>

        <div className="doctor-specialty-card">
          <span>Specialization</span>

          <strong>
            {doctor?.specialty || "Medical Specialist"}
          </strong>
        </div>
      </div>

      {/* =========================
          STATISTICS
      ========================= */}

      <div className="doctor-stat-grid">

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon">
            +
          </div>

          <div>
            <span>Today's Appointments</span>
            <strong>
              {todayAppointments.length}
            </strong>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon">
            +
          </div>

          <div>
            <span>Upcoming</span>
            <strong>
              {upcomingAppointments.length}
            </strong>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon">
            +
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {completedAppointments.length}
            </strong>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="doctor-stat-icon">
            +
          </div>

          <div>
            <span>Consultation Fee</span>
            <strong>
              ₹{doctor?.fee || 0}
            </strong>
          </div>
        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="doctor-dashboard-grid">

        {/* TODAY'S APPOINTMENTS */}

        <div className="doctor-dashboard-card doctor-today-card">

          <div className="doctor-card-header">
            <div>
              <h2>Today's Appointments</h2>

              <p>
                Your scheduled patient visits for today.
              </p>
            </div>

            <button
              onClick={() =>
                setPage("doctor-appointments")
              }
            >
              View All →
            </button>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="doctor-empty-state">
              <h3>No appointments today</h3>

              <p>
                Your schedule is clear for today.
              </p>
            </div>
          ) : (
            <div className="doctor-today-list">

              {todayAppointments.map(
                (appointment) => (
                  <div
                    className="doctor-appointment-row"
                    key={appointment.id}
                  >

                    <div className="doctor-patient-avatar">
                      {appointment.patient
                        ?.charAt(0)
                        .toUpperCase() || "P"}
                    </div>

                    <div className="doctor-patient-info">
                      <h3>
                        {appointment.patient ||
                          "Patient"}
                      </h3>

                      <span>
                        {appointment.specialty}
                      </span>
                    </div>

                    <div className="doctor-appointment-time">
                      <span>Time</span>

                      <strong>
                        {appointment.time}
                      </strong>
                    </div>

                    <span className="doctor-upcoming-status">
                      Upcoming
                    </span>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* QUICK ACTIONS */}

        <div className="doctor-dashboard-card">

          <div className="doctor-card-header">
            <div>
              <h2>Quick Actions</h2>

              <p>
                Manage your doctor account.
              </p>
            </div>
          </div>

          <div className="doctor-quick-actions">

            <button
              onClick={() =>
                setPage("doctor-appointments")
              }
            >
              <span>+</span>

              <div>
                <strong>
                  My Appointments
                </strong>

                <small>
                  View and manage patient visits
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                setPage("doctor-schedule")
              }
            >
              <span>+</span>

              <div>
                <strong>
                  My Schedule
                </strong>

                <small>
                  View your available time slots
                </small>
              </div>
            </button>

            <button
              onClick={() =>
                setPage("doctor-availability")
              }
            >
              <span>+</span>

              <div>
                <strong>
                  Availability
                </strong>

                <small>
                  Manage when patients can book
                </small>
              </div>
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          RECENT APPOINTMENTS
      ========================= */}

      <div className="doctor-dashboard-card doctor-recent-card">

        <div className="doctor-card-header">
          <div>
            <h2>Recent Appointments</h2>

            <p>
              Latest appointments associated with you.
            </p>
          </div>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="doctor-empty-state">
            <h3>No appointments yet</h3>

            <p>
              Patient appointments will appear here after
              they book a consultation.
            </p>
          </div>
        ) : (
          <div className="doctor-recent-table">

            <div className="doctor-table-header">
              <span>Patient</span>
              <span>Date</span>
              <span>Time</span>
              <span>Status</span>
            </div>

            {recentAppointments.map(
              (appointment) => (
                <div
                  className="doctor-table-row"
                  key={appointment.id}
                >
                  <strong>
                    {appointment.patient ||
                      "Patient"}
                  </strong>

                  <span>
                    {appointment.date}
                  </span>

                  <span>
                    {appointment.time}
                  </span>

                  <span
                    className={`doctor-status ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default DoctorDashboardPage;