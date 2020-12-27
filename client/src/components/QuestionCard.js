import { DeleteOutline, Edit } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { isAuthenticated } from '../services/authapihelper'
import { deletequestion, questionById } from '../services/questionapicalls'
import UpdateQuestion from './UpdateQuestion'

const QuestionCard = ({ question, reload = false }) => {

    const [editState, seteditState] = useState(false)
    const [questionstate, setquestionstate] = useState(question)
    const { token, userId } = isAuthenticated()
    const history = useHistory()


    useEffect(() => {
        setquestionstate(question)
    }, [question])

    const Delete = (questionId, authorId) => {

        deletequestion(questionId, authorId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                reload ? reload() : history.push("/");
            })
            .catch(console.log("err"))
    }

    const toggleEdit = () => {
        seteditState(false)
    }
    // reloading current state of question
    const reloadQuestion = () => {
        toggleEdit()

        questionById(questionstate._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setquestionstate(data);
                }
            })
    }
    return (
        <React.Fragment>

            {!editState && (
                <div className="q-card neo">
                    <div className="title">
                        <Link to={`/question/${questionstate._id}`}>
                            {questionstate.description}
                        </Link>
                    </div>
                    <div className="author-section">
                        <div className="author">
                            <Link to={`/profile/${questionstate.author._id}/questions`}>
                                - {questionstate.author.name}
                            </Link>
                            <span className="date"> | on {new Date(questionstate.createdAt).toLocaleDateString()}</span>
                        </div>
                        {questionstate.author._id === userId && (
                            <div className="edit">
                                <Edit onClick={() => { seteditState(!editState) }} />
                                <DeleteOutline onClick={() => { Delete(questionstate._id, questionstate.author._id) }} />
                            </div>
                        )}
                    </div>


                    <div className="card-footer">{questionstate.answers.length} Answers</div>
                </div>
            )
            }
            {editState && (
                <UpdateQuestion
                    question={questionstate}
                    reload={reloadQuestion}
                    cancel={toggleEdit}
                />)
            }

        </React.Fragment>
    )
}

export default QuestionCard
//working