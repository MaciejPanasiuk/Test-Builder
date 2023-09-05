import {  useState } from "react";
import { LoaderProps } from "../../../Interfaces/types";
import TestForm from "../TestForm/TestForm";
import { EMPTY_TEST } from "../../../Data/const";

export default function TestLoader({ TestToLoad = EMPTY_TEST }: LoaderProps) {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  return (
    <div>
        <TestForm
          currentTest={TestToLoad}
          isSubmitted={isSubmitted}
          onSetIsSubmitted={setIsSubmitted}
        />
    </div>

  );
}
