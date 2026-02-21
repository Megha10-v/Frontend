import { useState } from "react";
import "../../styles/admin/AdminNotificationForm.css";
import SSidebar from "./SideBar";
import AdminNav from "./AdminNav";

function SAdminNotificationForm() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [notificationContent, setNotificationContent] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedUsers.length === 0 || !notificationContent.trim()) {
            alert("Please select at least one user and enter notification content.");
            return;
        }
        const payload = {
            users: selectedUsers,
            content: notificationContent,
        };
        alert("Notification sent successfully!");
        setSelectedUsers([]);
        setNotificationContent("");
    };

    return (
        <>
            <SSidebar/>
            <AdminNav/>
            <div className="homeadmin">                
                <div className="notification-form">
                    <form onSubmit={handleSubmit}>
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

export default SAdminNotificationForm;
