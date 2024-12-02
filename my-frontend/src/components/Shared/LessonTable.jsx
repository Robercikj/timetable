import React from "react";

const LessonTable = ({ lessons, onRegister, onCancel }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Trainer</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Capacity</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {lessons.map((lesson) => (
                <tr key={lesson.id}>
                    <td>{lesson.id}</td>
                    <td>{`${lesson.trainer.firstName} ${lesson.trainer.lastName}`}</td>
                    <td>{new Date(lesson.startTime).toLocaleString()}</td>
                    <td>{new Date(lesson.endTime).toLocaleString()}</td>
                    <td>
                        {lesson.registered}/{lesson.maxCapacity}
                    </td>
                    <td>
                        {onRegister && lesson.registered < lesson.maxCapacity && (
                            <button onClick={() => onRegister(lesson.id)}>Register</button>
                        )}
                        {onCancel && (
                            <button onClick={() => onCancel(lesson.id)}>Cancel</button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LessonTable;
