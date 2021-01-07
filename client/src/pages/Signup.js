import React, { useState } from 'react'
import { signin, signup, authenticate } from '../services/authapihelper';




const SignUp = ({ history }) => {


    const [values, setvalues] = useState({
        name: "",
        email: "test@gml.com",
        password: "okkkk",
        errors: "",
        loading: false
    })

    const { name, email, password, errors, loading } = values;

    const handleChange = name => e => {
        setvalues({ ...values, errors: false, [name]: e.target.value })
    }
    const errorMessage = () => (
        errors && (
            <div className="error-msg">
                <p>{errors}</p>
            </div>
        ))

    const loadingMessage = () => (
        loading && (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        )
    );

    const onSubmit = e => {
        e.preventDefault();
        setvalues({ ...values, errors: false, loading: true })
        signup({ name, email, password }).then(data => {
            console.log(data);
            if (data.error) {
                setvalues({ ...values, errors: data.error, loading: false })
            } else {
                signin({ email, password }).then(data => {
                    if (data.error) {
                        setvalues({ ...values, errors: data.error, loading: false })
                    } else {
                        authenticate(data, () => {
                            setvalues({
                                ...values,
                                name: "",
                                email: "",
                                password: "",
                            })
                            history.goBack();

                        })
                    }

                })
            }
        })
            .catch(console.log("signup error"));

    }

    const signUpForm = () => (
        <div className="form">
            <h3>SignUp</h3>
            {errorMessage()}
            {loadingMessage()}

            <form>
                <div className="input"><input type="text" placeholder="Name" onChange={handleChange("name")} value={name} /></div>
                <div className="input"><input type="text" placeholder="Email" onChange={handleChange("email")} value={email} /></div>
                <div className="input"><input type="text" placeholder="Password" onChange={handleChange("password")} value={password} /></div>
                <div>
                    <button onClick={onSubmit}>SignUp</button>
                    <button onClick={e => {
                        e.preventDefault()
                        history.goBack();
                    }}>Cancel</button>

                </div>

            </form>
        </div >
    )

    return (
        <div className="card">
            {signUpForm()}
        </div>
    )
}

export default SignUp
