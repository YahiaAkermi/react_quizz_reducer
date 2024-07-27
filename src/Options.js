import React from "react";

function Options({ question, answer, onDispatch }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question?.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
           ${
             hasAnswered
               ? index === question.correctOption
                 ? "correct"
                 : "wrong"
               : ""
           }`}
          disabled={hasAnswered} //disable the buttons when answer already given
          key={option}
          onClick={() => onDispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
