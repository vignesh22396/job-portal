import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/jobs">
          JobPortal
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>

            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/add-job">
                    Post Job
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-applications">
                    My Applications
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/recruiter-dashboard">
                    Recruiter
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {user?.role === "candidate" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-applications">
                    My Applications
                  </Link>
                </li>
              </>
            )}

            {user?.role === "recruiter" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-job">
                    Post Job
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/recruiter-dashboard">
                    Recruiter
                  </Link>
                </li>
              </>
            )}


          </ul>
        </div>
      </div>
    </nav>
  );
}