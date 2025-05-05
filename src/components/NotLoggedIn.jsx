import React from "react";
import img from '../assets/notloggedin.png';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotLoggedIn = () => {
    const navigate = useNavigate();
    return (
        <div className="not-logged-in" style={styles.container}>
            <img src={img} alt="Not Logged In" style={styles.image} />
            <Button
                style={{ all: 'unset', color:'blue' }}
                onClick={() => navigate('/login')}
                className="btn btn-primary p-3"
            >
                <strong style={{cursor:'pointer',color:'#4FBBB4'}}>Login or Sign Up</strong>
            </Button>
        </div>
    );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#444",
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    maxWidth: "320px",
    marginBottom: "20px",
  }
};

export default NotLoggedIn;
