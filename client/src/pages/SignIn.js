import React, { useState } from "react";
import { signin, authenticate } from "../services/authapihelper";

const SignIn = ({ history }) => {
  const [values, setvalues] = useState({
    email: "",
    password: "",
    errors: "",
    loading: false,
  });

  const { email, password, errors, loading } = values;

  const handleChange = (name) => (e) => {
    setvalues({ ...values, errors: false, [name]: e.target.value });
  };
  const errorMessage = () =>
    errors && (
      <div className="error-msg">
        <p>{errors}</p>
      </div>
    );

  const loadingMessage = () =>
    loading && (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );

  const onSubmit = (e) => {
    e.preventDefault();
    setvalues({ ...values, errors: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, errors: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setvalues({
              ...values,
              email: "",
              password: "",
            });
            history.goBack();
          });
        }
      })
      .catch(console.log("signin error"));
  };

  const signInForm = () => (
    <div className="form">
      <h3>SignIn</h3>
      {loadingMessage()}
      {errorMessage()}
      <form>
        <label for="email">Email</label>
        <div className="input">
          <input
            type="text"
            placeholder="Email"
            onChange={handleChange("email")}
            value={email}
          />
        </div>
        <label for="password">Password</label>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange("password")}
            value={password}
          />
        </div>
        <div>
          <button className="primary" onClick={onSubmit}>
            SignIn
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return <div className=" neo card">{signInForm()}</div>;
};

export default SignIn;
