import { useState } from "react";
import api from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const res = await api.post("/auth/login", {
            email,
            password,
        });

        console.log(res.data);

        localStorage.setItem("token", res.data.token);

        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.location.href = "/dashboard";
        
        } catch (error) {
        alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );

}