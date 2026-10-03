import { useState } from "react";

function HospitalAppointmentsPage({
  appointments,
  setAppointments,
  setPage,
}) {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "Upcoming"
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  );

  const getAppointments = () => {
    if (activeTab === "Completed") {
      return completedAppointments;
    }

    if (activeTab === "Cancelled") {
      return cancelledAppointments;
    }

    return upcomingAppointments;
  };

  const displayedAppointments = getAppointments();

  const cancelAppointment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status: "Cancelled",
            }
          : appointment
      )
    );
  };

  const markCompleted = (id) => {
    const confirmed = window.confirm(
      "Mark this appointment as completed?"
    );

    if (!confirmed) {
      return;
    }

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status: "Completed",
            }
          : appointment
      )
    );
  };

  return (
    <div className="hospital-management-page">
      <div className="hospital-page-heading">
        <div>
          <span className="hospital-dashboard-label">
            HOSPITAL MANAGEMENT
          </span>

          <h1>Appointments</h1>

          <p>
            View and manage patient appointments for your
            hospital.
          </p>
        </div>
      </div>

      {/* Appointment Statistics */}

      <div className="hospital-appointment-stats">
        <div
          className={
            activeTab === "Upcoming"
              ? "hospital-appointment-stat active"
              : "hospital-appointment-stat"
          }
          onClick={() => setActiveTab("Upcoming")}
        >
          <span>Upcoming</span>
          <strong>{upcomingAppointments.length}</strong>
        </div>

        <div
          className={
            activeTab === "Completed"
              ? "hospital-appointment-stat active"
              : "hospital-appointment-stat"
          }
          onClick={() => setActiveTab("Completed")}
        >
          <span>Completed</span>
          <strong>{completedAppointments.length}</strong>
        </div>

        <div
          className={
            activeTab === "Cancelled"
              ? "hospital-appointment-stat active"
              : "hospital-appointment-stat"
          }
          onClick={() => setActiveTab("Cancelled")}
        >
          <span>Cancelled</span>
          <strong>{cancelledAppointments.length}</strong>
        </div>
      </div>

      {/* Tabs */}

      <div className="hospital-appointment-tabs">
        <button
          className={
            activeTab === "Upcoming" ? "active" : ""
          }
          onClick={() => setActiveTab("Upcoming")}
        >
          Upcoming
        </button>

        <button
          className={
            activeTab === "Completed" ? "active" : ""
          }
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </button>

        <button
          className={
            activeTab === "Cancelled" ? "active" : ""
          }
          onClick={() => setActiveTab("Cancelled")}
        >
          Cancelled
        </button>
      </div>

      {/* Appointment List */}

      <div className="hospital-appointments-list-card">
        {displayedAppointments.length === 0 ? (
          <div className="hospital-empty-state">
            <h3>
              No {activeTab.toLowerCase()} appointments
            </h3>

            <p>
              Appointments in this category will appear here.
            </p>
          </div>
        ) : (
          <div className="hospital-managed-appointments">
            {displayedAppointments.map((appointment) => (
              <div
                className="hospital-managed-appointment"
                key={appointment.id}
              >
                {/* Patient */}

                <div className="managed-patient-section">
                  <div className="hospital-patient-avatar">
                    {appointment.patient
                      ?.charAt(0)
                      .toUpperCase() || "P"}
                  </div>

                  <div>
                    <h3>
                      {appointment.patient || "Patient"}
                    </h3>

                    <span>Patient</span>
                  </div>
                </div>

                {/* Doctor */}

                <div className="managed-appointment-info">
                  <span>Doctor</span>

                  <strong>
                    {appointment.doctor}
                  </strong>

                  <small>
                    {appointment.specialty}
                  </small>
                </div>

                {/* Date */}

                <div className="managed-appointment-info">
                  <span>Date</span>

                  <strong>
                    {appointment.date}
                  </strong>
                </div>

                {/* Time */}

                <div className="managed-appointment-info">
                  <span>Time</span>

                  <strong>
                    {appointment.time}
                  </strong>
                </div>

                {/* Fee */}

                <div className="managed-appointment-info">
                  <span>Fee</span>

                  <strong>
                    ₹{appointment.fee}
                  </strong>
                </div>

                {/* Status / Actions */}

                <div className="managed-appointment-actions">
                  <span
                    className={`status ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>

                  {appointment.status === "Upcoming" && (
                    <div className="hospital-appointment-buttons">
                      <button
                        className="complete-appointment-btn"
                        onClick={() =>
                          markCompleted(
                            appointment.id
                          )
                        }
                      >
                        Complete
                      </button>

                      <button
                        className="cancel-appointment-btn"
                        onClick={() =>
                          cancelAppointment(
                            appointment.id
                          )
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}

      <div className="hospital-management-actions">
        <button
          className="hospital-secondary-btn"
          onClick={() =>
            setPage("hospital-dashboard")
          }
        >
          ← Back to Dashboard
        </button>

        <button
          className="primary-btn"
          onClick={() => setPage("doctors")}
        >
          Manage Doctors →
        </button>
      </div>
    </div>
  );
}

export default HospitalAppointmentsPage;