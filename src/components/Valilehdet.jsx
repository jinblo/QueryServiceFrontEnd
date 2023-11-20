import { useState } from 'react';
import { Box, AppBar, Tabs, Tab, } from '@mui/material';
import { Link, Outlet } from "react-router-dom";

function Valilehdet() {
  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }

  return (
    <Box>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange}
          variant='fullWidth' centered textColor='inherit'>
          <Tab component={Link} to='vastausraportti' label='vastausraportti' />
          <Tab component={Link} to='kysely' label='kysely' />
        </Tabs>
      </AppBar>
      <Outlet />
    </Box>
  )
}

export default Valilehdet;