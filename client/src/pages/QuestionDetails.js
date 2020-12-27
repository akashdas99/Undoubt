import React, { useEffect, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import { isAuthenticated } from '../services/authapihelper'
import { questionById, answersByQuestionId } from '../services/questionapicalls'
import { Link } from 'react-router-dom'

import AnswerCard from '../components/AnswerCard'



const QuestionDetails = ({ match }) => {

    const [question, setquestion] = useState()
    const [answers, setanswers] = useState()


    const loadQuestion = id => {
        questionById(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setquestion(data);
                    console.log(data.description);
                }
            })
    }
    const loadAnswers = id => {
        answersByQuestionId(id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setanswers(data);
                    console.log(answers);
                }
            })
    }

    const reloadAns = () => {
        loadAnswers(match.params.qId)

    }

    useEffect(() => {
        loadQuestion(match.params.qId)
        loadAnswers(match.params.qId)
    }, [match.params.qId])



    return (
        <>
            {question &&
                <QuestionCard
                    question={question}
                />
            }
            {isAuthenticated() && question && <Link to={`/addanswer/${question._id}`}><button>Write answer</button></Link>}

            <div className="neo answer-sec">
                {answers && !answers.length && <div>No answers Yet</div>}
                {answers && answers.map(ans => {
                    return (

                        <AnswerCard key={ans._id} ans={ans} reload={reloadAns} />
                    )

                })}
            </div>
        </>
    )
}

export default QuestionDetails
//working