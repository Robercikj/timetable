import React, { useState, useEffect } from "react";
import {
    cancelLesson,
    createLesson,
    fetchLessons,
    fetchUpcomingTrainerLessons,
    registerForLesson
} from "../../services/api"; // Assuming these API functions exist

const TraineeLessons = () => {
    const [upcomingLessons, setUpcomingLessons] = useState([]); // Store upcoming lessons for the trainer
    const [error, setError] = useState(null); // Store error messages
    const [loading, setLoading] = useState(true); // Loading state

    const fetchLessons = async () => {
        try {
            const lessons = await fetchUpcomingTrainerLessons(); // Fetch upcoming lessons
            setUpcomingLessons(lessons);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching upcoming lessons:", error);
            setError("Failed to fetch upcoming lessons.");
            setLoading(false);
        }
    };

    const handleCancel = async (lessonId) => {
        try {
            await cancelLesson(lessonId);
            alert("Successfully cancelled the lesson!");  // Show success message
            fetchLessons();
        } catch (error) {
            alert("Error while cancelling the lesson.");
        }
    };

    useEffect(() => {
        // Fetch upcoming trainer lessons
        fetchLessons();
    }, []);


    // Show the trainee lessons content
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="lesson-container">
            <h2>Your Upcoming Lessons</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error if any */}

            <div className="lessons-list">
                {upcomingLessons.length > 0 ? (
                    upcomingLessons.map((lesson) => (
                        <div key={lesson.id} className="lesson-item">
                            <p>{lesson.name} - {lesson.startTime} to {lesson.endTime}</p>
                            <p>Available Capacity: {lesson.remainingCapacity}</p>

                            <h4>Registered Trainees:</h4>
                            {lesson.trainees && lesson.trainees.length > 0 ? (
                                <ul>
                                    {lesson.trainees.map((trainee) => (
                                        <li key={trainee.id}>
                                            {trainee.firstName} {trainee.lastName} ({trainee.email})
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No trainees registered for this lesson.</p>
                            )}
                            <button onClick={() => handleCancel(lesson.id)}>Cancel</button>
                        </div>
                    ))
                ) : (
                    <p>No upcoming lessons available.</p>
                )}
            </div>
        </div>
    );
};

export default TraineeLessons;