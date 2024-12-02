import React from "react";

const UserTable = ({ users, role }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                {role === "TRAINEE" && <th>Trainer</th>}
                {role === "TRAINER" && <th>Trainees</th>}
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    {role === "TRAINEE" && (
                        <td>
                            {user.trainer
                                ? `${user.trainer.firstName} ${user.trainer.lastName}`
                                : "Not Assigned"}
                        </td>
                    )}
                    {role === "TRAINER" && (
                        <td>
                            {user.trainees && user.trainees.length > 0
                                ? user.trainees.map((trainee) => trainee.firstName).join(", ")
                                : "No Trainees"}
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;
