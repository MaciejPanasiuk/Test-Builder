import { createContext, useState } from "react";
import { LoaderProps } from "../../../Interfaces/types";
import TestForm from "../TestForm/TestForm";
import { TestCont } from "../../../../common/Interfaces";
import { EMPTY_TEST } from "../../../Data/const";
import SaveToPDF from "../../SaveToPDF/SaveToPDF";
import TestOptions from "../TestOptions/TestOptions";

export default function TestLoader({ TestToLoad = EMPTY_TEST }: LoaderProps) {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // const [Test, setTest] = useState<TestCont>(TestToLoad);

  // const TestContext=createContext(null);//new context


  return (
    <div>
      {/* <TestOptions isSubmitted={isSubmitted} onSetIsSubmitted={setIsSubmitted} currentTest={Test} onSetTest={setTest}/> */}
      {/* {isSubmitted ? (
        <SaveToPDF TestToConvert={TestToLoad} />
      ) : ( */}
        <TestForm
          currentTest={TestToLoad}
          isSubmitted={isSubmitted}
          onSetIsSubmitted={setIsSubmitted}
          // currentTest={Test}
          // isSubmitted={isSubmitted}
          // onSetIsSubmitted={setIsSubmitted}
        />
      {/* )} */}
    </div>

  );
}
