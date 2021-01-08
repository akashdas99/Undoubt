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
        country: "",
        registered: "",
        profession: "",
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
                        profession: data.profession,
                        city: data.city,
                        country: data.country,
                        registered: new Date(data.createdAt).toLocaleDateString(),
                    }
                )
            }
        })
    }

    const { name, email, city, country, registered, profession } = value;
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
                <div>Profession - {profession}</div>
                <div>Lives in -  {city},{country}</div>
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
