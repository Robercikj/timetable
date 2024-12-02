import React, { useState } from "react";
import { login } from "../../services/api";  // Import the login function from api.js

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from api.js
            const response = await login({ username, password });

            // Check if the response contains a valid token and role
            if (response.token && response.role) {
                // Store the JWT token and role in localStorage
                localStorage.setItem("jwt-token", response.token); // Store the token
                localStorage.setItem("role", response.role); // Store the user role

                // Call the onLoginSuccess function passed from App.js
                onLoginSuccess(response.role, response.token);  // Pass the role to App.js to handle login success
            } else {
                setErrorMessage("Invalid username or password.");
            }
        } catch (error) {
            setErrorMessage("An error occurred during login. Please try again.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
    );
};

export default Login;
