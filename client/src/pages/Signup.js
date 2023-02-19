import React, { useState } from "react";
import { signin, signup, authenticate } from "../services/authapihelper";

const SignUp = ({ history }) => {
  const [values, setvalues] = useState({
    name: "",
    username: "",
    password: "",
    profession: "",
    city: "",
    country: "",
    errors: "",
    loading: false,
    userError: "",
  });

  const {
    name,
    username,
    password,
    profession,
    city,
    country,
    errors,
    loading,
  } = values;

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
    signup({ name, username, password, profession, city, country })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setvalues({ ...values, errors: data.error, loading: false });
        } else {
          signin({ username, password }).then((data) => {
            if (data.error) {
              setvalues({ ...values, errors: data.error, loading: false });
            } else {
              authenticate(data, () => {
                setvalues({
                  ...values,
                  name: "",
                  username: "",
                  password: "",
                });
                history.goBack();
              });
            }
          });
        }
      })
      .catch(console.log("signup error"));
  };

  const signUpForm = () => (
    <div className="form">
      <h3>SignUp</h3>
      {errorMessage()}
      {loadingMessage()}

      <form>
        {/* <label for="name">Name</label> */}

        <div className="input">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        {/* <label for="username">Chose a Unique Username</label> */}
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
        {/* <label for="profession">Profession</label> */}
        <div className="input">
          <input
            type="text"
            placeholder="Profession"
            onChange={handleChange("profession")}
            value={profession}
          />
        </div>
        {/* <label for="city">City</label> */}
        <div className="input">
          <input
            type="text"
            placeholder="City"
            onChange={handleChange("city")}
            value={city}
          />
        </div>
        {/* <label for="country">Country</label> */}
        <div className="input">
          <input
            type="text"
            placeholder="Country"
            onChange={handleChange("country")}
            value={country}
          />
        </div>

        <div>
          <button className="primary" onClick={onSubmit}>
            SignUp
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

  return <div className=" neo card">{signUpForm()}</div>;
};

export default SignUp;
