

export interface AnswerCont {
    Id: string;
    answerText: string;
    isEditingEnabled:boolean
  }
  export interface QuestionCont {
    Id: string;
    isActive?:boolean
    questionText: string;
    answers: Array<AnswerCont>;
  }