function BookingModal({
  hospital,
  doctor,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  onClose,
  onConfirm,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="booking-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2>Book Appointment</h2>
            <p>Choose your preferred date and time.</p>
          </div>

          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-doctor">
          <div className="doctor-avatar">
            {doctor.name.replace("Dr. ", "").charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
          </div>
        </div>

        <div className="modal-doctor-info">
          <span>★ {doctor.rating}</span>
          <span>{doctor.reviews} reviews</span>
          <span>{doctor.experience} years experience</span>
          <strong>₹{doctor.fee}</strong>
        </div>

        <div className="form-group">
          <label>Select Date</label>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlot("");
            }}
          />
        </div>

        <div className="form-group">
          <label>Available Time Slots</label>

          <div className="slot-grid">
            {doctor.slots.map((slot) => (
              <button
                key={slot}
                className={
                  selectedSlot === slot
                    ? "slot-btn selected"
                    : "slot-btn"
                }
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="hospital-summary">
          <strong>{hospital.name}</strong>
          <span>{hospital.location}</span>
        </div>

        <button
          className="primary-btn confirm-btn"
          onClick={onConfirm}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}

export default BookingModal;