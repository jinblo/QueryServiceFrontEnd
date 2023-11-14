import { useState } from 'react';
import { useEffect } from 'react';
import { AppBar, Box, Button, TextField, Typography, Input } from '@mui/material';

function Pohja() {

    const [data, setData] = useState({});
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState();

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
                <AppBar position='static'>
                    <Typography variant='h5'>Kysely
                    </Typography>
                </AppBar>
                <p>{data.title}</p>
                <p>{data.description}</p>
                
                {questions.map((question, index) => {
                    return (
                        <div key={question.id}>
                            <p>{index + 1}. {question.questionText}</p>
                            <TextField
                                id="outlined-textarea"
                                name={question.id.toString()}
                                placeholder="Vastaus"
                                multiline
                                onChange={event => handleChange(event, question.id)}
                            />
                        </div>
                    );
                })
                }
                <Button onClick={saveAnswers}>Save</Button>
            </Box>
        );
    }
}
export default Pohja;
