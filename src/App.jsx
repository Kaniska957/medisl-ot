import { useEffect, useState } from "react";
import "./App.css";

import hospitals from "./data/hospitals";

import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import BookingModal from "./components/BookingModal";
import RescheduleModal from "./components/RescheduleModal";

import HospitalLoginPage from "./components/HospitalLoginPage";
import HospitalSignupPage from "./components/HospitalSignupPage";

import DoctorLoginPage from "./components/DoctorLoginPage";

import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import HospitalsPage from "./pages/HospitalsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ProfilePage from "./pages/ProfilePage";

import HospitalDashboardPage from "./pages/HospitalDashboardPage";
import HospitalProfilePage from "./pages/HospitalProfilePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import HospitalAppointmentsPage from "./pages/HospitalAppointmentsPage";

import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import DoctorAppointmentsPage from "./pages/DoctorAppointmentsPage";
import DoctorSchedulePage from "./pages/DoctorSchedulePage";
import DoctorAvailabilityPage from "./pages/DoctorAvailabilityPage";

/* =========================================================
   HOSPITAL DEFAULT DEPARTMENTS
========================================================= */

const DEFAULT_DEPARTMENTS = [
  "Cardiology",
  "General Medicine",
  "Dermatology",
  "Orthopedics",
];

/* =========================================================
   GET HOSPITAL ACCOUNTS
========================================================= */

const getHospitalAccounts = () => {
  const storedAccounts = JSON.parse(
    localStorage.getItem(
      "medislotHospitalAccounts"
    )
  );

  if (
    Array.isArray(storedAccounts)
  ) {
    return storedAccounts;
  }

  const oldAccount = JSON.parse(
    localStorage.getItem(
      "medislotHospitalAccount"
    )
  );

  if (oldAccount) {
    const migratedAccount = {
      ...oldAccount,

      id:
        oldAccount.id ||
        `hospital-${Date.now()}`,

      departments:
        oldAccount.departments ||
        [...DEFAULT_DEPARTMENTS],

      doctors:
        oldAccount.doctors ||
        [],
    };

    localStorage.setItem(
      "medislotHospitalAccounts",
      JSON.stringify([
        migratedAccount,
      ])
    );

    return [
      migratedAccount,
    ];
  }

  return [];
};

/* =========================================================
   APP
========================================================= */

