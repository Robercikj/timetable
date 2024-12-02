const API_URL = "http://localhost:8080/api/v1/timetable";

// Utility function to get headers (with authorization token)
const getHeaders = () => {
    const token = localStorage.getItem("jwt-token");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

// Utility function to handle API responses and error logging
const handleResponse = async (response) => {
    console.log(response)
    if (!response.ok) {
        // Log the error response to the console
        console.error(`Error: ${response.status} - ${response.statusText}`);
        // You can add more specific error handling logic based on status codes
        if (response.status === 404) {
            throw new Error("Resource not found (404)");
        } else if (response.status === 500) {
            throw new Error("Internal server error (500)");
        }
        throw new Error("Network response was not ok");
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204 || response.headers.get("content-length") === "0") {
        return null;  // Return null if the response is empty
    }

    // Try parsing the response body as JSON
    try {
        return await response.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        throw new Error("Failed to parse JSON response");
    }
};

// API function to login
export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// API function to register
export const register = async (data) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

// Fetch all trainees
export const fetchTrainees = async () => {
    try {
        const response = await fetch(`${API_URL}/trainee/all`, {
            method: "GET",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch trainees:", error);
        throw error;
    }
};

// Assign a trainer to the trainee
export const assignTrainerToCurrentTrainee = async (trainerId) => {
    try {
        const response = await fetch(`${API_URL}/trainer/${trainerId}/add_current_trainee`, {
            method: "PUT",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error assigning trainer:", error);
        throw error;
    }
};

// Fetch all trainers
export const fetchTrainers = async () => {
    try {
        const response = await fetch(`${API_URL}/trainer/all`, {
            method: "GET",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch trainers:", error);
        throw error;
    }
};

// Fetch current trainer for the logged-in trainee
export const fetchCurrentTrainer = async () => {
    try {
        const response = await fetch(`${API_URL}/trainee/get_trainer`, {
            method: "GET",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error fetching current trainer:", error);
        throw error;
    }
};

// Add a trainer
export const addTrainer = async (data) => {
    try {
        const response = await fetch(`${API_URL}/trainer/add_trainer`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to add trainer:", error);
        throw error;
    }
};

// Add a trainee
export const addTrainee = async (data) => {
    try {
        const response = await fetch(`${API_URL}/trainee/add_trainee`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to add trainee:", error);
        throw error;
    }
};

// Assign trainee to a trainer
export const assignTraineeToTrainer = async (trainerId, traineeId) => {
    try {
        const response = await fetch(`${API_URL}/trainer/${trainerId}/add_trainee/${traineeId}`, {
            method: "PUT",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to assign trainee to trainer:", error);
        throw error;
    }
};

// Assign trainee to themselves (self-enrollment)
export const assignTraineeToSelf = async (traineeId) => {
    try {
        const response = await fetch(`${API_URL}/trainer/add_trainee/${traineeId}`, {
            method: "PUT",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to assign trainee to self:", error);
        throw error;
    }
};

// Create a lesson
export const createLesson = async (data) => {
    try {
        const response = await fetch(`${API_URL}/lesson`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to create lesson:", error);
        throw error;
    }
};

// Fetch all lessons
export const fetchLessons = async () => {
    try {
        const response = await fetch(`${API_URL}/lesson`, {
            method: "GET",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch lessons:", error);
        throw error;
    }
};

// Fetch all trainer's lessons
export const fetchAllTrainerLessons = async () => {
    try {
        const response = await fetch(`${API_URL}/lesson/all/trainer`, {
            method: "GET",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch all trainer lessons:", error);
        throw error;
    }
};

// Fetch upcoming trainer lessons
export const fetchUpcomingTrainerLessons = async () => {
    try {
        const response = await fetch(`${API_URL}/lesson/upcoming/trainer`, {
            method: "GET",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch upcoming trainer lessons:", error);
        throw error;
    }
};

// Fetch upcoming trainee lessons
export const fetchUpcomingTraineeLessons = async () => {
    try {
        const response = await fetch(`${API_URL}/lesson/upcoming/trainee`, {
            method: "GET",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch upcoming trainee lessons:", error);
        throw error;
    }
};

// Cancel a lesson
export const cancelLesson = async (lessonId) => {
    try {
        const response = await fetch(`${API_URL}/lesson/${lessonId}`, {
            method: "DELETE",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to cancel lesson:", error);
        throw error;
    }
};

// Register for a lesson
export const registerForLesson = async (lessonId) => {
    try {
        const response = await fetch(`${API_URL}/lesson/${lessonId}/enroll`, {
            method: "PUT",
            headers: getHeaders(),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Failed to register for lesson:", error);
        throw error;
    }
};
