import React from "react";

function StartScreen({ numbOfQuestions, onDispatch }) {
  return (
    <div className="start">
      <h2>Welcome to React Quizz</h2>
      <h3>{numbOfQuestions} questions to test you react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "startQuizz" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
