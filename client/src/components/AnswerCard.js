import { DeleteOutlineOutlined, Edit } from '@material-ui/icons'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteanswer, getanswerbyid } from '../services/answerapihelper'
import { isAuthenticated } from '../services/authapihelper'
import UpdateAnswer from './UpdateAnswer'


const AnswerCard = ({ ans, showQuestion = false, reload }) => {


    //stores edit state
    const [editState, seteditState] = useState(false)
    //stores answer
    const [answer, setanswer] = useState(ans)

    const { token, userId } = isAuthenticated()

    //reload answer after update
    const reloadAns = () => {
        seteditState(false);
        getanswerbyid(answer._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    setanswer(data);
                }
            })
    }
    //delete answer
    const Delete = (ansId, authorId) => {

        deleteanswer(ansId, authorId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    reload()
                }
            })
            .catch(console.log("err"))
    }

    const cancelEdit = () => {
        seteditState(false);
    }
    return (
        <div className="answer__card">

            {!editState && (
                <React.Fragment>
                    {showQuestion && (<div className="title">{answer.question.description}</div>)}
                    <div className="author-section">
                        <div className="author">
                            <Link to={`/profile/${answer.author._id}/questions`}>
                                {answer.author.name}
                            </Link>
                            <span className="date">
                                | on {new Date(answer.createdAt).toLocaleDateString()}
                            </span>
                        </div>


                        {answer.author._id === userId && (<div className="edit">
                            <Edit onClick={() => { seteditState(!editState) }} />
                            <DeleteOutlineOutlined onClick={() => { Delete(answer._id, answer.author._id) }} />
                        </div>)}
                    </div>
                    <div className="answer__des">
                        {answer.description}
                    </div>

                </React.Fragment>)}

            {editState && (
                <UpdateAnswer
                    answer={answer}
                    reload={reloadAns}
                    cancel={cancelEdit}
                />)
            }
        </div>


    )
}

export default AnswerCard
