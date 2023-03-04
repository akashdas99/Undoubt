import React, { useState } from "react";
import { isAuthenticated } from "../services/authapihelper";
import { updateanswer } from "../services/answerapihelper";

function UpdateAnswer({ answer, reload, cancel }) {
  const [values, setvalues] = useState({
    description: answer.description,
    errors: "",
    loading: false,
    formData: new FormData(),
  });

  const { description, errors, loading, formData } = values;

  const { token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setvalues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setvalues({ ...values, errors: "", loading: true });

    updateanswer(answer._id, answer.author._id, formData, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setvalues({ ...values, errors: data.error });
        } else {
          setvalues({ ...values, redirect: true });
          reload();
        }
      })
      .catch(() => console.log("err"));
  };

  const errorMessage = () =>
    errors && (
      <div className="error-msg">
        <h2>{errors}</h2>
      </div>
    );
  const loadingMessage = () =>
    loading && (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  const answerForm = () => (
    <React.Fragment>
      <h3>Update your Answer</h3>
      {loadingMessage()}
      {errorMessage()}
      <form>
        <div className="input">
          <textarea
            type="text"
            placeholder="Write an Answer"
            onChange={handleChange("description")}
            value={description}
          />
        </div>

        <div>
          <button className="primary" onClick={onSubmit}>
            Submit
          </button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </form>
    </React.Fragment>
  );
  return <React.Fragment>{answerForm()}</React.Fragment>;
}

export default UpdateAnswer;
