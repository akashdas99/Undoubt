import React, { useEffect, useState } from "react";
import { loadQuestionsByUid } from "../services/questionapicalls";
import QuestionCard from "./QuestionCard";

function UserQuestions({ match }) {
  const [questions, setquestions] = useState();

  const reload = (id) => {
    loadQuestionsByUid(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setquestions(data);
      }
    });
  };
  useEffect(() => {
    reload(match.params.uId);
  }, []);
  return (
    <>
      {questions &&
        questions.length > 0 &&
        questions.map((question) => {
          return (
            <QuestionCard
              key={question._id}
              question={question}
              reload={() => reload(match.params.uId)}
            />
          );
        })}
      {questions && questions.length === 0 && <p>No Questions</p>}
      {!questions && <div className="neo card loading">Loading..</div>}
    </>
  );
}

export default UserQuestions;
