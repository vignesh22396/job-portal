import { useEffect, useState } from "react";
import axios from "axios";

export default function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://job-portal-lezm.onrender.com/api/applications/recruiter/applicants",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API RESPONSE =>", res.data);
        setApplications(res.data.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://job-portal-lezm.onrender.com/api/applications/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI instantly
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4 text-center">
        Recruiter Dashboard
      </h1>

      {applications.length === 0 ? (
        <div className="alert alert-info text-center">
          No applicants yet.
        </div>
      ) : (
        <div className="row">
          {applications.map((app) => (
            <div className="col-md-6 mb-4" key={app._id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">{app.job.title}</h5>
                  <p className="text-muted mb-3">
                    {app.job.company}
                  </p>

                  <hr />

                  <h6 className="fw-bold">Candidate</h6>

                  <p className="mb-1">
                    <strong>Name:</strong> {app.candidate.name}
                  </p>

                  <p className="mb-1">
                    <strong>Email:</strong> {app.candidate.email}
                  </p>

                  <p className="mb-1">
                    <strong>Phone:</strong> {app.candidate.phone}
                  </p>

                  <p className="mb-3">
                    <strong>Experience:</strong> {app.candidate.experience}
                  </p>

                  <span
                    className={`badge ${
                      app.status === "Applied"
                        ? "bg-primary"
                        : app.status === "Shortlisted"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {app.status}
                  </span>

                  <div className="mt-3 d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        updateStatus(app._id, "Shortlisted")
                      }
                    >
                      Shortlist
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        updateStatus(app._id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

