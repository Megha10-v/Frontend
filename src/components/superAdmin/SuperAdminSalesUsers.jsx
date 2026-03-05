// import SSidebar from "./SuperAdminSideBar";
// import '../../styles/admin/HomeAdmin.css';
// import { useState, useEffect } from "react";
// import AdminNav from "./SuperAdminNav";
// import axios from "axios";
// import { Button } from "react-bootstrap";
// import Loader from "../Loader";
// import Swal from "sweetalert2";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { useNavigate } from "react-router-dom";
// import { useBlockUserMutation, useGetSalesAdsListQuery } from "../../store/services/superadmin.service";


// function SuperAdminSalesUsers() {
//     const [selectedDate, setSelectedDate] = useState("");
//     const [users, setusers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const [searchTerm, setSearchTerm] = useState("");
//     const filteredUsers = users.filter((user) => {
//         const search = searchTerm.toLowerCase();
//         const matchesSearch =
//             user.name?.toLowerCase().includes(search) ||
//             user.mobile_number?.toLowerCase().includes(search) ||
//             user.email?.toLowerCase().includes(search);
//         const matchesDate = selectedDate
//             ? new Date(user.createdAt).toISOString().slice(0, 10) === selectedDate
//             : true;
//         return matchesSearch && matchesDate;
//     });
//     useEffect(() => {
//         const fetchData = async () => {
//             await fetchusers();
//             setLoading(false);
//         };
//         fetchData();
//     },[]);


