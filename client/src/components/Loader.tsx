import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
      }}
    >
      <CircularProgress size='1.2rem' sx={{ color: 'rgba(51, 51, 51, 0.3)' }} />
    </Box>
  );
}
