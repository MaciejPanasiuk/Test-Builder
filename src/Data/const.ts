import { AnswerCont, QuestionCont } from "../Interfaces/Interfaces";

export const sampleTest: QuestionCont[] = [
  {
    isActive:true,
    Id: `1`,
    questionText: "Whats the top speed of a swallow?",
    answers: [
      {
        Id: `11`,
        answerText: "10/km/h",
        isEditingEnabled: false,
      },
      { Id: `12`, answerText: "20/km/h", isEditingEnabled: false },
      { Id: `13`, answerText: "30/km/h", isEditingEnabled: false },
      { Id: `14`, answerText: "100km/h", isEditingEnabled: false },
    ],
  },
  {
    isActive:false,
    Id: `2`,
    questionText:
      " Aenean fringilla congue ultricies. Sed feugiat interdum volutpat?",
    answers: [
      {
        Id: `21`,
        answerText: "answer1",
        isEditingEnabled: false,
      },
      { Id: `22`, answerText: "answer2", isEditingEnabled: false },
      { Id: `23`, answerText: "answer3", isEditingEnabled: false },
      { Id: `24`, answerText: "answer4", isEditingEnabled: false },
    ],
  },
  {
    isActive:false,
    Id: `3`,
    questionText:
      "Roin luctus convallis leo at tempor. Proin at blandit felis?",
    answers: [
      {
        Id: `31`,
        answerText: "answer5",
        isEditingEnabled: false,
      },
      { Id: `32`, answerText: "answer6", isEditingEnabled: false },
      { Id: `33`, answerText: "answer7", isEditingEnabled: false },
      { Id: `34`, answerText: "answer8", isEditingEnabled: false },
    ],
  },
  {
    isActive:false,
    Id: `4`,
    questionText: "Praesent varius purus vel velit bibendum lacinia?",
    answers: [
      {
        Id: `41`,
        answerText: "answer9",
        isEditingEnabled: false,
      },
      { Id: `42`, answerText: "answer10", isEditingEnabled: false },
      { Id: `43`, answerText: "answer11", isEditingEnabled: false },
      { Id: `44`, answerText: "answer12", isEditingEnabled: false },
    ],
  },
  {
    isActive:false,
    Id: `5`,
    questionText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan?",
    answers: [
      {
        Id: `51`,
        answerText: "fsfsf",isEditingEnabled: false
      },
      { Id: `52`, answerText: "sdfdf", isEditingEnabled: false },
      { Id: `53`, answerText: "lorem ipsum", isEditingEnabled: false },
      { Id: `54`, answerText: "answer16", isEditingEnabled: false },
    ],
  },
];

export const AnswerSample={
  Id: '1',
  answerText: "Sample Answer",
  isEditingEnabled: false,
}
export const AnswersListSample: AnswerCont[] = [
  { Id: `1`, answerText: "Sample Answer", isEditingEnabled: false },
  { Id: `2`, answerText: "Sample Answer", isEditingEnabled: false },
  { Id: `3`, answerText: "Sample Answer", isEditingEnabled: false },
  { Id: `4`, answerText: "Sample Answer", isEditingEnabled: false },
];
export const QuestionSample: QuestionCont = {
  Id: `1`,
  questionText: "new question text",
  answers: AnswersListSample,
};

