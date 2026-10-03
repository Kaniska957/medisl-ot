import { useState } from "react";

function DoctorAvailabilityPage({
  doctor,
  setDoctor,
  setPage,
}) {
  const [selectedDay, setSelectedDay] =
    useState("Monday");

  const [newSlot, setNewSlot] = useState("");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [weeklySchedule, setWeeklySchedule] =
    useState(() => {
      const existingSlots = doctor?.slots || [];

      return {
        Monday: [...existingSlots],
        Tuesday: [...existingSlots],
        Wednesday: [...existingSlots],
        Thursday: [...existingSlots],
        Friday: [...existingSlots],
        Saturday: [],
        Sunday: [],
      };
    });

  const addSlot = () => {
    const slot = newSlot.trim();

    if (!slot) {
      alert("Please enter a time slot.");
      return;
    }

    if (weeklySchedule[selectedDay].includes(slot)) {
      alert("This time slot already exists.");
      return;
    }

    setWeeklySchedule((current) => ({
      ...current,

      [selectedDay]: [
        ...current[selectedDay],
        slot,
      ],
    }));

    setNewSlot("");
  };

  const removeSlot = (slotToRemove) => {
    setWeeklySchedule((current) => ({
      ...current,

      [selectedDay]: current[selectedDay].filter(
        (slot) => slot !== slotToRemove
      ),
    }));
  };

  const toggleDayAvailability = () => {
    setWeeklySchedule((current) => ({
      ...current,

      [selectedDay]:
        current[selectedDay].length > 0
          ? []
          : ["9:00 AM"],
    }));
  };

  const saveAvailability = () => {
    const allSlots = [
      ...new Set(
        Object.values(weeklySchedule).flat()
      ),
    ];

    const updatedDoctor = {
      ...doctor,
      slots: allSlots,
      weeklySchedule,
    };

    setDoctor(updatedDoctor);

    alert(
      "Availability updated successfully."
    );

    setPage("doctor-schedule");
  };

  const selectedDaySlots =
    weeklySchedule[selectedDay] || [];

  return (
    <div className="doctor-management-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="doctor-page-heading">
        <div>
          <span className="doctor-dashboard-label">
            DOCTOR PORTAL
          </span>

          <h1>Availability</h1>

          <p>
            Manage the days and time slots when patients
            can book appointments with you.
          </p>
        </div>
      </div>

      {/* =========================
          DOCTOR INFO
      ========================= */}

      <div className="doctor-availability-profile">

        <div className="doctor-availability-avatar">
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

        <div className="doctor-current-status">
          <span>Current Status</span>

          <strong>
            Available for Booking
          </strong>
        </div>

      </div>

      {/* =========================
          DAY SELECTOR
      ========================= */}

      <div className="doctor-availability-card">

        <div className="doctor-card-header">
          <div>
            <h2>Weekly Availability</h2>

            <p>
              Select a day to manage its consultation
              slots.
            </p>
          </div>
        </div>

        <div className="doctor-day-selector">

          {days.map((day) => (
            <button
              key={day}
              className={
                selectedDay === day
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedDay(day)
              }
            >
              <strong>
                {day.substring(0, 3)}
              </strong>

              <span>
                {weeklySchedule[day].length}
              </span>
            </button>
          ))}

        </div>

        {/* =========================
            SELECTED DAY
        ========================= */}

        <div className="doctor-selected-day">

          <div className="doctor-selected-day-header">

            <div>
              <h3>{selectedDay}</h3>

              <p>
                {selectedDaySlots.length > 0
                  ? `${selectedDaySlots.length} available slot${
                      selectedDaySlots.length !== 1
                        ? "s"
                        : ""
                    }`
                  : "Not available"}
              </p>
            </div>

            <button
              className={
                selectedDaySlots.length > 0
                  ? "doctor-day-toggle available"
                  : "doctor-day-toggle"
              }
              onClick={
                toggleDayAvailability
              }
            >
              {selectedDaySlots.length > 0
                ? "Mark Unavailable"
                : "Mark Available"}
            </button>

          </div>

          {/* SLOT INPUT */}

          <div className="doctor-availability-input">

            <input
              type="text"
              placeholder="Example: 2:30 PM"
              value={newSlot}
              onChange={(e) =>
                setNewSlot(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSlot();
                }
              }}
            />

            <button
              className="doctor-primary-btn"
              onClick={addSlot}
            >
              + Add Time Slot
            </button>

          </div>

          {/* SLOT LIST */}

          {selectedDaySlots.length === 0 ? (
            <div className="doctor-availability-empty">

              <h3>
                No slots available
              </h3>

              <p>
                Patients cannot book appointments on
                this day. Add a time slot to make the day
                available.
              </p>

            </div>
          ) : (
            <div className="doctor-availability-slots">

              {selectedDaySlots.map((slot) => (
                <div
                  className="doctor-availability-slot"
                  key={slot}
                >

                  <span>
                    {slot}
                  </span>

                  <button
                    onClick={() =>
                      removeSlot(slot)
                    }
                  >
                    ×
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* =========================
          IMPORTANT NOTE
      ========================= */}

      <div className="doctor-availability-note">

        <div className="doctor-note-icon">
          +
        </div>

        <div>
          <h3>
            Availability controls patient booking
          </h3>

          <p>
            Patients will only be able to select
            appointment times that are configured as
            available.
          </p>
        </div>

      </div>

      {/* =========================
          ACTIONS
      ========================= */}

      <div className="doctor-management-actions">

        <button
          className="doctor-secondary-btn"
          onClick={() =>
            setPage("doctor-schedule")
          }
        >
          ← Back to Schedule
        </button>

        <button
          className="doctor-primary-btn"
          onClick={saveAvailability}
        >
          Save Availability
        </button>

      </div>

    </div>
  );
}

export default DoctorAvailabilityPage;