function Navbar({ user, page, setPage, onLogout }) {
  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => setPage("dashboard")}
        style={{ cursor: "pointer" }}
      >
        MediSlot
      </div>

      <div className="nav-links">
        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "hospitals" ? "active" : ""}
          onClick={() => setPage("hospitals")}
        >
          Hospitals & Doctors
        </button>

        <button
          className={page === "appointments" ? "active" : ""}
          onClick={() => setPage("appointments")}
        >
          My Appointments
        </button>
      </div>

      <div className="nav-user">
        <button
          className="profile-trigger"
          onClick={() => setPage("profile")}
          title="View Profile"
        >
          <div className="user-avatar">
            <div className="profile-icon-head"></div>
            <div className="profile-icon-body"></div>
          </div>

          <span>{user?.name}</span>
        </button>

        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;