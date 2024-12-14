import React, {useState, useEffect} from "react";
import {
    fetchUpcomingTrainerLessons,
    fetchUpcomingTraineeLessons,
    registerForLesson,
    optOutFromLesson
} from "../../services/api"; // Assuming these API functions exist

const TraineeLessons = () => {
    const [upcomingLessons, setUpcomingLessons] = useState([]); // Store upcoming lessons for the trainer
    const [enrolledLessons, setEnrolledLessons] = useState([]); // Store lessons the trainee is already enrolled in
    const [error, setError] = useState(null); // Store error messages
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch upcoming trainer lessons and enrolled lessons
    const fetchLessons = async () => {
        try {
            const enrolled = await fetchUpcomingTraineeLessons(); // Fetch enrolled lessons
            const upcoming = await fetchUpcomingTrainerLessons(); // Fetch upcoming lessons
            const filteredUpcoming = upcoming.filter(
                (lesson) => !enrolled.some((enrolledLesson) => enrolledLesson.id === lesson.id)
            );
            setUpcomingLessons(filteredUpcoming);
            setEnrolledLessons(enrolled);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching lessons:", error);
            setError("Failed to fetch lessons.");
            setLoading(false);
        }
    };

    useEffect(() => {

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
                fetchLessons();
            } else {
                alert("No capacity available to enroll in this lesson.");
            }
        } catch (error) {
            console.error("Error enrolling in lesson:", error);
            setError("Failed to enroll in the lesson.");
        }
    };

    const handleOptOut = async (lessonId) => {
        try {
            // Check if there is enough capacity before enrolling
            const lesson = enrolledLessons.find((lesson) => lesson.id === lessonId);
            if (lesson) {
                console.log("Opt out")
                await optOutFromLesson(lessonId);  // Call API to enroll in the lesson
                alert("Successfully opt out from the lesson!");  // Show success message
                fetchLessons();
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
        <div className="container">
            <div className="content">
                <h2>Upcoming Lessons</h2>
                {error && <p className="form-message" style={{ color: "red" }}>{error}</p>} {/* Display error if any */}

                <h3>Your lessons</h3>
                {enrolledLessons.length > 0 ? (
                    <ul>
                        {enrolledLessons.map((lesson) => (
                            <li key={lesson.id}>
                                <p>{lesson.name} - {lesson.startTime} to {lesson.endTime}</p>
                                <p>Enrolled</p>
                                <button onClick={() => handleOptOut(lesson.id)} className="form-button">Sign out</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You are not enrolled in any lessons.</p>
                )}

                <h3>Avaiable lessons</h3>
                <ul>
                    {upcomingLessons.length > 0 ? (
                        upcomingLessons.map((lesson) => (
                            <li key={lesson.id}>
                                <p>{lesson.name} - {lesson.startTime} to {lesson.endTime}</p>
                                <p>Available Capacity: {lesson.remainingCapacity}</p>
                                {/* Conditionally render the enroll button based on capacity */}
                                {lesson.remainingCapacity > 0 ? (
                                    <button onClick={() => handleEnroll(lesson.id)} className="form-button">Enroll</button>
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
        </div>
    );
};

export default TraineeLessons;