//     const fetchusers = async () => {     
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get-sales-users`);            
//             setusers(response.data.users);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     const blockUser = async (userId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
//         if (!confirmDelete) return;
//         try {
//           const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/block_user?id=${userId}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//           const data = await response.json();
//           if (response.ok) {
//             alert('User blocked successfully');
//           } else {
//             alert(`Error: ${data.message}`);
//           }
//         } catch (error) {
//           console.error('Error blocking user:', error);
//           alert('Server error');
//         }
//     };
      
//     const downloadExcel = () => {
//         if (filteredUsers.length === 0) {
//             Swal.fire({
//                 icon: "warn",
//                 title: "No Users available to export!",
//                 confirmButtonColor: "#3085d6",
//             });
//             return;
//         }

//         const data = filteredUsers.map((user, index) => ({
//             "S No": index + 1,
//             "User ID": user.user_id,
//             "Name": user.name,
//             "Phone Number": user.mobile_number??'-',
//             "Email": user.email??'-',
//             "Date": new Date(user.createdAt).toLocaleDateString(),
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(data);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

//         const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//         const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//         saveAs(blob, `elk_users_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
//     };
//     return (
//         <>
//             <SSidebar />
//             <AdminNav />
//             <div className="homeadmin">
//                 <div className="filters">
//                     <div className="fields">
//                         <div className="label">Select date:</div>
//                         <div className="input">
//                             <input 
//                                 type="date" 
//                                 value={selectedDate} 
//                                 onChange={(e) => setSelectedDate(e.target.value)}
//                                 onClick={(e) => e.target.showPicker()} />
//                         </div>  
//                     </div>
//                     <div className="fields">
//                         <div className="label">Search:</div>
//                         <div className="input">
//                             <input
//                                 type="text"
//                                 placeholder="Search by Name, Phone or Email"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div style={{marginLeft:"20px"}}>
//                         <h4>Total: {filteredUsers.length}</h4>
//                     </div>
//                     <div  style={{ display: 'flex', gap: '10px' }}>
//                         <Button variant="success" onClick={downloadExcel}>
//                             Download Excel
//                         </Button>
//                         <Button variant="success" onClick={()=> navigate("/admin/accounts/create")}>
//                             Create User
//                         </Button>
//                     </div>    
//                 </div>
//                 {loading ? <Loader/> : (
//                 <div className="admin-table-container">
//                         <table className="admin-table">
//                             <thead>
//                                 <tr>
//                                     <th>S No:</th>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Phone</th>
//                                     <th>Email</th>
//                                     <th>Profile</th>
//                                     <th>Logged In</th>
//                                     <th>Date</th>
                                    
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredUsers.length > 0 ? (
//                                     filteredUsers.map((user,index) => (
//                                         <tr key={user.id}>
//                                             <td>{index+1}</td>
//                                             <td>{user.user_id}</td>
//                                             <td>{user.name}</td>
//                                             <td>{user.mobile_number??'-'}</td>
//                                             <td>{user.email??'-'}</td>
//                                             <td>
//                                                 {user.profile ? (
//                                                     <img src={user.profile} alt="Profile" height="100" />
//                                                 ) : "No Image"}
//                                             </td>
//                                             <td>{user?.is_logged? "Yes": "No"}</td>
//                                             <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                                             <td style={{ display: "flex", gap: "8px" }}>
//                                                 <Button
//                                                     variant="primary"
//                                                     onClick={() => navigate(`/admin/sales-user/${user.user_id}`)}
//                                                 >
//                                                     View More
//                                                 </Button>

//                                                 <Button
//                                                     style={{ backgroundColor: "red", color: "white" }}
//                                                     onClick={() => blockUser(user.user_id)}
//                                                 >
//                                                     {user.block_status === false ? "Block" : "UnBlock"}
//                                                 </Button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="14" style={{ textAlign: "center" }}>No users found</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                 </div>
//                 )}

//             </div>
//         </>
//     );
// }

// export default SuperAdminSalesUsers;

import SSidebar from "./SuperAdminSideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useMemo } from "react";
import AdminNav from "./SuperAdminNav";
import { Button } from "react-bootstrap";
import Loader from "../Loader";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import {
  useBlockUserMutation,
  useGetSalesUsersListQuery,
} from "../../store/services/superadmin.service";

function SuperAdminSalesUsers() {
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: users = [], isLoading } = useGetSalesUsersListQuery();
  const [blockUser] = useBlockUserMutation();

  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search) ||
        user.mobile_number?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search);
      const matchesDate = selectedDate
        ? new Date(user.createdAt).toISOString().slice(0, 10) === selectedDate
        : true;
      return matchesSearch && matchesDate;
    });
  }, [users, searchTerm, selectedDate]);

  const handleBlockUser = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to block/unblock this user?");
    if (!confirmed) return;

    try {
      await blockUser(userId).unwrap();
      alert("User block status updated successfully");
    } catch (error) {
      alert(error?.data?.message || "Server error");
    }
  };

  const downloadExcel = () => {
    if (filteredUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Users available to export!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const data = filteredUsers.map((user, index) => ({
      "S No": index + 1,
      "User ID": user.user_id,
      "Name": user.name,
      "Phone Number": user.mobile_number ?? "-",
      "Email": user.email ?? "-",
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
      <SSidebar />
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
                onClick={(e) => e.target.showPicker()}
              />
            </div>
          </div>
          <div className="fields">
            <div className="label">Search:</div>
            <div className="input">
              <input
                type="text"
                placeholder="Search by Name, Phone or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <h4>Total: {filteredUsers.length}</h4>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="success" onClick={downloadExcel}>
              Download Excel
            </Button>
            <Button variant="success" onClick={() => navigate("/admin/accounts/create")}>
              Create User
            </Button>
          </div>
        </div>

        {isLoading ? <Loader /> : (
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
                  <th>Logged In</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.user_id}>
                      <td>{index + 1}</td>
                      <td>{user.user_id}</td>
                      <td>{user.name}</td>
                      <td>{user.mobile_number ?? "-"}</td>
                      <td>{user.email ?? "-"}</td>
                      <td>
                        {user.profile
                          ? <img src={user.profile} alt="Profile" height="100" />
                          : "No Image"}
                      </td>
                      <td>{user?.is_logged ? "Yes" : "No"}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td style={{ display: "flex", gap: "8px" }}>
                        <Button
                          variant="primary"
                          onClick={() => navigate(`/admin/sales-user/${user.user_id}`)}
                        >
                          View More
                        </Button>
                        <Button
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => handleBlockUser(user.user_id)}
                        >
                          {user.block_status === false ? "Block" : "UnBlock"}
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>No users found</td>
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

export default SuperAdminSalesUsers;
