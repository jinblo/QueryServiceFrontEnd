import { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Valinta() {
    const [data, setData] = useState();

    const fetchData = () => {
        fetch('http://localhost:8080/queries')
            .then(response => response.text())
            .then(response => {
                let data = JSON.parse(response)
                setData(data)
            })
            .catch(err => console.error(err))
    }

    useEffect(fetchData, []);

    if (!data) {
        return <div>Loading...</div>
    } else {
        return (
            <Box>
                <Paper sx={{
                    width: "40%",
                    padding: "10px 30px",
                    margin: "20px auto",
                    '& .MuiTypography-root': {
                        textAlign: 'center',
                    }
                }}>
                    {data.map(query => {
                        return(
                            <Typography key={query.id} margin={1} color='primary' variant='h5'>
                                <Link to={`/kysely/${query.id}`}>{query.title}</Link>
                            </Typography>
                        )
                    })}
                </Paper>
            </Box >
        );
    }
}

export default Valinta;
