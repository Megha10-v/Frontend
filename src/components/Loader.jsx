import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-50" style={{ zIndex: 1050 }}>
      <CircularProgress sx={{ color: '#FFDA3F' }}/>
    </div>
  );
};

export default Loader;
