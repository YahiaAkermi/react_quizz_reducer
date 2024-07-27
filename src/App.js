import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  //  'loading' , 'error' , 'ready' , 'active' , 'finished'
  status: "isLoading",
  //index to keep track of the current question and each new question will triggers an re-render
  index: 0,
  //answer given by user
  answer: null,
  //user's score
  points: 0,
  highScore: 0,
  remainingSeconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuizz":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state?.questions[state?.index];
      const answer = action.payload;

      return {
        ...state,
        answer: action.payload,
        points:
          answer === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finishQuizz":
      return {
        ...state,
        status: "finished",
        answer: null,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "restartQuizz":
      return {
        ...state,
        status: "ready",
        answer: null,
        index: 0,
        points: 0,
        remainingSeconds: 20,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "tick":
      return {
        ...state,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
        remainingSeconds: state.remainingSeconds - 1,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    default:
      throw new Error("unkown action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numbOfQuestions = questions.length;

  const totalPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        if (data) {
          dispatch({ type: "dataReceived", payload: data });
        }

        if (!data) throw new Error("there is no data");
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestion();

    return () => {};
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numbOfQuestions={numbOfQuestions}
            onDispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numbOfQuestions={numbOfQuestions}
              points={points}
              totalPossiblePoints={totalPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              onDispatch={dispatch}
            />

            <Footer>
              <Timer
                onDispatch={dispatch}
                remainingSeconds={remainingSeconds}
              />
              {answer !== null && (
                <NextButton
                  answer={answer}
                  onDispatch={dispatch}
                  index={index}
                  numbOfQuestions={numbOfQuestions}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            totalPossiblePoints={totalPossiblePoints}
            highScore={highScore}
            onDispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
