import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `https://job-portal-lezm.onrender.com/api/jobs/${id}`
        );
        setJob(res.data.job);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <h1 className="fw-bold mb-3">{job.title}</h1>

          <p className="mb-2">
            <strong>Company:</strong> {job.company}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {job.location}
          </p>
          <p className="mb-2">
            <strong>Salary:</strong> {job.salary}
          </p>
          <p className="mb-2">
            <strong>Experience:</strong> {job.experience}
          </p>
          <p className="mb-4">
            <strong>Job Type:</strong> {job.jobType}
          </p>

          <h4 className="fw-bold">Job Description</h4>
          <p className="text-muted">{job.description}</p>

          <h4 className="fw-bold mt-4">Required Skills</h4>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="badge bg-primary p-2">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-success">
              Apply Now
            </button>

            <Link to="/jobs" className="btn btn-outline-secondary">
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}