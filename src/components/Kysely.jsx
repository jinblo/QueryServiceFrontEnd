import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Button, TextField, Typography, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useParams } from 'react-router-dom';

function Kysely() {
    let { id } = useParams();
    const [data, setData] = useState();
    const [answers, setAnswers] = useState();
    const [send, setSend] = useState(false);

    const handleChange = (event) => {
        setAnswers({ ...answers, [event.target.name]: event.target.value })
    }

    const saveAnswers = () => {
        const answerData = []
        Object.entries(answers).map(entry => answerData.push({ "questionId": entry[0], "text": entry[1] }))

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answerData)
        }
        fetch(`http://localhost:8080/queries/${id}/answers`, options)
            .then(response => fetchData())
            .catch(error => console.error(error))

        setSend(true)
    };

    const fetchData = () => {
        fetch(`http://localhost:8080/queries/${id}`)
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
    } else if (send) {
        return (
            <Box sx={{
                width: "100vw",
                marginTop: "20vh"
            }}>
                <Typography variant='h6' textAlign="center">Kiitos!<br />Vastaukset lähetetty</Typography>
            </Box>
        )
    } else {
        return (
            <Box>
                <Paper sx={{
                    width: "40%",
                    padding: "10px 30px",
                    margin: "20px auto",
                    '& .MuiTypography-root': {
                        textAlign: 'center',
                    },
                }}>
                    <Typography margin={1} color='primary' variant='h5'>{data.title}</Typography>
                    <Typography marginBottom={4} sx={{ fontSize: '19px' }}>{data.description}</Typography>
                    {data.questions.map((question, index) => {
                        return <Box key={question.id}>
                            <p>{index + 1}. {question.questionText}</p>
                            {question.type == "TEXT" ?
                                <TextField
                                    id="outlined-textarea"
                                    name={question.id.toString()}
                                    placeholder="Vastaus"
                                    multiline
                                    fullWidth
                                    onChange={event => handleChange(event, question.id)} />
                                :
                                <RadioGroup name={question.id.toString()} onChange={event => handleChange(event, question.id)}>
                                    {question.answerOptions.map((option, index) => {
                                        return <FormControlLabel key={option.id} value={option.answerOptionText} control={<Radio />} label={option.answerOptionText} />
                                    })}
                                </RadioGroup>}
                        </Box>


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
