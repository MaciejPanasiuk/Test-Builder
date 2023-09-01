import { TestCont } from "../../../../common/Interfaces";
import { EMPTY_TEST, QuestionSample, SAMPLE_TEST } from "../../../Data/const";
import { TestOptionsProps } from "../../../Interfaces/types";
import DownloadPDFButton from "../../Buttons/DownloadPDFButton/DownloadPDFButton";
import "./TestOptions.scss";

export default function TestOptions({
  onSetTest,
  onSetTitle,
  onSetSelectedQuestion,
  onSetselectedAnswerList,
  onSetSelectedAnswer,
  onSetIsSubmitted,
  currentTest,
  isSubmitted,
}: TestOptionsProps) {
  const handleTestLoad = (TestInput: TestCont) => {
    const { questions, title } = TestInput;
    onSetTest(questions);
    onSetTitle(title);
    onSetSelectedQuestion(questions[0] ?? QuestionSample);
    onSetselectedAnswerList(questions[0].answers ?? QuestionSample.answers);
    onSetSelectedAnswer(questions[0].answers[0] ?? QuestionSample.answers[0]);
  };
  // const handleTestLoad = (TestInput: TestCont) => {
  //   onSetTest(TestInput);
  // };
  const handleLoadMyTest = () => {
    console.log("under construction");
  };
  console.log("I run every tiem");
  return (
    <div className="TestOptionsContainer">
      <button onClick={() => handleTestLoad(SAMPLE_TEST)}>
        Load Sample Test
      </button>
      <button onClick={() => handleTestLoad(EMPTY_TEST)}>Clear</button>
      <button onClick={() => handleLoadMyTest()}>Load one of your Tests</button>
      {isSubmitted && (
        <button onClick={() => onSetIsSubmitted(false)}>
          {" "}
          Back To Editing
        </button>
      )}
      {isSubmitted ? (
        <DownloadPDFButton TestToConvert={currentTest} />
      ) : (
        <button onClick={() => onSetIsSubmitted(true)}> Confirm Test</button>
      )}
    </div>
  );
}
