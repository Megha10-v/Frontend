import React from "react";
import img from '../assets/empty.png'

const EmptyState = () => {
  return (
    <div className="empty-state-container" style={styles.container}>
      <img src={img} alt="Empty" style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#444",
  },
  image: {
    maxWidth: "300px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  message: {
    fontSize: "16px",
    color: "#777",
  },
};

export default EmptyState;
