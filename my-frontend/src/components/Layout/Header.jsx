import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const userRole = localStorage.getItem("role");

    return (
        <nav>
            <Link to="/">Home</Link>
            {userRole === "ADMIN" && <Link to="/admin">Admin Dashboard</Link>}
            {userRole === "TRAINER" && <Link to="/trainer">Trainer Dashboard</Link>}
            {userRole === "TRAINEE" && <Link to="/trainee">Trainee Dashboard</Link>}
            {userRole ? (
                <button onClick={() => {
                    localStorage.removeItem("jwt-token");
                    localStorage.removeItem("role");
                    window.location.href = "/login"; // Redirect to login
                }}>Logout</button>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Header;
