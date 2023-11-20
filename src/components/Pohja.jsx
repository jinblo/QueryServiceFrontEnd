import { useState } from 'react';
import { useEffect } from 'react';
import { AppBar, Box, Button, TextField, Typography, Paper } from '@mui/material';

function Pohja() {

    const [data, setData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState();
    const [send, setSend] = useState(false);

    const handleChange = (event) => {
        setAnswers({...answers, [event.target.name]: event.target.value })
    }

    const saveAnswers = () => {
        //console.log(answers)
        const answerData = []
        Object.entries(answers).map(entry => answerData.push({"questionId" : entry[0], "text": entry[1]}))

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

        setSend(true)
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
    } else if (send) {
        return(
            <Box sx={{
                height: "100vh",
                width: "100vw",
            }}>
                <Typography variant='h6' textAlign="center">Vastaukset lähetetty</Typography>
            </Box>
        )
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
                    <Button onClick={saveAnswers}
                        sx={{ margin: "30px 0 0 0" }}>Save</Button>
                </Paper>
            </Box >
        );
    }
}
export default Pohja;
