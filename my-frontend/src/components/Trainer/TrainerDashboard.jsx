import React, {useState} from "react";
import AddLesson from "./AddLesson";
import AssignTrainee from "./AssignTrainee";
import TrainerLessons from "./TrainerLessons";
import TrainerTrainees from "./TrainerTrainees";

const TrainerDashboard = () => {
    const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-renders


    const handleLessonsAdded = () => {
        setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger refresh
    };

    return (
        <div>
            <h1>Your Calendar</h1>
            <AddLesson onUpdate={handleLessonsAdded} />
            <AssignTrainee />
            <TrainerLessons key={refreshKey} />
            <TrainerTrainees/>
        </div>
    );
};

export default TrainerDashboard;
