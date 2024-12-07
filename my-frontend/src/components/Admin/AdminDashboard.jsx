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
    const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-renders

    const handleUserAdded = () => {
        fetchData();
        setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger refresh
    };

    const fetchData = async () => {
        try {
            const trainersData = await fetchTrainers(); // Fetch all trainers
            const traineesData = await fetchTrainees(); // Fetch all trainees
            console.log(traineesData)
            setTrainers(trainersData);
            setTrainees(traineesData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data.");
            setLoading(false);
        }
    };
    // Fetch trainers and trainees when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = () => {
        fetchData(); // Re-fetch trainers and trainees
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading while fetching data
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <AddTrainer onUpdate={handleUserAdded} />
            <AddTrainee onUpdate={handleUserAdded} />
            <AssignTraineeToTrainer onUpdate={handleUpdate} key={refreshKey} />

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
                            {trainee.firstName} {trainee.lastName} ({trainee.email}).
                            Trainer: {trainee.trainer ? `${trainee.trainer.firstName} ${trainee.trainer.lastName}` : "None"}`
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
