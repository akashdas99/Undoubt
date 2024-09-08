import React, { useEffect, useState } from "react";
import { loadTopQuestions } from "../services/questionapicalls";
import QuestionCard from "./QuestionCard";
import About from "./About";
import QuestionLoadingCard from "./QuestionLoadingCard";

const Question = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setquestions] = useState();

  const reload = () => {
    setLoading(true);
    loadTopQuestions().then((data) => {
      if (!data || data?.error) {
        console.log(data?.error);
      } else {
        setquestions(data);
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    reload();
  }, []);
  return (
    <>
      <About />
      <div className="active-neo section-heading">Recent Questions</div>
      {loading
        ? [...Array(8)].map((question) => <QuestionLoadingCard />)
        : questions &&
          questions.length > 0 &&
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              reload={reload}
            />
          ))}
      {questions && questions.length === 0 && <p>No Questions</p>}
    </>
  );
};

export default Question;
