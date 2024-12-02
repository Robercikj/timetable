import React, { useState } from "react";
import { createLesson } from "../../services/api";

const AddLesson = () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const startTim = startTime.replaceAll("T", " ");
            console.log(startTim)
            const endTim = endTime.replaceAll("T", " ");
            console.log(endTim)
            await createLesson({ startTime: startTim, endTime: endTim, maxCapacity: Number(maxCapacity) });
            setMessage("Lesson created successfully!");
            setStartTime("");
            setEndTime("");
            setMaxCapacity("");
        } catch (error) {
            setMessage("Error creating lesson.");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Lesson</h2>
            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
            />
            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Max Capacity"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                required
            />
            <button type="submit">Add Lesson</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AddLesson;
