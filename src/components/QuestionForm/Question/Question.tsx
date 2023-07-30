import "./Question.scss";
import { QuestionProps } from "../../../Interfaces/types";

function QuestionForm({
  currentQuestion,
  selectedQuestion,
  onQuestionSelect,
  onQuestionUpdate,
}: QuestionProps) {
  // const handleQuestionUpdate = () => {
  //   onQuestionUpdate((prevTest) => {
  //     const testClone = structuredClone(prevTest);
  //     const testIndex = testClone.findIndex(
  //       (question) => question.Id === selectedQuestion.Id
  //     );
  //     testClone[testIndex] = { ...selectedQuestion };
  //     return testClone;
  //   });
  // };
  const handleQuestionChange = (newQuestion: string) => {
    onQuestionSelect((prevQuestion) => {
      return { ...prevQuestion, questionText: newQuestion };
    });
  };
  return (
    <div>
{currentQuestion.isActive?<textarea
        rows={2}
        cols={70}
        placeholder={currentQuestion.questionText}
        value={
          selectedQuestion.Id === currentQuestion.Id
            ? selectedQuestion.questionText
            : currentQuestion.questionText
        }
        // onFocus={() => {
        //   onQuestionSelect(currentQuestion);
        // }}
        // onBlur={handleQuestionUpdate}
        onChange={(e) => handleQuestionChange(e.target.value)}
      ></textarea>:<h3 className='questionText'>{currentQuestion.questionText}</h3>}
    </div>
  );
}

export default QuestionForm;
