import React, { useEffect, useState } from "react";
import { loadTopQuestions } from "../services/questionapicalls";
import QuestionCard from "./QuestionCard";
import About from "./About";

const Question = () => {
  const [questions, setquestions] = useState();

  const reload = () => {
    loadTopQuestions().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setquestions(data);
      }
    });
  };
  useEffect(() => {
    reload();
  }, []);
  return (
    <>
      <About />
      <div className="active-neo section-heading">Recent Questions</div>

      {questions &&
        questions.length > 0 &&
        questions.map((question) => {
          return (
            <QuestionCard
              key={question._id}
              question={question}
              reload={reload}
            />
          );
        })}
      {questions && questions.length === 0 && <p>No Questions</p>}
      {!questions && <p className="loading">Loading..</p>}
    </>
  );
};

export default Question;
