import '../../styles/admin/Sidebar.css';
import React, { useState, useEffect } from 'react';
import { MdHome, MdList, MdPersonAdd, MdPerson } from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import img from '../../assets/logo.png';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Auto close on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Mobile Header */}
      <div className="togglebtn">
        <div className="btn" onClick={toggleSidebar}>
          <MdList size={28} />
        </div>
        {/* <div className="logo">
          <img src={img} alt="logo" />
        </div> */}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <img src={img} alt="logo" />
        </div>

        <div className="links">
          <Link
            to="/sales"
            className={`listitem ${location.pathname === '/sales' ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <div className="listitemhead">
              <div className="icon"><MdPerson/></div>
              <div className="title">Accounts</div>
            </div>
          </Link>
          <Link
            to="/sales/ads"
            className={`listitem ${location.pathname === '/sales/ads' ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <div className="listitemhead">
              <div className="icon"><MdHome/></div>
              <div className="title">Ads</div>
            </div>
          </Link>
          <Link
            to="/sales/create"
            className={`listitem ${location.pathname === '/sales/create' ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <div className="listitemhead">
              <div className="icon"><MdPersonAdd/></div>
              <div className="title">Create Account</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
