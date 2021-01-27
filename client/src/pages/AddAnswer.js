import React, { useState } from 'react'
import { isAuthenticated } from '../services/authapihelper';
import { Redirect } from "react-router-dom"
import { addanswer } from '../services/answerapihelper';

function AddAnswer({ match }) {
    const [values, setvalues] = useState({
        description: "",
        errors: "",
        redirect: false,
        loading: false,
        success: false,
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

        addanswer(match.params.qId, formData, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setvalues({ ...values, errors: data.error })
                }
                else {
                    setvalues({ ...values, redirect: true, success: true })
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
    const answerForm = () => (
        <React.Fragment>
            <h3>Write an Answer</h3>
            {loadingMessage()}
            {errorMessage()}
            <form>
                <div className="input"><textarea type="text" placeholder="Write an Answer" onChange={handleChange("description")} value={description} /></div>

                <div>
                    <button className="primary" onClick={onSubmit}>Submit</button>
                    <button onClick={() => setvalues({ ...values, redirect: true })}>Cancel</button>
                </div>

            </form>
        </React.Fragment>
    )
    return (
        <div className="neo card">

            {answerForm()}
            {redirect && <Redirect to={`/question/${match.params.qId}`} />}
        </div>
    )
}


export default AddAnswer
