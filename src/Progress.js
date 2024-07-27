import React from "react";

function Progress({
  index,
  numbOfQuestions,
  points,
  totalPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numbOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numbOfQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> / {totalPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
