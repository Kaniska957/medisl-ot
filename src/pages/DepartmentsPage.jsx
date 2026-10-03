import { useState } from "react";

function DepartmentsPage({
  departments,
  setDepartments,
  setPage,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");

  const addDepartment = (e) => {
    e.preventDefault();

    const department = newDepartment.trim();

    if (!department) {
      alert("Please enter a department name.");
      return;
    }

    const alreadyExists = departments.some(
      (item) =>
        item.toLowerCase() === department.toLowerCase()
    );

    if (alreadyExists) {
      alert("This department already exists.");
      return;
    }

    setDepartments([...departments, department]);

    setNewDepartment("");
    setShowAddForm(false);

    alert("Department added successfully.");
  };

  const removeDepartment = (departmentToRemove) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${departmentToRemove}?`
    );

    if (!confirmed) {
      return;
    }

    setDepartments(
      departments.filter(
        (department) =>
          department !== departmentToRemove
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

          <h1>Departments</h1>

          <p>
            Manage the departments available in your
            hospital.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            setShowAddForm(!showAddForm)
          }
        >
          {showAddForm
            ? "Close Form"
            : "+ Add Department"}
        </button>
      </div>

      {showAddForm && (
        <div className="department-form-card">
          <div>
            <h2>Add New Department</h2>

            <p>
              Enter the name of the medical department
              you want to add.
            </p>
          </div>

          <form onSubmit={addDepartment}>
            <div className="department-form-row">
              <input
                type="text"
                placeholder="Example: Neurology"
                value={newDepartment}
                onChange={(e) =>
                  setNewDepartment(e.target.value)
                }
              />

              <button
                type="submit"
                className="primary-btn"
              >
                Add Department
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="department-management-card">
        <div className="department-management-header">
          <div>
            <h2>Hospital Departments</h2>

            <p>
              {departments.length} department
              {departments.length !== 1 ? "s" : ""}{" "}
              currently available
            </p>
          </div>

          <span className="department-count">
            {departments.length}
          </span>
        </div>

        {departments.length === 0 ? (
          <div className="hospital-empty-state">
            <h3>No departments available</h3>

            <p>
              Add your first department using the button
              above.
            </p>
          </div>
        ) : (
          <div className="department-list">
            {departments.map((department, index) => (
              <div
                className="department-item"
                key={`${department}-${index}`}
              >
                <div className="department-icon">
                  +
                </div>

                <div className="department-info">
                  <h3>{department}</h3>

                  <span>
                    Medical Department
                  </span>
                </div>

                <button
                  className="department-remove-btn"
                  onClick={() =>
                    removeDepartment(department)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

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
          onClick={() =>
            setPage("doctors")
          }
        >
          Manage Doctors →
        </button>
      </div>
    </div>
  );
}

export default DepartmentsPage;