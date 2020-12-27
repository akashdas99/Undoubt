import React, { useState } from 'react'
import { isAuthenticated } from '../services/authapihelper';
import { addquestion } from '../services/questionapicalls';
import { Redirect, useHistory } from "react-router-dom"

const AddQuestion = () => {

    const history = useHistory()
    const [values, setvalues] = useState({
        description: "",
        errors: "",
        redirect: false,
        loading: false,
        formData: new FormData()
    })

    const { description, errors, redirect, loading, formData } = values;

    const { token } = isAuthenticated();

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setvalues({ ...values, [name]: value })
    }
    const onSubmit = e => {
        e.preventDefault();
        setvalues({ ...values, errors: "", loading: true })

        addquestion(formData, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setvalues({ ...values, errors: data.error })
                }
                else {
                    setvalues({ ...values, redirect: true })
                }
            }).catch(() => console.log("err"))
    }


    const errorMessage = () => (
        errors && (<div className="error-msg">
            <p>{errors}</p>
        </div>)
    )
    const loadingMessage = () => (
        loading && (
            <div className="loading">
                <p>Loading...</p>
            </div>
        )
    );
    const questionForm = () => (
        <React.Fragment>
            <h3>Add A Question</h3>
            {errorMessage()}
            {loadingMessage()}

            <form>
                <div className="input"><textarea type="text" placeholder="Add A Question" onChange={handleChange("description")} value={description} /></div>

                <div>
                    <button onClick={onSubmit}>Submit</button>
                    <button onClick={e => {
                        e.preventDefault()
                        history.goBack();
                    }}>Cancel</button>
                </div>

            </form>
        </React.Fragment>
    )
    return (
        <div className="neo card">
            {questionForm()}

            {redirect && <Redirect to="/" />}
        </div>
    )
}

export default AddQuestion
