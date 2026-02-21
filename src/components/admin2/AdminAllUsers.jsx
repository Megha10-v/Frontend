import Sidebar from "./SideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";

function AdminAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('elk_authorization_token');

    useEffect(() => {
        const fetchData = async () => {
            await fetchUsers();
            setLoading(false);
        };
        fetchData();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/get_sales_users`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            console.log(response.data.data);
            
            setUsers(response.data.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="homeadmin">
                <div className="filters">
                    <div>
                        <h4>Total: {users.length}</h4>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="admin-table-container d-none d-md-block">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>S No:</th>
                                        <th>Name</th>
                                        <th>Profile</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user.login_user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.login_user.name}</td>                                        
                                                <td>
                                                    {user.login_user.profile ? (
                                                        <img
                                                            src={user.login_user.profile}
                                                            alt="Profile"
                                                            height="60"
                                                        />
                                                    ) : (
                                                        "No Image"
                                                    )}
                                                </td>
                                                <td>
                                                    {new Date(
                                                        user.login_user.createdAt
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-block d-md-none">
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                <div key={user.id} className="user-card">

                                    <div className="user-card-row">
                                    
                                    {/* LEFT SIDE (Details) */}
                                    <div className="user-card-content">
                                        <div className="user-card-header">
                                        <strong>{index + 1}. {user.name}</strong>
                                        </div>

                                        <p><b>ID:</b> {user.user_id}</p>
                                        <p><b>Phone:</b> {user.mobile_number ?? "-"}</p>
                                        <p><b>Email:</b> {user.email ?? "-"}</p>
                                        <p>
                                        <b>Date:</b>{" "}
                                        {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* RIGHT SIDE (Image) */}
                                    {user.profile && (
                                        <div className="user-card-image">
                                        <img
                                            src={user.profile}
                                            alt="Profile"
                                            className="user-profile-img"
                                        />
                                        </div>
                                    )}

                                    </div>

                                </div>
                                ))
                            ) : (
                                <p style={{ textAlign: "center" }}>No users found</p>
                            )}
                        </div>

                    </>
                )}
            </div>
        </>
    );
}

export default AdminAllUsers;
