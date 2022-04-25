import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { Logout } from "../logout/logout";
import "./user.css"


export const UserList = () => {

    const users = useSelector((state) => state.users.data);
    const token = useSelector((state) => state.login.token);
    const [filter, setFilter] = useState("");

    if (!token || token.length === 0) {
        return null;
    }

    console.log("User list rendered");
    // Filter by email or if the filter input is empty,
    // display all the users.
    return (
        <div className="user-list">
            <h2>Filter:</h2>
            <input type="text"
                placeholder="Search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)} />
            <br />
            <br />
            <b><h1>Users</h1></b>
            {users.filter((e) => e.email.toLowerCase().includes(filter.toLowerCase()) || filter === "").map(({ email, avatar }) =>
                <table >
                    <tr>
                        <td key={email} > <b>Email:</b> {email}</td>
                    </tr>
                    <tr>
                        <td ><img src={avatar} width="150" height="150" alt="Profile" /></td>
                    </tr>
                    <tr><br /></tr>
                </table>
            )}
            <Logout />
        </div>
    );
}


