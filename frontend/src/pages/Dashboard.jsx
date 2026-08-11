import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN =>", token);

        const res = await axios.get(
          "https://job-portal-lezm.onrender.com/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 5000,
          }
        );

        console.log("PROFILE =>", res.data);

        setUser(res.data.user);
      } catch (error) {
        console.log("ERROR =>", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <h2>Loading profile...</h2>;

  if (!user) return <h2>Failed to load profile</h2>;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Dashboard</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Experience:</strong> {user.experience}</p>
      <p><strong>Previous Company:</strong> {user.previousCompany}</p>
      <p><strong>Notice Period:</strong> {user.noticePeriod}</p>
    </div>
  );
}

export default Dashboard;