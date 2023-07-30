import {AnswerProps } from "../../../Interfaces/types";

function Answer({
  currentAnswer,
  selectedAnswer,
  currentQuestion,
  onAnswerSelect,
  onAnswerListUpdate,
}: AnswerProps) {
  const onAnswerFocus=()=>{
    onAnswerSelect(currentAnswer)

  }
  const handleAnswerChange=(newAnswer: string)=>{
    onAnswerSelect(prevAnswer=>
      {return{...prevAnswer,answerText:newAnswer}})

    onAnswerListUpdate(prevAnswers=>{
      const answersClone = structuredClone(prevAnswers);
      const answerIndex = answersClone.findIndex(
        (answer) => answer.Id === selectedAnswer.Id
        );
        answersClone[answerIndex] = { ...selectedAnswer, answerText: newAnswer  };
        return answersClone;
    })
  };
  return (
    <div className="singleAnswer">
      {currentQuestion.isActive?<textarea
      disabled={!currentQuestion.isActive}
        rows={1}
        cols={40}
        placeholder={currentAnswer.answerText}
        value={
          selectedAnswer.Id === currentAnswer.Id
            ? selectedAnswer.answerText
            : currentAnswer.answerText
        }
        onFocus={() => {onAnswerFocus()}}
        onChange={(e) => handleAnswerChange(e.target.value)}

      ></textarea>:<div>{currentAnswer.answerText}</div>}
      
    </div>
  );
}
export default Answer;
