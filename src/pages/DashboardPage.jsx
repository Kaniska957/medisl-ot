import hospitals from "../data/hospitals";

function DashboardPage({
  user,
  appointments,
  upcomingAppointments,
  completedAppointments,
  recentAppointment,
  setPage,
}) {
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p>Manage your healthcare appointments easily.</p>
        </div>
      </div>

      <section className="hero-section">
        <div>
          <span className="hero-label">HEALTHCARE APPOINTMENTS</span>

          <h1>
            Find the right doctor
            <br />
            at the right time.
          </h1>

          <p>
            Browse registered hospitals, choose your department and doctor,
            and book your appointment in a few simple steps.
          </p>

          <button
            className="primary-btn hero-btn"
            onClick={() => setPage("hospitals")}
          >
            Book an Appointment
          </button>
        </div>
      </section>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Appointments</span>
          <strong>{appointments.length}</strong>
        </div>

        <div className="stat-card">
          <span>Upcoming</span>
          <strong>{upcomingAppointments.length}</strong>
        </div>

        <div className="stat-card">
          <span>Completed</span>
          <strong>{completedAppointments.length}</strong>
        </div>

        <div className="stat-card">
          <span>Registered Hospitals</span>
          <strong>{hospitals.length}</strong>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="dashboard-card">
          <div className="card-heading">
            <h2>Upcoming Appointment</h2>

            <button onClick={() => setPage("appointments")}>
              View All
            </button>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="empty-state">
              <p>No upcoming appointments.</p>

              <button
                className="primary-btn"
                onClick={() => setPage("hospitals")}
              >
                Book Appointment
              </button>
            </div>
          ) : (
            <div className="appointment-preview">
              <div>
                <strong>{upcomingAppointments[0].doctor}</strong>
                <span>{upcomingAppointments[0].specialty}</span>
              </div>

              <div>
                <strong>{upcomingAppointments[0].date}</strong>
                <span>{upcomingAppointments[0].time}</span>
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <h2>Recent Activity</h2>
          </div>

          {recentAppointment ? (
            <div className="recent-activity">
              <strong>{recentAppointment.doctor}</strong>

              <div className="recent-details">
                <span>{recentAppointment.specialty}</span>
                <span>{recentAppointment.hospital}</span>
                <span>{recentAppointment.date}</span>
              </div>

              <span
                className={`status ${recentAppointment.status.toLowerCase()}`}
              >
                {getDisplayStatus(recentAppointment, new Date())}
              </span>
            </div>
          ) : (
            <div className="empty-state">
              <p>No recent activity.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getDisplayStatus(appointment, currentDate) {
  if (appointment.status === "Cancelled") return "Cancelled";

  const appointmentDate = new Date(appointment.date);

  if (appointmentDate < currentDate) return "Completed";

  return "Upcoming";
}

export default DashboardPage;