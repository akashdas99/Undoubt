import { Edit } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../services/authapihelper'
import { userinfo } from '../services/userapihelper'
import UpdateUser from './UpdateUser'


function UserCard({ user }) {
    const [value, setvalue] = useState({
        name: "",
        email: "",
        city: "",
        state: "",
        registered: "",
        profession: "student",
    })

    const [editState, seteditState] = useState(false)
    const { token, userId } = isAuthenticated()

    const toggleEdit = () => {
        seteditState(!editState);
    }

    const loaduser = () => {
        seteditState(false);
        userinfo(user).then(data => {
            if (data.error) {
                console.log(data.error);
                setvalue({ ...value, errors: data.error })
            }
            else {
                setvalue(
                    {
                        ...value,
                        name: data.name,
                        email: data.email,
                        questions: data.questions,
                        answers: data.answers,
                        registered: new Date(data.createdAt).toLocaleDateString(),
                    }
                )
            }
        })
    }

    const { name, email, state, city, registered, profession } = value;
    useEffect(() => {
        loaduser();
    }, [user])
    return (
        <>
            {!editState && (<div className="neo user-info">
                {/* {loading && } */}

                <div className="user-name">{name}</div>
                <span>{user === userId && <Edit onClick={toggleEdit} />}</span>
                <div>Email  -  {email}</div>
                <div>profession - {profession}</div>
                <div>Lives in -  {city},{state}</div>
                <div>Registered  -  {registered}</div>

            </div>)}
            {editState && (
                <UpdateUser
                    userInfo={value}
                    reload={loaduser}
                    cancel={toggleEdit}
                />)
            }
        </>
    )
}

export default UserCard
