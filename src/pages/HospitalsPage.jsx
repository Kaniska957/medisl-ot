import { useState } from "react";

function HospitalsPage({
  search,
  setSearch,
  selectedHospitalFilter,
  setSelectedHospitalFilter,
  selectedSpecialtyFilter,
  setSelectedSpecialtyFilter,
  allHospitals,
  allSpecialties,
  onBook,
}) {
  const [
    departmentSelections,
    setDepartmentSelections,
  ] = useState({});

  /* =====================================================
     GET DEPARTMENTS
  ===================================================== */

  const getDepartments = (
    hospital
  ) => {
    return [
      ...new Set(
        (hospital.doctors || []).map(
          (doctor) =>
            doctor.specialty
        )
      ),
    ];
  };

  /* =====================================================
     FILTER HOSPITALS
  ===================================================== */

  const filteredHospitals =
    allHospitals
      .map((hospital) => {

        const selectedDepartment =
          departmentSelections[
            hospital.id
          ] ||
          "All Departments";

        let doctors =
          hospital.doctors || [];

        /* ---------------------------------------------
           DEPARTMENT FILTER
        --------------------------------------------- */

        if (
          selectedDepartment !==
          "All Departments"
        ) {
          doctors =
            doctors.filter(
              (doctor) =>
                doctor.specialty ===
                selectedDepartment
            );
        }

        /* ---------------------------------------------
           SPECIALIZATION FILTER
        --------------------------------------------- */

        if (
          selectedSpecialtyFilter
        ) {
          doctors =
            doctors.filter(
              (doctor) =>
                doctor.specialty ===
                selectedSpecialtyFilter
            );
        }

        /* ---------------------------------------------
           SEARCH
        --------------------------------------------- */

        if (search.trim()) {

          const query =
            search
              .toLowerCase()
              .trim();

          const hospitalName =
            (
              hospital.name ||
              ""
            ).toLowerCase();

          const hospitalLocation =
            (
              hospital.location ||
              ""
            ).toLowerCase();

          const hospitalAddress =
            (
              hospital.address ||
              ""
            ).toLowerCase();

          const hospitalMatches =
            hospitalName.includes(
              query
            ) ||
            hospitalLocation.includes(
              query
            ) ||
            hospitalAddress.includes(
              query
            );

          const matchingDoctors =
            doctors.filter(
              (doctor) =>
                (
                  doctor.name ||
                  ""
                )
                  .toLowerCase()
                  .includes(
                    query
                  ) ||
                (
                  doctor.specialty ||
                  ""
                )
                  .toLowerCase()
                  .includes(
                    query
                  )
            );

          if (
            !hospitalMatches &&
            matchingDoctors.length ===
              0
          ) {
            return null;
          }

          /*
            If the hospital itself matches the search,
            keep all currently filtered doctors.
          */

          if (
            hospitalMatches
          ) {
            doctors =
              doctors;
          } else {
            doctors =
              matchingDoctors;
          }
        }

        /* ---------------------------------------------
           HOSPITAL FILTER
        --------------------------------------------- */

        if (
          selectedHospitalFilter &&
          hospital.name !==
            selectedHospitalFilter
        ) {
          return null;
        }

        /*
          IMPORTANT:
          We no longer remove hospitals when they have
          zero doctors.

          This allows newly registered hospitals to appear
          in the Patient Portal immediately.
        */

        return {
          ...hospital,
          doctors,
        };
      })
      .filter(Boolean);

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");

    setSelectedHospitalFilter(
      ""
    );

    setSelectedSpecialtyFilter(
      ""
    );

    setDepartmentSelections(
      {}
    );
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="hospitals-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-heading">

        <div>

          <h1>
            Hospitals & Doctors
          </h1>

          <p>
            Select a hospital, choose a department,
            and find your doctor.
          </p>

        </div>

      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="search-section">

        <div className="hospital-search-box">

          <span
            className="hospital-search-icon"
            aria-hidden="true"
          >

            <svg
              viewBox="0 0 24 24"
              width="21"
              height="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >

              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
              />

            </svg>

          </span>

          <input
            type="text"
            placeholder="Search hospitals or doctors..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="hospital-search-input"
          />

          {search && (

            <button
              type="button"
              className="hospital-search-clear"
              onClick={() =>
                setSearch("")
              }
              aria-label="Clear search"
            >
              ×
            </button>

          )}

        </div>

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="filter-row">

        {/* HOSPITAL FILTER */}

        <select
          value={
            selectedHospitalFilter
          }
          onChange={(e) =>
            setSelectedHospitalFilter(
              e.target.value
            )
          }
        >

          <option value="">
            All Hospitals
          </option>

          {allHospitals.map(
            (hospital) => (

              <option
                key={hospital.id}
                value={hospital.name}
              >
                {hospital.name}
              </option>

            )
          )}

        </select>

        {/* SPECIALTY FILTER */}

        <select
          value={
            selectedSpecialtyFilter
          }
          onChange={(e) =>
            setSelectedSpecialtyFilter(
              e.target.value
            )
          }
        >

          <option value="">
            All Specializations
          </option>

          {allSpecialties.map(
            (specialty) => (

              <option
                key={specialty}
                value={specialty}
              >
                {specialty}
              </option>

            )
          )}

        </select>

        {/* CLEAR */}

        {(search ||
          selectedHospitalFilter ||
          selectedSpecialtyFilter) && (

          <button
            className="reschedule-btn"
            onClick={
              clearFilters
            }
          >
            Clear Filters
          </button>

        )}

      </div>

      {/* =================================================
          HOSPITAL LIST
      ================================================= */}

      <div className="hospital-list">

        {filteredHospitals.length ===
        0 ? (

          <div className="empty-state">

            <h3>
              No hospitals or doctors found
            </h3>

            <p>
              Try changing your search or filters.
            </p>

            <button
              className="primary-btn"
              onClick={
                clearFilters
              }
            >
              Clear Filters
            </button>

          </div>

        ) : (

          filteredHospitals.map(
            (hospital) => {

              const departments =
                getDepartments(
                  hospital
                );

              const currentDepartment =
                departmentSelections[
                  hospital.id
                ] ||
                "All Departments";

              return (

                <div
                  className="hospital-card"
                  key={hospital.id}
                >

                  {/* =====================================
                      HOSPITAL HEADER
                  ===================================== */}

                  <div className="hospital-header">

                    <div>

                      <h2>
                        {hospital.name}
                      </h2>

                      <p>
                        {hospital.location}
                      </p>

                      {hospital.address && (

                        <small>
                          {hospital.address}
                        </small>

                      )}

                    </div>

                    <span className="hospital-badge">
                      Registered Hospital
                    </span>

                  </div>

                  {/* =====================================
                      DEPARTMENT
                  ===================================== */}

                  {departments.length >
                    0 && (

                    <div className="hospital-department">

                      <label>
                        Select Department
                      </label>

                      <select
                        value={
                          currentDepartment
                        }
                        onChange={(e) =>
                          setDepartmentSelections(
                            (current) => ({
                              ...current,

                              [hospital.id]:
                                e.target.value,
                            })
                          )
                        }
                      >

                        <option value="All Departments">
                          All Departments
                        </option>

                        {departments.map(
                          (department) => (

                            <option
                              key={
                                department
                              }
                              value={
                                department
                              }
                            >
                              {department}
                            </option>

                          )
                        )}

                      </select>

                    </div>

                  )}

                  {/* =====================================
                      DOCTOR TITLE
                  ===================================== */}

                  <div className="doctor-section-title">

                    <h3>

                      {currentDepartment ===
                      "All Departments"
                        ? "Available Doctors"
                        : `${currentDepartment} Doctors`}

                    </h3>

                    <span>
                      {
                        hospital.doctors
                          .length
                      }{" "}
                      doctor(s)
                    </span>

                  </div>

                  {/* =====================================
                      NO DOCTORS
                  ===================================== */}

                  {hospital.doctors
                    .length ===
                  0 ? (

                    <div className="empty-state">

                      <h3>
                        No doctors available yet
                      </h3>

                      <p>
                        This hospital has been registered,
                        but doctors have not been added yet.
                      </p>

                    </div>

                  ) : (

                    /* =================================
                       DOCTOR LIST
                    ================================= */

                    <div className="doctor-list">

                      {hospital.doctors.map(
                        (doctor) => (

                          <div
                            className="doctor-row"
                            key={
                              doctor.id ||
                              doctor.email ||
                              doctor.name
                            }
                          >

                            {/* AVATAR */}

                            <div className="doctor-avatar">

                              {doctor.name
                                ?.replace(
                                  "Dr. ",
                                  ""
                                )
                                .charAt(0)
                                .toUpperCase() ||
                                "D"}

                            </div>

                            {/* DETAILS */}

                            <div className="doctor-main">

                              <h3>
                                {
                                  doctor.name
                                }
                              </h3>

                              <p>
                                {
                                  doctor.specialty
                                }
                              </p>

                              {/* =================================
                                  RATING / REVIEWS / EXPERIENCE
                              ================================= */}

                              <div className="doctor-info-meta">

                                <span className="doctor-rating-badge">
                                  ★{" "}
                                  {
                                    doctor.rating ||
                                    "New"
                                  }
                                </span>

                                <span className="doctor-reviews">
                                  {
                                    doctor.reviews ||
                                    0
                                  }{" "}
                                  reviews
                                </span>

                                <span className="doctor-experience">
                                  {
                                    doctor.experience ||
                                    0
                                  }{" "}
                                  yrs experience
                                </span>

                              </div>

                              {/* =================================
                                  AVAILABLE TIME SLOTS
                              ================================= */}

                              <div className="doctor-availability">

                                <span className="availability-label">
                                  Available slots
                                </span>

                                {doctor.slots &&
                                doctor.slots.length >
                                  0 ? (

                                  <div className="slot-list">

                                    {doctor.slots.map(
                                      (
                                        slot,
                                        index
                                      ) => (

                                        <span
                                          className="slot-chip"
                                          key={`${slot}-${index}`}
                                        >
                                          {slot}
                                        </span>

                                      )
                                    )}

                                  </div>

                                ) : (

                                  <span className="no-slots-text">
                                    No slots available
                                  </span>

                                )}

                              </div>

                            </div>

                            {/* =================================
                                FEE
                            ================================= */}

                            <div className="doctor-fee">

                              <span>
                                Consultation
                              </span>

                              <strong>
                                ₹
                                {
                                  doctor.fee ||
                                  0
                                }
                              </strong>

                            </div>

                            {/* =================================
                                BOOK
                            ================================= */}

                            <button
                              className="primary-btn"
                              onClick={() =>
                                onBook(
                                  hospital,
                                  doctor
                                )
                              }
                              disabled={
                                !doctor.slots ||
                                doctor.slots.length ===
                                  0
                              }
                            >

                              {doctor.slots &&
                              doctor.slots.length >
                                0
                                ? "Book Appointment"
                                : "No Slots Available"}

                            </button>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              );
            }
          )

        )}

      </div>

    </div>
  );
}

export default HospitalsPage;