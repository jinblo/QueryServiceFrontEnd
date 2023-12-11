import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { ResponsiveChartContainer } from '@mui/x-charts';

function Raportti() {

    const [data, setData] = useState({});
    const [questions, setQuestions] = useState([]);

    const fetchData = async () => {
        await fetch('http://localhost:8080/queries/1')
            .then(response => response.text())
            .then(response => {
                let data = JSON.parse(response)
                setData(data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => { fetchData() }, []);

    useEffect(() => {
        setQuestions(data.questions)
    }, [data])

    return (
        <Box>
            <Paper sx={{
                width: "60%",
                padding: "10px 30px",
                margin: "20px auto",
                '& .MuiTypography-root': {
                    textAlign: 'center',
                },
            }}>
                <Typography margin={1} color='primary' variant='h5'>{data.title}</Typography>
                <Typography marginBottom={4} sx={{ fontSize: '19px' }}>{data.description}</Typography>

                {questions?.map((question, questionIndex) => {
                    let dataset = [];
                    return <Box key={question.id}>
                        <p>
                            {questionIndex + 1}. {question.questionText}<br />
                        </p>
                        {question.type == "TEXT" ?
                            <div><ul>{question.answers.map((answer) => {
                                return <li key={answer.id}>{answer.answerText}</li>
                            })}</ul></div>
                            :
                            <div>{question.answerOptions.map((option) => {
                                let selectedOptions = question.answers.filter((answer) => answer.answerText == option.answerOptionText)
                                dataset.push({ option: option.answerOptionText, selected: selectedOptions.length })
                            })}
                                <BarChart
                                    dataset={dataset}
                                    yAxis={[{ scaleType: 'band', dataKey: 'option' }]}
                                    xAxis={[{ tickMinStep: 1, }]}
                                    series={[{ dataKey: 'selected', label: 'Vastaajia' }]}
                                    slotProps={{ legend: { hidden: true } }}
                                    margin={{ left: 150 }}
                                    height={300}
                                    layout="horizontal" />
                            </div>
                        }
                    </Box>
                })}
            </Paper >
        </Box >
    );
}
export default Raportti;