import React from "react";

function NextButton({ onDispatch, index, numbOfQuestions }) {
  if (index < numbOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "newQuestion" })}
      >
        Next
      </button>
    );
  if (index === numbOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "finishQuizz" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
