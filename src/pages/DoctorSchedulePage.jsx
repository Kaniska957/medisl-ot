function DoctorSchedulePage({
  doctor,
  setPage,
}) {
  const defaultSchedule = {
    Monday: doctor?.slots || [],
    Tuesday: doctor?.slots || [],
    Wednesday: doctor?.slots || [],
    Thursday: doctor?.slots || [],
    Friday: doctor?.slots || [],
    Saturday: [],
    Sunday: [],
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

          <h1>My Schedule</h1>

          <p>
            View your weekly consultation schedule and
            available appointment slots.
          </p>
        </div>
      </div>

      {/* =========================
          DOCTOR INFORMATION
      ========================= */}

      <div className="doctor-schedule-profile">
        <div className="doctor-schedule-avatar">
          {doctor?.name
            ?.replace("Dr. ", "")
            .charAt(0)
            .toUpperCase() || "D"}
        </div>

        <div>
          <h2>
            {doctor?.name || "Doctor"}
          </h2>

          <span>
            {doctor?.specialty ||
              "Medical Specialist"}
          </span>
        </div>

        <div className="doctor-schedule-fee">
          <span>Consultation Fee</span>

          <strong>
            ₹{doctor?.fee || 0}
          </strong>
        </div>
      </div>

      {/* =========================
          WEEKLY SCHEDULE
      ========================= */}

      <div className="doctor-schedule-card">

        <div className="doctor-card-header">
          <div>
            <h2>Weekly Schedule</h2>

            <p>
              Your currently configured consultation
              hours.
            </p>
          </div>
        </div>

        <div className="doctor-weekly-schedule">

          {Object.entries(defaultSchedule).map(
            ([day, slots]) => (
              <div
                className="doctor-day-row"
                key={day}
              >

                <div className="doctor-day-name">
                  <strong>{day}</strong>

                  {slots.length > 0 ? (
                    <span>
                      Available
                    </span>
                  ) : (
                    <span className="doctor-day-off">
                      Not Available
                    </span>
                  )}
                </div>

                <div className="doctor-day-slots">

                  {slots.length === 0 ? (
                    <span className="doctor-no-slots">
                      No consultation slots
                    </span>
                  ) : (
                    slots.map((slot) => (
                      <span
                        className="doctor-schedule-slot"
                        key={`${day}-${slot}`}
                      >
                        {slot}
                      </span>
                    ))
                  )}

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* =========================
          SCHEDULE INFORMATION
      ========================= */}

      <div className="doctor-schedule-info">

        <div className="doctor-info-icon">
          +
        </div>

        <div>
          <h3>
            Need to change your availability?
          </h3>

          <p>
            Update your available consultation slots
            from the Availability section.
          </p>
        </div>

        <button
          className="doctor-primary-btn"
          onClick={() =>
            setPage("doctor-availability")
          }
        >
          Manage Availability →
        </button>

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
            setPage("doctor-appointments")
          }
        >
          View Appointments →
        </button>

      </div>

    </div>
  );
}

export default DoctorSchedulePage;