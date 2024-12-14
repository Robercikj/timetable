import React from "react";
import TraineeLessons from "./TraineeLessons";
import TrainerInfoAndAssignment from "./TrainerInfoAndAssignment";  // Import the new component

const TraineeDashboard = () => {
    return (
        <div>
            <h1>Trainee</h1>
            <TrainerInfoAndAssignment />  {/* Display the trainer information and assignment */}
            <TraineeLessons />  {/* Display the trainee lessons */}
        </div>
    );
};

export default TraineeDashboard;