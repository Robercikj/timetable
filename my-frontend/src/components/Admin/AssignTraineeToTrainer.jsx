import React, { useState, useEffect } from "react";
import { fetchTrainers, fetchTrainees, assignTraineeToTrainer } from "../../services/api";

const AssignTraineeToTrainer = ({ onUpdate }) => {
    const [trainers, setTrainers] = useState([]);
    const [trainees, setTrainees] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState("");
    const [selectedTrainee, setSelectedTrainee] = useState("");
    const [message, setMessage] = useState("");

    const loadData = async () => {
        const trainersData = await fetchTrainers();
        const traineesData = await fetchTrainees();
        setTrainers(trainersData);
        setTrainees(traineesData);
        console.log(traineesData)
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await assignTraineeToTrainer(selectedTrainer, selectedTrainee);
            onUpdate();
            setMessage("Trainee assigned to trainer successfully!");
        } catch (error) {
            setMessage("Error assigning trainee.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Assign Trainee to Trainer</h2>
            <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)} required>
                <option value="">Select Trainer</option>
                {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                        {trainer.firstName} {trainer.lastName}
                    </option>
                ))}
            </select>
            <select value={selectedTrainee} onChange={(e) => setSelectedTrainee(e.target.value)} required>
                <option value="">Select Trainee</option>
                {trainees.map((trainee) => (
                    <option key={trainee.id} value={trainee.id}>
                        {trainee.firstName} {trainee.lastName}
                    </option>
                ))}
            </select>
            <button type="submit">Assign</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default AssignTraineeToTrainer;