import React from "react";
import img from '../assets/err.png';

const Error = () => {
    return (
        <div style={styles.container}>
            <img src={img} alt="Error" style={styles.image} />
        </div>
    );
};

const styles = {
  container: {
    display:'flex',
    justifyContent:'center',
    alignItems: "center"
  },
  image: {
    maxHeight: "100vh",
  }
};

export default Error;
