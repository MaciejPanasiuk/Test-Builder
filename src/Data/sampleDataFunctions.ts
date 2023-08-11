import { v4 as uuidv4 } from "uuid";
import { AnswerCont, QuestionCont } from "../Interfaces/Interfaces";

export const createSampleQuestionForm = (numOfAnswers = 4): QuestionCont => {
    const SampleAnswers: AnswerCont[] = Array.from(
      { length: numOfAnswers },
      () => ({
        Id: uuidv4(),
        answerText: "Sample Answer",
        isEditingEnabled: false,
      })
    );
    return {
      Id: uuidv4(),
      questionText: "Sample Question",
      answers: [...SampleAnswers],
    };
  };
 export  const createAnswerSample=()=>{
    return {
        Id: uuidv4(),
        answerText: "Sample Answer",
      }
  }
  export const getSampleTitle=()=>{
    return {titleText:'My New Test',isActive:false}
  }