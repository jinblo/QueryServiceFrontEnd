import { Box, Typography, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

function Raportti() {

    const [data, setData] = useState({});
    const [questions, setQuestions] = useState([]);
    /*const [answers, setAnswers] = useState();*/

    const fetchData = () => {

        fetch('http://localhost:8080/queries/1')
            .then(response => response.json())
            .then(responseData => {
                setData(responseData)
                setQuestions(responseData.questions)
                console.log(questions)
            })
            .catch(err => console.error(err))
    }

    useEffect(fetchData, []);

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
                {console.log(questions)}
                <Typography margin={1} color='primary' variant='h5'>{data.title}</Typography>
                <Typography marginBottom={4} sx={{ fontSize: '19px' }}>{data.description}</Typography>

                {questions.map((question, questionIndex) => (
                    <Box key={question.id}>
                        <p>
                            {questionIndex + 1}. {question.questionText}<br />
                        </p>
                        {question.answers.map((answer, answerIndex) => (
                            <ul key={answer.id}>
                                <li>
                                    {answer.answerText}<br />
                                </li>
                            </ul>
                        ))}
                    </Box>
                ))}
            </Paper>
        </Box >
    );
}
export default Raportti;
