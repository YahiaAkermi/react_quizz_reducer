import React, { useEffect } from "react";

function Timer({ remainingSeconds, onDispatch }) {
  const minutes = Math.ceil(remainingSeconds / 60);

  const seconds = remainingSeconds % 60;

  useEffect(() => {
    const timerID = setInterval(() => {
      onDispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timerID);
  }, [onDispatch]);

  return (
    <div className="timer">
      {minutes < 10 ? "0" : ""}
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}

export default Timer;
