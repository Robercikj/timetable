import React, { useEffect, useState } from "react";
import {fetchTrainerTrainees} from "../../services/api";

const TrainerTrainees = () => {
    const [trainees, setTrainees] = useState([]);

    useEffect((trainerId) => {
        const loadTrainees = async () => {
            try {
                const data = await fetchTrainerTrainees(trainerId);
                setTrainees(data);
            } catch(error) {
                console.error("Error fetching trainee lessons:", error);
                console.error("API call: fetchUpcomingTraineeLessons failed");
            }
        };
        loadTrainees();
    }, []);

    return (
        <div>
            <h2>Your Trainees</h2>
            <ul>
                {trainees.map((trainee) => (
                    <li key={trainee.id}>
                        {trainee.firstName} {trainee.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainerTrainees;
