import React, { useState, useEffect } from "react";
import { fetchTrainers, fetchTrainees } from "../../services/api"; // Assuming these API functions exist
import AddTrainer from "./AddTrainer";
import AddTrainee from "./AddTrainee";
import AssignTraineeToTrainer from "./AssignTraineeToTrainer";

const AdminDashboard = () => {
    const [trainers, setTrainers] = useState([]); // Store all trainers
    const [trainees, setTrainees] = useState([]); // Store all trainees
    const [error, setError] = useState(null); // Store error messages
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch trainers and trainees when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trainersData = await fetchTrainers(); // Fetch all trainers
                const traineesData = await fetchTrainees(); // Fetch all trainees
                setTrainers(trainersData);
                setTrainees(traineesData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading while fetching data
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <AddTrainer />
            <AddTrainee />
            <AssignTraineeToTrainer />

            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}

            <h2>All Trainers</h2>
            {trainers.length > 0 ? (
                <ul>
                    {trainers.map((trainer) => (
                        <li key={trainer.id}>
                            {trainer.firstName} {trainer.lastName} ({trainer.email})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No trainers found.</p>
            )}

            <h2>All Trainees</h2>
            {trainees.length > 0 ? (
                <ul>
                    {trainees.map((trainee) => (
                        <li key={trainee.id}>
                            {trainee.firstName} {trainee.lastName} ({trainee.email})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No trainees found.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
