import { useState } from 'react';
import { Box, AppBar, Tabs, Tab, } from '@mui/material';
import { Link, Outlet } from "react-router-dom";
import { useParams } from 'react-router-dom';

function Valilehdet() {
  let { id } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }

  return (
    <Box>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleChange}
          variant='fullWidth' centered textColor='inherit'>
          <Tab component={Link} to={`/`} label='alku' />
          {id ? <Tab component={Link} to={`kysely/${id}`} label='kysely' /> : null }
          {id ? <Tab component={Link} to={`vastausraportti/${id}`} label='vastausraportti' /> : null }
        </Tabs>
      </AppBar>
      <Outlet />
    </Box>
  )
}

export default Valilehdet;