import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

function Kysely() {

    const [data, setData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState();

    const handleChange = (event) => {
        setAnswers({ ...answers, [event.target.name]: event.target.value })
    }

    const saveAnswers = () => {
        //console.log(answers)
        const answerData = []
        Object.entries(answers).map(entry => answerData.push({ "questionId": entry[0], "text": entry[1] }))
        console.log(answerData)

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answerData)
        }
        fetch('http://localhost:8080/queries/1/answers', options)
            .then(response => fetchData())
            .catch(error => console.error(error))

        //window.location.reload(false);

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
            <Box>
                <Paper sx={{
                    width: "30%",
                    padding: "10px 30px",
                    margin: "20px auto",
                    '& .MuiTypography-root': {
                        textAlign: 'center',
                    },
                }}>
                    <Typography margin={1} color='primary' variant='h5'>{data.title}</Typography>
                    <Typography marginBottom={4} sx={{ fontSize: '19px' }}>{data.description}</Typography>
                    {questions.map((question, index) => {
                        return (
                            <Box key={question.id}>
                                <p >
                                    {index + 1}. {question.questionText}<br />
                                </p>
                                <TextField
                                    id="outlined-textarea"
                                    name={question.id.toString()}
                                    placeholder="Vastaus"
                                    multiline
                                    fullWidth
                                    onChange={event => handleChange(event, question.id)}
                                />
                            </Box>
                        );
                    })
                    }
                    <Button variant='outlined' onClick={saveAnswers}
                        sx={{ margin: "30px 0" }}>Save</Button>
                </Paper>
            </Box >
        );
    }
}
export default Kysely;
