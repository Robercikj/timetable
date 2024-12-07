import React, { useState } from "react";
import {addTrainee} from "../../services/api";

const AddTrainee = ({ onUpdate }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTrainee({ firstName, lastName, email, phoneNumber });
            setMessage("Trainee added successfully!");
            setFirstName("");
            setLastName("");
            setEmail("")
            setPhoneNumber("")
            onUpdate();
        } catch (error) {
            setMessage("Error adding trainee.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Trainee</h2>
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            <button type="submit">Add Trainee</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AddTrainee;