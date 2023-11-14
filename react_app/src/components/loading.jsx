import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading =()=> {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center',justifyContent: 'center'}} minWidth='100%' >
      <CircularProgress size={60}/>
    </Box>
  );
}
export default Loading;
