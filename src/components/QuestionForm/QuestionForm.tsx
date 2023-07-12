import { useState } from "react";
import Answer from "./Answer/Answer";
import { AnswerObj } from "./../../Interfaces/Interfaces";
import "./QuestionForm.scss"
import {ButtonEvent,SpanEvent} from "../../Interfaces/types";

const answersExample: AnswerObj[] = [
  { Id: 1, answerText: "",isAdded: false },
  { Id: 2, answerText: "",isAdded: false },
  { Id: 3, answerText: "",isAdded: false },
  { Id: 4, answerText: "",isAdded: false },
];

function QuestionForm() {
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<AnswerObj[]>(answersExample);

  function handleDeleteAnswer(answerId: number, event: SpanEvent) {
    event.preventDefault();
    setAnswers((c) => {
      const updatedAnswers: AnswerObj[] = structuredClone(c);
      return updatedAnswers.filter((answers) => answers.Id !== answerId);
    });
  }
  function handleAddAnswer(event:ButtonEvent){
    event.preventDefault();
    setAnswers((prevAnswers) => {
      const updatedAnswers: AnswerObj[] = structuredClone(prevAnswers);
      const nextId:number=prevAnswers[prevAnswers.length-1].Id+1
      return  [...updatedAnswers,{ Id: nextId, answerText: `` }]
    });
  }
  return (
    <div><h1>TEST BUILDER</h1>
    <h3>Basic Functionalities</h3>
      <form>
        <textarea
          rows={2}
          cols={50}
          placeholder="Type in your Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <ul className=''>
          {answers.map((currAnswer,index) => (
            <li className='Alpha' key={`${currAnswer.Id}-${index}li`}>
              <div className='answerContainer'>
              <Answer
                // key={currAnswer.Id}
                key={`${currAnswer.Id}-${index}ans`}
                answerFromMemory={currAnswer}
                onSetAnswers={setAnswers}
              />
              <span onClick={(e) => handleDeleteAnswer(currAnswer.Id, e)}>
              &#10060;
              </span>
              </div>
            </li>
          ))}
          <button onClick={(e) => handleAddAnswer(e)}>Add another answer</button>
        </ul>
      </form>
      {/* <div>{answers}</div> */}
    </div>
  );
}

export default QuestionForm;
