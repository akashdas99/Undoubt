import React, { useState } from "react";
import { signin, authenticate } from "../services/authapihelper";

const SignIn = ({ history }) => {
  const [values, setvalues] = useState({
    username: "",
    password: "",
    errors: "",
    loading: false,
  });

  const { username, password, errors, loading } = values;

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
    signin({ username, password })
      .then((data) => {
        if (data.error) {
          setvalues({ ...values, errors: data.error, loading: false });
          console.log(data.error);
        } else {
          authenticate(data, () => {
            setvalues({
              ...values,
              username: "",
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
      <div style={{ display: "flex" }}>
        <h3>SignIn</h3>
        <a
          className="link"
          style={{ fontSize: "8px", margin: "2.18em", cursor: "pointer" }}
          onClick={() => {
            setvalues({
              ...values,
              errors: false,
              username: `${process.env.REACT_APP_TEST}`,
              password: `${process.env.REACT_APP_TEST_PASSWORD}`,
            });
          }}
        >
          Click here
          <br /> (Fill test credentials)
        </a>
      </div>
      {loadingMessage()}
      {errorMessage()}
      <form>
        {/* <label for="username">Username</label> */}
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            onChange={handleChange("username")}
            value={username}
          />
        </div>
        {/* <label for="password">Password</label> */}
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange("password")}
            value={password}
          />
        </div>
        <div className="submit-form">
          {/* <button className="primary" onClick={onSubmit}>
            SignIn
            <br /> (without credentials)
          </button> */}
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
