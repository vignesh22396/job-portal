import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let result = jobs;

    // Search by title or company
    if (search) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by location
    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by job type
    if (jobType) {
      result = result.filter((job) => job.jobType === jobType);
    }

    setFilteredJobs(result);
  }, [search, location, jobType, jobs]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold">Available Jobs</h1>

      {/* Search & Filter */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-muted mb-4">
        Showing <strong>{filteredJobs.length}</strong> job(s)
      </p>

      {/* Job cards */}
      <div className="row">
        {filteredJobs.length === 0 ? (
          <div className="col-12 text-center">
            <p>No jobs found.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div className="col-md-6 col-lg-4 mb-4" key={job._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{job.title}</h5>

                  <p className="text-muted mb-1">
                    <strong>Company:</strong> {job.company}
                  </p>

                  <p className="text-muted mb-1">
                    <strong>Location:</strong> {job.location}
                  </p>

                  <p className="text-success fw-semibold mb-2">
                    {job.salary}
                  </p>

                  <span className="badge bg-secondary mb-3 align-self-start">
                    {job.jobType}
                  </span>

                  <div className="mt-auto">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-primary w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}