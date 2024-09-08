import React, { useState } from "react";
import { isAuthenticated } from "../services/authapihelper";
import { userUpdate } from "../services/userapihelper";

const UpdateUser = ({ userInfo, reload, cancel }) => {
  const [values, setvalues] = useState(userInfo);
  const { name, profession, city, country, errors, loading } = values;
  const { token, userId } = isAuthenticated();

  const handleChange = (name) => (e) => {
    setvalues({ ...values, [name]: e.target.value });
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
    userUpdate(userId, { name, profession, city, country }, token)
      .then((data) => {
        if (!data || data?.error) {
          setvalues({ ...values, errors: data?.error });
        } else {
          reload();
        }
      })
      .catch(() => console.log("err"));
  };
  return (
    <div className="neo card">
      <form>
        <h3>Update User Details</h3>
        {loadingMessage()}
        {errorMessage()}
        <div className="input">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Profession"
            onChange={handleChange("profession")}
            value={profession}
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="City"
            onChange={handleChange("city")}
            value={city}
          />
        </div>
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
            Save
          </button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
