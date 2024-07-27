import Options from "./Options";

function Question({ question, answer, onDispatch }) {
  return (
    <div>
      <h4>{question?.question}</h4>
      <Options question={question} answer={answer} onDispatch={onDispatch} />
    </div>
  );
}

export default Question;
