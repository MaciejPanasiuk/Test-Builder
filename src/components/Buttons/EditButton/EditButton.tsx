import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { IconButton, Tooltip } from "@mui/material";
import { ButtonProps, EditProps, SpanEvent } from "../../../Interfaces/types";
import "./EditButton.scss";

function EditButton({
  currentQuestion,
  selectedQuestion,
  onQuestionSelect,
  onAnswersListSelect,
  onAnswerSelect,
  onSetTest,
  btn_size = "small",
  tooltip=''
}: EditProps & ButtonProps) {
  const handleConfirmClick = (event: SpanEvent) => {
    event.preventDefault();
    onQuestionSelect((prevQuestion) => {
      const questionClone = structuredClone(prevQuestion);
      return { ...questionClone, isActive: false };
    });
    onSetTest((prevTest)=>{
      const testClone=structuredClone(prevTest);
      const answerIndex = testClone.findIndex(
        (question) => question.Id === selectedQuestion.Id
        );
        testClone[answerIndex]={...selectedQuestion}
        return testClone;
    })
  };

  const handleEditClick = (event: SpanEvent) => {
    event.preventDefault();
    onQuestionSelect({ ...currentQuestion, isActive: true });
    onAnswersListSelect(currentQuestion.answers);
    onAnswerSelect(currentQuestion.answers[0]);
    onSetTest((prevTest)=>{
        const testClone=structuredClone(prevTest);
        const modifiedTest=testClone.map((question)=>{if(question.Id===currentQuestion.Id){return question} else{return {...question,isActive:false}}})
        return modifiedTest;
    })
  };

  return (
    <>
      {currentQuestion.isActive ? (
        <Tooltip title={tooltip} arrow>
        <IconButton
          className="editButton"
          color="success"
          size={btn_size}
          onClick={(e) => handleConfirmClick(e)}
        >
          <CheckRoundedIcon fontSize="inherit" />
        </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={tooltip} arrow>
        <IconButton
          className="editButton"
          color="success"
          size={btn_size}
          onClick={(e) => handleEditClick(e)}
        >
          <EditRoundedIcon fontSize="inherit" />
        </IconButton>
        </Tooltip>
      )}
    </>
  );
}
export default EditButton;
