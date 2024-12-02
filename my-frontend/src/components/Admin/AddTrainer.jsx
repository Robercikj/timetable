import React, { useState } from "react";
import { addTrainer } from "../../services/api";

const AddTrainer = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addTrainer({ firstName, lastName, email, phoneNumber });
            console.log(response)
            setMessage("Trainer added successfully!");
            setFirstName("");
            setLastName("");
            setEmail("")
            setPhoneNumber("")
        } catch (error) {
            setMessage("Error adding trainer.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Trainer</h2>
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
            <button type="submit">Add Trainer</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AddTrainer;