import { useState } from "react";
import { AnswerObj } from "./../../../Interfaces/Interfaces";
import { Dispatch, SetStateAction } from "react";
import { SpanEvent,ButtonEvent } from "../../../Interfaces/types";

type AnswerProps = {
  answerFromMemory: AnswerObj;
  onSetAnswers: Dispatch<SetStateAction<AnswerObj[]>>;
};
function Answer({ onSetAnswers, answerFromMemory }: AnswerProps) {
  const [answer, setAnswer] = useState<AnswerObj>(answerFromMemory);

  function handleAnswerChange(inputVal: string) {
    setAnswer((current) => ({ ...current, answerText: inputVal }));
  }
  function handleAnswerSubmit(event: SpanEvent) {
    event.preventDefault();
    setAnswer(current=>({...current,isAdded:true}))//zmienia na true, ale w parencie dalej jest false
    onSetAnswers((prevAnswers) => {
      const answersClone = structuredClone(prevAnswers);
      const answerIndex = answersClone.findIndex(
        (elem) => elem.Id === answer.Id
      );
      // answersClone[answerIndex] = answer;
      answersClone[answerIndex] = {...answer,isAdded:true};
      return answersClone;
    });

  }
  function handleEdit(event: ButtonEvent) {
    event.preventDefault();
    setAnswer(current=>({...current,isAdded:false}))

  }
  return (
    <div className="Answer">
      <textarea
        disabled={answer.isAdded}
        rows={1}
        cols={50}
        placeholder={`Answer`}
        value={answer.answerText}
        onChange={(e) => handleAnswerChange(e.target.value)}
      ></textarea>
      {answer.isAdded ? (
        <button onClick={(e) => handleEdit(e)}>Edit</button>
      ) : (
        <span onClick={(e) => handleAnswerSubmit(e)}>&#9989;</span>
      )}
    </div>
  );
}
export default Answer;
