import React from 'react';
// import { MdAccountCircle } from 'react-icons/md';
import '../../styles/admin/AdminNav.css';

function AdminNav() {
  // const [showMenu, setShowMenu] = useState(false);
  // const date = new Date();
  // const handleAccountClick = () => {
  //   setShowMenu(prevShowMenu => !prevShowMenu);
  // };
  // const handleLogout = async (e) => {
  //   e.preventDefault();
  // };
  return (
    <div className="adminnavbar">
      <div className="date">
        {/* {date.toDateString()} {date.toTimeString()} */}
        </div>
      {/* <div className="account" onClick={handleAccountClick}>
        <MdAccountCircle />
        {showMenu && (
          <div className="account-menu">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div> */}
    </div>
  );
}

export default AdminNav;
