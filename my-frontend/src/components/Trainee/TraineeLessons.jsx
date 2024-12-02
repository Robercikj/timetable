import React, { useState, useEffect } from "react";
import { fetchUpcomingTrainerLessons, fetchUpcomingTraineeLessons, registerForLesson } from "../../services/api"; // Assuming these API functions exist

const TraineeLessons = () => {
    const [upcomingLessons, setUpcomingLessons] = useState([]); // Store upcoming lessons for the trainer
    const [enrolledLessons, setEnrolledLessons] = useState([]); // Store lessons the trainee is already enrolled in
    const [error, setError] = useState(null); // Store error messages
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch upcoming trainer lessons and enrolled lessons
        const fetchLessons = async () => {
            try {
                const upcoming = await fetchUpcomingTrainerLessons(); // Fetch upcoming lessons
                const enrolled = await fetchUpcomingTraineeLessons(); // Fetch enrolled lessons

                setUpcomingLessons(upcoming);
                console.log(upcoming)
                setEnrolledLessons(enrolled);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching lessons:", error);
                setError("Failed to fetch lessons.");
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
                // After successful enrollment, fetch the updated list of enrolled lessons
                const updatedEnrolledLessons = await fetchUpcomingTraineeLessons();
                setEnrolledLessons(updatedEnrolledLessons); // Update the enrolled lessons list
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

            <h3>Your Enrolled Lessons</h3>
            {enrolledLessons.length > 0 ? (
                <ul>
                    {enrolledLessons.map((lesson) => (
                        <li key={lesson.id}>
                            <p>{lesson.name} - {lesson.startTime} to {lesson.endTime}</p>
                            <p>Enrolled</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You are not enrolled in any lessons.</p>
            )}

            <h3>Upcoming Lessons</h3>
            <ul>
                {upcomingLessons.length > 0 ? (
                    upcomingLessons.map((lesson) => (
                        <li key={lesson.id}>
                            <p>{lesson.name} - {lesson.startTime} to {lesson.endTime}</p>
                            <p>Available Capacity: {lesson.remainingCapacity}</p>
                            {/* Disable the button if no capacity is available */}
                            <button onClick={() => handleEnroll(lesson.id)} disabled={lesson.remainingCapacity === 0}>
                                Enroll
                            </button>
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
