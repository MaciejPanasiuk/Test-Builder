import { useEffect, useState, useCallback, useMemo } from "react";
import {
  AnswerCont,
  QuestionCont,
  TitleType,
} from "../../../../common/Interfaces";
import Question from "../QuestionForm/Question/Question";
import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";
import Answer from "../QuestionForm/Answer/Answer";
import QuestionWithAnswers from "../QuestionForm/QuestionWithAnswers/QuestionWithAnswers";
import "./TestForm.scss";
import EditButton from "../../Buttons/EditButton/EditButton";
import AddButton from "../../Buttons/AddButton/AddButton";
import {
  createAnswerSample,
  createSampleQuestionForm,
} from "../../../Data/sampleDataFunctions";
import Title from "../Title/Title";
import { TestProps } from "../../../Interfaces/types";
import { EMPTY_TEST, QuestionSample } from "../../../Data/const";
import TestOptions from "../TestOptions/TestOptions";

function TestForm({ currentTest = EMPTY_TEST, isSubmitted,onSetIsSubmitted }: TestProps) {
  const { questions, title } = currentTest;
  const isTestEmpty = () => {
    return questions.length === 0;
  };

  const [QuestionList, setQuestionList] = useState<QuestionCont[]>(questions);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionCont>(
    isTestEmpty() ? createSampleQuestionForm() : questions[0]
  );
  const [selectedAnswerList, setselectedAnswerList] = useState<AnswerCont[]>(
    isTestEmpty() ? selectedQuestion.answers : questions[0].answers
  );
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerCont>(
    isTestEmpty() ? selectedQuestion.answers[0] : questions[0].answers[0]
  );

  const [currentTitle, setCurrentTitle] = useState<TitleType>(title);

  const memoizedSelectedQuestion = useMemo(
    () => selectedQuestion,
    [selectedQuestion]
  );
  const updateTest = useCallback(() => {
    setQuestionList((prevQuestionList) => {
      const testClone = structuredClone(prevQuestionList);
      const testIndex = testClone.findIndex(
        (question) => question.Id === selectedQuestion.Id
      );
      testClone[testIndex] = { ...selectedQuestion };
      return testClone;
    });
  }, [selectedQuestion]);

  // useEffect(() => {//something
  //   setSelectedQuestion(questions[0] ?? QuestionSample);
  //   setselectedAnswerList(questions[0].answers ?? QuestionSample.answers);
  //   setSelectedAnswer(questions[0].answers[0] ?? QuestionSample.answers[0]);
  // }, [currentTest,questions]);

  useEffect(() => {
    updateTest();
    // console.log(`i do stuff test`);
  }, [memoizedSelectedQuestion, updateTest]);

  useEffect(() => {
    setSelectedQuestion((prevQuestion) => {
      const questionClone = structuredClone(prevQuestion);
      return { ...questionClone, answers: selectedAnswerList };
    });
    // console.log(`i do stuff ans`);
  }, [selectedAnswerList]);

  return (
    <div>
      <TestOptions
        onSetTest={setQuestionList}
        onSetTitle={setCurrentTitle}
        onSetSelectedQuestion={setSelectedQuestion}
        onSetselectedAnswerList={setselectedAnswerList}
        onSetSelectedAnswer={setSelectedAnswer}
        onSetIsSubmitted={onSetIsSubmitted}
        currentTest={{
          questions: structuredClone(QuestionList),
          title: structuredClone(currentTitle),
        }}
        isSubmitted={isSubmitted}
      />
      <form>
        <Title title={currentTitle} onTitleUpdate={setCurrentTitle} />
        {QuestionList.map((currentQuestion, Queindex) => (
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
                  onQuestionUpdate={setQuestionList}
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
                            tooltip={"Delete Answer"}
                          />
                          <AddButton
                            getSampleData={createAnswerSample}
                            listItemIndex={AnsIndex}
                            onSetItem={setselectedAnswerList}
                            btn_size={"small"}
                            tooltip={"Add Answer Below"}
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
                      btn_label={"Add Answer"}
                    />
                  )}
                </ol>
              </div>
            </div>
            <div>
              <EditButton
                currentQuestion={currentQuestion}
                selectedQuestion={selectedQuestion}
                onSetTest={setQuestionList}
                onAnswerSelect={setSelectedAnswer}
                onQuestionSelect={setSelectedQuestion}
                onAnswersListSelect={setselectedAnswerList}
                btn_size={"large"}
                tooltip={"Edit Question"}
              />
              <DeleteButton
                currItem={currentQuestion}
                onSetItem={setQuestionList}
                btn_size={"large"}
                tooltip={"Edit Question"}
              />
              <AddButton
                getSampleData={createSampleQuestionForm}
                listItemIndex={Queindex}
                onSetItem={setQuestionList}
                btn_size={"large"}
                tooltip={"Add Question"}
              />
            </div>
          </QuestionWithAnswers>
        ))}
        {QuestionList.length <= 0 && (
          <AddButton
            getSampleData={createSampleQuestionForm}
            listItemIndex={QuestionList.length - 1}
            onSetItem={setQuestionList}
            btn_size={"large"}
            btn_label={"Add your first Question"}
          />
        )}
      </form>
    </div>
  );
}

export default TestForm;
