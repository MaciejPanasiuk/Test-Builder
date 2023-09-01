import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import { ConvertProps } from "../../Interfaces/types";

const styles = StyleSheet.create({
  title: { fontSize: "30px", margin: "auto" },
  testContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "15px 15px 0px 15px",
  },

  questionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "15px 15px 0px 15px",
  },
  question: { fontSize: "20px" },
  answersList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px 10px 10px 0px",
  },
  answer: { fontSize: "15px", marginBottom: 5 },
});

export default function SaveToPDF({TestToConvert}:ConvertProps) {
  const{questions,title}=TestToConvert;

  const getNextChar = (char: string, index: number) => {
    if (index < 26) return String.fromCharCode(char.charCodeAt(0) + index);
    else {
      const firstDigit = (index - (index % 26)) / 26 - 1;
      return (
        String.fromCharCode(char.charCodeAt(0) + firstDigit) +
        String.fromCharCode(char.charCodeAt(0) + (index % 26))
      );
    }
  };
  return (
    <Document>
      <Page size="A4">
        <View style={styles.title}><Text>{title.titleText}</Text></View>
        <View style={styles.testContainer}>

            {questions.map((question,indexQue)=>(
          <View key={indexQue+question.questionText} style={styles.questionContainer}>
            <View style={styles.question}>
              <Text>{`${indexQue+1}. `}{question.questionText}</Text>
            </View>
            <View style={styles.answersList}>
              {question.answers.map((answer, indexAns) => (
                <Text key={indexAns+answer.answerText} style={styles.answer}>
                  {`${getNextChar("A", indexAns)}. `}
                  {answer.answerText}
                </Text>
              ))}
            </View>
          </View>
            ))}
        </View>
      </Page>
    </Document>
  );
}
