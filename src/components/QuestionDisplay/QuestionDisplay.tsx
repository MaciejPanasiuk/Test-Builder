import React, { useState } from "react";
import { sampleTest } from "../../Data/const";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import "./QuestionDisplay.scss"
import { QuestionContainer } from "../../Interfaces/Interfaces";

interface Answer {
  Id: string;
  answerText: string;
}

// interface QuestionContainer {
//   Id: string;
//   questionText: string;
//   answers: Array<Answer>;
// }
function QuestionDisplay() {
  const [currentTest, setCurrentTest] = useState<QuestionContainer[]>([]);

  const handleShowPreview = () => {
    setCurrentTest(structuredClone(sampleTest));
  };

  return (
    <>
      <div>
        <button onClick={handleShowPreview}>set sample data</button>
        <List>
          {currentTest.map((item, index) => (
              <ol>
                {index + 1}: {item.questionText}
              {item.answers.map((answer) => (
                  <li className='answerAlpha'>{answer.answerText}</li>
                  ))}
            </ol>
          ))}
        </List>
      </div>
    </>
  );
}

export default QuestionDisplay;
