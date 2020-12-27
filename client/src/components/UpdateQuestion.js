import React, { useState } from 'react'
import { isAuthenticated } from '../services/authapihelper';
import { updatequestion } from '../services/questionapicalls';

const UpdateQuestion = ({ question, reload, cancel }) => {

    const [values, setvalues] = useState({
        description: question.description,
        errors: "",
        loading: false,
        formData: new FormData()
    })


    const { description, errors, loading, formData } = values;

    const { token } = isAuthenticated();

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setvalues({ ...values, [name]: value })
    }
    const onSubmit = e => {
        e.preventDefault();
        setvalues({ ...values, errors: "", loading: true })

        updatequestion(question._id, question.author._id, formData, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setvalues({ ...values, errors: data.error })
                }
                else {
                    setvalues({ ...values, success: true })
                    reload()
                }
            }).catch(() => console.log("err"))
    }


    const errorMessage = () => (
        errors && (<div className="error-msg">
            <h2>{errors}</h2>
        </div>)
    )
    const loadingMessage = () => (
        loading && (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        )
    );
    const questionForm = () => (
        <React.Fragment>
            <h3>Edit</h3>
            {loadingMessage()}
            {errorMessage()}
            <form>
                <div className="input"><textarea type="text" placeholder="Add A Question" onChange={handleChange("description")} value={description} /></div>

                <div>
                    <button className="primary" onClick={onSubmit}>Submit</button>
                    <button onClick={cancel}>Cancel</button>
                </div>

            </form>
        </React.Fragment>
    )
    return (
        <div className="neo card">
            {questionForm()}
        </div>
    )
}

export default UpdateQuestion
//working