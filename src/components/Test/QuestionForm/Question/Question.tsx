import "./Question.scss";
import { QuestionProps } from "../../../../Interfaces/types";

function QuestionForm({
  currentQuestion,
  selectedQuestion,
  onQuestionSelect,
}: QuestionProps) {
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
        onChange={(e) => handleQuestionChange(e.target.value)}
      ></textarea>:<h3 className='questionText'>{currentQuestion.questionText}</h3>}
    </div>
  );
}

export default QuestionForm;
