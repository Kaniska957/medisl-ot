function AppointmentsPage({
  appointments,
  getAppointmentStatus,
  onCancel,
  onReschedule,
}) {
  return (
    <div className="appointments-page">
      <div className="page-heading">
        <div>
          <h1>My Appointments</h1>
          <p>View and manage your healthcare appointments.</p>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-state">
          <h3>No appointments yet</h3>
          <p>Your booked appointments will appear here.</p>
        </div>
      ) : (
        <div className="appointments-list">
          {[...appointments]
            .reverse()
            .map((appointment) => {
              const status = getAppointmentStatus(appointment);

              return (
                <div
                  className="appointment-card"
                  key={appointment.id}
                >
                  <div className="appointment-doctor">
                    <div className="doctor-avatar">
                      {appointment.doctor
                        .replace("Dr. ", "")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>{appointment.doctor}</h3>
                      <p>{appointment.specialty}</p>
                    </div>
                  </div>

                  <div className="appointment-info">
                    <span>Date</span>
                    <strong>{appointment.date}</strong>
                  </div>

                  <div className="appointment-info">
                    <span>Time</span>
                    <strong>{appointment.time}</strong>
                  </div>

                  <div className="appointment-info">
                    <span>Hospital</span>
                    <strong>{appointment.hospital}</strong>
                  </div>

                  <div className="appointment-info">
                    <span>Fee</span>
                    <strong>₹{appointment.fee}</strong>
                  </div>

                  <div className="appointment-status-area">
                    <span className={`status ${status.toLowerCase()}`}>
                      {status}
                    </span>

                    {status === "Upcoming" && (
                      <div className="appointment-actions">
                        <button
                          className="reschedule-btn"
                          onClick={() => onReschedule(appointment)}
                        >
                          Reschedule
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => onCancel(appointment.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;