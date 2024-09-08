import React from "react";

const QuestionLoadingCard = () => {
  return (
    <div className="q-card neo " style={{ height: 130 }}>
      <div className="title skeleton" style={{ height: 34 }}></div>
      <div className="author-section skeleton" style={{ height: 22 }}></div>

      <div className="card-footer skeleton" style={{ height: 17 }}></div>
    </div>
  );
};

export default QuestionLoadingCard;
