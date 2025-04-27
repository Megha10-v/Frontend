import '../../styles/admin/Sidebar.css';
import React, { useState, useRef, useEffect } from 'react';
import { MdHome, MdArrowRight, MdArrowDropDown, MdList, MdBook} from 'react-icons/md';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import img from '../../assets/logo.png';

function Sidebar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleItemClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="togglebtn">
        <div className="btn" onClick={toggleSidebar}><MdList size={30}/></div>
        <div className="logo"><img src={img} alt="logo" /></div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo"><img src={img} alt="logo" /></div>
        <div className="links">
          <div className="listitem">
            <Link to='/admin' className='nolistitems'>
              <div className='listitemhead' >
                <div className='icon'><MdHome/></div>
                <div className='title'>Ads</div>
                <div className="arrow"></div>
              </div>
            </Link>
          </div>
          <div className="listitem">
            <Link to='/admin/accounts' className='nolistitems'>
              <div className='listitemhead' >
                <div className='icon'><FaUser/></div>
                <div className='title'>Accounts</div>
                <div className="arrow"></div>
              </div>
            </Link>
          </div>
          <ListItem 
            title='Notification' 
            icon={<MdBook/>}
            arrow={<MdArrowRight/>}
            isOpen={openIndex === 6}
            onClick={() => handleItemClick(6)}
          >
            <div>
              <ListItem title="Send Notification" path='/admin/notification'/>
            </div>
          </ListItem>
        </div>
      </div>
    </>
  );
}

const ListItem = ({ title, children, icon, arrow, isOpen, onClick, path }) => {
  const childrenRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    setMaxHeight(isOpen ? `${childrenRef.current.scrollHeight}px` : '0px');
  }, [isOpen]);

  return (
    <Link to={path} className='listitem'>
      <div onClick={onClick}>
        <ListItemHead title={title} icon={icon} arrow={isOpen ? <MdArrowDropDown/> : arrow}/>
      </div>
      <div
        className={`children ${isOpen ? 'open' : ''}`}
        style={{ maxHeight }}
        ref={childrenRef}
      >
        {children}
      </div>
    </Link>
  );
};

const ListItemHead = ({ title, icon, arrow }) => {
  return (
    <div className='listitemhead'>
      <div className='icon'>{icon}</div>
      <div className='title'>{title}</div>
      <div className="arrow">{arrow}</div>
    </div>
  );
};

export default Sidebar;