import React, { useState, useEffect } from "react";
import { fetchCurrentTrainer, fetchTrainers, assignTrainerToCurrentTrainee } from "../../services/api"; // Assuming these API functions exist

const TrainerInfoAndAssignment = () => {
    const [currentTrainer, setCurrentTrainer] = useState(null); // Store current trainer info
    const [trainersList, setTrainersList] = useState([]); // Store available trainers
    const [error, setError] = useState(null); // Store error messages
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch current trainer for the logged-in trainee
        const fetchTrainerInfo = async () => {
            try {
                const trainer = await fetchCurrentTrainer();
                setCurrentTrainer(trainer);
                setLoading(false);  // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching trainer:", error);
                setError("Failed to fetch trainer information.");
                setLoading(false);
            }
        };

        fetchTrainerInfo();
    }, []);

    // Function to handle trainer assignment
    const handleAssignTrainer = async (trainerId) => {
        try {
            await assignTrainerToCurrentTrainee(trainerId);  // Call API to assign trainer
            setCurrentTrainer({ id: trainerId }); // Update state with the new trainer
            window.location.reload(); // Reload the page after trainer is assigned
        } catch (error) {
            console.error("Error assigning trainer:", error);
            setError("Failed to assign trainer.");
        }
    };

    // Fetch list of available trainers
    const fetchAvailableTrainers = async () => {
        try {
            const trainers = await fetchTrainers(); // Fetch the list of available trainers
            console.log(trainers)
            setTrainersList(trainers);
        } catch (error) {
            console.error("Error fetching trainers list:", error);
            setError("Failed to fetch available trainers.");
        }
    };

    // Show the trainee dashboard content
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if any */}

            {currentTrainer ? (
                <div>
                    <h3>Your Current Trainer</h3>
                    <p>Name: {currentTrainer.firstName} {currentTrainer.lastName}</p>
                    <p>Email: {currentTrainer.email}</p>
                    <p>Phone: {currentTrainer.phoneNumber}</p>
                </div>
            ) : (
                <div>
                <h3>You don't have a trainer assigned.</h3>
                    <button onClick={fetchAvailableTrainers}>Assign a Trainer</button>
                </div>
            )}

            {/* If there are available trainers to assign */}
            {trainersList.length > 0 && !currentTrainer && (
                <div>
                    <h4>Available Trainers</h4>
                    <ul>
                        {trainersList.map((trainer) => (
                            <li key={trainer.id}>
                                <p>Name: {trainer.firstName} {trainer.lastName}</p>
                                <p>Email: {trainer.email}</p>
                                <p>Phone: {trainer.phoneNumber}</p>
                                <button onClick={() => handleAssignTrainer(trainer.id)}>Assign</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TrainerInfoAndAssignment;
