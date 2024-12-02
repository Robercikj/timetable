import React from "react";
import AddLesson from "./AddLesson";
import AssignTrainee from "./AssignTrainee";
import TrainerLessons from "./TrainerLessons";
import TrainerTrainees from "./TrainerTrainees";

const TrainerDashboard = () => {
    return (
        <div>
            <h1>Trainer Dashboard</h1>
            <AddLesson />
            <AssignTrainee />
            <TrainerLessons />
            <TrainerTrainees />
        </div>
    );
};

export default TrainerDashboard;
