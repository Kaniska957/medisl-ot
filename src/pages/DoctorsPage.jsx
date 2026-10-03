import { useState } from "react";

function DoctorsPage({
  doctors,
  setDoctors,
  departments,
  setPage,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    experience: "",
    fee: "",
  });

  const [slots, setSlots] = useState([
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
  ]);

  const [newSlot, setNewSlot] = useState("");

  /* =====================================================
     FORM INPUT
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =====================================================
     ADD SLOT
  ===================================================== */

  const addSlot = () => {
    const slot = newSlot.trim();

    if (!slot) {
      alert("Please enter a time slot.");
      return;
    }

    if (slots.includes(slot)) {
      alert("This time slot already exists.");
      return;
    }

    setSlots((current) => [
      ...current,
      slot,
    ]);

    setNewSlot("");
  };

  /* =====================================================
     REMOVE SLOT
  ===================================================== */

  const removeSlot = (slotToRemove) => {
    setSlots((current) =>
      current.filter(
        (slot) => slot !== slotToRemove
      )
    );
  };

  /* =====================================================
     ADD DOCTOR
  ===================================================== */

  const handleAddDoctor = (e) => {
    e.preventDefault();

    /* ---------------------------------------------
       CLEAN FORM VALUES
    --------------------------------------------- */

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const specialty = formData.specialty.trim();
    const experience = String(
      formData.experience
    ).trim();
    const fee = String(
      formData.fee
    ).trim();

    /* ---------------------------------------------
       VALIDATE NAME
    --------------------------------------------- */

    if (!name) {
      alert("Please enter the doctor's name.");
      return;
    }

    /* ---------------------------------------------
       VALIDATE EMAIL
    --------------------------------------------- */

    if (!email) {
      alert("Please enter the doctor's email.");
      return;
    }

    /* ---------------------------------------------
       BASIC EMAIL FORMAT CHECK
    --------------------------------------------- */

    if (
      !email.includes("@") ||
      !email.includes(".")
    ) {
      alert(
        "Please enter a valid doctor email address."
      );
      return;
    }

    /* ---------------------------------------------
       VALIDATE PASSWORD
    --------------------------------------------- */

    if (!password) {
      alert("Please enter a login password.");
      return;
    }

    if (password.length < 6) {
      alert(
        "Doctor password must contain at least 6 characters."
      );
      return;
    }

    /* ---------------------------------------------
       VALIDATE SPECIALTY
    --------------------------------------------- */

    if (!specialty) {
      alert(
        "Please select a department/specialization."
      );
      return;
    }

    /* ---------------------------------------------
       VALIDATE EXPERIENCE
    --------------------------------------------- */

    if (experience === "") {
      alert(
        "Please enter the doctor's experience."
      );
      return;
    }

    if (
      Number.isNaN(
        Number(experience)
      )
    ) {
      alert(
        "Experience must be a valid number."
      );
      return;
    }

    if (
      Number(experience) < 0
    ) {
      alert(
        "Experience cannot be negative."
      );
      return;
    }

    /* ---------------------------------------------
       VALIDATE CONSULTATION FEE
    --------------------------------------------- */

    if (fee === "") {
      alert(
        "Please enter the consultation fee."
      );
      return;
    }

    if (
      Number.isNaN(
        Number(fee)
      )
    ) {
      alert(
        "Consultation fee must be a valid number."
      );
      return;
    }

    if (Number(fee) < 0) {
      alert(
        "Consultation fee cannot be negative."
      );
      return;
    }

    /* ---------------------------------------------
       VALIDATE AVAILABILITY SLOTS
    --------------------------------------------- */

    if (slots.length === 0) {
      alert(
        "Please add at least one availability slot."
      );
      return;
    }

    /* ---------------------------------------------
       GET EXISTING DOCTOR ACCOUNTS
    --------------------------------------------- */

    const existingAccounts =
      JSON.parse(
        localStorage.getItem(
          "medislotDoctorAccounts"
        )
      ) || [];

    /* ---------------------------------------------
       CHECK DUPLICATE EMAIL
    --------------------------------------------- */

    const emailExists =
      existingAccounts.some(
        (doctor) =>
          doctor.email?.trim().toLowerCase() ===
          email
      );

    if (emailExists) {
      alert(
        "A doctor account with this email already exists."
      );
      return;
    }

    /* ---------------------------------------------
       CHECK DUPLICATE DOCTOR
    --------------------------------------------- */

    const duplicateDoctor =
      doctors.some(
        (doctor) =>
          doctor.name
            ?.trim()
            .toLowerCase() ===
          name.toLowerCase()
      );

    if (duplicateDoctor) {
      alert(
        "This doctor is already registered in your hospital."
      );
      return;
    }

    /* ---------------------------------------------
       GET LOGGED-IN HOSPITAL
    --------------------------------------------- */

    const hospitalUser =
      JSON.parse(
        localStorage.getItem(
          "medislotHospitalUser"
        )
      );

    /* ---------------------------------------------
       CREATE NEW DOCTOR
    --------------------------------------------- */

    const newDoctor = {
      id: Date.now(),

      name,

      email,

      password,

      specialty,

      experience: Number(
        experience
      ),

      fee: Number(
        fee
      ),

      slots: [...slots],

      hospitalName:
        hospitalUser?.hospitalName || "",

      createdAt:
        new Date().toISOString(),
    };

    /* ---------------------------------------------
       SAVE DOCTOR LOGIN ACCOUNT
    --------------------------------------------- */

    localStorage.setItem(
      "medislotDoctorAccounts",
      JSON.stringify([
        ...existingAccounts,
        newDoctor,
      ])
    );

    /* ---------------------------------------------
       ADD DOCTOR TO HOSPITAL
    --------------------------------------------- */

    setDoctors((current) => [
      ...current,
      newDoctor,
    ]);

    /* ---------------------------------------------
       RESET FORM
    --------------------------------------------- */

    setFormData({
      name: "",
      email: "",
      password: "",
      specialty: "",
      experience: "",
      fee: "",
    });

    setSlots([
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
    ]);

    setNewSlot("");

    /* ---------------------------------------------
       SUCCESS MESSAGE
    --------------------------------------------- */

    alert(
      "Doctor added successfully. Login credentials have been created."
    );
  };

  /* =====================================================
     REMOVE DOCTOR
  ===================================================== */

  const handleRemoveDoctor = (doctor) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to remove ${doctor.name}?`
      );

    if (!confirmed) {
      return;
    }

    /* ---------------------------------------------
       REMOVE FROM HOSPITAL DOCTORS
    --------------------------------------------- */

    setDoctors((current) =>
      current.filter(
        (item) =>
          item.id !== doctor.id
      )
    );

    /* ---------------------------------------------
       REMOVE DOCTOR LOGIN ACCOUNT
    --------------------------------------------- */

    const existingAccounts =
      JSON.parse(
        localStorage.getItem(
          "medislotDoctorAccounts"
        )
      ) || [];

    const updatedAccounts =
      existingAccounts.filter(
        (item) =>
          item.id !== doctor.id
      );

    localStorage.setItem(
      "medislotDoctorAccounts",
      JSON.stringify(
        updatedAccounts
      )
    );

    alert(
      "Doctor removed successfully."
    );
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="doctor-management-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="doctor-page-heading">

        <div>

          <span className="doctor-dashboard-label">
            HOSPITAL PORTAL
          </span>

          <h1>
            Doctors
          </h1>

          <p>
            Add doctors, create their login accounts,
            and manage their consultation availability.
          </p>

        </div>

      </div>

      {/* =================================================
          ADD DOCTOR
      ================================================= */}

      <div className="doctor-form-card">

        <div className="doctor-card-header">

          <div>

            <h2>
              Add Doctor
            </h2>

            <p>
              Create a doctor profile and login account.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleAddDoctor}
        >

          <div className="doctor-form-grid">

            {/* =========================================
                DOCTOR NAME
            ========================================= */}

            <div className="doctor-form-field">

              <label>
                Doctor Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Dr. Priya Sharma"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            {/* =========================================
                DOCTOR EMAIL
            ========================================= */}

            <div className="doctor-form-field">

              <label>
                Doctor Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="doctor@example.com"
                value={formData.email}
                onChange={handleChange}
              />

            </div>

            {/* =========================================
                PASSWORD
            ========================================= */}

            <div className="doctor-form-field">

              <label>
                Login Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
              />

            </div>

            {/* =========================================
                SPECIALTY
            ========================================= */}

            <div className="doctor-form-field">

              <label>
                Department / Specialization
              </label>

              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
              >

                <option value="">
                  Select Department
                </option>

                {departments.map(
                  (department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* =========================================
                EXPERIENCE
            ========================================= */}

            <div className="doctor-form-field">

              <label>
                Experience (Years)
              </label>

              <input
                type="number"
                name="experience"
                min="0"
                placeholder="10"
                value={formData.experience}
                onChange={handleChange}
              />

            </div>

            {/* =========================================
                CONSULTATION FEE
            ========================================= */}

            <div className="doctor-form-field">

              <label>
                Consultation Fee (₹)
              </label>

              <input
                type="number"
                name="fee"
                min="0"
                placeholder="800"
                value={formData.fee}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* =================================================
              DEFAULT AVAILABILITY
          ================================================= */}

          <div className="doctor-availability-form">

            <div>

              <h3>
                Default Availability
              </h3>

              <p>
                These slots will be available for patients
                when booking this doctor.
              </p>

            </div>

            {/* SLOT INPUT */}

            <div className="doctor-slot-input">

              <input
                type="text"
                placeholder="Example: 2:30 PM"
                value={newSlot}
                onChange={(e) =>
                  setNewSlot(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter"
                  ) {
                    e.preventDefault();
                    addSlot();
                  }

                }}
              />

              <button
                type="button"
                className="doctor-secondary-btn"
                onClick={addSlot}
              >
                + Add Slot
              </button>

            </div>

            {/* SLOT LIST */}

            <div className="doctor-slot-list">

              {slots.map(
                (slot) => (
                  <div
                    className="doctor-slot-item"
                    key={slot}
                  >

                    <span>
                      {slot}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeSlot(slot)
                      }
                    >
                      ×
                    </button>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =================================================
              FORM ACTION
          ================================================= */}

          <div className="doctor-form-actions">

            <button
              type="submit"
              className="doctor-primary-btn"
            >
              Add Doctor & Create Account
            </button>

          </div>

        </form>

      </div>

      {/* =================================================
          REGISTERED DOCTORS
      ================================================= */}

      <div className="doctor-management-card">

        <div className="doctor-card-header">

          <div>

            <h2>
              Registered Doctors
            </h2>

            <p>
              Doctors currently associated with your
              hospital.
            </p>

          </div>

          <span className="doctor-count">

            {doctors.length} Doctor
            {doctors.length !== 1
              ? "s"
              : ""}

          </span>

        </div>

        {/* ===============================================
            NO DOCTORS
        =============================================== */}

        {doctors.length === 0 ? (

          <div className="doctor-empty-state">

            <h3>
              No doctors registered
            </h3>

            <p>
              Add your first doctor using the form above.
            </p>

          </div>

        ) : (

          <div className="managed-doctors-list">

            {doctors.map(
              (doctor) => (

                <div
                  className="managed-doctor-card"
                  key={doctor.id}
                >

                  {/* =====================================
                      AVATAR
                  ===================================== */}

                  <div className="managed-doctor-avatar">

                    {doctor.name
                      ?.replace(
                        "Dr. ",
                        ""
                      )
                      .charAt(0)
                      .toUpperCase()}

                  </div>

                  {/* =====================================
                      DETAILS
                  ===================================== */}

                  <div className="managed-doctor-main">

                    <h3>
                      {doctor.name}
                    </h3>

                    <span className="doctor-specialty-badge">
                      {doctor.specialty}
                    </span>

                    <div className="managed-doctor-details">

                      <span>
                        ✉ {doctor.email}
                      </span>

                      <span>
                        {doctor.experience} years
                        experience
                      </span>

                      <span>
                        ₹{doctor.fee}
                        consultation
                      </span>

                    </div>

                    <div className="managed-doctor-slots">

                      <span>
                        Available:
                      </span>

                      {doctor.slots?.map(
                        (slot) => (

                          <span
                            className="managed-slot"
                            key={slot}
                          >
                            {slot}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                  {/* =====================================
                      REMOVE DOCTOR
                  ===================================== */}

                  <button
                    type="button"
                    className="doctor-remove-btn"
                    onClick={() =>
                      handleRemoveDoctor(
                        doctor
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* =================================================
          BOTTOM ACTIONS
      ================================================= */}

      <div className="doctor-management-actions">

        <button
          type="button"
          className="doctor-secondary-btn"
          onClick={() =>
            setPage(
              "hospital-dashboard"
            )
          }
        >
          ← Back to Dashboard
        </button>

        <button
          type="button"
          className="doctor-primary-btn"
          onClick={() =>
            setPage(
              "hospital-appointments"
            )
          }
        >
          View Appointments →
        </button>

      </div>

    </div>
  );
}

export default DoctorsPage;