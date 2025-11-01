import Sidebar from "./SideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../Loader";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get-users`);            
            setusers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const blockUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
        if (!confirmDelete) return;
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/block_user?id=${userId}`, {
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
      
    const downloadExcel = () => {
        if (users.length === 0) {
            Swal.fire({
                icon: "warn",
                title: "No Users available to export!",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        const data = users.map((user, index) => ({
            "S No": index + 1,
            "User ID": user.user_id,
            "Name": user.name,
            "Phone Number": user.mobile_number??'-',
            "Email": user.email??'-',
            "Date": new Date(user.createdAt).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `elk_users_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
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
                    <div>
                        <Button variant="success" onClick={downloadExcel}>
                            Download Excel
                        </Button>
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
                                    <th>Date</th>
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
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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

