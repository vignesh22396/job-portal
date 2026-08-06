import { useState } from "react";
import axios from "axios";

export default function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "Full-time",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      };

      const res = await axios.post(
        "http://localhost:5000/api/jobs/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job created successfully");
      console.log(res.data);

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "Full-time",
        description: "",
        skills: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4 fw-bold">Post a New Job</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  name="salary"
                  className="form-control"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  name="experience"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Job Type</label>
                <select
                  name="jobType"
                  className="form-select"
                  value={formData.jobType}
                  onChange={handleChange}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                className="form-control"
                placeholder="React, JavaScript, CSS"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}