import React, { useState, useEffect } from "react";
import { fetchUpcomingTrainerLessons, registerForLesson } from "../../services/api"; // Assuming these API functions exist

const TraineeLessons = () => {
    const [upcomingLessons, setUpcomingLessons] = useState([]); // Store upcoming lessons for the trainer
    const [error, setError] = useState(null); // Store error messages
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch upcoming trainer lessons
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

        fetchLessons();
    }, []);

    // Handle enrolling in a lesson
    const handleEnroll = async (lessonId) => {
        try {
            // Check if there is enough capacity before enrolling
            const lesson = upcomingLessons.find((lesson) => lesson.id === lessonId);
            if (lesson && lesson.remainingCapacity > 0) {
                await registerForLesson(lessonId);  // Call API to enroll in the lesson
                alert("Successfully enrolled in the lesson!");  // Show success message
            } else {
                alert("No capacity available to enroll in this lesson.");
            }
        } catch (error) {
            console.error("Error enrolling in lesson:", error);
            setError("Failed to enroll in the lesson.");
        }
    };

    // Show the trainee lessons content
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Upcoming Lessons</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if any */}

            <ul>
                {upcomingLessons.length > 0 ? (
                    upcomingLessons.map((lesson) => (
                        <li key={lesson.id}>
                            <p>{lesson.name} - {lesson.startTime} to {lesson.endTime}</p>
                            <p>Available Capacity: {lesson.remainingCapacity}</p>

                            {/* Conditionally render the enroll button based on capacity */}
                            {lesson.remainingCapacity > 0 ? (
                                <button onClick={() => handleEnroll(lesson.id)}>Enroll</button>
                            ) : (
                                <p>No capacity available</p>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No upcoming lessons available.</p>
                )}
            </ul>
        </div>
    );
};

export default TraineeLessons;
