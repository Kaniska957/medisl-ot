import { useState } from "react";

function HospitalSignupPage({
  onSignup,
  onLogin,
  onBack,
}) {
  const [hospitalName, setHospitalName] =
    useState("");

  const [hospitalEmail, setHospitalEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [registrationNumber, setRegistrationNumber] =
    useState("");

  const [adminName, setAdminName] =
    useState("");

  const [adminEmail, setAdminEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  /* =====================================================
     SUBMIT
  ===================================================== */

  const submit = (e) => {
    e.preventDefault();

    const cleanHospitalName =
      hospitalName.trim();

    const cleanHospitalEmail =
      hospitalEmail.trim().toLowerCase();

    const cleanPhone =
      phone.trim();

    const cleanLocation =
      location.trim();

    const cleanAddress =
      address.trim();

    const cleanRegistrationNumber =
      registrationNumber.trim();

    const cleanAdminName =
      adminName.trim();

    const cleanAdminEmail =
      adminEmail.trim().toLowerCase();

    /* =================================================
       REQUIRED FIELD VALIDATION
    ================================================= */

    if (!cleanHospitalName) {
      alert(
        "Please enter the hospital name."
      );
      return;
    }

    if (!cleanHospitalEmail) {
      alert(
        "Please enter the hospital email."
      );
      return;
    }

    if (
      !cleanHospitalEmail.includes("@") ||
      !cleanHospitalEmail.includes(".")
    ) {
      alert(
        "Please enter a valid hospital email address."
      );
      return;
    }

    if (!cleanPhone) {
      alert(
        "Please enter the hospital phone number."
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      alert(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (!cleanLocation) {
      alert(
        "Please enter the hospital location."
      );
      return;
    }

    if (!cleanAddress) {
      alert(
        "Please enter the complete hospital address."
      );
      return;
    }

    if (!cleanRegistrationNumber) {
      alert(
        "Please enter the hospital registration number."
      );
      return;
    }

    if (!cleanAdminName) {
      alert(
        "Please enter the administrator name."
      );
      return;
    }

    if (!cleanAdminEmail) {
      alert(
        "Please enter the administrator email."
      );
      return;
    }

    if (
      !cleanAdminEmail.includes("@") ||
      !cleanAdminEmail.includes(".")
    ) {
      alert(
        "Please enter a valid administrator email address."
      );
      return;
    }

    if (!password) {
      alert(
        "Please create a password."
      );
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (!confirmPassword) {
      alert(
        "Please confirm your password."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match."
      );
      return;
    }

    /* =================================================
       SEND DATA TO APP
    ================================================= */

    onSignup({
      hospitalName:
        cleanHospitalName,

      hospitalEmail:
        cleanHospitalEmail,

      phone:
        cleanPhone,

      location:
        cleanLocation,

      address:
        cleanAddress,

      registrationNumber:
        cleanRegistrationNumber,

      adminName:
        cleanAdminName,

      adminEmail:
        cleanAdminEmail,

      password,
    });
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="auth-page hospital-signup-page">

      <div className="auth-card hospital-signup-card">

        <div className="auth-logo">
          MediSlot
        </div>

        <div className="portal-label">
          HOSPITAL PORTAL
        </div>

        <h1>
          Register Your Hospital
        </h1>

        <p>
          Create a hospital account to join
          MediSlot and manage your healthcare
          services.
        </p>

        <form onSubmit={submit}>

          {/* ===========================================
              HOSPITAL INFORMATION
          =========================================== */}

          <div className="form-section-title">
            Hospital Information
          </div>

          <label>
            Hospital Name
          </label>

          <input
            type="text"
            placeholder="Enter hospital name"
            value={hospitalName}
            onChange={(e) =>
              setHospitalName(
                e.target.value
              )
            }
          />

          <label>
            Hospital Email
          </label>

          <input
            type="email"
            placeholder="Enter hospital email"
            value={hospitalEmail}
            onChange={(e) =>
              setHospitalEmail(
                e.target.value
              )
            }
          />

          <label>
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={phone}
            maxLength="10"
            onChange={(e) => {
              const value =
                e.target.value.replace(
                  /\D/g,
                  ""
                );

              setPhone(value);
            }}
          />

          <label>
            Location
          </label>

          <input
            type="text"
            placeholder="Example: Chennai"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />

          <label>
            Hospital Address
          </label>

          <textarea
            placeholder="Enter complete hospital address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            rows="3"
          />

          <label>
            Hospital Registration Number
          </label>

          <input
            type="text"
            placeholder="Enter registration number"
            value={
              registrationNumber
            }
            onChange={(e) =>
              setRegistrationNumber(
                e.target.value
              )
            }
          />

          {/* ===========================================
              ADMINISTRATOR INFORMATION
          =========================================== */}

          <div className="form-section-title">
            Administrator Information
          </div>

          <label>
            Administrator Name
          </label>

          <input
            type="text"
            placeholder="Enter administrator name"
            value={adminName}
            onChange={(e) =>
              setAdminName(
                e.target.value
              )
            }
          />

          <label>
            Administrator Email
          </label>

          <input
            type="email"
            placeholder="Enter administrator email"
            value={adminEmail}
            onChange={(e) =>
              setAdminEmail(
                e.target.value
              )
            }
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <label>
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          {/* ===========================================
              REGISTER
          =========================================== */}

          <button
            className="primary-btn"
            type="submit"
          >
            Register Hospital
          </button>

        </form>

        {/* =============================================
            LOGIN
        ============================================= */}

        <p className="auth-switch">

          Already registered?{" "}

          <button
            type="button"
            onClick={onLogin}
          >
            Hospital Login
          </button>

        </p>

        {/* =============================================
            BACK
        ============================================= */}

        <button
          type="button"
          className="back-portal-btn"
          onClick={onBack}
        >
          ← Back to Portal Selection
        </button>

      </div>

    </div>
  );
}

export default HospitalSignupPage;