function App() {
  /* =======================================================
     STORED SESSIONS
  ======================================================= */

  const storedPatient = JSON.parse(
    localStorage.getItem(
      "medislotUser"
    )
  );

  const storedHospital = JSON.parse(
    localStorage.getItem(
      "medislotHospitalUser"
    )
  );

  const storedDoctor = JSON.parse(
    localStorage.getItem(
      "medislotDoctorUser"
    )
  );

  /* =======================================================
     HOSPITAL ACCOUNTS
  ======================================================= */

  const initialHospitalAccounts =
    getHospitalAccounts();

  /* =======================================================
     PORTAL STATE
  ======================================================= */

  const [portal, setPortal] =
    useState(() => {
      if (storedPatient) {
        return "patient";
      }

      if (storedHospital) {
        return "hospital";
      }

      if (storedDoctor) {
        return "doctor";
      }

      return null;
    });

  const [authPage, setAuthPage] =
    useState(() => {
      if (
        storedPatient ||
        storedHospital ||
        storedDoctor
      ) {
        return "app";
      }

      return "landing";
    });

  /* =======================================================
     PATIENT STATE
  ======================================================= */

  const [user, setUser] =
    useState(
      storedPatient
    );

  const [page, setPage] =
    useState(
      "dashboard"
    );

  const [
    appointments,
    setAppointments,
  ] = useState(
    JSON.parse(
      localStorage.getItem(
        "medislotAppointments"
      )
    ) || []
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedHospitalFilter,
    setSelectedHospitalFilter,
  ] = useState("");

  const [
    selectedSpecialtyFilter,
    setSelectedSpecialtyFilter,
  ] = useState("");

  const [
    selectedHospital,
    setSelectedHospital,
  ] = useState(null);

  const [
    selectedDoctor,
    setSelectedDoctor,
  ] = useState(null);

  const [
    selectedDate,
    setSelectedDate,
  ] = useState("");

  const [
    selectedSlot,
    setSelectedSlot,
  ] = useState("");

  const [
    rescheduleAppointment,
    setRescheduleAppointment,
  ] = useState(null);

  /* =======================================================
     HOSPITAL STATE
  ======================================================= */

  const [
    hospitalUser,
    setHospitalUser,
  ] = useState(
    storedHospital
  );

  const [
    hospitalPage,
    setHospitalPage,
  ] = useState(
    "hospital-dashboard"
  );

  const [
    departments,
    setDepartments,
  ] = useState(
    storedHospital?.departments ||
      [...DEFAULT_DEPARTMENTS]
  );

  const [
    doctors,
    setDoctors,
  ] = useState(
    storedHospital?.doctors ||
      []
  );

  /* =======================================================
     DOCTOR STATE
  ======================================================= */

  const [
    doctorUser,
    setDoctorUser,
  ] = useState(
    storedDoctor
  );

  const [
    doctorPage,
    setDoctorPage,
  ] = useState(
    "doctor-dashboard"
  );

  /* =======================================================
     HOSPITAL ACCOUNTS STATE
  ======================================================= */

  const [
    hospitalAccounts,
    setHospitalAccounts,
  ] = useState(
    initialHospitalAccounts
  );

  /* =======================================================
     KEEP HOSPITAL ACCOUNTS IN LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "medislotHospitalAccounts",
      JSON.stringify(
        hospitalAccounts
      )
    );
  }, [
    hospitalAccounts,
  ]);

  /* =======================================================
     SAVE APPOINTMENTS
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "medislotAppointments",
      JSON.stringify(
        appointments
      )
    );
  }, [
    appointments,
  ]);

  /* =======================================================
     SAVE CURRENT HOSPITAL DATA
  ======================================================= */

  useEffect(() => {
    if (!hospitalUser) {
      return;
    }

    const updatedHospital = {
      ...hospitalUser,

      departments,
      doctors,
    };

    localStorage.setItem(
      "medislotHospitalUser",
      JSON.stringify(
        updatedHospital
      )
    );

    setHospitalUser(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          departments,
          doctors,
        };
      }
    );

    setHospitalAccounts(
      (currentAccounts) =>
        currentAccounts.map(
          (account) =>
            account.id ===
            updatedHospital.id
              ? updatedHospital
              : account
        )
    );
  }, [
    departments,
    doctors,
  ]);

  /* =======================================================
     SAVE DOCTOR SESSION DATA
  ======================================================= */

  useEffect(() => {
    if (!doctorUser) {
      return;
    }

    localStorage.setItem(
      "medislotDoctorUser",
      JSON.stringify(
        doctorUser
      )
    );

    const accounts =
      JSON.parse(
        localStorage.getItem(
          "medislotDoctorAccounts"
        )
      ) || [];

    const updatedAccounts =
      accounts.map(
        (account) =>
          account.email ===
          doctorUser.email
            ? {
                ...account,
                ...doctorUser,
              }
            : account
      );

    localStorage.setItem(
      "medislotDoctorAccounts",
      JSON.stringify(
        updatedAccounts
      )
    );

    setHospitalAccounts(
      (currentHospitals) =>
        currentHospitals.map(
          (hospital) => {

            if (
              hospital.id !==
              doctorUser.hospitalId
            ) {
              return hospital;
            }

            return {
              ...hospital,

              doctors:
                hospital.doctors?.map(
                  (doctor) =>
                    doctor.id ===
                    doctorUser.id
                      ? {
                          ...doctor,
                          ...doctorUser,
                        }
                      : doctor
                ) || [],
            };
          }
        )
    );
  }, [
    doctorUser,
  ]);

  /* =======================================================
     PORTAL SELECTION
  ======================================================= */

  const handlePatientPortal = () => {
    setPortal("patient");
    setAuthPage("login");
  };

  const handleHospitalPortal = () => {
    setPortal("hospital");
    setAuthPage(
      "hospital-login"
    );
  };

  const handleDoctorPortal = () => {
    setPortal("doctor");
    setAuthPage(
      "doctor-login"
    );
  };

  const backToPortalSelection =
    () => {
      setPortal(null);
      setAuthPage("landing");
    };

  /* =======================================================
     PATIENT SIGNUP
  ======================================================= */

  const handleSignup = (
    name,
    email,
    password
  ) => {
    if (
      !name ||
      !email ||
      !password
    ) {
      alert(
        "Please fill all fields."
      );

      return;
    }

    localStorage.setItem(
      "medislotAccount",
      JSON.stringify({
        name,
        email,
        password,
      })
    );

    alert(
      "Account created successfully. Please login."
    );

    setAuthPage("login");
  };

  /* =======================================================
     PATIENT LOGIN
  ======================================================= */

  const handleLogin = (
    email,
    password
  ) => {
    const account =
      JSON.parse(
        localStorage.getItem(
          "medislotAccount"
        )
      );

    if (!account) {
      alert(
        "No patient account found. Please create an account first."
      );

      return;
    }

    if (
      email !== account.email ||
      password !== account.password
    ) {
      alert(
        "Invalid email or password."
      );

      return;
    }

    const loggedUser = {
      name:
        account.name,

      email:
        account.email,
    };

    localStorage.setItem(
      "medislotUser",
      JSON.stringify(
        loggedUser
      )
    );

    setUser(
      loggedUser
    );

    setPortal("patient");
    setAuthPage("app");
    setPage("dashboard");
  };

  /* =======================================================
     PATIENT LOGOUT
  ======================================================= */

  const handlePatientLogout =
    () => {
      localStorage.removeItem(
        "medislotUser"
      );

      setUser(null);
      setPortal(null);
      setAuthPage(
        "landing"
      );
      setPage(
        "dashboard"
      );
    };

  /* =======================================================
     HOSPITAL SIGNUP
  ======================================================= */

  const handleHospitalSignup =
    (hospitalData) => {

      const requiredFields = [
        hospitalData.hospitalName,
        hospitalData.hospitalEmail,
        hospitalData.phone,
        hospitalData.location,
        hospitalData.address,
        hospitalData.registrationNumber,
        hospitalData.adminName,
        hospitalData.adminEmail,
        hospitalData.password,
      ];

      const hasEmptyField =
        requiredFields.some(
          (field) =>
            !field
        );

      if (hasEmptyField) {
        alert(
          "Please fill all hospital details."
        );

        return;
      }

      const cleanHospitalEmail =
        hospitalData.hospitalEmail
          .trim()
          .toLowerCase();

      const cleanRegistrationNumber =
        hospitalData.registrationNumber
          .trim()
          .toLowerCase();

      const emailExists =
        hospitalAccounts.some(
          (hospital) =>
            hospital.hospitalEmail
              ?.trim()
              .toLowerCase() ===
            cleanHospitalEmail
        );

      if (emailExists) {
        alert(
          "A hospital account with this email already exists."
        );

        return;
      }

      const registrationExists =
        hospitalAccounts.some(
          (hospital) =>
            hospital.registrationNumber
              ?.trim()
              .toLowerCase() ===
            cleanRegistrationNumber
        );

      if (registrationExists) {
        alert(
          "A hospital with this registration number already exists."
        );

        return;
      }

      const newHospital = {
        ...hospitalData,

        hospitalEmail:
          cleanHospitalEmail,

        registrationNumber:
          hospitalData.registrationNumber.trim(),

        id:
          `hospital-${Date.now()}`,

        departments:
          [...DEFAULT_DEPARTMENTS],

        doctors: [],

        createdAt:
          new Date().toISOString(),
      };

      const updatedHospitalAccounts =
        [
          ...hospitalAccounts,
          newHospital,
        ];

      setHospitalAccounts(
        updatedHospitalAccounts
      );

      localStorage.setItem(
        "medislotHospitalAccounts",
        JSON.stringify(
          updatedHospitalAccounts
        )
      );

      alert(
        "Hospital registered successfully. Please login."
      );

      setAuthPage(
        "hospital-login"
      );
    };

  /* =======================================================
     HOSPITAL LOGIN
  ======================================================= */

  const handleHospitalLogin =
    (
      email,
      password
    ) => {

      const accounts =
        getHospitalAccounts();

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const account =
        accounts.find(
          (hospital) =>
            hospital.hospitalEmail
              ?.trim()
              .toLowerCase() ===
              cleanEmail &&
            hospital.password ===
              password
        );

      if (!account) {
        alert(
          "Invalid hospital email or password."
        );

        return;
      }

      const loggedHospital = {
        ...account,
      };

      localStorage.setItem(
        "medislotHospitalUser",
        JSON.stringify(
          loggedHospital
        )
      );

      setHospitalUser(
        loggedHospital
      );

      setDepartments(
        loggedHospital.departments ||
          [...DEFAULT_DEPARTMENTS]
      );

      setDoctors(
        loggedHospital.doctors ||
          []
      );

      setPortal("hospital");
      setAuthPage("app");
      setHospitalPage(
        "hospital-dashboard"
      );
    };

  /* =======================================================
     HOSPITAL LOGOUT
  ======================================================= */

  const handleHospitalLogout =
    () => {

      localStorage.removeItem(
        "medislotHospitalUser"
      );

      setHospitalUser(null);

      setPortal(null);

      setAuthPage(
        "landing"
      );

      setHospitalPage(
        "hospital-dashboard"
      );
    };

  /* =======================================================
     DOCTOR LOGIN
  ======================================================= */

  const handleDoctorLogin =
    (
      email,
      password
    ) => {

      const accounts =
        JSON.parse(
          localStorage.getItem(
            "medislotDoctorAccounts"
          )
        ) || [];

      const cleanEmail =
        email
          .trim()
          .toLowerCase();

      const account =
        accounts.find(
          (doctor) =>
            doctor.email
              ?.trim()
              .toLowerCase() ===
              cleanEmail &&
            doctor.password ===
              password
        );

      if (!account) {
        alert(
          "Invalid doctor email or password."
        );

        return;
      }

      const loggedDoctor = {
        ...account,
      };

      localStorage.setItem(
        "medislotDoctorUser",
        JSON.stringify(
          loggedDoctor
        )
      );

      setDoctorUser(
        loggedDoctor
      );

      setPortal("doctor");
      setAuthPage("app");
      setDoctorPage(
        "doctor-dashboard"
      );
    };

  /* =======================================================
     DOCTOR LOGOUT
  ======================================================= */

  const handleDoctorLogout =
    () => {

      localStorage.removeItem(
        "medislotDoctorUser"
      );

      setDoctorUser(null);

      setPortal(null);

      setAuthPage(
        "landing"
      );

      setDoctorPage(
        "doctor-dashboard"
      );
    };

  /* =======================================================
     TODAY
  ======================================================= */

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  /* =======================================================
     PATIENT HOSPITAL DATA
  ======================================================= */

  const dynamicHospitals =
    hospitalAccounts.map(
      (hospital) => ({
        id:
          hospital.id,

        name:
          hospital.hospitalName,

        location:
          hospital.location ||
          "Location not provided",

        address:
          hospital.address ||
          "",

        doctors:
          hospital.doctors ||
          [],
      })
    );

  /* =======================================================
     AVOID DUPLICATE HOSPITALS
  ======================================================= */

  const staticHospitalNames =
    new Set(
      hospitals.map(
        (hospital) =>
          hospital.name
            .trim()
            .toLowerCase()
      )
    );

  const uniqueDynamicHospitals =
    dynamicHospitals.filter(
      (hospital) =>
        !staticHospitalNames.has(
          hospital.name
            .trim()
            .toLowerCase()
        )
    );

  const allHospitals = [
    ...hospitals,
    ...uniqueDynamicHospitals,
  ];

  /* =======================================================
     ALL SPECIALIZATIONS
  ======================================================= */

  const allSpecialties = [
    ...new Set(
      allHospitals.flatMap(
        (hospital) =>
          (
            hospital.doctors ||
            []
          ).map(
            (doctor) =>
              doctor.specialty
          )
      )
    ),
  ];

  /* =======================================================
     OPEN BOOKING
  ======================================================= */

  const openBooking = (
    hospital,
    doctor
  ) => {

    setSelectedHospital(
      hospital
    );

    setSelectedDoctor(
      doctor
    );

    setSelectedDate("");
    setSelectedSlot("");
  };

  /* =======================================================
     CLOSE BOOKING
  ======================================================= */

  const closeBooking = () => {

    setSelectedHospital(null);

    setSelectedDoctor(null);

    setSelectedDate("");

    setSelectedSlot("");
  };

  /* =======================================================
     CONFIRM APPOINTMENT
  ======================================================= */

  const confirmAppointment =
    () => {

      if (!selectedDate) {
        alert(
          "Please select a date."
        );

        return;
      }

      if (!selectedSlot) {
        alert(
          "Please select an available time slot."
        );

        return;
      }

      if (
        selectedDate <
        today
      ) {
        alert(
          "Please select a valid date."
        );

        return;
      }

      const duplicate =
        appointments.some(
          (appointment) =>
            appointment.doctor ===
              selectedDoctor.name &&
            appointment.date ===
              selectedDate &&
            appointment.time ===
              selectedSlot &&
            appointment.status !==
              "Cancelled"
        );

      if (duplicate) {
        alert(
          "This doctor already has an appointment at this time."
        );

        return;
      }

      const newAppointment = {
        id:
          Date.now(),

        hospital:
          selectedHospital.name,

        location:
          selectedHospital.location,

        doctor:
          selectedDoctor.name,

        specialty:
          selectedDoctor.specialty,

        experience:
          selectedDoctor.experience ||
          0,

        rating:
          selectedDoctor.rating ||
          0,

        reviews:
          selectedDoctor.reviews ||
          0,

        fee:
          selectedDoctor.fee ||
          0,

        date:
          selectedDate,

        time:
          selectedSlot,

        status:
          "Upcoming",

        patient:
          user?.name ||
          "Patient",
      };

      setAppointments(
        (current) => [
          ...current,
          newAppointment,
        ]
      );

      closeBooking();

      setPage(
        "appointments"
      );

      alert(
        "Appointment booked successfully."
      );
    };

  /* =======================================================
     CANCEL APPOINTMENT
  ======================================================= */

  const cancelAppointment =
    (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to cancel this appointment?"
        );

      if (!confirmed) {
        return;
      }

      setAppointments(
        (current) =>
          current.map(
            (appointment) =>
              appointment.id === id
                ? {
                    ...appointment,
                    status:
                      "Cancelled",
                  }
                : appointment
          )
      );
    };

  /* =======================================================
     OPEN RESCHEDULE
  ======================================================= */

  const openReschedule =
    (appointment) => {

      setRescheduleAppointment({
        ...appointment,

        newDate:
          appointment.date,

        newTime:
          appointment.time,
      });
    };

  /* =======================================================
     SAVE RESCHEDULE
  ======================================================= */

  const saveReschedule =
    () => {

      if (
        !rescheduleAppointment.newDate
      ) {
        alert(
          "Please select a date."
        );

        return;
      }

      if (
        !rescheduleAppointment.newTime
      ) {
        alert(
          "Please select a time."
        );

        return;
      }

      if (
        rescheduleAppointment.newDate <
        today
      ) {
        alert(
          "Please select a valid date."
        );

        return;
      }

      const duplicate =
        appointments.some(
          (appointment) =>
            appointment.id !==
              rescheduleAppointment.id &&
            appointment.doctor ===
              rescheduleAppointment.doctor &&
            appointment.date ===
              rescheduleAppointment.newDate &&
            appointment.time ===
              rescheduleAppointment.newTime &&
            appointment.status !==
              "Cancelled"
        );

      if (duplicate) {
        alert(
          "This time slot is already booked."
        );

        return;
      }

      setAppointments(
        (current) =>
          current.map(
            (appointment) =>
              appointment.id ===
              rescheduleAppointment.id
                ? {
                    ...appointment,

                    date:
                      rescheduleAppointment.newDate,

                    time:
                      rescheduleAppointment.newTime,

                    status:
                      "Upcoming",
                  }
                : appointment
          )
      );

      setRescheduleAppointment(
        null
      );

      alert(
        "Appointment rescheduled successfully."
      );
    };

  /* =======================================================
     APPOINTMENT STATUS
  ======================================================= */

  const getAppointmentStatus =
    (appointment) => {

      if (
        appointment.status ===
        "Cancelled"
      ) {
        return "Cancelled";
      }

      if (
        appointment.status ===
        "Completed"
      ) {
        return "Completed";
      }

      if (
        appointment.date <
        today
      ) {
        return "Completed";
      }

      return "Upcoming";
    };

  /* =======================================================
     PATIENT APPOINTMENTS
  ======================================================= */

  const upcomingAppointments =
    appointments.filter(
      (appointment) =>
        getAppointmentStatus(
          appointment
        ) === "Upcoming"
    );

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        getAppointmentStatus(
          appointment
        ) === "Completed"
    );

  const recentAppointment =
    appointments.length > 0
      ? [
          ...appointments,
        ].sort(
          (a, b) =>
            b.id - a.id
        )[0]
      : null;

  /* =======================================================
     HOSPITAL APPOINTMENTS
  ======================================================= */

  const hospitalAppointments =
    appointments.filter(
      (appointment) =>
        appointment.hospital ===
        hospitalUser?.hospitalName
    );

  /* =======================================================
     DOCTOR APPOINTMENTS
  ======================================================= */

  const doctorAppointments =
    appointments.filter(
      (appointment) =>
        appointment.doctor ===
          doctorUser?.name &&
        appointment.hospital ===
          doctorUser?.hospitalName
    );

  /* =======================================================
     LANDING PAGE
  ======================================================= */

  if (
    authPage ===
    "landing"
  ) {
    return (
      <LandingPage
        onPatient={
          handlePatientPortal
        }
        onHospital={
          handleHospitalPortal
        }
        onDoctor={
          handleDoctorPortal
        }
      />
    );
  }

  /* =======================================================
     PATIENT LOGIN
  ======================================================= */

  if (
    portal === "patient" &&
    authPage === "login"
  ) {
    return (
      <LoginPage
        onLogin={
          handleLogin
        }
        onSignup={() =>
          setAuthPage(
            "signup"
          )
        }
        onBack={
          backToPortalSelection
        }
      />
    );
  }

  /* =======================================================
     PATIENT SIGNUP
  ======================================================= */

  if (
    portal === "patient" &&
    authPage === "signup"
  ) {
    return (
      <SignupPage
        onSignup={
          handleSignup
        }
        onLogin={() =>
          setAuthPage(
            "login"
          )
        }
        onBack={
          backToPortalSelection
        }
      />
    );
  }

  /* =======================================================
     HOSPITAL LOGIN
  ======================================================= */

  if (
    portal === "hospital" &&
    authPage ===
      "hospital-login"
  ) {
    return (
      <HospitalLoginPage
        onLogin={
          handleHospitalLogin
        }
        onSignup={() =>
          setAuthPage(
            "hospital-signup"
          )
        }
        onBack={
          backToPortalSelection
        }
      />
    );
  }

  /* =======================================================
     HOSPITAL SIGNUP
  ======================================================= */

  if (
    portal === "hospital" &&
    authPage ===
      "hospital-signup"
  ) {
    return (
      <HospitalSignupPage
        onSignup={
          handleHospitalSignup
        }
        onLogin={() =>
          setAuthPage(
            "hospital-login"
          )
        }
        onBack={
          backToPortalSelection
        }
      />
    );
  }

  /* =======================================================
     DOCTOR LOGIN
  ======================================================= */

  if (
    portal === "doctor" &&
    authPage ===
      "doctor-login"
  ) {
    return (
      <DoctorLoginPage
        onLogin={
          handleDoctorLogin
        }
        onBack={
          backToPortalSelection
        }
      />
    );
  }

  /* =======================================================
     HOSPITAL APPLICATION
  ======================================================= */

  if (
    portal === "hospital" &&
    authPage === "app"
  ) {
    return (
      <div className="hospital-app">

        <nav className="hospital-navbar">

          <div
            className="hospital-logo"
            onClick={() =>
              setHospitalPage(
                "hospital-dashboard"
              )
            }
          >
            MediSlot

            <span>
              Hospital
            </span>
          </div>

          <div className="hospital-nav-links">

            <button
              className={
                hospitalPage ===
                "hospital-dashboard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setHospitalPage(
                  "hospital-dashboard"
                )
              }
            >
              Dashboard
            </button>

            <button
              className={
                hospitalPage ===
                "departments"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setHospitalPage(
                  "departments"
                )
              }
            >
              Departments
            </button>

            <button
              className={
                hospitalPage ===
                "doctors"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setHospitalPage(
                  "doctors"
                )
              }
            >
              Doctors
            </button>

            <button
              className={
                hospitalPage ===
                "hospital-appointments"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setHospitalPage(
                  "hospital-appointments"
                )
              }
            >
              Appointments
            </button>

          </div>

          <div className="hospital-nav-user">

            <button
              className="hospital-profile-trigger"
              onClick={() =>
                setHospitalPage(
                  "hospital-profile"
                )
              }
            >
              <div className="hospital-user-avatar">
                +
              </div>

              <span>
                {
                  hospitalUser?.hospitalName
                }
              </span>
            </button>

            <button
              className="hospital-navbar-logout"
              onClick={
                handleHospitalLogout
              }
            >
              Logout
            </button>

          </div>

        </nav>

        <main className="hospital-main-content">

          {hospitalPage ===
            "hospital-dashboard" && (
            <HospitalDashboardPage
              hospital={
                hospitalUser
              }
              appointments={
                hospitalAppointments
              }
              setPage={
                setHospitalPage
              }
            />
          )}

          {hospitalPage ===
            "hospital-profile" && (
            <HospitalProfilePage
              hospital={
                hospitalUser
              }
              appointments={
                hospitalAppointments
              }
              setPage={
                setHospitalPage
              }
              onLogout={
                handleHospitalLogout
              }
            />
          )}

          {hospitalPage ===
            "departments" && (
            <DepartmentsPage
              departments={
                departments
              }
              setDepartments={
                setDepartments
              }
              setPage={
                setHospitalPage
              }
            />
          )}

          {hospitalPage ===
            "doctors" && (
            <DoctorsPage
              doctors={
                doctors
              }
              setDoctors={
                setDoctors
              }
              departments={
                departments
              }
              setPage={
                setHospitalPage
              }
            />
          )}

          {hospitalPage ===
            "hospital-appointments" && (
            <HospitalAppointmentsPage
              appointments={
                hospitalAppointments
              }
              setAppointments={
                setAppointments
              }
              setPage={
                setHospitalPage
              }
            />
          )}

        </main>

      </div>
    );
  }

  /* =======================================================
     DOCTOR APPLICATION
  ======================================================= */

  if (
    portal === "doctor" &&
    authPage === "app"
  ) {
    return (
      <div className="doctor-app">

        <nav className="doctor-navbar">

          <div
            className="doctor-navbar-logo"
            onClick={() =>
              setDoctorPage(
                "doctor-dashboard"
              )
            }
          >
            MediSlot

            <span>
              Doctor
            </span>
          </div>

          <div className="doctor-nav-links">

            <button
              className={
                doctorPage ===
                "doctor-dashboard"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDoctorPage(
                  "doctor-dashboard"
                )
              }
            >
              Dashboard
            </button>

            <button
              className={
                doctorPage ===
                "doctor-appointments"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDoctorPage(
                  "doctor-appointments"
                )
              }
            >
              My Appointments
            </button>

            <button
              className={
                doctorPage ===
                "doctor-schedule"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDoctorPage(
                  "doctor-schedule"
                )
              }
            >
              My Schedule
            </button>

            <button
              className={
                doctorPage ===
                "doctor-availability"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setDoctorPage(
                  "doctor-availability"
                )
              }
            >
              Availability
            </button>

          </div>

          <div className="doctor-nav-user">

            <button
              className="doctor-profile-trigger"
              onClick={() =>
                setDoctorPage(
                  "doctor-dashboard"
                )
              }
            >
              <div className="doctor-user-avatar">

                {doctorUser?.name
                  ?.replace(
                    "Dr. ",
                    ""
                  )
                  .charAt(0)
                  .toUpperCase() ||
                  "D"}

              </div>

              <span>
                {
                  doctorUser?.name
                }
              </span>

            </button>

            <button
              className="doctor-navbar-logout"
              onClick={
                handleDoctorLogout
              }
            >
              Logout
            </button>

          </div>

        </nav>

        <main className="doctor-main-content">

          {doctorPage ===
            "doctor-dashboard" && (
            <DoctorDashboardPage
              doctor={
                doctorUser
              }
              appointments={
                doctorAppointments
              }
              setPage={
                setDoctorPage
              }
            />
          )}

          {doctorPage ===
            "doctor-appointments" && (
            <DoctorAppointmentsPage
              appointments={
                doctorAppointments
              }
              setAppointments={
                setAppointments
              }
              setPage={
                setDoctorPage
              }
            />
          )}

          {doctorPage ===
            "doctor-schedule" && (
            <DoctorSchedulePage
              doctor={
                doctorUser
              }
              setPage={
                setDoctorPage
              }
            />
          )}

          {doctorPage ===
            "doctor-availability" && (
            <DoctorAvailabilityPage
              doctor={
                doctorUser
              }
              setDoctor={
                setDoctorUser
              }
              setPage={
                setDoctorPage
              }
            />
          )}

        </main>

      </div>
    );
  }

  /* =======================================================
     PATIENT APPLICATION
  ======================================================= */

  return (
    <div className="app">

      <Navbar
        user={user}
        page={page}
        setPage={setPage}
        onLogout={
          handlePatientLogout
        }
      />

      <main className="main-content">

        {page ===
          "dashboard" && (
          <DashboardPage
            user={user}
            appointments={
              appointments
            }
            upcomingAppointments={
              upcomingAppointments
            }
            completedAppointments={
              completedAppointments
            }
            recentAppointment={
              recentAppointment
            }
            setPage={
              setPage
            }
          />
        )}

        {page ===
          "hospitals" && (
          <HospitalsPage
            search={
              search
            }
            setSearch={
              setSearch
            }
            selectedHospitalFilter={
              selectedHospitalFilter
            }
            setSelectedHospitalFilter={
              setSelectedHospitalFilter
            }
            selectedSpecialtyFilter={
              selectedSpecialtyFilter
            }
            setSelectedSpecialtyFilter={
              setSelectedSpecialtyFilter
            }
            allHospitals={
              allHospitals
            }
            allSpecialties={
              allSpecialties
            }
            onBook={
              openBooking
            }
          />
        )}

        {page ===
          "appointments" && (
          <AppointmentsPage
            appointments={
              appointments
            }
            getAppointmentStatus={
              getAppointmentStatus
            }
            onCancel={
              cancelAppointment
            }
            onReschedule={
              openReschedule
            }
          />
        )}

        {page ===
          "profile" && (
          <ProfilePage
            user={
              user
            }
            appointments={
              appointments
            }
            upcomingAppointments={
              upcomingAppointments
            }
            completedAppointments={
              completedAppointments
            }
            setPage={
              setPage
            }
            onLogout={
              handlePatientLogout
            }
          />
        )}

      </main>

      {/* =================================================
          BOOKING MODAL
      ================================================= */}

      {selectedDoctor &&
        selectedHospital && (
          <BookingModal
            hospital={
              selectedHospital
            }
            doctor={
              selectedDoctor
            }
            selectedDate={
              selectedDate
            }
            setSelectedDate={
              setSelectedDate
            }
            selectedSlot={
              selectedSlot
            }
            setSelectedSlot={
              setSelectedSlot
            }
            onClose={
              closeBooking
            }
            onConfirm={
              confirmAppointment
            }
          />
        )}

      {/* =================================================
          RESCHEDULE MODAL
      ================================================= */}

      {rescheduleAppointment && (
        <RescheduleModal
          appointment={
            rescheduleAppointment
          }
          setAppointment={
            setRescheduleAppointment
          }
          onClose={() =>
            setRescheduleAppointment(
              null
            )
          }
          onSave={
            saveReschedule
          }
        />
      )}

    </div>
  );
}

export default App;