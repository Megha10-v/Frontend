import Sidebar from "./SideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../Loader";

function AdminAllUsers() {
    const [selectedDate, setSelectedDate] = useState("");
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await fetchusers();
            setLoading(false);
        };
        fetchData();
    });


    const fetchusers = async () => {     
        try {
            const response = await axios.get(`http://localhost:3000/api/get-users`);            
            setusers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const blockUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
        if (!confirmDelete) return;
        try {
          const response = await fetch(`http://localhost:3000/api/block_user?id=${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (response.ok) {
            alert('User blocked successfully');
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error('Error blocking user:', error);
          alert('Server error');
        }
    };
      

    return (
        <>
            <Sidebar />
            <AdminNav />
            <div className="homeadmin">
                <div className="filters">
                    <div className="fields">
                        <div className="label">Select date:</div>
                        <div className="input">
                            <input 
                                type="date" 
                                value={selectedDate} 
                                onChange={(e) => setSelectedDate(e.target.value)}
                                onClick={(e) => e.target.showPicker()} />
                        </div>  
                    </div>
                    <div>
                        <h4>Total: {users.length}</h4>
                    </div>
                </div>
                {loading ? <Loader/> : (
                <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>S No:</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Profile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user,index) => (
                                        <tr key={user.id}>
                                            <td>{index+1}</td>
                                            <td>{user.user_id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.mobile_number??'-'}</td>
                                            <td>{user.email??'-'}</td>
                                            <td>
                                                {user.profile ? (
                                                    <img src={user.profile} alt="Profile" height="100" />
                                                ) : "No Image"}
                                            </td>
                                            <td><Button style={{ backgroundColor: "red", color: "white" }} onClick={() => blockUser(user.user_id)}>{(user.block_status===false)?'Block':'UnBlock'}</Button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14" style={{ textAlign: "center" }}>No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                </div>
                )}

            </div>
        </>
    );
}

export default AdminAllUsers;

