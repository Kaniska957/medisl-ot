import { useState } from "react";

function DoctorAppointmentsPage({
  appointments,
  setAppointments,
  setPage,
}) {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Upcoming"
  );

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Completed"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Cancelled"
  );

  const getDisplayedAppointments = () => {
    if (activeTab === "Completed") {
      return completedAppointments;
    }

    if (activeTab === "Cancelled") {
      return cancelledAppointments;
    }

    return upcomingAppointments;
  };

  const displayedAppointments =
    getDisplayedAppointments();

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

  return (
    <div className="doctor-management-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="doctor-page-heading">
        <div>
          <span className="doctor-dashboard-label">
            DOCTOR PORTAL
          </span>

          <h1>My Appointments</h1>

          <p>
            View and manage your patient appointments.
          </p>
        </div>
      </div>

      {/* =========================
          APPOINTMENT STATISTICS
      ========================= */}

      <div className="doctor-appointment-stats">

        <div
          className={
            activeTab === "Upcoming"
              ? "doctor-appointment-stat active"
              : "doctor-appointment-stat"
          }
          onClick={() => setActiveTab("Upcoming")}
        >
          <span>Upcoming</span>

          <strong>
            {upcomingAppointments.length}
          </strong>
        </div>

        <div
          className={
            activeTab === "Completed"
              ? "doctor-appointment-stat active"
              : "doctor-appointment-stat"
          }
          onClick={() => setActiveTab("Completed")}
        >
          <span>Completed</span>

          <strong>
            {completedAppointments.length}
          </strong>
        </div>

        <div
          className={
            activeTab === "Cancelled"
              ? "doctor-appointment-stat active"
              : "doctor-appointment-stat"
          }
          onClick={() => setActiveTab("Cancelled")}
        >
          <span>Cancelled</span>

          <strong>
            {cancelledAppointments.length}
          </strong>
        </div>

      </div>

      {/* =========================
          TABS
      ========================= */}

      <div className="doctor-appointment-tabs">

        <button
          className={
            activeTab === "Upcoming"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("Upcoming")
          }
        >
          Upcoming
        </button>

        <button
          className={
            activeTab === "Completed"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("Completed")
          }
        >
          Completed
        </button>

        <button
          className={
            activeTab === "Cancelled"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("Cancelled")
          }
        >
          Cancelled
        </button>

      </div>

      {/* =========================
          APPOINTMENTS
      ========================= */}

      <div className="doctor-appointments-card">

        {displayedAppointments.length === 0 ? (
          <div className="doctor-empty-state">

            <h3>
              No {activeTab.toLowerCase()} appointments
            </h3>

            <p>
              Patient appointments in this category
              will appear here.
            </p>

          </div>
        ) : (
          <div className="doctor-appointment-list">

            {displayedAppointments.map(
              (appointment) => (
                <div
                  className="doctor-managed-appointment"
                  key={appointment.id}
                >

                  {/* PATIENT */}

                  <div className="doctor-managed-patient">
                    <div className="doctor-managed-avatar">
                      {appointment.patient
                        ?.charAt(0)
                        .toUpperCase() || "P"}
                    </div>

                    <div>
                      <h3>
                        {appointment.patient ||
                          "Patient"}
                      </h3>

                      <span>
                        Patient
                      </span>
                    </div>
                  </div>

                  {/* DATE */}

                  <div className="doctor-managed-info">
                    <span>Date</span>

                    <strong>
                      {appointment.date}
                    </strong>
                  </div>

                  {/* TIME */}

                  <div className="doctor-managed-info">
                    <span>Time</span>

                    <strong>
                      {appointment.time}
                    </strong>
                  </div>

                  {/* DEPARTMENT */}

                  <div className="doctor-managed-info">
                    <span>Department</span>

                    <strong>
                      {appointment.specialty}
                    </strong>
                  </div>

                  {/* FEE */}

                  <div className="doctor-managed-info">
                    <span>Fee</span>

                    <strong>
                      ₹{appointment.fee}
                    </strong>
                  </div>

                  {/* ACTIONS */}

                  <div className="doctor-managed-actions">

                    <span
                      className={`doctor-status ${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>

                    {appointment.status ===
                      "Upcoming" && (
                      <div className="doctor-action-buttons">

                        <button
                          className="doctor-complete-btn"
                          onClick={() =>
                            markCompleted(
                              appointment.id
                            )
                          }
                        >
                          Complete
                        </button>

                        <button
                          className="doctor-cancel-btn"
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
              )
            )}

          </div>
        )}

      </div>

      {/* =========================
          NAVIGATION
      ========================= */}

      <div className="doctor-management-actions">

        <button
          className="doctor-secondary-btn"
          onClick={() =>
            setPage("doctor-dashboard")
          }
        >
          ← Back to Dashboard
        </button>

        <button
          className="doctor-primary-btn"
          onClick={() =>
            setPage("doctor-schedule")
          }
        >
          View Schedule →
        </button>

      </div>

    </div>
  );
}

export default DoctorAppointmentsPage;