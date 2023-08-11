import { useEffect, useState, useCallback, useMemo } from "react";
import {sampleTest } from "../../../Data/const";
import { AnswerCont, QuestionCont, TitleType } from "../../../Interfaces/Interfaces";
import Question from "../QuestionForm/Question/Question";
import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";
import Answer from "../QuestionForm/Answer/Answer";
import QuestionWithAnswers from "../QuestionForm/QuestionWithAnswers/QuestionWithAnswers";
import "./TestForm.scss";
import EditButton from "../../Buttons/EditButton/EditButton";
import AddButton from "../../Buttons/AddButton/AddButton";
import { createAnswerSample, createSampleQuestionForm, getSampleTitle } from "../../../Data/sampleDataFunctions";
import Title from "../Title/Title";

function TestForm() {
  const [Test, setTest] = useState<QuestionCont[]>(sampleTest);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionCont>(
    sampleTest[0]
  );
  const [selectedAnswerList, setselectedAnswerList] = useState<AnswerCont[]>(
    sampleTest[0].answers
  );
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerCont>(
    sampleTest[0].answers[0]
  );
  const[currentTitle,setCurrentTitle]=useState<TitleType>(getSampleTitle);

  const memoizedSelectedQuestion = useMemo(
    () => selectedQuestion,
    [selectedQuestion]
  );
  const updateTest = useCallback(() => {
    setTest((prevTest) => {
      const testClone = structuredClone(prevTest);
      const testIndex = testClone.findIndex(
        (question) => question.Id === selectedQuestion.Id
      );
      testClone[testIndex] = { ...selectedQuestion };
      return testClone;
    });
  }, [selectedQuestion]);

  useEffect(() => {
    updateTest();
    console.log(`i do stuff test`);
  }, [memoizedSelectedQuestion, updateTest]);

  useEffect(() => {
    setSelectedQuestion((prevQuestion) => {
      const questionClone = structuredClone(prevQuestion);
      return { ...questionClone, answers: selectedAnswerList };
    });
    console.log(`i do stuff ans`);
  }, [selectedAnswerList]);

  return (
    <div>
      <form>
        <Title title={currentTitle} onTitleUpdate={setCurrentTitle} />
        {Test.map((currentQuestion, Queindex) => (
          <QuestionWithAnswers onMouseOver key={`${currentQuestion.Id}`}>
            <div>
              <div
                className="questionContainer"
                key={`${currentQuestion.Id}-Que-${Queindex}`}
              >
                <b>{Queindex + 1}.</b>
                <Question
                  currentQuestion={currentQuestion}
                  selectedQuestion={selectedQuestion}
                  onQuestionSelect={setSelectedQuestion}
                  onQuestionUpdate={setTest}
                />
              </div>
              <div>
                <ol className="Alpha">
                  {currentQuestion.answers.map((currentAnswer, AnsIndex) => (
                    <div
                      className="AnswerContainer"
                      key={`${currentQuestion.Id}-Ans-${AnsIndex}`}
                    >
                      <li>
                        <Answer
                          currentAnswer={currentAnswer}
                          selectedAnswer={selectedAnswer}
                          currentQuestion={currentQuestion}
                          onAnswerSelect={setSelectedAnswer}
                          onAnswerListUpdate={setselectedAnswerList}
                        />
                      </li>
                      {currentQuestion.isActive && (
                        <>
                          <DeleteButton
                            currItem={currentAnswer}
                            onSetItem={setselectedAnswerList}
                            btn_size={"small"}
                            tooltip={'Delete Answer'}
                          />
                          <AddButton
                            getSampleData={createAnswerSample}
                            listItemIndex={AnsIndex}
                            onSetItem={setselectedAnswerList}
                            btn_size={"small"}
                            tooltip={'Add Answer Below'}
                          />
                        </>
                      )}
                    </div>
                  ))}
                {currentQuestion.answers.length === 0 && (
                  <AddButton
                    getSampleData={createAnswerSample}
                    listItemIndex={0}
                    onSetItem={setselectedAnswerList}
                    btn_size={"small"}
                    btn_label={'Add Answer'}
                  />
                )}
                </ol>
              </div>
            </div>
            <div>
              <EditButton
                currentQuestion={currentQuestion}
                selectedQuestion={selectedQuestion}
                onSetTest={setTest}
                onAnswerSelect={setSelectedAnswer}
                onQuestionSelect={setSelectedQuestion}
                onAnswersListSelect={setselectedAnswerList}
                btn_size={"large"}
                tooltip={'Edit Question'}
              />
              <DeleteButton
                currItem={currentQuestion}
                onSetItem={setTest}
                btn_size={"large"}
                tooltip={'Edit Question'}
              />
              <AddButton
                getSampleData={createSampleQuestionForm}
                listItemIndex={Queindex}
                onSetItem={setTest}
                btn_size={"large"}
                tooltip={'Add Question'}
              />
            </div>
          </QuestionWithAnswers>
        ))}
{Test.length<=0 && <AddButton
                getSampleData={createSampleQuestionForm}
                listItemIndex={Test.length-1}
                onSetItem={setTest}
                btn_size={"large"}
                btn_label={'Add your first Question'}
              />}
              
      </form>
    </div>
  );
}

export default TestForm;
