import React from "react";

function FinishedScreen({
  points,
  totalPossiblePoints,
  highScore,
  onDispatch,
}) {
  const percentage = (points / totalPossiblePoints) * 100;
  console.log(Math.ceil(percentage));

  let emojis;

  if (percentage === 100) emojis = "🥇";
  if (percentage >= 80 && percentage < 100) emojis = "🫡";
  if (percentage >= 50 && percentage < 80) emojis = "🥱";
  if (percentage < 50) emojis = "🤧";
  return (
    <>
      <p className="result">
        <span>{emojis}</span> you scored <strong>{points} </strong> out of{" "}
        {totalPossiblePoints} ({Math.ceil(percentage)} %)
      </p>
      <p className="highscore">the highest score is {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => onDispatch({ type: "restartQuizz" })}
      >
        Restart Quizz
      </button>
    </>
  );
}

export default FinishedScreen;
