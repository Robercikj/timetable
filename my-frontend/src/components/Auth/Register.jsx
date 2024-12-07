import React, { useState } from "react";
import { register } from "../../services/api";

const Register = () => {
    const [registerRole, setRegisterRole] = useState("TRAINEE");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({
                role: registerRole,
                email,
                firstName,
                lastName,
                phoneNumber,
                username: nickname,
                password,
            });
            setMessage("Registration successful. Please log in.");
            setRegisterRole("TRAINEE");
            setEmail("");
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            setNickname("");
            setPassword("");
        } catch (err) {
            setMessage("Registration failed. Please check your inputs.");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <select value={registerRole} onChange={(e) => setRegisterRole(e.target.value)} required>
                <option value="TRAINEE">Trainee</option>
                <option value="TRAINER">Trainer</option>
            </select>
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
