import React, { useEffect, useState } from "react";
import { getanswerbyuserid } from "../services/answerapihelper";
import AnswerCard from "./AnswerCard";

const Answer = ({ match }) => {
  const [answers, setanswers] = useState();

  const reload = (id) => {
    getanswerbyuserid(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setanswers(data);
      }
    });
  };

  useEffect(() => {
    reload(match.params.uId);
  }, [match.params.uId]);
  return (
    <div className="card neo">
      {answers &&
        answers.length > 0 &&
        answers.map((answer) => (
          <AnswerCard
            ans={answer}
            reload={() => reload(match.params.uId)}
            showQuestion={true}
          />
        ))}
      {answers && answers.length === 0 && <p>No Answers</p>}
      {!answers && <p className="loading">Loading..</p>}
    </div>
  );
};

export default Answer;
