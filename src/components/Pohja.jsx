import { useState } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';

function Pohja() {

    const [data, setData] = useState({});
    const [questions, setQuestions] = useState([])

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
                <p>Otsikko: {data.title}</p>
                <p>Kuvaus: {data.description}</p>

                {questions.map(question => {
                    return (
                        <p key={question.id}>
                            Kysymys: {question.questionText}<br />
                        </p>
                    );
                })
                }
            </Box>
        );
    }
}
export default Pohja;
