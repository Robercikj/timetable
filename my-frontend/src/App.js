import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Admin/AdminDashboard";
import TrainerDashboard from "./components/Trainer/TrainerDashboard";
import TraineeDashboard from "./components/Trainee/TraineeDashboard";
import Header from "./components/Layout/Header";
import "./App.css";  // Ensure the CSS is imported

const App = () => {
    const [userRole, setUserRole] = useState(null); // Store the role of the logged-in user
    const navigate = useNavigate(); // Using navigate hook to navigate after login/logout

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (token) {
            const role = localStorage.getItem("role");
            setUserRole(role); // Set user role based on saved token
        }
    }, []);

    // Handle login success
    const handleLoginSuccess = (role, token) => {
        localStorage.setItem("role", role);
        localStorage.setItem("jwt-token", token);  // You should save an actual JWT here.
        setUserRole(role);
        navigate(`/${role.toLowerCase()}`); // Navigate directly to the respective dashboard
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt-token");
        localStorage.removeItem("role");
        setUserRole(null); // Reset user role after logout
        navigate("/login"); // Redirect to login page after logging out
    };

    return (
        <div>
            <Header />
            <Routes>
                {/* Route for Login */}
                <Route
                    path="/login"
                    element={userRole ? (
                        <div>
                            <h1>{userRole} Dashboard</h1>
                            <p>Redirecting to {userRole} dashboard...</p>
                        </div>
                    ) : (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    )}
                />
                {/* Route for Register */}
                <Route path="/register" element={<Register />} />

                {/* Admin Dashboard */}
                <Route path="/admin" element={userRole === "ADMIN" ? <AdminDashboard /> : <Login />} />

                {/* Trainer Dashboard */}
                <Route path="/trainer" element={userRole === "TRAINER" ? <TrainerDashboard /> : <Login />} />

                {/* Trainee Dashboard */}
                <Route path="/trainee" element={userRole === "TRAINEE" ? <TraineeDashboard /> : <Login />} />

                {/* Home Page Route */}
                <Route
                    path="/"
                    element={userRole ? (
                        userRole === "ADMIN" ? (
                            <AdminDashboard />
                        ) : userRole === "TRAINER" ? (
                            <TrainerDashboard />
                        ) : userRole === "TRAINEE" ? (
                            <TraineeDashboard />
                        ) : null
                    ) : (
                        <div className="centered-container">
                            <h1>Welcome to your calendar!</h1>
                            <p>
                                To access the platform, please <Link to="/login">log in</Link> or <Link to="/register">register
                                here</Link>.
                            </p>
                        </div>

                    )}
                />
            </Routes>
        </div>
    );
};

export default App;
