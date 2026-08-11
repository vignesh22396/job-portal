import { useEffect, useState } from "react";
import axios from "axios";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/applications/my-applications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(res.data.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">My Applications</h1>

      {applications.length === 0 ? (
        <div className="alert alert-info">
          You have not applied for any jobs yet.
        </div>
      ) : (
        <div className="row">
          {applications.map((app) => (
            <div className="col-md-6 mb-4" key={app._id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">
                    {app.job?.title}
                  </h5>

                  <p className="text-muted mb-1">
                    <strong>Company:</strong> {app.job?.company}
                  </p>

                  <p className="text-muted mb-3">
                    <strong>Location:</strong> {app.job?.location}
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

                  <p className="small text-muted mt-3 mb-0">
                    Applied on: {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}