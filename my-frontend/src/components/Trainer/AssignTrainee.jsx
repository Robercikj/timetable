import React, { useState, useEffect } from "react";
import { fetchTraineesWithoutTrainer, assignTraineeToSelf } from "../../services/api";

const AssignTrainee = () => {
    const [trainees, setTrainees] = useState([]);
    const [selectedTrainee, setSelectedTrainee] = useState("");
    const [message, setMessage] = useState("");

    const loadTrainees = async () => {
        const data = await fetchTraineesWithoutTrainer();
        setTrainees(data);
    };

    useEffect(() => {
        loadTrainees();
    }, []);

    const handleAssign = async () => {
        try {
            await assignTraineeToSelf(selectedTrainee);
            loadTrainees();
            setMessage("Trainee assigned successfully!");
        } catch (error) {
            setMessage("Error assigning trainee.");
        }
    };

    return (
        <div>
            <h2>Assign Trainee</h2>
            <select
                value={selectedTrainee}
                onChange={(e) => setSelectedTrainee(e.target.value)}
                required
            >
                <option value="">Select Trainee</option>
                {trainees.map((trainee) => (
                    <option key={trainee.id} value={trainee.id}>
                        {trainee.firstName} {trainee.lastName}
                    </option>
                ))}
            </select>
            <button onClick={handleAssign}>Assign</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AssignTrainee;
