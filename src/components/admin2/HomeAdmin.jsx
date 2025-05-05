import { Helmet } from 'react-helmet';
import Sidebar from './SideBar';
import '../styles/admin/HomeAdmin.css';
import AdminFooter from './AdminFooter';
import { MdContacts, MdEdit, MdStar } from 'react-icons/md';
import React, {useEffect, useState} from "react";
import axios from 'axios';

function HomeAdmin() {
  const [data, setData] = useState({});
  const baseUrl = ''
  useEffect(() => {
    axios.get(`${baseUrl}/admin/get-dashboard-count`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <>
      <Sidebar/>
      {/* <AdminNav/> */}
      <Helmet>
          <title>Admin - ELK</title>
      </Helmet>
      <div className="homeadmin">
        
      </div>
      <AdminFooter/>
    </>
  );
}

export default HomeAdmin;