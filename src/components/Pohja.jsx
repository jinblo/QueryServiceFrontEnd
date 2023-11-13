import { useState } from 'react';
import { useEffect } from 'react';
import { AppBar, Box, Button, TextField, Typography, Paper } from '@mui/material';

function Pohja() {

    const [data, setData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const handleChange = (event, id) => {
        setAnswers([...answers, { questionId: id, text: event.target.value }])
    }

    const saveAnswers = () => {
        console.log(answers)
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        }
        fetch('http://localhost:8080/queries/1/answers', options)
            .then(response => fetchData())
            .catch(error => console.error(error))

    };

    const fetchData = () => {
        fetch('http://localhost:8080/queries/1')
            .then(response => response.json())
            .then(responseData => {
                setData(responseData)
                setQuestions(responseData.questions)
            })
            .catch(err => console.error(err))
    }

    useEffect(fetchData, []);

    if (!data) {
        return <div>Loading...</div>
    } else {
        return (
            <Box sx={{
                height: "100vh",
                width: "100vw",
            }}>
                <AppBar position='static' sx={{
                    width: "100%",
                    textAlign: "center",
                    padding: "10px 0 10px 0"
                }}>
                    <Typography variant='h5'>{data.title}</Typography>
                </AppBar>

                <Paper sx={{
                    width: "30%",
                    padding: "30px",
                    margin: "20px auto 0 auto",
                    '& .MuiTypography-root': {
                        textAlign: 'center',
                        color: 'rgb(100,100,100)',
                    },
                }}>
                    <Typography sx={{ padding: '0 0 20px 0', fontSize: '19px' }}>{data.description}</Typography>
                    {questions.map((question, index) => {
                        return (
                            <Box>
                                <p key={question.id}>
                                    {index + 1}. {question.questionText}<br />
                                </p>
                                <TextField
                                    id="outlined-textarea"
                                    name="text"
                                    placeholder="Vastaus"
                                    multiline
                                    fullWidth
                                    onChange={event => handleChange(event, question.id)}
                                />
                            </Box>
                        );
                    })
                    }
                    <Button onClick={saveAnswers}
                        sx={{ margin: "30px 0 0 0" }}>Save</Button>
                </Paper>
            </Box >
        );
    }
}
export default Pohja;
