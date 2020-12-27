import React, { useEffect, useState } from 'react'
import { userinfo } from '../services/userapihelper'

function UserCard({ userId }) {

    const [value, setvalue] = useState({
        name: "",
        email: "",
        city: "",
        state: "",
        registered: "",
        profession: "student",
    })

    const loaduser = (id) => {
        console.log(id);
        userinfo(id).then(data => {
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
        loaduser(userId);
    }, [])
    return (

        <div className="neo user-info">
            {/* {loading && } */}

            <div className="user-name">{name}</div>
            <div>Email  -  {email}</div>
            <div>profession - {profession}</div>
            <div>Lives in -  {city},{state}</div>
            <div>Registered  -  {registered}</div>

        </div>
    )
}

export default UserCard
