import { useState } from "react";
import "../../styles/admin/AdminNotificationForm.css";
import Sidebar from "./SideBar";
import AdminNav from "./AdminNav";

function AdminNotificationForm() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [notificationContent, setNotificationContent] = useState("");

    // const users = [
    //     { id: 1, name: "All" },
    //     { id: 2, name: "User1" },
    //     { id: 3, name: "User2" },
    // ];

    // const handleUserChange = (event) => {
    //     const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    //     setSelectedUsers(selectedOptions);
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedUsers.length === 0 || !notificationContent.trim()) {
            alert("Please select at least one user and enter notification content.");
            return;
        }

        // Example payload (Replace this with actual API call)
        const payload = {
            users: selectedUsers,
            content: notificationContent,
        };

        console.log("Notification Sent:", payload);
        alert("Notification sent successfully!");

        // Reset form
        setSelectedUsers([]);
        setNotificationContent("");
    };

    return (
        <>
            <Sidebar/>
            <AdminNav/>
            <div className="homeadmin">                
                <div className="notification-form">
                    {/* <h2>Send Notification</h2> */}
                    <form onSubmit={handleSubmit}>
                        {/* <label>Select Users:</label> */}
                        {/* <select multiple value={selectedUsers} onChange={handleUserChange}>
                            {users.map((user) => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select> */}
                        <div className="label">Notification Content:</div>
                        <div className="textarea">
                            <textarea
                                rows="4"
                                value={notificationContent}
                                onChange={(e) => setNotificationContent(e.target.value)}
                                placeholder="Type your notification here..."
                            ></textarea>
                        </div>

                        <button type="submit">Send Notification</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminNotificationForm;
