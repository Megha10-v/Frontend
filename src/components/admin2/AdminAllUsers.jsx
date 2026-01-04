import Sidebar from "./SideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../Loader";
import { errorMessageToast, successMessageToast } from "../common/hooks/common";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGetUsersListQuery, useBlockUserMutation } from "../../store/services/admin.service";

function AdminAllUsers() {
    const [selectedDate, setSelectedDate] = useState("");

    const {data: userListData, isLoading: userListDataLoading} = useGetUsersListQuery();
    const [blockUser, {isLoading: blockUserLoading}] = useBlockUserMutation();

    const handleBlockUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to block this user?");
        if (!confirmDelete) return;
        try {
        //   const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/block_user?id=${userId}`, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   });
          const response = await blockUser(userId);
          const data = await response.json();
          if (response.ok) {
            successMessageToast("")
          }
        } catch (error) {
          console.error('Error blocking user:', error);
        //   alert('Server error');
        }
    };
      
    const downloadExcel = () => {
        if (userListData?.length === 0) {
            errorMessageToast("No Users available to export!");
            return;
        }

        const data = userListData?.map((user, index) => ({
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
                        <h4>Total: {userListData?.length}</h4>
                    </div>
                    <div>
                        <Button variant="success" onClick={downloadExcel}>
                            Download Excel
                        </Button>
                    </div>
                </div>
                {userListDataLoading ? <Loader/> : (
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
                                {userListData?.length > 0 ? (
                                    userListData?.map((user,index) => (
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
                                            <td><Button style={{ backgroundColor: "red", color: "white" }} onClick={() => handleBlockUser(user.user_id)}>{(user.block_status===false)?'Block':'UnBlock'}</Button></td>
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

