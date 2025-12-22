import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from '@tanstack/react-router';

const AdminPage = () => {
  const location = useLocation();

  return (
    <Box className="min-h-full w-full p-10! text-center text-3xl font-bold">
      <p>AdminPage</p>
    </Box>
  );
};

export default React.memo(AdminPage);
