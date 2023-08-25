import { AnswerCont, QuestionCont } from "../../common/Interfaces";

export const sampleTest: QuestionCont[] = [
  {
    isActive:true,
    Id: `1`,
    questionText: "Whats the top speed of a swallow?",
    answers: [
      {
        Id: `11`,
        answerText: "10/km/h",
      },
      { Id: `12`, answerText: "20/km/h" },
      { Id: `13`, answerText: "30/km/h" },
      { Id: `14`, answerText: "100km/h" },
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
      },
      { Id: `22`, answerText: "answer2" },
      { Id: `23`, answerText: "answer3" },
      { Id: `24`, answerText: "answer4" },
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
      },
      { Id: `32`, answerText: "answer6", },
      { Id: `33`, answerText: "answer7", },
      { Id: `34`, answerText: "answer8", },
    ],
  },
  {
    isActive:false,
    Id: `4`,
    questionText: "Praesent varius purus vel velit bibendum lacinia?",
    answers: [
      {
        Id: `41`,
        answerText: "answer9"
    
      },
      { Id: `42`, answerText: "answer10"},
      { Id: `43`, answerText: "answer11"},
      { Id: `44`, answerText: "answer12"},
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
        answerText: "fsfsf"
      },
      { Id: `52`, answerText: "sdfdf" },
      { Id: `53`, answerText: "lorem ipsum" },
      { Id: `54`, answerText: "answer16" },
    ],
  },
];

export const AnswerSample={
  Id: '1',
  answerText: "Sample Answer"
}
export const AnswersListSample: AnswerCont[] = [
  { Id: `1`, answerText: "Sample Answer" },
  { Id: `2`, answerText: "Sample Answer" },
  { Id: `3`, answerText: "Sample Answer" },
  { Id: `4`, answerText: "Sample Answer" },
];
export const QuestionSample: QuestionCont = {
  Id: `1`,
  questionText: "new question text",
  answers: AnswersListSample,
};

