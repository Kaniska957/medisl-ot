import hospitals from "../data/hospitals";

function RescheduleModal({
  appointment,
  setAppointment,
  onClose,
  onSave,
}) {
  const doctor = hospitals
    .flatMap((hospital) => hospital.doctors)
    .find((item) => item.name === appointment.doctor);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="booking-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Reschedule Appointment</h2>
            <p>Select a new date and time.</p>
          </div>

          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-doctor">
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

        <div className="current-appointment">
          Current appointment: {appointment.date} at {appointment.time}
        </div>

        <div className="form-group">
          <label>New Date</label>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={appointment.newDate}
            onChange={(e) =>
              setAppointment({
                ...appointment,
                newDate: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Available Time Slots</label>

          <div className="slot-grid">
            {doctor?.slots.map((slot) => (
              <button
                key={slot}
                className={
                  appointment.newTime === slot
                    ? "slot-btn selected"
                    : "slot-btn"
                }
                onClick={() =>
                  setAppointment({
                    ...appointment,
                    newTime: slot,
                  })
                }
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          className="primary-btn confirm-btn"
          onClick={onSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default RescheduleModal;