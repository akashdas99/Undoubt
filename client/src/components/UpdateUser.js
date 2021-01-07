import React, { useState } from 'react'
import { isAuthenticated } from '../services/authapihelper';
import { userUpdate } from '../services/userapihelper';

const UpdateUser = ({ userInfo, reload, cancel }) => {

    const [values, setvalues] = useState(userInfo)
    const { name } = values;
    const { token, userId } = isAuthenticated()

    const handleChange = name => e => {
        setvalues({ ...values, [name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        userUpdate(userId, { name }, token)
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, errors: data.error })
                }
                else {
                    reload()
                }
            }).catch(() => console.log("err"))
    }
    return (
        <div className="neo card">
            <form>
                <h3>Update User Details</h3>

                <div className="input"><input type="text" placeholder="Name" onChange={handleChange("name")} value={name} /></div>
                <div>
                    <button onClick={onSubmit}>Save</button>
                    <button onClick={cancel}>Cancel</button>

                </div>
            </form>
        </div>
    )
}

export default UpdateUser;
